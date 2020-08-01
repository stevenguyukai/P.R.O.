var isInGame = false
var password = ""
var companyNameRandom = ""
var companyNameAll = ["吃了么外卖", "丑团外卖", "逆丰快递", "千度知道", "万度知道", "Appie", "Gooogle", "大米手机", "四星手机", "华威手机", "六个核弹", "好朋友派", "粤利粤", "Adidoss", "汁付宝", "京西购物", "OPPPO手机", "VOVI手机", "网难云音乐", "Nick Just Do It", "腾慢视频", "pp音乐", "拼少少", "京西购物"]
var randomString = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "K", "k", "L", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"]
var randomNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var verifyCode = ""

//经过多少时间提示验证码
var showVerifyCodeTime = 1000

//经过多少时间验证码消失
var closeVerifyCodeTime = 3000

//不同难度的图片
var easyPic = "https://assets-ouch.icons8.com/thumb/866/7387d6d9-81eb-405c-854f-d73b00b8e789.png"
var middlePic = "https://assets-ouch.icons8.com/thumb/260/d6b985f4-a663-4d44-a4c9-655e04bb8e1b.png"
var hardPic = "https://assets-ouch.icons8.com/thumb/883/692df9a7-d400-49c9-a00d-de972eae7197.png"
var epicPic = "https://assets-ouch.icons8.com/thumb/58/3ee5a5ab-9990-4b50-a3b0-ff71ee4df456.png"

var gameMode = ""

//回合数
var CorrectRoundNum = 0

//设置随机公司名
function setRandomCompanyName(that) {
    var randomNum = Math.round(Math.random() * companyNameAll.length)
    if (randomNum < 0) {
        randomNum++
    }
    if (randomNum >= companyNameAll.length) {
        randomNum--
    }
    companyNameRandom = companyNameAll[randomNum]
    that.setData({
        companyName: companyNameRandom
    })
}

//开始倒计时
var limitTimeCount = ""

//设置计时器
function startTimeSet(that) {
    var minute = Math.floor(that.data.timeLimit / 60)
    var second = that.data.timeLimit - minute * 60
    that.setData({
        seconds: second,
        minutes: minute,
    })
    if (that.data.seconds == 0) {
        if (that.data.minutes == 0) {
            wx.showToast({
                title: '超出规定时间!',
                icon: "none",
            })
        } else {
            that.setData({
                seconds: 59,
                minutes: that.data.minutes - 1,
            })
        }
    }
    limitTimeCount = setInterval(function () {
        if (that.data.seconds == 0) {
            if (that.data.minutes == 0) {
                wx.showToast({
                    title: '超出规定时间!',
                    icon: "none",
                })
                clearInterval(limitTimeCount)
                that.setData({
                    summaryPage: "block",
                    gamePage: "none",
                })
                summaryPageAnimation(this)

            } else {
                that.setData({
                    seconds: 59,
                    minutes: that.data.minutes - 1,
                })
            }
        } else {
            that.setData({
                seconds: that.data.seconds - 1,
            })
        }
    }, 1000);
}

//继续计时器
function continueTimeSet(that) {
    limitTimeCount = setInterval(function () {
        if (that.data.seconds == 0) {
            if (that.data.minutes == 0) {
                wx.showToast({
                    title: '超出规定时间!',
                    icon: "none",
                })
                clearInterval(limitTimeCount)
                that.setData({
                    summaryPage: "block",
                    gamePage: "none",
                })
                summaryPageAnimation(this)
            } else {
                that.setData({
                    seconds: 59,
                    minutes: that.data.minutes - 1,
                })
            }
        } else {
            that.setData({
                seconds: that.data.seconds - 1,
            })
        }
    }, 1000);
}

//进行下一关
function nextGame(that) {
    //重置选择难度页面
    companyNameRandom = ""
    gameMode = ""
    verifyCode = ""
    password = ""
    CorrectRoundNum = 0
    var hideNotSeeBack = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease',
    })
    var showGetVerify = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease',
    })
    var shorter = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease',
    })
    hideNotSeeBack.left(-130).step()
    showGetVerify.width("40%").step()
    shorter.width("55%").step()
    setRandomCompanyName(that)
    that.setData({
        companyName: companyNameRandom
    })
    that.setData({
        getVerifyCodeText: "获取验证码",
        failBackButton: hideNotSeeBack.export(),
        getVerifyCodeAnimation: showGetVerify.export(),
        input3: shorter.export(),
        userVerifyCodeValue: "",
        isDisabled: "ture"
    })
    if (that.data.passwordNeed) {
        that.setData({
            userInputPassword: "",
            userPassword: "",
        })
    }
}

