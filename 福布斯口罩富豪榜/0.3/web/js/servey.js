//管理获取用户地理位置的警告框
var vn = new Vue({
	el: ".getLocation",
	data:{
		getLoca: "display: block",
	}
});

//用户选择同意
function getLocation(){
	if (navigator.geolocation){
		vn.getLoca = "display: none";
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	}else{
		console.log("该浏览器不支持获取地理位置。");
	}
}

//用户选择不同意
function disalike(){
	vn.getLoca = "display: none"
}

//出错警告
function showError(error){
	switch(error.code) {
		case error.PERMISSION_DENIED:
			alert("定位失败,用户拒绝请求地理定位");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("定位失败,位置信息是不可用");
			break;
		case error.TIMEOUT:
			alert("定位失败,请求获取用户位置超时");
			break;
		case error.UNKNOWN_ERROR:
			alert("定位失败,定位系统失效");
			break;
	}
}

//通过百度地图获取用户地理位置，返回一个城市名
function showPosition(position){
	var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
	var myGeo = new BMap.Geocoder();
	myGeo.getLocation(point, function (result) {
		alert(result.addressComponents.city);
	})
}

//window.location.href = "https:open.weixin.qq.com/connect/oauth2/authorize?appid=公众号的AppID&redirect_uri=回调地址&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

var vm = new Vue({  
	el : ".rank", 
	data:{
		users: [
			{
			openid: "123123",
			nickname: "steven",
			sex :1 , // 1为男性，2为女性，3未知
			province:"shanghai",
			city:"shanghai",
			country:"CN",
			headimgurl: "http://img0.imgtn.bdimg.com/it/u=2124125740,920084270&fm=26&gp=0.jpg",//用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
			mask : 100,
			},
			{
			openid: "123123",
			nickname: "steven",
			sex :1 , // 1为男性，2为女性，3未知
			province:"shanghai",
			city:"shanghai",
			country:"CN",
			headimgurl: "http://img0.imgtn.bdimg.com/it/u=2124125740,920084270&fm=26&gp=0.jpg",//用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
			mask : 90,
			},
			{
			openid: "123123",
			nickname: "steven",
			sex :1 , // 1为男性，2为女性，3未知
			province:"shanghai",
			city:"shanghai",
			country:"CN",
			headimgurl: "http://img0.imgtn.bdimg.com/it/u=2124125740,920084270&fm=26&gp=0.jpg",//用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
			mask : 80,
			},
			{
			openid: "123123",
			nickname: "steven",
			sex :1 , // 1为男性，2为女性，3未知
			province:"shanghai",
			city:"shanghai",
			country:"CN",
			headimgurl: "http://img0.imgtn.bdimg.com/it/u=2124125740,920084270&fm=26&gp=0.jpg",//用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
			mask : 70,
			},
			{
			openid: "123123",
			nickname: "steven",
			sex :1 , // 1为男性，2为女性，3未知
			province:"shanghai",
			city:"shanghai",
			country:"CN",
			headimgurl: "http://img0.imgtn.bdimg.com/it/u=2124125740,920084270&fm=26&gp=0.jpg",//用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
			mask : 60,
			},
			
			
		],
	}
});  //简要测试


