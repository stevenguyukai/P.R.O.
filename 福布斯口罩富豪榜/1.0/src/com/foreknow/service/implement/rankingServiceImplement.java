package com.foreknow.service.implement;

import com.foreknow.dao.implement.rankingDaoImplement;
import com.foreknow.db.DBManager;
import com.foreknow.model.userInfo;
import com.foreknow.service.rankService;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class rankingServiceImplement implements rankService {
    @Override
    public List<Object> ranking() {
        DBManager dbManager = DBManager.getInstance();
        Connection connection = dbManager.getConnection();
        rankingDaoImplement rankingDao = new rankingDaoImplement();
        rankingDao.setConnection(connection);
        List<Object> list = null;
        try {
            list = rankingDao.rankingAsAmount();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<Object> rankingAsLoca(String city) {
        DBManager dbManager = DBManager.getInstance();
        Connection connection = dbManager.getConnection();
        rankingDaoImplement rankingDao = new rankingDaoImplement();
        rankingDao.setConnection(connection);
        List<Object> list = null;
        try {
            list = rankingDao.rankingAsLoca(city);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

}
