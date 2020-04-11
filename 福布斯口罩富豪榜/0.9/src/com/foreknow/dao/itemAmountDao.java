package com.foreknow.dao;

import com.foreknow.model.itemAmount;
import com.foreknow.model.itemAmount;

import java.sql.SQLException;
import java.util.List;

public interface itemAmountDao {

    //添加用户物品数量
    public boolean getItemAmount(itemAmount itemAmount) throws SQLException;

    //查询所有用户信息
    public List<Object> getQueryAll() throws SQLException;

}
