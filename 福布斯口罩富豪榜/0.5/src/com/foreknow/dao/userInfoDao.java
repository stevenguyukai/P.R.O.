package com.foreknow.dao;

// 接口
// 在接口中要声明对userInfo Bean的操作

import com.foreknow.model.userInfo;

import java.sql.SQLException;
import java.util.List;

public interface userInfoDao {

    //添加用户信息
    public boolean getUsersInformation(userInfo userInfo) throws SQLException;

    //查询所有用户信息
    public List<Object> getQueryAll() throws SQLException;
}
