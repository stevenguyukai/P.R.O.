<%--
  Created by IntelliJ IDEA.
  User: stevengu
  Date: 2020-04-07
  Time: 21:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>测试用户数据</title>
</head>
<body>
<h1>页面太丑，只看内容</h1>
<table style="margin: 0 auto;">
    <tr>
        <td>openid(id)</td>
        <td>${userInfo.openid}</td>
    </tr>
    <tr>
        <td>nickname(昵称)</td>
        <td>${userInfo.nickname}</td>
    </tr>
    <tr>
        <td>sex(性别)</td>
        <td>
            <c:if test="${userInfo.sex==0}">未知</c:if>
            <c:if test="${userInfo.sex==1}">男</c:if>
            <c:if test="${userInfo.sex==2}">女</c:if>
        </td>
    </tr>
    <tr>
        <td>province(省)</td>
        <td>${userInfo.province}</td>
    </tr>
    <tr>
        <td>city(市)</td>
        <td>${userInfo.city}</td>
    </tr>
    <tr>
        <td>country(国家)</td>
        <td>${userInfo.country}</td>
    </tr>
    <tr>
        <td>headimgurl(头像)</td>
        <td><img alt="头像" style="width: 40px;height: 40px;" src="${userInfo.headimgurl}"></td>
    </tr>
    <tr>
        <td>privilege(特权，什么意思看文档)</td>
        <td>
            <c:forEach items="${userInfo.privilege}" var="p">
                ${p.String }|
            </c:forEach>
        </td>
    </tr>
    <tr>
        <td>unionid(unionid)</td>
        <td>${userInfo.unionid}</td>
    </tr>
</table>
</body>


</html>
