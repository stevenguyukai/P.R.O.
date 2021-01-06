var app = getApp();
import F2 from '../../f2-canvas/lib/f2';
let chart = null;
let chart1 = null;
let chart2 = null;
let chart3 = null;
let chart4 = null;
let chart5 = null;
let chart6 = null;

var dateNeedBeMinusOne;

// 雷达图 数据 　
var logicScore = app.globalData.permanentLogicalScore
var reactScore = app.globalData.permanentReactScore
var memoryScore = app.globalData.permanentMemoryScore
var multitaskScore = app.globalData.permanentMultitaskScore
var focusScore = app.globalData.permanentFocusScore
var observationScore = app.globalData.permanentObservationScore
var polarGraphMaxValue
var polarGraphLinecolor = "#3d4050"

//计算日期减一 (20201201 - 1  = 20201130)
function dateMinusOne(date) {
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
  dateNeedBeMinusOne = newDate
}

//雷达图
function initChart(canvas, width, height) { // 使用 F2 绘制图表
  const data = [{
    item: '逻辑力',
    score: logicScore
  }, {
    item: '反应力',
    score: reactScore
  }, {
    item: '记忆力',
    score: memoryScore
  }, {
    item: '观察力',
    score: observationScore
  }, {
    item: '专注力',
    score: focusScore
  }, {
    item: 'Multitask',
    score: multitaskScore
  }];
  chart = new F2.Chart({
    el: canvas,
    width: wx.getSystemInfoSync().screenWidth / 1.2,
    height: wx.getSystemInfoSync().screenHeight / 1.2,
  });

  chart.coord('polar');
  chart.source(data, {
    score: {
      min: 0,
      max: polarGraphMaxValue,
      nice: true,
      tickCount: 4
    }
  });
  chart.tooltip({
    alwaysShow: false, // 当移出触发区域，是否仍显示提示框内容，默认为 false，移出触发区域 tooltip 消失，设置为 true 可以保证一直显示提示框内容
    offsetX: 0, // x 方向的偏移
    offsetY: 0, // y 方向的偏移
    triggerOn: ['touchstart', 'touchmove'], // tooltip 出现的触发行为，可自定义，用法同 legend 的 triggerOn
    triggerOff: 'touchend', // 消失的触发行为，可自定义
    showTitle: true, // 是否展示标题，默认不展示
    showCrosshairs: false, // 是否显示辅助线，点图、路径图、线图、面积图默认展示
    crosshairsStyle: {
      stroke: 'rgba(0, 0, 0, 0.25)',
      lineWidth: 1
    }, // 配置辅助线的样式
    showTooltipMarker: true, // 是否显示 tooltipMarker
    tooltipMarkerStyle: {
      fill: '#fff' // 设置 tooltipMarker 的样式
    },
    background: {
      radius: 2,
      fill: '#86b0ec',
      padding: [6, 10]
    }, // tooltip 内容框的背景样式
    titleStyle: {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'start',
      textBaseline: 'top'
    }, // tooltip 标题的文本样式配置，showTitle 为 false 时不生效
    nameStyle: {
      fontSize: 16,
      fill: '#fff',
      textAlign: 'start',
      textBaseline: 'middle'
    }, // tooltip name 项的文本样式配置
    valueStyle: {
      fontSize: 20,
      fill: '#fff',
      textAlign: 'start',
      textBaseline: 'middle'
    }, // tooltip value 项的文本样式配置
    showItemMarker: true, // 是否展示每条记录项前面的 marker
    itemMarkerStyle: {
      radius: 4,
      symbol: 'circle',
      lineWidth: 1,
      stroke: '#fff'
    }, // 每条记录项前面的 marker 的样式配置
  });
  chart.axis('score', {
    label: function label(text, index, total) {
      if (index === total - 1) {
        return null;
      }
      return {
        top: false,
        stroke: polarGraphLinecolor,
        opacity: 0.7
      };
    },
    grid: function grid(text) {
      if (text == polarGraphMaxValue) {
        return {
          lineDash: null,
          stroke: polarGraphLinecolor
        };
      }
      return {
        stroke: polarGraphLinecolor
      };
    },
  });
  chart.axis('item', {
    label: {
      fontSize: 14,
      stroke: '#86b0ec'
    },
    grid: function grid() {
      return {
        stroke: polarGraphLinecolor,
      };
    }
  });
  chart.area().position('item*score').color('orange')
    .animate({
      appear: {
        animation: 'groupWaveIn'
      }
    });
  chart.line().position('item*score').color('orange')
    .animate({
      appear: {
        animation: 'groupWaveIn',
        delay: 700
      }
    });
  chart.point().position('item*score').color('orange')
    .style({
      stroke: 'orange',
      lineWidth: 2
    })
    .animate({
      appear: {
        delay: 400
      }
    });
  chart.render();
  return chart;
}

