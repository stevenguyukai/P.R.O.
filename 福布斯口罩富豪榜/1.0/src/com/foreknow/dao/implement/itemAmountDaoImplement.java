package com.foreknow.dao.implement;

import com.foreknow.dao.itemAmountDao;
import com.foreknow.mapping.EntityMapping;
import com.foreknow.mapping.MappingFactory;
import com.foreknow.model.itemAmount;

import java.sql.SQLException;
import java.util.List;

public class itemAmountDaoImplement extends BaseDAO implements itemAmountDao {
    @Override
    public boolean getItemAmount(itemAmount itemAmount) throws SQLException {

        //将用户的物品数量转到对应名字和物品的数据库格子里
        String sql = "UPDATE itemAmount SET itemAmount=? WHERE userID=? AND itemID=?" ;  //后期把主页面获取到的userID传给selectAmount.html，以改变表单value
        //String sql = "insert into itemAmount(itemAmount) values(?)";    测试

        int isRight  = jdbcTemplate.updateUserItem(sql,itemAmount.getItemAmount(),itemAmount.getUserID(),1000);
        return isRight == 1;
    }

    @Override
    public List<Object> getQueryAll() throws SQLException {
        String sql = "select * from itemAmount";
        EntityMapping mapping = this.mappingFactory.getMap(MappingFactory.ITEMAMOUNT_MAPPING);
        List<Object> list = this.jdbcTemplate.query(sql,mapping);
        return list;
    }


}
