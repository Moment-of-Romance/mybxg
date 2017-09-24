define(['jquery','template','ckeditor','uploadify','region','datePicker','language','validate','formSubmit'],function($,template,CKEDITOR){
  $.ajax({
    type : 'get',
    url : '/api/teacher/profile',
    dataType : 'json',
    success : function(data){
      var html = template('personInfoTpl',data.result);
      $('#settingsInfo').html(html);
      //上传头像
      $('#upfile').uploadify({
        width : 120,
        height : 120,
        swf : '/public/assets/uploadify/uploadify.swf',
        uploader : '/api/uploader/avatar',
        fileObjName : 'tc_avatar',
        itemTemplate : '<span></span>',
        buttonText : '',
        onUploadSuccess : function(a,b){
          var Obj = JSON.parse(b);
          $('.preview img').attr('src',Obj.result.path);
        }
      });

      //三级联动
      $('#pcd').region({
        url : '/public/assets/jquery-region/region.json'
      })

      //富文本
      CKEDITOR.replace('editor');
      //保存功能
      $('#settingsForm').validate({
        sendForm : false,
        valid : function(){
          var tcId = data.result.tc_id;
          var p = $('#p option:selected').text();
          var c = $('#c option:selected').text();
          var d = $('#d option:selected').text();
          var hometown = p + '|' + c + '|' + d;
          //更新富文本
          for(var instance in CKEDITOR.instances){
            CKEDITOR.instances[instance].updateElement();
          }
          $(this).ajaxSubmit({
            type : 'post',
            url : '/api/teacher/modify',
            dataType : 'json',
            data : {
              tc_hometown : hometown,
              tc_id : tcId
            },
            success : function(data){
              if(data.code == 200){
                //刷新页面
                location.reload();
              }
            }
          })
        }
      })
    }
  })
});
