/**
 * Created by 54023 on 2017/9/19.
 */
define(['jquery','template','cookie'], function ($,template) {
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function (data) {
            //Ä£°å°ó¶¨Êý¾Ý
            if(data.code === 200){
                console.log(data);
                var html = template('teacherInfo',{list:data.result});
                $('.teacher-list tbody').html(html);
                $(".cancle").on('click',function(){
                    //获取参数 tc_id 和tc_status
                    var that = this;
                    var td = $(that).parent();
                    var tcId = td.attr('data-tcId');
                    var tcStatus = td.attr('data-tcStatus');
                    $.ajax({
                        type : 'post',
                        url : '/api/teacher/handle',
                        dataType : 'json',
                        data : {tc_id : tcId, tc_status : tcStatus},
                        success : function(data){
                            if(data.code == 200){
                                td.attr('data-tcStatus',data.result.tc_status);
                                //如果
                                if(data.result.tc_status == 1){
                                    $(that).html('启用');
                                }else{
                                    $(that).html('注销');
                                }
                            }
                        }
                    })
                })
            }
        }
    })
});
