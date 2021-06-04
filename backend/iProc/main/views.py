# from .mappingserielizer import TodoSerializer
from django.db.models import Q
from django.http import HttpResponse
import json
from django.http import JsonResponse
from main.models import TaxonomyData, InvoiceData, ContractData, GLOrgData, POData, \
    UserProject, RuleEngine, DefaultTemplate, SavedTemplate, UserData, Role
from django.core import serializers
import pdb
from itertools import chain
from django.db.models import Count
from rest_framework import serializers as ser
from .utils import taxonomy_items_and_count, get_data_range
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.models import User
from rest_framework.generics import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import userListSerializer
import pandas as pd
import time
import os
from django.db import IntegrityError,transaction
from .serializers import RoleSerializer,  UserProjectSerializer,  UserDataSerializer, DefaultTemplateSerializer, SavedTemplateSerializer, \
RuleEngineSerializer, RuleEngineHistorySerializer, InvoiceDataSerializer, TaxonomyDataSerializer, ContractDataSerializer, GLOrgDataSerializer, PODataSerializer, ImpactRuleEngineSerializer,FileUploadSerializer
from main.tasks import add_data 
def fetch_get_data(request):
    query = json.loads(request.GET.get("query"))
    start, end = get_data_range(request)
    project_pk = request.GET.get("project")
    project_reference_object = UserProject.objects.get(pk=project_pk)
    query_filter = {'UserProjectReference': project_reference_object}
    for key in query:
        if query[key] != '':
            query_filter[key] = query[key]
    return start, end, query_filter


def fetch_del_data(request):
    project_pk = request.GET.get("project")
    project_reference_object = UserProject.objects.get(pk=project_pk)
    pk_list = json.loads(request.GET.get("pkArray"))
    return pk_list, project_reference_object


def fetch_post_data(request):
    body_parameters = json.loads(request.body)["params"]
    project_pk = body_parameters["project"]
    project_reference_object = UserProject.objects.get(pk=project_pk)
    payload = json.loads(body_parameters["payload"])
    payload["UserProjectReference"] = project_reference_object
    return payload


def fetch_put_data(request):
    body_parameters = json.loads(request.body)["params"]
    taxonomy_pk = body_parameters["pk"]
    payload = json.loads(body_parameters["payload"])
    return payload, taxonomy_pk


def get_serialized_data(query_data_object, count):
    query_data_serialized = serializers.serialize("json", query_data_object)
    data_details = {'count': count, 'queryData': query_data_serialized}
    return json.dumps(data_details)


def fetch_post_template_data(request):
    request_body_parameters = json.loads(request.body)
    request_body_payload = json.loads(request_body_parameters["params"]["payload"])
    payload = {"templateName": request_body_payload["templateName"],
               "templateMapping": request_body_payload["templateMapping"],
               "fileColumns": request_body_payload["fileColumns"]}

    table_name_pk = request_body_payload["table"]
    project_pk = request_body_payload["project"]
    payload["DataTableReference"] = DefaultTemplate.objects.get(pk=table_name_pk)
    payload["UserProjectReference"] = UserProject.objects.get(pk=project_pk)
    create_new_template = SavedTemplate(**payload)
    create_new_template.save()
    return payload

