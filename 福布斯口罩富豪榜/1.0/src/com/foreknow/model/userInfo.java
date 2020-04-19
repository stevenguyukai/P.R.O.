package com.foreknow.model;

public class userInfo {
    private Integer ID;
    private String Name;
    private String Avatar;
    private String OPENID;
    private String Available;
    private String ResentLongitude;
    private String ResentLatitude;
    private String ResentRegion;
    private String ResentLoginTime;
    private String Comment;

    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getAvatar() {
        return Avatar;
    }

    public void setAvatar(String avatar) {
        Avatar = avatar;
    }

    public String getOPENID() {
        return OPENID;
    }

    public void setOPENID(String OPENID) {
        this.OPENID = OPENID;
    }

    public String getAvailable() {
        return Available;
    }

    public void setAvailable(String available) {
        Available = available;
    }

    public String getResentLongitude() {
        return ResentLongitude;
    }

    public void setResentLongitude(String resentLongitude) {
        ResentLongitude = resentLongitude;
    }

    public String getResentLatitude() {
        return ResentLatitude;
    }

    public void setResentLatitude(String resentLatitude) {
        ResentLatitude = resentLatitude;
    }

    public String getResentRegion() {
        return ResentRegion;
    }

    public void setResentRegion(String resentRegion) {
        ResentRegion = resentRegion;
    }

    public String getResentLoginTime() {
        return ResentLoginTime;
    }

    public void setResentLoginTime(String resentLoginTime) {
        ResentLoginTime = resentLoginTime;
    }

    public String getComment() {
        return Comment;
    }

    public void setComment(String comment) {
        Comment = comment;
    }
}
