var result = document.getElementById("result");
function check(){
	setInterval(function(){
		checkShuDu();
	},1000);
};

function checkShuDu(){
	checkAllElement();
	if(rowAnswer == 1 && lineAnswer == 1 && tableAnswer == 1){
		result.innerHTML = "通过";
	}else{
		result.innerHTML = "不通过";
		checkAllElement();
	}
	
}

function getAllElement() {
	getAllTables();
	getAllRows();
	getAllLines();
}

function getAllTables(){
	table1 = document.querySelectorAll(".table1");
	table2 = document.querySelectorAll(".table2");
	table3 = document.querySelectorAll(".table3");
	table4 = document.querySelectorAll(".table4");
	table5 = document.querySelectorAll(".table5");
	table6 = document.querySelectorAll(".table6");
	table7 = document.querySelectorAll(".table7");
	table8 = document.querySelectorAll(".table8");
	table9 = document.querySelectorAll(".table9");
}

function getAllRows(){
	row1 = document.querySelectorAll(".row1");
	row2 = document.querySelectorAll(".row2");
	row3 = document.querySelectorAll(".row3");
	row4 = document.querySelectorAll(".row4");
	row5 = document.querySelectorAll(".row5");
	row6 = document.querySelectorAll(".row6");
	row7 = document.querySelectorAll(".row7");
	row8 = document.querySelectorAll(".row8");
	row9 = document.querySelectorAll(".row9");
}

function getAllLines(){
	line1 = document.querySelectorAll(".line1");
	line2 = document.querySelectorAll(".line2");
	line3 = document.querySelectorAll(".line3");
	line4 = document.querySelectorAll(".line4");
	line5 = document.querySelectorAll(".line5");
	line6 = document.querySelectorAll(".line6");
	line7 = document.querySelectorAll(".line7");
	line8 = document.querySelectorAll(".line8");
	line9 = document.querySelectorAll(".line9");
}


function checkAllElement(){
	tableAnswer = 0;
	lineAnswer = 0;
	rowAnswer = 0;
	getAllElement();
	checkTables();
	checkLines();
	checkRows();
}
function checkTables(){
	tableAnswer = 1;
	for(var i = 0; i < 8; i++){
		if((table1[i].value == table1[i + 1].value || table2[i].value == table2[i + 1].value ||
		 table3[i].value == table3[i + 1].value || table4[i].value == table4[i + 1].value ||
		  table5[i].value == table5[i + 1].value || table6[i].value == table6[i + 1].value ||
		   table7[i].value == table7[i + 1].value || table8[i].value == table8[i + 1].value || 
		   table9[i].value == table9[i + 1].value)){
			tableAnswer = 0;
		}
	}
}
function checkLines(){
	lineAnswer = 1;
	for(var i = 0; i < 8; i++){
		if((line1[i].value == line1[i + 1].value || line2[i].value == line2[i + 1].value ||
		 line3[i].value == line3[i + 1].value || line4[i].value == line4[i + 1].value ||
		  line5[i].value == line5[i + 1].value || line6[i].value == line6[i + 1].value ||
		   line7[i].value == line7[i + 1].value || line8[i].value == line8[i + 1].value || 
		   line9[i].value == line9[i + 1].value)){
			lineAnswer = 0;
		}
	}
}
function checkRows(){
	rowAnswer = 1;
	for(var i = 0; i < 8; i++){
		if((row1[i].value == row1[i + 1].value || row2[i].value == row2[i + 1].value ||
		 row3[i].value == row3[i + 1].value || row4[i].value == row4[i + 1].value ||
		  row5[i].value == row5[i + 1].value || row6[i].value == row6[i + 1].value ||
		   row7[i].value == row7[i + 1].value || row8[i].value == row8[i + 1].value || 
		   row9[i].value == row9[i + 1].value)){
			rowAnswer = 0;
		}
	}
}