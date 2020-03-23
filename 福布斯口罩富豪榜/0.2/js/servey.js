//[user[ nickname , amount , avatar , location ] ,  user[ ]   ]


var user = [
    ["小黑",20,"https://img.zcool.cn/community/01d4e855498eb30000019ae9e87140.jpg@1280w_1l_2o_100sh.jpg","shanghai"] , 
    ["大黑",30,"https://http://img3.imgtn.bdimg.com/it/u=378824344,1185609431&fm=26&gp=0.jpg","zhejiang"],
    ["大黑",40,"https://img.zcool.cn/community/01d4e855498eb30000019ae9e87140.jpg@1280w_1l_2o_100sh.jpg","suzhou"]
               ]
 
var vm = new Vue({ 
	el : ".rank",
	data:{ 
		users: [
			{
				avatar:"https://img.zcool.cn/community/01d4e855498eb30000019ae9e87140.jpg@1280w_1l_2o_100sh.jpg", 
				nickname: "Steven",
				mask: 100,
			},
			{
				avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581845763848&di=649ce9d8e34635afc5d772c401adb290&imgtype=0&src=http%3A%2F%2Fwww.tupian1.cn%2Fuploads%2Fallimg%2F150919%2F1-15091Z11F0.jpg",
				nickname: "小黑",
				mask: 80,
			},
			{
				avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581845763848&di=a22e9db474d460809a94db834dd63396&imgtype=0&src=http%3A%2F%2Fimg.netbian.com%2Ffile%2Fnewc%2F9000df2b0a49a82a1f0c93d1c0195e9d.jpg",
				nickname: "smallBlack",
				mask: 50,
			},
			{
				avatar:"https://img.zcool.cn/community/01d4e855498eb30000019ae9e87140.jpg@1280w_1l_2o_100sh.jpg",
				nickname: "Steven",
				mask: 40,
			},
			{
				avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581845763848&di=649ce9d8e34635afc5d772c401adb290&imgtype=0&src=http%3A%2F%2Fwww.tupian1.cn%2Fuploads%2Fallimg%2F150919%2F1-15091Z11F0.jpg",
				nickname: "小黑",
				mask: 30,
			},
			{
				avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581845763848&di=a22e9db474d460809a94db834dd63396&imgtype=0&src=http%3A%2F%2Fimg.netbian.com%2Ffile%2Fnewc%2F9000df2b0a49a82a1f0c93d1c0195e9d.jpg",
				nickname: "smallBlack",
				mask: 20,
			},
			
			
		],
	}
});



