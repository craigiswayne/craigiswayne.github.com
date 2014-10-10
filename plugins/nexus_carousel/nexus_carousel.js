Nexus.carousel = new Object();

Nexus.carousel.recruit = function(){
	var carousels = document.querySelectorAll(".nexus.carousel");
	
	console.debug("length of carousels array: " + carousels.length);
	
	for(var j=0; j<carousels.length; j++){
		var element				= carousels[j];		
		var carousel 			= element.cloneNode(true);
		carousel.navigation		= new Object();
		carousel.innerHTML 		= "";
		
		var slider 				= carousel.appendChild(document.createElement("div"));
		slider.className		= "slider";
		var slides 				= element.querySelectorAll(".slide");
		for(var i=0; i<slides.length; i++){
			slider.appendChild(slides[i]);
		}
		
		var navigation_left			= carousel.appendChild(document.createElement("button"));
		navigation_left.className	= "navigation fa fa-angle-left";
		
		var navigation_right		= carousel.appendChild(document.createElement("button"));
		navigation_right.className	= "navigation fa fa-angle-right";
	
		element.parentNode.replaceChild(carousel,element);
		
		var slide_width = parseInt(getComputedStyle(carousel.querySelector(".slide")).width);
		
		var max_margin_left = 0 - (parseFloat(slides.length * slide_width) - parseFloat(window.getComputedStyle(slider).width));		
		
		document.addEventListener("mouseup",function(){
			if(carousel.navigation.interval){
				window.clearInterval(carousel.navigation.interval);
				carousel.navigation.interval = null;
			}
		},false);
		
		navigation_right.addEventListener("mousedown",function(){
			carousel.navigation.interval = setInterval(function(){
				var initial_val = parseInt(window.getComputedStyle(slider).marginLeft);
				var new_val		= initial_val - slide_width;
				new_val = new_val < max_margin_left ? max_margin_left : new_val;
				slider.style.marginLeft = new_val+"px";
			},300);
		},false);
		
		navigation_right.addEventListener("click",function(){
			var initial_val = parseInt(window.getComputedStyle(slider).marginLeft);
			var new_val		= initial_val - slide_width;
			new_val = new_val < max_margin_left ? max_margin_left : new_val;
			slider.style.marginLeft = new_val+"px";
		},false);
		
		navigation_left.addEventListener("mousedown",function(){
			carousel.navigation.interval = setInterval(function(){
				var initial_val = parseInt(window.getComputedStyle(slider).marginLeft);
				var new_val		= initial_val + slide_width;
				new_val = new_val > 0 ? 0 : new_val;
				slider.style.marginLeft = new_val+"px";
			},300);
		},false);
		
		navigation_left.addEventListener("click",function(){
			var initial_val = parseInt(window.getComputedStyle(slider).marginLeft);
			var new_val		= initial_val + slide_width;
			new_val = new_val > 0 ? 0 : new_val;
			slider.style.marginLeft = new_val+"px";
		},false);
	}
};

Nexus.carousel.recruit();
