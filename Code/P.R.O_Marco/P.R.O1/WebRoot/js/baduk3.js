var element = document.querySelectorAll(".table2 tr td");
x = 1, c = 0;
var take = document.getElementById('take');
var save = [];
var times = 0;
function a(){
	setInterval(function(){
		c = 0;
		take.onclick = function(){
			times++;
			if(times % 2 == 1){
				setInterval(function(){
					for(var j = 0; j < element.length; j++){
						y(j);
					}
					c = 1;
				},10)
			}
	}
	if(times % 2 == 0 && c == 0){
		start();
	}
},10);
}


function savef(i){
	save[i] = element[i].className.substr(-5);
}
function z(i){
	element[i].onmousedown = function(){
		savef(i);
		if(!((save[i] == "white") || (save[i] == "black"))){
			if(x % 2 != 0){
				element[i].className += " black";
			}else{
				element[i].className += " white";
			}
			x++;
		
		}
		
	}
}
function start(){
		for(var i = 0; i < element.length; i++){
			check(i);
			z(i);
		}
}
function check(i){
	savef(i);
	checkBlack(i);
	checkWhite(i);
}

function checkWhite(i){
	if((save[i - 1] == "black") && (save[i + 1] == "black") && (save[i - 18] == "black") && (save[i + 18] == "black") && (save[i] == "white")){
		element[i].className -= " white";
	}
	if((save[i - 2] == "black") && (save[i + 1] == "black") && (save[i - 19] == "black") && (save[i - 18] == "black")&& (save[i + 18] == "black") && (save[i + 17] == "black") && (save[i] == "white") && (save[i - 1] == "white")){
		element[i].className -= " white";
		element[i - 1].className -= " white";
	}
	if((save[i - 1] == "black") && (save[i + 1] == "black") && (save[i - 36] == "black") && (save[i + 18] == "black")&& (save[i - 19] == "black") && (save[i - 17] == "black") && (save[i] == "white") && (save[i - 18] == "white")){
			element[i].className -= " white";
			element[i - 18].className -= " white";
		}
}

function checkBlack(i){
	if((save[i - 1] == "white") && (save[i + 1] == "white") && (save[i - 18] == "white") && (save[i + 18] == "white") && (save[i] == "black")){
		element[i].className -= " black";
	}
	if((save[i - 2] == "white") && (save[i + 1] == "white") && (save[i - 19] == "white") && (save[i - 18] == "white")&& (save[i + 18] == "white") && (save[i + 17] == "white") && (save[i] == "black") && (save[i - 1] == "black")){
		element[i].className -= " black";
		element[i - 1].className -= " black";
	}
	if((save[i - 1] == "white") && (save[i + 1] == "white") && (save[i - 36] == "white") && (save[i + 18] == "white")&& (save[i - 19] == "white") && (save[i - 17] == "white") && (save[i] == "black") && (save[i - 18] == "black")){
			element[i].className -= " black";
			element[i - 18].className -= " black";
		}
}


function y(j){
	element[j].onmousedown = function(){
		if(save[j] == "black" || save[j] == "white"){
			element[j].className = "";
		}
		
	}
}

a();