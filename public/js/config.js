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
        common : '../js/common',
        login : '../js/login',
        teacherList : '../js/teacherList',
        teacherEdit : '../js/teacherEdit',
        util : '../js/util'
    },
    shim : {
      bootstrap : {
        deps : ['jquery']
      },
      language : {
        deps : ['jquery','datePicker']
      }
    }
});
