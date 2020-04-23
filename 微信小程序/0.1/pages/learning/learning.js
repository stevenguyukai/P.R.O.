var app = getApp();
var name = app.globalData.name;
var state = false;
var isSun;
var front = true;

//game1 variables 
var gameIconWhite;
var gameIconLeft = false;
var gameAreaIsOpen = false; 

//game2 variables 
var isOnFront = true;

//game3 variables
var isOnFrontRight = true;

//game4 variables
var gameIconWhite2; 
var gameIconLeft2 = false; 
var gameAreaIsOpen2 = false;

//game5 variables
var isOnFront2 = true;

//game6 variables
var isOnFrontRight2 = true;

//game7 variables
var gameIconWhite3;
var gameIconLeft3 = false;
var gameAreaIsOpen3 = false;

//game8 variables
var isOnFront3 = true;

//game9 variables
var isOnFrontRight3 = true;

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
    isOnFront: true,
    isOnFrontRight: true,
    isOnFront2: true,
    isOnFrontRight2: true,
    gameArrow2: "",
    isOnFront3: true,
    isOnFrontRight3: true,
    b1Btn: true,
    b2Btn: true,
    d1Btn: true,
    d2Btn: true,
    f1Btn: true,
    f2Btn: true,
  },

  //复制邮箱地址
  copyEmail() {
    wx.setClipboardData({
      data: "proclub@126.com",
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  //进入game1
  transferToGame1() {
    wx.navigateTo({
      url: '/gamePages/game1/game1',
    })
    wx.vibrateShort();
  },
  //进入game2
  transferToGame2() {
    wx.navigateTo({
      url: '/gamePages/game2/game2',
    })
    wx.vibrateShort();
  },
  //进入game3
  transferToGame3() {
    wx.navigateTo({
      url: '/gamePages/game3/game3',
    })
    wx.vibrateShort();
  },
  //进入game4
  transferToGame4() {
    wx.navigateTo({
      url: '/gamePages/game4/game4',
    })
    wx.vibrateShort();
  },
  //进入game5
  transferToGame5() {
    wx.navigateTo({
      url: '/gamePages/game5/game5',
    })
    wx.vibrateShort();
  },
  //进入game6
  transferToGame6() {
    wx.navigateTo({
      url: '/gamePages/game6/game6',
    })
    wx.vibrateShort();
  },
  //进入game7
  transferToGame7() {
    wx.navigateTo({
      url: '/gamePages/game7/game7',
    })
    wx.vibrateShort();
  },
  //进入game8
  transferToGame8() {
    wx.navigateTo({
      url: '/gamePages/game8/game8',
    })
    wx.vibrateShort();
  },
  //进入game9
  transferToGame9() {
    wx.navigateTo({
      url: '/gamePages/game9/game9',
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
    animationGameBaseMove.translateX(50).step();
    animationGameTopMove.translateX(-100).step();
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
      }else if (gameIconWhite == false) {
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

  // game2 翻转按钮
  learningCardFlip() {
    var that = this
    wx.vibrateShort();
    var animationLearningCardFlip = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipUndo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipBack = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipBackUndo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animationLearningCardFlip.opacity(0.1).step();
    animationLearningCardFlipBack.opacity(0).step();
    animationLearningCardFlipUndo.opacity(1).step();
    animationLearningCardFlipBackUndo.opacity(1).translateY(20).step();

    if (isOnFront == true) {
      isOnFront = false;
      this.setData({
        b1Btn: true,
      })
      this.setData({
        learningCardFlip: animationLearningCardFlip.export(),
        learningCardFlipBack: animationLearningCardFlipBackUndo.export(),
      })
      setTimeout(function() {
        that.setData({
          isOnFront: false,
        })
      }, 120)
    } else if (isOnFront == false) {
      isOnFront = true;
      this.setData({
        b1Btn: true,
      })
      this.setData({
        learningCardFlip: animationLearningCardFlipUndo.export(),
        learningCardFlipBack: animationLearningCardFlipBack.export(),
      })
      setTimeout(function() {
        that.setData({
          isOnFront: true,
        })
      }, 120)
    }
  },

  // game3 翻转按钮
  learningCardFlipRight() {
    var that = this
    wx.vibrateShort();
    var animationLearningCardFlipRight = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var learningCardFlipContent = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipRightUndo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var learningCardFlipContentUndo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animationLearningCardFlipRight.opacity(0.1).step();
    learningCardFlipContent.opacity(0).step();
    animationLearningCardFlipRightUndo.opacity(1).step();
    learningCardFlipContentUndo.opacity(1).translateY(20).step();
    if (isOnFrontRight == true) {
      isOnFrontRight = false;
      this.setData({
        b2Btn: true,
      })
      this.setData({
        learningCardFlipRight: animationLearningCardFlipRight.export(),
        learningCardFlipContent: learningCardFlipContentUndo.export(),
      })
      setTimeout(function() {
        that.setData({
          isOnFrontRight: false,
        })
      }, 120)
    } else if (isOnFrontRight == false) {
      isOnFrontRight = true;
      this.setData({
        b2Btn: true,
      })
      this.setData({
        learningCardFlipRight: animationLearningCardFlipRightUndo.export(),
        learningCardFlipContent: learningCardFlipContent.export(),
      })
      setTimeout(function() {
        that.setData({
          isOnFrontRight: true,
        })
      }, 120)
    }
  },

  // game4 缩放按钮
  learningCardExtend2() {
    wx.vibrateShort();
    var animationGameBaseMove2 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var animationGameTopMove2 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var animationGameBaseMoveBack2 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var animationGameTopMoveBack2 = wx.createAnimation({
      duration: 600,  
      timingFunction: 'ease',
    })
    animationGameBaseMove2.translateX(50).step();
    animationGameTopMove2.translateX(-100).step();
    animationGameBaseMoveBack2.translateX(0).step();
    animationGameTopMoveBack2.translateX(0).step();

    if (gameAreaIsOpen2 == false) {
      this.setData({
        animationGameTopMove2: animationGameTopMove2.export(),
        animationGameBaseMove2: animationGameBaseMove2.export(),
      });
      gameAreaIsOpen2 = true;

      if (gameIconWhite2 == true) {
        this.setData({
          gameArrow2: "/assets/learning/games/arrowLeftWhite.png",
        })
      }else if (gameIconWhite2 == false) {
        this.setData({
          gameArrow2: "/assets/learning/games/arrowLeftBlack.png",
        })
      }
      gameIconLeft2 = true;

    } else if (gameAreaIsOpen2 == true) {
      this.setData({
        animationGameBaseMove2: animationGameBaseMoveBack2.export(),
        animationGameTopMove2: animationGameTopMoveBack2.export(),
      })
      gameAreaIsOpen2 = false;

      if (gameIconWhite2 == true) {
        this.setData({
          gameArrow2: "/assets/learning/games/arrowRightWhite.png",
        })
      }
      if (gameIconWhite2 == false) {
        this.setData({
          gameArrow2: "/assets/learning/games/arrowRightBlack.png",
        })
      }
      gameIconLeft2 = false;
    }


  },

  // game5 翻转按钮
  learningCardFlip2() {
    var that = this
    wx.vibrateShort();
    var animationLearningCardFlip2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipBack2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlip2Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipBack2Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animationLearningCardFlip2.opacity(0.1).step();
    animationLearningCardFlipBack2.opacity(0).step();
    animationLearningCardFlip2Undo.opacity(1).step();
    animationLearningCardFlipBack2Undo.opacity(1).translateY(20).step();


    if (isOnFront2 == true) {
      isOnFront2 = false;
      this.setData({
        d1Btn: true,
      })
      this.setData({
        learningCardFlip2: animationLearningCardFlip2.export(),
        learningCardFlip2Content: animationLearningCardFlipBack2Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          isOnFront2: false,
        })
      }, 120)
    } else if (isOnFront2 == false) {
      isOnFront2 = true;
      this.setData({
        d1Btn: true,
      })
      this.setData({
        learningCardFlip2: animationLearningCardFlip2Undo.export(),
        learningCardFlip2Content: animationLearningCardFlipBack2.export(),
      })
      setTimeout(function () {
        that.setData({
          isOnFront2: true,
        })
      }, 120)
    }
  },

  // game6 翻转按钮
  learningCardFlipRight2() {
    var that = this
    wx.vibrateShort();
    var animationLearningCardFlipRight2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var learningCardFlipContent2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipRight2Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var learningCardFlipContent2Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animationLearningCardFlipRight2.opacity(0.1).step();
    learningCardFlipContent2.opacity(0).step();
    animationLearningCardFlipRight2Undo.opacity(1).step();
    learningCardFlipContent2Undo.opacity(1).translateY(20).step();


    if (isOnFrontRight2 == true) {
      isOnFrontRight2 = false;
      this.setData({
        d2Btn: true,
      })
      this.setData({
        learningCardFlipRight2: animationLearningCardFlipRight2.export(),
        learningCardFlipContent2: learningCardFlipContent2Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          isOnFrontRight2: false,
        })
      }, 120)
    } else if (isOnFrontRight2 == false) {
      isOnFrontRight2 = true;
      this.setData({
        d2Btn: true,
      })
      this.setData({
        learningCardFlipRight2: animationLearningCardFlipRight2Undo.export(),
        learningCardFlipContent2: learningCardFlipContent2.export(),
      })
      setTimeout(function () {
        that.setData({
          isOnFrontRight2: true,
        })
      }, 120)
    }
  },

  // game7 缩放按钮
  learningCardExtend3() {
    wx.vibrateShort();
    var animationGameBaseMove3 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var animationGameTopMove3 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    animationGameBaseMove3.translateX(70).step();
    animationGameTopMove3.translateX(-80).step();
    var animationGameBaseMoveBack3 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var animationGameTopMoveBack3 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    animationGameBaseMoveBack3.translateX(0).step();
    animationGameTopMoveBack3.translateX(0).step();

    if (gameAreaIsOpen3 == false) {
      this.setData({
        animationGameBaseMove3: animationGameBaseMove3.export(),
        animationGameTopMove3: animationGameTopMove3.export(),
      })
      gameAreaIsOpen3 = true;

      if (gameIconWhite3 == true) {
        this.setData({
          gameArrow3: "/assets/learning/games/arrowLeftWhite.png",
        })
      } else if (gameIconWhite3 == false) {
        this.setData({
          gameArrow3: "/assets/learning/games/arrowLeftBlack.png",
        })
      }
      gameIconLeft3 = true;

    } else if (gameAreaIsOpen3 == true) {
      this.setData({
        animationGameBaseMove3: animationGameBaseMoveBack3.export(),
        animationGameTopMove3: animationGameTopMoveBack3.export(),
      })
      gameAreaIsOpen3 = false;

      if (gameIconWhite3 == true) {
        this.setData({
          gameArrow3: "/assets/learning/games/arrowRightWhite.png",
        })
      }
      if (gameIconWhite3 == false) {
        this.setData({
          gameArrow3: "/assets/learning/games/arrowRightBlack.png",
        })
      }
      gameIconLeft3 = false;
    }


  },

  // game8 翻转按钮
  learningCardFlip3() {
    var that = this
    wx.vibrateShort();
    var animationLearningCardFlip3 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipBack3 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlip3Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipBack3Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animationLearningCardFlip3.opacity(0.1).step();
    animationLearningCardFlipBack3.opacity(0).step();
    animationLearningCardFlip3Undo.opacity(1).step();
    animationLearningCardFlipBack3Undo.opacity(1).translateY(20).step();
    if (isOnFront3 == true) {
      isOnFront3 = false;
      this.setData({
        f1Btn: true,
      })
      this.setData({
        learningCardFlip3: animationLearningCardFlip3.export(),
        learningCardFlip3Content: animationLearningCardFlipBack3Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          isOnFront3: false,
        })
      }, 120)
    } else if (isOnFront3 == false) {
      isOnFront3 = true;
      this.setData({
        f1Btn: true,
      })
      this.setData({
        learningCardFlip3: animationLearningCardFlip3Undo.export(),
        learningCardFlip3Content: animationLearningCardFlipBack3.export(),
      })
      setTimeout(function () {
        that.setData({
          isOnFront3: true,
        })
      }, 120)
    }
  },

  // game9 翻转按钮
  learningCardFlipRight3() {
    var that = this
    wx.vibrateShort();
    var animationLearningCardFlipRight3 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var learningCardFlipContent3 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationLearningCardFlipRight3Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var learningCardFlipContent3Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animationLearningCardFlipRight3.opacity(0.1).step();
    learningCardFlipContent3.opacity(0).step();
    animationLearningCardFlipRight3Undo.opacity(1).step();
    learningCardFlipContent3Undo.opacity(1).translateY(20).step();
    if (isOnFrontRight3 == true) {
      isOnFrontRight3 = false;
      this.setData({
        f2Btn: true,
      })
      this.setData({
        learningCardFlipRight3: animationLearningCardFlipRight3.export(),
        learningCardFlipContent3: learningCardFlipContent3Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          isOnFrontRight3: false,
        })
      }, 120)
    } else if (isOnFrontRight3 == false) {
      isOnFrontRight3 = true;
      this.setData({
        f2Btn: true,
      })
      this.setData({
        learningCardFlipRight3: animationLearningCardFlipRight3Undo.export(),
        learningCardFlipContent3: learningCardFlipContent3.export(),
      })
      setTimeout(function () {
        that.setData({
          isOnFrontRight3: true,
        })
      }, 120)
    }
  },


  //黑暗模式和普通模式的转变
  changeTimeState() {
    if (isSun == true) {
      wx.vibrateShort();
      var animationChangeBgToBlack = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      var animationChangeToPurple = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      var animationChangeCardToBlack = wx.createAnimation({
        duration: 500,
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
        gameArrow2: "/assets/learning/games/arrowRightWhite.png",
        gameArrow3: "/assets/learning/games/arrowRightWhite.png",
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
      if (gameIconLeft2 == true) {
        this.setData({
          gameArrow2: "/assets/learning/games/arrowLeftWhite.png",
        })
      } else if (gameIconLeft2 == false) {
        this.setData({
          gameArrow2: "/assets/learning/games/arrowRightWhite.png",
        })
      } 
      if (gameIconLeft3 == true) {
        this.setData({
          gameArrow3: "/assets/learning/games/arrowLeftWhite.png",
        })
      } else if (gameIconLeft3 == false) {
        this.setData({
          gameArrow3: "/assets/learning/games/arrowRightWhite.png",
        })
      }
      gameIconWhite = true;
      gameIconWhite2 = true;
      gameIconWhite3 = true;
      isSun = false;
      //---------------------------------------//
    } else if (isSun == false) {
      wx.vibrateShort();
      var animationChangeBgToWhite = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      var animationChangeToGold = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      var animationChangeCardToWhite = wx.createAnimation({
        duration: 500,
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
      if (gameIconLeft2== true) {
        this.setData({
          gameArrow2: "/assets/learning/games/arrowLeftBlack.png",
        })
      } else if (gameIconLeft2 == false) {
        this.setData({
          gameArrow2: "/assets/learning/games/arrowRightBlack.png",
        })
      }
      if (gameIconLeft3 == true) {
        this.setData({
          gameArrow3: "/assets/learning/games/arrowLeftBlack.png",
        })
      } else if (gameIconLeft3 == false) {
        this.setData({
          gameArrow3: "/assets/learning/games/arrowRightBlack.png",
        })
      }
      gameIconWhite = false;
      gameIconWhite2 = false;
      gameIconWhite3 = false;
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
      duration: 800,
      timingFunction: 'ease',
    });
    var animationClose = wx.createAnimation({
      duration: 800,
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
        gameArrow2: "/assets/learning/games/arrowRightBlack.png",
        gameArrow3: "/assets/learning/games/arrowRightBlack.png",
        blackORwhiteTitle: "2d2c2d",
      })
      gameIconWhite = false;
      gameIconWhite2 = false;
      gameIconWhite3 = false;
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
        gameArrow2: "/assets/learning/games/arrowRightWhite.png",
        gameArrow3: "/assets/learning/games/arrowRightWhite.png",
        blackORwhiteTitle: "white",
      })
      gameIconWhite = true;
      gameIconWhite2 = true;
      gameIconWhite3 = true;
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