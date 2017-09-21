define(['jquery'],function($){
  return {
    getParas : function(key){
      var paras = location.search;
      //遍历数组
      var value = null;
      if(paras){
        var str = paras.substr(1);
        var arr = str.split('&');
        $.each(arr,function(index,item){
          var kv = item.split('=');
          if(kv[0] == key){
            value = kv[1];
            return;
          }
        })
      }
      return value;
    }
  }
});
