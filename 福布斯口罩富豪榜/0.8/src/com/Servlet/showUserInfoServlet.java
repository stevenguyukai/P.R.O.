package com.Servlet;

import com.foreknow.dao.implement.rankingDaoImplement;
import com.foreknow.dao.rankingDao;
import com.foreknow.db.DBManager;
import com.foreknow.model.userInfo;
import com.foreknow.service.implement.itemAmountServiceImplement;
import com.foreknow.service.implement.rankingServiceImplement;
import com.foreknow.service.implement.userInfoServiceImplement;
import com.foreknow.service.itemAmountService;
import com.foreknow.service.userInfoService;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.List;

public class showUserInfoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        req.setCharacterEncoding("utf-8");
        PrintWriter out = resp.getWriter();
        String location = req.getParameter("location");
        String  city = req.getParameter("city");

        if (location == "false" || location == null){
            //重新排列数据库---以口罩数量排列
            rankingServiceImplement ranking = new rankingServiceImplement();
            List<Object> listRank = ranking.ranking();
            //将查询到的listRank集合保存到服务器端
            req.setAttribute("rankedData" , listRank);


            //调用业务层查询所有用户信息的方法
            userInfoService service = new userInfoServiceImplement();
            List<Object> list = service.queryInfo();
            //将查询到的list集合保存到服务器端
            req.setAttribute("userData",list);

            //将数据传给serverAfterServlet
            req.getSession().setAttribute("userData",list);
            req.getSession().setAttribute("rankedData",listRank);

            req.getSession().setAttribute("hiddenAsk" , false);
            //就可以将请求转发给servey.jsp
            req.getRequestDispatcher("/servey.jsp").forward(req,resp);

        } else {
            //重新排列数据库---以口罩数量排列
            rankingServiceImplement ranking = new rankingServiceImplement();
            List<Object> listRank = ranking.ranking();
            //将查询到的listRank集合保存到服务器端
            req.setAttribute("rankedData" , listRank);

            //重新排列数据库---以地点排列
            userInfo ui = (userInfo) req.getSession().getAttribute("ui");
            rankingServiceImplement rankingAsLoca = new rankingServiceImplement();
            List<Object> listRankAsLoca = rankingAsLoca.rankingAsLoca(city);
            //将查询到的listRank集合保存到服务器端
            req.setAttribute("rankedAsLocaData" , listRankAsLoca);

            //调用业务层查询所有用户信息的方法
            userInfoService service = new userInfoServiceImplement();
            List<Object> list = service.queryInfo();
            //将查询到的list集合保存到服务器端
            req.setAttribute("userData",list);


            //将数据传给serverAfterServlet
            req.getSession().setAttribute("userData",list);
            req.getSession().setAttribute("rankedData",listRank);
            req.getSession().setAttribute("rankedAsLocaData",listRankAsLoca);
            req.getSession().setAttribute("hiddenAsk" , true);


            //就可以将请求转发给servey.jsp
            req.getRequestDispatcher("/servey.jsp").forward(req,resp);
        }


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
