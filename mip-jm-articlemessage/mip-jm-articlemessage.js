/**
 * @file mip-jm-articlemessage 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var $element = $(this.element);
        var $form = $element.find('form');
        var $searchBtn = $element.find('#formbtn');

        var cateId = $('mip-jm-articlemessage').attr('data-cateid');
        var articleId = $('mip-jm-articlemessage').attr('data-articleid');
        var dataUrl = $('mip-jm-articlemessage').attr('data-url');
        var dataRemark = $('mip-jm-articlemessage').attr('data-remark');

        var $name = $element.find('#formname');
        var $phone = $element.find('#formphone');
        var $content = $element.find('#formcontent');

        $element.find('#question li').click(function () {
            var txt = $(this).find('span').text();
            $element.find('#formcontent').val(txt);
        });

        $searchBtn.on('click', function () {
            forSearch($name, $phone, $content);
        });

        $form.on('submit', function () {
            forSearch($name, $phone, $content);
            return false;
        });
        $form.on('keydown', function (e) {
            var keycode = e.keyCode;
            if (keycode === 13 || keycode === 9) {
                e.preventDefault();
                forSearch($name, $phone, $content);
                $name.blur();
                $phone.blur();
                return false;
            }

        });

        var mo = function (e) {
            e.preventDefault();
        };
        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }

            return scrollTop;
        }

        /***禁止滑动***/
        function stop() {
            document.body.style.overflow = 'hidden';
            document.addEventListener('touchmove', mo, false); // 禁止页面滑动
        }

        /***取消滑动限制***/
        function move() {
            document.body.style.overflow = ''; // 出现滚动条
            document.removeEventListener('touchmove', mo, false);
        }

        function closearticle($modelbg, $model) {
            $modelbg.fadeOut(300);
            $model.fadeOut(300);
            move();
        }

        function openarticle($modelbg, $model, $text) {
            stop();
            $modelbg.bind('touchmove', function (e) {
                e.preventDefault();
            });
            $model.bind('touchmove', function (e) {
                e.preventDefault();
            });
            $model.css('top', getScrollTop() + 300 + 'px');
            $modelbg.css('height', getScrollTop() + 1000 + 'px');
            $element.find('.text').text($text);
            $modelbg.fadeIn(300);
            $model.fadeIn(300);
        }

        function openAlart($showtext, callback) {
            stop();
            $element.find('.qx_close').show();
            openarticle($element.find('.model_bg'), $element.find('.article_model'), $showtext);
            if (callback) {
                $element.find('.article_close').click(function () {
                    closearticle($element.find('.model_bg'), $element.find('.article_model'));
                    callback();
                });
            }
        }

        $element.find('.article_close').click(function () {
            closearticle($element.find('.model_bg'), $element.find('.article_model'));
        });

        function forSearch($name, $phone, $content) {
            var name = $name.val();
            var phone = $phone.val();
            var content = $content.val();
            if ($.trim(name).length === 0) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '姓名不能为空');
                return false;
            }

            if ($.trim(name).length > 20) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '姓名字符数不能过20位');
                return false;
            }

            if ($.trim(phone).length === 0) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '手机号不能为空');
                return false;
            }

            if (!(/^1[34578]\d{9}$/.test(phone))) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '手机号格式不正确');
                return false;
            }

            if ($.trim(content).length === 0) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '留言不能为空哦');

                return false;
            }

            if ($.trim(content).length > 500) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '留言字符数不能过500');

                return false;
            }

            ajaxRequest(name, phone, content, cateId, articleId, dataRemark);
        }
        // ajax请求获取页面跳转地址
        function ajaxRequest(name, phone, content, cateId, articleId, dataRemark) {
            var formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('content', content);
            formData.append('cate_id', cateId);
            formData.append('article_id', articleId);
            formData.append('remark', dataRemark);
            fetch(dataUrl, {
                method: 'POST',
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response.status === 1) {
                    openAlart(response.msg, function () {
                        window.top.location.href = response.url;
                    });
                }
                else if (response.status === 0) {
                    openarticle($element.find('.model_bg'), $element.find('.article_model'), response.msg);
                }

            }).catch(function (e) {
                openarticle($element.find('.model_bg'), $element.find('.article_model'), '网络错误，请稍后重试。');

            });
        }
    };

    return customElement;
});
