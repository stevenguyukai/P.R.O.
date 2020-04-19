package com.foreknow.dao.implement;

import com.foreknow.dao.deleteErrorInfoDao;

import java.sql.SQLException;

public class deleteErrorInfoDaoImplement extends BaseDAO implements deleteErrorInfoDao {
    @Override
    public boolean deleteErrorInfo() throws SQLException {

        //将无法使用的用户信息删除
        String sql = "DELETE FROM userInfo WHERE OPENID='OPENID获取失败' OR OPENID='' OR OPENID=' ' OR OPENID=NULL" ;
        String sql2 = "DELETE FROM itemAmount WHERE userID='OPENID获取失败' OR userID='' OR userID=' ' OR userID=NULL" ;

        int isRight  = jdbcTemplate.deleteErrorInfo(sql,sql2);
        return isRight == 2;
    }
}
