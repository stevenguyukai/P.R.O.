package com.foreknow.service.implement;

import com.foreknow.dao.implement.deleteErrorInfoDaoImplement;
import com.foreknow.db.DBManager;
import com.foreknow.service.deleteErrorInfoService;

import java.sql.Connection;
import java.sql.SQLException;

public class deleteErrorInfoServiceImplement implements deleteErrorInfoService {
    @Override
    public boolean deleteErrorInfo() {

        //获取实例
        DBManager dbManager = DBManager.getInstance();

        //连接数据库
        Connection con = dbManager.getConnection();
        deleteErrorInfoDaoImplement deleteErrorInfoDao = new deleteErrorInfoDaoImplement();

        //将DBManager中获取到的连接传递给BaseDAO中的setConnection(conn)
        deleteErrorInfoDao.setConnection(con);
        boolean isRight = false;
        try {
            isRight = deleteErrorInfoDao.deleteErrorInfo();

            //提交事物
            con.commit();
        } catch (SQLException e) {
            try {
                con.rollback();
                isRight = false;
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
            e.printStackTrace();
        }

        return isRight;
    }
}
