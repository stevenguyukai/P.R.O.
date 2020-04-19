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
    String basePath = "https://4eef514c.ngrok.io/maskProject/";
%>
<base href="<%=basePath%>">
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>福布斯口罩富豪榜</title>
    <link href="css/serveyAfter.css" rel="stylesheet" type="text/css">
    <script src="js/vue.js"></script>
    <script>
        history.pushState(null, null, document.URL); //禁止网页返回上一页
        window.addEventListener('popstate', function() {
            history.pushState(null, null, document.URL);
        });
    </script>
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

            String rank = "0";
            int rankHelper = 0;
            for (int i = 0; i < rankedData.size(); i++) {
                String name = "昵称获取失败";
                String avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                String location = "China";
                String itemNumber = "0";
                ranking rk = (ranking) rankedData.get(i);
                String emphasis = "";
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

                        rankHelper = rankHelper+1;
                        rank = Integer.toString(rankHelper);

                        //让用户知道自己在排行榜的什么地方（加边框）
                        userInfo ui2 = (userInfo)request.getSession().getAttribute("alreadyDeployUserInfo");
                        if (ui2==null||ui2.equals("")){
                            ui2 = (userInfo)request.getSession().getAttribute("ui");
                        }
                        String OPENID = ui2.getOPENID();
                        if (OPENID.equals(ui.getOPENID())){
                            emphasis = "border: solid 3px;border-image: -webkit-linear-gradient(red, gold) 30 30;border-image: -moz-linear-gradient( red, gold) 30 30;border-image: linear-gradient( red, gold) 30 30;";
                        }
                    }
                }
        %>
        <div class="userAreaBorder" style="<%=emphasis%> width: 95%; margin-top: 5px; margin-bottom: 5px; border-radius: 20px; padding-bottom: 5px;">
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
                <br><span class="userDistance" style="top: -10px;"><%=location%></span>
            </div>
        </div>
        <%
            }
        %>
    </div style c>

    <%-- 以地点排行的排行榜 --%>
    <div id="innerRank" :style="rankLocation"  class="rankView2">
        <%
            String rank2 = "0";
            int rankHelper2 = 0;
            for (int i = 0; i < rankedAsLocaData.size(); i++) {
                String name = "昵称获取失败";
                String avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                String location = "China";
                String itemNumber = "0";
                String emphasis = "";
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

                        rankHelper2 = rankHelper2+1;
                        rank2 = Integer.toString(rankHelper2);

                        //让用户知道自己在排行榜的什么地方（加边框）
                        userInfo ui2 = (userInfo)request.getSession().getAttribute("alreadyDeployUserInfo");
                        if (ui2==null||ui2.equals("")){
                            ui2 = (userInfo)request.getSession().getAttribute("ui");
                        }
                        String OPENID = ui2.getOPENID();
                        if (OPENID.equals(ui.getOPENID())){
                            emphasis = "border: solid 3px;border-image: -webkit-linear-gradient(red, gold) 30 30;border-image: -moz-linear-gradient( red, gold) 30 30;border-image: linear-gradient( red, gold) 30 30;";
                        }
                    }
                }
        %>
        <div class="userAreaBorder" style="<%=emphasis%> width: 95%; margin-top: 5px; margin-bottom: 5px; border-radius: 20px;padding-bottom: 5px;">
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
        %>
    </div>


    <!-- 排行榜背景修饰图片 -->
    <div class="colorBall1"></div>
    <div class="colorBall2"></div>
</div>

<!--显示用户排名-->
<button class="button" onclick="updateMaskAmount()">
    <%
        boolean isAlready = (boolean)request.getSession().getAttribute("isAlready");

        if (isAlready){
            int rankNumber = 0;
            userInfo ui = (userInfo)request.getSession().getAttribute("alreadyDeployUserInfo");
            String compareID = ui.getOPENID();
            for (int i=0;i<rankedData.size();i++){
                ranking rk = (ranking) rankedData.get(i);
                if (compareID.equals(rk.getUserIDRank())){
                    rankNumber = i+1;
                }
            }
    %><span class="rankNum">目前总排行: <%= " " + " " + rankNumber%></span>
    <%
    } else {
        int rankNumber = 0;
        userInfo ui = (userInfo)request.getSession().getAttribute("ui");
        String compareID = ui.getOPENID();
        for (int i=0;i<rankedData.size();i++){
            ranking rk = (ranking) rankedData.get(i);
            if (compareID.equals(rk.getUserIDRank())){
                rankNumber = i+1;
            }
        }
    %> <span class="rankNum">目前总排行: <%= " " + " " + rankNumber%></span>
    <%
        }
    %>
    <span style="font-size: 10px;text-align: center;position: relative;left: 20px;">点击以更新数据</span>
</button>

<%-- 是否修改物品数的提示 --%>
<div class="changeAmountClass" :style="changeAmount">
    <div class="changeAmountBlur"></div>
    <div class="changeAmountDiv">
        <div class="changeAmountTextDiv" style="width: 90%; height: 90%; margin-left: 5%; margin-top: 5%;">
            <p class="changeAmountText" id="text">
                是否要更新数据?
            </p>
            <img src="images/like.svg" style="width: 70px;position:relative;left: 235px;" onclick="like()"/>
            <img src="images/dislike.svg" style="width: 70px;position:relative;left: -120px;" onclick="dislike()"/>
            <img src="images/sql.svg" style="margin-top: -30%;"/>
        </div>
    </div>
</div>
<script src="js/serveyAfter.js"></script>
</body>

</html>

