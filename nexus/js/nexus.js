/*modification of prototypes*/
Number.prototype.toRad = function() { return this * (Math.PI / 180); };

HTMLElement.prototype.toggle_class = function(class_name1, class_name2){
	
	if(class_name1 && class_name2){
		this.className = (this.className.indexOf(class_name1) != -1) ? this.className.replace(class_name1,class_name2) : this.className.replace(class_name2,class_name1);
	}
	else if(class_name1){	
		if(this.className.indexOf(class_name1) == -1){
			this.className += " " + class_name1 + " ";
		}
		else{
			this.className = this.className.replace(class_name1,"");
		}
	}
};


var Nexus = new Object();
Nexus.references = [
	"http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates" //coord_diff
];
Nexus.repository_url = (document.location.host == "127.0.0.1") ? document.location.origin+"/craigwayne.github.com" : "//craigwayne.github.io";

Nexus.go_fullscreen = function(element){
	
	var target = element || document.body;
	
	var request_method = target.requestFullScreen || target.webkitRequestFullScreen || target.mozRequestFullScreen || target.msRequestFullScreen;

	if (request_method){
		request_method.call(target);
	} else if (typeof window.ActiveXObject !== "undefined"){
		var wscript = new ActiveXObject("WScript.Shell");
		if(wscript !== null)wscript.SendKeys("{F11}");
	}
};

Nexus.exit_fullscreen = function(){
	
	if (document.exitFullscreen) {
		document.exitFullscreen();
	}
	else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	}
	else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
	
};

Nexus.link_css = function(href){
	
	href = href || Nexus.repository_url+"/css/nexus.css";
	var style_links = document.querySelectorAll("link");
	var linked = false;
	for(var i=0; i<style_links.length; i++){
		var link = style_links[i];
		if(link.getAttribute("href").indexOf(href) > -1){
			linked = true;
			break;
		}
	}
	if(!linked){
		var link = document.getElementsByTagName("head")[0].appendChild(document.createElement("link"));
		link.setAttribute("href",href);
		link.setAttribute("rel","stylesheet");
	}
	
	return link;
};

Nexus.link_js = function(src){
	
	if(!src){return;}
	
	var js_links = document.querySelectorAll("script[src]:not([src=''])");
	var linked = false;
	for(var i=0; i<js_links.length; i++){
		var link = js_links[i];
		if(link.getAttribute("src").indexOf(src) > -1){
			linked = true;
			break;
		}
	}
	
	if(!linked){
		var link = document.getElementsByTagName("head")[0].appendChild(document.createElement("script"));
		link.setAttribute("src",src);
	}
	
	return link;
};

Nexus.install = function(){
	//this links the required files depending on the elements found
	
	//link the default nexus file
	Nexus.link_css();
	//link font awesome
	Nexus.link_css(Nexus.repository_url+'/css/font-awesome-4.2.0/css/font-awesome.min.css');
	
	//nexus gallery	
	if(document.querySelector(".nexus.gallery") || document.querySelector(".nexus.mosaic")){
		Nexus.link_css(Nexus.repository_url+"/plugins/nexus_gallery/nexus_gallery.css");
		Nexus.link_js(Nexus.repository_url+"/plugins/nexus_gallery/nexus_gallery.js");
		Nexus.link_css(Nexus.repository_url+"/plugins/nexus_carousel/nexus_carousel.css");
		Nexus.link_js(Nexus.repository_url+"/plugins/nexus_carousel/nexus_carousel.js");
	}
	
	//nexus carousel
	if(document.querySelector(".nexus.carousel")){
		Nexus.link_css(Nexus.repository_url+"/plugins/nexus_carousel/nexus_carousel.css");
		Nexus.link_js(Nexus.repository_url+"/plugins/nexus_carousel/nexus_carousel.js");
	}
	
	//nexus google maps
	if(document.querySelector(".nexus.google_maps")){
		//Nexus.link_css(Nexus.repository_url+"/plugins/nexus_google_maps/nexus_google_maps.css");
		//Nexus.link_js(Nexus.repository_url+"/plugins/nexus_google_maps/nexus_google_maps.js");
	}
	
};

Nexus.color_to_hex = function(color_string){
	
    var a = document.createElement('div');
    a.style.color = color_string;
    var colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
};

