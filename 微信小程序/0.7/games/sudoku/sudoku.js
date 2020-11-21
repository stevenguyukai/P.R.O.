var app = getApp()

//橡皮工具是否点击的变量
var isErase = false;

//铅笔工具是否点击的变量
var isPencil = false;

var isSelect = "";

//数独模式
var easy = false;
var middle = false;
var hard = false;
var epic = false;

//不同等级的照片
var easyPic = "";
var middlePic = "";
var hardPic = "";
var epicPic = "";

//计时器
var isStop = false

//九宫格真值表
var sudokuTable = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var sudokuTableBackup = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var answerSheetWithEmpytGrid = new Array(new Array)

//音频
var volumnInput = 0;

function playNumSound(volumnInput) {
  const numSound = wx.createInnerAudioContext()
  numSound.autoplay = true;
  numSound.src = "/assets/learning/numSound.mp3"
  numSound.obeyMuteSwitch = false
  numSound.volume = volumnInput
}

function playSuccessSound(volumnInput) {
  const numSound = wx.createInnerAudioContext()
  numSound.autoplay = true;
  numSound.src = "/assets/learning/success.mp3"
  numSound.obeyMuteSwitch = false
  numSound.volume = volumnInput
}

//把sudokuTable中的数值放在用户界面上
var putValueInView = (that) => {

  for (var k = 0; k < 3; k++) {
    for (var i = 0; i < 9; i++) {
      if (i < 3) {
        var numChange1 = "sudokuGrid1[" + (i + k * 3) + "].value";
        var numChange4 = "sudokuGrid4[" + (i + k * 3) + "].value";
        var numChange7 = "sudokuGrid7[" + (i + k * 3) + "].value";
        that.setData({
          [numChange1]: sudokuTable[k][i],
          [numChange4]: sudokuTable[k + 3][i],
          [numChange7]: sudokuTable[k + 6][i],
        })
      } else if (i >= 3 && i < 6) {
        var numChange2 = "sudokuGrid2[" + (i - 3 + k * 3) + "].value";
        var numChange5 = "sudokuGrid5[" + (i - 3 + k * 3) + "].value";
        var numChange8 = "sudokuGrid8[" + (i - 3 + k * 3) + "].value";
        that.setData({
          [numChange2]: sudokuTable[k][i],
          [numChange5]: sudokuTable[k + 3][i],
          [numChange8]: sudokuTable[k + 6][i],
        })
      } else {
        var numChange3 = "sudokuGrid3[" + (i - 6 + k * 3) + "].value";
        var numChange6 = "sudokuGrid6[" + (i - 6 + k * 3) + "].value";
        var numChange9 = "sudokuGrid9[" + (i - 6 + k * 3) + "].value";
        that.setData({
          [numChange3]: sudokuTable[k][i],
          [numChange6]: sudokuTable[k + 3][i],
          [numChange9]: sudokuTable[k + 6][i],
        })
      }
    }
  }


}

//制作数独函数
function NumberPlaceCreate() {
  // 1 初始化参数
  // 可选数字
  const NumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // 当前循环行及尝试次数
  const Calling = {
    y: 0,
    time: 0
  }
  // 尝试次数阈值
  const Maximum = 10
  // 最终结果
  const NumberPlace = []

  // 2 每个数字建立
  /**
   * 逐行逐个尝试数字的函数
   * 本函数认为，前行数据指导后行排列，前行随机排列下一定有后行可用排列
   *
   * @param {Number} lastY 位置循环的起始行，用于重算时的起始行数
   * @returns NumberPlace
   */
  function create(lastY) {
    // 2.1 位置循环，行
    for (let y = lastY || 1; y <= 9; y++) {
      // 2.1.1 记录当前循环行及尝试次数
      if (y !== Calling.y) {
        Calling.y = y
        Calling.time = 0
      }

      // 2.1.2 逐个尝试，个
      for (let x = 1; x <= 9; x++) {
        const z = Math.ceil(x / 3) + (Math.floor((y - 1) / 3) * 3)

        // 2.1.2.1 本格子可选数字
        const canBe = [...NumberList]

        NumberPlace.forEach(num => {
          if (num.x === x || num.y === y || num.z === z) {
            const index = canBe.findIndex(number => number === num.num)
            if (index >= 0) canBe.splice(index, 1)
          }
        })

        // 2.1.2.2 某格没有可选数，本行重算
        if (canBe.length === 0) {
          // 2.1.2.2.1 删掉本行数据
          for (let r = 1; r < x; r++) {
            NumberPlace.pop()
          }

          // 2.1.2.2.2 如果重算次数大于阈值，删除上行数据，重算上一行
          if (Calling.time >= Maximum) {
            for (let r = 0; r < 9; r++) {
              NumberPlace.pop()
            }
            return Promise.resolve(y - 1).then(create)
          }

          // 2.1.2.2.3 重算次数累加
          Calling.time += 1
          return Promise.resolve(y).then(create)
        }

        // 2.1.2.3 选一个数字
        const index = Math.floor(Math.random() * canBe.length)
        const num = {
          x,
          y,
          z,
          num: canBe[index],
        }

        NumberPlace.push(num)
      }
    }

    // 2.2 成功后渲染成表格
    let rendery = -1
    let renderx = []

    NumberPlace.map(num => {
      if (num.y - 1 !== rendery) {
        rendery += 1
        renderx.push([])
      }
      renderx[rendery].push(num.num)
    })

    for (let i = 0; i < renderx.length; i++) {
      sudokuTableBackup[i] = renderx[i];
    }
    // 2.3 返回结果
    return sudokuTableBackup
  }

  // 3 执行
  return create()
}

