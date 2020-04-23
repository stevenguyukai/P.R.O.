var inObser = false;
var inMul = false;
var inReact = false;

Page({

  
  data: {
    inObser: false,
    inMul: false,
    inReact: false,
  },

  btnIntoGame(){
    wx.navigateTo({
      url: '/gamePages/game1/game1Game',
    })
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
  multitaskDetail() {
    wx.vibrateShort();
    if (inMul == false) {
      inMul = true;
      this.setData({
        inMul: true,
      })
    } else if (inMul == true) {
      inMul = false;
      this.setData({
        inMul: false,
      })
    }
  },
  reactDetail() {
    wx.vibrateShort();
    if (inReact == false) {
      inReact = true;
      this.setData({
        inReact: true,
      })
    } else if (inReact == true) {
      inReact = false;
      this.setData({
        inReact: false,
      })
    }
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