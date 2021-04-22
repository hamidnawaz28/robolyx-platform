from rest_framework import viewsets
from rest_framework.response import Response
from .models import VendorRequest
from .serializers import VendorRequestSerializer
import pdb
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.mail import send_mail


import json

# Create your views here.
class VendorRequestViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)
        vendor_reqs = VendorRequest.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            ven_requests = vendor_reqs.filter(**query_filter)[start:end]
            count = vendor_reqs.count()
        else:
            ven_requests = vendor_reqs[start:end]
            count = vendor_reqs.count()

        serializer = VendorRequestSerializer(
            ven_requests, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)        

    def create(self, request):
        try:
            serializer = VendorRequestSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            email = request.data["email"]
            send_mail(
                'Vendor Request',
                'Hi Robolyx is inviting you',
                'hamid.nawaz28@yahoo.com',
                [email, 'hamid.nawaz28@yahoo.com'],
                fail_silently=False,
            )
            dict_response = {"error": False,
                             "message": "Vendor Request saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Vendor Request"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = VendorRequest.objects.all()
            ven_requests = get_object_or_404(queryset, pk=pk)
            serializer = VendorRequestSerializer(
                ven_requests, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor Request"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor Request"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = VendorRequest.objects.all()
        ven_req = get_object_or_404(queryset, pk=pk)
        serializer = VendorRequestSerializer(ven_req, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = VendorRequest.objects.all()
            ven_req = get_object_or_404(queryset, pk=pk)
            ven_req.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor Request"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor Request"}
        return Response(dict_response)

