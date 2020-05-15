var inObser = false;
var inFocus = false;
var inreact = false;
var app  = getApp();
var darkMode = app.globalData.darkMode;

Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    inObser: false,
    inFocus: false,
    inreact: false,

    picDownName: "picDownName",
    about: "about",
    btnToGame: "btnToGame",
    purposeView:  "purposeView",
    purposeViewText: "purposeViewText",
    aimIconBg:  "aimIconBg",
    bgColor:  "bgColor",
    aboutText:  "aboutText",
    gameNameColor: "132575",
    aimIconText1: "aimIconText1",
    aimIconText2: "aimIconText2",
    aimIconText3: "aimIconText3",
  }, 


  observationDetail() {
    wx.vibrateShort();
    if(inObser==false){
      inObser = true;
      this.setData({
        inObser: true,
      })
    }else if (inObser == true) {
      inObser = false;
      this.setData({
        inObser: false,
      })
    }
  },
  focusDetail() {
    wx.vibrateShort();
    if (inFocus==false) {
      inFocus = true;
      this.setData({
        inFocus: true,
      })
    } else if (inFocus == true) {
      inFocus = false;
      this.setData({
        inFocus: false,
      })
    }
  },
  reactDetail() {
    wx.vibrateShort();
    if (inreact == false) {
      inreact = true; 
      this.setData({
        inreact: true,
      })
    } else if (inreact == true) {
      inreact = false;
      this.setData({
        inreact: false,
      })
    }
  },

  btnIntoGame(){
    wx.showToast({
      title: '该功能未上线！',
      icon: 'none',
      duration: 1500
  })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var darkMode = app.globalData.darkMode;
    //暗黑模式和正常模式的转变
    if(darkMode){
      this.setData({
        picDownName: "picDownNameDark",
        about: "aboutDark",
        btnToGame: "btnToGameDark",
        purposeView:  "purposeViewDark",
        purposeViewText: "purposeViewTextDark",
        aimIconBg: "aimIconBgDark",
        bgColor: "bgColorDark",
        aboutText: "aboutTextDark",
        gameNameColor: "ecf0f3",
        aimIconText1: "aimIconText1Dark",
        aimIconText2: "aimIconText2Dark",
        aimIconText3: "aimIconText3Dark",
      })
      wx.setNavigationBarColor({
        frontColor:'#ffffff',
        backgroundColor:'#5e6473'  
  }) 
    }else{
      this.setData({
        picDownName: "picDownName",
        about: "about", 
        btnToGame: "btnToGame",
        purposeView:  "purposeView",
        purposeViewText: "purposeViewText",
        aimIconBg: "aimIconBg", 
        bgColor: "bgColor",
        aboutText: "aboutText",
        gameNameColor: "132575",
        aimIconText1: "aimIconText1",
        aimIconText2: "aimIconText2",
        aimIconText3: "aimIconText3",
      })
      wx.setNavigationBarColor({
        frontColor:'#000000',
        backgroundColor:'#ecf0f3'
  })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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