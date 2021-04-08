import json

def get_data_range(request):
    current_page = int(request.GET.get("currentPage"))
    per_page = int(request.GET.get("perPage"))
    start = per_page * current_page
    end = per_page * current_page + per_page
    return start, end

def fetch_get_data(request):
    print('DATA HERE', request)
    query = json.loads(request.GET.get("query"))
    start, end = get_data_range(request)
    project_pk = request.GET.get("project")
    project_reference_object = UserProject.objects.get(pk=project_pk)
    query_filter = {'UserProjectReference': project_reference_object}
    for key in query:
        if query[key] != '':
            query_filter[key] = query[key]
    return start, end, query_filter
