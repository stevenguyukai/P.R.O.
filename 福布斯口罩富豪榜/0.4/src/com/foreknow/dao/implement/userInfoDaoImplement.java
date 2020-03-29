package com.foreknow.dao.implement;

import com.foreknow.dao.userInfoDao;
import com.foreknow.mapping.EntityMapping;
import com.foreknow.mapping.MappingFactory;
import com.foreknow.model.userInfo;

import java.sql.SQLException;
import java.util.List;

public class userInfoDaoImplement extends BaseDAO implements userInfoDao{

    @Override
    public boolean getUsersInformation(userInfo userInfo){
        String sql = "insert into userInfo(Name,Avatar,OPENID,Available,ResentLongitude,ResentLatitude,ResentRegion,ResentLoginTime,Comment) values(?,?,?,?,?,?,?,?,?)";
        int isRight  = jdbcTemplate.update(sql,userInfo.getName(),userInfo.getAvatar(),userInfo.getOPENID(),userInfo.getAvailable(),userInfo.getResentLongitude(),userInfo.getResentLatitude(),userInfo.getResentRegion(),userInfo.getResentLoginTime(),userInfo.getComment());
        return isRight==1;
    }

    @Override
    public List<Object> getQueryAll() throws SQLException {
        String sql = "select * from userInfo";
        EntityMapping mapping = this.mappingFactory.getMap(MappingFactory.USERINFO_MAPPING);
        List<Object> list = this.jdbcTemplate.query(sql,mapping);
        return list;
    }
}
