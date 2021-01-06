var app = getApp();

App({

  globalData: {
    appid: "wx43cdb1bcc40005a2",
    secret: "dc0d05de5404b7cbc43835b09f92fee6",

    isGettedInfo: false, //有没有获取用户信息
    avatar: "/assets/Avatar/noAvatar/mineNoAvatar.png",
    name: "请登录",
    userWXavatar: "",
    articleNumber: 0,
    articleSearchText: "",
    darkMode: false,
    vibration: true,

    code: "",

    id: 0,
    openid: "",
    account: "",
    password: "",
    level: 0,
    exp: 0,
    sudoku_play_time: 0,
    need_verify_play_time: 0,
    brain_memory_play_time: 0,

    // 脑力值数据
    permanentTotalBrainScore: 600,

    permanentReactScore: 100,
    permanentMultitaskScore: 100,
    permanentMemoryScore: 100,
    permanentLogicalScore: 100,
    permanentFocusScore: 100,
    permanentObservationScore: 100,

    temReactScore: [{
        indexDate: "", //最新更新日期
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
    ],
    temMultitaskScore: [{
        indexDate: "", //最新更新日期
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
    ],
    temMemoryScore: [{
        indexDate: "", //最新更新日期
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
    ],
    temLogicalScore: [{
        indexDate: "", //最新更新日期
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
    ],
    temFocusScore: [{
        indexDate: "", //最新更新日期
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
    ],
    temObservationScore: [{
        indexDate: "", //最新更新日期
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      },
      {
        date: "",
        score: 0,
        originScore: 0,
      }, {
        date: "",
        score: 0,
        originScore: 0,
      },
    ],
 
    integrateReactScore: "",
    integrateMultitaskScore: "",
    integrateMemoryScore: "",
    integrateLogicalScore: "",
    integrateFocusScore: "",
    integrateObservationScore: "",

    //\\ 没太多用变量 //\\
    // 1. 日期加减1
    dateNeedBeAddOne: "",
    dateNeedBeMinusOne: "",
    // 2. 永暗永亮
    everDarkMode: false,
    everLightMode: false,
    darkLightAuto: true,
    // 3. 服务器
    needUpdateData: false, // 当服务器更新数据后，页面是否要刷新数据考这个变量
    allUserData: "",

  },


  //获取用户详细信息（如果没有自动创建）
  fetchInfo() {
    var that = this
    var app = getApp();
    app.globalData.id = wx.getStorageSync('sqlId')
    app.globalData.openid = wx.getStorageSync('sqlOpenid')
    app.globalData.account = wx.getStorageSync('sqlAccount')
    app.globalData.password = wx.getStorageSync('sqlPassword')
    app.globalData.level = wx.getStorageSync('sqlLevel')
    app.globalData.exp = wx.getStorageSync('sqlExp')
    app.globalData.sudoku_play_time = wx.getStorageSync('sqlSudoku_play_time')
    app.globalData.need_verify_play_time = wx.getStorageSync('sqlNeed_verify_play_time')
    app.globalData.brain_memory_play_time = wx.getStorageSync('sqlBrain_memory_play_time')
    app.globalData.integrateReactScore = wx.getStorageSync('integrateReactScore')
    app.globalData.integrateMultitaskScore = wx.getStorageSync('integrateMultitaskScore')
    app.globalData.integrateMemoryScore = wx.getStorageSync('integrateMemoryScore')
    app.globalData.integrateLogicalScore = wx.getStorageSync('integrateLogicalScore')
    app.globalData.integrateFocusScore = wx.getStorageSync('integrateFocusScore')
    app.globalData.integrateObservationScore = wx.getStorageSync('integrateObservationScore')
    if (app.globalData.openid == "") {
      wx.showLoading({
          title: '正在连接数据库',
          mask: true,
        }),
        wx.login({
          success: res => {
            app.globalData.code = res.code

            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: 'https://gy.hugonglaila.cn/miniprogramServer/fetchServlet',

              method: 'GET',
              data: {
                code: app.globalData.code
              },
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                if (res.data != "fail") {
                  wx.hideLoading()
                  //收到的结果res里的内容
                  app.globalData.id = res.data[0].id
                  app.globalData.openid = res.data[0].OPENID
                  app.globalData.account = res.data[0].account
                  app.globalData.password = res.data[0].password
                  app.globalData.level = res.data[0].level
                  app.globalData.exp = res.data[0].exp
                  app.globalData.sudoku_play_time = res.data[0].sudoku_play_time
                  app.globalData.need_verify_play_time = res.data[0].need_verify_play_time
                  app.globalData.brain_memory_play_time = res.data[0].brain_memory_play_time
                  app.globalData.integrateReactScore = res.data[0].react_score
                  app.globalData.integrateMultitaskScore = res.data[0].multitask_score
                  app.globalData.integrateMemoryScore = res.data[0].memory_score
                  app.globalData.integrateLogicalScore = res.data[0].logical_score
                  app.globalData.integrateFocusScore = res.data[0].focus_score
                  app.globalData.integrateObservationScore = res.data[0].observation_score
                  app.globalData.needUpdateData = true
                  wx.vibrateShort();
                  wx.showToast({
                    title: '成功',
                  })
                  //本地保存用户信息
                  wx.setStorageSync('sqlId', app.globalData.id)
                  wx.setStorageSync('sqlOpenid', app.globalData.openid)
                  wx.setStorageSync('sqlAccount', app.globalData.account)
                  wx.setStorageSync('sqlPassword', app.globalData.password)
                  wx.setStorageSync('sqlLevel', app.globalData.level)
                  wx.setStorageSync('sqlExp', app.globalData.exp)
                  wx.setStorageSync('sqlSudoku_play_time', app.globalData.sudoku_play_time)
                  wx.setStorageSync('sqlNeed_verify_play_time', app.globalData.need_verify_play_time)
                  wx.setStorageSync('sqlBrain_memory_play_time', app.globalData.brain_memory_play_time)
                  wx.setStorageSync('integrateReactScore', app.globalData.integrateReactScore)
                  wx.setStorageSync('integrateMultitaskScore', app.globalData.integrateMultitaskScore)
                  wx.setStorageSync('integrateMemoryScore', app.globalData.integrateMemoryScore)
                  wx.setStorageSync('integrateLogicalScore', app.globalData.integrateLogicalScore)
                  wx.setStorageSync('integrateFocusScore', app.globalData.integrateFocusScore)
                  wx.setStorageSync('integrateObservationScore', app.globalData.integrateObservationScore)

                } else {
                  wx.hideLoading()
                  wx.showModal({
                    title: '请求失败',
                    content: '用户信息获取失败',
                    showCancel: false
                  })
                }
                wx: wx.switchTab({
                  url: '/pages/mine/mine',
                  success: (res) => {
                    wx.showToast({
                      icon: "none",
                      title: '请授权登陆',
                    })
                  },
                })
              },
              fail: function (res) {
                wx.hideLoading()
                wx.showModal({
                  title: '请求失败',
                  content: '连接失败',
                  showCancel: false
                })
              }
            })

          }
        })
    }
  },

  //更新用户数据
  updateInfo() {
    var app = getApp()
    wx.request({
      url: 'https://gy.hugonglaila.cn/miniprogramServer/updateServlet',

      method: 'GET',
      data: {
        level: app.globalData.level,
        exp: app.globalData.exp,
        sudoku_play_time: app.globalData.sudoku_play_time,
        need_verify_play_time: app.globalData.need_verify_play_time,
        brain_memory_play_time: app.globalData.brain_memory_play_time,
        openid: app.globalData.openid,
        react_score: app.globalData.integrateReactScore,
        multitask_score: app.globalData.integrateMultitaskScore,
        memory_score: app.globalData.integrateMemoryScore,
        logical_score: app.globalData.integrateLogicalScore,
        focus_score: app.globalData.integrateFocusScore,
        observation_score: app.globalData.integrateObservationScore,
      },
      header: {
        'content-type': 'application/json'
      },

      fail: function (res) {
        wx.showModal({
          title: '数据上传失败',
          content: '请检查网络连接',
          showCancel: false
        })
      }

    })

  },

  //同步用户服务器数据
  syncData() {
    var that = this
    var app = getApp();
    wx.showLoading({
        title: '正在连接数据库',
        mask: true,
      }),
      wx.login({
        success: res => {
          app.globalData.code = res.code

          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://gy.hugonglaila.cn/miniprogramServer/fetchServlet',

            method: 'GET',
            data: {
              code: app.globalData.code
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if (res.data != "fail") {
                wx.hideLoading()
                //收到的结果res里的内容
                app.globalData.id = res.data[0].id
                app.globalData.openid = res.data[0].OPENID
                app.globalData.account = res.data[0].account
                app.globalData.password = res.data[0].password
                app.globalData.level = res.data[0].level
                app.globalData.exp = res.data[0].exp
                app.globalData.sudoku_play_time = res.data[0].sudoku_play_time
                app.globalData.need_verify_play_time = res.data[0].need_verify_play_time
                app.globalData.brain_memory_play_time = res.data[0].brain_memory_play_time
                app.globalData.integrateReactScore = res.data[0].react_score
                app.globalData.integrateMultitaskScore = res.data[0].multitask_score
                app.globalData.integrateMemoryScore = res.data[0].memory_score
                app.globalData.integrateLogicalScore = res.data[0].logical_score
                app.globalData.integrateFocusScore = res.data[0].focus_score
                app.globalData.integrateObservationScore = res.data[0].observation_score
                app.globalData.needUpdateData = true
                wx.vibrateShort();
                wx.showToast({
                  title: '成功',
                })
                //本地保存用户信息
                wx.setStorageSync('sqlId', app.globalData.id)
                wx.setStorageSync('sqlOpenid', app.globalData.openid)
                wx.setStorageSync('sqlAccount', app.globalData.account)
                wx.setStorageSync('sqlPassword', app.globalData.password)
                wx.setStorageSync('sqlLevel', app.globalData.level)
                wx.setStorageSync('sqlExp', app.globalData.exp)
                wx.setStorageSync('sqlSudoku_play_time', app.globalData.sudoku_play_time)
                wx.setStorageSync('sqlNeed_verify_play_time', app.globalData.need_verify_play_time)
                wx.setStorageSync('sqlBrain_memory_play_time', app.globalData.brain_memory_play_time)
                wx.setStorageSync('integrateReactScore', app.globalData.integrateReactScore)
                wx.setStorageSync('integrateMultitaskScore', app.globalData.integrateMultitaskScore)
                wx.setStorageSync('integrateMemoryScore', app.globalData.integrateMemoryScore)
                wx.setStorageSync('integrateLogicalScore', app.globalData.integrateLogicalScore)
                wx.setStorageSync('integrateFocusScore', app.globalData.integrateFocusScore)
                wx.setStorageSync('integrateObservationScore', app.globalData.integrateObservationScore)
              } else {
                wx.hideLoading()
                wx.showModal({
                  title: '请求失败',
                  content: '用户信息获取失败',
                  showCancel: false
                })
              }
              wx: wx.switchTab({
                url: '/pages/learning/learning',
              })
            },
            fail: function (res) {
              wx.hideLoading()
              wx.showModal({
                title: '请求失败',
                content: '连接失败',
                showCancel: false
              })
            }
          })

        }
      })

    //更新名字和头像
    app.uploadUserInfo()
  },

  //上传用户头像和名字
  uploadUserInfo() {
    var app = getApp();
    //获取现在用户名字和头像
    wx.getUserInfo({
      success: (res) => {
        app.globalData.name = res.userInfo.nickName
        app.globalData.userWXavatar = res.userInfo.avatarUrl
        wx.request({
          url: 'https://gy.hugonglaila.cn/miniprogramServer/uploadBasicInfoServlet',
          method: 'GET',
          data: {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            openid: app.globalData.openid,
          },
          header: {
            'content-type': 'application/json'
          },
        })

      },
    })

  },

  //日期转换成多少天
  transferMonthToDate(month) {
    var dayInMonth = parseInt(month)
    if (dayInMonth == 1) {
      dayInMonth = 0
    } else if (dayInMonth == 2) {
      dayInMonth = 31
    } else if (dayInMonth == 3) {
      dayInMonth = 59
    } else if (dayInMonth == 4) {
      dayInMonth = 90
    } else if (dayInMonth == 5) {
      dayInMonth = 120
    } else if (dayInMonth == 6) {
      dayInMonth = 151
    } else if (dayInMonth == 7) {
      dayInMonth = 181
    } else if (dayInMonth == 8) {
      dayInMonth = 212
    } else if (dayInMonth == 9) {
      dayInMonth = 243
    } else if (dayInMonth == 10) {
      dayInMonth = 273
    } else if (dayInMonth == 11) {
      dayInMonth = 304
    } else if (dayInMonth == 12) {
      dayInMonth = 334
    }
    return dayInMonth
  },

  //更新脑力值数组
  updateBrainScore(brainScoreKind, addScore) {
    var currentTime = new Date()
    var currentYear = currentTime.getFullYear()
    var currentMonth = currentTime.getMonth() + 1
    var currentDay = currentTime.getDate()
    currentYear = "" + currentYear
    currentMonth = "" + currentMonth
    currentDay = "" + currentDay
    if (currentMonth.length == 1) {
      currentMonth = "0" + parseInt(currentMonth)
    }
    if (currentDay.length == 1) {
      currentDay = "0" + parseInt(currentDay)
    }
    var integrateCurrentDate = "" + currentYear + currentMonth + currentDay
    var indexDate = this.globalData["tem" + brainScoreKind + "Score"][0].indexDate //最新更新数据日期
    //如果没有最新更新日期,就新建一个(为当时日期)
    if (indexDate == "" || indexDate == " " || indexDate == null) {
      this.globalData["tem" + brainScoreKind + "Score"][0].indexDate = integrateCurrentDate
      this.globalData["tem" + brainScoreKind + "Score"][1].date = integrateCurrentDate
    }
    //如果最新更新日期与今天日期不符，则将数组日期向后推移并进行数据计算，直到今天
    if (indexDate != integrateCurrentDate) {
      getApp().updateBrainScoreArray(indexDate, integrateCurrentDate, brainScoreKind)
    }

    this.globalData["tem" + brainScoreKind + "Score"][1].score += addScore
    this.globalData["tem" + brainScoreKind + "Score"][1].originScore += addScore

    // 将数组中所有空的元素填充
    for (var q = 1; q <= 14; q++) {
      // 判断为空的数组
      if (this.globalData["tem" + brainScoreKind + "Score"][q].date.length < 6) {
        for (var w = 1; w <= q - 1; w++) {
          if (w == 1) {
            getApp().dateMinusOne(this.globalData["tem" + brainScoreKind + "Score"][1].date)
          } else {
            getApp().dateMinusOne(this.globalData.dateNeedBeMinusOne)
          }
        }
        this.globalData["tem" + brainScoreKind + "Score"][q].date = this.globalData.dateNeedBeMinusOne
        this.globalData.dateNeedBeMinusOne = ""
      }
    }
    // 更新整合脑力值（用来上传服务器）
    this.globalData.integrateReactScore = "" + this.globalData.permanentReactScore + "|" + this.globalData.temReactScore[0].indexDate + "|"
    this.globalData.integrateMultitaskScore = "" + this.globalData.permanentMultitaskScore + "|" + this.globalData.temMultitaskScore[0].indexDate + "|"
    this.globalData.integrateMemoryScore = "" + this.globalData.permanentMemoryScore + "|" + this.globalData.temMemoryScore[0].indexDate + "|"
    this.globalData.integrateLogicalScore = "" + this.globalData.permanentLogicalScore + "|" + this.globalData.temLogicalScore[0].indexDate + "|"
    this.globalData.integrateFocusScore = "" + this.globalData.permanentFocusScore + "|" + this.globalData.temFocusScore[0].indexDate + "|"
    this.globalData.integrateObservationScore = "" + this.globalData.permanentObservationScore + "|" + this.globalData.temObservationScore[0].indexDate + "|"
    for (var c = 1; c <= 14; c++) {
      this.globalData.integrateReactScore = this.globalData.integrateReactScore + this.globalData.temReactScore[c].date + "-" + this.globalData.temReactScore[c].score + "-" + this.globalData.temReactScore[c].originScore + "|"
      this.globalData.integrateMultitaskScore = this.globalData.integrateMultitaskScore + this.globalData.temMultitaskScore[c].date + "-" + this.globalData.temMultitaskScore[c].score + "-" + this.globalData.temMultitaskScore[c].originScore + "|"
      this.globalData.integrateMemoryScore = this.globalData.integrateMemoryScore + this.globalData.temMemoryScore[c].date + "-" + this.globalData.temMemoryScore[c].score + "-" + this.globalData.temMemoryScore[c].originScore + "|"
      this.globalData.integrateLogicalScore = this.globalData.integrateLogicalScore + this.globalData.temLogicalScore[c].date + "-" + this.globalData.temLogicalScore[c].score + "-" + this.globalData.temLogicalScore[c].originScore + "|"
      this.globalData.integrateFocusScore = this.globalData.integrateFocusScore + this.globalData.temFocusScore[c].date + "-" + this.globalData.temFocusScore[c].score + "-" + this.globalData.temFocusScore[c].originScore + "|"
      this.globalData.integrateObservationScore = this.globalData.integrateObservationScore + this.globalData.temObservationScore[c].date + "-" + this.globalData.temObservationScore[c].score + "-" + this.globalData.temObservationScore[c].originScore + "|"
    }
  },

  // 展开数据库中的脑力值字符串为数组
  decompressBrainScore() {
    this.globalData.permanentReactScore = parseInt(this.globalData.integrateReactScore.split("|")[0])
    this.globalData.permanentMultitaskScore = parseInt(this.globalData.integrateMultitaskScore.split("|")[0])
    this.globalData.permanentMemoryScore = parseInt(this.globalData.integrateMemoryScore.split("|")[0])
    this.globalData.permanentLogicalScore = parseInt(this.globalData.integrateLogicalScore.split("|")[0])
    this.globalData.permanentFocusScore = parseInt(this.globalData.integrateFocusScore.split("|")[0])
    this.globalData.permanentObservationScore = parseInt(this.globalData.integrateObservationScore.split("|")[0])

    this.globalData.temReactScore[0].indexDate = this.globalData.integrateReactScore.split("|")[1]
    this.globalData.temMultitaskScore[0].indexDate = this.globalData.integrateMultitaskScore.split("|")[1]
    this.globalData.temMemoryScore[0].indexDate = this.globalData.integrateMemoryScore.split("|")[1]
    this.globalData.temLogicalScore[0].indexDate = this.globalData.integrateLogicalScore.split("|")[1]
    this.globalData.temFocusScore[0].indexDate = this.globalData.integrateFocusScore.split("|")[1]
    this.globalData.temObservationScore[0].indexDate = this.globalData.integrateObservationScore.split("|")[1]

    for (var f = 1; f <= 14; f++) {
      this.globalData.temReactScore[f].date = (this.globalData.integrateReactScore.split("|")[f + 1]).split("-")[0]
      this.globalData.temMultitaskScore[f].date = (this.globalData.integrateMultitaskScore.split("|")[f + 1]).split("-")[0]
      this.globalData.temMemoryScore[f].date = (this.globalData.integrateMemoryScore.split("|")[f + 1]).split("-")[0]
      this.globalData.temLogicalScore[f].date = (this.globalData.integrateLogicalScore.split("|")[f + 1]).split("-")[0]
      this.globalData.temFocusScore[f].date = (this.globalData.integrateFocusScore.split("|")[f + 1]).split("-")[0]
      this.globalData.temObservationScore[f].date = (this.globalData.integrateObservationScore.split("|")[f + 1]).split("-")[0]

      this.globalData.temReactScore[f].score = parseInt((this.globalData.integrateReactScore.split("|")[f + 1]).split("-")[1])
      this.globalData.temMultitaskScore[f].score = parseInt((this.globalData.integrateMultitaskScore.split("|")[f + 1]).split("-")[1])
      this.globalData.temMemoryScore[f].score = parseInt((this.globalData.integrateMemoryScore.split("|")[f + 1]).split("-")[1])
      this.globalData.temLogicalScore[f].score = parseInt((this.globalData.integrateLogicalScore.split("|")[f + 1]).split("-")[1])
      this.globalData.temFocusScore[f].score = parseInt((this.globalData.integrateFocusScore.split("|")[f + 1]).split("-")[1])
      this.globalData.temObservationScore[f].score = parseInt((this.globalData.integrateObservationScore.split("|")[f + 1]).split("-")[1])

      this.globalData.temReactScore[f].originScore = parseInt((this.globalData.integrateReactScore.split("|")[f + 1]).split("-")[2])
      this.globalData.temMultitaskScore[f].originScore = parseInt((this.globalData.integrateMultitaskScore.split("|")[f + 1]).split("-")[2])
      this.globalData.temMemoryScore[f].originScore = parseInt((this.globalData.integrateMemoryScore.split("|")[f + 1]).split("-")[2])
      this.globalData.temLogicalScore[f].originScore = parseInt((this.globalData.integrateLogicalScore.split("|")[f + 1]).split("-")[2])
      this.globalData.temFocusScore[f].originScore = parseInt((this.globalData.integrateFocusScore.split("|")[f + 1]).split("-")[2])
      this.globalData.temObservationScore[f].originScore = parseInt((this.globalData.integrateObservationScore.split("|")[f + 1]).split("-")[2])
    }
  },

  //重新计算脑力值数组中的数据至最新一天
  updateBrainScoreArray(oldDate, newDate, updateArrayName) {
    var app = getApp();
    var dateDifference = parseInt(newDate.substring(0, 4)) * 365 - parseInt(oldDate.substring(0, 4)) * 365 +
      getApp().transferMonthToDate(parseInt(newDate.substring(4, 6))) - getApp().transferMonthToDate(parseInt(oldDate.substring(4, 6))) +
      parseInt(newDate.substring(6, 8)) - parseInt(oldDate.substring(6, 8))

    //如果相差天数大于两个星期
    if (dateDifference + 1 > 14) {
      //把数组中所有值都换算称永久脑力值
      for (var i = 1; i <= 14; i++) {
        this.globalData["permanent" + updateArrayName + "Score"] +=
          Math.floor(this.globalData["tem" + updateArrayName + "Score"][i].score * (Math.round((1 - 0.56 * Math.pow((15 - i) * 24, 0.06)) * 100) / 100))
        this.globalData["tem" + updateArrayName + "Score"][i].score = 0
        this.globalData["tem" + updateArrayName + "Score"][i].originScore = 0
        this.globalData["tem" + updateArrayName + "Score"][i].date = ""
      }

      //新建当前时间数组
      this.globalData["tem" + updateArrayName + "Score"][0].indexDate = newDate
      this.globalData["tem" + updateArrayName + "Score"][1].date = newDate
    } else {
      //重复相差天数次「数组后移」
      for (var i = 1; i <= dateDifference; i++) {

        //====================== 天数 后移 ======================\\
        this.globalData["tem" + updateArrayName + "Score"][14].date = ""
        for (var k = 13; k >= 1; k--) {
          this.globalData["tem" + updateArrayName + "Score"][k + 1].date = this.globalData["tem" + updateArrayName + "Score"][k].date
        }

        this.globalData.dateNeedBeAddOne = this.globalData["tem" + updateArrayName + "Score"][2].date
        app.datePlusOne(this.globalData.dateNeedBeAddOne)

        this.globalData["tem" + updateArrayName + "Score"][1].date = this.globalData.dateNeedBeAddOne
        //=======================================================\\


        //====================== 变动分数 后移 ======================\\
        // 最后一位临时数据转换为永久数据
        var dayDifferenceForLast = 0
        for (var a = 13; a >= 1; a--) {
          if (this.globalData["tem" + updateArrayName + "Score"][a].originScore == 0) {
            dayDifferenceForLast++
          }
        }
        var rawValueBeenTranferLast = this.globalData["tem" + updateArrayName + "Score"][14].originScore * (1 - 0.56 * Math.pow((dayDifferenceForLast / 3) * 24, 0.06))
        this.globalData["permanent" + updateArrayName + "Score"] += Math.round(rawValueBeenTranferLast * 100) / 100
        this.globalData["tem" + updateArrayName + "Score"][14].originScore = 0
        this.globalData["tem" + updateArrayName + "Score"][14].score = 0
        // 其他位数据向后传递一天
        for (var a = 13; a >= 1; a--) {
          //固定值向后传递
          this.globalData["tem" + updateArrayName + "Score"][a + 1].originScore = this.globalData["tem" + updateArrayName + "Score"][a].originScore
          //非固定值向后传递
          var dayDifference = 0 //检查在某个天数前有多少天到有数据的日期
          for (var b = a - 1; b >= 1; b--) {
            if (this.globalData["tem" + updateArrayName + "Score"][b].originScore == 0) {
              dayDifference++
            } else {
              break
            }
          }
          var rawValueBeenTranfer = this.globalData["tem" + updateArrayName + "Score"][a].originScore * (1 - 0.56 * Math.pow(dayDifference * 24, 0.06))
          this.globalData["tem" + updateArrayName + "Score"][a + 1].score = Math.round(rawValueBeenTranfer * 100) / 100
          this.globalData["tem" + updateArrayName + "Score"][a].originScore = 0
          this.globalData["tem" + updateArrayName + "Score"][a].score = 0
        }
        //=======================================================\\
      }
      //更新 「最新更新日期」
      var newestDay = this.globalData["tem" + updateArrayName + "Score"][1].date
      this.globalData["tem" + updateArrayName + "Score"][0].indexDate = newestDay
    }


  },

  //计算日期加一 (20201130 + 1  = 20201201)
  datePlusOne(date) {
    var newDate
    var year = parseInt(date.substring(0, 4))
    var month = parseInt(date.substring(4, 6))
    var day = parseInt(date.substring(6, 8))
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      if (day + 1 > 31) {
        if (month + 1 > 12) {
          year += 1
          month = 1
          day = 1
        } else {
          month += 1
          day = 1
        }
      } else {
        day += 1
      }
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      if (day + 1 > 30) {
        if (month + 1 > 12) {
          year += 1
          month = 1
          day = 1
        } else {
          month += 1
          day = 1
        }
      } else {
        day += 1
      }
    } else if (month == 2) {
      if (day + 1 > 28) {
        month += 1
        day = 1
      } else {
        day += 1
      }
    }

    year = "" + year
    month = "" + month
    day = "" + day
    if (month.length == 1) {
      month = "0" + parseInt(month)
    }
    if (day.length == 1) {
      day = "0" + parseInt(day)
    }
    newDate = "" + year + month + day
    this.globalData.dateNeedBeAddOne = newDate
  },

  //计算日期减一 (20201201 - 1  = 20201130)
  dateMinusOne(date) {
    var newDate
    var year = parseInt(date.substring(0, 4))
    var month = parseInt(date.substring(4, 6))
    var day = parseInt(date.substring(6, 8))
    if (month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11 || month == 1) {
      if (day - 1 <= 0) {
        if (month - 1 <= 0) {
          year -= 1
          month = 12
          day = 31
        } else {
          month -= 1
          day = 31
        }
      } else {
        day -= 1
      }
    } else if (month == 5 || month == 7 || month == 10 || month == 12) {
      if (day - 1 <= 0) {
        if (month - 1 <= 0) {
          year -= 1
          month = 12
          day = 31
        } else {
          month -= 1
          day = 30
        }
      } else {
        day -= 1
      }
    } else if (month == 3) {
      if (day - 1 <= 0) {
        month -= 1
        day = 28
      } else {
        day -= 1
      }
    }

    year = "" + year
    month = "" + month
    day = "" + day
    if (month.length == 1) {
      month = "0" + parseInt(month)
    }
    if (day.length == 1) {
      day = "0" + parseInt(day)
    }
    newDate = "" + year + month + day
    this.globalData.dateNeedBeMinusOne = newDate
  },



})