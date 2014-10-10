Nexus.gallery = new Object();

Nexus.gallery.install = function(){
	
	Nexus.gallery.element = document.body.appendChild(document.createElement("div"));
	Nexus.gallery.element.className = "nexus gallery";
	
	Nexus.gallery.element.addEventListener("keydown",function(){
					
		var key_code = event.keyCode;
		switch(key_code){
			
			case 27:
				Nexus.gallery.close();
			break;
			
			case 37:
				Nexus.gallery.previous_slide();
			break;
			
			case 39:
				Nexus.gallery.next_slide();
			break;
			
			case 40:
				Nexus.gallery.hide_carousel();
			break;
			
			case 38:
				Nexus.gallery.show_carousel();
			break;
		}
	},false);
	
	var header = Nexus.gallery.element.appendChild(document.createElement("header"));
			
	var media_title = header.appendChild(document.createElement("label"));
	media_title.className = "nexus animation slide_in_from_left";
	
	var close_button = header.appendChild(document.createElement("button"));
	close_button.className = "fa fa-close close";
	close_button.addEventListener("click",function(){
			Nexus.gallery.close();
	},false);
	
	var nav_left = Nexus.gallery.element.appendChild(document.createElement("button"));
	nav_left.className = "nav fa fa-angle-left";
	nav_left.addEventListener("click",function(){
			Nexus.gallery.previous_slide();
	},false);
	
	nav_left.addEventListener("mousedown",function(){
			Nexus.gallery.interval = setInterval(function(){	
				Nexus.gallery.previous_slide();
			},300);
	},false);
	
	var stage = Nexus.gallery.element.appendChild(document.createElement("div"));
	stage.className = "stage";
	
	
	var nav_right = Nexus.gallery.element.appendChild(document.createElement("button"));
	nav_right.className = "nav fa fa-angle-right";
	nav_right.addEventListener("click",function(){
			Nexus.gallery.next_slide();
	},false);
	
	nav_right.addEventListener("mousedown",function(){
			Nexus.gallery.interval = setInterval(function(){
				Nexus.gallery.next_slide();
			},300);
	},false);
	
	Nexus.gallery.element.addEventListener("mouseup",function(){
			clearInterval(Nexus.gallery.interval);
	},false);
	
	var carousel = Nexus.gallery.element.appendChild(document.createElement("div"));
	carousel.className = "nexus carousel";
	
	var footer = Nexus.gallery.element.appendChild(document.createElement("footer"));
	
	var toggle_slideshow = footer.appendChild(document.createElement("button"));
	toggle_slideshow.className = "toggle_slideshow fa fa-play";
	toggle_slideshow.addEventListener("click",function(){Nexus.gallery.toggle_show();},false);
	
	var radio_nav = footer.appendChild(document.createElement("div"));
	radio_nav.className = "radio_nav";
	
	var toggle_carousel = footer.appendChild(document.createElement("button"));
	toggle_carousel.className = "toggle_carousel fa fa-caret-down";
	
	toggle_carousel.addEventListener("click",function(){
		Nexus.gallery.toggle_carousel();
	},false);
	
};

Nexus.gallery.close = function(){
	Nexus.gallery.element.dataset.active = "false";
	Nexus.exit_fullscreen();
};

Nexus.gallery.previous_slide = function(){
};

Nexus.gallery.next_slide = function(){
};

Nexus.gallery.toggle_show = function(){
};

Nexus.gallery.toggle_carousel = function(){
	
	if(Nexus.gallery.element.querySelector(".carousel").dataset.active == "true"){
		Nexus.gallery.hide_carousel();
	}else{
		Nexus.gallery.show_carousel();
	}
};

Nexus.gallery.show = function(data){
	
	//in the case of a mosaic
	//add the images to the carousel... 
	
	Nexus.gallery.element.dataset.active = "true";
	Nexus.go_fullscreen(Nexus.gallery.element);
};

Nexus.gallery.install();

//document.addEventListener("DOMContentLoaded",function(){
	var mosaic_tiles = document.querySelectorAll(".nexus.mosaic>.tile");
	for(var i=0; i<mosaic_tiles.length; i++){
		
		mosaic_tiles[i].addEventListener("click",function(){
				Nexus.gallery.show(this.parentNode);
		},false);
	}
//},false);
