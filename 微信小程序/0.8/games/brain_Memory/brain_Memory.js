var app = getApp()
var gameMode = ""
var blockQuantityWidth = 0
var blockQuantityHeight = 0
var timeCount

//不同难度的图片
var easyPic = "https://assets-ouch.icons8.com/thumb/866/7387d6d9-81eb-405c-854f-d73b00b8e789.png"
var middlePic = "https://assets-ouch.icons8.com/thumb/260/d6b985f4-a663-4d44-a4c9-655e04bb8e1b.png"
var hardPic = "https://assets-ouch.icons8.com/thumb/883/692df9a7-d400-49c9-a00d-de972eae7197.png"
var epicPic = "https://assets-ouch.icons8.com/thumb/58/3ee5a5ab-9990-4b50-a3b0-ff71ee4df456.png"

//添加格子
function addBlock(that, id) {
    let blocks = that.data.blocks
    blocks.push({
        "id": id,
        "available": false,
        "blockBgColor": "#ecf0f3"
    });
    that.setData({
        blocks: blocks
    })
}

//开始游戏
function gameStart(that) {
    //判断难度，确定随机出现方块的数量比例
    if (gameMode == "easy") {
        blockQuantityWidth = (Math.round(Math.random(1) * 10) + 1) % 2 + 3 //宽度可能数量：5*4  5*3
        blockQuantityHeight = (Math.round(Math.random(1) * 10) + 1) % 2 + 3 //高度可能数量：5*4  5*3
        that.setData({
            singleBlockWidth: (90 - (blockQuantityWidth + 1) * 2.2) / blockQuantityWidth + "vw",
            singleBlockHeight: (90 - (blockQuantityWidth + 1) * 2.2) / blockQuantityWidth + "vw",
            singleBlockLeft: 2.2 + "vw",
            singleBlockTop: 2.2 + "vw",
            blocksViewLeftJustify: "-2.2vw",
            blockShadowPx: "5",
        })
    } else if (gameMode == "middle") {
        blockQuantityWidth = (Math.round(Math.random(1) * 10) + 2) % 3 + 3 //宽度可能数量：4*5  3*4  3*3
        blockQuantityHeight = (Math.round(Math.random(1) * 10) + 2) % 3 + 3 //高度可能数量：4*5  3*4  3*3
        that.setData({
            singleBlockWidth: (90 - (blockQuantityWidth + 1) * 1.8) / blockQuantityWidth + "vw",
            singleBlockHeight: (90 - (blockQuantityWidth + 1) * 1.8) / blockQuantityWidth + "vw",
            singleBlockLeft: 1.8 + "vw",
            singleBlockTop: 1.8 + "vw",
            blocksViewLeftJustify: "-1.8vw",
            blockShadowPx: "4",
        })
    } else if (gameMode == "hard") {
        blockQuantityWidth = (Math.round(Math.random(1) * 10) + 2) % 3 + 4 //宽度可能数量：4*6  3*5  3*4
        blockQuantityHeight = (Math.round(Math.random(1) * 10) + 2) % 3 + 4 //高度可能数量：4*6  3*5  3*4
        that.setData({
            singleBlockWidth: (90 - (blockQuantityWidth + 1) * 2) / blockQuantityWidth + "vw",
            singleBlockHeight: (90 - (blockQuantityWidth + 1) * 2) / blockQuantityWidth + "vw",
            singleBlockLeft: 2 + "vw",
            singleBlockTop: 2 + "vw",
            blocksViewLeftJustify: "-2vw",
            blockShadowPx: "3",
        })
    } else if (gameMode == "epic") {
        blockQuantityWidth = (Math.round(Math.random(1) * 10) + 1) % 3 + 5 //宽度可能数量：3*7  4*6  3*5
        blockQuantityHeight = (Math.round(Math.random(1) * 10) + 1) % 3 + 5 //高度可能数量：3*7  4*6  3*5
        that.setData({
            singleBlockWidth: (90 - (blockQuantityWidth + 1)) / blockQuantityWidth + "vw",
            singleBlockHeight: (90 - (blockQuantityWidth + 1)) / blockQuantityWidth + "vw",
            singleBlockLeft: 1 + "vw",
            singleBlockTop: 1 + "vw",
            blocksViewLeftJustify: "-1vw",
            blockShadowPx: "2",
        })
    }

    //添加相对应的格子数量
    for (var i = 0; i < blockQuantityWidth * blockQuantityHeight; i++) {
        addBlock(that, i);
    }

    setTimeout(() => {
        // 消失下一回合提示
        that.setData({
            noteNextRoundShow: "none",
        })
    }, 2300);


    //显示有颜色的格子
    showColoredBlock(that, blockQuantityWidth * blockQuantityHeight)

}

