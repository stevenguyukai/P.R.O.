package register;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Login extends HttpServlet {
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html; charset=utf-8");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String username1 = "abc";
		String password1 = "Aa12345678";
		PrintWriter out = response.getWriter();
		if((username.equals(username1)) && (password.equals(password1))){
			out.write("通过");
		}else{
			out.write("用户名或者密码错误");
			response.setHeader("refresh","3;/P.R.O1/login.html"); 
		}
	}

}