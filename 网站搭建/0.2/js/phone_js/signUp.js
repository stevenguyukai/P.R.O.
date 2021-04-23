function focusNextInput(thisInput) {
	var ins = document.getElementsByClassName("input");
	for (var i = 0; i < ins.length; i++) {
		// 如果聚焦在最后一个输入框
		if (i == (ins.length - 1)) {                                           
			if(ins[0].value.length > 0 && ins[1].value.length > 0){
				ins[ins.length - 1].blur();
			}else{
				if(ins[0].value.length > 0){
					ins[1].focus();
				}else if(ins[1].value.length > 0){
					ins[0].focus();
				}else{
					ins[0].focus();
				}
			}
			break;
		} else if (thisInput == ins[i]) {
			if(i == 0){
				if(ins[1].value.length > 0 && ins[2].value.length > 0){
					ins[0].blur();
				}else{
					if(ins[1].value.length > 0){
						ins[2].focus();
					}else if(ins[2].value.length > 0){
						ins[1].focus();
					}else{
						ins[1].focus();
					}
				}
			}else{
				if(ins[0].value.length > 0 && ins[2].value.length > 0){
					ins[1].blur();
				}else{
					if(ins[2].value.length > 0){
						ins[0].focus();
					}else if(ins[0].value.length > 0){
						ins[2].focus();
					}else{
						ins[2].focus();
					}
				}
			}
			break;
		}
	}
}
