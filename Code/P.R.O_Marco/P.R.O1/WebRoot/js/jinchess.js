var chess = document.getElementsByClassName('td');
var result = document.getElementById('result');
var b = [];
var j = 0;
var c = false;
function s(){
	setInterval(function(){
		if(c){
			return;
		}else{
			start();
			for (var i = 0; i < chess.length; i++) {
				a(i);
				check(i);
			}
		}
	
},100)
} 
function start(){
	for (var i = 0; i < chess.length; i++) {
	b[i] = chess[i].innerHTML;
	}
}
function a(i){
	chess[i].onclick = function(){
			if(j % 2 == 0){
				chess[i].innerHTML = "teamA";
			}else if(j % 2 == 1){
				chess[i].innerHTML = "teamB";
			}
			j++;
		}
}
function check(i){
	if((i % 3 == 0) && (b[i] == "teamA") && (b[i + 1] == "teamA") && (b[i + 2] == "teamA") ||
		(b[i] == "teamA") && (b[i + 3] == "teamA") && (b[i + 6] == "teamA") ||
		(b[i] == "teamA") && (b[i + 4] == "teamA") && (b[i + 8] == "teamA") ||
		(b[i] == "teamA") && (b[i + 2] == "teamA") && (b[i + 4] == "teamA")){
			result.innerHTML = "teamA win";
			c = true;
	}
	if((i % 3 == 0) && (b[i] == "teamB") && (b[i + 1] == "teamB") && (b[i + 2] == "teamB") ||
		(b[i] == "teamB") && (b[i + 3] == "teamB") && (b[i + 6] == "teamB") ||
		(b[i] == "teamB") && (b[i + 4] == "teamB") && (b[i + 8] == "teamB") ||
		(b[i] == "teamB") && (b[i + 2] == "teamB") && (b[i + 4] == "teamB")){
			result.innerHTML = "teamB win";
			c = true;
	}
}
s();