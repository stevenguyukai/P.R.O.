var button1 = document.getElementById("button1");
var done = true;


function ShowMenu() {
	"use strict";
	if (done && button1.style.opacity !== '1') {
		done = false;
		for (var i = 1; i <= 100; i++) {
			setTimeout("fadeIn(" + i + ",'in')", i * 5);

		}
	}
}

function setOpacity(opacity) {
	"use strict";
	button1.style.opacity = opacity / 100;
	button1.style.filter = 'alpha(opacity=' + opacity + ')';
}
//function fadeOut(opacity) {
//		"use strict";
//    setOpacity(opacity);
//    if (opacity === 1) {
//        button1.style.display = 'none';
//        var done = true;
//    }
//}
function fadeIn(opacity) {
	"use strict";
	setOpacity(opacity);
	if (opacity === 1) {
		button1.style.display = 'block';
	}
	if (opacity === 100) {
		done = true;
	}
}









var info = document.getElementById("info");
info.onmouseover = function () {
	var infomassage = document.getElementById("infomassage");
	infomassage.style.display = "inline-block";
}
info.onmouseout = function () {
	var infomassage = document.getElementById("infomassage");
	infomassage.style.display = "none";
}
var braingame = document.getElementById("braingame");
braingame.onmouseover = function () {
	var braingamemassage = document.getElementById("braingamemassage");
	braingamemassage.style.display = "inline-block";
}
braingame.onmouseout = function () {
	var braingamemassage = document.getElementById("braingamemassage");
	braingamemassage.style.display = "none";
}
var market = document.getElementById("market");
market.onmouseover = function () {
	var marketmassage = document.getElementById("marketmassage");
	marketmassage.style.display = "inline-block";
}
market.onmouseout = function () {
	var marketmassage = document.getElementById("marketmassage");
	marketmassage.style.display = "none";
}
var membership = document.getElementById("membership");
membership.onmouseover = function () {
	var membershipmassage = document.getElementById("membershipmassage");
	membershipmassage.style.display = "inline-block";
}
membership.onmouseout = function () {
	var membershipmassage = document.getElementById("membershipmassage");
	membershipmassage.style.display = "none";
}
