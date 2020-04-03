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
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"
            +request.getServerName()+":"
            +request.getServerPort()+path+"/";
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
            List<Object> userDataAfter = (List<Object>)request.getSession().getAttribute("userDataAfter");
            List<Object> rankedDataAfter = (List<Object>)request.getSession().getAttribute("rankedDataAfter");

            for (int i = 0 ; i<rankedDataAfter.size() ; i++){
                String name = "昵称获取失败";
                String avatar = "http://img5.imgtn.bdimg.com/it/u=3977081912,1617642619&fm=26&gp=0.jpg";
                String location = "China";
                String itemNumber = "0";
                ranking rk = (ranking) rankedDataAfter.get(i);
                for (int j = 0 ; j<userDataAfter.size() ; j++){
                    userInfo ui = (userInfo) userDataAfter.get(j);
                    if (rk.getUserIDRank().equals(ui.getOPENID())){
                        name = ui.getName();
                        avatar = ui.getAvatar();
                        if (avatar.equals("头像地址获取失败")){
                            avatar = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3169332376,286772686&fm=26&gp=0.jpg";
                        }
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
        for (int i=0;i<rankedDataAfter.size();i++){
            ranking rk = (ranking) rankedDataAfter.get(i);
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

