

// tencent 图形验证码
var captStr = '<div class="getcode getcode1 captcha" id="captchaHkym">获取验证码</div><div class="getcode sendcode" >获取验证码</div>'
var captStr1 = '<div class="getcode getcode2 captcha" id="captchaHkym">获取验证码</div><div class="getcode sendcode" >获取验证码</div>'
var isClick = true;
var resCode = 0;
var timer;
var username_reg = /^[a-zA-Z]{1}([a-zA-Z0-9]){5,17}$/  //用户名: 字母开头由大小写字母、数字组成长度为6-18位
var password_reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![\_\+\=\*\!\@\#\$\%\^\&\()]+$)[\da-zA-Z\!\_\+\=\*\!\@\#\$\%\^\&\()]{6,20}$/ //密码: 6-20位，至少带字母数字符号中的两种的正则

var SITE_COM = SITE_COM || {};
var SITE_ACTION = {
    registerUrl : _MAIN_SITE_URL + '/accounts/register/',
    forgetUrl : _MAIN_SITE_URL + '/accounts/forget_password.html',
    checkLogin2: _MAIN_SITE_URL + "/accounts/isLogin.html",
    login2: _MAIN_SITE_URL + "/accounts/checklogin.html",
    sendSms: _MAIN_SITE_URL + "/accounts/sendSms.html",
    checkSms: _MAIN_SITE_URL + "/accounts/checkSms.html",
    loginSms: _MAIN_SITE_URL + "/accounts/checkLoginSms.html",
    webGameUrl: _MAIN_SITE_URL + "/game/play/sid/",
    webGameUrl2: _MAIN_SITE_URL + "/game/play?sid=",
    membersUrl : _MAIN_SITE_URL + '/members/'
};
SITE_COM.Cookie = {

    setCookie: function (name, value, days) {
        var Days = days || 30; //this cookie will be saved 30 days default
        var exp = new Date(); //example:new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    getCookie: function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;
    },

    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

SITE_COM.Storage = {

    setStorage: function (name, value) {
        localStorage.setItem(name, value);
    },

    getStorage: function (name) {
        return localStorage.getItem(name);
    },

    delStorage: function (name) {
        localStorage.getItem(name);
    }
};
// {}对象最后一个参数 不以',' 结尾 否则  Vconsole会报错
// $(".pass-wrap").append(captStr)
if(document.getElementById('mobile')){
	document.getElementById('mobile').insertAdjacentHTML('afterEnd',captStr)
}
if(document.getElementById('mobile1')){
	document.getElementById('mobile1').insertAdjacentHTML('afterEnd',captStr1)
}
function c_login_check_sms( mobile, code, operation, obj ){
	$.getJSON(SITE_ACTION.checkSms + "?code=" + code + "&operation=" + operation + "&mobile=" + mobile + "&jsonpCallback=?", function (data) {
		console.log("data",data)
		if( data.state == "-7" ){
			alert(data.msg);
			window.location.href = SITE_ACTION.forgetUrl;
			return false;
		} else if( data.state != 1 ) {
			alert(data.msg);
		} else {
			console.log( "user_list", data.user_list )
			if ( typeof data.user_list == 'undefined') {
				//一条数据
				obj.loginBox.login( data )
				c_toscript( data );
				$("body").append("<script>setTimeout(function(){window.location.reload();},500)</script>");
			} else {
				// //两条数据 => 弹窗
				// obj 方法的集合对象
				obj.loginBox.selectUser( data )
			}

		}

	});
}

function c_login_sms( username, mobile, code, operation, obj ){
	$.getJSON(SITE_ACTION.loginSms + "?cn=" + username + "&code=" + code + "&operation=" + operation + "&mobile=" + mobile + "&jsonpCallback=?", function (data) {
		if( data.state == "-7" ){
			alert(data.msg);
			window.location.href = SITE_ACTION.forgetUrl;
			return false;
		} else if( data.state != 1 ) {
			alert(data.msg);
		} else {
			obj.loginBox.login( data )
			c_toscript( data );
			$("body").append("<script>setTimeout(function(){window.location.reload();},500)</script>");
		}
	});
}
function c_logout( url ) {
    $.post(url, {}, function (data) {
        data = typeof data == "string" ? eval("(" + data + ")") : data;
        if (data.state == 1) {
//            $("body").append(data.script);
	    c_toscript( data );
            $("body").append("<script>setTimeout(function(){window.location.reload();},500)</script>");
        } else {
            alert(data.msg);
        }
    });
}

function c_checkLogin( url, obj ) {
    $.ajax({
        url: url+"?",
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
        xhrFields: { withCredentials: true },
        crossDomain:true,
        success: function(data){
            data = typeof data == "string" ? eval("("+data+")") : data;
            if(data.state == "1"){
                obj.loginBox.logged(data);
            }else {
                obj.loginBox.loginOut(data);
            }
        }
    });
}
function c_login( username, password, obj ){
    password = encodeURIComponent(password);
    $.getJSON(SITE_ACTION.login2 + "?cn=" + username + "&pwd=" + password + "&jsonpCallback=?", function (data) {
        if( data.state == "-7" ){
            alert(data.msg);
            window.location.href = SITE_ACTION.forgetUrl;
            return false;
        } else if( data.state != 1 ) {
            alert(data.msg);
        } else {
            obj.loginBox.login( data )
            //$("body").append(data.script);
	    c_toscript( data );
            $("body").append("<script>setTimeout(function(){window.location.reload();},500)</script>");
        }
    });
}

function c_toscript( data ){
	return true;
    if ( window.location.protocol == 'https:' ) {
        var scriptSrcArr = c_scriptStringSrc(data.script);
        for(var i = 0; i < scriptSrcArr.length; i++){
            var scriptObj = document.createElement("script");
            scriptObj.type = "text/javascript";
            scriptObj.reload = "1";
            scriptObj.src = scriptSrcArr[i].replace("http:","https:");
            document.body.appendChild(scriptObj);
        }
    } else {
        $("body").append(data.script);
    }
}

function c_scriptStringSrc(str){
    var str1 = str.split("</scr"+"ipt>");
    var srcArr = [];
    for(var i= 0; i<str1.length; i++){
        if(str1[i].length>1){
            var str2 = str1[i].split("src=")[1].split("reload")[0].replace(/ /g,"");
            str2 = str2.substr(1,str2.length-2);
            srcArr.push(str2);
        }
    }
    return srcArr;
}
function getCode(sendCodeApi,tel){
	var mobile = tel;
	// var mobile = $.trim($('#mobile').val());
	if(mobile == '' || !util.checkGlobalMobile(mobile)){
		tipOpen("请填写正确的手机号！",2000);
		return;
	}else{
		if(isClick){
			var bizState = {sendCodeApi:sendCodeApi}
			try {
				captcha1 = new TencentCaptcha(
					'2044077816',
					tencentcallback,
					{bizState:bizState}
				);
				captcha1.show();
			}catch (error) {
				loadErrorCallback();
			}
		}else{
			return;
		}
	}
	 
}
function loadErrorCallback() {
	var appid = ''
	 // 生成容灾票据或自行做其它处理
	var ticket = 'terror_1001_' + appid + Math.floor(new Date().getTime() / 1000);
}
 
function tencentcallback(res) {
	var mobile = document.getElementById("mobile").value.trim() || document.getElementById("mobile1").value.trim();
  if (res.ret === 0){
	// var mobile = res.bizState.mobile
	var obj = {
		mobile: mobile,
		ticket:res.ticket,
		randstr:res.randstr
	}
	ajaxP(res.bizState.sendCodeApi, obj, function(res){
		if(res['code'] == resCode){
			isClick = false;
			$(".captcha").hide()
			$(".sendcode").show()
			countDown('getcode');
		}
		tipOpen(res['msg'],2000)
	})
  }
}
function countDown(cls){
	var time = 60;
	$('.' + cls).text(time+'s');
	timer = setInterval(function(){
		time--;
		
		if(time < 1){
			$('.' + cls).text('重新发送');
			clearInterval(timer);
			isClick = true;
			
			$(".captcha").show()
			$(".sendcode").hide()
			return;
		}
		$('.' + cls).text(time+'s');
	}, 1000)
}
function ajax(str, param, method, callback){
	$.ajax({
		url: _LOC_URL + str,
		data: param,
		dataType: "json",
		type: method,
		success: function(res){
			callback(res);
		},
		error: function(res){
			// console.log(res)
		}
	})
}

function ajaxP(url,param,callback){
	$.ajax({
		url: url+"?",
		data: param,
		dataType: 'jsonp',
		jsonp: 'jsonpReturn',
		// jsonpCallback: 'jsonpReturn',
		// contentType: 'application/json; charset=utf-8',
		xhrFields: { withCredentials: true },
		crossDomain:true,
		success: function(res){
			callback(res)
		}
	});
}

function fileajax(str, param, method, callback){
	$.ajax({
		url: _LOC_URL + str,
		data: param,
		dataType: "json",
		async: true,
		type: method,
		contentType: false, 
		cache: false,
		processData: false,
		success: function(res){
			callback(res);
		},
		error: function(res){
			// console.log(res)
		}
	})
}
function ajaxFunc(url, data, callback) {
	$.ajax({
		url: _LOC_URL + url,
		method: 'post',
		data: data,
		success: function(res) {
			callback(res)
		},
		error: function(error) {
			console.log(error)
		}
	})
}
function isMobile(){
    if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      return true; // 移动端
    }else{
      return false; // PC端
    }
}

function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
// 提示 需在页面加dom
function toast(msg){
	$('.toast').text(msg).show();
	var timer = setTimeout(function(){
		$('.toast').hide();
		clearTimeout(timer);
	}, 2000);
}
function getParam(){
	var obj = {};
	var url = decodeURI(window.location.href);
	if(url.indexOf("?") == -1){
		return {};
	}
	var param = url.slice(url.indexOf("?") + 1);
	// console.log(url.indexOf("?"),param)
	var kv = param.split('&');
	for(var i = 0, len = kv.length; i < len; i++){
		var o = kv[i].split('=');
		obj[o[0]] = o[1];
	}
	return obj;
}

function setCookie(cname, cvalue, exdays = 365) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		 }
		if (c.indexOf(name)  == 0) {
			return c.substring(name.length, c.length);
		 }
	}
	return "";
}

