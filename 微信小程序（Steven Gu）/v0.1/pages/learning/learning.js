var app = getApp();
var name = app.globalData.name;
var state = false;
var isSun;
var front = true;

//game1 variables
var gameIconWhite;
var gameIconLeft = false;
var gameAreaIsOpen = false;

Page({

  data: {
    userName: "",
    sunORmoon: "",
    dayORnight: "",
    openORretract: "/assets/learning/open.png",
    bgColor: "",
    learningCard: "",
    blackORwhite: "",
    gameOneRemember: "",
    subLearningCard: "subLearningCardBlack",
    frontView: "block",
    backView: "none",
    gameArrow: "",
    blackORwhiteTitle: "",
  },

  //进入game1
  transferToGame1() {
    wx.navigateTo({
      url: '/gamePages/game1',
    })
    wx.vibrateShort();
  },

  // game1 缩放按钮
  learningCardExtend() {
    wx.vibrateShort();
    var animationGameBaseMove = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var animationGameTopMove = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    animationGameBaseMove.translateX(70).step();
    animationGameTopMove.translateX(-80).step();
    var animationGameBaseMoveBack = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var animationGameTopMoveBack = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    animationGameBaseMoveBack.translateX(0).step();
    animationGameTopMoveBack.translateX(0).step();

    if (gameAreaIsOpen == false) {
      this.setData({
        animationGameBaseMove: animationGameBaseMove.export(),
        animationGameTopMove: animationGameTopMove.export(),
      })
      gameAreaIsOpen = true;

      if (gameIconWhite == true) {
        this.setData({
          gameArrow: "/assets/learning/games/arrowLeftWhite.png",
        })
      }
      if (gameIconWhite == false) {
        this.setData({
          gameArrow: "/assets/learning/games/arrowLeftBlack.png",
        })
      }
      gameIconLeft = true;

    } else if (gameAreaIsOpen == true) {
      this.setData({
        animationGameBaseMove: animationGameBaseMoveBack.export(),
        animationGameTopMove: animationGameTopMoveBack.export(),
      })
      gameAreaIsOpen = false;

      if (gameIconWhite == true) {
        this.setData({
          gameArrow: "/assets/learning/games/arrowRightWhite.png",
        })
      }
      if (gameIconWhite == false) {
        this.setData({
          gameArrow: "/assets/learning/games/arrowRightBlack.png",
        })
      }
      gameIconLeft = false;
    }


  },

  //黑暗模式和普通模式的转变
  changeTimeState() {
    if (isSun == true) {
      wx.vibrateShort();
      var animationChangeBgToBlack = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      var animationChangeToPurple = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      var animationChangeCardToBlack = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      animationChangeBgToBlack.backgroundColor("#2d2c2d").step();
      animationChangeToPurple.backgroundColor("purple").step();
      animationChangeCardToBlack.backgroundColor("#585958").step();
      this.setData({
        sunORmoon: "/assets/learning/moon.png",
        dayORnight: "topViewNight",
        bgColor: "bgColorBlack",
        gameOneRemember: "/assets/learning/games/rememberWhite.png",
        gameArrow: "/assets/learning/games/arrowRightWhite.png",
        blackORwhiteTitle: "white",
        changeBgColor: animationChangeBgToBlack.export(),
        changeColor: animationChangeToPurple.export(),
        cardBgColor: animationChangeCardToBlack.export(),
      })
      if (gameIconLeft == true) {
        this.setData({
          gameArrow: "/assets/learning/games/arrowLeftWhite.png",
        })
      } else if (gameIconLeft == false) {
        this.setData({
          gameArrow: "/assets/learning/games/arrowRightWhite.png",
        })
      }
      gameIconWhite = true;
      isSun = false;
      //---------------------------------------//
    } else if (isSun == false) {
      wx.vibrateShort();
      var animationChangeBgToWhite = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      var animationChangeToGold = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      var animationChangeCardToWhite = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      animationChangeBgToWhite.backgroundColor("white").step();
      animationChangeToGold.backgroundColor("gold").step();
      animationChangeCardToWhite.backgroundColor("#eeeeee").step();
      this.setData({
        sunORmoon: "/assets/learning/sun.png",
        dayORnight: "topViewDay",
        bgColor: "bgColorWhite",
        gameOneRemember: "/assets/learning/games/rememberBlack.png",
        blackORwhiteTitle: "2d2c2d",
        changeBgColor: animationChangeBgToWhite.export(),
        changeColor: animationChangeToGold.export(),
        cardBgColor: animationChangeCardToWhite.export(),
      })
      if (gameIconLeft == true) {
        this.setData({
          gameArrow: "/assets/learning/games/arrowLeftBlack.png",
        })
      } else if (gameIconLeft == false) {
        this.setData({
          gameArrow: "/assets/learning/games/arrowRightBlack.png",
        })
      }
      gameIconWhite = false;
      isSun = true;
    }
  },

  //点击用户名字，如果没有登陆，将会提示
  warningLogin() {
    if (app.globalData.isGettedInfo == false) {
      wx.showToast({
        title: '请到 “我的” 页面登陆 ↘',
        icon: 'none',
      })
    }
  },


  //下拉栏动画
  openView() {
    wx.vibrateShort();
    var animationOpen = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    var animationClose = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    if (state == false) {
      animationOpen.translateY(330).step()
      this.setData({
        openORretract: "/assets/learning/retract.png",
        openLargeView: animationOpen.export()
      })
      state = true;
    } else if (state == true) {
      animationClose.translateY(0).step()
      this.setData({
        openORretract: "/assets/learning/open.png",
        openLargeView: animationClose.export()
      })
      state = false;
    };
  },

  //页面加载时的代码
  onLoad: function(options) {
    var time = new Date();
    var hour = time.getHours();
    if (hour >= 6 && hour < 18) {
      this.setData({
        sunORmoon: "/assets/learning/sun.png",
        dayORnight: "topViewDay",
        bgColor: "bgColorWhite",
        learningCard: "learningCardWhite",
        blackORwhite: "white",
        gameOneRemember: "/assets/learning/games/rememberBlack.png",
        gameArrow: "/assets/learning/games/arrowRightBlack.png",
        blackORwhiteTitle: "2d2c2d",
      })
      gameIconWhite = false;
      isSun = true;
    }
    if ((hour >= 18 && hour <= 24) || (hour >= 0 && hour < 6)) {
      this.setData({
        sunORmoon: "/assets/learning/moon.png",
        dayORnight: "topViewNight",
        bgColor: "bgColorBlack",
        learningCard: "learningCardBlack",
        blackORwhite: "#2d2c2d",
        gameOneRemember: "/assets/learning/games/rememberWhite.png",
        gameArrow: "/assets/learning/games/arrowRightWhite.png",
        blackORwhiteTitle: "white",
      })
      gameIconWhite = true;
      isSun = false;
    }
  },

  //页面初次渲染完成
  onReady: function() {

  },

  //页面显示
  onShow: function() {
    wx.vibrateShort();

    var name = app.globalData.name;
    this.setData({
      userName: name,
    })
  },

  //页面隐藏
  onHide: function() {

  },

  //页面卸载
  onUnload: function() {

  },

  //用户下拉动作
  onPullDownRefresh: function() {

  },

  //页面上拉触底事件的处理函数
  onReachBottom: function() {

  },

  //用户点击右上角分享
  onShareAppMessage: function() {

  }
})