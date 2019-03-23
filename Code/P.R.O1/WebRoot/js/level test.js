var button = document.getElementById('button');
var result = document.getElementById('result');
button.onclick = function() {
	checklevel();
}
function check(i){
	var dateA = new Date();
	var year = dateA.getFullYear();
	var month = dateA.getMonth() + 1;
	var day = dateA.getDay();
	var date = dateA.getDate();
	if(i == 0){
		if(inputs[i].value == year){
			number++;
			
		}
	}
	if(i == 1){
		switch(month){
			case 1:
			case 2:
			case 12:
			if (inputs[i].value == "冬季") {
				number++;
			};
			break;
			case 3:
			case 4:
			case 5:
			if (inputs[i].value == "春季") {
				number++;
			};
			break;
			case 6:
			case 7:
			case 8:
			if (inputs[i].value == "夏季") {
				number++;
			};
			break;
			case 9:
			case 10:
			case 11:
			if (inputs[i].value == "秋季") {
				number++;
			};
			break;
		}
			
		}
	if(i == 2){
		if(inputs[i].value == month){
			number++;
		}
	}
	if(i == 3){
		if(inputs[i].value == date){
			number++;
		}
	}
	if(i == 4){
		switch(day){
			case 0:
			if(inputs[i].value == "星期天"){
				number++;
			}
			break;
			case 1:
			if(inputs[i].value == "星期一"){
				number++;
			}
			break;
			case 2:
			if(inputs[i].value == "星期二"){
				number++;
			}
			break;
			case 3:
			if(inputs[i].value == "星期三"){
				number++;
			}
			break;
			case 4:
			if(inputs[i].value == "星期四"){
				number++;
			}
			break;
			case 5:
			if(inputs[i].value == "星期五"){
				number++;
			}
			break;
			case 6:
			if(inputs[i].value == "星期六"){
				number++;
			}
			break;
		}
	}
	if(i == 5){
		if(inputs[i].value != ""){
			number++;
			
		}
	}
	if(i == 6){
		if(inputs[i].value != ""){
			number++;
			
		}
	}
	if(i == 7){
		if(inputs[i].value != ""){
			number++;
			
		}
	}
	if(i == 8){
		if(inputs[i].value != ""){
			number++;
			
		}
	}
	if(i == 9){
		if(inputs[i].value != ""){
			number++;
			
		}
	}
	if(i == 10){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 11){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 12){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 13){
		if(inputs[i].value == 93){
			number++;
			
		}
	}
	if(i == 14){
		if(inputs[i].value == 86){
			number++;
			
		}
	}
	if(i == 15){
		if(inputs[i].value == 79){
			number++;
			
		}
	}
	if(i == 16){
		if(inputs[i].value == 72){
			number++;
			
		}
	}
	if(i == 17){
		if(inputs[i].value == 65){
			number++;
			
		}
	}
	if(i == 18){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 19){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 20){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 21){
		if(inputs[i].value == "手表"){
			number++;
			
		}
	}
	if(i == 22){
		if(inputs[i].value == "铅笔"){
			number++;
			
		}
	}
	if(i == 23){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 24){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 25){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 26){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 27){
		if(inputs[i].checked){
			number++;
			
		}
	}
	if(i == 28){
		if(inputs[i].value.length >= 10){
			number++;
			
		}
	}
	if(i == 29){
		if(inputs[i].checked){
			number++;
			
		}
	}
}
function checklevel(){
	inputs = document.getElementsByTagName('input');
	number = 0;
	for (var i = 0; i < inputs.length; i++) {
		check(i);
	}
	if(number <= 17){
		result.innerHTML = "文盲";
	}else if(number <= 20){
		result.innerHTML = "⼩学文化程度者";
	}else if(number <= 24){
		result.innerHTML = "中学文化程度者";
	}else if(number > 24){
		result.innerHTML = "高中及以上文化程度者";
	}

}