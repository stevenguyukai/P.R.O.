package com.foreknow.service;

import com.foreknow.model.userInfo;

import java.util.List;

public interface rankService {
    public List<Object> ranking();

    public List<Object> rankingAsLoca(String city);
}
