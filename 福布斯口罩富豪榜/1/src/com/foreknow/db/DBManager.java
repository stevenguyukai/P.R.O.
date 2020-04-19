package com.foreknow.db;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

public class DBManager extends HttpServlet {


    // 使得外部可以实例化DBManager
    private static DBManager dbManager = null;
    public static DBManager getInstance() {
        if (dbManager == null) {
            dbManager = new DBManager();
        }
        return dbManager;
    }


    public Connection getConnection(){
        Connection conn=null;

        //2.加载驱动
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            //3.获取与数据库连接
            String user=  "sa";
            String password ="smileKAI030925";
            String url="jdbc:sqlserver://localhost:1433;DatabaseName=PublicBenefit";
            conn=DriverManager.getConnection(url,user,password);
            conn.setAutoCommit(false);
        } catch (Exception e) {
            e.printStackTrace();

        }



        //4.获取用于向sql发送命令的statement
        //Statement stmt = conn.createStatement();

        //5.向数据库发送SQL命令
//        PreparedStatement pst=null;
//        pst  = conn.prepareStatement("Insert Into itemInfo(ID,Picture) Values (?,?)");
//        pst.setInt(1,1001);
//        pst.setInt(2,maskNum);
//        pst.addBatch();
//        pst.executeBatch();
        //String sql="insert into itemInfo values(1001,maskNum,'test','test','test')";    //添加测试数据库信息
        //String sql = "delete from itemInfo where ID = '1001'";                       //删除测试数据库信息


        //6.关闭连接
//        stmt.close();
//        conn.close();
        return conn;
    }
}
