package com.Servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
  什么是servlet：一个服务器的应用程序

作用：
    1，可以读取客户端发送的所有数据
    2，查询http请求中包含的任何其他信息（获取请求参数）
    3，处理数据并生成结果
    4，还可以设置适合的http响应参数
    5，将响应的信息发送给客户端

创建：
    1，要创建一个servlet，那么就一定要继承HttpServlet
    2，要重写doGet/doPost方法
       这两个方法什么时候会调用：如果客户端向服务器发送的请求是get请求，那么就会自动去调用Servlet中的doGet()方法
                             如果客户端向服务器发送的请求是post请求，那么就会自动去调用Servlet中的doPost()方法
    3. 方法的参数：
           关于请求的方法：
               http1.1支持多种请求的方式 get(查询)  post(添加) put(修改) delete(删除)

       a) HttpServletRequest req 接口：这个接口无需我们自己初始化，服务器会自动将它进行初始化
       b) HttpServletResponse resp 接口：这个接口无需我们自己初始化，服务器会自动将它进行初始化

            HttpServletRequest接口的作用：
                i> 可以提取客户端请求的信息
                    比如说：提取表单信息，提取http的头信息，cookie信息
                ii> 修改字符编码
                iii> 在服务器端保存数据
                iv> 转换资源（资源的的跳转）转发以及重定向

Servlet的生命周期：(就是一个对象从它的创建开始直到这个对象被销毁)
    1，初始化阶段 init()
    2，响应客户端请求的阶段 service()
    3，销毁阶段 destroy()

*/
public class Example extends HttpServlet {
    @Override
    //需要把映射地址写在web.xml中
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置服务器端向客户端响应的的内容的类型（MIME）
        resp.setContentType("text/html;charset=utf-8");
        //要使用这个对象的方法在页面中输出内容
        PrintWriter out = resp.getWriter();
        out.println("<html>");
        out.println("<head>");
        out.println("<title>这是标题</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>这是一个测试</h1>");
        out.println("获取客户端向服务端请求的方法: " + req.getMethod() +  "</br>");
        out.println("获取请求的url: " + req.getRequestURL() +  "</br>");
        out.println("获取请求的uri: " +  req.getRequestURI() +  "</br>");
        out.println("获取当前项目的名称: " + req.getContextPath() +  "</br>");
        out.println("获取本地端口号: " + req.getLocalPort() +  "</br>");
        out.println("获取http协议名称: " + req.getProtocol() +  "</br>");
        out.println("</body>");
        out.println("</html>");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    public void destroy() {
        //只会被调用一次destroy()方法
        //System.out.println("这是servlet生命周期中的销毁阶段......");
    }

    @Override  //ServletConfig：使用此对象中的方法可以获取web.xml中配置的初始化参数
    public void init(ServletConfig config) throws ServletException {
        //String pageSize =  config.getInitParameter("PageSize");                        只能获取到局部的初始化参数
        //String pageSize = config.getServletContext().getInitParameter("PageSize");     可以获取到全局的初始化参数
        //System.out.println(Integer.parseInt(pageSize));                                输出获取的参数
    }

//    @Override
//    public void init() throws ServletException {
//        //只会被调用一次init()方法，不会获取初始化参数
//        System.out.println("这是servlet生命周期中的初始化阶段......");
//    }

}
