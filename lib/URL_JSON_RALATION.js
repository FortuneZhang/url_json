var URL_JSON_RELATION = {};

URL_JSON_RELATION.get_json = function () {
    var url_json = {}, params_array;
    params_array = decodeURI(window.location.search).substr(1).split('&');
    $.each(params_array, function (index, item) {
        if (item !== '') {
            var param_obj = item.split('=');
            url_json[param_obj[0]] = param_obj[1];
        }
    });
    return url_json;
};

URL_JSON_RELATION.get_value_of = function (key) {
    var url_json = '', value = '';
    url_json = this.get_json();
    if (url_json.hasOwnProperty(key)) {
        value = url_json[key];
    }
    return value;
};

URL_JSON_RELATION.mark_me_selected_then_redirect = function (me) {
    this.mark_me_selected(me);
    var url_params = this.build_url_param();
    window.location.href = window.location.pathname + "?" + url_params;
};

URL_JSON_RELATION.mark_me_selected = function (me) {
    this.remove_primary_class_of_all_item(me);
    this.add_primary_class_for(me);
};


URL_JSON_RELATION.remove_primary_class_of_all_item = function (me) {
    $.each($(me).siblings(), function (index, item) {
        $(item).removeClass('label-primary');
        $(item).addClass('label-blank');
    });
};

URL_JSON_RELATION.add_primary_class_for = function (me) {
    $(me).removeClass('label-blank');
    $(me).addClass('label-primary');
};

URL_JSON_RELATION.build_url_param = function () {
    var param_json = this.fetch_select_param();
    var url_param_array = [];
    for (var i in param_json) {
        if (param_json.hasOwnProperty(i)) {
            url_param_array.push(i.toString() + '=' + param_json[i]);
        }
    }
    return encodeURI(url_param_array.join('&'));
};

URL_JSON_RELATION.fetch_select_param = function () {
    var param_json = {};

    $.each($("#filter>.panel-heading>div"), function (index, item) {
        var key, value = '';
        key = $(item).children('dt').children('span').text();
        var all_link = $(item).children('dd').children('a');
        $.each(all_link, function (index, item) {
            if ($(item).hasClass('label-primary')) {
                value = $(item).text().trim();
            }
        });
        param_json[key] = value;
    });
    return param_json;
};

URL_JSON_RELATION.init_filter_btn_base_url = function () {
    var params = this.get_json();
    $.each($("#filter>.panel-heading>div"), function (index, item) {
        var dt_text = $(item).children('dt').children('span').text();
        var dd_param = params.hasOwnProperty(dt_text) ? params[dt_text] : 'all'
        var all_link = $(item).children('dd').children('a');

        $.each(all_link, function (index, item) {
            if ($(item).text().trim() == dd_param) {
                console.log(item);
                URL_JSON_RELATION.add_primary_class_for(item);
            }
        });
    });
};