//数独创建并挖空之后数剩下需要的数字
function countNumAftCreat(that) {
  for (var i = 0; i < 9; i++) {
    for (var k = 0; k < 9; k++) {
      for (var j = 1; j <= 9; j++) {
        if (sudokuTable[i][k] == j) {
          that.setData({
            ["remain" + j]: that.data["remain" + j] - 1,
          })
        }
      }
    }
  }
}

//镂空数独
function gougeSudoku(num, that) {
  sudokuTableBackup = sudokuTable;
  var catching = NumberPlaceCreate();
  catching.then(result => {
    sudokuTable = result;
    sudokuTableBackup = sudokuTable;
    //镂空num个格子
    var emptyGridNeed = num;
    emptyGridNeed = emptyGridNeed + Math.round(Math.random() * 5);
    for (var i = 0; i < emptyGridNeed; i++) {
      var random1 = Math.round(Math.random() * 8);
      var random2 = Math.round(Math.random() * 8);
      if (sudokuTable[random1][random2] == "") {
        i = i - 1;
      } else {
        answerSheetWithEmpytGrid.push([random1, random2, sudokuTable[random1][random2]]);
        sudokuTable[random1][random2] = "";
      }
    }

    //把sudokuTable中的数值放在用户界面上
    putValueInView(that);

    //创建完挖空数独后取数字
    countNumAftCreat(that);


  })
}

//隐藏游戏主界面
function hideMainPage(that) {
  that.setData({
    welcomePage: "none",
  })
}

//提示数字饱和
function alertNumFull() {
  wx.showToast({
    title: '数字饱和',
    icon: "none",
    duration: 500,
  })
}

//减去剩余数字
function deleteRemainNum(selectNum, that) {
  for (var i = 1; i <= 9; i++) {
    if (selectNum == i) {
      that.setData({
        ["remain" + i]: that.data["remain" + i] - 1,
      })
    }
  }
}

//加上剩余数字
function addRemainNum(selectNum, that) {
  for (var i = 1; i <= 9; i++) {
    if (selectNum == i) {
      that.setData({
        ["remain" + i]: that.data["remain" + i] + 1,
      })
    }
  }
}

//减去剩余数字(占领数字)
function deleteRemainNum2(sudokuGridIndex, distinctLoca, that) {
  for (var i = 1; i <= 9; i++) {
    if (that.data[sudokuGridIndex][distinctLoca].value == i) {
      that.setData({
        ["remain" + i]: that.data["remain" + i] - 1,
      })
    }
  }
}

//加上剩余数字(被占领数字)
function addRemainNum2(sudokuGridIndex, distinctLoca, that) {
  for (var i = 1; i <= 9; i++) {
    if (that.data[sudokuGridIndex][distinctLoca].value == i) {
      that.setData({
        ["remain" + i]: that.data["remain" + i] + 1,
      })
    }
  }
}

//用户填数字
function fillInNum(remainIndex, sudokuGridIndex, that, selectNum, distinctLoca) {
  if (that.data[remainIndex] > 0) {
    if (sudokuGridIndex[distinctLoca].backgroundColor != "#eb8677") {
      that.setData({
        [sudokuGridIndex + "[" + (distinctLoca) + "].value"]: selectNum,
        [sudokuGridIndex + "[" + (distinctLoca) + "].fontColor"]: "#f5ba5f",
        [sudokuGridIndex + "[" + (distinctLoca) + "].backgroundColor"]: "#aaa",
      })
    } else {
      that.setData({
        [sudokuGridIndex + "[" + (distinctLoca) + "].value"]: selectNum,
        [sudokuGridIndex + "[" + (distinctLoca) + "].fontColor"]: "#f5ba5f",
      })
    }


    //减去用了的数字
    deleteRemainNum(selectNum, that);
  } else {
    alertNumFull();
  }
}

//用户换数字
function fillChangeNum(remainIndex, sudokuGridIndex, that, selectNum, distinctLoca) {
  if (that.data[remainIndex] > 0) {
    addRemainNum2(sudokuGridIndex, distinctLoca, that);
    if (sudokuGridIndex[distinctLoca].backgroundColor != "#eb8677") {
      that.setData({
        [sudokuGridIndex + "[" + (distinctLoca) + "].value"]: selectNum,
        [sudokuGridIndex + "[" + (distinctLoca) + "].fontColor"]: "#f5ba5f",
        [sudokuGridIndex + "[" + (distinctLoca) + "].backgroundColor"]: "#aaa",
      })
    } else {
      that.setData({
        [sudokuGridIndex + "[" + (distinctLoca) + "].value"]: selectNum,
        [sudokuGridIndex + "[" + (distinctLoca) + "].fontColor"]: "#f5ba5f",
      })
    }

    deleteRemainNum2(sudokuGridIndex, distinctLoca, that)
  } else {
    alertNumFull();
  }
}

//用户橡皮擦数字
function eraseNum(sudokuGridIndex, that, selectNum, distinctLoca) {
  addRemainNum2(sudokuGridIndex, distinctLoca, that);
  that.setData({
    [sudokuGridIndex + "[" + (distinctLoca) + "].value"]: selectNum,
    [sudokuGridIndex + "[" + (distinctLoca) + "].fontColor"]: "#f5ba5f",
    [sudokuGridIndex + "[" + (distinctLoca) + "].backgroundColor"]: "none",
  })
}

