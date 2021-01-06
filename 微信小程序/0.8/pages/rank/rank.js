var app = getApp();

var category = 1; // 0: 等级榜     1: 脑力榜      2: 时间榜
var barinScoreKind = 0; // 0:总脑力  1:反应力  2:多线处理  3:记忆力   4:逻辑里   5:专注力    6:观察力
var timeGameKind = 0; //  0: 总时间榜   1:数独挑战   2:需要验证  3:方块记忆

// 获取数据库的所有用户数据（用来做排行榜）
function getRankingData(that) {
  wx.showLoading({
      title: '正在更新数据',
      mask: false,
      duration: 3000,
    }),
    wx.login({
      success: res => {
        wx.request({
          url: 'https://gy.hugonglaila.cn/miniprogramServer/fetchRankingServlet',

          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            if (res.data != "fail") {
              wx.hideLoading()
              //收到的结果res里的内容
              app.globalData.allUserData = res.data
              wx.vibrateShort();
              wx.showToast({
                title: '更新数据完成',
                duration: 600,
              })
              ///   所有用户数据数组初始化   ///
              var temArr = app.globalData.allUserData.split("]")[0].substring(2, app.globalData.allUserData.split("]")[0].length)
              var allUserArr = [];
              allUserArr.push({
                openid: temArr.split(",")[0]
              })
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr.push({
                  openid: temArr.split(",")[i].substring(1, temArr.split(",")[i].length),
                  name: "",
                  avatar: "",
                  sudoku_play_time: "",
                  need_verify_play_time: "",
                  brain_memory_play_time: "",
                  react_score: "",
                  multitask_score: "",
                  memory_score: "",
                  logical_score: "",
                  focus_score: "",
                  observation_score: "",
                  level: "",
                })
              }
              ///   所有用户数据数组添加数据   ///
              temArr = app.globalData.allUserData.split("]")[1].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].name = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].name = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }

              temArr = app.globalData.allUserData.split("]")[2].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].avatar = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].avatar = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }

              temArr = app.globalData.allUserData.split("]")[3].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].sudoku_play_time = parseInt(temArr.split(",")[0].substring(1, temArr.split(",")[0].length))
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].sudoku_play_time = parseInt(temArr.split(",")[i].substring(1, temArr.split(",")[i].length))
              }

              temArr = app.globalData.allUserData.split("]")[4].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].need_verify_play_time = parseInt(temArr.split(",")[0].substring(1, temArr.split(",")[0].length))
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].need_verify_play_time = parseInt(temArr.split(",")[i].substring(1, temArr.split(",")[i].length))
              }

              temArr = app.globalData.allUserData.split("]")[5].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].brain_memory_play_time = parseInt(temArr.split(",")[0].substring(1, temArr.split(",")[0].length))
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].brain_memory_play_time = parseInt(temArr.split(",")[i].substring(1, temArr.split(",")[i].length))
              }

              temArr = app.globalData.allUserData.split("]")[6].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].react_score = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].react_score = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }

              temArr = app.globalData.allUserData.split("]")[7].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].multitask_score = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].multitask_score = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }

              temArr = app.globalData.allUserData.split("]")[8].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].memory_score = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].memory_score = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }

              temArr = app.globalData.allUserData.split("]")[9].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].logical_score = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].logical_score = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }

              temArr = app.globalData.allUserData.split("]")[10].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].focus_score = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].focus_score = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }

              temArr = app.globalData.allUserData.split("]")[11].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].observation_score = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].observation_score = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }

              temArr = app.globalData.allUserData.split("]")[12].substring(2, app.globalData.allUserData.split("]")[0].length)
              allUserArr[0].level = temArr.split(",")[0].substring(1, temArr.split(",")[0].length)
              for (var i = 1; i < temArr.split(",").length; i++) {
                allUserArr[i].level = temArr.split(",")[i].substring(1, temArr.split(",")[i].length)
              }
              app.globalData.allUserData = allUserArr
              ////////////////////////////////
              // 把 app.globalData.allUserData 转成 总脑力值排行
              var allUserData = app.globalData.allUserData
              var rankedArr = []
              // 去除没有上传微信名字的账号
              for (var l = 0; l < allUserData.length; l++) {
                if (allUserData[l].name != "null") {
                  rankedArr.push(allUserData[l])
                }
              }
              // 剩下用户中每个脑力值为null的量都变为0
              for (var l = 0; l < rankedArr.length; l++) {
                if (rankedArr[l].focus_score == "null") {
                  rankedArr[l].focus_score = "0"
                }
                if (rankedArr[l].logical_score == "null") {
                  rankedArr[l].logical_score = "0"
                }
                if (rankedArr[l].memory_score == "null") {
                  rankedArr[l].memory_score = "0"
                }
                if (rankedArr[l].multitask_score == "null") {
                  rankedArr[l].multitask_score = "0"
                }
                if (rankedArr[l].observation_score == "null") {
                  rankedArr[l].observation_score = "0"
                }
                if (rankedArr[l].react_score == "null") {
                  rankedArr[l].react_score = "0"
                }
              }

              that.setData({
                allUserInfoArr: rankedArr,
              })


              // 以脑力榜--总脑力值为排序
              var rankedArrBackup = rankedArr
              for (var i = 0; i < rankedArrBackup.length - 1; i++) {
                //每轮比较次数，次数=长度-1-此时的轮数
                for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
                  // 前一位的总脑力值
                  var previousTotal = parseInt(rankedArrBackup[j].focus_score.split("|")[0]) + parseInt(rankedArrBackup[j].logical_score.split("|")[0]) + parseInt(rankedArrBackup[j].memory_score.split("|")[0]) + parseInt(rankedArrBackup[j].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[j].observation_score.split("|")[0]) + parseInt(rankedArrBackup[j].react_score.split("|")[0])
                  // 后一位的总脑力值
                  var afterTotal = parseInt(rankedArrBackup[j + 1].focus_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].logical_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].memory_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].observation_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].react_score.split("|")[0])

                  if (previousTotal < afterTotal) {
                    var temp = rankedArrBackup[j];
                    rankedArrBackup[j] = rankedArrBackup[j + 1];
                    rankedArrBackup[j + 1] = temp;
                  }
                }
              }
              var newTotalBrainRankArray = []
              for (var i = 0; i < rankedArrBackup.length; i++) {
                if (parseInt(rankedArrBackup[i].focus_score.split("|")[0]) + parseInt(rankedArrBackup[i].logical_score.split("|")[0]) + parseInt(rankedArrBackup[i].memory_score.split("|")[0]) + parseInt(rankedArrBackup[i].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[i].observation_score.split("|")[0]) + parseInt(rankedArrBackup[i].react_score.split("|")[0]) > 0) {
                  newTotalBrainRankArray.push({
                    rank: i + 1,
                    name: rankedArrBackup[i].name,
                    avatarUrl: rankedArrBackup[i].avatar,
                    score: parseInt(rankedArrBackup[i].focus_score.split("|")[0]) + parseInt(rankedArrBackup[i].logical_score.split("|")[0]) + parseInt(rankedArrBackup[i].memory_score.split("|")[0]) + parseInt(rankedArrBackup[i].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[i].observation_score.split("|")[0]) + parseInt(rankedArrBackup[i].react_score.split("|")[0]),
                    openid: rankedArrBackup[i].openid,
                  })
                }
              }
              // 显示 排行榜 
              that.setData({
                totalBrainRankArray: newTotalBrainRankArray
              })

              // 显示 自己分数 
              for (var i = 0; i < newTotalBrainRankArray.length; i++) {
                if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
                  that.setData({
                    mineRankNum: i + 1,
                    mineRankScore: newTotalBrainRankArray[i].score
                  })
                }
              }

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
              content: '连接失败',
              showCancel: false
            })
          }
        })

      }
    })
}

