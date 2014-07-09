document.addEventListener("DOMContentLoaded",function(){
		
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		
	var catch_broken_images_observer = new MutationObserver(function(mutations){  
		fix_broken_images();
	});
	
	catch_broken_images_observer.observe(document.body,{
		attributes: false, 
		childList: true,
		subtree:true
	});
	
	fix_broken_images();
	
},false);

function fix_broken_images(){
	
	for(var i=0; i<document.images.length; i++){
		document.images[i].onerror = function(){
			this.dataset.initial_src = this.src;
			this.removeAttribute("src");
		};
	}
	
}
