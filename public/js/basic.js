define(['jquery', 'template', 'util', 'ckeditor', 'validate', 'formSubmit'], function ($, template, util, CKEDITOR) {
  //设置菜单选中高亮
  util.setMenu('/course/add');
  var csId = util.getParas('cs_id');
  var flag = util.getParas('flag');
  $.ajax({
    type: 'get',
    url: '/api/course/basic',
    dataType: 'json',
    data: { cs_id: csId },
    success: function (data) {
      console.log(data);
      if (flag) {
        data.result.operate = '课程修改';
      } else {
        data.result.operate = '课程添加';
      }
      var html = template('courseBasicTpl', data.result);
      $('#courseBasicInfo').html(html);
      //处理二级菜单
      $('#categoryP').on('change', function () {
        var pid = $(this).val();
        $.ajax({
          type: 'get',
          url: '/api/category/child',
          data: { cg_id: pid },
          dataType: 'json',
          success: function (data) {
            //渲染二级菜单
            var tpl = '<option>请选择二级分类</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
            var html = template.render(tpl, { list: data.result });
            $('#categoryC').html(html);
          }
        })
      })
      //添加富文本
      CKEDITOR.replace('editor');
      //更新富文本

      //完成保存
      $('#courseBasicForm').validate({
        sendForm: false,
        valid: function () {
          for (var instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
          }
          $(this).ajaxSubmit({
            type: 'post',
            url: '/api/course/update/basic',
            dataType: 'json',
            data: { cs_id: csId },
            success: function (data) {
              if (data.code == 200) {
                location.href = '/course/picture?cs_id=' + data.result.cs_id;
              }
            }
          })
        }
      })

    }
  })
});