//用户输入数字（总）
function userInputNum(that, distinctLoca, sudokuGridIndex) {
  if (that.data[sudokuGridIndex][distinctLoca].value == "" && isSelect != 10) {
    playNumSound(volumnInput);
    for (var i = 1; i <= 9; i++) {
      if (isSelect == i) {
        var reaminNum = "remain" + i
        //填入数字
        fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)
      }
    }
  } else if (that.data[sudokuGridIndex][distinctLoca].value == isSelect && that.data[sudokuGridIndex][distinctLoca].fontColor == "#f5ba5f" && isSelect != 10) {
    playNumSound(volumnInput);
    that.setData({
      [sudokuGridIndex + "[" + (distinctLoca) + "].value"]: "",
      [sudokuGridIndex + "[" + (distinctLoca) + "].fontColor"]: "#f5ba5f",
      [sudokuGridIndex + "[" + (distinctLoca) + "].backgroundColor"]: "none",
    })
    addRemainNum(isSelect, that)

  } else if (that.data[sudokuGridIndex][distinctLoca].fontColor == "#f5ba5f" && isSelect != 10) {
    playNumSound(volumnInput);
    for (var i = 1; i <= 9; i++) {
      if (isSelect == i) {
        var reaminNum = "remain" + i
        fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)
      }
    }
    if (isSelect == "") {
      eraseNum(sudokuGridIndex, that, isSelect, distinctLoca);
    }
  }
}

//设置备用数独数组
function setBackup(answerSheetWithEmpytGrid) {
  for (var i = 0; i < answerSheetWithEmpytGrid.length; i++) {
    sudokuTableBackup[(answerSheetWithEmpytGrid[i][0])][(answerSheetWithEmpytGrid[i][1])] = answerSheetWithEmpytGrid[i][2]
  }
}

//提示时判断被替换了什么数字并增加它的remain个数
function addUpRemainNum(value, that) {
  for (var i = 1; i <= 9; i++) {
    if (value == i) {
      that.setData({
        ["remain" + i]: that.data["remain" + i] + 1
      })
    }
  }
}

//点击数字后增强数字底色
function changeBgColor(isHide, num, that) {
  if (isHide == "hide") {
    for (var i = 1; i <= 9; i++) {
      var temporaryGrid = "";
      temporaryGrid = "sudokuGrid" + i
      for (var j = 0; j < 9; j++) {
        if (that.data[temporaryGrid][j].backgroundColor != "#eb8677") {
          if (that.data[temporaryGrid][j].value == num) {
            that.setData({
              ["sudokuGrid" + i + "[" + j + "].backgroundColor"]: "none",
            })
          }
        }
      }
    }
  } else {
    for (var i = 1; i <= 9; i++) {
      var temporaryGrid = "";
      temporaryGrid = "sudokuGrid" + i
      for (var j = 0; j < 9; j++) {
        if (that.data[temporaryGrid][j].backgroundColor != "#eb8677") {
          if (that.data[temporaryGrid][j].value == num) {
            that.setData({
              ["sudokuGrid" + i + "[" + j + "].backgroundColor"]: "#aaa",
            })
          }
        }
      }
    }
  }
  for (var k = 1; k <= 9; k++) {
    if (k == num) {
      continue;
    }
    for (var i = 1; i <= 9; i++) {
      var temporaryGrid = "";
      temporaryGrid = "sudokuGrid" + i
      for (var j = 0; j < 9; j++) {
        if (that.data[temporaryGrid][j].backgroundColor != "#eb8677") {
          if (that.data[temporaryGrid][j].value == k) {
            that.setData({
              ["sudokuGrid" + i + "[" + j + "].backgroundColor"]: "none",
            })
          }
        }
      }
    }
  }
}

//把page data中的宫格数组元素转换成9x9数组，并返回这个数组
function putSudokuIntoArr(that) {
  var sudokuArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  //1,2,3,4,5,6,7,8,9
  for (var k = 0; k < 3; k++) {
    for (var j = (1 + k * 3); j <= (3 + k * 3); j++) {
      var gridName = "sudokuGrid" + j
      for (var i = 0; i < 3; i++) {
        sudokuArr[0 + k * 3][i + (j - 1 - k * 3) * 3] = that.data[gridName][i].value
      }
      for (var i = 3; i < 6; i++) {
        sudokuArr[1 + k * 3][i + (j - 2 - k * 3) * 3] = that.data[gridName][i].value
      }
      for (var i = 6; i < 9; i++) {
        sudokuArr[2 + k * 3][i + (j - 3 - k * 3) * 3] = that.data[gridName][i].value
      }
    }
  }


  return sudokuArr;
}

//判断行错误
function rowError(rowIndex, errorNum, that, isTrue) {
  //1,2,3,4,5,6,7,8,9
  for (var a = 0; a < 3; a++) {
    for (var p = (0 + a * 3); p < (3 + a * 3); p++) {
      if (rowIndex == p) {
        for (var i = (1 + a * 3); i <= (3 + a * 3); i++) {
          var gridName = "sudokuGrid" + i
          for (var j = (0 + (p - a * 3) * 3); j < (3 + (p - a * 3) * 3); j++) {
            if (that.data[gridName][j].value == errorNum) {
              if (isTrue) {
                that.setData({
                  ["sudokuGrid" + i + "[" + j + "].backgroundColor"]: "#eb8677"
                })
              } else {
                if (isSelect == errorNum) {
                  that.setData({
                    ["sudokuGrid" + i + "[" + j + "].backgroundColor"]: "#aaa"
                  })
                } else {
                  that.setData({
                    ["sudokuGrid" + i + "[" + j + "].backgroundColor"]: "none"
                  })
                }

              }
            }
          }
        }
      }
    }
  }
}

//判断列错误
function columnError(columnIndex, errorNum, that) {
  //1,2,3,4,5,6,7,8,9
  for (var a = 0; a < 3; a++) {
    for (var p = 0; p < 3; p++) {
      if (columnIndex == p + a * 3) {
        for (var i = 0; i < 3; i++) {
          var gridName = "sudokuGrid" + (1 + 3 * i + a)
          for (var j = 0; j < 3; j++) {
            if (that.data[gridName][3 * j + p].value == errorNum) {
              that.setData({
                ["sudokuGrid" + (1 + 3 * i + a) + "[" + (3 * j + p) + "].backgroundColor"]: "#eb8677"
              })
            }
          }
        }
      }
    }
  }
}

