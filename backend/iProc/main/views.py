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
# from .utils import get_data_range
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
# ---------------UtilsFunctions----------------------


def get_data_range(request):
    current_page = int(request.GET.get("currentPage"))
    per_page = int(request.GET.get("perPage"))
    start = per_page * current_page
    end = per_page * current_page + per_page
    return start, end


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


def taxonomy_items_and_count(payload):
    main_category = ''
    categories_list = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]
    count = 0
    for i in categories_list:
        item = "CATEGORY_LEVEL_" + i
        if item in payload:
            if payload[item] != '':
                count += 1
                if main_category == '':
                    main_category += payload["CATEGORY_LEVEL_" + i]
                else:
                    main_category += ">" + payload["CATEGORY_LEVEL_" + i]
    payload['MAIN_CATEGORY'] = main_category
    payload["CATEGORY_LEVELS"] = count
    return payload


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
# ----------------------------------------------------


def default_templates(request):
    if request.method == 'GET':
        all_data = DefaultTemplate.objects.all()
        saved_template = serializers.serialize("json", all_data)
        return HttpResponse(saved_template, content_type="text/json-comment-filtered")


def saved_templates(request):
    if request.method == 'GET':
        project_pk = request.GET.get("project")
        project_reference_object = UserProject.objects.get(pk=project_pk)
        default_template_pk = request.GET.get("defaultTemplateReference")
        default_template_object = DefaultTemplate.objects.get(pk=default_template_pk)
        saved_templates_object = SavedTemplate.objects.filter(DataTableReference=default_template_object,
                                                              UserProjectReference=project_reference_object)
        saved_templates_serialized = serializers.serialize("json", saved_templates_object)
        return HttpResponse(saved_templates_serialized, content_type="text/json-comment-filtered")


def file_import(request):
    if request.method == "POST":
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


def utils_view(request):
    if request.method == "GET":
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


def find_email_or_user(request):
    if request.method == "GET":
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


def rule_engine_data(request):
    if request.method == 'GET':
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
            rule_data_object = RuleEngine.objects.filter(UserProjectReference=project_reference_object, pk=rule_pk)
            rule_data_serialized = serializers.serialize("json", rule_data_object)
            return HttpResponse(rule_data_serialized, content_type="text/json-comment-filtered")


def invoice_by_rule(request):
    if request.method == "GET":
        query = json.loads(request.GET.get("query"))
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
            serialized_data = get_serialized_data(invoice_data_object, count)
            return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
        else:
            serialized_data = get_serialized_data({}, 0)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")


def over_written_rules(request):
    if request.method == "GET":
        query = json.loads(request.GET.get("query"))
        start, end = get_data_range(request)
        project_pk = request.GET.get("project")
        project_reference_object = UserProject.objects.get(pk=project_pk)
        query_filter = {"UserProjectReference": project_reference_object}
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
            serialized_data = get_serialized_data(rules_object, count)
            return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
        serialized_data = get_serialized_data({}, 0)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")


class RuleEngineSerializer(ser.ModelSerializer):
    invoice_impacted = ser.SerializerMethodField('get_impacted_invoices_count')

    def get_impacted_invoices_count(self, obj):
        ruleobj = RuleEngine.objects.get(pk=obj.pk)
        return InvoiceData.objects.filter(RuleEngineReference=ruleobj).count()

    class Meta:
        model = RuleEngine
        fields = ('pk', 'invoice_impacted')


def statistical_summary(request):
    start, end = get_data_range(request)
    project = request.GET.get("project")
    project_reference_object = UserProject.objects.get(pk=project)
    query = json.loads(request.GET.get("query"))
    if request.method == "GET":
        query_filter = {'UserProjectReference': project_reference_object}
        for item in query:
            if query[item] != '':
                query_filter[item] = query[item]
        # rules_object = RuleEngine.objects.filter(**query_filter)[start:end]\
        #     .annotate(IMPACTED=Count('invoicedata'))
        rules_object = RuleEngineSerializer(RuleEngine.objects.filter(**query_filter)[start:end], many=True)
        rules_json = JSONRenderer().render(rules_object.data)
        out = []
        for data in json.loads(rules_json):
            item = {"pk": data['pk'], "fields": {}}
            item['fields']['invoice_impacted'] = data['invoice_impacted']
            out.append(item)
        count = RuleEngine.objects.filter(**query_filter).count()
        # query_data_serialized = serializers.serialize("json", rules_object, fields=('pk', 'IMPACTED'))
        data_details = {'count': count, 'queryData': json.dumps(out)}
        data_details = json.dumps(data_details)
        return HttpResponse(data_details, content_type="text/json-comment-filtered")