class DefaultTemplateViewSet(viewsets.ViewSet):
    def list(self, request):
        all_data = DefaultTemplate.objects.all()

        serializer = DefaultTemplateSerializer(
            all_data, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': all_data.count()}
        return Response(response_dict)
class SavedTemplateViewSet(viewsets.ViewSet):
    def list(self, request):
        project_pk = request.GET.get("project")
        project_reference_object = UserProject.objects.get(pk=project_pk)
        default_template_pk = request.GET.get("defaultTemplateReference")
        default_template_object = DefaultTemplate.objects.get(pk=default_template_pk)
        saved_templates_object = SavedTemplate.objects.filter(DataTableReference=default_template_object,
                                                              UserProjectReference=project_reference_object)
        serializer = SavedTemplateSerializer(
            saved_templates_object, many=True, context={"request": request})
        
        response_dict = {
                            'data': serializer.data,
                            'count': saved_templates_object.count()
                        }
        return Response(response_dict)


class ManageTemplates(viewsets.ViewSet):
    def list(self, request):
        query = json.loads(request.GET.get("q"))
        project_pk = request.GET.get("project")
        start, end = get_data_range(request)
        project_reference_object = UserProject.objects.get(pk=project_pk)
        query_filter = {'UserProjectReference': project_reference_object}
        for key in query:
            if query[key] != '':
                query_filter[key] = query[key]
        saved_templates_object = SavedTemplate.objects.filter(**query_filter)[start:end]        
        serializer = SavedTemplateSerializer(
            saved_templates_object, many=True, context={"request": request})
        response_dict = {
                            'data': serializer.data,
                            'count': saved_templates_object.count()
                        }
        return Response(response_dict)
    def create(self, request):
        request_body_parameters = json.loads(request.body)
        request_body_payload = json.loads(request_body_parameters["params"]["payload"])
        payload = {"MappingName": request_body_payload["templateName"],
                   "MappedItems": request_body_payload["templateMapping"],
                   "FileColumns": request_body_payload["fileColumns"]}

        table_name_pk = request_body_payload["table"]
        project_pk = request_body_payload["project"]
        payload["DataTableReference"] = DefaultTemplate.objects.get(pk=table_name_pk)
        payload["UserProjectReference"] = UserProject.objects.get(pk=project_pk)
        create_new_template = SavedTemplate(**payload)
        create_new_template.save()
        return HttpResponse("Successfully added new template", content_type="text/json-comment-filtered")
    def update(self, request, pk=id):
        request_body_parameters = json.loads(request.body)
        request_body_payload = json.loads(request_body_parameters["params"]["payload"])
        payload = {
                    "MappingName": request_body_payload["templateName"],
                    "MappedItems": request_body_payload["templateMapping"],
                    "FileColumns": request_body_payload["fileColumns"]
                }
        saved_template_pk = request_body_parameters["params"]['id']
        template_object = SavedTemplate.objects.get(pk=saved_template_pk)
        for item in payload:
            setattr(template_object, item, payload[item])
        template_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")
    def destroy(self, request, pk=id):
        try:
            queryset = SavedTemplate.objects.all()
            responce_object = get_object_or_404(queryset, pk=pk)
            responce_object.delete()
            dict_response = {
                                "error": False,
                                "message": "Successfully Deleted"
                            }
        except:
            dict_response = {
                                'error': True,
                                'message': "Error During Deleting"
                            }   
        return Response(dict_response)

class FileUpload(viewsets.ViewSet):

    
    def create(self, request):
        error_row = ''
        try:
            data = request.data
            file_obj= data['file']
            project = data['project']
            default_template_pk = data['defaultTemplate']
            saved_template_pk = data['savedTemplate']
            saved_template_obj = SavedTemplate.objects.get(pk=saved_template_pk)
            default_template_obj = DefaultTemplate.objects.get(pk=default_template_pk)
            default_table_name = default_template_obj.TableName
            saved_mapping = json.loads(saved_template_obj.MappedItems)
            file_obj.name = str(int(time.time())) +'_'+ file_obj.name
            file_name = file_obj.name
            path = os.path.abspath(os.getcwd())
            file_payload  = {"UserProjectReference":data['project'], "FILE": file_obj, "STATUS":'Uploading'}
            serializer = FileUploadSerializer(
                data=file_payload, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            print("---------1---------")
            # add_data.delay(path,file_obj.name,default_template_pk,saved_mapping, project  )
            add_data(path,file_obj.name,default_template_pk,saved_mapping, project  )
            print("---------2---------")
            # df_json = json.loads(json.dumps(list(df.T.to_dict().values())))
            # table = DefaultTemplate.objects.get(pk=default_template_pk)
            # table_name = table.TableName
            # with transaction.atomic():
            #     for payload_index in range(len(df_json)):
            #         error_row = payload_index+1
            #         payload =  df_json[payload_index]
            #         # if(payload_index==len(df_json)-1):
            #         #     payload['UserProjectReference']=1
            #         # else:
            #         add_data()
            #         payload['UserProjectReference']= UserProject.objects.get(pk=project)
            #         if table_name == 'invoice' or table_name == 'invoiceWOD':
            #             new_object = InvoiceData.objects.create(**payload)
            #         elif table_name == 'taxonomy':
            #             new_object = TaxonomyData.objects.create(**payload)
            #         elif table_name=='Contract':
            #             new_object = ContractData.objects.create(**payload)
            #         elif table_name=='GLOrg':
            #             new_object = GLOrgData.objects.create(**payload)
            #         elif table_name=='PurchaseOrder':
            #             new_object = POData.objects.create(**payload)
            dict_response = {"error": False,
                            "message": "File commited for processing"}
        except Exception as err:
            print('Error--------'+str(err))
            dict_response = {'error': True,
                                'message': "Error---"+str(err)}
        return Response(dict_response)
            
class FileImport(viewsets.ViewSet):
    def create(self, request):
        request_body_parameters = json.loads(request.body)
        columns_name = request_body_parameters["columnsName"]
        columns_data = request_body_parameters["columnsData"]
        project_pk = request_body_parameters["project"]
        project_reference_object = UserProject.objects.get(pk=project_pk)
        table = request_body_parameters["table"]
        table = DefaultTemplate.objects.get(pk=table)
        table = table.TableName
        if table == 'invoice' or table == 'invoiceWOD':
            for dataIndex in range(len(columns_data[0])):
                payload = {"UserProjectReference": project_reference_object}
                for columnIndex in range(len(columns_name)):
                    payload[columns_name[columnIndex]] = columns_data[columnIndex][dataIndex]
                new_object = InvoiceData.objects.create(**payload)
                new_object.save()
        if table == 'taxonomy':
            for dataIndex in range(len(columns_data[0])):
                payload = {"UserProjectReference": project_reference_object}
                for columnIndex in range(len(columns_name)):
                    payload[columns_name[columnIndex]] = columns_data[columnIndex][dataIndex]
                payload = taxonomy_items_and_count(payload)
                new_object = TaxonomyData.objects.create(**payload)
                new_object.save()
        if table == 'Contract':
            for dataIndex in range(len(columns_data[0])):
                payload = {"UserProjectReference": project_reference_object}
                for columnIndex in range(len(columns_name)):
                    payload[columns_name[columnIndex]] = columns_data[columnIndex][dataIndex]
                new_object = ContractData.objects.create(**payload)
                new_object.save()
        if table == 'GLOrg':
            for dataIndex in range(len(columns_data[0])):
                payload = {"UserProjectReference": project_reference_object}
                for columnIndex in range(len(columns_name)):
                    payload[columns_name[columnIndex]] = columns_data[columnIndex][dataIndex]
                new_object = GLOrgData.objects.create(**payload)
                new_object.save()
        if table == 'PurchaseOrder':
            for dataIndex in range(len(columns_data[0])):
                payload = {"UserProjectReference": project_reference_object}
                for columnIndex in range(len(columns_name)):
                    payload[columns_name[columnIndex]] = columns_data[columnIndex][dataIndex]
                new_object = POData.objects.create(**payload)
                new_object.save()
        return HttpResponse("Successfully added " + str(len(columns_data[0])) + " rows",
                            content_type="text/json-comment-filtered")


class UtilsViewSet(viewsets.ViewSet):
    def list(self, request):
        project_pk = request.GET.get("project")
        data_type = request.GET.get("type")
        project_reference_object = UserProject.objects.get(pk=project_pk)
        if data_type == 'TaxonomyCategories':
            data = {}
            categories = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]
            for value in categories:
                taxonomy_data_object = TaxonomyData.objects.filter(
                    **{"UserProjectReference": project_reference_object}).values(
                    "CATEGORY_LEVEL_" + value).distinct()
                category_arr = []
                for allData in taxonomy_data_object:
                    data_item = allData["CATEGORY_LEVEL_" + value]
                    category_arr.append(data_item)
                data["CATEGORY_LEVEL_" + value] = category_arr
            return JsonResponse(data, content_type="text/json-comment-filtered")
        if data_type == 'DraftRulesPK':
            drafted_rules = RuleEngine.objects.filter(
                UserProjectReference=project_reference_object, STATUS="draft").values('pk').distinct()
            drafted_rules_arr = []
            for item in drafted_rules:
                drafted_rules_arr.append(item['pk'])
            return HttpResponse(json.dumps(drafted_rules_arr), content_type="text/json-comment-filtered")
        if data_type == 'ImplementedRulesPK':
            implemented_rules = RuleEngine.objects.filter(
                UserProjectReference=project_reference_object, STATUS="implemented").values('pk').distinct()
            implemented_rules_arr = []
            for item in implemented_rules:
                implemented_rules_arr.append(item['pk'])
            return HttpResponse(json.dumps(implemented_rules_arr), content_type="text/json-comment-filtered")
        if data_type == 'InvoicesPK':
            all_invoices = InvoiceData.objects.filter(
                UserProjectReference=project_reference_object).values('pk').distinct()
            all_invoices_arr = []
            for item in all_invoices:
                all_invoices_arr.append(item['pk'])
            return HttpResponse(json.dumps(all_invoices_arr), content_type="text/json-comment-filtered")
        if data_type == 'RolesList':
            roles_data = Role.objects.all()
            roles_data_serialized = serializers.serialize("json", roles_data)
            return HttpResponse(roles_data_serialized, content_type="text/json-comment-filtered")
        else:
            return HttpResponse("No Match", content_type="text/json-comment-filtered")
# def RuleEngineImplementation(request:
#     if(request.method=='POST':
#         requestBodyParameters = json.loads(request.body)
#         pkList = requestBodyParameters["pkList"]
#         UserProjectReference = requestBodyParameters["UserProjectReference"]
#         UserProjectReference = UserProject.objects.get(pk=UserProjectReference)


class FindUserViewSet(viewsets.ViewSet):
    def list(self, request):
        username = request.GET.get('username')
        email = request.GET.get('email')
        user_object = ''
        if username:
            user_object = User.objects.filter(username=username)
            user_object = UserData.objects.filter(User=user_object)
        else:
            user_object = UserData.objects.filter(Email=email)
        if user_object:
            user_data_serialized = serializers.serialize("json", user_object)
            return HttpResponse(user_data_serialized, content_type="text/json-comment-filtered")
        else:
            return HttpResponse(0, content_type="text/json-comment-filtered")


class RuleEngineData(viewsets.ViewSet):
    def list(self, request):
        project_pk = request.GET.get("project")
        rule_type = request.GET.get("type")
        
        project_reference_object = UserProject.objects.get(pk=project_pk)
        if rule_type == 'AllRules':
            rules = RuleEngine.objects.filter(UserProjectReference=project_reference_object).values('pk').distinct()
            category_arr = []
            for item in rules:
                category_arr.append(item['pk'])
            return HttpResponse(json.dumps(category_arr), content_type="text/json-comment-filtered")
        if rule_type == 'RuleData':
            rule_pk = request.GET.get("RulePk")
            rule_data_object = RuleEngine.objects.RuleEngineViewSet(UserProjectReference=project_reference_object, pk=rule_pk)
            rule_data_serialized = serializers.serialize("json", rule_data_object)
            return HttpResponse(rule_data_serialized, content_type="text/json-comment-filtered")


class InvoiceByRule(viewsets.ViewSet):
    def list(self, request):
        query = json.loads(request.GET.get("q"))
        project_pk = request.GET.get("project")
        project_reference_object = UserProject.objects.get(pk=project_pk)
        start, end = get_data_range(request)
        query_filter = {"UserProjectReference": project_reference_object}
        for item in query:
            if query[item] != "":
                query_filter[item] = query[item]
        rule_data_object = RuleEngine.objects.filter(**query_filter)
        if len(rule_data_object):
            query = Q(RuleEngineReference=rule_data_object[0].pk)
            # if len(ruleData[0]>1:
            #     query = reduce(or_, (Q(RuleEngineReference=rule.pk) for rule in ruleData))
            for rule in rule_data_object[1:]:
                query |= Q(RuleEngineReference=rule.pk)
            invoice_data_object = InvoiceData.objects.filter(query)[start:end]
            count = InvoiceData.objects.filter(query).count()
            serializer = InvoiceDataSerializer(
                invoice_data_object, many=True, context={"request": request})
            response_dict = {
                                'data': serializer.data,
                                'count': count
                            }
            return Response(response_dict)
        else:
            response_dict = {
                                'data': [],
                                'count': 0
                            }
            return Response(response_dict)


class OverWrittenRules(viewsets.ViewSet):
    def list(self, request):
        query = json.loads(request.GET.get("q"))
        start, end = get_data_range(request)
        project_pk = request.GET.get("project")
        project_reference_object = UserProject.objects.get(pk=project_pk)
        query_filter = {
                "UserProjectReference": project_reference_object
            }
        for item in query:
            if query[item] != '':
                query_filter[item] = query[item]
        invoice = InvoiceData.objects.filter(**query_filter)
        if invoice[0].RULES_HISTORY is not None:
            rules_pk_arr = json.loads(invoice[0].RULES_HISTORY)
            query = Q(pk=rules_pk_arr[0])
            for rule in rules_pk_arr[1:]:
                query |= Q(pk=rule)
            rules_object = RuleEngine.objects.filter(query)[start:end]
            count = RuleEngine.objects.filter(query).count()
            serializer = RuleEngineSerializer(
            rules_object, many=True, context={"request": request})

            response_dict = {'data': serializer.data,
                                'count': count}
            return Response(response_dict)
        response_dict = {'data': [],
                                'count': 0}
        return Response(response_dict)





class StatisticalSummary(viewsets.ViewSet):
    def list(self, request):
        start, end = get_data_range(request)
        project = request.GET.get("project")
        project_reference_object = UserProject.objects.get(pk=project)
        query = json.loads(request.GET.get("q"))
        if request.method == "GET":
            query_filter = {'UserProjectReference': project_reference_object}
            for item in query:
                if query[item] != '':
                    query_filter[item] = query[item]
            # rules_object = RuleEngine.objects.filter(**query_filter)[start:end]\
            #     .annotate(IMPACTED=Count('invoicedata'))
            rules_object = ImpactRuleEngineSerializer(RuleEngine.objects.filter(**query_filter)[start:end], many=True)
            rules_json = JSONRenderer().render(rules_object.data)
            out = []
            for data in json.loads(rules_json):
                item = {"id": data['pk']}
                item['invoice_impacted'] = data['invoice_impacted']
                out.append(item)
            count = RuleEngine.objects.filter(**query_filter).count()
            # query_data_serialized = serializers.serialize("json", rules_object, fields=('pk', 'IMPACTED'))
            data_details = {'count': count, 'data': out}
            data_details = json.dumps(data_details)
            return HttpResponse(data_details, content_type="text/json-comment-filtered")

operator_dic = {
            "EQUALS": "__iexact",
            "CONTAINS": "__icontains",
            "STARTS WITH": "__istartswith",
            "ENDS WITH": "__iendswith",
            '=': '',
            '>=': '__gte',
            '<=': '__lte',
            '>': '__gt',
            '<': '__lt'
        }
class TestAndImplementRule(viewsets.ViewSet):
    
    def list(self, request):
        # project_pk = request.GET.get("project")
        query = json.loads(request.GET.get("q"))
        start, end = get_data_range(request)
        query_filter = {}
        fields = ["1", "2", "3"]
        for data_index in fields:
            if query["FIELD_" + data_index] != '' and query["OPERATOR_" + data_index] != '' and \
                    query["VALUE_" + data_index]:
                query_filter[query["FIELD_" + data_index] + operator_dic[query["OPERATOR_" + data_index]]] \
                    = query["VALUE_" + data_index]
        invoice_data_object = InvoiceData.objects.filter(**query_filter)[start:end]

        count = InvoiceData.objects.filter(**query_filter).count()
        serializer = InvoiceDataSerializer(
        invoice_data_object, many=True, context={"request": request})
        response_dict = {
                        'data': serializer.data,
                        'count': count
                    }
        return Response(response_dict)
    def create(seld, request):
        # Need to include project reference
        request_body_parameters = json.loads(request.body)["params"]
        pk_list = json.loads(request_body_parameters["idArray"])
        for key in pk_list:
            rule_object = RuleEngine.objects.get(pk=key)
            rule_dic = rule_object.__dict__
            query_filter = {}
            fields = ["1", "2", "3"]
            for index in fields:
                if rule_dic["FIELD_" + index] != '' and rule_dic["OPERATOR_" + index] != '' and \
                        rule_dic["VALUE_" + index]:
                    query_filter[rule_dic["FIELD_" + index] + operator_dic[rule_dic["OPERATOR_" + index]]] = rule_dic[
                        "VALUE_" + index]
            invoice_data = InvoiceData.objects.filter(**query_filter)
            for invoice in invoice_data:
                if invoice.RuleEngineReference is not None:
                    priorities = ["High", "Medium", "Low"]
                    current_index = priorities.index(rule_object.PRIORITY)
                    previous_index = priorities.index(invoice.RuleEngineReference.PRIORITY)
                    if current_index <= previous_index:
                        priority_check = True
                    else:
                        priority_check = False
                    if priority_check:
                        setattr(invoice, "RuleEngineReference", rule_object)
                        rules_history = invoice.RULES_HISTORY
                        if rules_history is None or rules_history == '':
                            rules_history = [rule_object.pk]
                        else:
                            rules_history = json.loads(rules_history)
                            if rule_object.pk not in rules_history:
                                rules_history.append(rule_object.pk)
                        setattr(invoice, "RULES_HISTORY", json.dumps(rules_history))
                else:
                    setattr(invoice, "RuleEngineReference", rule_object)
                    rules_history = invoice.RULES_HISTORY
                    if rules_history is None or rules_history == '':
                        rules_history = [rule_object.pk]
                    else:
                        rules_history = json.loads(rules_history)
                        if rule_object.pk not in rules_history:
                            rules_history.append(rule_object.pk)
                    setattr(invoice, "RULES_HISTORY", json.dumps(rules_history))
                invoice.save()
            setattr(rule_object, "STATUS", "implemented")
            rule_object.save()
        return HttpResponse("Rules Applied ", content_type="text/json-comment-filtered")


class RuleEngineViewSet(viewsets.ViewSet):
    def list(self, request):
        project_pk = request.GET.get("project")
        start, end = get_data_range(request)
        query = json.loads(request.GET.get("q"))
        project_reference_object = UserProject.objects.get(pk=project_pk)
        query_filter = {"UserProjectReference": project_reference_object, "STATUS": "draft"}
        for item in query:
            if query[item] != '':
                query_filter[item] = query[item]
        query_data_object = RuleEngine.objects.filter(**query_filter)[start:end]
        count = RuleEngine.objects.filter(**query_filter).count()
        serializer = RuleEngineSerializer(
            query_data_object, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}
        return Response(response_dict)

    def create(self, request):
        request_body_parameters = json.loads(request.body)['params']
        query = request_body_parameters["payload"]
        project_pk = request_body_parameters["project"]
        project_reference_object = UserProject.objects.get(pk=project_pk)
        query_filter = {"UserProjectReference": project_reference_object, "STATUS": "draft"}
        for item in query:
            query_filter[item] = query[item]
        new_rule = RuleEngine(**query_filter)
        new_rule.save()
        return HttpResponse("Successfully added ", content_type="text/json-comment-filtered")

    def update(self, request, pk = id):
        request_body_parameters = json.loads(request.body)["params"]
        payload = request_body_parameters["payload"]
        rule_engine_object = RuleEngine.objects.get(pk=pk)
        for item in payload:
            setattr(rule_engine_object, item, payload[item])
        rule_engine_object.save()
        return HttpResponse("Updated Successfully ", content_type="text/json-comment-filtered")

    def destroy(self, request,pk = id):
        invoice_object = RuleEngine.objects.get(pk=pk)
        invoice_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")


class TaxonomyDataViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]
    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        taxonomy_data = TaxonomyData.objects.all()
        response_dict = {}
        if query_filter is not None:
            taxonomy_filtered = taxonomy_data.filter(**query_filter)[start:end]
            count = taxonomy_data.count()
        else:
            taxonomy_filtered = taxonomy_data[start:end]
            count = taxonomy_data.count()
        serializer = TaxonomyDataSerializer(
            taxonomy_filtered, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}
        return Response(response_dict)

    def create(self, request):
        try:
            payload = taxonomy_items_and_count(request.data)
            serializer = TaxonomyDataSerializer(
                data=payload, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            payload = taxonomy_items_and_count(request.data)
            queryset = TaxonomyData.objects.all()
            taxonomy_data = get_object_or_404(queryset, pk=pk)
            serializer = TaxonomyDataSerializer(
                taxonomy_data, data=payload, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = TaxonomyData.objects.all()
        taxonomy_data = get_object_or_404(queryset, pk=pk)
        serializer = TaxonomyDataSerializer(taxonomy_data, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = TaxonomyData.objects.all()
            taxonomy_data = get_object_or_404(queryset, pk=pk)
            taxonomy_data.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting"}
        return Response(dict_response)


class InvoiceDataViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        invoice_data = InvoiceData.objects.all()
        response_dict = {}
        if query_filter is not None:
            taxonomy_filtered = invoice_data.filter(**query_filter)[start:end]
            count = invoice_data.count()
        else:
            taxonomy_filtered = invoice_data[start:end]
            count = invoice_data.count()
        serializer = InvoiceDataSerializer(
            taxonomy_filtered, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = InvoiceDataSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Invoice saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving Invoice"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = InvoiceData.objects.all()
            invoice_data = get_object_or_404(queryset, pk=pk)
            serializer = InvoiceDataSerializer(
                invoice_data, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = InvoiceData.objects.all()
        invoice_data = get_object_or_404(queryset, pk=pk)
        serializer = InvoiceDataSerializer(invoice_data, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = InvoiceData.objects.all()
            invoice_data = get_object_or_404(queryset, pk=pk)
            invoice_data.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting"}
        return Response(dict_response)


class ContractDataViewSet(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        contract_data = ContractData.objects.all()
        response_dict = {}
        if query_filter is not None:
            taxonomy_filtered = contract_data.filter(**query_filter)[start:end]
            count = contract_data.count()
        else:
            taxonomy_filtered = contract_data[start:end]
            count = contract_data.count()
        serializer = ContractDataSerializer(
            taxonomy_filtered, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = ContractDataSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = ContractData.objects.all()
            contract_data = get_object_or_404(queryset, pk=pk)
            serializer = ContractDataSerializer(
                contract_data, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = ContractData.objects.all()
        contract_data = get_object_or_404(queryset, pk=pk)
        serializer = ContractDataSerializer(contract_data, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = ContractData.objects.all()
            contract_data = get_object_or_404(queryset, pk=pk)
            contract_data.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting"}
        return Response(dict_response)


class GLOrgDataViewSet(viewsets.ViewSet): 
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        gl_org_data = GLOrgData.objects.all()
        response_dict = {}
        if query_filter is not None:
            taxonomy_filtered = gl_org_data.filter(**query_filter)[start:end]
            count = gl_org_data.count()
        else:
            taxonomy_filtered = gl_org_data[start:end]
            count = gl_org_data.count()
        serializer = GLOrgDataSerializer(
            taxonomy_filtered, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = GLOrgDataSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = GLOrgData.objects.all()
            gl_org_data = get_object_or_404(queryset, pk=pk)
            serializer = GLOrgDataSerializer(
                gl_org_data, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = GLOrgData.objects.all()
        gl_org_data = get_object_or_404(queryset, pk=pk)
        serializer = GLOrgDataSerializer(gl_org_data, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = GLOrgData.objects.all()
            gl_org_data = get_object_or_404(queryset, pk=pk)
            gl_org_data.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting"}
        return Response(dict_response)

 
class PODataViewSet(viewsets.ViewSet): 
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        query_filter = json.loads(self.request.query_params.get("q"))
        current_page = int(self.request.query_params.get("currentPage"))
        per_page = int(self.request.query_params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        po_data = POData.objects.all()
        response_dict = {}
        if query_filter is not None:
            taxonomy_filtered = po_data.filter(**query_filter)[start:end]
            count = po_data.count()
        else:
            taxonomy_filtered = po_data[start:end]
            count = po_data.count()
        serializer = PODataSerializer(
            taxonomy_filtered, many=True, context={"request": request})

        response_dict = {'data': serializer.data,
                             'count': count}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = PODataSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Saved successfully"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Saving"}
        return Response(dict_response)

    def update(self, request, pk=id):
        try:
            queryset = POData.objects.all()
            po_data = get_object_or_404(queryset, pk=pk)
            serializer = PODataSerializer(
                po_data, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Updating"}
        return Response(dict_response)

    def retrieve(self, request, pk=id):
        queryset = POData.objects.all()
        po_data = get_object_or_404(queryset, pk=pk)
        serializer = PODataSerializer(po_data, context={"request": request})
        return Response({'error': False, 'message': "Single Data Fetch", "data": serializer.data})

    def destroy(self, request, pk=id):
        try:
            queryset = POData.objects.all()
            po_data = get_object_or_404(queryset, pk=pk)
            po_data.delete()
            dict_response = {"error": False,
                             "message": "Successfully Deleted"}
        except:
            dict_response = {'error': True,
                             'message': "Error During Deleting"}
        return Response(dict_response)


class AdminDataViewSet(viewsets.ViewSet):
    def list(self, request):
        start, end, query_filter = fetch_get_data(request)
        query_data_object = UserData.objects.filter(**query_filter)[start:end]
        count = UserData.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    def destroy(self, request):
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            contract_object = UserData.objects.get(UserProjectReference=project_reference_object, pk=item)
            contract_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")
    def create(self, request):
        payload = fetch_post_data(request)
        payload["RoleReference"] = Role.objects.get(Permissions=payload["RoleReference"])
        new_object = UserData.objects.create(**payload)
        new_object.save()
        return HttpResponse("Successfully Added!", content_type="text/json-comment-filtered")
    def update(self, request):
        body_parameters = json.loads(request.body)["params"]
        payload = json.loads(body_parameters["payload"])
        payload["UserProjectReference"] = UserProject.objects.get(pk=body_parameters["project"])
        payload['RoleReference'] = Role.objects.get(pk=payload['RoleReference'])
        user_reference_object = UserData.objects.get(pk=body_parameters["pk"])
        for item in payload:
            setattr(user_reference_object, item, payload[item])
        user_reference_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")





class UserList(viewsets.ViewSet):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def list(self, request):
        User = get_user_model()
        users = User.objects.all()
        serializer = userListSerializer(
            users, many=True, context={"request": request})
        serializer.data.password='' 
      
        response_dict = {"data": serializer.data}
        return Response(response_dict)