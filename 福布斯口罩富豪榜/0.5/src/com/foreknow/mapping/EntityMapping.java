package com.foreknow.mapping;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface EntityMapping {

//    将数据库拿来的结果集中的一行数据，映射为一个对象
    public Object mapping(ResultSet rs) throws SQLException;
}
