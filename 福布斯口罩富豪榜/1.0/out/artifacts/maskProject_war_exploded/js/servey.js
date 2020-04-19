//管理获取用户地理位置的警告框
var vn = new Vue({
	el: ".getLocation",
	data:{
		getLoca: "display: block",
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

//通过百度地图获取用户地理位置，返回一个城市名
function showPosition(position){
	var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
	var myGeo = new BMap.Geocoder();
	myGeo.getLocation(point, function (result) {
		document.forms["postLocationForm"].locationNeed.value  = "true";
		document.forms["postLocationForm"].cityNeed.value  = result.addressComponents.city;
		document.forms["postLocationForm"].ResentLatitude.value  = position.coords.latitude;
		document.forms["postLocationForm"].ResentLongitude.value  = position.coords.longitude;
		document.forms["postLocationForm"].ResentRegion.value  = result.addressComponents.city;

		document.forms["disableForm"].ResentLatitude.value  = position.coords.latitude;
		document.forms["disableForm"].ResentLongitude.value  = position.coords.longitude;
		document.forms["disableForm"].ResentRegion.value  = result.addressComponents.city;

		document.getElementById("postLocationForm").submit();
	})
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
		rankStyle1.rankAmount = "display: none";
		rankStyle2.rankLocation = "display: inline";
}

function rankAsAmount() {
	rankStyle1.rankAmount = "display: inline";
	rankStyle2.rankLocation = "display: none";
}


