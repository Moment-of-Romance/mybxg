define(['jquery','template','nprogress','cookie'], function ($, template,NProgress) {
    NProgress.start();
    
    NProgress.done();

    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

//ʵ���˳���¼
    $("#exists").on("click", function () {
        $.ajax({
            type : 'post',
            url : '/api/logout',
            dataType : 'json',
            success : function (data) {
                if(data.code == 200){
                    location.href = 'main/login';
                }
            }
        })
    });


//��������״ε�½��ֱ����ת����½ҳ��
    var loginInfo = $.cookie('loginInfo');
//���ַ��� ת���json����
    loginInfo = loginInfo && JSON.parse(loginInfo);

    var PHPSESSID = $.cookie('PHPSESSID');
    //ģ����Ⱦ
    var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"> </div> <h4>{{tc_name}}</h4>';
    var html = template.render(tpl,loginInfo);
    $('.aside .profile').html(html);
//���û�е�¼ ����ת�� ��¼ҳ��
    if(!PHPSESSID && location.pathname != '/main/login'){
        location.href = '/main/login';
    }
});



