var r = Math.floor(Math.random() * 256); //随机生成256以内r值
var g = Math.floor(Math.random() * 256); //随机生成256以内g值
var b = Math.floor(Math.random() * 256); //随机生成256以内b值

//管理输入口罩的表单和边框颜色
var vn = new Vue({
	el:".myForm",
	data: {
		userID: "OPENID获取失败",   //先行测试
		amount: 0,
		borderColor: `rgb(${r},${g},${b})`,
	}
});

//管理确认口罩数的警示框
var maskAlert = new Vue({
	el:".alertDiv",
	data: {
		noMask: "display: none",
		confirmMask: "display: none",
		maskAmount: "0",
	}
});

var leftHandDrag = document.getElementById("left");   //实例化左手
var rightHandDrag = document.getElementById("right"); //实例化右手
var leftHandPosition = 0;                                      //将左手的默认值设置为0
var rightHandPosition = 270;                                   //将右手的默认值设置为270
var twoHandDis;                                                //创建一个变量来存储两只手的距离以判断用户输入的个数

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

//重制按钮的方法
function again(){
	leftHandDrag.style.left = 0 + 'px';
	rightHandDrag.style.left = 0 + 'px';
	rightHandPosition = 0;
	leftHandPosition = 0;
	twoHandDis  = 0;
	vn.amount = 0;
	userMaskNum = 0;
	r = Math.floor(Math.random() * 256); //随机生成256以内r值
	g = Math.floor(Math.random() * 256); //随机生成256以内g值
	b = Math.floor(Math.random() * 256); //随机生成256以内b值
	vn.borderColor = `rgb(${r},${g},${b})`;
}

//用户键入口罩数
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

//用户按下确认按钮
function submitNum(){
	vn.amount = "0";
	if(userMaskNum == 0){
		vn.amount = 0;
		maskAlert.maskAmount = 0;
		maskAlert.noMask = "display: block";
	}else  if(userMaskNum < 0){
		alert("数据出错");
	}else{
		vn.amount = 0;
		maskAlert.maskAmount = userMaskNum;
		maskAlert.confirmMask = "display: block";
	}
}

//在确认警告框中选择取消
function clickCancel(){
	location.reload();
}

//在确认警告框中选择确认
function formSubmit(){
	vn.amount = 0;
	document.getElementById("myForm").submit()
}