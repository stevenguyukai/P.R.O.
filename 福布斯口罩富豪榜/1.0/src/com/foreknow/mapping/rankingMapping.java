package com.foreknow.mapping;

import com.foreknow.model.ranking;

import java.sql.ResultSet;
import java.sql.SQLException;

public class rankingMapping implements EntityMapping {
    @Override
    public Object mapping(ResultSet rs) throws SQLException {
        ranking rk = new ranking();
        rk.setUserIDRank(rs.getString("userID"));
        rk.setItemAmountRank(rs.getString("itemAmount"));
        return rk;
    }
}
