package com.foreknow.service.implement;

import com.foreknow.db.DBManager;
import com.foreknow.model.itemAmount;
import com.foreknow.service.itemAmountService;
import com.foreknow.dao.implement.itemAmountDaoImplement;

import java.sql.Connection;
import java.sql.SQLException;

public class itemAmountServiceImplement implements itemAmountService {
    @Override
    public boolean save(itemAmount itemAmount) {

        //获取实例
        DBManager dbManager = DBManager.getInstance();

        //连接数据库
        Connection con = dbManager.getConnection();
        itemAmountDaoImplement itemAMountDao = new itemAmountDaoImplement();

        //将DBManager中获取到的连接传递给BaseDAO中的setConnection(conn)
        itemAMountDao.setConnection(con);
        boolean isRight = false;
        try {
            isRight = itemAMountDao.getItemAmount(itemAmount);

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
