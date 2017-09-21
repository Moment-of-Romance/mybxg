/**
 * Created by 54023 on 2017/9/19.
 */
define(['jquery','template','cookie','bootstrap'], function ($,template) {
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function (data) {
            //Ä£°å°ó¶¨Êý¾Ý
            if(data.code === 200){
                var html = template('teacherInfo',{list:data.result});
                $('.teacher-list tbody').html(html);
                //启用/注销功能
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
                });
                //查看功能
                $('.queryList').on('click',function(){
                    var that = this;
                    var td = $(that).parent();
                    var tcId = td.attr('data-tcId');
                    $.ajax({
                        type : 'get',
                        url : '/api/teacher/view',
                        data : {tc_id : tcId},
                        dataType : 'json',
                        success : function(data){
                            var html = template('queryList',data.result);
                            $('#teacherInfoModal').html(html);
                            $('#teacherModal').modal();
                        }
                    })
                })
            }
        }
    })
});
