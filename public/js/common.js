define(['jquery','template','nprogress','cookie'], function ($, template,NProgress) {
    NProgress.start();
    
    NProgress.done();

    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

//实现退出登录
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


//如果不是首次登陆则直接跳转到登陆页面
    var loginInfo = $.cookie('loginInfo');
//将字符串 转变成json对象
    loginInfo = loginInfo && JSON.parse(loginInfo);

    var PHPSESSID = $.cookie('PHPSESSID');
    //模板渲染
    var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"> </div> <h4>{{tc_name}}</h4>';
    var html = template.render(tpl,loginInfo);
    $('.aside .profile').html(html);
//如果没有登录 则跳转到 登录页面
    if(!PHPSESSID && location.pathname != '/main/login'){
        location.href = '/main/login';
    }
});



