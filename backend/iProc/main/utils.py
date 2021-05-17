def get_data_range(request):
    current_page = int(request.GET.get("currentPage"))
    per_page = int(request.GET.get("perPage"))
    start = per_page * current_page
    end = per_page * current_page + per_page
    return start, end
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


