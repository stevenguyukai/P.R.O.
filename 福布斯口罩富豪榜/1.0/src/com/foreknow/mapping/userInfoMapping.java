package com.foreknow.mapping;

import com.foreknow.model.userInfo;

import java.sql.ResultSet;
import java.sql.SQLException;

public class userInfoMapping implements EntityMapping {
    @Override
    public Object mapping(ResultSet rs) throws SQLException {
        userInfo ui = new userInfo();
        ui.setID(rs.getInt("ID"));
        ui.setName(rs.getString("Name"));
        ui.setAvailable(rs.getString("Available"));
        ui.setAvatar(rs.getString("Avatar"));
        ui.setOPENID(rs.getString("OPENID"));
        ui.setResentLatitude(rs.getString("ResentLatitude"));
        ui.setResentLongitude(rs.getString("ResentLongitude"));
        ui.setResentRegion(rs.getString("ResentRegion"));
        ui.setResentLoginTime(rs.getString("ResentLoginTime"));
        ui.setComment(rs.getString("Comment"));
        return ui;
    }
}
