var getUserInfo = new Vue({
	el: ".userInfoForm",
	data:{
		//放在表单的用户的信息
		userName: "名字获取失败",
		userOPENID: "OPENID获取失败",
		userAvatar: "头像地址获取失败",
		userAvailable: "Enable",
		userResentLatitude: "位置获取失败",
		userResentLongitude: "位置获取失败",
		userResentRegion: "地点获取失败",
		userComment: "无备注",
	}
});


//管理获取用户地理位置的警告框
var vn = new Vue({
	el: ".getLocation",
	data:{
		getLoca: "display: block",
		location: "false",
		city: "地点获取失败",
	}
});

//管理排行榜的排行顺序
var rankStyle1 = new Vue({
	el: ".rankView1",
	data:{
		rankAmount: "display: block",
	}
});
var rankStyle2 = new Vue({
	el: ".rankView2",
	data:{
		rankLocation: "display: none",
	}
});


//用户选择同意
function getLocation(){
	if (navigator.geolocation){
		vn.getLoca = "display: none";
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	}else{
		alert("该浏览器不支持获取地理位置");
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
	getUserInfo.userResentLatitude = position.coords.latitude;
	getUserInfo.userResentLongitude = position.coords.longitude;
	var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
	var myGeo = new BMap.Geocoder();
	myGeo.getLocation(point, function (result) {
		alert(result.addressComponents.city);
		getUserInfo.userResentRegion = result.addressComponents.city;
		vn.city = result.addressComponents.city;
		vn.location = "true";
		document.getElementById("postLocationForm").submit();
	})
}

//提交用户信息表单
function submitForm() {
	// if (getUserInfo.userOPENID == "OPENID获取失败") {
	// 	alert("用户信息获取失败，请重试");
	// 	if (getUserInfo.userResentRegion == "地点获取失败") {
	// 		haveGetLoca = false;
	// 	} else {
	// 		haveGetLoca = true;
	// 	}
	// 	location.reload();
	// } else {
	// 	document.getElementById("disableForm").submit();
	// }
	document.getElementById("disableForm").submit();
}

//window.location.href = "https:open.weixin.qq.com/connect/oauth2/authorize?appid=公众号的AppID&redirect_uri=回调地址&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

//用来判断是否得到用户地理位置以跳出授权框
var haveGetLoca = false;

function init() {
	if (haveGetLoca){
		vn.getLoca = "display: none";
	} else {
		vn.getLoca = "display: block";
	}
}



function rankAsLocation() {
	if (getUserInfo.userResentRegion == null) {
		alert("没有得到您的地理位置")
	}else {
		rankStyle1.rankAmount = "display: none";
		rankStyle2.rankLocation = "display: inline";
	}
}

function rankAsAmount() {
	rankStyle1.rankAmount = "display: inline";
	rankStyle2.rankLocation = "display: none";
}


