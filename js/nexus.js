var Nexus = new Object();
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
};

Nexus.link_js = function(src){
	
	if(!src){return;}
	
	var js_links = document.querySelectorAll("script");
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
	
	if(document.querySelector(".nexus.carousel")){
		Nexus.link_css(Nexus.repository_url+"/plugins/nexus_carousel/nexus_carousel.css");
		Nexus.link_js(Nexus.repository_url+"/plugins/nexus_carousel/nexus_carousel.js");
	}
	
};

document.addEventListener("DOMContentLoaded",function(){Nexus.install();},false);

console.debug("need a function to merge object data, for example, merge the dataset against the parameters sent to a function and that containers dataset");
console.debug("include the nexus.css file via this script if its not already added");
console.debug("this file must serve as a portal to other files");
