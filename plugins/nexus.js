function sort_object_array(param){
	
	if(typeof param !== "object"){ console.error("parameter must be of object type"); return;}
	
	param["array"].sort(function(a,b){
		
		var key_value_a = a[param["key"]].toLowerCase(); 
		var key_value_b = b[param["key"]].toLowerCase();
											
		if(key_value_a < key_value_b)
			return -1;
		else
			return 1;
			
		return 0;
	});
}

