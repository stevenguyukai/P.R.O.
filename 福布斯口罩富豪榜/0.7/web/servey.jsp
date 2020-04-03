<%--
  Created by IntelliJ IDEA.
  User: stevengu
  Date: 2020-04-01
  Time: 18:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.foreknow.model.userInfo" %>
<%@ page import="com.foreknow.model.itemAmount" %>
<%@ page import="com.foreknow.model.ranking" %>
<%-- 使得导入的样式表和JS文件发挥作用 --%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"
            +request.getServerName()+":"
            +request.getServerPort()+path+"/";
%>
<base href="<%=basePath%>">

<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>福布斯口罩富豪榜</title>
    <link href="css/servey.css" rel="stylesheet" type="text/css">
    <script src="js/vue.js"></script>
    <script src="https://api.map.baidu.com/api?v=2.0&ak=cuaAOPQZcdHvcvLBYMTuyGmPbyYU7cwk" type="text/javascript"></script>
</head>

<body class="wholeWeb">

<!-- 请求用户地理位置 -->
<div :style="getLoca" class="getLocation">
    <div class="getLocationDivBlur"></div>
    <div class="getLocationDiv">
        <div class="getLocationTextDiv" style="width: 90%; height: 90%; margin-left: 5%; margin-top: 5%;">
            <p class="getLocationText"  id="text">
                我们希望获取您的地理位置以根据区域排名(´･ω･`)
            </p>
            <img src="images/like.svg" style="width: 70px;position:relative;left: 235px;" onclick="getLocation()"/>
            <img src="images/dislike.svg" style="width: 70px;position:relative;left: -120px;"  onclick="disalike()"/>
            <img src="images/map.svg" style="margin-top: -30%;" />
        </div>
    </div>
</div>

<!-- 标题 -->
<div class="mainTopic">
    <p class="topicFont">福布斯口罩富豪榜</p>
</div>

<!-- 排行榜 -->
<div class="rank" >
    <span class="rankTopic">排行榜</span>
    <div class="separateLine1"></div>

    <!-- 选择排行方式 -->
    <div  class="rankStyle">
        <button class="changeRankBtn">距离排行</button>
        <button class="changeRankBtn">数量排行</button>
    </div>

    <!-- 网页中部的排名显示 -->
    <div id="innerRank">
        <%
            List<Object> userData = (List<Object>)request.getAttribute("userData");
            List<Object> rankedData = (List<Object>)request.getAttribute("rankedData");

            for (int i = 0 ; i<rankedData.size() ; i++){
                String name = "昵称获取失败";
                String avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                String location = "China";
                String itemNumber = "0";
                ranking rk = (ranking) rankedData.get(i);
                for (int j = 0 ; j<userData.size() ; j++){
                    userInfo ui = (userInfo) userData.get(j);
                    if (rk.getUserIDRank().equals(ui.getOPENID())){
                        name = ui.getName();
                        avatar = ui.getAvatar();
                        location = ui.getResentRegion();
                        itemNumber = rk.getItemAmountRank();
                    }
                }
        %>
        <div class="userAreaBorder">
            <div class="userAreaAvatar">
                <img class="userAreaAvatarPic" src="<%=avatar%>" />
            </div>
            <div class="userDetail">
                <span class="userName"><%=name%></span>
                <div class="userSeperateLine"></div>
                <span class="mask"><span class="maskAmount"><%=itemNumber%></span> 个口罩</span>
                <br><span class="userDistance"><%=location%></span>
            </div>
        </div>
        <%
            }
        %>
    </div>

    <!-- 获取用户信息用的表单（用户不可见，只为post用户数据） -->
    <div class="disableForm">
        <form id="disableForm" class="userInfoForm" method="post" action="user/postInfo" style="display: block">
            <input type="hidden" readonly="true" style="border: white" :value="userName" name="Name" />
            <input type="hidden" readonly="true" style="border: white" name="OPENID" :value="userOPENID" />
            <input type="hidden" readonly="true" style="border: white" name="Avatar" :value="userAvatar" />
            <input type="hidden" readonly="true" style="border: white" name="Available" :value="userAvailable" />
            <input type="hidden" readonly="true" style="border: white" name="ResentLatitude" :value="userResentLatitude"  />
            <input type="hidden" readonly="true" style="border: white" name="ResentLongitude" :value="userResentLongitude" />
            <input type="hidden" readonly="true" style="border: white" name="ResentRegion" :value="userResentRegion" />
            <input type="hidden" readonly="true" style="border: white" name="Comment" :value="userComment" />
        </form>
        <!--亮家底按钮-->
        <button type="submit" class="button" id="submit" onclick="submitForm()">我要亮家底!</button>
    </div>

    <!-- 排行榜背景修饰图片 -->
    <div class="colorBall1"></div>
    <div class="colorBall2"></div>
</div>

<script src="js/servey.js"></script>
</body>

</html>