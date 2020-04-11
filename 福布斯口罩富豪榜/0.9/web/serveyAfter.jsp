<%--
  Created by IntelliJ IDEA.
  User: stevengu
  Date: 2020-03-30
  Time: 22:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.foreknow.model.userInfo" %>
<%@ page import="com.foreknow.model.ranking" %>
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
<div class="rank" >
    <p style="position: fixed;margin-left: 30px;margin-top: 20px;color: #D3B369;font-size: 13px">先驱者PRO</p>
    <span class="rankTopic">排行榜</span>
    <div class="separateLine1"></div>

    <!-- 选择排行方式 -->
    <div style="width: 100%;display: flex;justify-content: space-around;z-index: 2;position: relative;top: 0.3rem;">
        <button class="changeRankBtn" onclick="rankAsLocation()">距离排行</button>
        <button class="changeRankBtn" onclick="rankAsAmount()">数量排行</button>
    </div>


    <!-- 网页中部的排名显示 -->
    <%-- 以口罩数量排行的排行榜 --%>
    <div id="innerRank" :style="rankAmount" class="rankView1">
        <%

            List<Object> userData = (List<Object>) request.getSession().getAttribute("userDataAfter");
            List<Object> rankedData = (List<Object>) request.getSession().getAttribute("rankedDataAfter");
            List<Object> rankedAsLocaData = (List<Object>) request.getSession().getAttribute("rankedAsLocationDataAfter");


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
                        if (avatar=="头像地址获取失败" || avatar==null){
                            avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                        }
                        location = ui.getResentRegion();
                        itemNumber = rk.getItemAmountRank();
                    }
                }
        %>
        <div class="userAreaBorder">
            <div class="userAreaAvatar">
                <img class="userAreaAvatarPic" src="<%=avatar%>"/>
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
    <div id="innerRank" :style="rankLocation"  class="rankView2">
        <%

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
                        if (avatar=="头像地址获取失败" || avatar==null){
                            avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                        }
                        location = ui.getResentRegion();
                        itemNumber = rk.getItemAmountRank();
                    }
                }
        %>
        <div class="userAreaBorder">
            <div class="userAreaAvatar">
                <img class="userAreaAvatarPic" src="<%=avatar%>"/>
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


    <!-- 排行榜背景修饰图片 -->
    <div class="colorBall1"></div>
    <div class="colorBall2"></div>
</div>

<!--显示用户排名-->
<button class="button" disabled="true">
    <%
        int rankNumber = 0;
        userInfo ui = (userInfo)request.getSession().getAttribute("ui");
        String compareID = ui.getOPENID();
        for (int i=0;i<rankedData.size();i++){
            ranking rk = (ranking) rankedData.get(i);
            if (compareID.equals(rk.getUserIDRank())){
                rankNumber = i+1;
            }
        }
    %>
    目前总排行： <span class="rankNum"><%=rankNumber%></span>
</button>

<script src="js/serveyAfter2.js"></script>
</body>

</html>

