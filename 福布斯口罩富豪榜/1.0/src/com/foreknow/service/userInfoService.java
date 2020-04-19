package com.foreknow.service;

import com.foreknow.model.userInfo;

import java.util.List;

public interface userInfoService {

    // 添加用户信息的业务方法
    public boolean save(userInfo userInfo);

    public List<Object> queryInfo();
}
