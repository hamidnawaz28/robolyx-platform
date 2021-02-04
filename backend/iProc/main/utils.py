def get_data_range(request):
    current_page = int(request.GET.get("currentPage"))
    per_page = int(request.GET.get("perPage"))
    start = per_page * current_page
    end = per_page * current_page + per_page
    return start, end
