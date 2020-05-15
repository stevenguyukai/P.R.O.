var app = getApp()

//橡皮工具是否点击的变量
var isErase = false;

//铅笔工具是否点击的变量
var isPencil = false;

//数字变量
var isOne = false;
var isTwo = false;
var isThree = false;
var isFour = false;
var isFive = false;
var isSix = false;
var isSeven = false;
var isEight = false;
var isNine = false;
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
  //把真值表中的第一大行赋值给显示的表格
  for (var k = 0; k < 3; k++) {
    for (var i = 0; i < 9; i++) {
      if (i < 3) {
        var numChange1 = "sudokuGrid1[" + (i + k * 3) + "].value";
        that.setData({
          [numChange1]: sudokuTable[k][i],
        })
      } else if (i >= 3 && i < 6) {
        var numChange2 = "sudokuGrid2[" + (i - 3 + k * 3) + "].value";
        that.setData({
          [numChange2]: sudokuTable[k][i],
        })
      } else {
        var numChange3 = "sudokuGrid3[" + (i - 6 + k * 3) + "].value";
        that.setData({
          [numChange3]: sudokuTable[k][i],
        })
      }
    }
  }
  //把真值表中的第二大行赋值给显示的表格
  for (var k = 0; k < 3; k++) {
    for (var i = 0; i < 9; i++) {
      if (i < 3) {
        var numChange4 = "sudokuGrid4[" + (i + k * 3) + "].value";
        that.setData({
          [numChange4]: sudokuTable[k + 3][i],
        })
      } else if (i >= 3 && i < 6) {
        var numChange5 = "sudokuGrid5[" + (i - 3 + k * 3) + "].value";
        that.setData({
          [numChange5]: sudokuTable[k + 3][i],
        })
      } else {
        var numChange6 = "sudokuGrid6[" + (i - 6 + k * 3) + "].value";
        that.setData({
          [numChange6]: sudokuTable[k + 3][i],
        })
      }
    }
  }
  //把真值表中的第三大行赋值给显示的表格
  for (var k = 0; k < 3; k++) {
    for (var i = 0; i < 9; i++) {
      if (i < 3) {
        var numChange7 = "sudokuGrid7[" + (i + k * 3) + "].value";
        that.setData({
          [numChange7]: sudokuTable[k + 6][i],
        })
      } else if (i >= 3 && i < 6) {
        var numChange8 = "sudokuGrid8[" + (i - 3 + k * 3) + "].value";
        that.setData({
          [numChange8]: sudokuTable[k + 6][i],
        })
      } else {
        var numChange9 = "sudokuGrid9[" + (i - 6 + k * 3) + "].value";
        that.setData({
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
      if (sudokuTable[i][k] == 1) {
        that.setData({
          oneRemain: that.data.oneRemain - 1,
        })
      } else if (sudokuTable[i][k] == 2) {
        that.setData({
          twoRemain: that.data.twoRemain - 1,
        })
      } else if (sudokuTable[i][k] == 3) {
        that.setData({
          threeRemain: that.data.threeRemain - 1,
        })
      } else if (sudokuTable[i][k] == 4) {
        that.setData({
          fourRemain: that.data.fourRemain - 1,
        })
      } else if (sudokuTable[i][k] == 5) {
        that.setData({
          fiveRemain: that.data.fiveRemain - 1,
        })
      } else if (sudokuTable[i][k] == 6) {
        that.setData({
          sixRemain: that.data.sixRemain - 1,
        })
      } else if (sudokuTable[i][k] == 7) {
        that.setData({
          sevenRemain: that.data.sevenRemain - 1,
        })
      } else if (sudokuTable[i][k] == 8) {
        that.setData({
          eightRemain: that.data.eightRemain - 1,
        })
      } else if (sudokuTable[i][k] == 9) {
        that.setData({
          nineRemain: that.data.nineRemain - 1,
        })
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
  if (selectNum == 1) {
    that.setData({
      oneRemain: that.data.oneRemain - 1,
    })

  } else if (selectNum == 2) {
    that.setData({
      twoRemain: that.data.twoRemain - 1,
    })
  } else if (selectNum == 3) {
    that.setData({
      threeRemain: that.data.threeRemain - 1,
    })
  } else if (selectNum == 4) {
    that.setData({
      fourRemain: that.data.fourRemain - 1,
    })
  } else if (selectNum == 5) {
    that.setData({
      fiveRemain: that.data.fiveRemain - 1,
    })
  } else if (selectNum == 6) {
    that.setData({
      sixRemain: that.data.sixRemain - 1,
    })
  } else if (selectNum == 7) {
    that.setData({
      sevenRemain: that.data.sevenRemain - 1,
    })
  } else if (selectNum == 8) {
    that.setData({
      eightRemain: that.data.eightRemain - 1,
    })
  } else if (selectNum == 9) {
    that.setData({
      nineRemain: that.data.nineRemain - 1,
    })
  }
}

//加上剩余数字
function addRemainNum(selectNum, that) {
  if (selectNum == 1) {
    that.setData({
      oneRemain: that.data.oneRemain + 1,
    })
  } else if (selectNum == 2) {
    that.setData({
      twoRemain: that.data.twoRemain + 1,
    })
  } else if (selectNum == 3) {
    that.setData({
      threeRemain: that.data.threeRemain + 1,
    })
  } else if (selectNum == 4) {
    that.setData({
      fourRemain: that.data.fourRemain + 1,
    })
  } else if (selectNum == 5) {
    that.setData({
      fiveRemain: that.data.fiveRemain + 1,
    })
  } else if (selectNum == 6) {
    that.setData({
      sixRemain: that.data.sixRemain + 1,
    })
  } else if (selectNum == 7) {
    that.setData({
      sevenRemain: that.data.sevenRemain + 1,
    })
  } else if (selectNum == 8) {
    that.setData({
      eightRemain: that.data.eightRemain + 1,
    })
  } else if (selectNum == 9) {
    that.setData({
      nineRemain: that.data.nineRemain + 1,
    })
  }
}

//减去剩余数字(占领数字)
function deleteRemainNum2(sudokuGridIndex, distinctLoca, that) {
  if (that.data[sudokuGridIndex][distinctLoca].value == 1) {
    that.setData({
      oneRemain: that.data.oneRemain - 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 2) {
    that.setData({
      twoRemain: that.data.twoRemain - 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 3) {
    that.setData({
      threeRemain: that.data.threeRemain - 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 4) {
    that.setData({
      fourRemain: that.data.fourRemain - 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 5) {
    that.setData({
      fiveRemain: that.data.fiveRemain - 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 6) {
    that.setData({
      sixRemain: that.data.sixRemain - 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 7) {
    that.setData({
      sevenRemain: that.data.sevenRemain - 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 8) {
    that.setData({
      eightRemain: that.data.eightRemain - 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 9) {
    that.setData({
      nineRemain: that.data.nineRemain - 1,
    })
  }
}

//加上剩余数字(被占领数字)
function addRemainNum2(sudokuGridIndex, distinctLoca, that) {
  if (that.data[sudokuGridIndex][distinctLoca].value == 1) {
    that.setData({
      oneRemain: that.data.oneRemain + 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 2) {
    that.setData({
      twoRemain: that.data.twoRemain + 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 3) {
    that.setData({
      threeRemain: that.data.threeRemain + 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 4) {
    that.setData({
      fourRemain: that.data.fourRemain + 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 5) {
    that.setData({
      fiveRemain: that.data.fiveRemain + 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 6) {
    that.setData({
      sixRemain: that.data.sixRemain + 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 7) {
    that.setData({
      sevenRemain: that.data.sevenRemain + 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 8) {
    that.setData({
      eightRemain: that.data.eightRemain + 1,
    })
  } else if (that.data[sudokuGridIndex][distinctLoca].value == 9) {
    that.setData({
      nineRemain: that.data.nineRemain + 1,
    })
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
    if (isSelect == 1) {
      var reaminNum = "oneRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 2) {
      var reaminNum = "twoRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 3) {
      var reaminNum = "threeRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 4) {
      var reaminNum = "fourRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 5) {
      var reaminNum = "fiveRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 6) {
      var reaminNum = "sixRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 7) {
      var reaminNum = "sevenRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 8) {
      var reaminNum = "eightRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 9) {
      var reaminNum = "nineRemain"
      //填入数字
      fillInNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

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
    if (isSelect == 1) {
      var reaminNum = "oneRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 2) {
      var reaminNum = "twoRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 3) {
      var reaminNum = "threeRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 4) {
      var reaminNum = "fourRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 5) {
      var reaminNum = "fiveRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 6) {
      var reaminNum = "sixRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 7) {
      var reaminNum = "sevenRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 8) {
      var reaminNum = "eightRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == 9) {
      var reaminNum = "nineRemain"
      fillChangeNum(reaminNum, sudokuGridIndex, that, isSelect, distinctLoca)

    } else if (isSelect == "") {
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
  if (value == 1) {
    that.setData({
      oneRemain: that.data.oneRemain + 1
    })
  } else if (value == 2) {
    that.setData({
      twoRemain: that.data.twoRemain + 1
    })
  } else if (value == 3) {
    that.setData({
      threeRemain: that.data.threeRemain + 1
    })
  } else if (value == 4) {
    that.setData({
      fourRemain: that.data.fourRemain + 1
    })
  } else if (value == 5) {
    that.setData({
      fiveRemain: that.data.fiveRemain + 1
    })
  } else if (value == 6) {
    that.setData({
      sixRemain: that.data.sixRemain + 1
    })
  } else if (value == 7) {
    that.setData({
      sevenRemain: that.data.sevenRemain + 1
    })
  } else if (value == 8) {
    that.setData({
      eightRemain: that.data.eightRemain + 1
    })
  } else if (value == 9) {
    that.setData({
      nineRemain: that.data.nineRemain + 1
    })
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
    userLevel: app.globalData.level,
    expPercentage: addExpPercentage,
  })
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

    backupIsSet: false,

    oneRemain: 9,
    twoRemain: 9,
    threeRemain: 9,
    fourRemain: 9,
    fiveRemain: 9,
    sixRemain: 9,
    sevenRemain: 9,
    eightRemain: 9,
    nineRemain: 9,

    isVolumnOn: "开启声音",
    settingView: "none",
    welcomePage: "block",
    mode: "请选择难度",
    modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
    alertToolPic: "",
    alertToolText: "",
    alertNum: "",
    sudokuGrid1: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
    sudokuGrid2: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
    sudokuGrid3: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
    sudokuGrid4: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
    sudokuGrid5: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
    sudokuGrid6: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
    sudokuGrid7: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
    sudokuGrid8: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
    sudokuGrid9: [{
      "id": "1",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "2",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "3",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "4",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "5",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "6",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "7",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "8",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }, {
      "id": "9",
      "value": 0,
      "fontColor": "#5e6473",
      "backgroundColor": "none",
    }],
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
    wx.vibrateShort();
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
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      isPencil = false;
      this.setData({
        alertToolAnimation: alertToolShow.export(),
        toolButtonPencil: "toolButtonPencil",
        toolButtonErase: "toolButtonEraseSelect",
        number1: "number",
        number2: "number",
        number3: "number",
        number4: "number",
        number5: "number",
        number6: "number",
        number7: "number",
        number8: "number",
        number9: "number",
      })
      isErase = true;
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
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
      wx.vibrateShort();
      if (answerSheetWithEmpytGrid.length == 0) {
        //已完成
        wx.showToast({
          title: '完成！',
        })
        isStop = true
        playSuccessSound(volumnInput);
        wx.vibrateLong();
        this.setData({
          welcomePage: "block",
        })

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
        if (hintValue == 1) {
          this.setData({
            oneRemain: this.data.oneRemain - 1
          })
        } else if (hintValue == 2) {
          this.setData({
            twoRemain: this.data.twoRemain - 1
          })
        } else if (hintValue == 3) {
          this.setData({
            threeRemain: this.data.threeRemain - 1
          })
        } else if (hintValue == 4) {
          this.setData({
            fourRemain: this.data.fourRemain - 1
          })
        } else if (hintValue == 5) {
          this.setData({
            fiveRemain: this.data.fiveRemain - 1
          })
        } else if (hintValue == 6) {
          this.setData({
            sixRemain: this.data.sixRemain - 1
          })
        } else if (hintValue == 7) {
          this.setData({
            sevenRemain: this.data.sevenRemain - 1
          })
        } else if (hintValue == 8) {
          this.setData({
            eightRemain: this.data.eightRemain - 1
          })
        } else if (hintValue == 9) {
          this.setData({
            nineRemain: this.data.nineRemain - 1
          })
        }
        answerSheetWithEmpytGrid.splice(randomHintNum, 1);
        //检查是否某个数字已经用完
        for (var i = 0; i < 1; i++) {
          if (this.data.oneRemain <= 0) {
            this.setData({
              numStyle1: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle1: "",
            })
          }
          if (this.data.twoRemain <= 0) {
            this.setData({
              numStyle2: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle2: "",
            })
          }
          if (this.data.threeRemain <= 0) {
            this.setData({
              numStyle3: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle3: "",
            })
          }
          if (this.data.fourRemain <= 0) {
            this.setData({
              numStyle4: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle4: "",
            })
          }
          if (this.data.fiveRemain <= 0) {
            this.setData({
              numStyle5: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle5: "",
            })
          }
          if (this.data.sixRemain <= 0) {
            this.setData({
              numStyle6: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle6: "",
            })
          }
          if (this.data.sevenRemain <= 0) {
            this.setData({
              numStyle7: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle7: "",
            })
          }
          if (this.data.eightRemain <= 0) {
            this.setData({
              numStyle8: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle8: "",
            })
          }
          if (this.data.nineRemain <= 0) {
            this.setData({
              numStyle9: "color: #bbb;background-color:#ddd",
            })
          } else {
            this.setData({
              numStyle9: "",
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
    isStop = true
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
          welcomePage: "block",
          settingView: "none",
        })
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
    wx.vibrateShort();
    this.setData({
      modePic: easyPic,
      mode: "进入简单模式",
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

    wx.vibrateShort();
    this.setData({
      mode: "进入普通模式",
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
    wx.vibrateShort();
    this.setData({
      mode: "进入困难模式",
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
    wx.vibrateShort();
    this.setData({
      mode: "进入噩梦模式",
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
    this.setData({
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

      backupIsSet: false,

      oneRemain: 9,
      twoRemain: 9,
      threeRemain: 9,
      fourRemain: 9,
      fiveRemain: 9,
      sixRemain: 9,
      sevenRemain: 9,
      eightRemain: 9,
      nineRemain: 9,

      settingView: "none",
      mode: "请选择难度",
      modePic: "https://assets-ouch.icons8.com/thumb/947/78044b60-a128-4312-9f75-7d043fa90f4b.png",
      alertToolPic: "",
      alertToolText: "",
      alertNum: "",
      sudokuGrid1: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],
      sudokuGrid2: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],
      sudokuGrid3: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],
      sudokuGrid4: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],
      sudokuGrid5: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],
      sudokuGrid6: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],
      sudokuGrid7: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],
      sudokuGrid8: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],
      sudokuGrid9: [{
        "id": "1",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "2",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "3",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "4",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "5",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "6",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "7",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "8",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }, {
        "id": "9",
        "value": 0,
        "fontColor": "#5e6473",
        "backgroundColor": "none",
      }],

      oneRemain: 9,
      twoRemain: 9,
      threeRemain: 9,
      fourRemain: 9,
      fiveRemain: 9,
      sixRemain: 9,
      sevenRemain: 9,
      eightRemain: 9,
      nineRemain: 9,

    })
    answerSheetWithEmpytGrid = [];

    if (easy) {
      //修改页面信息
      wx.setNavigationBarTitle({
        title: '数独挑战（简）'
      })

      //调用制作数独函数并返回数独
      gougeSudoku(24, this);

      wx.showLoading({
        title: '生成中...',
        mask: 'true',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 500)

      hideMainPage(this)

    } else if (middle) {
      //修改页面信息
      wx.setNavigationBarTitle({
        title: '数独挑战（普）'
      })

      //调用制作数独函数并返回数独
      gougeSudoku(32, this);

      wx.showLoading({
        title: '生成中...',
        mask: 'true',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 500)

      hideMainPage(this)


    } else if (hard) {
      //修改页面信息
      wx.setNavigationBarTitle({
        title: '数独挑战（难）'
      })

      //调用制作数独函数并返回数独
      gougeSudoku(40, this);

      wx.showLoading({
        title: '生成中...',
        mask: 'true',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 500)
      hideMainPage(this)


    } else if (epic) {
      //修改页面信息
      wx.setNavigationBarTitle({
        title: '数独挑战（噩）'
      })

      //调用制作数独函数并返回数独
      gougeSudoku(48, this);

      wx.showLoading({
        title: '生成中...',
        mask: 'true',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 500)
      hideMainPage(this)


    } else {
      wx.showToast({
        title: '请选择难度',
        icon: 'none',
        duration: 1000
      })
    }

    isStop = false
    new timeCount(this);
  },


  // 数字被点击的函数
  one() {
    playNumSound(volumnInput);
    wx.vibrateShort();
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

    if (isOne) {
      this.setData({
        alertNumAnimation: oneHide.export(),
        number1: "number",
      })

      changeBgColor("hide", 1, this);

      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: oneShow.export(),
        alertNum: "1",
        number1: "numberSelect",
        toolButtonErase: "toolButtonErase",
        number2: "number",
        number3: "number",
        number4: "number",
        number5: "number",
        number6: "number",
        number7: "number",
        number8: "number",
        number9: "number",
      })
      changeBgColor("show", 1, this);
      isOne = true;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 1;
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
  two() {
    playNumSound(volumnInput);
    wx.vibrateShort();
    var twoShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var twoHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    twoShow.right(-10).step();
    twoHide.right(-60).step();

    if (isTwo) {
      this.setData({
        alertNumAnimation: twoHide.export(),
        number2: "number",
      })
      changeBgColor("hide", 2, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: twoShow.export(),
        alertNum: "2",
        toolButtonErase: "toolButtonErase",
        number1: "number",
        number2: "numberSelect",
        number3: "number",
        number4: "number",
        number5: "number",
        number6: "number",
        number7: "number",
        number8: "number",
        number9: "number",
      })
      changeBgColor("show", 2, this);
      isOne = false;
      isTwo = true;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 2;
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
  three() {
    playNumSound(volumnInput);
    wx.vibrateShort();
    var threeShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var threeHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    threeShow.right(-10).step();
    threeHide.right(-60).step();

    if (isThree) {
      this.setData({
        alertNumAnimation: threeHide.export(),
        number3: "number",
      })
      changeBgColor("hide", 3, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: threeShow.export(),
        alertNum: "3",
        toolButtonErase: "toolButtonErase",
        number1: "number",
        number2: "number",
        number3: "numberSelect",
        number4: "number",
        number5: "number",
        number6: "number",
        number7: "number",
        number8: "number",
        number9: "number",
      })
      changeBgColor("show", 3, this);
      isOne = false;
      isTwo = false;
      isThree = true;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 3;
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
  four() {
    playNumSound(volumnInput);
    wx.vibrateShort();
    var fourShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var fourHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    fourShow.right(-10).step();
    fourHide.right(-60).step();

    if (isFour) {
      this.setData({
        alertNumAnimation: fourHide.export(),
        number4: "number",
      })
      changeBgColor("hide", 4, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: fourShow.export(),
        alertNum: "4",
        toolButtonErase: "toolButtonErase",
        number1: "number",
        number2: "number",
        number3: "number",
        number4: "numberSelect",
        number5: "number",
        number6: "number",
        number7: "number",
        number8: "number",
        number9: "number",
      })
      changeBgColor("show", 4, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = true;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 4;
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
  five() {
    playNumSound(volumnInput);
    wx.vibrateShort();
    var fiveShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var fiveHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    fiveShow.right(-10).step();
    fiveHide.right(-60).step();

    if (isFive) {
      this.setData({
        alertNumAnimation: fiveHide.export(),
        number5: "number",
      })
      changeBgColor("hide", 5, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: fiveShow.export(),
        alertNum: "5",
        toolButtonErase: "toolButtonErase",
        number1: "number",
        number2: "number",
        number3: "number",
        number4: "number",
        number5: "numberSelect",
        number6: "number",
        number7: "number",
        number8: "number",
        number9: "number",
      })
      changeBgColor("show", 5, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = true;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 5;
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
  six() {
    playNumSound(volumnInput);
    wx.vibrateShort();
    var sixShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var sixHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    sixShow.right(-10).step();
    sixHide.right(-60).step();

    if (isSix) {
      this.setData({
        alertNumAnimation: sixHide.export(),
        number6: "number",
      })
      changeBgColor("hide", 6, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: sixShow.export(),
        alertNum: "6",
        toolButtonErase: "toolButtonErase",
        number1: "number",
        number2: "number",
        number3: "number",
        number4: "number",
        number5: "number",
        number6: "numberSelect",
        number7: "number",
        number8: "number",
        number9: "number",
      })
      changeBgColor("show", 6, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = true;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 6;
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
  seven() {
    playNumSound(volumnInput);
    wx.vibrateShort();
    var sevenShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var sevenHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    sevenShow.right(-10).step();
    sevenHide.right(-60).step();

    if (isSeven) {
      this.setData({
        alertNumAnimation: sevenHide.export(),
        number7: "number",
      })
      changeBgColor("hide", 7, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: sevenShow.export(),
        alertNum: "7",
        toolButtonErase: "toolButtonErase",
        number1: "number",
        number2: "number",
        number3: "number",
        number4: "number",
        number5: "number",
        number6: "number",
        number7: "numberSelect",
        number8: "number",
        number9: "number",
      })
      changeBgColor("show", 7, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = true;
      isEight = false;
      isNine = false;
      isSelect = 7;
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
  eight() {
    playNumSound(volumnInput);
    wx.vibrateShort();
    var eightShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var eightHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    eightShow.right(-10).step();
    eightHide.right(-60).step();

    if (isEight) {
      this.setData({
        alertNumAnimation: eightHide.export(),
        number8: "number",
      })
      changeBgColor("hide", 8, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: eightShow.export(),
        alertNum: "8",
        toolButtonErase: "toolButtonErase",
        number1: "number",
        number2: "number",
        number3: "number",
        number4: "number",
        number5: "number",
        number6: "number",
        number7: "number",
        number8: "numberSelect",
        number9: "number",
      })
      changeBgColor("show", 8, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = true;
      isNine = false;
      isSelect = 8;
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
  nine() {
    playNumSound(volumnInput);
    wx.vibrateShort();
    var nineShow = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })
    var nineHide = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
    })

    nineShow.right(-10).step();
    nineHide.right(-60).step();

    if (isNine) {
      this.setData({
        alertNumAnimation: nineHide.export(),
        number9: "number",
      })
      changeBgColor("hide", 9, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = false;
      isSelect = 10;
    } else {
      this.setData({
        alertNumAnimation: nineShow.export(),
        alertNum: "9",
        toolButtonErase: "toolButtonErase",
        number1: "number",
        number2: "number",
        number3: "number",
        number4: "number",
        number5: "number",
        number6: "number",
        number7: "number",
        number8: "number",
        number9: "numberSelect",
      })
      changeBgColor("show", 9, this);
      isOne = false;
      isTwo = false;
      isThree = false;
      isFour = false;
      isFive = false;
      isSix = false;
      isSeven = false;
      isEight = false;
      isNine = true;
      isSelect = 9;
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
    wx.vibrateShort();
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
    for (var i = 0; i < 1; i++) {
      if (this.data.oneRemain == 0) {
        this.setData({
          numStyle1: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle1: "",
        })
      }
      if (this.data.twoRemain == 0) {
        this.setData({
          numStyle2: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle2: "",
        })
      }
      if (this.data.threeRemain == 0) {
        this.setData({
          numStyle3: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle3: "",
        })
      }
      if (this.data.fourRemain == 0) {
        this.setData({
          numStyle4: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle4: "",
        })
      }
      if (this.data.fiveRemain == 0) {
        this.setData({
          numStyle5: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle5: "",
        })
      }
      if (this.data.sixRemain == 0) {
        this.setData({
          numStyle6: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle6: "",
        })
      }
      if (this.data.sevenRemain == 0) {
        this.setData({
          numStyle7: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle7: "",
        })
      }
      if (this.data.eightRemain == 0) {
        this.setData({
          numStyle8: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle8: "",
        })
      }
      if (this.data.nineRemain == 0) {
        this.setData({
          numStyle9: "color: #bbb;background-color:#ddd",
        })
      } else {
        this.setData({
          numStyle9: "",
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
        welcomePage: "block",
      })

      updateInfoFunction(this)

      easy = false;
      middle = false;
      hard = false;
      epic = false;
    }

  },


  //当页面隐藏停止计数器
  onHide: function () {
    isStop = true
  },

  onUnload: function () {
    isStop = true
    var that = this
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

    //获取用户经验和等级
    that.setData({
      userLevel: app.globalData.level,
      expPercentage: Math.floor((app.globalData.exp / (200 * Math.pow(1.25, app.globalData.level))) * 100 * 100) / 100,
    })
  },

})