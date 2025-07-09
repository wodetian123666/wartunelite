/*
    神曲公共脚本
*/
var SQ_COM = SQ_COM || {};

var SQ_ACTION = {
    checkLogin:"/Index/isLogin",
    loginOut:"/Index/loginout",
    operation_sms:'game_sqh5_login'
};
var channelAdju = {
   _ios_channel:function() {
       // ua.indexOf('iphone') > -1||ua.indexOf('ipad') > -1||ua.indexOf('mac os x') > -1
       var ua = navigator.userAgent.toLowerCase();
       if(ua.indexOf('iphone') > -1||ua.indexOf('ipad') > -1||ua.indexOf('mac os x') > -1) {
           return true;
       } else {
           return false;
       }
   },
    //判断是否为安卓
    _IsAndroid: function() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/Android/i) == "android") {
            return true;
        } else {
            return false;
        }
    },
    //判断是否为windows
    _IsWindows: function() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.indexOf("win32") >= 0||ua.indexOf("wow32") >= 0||ua.indexOf("win64") >= 0||ua.indexOf("wow64") >= 0) {
            return true;
        } else {
            return false;
        }
    },
}
var isLogin = false
var ispop = 0
/*---------------------------------------------------------------------------------------------
    用户 登录，退出 相关操作
---------------------------------------------------------------------------------------------*/
SQ_COM.userLoginOperate = {

    //判断是否登录
    checkLogin: function () {
        c_checkLogin(SITE_ACTION.checkLogin2, SQ_COM)
    },

    //用户登录--密码
    login: function (inName, password1) {
        c_login(inName, password1, SQ_COM )
    },

    //用户登录--短信(验证)
    checkSms: function ( mobile, code, operation) {
        c_login_check_sms( mobile, code, operation, SQ_COM )
    },

    loginSms: function (inName, mobile, code, operation) {
        c_login_sms(inName, mobile, code, operation, SQ_COM )
    },

    //用户退出
    loginOut: function () {
        c_logout(SQ_ACTION.loginOut)
    }
    
};

SQ_COM.loginBox = {
    
    //登录了，改变状态
    logged : function(data){

        isLogin = true
        $(".isLogin").text("SIGNED IN")
        $('.info').show()
        $('.name').text(data.datas.nickname)
        if (typeof sid !== "undefined" && sid) {
            $('.play_game').attr( "href", SITE_ACTION.webGameUrl + sid + '.html' );
            // $('.play_game').attr( "href", "javascript:;alert('Closed Alpha Test has ended. Stay tuned! ');" );
        } else {
            $('.play_game').attr( "href", "javascript:;alert('Closed Alpha Test has ended. Stay tuned! ');" );
        }
        $('.nav-login').hide();
        $('.nav-logged').show();
        $('.boxlogin').hide();
        $('.boxloginer').show();
    },
    
    //退出了，改变状态
    loginOut : function(data){
        var $userLogin = $(".unlogin-box");
        var $userLogged = $(".logined-box");
        
        $userLogin.show();
        $userLogged.hide();

        //判断COOKIE是否有用户名
        var cookieUsername = SITE_COM.Cookie.getCookie("_sq_login_remember");
        if( cookieUsername ){
            $("#uid").val( cookieUsername );
            $("#account1").val( cookieUsername );
            $("#account").val( cookieUsername );
            $("#username").val( cookieUsername );
            $("[name='klp']").attr("checked",'true');
            $("[name='kl']").attr("checked",'true');
            $("#user").hide();
        }
    },

    //登录操作
    login:function (data) {

        //是否记住用户名
        // if ($(".iremember input").is(':checked')) {
        //     SITE_COM.Cookie.setCookie("_sq_login_remember", data.datas.username);
        // }else{
        //     SITE_COM.Cookie.delCookie("_sq_login_remember");
        // }
        // pc mb
        if ($("#keepLoginpage").is(':checked')||$("#keepLogin").is(':checked')) {
            SITE_COM.Cookie.setCookie("_sq_login_remember", data.datas.username);
        }else{
            SITE_COM.Cookie.delCookie("_sq_login_remember");
        }
    },

    //选择帐号
    selectUser: function (data){
        console.log("two user")
        // 渲染data
        var selectArr = data.user_list
        var selectstr = ''
        // var selectArr=[{username: "13818629739", lastlogin_time: "1653618538"},{username: "rlf002", lastlogin_time: "1649910536"}]
        
        selectArr.forEach(function(item,index){
            console.log(item,index)
            selectstr+='<li data-name="'+ item['username'] +'">'+item['username']+'</li>'
        });
        $(".morecount").empty()
        $(".morecount").append(selectstr)
        // 显示弹窗
        if(ispop){
            $(".selectcount2").removeClass("hide")
        }else{
            $(".selectcount1").removeClass("hide")//包含移动端的 选择账号
        }
        
       
    }
};
// SQ_COM.loginBox.selectUser()
$(function(){
    $('.downbtn, .download').click(function() {
        var url = $(this).attr('data')
        console.log(url)
        if (url == ''||url == undefined) {
            alert('Coming soon...')
        } else {
            window.location.href = url
        }
    })
    
    $('.register_url').attr( 'href', SITE_ACTION.registerUrl );
    $('.forget_url').attr( 'href', SITE_ACTION.forgetUrl );

    // 导航登录
    $(".nav-login").on("click",function(){
        
        $(".pop-pc").removeClass("hide")

        $(".pop-pc .pop-login").removeClass("hide")
        ispop = 1;//弹窗状态

    })
    // 页面登录

    $(".close").click(function(){
        console.log(2)
        $(".pop-pc").addClass("hide")
        ispop = 0;//弹窗关闭
    });
    //账号登录
    $(".login-btn").on("click",function(){
        var name = $('#account').val()
        var pass = $('#psw').val()
        if(name == ''){
            alert("Please enter username")
            return
        }
        if(pass == ''){
            alert("Please enter password")
            return
        }
        SQ_COM.userLoginOperate.login(name, pass)
    });
    
    $(".page-login-btn").on("click",function(){
        
        var name = $('#account1').val()
        var pass = $('#psw1').val()
        if(name == ''){
            alert("Please enter username")
            return
        }
        if(pass == ''){
            alert("Please enter password")
            return
        }
        SQ_COM.userLoginOperate.login(name, pass)
    });
    //注册 regist
    $(".r-acount").on("click",function(){
        window.location.href = SITE_ACTION.registerUrl;
    });
    $(".regist").on("click",function(){
        window.location.href = SITE_ACTION.registerUrl;
    });
    
    //忘记密码 fogot
    $(".f-psw").on("click",function(){
        window.location.href = SITE_ACTION.forgetUrl;
    });
    $(".fogot").on("click",function(){
        window.location.href = SITE_ACTION.forgetUrl;
    });
    // 退出登录
	$(".loginOut").on("click",function(){
        SQ_COM.userLoginOperate.loginOut()
    })
    // completDt 完善资料
    $(".completDt").on("click",function(){
        window.location.href = SITE_ACTION.membersUrl;
    });
    //资讯
    // $(".nav-home").on("click",function(){
    //     window.location.href = '/';
    // });
    //资讯
    // $(".nav-news").on("click",function(){
    //     window.location.href = '/article.html';
    // });

    SQ_COM.userLoginOperate.checkLogin(function (data) {
        SQ_COM.loginBox.logged(data);
    }, function (data) {
        SQ_COM.loginBox.loginOut(data);
    });
    // SQ_COM.userLoginOperate.checkLogin();
});