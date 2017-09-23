define(['jquery','template','uploadify','region'],function($,template){
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
    }
  })
});
