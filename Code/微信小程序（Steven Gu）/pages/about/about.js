var app = getApp();
var userImgGet = app.globalData.avatar;
var name = app.globalData.name;

Page({

  data: {
    background: [{
        "viewid": "1", 
        "imgsrc":
"https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN4ReQVGw7WjFYIBjy994vqGyu0gL4XcvaiaKEcPOlkujZqe0vNmCxYeX8rhlicdBGfkcYpjHAImicmfA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "name": "违反常识的几个现实",
      },
      {
        "viewid": "2",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN7G5HAIs0UUynhwtmia7pWS5WyJWFAAXNsK44O0WJTjbu1LUpRG3Zsib5qNdzXGDbUcOaXwauD9EtXA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "name": "百分之一的电等于无穷",
      },
      {
        "viewid": "3",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN70R4t1TSBiayEwrYl3wFSicnx5p0DJAMNuqRKBcStjwPSn1TV0rToVsE9vS2gV9DuYCwelYMMUjOGQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "name": "论·网络乱象",
      }
    ],

    userInfoImgGet: userImgGet,
    userInfomationText: name,
  },

  article1() {
    app.globalData.articleNumber = 1;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  article2() {
    app.globalData.articleNumber = 0;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  article3() {
    app.globalData.articleNumber = 3;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },



  login() {
    if (app.globalData.isGettedInfo == false) {
      wx.showToast({
        title: "进入 “我的” ↘ 进行登陆",
        icon: 'none',
        duration: 2000,
      })
    }
    if (app.globalData.isGettedInfo == true) {
      wx.navigateTo({
        url: '/pages/changeAvatar/changeAvatar',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.vibrateShort();
    
    var userImgGet = app.globalData.avatar;
    var name = app.globalData.name;
    this.setData({
      userInfoImgGet: userImgGet,
      userInfomationText: name,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})