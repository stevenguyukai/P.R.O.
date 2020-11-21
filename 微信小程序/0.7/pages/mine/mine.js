var app = getApp();
var userAvatarGet = app.globalData.avatar;
var name = app.globalData.name;
var isSelectOftenPlayGame = "";

Page({

  /**
   * 页面的初始数据 
   */

  data: {
    vibration: "关闭震动",

    settingText: "settingText",
    settingBlocks: "settingBlocks",
    setting: "setting",
    levelAndExp: "levelAndExp",
    userLevel: 0,
    level: "level",
    levelNum: "levelNum",
    expProgress: "expProgress",
    activeColor: "orange",
    progressBGColor: "#3d4050",
    expPercentage: 0,
    oftenPlayGameWholeView: "oftenPlayGameWholeView",
    oftenPlayGame: "oftenPlayGame",
    oftenPlayGameItem: "oftenPlayGameItem",
    oftenPlayGameName: "oftenPlayGameName",
    oftenPlayGameNameText: "常玩项目",
    oftenPlayGameImgInfo: "oftenPlayGameImgInfo",
    playTime: "playTime",
    playTimeInfo: "playTimeInfo",

    playHours: 0,
    playMinutes: 0,
    playSeconds: 0,

    playTimeInfoPresent: "hide",
    gameTimeTextColor: "gameTimeTextColor",
    continueGameButton: "continueGameButton",

    getAvatarInStorage: false,

    overAll: "overAll",
    userInfo: "userInfo",
    backgroundImage: "backgroundImage",
    avatar: "avatar",
    userInfomation: "userInfomation",

    userAvatar: userAvatarGet, //用户头像路径
    userInfomationText: name, //头像旁显示的文字
    mineInfoBtnPush: "show", //登陆前按钮显示
    btnPushed: "hide", //登陆前选择框隐藏

    settingView: "settingView",
    settingScroll: "settingScroll",

    oftenPlayGames: [{  
      "id": "0",
      "img": "/assets/learning/sudoku.png",
      "name": "数独挑战",
      "enName": "sudoku",
      "animations": "oftenPlayGameAnimation1",
    },{
      "id": "1",
      "img": "/assets/learning/game5/icon.png",
      "name": "需要验证",
      "enName": "need_verify",
      "animations": "oftenPlayGameAnimation2",
    }, {
      "id": "2",
      "img": "/assets/learning/games/rememberBlack.png",
      "name": "方块记忆",
      "enName": "brain_memory",
      "animations": "oftenPlayGameAnimation3",
    }]  //记得在onShow方法里也要写同样的东西，因为展现页面时要初始化这个数组

  },


  //点击常玩项目一
  oftenPlayGames_sudoku() {
    var totalSeconds = app.globalData.sudoku_play_time
    var sudokuPlayHours = Math.floor(totalSeconds / 3600)
    var sudokuPlayMinutes = Math.floor((totalSeconds - sudokuPlayHours * 3600) / 60)
    var sudokuPlaySeconds = Math.floor(totalSeconds - sudokuPlayHours * 3600 - sudokuPlayMinutes * 60)


    this.setData({
      oftenPlayGameNameText: "数独挑战",
      playHours: sudokuPlayHours,
      playMinutes: sudokuPlayMinutes,
      playSeconds: sudokuPlaySeconds,
      playTimeInfoPresent: "show",
    })
    isSelectOftenPlayGame = "The_Sudoku"
  },

  //点击常玩项目二
  oftenPlayGames_need_verify() {
    var totalSeconds = app.globalData.need_verify_play_time
    var needVerifyPlayHours = Math.floor(totalSeconds / 3600)
    var needVerifyPlayMinutes = Math.floor((totalSeconds - needVerifyPlayHours * 3600) / 60)
    var needVerifyPlaySeconds = Math.floor(totalSeconds - needVerifyPlayHours * 3600 - needVerifyPlayMinutes * 60)


    this.setData({
      oftenPlayGameNameText: "需要验证",
      playHours: needVerifyPlayHours,
      playMinutes: needVerifyPlayMinutes,
      playSeconds: needVerifyPlaySeconds,
      playTimeInfoPresent: "show",
    })
    isSelectOftenPlayGame = "Need_Verify"
  },

  //点击常玩项目三
  oftenPlayGames_brain_memory() {
    var totalSeconds = app.globalData.brain_memory_play_time
    var brainGamePlayHours = Math.floor(totalSeconds / 3600)
    var brainGamePlayMinutes = Math.floor((totalSeconds - brainGamePlayHours * 3600) / 60)
    var brainGamePlaySeconds = Math.floor(totalSeconds - brainGamePlayHours * 3600 - brainGamePlayMinutes * 60)

    this.setData({
      oftenPlayGameNameText: "方块记忆",
      playHours: brainGamePlayHours,
      playMinutes: brainGamePlayMinutes,
      playSeconds: brainGamePlaySeconds,
      playTimeInfoPresent: "show",
    })
    isSelectOftenPlayGame = "Brain_Memory"
  },

  //继续常玩项目
  continueOftenPlayGame() {
    wx.navigateTo({
      url: '/gamePages/' + isSelectOftenPlayGame + '/' + isSelectOftenPlayGame + '',
    })
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
  },

  //点击设置按钮
  intoSetting(){
    var show = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var showShadowView = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var SuddenShowShadowView = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    })
    show.top("0vh").step();
    showShadowView.opacity(0.4).step();
    SuddenShowShadowView.opacity(0).step();
    this.setData({
      settingViewAnimation: show.export(),
      shadowView: true,
      shadowViewAnimation: SuddenShowShadowView.export(),
    })
    setTimeout(() => {
      this.setData({
        shadowViewAnimation: showShadowView.export(),
      })
    }, 50);
  },

  //点击区域外的地方
  clickOtherPlace(){
    var hide = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var hideShadowView = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    hide.top("100vh").step();
    hideShadowView.opacity(0).step();
    this.setData({
      settingViewAnimation: hide.export(),
      shadowViewAnimation: hideShadowView.export(),
    })
    var that = this
    setTimeout(() => {
      that.setData({
        shadowView: false,
      })
    }, 600);
  },

  //分享小程序
  onShareAppMessage: function () {
    return {
      title: "我正在锻炼大脑，一起！(´･ω･`)",
      path: "/pages/learning/learning",
    }
  },

  changeAvatar() { //进入换头像页面
    wx.navigateTo({
      url: '/pages/changeAvatar/changeAvatar', //进入换头像页面
    })
  }, 

  getUserInfo(event) { //获取用户信息
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }

    //本地保存用户信息 
    wx.setStorageSync('nickName', event.detail.userInfo.nickName)
    wx.setStorageSync('avatarUrl', event.detail.userInfo.avatarUrl)

    this.setData({
      userInfomationText: event.detail.userInfo.nickName, //用户微信名字
      userAvatar: event.detail.userInfo.avatarUrl, //用户微信头像
      mineInfoBtnPush: "hide", //登陆之后按钮隐藏 
      btnPushed: "show", //登陆之后选择框显示
    })
    app.globalData.userWXavatar = event.detail.userInfo.avatarUrl;
    app.globalData.avatar = event.detail.userInfo.avatarUrl; //把公共头像连接换成微信头像
    app.globalData.name = event.detail.userInfo.nickName; //把公共名字连接换成微信名字
    app.globalData.isGettedInfo = true; //看看有没有获取了用户信息
    wx.hideToast();
    wx.showToast({
      title: '成功载入',
      icon: 'success',
      duration: 200
    });
    wx.switchTab({
      url: '/pages/learning/learning',
    })

  },

  showLoading: function () { //获取用户信息时的等待
    wx.showToast({
      title: '正在努力连接',
      icon: 'loading',
      duration: 10000
    });
    this.onLoad();
    this.onShow();
  },

  updateData() {
    wx.showModal({
      title: "是否要同步云存档",
      content: "同步云存档会将云数据传到手机，本地存档将被覆盖，如果本地数据出现错误，请轻按「同步」按钮",
      showCancel: true,
      cancelText: "不要了",
      confirmText: "同步",
      success(res) {
        if (res.confirm) {
          app.syncData();
          if (getApp().globalData.vibration == true) {
            wx.vibrateShort();
          }
        }
      }
    })
  },

  clearStorage() {
    var that = this;
    wx.showModal({
      title: "是否要删除缓存",
      content: "删除缓存会将登陆信息一并清除，将需要重新登陆",
      showCancel: true,
      cancelText: "不要了",
      confirmText: "删除",
      success(res) {
        if (res.confirm) {
          wx.clearStorage({
            success: (res) => {
              app.globalData.isGettedInfo = false
              if (getApp().globalData.vibration == true) {
                wx.vibrateShort();
              }
              that.setData({
                btnPushed: "hide"
              })
              wx.showToast({ 
                title: '删除完成',
              })
              wx.switchTab({
                url: '/pages/learning/learning',
              })
            },
          })
        }
      }
    })
  },

  setVibration() {
    if (app.globalData.vibration == true) {
      app.globalData.vibration = false
      this.setData({
        vibration: "打开震动",
      })
      wx.showToast({
        icon: "none",
        title: '已关闭震动',
      })
    } else {
      wx.vibrateLong()
      app.globalData.vibration = true
      this.setData({
        vibration: "关闭震动",
      })
      wx.showToast({
        icon: "none",
        title: '已打开震动',
      })
    }
  },



  onLoad: function (options) {
    this.app = getApp()
    var that = this
  },


  onReady: function () {

  },


  onShow: function () {
    var that = this;

    that.setData({
      oftenPlayGames: [{
        "id": "0",
        "img": "/assets/learning/sudoku.png",
        "name": "数独挑战",
        "enName": "sudoku",
        "animations": "oftenPlayGameAnimation1",
      },{
        "id": "1",
        "img": "/assets/learning/game5/icon.png",
        "name": "需要验证",
        "enName": "need_verify",
        "animations": "oftenPlayGameAnimation2",
      }, {
        "id": "2",
        "img": "/assets/learning/games/rememberBlack.png",
        "name": "方块记忆",
        "enName": "brain_memory",
        "animations": "oftenPlayGameAnimation3",
      }]
    })

    //复制常玩项目的数组
    var oftenPlayGameBackup = that.data.oftenPlayGames

    //刷新用户在「数独」上使用的时间
    var totalSeconds = app.globalData.sudoku_play_time
    var sudokuPlayHours = Math.floor(totalSeconds / 3600)
    var sudokuPlayMinutes = Math.floor((totalSeconds - sudokuPlayHours * 3600) / 60)
    var sudokuPlaySeconds = Math.floor(totalSeconds - sudokuPlayHours * 3600 - sudokuPlayMinutes * 60)
    this.setData({
      sudokuPlayHours: sudokuPlayHours,
      sudokuPlayMinutes: sudokuPlayMinutes,
      sudokuPlaySeconds: sudokuPlaySeconds,
    })

    //刷新用户在「需要验证」上使用的时间
    var totalSeconds = app.globalData.need_verify_play_time
    var needVerifyPlayHours = Math.floor(totalSeconds / 3600)
    var needVerifyPlayMinutes = Math.floor((totalSeconds - needVerifyPlayHours * 3600) / 60)
    var needVerifyPlaySeconds = Math.floor(totalSeconds - needVerifyPlayHours * 3600 - needVerifyPlayMinutes * 60)
    this.setData({
      playHours: needVerifyPlayHours,
      playMinutes: needVerifyPlayMinutes,
      playSeconds: needVerifyPlaySeconds,
    })

    //刷新用户在「方块记忆」上使用的时间
    var totalSeconds = app.globalData.brain_memory_play_time
    var brainGamePlayHours = Math.floor(totalSeconds / 3600)
    var brainGamePlayMinutes = Math.floor((totalSeconds - brainGamePlayHours * 3600) / 60)
    var brainGamePlaySeconds = Math.floor(totalSeconds - brainGamePlayHours * 3600 - brainGamePlayMinutes * 60)
    this.setData({
      playHours: brainGamePlayHours,
      playMinutes: brainGamePlayMinutes,
      playSeconds: brainGamePlaySeconds,
    })

    //把常玩游戏的顺序给调整
    var tempReform = [];
    for (var i = 0; i < that.data.oftenPlayGames.length; i++) {
      var id = that.data.oftenPlayGames[i].id
      var enName = that.data.oftenPlayGames[i].enName
      var playTimeIndex = enName + "_play_time"
      var playTime = app.globalData[playTimeIndex]
      tempReform.push({
        id,
        enName,
        playTime
      })
    }

    //冒泡排序
    for (var i = 0; i < tempReform.length - 1; i++) {
      var flag = true; //设定一个标记，若为true，则表示此次循环没有进行交换，也就是待排序列已经有序，排序已然完成。
      for (var j = 0; j < tempReform.length - 1 - i; j++) {
        if (tempReform[j].playTime < tempReform[j + 1].playTime) {
          var tmpEnName = tempReform[j + 1].enName
          var tmpPlayTime = tempReform[j + 1].playTime
          tempReform[j + 1].enName = tempReform[j].enName
          tempReform[j + 1].playTime = tempReform[j].playTime
          tempReform[j].enName = tmpEnName
          tempReform[j].playTime = tmpPlayTime
          flag = false;
        }
      }
      if (flag) {
        break;
      }
    }

    // 把游玩时间大的游戏放到数组最前面 / 把游玩时间为0的删除
    var adjustedArray = []
    for(var i = 0 ; i < tempReform.length ; i++){
      if(tempReform[i].playTime != 0){
        for(var j = 0 ; j < oftenPlayGameBackup.length ; j++){
          if(oftenPlayGameBackup[j].enName == tempReform[i].enName){
            adjustedArray[i] = oftenPlayGameBackup[j]
            adjustedArray[i].id = i
          }
        }
      }else{
        tempReform.slice(i,i+1)
      }
    }
    that.setData({
      oftenPlayGames: adjustedArray,
    })
    oftenPlayGameBackup = adjustedArray


    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == "none") {
          wx.showModal({
            title: '网络无连接',
            content: "如果要使用此小程序，需要连接网络",
            showCancel: true,
            cancelText: "重新连接",
            confirmText: "好吧!",
            success(res) {
              if (res.cancel) {
                wx.reLaunch({
                  url: '/pages/mine/mine',
                })
              }
            }
          })
        }
      }
    });


    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    app.fetchInfo();
    //尝试在本地缓存中获取用户信息
    wx.getStorage({
      key: 'nickName',
      success: function (res) {
        that.setData({
          userInfomationText: res.data,
          mineInfoBtnPush: "hide",
          btnPushed: "show",
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
    if (that.data.getAvatarInStorage == false) {
      wx.getStorage({
        key: 'avatarUrl',
        success: function (res) {
          that.setData({
            userAvatar: res.data,
          })
        }
      })
      that.setData({
        getAvatarInStorage: true
      })
    }

    that.setData({
      userLevel: app.globalData.level,
      expPercentage: Math.floor((app.globalData.exp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100
    })

    if (app.globalData.darkMode) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#3d4050',
        animation: {
          duration: 600,
          timingFunc: 'ease'
        }
      })
      for (var i = 0; i < oftenPlayGameBackup.length; i++) {
        if (oftenPlayGameBackup[i].name == "方块记忆") {
          oftenPlayGameBackup[i].img = "/assets/learning/games/rememberWhite.png"
        }
      }
      this.setData({
        overAll: "overAllDark",
        userInfo: "userInfoDark",
        backgroundImage: "backgroundImageDark",
        avatar: "avatarDark",
        userInfomation: "userInfomationDark",
        levelAndExp: "levelAndExpDark",
        level: "levelDark",
        levelNum: "levelNumDark",
        expProgress: "expProgressDark",
        activeColor: "orange",
        progressBGColor: "#3d4050",
        oftenPlayGameWholeView: "oftenPlayGameWholeViewDark",
        settingBlocks: "settingBlocksDark",
        settingText: "settingTextDark",
        setting: "settingDark",
        oftenPlayGame: "oftenPlayGameDark",
        oftenPlayGameItem: "oftenPlayGameItemDark",
        oftenPlayGameName: "oftenPlayGameNameDark",
        oftenPlayGameImgInfo: "oftenPlayGameImgInfoDark",
        playTime: "playTimeDark",
        playTimeInfo: "playTimeInfoDark",
        gameTimeTextColor: "gameTimeTextColorDark",
        continueGameButton: "continueGameButtonDark",
        oftenPlayGames: oftenPlayGameBackup,
        settingView: "settingViewDark",
        settingScroll: "settingScrollDark",
      })
      wx.setBackgroundColor({
        backgroundColor: '#3d4050',
      })
      wx.setTabBarStyle({
        backgroundColor: '#3d4050',
        color: '#ffffff',
        selectedColor: "#ffffff",
        animation: {
          duration: 600,
          timingFunc: 'ease'
        }
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ecf0f3',
        animation: {
          duration: 600,
          timingFunc: 'ease'
        }
      })

      for (var i = 0; i < oftenPlayGameBackup.length; i++) {
        if (oftenPlayGameBackup[i].name == "方块记忆") {
          oftenPlayGameBackup[i].img = "/assets/learning/games/rememberBlack.png"
        }
      }
      this.setData({
        overAll: "overAll",
        userInfo: "userInfo",
        backgroundImage: "backgroundImage",
        avatar: "avatar",
        userInfomation: "userInfomation",
        levelAndExp: "levelAndExp",
        level: "level",
        levelNum: "levelNum",
        expProgress: "expProgress",
        activeColor: "purple",
        progressBGColor: "#ecf0f3",
        oftenPlayGameWholeView: "oftenPlayGameWholeView",
        settingBlocks: "settingBlocks",
        settingText: "settingText",
        setting: "setting",
        oftenPlayGame: "oftenPlayGame",
        oftenPlayGameItem: "oftenPlayGameItem",
        oftenPlayGameName: "oftenPlayGameName",
        oftenPlayGameImgInfo: "oftenPlayGameImgInfo",
        gameTimeTextColor: "gameTimeTextColor",
        playTime: "playTime",
        playTimeInfo: "playTimeInfo",
        continueGameButton: "continueGameButton",
        oftenPlayGames: oftenPlayGameBackup,
        settingView: "settingView",
        settingScroll: "settingScroll",
      })
      wx.setBackgroundColor({
        backgroundColor: '#ecf0f3',
      })
      wx.setTabBarStyle({
        backgroundColor: '#ecf0f3',
        color: '#000000',
        selectedColor: "#447ece",
        animation: {
          duration: 600,
          timingFunc: 'ease'
        }
      })
    }

    this.setData({
      userAvatar: app.globalData.avatar,
      oftenPlayGameNameText: "常玩游戏",
      playTimeInfoPresent: "hide",
    })
    isSelectOftenPlayGame = ""

    
    //“我的”页面中显示组件动画

    var hide = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    })
    var hideShadowView = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    })
    hide.top("100vh").step();
    hideShadowView.opacity(0).step();

    that.setData({
      settingViewAnimation: hide.export(),
      shadowViewAnimation: hideShadowView.export(),
      shadowView: false,
    })

  },


  onHide: function () {


  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },


})