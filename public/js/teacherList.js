/**
 * Created by 54023 on 2017/9/19.
 */
define(['jquery','template','cookie'], function ($,template) {
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function (data) {
            console.log(data);
            //模板绑定数据
            if(data.code === 200){
                var html = template('teacherInfo',{list:data.result});
                $('.teacher-list tbody').html(html);
            }
        }
    })
});