package com.foreknow.test;

import com.foreknow.model.userInfo;
import com.foreknow.service.implement.userInfoServiceImplement;
import com.foreknow.service.userInfoService;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TestUserInfoService {
    public static void main(String[] args) {
        userInfoService service = new userInfoServiceImplement();
        userInfo ui = new userInfo();
        ui.setName("steven");
        ui.setOPENID("127rtdg19d1y92");
        ui.setAvatar("https://pic.com");
        ui.setAvailable("Enable");
        ui.setResentLatitude("123.123");
        ui.setResentLongitude("321.321");
        SimpleDateFormat sdf  = new SimpleDateFormat("yyyy-MM-dd");
        ui.setResentLoginTime(sdf.format(new Date()));
        ui.setResentRegion("shanghai");
        ui.setComment("No comment");
        boolean isRight = service.save(ui);
        if (isRight){
            System.out.println("添加成功");
        }else{
            System.out.println("添加失败");
        }
    }
}