//初始化 细节图 反应力
function initChartReact(canvas) {
  var data = [];
  app.updateBrainScore("React", 0)
  for (var i = 1; i <= 14; i++) {
    if (app.globalData.temReactScore[i].date.length < 6) {
      continue
    } else {
      data.push({
        date: app.globalData.temReactScore[i].date.substring(0, 4) + "-" + app.globalData.temReactScore[i].date.substring(4, 6) + "-" + app.globalData.temReactScore[i].date.substring(6, 8),
        score: app.globalData.temReactScore[i].score,
      })
    }
  }


  // 绘制折线图
  chart1 = new F2.Chart({
    el: canvas,
    width: wx.getSystemInfoSync().screenWidth / 1.2,
    height: wx.getSystemInfoSync().screenHeight / 3,
  });

  chart1.source(data, {
    date: {
      type: "timeCat",
      mask: "MM月DD日",
      range: [0, 1],
      nice: true
    },
    score: {
      tickCount: 4,
      min: 0
    }
  });
  chart1.axis('date', {
    tickLine: {
      length: 4,
      lineWidth: 1,
      stroke: '#e8e8e8'
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart1.axis('score', {
    grid: function grid() {
      return {
        stroke: polarGraphLinecolor,
      };
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart1.line().position('date*score');

  // 半径通过传入函数来实现只显示特定的数据点
  chart1.point().position('date*score').style('date', {
    stroke: '#1890ff',
    lineWidth: 1,
    fill: '#FFF',
  });

  const forecastData = data.slice(0, 3);
  forecastData.forEach(function (obj) {
    // 预测数据点添加point和label
    chart1.guide().point({
      position: [obj.date, obj.score],
      style: {
        fill: '#e87d7a',
        r: 4
      }
    });
    chart1.guide().text({
      position: [obj.date, obj.score],
      content: obj.score,
      style: {
        fill: '#e87d7a',
        textAlign: 'center'
      },
      offsetY: -15
    });
    chart1.guide().regionFilter({
      start: [obj.date, '100%'],
      end: ['100%', '100%'],
      color: '#fff',
      style: {
        lineDash: [3, 8]
      }
    });
  });

  // 绘制预测部分区域的背景
  chart1.guide().rect({
    start: ["84%", '100%'],
    end: ['max', 'max'],
    style: {
      fill: '#e87d7a',
      fillOpacity: 0.1
    }
  });

  chart1.render();
  return chart1;
}

//初始化 细节图 多线处理
function initChartMultitask(canvas) {

  var data = [];
  app.updateBrainScore("Multitask", 0)
  for (var i = 1; i <= 14; i++) {
    if (app.globalData.temMultitaskScore[i].date.length < 6) {
      continue
    } else {
      data.push({
        date: app.globalData.temMultitaskScore[i].date.substring(0, 4) + "-" + app.globalData.temMultitaskScore[i].date.substring(4, 6) + "-" + app.globalData.temMultitaskScore[i].date.substring(6, 8),
        score: app.globalData.temMultitaskScore[i].score,
      })
    }
  }

  // 绘制折线图
  chart2 = new F2.Chart({
    el: canvas,
    width: wx.getSystemInfoSync().screenWidth / 1.2,
    height: wx.getSystemInfoSync().screenHeight / 3,
  });

  chart2.source(data, {
    date: {
      type: "timeCat",
      mask: "MM月DD日",
      range: [0, 1],
      nice: true
    },
    score: {
      tickCount: 4,
      min: 0
    }
  });
  chart2.axis('date', {
    tickLine: {
      length: 4,
      lineWidth: 1,
      stroke: '#e8e8e8'
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart2.axis('score', {
    grid: function grid() {
      return {
        stroke: polarGraphLinecolor,
      };
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart2.line().position('date*score');

  // 半径通过传入函数来实现只显示特定的数据点
  chart2.point().position('date*score').style('date', {
    stroke: '#1890ff',
    lineWidth: 1,
    fill: '#FFF',
  });

  const forecastData = data.slice(0, 3);
  forecastData.forEach(function (obj) {
    // 预测数据点添加point和label
    chart2.guide().point({
      position: [obj.date, obj.score],
      style: {
        fill: '#5e6ef4',
        r: 4
      }
    });
    chart2.guide().text({
      position: [obj.date, obj.score],
      content: obj.score,
      style: {
        fill: '#5e6ef4',
        textAlign: 'center'
      },
      offsetY: -15
    });
    chart2.guide().regionFilter({
      start: [obj.date, '100%'],
      end: ['100%', '100%'],
      color: '#fff',
      style: {
        lineDash: [3, 8]
      }
    });
  });

  // 绘制预测部分区域的背景
  chart2.guide().rect({
    start: ["84%", '100%'],
    end: ['max', 'max'],
    style: {
      fill: '#5e6ef4',
      fillOpacity: 0.1
    }
  });


  chart2.render();
  return chart2;
}

//初始化 细节图 记忆力
function initChartMemory(canvas) {

  var data = [];
  app.updateBrainScore("Memory", 0)
  for (var i = 1; i <= 14; i++) {
    if (app.globalData.temMemoryScore[i].date.length < 6) {
      continue
    } else {
      data.push({
        date: app.globalData.temMemoryScore[i].date.substring(0, 4) + "-" + app.globalData.temMemoryScore[i].date.substring(4, 6) + "-" + app.globalData.temMemoryScore[i].date.substring(6, 8),
        score: app.globalData.temMemoryScore[i].score,
      })
    }
  }

  // 绘制折线图
  chart3 = new F2.Chart({
    el: canvas,
    width: wx.getSystemInfoSync().screenWidth / 1.2,
    height: wx.getSystemInfoSync().screenHeight / 3,
  });

  chart3.source(data, {
    date: {
      type: "timeCat",
      mask: "MM月DD日",
      range: [0, 1],
      nice: true
    },
    score: {
      tickCount: 4,
      min: 0
    }
  });
  chart3.axis('date', {
    tickLine: {
      length: 4,
      lineWidth: 1,
      stroke: '#e8e8e8'
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart3.axis('score', {
    grid: function grid() {
      return {
        stroke: polarGraphLinecolor,
      };
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart3.line().position('date*score');

  // 半径通过传入函数来实现只显示特定的数据点
  chart3.point().position('date*score').style('date', {
    stroke: '#1890ff',
    lineWidth: 1,
    fill: '#FFF',
  });

  const forecastData = data.slice(0, 3);
  forecastData.forEach(function (obj) {
    // 预测数据点添加point和label
    chart3.guide().point({
      position: [obj.date, obj.score],
      style: {
        fill: '#ed5f59',
        r: 4
      }
    });
    chart3.guide().text({
      position: [obj.date, obj.score],
      content: obj.score,
      style: {
        fill: '#ed5f59',
        textAlign: 'center'
      },
      offsetY: -15
    });
    chart3.guide().regionFilter({
      start: [obj.date, '100%'],
      end: ['100%', '100%'],
      color: '#fff',
      style: {
        lineDash: [3, 8]
      }
    });
  });

  // 绘制预测部分区域的背景
  chart3.guide().rect({
    start: ["84%", '100%'],
    end: ['max', 'max'],
    style: {
      fill: '#ed5f59',
      fillOpacity: 0.1
    }
  });

  chart3.render();
  return chart3;
}

//初始化 细节图 逻辑力
function initChartLogic(canvas) {

  var data = [];
  app.updateBrainScore("Logical", 0)
  for (var i = 1; i <= 14; i++) {
    if (app.globalData.temLogicalScore[i].date.length < 6) {
      continue
    } else {
      data.push({
        date: app.globalData.temLogicalScore[i].date.substring(0, 4) + "-" + app.globalData.temLogicalScore[i].date.substring(4, 6) + "-" + app.globalData.temLogicalScore[i].date.substring(6, 8),
        score: app.globalData.temLogicalScore[i].score,
      })
    }
  }

  // 绘制折线图
  chart4 = new F2.Chart({
    el: canvas,
    width: wx.getSystemInfoSync().screenWidth / 1.2,
    height: wx.getSystemInfoSync().screenHeight / 3,
  });

  chart4.source(data, {
    date: {
      type: "timeCat",
      mask: "MM月DD日",
      range: [0, 1],
      nice: true
    },
    score: {
      tickCount: 4,
      min: 0
    }
  });
  chart4.axis('date', {
    tickLine: {
      length: 4,
      lineWidth: 1,
      stroke: '#e8e8e8'
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart4.axis('score', {
    grid: function grid() {
      return {
        stroke: polarGraphLinecolor,
      };
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart4.line().position('date*score');

  // 半径通过传入函数来实现只显示特定的数据点
  chart4.point().position('date*score').style('date', {
    stroke: '#1890ff',
    lineWidth: 1,
    fill: '#FFF',
  });

  const forecastData = data.slice(0, 3);
  forecastData.forEach(function (obj) {
    // 预测数据点添加point和label
    chart4.guide().point({
      position: [obj.date, obj.score],
      style: {
        fill: '#efb74d',
        r: 4
      }
    });
    chart4.guide().text({
      position: [obj.date, obj.score],
      content: obj.score,
      style: {
        fill: '#efb74d',
        textAlign: 'center'
      },
      offsetY: -15
    });
    chart4.guide().regionFilter({
      start: [obj.date, '100%'],
      end: ['100%', '100%'],
      color: '#fff',
      style: {
        lineDash: [3, 8]
      }
    });
  });

  // 绘制预测部分区域的背景
  chart4.guide().rect({
    start: ["84%", '100%'],
    end: ['max', 'max'],
    style: {
      fill: '#efb74d',
      fillOpacity: 0.1
    }
  });

  chart4.render();
  return chart4;
}

//初始化 细节图 专注力
function initChartFocus(canvas) {
  var data = [];
  app.updateBrainScore("Focus", 0)
  for (var i = 1; i <= 14; i++) {
    if (app.globalData.temFocusScore[i].date.length < 6) {
      continue
    } else {
      data.push({
        date: app.globalData.temFocusScore[i].date.substring(0, 4) + "-" + app.globalData.temFocusScore[i].date.substring(4, 6) + "-" + app.globalData.temFocusScore[i].date.substring(6, 8),
        score: app.globalData.temFocusScore[i].score,
      })
    }
  }

  // 绘制折线图
  chart5 = new F2.Chart({
    el: canvas,
    width: wx.getSystemInfoSync().screenWidth / 1.2,
    height: wx.getSystemInfoSync().screenHeight / 3,
  });

  chart5.source(data, {
    date: {
      type: "timeCat",
      mask: "MM月DD日",
      range: [0, 1],
      nice: true
    },
    score: {
      tickCount: 4,
      min: 0
    }
  });
  chart5.axis('date', {
    tickLine: {
      length: 4,
      lineWidth: 1,
      stroke: '#e8e8e8'
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart5.axis('score', {
    grid: function grid() {
      return {
        stroke: polarGraphLinecolor,
      };
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart5.line().position('date*score');

  // 半径通过传入函数来实现只显示特定的数据点
  chart5.point().position('date*score').style('date', {
    stroke: '#1890ff',
    lineWidth: 1,
    fill: '#FFF',
  });

  const forecastData = data.slice(0, 3);
  forecastData.forEach(function (obj) {
    // 预测数据点添加point和label
    chart5.guide().point({
      position: [obj.date, obj.score],
      style: {
        fill: '#7b5699',
        r: 4
      }
    });
    chart5.guide().text({
      position: [obj.date, obj.score],
      content: obj.score,
      style: {
        fill: '#7b5699',
        textAlign: 'center'
      },
      offsetY: -15
    });
    chart5.guide().regionFilter({
      start: [obj.date, '100%'],
      end: ['100%', '100%'],
      color: '#fff',
      style: {
        lineDash: [3, 8]
      }
    });
  });

  // 绘制预测部分区域的背景
  chart5.guide().rect({
    start: ["84%", '100%'],
    end: ['max', 'max'],
    style: {
      fill: '#7b5699',
      fillOpacity: 0.1
    }
  });

  chart5.render();
  return chart5;
}

//初始化 细节图 观察力
function initChartObservation(canvas) {

  var data = [];
  app.updateBrainScore("Observation", 0)
  for (var i = 1; i <= 14; i++) {
    if (app.globalData.temObservationScore[i].date.length < 6) {
      continue
    } else {
      data.push({
        date: app.globalData.temObservationScore[i].date.substring(0, 4) + "-" + app.globalData.temObservationScore[i].date.substring(4, 6) + "-" + app.globalData.temObservationScore[i].date.substring(6, 8),
        score: app.globalData.temObservationScore[i].score,
      })
    }
  }

  // 绘制折线图
  chart6 = new F2.Chart({
    el: canvas,
    width: wx.getSystemInfoSync().screenWidth / 1.2,
    height: wx.getSystemInfoSync().screenHeight / 3,
  });

  chart6.source(data, {
    date: {
      type: "timeCat",
      mask: "MM月DD日",
      range: [0, 1],
      nice: true
    },
    score: {
      tickCount: 4,
      min: 0
    }
  });
  chart6.axis('date', {
    tickLine: {
      length: 4,
      lineWidth: 1,
      stroke: '#e8e8e8'
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart6.axis('score', {
    grid: function grid() {
      return {
        stroke: polarGraphLinecolor,
      };
    },
    label: function label() {
      return {
        stroke: polarGraphLinecolor,
        opacity: 0.7,
      };
    },
  });
  chart6.line().position('date*score');

  // 半径通过传入函数来实现只显示特定的数据点
  chart6.point().position('date*score').style('date', {
    stroke: '#1890ff',
    lineWidth: 1,
    fill: '#FFF',
  });

  const forecastData = data.slice(0, 3);
  forecastData.forEach(function (obj) {
    // 预测数据点添加point和label
    chart6.guide().point({
      position: [obj.date, obj.score],
      style: {
        fill: '#56abf1',
        r: 4
      }
    });
    chart6.guide().text({
      position: [obj.date, obj.score],
      content: obj.score,
      style: {
        fill: '#56abf1',
        textAlign: 'center'
      },
      offsetY: -15
    });
    chart6.guide().regionFilter({
      start: [obj.date, '100%'],
      end: ['100%', '100%'],
      color: '#fff',
      style: {
        lineDash: [3, 8]
      }
    });
  });

  // 绘制预测部分区域的背景
  chart6.guide().rect({
    start: ["84%", '100%'],
    end: ['max', 'max'],
    style: {
      fill: '#56abf1',
      fillOpacity: 0.1
    }
  });

  chart6.render();
  return chart6;
}


Page({

  data: {
    blackWhiteViewPlain: "background: #3d4050",
    blackWhiteView: "box-shadow: 6px 6px 6px #222, -6px -6px 6px #777;background-color: #3d4050;",
    blackWhiteViewInset: "box-shadow: inset 4px 4px 4px #222, inset -4px -4px 4px #777;background-color: #3d4050;",
    blackWhiteText: "color: #ecf0f3",
    brainScoreName: "总 结",
    totalBrainScore: "0",
    switchIconImageLeft: "/assets/learning/leftArrowDark.png",
    switchIconImageRight: "/assets/learning/rightArrowDark.png",
    previousItem: "观察力",
    foreItem: "反应力",

    // 雷达图
    canvasLeft: "0px",
    canvasTop: "0px",
    graphIndex: 0, // 脑力值的引索   0：总脑力值   1：反应力   2：多任务处理力   3：记忆力   4：逻辑力   5：专注力   6：观察力
    elaborateGraphTop: "0px",
  },



  switchIconLeftTap() {
    if (this.data.graphIndex <= 0) {
      this.setData({
        graphIndex: 6
      })
    } else {
      this.setData({
        graphIndex: this.data.graphIndex - 1
      })
    }

  },

  switchIconRightTap() {
    if (this.data.graphIndex >= 6) {
      this.setData({
        graphIndex: 0
      })
    } else {
      this.setData({
        graphIndex: this.data.graphIndex + 1
      })
    }
  },

  // 切换 脑力值 类型
  swiperChange(e) {
    if (e.detail.current == 0) {
      this.setData({
        graphIndex: 0,
        previousItem: "观察力",
        foreItem: "反应力",
      })
    } else if (e.detail.current == 1) {
      this.setData({
        graphIndex: 1,
        previousItem: "总结",
        foreItem: "多线处理",
      })
    } else if (e.detail.current == 2) {
      this.setData({
        graphIndex: 2,
        previousItem: "反应力",
        foreItem: "记忆力",
      })
    } else if (e.detail.current == 3) {
      this.setData({
        graphIndex: 3,
        previousItem: "多线处理",
        foreItem: "逻辑力",
      })
    } else if (e.detail.current == 4) {
      this.setData({
        graphIndex: 4,
        previousItem: "记忆力",
        foreItem: "专注力",
      })
    } else if (e.detail.current == 5) {
      this.setData({
        graphIndex: 5,
        previousItem: "逻辑力",
        foreItem: "观察力",
      })
    } else if (e.detail.current == 6) {
      this.setData({
        graphIndex: 6,
        previousItem: "专注力",
        foreItem: "总结",
      })
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
    if (app.globalData.needUpdateData) {
      app.decompressBrainScore()
      app.updateBrainScore("React", 0)
      app.updateBrainScore("Multitask", 0)
      app.updateBrainScore("Memory", 0)
      app.updateBrainScore("Logical", 0)
      app.updateBrainScore("Focus", 0)
      app.updateBrainScore("Observation", 0)

      app.globalData.needUpdateData = false
    }
    this.setData({
      opts: {
        onInit: initChart
      },
      optsReact: {
        onInit: initChartReact
      },
      optsMultitask: {
        onInit: initChartMultitask
      },
      optsMemory: {
        onInit: initChartMemory
      },
      optsLogic: {
        onInit: initChartLogic
      },
      optsFocus: {
        onInit: initChartFocus
      },
      optsObservation: {
        onInit: initChartObservation
      },
      canvasLeft: (wx.getSystemInfoSync().screenWidth - wx.getSystemInfoSync().screenWidth / 1.2) / 2 + "px",
      canvasTop: (wx.getSystemInfoSync().screenHeight / 100) * 21 + "px",
      elaborateGraphTop: (wx.getSystemInfoSync().screenHeight / 100) * 45 + "px",
    })

    if (app.globalData.isGettedInfo == true) {
      // 更新数值
      this.setData({
        totalBrainScore: app.globalData.permanentLogicalScore + app.globalData.permanentReactScore + app.globalData.permanentMemoryScore + app.globalData.permanentMultitaskScore + app.globalData.permanentFocusScore + app.globalData.permanentObservationScore
      })

      //黑暗模式切换
      if (app.globalData.darkMode) {
        polarGraphLinecolor = "#ecf0f3"
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#3d4050',
        })
        wx.setBackgroundColor({
          backgroundColor: '#3d4050',
        })
        wx.setTabBarStyle({
          backgroundColor: '#3d4050',
          color: '#ffffff',
          selectedColor: "#ffffff",
        })
        this.setData({
          blackWhiteViewPlain: "background: #3d4050",
          blackWhiteView: "box-shadow: 6px 6px 6px #222, -6px -6px 6px #777;background-color: #3d4050;",
          blackWhiteViewInset: "box-shadow: inset 4px 4px 4px #222, inset -4px -4px 4px #777;background-color: #3d4050;",
          blackWhiteText: "color: #ecf0f3",
          switchIconImageLeft: "/assets/learning/leftArrowLight.png",
          switchIconImageRight: "/assets/learning/rightArrowLight.png",
        })
      } else {
        polarGraphLinecolor = "#3d4050"
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ecf0f3',
        })
        wx.setBackgroundColor({
          backgroundColor: '#ecf0f3',
        })
        wx.setTabBarStyle({
          backgroundColor: '#ecf0f3',
          color: '#000000',
          selectedColor: "#447ece",
        })
        this.setData({
          blackWhiteViewPlain: "background: #ecf0f3",
          blackWhiteView: "box-shadow: 6px 6px 6px #d1d9e6, -6px -6px 6px #fff; background-color: #ecf0f3;",
          blackWhiteViewInset: "box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #fff;background-color: #ecf0f3;",
          blackWhiteText: "color: #5e6473",
          switchIconImageLeft: "/assets/learning/leftArrowDark.png",
          switchIconImageRight: "/assets/learning/rightArrowDark.png",
        })
      }
      /////////////////////////   雷达图    ////////////////////
      logicScore = app.globalData.permanentLogicalScore
      reactScore = app.globalData.permanentReactScore
      memoryScore = app.globalData.permanentMemoryScore
      multitaskScore = app.globalData.permanentMultitaskScore
      focusScore = app.globalData.permanentFocusScore
      observationScore = app.globalData.permanentObservationScore

      //设置最大值
      if (logicScore >= reactScore) {
        polarGraphMaxValue = logicScore
      } else {
        polarGraphMaxValue = reactScore
      }
      if (polarGraphMaxValue < memoryScore) {
        polarGraphMaxValue = memoryScore
      }
      if (polarGraphMaxValue < multitaskScore) {
        polarGraphMaxValue = multitaskScore
      }
      if (polarGraphMaxValue < focusScore) {
        polarGraphMaxValue = focusScore
      }
      if (polarGraphMaxValue < observationScore) {
        polarGraphMaxValue = observationScore
      }
      polarGraphMaxValue *= 1.2
      if (reactScore == logicScore && logicScore == memoryScore && memoryScore == multitaskScore && multitaskScore == focusScore && focusScore == observationScore) {
        polarGraphMaxValue = reactScore * 2
      }
      if (chart != null) {
        logicScore = app.globalData.permanentLogicalScore
        reactScore = app.globalData.permanentReactScore
        memoryScore = app.globalData.permanentMemoryScore
        multitaskScore = app.globalData.permanentMultitaskScore
        focusScore = app.globalData.permanentFocusScore
        observationScore = app.globalData.permanentObservationScore
        const data = [{
          item: '逻辑力',
          score: logicScore
        }, {
          item: '反应力',
          score: reactScore
        }, {
          item: '记忆力',
          score: memoryScore
        }, {
          item: '观察力',
          score: observationScore
        }, {
          item: '专注力',
          score: focusScore
        }, {
          item: 'Multitask',
          score: multitaskScore
        }];
        //设置最大值
        if (logicScore >= reactScore) {
          polarGraphMaxValue = logicScore
        } else {
          polarGraphMaxValue = reactScore
        }
        if (polarGraphMaxValue < memoryScore) {
          polarGraphMaxValue = memoryScore
        }
        if (polarGraphMaxValue < multitaskScore) {
          polarGraphMaxValue = multitaskScore
        }
        if (polarGraphMaxValue < focusScore) {
          polarGraphMaxValue = focusScore
        }
        if (polarGraphMaxValue < observationScore) {
          polarGraphMaxValue = observationScore
        }
        polarGraphMaxValue *= 1.2
        if (reactScore == logicScore && logicScore == memoryScore && memoryScore == multitaskScore && multitaskScore == focusScore && focusScore == observationScore) {
          polarGraphMaxValue = reactScore * 2
        }
        setTimeout(() => {
          chart.source(data, {
            score: {
              min: 0,
              max: polarGraphMaxValue,
              nice: true,
              tickCount: 4
            }
          });
          chart.repaint();
        }, 50);
      }
      if (chart1 != null) {
        var data1 = []
        for (var i = 1; i <= 14; i++) {
          if (app.globalData.temReactScore[i].date.length < 6) {
            continue
          } else {
            data1.push({
              date: app.globalData.temReactScore[i].date.substring(0, 4) + "-" + app.globalData.temReactScore[i].date.substring(4, 6) + "-" + app.globalData.temReactScore[i].date.substring(6, 8),
              score: app.globalData.temReactScore[i].score,
            })
          }
        }
        setTimeout(() => {
          chart1.clear();
          chart1.source(data1);
          chart1.line().position('date*score');

          // 半径通过传入函数来实现只显示特定的数据点
          chart1.point().position('date*score').style('date', {
            stroke: '#1890ff',
            lineWidth: 1,
            fill: '#FFF',
          });

          const forecastData = data1.slice(0, 3);
          forecastData.forEach(function (obj) {
            // 预测数据点添加point和label
            chart1.guide().point({
              position: [obj.date, obj.score],
              style: {
                fill: '#e87d7a',
                r: 4
              }
            });
            chart1.guide().text({
              position: [obj.date, obj.score],
              content: obj.score,
              style: {
                fill: '#e87d7a',
                textAlign: 'center'
              },
              offsetY: -15
            });
            chart1.guide().regionFilter({
              start: [obj.date, '100%'],
              end: ['100%', '100%'],
              color: '#fff',
              style: {
                lineDash: [3, 8]
              }
            });
          });
          // 绘制预测部分区域的背景
          chart1.guide().rect({
            start: ["84%", '100%'],
            end: ['max', 'max'],
            style: {
              fill: '#e87d7a',
              fillOpacity: 0.1
            }
          });
          chart1.repaint();
        }, 50);
      }
      if (chart2 != null) {
        var data2 = []
        for (var i = 1; i <= 14; i++) {
          if (app.globalData.temMultitaskScore[i].date.length < 6) {
            continue
          } else {
            data2.push({
              date: app.globalData.temMultitaskScore[i].date.substring(0, 4) + "-" + app.globalData.temMultitaskScore[i].date.substring(4, 6) + "-" + app.globalData.temMultitaskScore[i].date.substring(6, 8),
              score: app.globalData.temMultitaskScore[i].score,
            })
          }
        }
        setTimeout(() => {
          chart2.clear();
          chart2.source(data2);
          chart2.line().position('date*score');
          // 半径通过传入函数来实现只显示特定的数据点
          chart2.point().position('date*score').style('date', {
            stroke: '#1890ff',
            lineWidth: 1,
            fill: '#FFF',
          });
          const forecastData = data2.slice(0, 3);
          forecastData.forEach(function (obj) {
            // 预测数据点添加point和label
            chart2.guide().point({
              position: [obj.date, obj.score],
              style: {
                fill: '#5e6ef4',
                r: 4
              }
            });
            chart2.guide().text({
              position: [obj.date, obj.score],
              content: obj.score,
              style: {
                fill: '#5e6ef4',
                textAlign: 'center'
              },
              offsetY: -15
            });
            chart2.guide().regionFilter({
              start: [obj.date, '100%'],
              end: ['100%', '100%'],
              color: '#fff',
              style: {
                lineDash: [3, 8]
              }
            });
          });
          // 绘制预测部分区域的背景
          chart2.guide().rect({
            start: ["84%", '100%'],
            end: ['max', 'max'],
            style: {
              fill: '#5e6ef4',
              fillOpacity: 0.1
            }
          });
          chart2.repaint();
        }, 50);
      }
      if (chart3 != null) {
        var data3 = []
        for (var i = 1; i <= 14; i++) {
          if (app.globalData.temMemoryScore[i].date.length < 6) {
            continue
          } else {
            data3.push({
              date: app.globalData.temMemoryScore[i].date.substring(0, 4) + "-" + app.globalData.temMemoryScore[i].date.substring(4, 6) + "-" + app.globalData.temMemoryScore[i].date.substring(6, 8),
              score: app.globalData.temMemoryScore[i].score,
            })
          }
        }
        setTimeout(() => {
          chart3.clear();
          chart3.source(data3);
          chart3.line().position('date*score');

          // 半径通过传入函数来实现只显示特定的数据点
          chart3.point().position('date*score').style('date', {
            stroke: '#1890ff',
            lineWidth: 1,
            fill: '#FFF',
          });
          const forecastData = data3.slice(0, 3);
          forecastData.forEach(function (obj) {
            // 预测数据点添加point和label
            chart3.guide().point({
              position: [obj.date, obj.score],
              style: {
                fill: '#ed5f59',
                r: 4
              }
            });
            chart3.guide().text({
              position: [obj.date, obj.score],
              content: obj.score,
              style: {
                fill: '#ed5f59',
                textAlign: 'center'
              },
              offsetY: -15
            });
            chart3.guide().regionFilter({
              start: [obj.date, '100%'],
              end: ['100%', '100%'],
              color: '#fff',
              style: {
                lineDash: [3, 8]
              }
            });
          });
          // 绘制预测部分区域的背景
          chart3.guide().rect({
            start: ["84%", '100%'],
            end: ['max', 'max'],
            style: {
              fill: '#ed5f59',
              fillOpacity: 0.1
            }
          });
          chart3.repaint();
        }, 50);
      }
      if (chart4 != null) {
        var data4 = [];
        for (var i = 1; i <= 14; i++) {
          if (app.globalData.temLogicalScore[i].date.length < 6) {
            continue
          } else {
            data4.push({
              date: app.globalData.temLogicalScore[i].date.substring(0, 4) + "-" + app.globalData.temLogicalScore[i].date.substring(4, 6) + "-" + app.globalData.temLogicalScore[i].date.substring(6, 8),
              score: app.globalData.temLogicalScore[i].score,
            })
          }
        }
        setTimeout(() => {
          chart4.clear();
          chart4.source(data4);
          chart4.line().position('date*score');

          // 半径通过传入函数来实现只显示特定的数据点
          chart4.point().position('date*score').style('date', {
            stroke: '#1890ff',
            lineWidth: 1,
            fill: '#FFF',
          });
          const forecastData = data4.slice(0, 3);
          forecastData.forEach(function (obj) {
            // 预测数据点添加point和label
            chart4.guide().point({
              position: [obj.date, obj.score],
              style: {
                fill: '#efb74d',
                r: 4
              }
            });
            chart4.guide().text({
              position: [obj.date, obj.score],
              content: obj.score,
              style: {
                fill: '#efb74d',
                textAlign: 'center'
              },
              offsetY: -15
            });
            chart4.guide().regionFilter({
              start: [obj.date, '100%'],
              end: ['100%', '100%'],
              color: '#fff',
              style: {
                lineDash: [3, 8]
              }
            });
          });
          // 绘制预测部分区域的背景
          chart4.guide().rect({
            start: ["84%", '100%'],
            end: ['max', 'max'],
            style: {
              fill: '#efb74d',
              fillOpacity: 0.1
            }
          });
          chart4.repaint();
        }, 50);
      }
      if (chart5 != null) {
        var data5 = [];
        for (var i = 1; i <= 14; i++) {
          if (app.globalData.temFocusScore[i].date.length < 6) {
            continue
          } else {
            data5.push({
              date: app.globalData.temFocusScore[i].date.substring(0, 4) + "-" + app.globalData.temFocusScore[i].date.substring(4, 6) + "-" + app.globalData.temFocusScore[i].date.substring(6, 8),
              score: app.globalData.temFocusScore[i].score,
            })
          }
        }
        setTimeout(() => {
          chart5.clear();
          chart5.source(data5);
          chart5.line().position('date*score');

          // 半径通过传入函数来实现只显示特定的数据点
          chart5.point().position('date*score').style('date', {
            stroke: '#1890ff',
            lineWidth: 1,
            fill: '#FFF',
          });
          const forecastData = data5.slice(0, 3);
          forecastData.forEach(function (obj) {
            // 预测数据点添加point和label
            chart5.guide().point({
              position: [obj.date, obj.score],
              style: {
                fill: '#7b5699',
                r: 4
              }
            });
            chart5.guide().text({
              position: [obj.date, obj.score],
              content: obj.score,
              style: {
                fill: '#7b5699',
                textAlign: 'center'
              },
              offsetY: -15
            });
            chart5.guide().regionFilter({
              start: [obj.date, '100%'],
              end: ['100%', '100%'],
              color: '#fff',
              style: {
                lineDash: [3, 8]
              }
            });
          });
          // 绘制预测部分区域的背景
          chart5.guide().rect({
            start: ["84%", '100%'],
            end: ['max', 'max'],
            style: {
              fill: '#7b5699',
              fillOpacity: 0.1
            }
          });
          chart5.repaint();
        }, 50);
      }
      if (chart6 != null) {
        var data6 = [];
        for (var i = 1; i <= 14; i++) {
          if (app.globalData.temObservationScore[i].date.length < 6) {
            continue
          } else {
            data6.push({
              date: app.globalData.temObservationScore[i].date.substring(0, 4) + "-" + app.globalData.temObservationScore[i].date.substring(4, 6) + "-" + app.globalData.temObservationScore[i].date.substring(6, 8),
              score: app.globalData.temObservationScore[i].score,
            })
          }
        }
        setTimeout(() => {
          chart6.clear();
          chart6.source(data6);
          chart6.line().position('date*score');

          // 半径通过传入函数来实现只显示特定的数据点
          chart6.point().position('date*score').style('date', {
            stroke: '#1890ff',
            lineWidth: 1,
            fill: '#FFF',
          });
          const forecastData = data6.slice(0, 3);
          forecastData.forEach(function (obj) {
            // 预测数据点添加point和label
            chart6.guide().point({
              position: [obj.date, obj.score],
              style: {
                fill: '#56abf1',
                r: 4
              }
            });
            chart6.guide().text({
              position: [obj.date, obj.score],
              content: obj.score,
              style: {
                fill: '#56abf1',
                textAlign: 'center'
              },
              offsetY: -15
            });
            chart6.guide().regionFilter({
              start: [obj.date, '100%'],
              end: ['100%', '100%'],
              color: '#fff',
              style: {
                lineDash: [3, 8]
              }
            });
          });
          // 绘制预测部分区域的背景
          chart6.guide().rect({
            start: ["84%", '100%'],
            end: ['max', 'max'],
            style: {
              fill: '#56abf1',
              fillOpacity: 0.1
            }
          });
          chart6.repaint();
        }, 50);
      }
      /////////////////////////////////
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