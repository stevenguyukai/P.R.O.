package com.foreknow.service.implement;

import com.foreknow.dao.implement.userInfoDaoImplement;
import com.foreknow.dao.userInfoDao;
import com.foreknow.db.DBManager;
import com.foreknow.model.userInfo;
import com.foreknow.service.userInfoService;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class userInfoServiceImplement implements userInfoService {
    @Override
    public boolean save(userInfo userInfo) {
        DBManager dbManager = DBManager.getInstance();

        //连接数据库
        Connection con = dbManager.getConnection();
        userInfoDaoImplement userInfoDao = new userInfoDaoImplement();

        //将DBManager中获取到的连接传递给BaseDAO中的setConnection(conn)
        userInfoDao.setConnection(con);
        boolean isRight = false;
        try {
            isRight = userInfoDao.getUsersInformation(userInfo);
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

    @Override
    public List<Object> queryInfo() {
        DBManager dbManager = DBManager.getInstance();
        Connection connection = dbManager.getConnection();
        userInfoDaoImplement userInfoDao = new userInfoDaoImplement();
        userInfoDao.setConnection(connection);
        List<Object> list = null;
        try {
            list = userInfoDao.getQueryAll();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }
}
