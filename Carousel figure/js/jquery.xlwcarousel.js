/**
 * Created by xinliwei on 2016-12-30 0030.
 */
// 自定义插件
(function ($) {
    // $.fn等价于jQuery.prototype
    // $.fn.extend可理解为继承对象，同样继承了该对象中的carousel方法
    $.fn.extend({
        // carousel是插件函数名称。这里可传入一个参数对象
        carousel: function (options) {
            // 设置默认参数值
            var defaults = {
                currentZIndex: 1,      // 代表当前最大的z-index
                currentPicIndex: 0,    // 代表当前焦点图片的索引
                timer: null,           // 保存定时器变量
                delay: 3000,          // 图片切换的延时
                width: "570px",          // 默认图片宽度，也是图片向左位移的值
                height: "270px",          // 默认图片高度

                navClass:"xlw-nav",     // 导航按钮(span)背景样式
                navNormalClass: "xlw-normal",     // 导航按钮默认样式
                navCurrentClass: "xlw-current"    // 导航按钮自定义样式
            };

            // 用一个或多个其他对象来扩展一个对象，返回被扩展的对象。
            // jQuery.extend(target, object1, [objectN]);　
            defaults = $.extend(defaults, options); // 使用传入的参数来扩展默认参数

            var $bannerPic = this.children().first();   // 轮播图片
            var $bannerNav = this.children().last();    // 导航按钮

            // 将第一张图片放在最上面
            var $firstPic = $bannerPic.find("a:first");
            $firstPic.css("zIndex", defaults.currentZIndex);
            // 计算图片的宽度和高度(也是第一张图片向左位移的距离，以及banner的宽高)
            defaults.width = $firstPic.width();
            defaults.height = $firstPic.height();

            // 初始化banner
            // 设置banner的宽高
            this.css({
                width: defaults.width,
                height: defaults.height,
                position: "relative",
                overflow: "hidden"
            });

            /* 下面是导航按钮的样式 */
            $bannerNav.css({
                position: "absolute",
                zIndex: 99999,
                right: "5px",
                bottom: "5px",
                fontWeight: 700,
                fontFamily: "Arial"
            });

            /****************以下为增加鼠标悬停事件响应********************/
            // 添加鼠标悬停事件响应
            this.hover(
                function () {
                    // 停止图片播放-清除定时器
                    clearInterval(defaults.timer);
                },
                function () {
                    playBanner();   // 继续播放
                }
            );

            /****************以下为动态生成导航按钮********************/
            // 动态生成导航按钮
            var navContent = "";
            $bannerPic.find("a").each(function (i) {
                navContent += '<span class="' + defaults.navNormalClass + '">' + (i + 1) + '</span>';
            });
            // 将生成的5个span添加到banner-nav中，并为第一个span设置class=xlw-current
            $bannerNav.html(navContent).children().addClass(defaults.navClass)
                .first().removeClass(defaults.navNormalClass).addClass(defaults.navCurrentClass);

            /****************以下为导航按钮添加鼠标移入事件响应********************/
            // 遍历按钮集合，为每个按钮添加鼠标移入事件响应
            $bannerNav.find("span").each(function () {
                $(this).on("mouseenter", function (e) {
                    // 1)将当前按钮的样式设为.xlw-current;2)重置所有按钮的样式为.xlw-normal；
                    $(this).removeClass(defaults.navNormalClass).addClass(defaults.navCurrentClass)
                        .siblings().removeClass(defaults.navCurrentClass).addClass(defaults.navNormalClass);
                    //获取哪个按钮被点击，也就是找到被点击按钮的索引值
                    var index = $(this).index();

                    //3)将对应位置的图片，动态滑入;向右偏移570px,将该图片的z-index值提升
                    $bannerPic.find("a").eq(index).css({left: defaults.width, zIndex: defaults.currentZIndex++})
                        .animate({left: "0px"});

                    // 将刚滑入的图片的索引设为当前焦点图片的索引
                    defaults.currentPicIndex = index;
                    e.stopPropagation();    // 阻止事件传播
                });
            });

            /****************以下为执行图片播放********************/
            playBanner();       //开始执行图片幻灯切换

            /****************轮播图片的方法的方法********************/
            // 轮播图片的方法
            function playBanner() {
                var picNum = $bannerPic.find("a").length;

                clearInterval(defaults.timer);
                defaults.timer = setInterval(anim, defaults.delay);

                function anim() {
                    // 选取下一张图片
                    var nextIndex = defaults.currentPicIndex + 1;
                    if (nextIndex == picNum) {
                        nextIndex = 0;
                    }

                    //模拟触发数字按钮的mouseover - 在匹配的对象上触发指定的事件
                    $bannerNav.find("span").eq(nextIndex).trigger("mouseenter");
                }
            }
        } // end plugin
    });
})(jQuery);