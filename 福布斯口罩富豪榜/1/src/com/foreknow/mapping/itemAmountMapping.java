package com.foreknow.mapping;

import com.foreknow.model.itemAmount;

import java.sql.ResultSet;
import java.sql.SQLException;

public class itemAmountMapping implements EntityMapping{
    @Override
    public Object mapping(ResultSet rs) throws SQLException {
        itemAmount ia = new itemAmount();
        ia.setItemAmount(rs.getString("itemAmount"));
        ia.setUserID(rs.getString("userID"));
        return ia;
    }
}