//显示有颜色的格子
function showColoredBlock(that, num) {
    var coloredNum = 0
    if (gameMode == "easy") {
        coloredNum = 3 + Math.round((num - 9) / 4)
    } else if (gameMode == "middle") {
        coloredNum = 3 + Math.round((num - 9) / 3)
    } else if (gameMode == "hard") {
        coloredNum = 5 + Math.round((num - 16) / 4)
    } else if (gameMode == "epic") {
        coloredNum = 10 + Math.round((num - 36) / 6)
    }

    var blocks = that.data.blocks
    //设置一个有变换颜色的blocks数组
    var colorChangeBlocks = []
    for (var j = 0; j < blocks.length; j++) {
        colorChangeBlocks.push(blocks[j])
    }

    setTimeout(() => {
        //随机把格子变成有颜色的
        var totalNum = num
        for (var i = 0; i < coloredNum; i++) {
            var index = Math.floor(Math.random(1) * totalNum)
            if (blocks[index].blockBgColor != "orange") {
                blocks[index].blockBgColor = "orange"
                colorChangeBlocks[index].blockBgColor = "orange"
            } else {
                i--
            }
            totalNum--
        }

        that.setData({
            blocksWithColorChanged: colorChangeBlocks, //把有颜色的格子储存在 blocksWithColorChanged
        })


        setTimeout(() => {
            //展现颜色
            setTimeout(() => {
                var animationList = that.data.animationList.slice()
                var turnToBack = wx.createAnimation({
                    duration: 1000,
                    timingFunction: 'linear',
                })
                that.turnToBack = turnToBack
                for (var i = 0; i < num; i++) {
                    turnToBack.rotateY(180).step()
                    animationList[i] = turnToBack.export()
                }
                that.setData({
                    animationList: animationList
                })

                setTimeout(() => {
                    //显示有颜色的
                    that.setData({
                        blocks: blocks
                    })
                }, 500);

            }, 500);

            //隐藏颜色
            setTimeout(() => {
                var animationList = that.data.animationList.slice()
                var turnToFront = wx.createAnimation({
                    duration: 1000,
                    timingFunction: 'linear',
                })
                that.turnToFront = turnToFront
                for (var i = 0; i < num; i++) {
                    turnToFront.rotateY(0).step()
                    animationList[i] = turnToFront.export()
                }
                that.setData({
                    animationList: animationList
                })

                //设置一个没有变换颜色的blocks数组
                var noColorChangeBlocks = []
                for (var j = 0; j < blocks.length; j++) {
                    noColorChangeBlocks.push({
                        "id": j,
                        "available": true,
                        "blockBgColor": "#ecf0f3"
                    });
                }

                setTimeout(() => {
                    //隐藏颜色的
                    that.setData({
                        blocks: noColorChangeBlocks,
                        tapBlcoksAvailability: "auto",
                    })
                }, 500);


            }, that.data.showColorTime + 1700);

        }, 1700);

    }, 50);
}

