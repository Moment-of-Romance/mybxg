/**
 * Created by 54023 on 2017/9/19.
 */
require.config({
    baseUrl:'/public/assets',
    paths:{
        jquery : 'jquery/jquery',
        cookie : 'jquery-cookie/jquery.cookie',
        template : 'artTemplate/template-web',
        bootstrap : 'bootstrap/js/bootstrap',
        datePicker : 'bootstrap-datepicker/js/bootstrap-datepicker',
        language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        formSubmit : 'jquery-form/jquery.form',
        validate : 'validate/jquery-validate',
        uploadify : 'uploadify/jquery.uploadify',
        region : 'jquery-region/jquery.region',
        ckeditor : 'ckeditor/ckeditor',
        jcrop : 'jcrop/js/Jcrop',
        nprogress : 'nprogress/nprogress',
        echarts : 'echarts/echarts.min',
        common : '../js/common',
        login : '../js/login',
        teacherList : '../js/teacherList',
        teacherEdit : '../js/teacherEdit',
        settings : '../js/settings',
        courseList : '../js/courseList',
        courseAdd : '../js/courseAdd',
        picture : '../js/picture',
        lessons : '../js/lessons',
        basic : '../js/basic',
        index : '../js/index',
        util : '../js/util',
        state : '../js/state'
    },
    shim : {
      bootstrap : {
        deps : ['jquery']
      },
      language : {
        deps : ['jquery','datePicker']
      },
      validate : {
        deps : ['jquery']
      },
      uploadify : {
        deps : ['jquery']
      },
      ckeditor : {
        exports : 'CKEDITOR'
      },
      jcrop : {
        deps : ['jquery']
      }
    }
});