Page({

  data: {
    blackWhiteViewBase: "background: #3d4050",
    blackWhiteViewPlain: "background: #3d4050",
    blackWhiteView: "box-shadow: 4px 4px 4px #222, -4px -4px 4px #777;background-color: #3d4050;",
    blackWhiteViewMini: "box-shadow: 2px 2px 2px #222, -2px -2px 2px #777;background-color: #3d4050;",
    blackWhiteViewInset: "box-shadow: inset 4px 4px 4px #222, inset -4px -4px 4px #777;background-color: #3d4050;",
    blackWhiteViewInsetMini: "box-shadow: inset 2px 2px 2px #222, inset -2px -2px 2px #777;background-color: #3d4050;",
    blackWhiteText: "color: #ecf0f3",

    brainRankOpacity: "opacity: 1; margin-top: 0vh",
    timeRankOpacity: "opacity: 0; margin-top: -50vh",

    mineRankNum: 1,
    mineRankScore: 600,
    mineScoreTitle: "我的分数",

    allUserInfoArr: [],

    gameKindArray: [{
      id: 0,
      name: "总时间榜",
      imgUrl: "/assets/learning/summaryBrainScore.png",
      style: "border-top: 3px solid #f9d395; border-bottom: 3px solid #f9d395",
    }, {
      id: 1,
      name: "数独挑战",
      imgUrl: "/assets/learning/sudoku.png",
      style: "",
    }, {
      id: 2,
      name: "需要验证",
      imgUrl: "/assets/learning/game5/icon.png",
      style: "",
    }, {
      id: 3,
      name: "方块记忆",
      imgUrl: "/assets/learning/games/rememberWhite.png",
      style: "",
    }],

    brainScoreKindArray: [{
      id: 0,
      name: "总脑力值",
      imgUrl: "/assets/learning/summaryBrainScore.png",
      style: "border-top: 3px solid #f9d395; border-bottom: 3px solid #f9d395",
    }, {
      id: 1,
      name: "反应力值",
      imgUrl: "/assets/learning/react.png",
      style: "",
    }, {
      id: 2,
      name: "多线处理",
      imgUrl: "/assets/learning/multitask.png",
      style: "",
    }, {
      id: 3,
      name: "记忆力值",
      imgUrl: "/assets/learning/memory.png",
      style: "",
    }, {
      id: 4,
      name: "逻辑力值",
      imgUrl: "/assets/learning/logical.png",
      style: "",
    }, {
      id: 5,
      name: "专注力值",
      imgUrl: "/assets/learning/focus.png",
      style: "",
    }, {
      id: 6,
      name: "观察力值",
      imgUrl: "/assets/learning/observation.png",
      style: "",
    }],

    totalBrainRankArray: [{
      rank: 1,
      name: "TEST",
      avatarUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1565488928,3313343177&fm=26&gp=0.jpg",
      score: 600,
      openid: "testtesttesttest",
    }, {
      rank: 2,
      name: "TEST",
      avatarUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1565488928,3313343177&fm=26&gp=0.jpg",
      score: 600,
      openid: "testtesttesttesttest",
    }],
  },

  //点击等级榜
  levelRankTap() {
    var hide = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    var show = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    var showBottom = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var showRankArea = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    if (category == 1) {
      hide.opacity(0).step();
      show.opacity(1).step();
      this.setData({
        brainRankHighLightAnimation: hide.export(),
        levelRankHighLightAnimation: show.export(),
        brainRankOpacity: "opacity: 0; margin-top: -50vh",
        timeRankOpacity: "opacity: 0; margin-top: -50vh",
      })
    } else if (category == 2) {
      hide.opacity(0).step();
      show.opacity(1).step();
      this.setData({
        timeRankHighLightAnimation: hide.export(),
        levelRankHighLightAnimation: show.export(),
        brainRankOpacity: "opacity: 0; margin-top: -50vh",
        timeRankOpacity: "opacity: 0; margin-top: -50vh",
      })
    }
    showBottom.translateY("-15vh").step();
    showRankArea.height("73vh").step();
    this.setData({
      bottomViewAnimation: showBottom.export(),
      bottomRankingViewAnimation: showRankArea.export(),
      mineScoreTitle: "我的等级",
    })
    category = 0; // 0: 等级榜     1: 脑力榜      2: 时间榜
    barinScoreKind = -1; //  -1:无  0:总脑力  1:反应力  2:多线处理  3:记忆力   4:逻辑里   5:专注力    6:观察力  
    timeGameKind = -1; //  -1:无 0:数独挑战   1:需要验证   2:方块记忆

    var rankedArrBackup = this.data.allUserInfoArr
    for (var i = 0; i < rankedArrBackup.length - 1; i++) {
      //每轮比较次数，次数=长度-1-此时的轮数
      for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
        // 前一位的等级
        var previousTotal = parseInt(rankedArrBackup[j].level)
        // 后一位的等级
        var afterTotal = parseInt(rankedArrBackup[j + 1].level)

        if (previousTotal < afterTotal) {
          var temp = rankedArrBackup[j];
          rankedArrBackup[j] = rankedArrBackup[j + 1];
          rankedArrBackup[j + 1] = temp;
        }
      }
    }

    var newTotalBrainRankArray = []
    for (var i = 0; i < rankedArrBackup.length; i++) {
      if (parseInt(rankedArrBackup[i].level) > 0) {
        newTotalBrainRankArray.push({
          rank: i + 1,
          name: rankedArrBackup[i].name,
          avatarUrl: rankedArrBackup[i].avatar,
          score: parseInt(rankedArrBackup[i].level) + "级",
          openid: rankedArrBackup[i].openid,
        })
      }
    }

    // 显示 排行榜 
    this.setData({
      totalBrainRankArray: newTotalBrainRankArray
    })

    // 显示 自己分数 
    var testCount = 0
    for (var i = 0; i < newTotalBrainRankArray.length; i++) {
      if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
        testCount++
        this.setData({
          mineRankNum: i + 1,
          mineRankScore: newTotalBrainRankArray[i].score
        })
      }
    }
    if (testCount == 0) {
      this.setData({
        mineRankNum: "无",
        mineRankScore: "无",
      })
    }
  },

  //点击脑力榜
  brainRankTap() {
    var hide = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    var show = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    var hideBottom = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var hideRankArea = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    hideBottom.translateY("0vh").step();
    hideRankArea.height("58vh").step();
    if (category == 0) {
      hide.opacity(0).step();
      show.opacity(1).step();
      this.setData({
        levelRankHighLightAnimation: hide.export(),
        brainRankHighLightAnimation: show.export(),
        brainRankOpacity: "opacity: 1; margin-top: 0vh",
        timeRankOpacity: "opacity: 0; margin-top: -50vh",
      })
    } else if (category == 2) {
      hide.opacity(0).step();
      show.opacity(1).step();
      this.setData({
        timeRankHighLightAnimation: hide.export(),
        brainRankHighLightAnimation: show.export(),
        brainRankOpacity: "opacity: 1; margin-top: 0vh",
        timeRankOpacity: "opacity: 0; margin-top: -50vh",
      })
    }
    this.setData({
      bottomViewAnimation: hideBottom.export(),
      bottomRankingViewAnimation: hideRankArea.export(),
      mineScoreTitle: "我的分数",
    })
    category = 1; // 0: 等级榜     1: 脑力榜      2: 时间榜
    barinScoreKind = 0; //  -1:无  0:总脑力  1:反应力  2:多线处理  3:记忆力   4:逻辑里   5:专注力    6:观察力  
    timeGameKind = -1; //  -1:无 0:数独挑战   1:需要验证   2:方块记忆

    var tapId = 0
    var backupBrainScoreKindArray = this.data.brainScoreKindArray
    for (var i = 0; i < this.data.brainScoreKindArray.length; i++) {
      if (this.data.brainScoreKindArray[i].id == tapId) {
        backupBrainScoreKindArray[i].style = "border-top: 3px solid #f9d395; border-bottom: 3px solid #f9d395"
      } else {
        backupBrainScoreKindArray[i].style = ""
      }
    }
    this.setData({
      brainScoreKindArray: backupBrainScoreKindArray
    })

    var rankedArrBackup = this.data.allUserInfoArr
    for (var i = 0; i < rankedArrBackup.length - 1; i++) {
      //每轮比较次数，次数=长度-1-此时的轮数
      for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
        // 前一位的总脑力值
        var previousTotal = parseInt(rankedArrBackup[j].focus_score.split("|")[0]) + parseInt(rankedArrBackup[j].logical_score.split("|")[0]) + parseInt(rankedArrBackup[j].memory_score.split("|")[0]) + parseInt(rankedArrBackup[j].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[j].observation_score.split("|")[0]) + parseInt(rankedArrBackup[j].react_score.split("|")[0])
        // 后一位的总脑力值
        var afterTotal = parseInt(rankedArrBackup[j + 1].focus_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].logical_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].memory_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].observation_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].react_score.split("|")[0])

        if (previousTotal < afterTotal) {
          var temp = rankedArrBackup[j];
          rankedArrBackup[j] = rankedArrBackup[j + 1];
          rankedArrBackup[j + 1] = temp;
        }
      }
    }
    var newTotalBrainRankArray = []
    for (var i = 0; i < rankedArrBackup.length; i++) {
      if (parseInt(rankedArrBackup[i].focus_score.split("|")[0]) + parseInt(rankedArrBackup[i].logical_score.split("|")[0]) + parseInt(rankedArrBackup[i].memory_score.split("|")[0]) + parseInt(rankedArrBackup[i].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[i].observation_score.split("|")[0]) + parseInt(rankedArrBackup[i].react_score.split("|")[0]) > 0) {
        newTotalBrainRankArray.push({
          rank: i + 1,
          name: rankedArrBackup[i].name,
          avatarUrl: rankedArrBackup[i].avatar,
          score: parseInt(rankedArrBackup[i].focus_score.split("|")[0]) + parseInt(rankedArrBackup[i].logical_score.split("|")[0]) + parseInt(rankedArrBackup[i].memory_score.split("|")[0]) + parseInt(rankedArrBackup[i].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[i].observation_score.split("|")[0]) + parseInt(rankedArrBackup[i].react_score.split("|")[0]),
          openid: rankedArrBackup[i].openid,
        })
      }
    }
    // 显示 排行榜 
    this.setData({
      totalBrainRankArray: newTotalBrainRankArray
    })

    // 显示 自己分数 
    for (var i = 0; i < newTotalBrainRankArray.length; i++) {
      if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
        this.setData({
          mineRankNum: i + 1,
          mineRankScore: newTotalBrainRankArray[i].score
        })
      }
    }
    barinScoreKind = 0
  },

  //点击时间榜
  timeRankTap() {
    var hide = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    var show = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    var hideBottom = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    var hideRankArea = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    hideBottom.translateY("0vh").step();
    hideRankArea.height("58vh").step();
    if (category == 0) {
      hide.opacity(0).step();
      show.opacity(1).step();
      this.setData({
        levelRankHighLightAnimation: hide.export(),
        timeRankHighLightAnimation: show.export(),
        brainRankOpacity: "opacity: 0; margin-top: -50vh",
        timeRankOpacity: "opacity: 1; margin-top: 0vh",
      })
    } else if (category == 1) {
      hide.opacity(0).step();
      show.opacity(1).step();
      this.setData({
        brainRankHighLightAnimation: hide.export(),
        timeRankHighLightAnimation: show.export(),
        brainRankOpacity: "opacity: 0; margin-top: -50vh",
        timeRankOpacity: "opacity: 1; margin-top: 0vh",
      })
    }
    this.setData({
      bottomViewAnimation: hideBottom.export(),
      bottomRankingViewAnimation: hideRankArea.export(),
      mineScoreTitle: "我的时间",
    })
    category = 2; // 0: 等级榜     1: 脑力榜      2: 时间榜
    barinScoreKind = -1; //  -1:无  0:总脑力  1:反应力  2:多线处理  3:记忆力   4:逻辑里   5:专注力    6:观察力  
    timeGameKind = 0; //  -1:无  0: 总时间  1:数独挑战   2:需要验证   2:方块记忆

    var tapId = 0
    var backupBrainScoreKindArray = this.data.gameKindArray
    for (var i = 0; i < this.data.gameKindArray.length; i++) {
      if (this.data.gameKindArray[i].id == tapId) {
        backupBrainScoreKindArray[i].style = "border-top: 3px solid #f9d395; border-bottom: 3px solid #f9d395"
      } else {
        backupBrainScoreKindArray[i].style = ""
      }
    }
    this.setData({
      gameKindArray: backupBrainScoreKindArray
    })
    var rankedArrBackup = this.data.allUserInfoArr
    for (var i = 0; i < rankedArrBackup.length - 1; i++) {
      //每轮比较次数，次数=长度-1-此时的轮数
      for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
        // 前一位的总时间值
        var previousTotal = parseInt(rankedArrBackup[j].sudoku_play_time) + parseInt(rankedArrBackup[j].need_verify_play_time) + parseInt(rankedArrBackup[j].brain_memory_play_time)
        // 后一位的总时间值
        var afterTotal = parseInt(rankedArrBackup[j + 1].sudoku_play_time) + parseInt(rankedArrBackup[j + 1].need_verify_play_time) + parseInt(rankedArrBackup[j + 1].brain_memory_play_time)

        if (previousTotal < afterTotal) {
          var temp = rankedArrBackup[j];
          rankedArrBackup[j] = rankedArrBackup[j + 1];
          rankedArrBackup[j + 1] = temp;
        }
      }
    }
    var newTotalBrainRankArray = []
    for (var i = 0; i < rankedArrBackup.length; i++) {
      var temTime = parseInt(rankedArrBackup[i].sudoku_play_time) + parseInt(rankedArrBackup[i].need_verify_play_time) + parseInt(rankedArrBackup[i].brain_memory_play_time)
      if (Math.floor(temTime / 360) / 10 > 0) {
        newTotalBrainRankArray.push({
          rank: i + 1,
          name: rankedArrBackup[i].name,
          avatarUrl: rankedArrBackup[i].avatar,
          score: Math.floor(temTime / 360) / 10 + "H",
          openid: rankedArrBackup[i].openid,
        })
      }
    }
    // 显示 排行榜 
    this.setData({
      totalBrainRankArray: newTotalBrainRankArray
    })

    // 显示 自己分数 
    var testCount = 0
    for (var i = 0; i < newTotalBrainRankArray.length; i++) {
      if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
        testCount++
        this.setData({
          mineRankNum: i + 1,
          mineRankScore: newTotalBrainRankArray[i].score
        })
      }
    }
    if (testCount == 0) {
      this.setData({
        mineRankNum: "无",
        mineRankScore: "无",
      })
    }
    timeGameKind = 0
  },

  //点击子目录
  brainScoreKindTap(e) {
    var tapId = e.currentTarget.id
    var backupBrainScoreKindArray = this.data.brainScoreKindArray
    for (var i = 0; i < this.data.brainScoreKindArray.length; i++) {
      if (this.data.brainScoreKindArray[i].id == tapId) {
        backupBrainScoreKindArray[i].style = "border-top: 3px solid #f9d395; border-bottom: 3px solid #f9d395"
      } else {
        backupBrainScoreKindArray[i].style = ""
      }
    }
    this.setData({
      brainScoreKindArray: backupBrainScoreKindArray
    })

    // 更新排行榜--以选中的类别进行分类
    if (e.currentTarget.id == 0 && barinScoreKind != 0) { // 总脑力值
      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的总脑力值
          var previousTotal = parseInt(rankedArrBackup[j].focus_score.split("|")[0]) + parseInt(rankedArrBackup[j].logical_score.split("|")[0]) + parseInt(rankedArrBackup[j].memory_score.split("|")[0]) + parseInt(rankedArrBackup[j].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[j].observation_score.split("|")[0]) + parseInt(rankedArrBackup[j].react_score.split("|")[0])
          // 后一位的总脑力值
          var afterTotal = parseInt(rankedArrBackup[j + 1].focus_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].logical_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].memory_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].observation_score.split("|")[0]) + parseInt(rankedArrBackup[j + 1].react_score.split("|")[0])

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        if (parseInt(rankedArrBackup[i].focus_score.split("|")[0]) + parseInt(rankedArrBackup[i].logical_score.split("|")[0]) + parseInt(rankedArrBackup[i].memory_score.split("|")[0]) + parseInt(rankedArrBackup[i].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[i].observation_score.split("|")[0]) + parseInt(rankedArrBackup[i].react_score.split("|")[0]) > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: parseInt(rankedArrBackup[i].focus_score.split("|")[0]) + parseInt(rankedArrBackup[i].logical_score.split("|")[0]) + parseInt(rankedArrBackup[i].memory_score.split("|")[0]) + parseInt(rankedArrBackup[i].multitask_score.split("|")[0]) + parseInt(rankedArrBackup[i].observation_score.split("|")[0]) + parseInt(rankedArrBackup[i].react_score.split("|")[0]),
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      barinScoreKind = 0
    } else if (e.currentTarget.id == 1 && barinScoreKind != 1) { // 反应力值
      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的反应力值
          var previousTotal = parseInt(rankedArrBackup[j].react_score.split("|")[0])
          // 后一位的反应力值
          var afterTotal = parseInt(rankedArrBackup[j + 1].react_score.split("|")[0])

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        if (parseInt(rankedArrBackup[i].react_score.split("|")[0]) > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: parseInt(rankedArrBackup[i].react_score.split("|")[0]),
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      barinScoreKind = 1
    } else if (e.currentTarget.id == 2 && barinScoreKind != 2) { // 多线处理
      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的反应力值
          var previousTotal = parseInt(rankedArrBackup[j].multitask_score.split("|")[0])
          // 后一位的反应力值
          var afterTotal = parseInt(rankedArrBackup[j + 1].multitask_score.split("|")[0])

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        if (parseInt(rankedArrBackup[i].multitask_score.split("|")[0]) > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: parseInt(rankedArrBackup[i].multitask_score.split("|")[0]),
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      barinScoreKind = 2
    } else if (e.currentTarget.id == 3 && barinScoreKind != 3) { // 记忆力值
      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的反应力值
          var previousTotal = parseInt(rankedArrBackup[j].memory_score.split("|")[0])
          // 后一位的反应力值
          var afterTotal = parseInt(rankedArrBackup[j + 1].memory_score.split("|")[0])

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        if (parseInt(rankedArrBackup[i].memory_score.split("|")[0]) > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: parseInt(rankedArrBackup[i].memory_score.split("|")[0]),
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      barinScoreKind = 3
    } else if (e.currentTarget.id == 4 && barinScoreKind != 4) { // 逻辑力值
      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的反应力值
          var previousTotal = parseInt(rankedArrBackup[j].logical_score.split("|")[0])
          // 后一位的反应力值
          var afterTotal = parseInt(rankedArrBackup[j + 1].logical_score.split("|")[0])

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        if (parseInt(rankedArrBackup[i].logical_score.split("|")[0]) > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: parseInt(rankedArrBackup[i].logical_score.split("|")[0]),
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      barinScoreKind = 4
    } else if (e.currentTarget.id == 5 && barinScoreKind != 5) { // 专注力值

      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的反应力值
          var previousTotal = parseInt(rankedArrBackup[j].focus_score.split("|")[0])
          // 后一位的反应力值
          var afterTotal = parseInt(rankedArrBackup[j + 1].focus_score.split("|")[0])

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        if (parseInt(rankedArrBackup[i].focus_score.split("|")[0]) > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: parseInt(rankedArrBackup[i].focus_score.split("|")[0]),
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      barinScoreKind = 5
    } else if (e.currentTarget.id == 6 && barinScoreKind != 6) { // 观察力值
      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的反应力值
          var previousTotal = parseInt(rankedArrBackup[j].observation_score.split("|")[0])
          // 后一位的反应力值
          var afterTotal = parseInt(rankedArrBackup[j + 1].observation_score.split("|")[0])

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        if (parseInt(rankedArrBackup[i].observation_score.split("|")[0]) > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: parseInt(rankedArrBackup[i].observation_score.split("|")[0]),
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      barinScoreKind = 6
    }
  },
  gameKindTap(e) {
    var tapId = e.currentTarget.id
    var backupGameKindArray = this.data.gameKindArray
    for (var i = 0; i < this.data.gameKindArray.length; i++) {
      if (this.data.gameKindArray[i].id == tapId) {
        backupGameKindArray[i].style = "border-top: 3px solid #f9d395; border-bottom: 3px solid #f9d395"
      } else {
        backupGameKindArray[i].style = ""
      }
    }
    this.setData({
      gameKindArray: backupGameKindArray
    })

    if (e.currentTarget.id == 0 && timeGameKind != 0) { // 总时间值
      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的总时间值
          var previousTotal = parseInt(rankedArrBackup[j].sudoku_play_time) + parseInt(rankedArrBackup[j].need_verify_play_time) + parseInt(rankedArrBackup[j].brain_memory_play_time)
          // 后一位的总时间值
          var afterTotal = parseInt(rankedArrBackup[j + 1].sudoku_play_time) + parseInt(rankedArrBackup[j + 1].need_verify_play_time) + parseInt(rankedArrBackup[j + 1].brain_memory_play_time)

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        var temTime = parseInt(rankedArrBackup[i].sudoku_play_time) + parseInt(rankedArrBackup[i].need_verify_play_time) + parseInt(rankedArrBackup[i].brain_memory_play_time)
        if (Math.floor(temTime / 360) / 10 > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: Math.floor(temTime / 360) / 10 + "H",
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      timeGameKind = 0
    } else if (e.currentTarget.id == 1 && timeGameKind != 1) { //数独挑战时间

      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的时间值
          var previousTotal = parseInt(rankedArrBackup[j].sudoku_play_time)
          // 后一位的时间值
          var afterTotal = parseInt(rankedArrBackup[j + 1].sudoku_play_time)

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        var temTime = parseInt(rankedArrBackup[i].sudoku_play_time)
        if (Math.floor(temTime / 360) / 10 > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: Math.floor(temTime / 360) / 10 + "H",
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      timeGameKind = 1
    } else if (e.currentTarget.id == 2 && timeGameKind != 2) { //需要验证时间

      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的时间值
          var previousTotal = parseInt(rankedArrBackup[j].need_verify_play_time)
          // 后一位的时间值
          var afterTotal = parseInt(rankedArrBackup[j + 1].need_verify_play_time)

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        var temTime = parseInt(rankedArrBackup[i].need_verify_play_time)
        if (Math.floor(temTime / 360) / 10 > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: Math.floor(temTime / 360) / 10 + "H",
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      timeGameKind = 2
    } else if (e.currentTarget.id == 3 && timeGameKind != 3) { //方块记忆时间

      var rankedArrBackup = this.data.allUserInfoArr
      for (var i = 0; i < rankedArrBackup.length - 1; i++) {
        //每轮比较次数，次数=长度-1-此时的轮数
        for (var j = 0; j < rankedArrBackup.length - 1 - i; j++) {
          // 前一位的时间值
          var previousTotal = parseInt(rankedArrBackup[j].brain_memory_play_time)
          // 后一位的时间值
          var afterTotal = parseInt(rankedArrBackup[j + 1].brain_memory_play_time)

          if (previousTotal < afterTotal) {
            var temp = rankedArrBackup[j];
            rankedArrBackup[j] = rankedArrBackup[j + 1];
            rankedArrBackup[j + 1] = temp;
          }
        }
      }
      var newTotalBrainRankArray = []
      for (var i = 0; i < rankedArrBackup.length; i++) {
        var temTime = parseInt(rankedArrBackup[i].brain_memory_play_time)
        if (Math.floor(temTime / 360) / 10 > 0) {
          newTotalBrainRankArray.push({
            rank: i + 1,
            name: rankedArrBackup[i].name,
            avatarUrl: rankedArrBackup[i].avatar,
            score: Math.floor(temTime / 360) / 10 + "H",
            openid: rankedArrBackup[i].openid,
          })
        }
      }
      // 显示 排行榜 
      this.setData({
        totalBrainRankArray: newTotalBrainRankArray
      })

      // 显示 自己分数 
      var testCount = 0
      for (var i = 0; i < newTotalBrainRankArray.length; i++) {
        if (newTotalBrainRankArray[i].openid == app.globalData.openid) {
          testCount++
          this.setData({
            mineRankNum: i + 1,
            mineRankScore: newTotalBrainRankArray[i].score
          })
        }
      }
      if (testCount == 0) {
        this.setData({
          mineRankNum: "无",
          mineRankScore: "无",
        })
      }
      timeGameKind = 3
    }
  },




  onLoad: function (options) {
    this.app = getApp()
    // 如果用户没有上传名字或者头像，则上传
    app.uploadUserInfo();
  },


  onReady: function () {

  },


  onShow: function () {
    // 测试数据
    // app.globalData.permanentLogicalScore += 100
    // app.globalData.permanentReactScore += 200
    // app.globalData.permanentMemoryScore += 300
    // app.globalData.permanentMultitaskScore += 400
    // app.globalData.permanentFocusScore += 500
    // app.globalData.permanentObservationScore += 600

    // 上传用户数据
    app.updateBrainScore("React", 0)
    app.updateBrainScore("Logical", 0)
    app.updateBrainScore("Memory", 0)
    app.updateBrainScore("Multitask", 0)
    app.updateBrainScore("Focus", 0)
    app.updateBrainScore("Observation", 0)
    app.updateInfo()

    //app.decompressBrainScore()
    // console.log(app.globalData.temReactScore)
    // console.log(app.globalData.permanentReactScore)

    // console.log(app.globalData.integrateLogicalScore)
    // console.log(app.globalData.integrateReactScore)
    // console.log(app.globalData.integrateMemoryScore)
    // console.log(app.globalData.integrateMultitaskScore)
    // console.log(app.globalData.integrateFocusScore)
    // console.log(app.globalData.integrateObservationScore)

    //黑暗模式切换
    if (app.globalData.darkMode) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#3d4050',
      })
      var changeGameKindArray = this.data.gameKindArray
      changeGameKindArray[3].imgUrl = "/assets/learning/games/rememberWhite.png"
      this.setData({
        gameKindArray: changeGameKindArray,
        blackWhiteViewBase: "background: #3d4050",
        blackWhiteViewPlain: "background: #3d4050",
        blackWhiteView: "box-shadow: 4px 4px 4px #222, -4px -4px 4px #777;background-color: #3d4050;",
        blackWhiteViewMini: "box-shadow: 2px 2px 2px #222, -2px -2px 2px #777;background-color: #3d4050;",
        blackWhiteViewInset: "box-shadow: inset 4px 4px 4px #222, inset -4px -4px 4px #777;background-color: #3d4050;",
        blackWhiteViewInsetMini: "box-shadow: inset 2px 2px 2px #222, inset -2px -2px 2px #777;background-color: #3d4050;",
        blackWhiteText: "color: #ecf0f3",
        avatar: app.globalData.avatar,
      })
      wx.setBackgroundColor({
        backgroundColor: '#3d4050',
      })
      wx.setTabBarStyle({
        backgroundColor: '#3d4050',
        color: '#ffffff',
        selectedColor: "#ffffff",
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ecf0f3',
      })
      var changeGameKindArray = this.data.gameKindArray
      changeGameKindArray[3].imgUrl = "/assets/learning/games/rememberBlack.png"
      this.setData({
        gameKindArray: changeGameKindArray,
        blackWhiteViewBase: "background: #ecf0f3",
        blackWhiteViewPlain: "background: #ecf0f3",
        blackWhiteView: "box-shadow: 6px 6px 6px #d1d9e6, -6px -6px 6px #fff; background-color: #ecf0f3;",
        blackWhiteViewMini: "box-shadow: 2px 2px 2px #d1d9e6, -2px -2px 2px #fff;background-color: #ecf0f3;",
        blackWhiteViewInset: "box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #fff;background-color: #ecf0f3;",
        blackWhiteViewInsetMini: "box-shadow: inset 2px 2px 2px #d1d9e6, inset -2px -2px 2px #fff;background-color: #ecf0f3;",
        blackWhiteText: "color: #5e6473",
        avatar: app.globalData.avatar,
      })
      wx.setBackgroundColor({
        backgroundColor: '#ecf0f3',
      })
      wx.setTabBarStyle({
        backgroundColor: '#ecf0f3',
        color: '#000000',
        selectedColor: "#447ece",
      })
    }

    if (app.globalData.isGettedInfo == true) {
      // 获取所有用户数据
      getRankingData(this)

      // 初始化所有排行榜设置
      this.brainRankTap()
      var tapId = 0
      var backupBrainScoreKindArray = this.data.brainScoreKindArray
      for (var i = 0; i < this.data.brainScoreKindArray.length; i++) {
        if (this.data.brainScoreKindArray[i].id == tapId) {
          backupBrainScoreKindArray[i].style = "border-top: 3px solid #f9d395; border-bottom: 3px solid #f9d395"
        } else {
          backupBrainScoreKindArray[i].style = ""
        }
      }
      this.setData({
        brainScoreKindArray: backupBrainScoreKindArray
      })

    } else {
      wx.showModal({
        title: '请授权',
        content: '如需数据统计并开启「经验功能」「排行榜功能」「保存数据功能」，需要您的授权',
        showCancel: true,
        cancelText: "下次一定",
        cancelColor: "#dddddd",
        confirmText: "去授权",
        success(res) {
          if (res.confirm) {
            wx: wx.switchTab({
              url: '/pages/mine/mine',
              success: (res) => {
                wx.showToast({
                  icon: "none",
                  title: '授权登陆',
                })
              },
            })
          }
          else {
            wx: wx.switchTab({
              url: '/pages/learning/learning',
            })
          }
        }
      })
    }

  },


  onHide: function () {

  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },


  onShareAppMessage: function () {

  }
})