Nexus.math = Nexus.math || new Object();

Nexus.math.coord_diff = function(coord_obj1, coord_obj2){
	
	if(!coord_obj1 || !coord_obj2){console.error("Requires 2 Parameters"); return false;}
	
	if(typeof(coord_obj1) != "object" || typeof(coord_obj2) != "object"){console.error("Both parameters must be of Object type"); return false;}
	
	lat1 = parseFloat(coord_obj1.latitude);
	lat2 = parseFloat(coord_obj2.latitude);
	
	lon1 = parseFloat(coord_obj1.longitude);
	lon2 = parseFloat(coord_obj2.longitude);
	
	if(isNaN(lat1) || isNaN(lat2) || isNaN(lon1) || isNaN(lon2)){console.error("Invalid values"); return false;}
	
	
	//see references
	var R = 6371; // km
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = lat2.toRad();
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	
	return d;
};

Nexus.filter = function(param){

	param.query				= param.query			|| null;
	param.data				= param.data			|| new Array(); 
	
	if(!param.query || param.query == ""){
		
		for(var i=0; i<param.data.length; i++){
			param.data[i].element.dataset.filtered = "true";
		}
		
		/*
			console.group("Nexus.filter_elements:");
			console.error("No query present");
			console.debug("parameters sent:");
			console.debug(param);
			console.groupEnd();
		*/
	}
	else{
		
		for(var i=0; i<param.data.length; i++){
			if(param.data[i].name.toLowerCase().indexOf(param.query) == -1){
				param.data[i].element.dataset.filtered = "false";
			}
			else{
				param.data[i].element.dataset.filtered = "true";
			}
		}
	
	}
};

Nexus.toggle_class = function(){
	
};

Nexus.ajax = function(param){
	
	
	param = (typeof param == "object") ? param : new Object();
	
	param.target 	= param.target 		|| undefined;
	param.target 	= (typeof param.target == "string") ? document.querySelector(param.target) : param.target;
	
	param.url		= param.url 		|| undefined;
	param.source	= param.source 		|| (event ? (event.target || event.srcElement) : param.source) || null;
	param.method	= param.method 		|| "GET";
	//param.mime_type = param.mime_type 	||
	
	
	param.form_data = param.form_data	|| null;
	
	if(param.source && param.source.tagName == "FORM"){
		
		param.form_data = param.form_data || new FormData(param.source);
		
		param.url		= param.url || param.source.action;
		
		param.method 	= param.source.method;
	}
	
	
	//check that all required parameters are present
	if(!param.url){
		console.error("Missing parameters");
		return null;
	}
	
	var xmlhttp;
	
	if (window.XMLHttpRequest){
		xmlhttp	= new XMLHttpRequest();
	}
	else{
		xmlhttp	= new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if(param.mime_type){
		xmlhttp.overrideMimeType(param.mime_type+"; charset=UTF-8");
	}
	else{
		xmlhttp.responseType = "document";
	}
	
	xmlhttp.onreadystatechange=function(){
		
		var response = null;
		
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			
			response = xmlhttp.response;
			
			//formatting of the reponse
			switch(xmlhttp.getResponseHeader("Content-Type")){
				case "application/json; charset=UTF-8":
					response = JSON.parse(response);
				break;
			}
			
			if(param.target){
				param.target.innerHTML = "";				
				for(var i=0; i<response.body.childNodes.length; i++){
					param.target.appendChild(response.body.childNodes[i]);
				}
				param.target.toggle_class("ajax_loading");	
			}
			
			if(param.callback){
				var callback_params = {
					response: 		response
				};
				param.callback(callback_params);
			}
		}
	};
	
	if(param.target){
		param.target.toggle_class("ajax_loading");
	}
	
	xmlhttp.open(param.method,param.url,true);
	xmlhttp.send(param.form_data);
	
	return false;
	
};


//document.addEventListener("DOMContentLoaded",function(){Nexus.install();},false);

//console.debug("need a function to merge object data, for example, merge the dataset against the parameters sent to a function and that containers dataset");
//console.debug("include the nexus.css file via this script if its not already added");
//console.debug("this file must serve as a portal to other files");
//console.debug("change callbacks to promises");
//console.debug("fix the link js functions");
