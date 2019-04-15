var pawns = document.getElementsByClassName('pawn');
var td = document.getElementsByTagName("td");
for (var i = 0; i < 24; i++) {
	if(td[i].className.substring(0,5) == "cella"){
		pawns[i].className += " teama"
	}
	
}
for (var i = 40; i < 64; i++) {
	if(td[i].className.substring(0,5) == "cellb"){
		pawns[i].className += " teamb";
	}
	
}
