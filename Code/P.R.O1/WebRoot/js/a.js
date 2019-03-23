
function check(){
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var rppassword = document.getElementById("rppassword");
	var warning = document.getElementById("warning");
	var reg = /[a-zA-Z0-9_]{3,10}/;
	if (!reg.test(userName)) {
		warnings[i].innerHTML = "用户名为3~10个字符";
		return false;
	}
	var reg1 = /[A-Z]+/;
	var reg2 = /[a-z]+/;
	var reg3 = /[0-9]+/;
	var password = inputs[i].value;	
	if (!(reg1.test(password) && reg2.test(password) && reg3.test(password)) || password.length < 6) {
		warnings[i].innerHTML = "密码最少6位并包含大写，小写字母及数字";
		return false;
	}
	if(password.value != rppassword.value){
		console.log(password.value);
		console.log(rppassword.value);
		return false;
	}
}