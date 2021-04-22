from rest_framework import viewsets
from rest_framework.response import Response
from .models import Ticket, Ticket_upload, ContentHistory
from .serializers import TicketSerializer, TicketUploadSerializer, ContentHistorySerializer, TicketUploadSerializerWithDepth, TicketSerializerWithDepth
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics
import json

class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializerWithDepth

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("activeQuery"))
        
        tickets = Ticket.objects.filter(archive="Active").order_by("priority")
        #print('QUERY FILTER', query_filter)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            tickets = tickets.filter(**query_filter)
            count = tickets.count()
        else:
            tickets = tickets
            count = tickets.count()

        serializer = TicketSerializerWithDepth(
            tickets, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request, *args, **kwargs):
        ticket_data = request.data
        print(' ADDED DATA')
        print('ticket_data',ticket_data)
        new_ticket = Ticket.objects.create(ticket_title=ticket_data['ticket_title'], ticket_number=ticket_data['ticket_number'],ticket_content=ticket_data['ticket_content'], ticket_color=ticket_data['ticket_color'], created_by=User.objects.get(id=ticket_data['created_by']),  priority=ticket_data['priority'],ticket_types=ticket_data['ticket_types'],responsible_person=User.objects.get(id=ticket_data['responsible_person']),due_date=ticket_data['due_date'], list_tickets=ticket_data['list_tickets'])
        new_ticket.save()

        serializer = TicketSerializer(new_ticket)
        print('Ticket Serializer', serializer.data['id'])

        new_history = ContentHistory.objects.create(ticket_id=Ticket.objects.get(id=serializer.data['id']), modified_by=User.objects.get(id=ticket_data['responsible_person']), change_type='create',)
        new_history.save()
             
        return Response(serializer.data)

    def update(self, request, pk=id):
        new_data = request.data
        try:
            queryset = Ticket.objects.all()
            ticket = get_object_or_404(queryset, pk=pk)

            ticket1 = TicketSerializer(ticket)
            #print('ticket',ticket1.data)

            for x in new_data:
                print(new_data[x], ticket1.data[x])
                if new_data[x] != ticket1.data[x]:
                    print(x, "has changed")
                    new_history = ContentHistory.objects.create(ticket_id=Ticket.objects.get(id=pk), modified_by=User.objects.get(id=new_data['responsible_person']), change_type='modified',pre_value=ticket1.data[x] , post_value=new_data[x],item_changed=x)
                    new_history.save()

            serializer = TicketSerializer(
                ticket, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Ticket"}
            
                
                
                #print('nothing changed')
            
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Ticket"}
        return Response(dict_response)

    def partial_update(self, request, pk=id):
        new_data = request.data
        try:
            queryset = Ticket.objects.all()
            ticket = get_object_or_404(queryset, pk=pk)

            ticket1 = TicketSerializer(ticket)
            
            #print('ticket',ticket1.data)
            print('new data',ticket1)

            for x in new_data:
                print(new_data[x], ticket1.data[x])
                if new_data[x] != ticket1.data[x]:
                     print(x, "has changed")
                     new_history = ContentHistory.objects.create(ticket_id=Ticket.objects.get(id=pk), modified_by=User.objects.get(id=ticket1.data['responsible_person']), change_type='modified',pre_value=ticket1.data[x] , post_value=new_data[x],item_changed=x)
                     new_history.save()

            serializer = TicketSerializer(
                ticket, partial=True, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Partial Update Successful"}

        except:
            dict_response = {'error': True,
                             'message': "Error During Partial update"}
        return Response(dict_response)

    def destroy(self, request, pk=id):
        try:
            queryset = Ticket.objects.all()
            ticket = get_object_or_404(queryset, pk=pk)
            ticket1 = TicketSerializer(ticket)
            
            queryset1 = ContentHistory.objects.filter(ticket_id__id = ticket1.data['id'])
            #history = ContentHistory.objects.all()
            serializer = ContentHistorySerializer(
             queryset1, many=True, context={"request": request})

            queryset1.delete()
            ticket.delete()

            dict_response = {"error": False,
                             "message": "Successfully Deleted Ticket"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Ticket"}
        return Response(dict_response)

# class Tcreated_by(v,iewsets.ViewSet):
#     #authentication_classes = [JWTAuthentication]
#     #permission_classes = [IsAuthenticated]

#     def list(self, request):
#         tickets = Ticket.objects.all()
#         serializer = TicketSerializer(
#             tickets, many=True, context={"request": request})
#         response_dict = {"error": False,
#                          "message": "All tickets", "data": serializer.data}
#         return Response(response_dict)

#     def create(self, request, args, ):
#         try:
#             serializer = TicketSerializer(
#                 data=request.data, context={"request": request})
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             print(serializer)
#             history_data = {"change_type": 'create',}
#             history_data['ticket_id'] = serializer.id
#             history_data['modified_by'] = request.user.id
#             serializer1 = ContentHistorySerializer(data=history_data, context={"request": request})
#             serializer1.is_valid(raise_exception=True)
#             serializer1.save()
            
#             dict_response = {"error": False,
#                              "message": "Ticket saved successfully"}
#         except:
#             dict_response = {'error': True,
#                              'message': "Error During Saving Ticket"}
#         return Response(dict_response)

#     def update(self, request, pk=id):
#         try:
#             queryset = Ticket.objects.all()
#             ticket = get_object_or_404(queryset, pk=pk)
#             serializer = TicketSerializer(
#                 ticket, data=request.data, context={"request": request})
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             dict_response = {"error": False,
#                              "message": "Successfully Updated Ticket"}
#         except:
#             dict_response = {'error': True,
#                              'message': "Error During Updating Ticket"}
#         return Response(dict_response)

#     def retrieve(self, request, pk=id):
#         queryset = Ticket.objects.all()
#         ticket = get_object_or_404(queryset, pk=pk)
#         serializer = TicketSerializer(ticket, context={"request": request})
#         return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

#     def destroy(self, request, pk=id):
#         try:
#             queryset = Ticket.objects.all()
#             ticket = get_object_or_404(queryset, pk=pk)
#             ticket.delete()
#             dict_response = {"error": False,
#                              "message": "Successfully Deleted Ticket"}
#         except:
#             dict_response = {'error': True,
#                              'message': "Error During Deleting Ticket"}
#         return Response(dict_response)


class ContentHistoryViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        ticket_id = self.request.query_params.get('ticket_id')
        print('REQ DATA',ticket_id)
        history = ContentHistory.objects.filter(ticket_id=int(ticket_id))

        
        serializer = ContentHistorySerializer(
            history, many=True, context={"request": request})
        print("DATA", serializer.data)
        response_dict = {"error": False,
                         "message": "Content History", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ContentHistorySerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Content History saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Content History"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ContentHistory.objects.all()
            history = get_object_or_404(queryset, pk=pk)
            serializer = ContentHistorySerializer(
                history, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Content History"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Content History"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ContentHistory.objects.all()
        history = get_object_or_404(queryset, pk=pk)
        serializer = ContentHistorySerializer(history, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ContentHistory.objects.all()
            history = get_object_or_404(queryset, pk=pk)
            history.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Index History"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Index History"}
        return Response(dict_response)

class TicketUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request,):
        ticket_id = self.request.query_params.get('ticket_id')
        print('REQ DATA',ticket_id)
        
        uploads = Ticket_upload.objects.filter(ticket_id=int(ticket_id))
        print("PRINT UPLOADS", uploads)

        serializer = TicketUploadSerializerWithDepth(uploads, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        file_serializer = TicketUploadSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class TicketUploadDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Ticket_upload.objects.get(pk=pk)
        except Ticket_upload.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        upload = self.get_object(pk)
        serializer = TicketUploadSerializer(upload)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        upload = self.get_object(pk)
        serializer = TicketUploadSerializer(upload, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        upload = self.get_object(pk)
        upload.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class ArchivedTicketsListView(generics.ListAPIView):
#     serializer_class=TicketSerializer
#     pagination_class = None
#     # queryset=Ticket.objects.filter(archive="Archive").order_by("-id")
#     # filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
#     # filter_fields = ('ticket_types', 'priority', 'responsible_person__id', 'created_by__id',)
#     # search_fields=('ticket_title', 'ticket_number', 'ticket_content', )
  
#     def get_queryset(self, *args, **kwargs):
#         # print('self.request.auth', self.request.auth.application.user.userprofile.user_company.id)
#         # if using body data json
#         query_filter = self.request.data.get("data")
#         start = self.request.data.get("start")
#         end = self.request.data.get("end")
#         tickets = Ticket.objects.filter(archive="Archive").order_by("-id")
#         print('QUERY FILTER', query_filter)
#         data_dict = {}
#         if query_filter is not None:
#             data_dict['tickets'] = tickets.filter(**query_filter)[start:end]
#             data_dict['count'] = tickets.count()
            
#         else:
#             data_dict['tickets'] = tickets[start:end]
#             data_dict['count'] = tickets.count()

#         return data_dict
import ast

class ArchivedTicketsViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("archiveQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)
        
        tickets = Ticket.objects.filter(archive="Archive").order_by("-id")
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            tickets = tickets.filter(**query_filter)[start:end]
            count = tickets.count()
        else:
            tickets = tickets[start:end]
            count = tickets.count()

        serializer = TicketSerializerWithDepth(
            tickets, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)