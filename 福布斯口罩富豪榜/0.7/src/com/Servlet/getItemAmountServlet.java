package com.Servlet;

import com.foreknow.db.DBManager;
import com.foreknow.model.itemAmount;
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
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class getItemAmountServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //设置服务器端向客户端返回的内容的类型以及字符编码集
        resp.setContentType("text/html;charset=utf-8");

        //设置客户端端向服务器端请求的字符编码集
        req.setCharacterEncoding("utf-8");

        //初始化可以在页面打印语句的方法
        PrintWriter out = resp.getWriter();

        //获取从表单传来的用户口罩数量
        //String maskAmount = req.getParameter("maskAmount");

        //获取用户参数
        String itemAmount = req.getParameter("itemAmount");
        String userID = req.getParameter("userID");

        //调用service中的方法save()
        itemAmountService service = new itemAmountServiceImplement();
        itemAmount ia = new itemAmount();
        ia.setItemAmount(itemAmount);
        ia.setUserID(userID);

        boolean isRight = service.save(ia);
        if (isRight){
            //out.println("<a href='/maskProject/user/get'>查看所有用户信息</a>");

            //请求转发（注意：转换的资源一定要家"/"）
            //req.getRequestDispatcher("/user/get").forward(req,resp);    /user/get可以查看所有用户信息的页面（后期完工后删除）

            //重新排列数据库
            rankingServiceImplement ranking = new rankingServiceImplement();
            List<Object> listRank = ranking.ranking();

            //调用业务层查询所有用户信息的方法
            userInfoService service1 = new userInfoServiceImplement();
            List<Object> list = service1.queryInfo();

            //将数据传给serverAfter
            req.getSession().setAttribute("userDataAfter",list);
            req.getSession().setAttribute("rankedDataAfter",listRank);

            req.getRequestDispatcher("/serveyAfter.jsp").forward(req,resp);
        }else {
            out.println("上传登陆信息失败");
        }

    }
}
