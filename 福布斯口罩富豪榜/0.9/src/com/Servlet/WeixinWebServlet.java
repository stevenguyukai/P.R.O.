package com.Servlet;

import com.foreknow.model.AutoWebParams;
import com.foreknow.model.wxUserInfo;
import com.foreknow.util.HttpUtil;
import com.google.gson.Gson;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpUtils;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;

public class WeixinWebServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        resp.setCharacterEncoding("utf-8");
        PrintWriter writer = resp.getWriter();

        //第二步：通过code换取网页授权access_token
        String code = req.getParameter("code");// 获取返回码
        // 同意授权
        if (code != null) {
            // 拼接请求地址
            String url = "https://api.weixin.qq.com/sns/oauth2/access_token?"
                    + "appid=" + "wx63056aba44fc449b" + "&secret="
                    + "82fc153170e4916b8f46dbff272f1a79"
                    + "&code=" + code
                    + "&grant_type=authorization_code";

            String res = HttpUtil.get(url, null);
            AutoWebParams autoWebParams = new AutoWebParams();
            Gson gson = new Gson();
            autoWebParams = gson.fromJson(res, new AutoWebParams().getClass());

            //第三步：刷新access_token（如果需要）
            String url2 = "https://api.weixin.qq.com/sns/oauth2/refresh_token?"
                    + "appid=" + "wx63056aba44fc449b"
                    + "&grant_type=refresh_token&refresh_token="
                    + autoWebParams.getRefresh_token();
            String res2 = HttpUtil.get(url2, null);// 拿去返回值
            AutoWebParams autoWebParams2 = new AutoWebParams();
            Gson gson2 = new Gson();
            autoWebParams2 = gson2.fromJson(res2, new AutoWebParams().getClass());

            //第三步：拉取用户信息(需scope为 snsapi_userinfo)
            String url3 = "https://api.weixin.qq.com/sns/userinfo?access_token="
                    + autoWebParams.getAccess_token()
                    + "&openid="
                    + autoWebParams2.getOpenid() + "&lang=zh_CN";
            String res3 = HttpUtil.get(url3, null);// 拿去返回值
            wxUserInfo userInfo = new wxUserInfo();
            Gson gson3 = new Gson();
            userInfo = gson3.fromJson(new String(res3.getBytes(), "utf-8"), new wxUserInfo().getClass());
            System.out.println(userInfo);

            // 测试显示用户信息
            //req.setAttribute("userInfo", userInfo);
            //req.getRequestDispatcher("/userinfo.jsp").forward(req, resp);

            req.getSession().setAttribute("userData",userInfo);
            req.getRequestDispatcher("/user/get").forward(req, resp);
        }
    }
}
