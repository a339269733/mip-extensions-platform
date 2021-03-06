/**
 * @file mip-stat-wulinbang 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();

    function bindEle() {
        var statTarBox = document.getElementsByTagName('mip-stat-wulinbang');
        var i = 0;
        var n = location.href;
        var statLen = statTarBox.length;
        var url = null;
        var el = null;
        var code = null;
        var uid = null;
        var lO = null;
        var agt = navigator.userAgent;
        var r = encodeURIComponent(n);
        var lg = navigator.systemLanguage || window.navigator.language;
        var OS = navigator.platform;
        var aV = navigator.appVersion;
        var fBL = screen.width + '*' + screen.height;
        var aN = navigator.appName;
        for (; i < statLen; i++) {
            el = statTarBox[i];
            code = el.getAttribute('stat-code') || '';
            uid = el.getAttribute('stat-uid') || '';
            lO = el.getAttribute('stat-lo') || '';
            url = '//union2.50bang.org/web/' + code
            + '?uId2=SPTNPQRLSX&uId=' + uid + '&agt=' + agt
            + '&r=' + r + '&aN=' + aN + '&lg=' + lg
            + '&OS=' + OS + '&aV=' + aV + '&fBL=' + fBL + '&lO=' + lO;
            el.addEventListener('click', function () {
                createScript(url);
            });
        }
    }

    function visitStat() {
        var srcVisit = 'http://union2.50bang.org/web/';
        var statTarBox = document.getElementsByTagName('mip-visit-wulinbang');
        var visitLen = statTarBox.length;
        var i = 0;
        var el = null;
        var kwd = null;
        var url = null;
        var fBL = screen.width + '*' + screen.height;
        for (; i < visitLen; i++) {
            el = statTarBox[i];
            kwd = el.getAttribute('visit-kwd') || '';
            url = srcVisit + kwd + '?uId2=SPTNPQRLSX&r=&fBL=' + fBL;
            createImg(url);
        }
    }
    // 此处引入的js代码为第三方统计JS。
    // 用途：实现点击统计和访问统计·
    // 服务提供商：50bang
    function createScript(t) {
        if (t && void 0 !== t) {
            var i = document.createElement('script');
            return i.setAttribute('type', 'text/javascript'),
                i.setAttribute('src', t),
                document.getElementsByTagName('head')[0].appendChild(i),
                !0;
        }
    }

    function createImg(url) {
        if (url && void 0 !== url) {
            var i = document.createElement('img');
            return i.setAttribute('border', '0'),
            i.setAttribute('hspace', '0'),
            i.setAttribute('vspace', '0'),
            i.setAttribute('height', '0'),
            i.setAttribute('width', '0'),
            i.setAttribute('src', url),
            document.getElementsByTagName('body')[0].appendChild(i),
            !0;
        }
    }
    customElement.prototype.build = function () {
        visitStat();
        bindEle();
    };

    return customElement;

});