//判断是否重复（总）
function checkIfRepeat(that) {
  //判断是否有重复
  var sudokuArr = putSudokuIntoArr(that);
  //检查行是否重复
  for (var i = 0; i < 9; i++) {
    var counter = 0
    for (var p = 1; p <= 9; p++) {
      counter = 0;
      for (var j = 0; j < 9; j++) {
        if (sudokuArr[i][j] == p) {
          counter++
        }
      }
      if (counter >= 2) {
        rowError(i, p, that, true)
      } else if (counter < 2) {
        rowError(i, p, that, false)
      }
    }
  }
  //检查列是否重复
  for (var i = 0; i < 9; i++) {
    var counter = 0
    for (var p = 1; p <= 9; p++) {
      counter = 0;
      for (var j = 0; j < 9; j++) {
        if (sudokuArr[j][i] == p) {
          counter++
        }
      }
      if (counter >= 2) {
        columnError(i, p, that)
      }
    }
  }
  //检查宫是否重复
  for (var i = 1; i <= 9; i++) {
    var counter = 0
    var sudokuParam = "sudokuGrid" + i
    for (var p = 1; p <= 9; p++) {
      counter = 0
      for (var j = 0; j < 9; j++) {
        if (that.data[sudokuParam][j].value == p) {
          counter++
        }
      }
      if (counter >= 2) {
        for (var j = 0; j < 9; j++) {
          if (that.data[sudokuParam][j].value == p) {
            that.setData({
              [sudokuParam + "[" + j + "].backgroundColor"]: "#eb8677"
            })
          }
        }
      }
    }
  }
}

//计时器
function timeCount(that) {
  if (!isStop) {
    if (that.data.seconds == 59) {
      that.setData({
        seconds: -1,
        minutes: that.data.minutes + 1
      })
    }
    if (that.data.minutes == 59) {
      that.setData({
        minutes: -1,
        hours: that.data.hours + 1
      })
    }
    that.setData({
      seconds: that.data.seconds + 1,
    })
    setTimeout(() => {
      timeCount(that)
    }, 1001);
  }
}

