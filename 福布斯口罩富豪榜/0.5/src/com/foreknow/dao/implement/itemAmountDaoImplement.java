package com.foreknow.dao.implement;

import com.foreknow.dao.itemAmountDao;
import com.foreknow.model.itemAmount;

import java.sql.SQLException;

public class itemAmountDaoImplement extends BaseDAO implements itemAmountDao {
    @Override
    public boolean getItemAmount(itemAmount itemAmount) throws SQLException {

        //将用户的物品数量转到对应名字和物品的数据库格子里
        String sql = "UPDATE itemAmount SET itemAmount=? WHERE userID=? and itemID=?" ;  //后期把主页面获取到的userID传给selectAmount.html，以改变表单value
        //String sql = "insert into itemAmount(itemAmount) values(?)";    测试

        int isRight  = jdbcTemplate.updateUserItem(sql,itemAmount.getItemAmount(),itemAmount.getUserID(),1000);
        return isRight == 1;
    }
}
