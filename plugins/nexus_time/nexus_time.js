document.addEventListener("DOMContentLoaded",function(){
	
	var time_tags = document.querySelectorAll("time[datetime]:not([datetime=''])");
	
	for(var i=0; i<time_tags.length; i++){
		show_locale_times(time_tags[i]);
	}
},false);

function show_locale_times(time_tag){

	var original_datetime_string = time_tag.getAttribute("datetime");
	
	if(original_datetime_string.indexOf("-") > -1){
		timezone_modifier = "-";
	}
	else if(original_datetime_string.indexOf("+") > -1){
		timezone_modifier = "+";
	}
	else{
		console.warn("Unable to parse time");
		return;
	}
	
	
	var original_time_zone_offset = original_datetime_string.substring(original_datetime_string.indexOf(timezone_modifier),original_datetime_string.length);
	
	var original_time_array  = original_datetime_string.substring(0,original_datetime_string.indexOf(timezone_modifier)).split(":");				
	var original_time			  = new Object();
	original_time["hours"] 		  = parseInt(original_time_array[0]) || 0;
	original_time["hours"] 		  = original_time["hours"] == 0 ? 24 : original_time["hours"];
	
	original_time["minutes"] 	  = parseInt(original_time_array[1]) || 0;
	original_time["seconds"]	  = parseInt(original_time_array[2]) || 0;
	original_time["milliseconds"] = parseInt(original_time_array[3]) || 0;
	original_time["timezone_offset_hours"] = parseInt(original_time_zone_offset.split(":")[0]) || 0 ;
	original_time["timezone_offset_minutes"] = parseInt(original_time_zone_offset.split(":")[1]) || 0;
	//console.debug(original_time);
	
	var clients_date = new Date();
	var users_time = new Object();
	users_time["timezone_offset_hours"]   = 0-parseInt((clients_date.getTimezoneOffset())/60); //UTC Offset, must negate the value
	users_time["timezone_offset_minutes"] = parseInt((clients_date.getTimezoneOffset())%60);
	//console.debug(users_time);
	
	var adjusted_time = new Object();
	adjusted_time["hours"]   = original_time["hours"]   - parseInt(original_time["timezone_offset_hours"]) + parseInt(users_time["timezone_offset_hours"]);
	adjusted_time["hours"] = (adjusted_time["hours"].toString().length == 1) ? "0" + adjusted_time["hours"] : adjusted_time["hours"];
	adjusted_time["minutes"] = original_time["minutes"] - parseInt(original_time["timezone_offset_minutes"]) + parseInt(users_time["timezone_offset_minutes"]);
	adjusted_time["minutes"] = (adjusted_time["minutes"].toString().length == 1) ? "0" + adjusted_time["minutes"] : adjusted_time["minutes"];
	//console.debug(adjusted_time);
	
	time_tag.innerHTML = original_datetime_string + " -> " + adjusted_time["hours"] + ":" + adjusted_time["minutes"]; 
}