//总结页面动画启动
function summaryPageAnimation(that) {

    //计算对错比例
    var sumQuestion = that.data.errorNum + that.data.correctNum + that.data.missNum
    that.setData({
        correctPer: Math.floor((100/sumQuestion)*that.data.correctNum) ,
        wrongPer:  Math.floor((100/sumQuestion)*that.data.errorNum) ,
        missPer:  Math.floor((100/sumQuestion)*that.data.missNum) 
    })

    var corrects = that.data.correctPer
    var wrongs = that.data.wrongPer
    var missings = that.data.missPer

    that.setData({
        correctPer: 0,
        wrongPer: 0,
        missPer: 0
    })

    // 正确的百分比动画
    if(corrects!=0){
        var correctAnimation = setInterval(() => {
            if (that.data.correctPer >= corrects - 1) {
                clearInterval(correctAnimation)
            }
            that.setData({
                correctPer: that.data.correctPer + 1
            })
            that.correctCircle = that.selectComponent("#correctCircle");
            that.correctCircle.showCanvasRing();
        }, 30);
    }else{
        that.correctCircle = that.selectComponent("#correctCircle");
            that.correctCircle.showCanvasRing();
    }

    // 没写的百分比动画
    if(missings!=0){
    var missAnimation = setInterval(() => {
        if (that.data.missPer >= missings - 1) {
            clearInterval(missAnimation)
        }
        that.setData({
            missPer: that.data.missPer + 1
        })
        that.missingCircle = that.selectComponent("#missingCircle");
        that.missingCircle.showCanvasRing();
    }, 30);
    }else{
        that.missingCircle = that.selectComponent("#missingCircle");
        that.missingCircle.showCanvasRing();
    }

    // 错误的百分比动画
    if(wrongs!=0){
    var wrongAnimation = setInterval(() => {
        if (that.data.wrongPer >= wrongs - 1) {
            clearInterval(wrongAnimation)
        }
        that.setData({
            wrongPer: that.data.wrongPer + 1
        })
        that.wrongCircle = that.selectComponent("#wrongCircle");
        that.wrongCircle.showCanvasRing();
    }, 30);
    }else{
        that.wrongCircle = that.selectComponent("#wrongCircle");
        that.wrongCircle.showCanvasRing();
    }
}


