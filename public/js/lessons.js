define(['jquery', 'template', 'util', 'bootstrap', 'validate', 'formSubmit'], function ($, template, util) {
  //设置菜单选中
  util.setMenu('/course/add');
  //获取cs_id
  var csId = util.getParas('cs_id');
  $.ajax({
    type: 'post',
    url: '/api/course/lesson',
    data: { cs_id: csId },
    dataType: 'json',
    success: function (data) {
      console.log(data);
      //解析数据 渲染页面
      var html = template('lessonsTpl', data.result);
      $('#lessonsInfo').html(html);
      //点击编辑按钮
      $('.editBtn').on('click', function () {
        //获取ct_id
        var ctId = $(this).attr('data-ctId');
        $.ajax({
          type: 'get',
          url: '/api/course/chapter/edit',
          data: { ct_id: ctId },
          dataType: 'json',
          success: function (data) {
            console.log(data);
            //解析数据 渲染页面
            data.result.operate = '编辑课时'
            var html = template('lessonsModalTpl', data.result);
            $('#lessonModal').html(html).modal();
            var isFree = 0;
            $('#checkBox').change(function(){
                if($('#checkBox').prop('checked')){
                  isFree = 1;
                }else{
                  isFree = 0;
                }
              })
            $('#lessonsBtn').on('click', function () {
              $('#lessonsForm').ajaxSubmit({
                type: 'post',
                url: '/api/course/chapter/modify',
                dataType: 'json',
                data: { ct_id: ctId , ct_cs_id: csId , ct_is_free: isFree},
                success: function (data) {
                  console.log(data);
                  //刷新页面
                  if (data.code == 200) {
                    location.reload();
                  }
                }
              })
            })
          }
        })
      })
      //点击添加按钮
      $('#addBtn').on('click', function () {
        var html = template('lessonsModalTpl', { operate: '添加课时' });
        $('#lessonModal').html(html).modal();
        var isFree = 0;
        $('#checkBox').change(function(){
            if($('#checkBox').prop('checked')){
              isFree = 1;
            }else{
              isFree = 0;
            }
          })
        $('#lessonsBtn').on('click', function () {
          $('#lessonsForm').ajaxSubmit({
            type: 'post',
            url: '/api/course/chapter/add',
            dataType: 'json',
            data: { ct_cs_id: csId , ct_is_free: isFree},
            success: function (data) {
              console.log(data);
              //刷新页面
              if (data.code == 200) {
                location.reload();
              }
            }
          })
        })
      })

      //封装一个ajax请求方法
      // function getAjaxData(url) {
      //   $('#lessonsBtn').on('click', function () {
      //     $.ajaxSubmit({
      //       type: 'post',
      //       url: url,
      //       dataType: 'json',
      //       data: { ct_id: ctId },
      //       success: function (data) {
      //         console.log(data);
      //         //刷新页面
      //         if (data.code == 200) {
      //           location.reload();
      //         }
      //       }
      //     })
      //   })
      //   // $('#lessonsForm').validate({
      //   //   sendForm : false,
      //   //   valid : function(){
      //   //     console.log(1);
      //   //     $(this).ajaxSubmit({
      //   //       type : 'post',
      //   //       url : url,
      //   //       dataType : 'json',
      //   //       data : {ct_cs_id : csId},
      //   //       success : function(data){
      //   //         console.log(data);
      //   //       }
      //   //     })
      //   //   }
      //   // })
      // }
    }
  })
})