function delCookie(cname) {
	new Date;
	document.cookie = cname + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/"
}
// session storage

// toast 提示
function tipOpen(tipContent, tipTime = 2500) {
	var tipHtml = `
		<style>
			.tipbox{position: fixed; font-size: 14px; background: #000; color: #fff;left: 50%; top: 10%; transform: translateX(-50%); padding: 5px 10px; max-width: 600px;z-index: 999;}
		</style>
		<div class="tipbox">${tipContent}</div>
	`
	// var tipHtml = "<article class='m-tiphtml-box' style='z-index:99999;text-align:center'>";
	// tipHtml += "<div class='tip-box-op0'></div>";
	// tipHtml += "<div class='tip-box-op1'>" + tipContent + "</div>";
	// tipHtml += "</article>";
	$("body").append(tipHtml);
	var tipTimeOut = setTimeout(function() {
		$('.tipbox').remove()
		clearTimeout(tipTimeOut)
	}, tipTime);
}
function tipClose() {
	if (tipTimeOut) {
		clearTimeout(null);
	}
	$(".m-tiphtml-box").remove();
}
// toast 提示
function tipOpenPc(tipContent, tipTime) {
	var tipHtml = "<article class='pc-tiphtml-box' style='z-index:99999;text-align:center'>";
	tipHtml += "<div class='tip-box-op0'></div>";
	tipHtml += "<div class='tip-box-op1'>" + tipContent + "</div>";
	tipHtml += "</article>";
	$("body").append(tipHtml);
	tipTimeOut = setTimeout(function() {
		tipClosePc();
	}, tipTime);
}
function tipClosePc() {
	if (tipTimeOut) {
		clearTimeout(null);
	}
	$(".pc-tiphtml-box").remove();
}
// if(channelAdju.isQq()){
// 	alert(3)
// }
function popShow(cls){
	$('.pop').show();
	$('.'+cls).show().siblings().hide();   
	$('.pop').css({'position': 'fixed'});
}
//过程滚动
function scrollSmoothTo(position) {
	if(!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			return setTimeout(callback, 17);
		};
	}
	// 当前滚动高度
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	// 滚动step方法
	var step = function() {
		// 距离目标滚动距离
		var distance = position - scrollTop;
		// 目标滚动位置
		scrollTop = scrollTop + distance / 5;
		if(Math.abs(distance) < 1) {
			window.scrollTo(0, position);
		} else {
			window.scrollTo(0, scrollTop);
			requestAnimationFrame(step);
		}
	};
	step();
	if(typeof window.getComputedStyle(document.body).scrollBehavior == 'undefined') {
		// 传统的JS平滑滚动处理代码...
	}
};
// 滚动
function scrollTop(rate) {
	var doc = document.body.scrollTop ? document.body : document.documentElement;
	var scrollTop = doc.scrollTop;

	var top = function() {
		scrollTop = scrollTop + (0 - scrollTop) / (rate || 2);

		// 临界判断，终止动画
		if(scrollTop < 1) {
			doc.scrollTop = 0;
			return;
		}
		doc.scrollTop = scrollTop;
		// 动画gogogo!
		requestAnimationFrame(top);
	};
	top();
};
function share(share_id,title,desc,imgurl,linkurl){
	// qq wx分享
	var urlx = location.href.split('#')[0];
	var urla = encodeURIComponent(urlx);
	var shareData = {
		'title': title,
		'description': desc,
		'Coshow': title,
		'image': imgurl,
		'link': linkurl + "?share_id=" + share_id,
	};

	$.ajax({
		url: 'https://plat.sh7road.com/index/wechat.js_sdk/oauth?jsonpcallback=1',
		data: {url: urla},
		dataType: "jsonp",
		contentType: "application/json; charset=utf-8",
		type: 'get',
		success: function(res){
			console.log(res)
			if (  res.code == 0  ) {
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger") {
					wx.config({
						//debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						// appId: "wxcc2d408a390ddb18",
						appId: res.data.appId, // 必填，公众号的唯一标识
						timestamp: res.data.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.data.wxnonceStr, // 必填，生成签名的随机串
						signature: res.data.wsSha1,// 必填，签名
						jsApiList: [
							'updateTimelineShareData',//“分享到朋友圈”及“分享到QQ空间”
							'updateAppMessageShareData',//“分享给朋友”及“分享到QQ”
							// 'onMenuShareTimeline',//分享到朋友圈
							// 'onMenuShareAppMessage',//分享给朋友

						] // 必填，需要使用的JS接口列表
					});

					wx.ready(function () {   //需在用户可能点击分享按钮前就先调用

						wx.updateAppMessageShareData({
							title: shareData.title, // 分享标题
							desc: shareData.description, // 分享描述
							link: shareData.link,
							imgUrl: shareData.image, // 分享图标
							success: function () {
								// 设置成功
								console.log("分享成功")
							}
						});
						wx.updateTimelineShareData({
							title: shareData.title, // 分享标题
							desc: shareData.description, // 分享描述
							link: shareData.link,
							imgUrl: shareData.image, // 分享图标
							success: function(res) {
								// 设置成功
								console.log("分享成功")
							},
							cancel: function(res) {},
							fail: function(res) {}
						});
					});
					wx.error(function(res){
						console.log(res)
						// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					});
				} else if(channelAdju.isQq())  {
					setShareInfo({
						title: shareData.title,
						summary: shareData.description,
						pic: shareData.image,
						url: shareData.link,
					});
				}
			} else {
				console.log( res.msg );
			}
		},
		error: function(res){
			console.log(res)
		}
	})
}
//facebook分享初始化
function shareFbInit(appid) {
	window.fbAsyncInit = function() {
		FB.init({
			appId      : appid,
			// appId      : '1436980326657486',//測試
			cookie     : true,
			xfbml      : true,
			version    : 'v13.0'
		});
		// FB.AppEvents.logPageView();
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}
// facebook 分享
function shareFbUrl(shareObj) {
	FB.ui({
		display: 'popup',
		method: 'share',
		href: _URL_PATHNAME,
	}, function (response) {
		if (response) {
			// tipOpen("fail", 2000)
		} else {
			// tipOpen("succeed", 2000)
		}
	});
}
// twitter 分享
function shareTwUrl(title=''){
	window.open('http://twitter.com/share?url=' + encodeURIComponent(_URL_PATHNAME) + '&text=' + encodeURIComponent(title), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
}
// 新浪微博
// function xlwb(){
// 	window.open('http://v.t.sina.com.cn/share/share.php?title=' +'ffff'+ '&url=' + window.location.href)
// }
function shareToXl(title, url, picurl) {
	var sharesinastring =
		'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;
	window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
}

function shareToQq(title, url, picurl) {
	var shareqqzonestring =
		'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url + '&pics=' + picurl;
	window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
}

function checkGlobalUsernameLength( val ){
	return username_reg.test(val)  ? true : false;
}

function checkGlobalPasswordLength( val ){
	return password_reg.test(val) ? true : false;
}

function errorMsgUsernameLength() {
	return 'Starts with a letter, consists of 6-18 letters/numbers';
}

function errorMsgUsername() {
	return 'invalid username!';
}

function errorMsgPasswordLength() {
	return '6-20 letters, numbers, symbols (_+=*!@#$%^&())';
}

function errorMsgPassword() {
	return 'invalid password!';
}