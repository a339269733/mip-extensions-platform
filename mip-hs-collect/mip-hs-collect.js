/**
 * @file mip-hs-collect 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {

        var $el = $(this.element);
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
            $el.find('.text').text($text);
            $modelbg.fadeIn(300);
            $model.fadeIn(300);
        }

        function openAlart($showtext, callback) {
            stop();
            $el.find('.qx_close').show();
            openarticle($el.find('.model_bg'), $el.find('.article_model'), $showtext);
            if (callback) {
                $el.find('.article_close').click(function () {
                    closearticle($el.find('.model_bg'), $el.find('.article_model'));
                    callback();
                });
            }
        }

        $el.find('.article_close').click(function () {
            closearticle($el.find('.model_bg'), $el.find('.article_model'));
            $el.find('.qx_close').fadeOut(300);
        });
        $el.find('.qx_close').click(function () {
            closearticle($el.find('.model_bg'), $el.find('.article_model'));
            $el.find('.qx_close').fadeOut(300);
        });
        $el.find('.collect').click(function () {
            var That = $(this);
            var uncollect = That.parent().attr('url-uncollect');
            var collect = That.parent().attr('url-collect');
            var num = That.parent().attr('url-id');
            if (That.hasClass('collected')) {
                $.ajax({
                    type: 'post',
                    url: uncollect,
                    data: {
                        'question_id': num
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status === 0) {
                            That.removeClass('collected');
                        }
                        else {
                            openarticle($el.find('.model_bg'), $el.find('.article_model'), data.msg);
                        }
                    },
                    error: function (data) {
                        if (data.statusText === 'Unauthorized') {
                            openAlart('请登录', function () {
                                window.top.location.href = '/login?service=welcome';
                            });
                        }

                    }
                });
            }
            else {
                $.ajax({
                    type: 'post',
                    url: collect,
                    data: {
                        'question_id': num
                    },
                    dataType: 'json',
                    success: function (data) {
                        That.addClass('collected');
                    },
                    error: function (data) {
                        if (data.statusText === 'Unauthorized') {
                            openAlart('请登录', function () {
                                window.top.location.href = '/login?service=welcome';
                            });
                        }

                    }
                });
            }
        });
    };
    return customElement;
});
