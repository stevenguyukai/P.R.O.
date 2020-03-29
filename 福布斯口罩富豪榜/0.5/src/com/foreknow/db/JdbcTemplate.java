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

    /**
     * 注入数据库连接
     * @param connection
     */
    public void setConnection(Connection connection) {
        this.con = connection;
    }
//    /**
//     * 用于执行insert，update，delete语句，可带参数
//     * @param sql
//     * @param values
//     * @return 返回影响行数
//     * @throws DAOException
//     */


    //添加用户信息
    public int update(String sql,String sql1,Object... values) {
        int row = 0;
        int row1 = 1;
        try {
            if (sql != null){
                psta = con.prepareStatement(sql);     //insert into emp values(?,?,?,?)
                for (int i = 0; i< values.length-2; i++){
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


//    /**
//     * 查询一个double值
//     * @param sql
//     * @return
//     */
    public double queryDouble(String sql, Object... values) {
//        if (logger.isDebugEnabled()) {
//            logger.debug("发送sql语句：" + sql);
//        }
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
//            if (logger.isErrorEnabled()) {
//                logger.error(errorMsg, e);
//            }
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return result;
    }

//    /**
//     * 用于执行select count（*）语句,或者获取seq序列的语句
//     * @param sql
//     * @return 返回第一个值
//     * @throws DAOException
//     */
    public int query(String sql){
//        if (logger.isDebugEnabled()) {
//            logger.debug("发送sql语句：" + sql);
//        }
        int result = 0;
        try {
            psta = con.prepareStatement(sql);
            rs = psta.executeQuery();
            if (rs.next()) {
                result = rs.getInt(1);
            }
        } catch (SQLException e) {
            String errorMsg = "sql语句发生错误！sql语句为：" + sql;
//            if (logger.isErrorEnabled()) {
//                logger.error(errorMsg, e);
//            }
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return result;
    }

//    /**
//     * 用于执行查询返回多个对象的sql语句
//     * @param sql
//     * @param mapping
//     * @param values
//     * @return 返回对象链表
//     * @throws DAOException
//     */
    public List<Object> query(String sql, EntityMapping mapping, Object...values){
//        if (logger.isDebugEnabled()) {
//            logger.debug("发送sql语句：" + sql);
//        }
        List<Object> list = new ArrayList<Object>();
        try {
            psta = con.prepareStatement(sql);
            for (int i = 0; i < values.length; i++){
                psta.setObject(i+1, values[i]);
            }
            rs = psta.executeQuery();
            while(rs.next()){
                list.add(mapping.mapping(rs));
            }
        } catch (SQLException e) {
            String errorMsg = "sql语句发生错误！sql语句为：" + sql;
//            if (logger.isErrorEnabled()) {
//                logger.error(errorMsg, e);
//            }
            throw new RuntimeException(errorMsg);
        } finally {
            close();
        }
        return list;
    }

//	public List<Object> query(String sql, EntityMapping mapping, Pager pager,Object...values){
//		if (logger.isDebugEnabled()) {
//			logger.debug("发送sql语句：" + sql);
//		}
//		List<Object> list = new ArrayList<Object>();
//		try {
//			psta = con.prepareStatement(sql);
//			for (int i = 0; i < values.length; i++){
//				psta.setObject(i+1, values[i]);
//			}
//			rs = psta.executeQuery();
//			while(rs.next()){
//				list.add(mapping.mapping(rs));
//			}
//		} catch (SQLException e) {
//			String errorMsg = "sql语句发生错误！sql语句为：" + sql;
//			if (logger.isErrorEnabled()) {
//				logger.error(errorMsg, e);
//			}
//			throw new RuntimeException(errorMsg);
//		} finally {
//			close();
//		}
//		return list;
//	}

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
//            if (logger.isErrorEnabled()) {
//                logger.error(errorMsg, e);
//            }
            throw new RuntimeException(errorMsg);
        }
    }
}