Page({


    data: {
        correctPer: 0,
        wrongPer: 0,
        missPer: 0,
        bigPerSize: wx.getSystemInfoSync().windowWidth * 0.33,

        passwardTelling: "",
        verifyCodeGreet: "先驱者PRO: 亲爱的用户，",
        passwordNeed: false,

        inputItem3: "inputItem3",
        inputItem2: "inputItem2",

        correctNum: 0,
        missNum: 0,
        errorNum: 0,

        rightORwrong: "✅",

        roundNumCurrent: 1,
        roundNum: 5,

        seconds: 0,
        minutes: 0,

        userVerifyCodeValue: "",

        confirmBtn: "confirmBtn",
        getVerifyCode: "getVerifyCode",
        getVerifyCodeText: "获取验证码",
        companyName: companyNameRandom,
        verifyCode: "test",
        timeLimit: 60,
        isBluring: "",
        isDisabledUserName: false,
        isDisabledPassword: false,
        userInputVerifyCode: "",
        userInputPassword: "",

        userName: "*************",
        userPassword: "*************",

        welcomePage: "block",
        summaryPage: "none",
        gamePage: "none",

        selectButton1: "selectButton1",
        selectButton2: "selectButton2",
        selectButton3: "selectButton3",
        selectButton4: "selectButton4",

        developerPic: "https://assets-ouch.icons8.com/thumb/517/5cded9ca-7152-4d6e-b2ba-604701c6979b.png",
        modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
        mode: "请选择难度",
    },

    //完成按钮点击
    confirmBtnClick() {
        if (this.data.isDisabled == false) {
            this.setData({
                confirmBtn: "confirmBtnPush",
            })
            setTimeout(() => {
                this.setData({
                    confirmBtn: "confirmBtn",
                })
            }, 100);

            if (this.data.passwordNeed) {
                //需要密码的
                if (this.data.userInputVerifyCode == this.data.verifyCode && this.data.userInputPassword == password) {
                    CorrectRoundNum++
                    //更新回合数
                    var roundNumHintUpdateHind = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    roundNumHintUpdateHind.right(-130).step()
                    var roundNumHintUpdateShow = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    var rightShow = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    rightShow.opacity(1).step()
                    var rightHide = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    rightHide.opacity(0).step()
                    roundNumHintUpdateShow.right(-10).step()

                    if (this.data.userInputVerifyCode == this.data.verifyCode && this.data.userInputPassword == password) {
                        this.setData({
                            rightORwrong: "✅",
                            correctNum: this.data.correctNum + 1,
                        })
                    }

                    this.setData({
                        roundNumHintAnimation: roundNumHintUpdateHind.export(),
                        rightOrWrongAnimation: rightShow.export(),
                    })
                    clearInterval(limitTimeCount)

                    setTimeout(() => {
                        this.setData({
                            roundNumCurrent: this.data.roundNumCurrent + 1,
                            roundNumHintAnimation: roundNumHintUpdateShow.export(),
                            rightOrWrongAnimation: rightHide.export(),
                        })
                    }, 400);
                    nextGame(this)
                    if (this.data.roundNumCurrent >= this.data.roundNum) {
                        wx.showToast({
                            title: '完成',
                        })
                        wx.setNavigationBarTitle({
                            title: '需要验证',
                        })
                        clearInterval(limitTimeCount)
                        isInGame = false
                        password = ""
                        this.setData({
                            summaryPage: "block",
                            gamePage: "none",
                            seconds: 0,
                            minutes: 0,
                            userInputPassword: "",
                            userPassword: "",
                        })
                        summaryPageAnimation(this)
                    }
                } else {
                    var wrongShow = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    wrongShow.opacity(1).step()
                    var wrongHide = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    var roundNumHintUpdateHind = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    var roundNumHintUpdateShow = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    roundNumHintUpdateHind.right(-130).step()
                    wrongHide.opacity(0).step()
                    roundNumHintUpdateShow.right(-10).step()
                    this.setData({
                        rightORwrong: "❌",
                        errorNum: this.data.errorNum + 1,
                    })
                    this.setData({
                        roundNumHintAnimation: roundNumHintUpdateHind.export(),
                        rightOrWrongAnimation: wrongShow.export(),
                    })
                    clearInterval(limitTimeCount)
                    setTimeout(() => {
                        this.setData({
                            roundNumCurrent: this.data.roundNumCurrent + 1,
                            roundNumHintAnimation: roundNumHintUpdateShow.export(),
                            rightOrWrongAnimation: wrongHide.export(),
                        })
                    }, 400);
                    if (this.data.roundNumCurrent >= this.data.roundNum) {
                        wx.showToast({
                            title: '完成',
                        })
                        wx.setNavigationBarTitle({
                            title: '需要验证',
                        })
                        clearInterval(limitTimeCount)
                        isInGame = false
                        this.setData({
                            summaryPage: "block",
                            gamePage: "none",
                            seconds: 0,
                            minutes: 0,
                        })
                        summaryPageAnimation(this)
                    } else {
                        nextGame(this)
                    }
                }
            } else {
                //不需要密码的
                if (this.data.userInputVerifyCode == this.data.verifyCode) {
                    CorrectRoundNum++
                    //更新回合数
                    var roundNumHintUpdateHind = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    roundNumHintUpdateHind.right(-130).step()
                    var roundNumHintUpdateShow = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    var rightShow = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    rightShow.opacity(1).step()
                    var rightHide = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    rightHide.opacity(0).step()
                    roundNumHintUpdateShow.right(-10).step()

                    if (this.data.userInputVerifyCode == this.data.verifyCode) {
                        this.setData({
                            rightORwrong: "✅",
                            correctNum: this.data.correctNum + 1,
                        })
                    }

                    this.setData({
                        roundNumHintAnimation: roundNumHintUpdateHind.export(),
                        rightOrWrongAnimation: rightShow.export(),
                    })
                    clearInterval(limitTimeCount)

                    setTimeout(() => {
                        this.setData({
                            roundNumCurrent: this.data.roundNumCurrent + 1,
                            roundNumHintAnimation: roundNumHintUpdateShow.export(),
                            rightOrWrongAnimation: rightHide.export(),
                        })
                    }, 400);
                    nextGame(this)
                    if (this.data.roundNumCurrent >= this.data.roundNum) {
                        wx.showToast({
                            title: '完成',
                        })
                        clearInterval(limitTimeCount)
                        isInGame = false
                        this.setData({
                            summaryPage: "block",
                            gamePage: "none",
                            seconds: 0,
                            minutes: 0,
                        })
                        summaryPageAnimation(this)
                    }
                } else {
                    var wrongShow = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    wrongShow.opacity(1).step()
                    var wrongHide = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    var roundNumHintUpdateHind = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    var roundNumHintUpdateShow = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'ease',
                    })
                    roundNumHintUpdateHind.right(-130).step()
                    wrongHide.opacity(0).step()
                    roundNumHintUpdateShow.right(-10).step()
                    this.setData({
                        rightORwrong: "❌",
                        errorNum: this.data.errorNum + 1,
                    })
                    this.setData({
                        roundNumHintAnimation: roundNumHintUpdateHind.export(),
                        rightOrWrongAnimation: wrongShow.export(),
                    })
                    clearInterval(limitTimeCount)
                    setTimeout(() => {
                        this.setData({
                            roundNumCurrent: this.data.roundNumCurrent + 1,
                            roundNumHintAnimation: roundNumHintUpdateShow.export(),
                            rightOrWrongAnimation: wrongHide.export(),
                        })
                    }, 400);
                    if (this.data.roundNumCurrent >= this.data.roundNum) {
                        wx.showToast({
                            title: '完成',
                        })
                        wx.setNavigationBarTitle({
                            title: '需要验证',
                        })
                        clearInterval(limitTimeCount)
                        isInGame = false
                        this.setData({
                            summaryPage: "block",
                            gamePage: "none",
                            seconds: 0,
                            minutes: 0,
                        })
                        summaryPageAnimation(this)
                    } else {
                        nextGame(this)
                    }
                }
            }
        }
    },

    // 获取验证码
    getVerifyCode() {
        var that = this
        showVerifyCodeTime = Math.round(Math.random() * 2000 + 500)

        //随机生成验证码
        for (var i = 0; i < 6; i++) {
            var randomNum = Math.round(Math.random() * randomNumber.length)
            if (randomNum < 0) {
                randomNum++
            }
            if (randomNum >= randomNumber.length) {
                randomNum--
            }
            verifyCode += randomNumber[randomNum]
        }

        if (that.data.passwordNeed) {
            password = ""
            //随机生成密码
            for (var i = 0; i < 3; i++) {
                var randomNum = Math.round(Math.random() * randomString.length)
                if (randomNum < 0) {
                    randomNum++
                }
                if (randomNum >= randomString.length) {
                    randomNum--
                }
                password += randomString[randomNum]
            }
            that.setData({
                passwardTelling: "和密码为" + password + "(注意大小写)，"
            })
        }


        that.setData({
            verifyCode: verifyCode
        })

        var hide = wx.createAnimation({
            duration: 600,
            timingFunction: 'ease',
        })
        var longer = wx.createAnimation({
            duration: 600,
            timingFunction: 'ease',
        })
        var alertShow = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
        })
        var alertHide = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
        })
        var failButton = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
        })
        hide.width("0%").step()
        longer.width("100%").step()
        alertShow.top(5).step()
        alertHide.top(-130).step()
        failButton.left(-10).step()
        this.setData({
            getVerifyCode: "getVerifyCodePush",
        })
        setTimeout(() => {
            this.setData({
                getVerifyCodeText: "",
                getVerifyCode: "getVerifyCode",
            })
        }, 100);

        setTimeout(() => {
            this.setData({
                getVerifyCodeAnimation: hide.export(),
                input3: longer.export(),
            })
        }, 200);

        //提示验证码
        setTimeout(() => {
            this.setData({
                alertBox: alertShow.export(),
                isBluring: "filter:blur(12rpx)",
                isDisabled: true,
                isDisabledPassword: true,
            })
            setTimeout(() => {
                this.setData({
                    alertBox: alertHide.export(),
                    isBluring: "",
                    isDisabled: false,
                    failBackButton: failButton.export(),
                })
                if (this.data.passwordNeed) {
                    this.setData({
                        isDisabledPassword: false,
                    })
                }
                if (isInGame == false) {
                    startTimeSet(this)
                    isInGame = true
                } else {
                    continueTimeSet(this)
                }
            }, closeVerifyCodeTime);
        }, showVerifyCodeTime);
    },

    //用户输入完验证码
    inputVerifyCodeDone(e) {
        this.setData({
            userInputVerifyCode: e.detail.value,
            inputItem3: "inputItem3"
        })
    },

    //用户聚焦输入验证码框
    inputingVerifyCode() {
        this.setData({
            inputItem3: "inputItem3Input"
        })
    },

    //用户输入完密码
    inputPasswordDone(e) {
        this.setData({
            userInputPassword: e.detail.value,
            inputItem2: "inputItem2"
        })
    },

    //用户聚焦输入密码
    inputingPassword() {
        this.setData({
            inputItem2: "inputItem2Input"
        })
    },


    //模式选择
    easy() {
        gameMode = "easy"
        closeVerifyCodeTime = 6000
        this.setData({
            timeLimit: 180,
            mode: "进入简单模式",
            modePic: easyPic,
            isDisabledUserName: true,
            isDisabledPassword: true,
            userPassword: "*************",
            passwordNeed: false,
            passwardTelling: "",
            verifyCodeGreet: "先驱者PRO: 亲爱的用户，",
            selectButton1: "selectButton1Select",
            selectButton2: "selectButton2",
            selectButton3: "selectButton3",
            selectButton4: "selectButton4",
        })
    },
    middle() {
        gameMode = "middle"
        closeVerifyCodeTime = 2500
        this.setData({
            mode: "进入普通模式",
            modePic: middlePic,
            timeLimit: 100,
            isDisabledUserName: true,
            isDisabledPassword: true,
            userPassword: "*************",
            passwordNeed: false,
            passwardTelling: "",
            verifyCodeGreet: "先驱者PRO: 亲爱的用户，",
            selectButton1: "selectButton1",
            selectButton2: "selectButton2Select",
            selectButton3: "selectButton3",
            selectButton4: "selectButton4",
        })
    },
    hard() {
        gameMode = "hard"
        closeVerifyCodeTime = 8200
        this.setData({
            mode: "进入困难模式",
            modePic: hardPic,
            timeLimit: 220,
            isDisabledUserName: true,
            isDisabledPassword: false,
            userPassword: "",
            passwordNeed: true,
            verifyCodeGreet: "",
            selectButton1: "selectButton1",
            selectButton2: "selectButton2",
            selectButton3: "selectButton3Select",
            selectButton4: "selectButton4",
        })
    },
    epic() {
        gameMode = "epic"
        closeVerifyCodeTime = 4500
        this.setData({
            mode: "进入噩梦模式",
            modePic: epicPic,

            timeLimit: 300,
            isDisabledUserName: true,
            isDisabledPassword: false,
            userPassword: "",
            passwordNeed: true,
            verifyCodeGreet: "",

            selectButton1: "selectButton1",
            selectButton2: "selectButton2",
            selectButton3: "selectButton3",
            selectButton4: "selectButton4Select",
        })
    },

    //进入游戏
    getIntoGame() {
        if (gameMode == "easy") {
            this.setData({
                welcomePage: "none",
                summaryPage: "none",
                gamePage: "block",
                roundNumCurrent: 1,
                roundNum: 3,
                isDisabled: "ture"
            })
            //修改页面信息
            wx.setNavigationBarTitle({
                title: '需要验证（简）'
            })
        } else if (gameMode == "middle") {
            this.setData({
                welcomePage: "none",
                summaryPage: "none",
                gamePage: "block",
                roundNumCurrent: 1,
                roundNum: 5,
                isDisabled: "ture"
            })
            //修改页面信息
            wx.setNavigationBarTitle({
                title: '需要验证（普）'
            })
        } else if (gameMode == "hard") {
            this.setData({
                welcomePage: "none",
                summaryPage: "none",
                gamePage: "block",
                roundNumCurrent: 1,
                roundNum: 4,
                isDisabled: "ture"
            })
            //修改页面信息
            wx.setNavigationBarTitle({
                title: '需要验证（难）'
            })
        } else if (gameMode == "epic") {
            this.setData({
                welcomePage: "none",
                summaryPage: "none",
                gamePage: "block",
                roundNumCurrent: 1,
                roundNum: 6,
                isDisabled: "ture"
            })
            //修改页面信息
            wx.setNavigationBarTitle({
                title: '需要验证（噩）'
            })
        } else {
            wx.showToast({
                title: '请选择难度',
                icon: "none",
            })
        }

        //重置选择难度页面
        companyNameRandom = ""
        gameMode = ""
        verifyCode = ""
        CorrectRoundNum = 0
        isInGame = false
        var hideNotSeeBack = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease',
        })
        var showGetVerify = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease',
        })
        var shorter = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease',
        })
        hideNotSeeBack.left(-130).step()
        showGetVerify.width("40%").step()
        shorter.width("55%").step()
        setRandomCompanyName(this)
        this.setData({
            companyName: companyNameRandom,
            correctNum: 0,
            errorNum: 0,
            correctPer: 0,
            wrongPer: 0,
            missPer: 0,
            missNum: 0,
        })
        this.setData({
            getVerifyCodeText: "获取验证码",
            failBackButton: hideNotSeeBack.export(),
            getVerifyCodeAnimation: showGetVerify.export(),
            input3: shorter.export(),
            userVerifyCodeValue: "",
            selectButton1: "selectButton1",
            selectButton2: "selectButton2",
            selectButton3: "selectButton3",
            selectButton4: "selectButton4",
            modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
            mode: "请选择难度",
        })

        //出现回合数
        var roundNumHint = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
        })
        roundNumHint.right(-10).step()
        this.setData({
            roundNumHintAnimation: roundNumHint.export(),
        })
    },

    //点击没看清返回按钮
    failBackButton() {
        var wrongShow = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
        })
        wrongShow.opacity(1).step()
        var wrongHide = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
        })
        var roundNumHintUpdateHind = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
        })
        var roundNumHintUpdateShow = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
        })
        roundNumHintUpdateHind.right(-130).step()
        wrongHide.opacity(0).step()
        roundNumHintUpdateShow.right(-10).step()
        this.setData({
            rightORwrong: "❌",
            missNum: this.data.missNum + 1,
        })
        this.setData({
            roundNumHintAnimation: roundNumHintUpdateHind.export(),
            rightOrWrongAnimation: wrongShow.export(),
        })
        clearInterval(limitTimeCount)
        setTimeout(() => {
            this.setData({
                roundNumCurrent: this.data.roundNumCurrent + 1,
                roundNumHintAnimation: roundNumHintUpdateShow.export(),
                rightOrWrongAnimation: wrongHide.export(),
            })
        }, 400);
        if (this.data.roundNumCurrent >= this.data.roundNum) {
            wx.showToast({
                title: '完成',
            })
            wx.setNavigationBarTitle({
                title: '需要验证',
            })
            clearInterval(limitTimeCount)
            isInGame = false
            this.setData({
                summaryPage: "block",
                gamePage: "none",
                seconds: 0,
                minutes: 0,
            })
            summaryPageAnimation(this)
        } else {
            nextGame(this)
        }
    },


    //在总结页面点击完成按钮
    confirmGameEnd() {
        this.setData({
            summaryPage: "none",
            welcomePage: "block"
        })
    },




    onLoad: function (options) {

    },


    onReady: function () {},


    onShow: function () {
        var that = this
        setRandomCompanyName(that)
        var that = this;

    wx.getStorage({
      key: 'sudokuEasy',
      success: function (res) {
        easyPic = res.data
      },
      fail: function (res) {
        easyPic = "https://assets-ouch.icons8.com/thumb/866/7387d6d9-81eb-405c-854f-d73b00b8e789.png"
      }
    })
    wx.getStorage({
      key: 'sudokuMiddle',
      success: function (res) {
        middlePic = res.data
      },
      fail: function (res) {
        middlePic = "https://assets-ouch.icons8.com/thumb/260/d6b985f4-a663-4d44-a4c9-655e04bb8e1b.png"
      }
    })
    wx.getStorage({
      key: 'sudokuHard',
      success: function (res) {
        hardPic = res.data
      },
      fail: function (res) {
        hardPic = "https://assets-ouch.icons8.com/thumb/883/692df9a7-d400-49c9-a00d-de972eae7197.png"
      }
    })
    wx.getStorage({
      key: 'sudokuEpic',
      success: function (res) {
        epicPic = res.data
      },
      fail: function (res) {
        epicPic = "https://assets-ouch.icons8.com/thumb/58/3ee5a5ab-9990-4b50-a3b0-ff71ee4df456.png"
      }
    })
    wx.getStorage({
      key: 'sudokuDeveloper',
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

    onHide: function () {

    },


    onUnload: function () {
        clearInterval(limitTimeCount)
    },

    onPullDownRefresh: function () {

    },


    onReachBottom: function () {

    },


    onShareAppMessage: function () {

    }
})