package com.Servlet;

import com.foreknow.model.userInfo;
import com.foreknow.service.implement.userInfoServiceImplement;
import com.foreknow.service.userInfoService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class showUserInfoServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        req.setCharacterEncoding("utf-8");
        PrintWriter out = resp.getWriter();

        //调用业务层查询所有用户信息的方法
        userInfoService service = new userInfoServiceImplement();
        List<Object> list = service.queryInfo();
        out.println("list中元素的个数" + list.size() + "<br>");
        out.println("<html>");
        out.println("<head><title>Get User Info</title></head>");
        out.println("<body>");
        out.println("<table>");

        out.println("<tr>");
        out.println("<td>ID</td>");
        out.println("<td>Name</td>");
        out.println("<td>Avatar</td>");
        out.println("<td>OPENID</td>");
        out.println("<td>Available</td>");
        out.println("<td>ResentLongitude</td>");
        out.println("<td>ResentLatitude</td>");
        out.println("<td>ResentRegion</td>");
        out.println("<td>ResentLoginTime</td>");
        out.println("<td>Comment</td>");
        out.println("</tr>");

        for (int i=0;i<list.size();i++) {
            //从集合中获取用户信息
            userInfo ui = (userInfo) list.get(i);
            out.println("<tr>");
            out.println("<td>" + ui.getID() + "</td>");
            out.println("<td>" + ui.getName() + "</td>");
            out.println("<td>" + ui.getAvatar() + "</td>");
            out.println("<td>" + ui.getOPENID() + "</td>");
            out.println("<td>" + ui.getAvailable() + "</td>");
            out.println("<td>" + ui.getResentLongitude() + "</td>");
            out.println("<td>" + ui.getResentLatitude() + "</td>");
            out.println("<td>" + ui.getResentRegion() + "</td>");
            out.println("<td>" + ui.getResentLoginTime() + "</td>");
            out.println("<td>" + ui.getComment() + "</td>");
            out.println("</tr>");
        }

            out.println("</table>");
            out.println("</body>");
            out.println("</html>");


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
