package com.foreknow.dao;

import com.foreknow.model.userInfo;

import java.sql.SQLException;
import java.util.List;

public interface rankingDao {

    //以口罩数量排序
    public List<Object> rankingAsAmount() throws SQLException;

    //以地点排序
    public List<Object> rankingAsLoca(String city) throws SQLException;
}
