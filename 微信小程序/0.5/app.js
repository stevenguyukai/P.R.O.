App({

  globalData: {
    appid: "不能公开",
    secret: "不能公开",

    isGettedInfo: false, //有没有获取用户信息
    avatar: "/assets/Avatar/noAvatar/mineNoAvatar.png",
    name: "请登录",
    userWXavatar: "",
    articleNumber: 0,
    articleSearchText: "",
    darkMode: false,

    code: "",

    id: 0,
    openid: "",
    account: "",
    password: "",
    level: 0,
    exp: 0,
    sudoku_play_time: 0,

  },


  //渐入，渐出实现 
  show: function (that, param, opacity) {
    var animation = wx.createAnimation({
      //持续时间800ms
      duration: 800,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //滑动渐入渐出
  slideupshow: function (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //向右滑动渐入渐出
  sliderightshow: function (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
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
              url: '*****************',

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
                  app.globalData.id = res.data[0].id,
                    app.globalData.openid = res.data[0].OPENID,
                    app.globalData.account = res.data[0].account,
                    app.globalData.password = res.data[0].password,
                    app.globalData.level = res.data[0].level,
                    app.globalData.exp = res.data[0].exp,
                    app.globalData.sudoku_play_time = res.data[0].sudoku_play_time
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

                } else {
                  wx.hideLoading()
                  wx.showModal({
                    title: '请求失败',
                    content: '用户信息获取失败',
                    showCancel: false
                  })
                }
              },
              fail: function (res) {
                wx.hideLoading()
                wx.showModal({
                  title: '请求失败',
                  content: '网络连接失败，请检查',
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
      url: '*****************',

      method: 'GET',
      data: {
        level: app.globalData.level,
        exp: app.globalData.exp,
        sudoku_play_time: app.globalData.sudoku_play_time,
        openid: app.globalData.openid,
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
  }




})
