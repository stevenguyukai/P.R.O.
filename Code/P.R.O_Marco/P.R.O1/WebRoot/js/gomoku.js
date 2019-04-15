var element = document.querySelectorAll(".table2 tr td");
var result = document.getElementById('result');
var x = 1;
var save = [];
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
			h = i;
		
		}
		
	}
}
Interval: setInterval(function(){
	for(var i = 0; i < element.length; i++){
		check(i);
		z(i);
	}
},10);
function check(i){
	savef(i);
	if(((save[i] == "black") && (save[i + 1] == "black") && (save[i + 2] == "black") && (save[i + 3] == "black") && (save[i + 4] == "black"))||
	((save[i] == "black") && (save[i + 18] == "black") && (save[i + 36] == "black") && (save[i + 54] == "black") && (save[i + 72] == "black"))||
	((save[i] == "black") && (save[i + 19] == "black") && (save[i + 38] == "black") && (save[i + 57] == "black") && (save[i + 76] == "black"))||
	((save[i] == "black") && (save[i + 17] == "black") && (save[i + 34] == "black") && (save[i + 51] == "black") && (save[i + 68] == "black"))){
		result.innerHTML = "black win";
		clearInterval(Interval);
		return;
	}
	if(((save[i] == "white") && (save[i + 1] == "white") && (save[i + 2] == "white") && (save[i + 3] == "white") && (save[i + 4] == "white"))||
	((save[i] == "white") && (save[i + 18] == "white") && (save[i + 36] == "white") && (save[i + 54] == "white") && (save[i + 72] == "white"))||
	((save[i] == "white") && (save[i + 19] == "white") && (save[i + 38] == "white") && (save[i + 57] == "white") && (save[i + 76] == "white"))||
	((save[i] == "white") && (save[i + 17] == "white") && (save[i + 34] == "white") && (save[i + 51] == "white") && (save[i + 68] == "white"))){
		result.innerHTML = "white win";
	}
}