/**
 * Created by 54023 on 2017/9/19.
 */
define(['jquery','cookie'], function ($) {
    $("#loginBtn").on("click", function () {
        $.ajax({
            type : 'post',
            url : '/api/login',
            data : $("#loginForm").serialize(),
            dataType : 'json',
            success : function (data) {
                if(data.code == 200){
                    //����ȡ�����ݴ���cookie�У������ҳ�湲��
                    $.cookie("loginInfo",JSON.stringify(data.result),{path:"/"});
                    location.href = '/main/index';
                }
            }
        });

        return false;
    })
});