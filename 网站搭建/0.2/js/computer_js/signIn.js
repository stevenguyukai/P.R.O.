function focusNextInput(thisInput) {
	var ins = document.getElementsByClassName("input");
	for (var i = 0; i < ins.length; i++) {
		if (i == (ins.length - 1)) {
			if(ins[0].value.length > 0){
				ins[ins.length - 1].blur();
			}else{
				ins[0].focus();
			}
			break;
		} else if (thisInput == ins[i]) {
			if(ins[i + 1].value.length > 0){
				ins[i].blur();
			}else{
				ins[i + 1].focus();
			}
			break;
		}
	}
}