/*Prototypes start*/

  Number.prototype.toRad = function() { return this * (Math.PI / 180); };

  Date.prototype.today = function(){
    var date = new Date();
	  return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()<10 ? '0'+date.getDate() : date.getDate());
  };

  Math.coord_diff = function(coord_obj1, coord_obj2){

  	if(!coord_obj1 || !coord_obj2){
  	  console.error("Requires 2 Parameters");
  	  return false;
  	}

  	if(typeof(coord_obj1) != "object" || typeof(coord_obj2) != "object"){
  	  console.error("Both parameters must be of Object type");
  	  return false;
    }

  	lat1 = parseFloat(coord_obj1.latitude);
  	lat2 = parseFloat(coord_obj2.latitude);

  	lon1 = parseFloat(coord_obj1.longitude);
  	lon2 = parseFloat(coord_obj2.longitude);

  	if(isNaN(lat1) || isNaN(lat2) || isNaN(lon1) || isNaN(lon2)){
  	  console.error("Invalid values");
  	  return false;
  	}


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

  HTMLFormElement.prototype.submit_via_ajax = function(){
    var form = this;

		var result = Nexus.ajax({
			url: 	  form.action,
			data: 	$(form).serialize(),
			method: form.method,
			target:	form,
			success: function(result){
			  form.remove_class("ajax_loading");
			  var success_notice        = form.appendChild(document.createElement("div"));
			  success_notice.className  = "success_notice";

			  var table_aligner			= success_notice.appendChild(document.createElement("table"));
			  table_aligner.className	= "align_center";

			  var table_row_aligner		= table_aligner.appendChild(document.createElement("tr"));

			  var table_cell_aligner	= table_row_aligner.appendChild(document.createElement("td"));

			  var success_icon          = table_cell_aligner.appendChild(document.createElement("img"));
			  success_icon.className    = "success_icon animation popup";
			  success_icon.src          = "images/thumbs_up.svg";

			  var success_label         = table_cell_aligner.appendChild(document.createElement("label"));
			  success_label.className   = "success_label animation popup";
			  success_label.innerHTML   = "Success!";

			  var success_next          = table_cell_aligner.appendChild(document.createElement("input"));
			  success_next.type         = "button";
			  success_next.value        = "Next";
			  success_next.className    = "success_next animation popup";
			  success_next.innerHTML    = "Next";

			  success_next.onclick      = function(){
           $(form).replaceWith(result);
			  };
			}
		});

		return false;
  };


  HTMLInputElement.prototype.read_file = function(callback){
  
	  if(this.type){
		  console.debug(this.type);
		  
		  if(this.type === "file" && this.className.indexOf("nexus") > -1){
			
			this.adEventListener("change",function(){
				
				var reader = new FileReader();
				
				for(var i=0; i<this.files.length; i++){
					var file = this.files[0];
					reader.readAsBinaryString(file.slice(0, file.size));
				}
				
				reader.onloadend = function(evt) {
					
					var file_contents = evt.target.result;
					
					if (evt.target.readyState == FileReader.DONE) {
						calback = callback || function(file_contents){
							console.group("read_file output:");
							console.debug(file_contents);
							console.groupEnd();
						};
						callback(file_contents);
					}
				};
				
				
			},false);
			
		  }
	  }
	  
  };

/*Prototypes end*/

var Nexus =  window; //there should be an option to extend the window OR NOT

Nexus.references = [
	"http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates" //coord_diff
];

//Nexus.repository_url = (document.location.host == "127.0.0.1") ? document.location.origin+"/craigwayne.github.com" : "//craigwayne.github.io";

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

/*
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
*/

Nexus.color_to_hex = function(color_string){

    var a = document.createElement('div');
    a.style.color = color_string;
    var colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
};

Nexus.filter = function(param){

	param.query				= param.query.toLowerCase()	|| null;
	param.data				= param.data				|| [];

	if(!param.query || param.query === ""){

		for(var i=0; i<param.data.length; i++){
			param.data[i].element.dataset.filtered = "true";
		}
	}
	else{

		for(var j=0; j<param.data.length; j++){
			if(param.data[j].name.toLowerCase().indexOf(param.query) == -1){
				param.data[j].element.dataset.filtered = "false";
			}
			else{
				param.data[j].element.dataset.filtered = "true";
			}
		}

	}
};

Nexus.ajax = function(param){

	if(arguments.length == 1 && typeof arguments[0] == "string"){
		var tmp_url = arguments[0];
		param = {};
		param.url = tmp_url;
	}

	param = (typeof param == "object") 	? param : {};

	param.target 	= param.target 		|| undefined;
	param.target 	= (typeof param.target == "string") ? document.querySelector(param.target) : param.target;

	param.url		= param.url 		? param.url+"&ajax=true" : undefined;
	param.source	= param.source 		|| (event ? (event.target || event.srcElement) : param.source) || null;
	param.method	= param.method 		|| "GET";

	//check that all required parameters are present
	if(!param.url){
		console.error("Missing parameters");
		return null;
	}

	param.success 	= param.success || function(result){

		if(param.target){
			param.target.remove_class("ajax_loading");

			//append or replace here
			if(param.append === true){
			  $(param.target).append('<div class="ajax_result">'+result+'</div>');
			}else{
			  $(param.target).html(result);
			}

			return result;
		}
	};

	if(param.target){
		param.target.add_class("ajax_loading");
	}

	$.ajax(param);
};

Nexus.show_in_popup = function(url){

	var modal;

	modal = document.querySelector(".modal") || document.body.appendChild(document.createElement("div"));
	modal.className = "modal";

	var popup = modal.appendChild(document.createElement("div"));
	popup.className = "popup";

	var close = modal.appendChild(document.createElement("button"));
	close.className = "fa fa-close";
	close.addEventListener("click",function(){
			document.body.removeChild(this.parentNode);
	},false);

	Nexus.ajax({
		'url':		url,
		'target':	popup
	});
};

Nexus.observe = function(param){

	param = param || new Object();

	param["function"] = param["function"] || null;

	if(!param["function"]){console.error("No function defined"); return null;}

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

	var observer = new MutationObserver(function(mutations){
		param["function"](mutations);
	});

	observer.observe(document.body,{
			attribute:false,
			childList:true,
			subtree:true
	});
};
