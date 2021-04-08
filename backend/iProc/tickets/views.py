from rest_framework import viewsets
from rest_framework.response import Response
from .models import Ticket, List, Ticket_upload, IndexHistory, ContentHistory
from .serializers import ListSerializer, TicketSerializer, TicketUploadSerializer, IndexHistorySerializer, ContentHistorySerializer, TicketUploadSerializerWithDepth
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
import json

from main.utils import fetch_get_data

class ListViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        all_lists = List.objects.all()
        serializer = ListSerializer(
            all_lists, many=True, context={"request": request})
        response_dict = {"error": False,
                         "message": "All lists", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ListSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "List saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving List"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = List.objects.all()
            lst = get_object_or_404(queryset, pk=pk)
            serializer = ListSerializer(
                lst, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated List"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating List"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = List.objects.all()
        lst = get_object_or_404(queryset, pk=pk)
        serializer = ListSerializer(lst, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = List.objects.all()
            lst = get_object_or_404(queryset, pk=pk)
            lst.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted List"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting List"}
        return Response(dict_response)

class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer()

    def get_queryset(self):
        ticket_all = Ticket.objects.all()
        return ticket_all

    def create(self, request, *args, **kwargs):
        ticket_data = request.data
        print(' ADDED DATA')
        print('ticket_data',ticket_data)
        new_ticket = Ticket.objects.create(ticket_title=ticket_data['ticket_title'], ticket_number=ticket_data['ticket_number'],ticket_content=ticket_data['ticket_content'], ticket_color=ticket_data['ticket_color'], created_by=User.objects.get(id=ticket_data['created_by']),  priority=ticket_data['priority'],ticket_types=ticket_data['ticket_types'],responsible_person=User.objects.get(id=ticket_data['responsible_person']),due_date=ticket_data['due_date'])
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

class IndexHistoryViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        history = IndexHistory.objects.all()
        serializer = IndexHistorySerializer(
            history, many=True, context={"request": request})
        response_dict = {"error": False,
                         "message": "IndexHistory", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = IndexHistorySerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Index History saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Index History"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = IndexHistory.objects.all()
            history = get_object_or_404(queryset, pk=pk)
            serializer = IndexHistorySerializer(
                history, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Index History"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Index History"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = IndexHistory.objects.all()
        history = get_object_or_404(queryset, pk=pk)
        serializer = IndexHistorySerializer(history, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = IndexHistory.objects.all()
            history = get_object_or_404(queryset, pk=pk)
            history.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Index History"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Index History"}
        return Response(dict_response)

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


class ArchivedTicketsViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):

        # archived_tiks = Ticket.objects.filter(archive='Archive')
        # serializer = TicketSerializer(
        #     archived_tiks, many=True, context={"request": request})
        # response_dict = {"error": False,
        #                  "message": "Archived Tickets", "data": serializer.data}
        # return Response(response_dict)

        start, end, query_filter = fetch_get_data(request)
        archived_tickets = Ticket.objects.filter(archive='Archive')
        print('DATA', archived_tickets)
        query_data_object = Ticket.objects.filter(**query_filter)[start:end]
        count = Ticket.objects.filter(**query_filter).count()
        serializer = TicketSerializer(
            query_data_object, many=True, context={"request": request})
        
        response_dict = {"error": False,
                         "message": "All archived tickets", "data": serializer.data}
        return Response(response_dict)


def archived_tickets_data_view(request):
    if request.method == "GET":
        start, end, query_filter = fetch_get_data(request)
        #archive_tickets = Tickets.objects.filter(archive='Archive')
        query_data_object = Tickets.objects.filter(**query_filter)[start:end]
        count = Tickets.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    
    else:
        return HttpResponse("NoMatch", content_type="text/json-comment-filtered")
