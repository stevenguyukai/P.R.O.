package com.Servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;

@WebServlet("/guideServlet")

public class guideServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
//        // 微信加密签名
//        String signature = req.getParameter("signature");
//        // 时间戳
//        String timestamp = req.getParameter("timestamp");
//        // 随机数
//        String nonce = req.getParameter("nonce");
//        // 随机字符串
//        String echostr = req.getParameter("echostr");
//
//        PrintWriter out = resp.getWriter();
//        out.print(echostr);
        // 设置编码
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        resp.setCharacterEncoding("utf-8");
        PrintWriter writer = resp.getWriter();
        /**
         * 第一步：用户同意授权，获取code:https://open.weixin.qq.com/connect/oauth2/authorize
         * ?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE
         * &state=STATE#wechat_redirect
         */
        String redirect_uri = "http://67b63447.ngrok.io/maskProject/user/wx";// 目标访问地址
        redirect_uri = URLEncoder.encode(
                "http://67b63447.ngrok.io/maskProject/user/wx", "UTF-8");// 授权后重定向的回调链接地址，请使用urlencode对链接进行处理（文档要求）
        // 按照文档要求拼接访问地址
        String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                + "wx63056aba44fc449b"
                + "&redirect_uri="
                + redirect_uri
                + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        resp.sendRedirect(url);// 跳转到要访问的地址


    }
}

