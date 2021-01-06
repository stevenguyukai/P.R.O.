var inObser = false;
var inFocus = false;
var inMemory = false;
var app = getApp();
var darkMode = app.globalData.darkMode;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brainMemoryPic: "",

    inObser: false,
    inFocus: false,
    inMemory: false,

    picDownName: "picDownName",
    about: "about",
    btnToGame: "btnToGame",
    purposeView: "purposeView",
    purposeViewText: "purposeViewText",
    aimIconBg: "aimIconBg",
    bgColor: "bgColor",
    aboutText: "aboutText",
    gameNameColor: "132575",
    aimIconText1: "aimIconText1",
    aimIconText2: "aimIconText2",
    aimIconText3: "aimIconText3",
  },



  observationDetail() {
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    };
    if (inObser == false) {
      inObser = true;
      this.setData({
        inObser: true,
      })
    } else if (inObser == true) {
      inObser = false;
      this.setData({
        inObser: false,
      })
    }
  },
  focusDetail() {
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    };
    if (inFocus == false) {
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
  memoryDetail() {
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    };
    if (inMemory == false) {
      inMemory = true;
      this.setData({
        inMemory: true,
      })
    } else if (inMemory == true) {
      inMemory = false;
      this.setData({
        inMemory: false,
      })
    }
  },

  btnIntoGame() {
    wx.navigateTo({
      url: '/games/brain_Memory/brain_Memory',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },

  goToTour() {
    wx.navigateTo({
      url: '/tourPage/brainMemoryTour/brainMemoryTour',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //从缓存获取数独图片
    wx.getStorage({
      key: 'brainMemoryPic',
      success: function (res) {
        that.setData({
          brainMemoryPic: res.data,
        })
      },
      fail: function (res) {
        that.setData({
          brainMemoryPic: "https://assets-ouch.icons8.com/thumb/577/40f927ba-0e31-41a1-affb-2f8a8672b4d0.png",
        })
      }
    })

    var darkMode = app.globalData.darkMode;
    //暗黑模式和正常模式的转变
    if (darkMode) {
      this.setData({
        picDownName: "picDownNameDark",
        about: "aboutDark",
        btnToGame: "btnToGameDark",
        purposeView: "purposeViewDark",
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
        frontColor: '#ffffff',
        backgroundColor: '#5e6473'
      })
      wx.setBackgroundColor({
        backgroundColor: '#5e6473',
      })
    } else {
      this.setData({
        picDownName: "picDownName",
        about: "about",
        btnToGame: "btnToGame",
        purposeView: "purposeView",
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
        frontColor: '#000000',
        backgroundColor: '#ecf0f3'
      })
      wx.setBackgroundColor({
        backgroundColor: '#ecf0f3',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    //本地保存数独图片信息
    wx.downloadFile({
        url: 'https://assets-ouch.icons8.com/thumb/866/7387d6d9-81eb-405c-854f-d73b00b8e789.png',
        success: function (res) {
          if (res.statusCode === 200) {
            const fs = wx.getFileSystemManager()
            fs.saveFile({
              tempFilePath: res.tempFilePath,
              success(res) {
                wx.setStorageSync('easyPic', res.savedFilePath)
              }
            })
          }
        },
      }),
      wx.downloadFile({
        url: 'https://assets-ouch.icons8.com/thumb/260/d6b985f4-a663-4d44-a4c9-655e04bb8e1b.png',
        success: function (res) {
          if (res.statusCode === 200) {
            const fs = wx.getFileSystemManager()
            fs.saveFile({
              tempFilePath: res.tempFilePath,
              success(res) {
                wx.setStorageSync('middlePic', res.savedFilePath)
              }
            })
          }
        },
      }),
      wx.downloadFile({
        url: 'https://assets-ouch.icons8.com/thumb/883/692df9a7-d400-49c9-a00d-de972eae7197.png',
        success: function (res) {
          if (res.statusCode === 200) {
            const fs = wx.getFileSystemManager()
            fs.saveFile({
              tempFilePath: res.tempFilePath,
              success(res) {
                wx.setStorageSync('hardPic', res.savedFilePath)
              }
            })
          }
        },
      }),
      wx.downloadFile({
        url: 'https://assets-ouch.icons8.com/thumb/58/3ee5a5ab-9990-4b50-a3b0-ff71ee4df456.png',
        success: function (res) {
          if (res.statusCode === 200) {
            const fs = wx.getFileSystemManager()
            fs.saveFile({
              tempFilePath: res.tempFilePath,
              success(res) {
                wx.setStorageSync('epicPic', res.savedFilePath)
              }
            })
          }
        },
      }),
      wx.downloadFile({
        url: 'https://assets-ouch.icons8.com/thumb/517/5cded9ca-7152-4d6e-b2ba-604701c6979b.png',
        success: function (res) {
          if (res.statusCode === 200) {
            const fs = wx.getFileSystemManager()
            fs.saveFile({
              tempFilePath: res.tempFilePath,
              success(res) {
                wx.setStorageSync('developer', res.savedFilePath)
              }
            })
          }
        },
      })

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