/**
 * 基于jquery1.7+的广告轮播插件
 * author:navy
 * email:navyxie2010@gmail.com
 * qq:951178609
 * version:1.0
 * date 2013-04-06
 */
var NAVY = NAVY || {};
NAVY.Carousel = function(targetObj,containerObj,WrapperObj,options){
    var _this = this;
    _this.WrapperObj = $(WrapperObj);//内容对象的容器
    _this.containerObj = _this.WrapperObj.find(containerObj);//内容对象
    _this.targetObj = targetObj;
    _this.targetObjs = _this.containerObj.find(targetObj);//目标移动对象
    _this.targetObjLen = _this.targetObjs.length;//移动对象的长度
    if(_this.targetObjLen<=1){
        return false;
    }
    _this.WrapperObjWidth = _this.WrapperObj.outerWidth();//获取容器对象的宽度
    _this.WrapperObjHeight = _this.WrapperObj.outerHeight();//获取容器对象的高度
    var defaultOptions = {
        speed:3000,//运动的时间间隔
        direction:'vertical',//运动方向，水平或者垂直
        isLoop:true,//是否循环轮播
        moveCount:1,//默认移动的个数
        targetObjHeight:_this.WrapperObjHeight,//targetObj的高度
        targetObjWidth:_this.WrapperObjWidth,//targetObj的宽度
        isOpacityOthers:false,
        isAnimate:true//移动效果是否使用animate
    };
    _this.moveCount = 0;
    $.extend(defaultOptions,options);
    _this.options = defaultOptions;
    if(_this.options.moveCount > _this.targetObjLen){
        _this.options.moveCount = _this.targetObjLen;//如果传入的目标对象的个数大于目标对象的总数，则最大的移动个数为总数
    }
    _this.maskHtml='<div class="hoverMask eightyOpacity"></div>';//鼠标移上目标对象时的遮罩
    _this.init();//初始化
};
NAVY.Carousel.prototype = {
    init:function(){
        var _this = this;
        var options = _this.options;
        _this.WrapperObj.css({'overflow':'hidden'}).append(_this.maskHtml);//设置容器对象css的overflow值，防止用户没设置
        if(options.isOpacityOthers){
            _this.targetObjs.addClass('carouselRelative')
        }
        if(_this.WrapperObj.css('position') === 'static'){
            _this.WrapperObj.css({'position':'relative'});//若容器对象未设置position值，则设置为relative
        }
        switch(options.direction){
            case 'vertical':
                _this.containerObj.css({height:(options.targetObjHeight)*(_this.targetObjLen)});//水平方向设置内容对象的高度为乘以目标对象的个数
                break;
            case 'horizontal':
                _this.containerObj.css({width:(options.targetObjWidth)*(_this.targetObjLen)});//垂直方向设置内容对象的宽度为容器对象的宽度乘以目标对象的个数
                _this.targetObjs.css({'float':'left','margin':0,width:options.targetObjWidth});//设置目标对象的float值以及初始化margin，width值
                break;
            default :
                _this.containerObj.css({height:(_this.WrapperObjHeight)*(_this.targetObjLen)});
        }
        _this.initEvent();//初始化事件
        return this;
    },
    initEvent:function(){
        var _this = this;
        var options = _this.options;
        _this.startCarousel();//开始移动
        var hoverHiddenObj = _this.WrapperObj.find('.hoverMask');
        //内容对象的hover事件
        _this.targetObjs.hover(function(){
            if(options.isOpacityOthers){
                //显示聚焦时的遮罩
                hoverHiddenObj.show().appendTo(this).animate({opacity:0.5});
            }
            _this.stopCarousel();
        },function(){
            if(options.isOpacityOthers){
                //隐藏聚焦时的遮罩
                hoverHiddenObj.hide().css({opacity:0.3});
            }
            _this.startCarousel();
        });
        return this;
    },
    /**
     * 开始移动
     */
    startCarousel:function(){
        var _this = this;
        var options = _this.options;
        _this.intervalId = setInterval(function(){
            _this.setMargin();
        },options.speed);
        return this;
    },
    /**
     * 停止移动
     */
    stopCarousel:function(){
        if(this.intervalId){
            clearInterval(this.intervalId);
        }
        return this;
    },
    /**
     * 设置内容对象的margin值，水平方向为marginLeft,垂直方向为marginTop
     * @param index 当前要显示的目标对象下标
     */
    setMargin:function(){
        var options = this.options;
        var width = options.targetObjWidth;
        var height = options.targetObjHeight;
        if(!(options.isLoop) && (++(this.moveCount)*(options.moveCount) >= this.targetObjLen)){
            this.stopCarousel();
            return false;
        }
        var containerObj = this.containerObj;
        var appendTargetObj = containerObj.find(this.targetObj).slice(0,options.moveCount);
        var animateCss = 'margin-top',animateValue = -height*(options.moveCount),animateObj = {marginTop:animateValue};
        if(options.direction === 'horizontal'){
            animateCss = 'margin-left';
            animateValue = -width*(options.moveCount);
            animateObj = {marginLeft:animateValue};
        }
        if(options.isAnimate){
            containerObj.stop(true,true).animate(animateObj,500,function(){
                containerObj.css(animateCss,0).append(appendTargetObj);
            });
        }else{
            containerObj.css(animateCss,animateValue).css(animateCss,0).append(appendTargetObj);
        }
        return this;
    }
};