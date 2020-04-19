<%--
  Created by IntelliJ IDEA.
  User: stevengu
  Date: 2020-03-19
  Time: 19:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <%--<script src="//libs.liyang360.com/base.js" type="text/javascript"></script>--%>
  <%--<script src="//cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>--%>
  <script src="js/getUserInfo.js"></script>
  <script>
    history.pushState(null, null, document.URL); //禁止网页返回上一页
    window.addEventListener('popstate', function() {
      history.pushState(null, null, document.URL);
    });
  </script>
  <style>
    .spinner {
      margin: 300px auto;
      width: 80px;
      height: 80px;
      position: relative;
    }


    .container1 > div {
      width: 20px;
      height: 20px;
      background-color: orange;

      border-radius: 100%;
      position: absolute;
      -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
      animation: bouncedelay 1.2s infinite ease-in-out;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    .container2 > div {
      width: 20px;
      height: 20px;
      background-color: orange;

      border-radius: 100%;
      position: absolute;
      -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
      animation: bouncedelay 1.2s infinite ease-in-out;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    .container3 > div {
      width: 20px;
      height: 20px;
      background-color: yellow;

      border-radius: 100%;
      position: absolute;
      -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
      animation: bouncedelay 1.2s infinite ease-in-out;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    .spinner .spinner-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .container2 {
      -webkit-transform: rotateZ(45deg);
      transform: rotateZ(45deg);
    }

    .container3 {
      -webkit-transform: rotateZ(90deg);
      transform: rotateZ(90deg);
    }

    .circle1 { top: 0; left: 0; }
    .circle2 { top: 0; right: 0; }
    .circle3 { right: 0; bottom: 0; }
    .circle4 { left: 0; bottom: 0; }

    .container2 .circle1 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    .container3 .circle1 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    .container1 .circle2 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    .container2 .circle2 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }

    .container3 .circle2 {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }

    .container1 .circle3 {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }

    .container2 .circle3 {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }

    .container3 .circle3 {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }

    .container1 .circle4 {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }

    .container2 .circle4 {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }

    .container3 .circle4 {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }

    @-webkit-keyframes bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0.0) }
      40% { -webkit-transform: scale(1.0) }
    }

    @keyframes bouncedelay {
      0%, 80%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 40% {
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
        }
    }
  </style>
  <title>微信授权</title>
</head>

<body onload="init()" style="background-color: #38495c;">

<div style="width: 100%; height: 20%;text-align: center; font-size: 30px;position: absolute;top: 15%;
    background-image:-webkit-linear-gradient(left,red,gold,lightyellow);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
">
  先驱者P.R.O.
</div>

<div class="spinner">
  <div class="spinner-container container1">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div>
  <div class="spinner-container container2">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div>
  <div class="spinner-container container3">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div>
</div>



<form action="user/wx/get" method="get" id="initRank">
</form>

</body>
</html>