//总结页面启动
function summaryPageLaunch(that) {

    //停止计时
    stopRecordTime()

    var wrongPerCount = Math.round((that.data.wrongNum / that.data.roundNum) * 100);
    var correctPerCount = Math.round((that.data.rightNum / that.data.roundNum) * 100);
    if (correctPerCount == 1 || correctPerCount == 2) {
        correctPerCount = 0
    }
    if (wrongPerCount == 1 || wrongPerCount == 2) {
        wrongPerCount = 0
    }
    that.setData({
        summaryPage: "block",
        gamePage: "none",
    })
    var wrongAnimation = setInterval(() => {
        if (that.data.wrongNum >= wrongPerCount - 1) {
            clearInterval(wrongAnimation)
        }
        if (wrongPerCount != 0) {
            that.setData({
                wrongNum: that.data.wrongNum + 1,
            })
        }
        that.wrongCircle = that.selectComponent("#wrongCircle");
        that.wrongCircle.showCanvasRing();
    }, 30);
    var rightAnimation = setInterval(() => {
        if (that.data.rightNum >= correctPerCount - 1) {
            clearInterval(rightAnimation)
        }
        if (correctPerCount != 0) {
            that.setData({
                rightNum: that.data.rightNum + 1,
            })
        }
        that.correctCircle = that.selectComponent("#correctCircle");
        that.correctCircle.showCanvasRing();
    }, 30);


    if (app.globalData.isGettedInfo == true) {
        ///////////////////////////// 经验条动画 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        var addExp = 0;
        var isFull = false;
        var excessExp = 0;
        var brainScoreIncreaseRate = 1;
        var EXPShow = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease',
        })
        var EXPHide = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease',
        })
        EXPShow.top(0).step();
        EXPHide.top(-70).step();
        //设置每种模式的经验值
        if (gameMode == "easy") {
            addExp = 15 + that.data.rightNum * 15 + that.data.wrongNum * 1
            brainScoreIncreaseRate = 1
        }
        if (gameMode == "middle") {
            addExp = 15 + that.data.rightNum * 20 + that.data.wrongNum * 2
            brainScoreIncreaseRate = 1.1
        }
        if (gameMode == "hard") {
            addExp = 25 + that.data.rightNum * 30 + that.data.wrongNum * 3
            brainScoreIncreaseRate = 1.38
        }
        if (gameMode == "epic") {
            addExp = 35 + that.data.rightNum * 45 + that.data.wrongNum * 4
            brainScoreIncreaseRate = 1.68
        }
        //更新各个脑力值数据
        app.updateBrainScore("Memory", 14 * brainScoreIncreaseRate + 1 * that.data.rightNum - 1 * that.data.wrongNum * brainScoreIncreaseRate)
        app.updateBrainScore("Focus", 8 * brainScoreIncreaseRate + 1 * that.data.rightNum - 0.6 * that.data.wrongNum * brainScoreIncreaseRate)
        app.updateBrainScore("Observation", 5 * brainScoreIncreaseRate + 1 * that.data.rightNum - 0.4 * that.data.wrongNum * brainScoreIncreaseRate)

        //判断是否升级
        if ((app.globalData.exp + addExp) >= (200 * Math.pow(1.25, app.globalData.level))) {
            excessExp = (app.globalData.exp + addExp) - (200 * Math.pow(1.25, app.globalData.level))
            isFull = true
            addExp = addExp - excessExp
        }

        //加上经验值的动画（未升级）
        var addExpPercentage = Math.floor((app.globalData.exp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100 + Math.floor((addExp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100

        that.setData({
            EXPandLEVEL: EXPShow.export(),
        })
        setTimeout(() => {
            that.setData({
                userLevel: app.globalData.level,
                expPercentage: addExpPercentage,
            })
        }, 500);

        //一段时间后如果是升级的，那么就再做一次经验动画
        var addExcessExpPercentage = 0;
        setTimeout(() => {
            if (isFull) {
                addExcessExpPercentage = Math.floor((excessExp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100
                that.setData({
                    userLevel: app.globalData.level + 1,
                    expPercentage: 0
                })
                that.setData({
                    expPercentage: addExcessExpPercentage
                })
                app.globalData.level = app.globalData.level + 1
                wx.setStorageSync('sqlLevel', app.globalData.level)
                app.globalData.exp = Math.round(excessExp)
                wx.setStorageSync('sqlExp', app.globalData.exp)
                app.globalData.brain_memory_play_time = (app.globalData.brain_memory_play_time + that.data.play_time),
                    wx.setStorageSync('sqlBrain_memory_play_time', app.globalData.brain_memory_play_time)
                isFull = false
                that.setData({
                    play_time: 0,
                })
                //更新数据库的数据
                app.updateInfo()
            } else {
                app.globalData.exp = Math.round(app.globalData.exp + addExp + excessExp)
                wx.setStorageSync('sqlExp', app.globalData.exp)
                app.globalData.brain_memory_play_time = (app.globalData.brain_memory_play_time + that.data.play_time),
                    wx.setStorageSync('sqlBrain_memory_play_time', app.globalData.brain_memory_play_time)
                that.setData({
                    play_time: 0,
                })
                //更新数据库的数据
                app.updateInfo()
            }
        }, addExpPercentage * 30);


        //最后收回经验条
        setTimeout(() => {
            that.setData({
                EXPandLEVEL: EXPHide.export(),
            })
        }, (addExcessExpPercentage * 30 + addExpPercentage * 30 + 2000));

        /////////////////////////////////////////////////////////////////////////////
    } else {
        wx.showModal({
            title: '请授权',
            content: '如需保存数据并开启「经验功能」「排行榜功能」「数据统计功能」，需要您的授权',
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
            }
        })
    }
    
    setTimeout(() => {
        that.setData({
            endPageAnimationFinish: true,
        })
    }, 3000);
}

//开始计时
function startRecordTime(that) {
    timeCount = setInterval(() => {
        that.setData({
            play_time: that.data.play_time + 1,
        })
    }, 1000);
}

//停止计时
function stopRecordTime() {
    clearInterval(timeCount)
}

Page({

    data: {
        selectButton1: "selectButton1",
        selectButton2: "selectButton2",
        selectButton3: "selectButton3",
        selectButton4: "selectButton4",

        developerPic: "https://assets-ouch.icons8.com/thumb/517/5cded9ca-7152-4d6e-b2ba-604701c6979b.png",
        modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
        mode: "请选择难度",

        gamePage: "none",

        countDownNum: 3,
        countDownView: "flex",

        blocksViewDisplay: "none",

        // 单个格子放置地
        blocks: [],
        animationList: [], //这是数组 存放动画
        blocksWithColorChanged: [], // 数组储存有颜色的格子

        // 单个格子属性
        singleBlockWidth: "100px",
        singleBlockHeight: "100px",
        singleBlockLeft: "2vw",
        singleBlockTop: "2vw",
        blocksViewLeftJustify: "",
        blockShadowPx: "",

        //对错
        rightORwrong: "✅",
        rightNum: 0,
        wrongNum: 0,

        //回合数
        roundNum: 0,
        nowRoundNum: 1,

        noteNextRoundShow: "none",
        summaryPage: "none",
        bigPerSize: wx.getSystemInfoSync().windowWidth * 0.33,

        tapBlcoksAvailability: "auto",

        // 展现有颜色格子持续时间
        showColorTime: 0,

        expPercentage: Math.floor((app.globalData.exp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100,

        // 游玩时间
        play_time: 0,

        endPageAnimationFinish: false,
    },

    //模式选择
    easy() {
        gameMode = "easy"
        this.setData({
            mode: "进入简单模式",
            modePic: easyPic,
            selectButton1: "selectButton1Select",
            selectButton2: "selectButton2",
            selectButton3: "selectButton3",
            selectButton4: "selectButton4",
        })
    },
    middle() {
        gameMode = "middle"
        this.setData({
            mode: "进入普通模式",
            modePic: middlePic,
            selectButton1: "selectButton1",
            selectButton2: "selectButton2Select",
            selectButton3: "selectButton3",
            selectButton4: "selectButton4",
        })
    },
    hard() {
        gameMode = "hard"
        this.setData({
            mode: "进入困难模式",
            modePic: hardPic,
            selectButton1: "selectButton1",
            selectButton2: "selectButton2",
            selectButton3: "selectButton3Select",
            selectButton4: "selectButton4",
        })
    },
    epic() {
        gameMode = "epic"
        this.setData({
            mode: "进入噩梦模式",
            modePic: epicPic,
            selectButton1: "selectButton1",
            selectButton2: "selectButton2",
            selectButton3: "selectButton3",
            selectButton4: "selectButton4Select",
        })
    },


    //进入游戏
    getIntoGame() {
        if (gameMode == "easy" || gameMode == "middle" || gameMode == "hard" || gameMode == "epic") {
            if (gameMode == "easy") {
                this.setData({
                    welcomePage: "none",
                    gamePage: "block",
                    isDisabled: "ture",
                    roundNum: 3,
                    showColorTime: 300,
                })
                //修改页面信息
                wx.setNavigationBarTitle({
                    title: '方块记忆（简）'
                })
            } else if (gameMode == "middle") {
                this.setData({
                    welcomePage: "none",
                    gamePage: "block",
                    isDisabled: "ture",
                    roundNum: 4,
                    showColorTime: 500,
                })
                //修改页面信息
                wx.setNavigationBarTitle({
                    title: '方块记忆（普）'
                })
            } else if (gameMode == "hard") {
                this.setData({
                    welcomePage: "none",
                    gamePage: "block",
                    isDisabled: "ture",
                    roundNum: 5,
                    showColorTime: 1200,
                })
                //修改页面信息
                wx.setNavigationBarTitle({
                    title: '方块记忆（难）'
                })
            } else if (gameMode == "epic") {
                this.setData({
                    welcomePage: "none",
                    gamePage: "block",
                    isDisabled: "ture",
                    roundNum: 6,
                    showColorTime: 2000,
                })
                //修改页面信息
                wx.setNavigationBarTitle({
                    title: '方块记忆（噩）'
                })
            }

            //开始计时
            startRecordTime(this)

            //重置选择难度页面
            this.setData({
                selectButton1: "selectButton1",
                selectButton2: "selectButton2",
                selectButton3: "selectButton3",
                selectButton4: "selectButton4",
                modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
                mode: "请选择难度",
                summaryPage: "none",
                rightNum: 0,
                wrongNum: 0,
                play_time: 0,
            })

            //重置数据
            this.setData({
                blocks: [],
                animationList: [],
                blocksWithColorChanged: [],
            })

            var that = this

            // 倒计时动画
            var affecting = wx.createAnimation({
                duration: 800,
                timingFunction: 'ease',
            })
            affecting.scale(1.8).opacity(0).step()
            that.setData({
                countDownEffect: affecting.export(),
            })


            var countDownInterval = setInterval(() => {
                //倒计时结束关闭
                if (that.data.countDownNum == 1) {
                    affecting.scale(1).opacity(1).step({
                        duration: 0,
                        transformOrigin: "50%,50%",
                        timingFunction: 'linear',
                    })
                    that.setData({
                        countDownView: "none",
                        blocksViewDisplay: "block",
                        countDownEffect: affecting.export(),
                    })
                    clearInterval(countDownInterval);
                } else {
                    if (that.data.countDownNum == 2) {
                        gameStart(that);
                    }
                    //倒计时继续
                    affecting.scale(1).opacity(1).step({
                        duration: 0,
                        transformOrigin: "50%,50%",
                        timingFunction: 'linear'
                    })
                    that.setData({
                        countDownView: "flex",
                        countDownNum: that.data.countDownNum - 1,
                        countDownEffect: affecting.export(),
                    })
                    setTimeout(() => {
                        affecting.scale(1.8).opacity(0).step({
                            duration: 800,
                            transformOrigin: "50%,50%",
                            timingFunction: 'ease'
                        })
                        that.setData({
                            countDownEffect: affecting.export(),
                        })
                    }, 50);
                }
            }, 950);
        } else {
            wx.showToast({
                title: '请选择难度',
                icon: "none",
            })
        }
    },


    // 当某个格子被点击
    blockTap(e) {
        var tapTargetId = e.target.dataset.clearid // tapTargetId  是被点击格子的ID

        //给下面动画用的
        var suddenHide = wx.createAnimation({
            duration: 600,
            timingFunction: 'ease',
        })
        if (this.data.blocks[tapTargetId].available == true) {
            //  点击正确的格子
            if (this.data.blocksWithColorChanged[tapTargetId].blockBgColor == "orange") {
                var animationList = this.data.animationList.slice()
                var turnToBack = wx.createAnimation({
                    duration: 400,
                    timingFunction: 'linear',
                })
                this.turnToBack = turnToBack
                turnToBack.rotateY(180).step()
                animationList[tapTargetId] = turnToBack.export()
                this.setData({
                    animationList: animationList
                })

                //把数组中的被点击的颜色显示
                var mockBlock = this.data.blocks
                mockBlock[tapTargetId].blockBgColor = "orange"
                mockBlock[tapTargetId].available = false

                //把数组中原来储存有颜色的被点击格子变成空白色
                var mockBlock2 = this.data.blocksWithColorChanged
                mockBlock2[tapTargetId].blockBgColor = "#ecf0f3"
                setTimeout(() => {
                    this.setData({
                        blocks: mockBlock,
                        blocksWithColorChanged: mockBlock2,
                    })
                }, 200);

                //判断是否都点到了
                var count = 0
                for (var i = 0; i < this.data.blocksWithColorChanged.length; i++) {
                    if (this.data.blocksWithColorChanged[i].blockBgColor == "orange") {
                        count++
                    }
                }
                if (count == 0) {
                    //已完成
                    var correctShow = wx.createAnimation({
                        duration: 600,
                        timingFunction: 'ease',
                    })
                    correctShow.opacity(1).step()
                    var correctHide = wx.createAnimation({
                        duration: 600,
                        timingFunction: 'ease',
                    })
                    correctHide.opacity(0).step()
                    this.setData({
                        rightORwrong: "✅",
                        rightNum: this.data.rightNum + 1,
                        rightOrWrongAnimation: correctShow.export(),
                        tapBlcoksAvailability: "none",
                    })
                    setTimeout(() => {
                        this.setData({
                            rightOrWrongAnimation: correctHide.export(),
                        })
                    }, 500);

                    // 判断是否为最后一回合，如果不是，则开始下一回合
                    setTimeout(() => {
                        if (this.data.nowRoundNum >= this.data.roundNum) {
                            //结束动画
                            summaryPageLaunch(this)

                        } else {
                            //下回合,并清除上一回合的数据
                            this.setData({
                                blocks: [],
                                animationList: [],
                                blocksWithColorChanged: [],
                                nowRoundNum: this.data.nowRoundNum + 1,
                                // 显示下一回合提示
                                noteNextRoundShow: "flex",
                            })
                            var textShow = wx.createAnimation({
                                duration: 600,
                                timingFunction: 'ease',
                            })
                            textShow.opacity(1).step()
                            suddenHide.opacity(0).step()
                            this.setData({
                                noteNextRoundAnimation: textShow.export(),
                                tapBlcoksAvailability: "auto",
                            })
                            setTimeout(() => {
                                this.setData({
                                    noteNextRoundAnimation: suddenHide.export(),
                                })
                            }, 2000);
                            gameStart(this)
                        }
                    }, 400);
                }
            } else {
                // 点击错误的格子
                var animationList = this.data.animationList.slice()
                var turnToBack = wx.createAnimation({
                    duration: 400,
                    timingFunction: 'linear',
                })
                this.turnToBack = turnToBack
                turnToBack.rotateY(180).step()
                animationList[tapTargetId] = turnToBack.export()
                this.setData({
                    animationList: animationList,
                })

                //把数组中的被点击的颜色显示
                var mockBlock = this.data.blocks
                mockBlock[tapTargetId].blockBgColor = "red"
                setTimeout(() => {
                    this.setData({
                        blocks: mockBlock
                    })
                }, 200);
                var wrongShow = wx.createAnimation({
                    duration: 600,
                    timingFunction: 'ease',
                })
                wrongShow.opacity(1).step()
                var wrongHide = wx.createAnimation({
                    duration: 400,
                    timingFunction: 'ease',
                })
                wrongHide.opacity(0).step()
                this.setData({
                    rightORwrong: "❌",
                    wrongNum: this.data.wrongNum + 1,
                    rightOrWrongAnimation: wrongShow.export(),
                    tapBlcoksAvailability: "none",
                })
                setTimeout(() => {
                    this.setData({
                        rightOrWrongAnimation: wrongHide.export(),
                    })
                }, 500);

                setTimeout(() => {
                    // 判断是否为最后一回合，如果不是，则开始下一回合
                    if (this.data.nowRoundNum >= this.data.roundNum) {
                        //结束动画
                        summaryPageLaunch(this)

                    } else {
                        //下回合,并清除上一回合的数据
                        this.setData({
                            blocks: [],
                            animationList: [],
                            blocksWithColorChanged: [],
                            nowRoundNum: this.data.nowRoundNum + 1,
                            // 显示下一回合提示
                            noteNextRoundShow: "flex",
                        })
                        var textShow = wx.createAnimation({
                            duration: 600,
                            timingFunction: 'ease',
                        })
                        textShow.opacity(1).step()
                        suddenHide.opacity(0).step()

                        this.setData({
                            noteNextRoundAnimation: textShow.export(),
                            tapBlcoksAvailability: "auto",
                        })
                        setTimeout(() => {
                            this.setData({
                                noteNextRoundAnimation: suddenHide.export(),
                            })
                        }, 2000);
                        gameStart(this)

                    }
                }, 400);
            }
        }
    },


    //在总结页面点击了确认按钮
    confirmGameEnd() {
        if (this.data.endPageAnimationFinish) {
            this.setData({
                summaryPage: "none",
                welcomePage: "block",
                gamePage: "none",
                endPageAnimationFinish: false,
            })
            //重置数据
            wx.setNavigationBarTitle({
                title: '方块记忆'
            })
            gameMode = ""
            this.setData({
                selectButton1: "selectButton1",
                selectButton2: "selectButton2",
                selectButton3: "selectButton3",
                selectButton4: "selectButton4",
                developerPic: "https://assets-ouch.icons8.com/thumb/517/5cded9ca-7152-4d6e-b2ba-604701c6979b.png",
                modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
                mode: "请选择难度",
                rightNum: 0,
                wrongNum: 0,
                nowRoundNum: 1,
                countDownNum: 4,
            })
        }
    },


    //教程按钮点击
    goToTour() {
        wx.navigateTo({
            url: '/tourPage/brainMemoryTour/brainMemoryTour',
        })
    },






    /*生命周期函数--监听页面加载*/
    onLoad: function (options) {

    },

    /*生命周期函数--监听页面初次渲染完成*/
    onReady: function () {

    },

    /*生命周期函数--监听页面显示*/
    onShow: function () {
        var that = this
        wx.getStorage({
            key: 'easyPic',
            success: function (res) {
                easyPic = res.data
            },
            fail: function (res) {
                easyPic = "https://assets-ouch.icons8.com/thumb/866/7387d6d9-81eb-405c-854f-d73b00b8e789.png"
            }
        })
        wx.getStorage({
            key: 'middlePic',
            success: function (res) {
                middlePic = res.data
            },
            fail: function (res) {
                middlePic = "https://assets-ouch.icons8.com/thumb/260/d6b985f4-a663-4d44-a4c9-655e04bb8e1b.png"
            }
        })
        wx.getStorage({
            key: 'hardPic',
            success: function (res) {
                hardPic = res.data
            },
            fail: function (res) {
                hardPic = "https://assets-ouch.icons8.com/thumb/883/692df9a7-d400-49c9-a00d-de972eae7197.png"
            }
        })
        wx.getStorage({
            key: 'epicPic',
            success: function (res) {
                epicPic = res.data
            },
            fail: function (res) {
                epicPic = "https://assets-ouch.icons8.com/thumb/58/3ee5a5ab-9990-4b50-a3b0-ff71ee4df456.png"
            }
        })
        wx.getStorage({
            key: 'developer',
            success: function (res) {
                that.setData({
                    developerPic: res.data
                })
            },
            fail: function (res) {
                that.setData({
                    developerPic: "https://assets-ouch.icons8.com/thumb/517/5cded9ca-7152-4d6e-b2ba-604701c6979b.png"
                })
            }
        })
    },

    /*生命周期函数--监听页面隐藏*/
    onHide: function () {
        gameMode = ""
        stopRecordTime() //停止计时
    },

    /*生命周期函数--监听页面卸载*/
    onUnload: function () {
        gameMode = ""
        stopRecordTime() //停止计时
    },

    /*页面相关事件处理函数--监听用户下拉动作*/
    onPullDownRefresh: function () {

    },

    /*页面上拉触底事件的处理函数*/
    onReachBottom: function () {

    },

    /*用户点击右上角分享*/
    onShareAppMessage: function () {

    }
})