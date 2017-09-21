define(['jquery','template','util'],function($,template,util){
  var tcId = util.getParas('tc_id');
  if(tcId){
    //编辑教师
    $.ajax({
      type : 'get',
      url : '/api/teacher/edit',
      data : {tc_id : tcId},
      dataType : 'json',
      success : function(data){
        //解析数据 渲染模板
        data.result.operate = '编辑讲师';
        var html = template('editTeacherInfo',data.result);
        $('#edit').html(html);
        //点击提交  
        getAjaxData('/api/teacher/update');
      }
    })
  }else{
    //添加教师
    var html = template('editTeacherInfo',{operate:'添加讲师'});
    $('#edit').html(html);
    //点击提交
    getAjaxData('/api/teacher/add');
  }

  //封装一个ajax请求方法
  function getAjaxData(url){
    $('#teacherBtn').on('click',function(){
      var formData = $('#teacherForm').serialize();
      $.ajax({
        type : 'post',
        url : url,
        data : formData,
        dataType : 'json',
        success : function(data){
          if(data.code == 200){
            location.href = '/teacher/list';
          }
        }
      })
    })
    
  }
});
