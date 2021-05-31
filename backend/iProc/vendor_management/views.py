from rest_framework import viewsets
from rest_framework.response import Response
from .models import VendorRequest, VendorTags, Categories, Trades, DiversityClassification, VendorBasicInfo, CertificatesAndLisences,\
VendorAddress, VendorFileUpload, Notes, VendorHistory, ReviewTemplate, ReviewResponse, ReviewResponseStatus, ComplianceVendorTask, \
ComplianceVendorResponse, ComplianceTaskCriteria, VendorComplianceStatus, VendorComplianceHistory, ComplianceTask
from .serializers import VendorRequestSerializer, VendorTagsSerializer, CategoriesSerializer, TradesSerializer, TradesSerializerWithDepth, \
DiversityClassificationSerializer, VendorBasicSerializer, CertAndLisencesSerializer, VendorAddressSerializer,\
VendorFileUploadSerializer, NotesSerializer, VendorHistorySerializer, ReviewTemplateSerializer, ReviewResponseSerializer, \
ReviewResponseStatusSerializer, ComplianceVendorTaskSerializer, ComplianceVendorResponseSerializer, ComplianceTaskCriteriaSerializer, \
VendorComplianceStatusSerializer, VendorComplianceHistorySerializer, PendingVendorBasicSerializer, ComplianceTaskSerializer, \
VendorBasicSerializerWithDepth, ComplianceTaskSerializer, VendorFileUploadWithDepthSerializer,ReviewResponseWithDepthSerializer
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import json
from django.http import HttpResponse, Http404

import pdb
from django.core.mail import send_mail

# Create your views here.
class VendorRequestViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
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
                json.dumps(request.data),
                'hamid.nawaz28@yahoo.com',
                [email],
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

class VendorTagsViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_vendor_cats = VendorTags.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
         
        response_dict = {}
        if query_filter is not None:
            ven_tags = all_vendor_cats.filter(**query_filter)[start:end]
            count = all_vendor_cats.count()
        else:
            ven_tags = all_vendor_cats[start:end]
            count = all_vendor_cats.count()

        serializer = VendorTagsSerializer(
            ven_tags, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        print("REQUEST DATA", request.data)
        try:
            serializer = VendorTagsSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Vendor Tag saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Vendor Tag"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = VendorTags.objects.all()
            ven_tag = get_object_or_404(queryset, pk=pk)
            serializer = VendorTagsSerializer(
                ven_tag, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor Tag"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor Tag"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = VendorTags.objects.all()
        ven_tag = get_object_or_404(queryset, pk=pk)
        serializer = VendorTagsSerializer(ven_tag, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = VendorTags.objects.all()
            ven_tag = get_object_or_404(queryset, pk=pk)
            ven_tag.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor Tag"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor Tag"}
        return Response(dict_response)

class CategoriesViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_vendor_cats = Categories.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            vendor_cats = all_vendor_cats.filter(**query_filter)[start:end]
            count = all_vendor_cats.count()
        else:
            vendor_cats = all_vendor_cats[start:end]
            count = all_vendor_cats.count()

        serializer = CategoriesSerializer(
            vendor_cats, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = CategoriesSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Vendor Category saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Vendor Category"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = Categories.objects.all()
            vendor_cat = get_object_or_404(queryset, pk=pk)
            serializer = CategoriesSerializer(
                vendor_cat, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor Category"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor Category"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = Categories.objects.all()
        vendor_cat = get_object_or_404(queryset, pk=pk)
        serializer = CategoriesSerializer(vendor_cat, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = Categories.objects.all()
            vendor_cat = get_object_or_404(queryset, pk=pk)
            vendor_cat.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor Category"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor Category"}
        return Response(dict_response)

class TradesViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_trades = Trades.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            trades = all_trades.filter(**query_filter)[start:end]
            count = all_trades.count()
        else:
            trades = all_trades[start:end]
            count = all_trades.count()

        serializer = TradesSerializer(
            trades, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = TradesSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Trade saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Trade"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = Trades.objects.all()
            trade = get_object_or_404(queryset, pk=pk)
            serializer = TradesSerializer(
                trade, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor Trade"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor Trade"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = Trades.objects.all()
        trade = get_object_or_404(queryset, pk=pk)
        serializer = TradesSerializer(trade, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = Trades.objects.all()
            trade = get_object_or_404(queryset, pk=pk)
            trade.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Trade"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Trade"}
        return Response(dict_response)

class DiversityClassificationViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = DiversityClassification.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)

        response_dict = {}
        if query_filter is not None:
            diversity = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            diversity = all_objs[start:end]
            count = all_objs.count()

        serializer = DiversityClassificationSerializer(
            diversity, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = DiversityClassificationSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Diversity Classification saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Diversity Classification"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = DiversityClassification.objects.all()
            diversity = get_object_or_404(queryset, pk=pk)
            serializer = DiversityClassificationSerializerSerializer(
                diversity, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Diversity Classification"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Diversity Classification"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = DiversityClassification.objects.all()
        diversity = get_object_or_404(queryset, pk=pk)
        serializer = DiversityClassificationSerializer(diversity, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = DiversityClassification.objects.all()
            diversity = get_object_or_404(queryset, pk=pk)
            diversity.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Diversity Classification"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Diversity Classification"}
        return Response(dict_response)

class VendorBasicViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        curr = current_page-1
        print("curr", curr)
        start = per_page * curr
        end = per_page * curr + per_page
        print('START END', start, end)


        all_objs = VendorBasicInfo.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)

        response_dict = {}
        if query_filter is not None:
            vendor_basic = all_objs.filter(**query_filter)[start:end]
            count = all_objs.filter(**query_filter).count()
        else:
            vendor_basic = all_objs[start:end]
            count = all_objs.count()

        serializer = PendingVendorBasicSerializer(
            vendor_basic, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            vendor_data = request.data
            print(' ADDED DATA')
            print('vendor_data',vendor_data)
            new_vendor = VendorBasicInfo.objects.create(vendor_name=vendor_data['vendor_name'], contact_name=vendor_data['contact_name'],contact_email=vendor_data['contact_email'], contact_phone=vendor_data['contact_phone'], designation=vendor_data['designation'], department=vendor_data['department'], created_by=User.objects.get(id=vendor_data['created_by']),  )
            new_vendor.save()

            serializer = VendorBasicSerializer(new_vendor)
            print('Vendor Serializer', serializer.data['id'])

            newvendorid=VendorBasicInfo.objects.get(id=serializer.data['id'])
            serializer1 = VendorBasicSerializer(newvendorid)

            new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=serializer.data['id']), modified_by=User.objects.get(id=vendor_data['created_by']), change_type='create', model_changed='Vendor Basic')
            new_history.save()
            dict_response = {"error": False,
                             "message": "Vendor Basic Information saved successfully", "vendorid": serializer1.data}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Vendor Basic Information"}
        return Response(dict_response)

    def update(self, request, pk=id):
        new_data = request.data
        try:
            queryset = VendorBasicInfo.objects.all()
            vendor = get_object_or_404(queryset, pk=pk)

            vendor1 = VendorBasicSerializer(vendor)
            print('vendor',vendor1.data)

            for x in new_data:
                print(new_data[x], vendor1.data[x])
                if new_data[x] != vendor1.data[x]:
                    print(x, "has changed")
                    new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=pk), modified_by=User.objects.get(id=new_data['created_by']), change_type='modified',pre_value=vendor1.data[x] , post_value=new_data[x],item_changed=x)
                    new_history.save()

            serializer = VendorBasicSerializer(
                vendor, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor"}
        except:
            dict_response = {'error':           True,
                             'message': "Error During Updating Vendor"}
        return Response(dict_response)

    def partial_update(self, request, pk=id):
        new_data = request.data
        try:
            queryset = VendorBasicInfo.objects.all()
            vendor = get_object_or_404(queryset, pk=pk)

            vendor1 = PendingVendorBasicSerializer(vendor)
            print('vendor1',vendor1.data)
            print('vendor',new_data)

            for x in new_data:
                print(new_data[x], vendor1.data[x])
                if new_data[x] != vendor1.data[x]:
                    print(x, "has changed")
                    new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=vendor1.data['id']), modified_by=User.objects.get(id=vendor1.data['created_by']), change_type='modified',pre_value=vendor1.data[x] , post_value=new_data[x],item_changed=x)
                    new_history.save()

            serializer = PendingVendorBasicSerializer(
                vendor, data=request.data, context={"request": request}, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor's Approval Status"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor's Approval Status"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = VendorBasicInfo.objects.all()
        vendor_basic = get_object_or_404(queryset, pk=pk)
        serializer = VendorBasicSerializerWithDepth(vendor_basic, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = VendorBasicInfo.objects.all()
            vendor_basic = get_object_or_404(queryset, pk=pk)

            vendor_basic1 = VendorBasicSerializer(vendor_basic)

            queryset1 = VendorHistory.objects.filter(vendor_id__id = vendor_basic1.data['id'])
            #history = ContentHistory.objects.all()
            serializer = VendorHistorySerializer(
             queryset1, many=True, context={"request": request})
            queryset1.delete()
            vendor_basic.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor Basic Information"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor Basic Information"}
        return Response(dict_response)

class CertificatesAndLisencesViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = CertificatesAndLisences.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)

        response_dict = {}
        if query_filter is not None:
            cert_n_lisc = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            cert_n_lisc = all_objs[start:end]
            count = all_objs.count()

        serializer = CertAndLisencesSerializer(
            cert_n_lisc, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            cert_data = request.data
            print(' ADDED DATA')
            print('cert_data',cert_data)
            #print(vendor_data['trades'][0])

            serializer = CertAndLisencesSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=cert_data['vendor_id']) , modified_by=User.objects.get(id=cert_data['created_by']), change_type='create', model_changed='Certificate and Licenses',)
            new_history.save()
            dict_response = {"error": False,
                             "message": "Certificate/Licenses saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Certificate/Licenses"}
        return Response(dict_response)

    def update(self, request, pk=id):
        new_data = request.data
        try:
            queryset = CertificatesAndLisences.objects.all()
            cert = get_object_or_404(queryset, pk=pk)

            cert1 = CertAndLisencesSerializer(cert)
            print('vendor',cert1.data)

            for x in new_data:
                print(new_data[x], cert1.data[x])
                if new_data[x] != cert1.data[x]:
                    print(x, "has changed")
                    new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=new_data['vendor_id']), modified_by=User.objects.get(id=new_data['created_by']), change_type='modified',pre_value=cert1.data[x] , post_value=new_data[x],item_changed=x, model_changed='Certificates and Licensec',)
                    new_history.save()

            serializer = CertAndLisencesSerializer(
                cert, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Certificate/License"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Certificate/License"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = CertificatesAndLisences.objects.all()
        cert_n_lisc = get_object_or_404(queryset, pk=pk)
        serializer = CertAndLisencesSerializer(cert_n_lisc, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = CertificatesAndLisences.objects.all()
            cert_n_lisc = get_object_or_404(queryset, pk=pk)
            cert_n_lisc.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Certificate/Lisences"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Certificate/Lisences"}
        return Response(dict_response)

#VendorAddressSerializer
class VendorAddressViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = VendorAddress.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)

        response_dict = {}
        if query_filter is not None:
            vendor_add = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            vendor_add = all_objs[start:end]
            count = all_objs.count()

        serializer = VendorAddressSerializer(
            vendor_add, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            ven_address_data = request.data
            print(' ADDED DATA')
            print('ven_address_data',ven_address_data)
            new_address = VendorAddress.objects.create(vendor_id=VendorBasicInfo.objects.get(id=ven_address_data['vendor_id']), address_type=ven_address_data['address_type'],street_address=ven_address_data['street_address'], postal_code=ven_address_data['postal_code'],  suburb_name=ven_address_data['suburb_name'], city=ven_address_data['city'], state=ven_address_data['state'], country=ven_address_data['country'], billing_status=ven_address_data['billing_status'], longitude=ven_address_data['longitude'], latitude=ven_address_data['latitude'], created_by=User.objects.get(id=ven_address_data['created_by']))
            new_address.save()

            serializer = VendorAddressSerializer(new_address)

            new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=ven_address_data['vendor_id']), modified_by=User.objects.get(id=ven_address_data['created_by']), change_type='create', model_changed= 'Vendor Address', )
            new_history.save()

            dict_response = {"error": False,
                             "message": "Vendor Address saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Address Serializer"}
        return Response(dict_response)

    def update(self, request, pk=id):
        new_data = request.data
        try:
            queryset = VendorAddress.objects.all()
            vendor = get_object_or_404(queryset, pk=pk)

            vendor1 = VendorAddressSerializer(vendor)
            print('vendor',vendor1.data)
            print('id',vendor1.data["vendor_id"])

            for x in new_data:
                print(new_data[x], vendor1.data[x])
                if new_data[x] != vendor1.data[x]:
                    print(x, "has changed")
                    #new_history = VendorHistory.objects.create(vendor_id=vendor1.data["vendor_id"], modified_by=vendor1.data["created_by"], change_type='modification',pre_value=vendor1.data[x] , post_value=new_data[x],item_changed=x, model_changed='Vendor Address')
                    new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=vendor1.data['vendor_id']), modified_by=User.objects.get(id=vendor1.data['created_by']), change_type='modification',pre_value=vendor1.data[x] , post_value=new_data[x],item_changed=x, model_changed='Vendor Address',)
                    new_history.save()

            serializer = VendorAddressSerializer(
                    vendor, data=request.data, context={"request": request}, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                                "message": "Successfully Updated Vendor Address"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor Address"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = VendorAddress.objects.all()
        vendor_add = get_object_or_404(queryset, pk=pk)
        serializer = VendorAddressSerializer(vendor_add, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = VendorAddress.objects.all()
            vendor_add = get_object_or_404(queryset, pk=pk)
            vendor_add.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor Address"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor Address"}
        return Response(dict_response)


class VendorUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request,):
        vendor_id = self.request.query_params.get('vendor_id')
        print('REQ DATA',vendor_id)

        uploads = VendorFileUpload.objects.filter(vendor_id=int(vendor_id))
        print("PRINT UPLOADS", uploads)

        serializer = VendorFileUploadWithDepthSerializer(uploads, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        upload_data = request.data
        file_serializer = VendorFileUploadSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()

            new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=upload_data['vendor_id']) , modified_by=User.objects.get(id=upload_data['uploaded_by']), change_type='create', model_changed='Vendor File Upload',)
            new_history.save()

            return Response(file_serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class VendorUploadDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return VendorFileUpload.objects.get(pk=pk)
        except VendorFileUpload.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        upload = self.get_object(pk)
        serializer = VendorFileUploadSerializer(upload)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        new_data = request.data
        upload = self.get_object(pk)
        upload1 = VendorFileUploadSerializer(upload)
        print('upload',upload1.data)
        for x in new_data:
            print(new_data[x], upload1.data[x])
            if new_data[x] != upload1.data[x]:
                print(x, "has changed")
                new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=new_data['vendor_id']), modified_by=User.objects.get(id=new_data['uploaded_by']), change_type='modified',pre_value=upload1.data[x] , post_value=new_data[x],item_changed=x, model_changed='Vendor File Upload',)
                new_history.save()

        serializer = VendorFileUploadSerializer(upload, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        upload = self.get_object(pk)
        upload.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NotesViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        vendorId = json.loads(self.request.query_params.get("vendorId"))
        all_objs = Notes.objects.all()
        print('vendorId', vendorId)
        all_ven_notes = all_objs.filter(vendor_id__id=vendorId)

        query_filter = json.loads(self.request.query_params.get("noteQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        curr_page = current_page - 1
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * curr_page
        end = per_page * curr_page + per_page
        print('START END', start, end)
        print('QUERY FILTER', query_filter, curr_page, per_page)

        response_dict = {}
        if query_filter is not None:
            vendor_notes = all_ven_notes.filter(**query_filter)[start:end]
            count = all_ven_notes.filter(**query_filter).count()
        else:
            vendor_notes = all_ven_notes[start:end]
            count = all_ven_notes.count()

        serializer = NotesSerializer(
            vendor_notes, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            notes_data = request.data
            print(' ADDED DATA')
            print('notes_data',notes_data)
            #print(vendor_data['trades'][0])

            serializer = NotesSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            print('Vendor Serializer', serializer.data['vendor_id'])

            new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=notes_data['vendor_id']) , modified_by=User.objects.get(id=notes_data['created_by']), change_type='create', model_changed='Notes',)
            new_history.save()
            dict_response = {"error": False,
                             "message": "Vendor Notes saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Vendor Notes"}
        return Response(dict_response)

    def update(self, request, pk=id):
        new_data = request.data
        try:
            queryset = Notes.objects.all()
            note = get_object_or_404(queryset, pk=pk)

            note1 = NotesSerializer(note)
            print('vendor',note1.data)

            for x in new_data:
                print(new_data[x], note1.data[x])
                if new_data[x] != note1.data[x]:
                    print(x, "has changed")
                    new_history = VendorHistory.objects.create(vendor_id=VendorBasicInfo.objects.get(id=note1.data['vendor_id']), modified_by=User.objects.get(id=note1.data['created_by']), change_type='modification',pre_value=note1.data[x] , post_value=new_data[x],item_changed=x, model_changed='Notes',)
                    new_history.save()

            serializer = NotesSerializer(
                    note, data=request.data, context={"request": request}, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Note"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Note"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = Notes.objects.all()
        vendor_note = get_object_or_404(queryset, pk=pk)
        serializer = NotesSerializer(vendor_note, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = Notes.objects.all()
            vendor_note = get_object_or_404(queryset, pk=pk)
            vendor_note.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor Note"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor Note"}
        return Response(dict_response)

class VendorHistoryViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        vendor_id = self.request.query_params.get('vendor_id')
        print('REQ DATA',vendor_id)
        history = VendorHistory.objects.filter(vendor_id=int(vendor_id))


        serializer = VendorHistorySerializer(
            history, many=True, context={"request": request})
        print("DATA", serializer.data)
        response_dict = {"error": False,
                         "message": "Vendor History", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = VendorHistorySerializer(
                data=request.data, context={"request": request}, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Vendor History saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Vendor History"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = VendorHistory.objects.all()
            history = get_object_or_404(queryset, pk=pk)
            serializer = VendorHistorySerializer(
                history, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor History"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor History"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = VendorHistory.objects.all()
        history = get_object_or_404(queryset, pk=pk)
        serializer = VendorHistorySerializer(history, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = VendorHistory.objects.all()
            history = get_object_or_404(queryset, pk=pk)
            history.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor History"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor History"}
        return Response(dict_response)


class ReviewTemplateAllList(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        all_objs = ReviewTemplate.objects.all()
        serializer = ReviewTemplateSerializer(
            all_objs, many=True, context={"request": request})

       
        return Response(serializer.data)

    

class ReviewTemplateViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("query_review_temp"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        curr = current_page-1
        print("curr", curr)
        start = per_page * curr
        end = per_page * curr + per_page
        print('START END', start, end)

        all_objs = ReviewTemplate.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            review_templates = all_objs.filter(**query_filter)[start:end]
            count = all_objs.filter(**query_filter).count()
        else:
            review_templates = all_objs[start:end]
            count = all_objs.count()

        serializer = ReviewTemplateSerializer(
            review_templates, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ReviewTemplateSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Review Template saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Review Template"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ReviewTemplate.objects.all()
            review_temp = get_object_or_404(queryset, pk=pk)
            serializer = ReviewTemplateSerializer(
                review_temp, data=request.data, context={"request": request}, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Review Template"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Review Template"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ReviewTemplate.objects.all()
        review_template = get_object_or_404(queryset, pk=pk)
        serializer = ReviewTemplateSerializer(review_template, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ReviewTemplate.objects.all()
            review_template = get_object_or_404(queryset, pk=pk)
            review_template.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Review Template"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Review Template"}
        return Response(dict_response)


class ComplianceTaskViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("query_compliance"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        curr = current_page-1
        print("curr", curr)
        start = per_page * curr
        end = per_page * curr + per_page
        print('START END', start, end)

        all_objs = ComplianceTask.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            compliance_tasks = all_objs.filter(**query_filter)[start:end]
            count = all_objs.filter(**query_filter).count()
        else:
            compliance_tasks = all_objs[start:end]
            count = all_objs.count()

        serializer = ComplianceTaskSerializer(
            compliance_tasks, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ComplianceTaskSerializer(
                data=request.data, context={"request": request}, partial=True,)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Compliance saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Compliance"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ComplianceTask.objects.all()
            compliance_task = get_object_or_404(queryset, pk=pk)
            serializer = ComplianceTaskSerializer(
                compliance_task, data=request.data, context={"request": request}, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Compliance Task"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Compliance Task"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ComplianceTask.objects.all()
        compliance_task = get_object_or_404(queryset, pk=pk)
        serializer = ComplianceTaskSerializer(compliance_task, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ComplianceTask.objects.all()
            review_template = get_object_or_404(queryset, pk=pk)
            review_template.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Compliance Task"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Compliance Task"}
        return Response(dict_response)


class ReviewResponseViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = ReviewResponse.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            review_respnse = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            review_respnse = all_objs[start:end]
            count = all_objs.count()

        serializer = ReviewResponseSerializer(
            review_respnse, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ReviewResponseSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Review Response saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Review Response"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ReviewResponse.objects.all()
            review_response = get_object_or_404(queryset, pk=pk)
            serializer = ReviewResponseSerializer(
                review_response, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Review Response"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Review Response"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ReviewResponse.objects.all()
        review_response = get_object_or_404(queryset, pk=pk)
        serializer = ReviewResponseSerializer(review_response, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ReviewResponse.objects.all()
            review_response = get_object_or_404(queryset, pk=pk)
            review_response.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Review Response"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Review Response"}
        return Response(dict_response)

#ReviewResponseStatus
class ReviewResponseStatusViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        vendorId = json.loads(self.request.query_params.get("vendorId"))
        all_objs = ReviewResponseStatus.objects.all()
        print('vendorId', vendorId)
        ven_review_list = all_objs.filter(vendor_id__id=vendorId)
        query_filter = json.loads(self.request.query_params.get("searchVenReview"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        curr = current_page-1
        start = per_page * curr
        end = per_page * curr + per_page
        print('START END', start, end)
        print('QUERY FILTER', query_filter, current_page, per_page)
        print('all objects',all_objs)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            review_respnse_status = ven_review_list.filter(**query_filter)[start:end]
            count = ven_review_list.filter(**query_filter).count()
        else:
            review_respnse_status = ven_review_list[start:end]
            count = ven_review_list.count()

        serializer = ReviewResponseWithDepthSerializer(
            review_respnse_status, many=True, context={"request": request})
        
        print('filtered Data',serializer.data)

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ReviewResponseStatusSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Review Response Status saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Review Response Status"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ReviewResponseStatus.objects.all()
            review_response_status = get_object_or_404(queryset, pk=pk)
            serializer = ReviewResponseStatusSerializer(
                review_response_status, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Review Response Status"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Review Response Status"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ReviewResponseStatus.objects.all()
        review_response_status = get_object_or_404(queryset, pk=pk)
        serializer = ReviewResponseStatusSerializer(review_response_status, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ReviewResponseStatus.objects.all()
            review_response_status = get_object_or_404(queryset, pk=pk)
            review_response_status.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Review Response Status"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Review Response Status"}
        return Response(dict_response)

class ComplianceVendorTaskViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = ComplianceVendorTask.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            compliance_ven_tasks = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            compliance_ven_tasks = all_objs[start:end]
            count = all_objs.count()

        serializer = ComplianceVendorTaskSerializer(
            compliance_ven_tasks, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ComplianceVendorTaskSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Compliance Vendor Task saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Compliance Vendor Task"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ComplianceVendorTask.objects.all()
            compliance_ven_tasks = get_object_or_404(queryset, pk=pk)
            serializer = ComplianceVendorTaskSerializer(
                compliance_ven_tasks, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Compliance Vendor Task"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Compliance Vendor Task"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ComplianceVendorTask.objects.all()
        compliance_ven_tasks = get_object_or_404(queryset, pk=pk)
        serializer = ComplianceVendorTaskSerializer(compliance_ven_tasks, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ComplianceVendorTask.objects.all()
            compliance_ven_tasks = get_object_or_404(queryset, pk=pk)
            compliance_ven_tasks.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Compliance Vendor Task"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Compliance Vendor Task"}
        return Response(dict_response)

class ComplianceVendorResponseViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = ComplianceVendorResponse.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            compliance_ven_response = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            compliance_ven_response = all_objs[start:end]
            count = all_objs.count()

        serializer = ComplianceVendorResponseSerializer(
            compliance_ven_response, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ComplianceVendorResponseSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Compliance Vendor Response saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Compliance Vendor Response"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ComplianceVendorResponse.objects.all()
            compliance_ven_response = get_object_or_404(queryset, pk=pk)
            serializer = ComplianceVendorResponseSerializer(
                compliance_ven_response, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Compliance Vendor Response"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Compliance Vendor Response"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ComplianceVendorResponse.objects.all()
        compliance_ven_response = get_object_or_404(queryset, pk=pk)
        serializer = ComplianceVendorResponseSerializer(compliance_ven_response, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ComplianceVendorResponse.objects.all()
            compliance_ven_response = get_object_or_404(queryset, pk=pk)
            compliance_ven_response.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Compliance Vendor Response"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Compliance Vendor Response"}
        return Response(dict_response)

class ComplianceTaskCriteriaViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = ComplianceTaskCriteria.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            comp_task_criteria = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            comp_task_criteria = all_objs[start:end]
            count = all_objs.count()

        serializer = ComplianceTaskCriteriaSerializer(
            comp_task_criteria, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ComplianceTaskCriteriaSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Compliance Task Criteria saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Review Response Status"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ComplianceTaskCriteria.objects.all()
            comp_task_criteria = get_object_or_404(queryset, pk=pk)
            serializer = ComplianceTaskCriteriaSerializer(
                comp_task_criteria, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Compliance Task Criteria"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Compliance Task Criteria"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ComplianceTaskCriteria.objects.all()
        comp_task_criteria = get_object_or_404(queryset, pk=pk)
        serializer = ComplianceTaskCriteriaSerializer(comp_task_criteria, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ComplianceTaskCriteria.objects.all()
            comp_task_criteria = get_object_or_404(queryset, pk=pk)
            comp_task_criteria.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Compliance Task Criteria"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Compliance Task Criteria"}
        return Response(dict_response)

class VendorComplianceStatusViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = VendorComplianceStatus.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            ven_comp_status = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            ven_comp_status = all_objs[start:end]
            count = all_objs.count()

        serializer = VendorComplianceStatusSerializer(
            ven_comp_status, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = VendorComplianceStatusSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Vendor Compliance Status saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Vendor Compliance Status"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = VendorComplianceStatus.objects.all()
            ven_comp_status = get_object_or_404(queryset, pk=pk)
            serializer = VendorComplianceStatusSerializer(
                ven_comp_status, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor Compliance Status"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor Compliance Status"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = VendorComplianceStatus.objects.all()
        ven_comp_status = get_object_or_404(queryset, pk=pk)
        serializer = VendorComplianceStatusSerializer(ven_comp_status, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = VendorComplianceStatus.objects.all()
            ven_comp_status = get_object_or_404(queryset, pk=pk)
            ven_comp_status.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor Compliance Status"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor Compliance Status"}
        return Response(dict_response)

#VendorComplianceHistory
class VendorComplianceHistoryViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)

        all_objs = VendorComplianceHistory.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            ven_comp_history = all_objs.filter(**query_filter)[start:end]
            count = all_objs.count()
        else:
            ven_comp_history = all_objs[start:end]
            count = all_objs.count()

        serializer = VendorComplianceHistorySerializer(
            ven_comp_history, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

    def create(self, request):
        try:
            serializer = VendorComplianceHistorySerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Vendor Compliance History saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Vendor Compliance History"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = VendorComplianceHistory.objects.all()
            ven_comp_history = get_object_or_404(queryset, pk=pk)
            serializer = VendorComplianceHistorySerializer(
                ven_comp_history, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Vendor Compliance History"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Vendor Compliance History"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = VendorComplianceHistory.objects.all()
        ven_comp_history = get_object_or_404(queryset, pk=pk)
        serializer = VendorComplianceHistorySerializer(ven_comp_history, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = VendorComplianceHistory.objects.all()
            ven_comp_history = get_object_or_404(queryset, pk=pk)
            ven_comp_history.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Vendor Compliance History"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Vendor Compliance History"}
        return Response(dict_response)

class ApprovedVendorsViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("query_vendor_onboard"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        curr = current_page-1
        print("curr", curr)
        start = per_page * curr
        end = per_page * curr + per_page
        print('START END', start, end)

        all_objs = VendorBasicInfo.ApprovedVendors.all().order_by('-id')
        
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            approved_vendors = all_objs.filter(**query_filter)[start:end]
            count = all_objs.filter(**query_filter).count()
        else:
            approved_vendors = all_objs[start:end]
            count = all_objs.count()

        serializer = VendorBasicSerializerWithDepth(
            approved_vendors, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

class PendingVendorsViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("query"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        curr = current_page-1
        print("curr", curr)
        start = per_page * curr
        end = per_page * curr + per_page
        print('START END', start, end)

        all_objs = VendorBasicInfo.PendingVendors.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            pending_vendors = all_objs.filter(**query_filter)[start:end]
            count = all_objs.filter(**query_filter).count()
        else:
            pending_vendors = all_objs[start:end]
            count = all_objs.count()

        serializer = VendorBasicSerializer(
            pending_vendors, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)

class VendorTagsList(viewsets.ModelViewSet):
    queryset=VendorTags.objects.all()
    serializer_class=VendorTagsSerializer

class VendorTradesList(viewsets.ModelViewSet):
    queryset=Trades.objects.all()
    serializer_class=TradesSerializer

class VendorCategoriesList(viewsets.ModelViewSet):
    queryset=Categories.objects.all()
    serializer_class=CategoriesSerializer

class DiversityClassificationList(viewsets.ModelViewSet):
    queryset=DiversityClassification.objects.all()
    serializer_class=DiversityClassificationSerializer

class CertificatesAndLiscenceList(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        vendorId = self.request.query_params.get("vendorId")

        all_objs = CertificatesAndLisences.objects.all()
        print('vendorId', vendorId)
        response_dict = {}
        cert_n_lisc = all_objs.filter(vendor_id__id=vendorId)
        count = all_objs.filter(vendor_id__id=vendorId).count()

        serializer = CertAndLisencesSerializer(
            cert_n_lisc, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)


class IndividualVendorAddresses(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        vendorId = self.request.query_params.get("vendorId")

        all_objs = VendorAddress.objects.all()
        print('vendorId', vendorId)
        response_dict = {}
        ven_add = all_objs.filter(vendor_id__id=vendorId)
        count = all_objs.filter(vendor_id__id=vendorId).count()

        serializer = VendorAddressSerializer(
            ven_add, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)
