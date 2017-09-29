define(['jquery','template','util','uploadify','jcrop','formSubmit'],function($,template,util){
  //设置菜单栏选中
  util.setMenu('/course/add');
  //获取cs_id 调用接口
  var csId = util.getParas('cs_id');
  $.ajax({
    type : 'get',
    url : '/api/course/picture',
    data : {cs_id : csId},
    success : function(data){
      console.log(data);
      //解析数据 渲染页面
      var html = template('pictureTpl',data.result);
      $('#pictureInfo').html(html);
      //获取图片
      var img = $('.preview img').eq(0);
      //上传图片
      $('#upfile').uploadify({
        width : 80,
        height : 'auto',
        buttonText : '选择文件',
        itemTemplate : '<span></span>',
        buttonClass : 'btn btn-success btn-sm',
        swf : '/public/assets/uploadify/uploadify.swf',
        uploader : '/api/uploader/cover',
        formData : {
          cs_id : csId
        },
        fileObjName : 'cs_cover_original',
        onUploadSuccess : function(a,b,c){
          console.log(b);
          var obj = JSON.parse(b.trim());
          $('.preview img').attr('src',obj.result.path);
          //上传完就显示裁切
          $('#cropBtn').text('保存图片').attr('data-flag',true);
          cropImage();
        }
      })
      //图片裁切
      $('#cropBtn').on('click',function(){
        //获取标志位
        var flag = $(this).attr('data-flag');
        if(flag){
          //再次点击时跳转到下个页面
          $('#cropForm').ajaxSubmit({
            type : 'post',
            url : '/api/course/update/picture',
            dataType : 'json',
            data : {
              cs_id : csId
            },
            success : function(data){
              if(data.code == 200){
                location.href = '/course/lessons?cs_id='+csId;
              }
            }
          })
        }else{
          //第一次点击时
          $(this).text('保存图片').attr('data-flag',true);
          cropImage();
          
        }
      })
      //封装一个图片裁切的方法
      function cropImage(){
        img.Jcrop({
          aspectRatio : 2,
        },function(){
          //获取图片的宽高
          var width = this.ui.stage.width;
          var height = this.ui.stage.height;
          //计算选取框的参数
          var w = width;
          var h = width/2;
          var x = 0;
          var y = (height - width/2)/2;
          //初始化默认选区
          $('#cropForm').find('input[name=x]').val(x);
          $('#cropForm').find('input[name=y]').val(y);
          $('#cropForm').find('input[name=w]').val(w);
          $('#cropForm').find('input[name=h]').val(h);

          //动态创建一个选取
          this.newSelection();
          this.setSelect([x,y,w,h]);
          //初始化缩略预览图
          this.initComponent('Thumbnailer',{
            width : 240,
            height : 120,
            mythumb : '.thumb'
          })
          //设置缩略图的位置
          $('.jcrop-thumb').css({
            position : 'absolute',
            top : 0,
            left : 0
          })

          //监控选取变化事件
          img.parent().on('cropstart cropmove cropend',function(a,b,c){
            $('#cropForm').find('input[name=x]').val(c.x);
            $('#cropForm').find('input[name=y]').val(c.y);
            $('#cropForm').find('input[name=w]').val(c.w);
            $('#cropForm').find('input[name=h]').val(c.h);

          })
        })
      }
    }
  })

});
