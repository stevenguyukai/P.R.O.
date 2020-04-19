package com.foreknow.dao.implement;



import java.sql.Connection;

import com.foreknow.db.JdbcTemplate;
import com.foreknow.mapping.MappingFactory;

public class BaseDAO {

    protected JdbcTemplate jdbcTemplate = JdbcTemplate.getInstance();// JDBC模板
    protected MappingFactory mappingFactory = MappingFactory.getInstance();// mapping工厂实例

   //注入数据库连接类
    public void setConnection(Connection connection) {
        jdbcTemplate.setConnection(connection);
    }
}
