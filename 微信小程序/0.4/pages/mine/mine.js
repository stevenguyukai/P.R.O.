// pages/mine/mine.js

var app = getApp();
var userAvatarGet = app.globalData.avatar;
var name = app.globalData.name;

Page({

  /**
   * 页面的初始数据 
   */

  data: {
    overAll: "overAll",
    userInfo: "userInfo",
    backgroundImage: "backgroundImage",
    avatar: "avatar",
    userInfomation: "userInfomation",

    userAvatar: userAvatarGet, //用户头像路径
    userInfomationText: name, //头像旁显示的文字
    mineInfoBtnPush: "show", //登陆前按钮显示
    btnPushed: "hide", //登陆前选择框隐藏
  },

  //分享小程序
  onShareAppMessage: function () {
    return {
      title: "我正在锻炼大脑，一起！(´･ω･`)",
      path: "/pages/learning/learning",
    }
  },

  changeAvatar() { //进入换头像页面
    wx.navigateTo({
      url: '/pages/changeAvatar/changeAvatar', //进入换头像页面
    })
  },

  getUserInfo(event) { //获取用户信息
    wx.vibrateShort();
 
    //本地保存用户信息
    wx.setStorageSync('nickName', event.detail.userInfo.nickName)
    wx.setStorageSync('avatarUrl', event.detail.userInfo.avatarUrl)

    this.setData({
      userInfomationText: event.detail.userInfo.nickName, //用户微信名字
      userAvatar: event.detail.userInfo.avatarUrl, //用户微信头像
      mineInfoBtnPush: "hide", //登陆之后按钮隐藏 
      btnPushed: "show", //登陆之后选择框显示
    })
    app.globalData.userWXavatar = event.detail.userInfo.avatarUrl;
    app.globalData.avatar = event.detail.userInfo.avatarUrl; //把公共头像连接换成微信头像
    app.globalData.name = event.detail.userInfo.nickName; //把公共名字连接换成微信名字
    app.globalData.isGettedInfo = true; //看看有没有获取了用户信息
    wx.hideToast();
    wx.showToast({
      title: '成功载入',
      icon: 'success',
      duration: 200
    });
    this.onShow();

  },

  showLoading: function () { //获取用户信息时的等待
    wx.showToast({
      title: '正在努力连接',
      icon: 'loading',
      duration: 10000
    });
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.app = getApp()


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.vibrateShort();

    //尝试在本地缓存中获取用户信息
    wx.getStorage({
      key: 'nickName',
      success: function (res) {
        that.setData({
          userInfomationText: res.data,
          mineInfoBtnPush: "hide",
        })
        app.globalData.isGettedInfo = true;
        app.globalData.name = res.data; //把公共名字连接换成微信名字
      },
      fail: function (res) {
        that.setData({
          userInfomationText: "请登录",
          mineInfoBtnPush: "show",
        })
        app.globalData.isGettedInfo = false;
      }
    })


    if (app.globalData.darkMode) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#3d4050',
        animation: {
          duration: 600,
          timingFunc: 'ease'
        }
      })
      this.setData({
        overAll: "overAllDark",
        userInfo: "userInfoDark",
        backgroundImage: "backgroundImageDark",
        avatar: "avatarDark",
        userInfomation: "userInfomationDark",
      })
      wx.setTabBarStyle({
        backgroundColor: '#3d4050',
        color: '#ffffff',
        selectedColor: "#ffffff",
        animation: {
          duration: 600,
          timingFunc: 'ease'
        }
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ecf0f3',
        animation: {
          duration: 600,
          timingFunc: 'ease'
        }
      })
      this.setData({
        overAll: "overAll",
        userInfo: "userInfo",
        backgroundImage: "backgroundImage",
        avatar: "avatar",
        userInfomation: "userInfomation",
      })
      wx.setTabBarStyle({
        backgroundColor: '#ecf0f3',
        color: '#000000',
        selectedColor: "#447ece",
        animation: {
          duration: 600,
          timingFunc: 'ease'
        }
      })
    }

    this.setData({
      userAvatar: app.globalData.avatar,
    })

    this.app.slideupshow(this, 'slide_up3', 0, 1)

    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up3', 0, 1)
    }.bind(this), 200);
    //“我的”页面中显示组件动画

    this.app.slideupshow(this, 'slide_up1', -7, 1)

    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up2', -7, 1)
    }.bind(this), 200);

    this.app.slideupshow(this, 'slide_up4', 0, 1)

    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up4', 0, 1)
    }.bind(this), 200);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

    this.app.slideupshow(this, 'slide_up4', 157, 0)
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up4', 157, 0)
    }.bind(this), 200);

    this.app.slideupshow(this, 'slide_up3', -157, 0)
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up3', -157, 0)
    }.bind(this), 200);
    //“我的”页面中隐藏组件动画
    this.app.slideupshow(this, 'slide_up1', 150, 0)
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up2', 150, 0)
    }.bind(this), 200);

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})