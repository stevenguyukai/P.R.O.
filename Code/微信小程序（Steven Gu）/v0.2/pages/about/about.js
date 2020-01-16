var app = getApp();
var userImgGet = app.globalData.avatar;
var name = app.globalData.name;

Page({

  data: {
    background: [{ 
        "viewid": "1", 
        "imgsrc":
"https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6gcDCyftlR5BYlU1ibicQBXIZr2Ipe5ibKw7b9gK3wKdtNTWXeG20hpElNnpMLty1anUib6sKDZy9ntA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
      "name": "初识-区块链-“加密算法”",
      },
      {
        "viewid": "2",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN5gbv9SW0P105aTU96Q21se86daTa7hTVsniapav3bJPC6shRbkrvxJp2SYA0BcCDSODSJRvKnwXyw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "name": "初识-区块链-“去中心化”",
      },
      {
        "viewid": "3",
        "imgsrc": "http://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN4HACic31RpbFCDc4tqOvXUSzt61ADJzSfZEBS6qvicFUOCT72luAw3eib02siaUOWsr1w7z85b6YribBg/0?wx_fmt=jpeg",
        "name": "《爱5》中的“空间折叠机”",
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
    app.globalData.articleNumber = 30;
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