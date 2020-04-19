package com.foreknow.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.foreknow.mapping.EntityMapping;

public class JdbcTemplate {

    private Connection con;
    private PreparedStatement psta;
    private PreparedStatement psta1;
    private ResultSet rs = null;
    private static JdbcTemplate jdbcTemplate = null;

    private JdbcTemplate() {
    }

    public static JdbcTemplate getInstance() {
        if (jdbcTemplate == null) {
            jdbcTemplate = new JdbcTemplate();
        }
        return jdbcTemplate;
    }

    public void setConnection(Connection connection) {
        this.con = connection;
    }


    //添加用户信息
    public int update(String sql,String sql1,Object... values) {
        int row = 0;
        int row1 = 1;
        try {
            if (sql != null){
                psta = con.prepareStatement(sql);     //insert into emp values(?,?,?,?)
                for (int i = 0; i< values.length-3; i++){
                    psta.setObject(i+1, values[i]);
                }
                row = psta.executeUpdate();

            }
        } catch (SQLException e) {
            String errorMsg = "sql语句发生错误！sql语句为：" + sql;
            throw new RuntimeException(errorMsg);
        }
        try {
            if (sql1 != null) {
                psta1 = con.prepareStatement(sql1);     //insert into emp values(?,?,?,?)
                psta1.setObject(1, values[9]);
                psta1.setObject(2, values[10]);
                psta1.setObject(3, values[11]);

                row1 = psta1.executeUpdate();
            }
        }catch(SQLException e){
                String errorMsg = "发生错误";
                throw new RuntimeException(errorMsg);
            }
         finally {
            close();
        }
        return row  * row1;
    }

    //添加用户对应物品数
    public int updateUserItem(String sql,Object... values) {
        int row = 0;
        try {
            if (sql != null){
                psta = con.prepareStatement(sql);     //insert into emp values(?,?,?,?)
                for (int i = 0; i< values.length; i++){
                    psta.setObject(i+1, values[i]);
                }

                row = psta.executeUpdate();
            }
        } catch (SQLException e) {
            String errorMsg = "sql语句发生错误！sql语句为：" + sql;
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return row;
    }

    //重新排列数据库-----以口罩数的方式
    public List<Object> ranking(String sql , EntityMapping mapping) {
        List<Object> list = new ArrayList<Object>();
        try {
            psta = con.prepareStatement(sql);
            rs = psta.executeQuery();
            while(rs.next()){
                list.add(mapping.mapping(rs));
            }
        } catch (SQLException e) {
            String errorMsg = "发生错误:" + list;
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return list;
    }

    //删除出错用户信息
    public int deleteErrorInfo(String sql , String sql2) {
        int row1 = 0;
        int row2 = 0;
        try {
            if (sql != null){
                psta = con.prepareStatement(sql);
                row1 = psta.executeUpdate();
            }

            if (sql2 != null){
                psta = con.prepareStatement(sql2);
                row2 = psta.executeUpdate();
            }
        } catch (SQLException e) {
            String errorMsg = "sql语句发生错误！sql语句为：" + sql + " or " + sql2;
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return row1 + row2;
    }

    //重新排列数据库-----以地点的方式
    public List<Object> rankingAsLoca(String sql , EntityMapping mapping , String city) {
        List<Object> list = new ArrayList<Object>();
        try {
            psta = con.prepareStatement(sql);
            psta.setObject(1,city);
            rs = psta.executeQuery();
            while(rs.next()){
                list.add(mapping.mapping(rs));
            }
        } catch (SQLException e) {
            String errorMsg = "发生错误:" + list;
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return list;
    }


    public double queryDouble(String sql, Object... values) {
        double result = 0;
        try {
            psta = con.prepareStatement(sql);
            for (int i = 0; i< values.length; i++){
                psta.setObject(i+1, values[i]);
            }
            rs = psta.executeQuery();
            if (rs.next()) {
                result = rs.getDouble(1);
            }
        } catch (SQLException e) {
            String errorMsg = "sql语句发生错误！sql语句为：" + sql;
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return result;
    }

    public int query(String sql){
        int result = 0;
        try {
            psta = con.prepareStatement(sql);
            rs = psta.executeQuery();
            if (rs.next()) {
                result = rs.getInt(1);
            }
        } catch (SQLException e) {
            String errorMsg = "sql语句发生错误！sql语句为：" + sql;
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return result;
    }

    public List<Object> query(String sql, EntityMapping mapping, Object...values){
        List<Object> list = new ArrayList<Object>();
        try {
            psta = con.prepareStatement(sql);
            if (values.length!=0){
                for (int i = 0; i < values.length; i++){
                    psta.setObject(i+1, values[i]);
                }
            }
            rs = psta.executeQuery();
            while(rs.next()){
                list.add(mapping.mapping(rs));
            }
        } catch (SQLException e) {
            String errorMsg = "sql语句发生错误！sql语句为：" + sql;
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return list;
    }

//    /**
//     * 关闭数据库连接
//     * @throws DAOException
//     */
    public void close(){
        try{
            if (psta!=null){
                psta.close();
                psta=null;
            }
            if (rs!=null){
                rs.close();
                rs=null;
            }
        } catch (SQLException e) {
            String errorMsg = "关闭preparedstatment 和resultset发生错误！";
            throw new RuntimeException(errorMsg);
        }
    }
}
