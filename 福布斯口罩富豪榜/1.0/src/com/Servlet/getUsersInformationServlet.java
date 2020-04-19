package com.Servlet;

import com.foreknow.model.userInfo;
import com.foreknow.service.deleteErrorInfoService;
import com.foreknow.service.implement.deleteErrorInfoServiceImplement;
import com.foreknow.service.implement.userInfoServiceImplement;
import com.foreknow.service.userInfoService;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class getUsersInformationServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        req.setCharacterEncoding("utf-8");
        PrintWriter out =  resp.getWriter();

        //获取请求参数
        String Name = req.getParameter("Name");
        String OPENID = req.getParameter("OPENID");
        String Avatar = req.getParameter("Avatar");
        String Available = req.getParameter("Available");
        String ResentLatitude = req.getParameter("ResentLatitude");
        String ResentLongitude = req.getParameter("ResentLongitude");
        String ResentRegion = req.getParameter("ResentRegion");
        String Comment = req.getParameter("Comment");


        //调用service中的方法save()
        userInfoService service = new userInfoServiceImplement();
        userInfo ui = new userInfo();
        ui.setName(Name);
        ui.setOPENID(OPENID);
        ui.setAvatar(Avatar);
        ui.setAvailable(Available);
        ui.setResentLatitude(ResentLatitude);
        ui.setResentLongitude(ResentLongitude);
        SimpleDateFormat sdf  = new SimpleDateFormat("yyyy-MM-dd");
        ui.setResentLoginTime(sdf.format(new Date()));
        ui.setResentRegion(ResentRegion);
        ui.setComment(Comment);


//           Web资源的跳转
//              两种方式：
//                  1. 请求转发（站内跳转） 相当于一次请求
//                  2. 重定向（站外跳转）   相当于两次请求
        boolean isRight = service.save(ui);
        if (isRight){

            req.getSession().setAttribute("ui",ui);
            req.getSession().setAttribute("OPENID",OPENID);

            //删除上传错误用户信息
            deleteErrorInfoServiceImplement delete = new deleteErrorInfoServiceImplement();
            delete.deleteErrorInfo();

            //重定向
            resp.sendRedirect(req.getContextPath() +"/selectAmount.jsp");
        }else {

            //删除上传错误用户信息
            deleteErrorInfoServiceImplement delete = new deleteErrorInfoServiceImplement();
            delete.deleteErrorInfo();

            //重定向
            resp.sendRedirect(req.getContextPath() +"/404.html");
        }



    }
}
