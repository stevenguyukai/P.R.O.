var app = getApp();
var cardTeams;

Page({

  searchFocus() {
    this.setData({
      searchIcon: "searchIconAfter",
      placeholder: "placeholderAfter",
      searchBorder: "searchBorderAfter", 
    })
  },
  searchBlur(event) {
    if (event.detail.value == "") {
      this.setData({
        searchIcon: "searchIconBefore",
        placeholder: "placeholderBefore",
        searchBorder: "searchBorderBefore",
      })
    }
  },
  searching(event) {
    if (event.detail.value != "") { 
      app.globalData.articleSearchText = event.detail.value;   
      wx.navigateTo({
        url: '/pages/search/search'    
      })   
    } 
  },

  data: {
    searchIcon: "searchIconBefore",
    placeholder: "placeholderBefore",
    searchBorder: "searchBorderBefore",
    cardTeams: [{
        "viewid": "1",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN4ReQVGw7WjFYIBjy994vqGyu0gL4XcvaiaKEcPOlkujZqe0vNmCxYeX8rhlicdBGfkcYpjHAImicmfA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "count": "潘鹏",
        "name": "违反常识的几个现实",

      }, {
        "viewid": "2",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN7G5HAIs0UUynhwtmia7pWS5WyJWFAAXNsK44O0WJTjbu1LUpRG3Zsib5qNdzXGDbUcOaXwauD9EtXA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "count": "倪雨欣",
        "name": "百分之一的电等于无穷",

      }, {
        "viewid": "3",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN70R4t1TSBiayEwrYl3wFSicnx5p0DJAMNuqRKBcStjwPSn1TV0rToVsE9vS2gV9DuYCwelYMMUjOGQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "count": "潘鹏",
        "name": "论·网络乱象",

      }, {
        "viewid": "4",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN7Xic2fM4LEf2nOoG4PBiaxZ4SAXicH5LvjM9pmX8iaAQRRDMbRiaosIsqAH7IyY32hFkdXicC08EQNxyaA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "count": " 黄赟",
        "name": "幽灵病症——幻肢痛(°_°)",

      },
      {
        "viewid": "5",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6z9hZcsW8Ufy2YGzIQZF2XCJ4iaAaopPfVez5cL0CTfDwY3mbpsTkOaJT7SvsXzpdRxHubxZvC6UA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "count": "潘鹏",
        "name": "好多炸弹 💣",

      },
      {
        "viewid": "6",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN5OHw6GYkZeJPAhPFcc1sVKvJkdqbLboH9UuIexm5VN8CjULndYMNLbtBeB0rvnuE4xGwFsiaI0HWw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
        "count": "潘鹏",
        "name": "阿波罗登月代码",

      },
      {
        "viewid": "7",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6WXDD4sRynYOXHnw2ibrfjmcHwcibSPsdEvNe8F1iah6KFfST5QZsjsZarQ3zL2QSuqneLBbAvxIAnQ/0?wx_fmt=jpeg",
        "count": "倪雨欣",
        "name": "重新对焦5G",

      },
      {
        "viewid": "8",
        "imgsrc": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573889633540&di=071d1b4ae44eaeb2a3ab37d177a0fb8b&imgtype=0&src=http%3A%2F%2Fp0.ifengimg.com%2Fpmop%2F2018%2F0810%2FE1C2858024FABD44679678696116A7A67056D7E5_size31_w543_h277.jpeg",
        "count": "李俊逸",
        "name": "全息投影技术!",

      },
      {
        "viewid": "9",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6KyIfLzF8DrVQicmO2TTmJtq3g6lmB8H9yXzetgX4z2pocjpK5tJcsWVBYBEALwHhkP130QooN68g/0?wx_fmt=jpeg",
        "count": "李俊逸",
        "name": "人脸识别技术!",

      },
      {
        "viewid": "10",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN7S3gdicCCIndlRiaELlNxI1kMoVSPBo8Iib9n8nEGr1WcrkEgqh27lbTlLQM2spWERSs1gy8ah1VvFQ/0?wx_fmt=jpeg",
        "count": "李俊逸",
        "name": "3D打印技术!",

      },
      {
        "viewid": "11",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN63xiaCXBWxBEzaicEyc7WzdmdL6HsXHbC20td6bSoqP3Np6R6Ctic9koqYyJrDFic8IvoXVR4yl7TpzA/0?wx_fmt=jpeg",
        "count": "严悦",
        "name": "科技改变生活",

      },
      {
        "viewid": "12",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN7vHeIPtiaLMWXE5tBj9fEeKVGCo4sJ8vvel7ibichcr4wK3ViaQYw8JLEiarL6geLpZ73tYQwPpq0MEibQ/0?wx_fmt=jpeg",
        "count": "卓文君",
        "name": "科技知识科普",

      },
      {
        "viewid": "13",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN4icIaItfJ4uTVCKkB0VaxC9UZptGtnJyTW8feHZMYar0pTawvz5hNhueL8zKku8Ke3VsBotBYialaA/0?wx_fmt=jpeg",
        "count": "黄赟",
        "name": "水变油?",

      },
      {
        "viewid": "14",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6LiaQHc3K8uNZFwmg1n8RBVJNjIibiceaNjcbLj8GrnKLYKBjSnO0pAOtMLkiaG1WKmEvUXyrEiaKNncg/0?wx_fmt=jpeg",
        "count": "黄赟",
        "name": "鸿蒙系统",

      },
      {
        "viewid": "15",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6icYga2qALd5KPhP2XoVRcxzyBjUOjeTpGXm55UQibPqX2Tydib5NfqvcWVYXtS2hGSakwX2GxibvBKg/0?wx_fmt=jpeg",
        "count": "王靖然",
        "name": "科技改变教育",

      },
      {
        "viewid": "16",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6HPobgJjBvtoGKutc4neCLpU4XZS8zKITpSxZA8zd3fZ78K22yZA86sKxMsUgT5VmdibXSHyExtQA/0?wx_fmt=jpeg",
        "count": "卓文君",
        "name": "新兴科技",

      },
      {
        "viewid": "17",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6HPobgJjBvtoGKutc4neCLzugX2kJ1xFtPdZlGCcaBxu6AKeDWDKzOKg6vLUgUfJYecaW0oT2a6Q/0?wx_fmt=jpeg",
        "count": "卓文君",
        "name": "科技冷知识",

      },
      {
        "viewid": "18",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN4wDia9PNz417lq3KoepbIfF22ZwUcf5IX8Hhia3DajAd6BmibIo9vT78jNiaxrTDI51VLISDt4848B0Q/0?wx_fmt=jpeg",
        "count": "黄赟",
        "name": "Github 出口管制",

      },
      {
        "viewid": "19",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN7GgR0Pj6UfCUygxka2PI8qqY2tcJ10n3VtzKSRNQWMwdibLBvHHrc1TryfKo9iaO2LLWCSFia0UicakQ/0?wx_fmt=jpeg",
        "count": "黄赟",
        "name": "大脑电信号",

      },
      {
        "viewid": "20",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN4rWLsXlK92esnDyfO2NzicpmbAsseR6X1xLSYYLkVIvHuOAy8gibOwewL4t7EUcIzJDGia1yvWCPfEA/0?wx_fmt=jpeg",
        "count": "潘鹏",
        "name": "盘点各种奇葩的武器",

      },
      {
        "viewid": "21",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN6hrv4ZvYtHDRiaVTOqP4y2hW5QLLaMcS3U6GqicoeTEA5hRpkx3pWdBMdd1XotFrrSNMEWuqmu9NPg/0?wx_fmt=jpeg",
        "count": "程湘源",
        "name": "光合作用",

      },
      {
        "viewid": "22",
        "imgsrc": "https://mmbiz.qpic.cn/mmbiz_jpg/eUiaFX4dClN4fuWVQs3l26ZRok6ia9OF0cAGMtM4e6e14lY5pKlWNgTmicrS6DF0zKnUMSgE81K1rfsBqVwReQiawg/0?wx_fmt=jpeg",
        "count": "先驱者PRO",
        "name": "科技之光",

      }
    ]
  },

  //事件处理函数
  bindViewTap1() {
    app.globalData.articleNumber = 1;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap2() {
    app.globalData.articleNumber = 2;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap3() {
    app.globalData.articleNumber = 3;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap4() {
    app.globalData.articleNumber = 4;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap5() {
    app.globalData.articleNumber = 5;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap6() {
    app.globalData.articleNumber = 6;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap7() {
    app.globalData.articleNumber = 7;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap8() {
    app.globalData.articleNumber = 8;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap9() {
    app.globalData.articleNumber = 9;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap10() {
    app.globalData.articleNumber = 10;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap11() {
    app.globalData.articleNumber = 11;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap12() {
    app.globalData.articleNumber = 12;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap13() {
    app.globalData.articleNumber = 13;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap14() {
    app.globalData.articleNumber = 14;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap15() {
    app.globalData.articleNumber = 15;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap16() {
    app.globalData.articleNumber = 16;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap17() {
    app.globalData.articleNumber = 17;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap18() {
    app.globalData.articleNumber = 18;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap19() {
    app.globalData.articleNumber = 19;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap20() {
    app.globalData.articleNumber = 20;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap21() {
    app.globalData.articleNumber = 21;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },
  bindViewTap22() {
    app.globalData.articleNumber = 22;
    wx.navigateTo({
      url: '/pages/articles/articles'
    })
  },

  onLoad() {
    
  },

  onHide: function() {
    
  },
  onShow(){
    wx.vibrateShort();
  }

})