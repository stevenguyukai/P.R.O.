// pages/changeAvatar/changeAvatar.js
var app = getApp();
var userAvatar = app.globalData.avatar;


Page({


  /**
   * 页面的初始数据 
   */

  data: {
    userAvatarUse: userAvatar,
    changeAvatarWithLogin: "hide",
    changeAvatarWithNoLogin: "show",
    boy: "show",
    girl: "hide",
    boyBtnStyle: "boyGenderSelectedBtn",
    girlBtnStyle: "girlGenderSelectBtn",
    boyIsSelected: "gold",
    girlIsSelected: "grey",
    boySelecteBtnStyle: "boySelecteBtn",
    boySelecteBtnDisable: true,
    girlSelecteBtnStyle: "girlSelecteBtn",
    girlSelecteBtnDisable: true,
    showORhind: "show",

    redORwhiteB1: "white",
    redORwhiteB2: "white",
    redORwhiteB3: "white",
    redORwhiteB4: "white",
    redORwhiteB5: "white",
    redORwhiteB6: "white",
    redORwhiteB7: "white",

    redORwhiteG1: "white",
    redORwhiteG2: "white",
    redORwhiteG3: "white",
    redORwhiteG4: "white",
    redORwhiteG5: "white",
    redORwhiteG6: "white",
    redORwhiteG7: "white",
    redORwhiteG8: "white",
    redORwhiteG10: "white",
    redORwhiteG11: "white",
    redORwhiteG12: "white",
    redORwhiteG13: "white",
    redORwhiteG14: "white",
  },

  handleScroll(event){
    if (event.detail.scrollTop!=0){
      this.setData({
        showORhind: "hide",
      })
    }
    if (event.detail.scrollTop == 0) {
      this.setData({
        showORhind: "show",
      })
    }
  },

  backToMine() {
    wx.vibrateShort();
    wx.navigateBack({
      url: '/mainPages/mine/mine', //进入"Mine"页面
    })
  },

  handleBoy() {
    this.setData({
      boy: "show",
      girl: "hide",
      boyBtnStyle: "boyGenderSelectedBtn",
      girlBtnStyle: "girlGenderSelectBtn",
      boyIsSelected: "gold",
      girlIsSelected: "grey",
    })
  },

  handleGirl() {
    this.setData({
      boy: "hide",
      girl: "show",
      boyBtnStyle: "boyGenderSelectBtn",
      girlBtnStyle: "girlGenderSelectedBtn",
      boyIsSelected: "grey",
      girlIsSelected: "gold",
    })
  },

  //头像选择完成
  btnPushed() {
    app.globalData.avatar = userAvatar;
    wx.navigateBack({
      url: '/pages/mine/mine',
    })
    wx.vibrateShort();
    wx.showToast({
      title: '成功设置头像',
      icon: 'success',
      duration: 1800,
    })
  },

  //头像选择
  b1() {
    wx.vibrateShort();
    this.setData({
      redORwhiteB1: "red",
      redORwhiteB2: "white",
      redORwhiteB3: "white",
      redORwhiteB4: "white",
      redORwhiteB5: "white",
      redORwhiteB6: "white",
      redORwhiteB7: "white",
      boySelecteBtnStyle: "boySelecteBtnCan",
      boySelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/boyAvatar/boy1.png",
    })
    userAvatar = "/assets/Avatar/boyAvatar/boy1.png";
  },
  b2() {
    wx.vibrateShort();
    this.setData({
      redORwhiteB1: "white",
      redORwhiteB2: "red",
      redORwhiteB3: "white",
      redORwhiteB4: "white",
      redORwhiteB5: "white",
      redORwhiteB6: "white",
      redORwhiteB7: "white",
      boySelecteBtnStyle: "boySelecteBtnCan",
      boySelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/boyAvatar/boy2.png",
    })
    userAvatar = "/assets/Avatar/boyAvatar/boy2.png";
  },
  b3() {
    wx.vibrateShort();
    this.setData({
      redORwhiteB1: "white",
      redORwhiteB2: "white",
      redORwhiteB3: "red",
      redORwhiteB4: "white",
      redORwhiteB5: "white",
      redORwhiteB6: "white",
      redORwhiteB7: "white",
      boySelecteBtnStyle: "boySelecteBtnCan",
      boySelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/boyAvatar/boy3.png",
    })
    userAvatar = "/assets/Avatar/boyAvatar/boy3.png";
  },
  b4() {
    wx.vibrateShort();
    this.setData({
      redORwhiteB1: "white",
      redORwhiteB2: "white",
      redORwhiteB3: "white",
      redORwhiteB4: "red",
      redORwhiteB5: "white",
      redORwhiteB6: "white",
      redORwhiteB7: "white",
      boySelecteBtnStyle: "boySelecteBtnCan",
      boySelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/boyAvatar/boy4.png",
    })
    userAvatar = "/assets/Avatar/boyAvatar/boy4.png";
  },
  b5() {
    wx.vibrateShort();
    this.setData({
      redORwhiteB1: "white",
      redORwhiteB2: "white",
      redORwhiteB3: "white",
      redORwhiteB4: "white",
      redORwhiteB5: "red",
      redORwhiteB6: "white",
      redORwhiteB7: "white",
      boySelecteBtnStyle: "boySelecteBtnCan",
      boySelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/boyAvatar/boy5.png",
    })
    userAvatar = "/assets/Avatar/boyAvatar/boy5.png";
  },
  b6() {
    wx.vibrateShort();
    this.setData({
      redORwhiteB1: "white",
      redORwhiteB2: "white",
      redORwhiteB3: "white",
      redORwhiteB4: "white",
      redORwhiteB5: "white",
      redORwhiteB6: "red",
      redORwhiteB7: "white",
      boySelecteBtnStyle: "boySelecteBtnCan",
      boySelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/boyAvatar/boy6.png",
    })
    userAvatar = "/assets/Avatar/boyAvatar/boy6.png";
  },
  b7() {
    wx.vibrateShort();
    this.setData({
      redORwhiteB1: "white",
      redORwhiteB2: "white",
      redORwhiteB3: "white",
      redORwhiteB4: "white",
      redORwhiteB5: "white",
      redORwhiteB6: "white",
      redORwhiteB7: "red",
      boySelecteBtnStyle: "boySelecteBtnCan",
      boySelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/boyAvatar/boy7.png",
    })
    userAvatar = "/assets/Avatar/boyAvatar/boy7.png";
  },

  g1() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "red",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl1.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl1.png";
  },
  g2() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "red",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl2.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl2.png";
  },
  g3() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "red",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl3.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl3.png";
  },
  g4() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "red",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl4.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl4.png";
  },
  g5() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "red",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl5.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl5.png";
  },
  g6() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "red",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl6.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl6.png";
  },
  g7() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "red",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl7.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl7.png";
  },
  g8() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "red",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl8.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl8.png";
  },
  g10() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "red",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl10.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl10.png";
  },
  g11() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "red",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl11.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl11.png";
  },
  g12() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "red",
      redORwhiteG13: "white",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl12.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl12.png";
  },
  g13() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "red",
      redORwhiteG14: "white",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl13.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl13.png";
  },
  g14() {
    wx.vibrateShort();
    this.setData({
      redORwhiteG1: "white",
      redORwhiteG2: "white",
      redORwhiteG3: "white",
      redORwhiteG4: "white",
      redORwhiteG5: "white",
      redORwhiteG6: "white",
      redORwhiteG7: "white",
      redORwhiteG8: "white",
      redORwhiteG10: "white",
      redORwhiteG11: "white",
      redORwhiteG12: "white",
      redORwhiteG13: "white",
      redORwhiteG14: "red",
      girlSelecteBtnStyle: "girlSelecteBtnCan",
      girlSelecteBtnDisable: false,
      userAvatarUse: "/assets/Avatar/girlAvatar/girl14.png",
    })
    userAvatar = "/assets/Avatar/girlAvatar/girl14.png";
  },

  backToNormalAvatar() {
    this.setData({
      userAvatarUse: app.globalData.userWXavatar,
    })
    app.globalData.avatar = app.globalData.userWXavatar;
    userAvatar = app.globalData.userWXavatar;
    wx.vibrateShort();
    wx.showToast({
      title: '成功返回头像',
      icon: 'success',
      duration: 1800,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    if (app.globalData.isGettedInfo == true) {
      userAvatar = app.globalData.avatar,
        this.setData({
          changeAvatarWithNoLogin: "hide",
          changeAvatarWithLogin: "show",
          userAvatarUse: app.globalData.avatar,
        })
    }
    if (app.globalData.isGettedInfo == false) {
      this.setData({
        changeAvatarWithNoLogin: "show",
        changeAvatarWithLogin: "hide",
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.popup = this.selectComponent('#popup')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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