def test_and_implement_rule(request):
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
    if request.method == "GET":
        # project_pk = request.GET.get("project")
        query = json.loads(request.GET.get("query"))
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
        invoice_data_serialized = serializers.serialize("json", invoice_data_object)
        data_details = {'count': count, 'queryData': invoice_data_serialized}
        return HttpResponse(json.dumps(data_details), content_type="text/json-comment-filtered")
    if request.method == 'POST':
        # Need to include project reference
        request_body_parameters = json.loads(request.body)["params"]
        pk_list = json.loads(request_body_parameters["pkArray"])
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


def rule_engine_view(request):
    if request.method == "GET":
        project_pk = request.GET.get("project")
        start, end = get_data_range(request)
        query = json.loads(request.GET.get("query"))
        project_reference_object = UserProject.objects.get(pk=project_pk)
        query_filter = {"UserProjectReference": project_reference_object, "STATUS": "draft"}
        for item in query:
            if query[item] != '':
                query_filter[item] = query[item]
        query_data_object = RuleEngine.objects.filter(**query_filter)[start:end]
        count = RuleEngine.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")

    if request.method == "POST":
        request_body_parameters = json.loads(request.body)["params"]
        query = json.loads(request_body_parameters["payload"])
        project_pk = request_body_parameters["project"]
        project_reference_object = UserProject.objects.get(pk=project_pk)
        query_filter = {"UserProjectReference": project_reference_object, "STATUS": "draft"}
        for item in query:
            query_filter[item] = query[item]
        new_rule = RuleEngine(**query_filter)
        new_rule.save()
        return HttpResponse("Successfully added ", content_type="text/json-comment-filtered")

    if request.method == "PUT":  # .............................
        request_body_parameters = json.loads(request.body)["params"]
        payload = json.loads(request_body_parameters["payload"])
        pk = request_body_parameters["pk"]
        rule_engine_object = RuleEngine.objects.get(pk=pk)
        for item in payload:
            setattr(rule_engine_object, item, payload[item])
        rule_engine_object.save()
        return HttpResponse("Updated Successfully ", content_type="text/json-comment-filtered")

    if request.method == "DELETE":
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            invoice_object = RuleEngine.objects.get(UserProjectReference=project_reference_object, pk=item)
            invoice_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")


def manage_templates(request):
    if request.method == "GET":
        query = json.loads(request.GET.get("query"))
        start, end = get_data_range(request)
        project_pk = request.GET.get("project")
        project_reference_object = UserProject.objects.get(pk=project_pk)
        query_filter = {'UserProjectReference': project_reference_object}
        for key in query:
            if query[key] != '':
                query_filter[key] = query[key]
        query_data_object = SavedTemplate.objects.filter(**query_filter)[start:end]
        count = SavedTemplate.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    if request.method == "POST":
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
    if request.method == "PUT":
        request_body_parameters = json.loads(request.body)
        request_body_payload = json.loads(request_body_parameters["params"]["payload"])
        payload = {"MappingName": request_body_payload["templateName"],
                   "MappedItems": request_body_payload["templateMapping"],
                   "FileColumns": request_body_payload["fileColumns"]}
        saved_template_pk = request_body_parameters["params"]['pk']
        template_object = SavedTemplate.objects.get(pk=saved_template_pk)
        for item in payload:
            setattr(template_object, item, payload[item])
        template_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")
    if request.method == "DELETE":
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            template_object = SavedTemplate.objects.get(UserProjectReference=project_reference_object, pk=item)
            template_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")


def taxonomy_data_view(request):
    if request.method == "GET":
        start, end, query_filter = fetch_get_data(request)
        query_data_object = TaxonomyData.objects.filter(**query_filter)[start:end]
        count = TaxonomyData.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    if request.method == "DELETE":
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            taxonomy_object = TaxonomyData.objects.get(UserProjectReference=project_reference_object, pk=item)
            taxonomy_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")
    if request.method == "POST":
        payload = fetch_post_data(request)
        payload = taxonomy_items_and_count(payload)
        new_object = TaxonomyData.objects.create(**payload)
        new_object.save()
        return HttpResponse("Successfully Added!", content_type="text/json-comment-filtered")
    if request.method == "PUT":
        payload, taxonomy_pk = fetch_put_data(request)
        payload = taxonomy_items_and_count(payload)
        taxonomy_object = TaxonomyData.objects.get(pk=taxonomy_pk)
        for item in payload:
            setattr(taxonomy_object, item, payload[item])
        taxonomy_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")
    else:
        return HttpResponse("NoMatch", content_type="text/json-comment-filtered")


def invoice_data_view(request):
    if request.method == "GET":
        start, end, query_filter = fetch_get_data(request)
        query_data_object = InvoiceData.objects.filter(**query_filter)[start:end]
        count = InvoiceData.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    if request.method == "DELETE":
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            invoice_object = InvoiceData.objects.get(UserProjectReference=project_reference_object, pk=item)
            invoice_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")
    if request.method == "POST":
        payload = fetch_post_data(request)
        new_object = InvoiceData.objects.create(**payload)
        new_object.save()
        return HttpResponse("Successfully Added!", content_type="text/json-comment-filtered")
    if request.method == "PUT":
        payload, taxonomy_pk = fetch_put_data(request)
        invoice_object = InvoiceData.objects.get(pk=taxonomy_pk)
        for item in payload:
            setattr(invoice_object, item, payload[item])
        invoice_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")
    else:
        return HttpResponse("NoMatch", content_type="text/json-comment-filtered")


