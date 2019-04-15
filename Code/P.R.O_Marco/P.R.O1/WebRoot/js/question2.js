var button = document.getElementById('button');
var result = document.getElementById("result");
button.onclick = function() {
	inputs = document.getElementsByTagName('input');
	num = 0;
	for (var i = 0; i < inputs.length; i++) {
		check(i);
	}
	result.innerHTML = num;
}
function check(i){
	if(i == 0){
		if(inputs[i].value == "习"){
			num++;
		}
	}
	if(i == 1){
		if(inputs[i].value == "风"){
			num++;
		}
	}
	if(i == 2){
		if(inputs[i].value == "龙"){
			num++;
		}
	}
	if(i == 3){
		if(inputs[i].value == "匆"){
			num++;
		}
	}
	if(i == 4){
		if(inputs[i].value == "产"){
			num++;
		}
	}
	if(i == 5){
		if(inputs[i].value == "轧"){
			num++;
		}
	}
	if(i == 6){
		if(inputs[i].value == "烊"){
			num++;
		}
	}
	if(i == 7){
		if(inputs[i].value == "刹"){
			num++;
		}
	}
	if(i == 8){
		if(inputs[i].value == "酉"){
			num++;
		}
	}
	if(i == 9){
		if(inputs[i].value == "严"){
			num++;
		}
	}
	if(i == 10){
		if(inputs[i].value == "卉"){
			num++;
		}
	}
	if(i == 11){
		if(inputs[i].value == "吐"){
			num++;
		}
	}
	if(i == 12){
		if(inputs[i].value == "吏"){
			num++;
		}
	}
	if(i == 13){
		if(inputs[i].value == "庄"){
			num++;
		}
	}
	if(i == 14){
		if(inputs[i].value == "乱"){
			num++;
		}
	}
	if(i == 15){
		if(inputs[i].value == "丢"){
			num++;
		}
	}
	if(i == 16){
		if(inputs[i].value == "压"){
			num++;
		}
	}
	if(i == 17){
		if(inputs[i].value == "买"){
			num++;
		}
	}
	if(i == 18){
		if(inputs[i].value == "灰"){
			num++;
		}
	}
}