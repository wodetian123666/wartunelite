var nav = document.querySelector('.cookie-nav');
var list = nav.querySelectorAll('.cookie-nav-list');

var cookieName = 'COOKIES_TOKEN';
var cookieStorage = {
    getStorage: function () {
        return window.localStorage.getItem(cookieName)
    },
    setStorage: function (val) {
        window.localStorage.setItem(cookieName, val)
    }
}
var isAccept = cookieStorage.getStorage();
if (!isAccept) {
    $dom('.cookies').style.display = 'flex';
}
for (var i = 0; i < list.length; i++) {
    list[i].index = i;
}
nav.addEventListener('click', function (e) {
    var ul = document.querySelector('.cookies-desc-ul');
    var lis = ul.getElementsByTagName('li');
    // console.log(e.target.index, lis)
    for (var i = 0; i < list.length; i++) {
        if (e.target.index == i) {
            list[i].classList.add('act')
            lis[i].classList.remove('hide')
        } else {
            list[i].classList.remove('act')
            lis[i].classList.add('hide')
        }
    }
})
$dom('.cookie-policy').onclick = function () {
    $dom('.cookies-pop').style.display = 'block';
}
$dom('.cookies-close').onclick = function () {
    $dom('.cookies-pop').style.display = 'none';
}
$dom('.accept').onclick = function () {
    $dom('.cookies').style.display = 'none';
    cookieStorage.setStorage('1')
}
$dom('.cookie-close').style.bottom = $dom('.cookies').offsetHeight + 'px';
$dom('.cookie-close').onclick = function () {
    $dom('.cookies').style.display = 'none';
}
function $dom(clsname) {
    return document.querySelector(clsname)
}

