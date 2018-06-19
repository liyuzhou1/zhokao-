require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/list',
        success: function(res) {
            var tpl = $('#tpl').html();
            var template = handlebars.compile(tpl);
            var html = template(res);
            $('#uls').html(html);
        },
        error: function(error) {
            console.log(error);
        }
    })
});