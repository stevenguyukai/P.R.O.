//管理用户的排名
var vn = new Vue({
	el:".button",
	data: {
		asd : "没有排名"
	}
});



function rankAsLocation() {
	rankStyle1.rankAmount = "display: none";
	rankStyle2.rankLocation = "display: inline";
}

function rankAsAmount() {
	rankStyle1.rankAmount = "display: inline";
	rankStyle2.rankLocation = "display: none";
}



//管理排行榜的排行顺序
var rankStyle1 = new Vue({
	el: ".rankView1",
	data:{
		rankAmount: "display: block",
	}
});
var rankStyle2 = new Vue({
	el: ".rankView2",
	data:{
		rankLocation: "display: none",
	}
});