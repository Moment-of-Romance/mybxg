define(['jquery','template','util','datePicker','language','formSubmit','validate'],function($,template,util){
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

  //利用form插件和validate插件
  function getAjaxData(url){
    $("#teacherForm").validate({
      sendForm : false,
      valid : function(){
        $(this).ajaxSubmit({
          type : 'post',
          url : url,
          dataType : 'json',
          success : function(data){
            if(data.code == 200){
              location.href = '/teacher/list';
            }
          }
        })
      },
      description : {
        tcName : {
          required : '内容不能为空'
        },
        tcPass : {
          required : '密码不能为空',
          pattern : '密码必须为6位数字'
        },
        tcJoinDate : {
          required : '日期不能为空'
        }
      }
    })
  }

  //封装一个ajax请求方法
  // function getAjaxData(url){
  //   $('#teacherBtn').on('click',function(){
  //     var formData = $('#teacherForm').serialize();
  //     $.ajax({
  //       type : 'post',
  //       url : url,
  //       data : formData,
  //       dataType : 'json',
  //       success : function(data){
  //         if(data.code == 200){
  //           location.href = '/teacher/list';
  //         }
  //       }
  //     })
  //   })
    
  // }
});
