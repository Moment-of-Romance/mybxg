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
//登陆后将 用户信息 渲染到页面上
//修改头像
$('.profile .img-circle img').attr('src',loginInfo.tc_avatar);
//修改用户名
$('.profile h4').html(loginInfo.tc_name);


//如果没有登录 则跳转到 登录页面
if(!PHPSESSID){
    location.href = '/main/login';
}