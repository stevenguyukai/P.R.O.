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
var changeAmount = new Vue({
	el: ".changeAmountClass",
	data:{
		changeAmount: "display: none",
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

//用户按下更新按钮
function updateMaskAmount(){
	changeAmount.changeAmount = "display: block";
}

//用户选择不同意
function dislike(){
	changeAmount.changeAmount = "display: none";
}

//用户选择同意
function like(){
	changeAmount.changeAmount = "display: none";
	window.location.href="updateAmount.jsp";
}
