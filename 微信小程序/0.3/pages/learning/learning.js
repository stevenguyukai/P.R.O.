var app = getApp();
var name = app.globalData.name;
var state = false;
var isSun;
var front = true;

//深海救援 Deep Water Save
var Deep_Water_Save_Front = true;

//五彩缤纷 Pick Up The Color
var Pick_Up_The_Color_Front = true;

//打破气球 Hit Balloon
var Hit_Balloon_Front = true;

//大脑内存 Brain Memory 
var Brain_Memory_Front = true;

//购物达人 Shopping Expert
var Shopping_Expert_Front = true;

//需要验证  Need Verify
var Need_Verify_Front = true;

//左右互搏 Struggle Fight
var Struggle_Fight_Front = true;

//平衡之道 The Key To Balance
var The_Key_To_Balance_Front = true;

//数独 The Sudoku
var The_Sudoku_Front = true;

//数独 Bouncing Ball
var Bouncing_Ball_Front = true;

Page({

  //分享小程序
  onShareAppMessage: function(){
    return{
      title: "我正在锻炼大脑，一起！(´･ω･`)",
      path:  "/pages/learning/learning",
    }
  },

  data: {

    //设置黑暗模式或者白天模式
    sunORmoon: "",
    dayORnight: "",
    blackORwhite: "",
    blackORwhiteTitle: "",
    bgColor: "",

    //上层下拉栏
    userName: "",
    openORretract: "/assets/learning/open.png",

    //游戏的排列顺序
    The_Sudoku: "top:300rpx;left:6%",                 //第一个
    Bouncing_Ball: "top:300rpx;left:58%",             //第二个
    Deep_Water_Save: "top:700rpx;left:6%",            //第三个
    Brain_Memory: "top:700rpx;left:58%",              //第四个
    Shopping_Expert: "top: 1100rpx;left:6%",          //第五个
    Need_Verify: "top:1100rpx;left:58%",              //第六个
    Struggle_Fight: "top:1500rpx;left:6%",            //第七个
    The_Key_To_Balance: "top:1500rpx;left:58%",       //第八个
    Pick_Up_The_Color:  "top:1900rpx;left:6%",        //第九个
    Hit_Balloon: "top:1900rpx;left:58%",              //第十个
  
  

    //深海救援 Deep Water Save
    Deep_Water_Save_Front: true,
    Deep_Water_Save_Btn: true,

    //五彩缤纷 Pick Up The Color
    Pick_Up_The_Color_Front: true,
    Pick_Up_The_Color_Btn: true,

    //打破气球 Hit Balloon
    Hit_Balloon_Front: true,
    Hit_Balloon_Btn: true,

    //大脑内存 Brain Memory 
    Brain_Memory_Front: true,
    Brain_Memory_Btn: true,
    gameOneRemember: "",

    //购物达人 Shopping Expert
    Shopping_Expert_Front: true,
    Shopping_Expert_Btn: true,

    //需要验证  Need Verify
    Need_Verify_Front: true,
    Need_Verify_Btn: true,

    //左右互搏 Struggle Fight
    Struggle_Fight_Front: true,
    Struggle_Fight_Btn: true,

    //平衡之道 The Key To Balance
    The_Key_To_Balance_Btn: true,
    The_Key_To_Balance_Front: true,

    //数独 The sudoku
    The_Sudoku_Btn: true,
    The_Sudoku_Front:  true,

    //弹来弹去 Bouncing Ball
    Bouncing_Ball_Btn: true,
    Bouncing_Ball_Front:  true,
    
  
    learningCard: "",
    subLearningCard: "subLearningCardBlack",
    frontView: "block",
    backView: "none",
    gameArrow: "",
    gameArrow2: "",

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

  //进入 深海救援 Deep Water Save
  Deep_Water_Save_Start() {
    wx.navigateTo({
      url: '/gamePages/Deep_Water_Save/Deep_Water_Save',
    })
    wx.vibrateShort();
  },
  //进入 五彩缤纷 Pick Up The Color
  Pick_Up_The_Color_Start() {
    wx.navigateTo({
      url: '/gamePages/Pick_Up_The_Color/Pick_Up_The_Color',
    })
    wx.vibrateShort();
  },
  //进入 打破气球 Hit Balloon
  Hit_Balloon_Start() {
    wx.navigateTo({
      url: '/gamePages/Hit_Balloon/Hit_Balloon',
    })
    wx.vibrateShort();
  },
  //进入 大脑内存 Brain Memory 
  Brain_Memory_Start() {
    wx.navigateTo({
      url: '/gamePages/Brain_Memory/Brain_Memory',
    })
    wx.vibrateShort();
  },
  //进入 购物达人 Shopping Expert
  Shopping_Expert_Start() {
    wx.navigateTo({
      url: '/gamePages/Shopping_Expert/Shopping_Expert',
    })
    wx.vibrateShort();
  },
  //进入 需要验证  Need Verify
  Need_Verify_Start() {
    wx.navigateTo({
      url: '/gamePages/Need_Verify/Need_Verify',
    })
    wx.vibrateShort();
  },
  //进入 左右互搏 Struggle Fight
  Struggle_Fight_Start() {
    wx.navigateTo({
      url: '/gamePages/Struggle_Fight/Struggle_Fight',
    })
    wx.vibrateShort();
  },
  //进入 平衡之道 The Key To Balance
  The_Key_To_Balance_Start() {
    wx.navigateTo({
      url: '/gamePages/The_Key_To_Balance/The_Key_To_Balance',
    })
    wx.vibrateShort();
  },
  //进入 数独 The sudoku
  The_Sudoku_Start() {
    wx.navigateTo({
      url: '/gamePages/The_Sudoku/The_Sudoku',
    })
    wx.vibrateShort();
  },

  //进入 弹来弹去 Bouncing Ball
  Bouncing_Ball_Start() {
    wx.navigateTo({
      url: '/gamePages/Bouncing_Ball/Bouncing_Ball',
    })
    wx.vibrateShort();
  },


  // ----------------------------------------------------------------- \\

  // 深海救援 Deep Water Save
  Deep_Water_Save_Move() {
    var that = this
    wx.vibrateShort();
    var Deep_Water_Save_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Deep_Water_Save_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Deep_Water_Save_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Deep_Water_Save_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    Deep_Water_Save_Pic.opacity(0.1).step();
    Deep_Water_Save_Text.opacity(0).step();
    Deep_Water_Save_Pic_Undo.opacity(1).step();
    Deep_Water_Save_Text_Undo.opacity(1).translateY(20).step();

    if (Deep_Water_Save_Front == true) {
      Deep_Water_Save_Front = false;
      this.setData({
        Deep_Water_Save_Btn: true,
      })
      this.setData({
        Deep_Water_Save_Animation: Deep_Water_Save_Pic.export(),
        Deep_Water_Save_Animation_Back: Deep_Water_Save_Text_Undo.export(),
      })
      setTimeout(function() {
        that.setData({
          Deep_Water_Save_Front: false,
        })
      }, 120)
    } else if (Deep_Water_Save_Front == false) {
      Deep_Water_Save_Front = true;
      this.setData({
        Deep_Water_Save_Btn: true,
      })
      this.setData({
        Deep_Water_Save_Animation: Deep_Water_Save_Pic_Undo.export(),
        Deep_Water_Save_Animation_Back: Deep_Water_Save_Text.export(),
      })
      setTimeout(function() {
        that.setData({
          Deep_Water_Save_Front: true,
        })
      }, 120)
    }
  },


  // 五彩缤纷 Pick Up The Color
  Pick_Up_The_Color_Move() {
    var that = this
    wx.vibrateShort();
    var Pick_Up_The_Color_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Pick_Up_The_Color_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Pick_Up_The_Color_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Pick_Up_The_Color_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    Pick_Up_The_Color_Pic.opacity(0.1).step();
    Pick_Up_The_Color_Text.opacity(0).step();
    Pick_Up_The_Color_Pic_Undo.opacity(1).step();
    Pick_Up_The_Color_Text_Undo.opacity(1).translateY(20).step();

    if (Pick_Up_The_Color_Front == true) {
      Pick_Up_The_Color_Front = false;
      this.setData({
        Pick_Up_The_Color_Btn: true,
      })
      this.setData({
        Pick_Up_The_Color_Animation: Pick_Up_The_Color_Pic.export(),
        Pick_Up_The_Color_Animation_Back: Pick_Up_The_Color_Text_Undo.export(),
      })
      setTimeout(function() {
        that.setData({
          Pick_Up_The_Color_Front: false,
        })
      }, 120)
    } else if (Pick_Up_The_Color_Front == false) {
      Pick_Up_The_Color_Front = true;
      this.setData({
        Pick_Up_The_Color_Btn: true,
      })
      this.setData({
        Pick_Up_The_Color_Animation: Pick_Up_The_Color_Pic_Undo.export(),
        Pick_Up_The_Color_Animation_Back: Pick_Up_The_Color_Text.export(),
      })
      setTimeout(function() {
        that.setData({
          Pick_Up_The_Color_Front: true,
        })
      }, 120)
    }
  },


  // 打破气球 Hit Balloon
  Hit_Balloon_Move() {
    var that = this
    wx.vibrateShort();
    var Hit_Balloon_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Hit_Balloon_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Hit_Balloon_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Hit_Balloon_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    Hit_Balloon_Pic.opacity(0.1).step();
    Hit_Balloon_Text.opacity(0).step();
    Hit_Balloon_Pic_Undo.opacity(1).step();
    Hit_Balloon_Text_Undo.opacity(1).translateY(20).step();
    if (Hit_Balloon_Front == true) {
      Hit_Balloon_Front = false;
      this.setData({
        Hit_Balloon_Btn: true,
      })
      this.setData({
        Hit_Balloon_Animation: Hit_Balloon_Pic.export(),
        Hit_Balloon_Animation_Back: Hit_Balloon_Text_Undo.export(),
      })
      setTimeout(function() {
        that.setData({
          Hit_Balloon_Front: false,
        })
      }, 120)
    } else if (Hit_Balloon_Front == false) {
      Hit_Balloon_Front = true;
      this.setData({
        Hit_Balloon_Btn: true,
      })
      this.setData({
        Hit_Balloon_Animation: Hit_Balloon_Pic_Undo.export(),
        Hit_Balloon_Animation_Back: Hit_Balloon_Text.export(),
      })
      setTimeout(function() {
        that.setData({
          Hit_Balloon_Front: true,
        })
      }, 120)
    }
  },


  // 脑容量 Brain Memory 
  Brain_Memory_Move() {
    var that = this
    wx.vibrateShort();
    var Brain_Memory_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Brain_Memory_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Brain_Memory_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Brain_Memory_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    Brain_Memory_Pic.opacity(0.1).step();
    Brain_Memory_Text.opacity(0).step();
    Brain_Memory_Pic_Undo.opacity(1).step();
    Brain_Memory_Text_Undo.opacity(1).translateY(20).step();

    if (Brain_Memory_Front == true) {
      Brain_Memory_Front = false;
      this.setData({
        Brain_Memory_Btn: true,
      })
      this.setData({
        Brain_Memory_Animation: Brain_Memory_Pic.export(),
        Brain_Memory_Animation_Back: Brain_Memory_Text_Undo.export(),
      })
      setTimeout(function() {
        that.setData({
          Brain_Memory_Front: false,
        })
      }, 120)
    } else if (Brain_Memory_Front == false) {
      Brain_Memory_Front = true;
      this.setData({
        Brain_Memory_Btn: true,
      })
      this.setData({
        Brain_Memory_Animation: Brain_Memory_Pic_Undo.export(),
        Brain_Memory_Animation_Back: Brain_Memory_Text.export(),
      })
      setTimeout(function() {
        that.setData({
          Brain_Memory_Front: true,
        })
      }, 120)
    }
  },


  // 购物达人 Shopping Expert 
  Shopping_Expert_Move() {
    var that = this
    wx.vibrateShort();
    var Shopping_Expert_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Shopping_Expert_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Shopping_Expert_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Shopping_Expert_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    Shopping_Expert_Pic.opacity(0.1).step();
    Shopping_Expert_Text.opacity(0).step();
    Shopping_Expert_Pic_Undo.opacity(1).step();
    Shopping_Expert_Text_Undo.opacity(1).translateY(20).step();


    if (Shopping_Expert_Front == true) {
      Shopping_Expert_Front = false;
      this.setData({
        Shopping_Expert_Btn: true,
      })
      this.setData({
        Shopping_Expert_Animation: Shopping_Expert_Pic.export(),
        Shopping_Expert_Animation_Back: Shopping_Expert_Text_Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          Shopping_Expert_Front: false,
        })
      }, 120)
    } else if (Shopping_Expert_Front == false) {
      Shopping_Expert_Front = true;
      this.setData({
        Shopping_Expert_Btn: true,
      })
      this.setData({
        Shopping_Expert_Animation: Shopping_Expert_Pic_Undo.export(),
        Shopping_Expert_Animation_Back: Shopping_Expert_Text.export(),
      })
      setTimeout(function () {
        that.setData({
          Shopping_Expert_Front: true,
        })
      }, 120)
    }
  },


  // 需要验证  Need Verify
  Need_Verify_Move() {
    var that = this
    wx.vibrateShort();
    var Need_Verify_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Need_Verify_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Need_Verify_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Need_Verify_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    Need_Verify_Pic.opacity(0.1).step();
    Need_Verify_Text.opacity(0).step();
    Need_Verify_Pic_Undo.opacity(1).step();
    Need_Verify_Text_Undo.opacity(1).translateY(20).step();


    if (Need_Verify_Front == true) {
      Need_Verify_Front = false;
      this.setData({
        Need_Verify_Btn: true,
      })
      this.setData({
        Need_Verify_Animation: Need_Verify_Pic.export(),
        Need_Verify_Animation_Back: Need_Verify_Text_Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          Need_Verify_Front: false,
        })
      }, 120)
    } else if (Need_Verify_Front == false) {
      Need_Verify_Front = true;
      this.setData({
        Need_Verify_Btn: true,
      })
      this.setData({
        Need_Verify_Animation: Need_Verify_Pic_Undo.export(),
        Need_Verify_Animation_Back: Need_Verify_Text.export(),
      })
      setTimeout(function () {
        that.setData({
          Need_Verify_Front: true,
        })
      }, 120)
    }
  },


  // 左右互搏 Struggle Fight
  Struggle_Fight_Move() {
    var that = this
    wx.vibrateShort();
    var Struggle_Fight_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Struggle_Fight_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Struggle_Fight_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Struggle_Fight_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    Struggle_Fight_Pic.opacity(0.1).step();
    Struggle_Fight_Text.opacity(0).step();
    Struggle_Fight_Pic_Undo.opacity(1).step();
    Struggle_Fight_Text_Undo.opacity(1).translateY(20).step();


    if (Struggle_Fight_Front == true) {
      Struggle_Fight_Front = false;
      this.setData({
        Struggle_Fight_Btn: true,
      })
      this.setData({
        Struggle_Fight_Animation: Struggle_Fight_Pic.export(),
        Struggle_Fight_Animation_Back: Struggle_Fight_Text_Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          Struggle_Fight_Front: false,
        })
      }, 120)
    } else if (Struggle_Fight_Front == false) {
      Struggle_Fight_Front = true;
      this.setData({
        Struggle_Fight_Btn: true,
      })
      this.setData({
        Struggle_Fight_Animation: Struggle_Fight_Pic_Undo.export(),
        Struggle_Fight_Animation_Back: Struggle_Fight_Text.export(),
      })
      setTimeout(function () {
        that.setData({
          Struggle_Fight_Front: true,
        })
      }, 120)
    }
  },


  // 平衡之道 The Key To Balance
  The_Key_To_Balance_Move() {
    var that = this
    wx.vibrateShort();
    var The_Key_To_Balance_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var The_Key_To_Balance_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var The_Key_To_Balance_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var The_Key_To_Balance_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    The_Key_To_Balance_Pic.opacity(0.1).step();
    The_Key_To_Balance_Text.opacity(0).step();
    The_Key_To_Balance_Pic_Undo.opacity(1).step();
    The_Key_To_Balance_Text_Undo.opacity(1).translateY(20).step();
    if (The_Key_To_Balance_Front == true) {
      The_Key_To_Balance_Front = false;
      this.setData({
        The_Key_To_Balance_Btn: true,
      })
      this.setData({
        The_Key_To_Balance_Animation: The_Key_To_Balance_Pic.export(),
        The_Key_To_Balance_Animation_Back: The_Key_To_Balance_Text_Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          The_Key_To_Balance_Front: false,
        })
      }, 120)
    } else if (The_Key_To_Balance_Front == false) {
      The_Key_To_Balance_Front = true;
      this.setData({
        The_Key_To_Balance_Btn: true,
      })
      this.setData({
        The_Key_To_Balance_Animation: The_Key_To_Balance_Pic_Undo.export(),
        The_Key_To_Balance_Animation_Back: The_Key_To_Balance_Text.export(),
      })
      setTimeout(function () {
        that.setData({
          The_Key_To_Balance_Front: true,
        })
      }, 120)
    }
  },


  // 数独 The sudoku
  The_Sudoku_Move() {
    var that = this
    wx.vibrateShort();
    var The_Sudoku_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var The_Sudoku_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var The_Sudoku_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var The_Sudoku_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    The_Sudoku_Pic.opacity(0.1).step();
    The_Sudoku_Text.opacity(0).step();
    The_Sudoku_Pic_Undo.opacity(1).step();
    The_Sudoku_Text_Undo.opacity(1).translateY(20).step();

    if (The_Sudoku_Front == true) {
      The_Sudoku_Front = false;
      this.setData({
        The_Sudoku_Btn: false,
      })
      this.setData({
        The_Sudoku_Animation: The_Sudoku_Pic.export(),
        The_Sudoku_Animation_Back: The_Sudoku_Text_Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          The_Sudoku_Front: false,
        })
      }, 120)
    } else if (The_Sudoku_Front == false) {
      The_Sudoku_Front = true;
      this.setData({
        The_Sudoku_Btn: true,
      })
      this.setData({
        The_Sudoku_Animation: The_Sudoku_Pic_Undo.export(),
        The_Sudoku_Animation_Back: The_Sudoku_Text.export(),
      })
      setTimeout(function () {
        that.setData({
          The_Sudoku_Front: true,
        })
      }, 120)
    }
  },


  // 弹来弹去 Bouncing Ball
  Bouncing_Ball_Move() {
    var that = this
    wx.vibrateShort();
    var Bouncing_Ball_Pic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Bouncing_Ball_Text = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Bouncing_Ball_Pic_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var Bouncing_Ball_Text_Undo = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    Bouncing_Ball_Pic.opacity(0.1).step();
    Bouncing_Ball_Text.opacity(0).step();
    Bouncing_Ball_Pic_Undo.opacity(1).step();
    Bouncing_Ball_Text_Undo.opacity(1).translateY(20).step();

    if (Bouncing_Ball_Front == true) {
      Bouncing_Ball_Front = false;
      this.setData({
        Bouncing_Ball_Btn: true,
      })
      this.setData({
        Bouncing_Ball_Animation: Bouncing_Ball_Pic.export(),
        Bouncing_Ball_Animation_Back: Bouncing_Ball_Text_Undo.export(),
      })
      setTimeout(function () {
        that.setData({
          Bouncing_Ball_Front: false,
        })
      }, 120)
    } else if (Bouncing_Ball_Front == false) {
      Bouncing_Ball_Front = true;
      this.setData({
        Bouncing_Ball_Btn: true,
      })
      this.setData({
        Bouncing_Ball_Animation: Bouncing_Ball_Pic_Undo.export(),
        Bouncing_Ball_Animation_Back: Bouncing_Ball_Text.export(),
      })
      setTimeout(function () {
        that.setData({
          Bouncing_Ball_Front: true,
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
      animationChangeBgToBlack.backgroundColor("#5e6473").step();
      animationChangeToPurple.backgroundColor("purple").step();
      animationChangeCardToBlack.backgroundColor("#3d4050").step();
      this.setData({
        sunORmoon: "/assets/learning/moon.png",
        dayORnight: "topViewNight",
        bgColor: "bgColorBlack",
        gameOneRemember: "/assets/learning/games/rememberWhite.png",
        gameArrow: "/assets/learning/games/arrowRightWhite.png",
        gameArrow2: "/assets/learning/games/arrowRightWhite.png",
        gameArrow3: "/assets/learning/games/arrowRightWhite.png",
        blackORwhiteTitle: "#ecf0f3",
        changeBgColor: animationChangeBgToBlack.export(),
        changeColor: animationChangeToPurple.export(),
        cardBgColor: animationChangeCardToBlack.export(),
        learningCard: "learningCardBlack",
      })
      isSun = false;
      app.globalData.darkMode = true;

      //---------------------------------------\\

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
      animationChangeBgToWhite.backgroundColor("#ecf0f3").step();
      animationChangeToGold.backgroundColor("gold").step();
      animationChangeCardToWhite.backgroundColor("#ecf0f3").step();
      this.setData({
        sunORmoon: "/assets/learning/sun.png",
        dayORnight: "topViewDay",
        bgColor: "bgColorWhite",
        gameOneRemember: "/assets/learning/games/rememberBlack.png",
        blackORwhiteTitle: "#3d4050",
        changeBgColor: animationChangeBgToWhite.export(),
        changeColor: animationChangeToGold.export(),
        cardBgColor: animationChangeCardToWhite.export(),
        learningCard: "learningCardWhite",
      })
      isSun = true;
      app.globalData.darkMode = false;
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
        blackORwhite: "ecf0f3",
        gameOneRemember: "/assets/learning/games/rememberBlack.png",
        gameArrow: "/assets/learning/games/arrowRightBlack.png",
        gameArrow2: "/assets/learning/games/arrowRightBlack.png",
        gameArrow3: "/assets/learning/games/arrowRightBlack.png",
        blackORwhiteTitle: "#3d4050",
      })
      isSun = true;
      app.globalData.darkMode = false;
    }
    if ((hour >= 18 && hour <= 24) || (hour >= 0 && hour < 6)) {
      this.setData({
        sunORmoon: "/assets/learning/moon.png",
        dayORnight: "topViewNight",
        bgColor: "bgColorBlack",
        learningCard: "learningCardBlack",
        blackORwhite: "#3d4050",
        gameOneRemember: "/assets/learning/games/rememberWhite.png",
        gameArrow: "/assets/learning/games/arrowRightWhite.png",
        gameArrow2: "/assets/learning/games/arrowRightWhite.png",
        gameArrow3: "/assets/learning/games/arrowRightWhite.png",
        blackORwhiteTitle: "white",
      })
      isSun = false;
      app.globalData.darkMode = true;
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