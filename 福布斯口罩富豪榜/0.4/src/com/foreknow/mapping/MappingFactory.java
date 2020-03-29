package com.foreknow.mapping;

// 他是一个工厂类
// 作用是用来管理 xxxxxMapping 对象的

import java.util.HashMap;
import java.util.Map;

//初始化mapping工厂
public class MappingFactory {
    private static MappingFactory mappingFactory = null;
    private Map<String , EntityMapping> maps = new HashMap<>();
    public static final String USERINFO_MAPPING = "userInfoMapping";

    private MappingFactory(){

    }

    //实例化一个mapping工厂
    public static MappingFactory getInstance() {
        if (mappingFactory == null){
            mappingFactory = new MappingFactory();
            mappingFactory.maps.put(USERINFO_MAPPING , new userInfoMapping());
        }
        return mappingFactory;
    }

    //外部通过调用来获取工厂内部的mapping信息
    public EntityMapping getMap(String key){
        return maps.get(key);
    }
}
