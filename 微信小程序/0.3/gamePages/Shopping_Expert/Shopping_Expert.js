var inMemory = false;
var inFocus = false;
var inLogical = false;
var app  = getApp();
var darkMode = app.globalData.darkMode;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inMemory: false,
    inFocus: false,
    inLogical: false,

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



  memoryDetail() {
    wx.vibrateShort();
    if(inMemory==false){
      inMemory = true;
      this.setData({
        inMemory: true,
      })
    }else if (inMemory == true) {
      inMemory = false;
      this.setData({
        inMemory: false,
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
  logicalDetail() {
    wx.vibrateShort();
    if (inLogical == false) {
      inLogical = true; 
      this.setData({
        inLogical: true,
      })
    } else if (inLogical == true) {
      inLogical = false;
      this.setData({
        inLogical: false,
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