package com.foreknow.dao.implement;

import com.foreknow.dao.rankingDao;
import com.foreknow.mapping.EntityMapping;
import com.foreknow.mapping.MappingFactory;
import com.foreknow.model.userInfo;

import java.sql.SQLException;
import java.util.List;

public class rankingDaoImplement extends BaseDAO implements rankingDao {
    @Override
    public List<Object> rankingAsAmount() throws SQLException {

        //将数据库重新排列
        String sql = "SELECT itemAmount , userID FROM itemAmount ORDER BY itemAmount DESC" ;
        EntityMapping mapping = this.mappingFactory.getMap(MappingFactory.RANKING_MAPPING);
        List<Object> list = jdbcTemplate.ranking(sql,mapping);
        return list;
    }

    @Override
    public List<Object> rankingAsLoca(String city) throws SQLException {

        //将数据库重新排列
        String sql = "SELECT * FROM itemAmount WHERE location=? and itemID=1000 ORDER BY itemAmount DESC" ;
        EntityMapping mapping = this.mappingFactory.getMap(MappingFactory.RANKING_MAPPING);
        //String city = userInfo.getResentRegion();
        List<Object> list = jdbcTemplate.rankingAsLoca(sql,mapping,city);
        return list;
    }

}
