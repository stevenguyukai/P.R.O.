
var button1=document.getElementById("button1");
var done=true;
//    function ClickMenu(){
//	"use strict";
//	document.getElementById("button1").style.display="block";
//}

function ShowMenu(){
    "use strict";
    if (done && button1.style.opacity !== '1') {
        done = false;
        for (var i = 1; i <= 100; i++) {
            setTimeout("fadeIn(" + i + ",'in')", i * 10);

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
