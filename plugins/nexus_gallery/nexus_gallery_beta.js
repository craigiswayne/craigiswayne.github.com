var NexusGallery = new Object({

	"instances"	: new Array(),
	
    "show"		: function(param){
			
		if(!NexusGallery.slideshow) this.construct();
    	
		param = (typeof param == "object") ? param : new Object();
		
		param["slide_num"]	= parseInt(param["slide_num"]) || 0;
		
		if(param["instance"]){
			NexusGallery.slideshow.media = param.instance.media;
			NexusGallery.slideshow.tray.appendChild(param.instance.querySelector(".slider").cloneNode(true));
			
			var tray_slides = NexusGallery.slideshow.tray.querySelectorAll(".slide");
			for(var i=0; i<tray_slides.length; i++){	
				tray_slides[i].index = i;
				tray_slides[i].addEventListener("click",function(){
						NexusGallery.show({"slide_num":this.index});
				},false);
			}
			
			NexusGallery.slideshow.radio_nav.innerHTML = "";
			for(var i=0; i<NexusGallery.slideshow.media.length; i++){
				
				var radio_option = NexusGallery.slideshow.radio_nav.appendChild(document.createElement("input"));
				radio_option.type = "radio";
				radio_option.name = "nexus_slideshow";
				radio_option.value = i;
				radio_option.addEventListener("change",function(){
					NexusGallery.show({"slide_num":this.value});
				},false);
			}
		}
		
		NexusGallery.slideshow.dataset.active = "true";
		this.show_slide(param["slide_num"]);
	},
	
	"show_slide" : function(slide_num){
		
		NexusGallery.slideshow.slide_num = slide_num || 0;
		
		NexusGallery.slideshow.slide_num = parseInt(NexusGallery.slideshow.slide_num);
		
		NexusGallery.slideshow.slide_num = NexusGallery.slideshow.slide_num < 0 ? NexusGallery.slideshow.media.length-1 : NexusGallery.slideshow.slide_num;
		NexusGallery.slideshow.slide_num = NexusGallery.slideshow.slide_num > NexusGallery.slideshow.media.length-1 ? 0 : NexusGallery.slideshow.slide_num;
		
		NexusGallery.slideshow.stage.innerHTML = "";
		NexusGallery.slideshow.stage.appendChild(NexusGallery.slideshow.media[NexusGallery.slideshow.slide_num].element);
		var thumbs = NexusGallery.slideshow.tray.querySelectorAll(".slide");
		
		for(var i=0; i<thumbs.length; i++){
			thumbs[i].dataset.active = (i==NexusGallery.slideshow.slide_num) ? "true" : "false";
		}
		
		NexusGallery.slideshow.radio_nav.querySelector("input[type=radio]:nth-of-type("+(NexusGallery.slideshow.slide_num+1)+")").checked = "checked";
		NexusGallery.slideshow.querySelector("header label").innerHTML = NexusGallery.slideshow.media[NexusGallery.slideshow.slide_num].title;
	},

	"next_slide" : function(){
		NexusGallery.show({"slide_num":NexusGallery.slideshow.slide_num+1});
	},
	
	"previous_slide" : function(){
		NexusGallery.show({"slide_num":NexusGallery.slideshow.slide_num-1});
	},
	
	"close"		: function(){
		if(NexusGallery.slideshow) NexusGallery.slideshow.dataset.active = "false";
	},
	
	"recruit"	: function(container){
	
		container = container || document.body;
		
		var candidates = container.querySelectorAll(".nexus.gallery");
		for(var i=0; i<candidates.length; i++){
			NexusGallery.initialize(candidates[i]);
		}
		
	},
	
	"construct" : function(){
		
		
		NexusGallery.slideshow = document.body.appendChild(document.createElement("div"));
		NexusGallery.slideshow.className = "nexus slideshow";
		
		NexusGallery.slideshow.interval_speed = 1;
		
		var header = NexusGallery.slideshow.appendChild(document.createElement("header"));
		
		var media_title = header.appendChild(document.createElement("label"));
		
		var close_button = header.appendChild(document.createElement("button"));
		close_button.className = "fa fa-close close";
		close_button.addEventListener("click",function(){
				NexusGallery.close();
		},false);
		
	
		var nav_left = NexusGallery.slideshow.appendChild(document.createElement("button"));
		nav_left.className = "nav fa fa-angle-left";
		nav_left.addEventListener("click",function(){
				NexusGallery.previous_slide();
		},false);
		
		nav_left.addEventListener("mousedown",function(){
				NexusGallery.slideshow.interval = setInterval(function(){	
					NexusGallery.previous_slide();
					NexusGallery.slideshow.interval_speed++;
				},(300/NexusGallery.slideshow.interval_speed));
		},false);
		
		NexusGallery.slideshow.stage = NexusGallery.slideshow.appendChild(document.createElement("div"));
		NexusGallery.slideshow.stage.className = "stage";
		
		
		var nav_right = NexusGallery.slideshow.appendChild(document.createElement("button"));
		nav_right.className = "nav fa fa-angle-right";
		nav_right.addEventListener("click",function(){
				NexusGallery.next_slide();
		},false);
		
		nav_right.addEventListener("mousedown",function(){
				NexusGallery.slideshow.interval = setInterval(function(){
					NexusGallery.next_slide();
				},300);
		},false);
		
		NexusGallery.slideshow.addEventListener("mouseup",function(){
				window.clearInterval(NexusGallery.slideshow.interval);
		},false);
		
	
		NexusGallery.slideshow.tray = NexusGallery.slideshow.appendChild(document.createElement("div"));
		NexusGallery.slideshow.tray.className = "tray";
		
		var footer = NexusGallery.slideshow.appendChild(document.createElement("footer"));
		
		var toggle_slideshow = footer.appendChild(document.createElement("button"));
		toggle_slideshow.className = "toggle_slideshow fa fa-play";
		
		NexusGallery.slideshow.radio_nav = footer.appendChild(document.createElement("div"));
		NexusGallery.slideshow.radio_nav.className = "radio_nav";
		
		NexusGallery.slideshow.toggle_tray = footer.appendChild(document.createElement("button"));
		NexusGallery.slideshow.toggle_tray.className = "toggle_tray fa fa-caret-down";
		
		var slideshow = NexusGallery.slideshow;
		NexusGallery.slideshow.toggle_tray.addEventListener("click",function(){
			slideshow.tray.dataset.hidden		= (slideshow.tray.dataset.hidden == "true") ? "false" : "true";
			slideshow.toggle_tray.className   = "toggle_tray fa ";
			slideshow.toggle_tray.className  += (slideshow.tray.dataset.hidden == "true") ? "fa-caret-up" : "fa-caret-down";
		},false);
		
	},
	
	"initialize" : function(element){
		
		if(!element) return;
		
		if(element.className.indexOf("nexus")==-1 || element.className.indexOf("gallery")==-1){
			NexusGallery.recruit(element);
			return;
		}
		
		element.media = new Array();
		var element_media = element.querySelectorAll(".slide");
		
		for(var i=0; i<element_media.length; i++){
			var media = new Object();
			media.title		= element_media[i].dataset.title || element_media[i].alt || element_media[i].src || "test";
			media.element	= element_media[i].cloneNode(false);
			media.element.index = i;
			media.element.addEventListener("click",function(){
				NexusGallery.show({"instance":element,"slide_num":this.index});
			},false);
			element.media.push(media);
		}
		
		element.innerHTML = "";
		
		var nav_left		= element.appendChild(document.createElement("button"));
		nav_left.className 	= "nav fa fa-angle-left";
		
		var slider			= element.appendChild(document.createElement("div"));
		slider.className 	= "slider";
		for(var i=0; i<element.media.length; i++){
			slider.appendChild(element.media[i].element);
		}
		
		var nav_right 		= element.appendChild(document.createElement("button"));
		nav_right.className = "nav fa fa-angle-right";
		
		element.dataset.auto_show = element.dataset.auto_show || "false";
		if(element.dataset.auto_show == "true") NexusGallery.show({"instance":element});
	}
	
	
	
});

document.addEventListener("DOMContentLoaded",function(){NexusGallery.recruit();},false);
