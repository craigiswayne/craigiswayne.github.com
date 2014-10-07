Nexus.gallery = Nexus.gallery || new Object();

Nexus.gallery.install = function(){
	
	if(Nexus.gallery.element){return null;}
	
	Nexus.gallery.element = document.body.appendChild(document.createElement("div"));
	Nexus.gallery.element.className = "nexus gallery";
	
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
	
	var tray = Nexus.gallery.element.appendChild(document.createElement("div"));
	tray.className = "tray";
	
	var footer = Nexus.gallery.element.appendChild(document.createElement("footer"));
	
	var toggle_slideshow = footer.appendChild(document.createElement("button"));
	toggle_slideshow.className = "toggle_slideshow fa fa-play";
	toggle_slideshow.addEventListener("click",function(){Nexus.gallery.toggle_show();},false);
	
	var radio_nav = footer.appendChild(document.createElement("div"));
	radio_nav.className = "radio_nav";
	
	var toggle_tray = footer.appendChild(document.createElement("button"));
	toggle_tray.className = "toggle_tray fa fa-caret-down";
	
	toggle_tray.addEventListener("click",function(){
		Nexus.gallery.toggle_tray();
	},false);
	
};

Nexus.gallery.close = function(){
};

Nexus.gallery.previous_slide = function(){
};

Nexus.gallery.next_slide = function(){
};

Nexus.gallery.toggle_show = function(){
};

Nexus.gallery.toggle_tray = function(){
};

Nexus.gallery.show = function(data){
	//currently only supports node list
};

Nexus.gallery.install();
