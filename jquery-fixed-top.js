// 插件代码开始，可以单独提取到某个js文件中 -- http://www.hisune.com/view/5/scroll-fixed-top-jquery-plugin
(function($){
    $.fn.extend({
        fixPosition : function(opt, callback)
        {
            if(!opt) var opt = {};
            opt.top = opt.top ? parseInt(opt.top) : 0;
            opt.index = opt.index ? parseInt(opt.index) : 1;
            var _this = this.eq(0);
            var o = _this.offset().top;
            var def_p =  _this.css('position');
            var def_t =  _this.css('top');
            var def_i =  _this.css('index');
            var def_w =  _this.width();
            var def_h =  _this.height();
            var ie6 = !-[1,] && !window.XMLHttpRequest;
            $(window).scroll(function(){
                var w =  $(window).scrollTop();
                if(w > o){
                    addWidth(_this.children()); // 固定所有子元素的宽度
                    if(ie6){ // 兼容万恶ie6
                        _this.css({'position':'absolute', 'top':eval(document.documentElement.scrollTop), 'z-index':opt.index, 'width':def_w, 'height':def_h});
                        $("html,body").css({'background-image':'url(about:blank)', 'background-attachment':'fixed'}); // 防止ie6页面抖动
                    }else{
                        _this.css({'position':'fixed', 'top':opt.top, 'z-index':opt.index, 'width':def_w, 'height':def_h});
                    }
                }else{
                    _this.css({'position':def_p, 'top':def_t, 'z-index':def_i});
                }
                if($(window).scrollLeft() == 0){ // 坑爹的横坐标滚动。。。
                    _this.css({'left': 'auto'});
                }else{
                    _this.css({'left': '-' + ($(window).scrollLeft() - 15) + 'px'});
                }
            });
 
            var addWidth = function(obj)
            {
                obj.each(function(){ // 固定所有子元素的宽度
                    $(this).css({width: $(this).outerWidth()});
                    if($(this).children().length > 0){
                        addWidth($(this).children());
                    }
                });
            };
        }
    });
})(jQuery);