def contract_data_view(request):
    if request.method == "GET":
        start, end, query_filter = fetch_get_data(request)
        query_data_object = ContractData.objects.filter(**query_filter)[start:end]
        count = ContractData.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    if request.method == "DELETE":
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            contract_object = ContractData.objects.get(UserProjectReference=project_reference_object, pk=item)
            contract_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")
    if request.method == "POST":
        payload = fetch_post_data(request)
        new_object = ContractData.objects.create(**payload)
        new_object.save()
        return HttpResponse("Successfully Added!", content_type="text/json-comment-filtered")
    if request.method == "PUT":
        payload, taxonomy_pk = fetch_put_data(request)
        contract_object = ContractData.objects.get(pk=taxonomy_pk)
        for item in payload:
            setattr(contract_object, item, payload[item])
        contract_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")
    else:
        return HttpResponse("NoMatch", content_type="text/json-comment-filtered")


def gl_data_view(request):
    if request.method == "GET":
        start, end, query_filter = fetch_get_data(request)
        query_data_object = GLOrgData.objects.filter(**query_filter)[start:end]
        count = GLOrgData.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    if request.method == "DELETE":
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            gl_object = GLOrgData.objects.get(UserProjectReference=project_reference_object, pk=item)
            gl_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")
    if request.method == "POST":
        payload = fetch_post_data(request)
        new_object = GLOrgData.objects.create(**payload)
        new_object.save()
        return HttpResponse("Successfully Added!", content_type="text/json-comment-filtered")
    if request.method == "PUT":
        payload, taxonomy_pk = fetch_put_data(request)
        gl_object = GLOrgData.objects.get(pk=taxonomy_pk)
        for item in payload:
            setattr(gl_object, item, payload[item])
        gl_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")
    else:
        return HttpResponse("NoMatch", content_type="text/json-comment-filtered")


def po_data_view(request):
    if request.method == "GET":
        start, end, query_filter = fetch_get_data(request)
        query_data_object = POData.objects.filter(**query_filter)[start:end]
        count = POData.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    if request.method == "DELETE":
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            po_object = POData.objects.get(UserProjectReference=project_reference_object, pk=item)
            po_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")
    if request.method == "POST":
        payload = fetch_post_data(request)
        new_object = POData.objects.create(**payload)
        new_object.save()
        return HttpResponse("Successfully Added!", content_type="text/json-comment-filtered")
    if request.method == "PUT":
        payload, taxonomy_pk = fetch_put_data(request)
        po_object = POData.objects.get(pk=taxonomy_pk)
        for item in payload:
            setattr(po_object, item, payload[item])
        po_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")
    else:
        return HttpResponse("NoMatch", content_type="text/json-comment-filtered")


def admin_data(request):
    if request.method == "GET":
        start, end, query_filter = fetch_get_data(request)
        query_data_object = UserData.objects.filter(**query_filter)[start:end]
        count = UserData.objects.filter(**query_filter).count()
        serialized_data = get_serialized_data(query_data_object, count)
        return HttpResponse(serialized_data, content_type="text/json-comment-filtered")
    if request.method == "DELETE":
        pk_list, project_reference_object = fetch_del_data(request)
        for item in pk_list:
            contract_object = UserData.objects.get(UserProjectReference=project_reference_object, pk=item)
            contract_object.delete()
        return HttpResponse("Successfully Deleted!", content_type="text/json-comment-filtered")
    if request.method == "POST":
        payload = fetch_post_data(request)
        payload["RoleReference"] = Role.objects.get(Permissions=payload["RoleReference"])
        new_object = UserData.objects.create(**payload)
        new_object.save()
        return HttpResponse("Successfully Added!", content_type="text/json-comment-filtered")
    if request.method == "PUT":
        body_parameters = json.loads(request.body)["params"]
        payload = json.loads(body_parameters["payload"])
        payload["UserProjectReference"] = UserProject.objects.get(pk=body_parameters["project"])
        payload['RoleReference'] = Role.objects.get(pk=payload['RoleReference'])
        user_reference_object = UserData.objects.get(pk=body_parameters["pk"])
        for item in payload:
            setattr(user_reference_object, item, payload[item])
        user_reference_object.save()
        return HttpResponse("Updated Successfully!", content_type="text/json-comment-filtered")
    else:
        return HttpResponse("NoMatch", content_type="text/json-comment-filtered")



from django.contrib.auth import get_user_model
from .serializers import userListSerializer

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