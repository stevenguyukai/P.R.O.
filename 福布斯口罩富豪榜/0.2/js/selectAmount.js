var vn = new Vue({
	el:".form",
	data: {
		amount: "请输入口罩数量"
	}
})


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
leftHandDrag.addEventListener('touchmove', function(event) {
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        leftHandDrag.style.left = touch.pageX-170 + 'px';
		if(leftHandDrag.style.left > 0 + 'px'){
			leftHandDrag.style.left = 0 + 'px';
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
		if(rightHandDrag.style.left < 0 + 'px'){
			rightHandDrag.style.left = 0 + 'px';
		}
	}
}, false);

function again(){
	leftHandDrag.style.left = 0 + 'px';
	rightHandDrag.style.left = 0 + 'px';
	vn.amount = "请输入口罩数量";
}

function inputNum(){
    var str = prompt("口罩数:");
	str =  Math.round(str);
    if(isNaN(str) || str>10000 || str<0){
		alert("请输入0～10000的整数")
	}else{
		vn.amount = str;
	}
}