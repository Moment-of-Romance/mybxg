define(['jquery','util','formSubmit'],function($,util){
  //设置菜单选中高亮
  util.setMenu(location.pathname);
  //点击按钮发送ajax
  $('#courseAddBtn').on('click',function(){
    $('#courseAddForm').ajaxSubmit({
      type : 'post',
      url : '/api/course/create',
      dataType : 'json',
      success : function(data){
        console.log(data);
        if(data.code == 200){
          location.href = '/course/basic?cs_id='+data.result.cs_id;
        }
      }
    })
    return false;
  })
});