//更新数据库的数据
function updateInfoFunction(that) {
  //经验条动画
  var addExp = 0;
  var isFull = false;
  var excessExp = 0;
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
  if (easy) {
    addExp = 75
  }
  if (middle) {
    addExp = 125
  }
  if (hard) {
    addExp = 175
  }
  if (epic) {
    addExp = 250
  }

  //判断是否升级
  if ((app.globalData.exp + addExp) >= (200 * Math.pow(1.25, app.globalData.level))) {
    excessExp = (app.globalData.exp + addExp) - (200 * Math.pow(1.25, app.globalData.level))
    isFull = true
    addExp = addExp - excessExp
  }

  //加上经验值的动画（未升级）
  var addExpPercentage = Math.floor((app.globalData.exp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100 +
    Math.floor((addExp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100

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
      app.globalData.sudoku_play_time = (app.globalData.sudoku_play_time + that.data.hours * 3600 + that.data.minutes * 60 + that.data.seconds)
      wx.setStorageSync('sqlSudoku_play_time', app.globalData.sudoku_play_time)
      isFull = false
      //更新数据库的数据
      app.updateInfo()
    } else {
      app.globalData.exp = Math.round(app.globalData.exp + addExp + excessExp)
      wx.setStorageSync('sqlExp', app.globalData.exp)
      app.globalData.sudoku_play_time = (app.globalData.sudoku_play_time + that.data.hours * 3600 + that.data.minutes * 60 + that.data.seconds)
      wx.setStorageSync('sqlSudoku_play_time', app.globalData.sudoku_play_time)
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
}


Page({
  data: {
    completeTime: 0,
    gameDifficulty: "简单",
    useHintAmount: 0,
    summaryPage: "none",

    userLevel: app.globalData.level,
    expPercentage: Math.floor((app.globalData.exp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100,

    developerPic: "",

    hours: 0,
    minutes: 0,
    seconds: 0,

    numStyle1: "",
    numStyle2: "",
    numStyle3: "",
    numStyle4: "",
    numStyle5: "",
    numStyle6: "",
    numStyle7: "",
    numStyle8: "",
    numStyle9: "",

    hintRemain: 3,

    selectButton1: "selectButton1",
    selectButton2: "selectButton2",
    selectButton3: "selectButton3",
    selectButton4: "selectButton4",

    toolButtonCheck: "toolButtonCheck",
    toolButtonErase: "toolButtonErase",
    toolButtonHint: "toolButtonHint",

    number1: "number",
    number2: "number",
    number3: "number",
    number4: "number",
    number5: "number",
    number6: "number",
    number7: "number",
    number8: "number",
    number9: "number",

    //数字变量
    is1: false,
    is2: false,
    is3: false,
    is4: false,
    is5: false,
    is6: false,
    is7: false,
    is8: false,
    is9: false,

    backupIsSet: false,

    remain1: 9,
    remain2: 9,
    remain3: 9,
    remain4: 9,
    remain5: 9,
    remain6: 9,
    remain7: 9,
    remain8: 9,
    remain9: 9,

    isVolumnOn: "开启声音",
    settingView: "none",
    welcomePage: "block",
    mode: "请选择难度",
    modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
    alertToolPic: "",
    alertToolText: "",
    alertNum: "",
    sudokuGrid1: [],
    sudokuGrid2: [],
    sudokuGrid3: [],
    sudokuGrid4: [],
    sudokuGrid5: [],
    sudokuGrid6: [],
    sudokuGrid7: [],
    sudokuGrid8: [],
    sudokuGrid9: [],
  },

  //分享小程序
  onShareAppMessage: function () {
    return {
      title: "我在玩「数独挑战」一起吗!(´･ω･`)",
      path: "/games/sudoku/sudoku",
    }
  },

  // 工具被点击的函数
  erase() {
    playNumSound(volumnInput);
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    this.setData({
      alertToolPic: "/assets/learning/erase.svg",
      alertToolText: "橡皮",
    })
    var alertToolShow = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var alertToolHide = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    alertToolShow.left(0).step();
    alertToolHide.left(-100).step();
    if (isErase) {
      isPencil = false;
      this.setData({
        alertToolAnimation: alertToolHide.export(),
        toolButtonErase: "toolButtonErase",
      })
      isErase = false;
      for (var i = 1; i <= 9; i++) {
        this.setData({
          ["is" + i]: false
        })
      }
      isSelect = 10;
    } else {
      isPencil = false;
      for (var i = 1; i <= 9; i++) {
        this.setData({
          ["number" + i]: "number",
          ["is" + i]: false,
        })
      }
      this.setData({
        alertToolAnimation: alertToolShow.export(),
        toolButtonPencil: "toolButtonPencil",
        toolButtonErase: "toolButtonEraseSelect",
      })
      isErase = true;
      isSelect = "";
    }

    //收回alertNum
    var Hide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    Hide.right(-60).step();
    this.setData({
      alertNumAnimation: Hide.export(),
    })

  },
  hint() {
    this.setData({
      toolButtonHint: "toolButtonHintSelect",
    })
    if (this.data.hintRemain > 0) {
      if (this.data.backupIsSet == false) {
        setBackup(answerSheetWithEmpytGrid);
        this.setData({
          backupIsSet: true,
        })
      }
      playNumSound(volumnInput);
      if (getApp().globalData.vibration == true) {
        wx.vibrateShort();
      }
      if (answerSheetWithEmpytGrid.length == 0) {
        //已完成
        wx.showToast({
          title: '完成！',
        })
        isStop = true
        playSuccessSound(volumnInput);
        wx.vibrateLong();
        this.setData({
          summaryPage: "block",
          useHintAmount: 3 - this.data.hintRemain,
          completeTime: this.data.hours * 3600 + this.data.minutes * 60 + this.data.seconds,
        })

        var completeTimeCount = this.data.completeTime;
        this.setData({
          completeTime: 0,
        })
        completeTimeCount: setInterval(() => {
          var that = this;
          if (that.data.completeTime < completeTimeCount) {
            that.setData({
              completeTime: that.data.completeTime += 1,
            })
          } else {
            clearInterval(completeTimeCount)
          }
        }, 30);

        updateInfoFunction(this)

        easy = false;
        middle = false;
        hard = false;
        epic = false;
      } else {
        var randomHintNum = Math.round(Math.random() * answerSheetWithEmpytGrid.length - 1);
        if (randomHintNum >= answerSheetWithEmpytGrid.length) {
          randomHintNum--;
        } else if (randomHintNum < 0) {
          randomHintNum++;
        }
        var hintGrid = answerSheetWithEmpytGrid[randomHintNum];
        var hintx = hintGrid[0];
        var hinty = hintGrid[1];
        var hintValue = hintGrid[2];

        var aBackup = 0;
        var bBackup = 0
        //将提示的数字放入显示表格
        for (var b = 0; b < 3; b++) {
          if (hintx >= b * 3 && hintx < (b + 1) * 3) {
            for (var a = 0; a < 3; a++) {
              if (hinty >= a * 3 && hinty < (a + 1) * 3) {
                var sudokuIndex = "sudokuGrid" + (a + 1 + b * 3)

                addUpRemainNum(this.data[sudokuIndex][((((hintx - b * 3) * 3) + (hinty + 1 - a * 3)) - 1)].value, this);
                aBackup = a
                bBackup = b
                if (hintValue == isSelect) {
                  this.setData({
                    [sudokuIndex + "[" + ((((hintx - b * 3) * 3) + (hinty + 1 - a * 3)) - 1) + "].value"]: hintValue,
                    [sudokuIndex + "[" + ((((hintx - b * 3) * 3) + (hinty + 1 - a * 3)) - 1) + "].fontColor"]: "red",
                    [sudokuIndex + "[" + ((((hintx - b * 3) * 3) + (hinty + 1 - a * 3)) - 1) + "].backgroundColor"]: "#aaa",
                  })
                } else {
                  this.setData({
                    [sudokuIndex + "[" + ((((hintx - b * 3) * 3) + (hinty + 1 - a * 3)) - 1) + "].value"]: hintValue,
                    [sudokuIndex + "[" + ((((hintx - b * 3) * 3) + (hinty + 1 - a * 3)) - 1) + "].fontColor"]: "red",
                    [sudokuIndex + "[" + ((((hintx - b * 3) * 3) + (hinty + 1 - a * 3)) - 1) + "].backgroundColor"]: "none",
                  })
                }
              }
            }
          }
        }
        //闪烁以突出提示的数字
        setTimeout(() => {
          this.setData({
            [sudokuIndex + "[" + ((((hintx - bBackup * 3) * 3) + (hinty + 1 - aBackup * 3)) - 1) + "].fontColor"]: "#5e6473",
          })
          setTimeout(() => {
            this.setData({
              [sudokuIndex + "[" + ((((hintx - bBackup * 3) * 3) + (hinty + 1 - aBackup * 3)) - 1) + "].fontColor"]: "red",
            })
            setTimeout(() => {
              this.setData({
                [sudokuIndex + "[" + ((((hintx - bBackup * 3) * 3) + (hinty + 1 - aBackup * 3)) - 1) + "].fontColor"]: "#5e6473",
              })
            }, 400);
          }, 400);
        }, 400);

        //每提示一个数字，减去剩余数字个数
        for (var i = 1; i <= 9; i++) {
          if (hintValue == i) {
            this.setData({
              ["remain" + i]: this.data["remain" + i] - 1
            })
          }
        }
        answerSheetWithEmpytGrid.splice(randomHintNum, 1);
        //检查是否某个数字已经用完
        for (var i = 1; i <= 9; i++) {
          if (this.data["remain" + i] <= 0) {
            this.setData({
              ["numStyle" + i]: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              ["numStyle" + i]: "",
            })
          }
        }
        this.setData({
          hintRemain: (this.data.hintRemain) - 1
        })
      }
      //检查是否有重复
      checkIfRepeat(this)
    } else {
      wx.showToast({
        title: '提示已经用完',
        icon: "none",
        duration: 800,
      })
    }
    setTimeout(() => {
      this.setData({
        toolButtonHint: "toolButtonHint",
      })
    }, 200);
  },
  settingCheck() {
    this.setData({
      toolButtonCheck: "toolButtonCheckSelect"
    })
    var countFull = 0
    for (var i = 1; i <= 9; i++) {
      for (var j = 0; j < 9; j++) {
        var gridNameIndex = "sudokuGrid" + i
        if (this.data[gridNameIndex][j].value != "") {
          countFull++
        }
      }
    }
    if (countFull == 81) {
      checkIfRepeat(this)
      var countCorrect = 0
      for (var i = 1; i <= 9; i++) {
        for (var j = 0; j < 9; j++) {
          var gridNameIndex = "sudokuGrid" + i
          if (this.data[gridNameIndex][j].backgroundColor != "#eb8677") {
            countCorrect++
          }
        }
      }
      if (countCorrect == 81) {
        wx.showToast({
          title: '完成！',
        })
        isStop = true
        playSuccessSound(volumnInput);
        wx.vibrateLong();
        this.setData({
          summaryPage: "block",
          useHintAmount: 3 - this.data.hintRemain,
          completeTime: this.data.hours * 3600 + this.data.minutes * 60 + this.data.seconds,
        })

        var completeTimeCount = this.data.completeTime;
        this.setData({
          completeTime: 0,
        })
        completeTimeCount: setInterval(() => {
          var that = this;
          if (that.data.completeTime < completeTimeCount) {
            that.setData({
              completeTime: that.data.completeTime += 1,
            })
          } else {
            clearInterval(completeTimeCount)
          }
        }, 30);

        updateInfoFunction(this)
        easy = false;
        middle = false;
        hard = false;
        epic = false;

      } else {
        wx.vibrateShort(),
          this.setData({
            settingView: "none",
          })
        wx.showToast({
          title: '还没有填正确',
          icon: 'none',
          duration: 800,
        })
      }
    } else {
      wx.vibrateShort(),
        this.setData({
          settingView: "none",
        })
      wx.showToast({
        title: '未完成',
        icon: 'none',
        duration: 800,
      })
    }
    setTimeout(() => {
      this.setData({
        toolButtonCheck: "toolButtonCheck"
      })
    }, 200);
  },


  //选择模式按钮被点击
  easy() {
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    this.setData({
      modePic: easyPic,
      mode: "进入简单模式",
      gameDifficulty: "简单",
      selectButton1: "selectButton1Select",
      selectButton2: "selectButton2",
      selectButton3: "selectButton3",
      selectButton4: "selectButton4",
    })
    easy = true;
    middle = false;
    hard = false;
    epic = false;
  },
  middle() {

    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    this.setData({
      mode: "进入普通模式",
      gameDifficulty: "普通",
      modePic: middlePic,
      selectButton1: "selectButton1",
      selectButton2: "selectButton2Select",
      selectButton3: "selectButton3",
      selectButton4: "selectButton4",
    })
    easy = false;
    middle = true;
    hard = false;
    epic = false;
  },
  hard() {
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    this.setData({
      mode: "进入困难模式",
      gameDifficulty: "困难",
      modePic: hardPic,
      selectButton1: "selectButton1",
      selectButton2: "selectButton2",
      selectButton3: "selectButton3Select",
      selectButton4: "selectButton4",
    })
    easy = false;
    middle = false;
    hard = true;
    epic = false;
  },
  epic() {
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    this.setData({
      mode: "进入噩梦模式",
      gameDifficulty: "噩梦",
      modePic: epicPic,
      selectButton1: "selectButton1",
      selectButton2: "selectButton2",
      selectButton3: "selectButton3",
      selectButton4: "selectButton4Select",
    })
    easy = false;
    middle = false;
    hard = false;
    epic = true;
  },


  //点击进入游戏按钮
  getIntoGame() {

    //重置数独
    for (var i = 1; i <= 9; i++) {
      var tempGrid = []
      for (var j = 1; j <= 9; j++) {
        tempGrid.push({
          "id": j,
          "value": 0,
          "fontColor": "#5e6473",
          "backgroundColor": "none",
        })
      }
      this.setData({
        ["numStyle" + i]: "",
        ["number" + i]: "number",
        ["sudokuGrid" + i]: tempGrid,
        ["remain" + i]: 9,
      })
    }
    this.setData({
      hours: 0,
      minutes: 0,
      seconds: 0,

      hintRemain: 3,
      selectButton1: "selectButton1",
      selectButton2: "selectButton2",
      selectButton3: "selectButton3",
      selectButton4: "selectButton4",
      toolButtonCheck: "toolButtonCheck",
      toolButtonErase: "toolButtonErase",
      toolButtonHint: "toolButtonHint",

      backupIsSet: false,

      settingView: "none",
      mode: "请选择难度",
      modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
      alertToolPic: "",
      alertToolText: "",
      alertNum: "",

    })
    answerSheetWithEmpytGrid = [];

    if (easy) {
      //修改页面信息
      wx.setNavigationBarTitle({
        title: '数独挑战（简）'
      })

      //调用制作数独函数并返回数独
      gougeSudoku(24, this);
    } else if (middle) {
      //修改页面信息
      wx.setNavigationBarTitle({
        title: '数独挑战（普）'
      })
      //调用制作数独函数并返回数独
      gougeSudoku(32, this);
    } else if (hard) {
      //修改页面信息
      wx.setNavigationBarTitle({
        title: '数独挑战（难）'
      })
      //调用制作数独函数并返回数独
      gougeSudoku(40, this);

    } else if (epic) {
      //修改页面信息
      wx.setNavigationBarTitle({
        title: '数独挑战（噩）'
      })
      //调用制作数独函数并返回数独
      gougeSudoku(48, this);
    } else {
      wx.showToast({
        title: '请选择难度',
        icon: 'none',
        duration: 1000
      })
    }
    wx.showLoading({
      title: '生成中...',
      mask: 'true',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    hideMainPage(this)

    isStop = false
    new timeCount(this);
  },


  // 数字被点击的函数
  numTap(event) {
    var tapNum = event.currentTarget.dataset.num
    playNumSound(volumnInput);
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    var oneShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var oneHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    oneShow.right(-10).step();
    oneHide.right(-60).step();

    if (this.data["is" + tapNum]) {
      this.setData({
        alertNumAnimation: oneHide.export(),
        ["number" + tapNum]: "number",
      })

      changeBgColor("hide", tapNum, this);
      for (var i = 1; i <= 9; i++) {
        this.setData({
          ["is" + i]: false
        })
      }
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: oneShow.export(),
        alertNum: tapNum,
        toolButtonErase: "toolButtonErase",
      })
      for (var i = 1; i <= 9; i++) {
        if (i == tapNum) {
          this.setData({
            ["number" + i]: "numberSelect",
            ["is" + i]: true
          })
        } else {
          this.setData({
            ["number" + i]: "number",
            ["is" + i]: false
          })
        }
      }
      changeBgColor("show", tapNum, this);
      isSelect = tapNum;
      if (isErase) {
        var alertToolHide = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        alertToolHide.left(-100).step();
        this.setData({
          alertToolAnimation: alertToolHide.export(),
        })
        isErase = false;
      }
    }
  },

  //结束页面确认按钮点击
  confirmGameEnd() {
    this.setData({
      summaryPage: "none",
      welcomePage: "block",
    })
  },


  //设置
  setting() {
    wx.vibrateShort(),
      isStop = true
    this.setData({
      settingView: "block",
    })
  },
  settingBack() {
    var Hide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    isStop = true

    playNumSound(volumnInput);
    Hide.right(-60).step();
    wx.vibrateShort(),
      this.setData({
        alertNumAnimation: Hide.export(),
        welcomePage: "block",
        settingView: "none",
      })

    app.globalData.sudoku_play_time = (app.globalData.sudoku_play_time + this.data.hours * 3600 + this.data.minutes * 60 + this.data.seconds)
    wx.setStorageSync('sqlSudoku_play_time', app.globalData.sudoku_play_time)

    //修改页面信息
    wx.setNavigationBarTitle({
      title: '数独挑战（简）'
    })
    easy = false;
    middle = false;
    hard = false;
    epic = false;
  },
  settingContinue() {
    playNumSound(volumnInput);
    isStop = false
    timeCount(this)
    wx.vibrateShort(),
      this.setData({
        settingView: "none",
      })
  },
  settingVolumn() {
    if (getApp().globalData.vibration == true) {
      wx.vibrateShort();
    }
    if (volumnInput != 0) {
      this.setData({
        isVolumnOn: "开启声音",
      })
      volumnInput = 0;
    } else {
      this.setData({
        isVolumnOn: "关闭声音",
      })
      volumnInput = 1;
    }

  },

  //点击数独表的方法
  sudokuTap(e) {
    if (this.data.backupIsSet == false) {
      setBackup(answerSheetWithEmpytGrid);
      this.setData({
        backupIsSet: true,
      })
    }

    var gridsGroup = e.currentTarget.dataset.grids;

    if (gridsGroup.indexOf("sudokuOne") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid1";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    } else if (gridsGroup.indexOf("sudokuTwo") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid2";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    } else if (gridsGroup.indexOf("sudokuThree") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid3";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    } else if (gridsGroup.indexOf("sudokuFour") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid4";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    } else if (gridsGroup.indexOf("sudokuFive") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid5";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    } else if (gridsGroup.indexOf("sudokuSix") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid6";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    } else if (gridsGroup.indexOf("sudokuSeven") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid7";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    } else if (gridsGroup.indexOf("sudokuEight") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid8";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    } else if (gridsGroup.indexOf("sudokuNine") >= 0) {
      var distinctPlaceOld = gridsGroup.replace(/[^\d]/g, '');
      var distinctPlace = distinctPlaceOld - 1;
      var sudokuGridNum = "sudokuGrid9";
      if (isPencil == false) {
        userInputNum(this, distinctPlace, sudokuGridNum);
      }
    }

    //减去不应该在提示数组中的元素(创建必要数组)
    var deleteCorrectElement = []; //这个是一个9x9数组，记录的是所有写对的元素


    //检查是否完成
    var temporaryGrid1 = this.data.sudokuGrid1
    var temporaryGrid2 = this.data.sudokuGrid2
    var temporaryGrid3 = this.data.sudokuGrid3
    var temporaryGrid4 = this.data.sudokuGrid4
    var temporaryGrid5 = this.data.sudokuGrid5
    var temporaryGrid6 = this.data.sudokuGrid6
    var temporaryGrid7 = this.data.sudokuGrid7
    var temporaryGrid8 = this.data.sudokuGrid8
    var temporaryGrid9 = this.data.sudokuGrid9

    for (var j = 1; j <= 9; j++) {
      var sudokuIndex = "";
      var x = 0;
      var y = 0;
      var grid = 0;
      if (j == 1) {
        sudokuIndex = temporaryGrid1
        x = 0;
        y = 0;
        grid = 1;
      } else if (j == 2) {
        sudokuIndex = temporaryGrid2
        x = 0;
        y = 3;
        grid = 2;
      } else if (j == 3) {
        sudokuIndex = temporaryGrid3
        x = 0;
        y = 6;
        grid = 3;
      } else if (j == 4) {
        sudokuIndex = temporaryGrid4
        x = 3;
        y = 0;
        grid = 4;
      } else if (j == 5) {
        sudokuIndex = temporaryGrid5
        x = 3;
        y = 3;
        grid = 5;
      } else if (j == 6) {
        sudokuIndex = temporaryGrid6
        x = 3;
        y = 6;
        grid = 6;
      } else if (j == 7) {
        sudokuIndex = temporaryGrid7
        x = 6;
        y = 0;
        grid = 7;
      } else if (j == 8) {
        sudokuIndex = temporaryGrid8
        x = 6;
        y = 3;
        grid = 8;
      } else if (j == 9) {
        sudokuIndex = temporaryGrid9
        x = 6;
        y = 6;
        grid = 9;
      }
      for (var i = 0; i < 9; i++) {
        if (i < 3) {
          if (sudokuIndex[i].value == sudokuTableBackup[x][i + y]) {
            deleteCorrectElement.push([x, (i + y), sudokuIndex[i].value]);
          }
        }
        if (i >= 3 && i < 6) {
          if (sudokuIndex[i].value == sudokuTableBackup[x + 1][i - 3 + y]) {
            deleteCorrectElement.push([(x + 1), (i - 3 + y), sudokuIndex[i].value]);
          }
        }
        if (i >= 6 && i < 9) {
          if (sudokuIndex[i].value == sudokuTableBackup[x + 2][i - 6 + y]) {
            deleteCorrectElement.push([(x + 2), (i - 6 + y), sudokuIndex[i].value]);
          }
        }
      }
    }

    //减去不应该在提示数组中的元素（执行逻辑）
    for (var i = 0; i < answerSheetWithEmpytGrid.length; i++) {
      for (var j = 0; j < deleteCorrectElement.length; j++) {
        if (answerSheetWithEmpytGrid[i][0] != "" && answerSheetWithEmpytGrid[i][0] != undefined) {
          if (answerSheetWithEmpytGrid[i][0] == deleteCorrectElement[j][0] &&
            answerSheetWithEmpytGrid[i][1] == deleteCorrectElement[j][1] &&
            answerSheetWithEmpytGrid[i][2] == deleteCorrectElement[j][2]
          ) {
            answerSheetWithEmpytGrid.splice(i, 1)
          }
        }
      }
    }

    //加上用户删除的正确答案的提示数组元素
    if (answerSheetWithEmpytGrid.length + deleteCorrectElement.length < 81) {
      var missingElement = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          missingElement[i][j] = sudokuTableBackup[i][j]
        }
      }

      for (var i = 0; i < answerSheetWithEmpytGrid.length; i++) {
        missingElement[answerSheetWithEmpytGrid[i][0]][answerSheetWithEmpytGrid[i][1]] = 0
      }
      for (var i = 0; i < deleteCorrectElement.length; i++) {
        missingElement[deleteCorrectElement[i][0]][deleteCorrectElement[i][1]] = 0
      }

      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (missingElement[i][j] != 0 && missingElement[i][j] != undefined && missingElement[i][j] != "") {
            answerSheetWithEmpytGrid.push([i, j, missingElement[i][j]]);
          }
        }
      }
    }

    //检查是否有重复
    checkIfRepeat(this)

    //检查是否某个数字已经用完

    for (var i = 1; i <= 9; i++) {
      if (this.data["remain" + i] == 0) {
        this.setData({
          ["numStyle" + i]: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          ["numStyle" + i]: "",
        })
      }
    }


    //已完成
    if (deleteCorrectElement.length == 81) {
      wx.showToast({
        title: '完成！',
      })
      isStop = true
      playSuccessSound(volumnInput);
      wx.vibrateLong();
      this.setData({
        summaryPage: "block",
        useHintAmount: 3 - this.data.hintRemain,
        completeTime: this.data.hours * 3600 + this.data.minutes * 60 + this.data.seconds,
      })

      var completeTimeCount = this.data.completeTime;
      this.setData({
        completeTime: 0,
      })
      completeTimeCount: setInterval(() => {
        var that = this;
        if (that.data.completeTime < completeTimeCount) {
          that.setData({
            completeTime: that.data.completeTime += 1,
          })
        } else {
          clearInterval(completeTimeCount)
        }
      }, 30);

      updateInfoFunction(this)

      easy = false;
      middle = false;
      hard = false;
      epic = false;
    }

  },

  goToTour() {
    wx.navigateTo({
      url: '/tourPage/sudokuTour/sudokuTour',
    })
  },


  //当页面隐藏停止计数器
  onHide: function () {
    isStop = true
  },

  onUnload: function () {
    isStop = true
    var that = this
    //修改页面信息
    wx.setNavigationBarTitle({
      title: '数独挑战（简）'
    })
    app.globalData.sudoku_play_time = (app.globalData.sudoku_play_time + that.data.hours * 3600 + that.data.minutes * 60 + that.data.seconds)
    wx.setStorageSync('sqlSudoku_play_time', app.globalData.sudoku_play_time)
  },

  onLoad: function () {
    app.fetchInfo();
  },

  //当页面显示时，加载缓存中的图片
  onShow: function () {
    var that = this;

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

    //获取用户经验和等级
    that.setData({
      userLevel: app.globalData.level,
      expPercentage: Math.floor((app.globalData.exp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100,
    })
  },

})