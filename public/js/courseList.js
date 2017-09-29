define(['jquery','template','util','state'],function($,template,util){
  util.setMenu(location.pathname);
  $.ajax({
    type : 'get',
    url : '/api/course',
    dataType : 'json',
    success : function(data){
      console.log(data);
      var html = template('courseListTpl',{list : data.result});
      $('#courseInfo').html(html);
    }
  })
});
