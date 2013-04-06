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
    this.WrapperObj = $(WrapperObj);//内容对象的容器
    this.containerObj = this.WrapperObj.find(containerObj);//内容对象
    this.targetObjs = this.containerObj.find(targetObj);//目标移动对象
    this.targetObjLen = this.targetObjs.length;//移动对象的长度
    if(this.targetObjLen<=1){
        return false;
    }
    this.WrapperObjWidth = this.WrapperObj.outerWidth();//获取容器对象的宽度
    this.WrapperObjHeight = this.WrapperObj.outerHeight();//获取容器对象的高度
    var defaultOptions = {
        speed:3000,//运动的时间间隔
        direction:'vertical',//运动方向，水平或者垂直
        isNumber:true,//是否显示右下角数字
        isAnimate:true//移动效果是否使用animate
    };
    $.extend(defaultOptions,options);
    this.options = defaultOptions;
    this.init();//初始化
};
NAVY.Carousel.prototype = {
    init:function(){
        var _this = this;
        var options = _this.options;
        _this.WrapperObj.css({'overflow':'hidden'});//设置容器对象css的overflow值，防止用户没设置
        if(_this.WrapperObj.css('position') === 'static'){
            _this.WrapperObj.css({'position':'relative'});//若容器对象未设置position值，则设置为relative
        }
        switch(options.direction){
            case 'vertical':
                _this.containerObj.css({height:(_this.WrapperObjHeight)*(_this.targetObjLen)});//水平方向设置内容对象的高度为乘以目标对象的个数
                break;
            case 'horizontal':
                _this.containerObj.css({width:(_this.WrapperObjWidth)*(_this.targetObjLen)});//垂直方向设置内容对象的宽度为容器对象的宽度乘以目标对象的个数
                _this.targetObjs.css({float:'left','margin':0,width:_this.WrapperObjWidth});//设置目标对象的float值以及初始化margin，width值
                break;
            default :
                _this.containerObj.css({height:(_this.WrapperObjHeight)*(_this.targetObjLen)});
        }
        if(options.isNumber){
            _this.makeNumber();//显示右下角的数字
        }
        _this.initEvent();//初始化事件
    },
    initEvent:function(){
        var _this = this;
        _this.startCarousel(1);//开始移动
        var currentSelectIndex = 0;
        var i = 0,targetObjs = _this.targetObjs;
        //内容对象的hover事件
        _this.containerObj.hover(function(){
            for(i=0;i<this.targetObjLen;i++){
                if($(targetObjs[i]).hasClass('selected')){
                    currentSelectIndex = i;
                    break;
                }
            }
            _this.stopCarousel();
        },function(){
            _this.startCarousel(1+currentSelectIndex);
        });
        //数字对象的hover时间
        if(_this.options.isNumber){
            _this.numberListObjs.hover(function(){
                currentSelectIndex = parseInt($(this).attr('data-index'));
                _this.setMargin(currentSelectIndex);
                _this.stopCarousel();
            },function(){
                _this.startCarousel(1+currentSelectIndex);
            });
        }
    },
    /**
     * 开始移动
     * @param index 当前显示的目标对象的下标
     */
    startCarousel:function(index){
        var _this = this;
        var options = _this.options;
        _this.intervalId = setInterval(function(){
            index = (index >= _this.targetObjLen ? 0 : index);
            _this.setMargin(index);
            index++;
        },options.speed);
    },
    /**
     * 停止移动
     */
    stopCarousel:function(){
        if(this.intervalId){
            clearInterval(this.intervalId);
        }
    },
    /**
     * 设置内容对象的margin值，水平方向为marginLeft,垂直方向为marginTop
     * @param index 当前要显示的目标对象下标
     */
    setMargin:function(index){
        var width = this.WrapperObjWidth;
        var height = this.WrapperObjHeight;
        var options = this.options;
        var animateCss = {};
        switch(options.direction){
            case 'vertical':
                animateCss = {marginTop:-height*index};
                break;
            case 'horizontal':
                animateCss = {marginLeft:-width*index};
                break;
            default :
                animateCss = {marginTop:-height*index};
        }
        if(options.isAnimate){
            this.containerObj.stop(true,true).animate(animateCss);
        }else{
            this.containerObj.css(animateCss);
        }
        if(this.options.isNumber){
            this.changeNumberStatue(index);
        }
    },
    /**
     * 改变数字的显示状态
     * @param index 当前选中的数字下标
     */
    changeNumberStatue:function(index){
        var numberListObjs = this.numberListObjs;
        numberListObjs.removeClass('selected').eq(index).addClass('selected');
    },
    /**
     * 生成右下角数字的函数
     */
    makeNumber:function(){
        var targetObjLen = this.targetObjLen,targetObjs = this.targetObjs;
        var i = 0,numberHtml = ['<ul class="numberWrapper">'];
        for(;i<targetObjLen;i++){
            var className = 'numberList';
            if(i===0){
                $(targetObjs[0]).addClass('selected');
                className += ' selected';
            }
            numberHtml.push('<li data-index='+i+' class="'+className+'">'+(1+i)+'</li>');
        }
        numberHtml.push('</ul>');
        this.WrapperObj.append(numberHtml.join(''));
        this.numberWrapperObj = this.WrapperObj.find('.numberWrapper');
        this.numberListObjs = this.numberWrapperObj.find('.numberList');
    }
};