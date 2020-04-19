package com.Servlet;

import com.foreknow.model.AutoWebParams;
import com.foreknow.model.userInfo;
import com.foreknow.model.wxUserInfo;
import com.foreknow.service.implement.deleteErrorInfoServiceImplement;
import com.foreknow.service.implement.rankingServiceImplement;
import com.foreknow.service.implement.userInfoServiceImplement;
import com.foreknow.service.userInfoService;
import com.foreknow.util.HttpUtil;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

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
            wxUserInfo userInfomation = new wxUserInfo();
            Gson gson3 = new Gson();
            userInfomation = gson3.fromJson(new String(res3.getBytes(), "utf-8"), new wxUserInfo().getClass());

            //删除上传错误用户信息
            deleteErrorInfoServiceImplement delete = new deleteErrorInfoServiceImplement();
            delete.deleteErrorInfo();

            //查看用户是否已经使用过
            boolean isAlready = false;

            userInfoService service = new userInfoServiceImplement();
            List<Object> userList = service.queryInfo();
            if (userList != null){
                for (int i=0;i<userList.size();i++){
                    userInfo OPENID = (userInfo) userList.get(i);
                    if (OPENID.getOPENID().equals(userInfomation.getOpenid())){

                        isAlready =true;
                        req.getSession().setAttribute("isAlready",isAlready);

                        //重新排列数据库---以口罩数量排列
                        rankingServiceImplement ranking = new rankingServiceImplement();
                        List<Object> listRank = ranking.ranking();

                        //调用业务层查询所有用户信息的方法
                        userInfoService service1 = new userInfoServiceImplement();
                        List<Object> list = service1.queryInfo();

                        //重新排列数据库---以地点排列
                        rankingServiceImplement rankingAsLoca = new rankingServiceImplement();
                        List<Object> listRankAsLoca = rankingAsLoca.rankingAsLoca (OPENID.getResentRegion());

                        //将数据传给serverAfter
                        req.getSession().setAttribute("userDataAfter",list);
                        req.getSession().setAttribute("rankedDataAfter",listRank);
                        req.getSession().setAttribute("rankedAsLocationDataAfter",listRankAsLoca);
                        req.getSession().setAttribute("alreadyDeployUserInfo",OPENID);

                        req.getRequestDispatcher("/serveyAfter.jsp").forward(req,resp);
                    }
                }

            }

            req.getSession().setAttribute("isAlready",isAlready);
            req.getSession().setAttribute("userInfomation",userInfomation);
            req.getRequestDispatcher("/user/get").forward(req, resp);
        }
    }
}
