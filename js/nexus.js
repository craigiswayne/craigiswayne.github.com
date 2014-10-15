/*modification of prototypes*/
Number.prototype.toRad = function() { return this * (Math.PI / 180); };

var Nexus = new Object();
Nexus.references = [
	"http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates" //coord_diff
];

//Nexus.repository_url = "//craigwayne.github.io";
Nexus.repository_url = document.location.origin+"/craigwayne.github.com";

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

Nexus.coord_diff = function(coord_obj1, coord_obj2){
	
	if(!coord_obj1 || !coord_obj2){console.error("Requires 2 Parameters"); return null;}
	
	if(typeof(coord_obj1) != "object" || typeof(coord_obj2) != "object"){console.error("Both parameters must be of Object type"); return null;}
	
	lat1 = coord_obj1.latitude;
	lat2 = coord_obj2.latitude;
	
	lon1 = coord_obj1.longitude;
	lon2 = coord_obj2.longitude;
	
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


document.addEventListener("DOMContentLoaded",function(){Nexus.install();},false);

//console.debug("need a function to merge object data, for example, merge the dataset against the parameters sent to a function and that containers dataset");
//console.debug("include the nexus.css file via this script if its not already added");
//console.debug("this file must serve as a portal to other files");
//console.debug("change callbacks to promises");
//console.debug("fix the link js functions");
