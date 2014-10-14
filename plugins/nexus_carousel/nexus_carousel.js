Nexus.carousel = function(param){
	var carousel; var settings;
	
	//lets assume that only the container is passed through
	if(param instanceof HTMLElement){
		carousel = param;
	}
	/*else if(typeof param == "object"){
		carousel = param.container;
	}*/
	
	carousel.navigation = new Object();
	var slides = carousel.querySelectorAll(".slide");

	var excess = carousel.querySelectorAll(":not(.slide)");
	console.debug(excess);
	for(var j=0; j<excess.length; j++){
		excess[j].parentNode.removeChild(excess[j]);
	}
	
	var slider = carousel.appendChild(document.createElement("div"));
	slider.className = "slider";
	for(var i=0; i<slides.length; i++){
		slider.appendChild(slides[i]);
	}
	
	var navigation_left			= carousel.appendChild(document.createElement("button"));
	navigation_left.className	= "navigation fa fa-angle-left";
		
	var navigation_right		= carousel.appendChild(document.createElement("button"));
	navigation_right.className	= "navigation fa fa-angle-right";
	
	var slide_width = parseInt(getComputedStyle(carousel.querySelector(".slide")).width);
	
	carousel.dataset.scope = (carousel.dataset.orientation == "vertical") ? 1 : carousel.dataset.scope;
	
	if(carousel.dataset.scope && !isNaN(parseInt(carousel.dataset.scope))){
		
		var carousel_width	= (slide_width * parseInt(carousel.dataset.scope));
		carousel_width		+= parseInt(window.getComputedStyle(navigation_left).width);
		carousel_width 		+= parseInt(window.getComputedStyle(navigation_right).width);
		carousel.style.width = carousel_width;
	}	
	
	var max_margin_left = 0 - (parseFloat(slides.length * slide_width) - parseFloat(window.getComputedStyle(slider).width));
	
	
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
	
	document.addEventListener("mouseup",function(){
		if(carousel.navigation.interval){
			window.clearInterval(carousel.navigation.interval);
			carousel.navigation.interval = null;
		}
	},false);
	
	carousel.dataset.ready = "true";
};

var candidates = document.querySelectorAll(".nexus.carousel");
for(var i=0; i<candidates.length; i++){
	new Nexus.carousel(candidates[i]);
}
