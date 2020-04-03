package com.foreknow.dao;

import java.sql.SQLException;
import java.util.List;

public interface rankingDao {

    //以口罩数量排序
    public List<Object> rankingAsAmount() throws SQLException;
}
