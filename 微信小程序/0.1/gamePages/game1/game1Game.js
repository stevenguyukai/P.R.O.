var leftIsleft = false;
var rightIsright = false;
var enermy1X = -300;
var enermy2X = -300;
 
Page({


  data: {
    enermy1X: -300,
    enermy2X: -300,
  },


  tapLeft() {
    wx.vibrateShort();
    var animationLeftFlip = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    })
    var animationLeftFlipBack = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    })
    animationLeftFlip.rotate3d(0, 1, 0, 180).translateX(115).step();
    animationLeftFlipBack.rotate3d(0, 1, 0, 0).translateX(0).step();
    if(leftIsleft==false){
      this.setData({
        flipLeft: animationLeftFlip.export(),
      })
      leftIsleft = true;
    } else if (leftIsleft == true){
      this.setData({
        flipLeft: animationLeftFlipBack.export(),
      })
      leftIsleft = false;
    }
  },

  tapRight(){
    wx.vibrateShort();
    var animationRightFlip = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    })
    var animationRightFlipBack = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    })
    animationRightFlip.rotate3d(0, 1, 0, 180).translateX(-115).step();
    animationRightFlipBack.rotate3d(0, 1, 0, 0).translateX(0).step();
    if (rightIsright == false) {
      this.setData({
        flipRight: animationRightFlip.export(),
      })
      rightIsright = true;
    } else if (rightIsright == true) {
      this.setData({
        flipRight: animationRightFlipBack.export(),
      })
      rightIsright = false;
    }
  },


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
    var that = this;
     var timer = setInterval(function callback(){
      enermy1X = enermy1X++;
      that.setData({
        enermy1X: enermy1X++,
      })
      if (enermy1X>=1300){
        clearTimeout(timer)
      } 
    },1)
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