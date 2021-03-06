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
<%@ page import="com.foreknow.model.wxUserInfo" %>
<%-- 使得导入的样式表和JS文件发挥作用 --%>
<%
    String basePath = "https://4eef514c.ngrok.io/maskProject/";
%>
<base href="<%=basePath%>">

<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>福布斯口罩富豪榜</title>
    <link href="css/servey.css" rel="stylesheet" type="text/css">
    <script src="js/vue.js"></script>
    <script src="https://api.map.baidu.com/api?v=2.0&ak=cuaAOPQZcdHvcvLBYMTuyGmPbyYU7cwk"
            type="text/javascript"></script>
    <script>
        history.pushState(null, null, document.URL); //禁止网页返回上一页
        window.addEventListener('popstate', function() {
            history.pushState(null, null, document.URL);
        });
    </script>
</head>

<body class="wholeWeb" onload="init()">

<!-- 请求用户地理位置 -->
<%
    boolean hiddenAsk = (boolean) request.getSession().getAttribute("hiddenAsk");
    if (!hiddenAsk) {
%>

<div :style="getLoca" class="getLocation">
    <div class="getLocationDivBlur"></div>
    <div class="getLocationDiv">
        <div class="getLocationTextDiv" style="width: 90%; height: 90%; margin-left: 5%; margin-top: 5%;">
            <p class="getLocationText" id="text">
                我们希望获取您的地理位置以根据区域排名(´･ω･`)
            </p>
            <img src="images/like.svg" style="width: 70px;position:relative;left: 235px;" onclick="getLocation()"/>
            <img src="images/dislike.svg" style="width: 70px;position:relative;left: -120px;" onclick="disalike()"/>
            <img src="images/map.svg" style="margin-top: -30%;"/>
        </div>
    </div>
</div>

<form action="user/get" method="get" id="postLocationForm" class="postLocationForm" name="postLocationForm">
    <input type="hidden" value="false" name="locationNeed" id="postLocationFormLocation">
    <input type="hidden" value="地点获取失败" name="cityNeed" id="postLocationFormCity">
    <input type="hidden" readonly="true" style="border: white" name="ResentLatitude" value="位置获取失败"/>
    <input type="hidden" readonly="true" style="border: white" name="ResentLongitude" value="位置获取失败"/>
    <input type="hidden" readonly="true" style="border: white" name="ResentRegion" value="地点获取失败"/>
</form>
<%
    }
%>


<!-- 标题 -->
<div class="mainTopic">
    <p class="topicFont">福布斯口罩富豪榜</p>
</div>

<!-- 排行榜 -->
<div class="rank">
    <!-- 社团标志 -->
    <p style="position: fixed;margin-left: 30px;margin-top: 20px;color: #D3B369;font-size: 13px">先驱者PRO</p>
    <span class="rankTopic">排行榜</span>
    <div class="separateLine1"></div>

    <!-- 选择排行方式 -->
    <div class="rankStyle">
        <button class="changeRankBtn" onclick="rankAsLocation()">距离排行</button>
        <button class="changeRankBtn" onclick="rankAsAmount()">数量排行</button>
    </div>


    <!-- 网页中部的排名显示 -->
    <%-- 以口罩数量排行的排行榜 --%>
    <div id="innerRank" :style="rankAmount" class="rankView1">
        <%

            List<Object> userData = (List<Object>) request.getAttribute("userData");
            List<Object> rankedData = (List<Object>) request.getAttribute("rankedData");
            List<Object> rankedAsLocaData = (List<Object>) request.getAttribute("rankedAsLocaData");

            String rank = "0";
            int rankHelper = 0;
            if (userData != null && rankedData != null) {
                for (int i = 0; i < rankedData.size(); i++) {
                    String name = "昵称获取失败";
                    String avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                    String location = "China";
                    String itemNumber = "0";
                    ranking rk = (ranking) rankedData.get(i);
                    for (int j = 0; j < userData.size(); j++) {
                        userInfo ui = (userInfo) userData.get(j);
                        if (rk.getUserIDRank().equals(ui.getOPENID())) {
                            name = ui.getName();
                            avatar = ui.getAvatar();
                            if (avatar == "头像地址获取失败" || avatar == null) {
                                avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                            }
                            location = ui.getResentRegion();
                            itemNumber = rk.getItemAmountRank();
                            rankHelper = rankHelper+1;
                            rank = Integer.toString(rankHelper);
                        }
                    }
        %>
        <div class="userAreaBorder"  style="margin-top: 5px; margin-bottom: 5px;">
            <div class="userAreaAvatar">
                <img class="userAreaAvatarPic" src="<%=avatar%>"/>
            </div>
            <div style="float: right;height: 100%;width: 40px; margin: auto;position: relative; top: -50%;right: 10px;line-height: 50%;text-align: center;color: orange;">
                <%
                    if (rank.equals("1")){
                        rank = "<img src=\"images/rank_1.svg\" alt=\"ERROR\" style=\"height: 40px; width: 40px;\">";
                    } else if (rank.equals("2")){
                        rank = "<img src=\"images/rank_2.svg\" alt=\"ERROR\" style=\"height: 32px; width: 32px;\">";
                    } else if (rank.equals("3")){
                        rank = "<img src=\"images/rank_3.svg\" alt=\"ERROR\" style=\"height: 24px; width: 24px;\">";
                    }
                %>
                <%=rank%>
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
    </div style c>

    <%-- 以地点排行的排行榜 --%>
    <div id="innerRank" :style="rankLocation" class="rankView2">
        <%
            String rank2 = "0";
            int rankHelper2 = 0;
            if (rankedAsLocaData != null) {
                for (int i = 0; i < rankedAsLocaData.size(); i++) {
                    String name = "昵称获取失败";
                    String avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                    String location = "China";
                    String itemNumber = "0";
                    ranking rk = (ranking) rankedAsLocaData.get(i);
                    for (int j = 0; j < userData.size(); j++) {
                        userInfo ui = (userInfo) userData.get(j);
                        if (rk.getUserIDRank().equals(ui.getOPENID())) {
                            name = ui.getName();
                            avatar = ui.getAvatar();
                            if (avatar == "头像地址获取失败" || avatar == null) {
                                avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                            }
                            location = ui.getResentRegion();
                            itemNumber = rk.getItemAmountRank();
                            rankHelper2 = rankHelper2+1;
                            rank2 = Integer.toString(rankHelper2);
                        }
                    }
        %>
        <div class="userAreaBorder" style="margin-top: 5px; margin-bottom: 5px;">
            <div class="userAreaAvatar">
                <img class="userAreaAvatarPic" src="<%=avatar%>"/>
            </div>
            <div style="float: right;height: 100%;width: 40px; margin: auto;position: relative; top: -50%;right: 10px;line-height: 50%;text-align: center;color: orange;">
                <%
                    if (rank2.equals("1")){
                        rank2 = "<img src=\"images/rank_1.svg\" alt=\"ERROR\" style=\"height: 40px; width: 40px;\">";
                    } else if (rank2.equals("2")){
                        rank2 = "<img src=\"images/rank_2.svg\" alt=\"ERROR\" style=\"height: 32px; width: 32px;\">";
                    } else if (rank2.equals("3")){
                        rank2 = "<img src=\"images/rank_3.svg\" alt=\"ERROR\" style=\"height: 24px; width: 24px;\">";
                    }
                %>
                <%=rank2%>
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
                }
            }
        %>
    </div>

    <!-- 获取用户信息用的表单（用户不可见，只为post用户数据） -->
    <%
        String ResentLatitude = (String)request.getSession().getAttribute("ResentLatitude");
        String ResentLongitude = (String)request.getSession().getAttribute("ResentLongitude");
        String ResentRegion = (String)request.getSession().getAttribute("ResentRegion");
    %>
    <div class="disableForm">
        <form id="disableForm" class="userInfoForm" method="post" action="user/postInfo" style="display: block" name="disableForm">
            <input type="hidden" readonly="true" style="border: white" name="Name" value="${userInfomation.nickname}" />
            <input type="hidden" readonly="true" style="border: white" name="OPENID" value="${userInfomation.openid}"/>
            <input type="hidden" readonly="true" style="border: white" name="Avatar" value="${userInfomation.headimgurl}"/>
            <input type="hidden" readonly="true" style="border: white" name="Available" value="Enable"/>
            <input type="hidden" readonly="true" style="border: white" name="ResentLatitude" value=<%=ResentLatitude%> />
            <input type="hidden" readonly="true" style="border: white" name="ResentLongitude" value=<%=ResentLongitude%> />
            <input type="hidden" readonly="true" style="border: white" name="ResentRegion" value=<%=ResentRegion%> />
            <input type="hidden" readonly="true" style="border: white" name="Comment" value="无备注"/>
        </form>
    </div>


    <!-- 排行榜背景修饰图片 -->
    <div class="colorBall1"></div>
    <div class="colorBall2"></div>
</div>

<!--亮家底按钮-->
<button  class="buttonSubmit" id="submit" onclick="submitForm()">我要亮家底</button>

<script src="js/servey.js"></script>
</body>

</html>