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
//��½�� �û���Ϣ ��Ⱦ��ҳ����
//�޸�ͷ��
$('.profile .img-circle img').attr('src',loginInfo.tc_avatar);
//�޸��û���
$('.profile h4').html(loginInfo.tc_name);


//���û�е�¼ ����ת�� ��¼ҳ��
if(!PHPSESSID){
    location.href = '/main/login';
}