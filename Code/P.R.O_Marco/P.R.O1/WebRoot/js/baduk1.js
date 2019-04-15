var element = document.querySelectorAll(".table2 tr td");
x = 1;
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
setInterval(function(){
	for(var i = 0; i < element.length; i++){
		check(i);
		z(i);
	}
},10);
function check(i){
	savef(i);
	if((save[i - 1] == "black") && (save[i + 1] == "black") && (save[i - 18] == "black") && (save[i + 18] == "black") && (save[i] == "white")){
		element[i].className -= " white";
	}
	if((save[i - 1] == "white") && (save[i + 1] == "black") && (save[i - 18] == "black") && (save[i + 18] == "black") && (save[i] == "white")){
		var h = i - 1;
		setInterval(function(){
			console.log(h);
			if(h == 1){
				return;
			}
			if((save[h + 1] == "black") && (save[h - 18] == "black") && (save[h + 18] == "black") && (save[h] == "white") && (save[h - 1] == "white")){
				element[h].className -= " white";
				element[h - 1].className -= " white";
			}
			h--;
		},10)
	}




	if((save[i - 1] == "white") && (save[i + 1] == "white") && (save[i - 18] == "white") && (save[i + 18] == "white") && (save[i] == "black")){
		element[i].className -= " black";
	}
}
