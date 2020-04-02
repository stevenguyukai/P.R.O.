<%--
  Created by IntelliJ IDEA.
  User: stevengu
  Date: 2020-03-30
  Time: 22:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>福布斯口罩富豪榜</title>
    <link href="css/serveyAfter.css" rel="stylesheet" type="text/css">
    <script src="js/vue.js"></script>
</head>

<body class="wholeWeb">

<!-- 标题 -->
<div class="mainTopic">
    <p class="topicFont">福布斯口罩富豪榜</p>
</div>

<!-- 排行榜 -->
<div class="rank">
    <div class="innerTitle">
        <span class="rankTopic">排行榜</span>
        <div class="separateLine1"></div>

        <!-- 选择排行方式 -->
        <div  class="rankStyle">
            <button class="changeRankBtn">距离排行</button>
            <button class="changeRankBtn">数量排行</button>
        </div>
    </div>

    <!-- 网页中部的排名显示 -->
    <div id="innerRank">
        <div class="userAreaBorder" v-for="user in users">
            <div class="userAreaAvatar">
                <img class="userAreaAvatarPic" :src="user.avatar"/>
            </div>
            <div class="userDetail">
                <span class="userName">{{user.nickname}}</span>
                <div class="userSeperateLine"></div>
                <span class="mask"><span class="maskAmount">{{user.mask}}</span> 个口罩</span>
                <br><span class="userDistance">距离暂不可用</span>
            </div>
        </div>
    </div>

    <!-- 排行榜背景修饰图片 -->
    <div class="colorBall1"></div>
    <div class="colorBall2"></div>
</div>

<!--亮家底按钮-->
<button class="button" disabled="true">
    目前总排行： <span class="rankNum">{{asd}}</span>
</button>

<script src="js/serveyAfter.js"></script>
<script src="js/serveyAfter2.js"></script>
</body>

</html>

