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
  onShareAppMessage: function () {
    return {
      title: "我正在锻炼大脑，一起！(´･ω･`)",
      path: "/pages/learning/learning",
    }
  },

  data: {

    //设置黑暗模式或者白天模式
    sunORmoon: "",
    dayORnight: "",
    blackORwhite: "",
    blackORwhiteTitle: "",
    bgColor: "",
    nonStillViewTop: "nonStillViewTop",
    imageUse: "imageUse",
    feedbackBtn: "feedbackBtn",
    iconFontIconText: "iconFontIconText",

    //上层下拉栏
    userName: "",
    openORretract: "/assets/learning/open.png",

    //游戏的排列顺序
    The_Sudoku: "top:300rpx;left:6%", //第一个
    Need_Verify: "top:300rpx;left:58%", //第二个
    Brain_Memory: "top:700rpx;left:6%", //第三个
    Deep_Water_Save: "top:700rpx;left:58%", //第四个
    Shopping_Expert: "top: 1100rpx;left:6%", //第五个
    Bouncing_Ball: "top:1100rpx;left:58%", //第六个
    Struggle_Fight: "top:1500rpx;left:6%", //第七个
    The_Key_To_Balance: "top:1500rpx;left:58%", //第八个
    Pick_Up_The_Color: "top:1900rpx;left:6%", //第九个
    Hit_Balloon: "top:1900rpx;left:58%", //第十个



    //深海救援 Deep Water Save
    Deep_Water_Save_Front: true,
    Deep_Water_Save_Btn: true,

    //五彩缤纷 Pick Up The Color
    Pick_Up_The_Color_Front: true,
    Pick_Up_The_Color_Btn: true,

    //打破气球 Hit Balloon
    Hit_Balloon_Front: true,
    Hit_Balloon_Btn: true,

    //方块记忆 Brain Memory 
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
    The_Sudoku_Front: true,

    //弹来弹去 Bouncing Ball
    Bouncing_Ball_Btn: true,
    Bouncing_Ball_Front: true,


    v: "",
    subLearningCard: "subLearningCardBlack",
    frontView: "block",
    backView: "none",
    gameArrow: "",
    gameArrow2: "",

    hintToSubscribe: "block",
    hintToLoginDisplay: "block",

  },


  //进入 深海救援 Deep Water Save
  Deep_Water_Save_Start() {
    wx.navigateTo({
      url: '/gamePages/Deep_Water_Save/Deep_Water_Save',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },
  //进入 五彩缤纷 Pick Up The Color
  Pick_Up_The_Color_Start() {
    wx.navigateTo({
      url: '/gamePages/Pick_Up_The_Color/Pick_Up_The_Color',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },
  //进入 打破气球 Hit Balloon
  Hit_Balloon_Start() {
    wx.navigateTo({
      url: '/gamePages/Hit_Balloon/Hit_Balloon',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },
  //进入 方块记忆 Brain Memory 
  Brain_Memory_Start() {
    if (this.data.Brain_Memory_Front == false) {
      //本地保存数独图片信息
      wx.downloadFile({
          url: 'https://assets-ouch.icons8.com/thumb/577/40f927ba-0e31-41a1-affb-2f8a8672b4d0.png',
          success: function (res) {
            if (res.statusCode === 200) {
              const fs = wx.getFileSystemManager()
              fs.saveFile({
                tempFilePath: res.tempFilePath,
                success(res) {
                  wx.setStorageSync('brainMemoryPic', res.savedFilePath)
                }
              })
            }
          },
        }),

        wx.navigateTo({
          url: '/gamePages/Brain_Memory/Brain_Memory',
        })
      if (getApp().globalData.vibration == true) {
        wx.vibrateShort();
      }
    }
  },
  //进入 购物达人 Shopping Expert
  Shopping_Expert_Start() {
    wx.navigateTo({
      url: '/gamePages/Shopping_Expert/Shopping_Expert',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },

  //进入 需要验证  Need Verify
  Need_Verify_Start() {
    if (this.data.Need_Verify_Front == false) {
      //本地保存数独图片信息
      wx.downloadFile({
          url: 'https://assets-ouch.icons8.com/thumb/689/380249fc-078b-40a5-988f-b73881b36a8d.png',
          success: function (res) {
            if (res.statusCode === 200) {
              const fs = wx.getFileSystemManager()
              fs.saveFile({
                tempFilePath: res.tempFilePath,
                success(res) {
                  wx.setStorageSync('needVerifyPic', res.savedFilePath)
                }
              })
            }
          },
        }),

        wx.navigateTo({
          url: '/gamePages/Need_Verify/Need_Verify',
        })
      if (getApp().globalData.vibration == true) {
        wx.vibrateShort();
      }
    }
  },

  //进入 左右互搏 Struggle Fight
  Struggle_Fight_Start() {
    wx.navigateTo({
      url: '/gamePages/Struggle_Fight/Struggle_Fight',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },
  //进入 平衡之道 The Key To Balance
  The_Key_To_Balance_Start() {
    wx.navigateTo({
      url: '/gamePages/The_Key_To_Balance/The_Key_To_Balance',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },
  //进入 数独 The sudoku
  The_Sudoku_Start() {
    if (this.data.The_Sudoku_Front == false) {
      //本地保存数独图片信息
      wx.downloadFile({
          url: 'https://assets-ouch.icons8.com/thumb/206/6a6f98e1-d851-4ec7-9ae5-802b89a114bb.png',
          success: function (res) {
            if (res.statusCode === 200) {
              const fs = wx.getFileSystemManager()
              fs.saveFile({
                tempFilePath: res.tempFilePath,
                success(res) {
                  wx.setStorageSync('sudokuPic', res.savedFilePath)
                }
              })
            }
          },
        }),

        wx.navigateTo({
          url: '/gamePages/The_Sudoku/The_Sudoku',
        })
      if (getApp().globalData.vibration == true) {
        wx.vibrateShort();
      }
    }


  },

  //进入 弹来弹去 Bouncing Ball
  Bouncing_Ball_Start() {
    wx.navigateTo({
      url: '/gamePages/Bouncing_Ball/Bouncing_Ball',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },


  // ----------------------------------------------------------------- \\

  // 深海救援 Deep Water Save
  Deep_Water_Save_Move() {
    var that = this
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
      setTimeout(function () {
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
      setTimeout(function () {
        that.setData({
          Deep_Water_Save_Front: true,
        })
      }, 120)
    }
  },


  // 五彩缤纷 Pick Up The Color
  Pick_Up_The_Color_Move() {
    var that = this
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
      setTimeout(function () {
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
      setTimeout(function () {
        that.setData({
          Pick_Up_The_Color_Front: true,
        })
      }, 120)
    }
  },


  // 打破气球 Hit Balloon
  Hit_Balloon_Move() {
    var that = this
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
      setTimeout(function () {
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
      setTimeout(function () {
        that.setData({
          Hit_Balloon_Front: true,
        })
      }, 120)
    }
  },


  // 方块记忆 Brain Memory 
  Brain_Memory_Move() {
    var that = this
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
        Brain_Memory_Btn: false,
      })
      this.setData({
        Brain_Memory_Animation: Brain_Memory_Pic.export(),
        Brain_Memory_Animation_Back: Brain_Memory_Text_Undo.export(),
      })
      setTimeout(function () {
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
      setTimeout(function () {
        that.setData({
          Brain_Memory_Front: true,
        })
      }, 120)
    }
  },


  // 购物达人 Shopping Expert 
  Shopping_Expert_Move() {
    var that = this
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
        Need_Verify_Btn: false,
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
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
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
    if (app.globalData.darkLightAuto) {
      if (isSun == true) {
        if (getApp().globalData.vibration == true) {
          wx.vibrateShort();
        }
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
        animationChangeBgToBlack.backgroundColor("#3d4050").step();
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
          nonStillViewTop: "nonStillViewTopDark",
          imageUse: "imageUseDark",
          feedbackBtn: "feedbackBtnDark",
          iconFontIconText: "iconFontIconTextDark",
          changeBgColor: animationChangeBgToBlack.export(),
          changeColor: animationChangeToPurple.export(),
          cardBgColor: animationChangeCardToBlack.export(),
          learningCard: "learningCardBlack",
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#3d4050',
          animation: {
            duration: 500,
            timingFunc: 'ease'
          }
        })
        wx.setBackgroundColor({
          backgroundColor: '#3d4050',
        })
        wx.setTabBarStyle({
          backgroundColor: '#3d4050',
          color: '#ffffff',
          selectedColor: "#ffffff",
          animation: {
            duration: 500,
            timingFunc: 'ease'
          }
        })

        isSun = false;
        app.globalData.darkMode = true;

        //---------------------------------------\\

      } else if (isSun == false) {
        if (getApp().globalData.vibration == true) {
          wx.vibrateShort();
        }
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
          nonStillViewTop: "nonStillViewTop",
          imageUse: "imageUse",
          feedbackBtn: "feedbackBtn",
          iconFontIconText: "iconFontIconText",
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ecf0f3',
          animation: {
            duration: 500,
            timingFunc: 'ease'
          }
        })
        wx.setBackgroundColor({
          backgroundColor: '#ecf0f3',
        })
        wx.setTabBarStyle({
          backgroundColor: '#ecf0f3',
          color: '#000000',
          selectedColor: "#447ece",
          animation: {
            duration: 500,
            timingFunc: 'ease'
          }
        })
        isSun = true;
        app.globalData.darkMode = false;
      }
    }else{
      wx.showModal({
        title: '已锁定',
        content: '您在「我的」页面已经将明暗模式调整为永久，如需解锁，请回到「我的」页面 -> 设置 -> 将明暗滑条调整为「自动模式」',
        showCancel: true,
        cancelText: "明白了",
        cancelColor: "#dddddd",
        confirmText: "去调整",
        success(res) {
          if (res.confirm) {
            wx: wx.switchTab({
              url: '/pages/mine/mine',
            })
          }
        }
      })
    
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
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    var animationOpen = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    var animationClose = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    if (state == false) {
      animationOpen.translateY("53vh").step()
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
  onLoad: function (options) {
    this.app = getApp()
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
        nonStillViewTop: "nonStillViewTop",
        imageUse: "imageUse",
        feedbackBtn: "feedbackBtn",
        iconFontIconText: "iconFontIconText",
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ecf0f3',
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      wx.setBackgroundColor({
        backgroundColor: '#ecf0f3',
      })
      wx.setTabBarStyle({
        backgroundColor: '#ecf0f3',
        color: '#000000',
        selectedColor: "#447ece",
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })

      isSun = true;
      app.globalData.darkMode = false;
    } else if ((hour >= 18 && hour <= 24) || (hour >= 0 && hour < 6)) {
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
        nonStillViewTop: "nonStillViewTopDark",
        imageUse: "imageUseDark",
        feedbackBtn: "feedbackBtnDark",
        iconFontIconText: "iconFontIconTextDark",
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#3d4050',
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      wx.setBackgroundColor({
        backgroundColor: '#3d4050',
      })
      wx.setTabBarStyle({
        backgroundColor: '#3d4050',
        color: '#ffffff',
        selectedColor: "#ffffff",
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      isSun = false;
      app.globalData.darkMode = true;
    }
    app.fetchInfo();
    // 如果用户没有上传名字或者头像，则上传
    app.uploadUserInfo();
  },

  //页面初次渲染完成
  onReady: function () {

    // 创建动画实例(animation)
    var animation = wx.createAnimation({
      duration: 500, //动画持续时间
      timingFunction: 'ease', //动画以低速开始
      //具体配置项请查看文档
    })
    // 建立标识(用于循环)
    this.animation = animation
    var next = true;
    // 无限循环动画
    setInterval(function () {
      if (next) {
        // 你要执行动画链(详见文档)
        this.animation.rotate(10).scale(1.2).step()
        // ----------------------- 
        next = !next;
      } else {
        // 你要执行动画链(详见文档)
        this.animation.rotate(-30).scale(1).step()
        // -----------------------
        next = !next;
      }

      // 导出动画
      this.setData({
        availabilityAnimation: animation.export()
      })

    }.bind(this), 500)


    var hideHintToScribe = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    hideHintToScribe.opacity(0).step();
    this.setData({
      hintToSubscribe: "block",
    })
    setTimeout(() => {
      this.setData({
        hintToSubscribeAnimation: hideHintToScribe.export()
      })
      setTimeout(() => {
        this.setData({
          hintToSubscribe: "none",
        })
      }, 1000);
    }, 10000);
  },

  //页面显示
  onShow: function () {

    if (app.globalData.darkMode) {
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
      animationChangeBgToBlack.backgroundColor("#3d4050").step();
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
        nonStillViewTop: "nonStillViewTopDark",
        imageUse: "imageUseDark",
        feedbackBtn: "feedbackBtnDark",
        iconFontIconText: "iconFontIconTextDark",
        changeBgColor: animationChangeBgToBlack.export(),
        changeColor: animationChangeToPurple.export(),
        cardBgColor: animationChangeCardToBlack.export(),
        learningCard: "learningCardBlack",
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#3d4050',
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      wx.setBackgroundColor({
        backgroundColor: '#3d4050',
      })
      wx.setTabBarStyle({
        backgroundColor: '#3d4050',
        color: '#ffffff',
        selectedColor: "#ffffff",
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })

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
        nonStillViewTop: "nonStillViewTopDark",
        imageUse: "imageUseDark",
        feedbackBtn: "feedbackBtnDark",
        iconFontIconText: "iconFontIconTextDark",
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#3d4050',
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      wx.setBackgroundColor({
        backgroundColor: '#3d4050',
      })
      wx.setTabBarStyle({
        backgroundColor: '#3d4050',
        color: '#ffffff',
        selectedColor: "#ffffff",
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      isSun = false;
      app.globalData.darkMode = true;
    } else {
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
        nonStillViewTop: "nonStillViewTop",
        imageUse: "imageUse",
        feedbackBtn: "feedbackBtn",
        iconFontIconText: "iconFontIconText",
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ecf0f3',
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      wx.setBackgroundColor({
        backgroundColor: '#ecf0f3',
      })
      wx.setTabBarStyle({
        backgroundColor: '#ecf0f3',
        color: '#000000',
        selectedColor: "#447ece",
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
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
        nonStillViewTop: "nonStillViewTop",
        imageUse: "imageUse",
        feedbackBtn: "feedbackBtn",
        iconFontIconText: "iconFontIconText",
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ecf0f3',
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      wx.setBackgroundColor({
        backgroundColor: '#ecf0f3',
      })
      wx.setTabBarStyle({
        backgroundColor: '#ecf0f3',
        color: '#000000',
        selectedColor: "#447ece",
        animation: {
          duration: 500,
          timingFunc: 'ease'
        }
      })
      isSun = true;
      app.globalData.darkMode = false;
    }

    var that = this;
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    //尝试在本地缓存中获取用户信息
    wx.getStorage({
      key: 'nickName',
      success: function (res) {
        that.setData({
          userInfomationText: res.data,
          mineInfoBtnPush: "hide",
        })
        app.globalData.isGettedInfo = true;
        app.globalData.name = res.data; //把公共名字连接换成微信名字
      },
      fail: function (res) {
        that.setData({
          userInfomationText: "请登录",
          mineInfoBtnPush: "show",
        })
        app.globalData.isGettedInfo = false;
      }
    })
    wx.getStorage({
      key: 'avatarUrl',
      success: function (res) {
        that.setData({
          userAvatar: res.data,
        })
        app.globalData.isGettedInfo = true;
        app.globalData.avatar = res.data; //把公共头像连接换成微信头像
      },
      fail: function (res) {
        that.setData({
          mineInfoBtnPush: "show",
        })
        app.globalData.isGettedInfo = false;
      }
    })

    var name = app.globalData.name.substring(0, 6);
    this.setData({
      userName: name,
    })

    //如果没有授权，则显示授权提示动画
    if (app.globalData.isGettedInfo != true) {
      this.setData({
        hintToLoginDisplay: "block"
      })
      // 创建动画实例(animation)
      var animation1 = wx.createAnimation({
        duration: 500, //动画持续时间
        timingFunction: 'ease', //动画以低速开始
        //具体配置项请查看文档
      })
      // 建立标识(用于循环)
      this.animation1 = animation1
      var next = true;
      // 无限循环动画
      setInterval(function () {
        if (next) {
          // 你要执行动画链(详见文档)
          this.animation1.opacity(1).scale(1.1).step()
          // ----------------------- 
          next = !next;
        } else {
          // 你要执行动画链(详见文档)
          this.animation1.opacity(0.6).scale(1).step()
          // -----------------------
          next = !next;
        }
        // 导出动画
        this.setData({
          hintToLoginAnimation: animation1.export()
        })

      }.bind(this), 500)
    } else {
      this.setData({
        hintToLoginDisplay: "none"
      })
    }
  },


  //页面隐藏
  onHide: function () {

  },

  //页面卸载
  onUnload: function () {

  },

  //用户下拉动作
  onPullDownRefresh: function () {

  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {

  },

  //用户点击右上角分享
  onShareAppMessage: function () {

  }
})