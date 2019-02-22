/**
 * @file mip-dyyxz-adddata 组件
 * @author guyx@leshu.com
 */

define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var fetchJsonp = require('fetch-jsonp');

    var customElement = require('customElement').create();

    /**
     * 初始化-构建初始化元素
     */
    customElement.prototype.firstInviewCallback = function () {
        // 点击加载逻辑层
        var self = $('#dyyxz-adddata');
        var clicksum = self.find('.leshu-clickadd');
        var phpUrl = self.find('.information').attr('data-phpurl');
        clicksum.on('click', 'a', function (params) {
            self.attr('data-flag', phpUrl);
        });
        itime(self);
        fetchJsonp('//m.9k9k.com/operation/iplocation.php?ac=getposcall&acd=' + phpUrl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var adddata = $('mip-dyyxz-adddata a');
            /**
            * 添加数据
            */
            if (adddata.eq(0).attr('modeid') === ',12,' && data.recomdCity) {
                if (adddata.eq(0).attr('datahref') !== 'undefined' && adddata.eq(0).attr('class') === 'ios') {
                    adddata.eq(0).attr('href', ' ').removeAttr('datahref');
                    adddata.eq(0).addClass('no').text('暂无下载');
                }
                if (adddata.eq(1).attr('datahref') !== 'undefined' && adddata.eq(1).attr('class') === 'android') {
                    adddata.eq(0).attr('href', ' ').removeAttr('datahref');
                    adddata.eq(0).addClass('no').text('暂无下载');
                }
            }
        }
        );
        function itime(self) {
            setTimeout(function () {
                self.find('.f-eject-cont').show();
            }, 100);
        }
    };

    return customElement;
});

