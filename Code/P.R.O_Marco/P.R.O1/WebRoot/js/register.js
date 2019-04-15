var inputs=document.querySelectorAll("form input");
var warnings = document.getElementsByClassName("warning");
window.onload = function() {
	for (var i = 0; i < inputs.length - 1; i++) {
		bindingOnblur(i);
	}
};
function bindingOnblur(i) {
	inputs[i].onblur = function() {
		validate(i);
	};
}
//遍历每一个输入框进行判断
function validate(i){
	warnings[i].innerHTML = "";
	var reg=/^(\s)*$/;
	var empty=inputs[i].value;
	if (reg.test(empty)) {
		warnings[i].innerHTML = "请输入" + inputs[i].dataset.point;
		return false;
	}

	//用户名
	if (i == 0) {
		var userName = inputs[i].value;
		var reg = /[a-zA-Z0-9_]{3,10}/;
		if (!reg.test(userName)) {
			warnings[i].innerHTML = "用户名为3~10个字符";
			return false;
		}
	}
	//密码
	if (i == 1) {
		var reg1 = /[A-Z]+/;
		var reg2 = /[a-z]+/;
		var reg3 = /[0-9]+/;
		var password = inputs[i].value;	
		if (!(reg1.test(password) && reg2.test(password) && reg3.test(password)) || password.length < 8) {
			warnings[i].innerHTML = "密码最少8位并包含大写，小写字母及数字";
			return false;
		}
	}
	//重复密码
	if (i == 2) {
		var password = inputs[i-1].value;
		var repass = inputs[i].value;
		if (password != repass) {
			warnings[i].innerHTML = "两次密码不一致";
			return false;
		}
	}
	return true;
}

function check() {
	var result = 0;
	for(var i = 0;i<inputs.length-1;i++){
		//检查所有的内容是否都通过
		if(validate(i)){
			result++;
		}
	}
	if(result == 3){
		return true;
	}else{
		return false;
	}
}