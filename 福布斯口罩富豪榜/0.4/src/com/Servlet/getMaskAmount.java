package Servlets;

import com.foreknow.db.DBManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

public class getMaskAmount extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //设置服务器端向客户端返回的内容的类型以及字符编码集
        resp.setContentType("text/html;charset=utf-8");

        //设置客户端端向服务器端请求的字符编码集
        req.setCharacterEncoding("utf-8");

        //获取从表单传来的用户口罩数量
        String maskAmount = req.getParameter("maskAmount");

        //连接管理数据库的java文件
        DBManager getMaskNum = new DBManager();

        //把用户口罩数传送给管理数据库的java文件
        getMaskNum.setMask(Integer.valueOf(maskAmount));
    }
}
