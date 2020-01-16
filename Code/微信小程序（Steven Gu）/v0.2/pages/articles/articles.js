// pages/articles.js
var app = getApp();

Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    articleLink: " ", 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.articleNumber == 30) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/wcNpeJtjwQ51Q2n7QloBYA",
      });
    }
    if (app.globalData.articleNumber == 23) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/LzBz3AvFSfiDzKhmEQIttg",
      });
    }
    if (app.globalData.articleNumber == 0) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/Rj3mwFRiOAzpRHO5Gi09iQ",
      });
    }
    if (app.globalData.articleNumber == 1) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/pE5EbwcIie5a47eIXiKktA",
      });
    }
    if (app.globalData.articleNumber == 2) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/NuWlS6BPUrYNN4o5CJH09A",
      });
    }
    if (app.globalData.articleNumber == 3) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/7j3ywjHvS8bKnwRVa0Sr8g",
      });
    }
    if (app.globalData.articleNumber == 4) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/Dsw-RT29IBnWlzQ2oazTCQ",
      });
    }
    if (app.globalData.articleNumber == 5) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/gxds1GcaTxTzxYCKJ7ehsQ",
      });
    }
    if (app.globalData.articleNumber == 6) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/nec8tXbSPcPk6hWUef7_LQ",
      });
    }
    if (app.globalData.articleNumber == 7) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/ZytxiW2fRzDd2PCtK9sbiQ",
      });
    }
    if (app.globalData.articleNumber == 25) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/tv8T_wKkpdUa3mPFaK9jfw",
      });
    }
    if (app.globalData.articleNumber == 8) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/qdhha2wreOPjUX45inHcUQ",
      });
    }
    if (app.globalData.articleNumber == 9) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/XciRghgHU04m1HciuUdWNA",
      });
    }
    if (app.globalData.articleNumber == 10) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/yEXEiR0zQ_43vU7EldsGPQ",
      });
    }
    if (app.globalData.articleNumber == 26) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/VXkND0yY4eOWUj9Z2at-AQ",
      });
    }
    if (app.globalData.articleNumber == 11) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/J2mDjZsbluLemLT8CKHPpQ",
      });
    }
    if(app.globalData.articleNumber == 12) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/ccy5HxkkXSHTs3lOdfL26w",
      });
    }
    if (app.globalData.articleNumber == 13) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/REtidQMAxByoJ5Vk8zg2lQ",
      });
    }
    if (app.globalData.articleNumber == 14) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/HYEHOnyw1iL16Eo1PD9TAw",
      });
    }
    if (app.globalData.articleNumber == 15) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/nNbMAIh0OkcCUnhr7u7x0w",
      });
    }
    if (app.globalData.articleNumber == 16) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/tv0Ss7i7kZsPt3fG1bLOsw",
      });
    }
    if (app.globalData.articleNumber == 17) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/WY41FOA0kDFdDmtsPwW6rg",
      });
    }
    if (app.globalData.articleNumber == 18) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/EeEl5MwpC2bUb2ZI_yyEQw",
      });
    }
    if (app.globalData.articleNumber == 19) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/ptfW589REP8kkmqpHLDzGg",
      });
    }
    if (app.globalData.articleNumber == 20) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/zg78LhSLmTvhuRh2jtwTiw",
      });
    }
    if (app.globalData.articleNumber == 21) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/CKfuO6Z8Pk-y5AnfQsgatQ",
      });
    }
    if (app.globalData.articleNumber == 22) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/6lLAq32URozHj_ZZ9pSRUQ",
      });
    }
    if (app.globalData.articleNumber == 24) {
      this.setData({
        articleLink: "https://mp.weixin.qq.com/s/QMCDQ2_v_8bKWgDLOve_8g",
      });
    }
    

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