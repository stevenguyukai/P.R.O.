var app = getApp();
var searchText = app.globalData.articleSearchText;
var cardTeamsGet = app.globalData.cardTeams;

Page({



  //事件处理函数
  bindViewTap1() {
    app.globalData.articleNumber = 1;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap2() {
    app.globalData.articleNumber = 2;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap3() {
    app.globalData.articleNumber = 3;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap4() {
    app.globalData.articleNumber = 4;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap5() {
    app.globalData.articleNumber = 5;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap6() {
    app.globalData.articleNumber = 6;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap7() {
    app.globalData.articleNumber = 7;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap8() {
    app.globalData.articleNumber = 8;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap9() {
    app.globalData.articleNumber = 9;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap10() {
    app.globalData.articleNumber = 10;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap11() {
    app.globalData.articleNumber = 11;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap12() {
    app.globalData.articleNumber = 12;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap13() {
    app.globalData.articleNumber = 13;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap14() {
    app.globalData.articleNumber = 14;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap15() {
    app.globalData.articleNumber = 15;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap16() {
    app.globalData.articleNumber = 16;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap17() {
    app.globalData.articleNumber = 17;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap18() {
    app.globalData.articleNumber = 18;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap19() {
    app.globalData.articleNumber = 19;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap20() {
    app.globalData.articleNumber = 20;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap21() {
    app.globalData.articleNumber = 21;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap22() {
    app.globalData.articleNumber = 22;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },

  data: {
    text: searchText,
    cardTeams: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var searchText = app.globalData.articleSearchText;
    this.setData({
      text: searchText,
    })
  
   //搜索引擎
    var cardTeamsGet = app.globalData.cardTeams;
    if (cardTeamsGet[0].name.indexOf(searchText)>=0){
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[0]),
      })
    }if (cardTeamsGet[1].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[1]),
      })
    }
    if (cardTeamsGet[2].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[2]),
      })
    }
    if (cardTeamsGet[3].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[3]),
      })
    }
    if (cardTeamsGet[4].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[4]),
      })
    }
    if (cardTeamsGet[5].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[5]),
      })
    }
    if (cardTeamsGet[6].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[6]),
      })
    }
    if (cardTeamsGet[7].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[7]),
      })
    }
    if (cardTeamsGet[8].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[8]),
      })
    }
    if (cardTeamsGet[9].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[9]),
      })
    }
    if (cardTeamsGet[10].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[10]),
      })
    }
    if (cardTeamsGet[11].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[11]),
      })
    }
    if (cardTeamsGet[12].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[12]),
      })
    }
    if (cardTeamsGet[13].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[13]),
      })
    }
    if (cardTeamsGet[14].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[14]),
      })
    }
    if (cardTeamsGet[15].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[15]),
      })
    }
    if (cardTeamsGet[16].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[16]),
      })
    }
    if (cardTeamsGet[17].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[17]),
      })
    }
    if (cardTeamsGet[18].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[18]),
      })
    }
    if (cardTeamsGet[19].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[19]),
      })
    }
    if (cardTeamsGet[20].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[20]),
      })
    }
    if (cardTeamsGet[21].name.indexOf(searchText) >= 0) {
      this.setData({
        cardTeams: this.data.cardTeams.concat(cardTeamsGet[21]),
      })
    }
    

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