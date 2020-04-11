<%--
  Created by IntelliJ IDEA.
  User: stevengu
  Date: 2020-03-30
  Time: 21:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%-- 使得导入的样式表和JS文件发挥作用 --%>
<%
    String basePath = "http://67b63447.ngrok.io/maskProject/";
%>
<base href="<%=basePath%>">

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>口罩数</title>
    <link rel="stylesheet" type="text/css" href="css/selectAmount.css">
    <script src="js/vue.js"></script>
</head>
<body class="app">

<div class="alertDiv">

    <!-- 确认用户没有口罩的警告框 -->
    <div :style="noMask" class="noMask">
        <div class="alertBlur"></div>
        <div class="alertMainBox">
            <div class="alertTextArea">
                <p class="alertText"  id="text1">
                    一个口罩都没有吗 (°_°)
                </p>
                <img src="images/like.svg" class="alertYesButton"  onclick="formSubmit()" />             <!-- 确认按钮 -->
                <img src="images/dislike.svg" class="alertNoButton"  onclick="clickCancel()"/>           <!-- 返回刷新按钮 -->
                <img src="images/empty.svg" class="alertPic"/>                                           <!-- 示意图 -->
            </div>
        </div>
    </div>

    <!-- 确认用户是否提交口罩数的警告框 -->
    <div :style="confirmMask" class="confirmMask">
        <div class="alertBlur"></div>
        <div class="alertMainBox">
            <div class="alertTextArea">
                <p class="alertText"  id="text2">
                    你拥有: {{maskAmount}}个口罩 ^o^
                </p>
                <img src="images/like.svg" class="alertYesButton"  onclick="formSubmit()" />             <!-- 确认按钮 -->
                <img src="images/dislike.svg" class="alertNoButton"  onclick="clickCancel()"/>           <!-- 返回刷新按钮 -->
                <img src="images/full.svg" class="alertPic" />                                           <!-- 示意图 -->
            </div>
        </div>
    </div>
</div>




<div class="big">

    <!-- 返回按钮 -->
    <button onclick="window.location.href='servey.html'" class="back">X</button>

    <!-- 重制按钮 -->
    <span class="again" onclick="again()">重制</span>

    <!-- 标题名字 -->
    <h1 class="title">我拥有口罩:</h1>

    <!-- 可移动手 -->
    <div>
        <div id="leftHand" class="hands">
            <img id="left" src="images/leftHand.png"  class="hand" draggable="true" />
        </div>
        <div id="rightHand" class="hands">
            <img id="right" src="images/rightHand.png"  class="hand" draggable="true"/>
        </div>
    </div>

    <!-- 关于手可以被移动的提示 -->
    <span class="cue">可以调整左右手距离</span>
    <span class="smallCue">拉动手以表示拥有口罩的数量</span>

    <!-- 填写物品数的表单，提交表单由上方 YES 图片提交 -->
    <div class="myForm">
        <form id="myForm" method="post" action="user/getItemAmount">
            <div class="number">
                <input type="tel" id="num" name="itemAmount" :style="{'border-color': borderColor}" :value="amount" readonly="readonly" onclick="inputNum()"/>
                <input type="hidden" name="userID" :value="userID" readonly="readonly" />
            </div>
            <span id="alert"></span>
        </form>
        <button type="button" id="submit" onclick="submitNum()" :style="{'border-color': borderColor , 'color': borderColor}">提交</button>
    </div>

</div>
<script type="text/javascript" src="js/selectAmount.js"></script>
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.2/??flexible_css.js,flexible.js"></script>
</body>
</html>