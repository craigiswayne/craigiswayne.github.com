//TODO Maintain input type integrity
//TODO Enable debug mode which will console the output and ask to continue form submission
//TODO Maintain input names

document.addEventListener("DOMContentLoaded",function(){

	//get all forms that have the contain nexus in its class name
	var nexus_forms = document.querySelectorAll("form.nexus");
	
	for(var i=0; i<nexus_forms.length; i++){
		
		nexus_forms[i].required_fields = nexus_forms[i].querySelectorAll("input[required]");
		nexus_forms[i].setAttribute("onsubmit","return validate_form(this);");
	}
		
},false);

function validate_form(form){
	
	var validation_status = true;
	//var validation_status = false;
	
	for(var i=0; i<form.required_fields.length; i++){
		
		//checks if a form field's required attribute was removed
		if(!form.required_fields[i].hasAttribute("required")){
			form.required_fields[i].setAttribute("required","");
			alert("A required field's property was changed! Reverting...");
			validation_status = false;
			break;
		}
	}
	
	/*for(var i=0; i<form.fields.length; i++){
		
		console.log("original");
		console.log(form.fields[i]);
		
		console.log("new");
		console.log(form.querySelectorAll("input")[i]);
		
	}
	*/
	
	return validation_status;
}
