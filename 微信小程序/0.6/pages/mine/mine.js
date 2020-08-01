var app = getApp();
var userAvatarGet = app.globalData.avatar;
var name = app.globalData.name;
var isSelectOftenPlayGame = "";

Page({

  /**
   * 页面的初始数据 
   */

  data: {
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
    sudokuPlayHours: 0,
    sudokuPlayMinutes: 0,
    sudokuPlaySeconds: 0,
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

    oftenPlayGames: [{
        "id": "1",
        "img": "/assets/learning/sudoku.png",
        "name": "数独挑战",
      }
      // ,{
      //   "id": "2",
      //   "img": "",
      // },{
      //   "id": "2",
      //   "img": "",
      // }
    ]

  },

  //点击常玩项目
  oftenPlayGames1() {
    var totalSeconds = app.globalData.sudoku_play_time
    var sudokuPlayHours = Math.floor(totalSeconds / 3600)
    var sudokuPlayMinutes = Math.floor((totalSeconds- sudokuPlayHours * 3600) / 60)
    var sudokuPlaySeconds = Math.floor(totalSeconds - sudokuPlayHours * 3600 - sudokuPlayMinutes * 60)

    this.setData({
      oftenPlayGameNameText: "数独挑战",
      sudokuPlayHours: sudokuPlayHours,
      sudokuPlayMinutes: sudokuPlayMinutes,
      sudokuPlaySeconds: sudokuPlaySeconds,
      playTimeInfoPresent: "show",
    })
    isSelectOftenPlayGame = "The_Sudoku"
  },

  //继续常玩项目
  continueOftenPlayGame(){
    wx.navigateTo({
      url: '/gamePages/'+ isSelectOftenPlayGame + '/' + isSelectOftenPlayGame + '',
    })
    wx.vibrateShort();
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
    wx.vibrateShort();

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
    this.onShow();

  },

  showLoading: function () { //获取用户信息时的等待
    wx.showToast({
      title: '正在努力连接',
      icon: 'loading',
      duration: 10000
    });
    this.onLoad();
  },



  onLoad: function (options) {
    this.app = getApp()
  },


  onReady: function () {

  },


  onShow: function () {

    var that = this;
    wx.vibrateShort();
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
        oftenPlayGame: "oftenPlayGameDark",
        oftenPlayGameItem: "oftenPlayGameItemDark",
        oftenPlayGameName: "oftenPlayGameNameDark",
        oftenPlayGameImgInfo: "oftenPlayGameImgInfoDark",
        playTime: "playTimeDark",
        playTimeInfo: "playTimeInfoDark",
        gameTimeTextColor: "gameTimeTextColorDark",
        continueGameButton: "continueGameButtonDark",
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
        oftenPlayGame: "oftenPlayGame",
        oftenPlayGameItem: "oftenPlayGameItem",
        oftenPlayGameName: "oftenPlayGameName",
        oftenPlayGameImgInfo: "oftenPlayGameImgInfo",
        gameTimeTextColor: "gameTimeTextColor",
        playTime: "playTime",
        playTimeInfo: "playTimeInfo",
        continueGameButton: "continueGameButton",
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
    })

    this.app.slideupshow(this, 'slide_up3', 0, 1)

    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up3', 0, 1)
    }.bind(this), 200);
    //“我的”页面中显示组件动画

    this.app.slideupshow(this, 'slide_up1', -7, 1)

    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up2', -7, 1)
    }.bind(this), 200);

    this.app.slideupshow(this, 'slide_up4', 0, 1)

    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up4', 0, 1)
    }.bind(this), 200);

    //刷新用户在数独上使用的时间
    var totalSeconds = app.globalData.sudoku_play_time
    var sudokuPlayHours = Math.floor(totalSeconds / 3600)
    var sudokuPlayMinutes = Math.floor((totalSeconds- sudokuPlayHours * 3600) / 60)
    var sudokuPlaySeconds = Math.floor(totalSeconds - sudokuPlayHours * 3600 - sudokuPlayMinutes * 60)
    this.setData({
      sudokuPlayHours: sudokuPlayHours,
      sudokuPlayMinutes: sudokuPlayMinutes,
      sudokuPlaySeconds: sudokuPlaySeconds,
    })

  },


  onHide: function () {

    this.app.slideupshow(this, 'slide_up4', 157, 0)
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up4', 157, 0)
    }.bind(this), 200);

    this.app.slideupshow(this, 'slide_up3', -157, 0)
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up3', -157, 0)
    }.bind(this), 200);
    //“我的”页面中隐藏组件动画
    this.app.slideupshow(this, 'slide_up1', 150, 0)
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up2', 150, 0)
    }.bind(this), 200);

  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },


})