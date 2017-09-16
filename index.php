<?php
  //打印全局变量的详细信息
  //var_dump($_SERVER);
  //拿到地址栏/后面的内容 也就是其他页面的地址
  //var_dump($_SERVER['PATH_INFO']);
  //首先我们设置一个默认的页面 如果输入的路由不是两层或者是错误的 我们就默认跳转到登陆页面
  $dir = 'main';
  $filename = 'index';
  if(array_key_exists('PATH_INFO',$_SERVER)){
    $url = $_SERVER['PATH_INFO'];
    //跳转到其他页面需要进入两层  所将PATH_INFO拆分成数组前要把 前面的/去掉
    $str = substr($url,1);
    //var_dump($str);
    $ret = explode('/',$str);
    //var_dump($ret);
    if(count($ret) == 2){
        $dir = $ret[0];
        $filename = $ret[1];
    }else{
        $filename = 'login';
    }
    include('./views/'.$dir.'/'.$filename.'.html');
  }



?>
