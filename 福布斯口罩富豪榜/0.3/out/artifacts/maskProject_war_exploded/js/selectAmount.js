var r = Math.floor(Math.random() * 256); //随机生成256以内r值
var g = Math.floor(Math.random() * 256); //随机生成256以内g值
var b = Math.floor(Math.random() * 256); //随机生成256以内b值

var vn = new Vue({
	el:".myForm",
	data: {
		amount: "请输入口罩数量",
		borderColor: `rgb(${r},${g},${b})`,
	}
});

var maskAlert = new Vue({
	el:".alertDiv",
	data: {
		noMask: "display: none",
		confirmMask: "display: none",
		maskAmount: "0",
	}
});



/*
var leftHands = document.getElementsById("leftHand");
var rightHands = document.getElementsById("rightHand");
var number = document.getElementById("number");
var alert = document.getElementById("alert");
var k = 0;
setInterval(function(){
	move();

},10)


function move(){
	var num = document.getElementById('num').value;
	if(num != null) number.innerHTML = num;
	if(!((num >= 0 && num <= 10000) || num == "") || parseInt(num) != num) alert.innerHTML = "请输入0-10000之间的整数";
	else alert.innerHTML = "";
	if(num.length == 0) return;
	if(num == 10000) k = 6.1775;
	else if(1000 <= num && num < 10000) k = 1.89 + num[0] * 0.42875;
	else if(100 <= num) k = 0.45 + num[0] * 0.1225;
	else if(10 <= num) k = 0.09 + num[0] * 0.035;
	else if(0 <= num) k = num[0] * 0.01;
	hands[0].style.left = -k + "rem";
	hands[1].style.right = -k + "rem";


}*/




var leftHandDrag = document.getElementById("left");
var leftHandPosition = 0;
var rightHandPosition = 270;
var twoHandDis;

//最后会上传的数据
var userMaskNum = 0;
//------------

leftHandDrag.addEventListener('touchmove', function(event) {
	`rgb(${r},${g},${b})`;
	// 如果这个元素的位置内只有一个手指的话
	if (event.targetTouches.length == 1) {
		event.preventDefault();// 阻止浏览器默认事件，重要
		var touch = event.targetTouches[0];
		// 把元素放在手指所在的位置
		leftHandDrag.style.left = touch.pageX-170 + 'px';
		if(leftHandDrag.style.left >= 0 + 'px'){
			leftHandDrag.style.left = 0 + 'px';
			rightHandPosition = parseInt(rightHandDrag.style.left);
			twoHandDis = rightHandPosition - 0;
			vn.amount = twoHandDis;
			userMaskNum = twoHandDis;
			vn.borderColor = `rgb(${r},${g},${b})`;
		}else{
			leftHandPosition = parseInt(leftHandDrag.style.left);
			twoHandDis = rightHandPosition - leftHandPosition;
			vn.amount = twoHandDis;
			userMaskNum = twoHandDis;
			var randomNum  = Math.floor(Math.random() * 10);
			if(randomNum>=(10/3*2)){ //随机变化颜色
				r = r + Math.floor(Math.random() * 15);
				vn.borderColor = `rgb(${r},${g},${b})`;
			}else if(randomNum<(10/3*2) && randomNum>=(10/3)){
				r = r - Math.floor(Math.random() * 15);
				vn.borderColor = `rgb(${r},${g},${b})`;
			}else if(randomNum<(10/3)){
				b = b - Math.floor(Math.random() * 15);
				vn.borderColor = `rgb(${r},${g},${b})`;
			}
		}
	}
}, false);

var rightHandDrag = document.getElementById("right");
rightHandDrag.addEventListener('touchmove', function(event) {
	// 如果这个元素的位置内只有一个手指的话
	if (event.targetTouches.length == 1) {
		event.preventDefault();// 阻止浏览器默认事件，重要
		var touch = event.targetTouches[0];
		// 把元素放在手指所在的位置
		rightHandDrag.style.left = touch.pageX-250 + 'px';
		if(rightHandDrag.style.left <= 0 + 'px'){
			rightHandDrag.style.left = 0 + 'px';
			rightHandPosition = parseInt(rightHandDrag.style.left);
			twoHandDis = 0 - leftHandPosition;
			vn.amount = twoHandDis;
			userMaskNum = twoHandDis;
			vn.borderColor = `rgb(${r},${g},${b})`;
		}else{
			rightHandPosition = parseInt(rightHandDrag.style.left);
			twoHandDis = rightHandPosition - leftHandPosition;
			vn.amount = twoHandDis;
			userMaskNum = twoHandDis;
			var randomNum  = Math.floor(Math.random() * 10);
			if(randomNum>=(10/3*2)){ //随机变化颜色
				g = g + Math.floor(Math.random() * 15);
				vn.borderColor = `rgb(${r},${g},${b})`;
			}else if(randomNum<(10/3*2) && randomNum>=(10/3)){
				g = g - Math.floor(Math.random() * 15);
				vn.borderColor = `rgb(${r},${g},${b})`;
			}else if(randomNum<(10/3)){
				b = b + Math.floor(Math.random() * 15);
				vn.borderColor = `rgb(${r},${g},${b})`;
			}
		}
	}
}, false);

function again(){
	leftHandDrag.style.left = 0 + 'px';
	rightHandDrag.style.left = 0 + 'px';
	rightHandPosition = 0;
	leftHandPosition = 0;
	twoHandDis  = 0;
	vn.amount = "请输入口罩数量";
	userMaskNum = 0;
	r = Math.floor(Math.random() * 256); //随机生成256以内r值
	g = Math.floor(Math.random() * 256); //随机生成256以内g值
	b = Math.floor(Math.random() * 256); //随机生成256以内b值
	vn.borderColor = `rgb(${r},${g},${b})`;
}


function inputNum(){
	var str = prompt("大数量口罩:");
	str =  Math.round(str);
	if(isNaN(str) || str>5000 || str<0){
		alert("请输入0～1000的整数")
	}else{
		vn.amount = str;
		userMaskNum = str;
		var leftHandGetDis = -(str/40);
		var rightHandGetDis = str/40;
		rightHandDrag.style.left = rightHandGetDis + "px";
		leftHandDrag.style.left = leftHandGetDis + "px";
	}
}


function submitNum(){
	if(userMaskNum==0){
		// if(confirm("一个都没有吗(°_°)") == true){
		// 	userMaskNum = 0;
		// 	vn.amount = 0;
		// 	alert("press yes");
		//     window.location.href = "serveyAfter.html";
		// }else{
		// 	alert("press no");
		// }
		maskAlert.noMask = "display: block";

	}else  if(userMaskNum<0){
		alert("数据出错");
	}else{
		// if(confirm("你拥有: " + userMaskNum  + " 个口罩")  == true){
		// 	alert("press yes");
		//     window.location.href = "serveyAfter.html";
		// }else{
		// 	alert("press no");
		// }
		maskAlert.maskAmount = userMaskNum;
		maskAlert.confirmMask = "display: block";
	}


}

function clickCancel(){
	location.reload();
}

function formSubmit(){
	document.getElementById("myForm").submit()
}