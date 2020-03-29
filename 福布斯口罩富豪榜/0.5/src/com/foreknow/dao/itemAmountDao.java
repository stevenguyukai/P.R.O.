package com.foreknow.dao;

import com.foreknow.model.itemAmount;
import com.foreknow.model.itemAmount;

import java.sql.SQLException;

public interface itemAmountDao {

    //添加用户物品数量
    public boolean getItemAmount(itemAmount itemAmount) throws SQLException;
}
