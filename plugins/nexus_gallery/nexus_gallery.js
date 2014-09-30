var NexusGallery = new Object({

	"instances"	: new Array(),
	
	"slideshow" : new Object({
	
		"element": null,
		
		"state"  : "stopped",
		
		"construct" : function(){
		
			NexusGallery.slideshow.element = document.body.appendChild(document.createElement("div"));
			NexusGallery.slideshow.element.className = "nexus slideshow";
			NexusGallery.slideshow.element.tabIndex = 1;
			
			NexusGallery.slideshow.element.addEventListener("keydown",function(){
				
				var key_code = event.keyCode;
				switch(key_code){
					
					case 27:
						NexusGallery.slideshow.close();
					break;
					
					case 37:
						NexusGallery.slideshow.previous_slide();
					break;
					
					case 39:
						NexusGallery.slideshow.next_slide();
					break;
					
					case 40:
						NexusGallery.slideshow.hide_tray();
					break;
					
					case 38:
						NexusGallery.slideshow.show_tray();
					break;
				}
			},false);
			
			
			var header = this.element.appendChild(document.createElement("header"));
			
			var media_title = header.appendChild(document.createElement("label"));
			media_title.className = "nexus animation slide_in_from_left";
			
			var close_button = header.appendChild(document.createElement("button"));
			close_button.className = "fa fa-close close";
			close_button.addEventListener("click",function(){
					NexusGallery.slideshow.close();
			},false);
			
			var nav_left = this.element.appendChild(document.createElement("button"));
			nav_left.className = "nav fa fa-angle-left";
			nav_left.addEventListener("click",function(){
					NexusGallery.slideshow.previous_slide();
			},false);
			
			nav_left.addEventListener("mousedown",function(){
					NexusGallery.slideshow.interval = setInterval(function(){	
						NexusGallery.slideshow.previous_slide();
					},300);
			},false);
			
			this.stage = this.element.appendChild(document.createElement("div"));
			this.stage.className = "stage";
			
			
			var nav_right = this.element.appendChild(document.createElement("button"));
			nav_right.className = "nav fa fa-angle-right";
			nav_right.addEventListener("click",function(){
					NexusGallery.slideshow.next_slide();
			},false);
			
			nav_right.addEventListener("mousedown",function(){
					NexusGallery.slideshow.interval = setInterval(function(){
						NexusGallery.slideshow.next_slide();
					},300);
			},false);
			
			NexusGallery.slideshow.element.addEventListener("mouseup",function(){
					clearInterval(NexusGallery.slideshow.interval);
			},false);
			
			this.tray = this.element.appendChild(document.createElement("div"));
			this.tray.className = "tray";
			
			var footer = this.element.appendChild(document.createElement("footer"));
			
			var toggle_slideshow = footer.appendChild(document.createElement("button"));
			toggle_slideshow.className = "toggle_slideshow fa fa-play";
			toggle_slideshow.addEventListener("click",function(){NexusGallery.slideshow.toggle_show();},false);
			
			this.radio_nav = footer.appendChild(document.createElement("div"));
			this.radio_nav.className = "radio_nav";
			
			var toggle_tray = footer.appendChild(document.createElement("button"));
			toggle_tray.className = "toggle_tray fa fa-caret-down";
			
			toggle_tray.addEventListener("click",function(){
				NexusGallery.slideshow.toggle_tray();
			},false);
			
		},
		
		"show"   : function(param){
			if(!NexusGallery.slideshow.element) NexusGallery.slideshow.construct();
			
			param = (typeof param == "object") ? param : new Object();
			
			param["slide_num"]	= parseInt(param["slide_num"]) || 0;
			
			if(param["instance"]){
				NexusGallery.slideshow.tray.innerHTML = "";
				NexusGallery.slideshow.media = param.instance.media;
				NexusGallery.slideshow.tray.appendChild(param.instance.querySelector(".slider").cloneNode(true));
				
				var tray_slides = NexusGallery.slideshow.tray.querySelectorAll(".slide");
				for(var i=0; i<tray_slides.length; i++){	
					tray_slides[i].index = i;
					tray_slides[i].addEventListener("click",function(){
							NexusGallery.slideshow.show({"slide_num":this.index});
					},false);
				}
				
				NexusGallery.slideshow.radio_nav.innerHTML = "";
				for(var i=0; i<NexusGallery.slideshow.media.length; i++){
					
					var radio_option = NexusGallery.slideshow.radio_nav.appendChild(document.createElement("input"));
					radio_option.type = "radio";
					radio_option.name = "nexus_slideshow";
					radio_option.value = i;
					radio_option.addEventListener("change",function(){
						NexusGallery.slideshow.show({"slide_num":this.value});
					},false);
				}
			}
			
			NexusGallery.slideshow.element.dataset.active = "true";
			NexusGallery.slideshow.show_slide(param["slide_num"]);
			NexusGallery.slideshow.element.focus();
		},
		
		"show_slide" : function(slide_num){

			NexusGallery.slideshow.slide_num = slide_num || 0;
			NexusGallery.slideshow.slide_num = parseInt(NexusGallery.slideshow.slide_num);
			
			NexusGallery.slideshow.slide_num = NexusGallery.slideshow.slide_num < 0 ? NexusGallery.slideshow.media.length-1 : NexusGallery.slideshow.slide_num;
			NexusGallery.slideshow.slide_num = NexusGallery.slideshow.slide_num > NexusGallery.slideshow.media.length-1 ? 0 : NexusGallery.slideshow.slide_num;
			
			NexusGallery.slideshow.stage.innerHTML = "";
			NexusGallery.slideshow.stage.appendChild(NexusGallery.slideshow.media[NexusGallery.slideshow.slide_num].element.cloneNode(false));
			var thumbs = NexusGallery.slideshow.tray.querySelectorAll(".slide");
			
			for(var i=0; i<thumbs.length; i++){
				thumbs[i].dataset.active = (i==NexusGallery.slideshow.slide_num) ? "true" : "false";
			}
			
			NexusGallery.slideshow.radio_nav.querySelector("input[type=radio]:nth-of-type("+(NexusGallery.slideshow.slide_num+1)+")").checked = "checked";
			NexusGallery.slideshow.element.querySelector("header label").innerHTML = NexusGallery.slideshow.media[NexusGallery.slideshow.slide_num].title;
		},
		
		"toggle_show" :function(){
			
			if(NexusGallery.slideshow.show_interval){
				NexusGallery.slideshow.pause();
			}
			else{
				NexusGallery.slideshow.play();
			}
		},
		
		"toggle_tray": function(){
			
			if(NexusGallery.slideshow.tray.dataset.hidden == "true"){
				NexusGallery.slideshow.show_tray();
			}else{
				NexusGallery.slideshow.hide_tray();
			}
			
		},
		
		"show_tray": function(){
			NexusGallery.slideshow.tray.dataset.hidden	= "false";
			NexusGallery.slideshow.element.querySelector(".toggle_tray").className  = "toggle_tray fa ";
			NexusGallery.slideshow.element.querySelector(".toggle_tray").className += "fa-caret-down";			
		},
		
		"hide_tray": function(){
			NexusGallery.slideshow.tray.dataset.hidden	= "true";
			NexusGallery.slideshow.element.querySelector(".toggle_tray").className  = "toggle_tray fa ";
			NexusGallery.slideshow.element.querySelector(".toggle_tray").className += "fa-caret-up";
		},
		
		"next_slide" : function(){
			NexusGallery.slideshow.show({"slide_num":this.slide_num+1});
		},
		
		"previous_slide" : function(){
			NexusGallery.slideshow.show({"slide_num":this.slide_num-1});
		},
		
		"play":function(){
			NexusGallery.slideshow.element.querySelector(".toggle_slideshow").className = "toggle_slideshow fa fa-pause";
			NexusGallery.slideshow.show_interval = setInterval(function(){
				NexusGallery.slideshow.next_slide();
			},3000);
		},
		
		"pause":function(){
			NexusGallery.slideshow.element.querySelector(".toggle_slideshow").className = "toggle_slideshow fa fa-play";
			clearInterval(NexusGallery.slideshow.show_interval);
			NexusGallery.slideshow.show_interval = null;
		},
		
		"close"		: function(){
			if(NexusGallery.slideshow.element) NexusGallery.slideshow.element.dataset.active = "false";
		}
			
	}),
	
	"recruit"	: function(container){
	
		container = container || document.body;
		
		var candidates = container.querySelectorAll(".nexus.gallery");
		for(var i=0; i<candidates.length; i++){
			NexusGallery.initialize(candidates[i]);
		}
		
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
				NexusGallery.slideshow.show({"instance":element,"slide_num":this.index});
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
		if(element.dataset.auto_show == "true") NexusGallery.slideshow.show({"instance":element});
	}
});

document.addEventListener("DOMContentLoaded",function(){NexusGallery.recruit();},false);
