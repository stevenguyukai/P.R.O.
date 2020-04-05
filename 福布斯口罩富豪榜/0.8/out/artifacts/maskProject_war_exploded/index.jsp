<%--
  Created by IntelliJ IDEA.
  User: stevengu
  Date: 2020-03-19
  Time: 19:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.foreknow.model.userInfo" %>
<%@ page import="java.util.List" %>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <title>开始</title>
</head>

<body onload="init()">

<form action="user/get" method="get" id="initRank"></form>

</body>

<script>
  function init() {
      document.getElementById("initRank").submit();
  }
</script>

</html>

