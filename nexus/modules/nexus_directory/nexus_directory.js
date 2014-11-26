Nexus.directory = new Object();
Nexus.directory.groups = (#directory_groups#);
Nexus.directory.labels = (#directory_labels#);

Nexus.directory.update = function(){
	
	Nexus.ajax({
		url: "?method=get_groups",
		success: function(result){
			Nexus.directory.groups = JSON.parse(result);
			add_directory_groups();
		}
	});
};

var directory_entries = [];

document.addEventListener("DOMContentLoaded",add_directory_groups,false);

function add_directory_groups(){
	var details_wrapper = document.querySelector("#details_wrapper");
	details_wrapper.innerHTML = "";
	for(var category in Nexus.directory.groups){
		
		var detail			= details_wrapper.appendChild(document.createElement("details"));
		var summary			= detail.appendChild(document.createElement("summary"));
		summary.innerHTML	= category.replace("_"," ");
		
		var add_button			= summary.appendChild(document.createElement("button"));
		add_button.className 	= "fa fa-plus-square";
		add_button.category 	= category;
		add_button.relationship = category.replace("_"," ");
		add_button.addEventListener("click",function(){
			document.querySelector("#navigator").toggle_class('hidden');
			Nexus.ajax({target:document.querySelector(".nexus.directory.viewlist #preview"), url:'?method=add_form&relationship='+this.relationship});
		},false);
		
		var results_container 		= detail.appendChild(document.createElement("div"));
		results_container.className = "results";
		
		if(Nexus.directory.groups[category]){
			
			for(var j=0; j<Nexus.directory.groups[category].length; j++){
				var result 					= new Object();
				result.element				= results_container.appendChild(document.createElement("div"));
				result.element.category		= category;
				result.element._id			= Nexus.directory.groups[category][j]._id;
				result.element.addEventListener("click",function(){
					document.querySelector("#navigator").toggle_class('hidden');
					Nexus.ajax({target:document.querySelector(".nexus.directory.viewlist #preview"), url:'?method=view&fields[_id]='+this._id})
				},false);
				result.name					= Nexus.directory.groups[category][j].name;
				result.element.innerText	= result.name;
				directory_entries.push(result);
			}
		}
	}
}

function invalidate_address_details(address_details_container){
	container = address_details_container;
	
	var inputs = container.querySelectorAll("input:not([type=button])");
	for(var i=0; i<inputs.length; i++){
		if(inputs[i].value.trim() != ""){
			inputs[i].removeAttribute("required");
			console.debug("invalidating");
			container.className = container.className.replace("valid","");
			return null;
		}
	}
	
	container.className += " valid";
}

function validate_details(){
	
}

function validate_address_details(address_details_container){
	
	var container = address_details_container;
	
	var address_details = {
		street_num: container.querySelector("input[name*='street number']") ? container.querySelector("input[name*='street number']").value 	: null,
		street_name: container.querySelector("input[name*='street name']") 	? container.querySelector("input[name*='street name']").value 		: null,
		suburb: container.querySelector("input[name*='suburb']") 			? container.querySelector("input[name*=suburb]").value 				: null,
		city: container.querySelector("input[name*=city]") 					? container.querySelector("input[name*=city]").value 				: null,
		province: container.querySelector("input[name*=province]") 			? container.querySelector("input[name*=province]").value 			: null,
		country: container.querySelector("input[name*=country]") 			? container.querySelector("input[name*=country]").value 			: null
	};
	
	var query = "";
	for(var i in address_details){
		query += address_details[i] ? address_details[i]+", " : "";
	}
	
	if(!query){
		alert("Please enter in some information to validate");
		console.error("null Query");
		return false;
	}
	
	var geocode_params = {
		query:query,
		success:function(data_received){
			if(data_received.status == google.maps.GeocoderStatus.OK){
				
				
				var nexus_address = {
					"street number":"",
					"street name":"",
					"suburb":"",
					"city":"",
					"province":"",
					"country":""
				};
				
				for(var i in data_received.results[0].address_components){
		
					if(data_received.results[0].address_components[i].types[0] == "street_number"){
						nexus_address["street number"] = data_received.results[0].address_components[i].long_name;
						continue;
					}
					
					if(data_received.results[0].address_components[i].types[0] == "route"){
						nexus_address["street name"] = data_received.results[0].address_components[i].long_name;
						continue;				
					}
					
					if(data_received.results[0].address_components[i].types[0] == "sublocality_level_1"){
						nexus_address["suburb"] = data_received.results[0].address_components[i].long_name;
						continue;
					}
					
					if(data_received.results[0].address_components[i].types[0] == "locality"){
						nexus_address["city"] = data_received.results[0].address_components[i].long_name;
						continue;
					}
					
					if(data_received.results[0].address_components[i].types[0] == "administrative_area_level_1"){
						nexus_address["province"] = data_received.results[0].address_components[i].long_name;
						continue;
					}
					
					if(data_received.results[0].address_components[i].types[0] == "country"){
						nexus_address["country"] = data_received.results[0].address_components[i].long_name;
						continue;
					}
	
				}
				
				for(var i in nexus_address){
					
					var input = container.querySelector("input[name*='"+i+"']");
					if(input){
						input.value = nexus_address[i];
						input.setAttribute("required","required");
					}
				}
				
				var form = container.parentNode
				
				while(form.tagName != "FORM"){
					form = form.parentNode;
				}
				
				container.className += " valid ";
			}
			else{
				alert("Address Details are invalid");
				invalidate_address_details(container);
			}
		}
	};
	Nexus.google.maps.ajax_reverse_geocode(geocode_params);
	
	//do the ajax query to google maps
	//if there is a valid response, show the submit button
	//dont forget, if the value has changed for any of the address fields... then the validation must start again AND the submit must not show
}

function add_field(param){
	
	param 				= (typeof param == "object") ? param : {};
	
	param.target 		= param.target instanceof HTMLElement ? param.target : null;
	
	if(!param.target){
		console.error("No target specified");
		return;
	}
	
	switch(param.type){
		case 'linked_contact':
			add_linked_contact_field(param);
		break;
	}
	
}

function add_linked_contact_field(param){
	
	param 				= (typeof param == "object") ? param : {};
	param.target 		= param.target instanceof HTMLElement ? param.target : null;
	param.relationship	= param.relationship || null;
	param.removable		= param.removable == false ? false : true;
	
	if(!param.target || !param.relationship){
		 console.error("No Target or Relationship");
		 return null;
	}
	
	var array_to_add = null;
	switch(param.relationship.toLowerCase()){
		case "insurance company":
			array_to_add = Nexus.directory.groups.insurance_companies;
		break;
		
		case "broker":
			array_to_add = Nexus.directory.groups.brokers;
		break;
		
		case "managing agent":
			array_to_add = Nexus.directory.groups.managing_agents;
		break;
		
		case "consultant":
			array_to_add = Nexus.directory.groups.consultants;
		break;
		
		case "company":
			array_to_add = Nexus.directory.groups.businesses;
		break;
		
	}
	
	var field 	 			= param.target.appendChild(document.createElement("div"));
	field.className 		= "field";
	var field_index 		= 0;
	
	while(document.querySelector("select[name*='fields[linked contacts]["+field_index+"]'")){
		field_index++;
	}
	
	var relationship_field 	= field.appendChild(document.createElement("input"));
	relationship_field.setAttribute("type","hidden");
	relationship_field.setAttribute("name","fields[linked contacts]["+field_index+"][relationship]");
	relationship_field.setAttribute("value",param.relationship);
	
	var dropdown 			= field.appendChild(document.createElement("select"));
	dropdown.setAttribute("name","fields[linked contacts]["+field_index+"][child]");
	dropdown.setAttribute("required","required");
	
	var default_option			= dropdown.appendChild(document.createElement("option"));
	default_option.setAttribute("value","");
	default_option.innerHTML 	= param.relationship + "...";
	
	for(var i=0; i<array_to_add.length; i++){
			var option 			= dropdown.appendChild(document.createElement("option"));
			option.value 		= array_to_add[i]['_id'];
			option.innerHTML 	= array_to_add[i]['name'];
	}
	
	console.debug(param.removable);
	
	if(param.removable == true){
		var field_close				= field.appendChild(document.createElement("button"));
		field_close.className		= "fa fa-close";
		field_close.addEventListener("click",function(){
				this.parentNode.parentNode.removeChild(this.parentNode);
		},false);
	}
}
