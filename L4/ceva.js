function sumArray(arr){
	var s = 0;
	
	arr.forEach(function callback(item){
		s+=item;
	});
	
	return s;
}


function prodArray(arr){
	var p = 1;
	
	arr.forEach(function callback(item){
		p*=item;
	});
	
	return p;
}


function maxArray(arr){
	if(arr.length == 0) return null;
	
	var max = arr[0];
	
	arr.forEach(function callback(item){
		if(max<item)
			max = item;
	});
	
	return max;
}


function concatArray(arr){
	if(arr.length == 0) return null;
	
	var conc="";
	
	for(var i = 0;i<arr.length;i++){
		conc += arr[i];
	};
	
	return conc;
}


function palindrom(word){
	var tWord = word+""; //cast into String, whatever the type is
	var reverseWord = concatArray(Array.from(tWord).reverse());
	return tWord == reverseWord;
	
}