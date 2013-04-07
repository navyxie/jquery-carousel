jquery-carousel
===============

基于jquery1.7+的广告轮播插件，支持水平方向和垂直方向的移动

demo:

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>carousel</title>
    <link rel="stylesheet" type="text/css" href="public/css/carousel.css" />
    <script type="text/javascript" src="public/js/jquery.js"></script>
    <script type="text/javascript" src="public/js/jquery.carousel.js"></script>
    <style type="text/css">
        *{
            margin: 0;
            padding: 0;
        }
        img{
            border: none;
        }
        #wrapper{
            width: 300px;
            height: 500px;
            background: blue;
            margin: 20px auto;
            overflow: hidden;
        }
        #content{
            width: 100%;
        }
        #content .list{
            width: 100%;
            height: 250px;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="wrapper">
        <ul id="content">
            <li class="list"><img src="http://i.mmcdn.cn/simba/img/T1uzdUXD0cXXb1upjX.jpg" /></li>
            <li class="list"><img src="http://i.mmcdn.cn/simba/img/T1H20HXqVhXXb1upjX.jpg" /></li>
            <li class="list"><img src="http://i.mmcdn.cn/simba/img/T1uzdUXD0cXXb1upjX.jpg" /></li>
            <li class="list"><img src="http://i.mmcdn.cn/simba/img/T1H20HXqVhXXb1upjX.jpg" /></li>
        </ul>
    </div>
<script type="text/javascript">
//    var defaultOptions = {
//        speed:3000,//运动的时间间隔
//        direction:'vertical',//运动方向，水平或者垂直
//        isLoop:true,//是否循环轮播
//        moveCount:1,//默认移动的个数
//        targetObjHeight:'',//targetObj的高度即每个移动元素的高度
//        targetObjWidth:'',//targetObj的宽度即每个移动元素的宽度
//        isOpacityOthers:false,//鼠标聚焦目标对象时是否灰掉其他选项
//        isAnimate:true//移动效果是否使用animate
//    };
    new NAVY.Carousel('.list','#content','#wrapper',{direction:'vertical',moveCount:2,targetObjHeight:250,isOpacityOthers:true});
</script>
</body>
</html>
