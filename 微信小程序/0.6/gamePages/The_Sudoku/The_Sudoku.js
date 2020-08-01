var inObser = false;
var inFocus = false;
var inLogical = false;
var app  = getApp();
var darkMode = app.globalData.darkMode;

Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    tourArticleDisplay:"hide",
    sudokuPic: "",

    inObser: false,
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
 
  //分享小程序
  onShareAppMessage: function(){
    return{
      title: "我准备玩「数独挑战」一起吗!(´･ω･`)",
      path:  "/gamePages/The_Sudoku/The_Sudoku",
    }
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

    //本地保存数独图片信息
    wx.downloadFile({
      url: 'https://assets-ouch.icons8.com/thumb/866/7387d6d9-81eb-405c-854f-d73b00b8e789.png',
      success: function(res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath, 
            success(res) {
              wx.setStorageSync('sudokuEasy', res.savedFilePath)
            }
          })
        }
      },
    }),
    wx.downloadFile({
      url: 'https://assets-ouch.icons8.com/thumb/260/d6b985f4-a663-4d44-a4c9-655e04bb8e1b.png',
      success: function(res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath, 
            success(res) {
              wx.setStorageSync('sudokuMiddle', res.savedFilePath)
            }
          })
        }
      },
    }),
    wx.downloadFile({
      url: 'https://assets-ouch.icons8.com/thumb/883/692df9a7-d400-49c9-a00d-de972eae7197.png',
      success: function(res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath, 
            success(res) {
              wx.setStorageSync('sudokuHard', res.savedFilePath)
            }
          })
        }
      },
    }),
    wx.downloadFile({
      url: 'https://assets-ouch.icons8.com/thumb/58/3ee5a5ab-9990-4b50-a3b0-ff71ee4df456.png',
      success: function(res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath, 
            success(res) {
              wx.setStorageSync('sudokuEpic', res.savedFilePath)
            }
          })
        }
      },
    }),
    wx.downloadFile({
      url: 'https://assets-ouch.icons8.com/thumb/517/5cded9ca-7152-4d6e-b2ba-604701c6979b.png',
      success: function(res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath, 
            success(res) {
              wx.setStorageSync('sudokuDeveloper', res.savedFilePath)
            }
          })
        }
      },
    }),

    wx.navigateTo({
      url: '/games/sudoku/sudoku',
    })
    wx.vibrateShort();
  },

  goToTour(){
    wx.navigateTo({
      url: '/tourPage/sudokuTour/sudokuTour',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    //从缓存获取数独图片
    wx.getStorage({
      key: 'sudokuPic',
      success: function (res) {
        that.setData({
          sudokuPic: res.data,
        })
      },
      fail: function (res) {
        that.setData({
          sudokuPic: "https://assets-ouch.icons8.com/thumb/206/6a6f98e1-d851-4ec7-9ae5-802b89a114bb.png",
        })
      }
    })
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
    app.fetchInfo();
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