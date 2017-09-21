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
        common : '../js/common',
        login : '../js/login',
        teacherList : '../js/teacherList'
    },
    shim : {
      bootstrap : {
        deps : ['jquery']
      }
    }
});
