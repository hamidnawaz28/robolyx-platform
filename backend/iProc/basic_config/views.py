from rest_framework import viewsets
from rest_framework.response import Response
from .models import BusinessUnit, Department, Regions, Divisions, Sites, Tags
from .serializers import BusinessUnitSerializer, DepartmentSerializer, RegionsSerializer, DivisionsSerializer, SitesSerializer, TagsSerializer
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import json
from django.core import serializers as serial

def get_serialized_data(query_data_object, count):
    query_data_serialized = serial.serialize("json", query_data_object)
    data_details = {'count': count, 'queryData': query_data_serialized}
    return json.dumps(data_details)


# Create your views here.
class BusinessUnitViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("query"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)
        
        buss_units = BusinessUnit.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            b_units = buss_units.filter(**query_filter)[start:end]
            count = buss_units.count()
        else:
            b_units = buss_units[start:end]
            count = buss_units.count()

        serialized_data = get_serialized_data(b_units, count)

        #serializer = BusinessUnitSerializer(
        #    b_units, many=True, context={"request": request})

        # response_dict = {'data': serializer.data,
        #                      'count': count}

        return Response(serialized_data)        

    def create(self, request):
        try:
            serializer = BusinessUnitSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Business Unit saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Business Unit"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = BusinessUnit.objects.all()
            buss_unit = get_object_or_404(queryset, pk=pk)
            serializer = BusinessUnitSerializer(
                buss_unit, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Business Unit"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Business Unit"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = BusinessUnit.objects.all()
        buss_unit = get_object_or_404(queryset, pk=pk)
        serializer = BusinessUnitSerializer(buss_unit, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = BusinessUnit.objects.all()
            buss_unit = get_object_or_404(queryset, pk=pk)
            buss_unit.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Business Unit"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Business Unit"}
        return Response(dict_response)

class DepartmentViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)
        
        deps = Department.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            departments = deps.filter(**query_filter)[start:end]
            count = deps.count()
        else:
            departments = deps[start:end]
            count = deps.count()

        serializer = DepartmentSerializer(
            departments, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)        

    def create(self, request):
        try:
            serializer = DepartmentSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Department saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Department"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = Department.objects.all()
            depts = get_object_or_404(queryset, pk=pk)
            serializer = DepartmentSerializer(
                depts, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Department"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Department"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = Department.objects.all()
        dept = get_object_or_404(queryset, pk=pk)
        serializer = DepartmentSerializer(dept, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = Department.objects.all()
            dept = get_object_or_404(queryset, pk=pk)
            dept.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Deparment"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Deparment"}
        return Response(dict_response)

class TagsViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)
        
        all_tags = Tags.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            tags = all_tags.filter(**query_filter)[start:end]
            count = all_tags.count()
        else:
            tags = all_tags[start:end]
            count = all_tags.count()

        serializer = TagsSerializer(
            tags, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)        

    def create(self, request):
        try:
            serializer = TagsSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Tag saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Tag"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = Tags.objects.all()
            tag = get_object_or_404(queryset, pk=pk)
            serializer = TagsSerializer(
                tag, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Tag"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Tag"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = Tags.objects.all()
        tag = get_object_or_404(queryset, pk=pk)
        serializer = TagsSerializer(tag, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = Tags.objects.all()
            tag = get_object_or_404(queryset, pk=pk)
            tag.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Tag"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Tag"}
        return Response(dict_response)

class RegionsViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("query"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)
        
        all_regions = Regions.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            regions = all_regions.filter(**query_filter)[start:end]
            count = all_regions.count()
        else:
            regions = all_regions[start:end]
            count = all_regions.count()

        serializer = RegionsSerializer(
            regions, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)        

    def create(self, request):
        try:
            serializer = RegionsSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Region saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Region"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = Regions.objects.all()
            region = get_object_or_404(queryset, pk=pk)
            serializer = RegionsSerializer(
                region, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Region"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Region"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = Regions.objects.all()
        region = get_object_or_404(queryset, pk=pk)
        serializer = RegionsSerializer(region, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = Regions.objects.all()
            region = get_object_or_404(queryset, pk=pk)
            region.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Region"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Region"}
        return Response(dict_response)

class DivisionsViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)
        
        all_divs = Divisions.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            divs = all_divs.filter(**query_filter)[start:end]
            count = all_divs.count()
        else:
            divs = all_divs[start:end]
            count = all_divs.count()

        serializer = DivisionsSerializer(
            divs, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)        

    def create(self, request):
        try:
            serializer = DivisionsSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Division saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Division"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = Divisions.objects.all()
            div = get_object_or_404(queryset, pk=pk)
            serializer = DivisionsSerializer(
                div, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Division"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Division"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = Divisions.objects.all()
        div = get_object_or_404(queryset, pk=pk)
        serializer = DivisionsSerializer(div, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = Divisions.objects.all()
            div = get_object_or_404(queryset, pk=pk)
            div.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Division"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Division"}
        return Response(dict_response)

class SitesViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("searchQuery"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        print('START END', start, end)
        
        all_sites = Sites.objects.all()
        print('QUERY FILTER', query_filter, current_page, per_page)
        #query_filter = ast.literal_eval(query_filter)
        response_dict = {}
        if query_filter is not None:
            sites = all_sites.filter(**query_filter)[start:end]
            count = all_sites.count()
        else:
            sites = all_sites[start:end]
            count = all_sites.count()

        serializer = SitesSerializer(
            sites, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}

        return Response(response_dict)        

    def create(self, request):
        try:
            serializer = SitesSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Site saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Site"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = Sites.objects.all()
            site = get_object_or_404(queryset, pk=pk)
            serializer = SitesSerializer(
                site, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Site"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating Site"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = Sites.objects.all()
        site = get_object_or_404(queryset, pk=pk)
        serializer = SitesSerializer(site, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = Sites.objects.all()
            site = get_object_or_404(queryset, pk=pk)
            site.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted Site"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting Site"}
        return Response(dict_response)