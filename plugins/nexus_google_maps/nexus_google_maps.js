Nexus.google 		= Nexus.google || new Object();
Nexus.google.maps 	= Nexus.google.maps || new Object();

Nexus.google.maps.recruit = function(){
	var candidates = document.querySelectorAll(".nexus.google_maps");
	for(var i=0; i<candidates.length; i++){
		var candidate = document.querySelectorAll(".nexus.google_maps")[i];
		new Nexus.google.maps.map(candidate);
	}
};


Nexus.google.maps.map = function(container){
	
	container.references = [
		"https://developers.google.com/maps/documentation/javascript/reference",
		"http://salman-w.blogspot.com/2011/03/zoom-to-fit-all-markers-on-google-map.html"
	];
	
	container.defaults  = new Object();
	container.defaults.center = new google.maps.LatLng(-33.924868,18.424055); //cape town
	
	container.map 	  			= null;
	container.markers 			= new Array();
	container.info_windows		= new Array();
	container.users_position	= new Object();
	
	container.initialize = function(){
		
		container.map = new google.maps.Map(container,{
			zoom: 12,
			minZoom: 2,
			center: container.defaults.center
		});
		
		container.map.bounds = new google.maps.LatLngBounds();
		
		container.info_windows.push(new google.maps.InfoWindow());
						
		if(container.dataset.center){
			var center = container.dataset.center.split(",");
			if(center[0] && center[1]){
				center[0] = parseFloat(center[0]);
				center[1] = parseFloat(center[1]);
				container.map.setCenter(new google.maps.LatLng(center[0],center[1]));
			}
		}
		
		if(window[container.dataset.markers] && (window[container.dataset.markers] instanceof Array)){
			for(var i=0; i<window[container.dataset.markers].length; i++){
				container.add_marker(window[container.dataset.markers][i]);
			}
		}
		
		if(container.dataset.track == "true"){
			container.track();
		}
	};
	
	container.get_users_position = function(){
		navigator.geolocation.getCurrentPosition(function(position){container.set_users_position(position)});
	};
	
	container.set_users_position = function(position){
		container.users_position.latitude	= position.coords.latitude;
		container.users_position.longitude	= position.coords.longitude;
		container.users_position.google_obj = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		if(container.dataset.track == "true"){
			container.add_users_position_marker(container.users_position.google_obj);
			container.users_position.monitor_destinations
		}
	};
	
	container.add_users_position_marker = function(google_position_obj){
		
		google_position_obj = google_position_obj || container.users_position.google_obj;
		
		if(!container.users_position.marker){
			var marker_settings = new Object();
			marker_settings.position = google_position_obj;
			marker_settings.title 	 = "You are here";
			marker_settings.icon 	 = {
				url:"http://blog.timesunion.com/hottopics/files/2011/11/pegman-front-big.png",
				scaledSize: new google.maps.Size(35,70)
			};
			
			marker_settings.content = function(){
				
				var content = "<div class=title>"+this.title+"</div>";
				
				for(var i=0; i<container.markers.length; i++){
					if(container.markers[i].destination == true){
						content += "<p>";
						content += container.markers[i].title + " is a destination ("+ (Nexus.coord_diff({latitude:container.users_position.latitude,longitude:container.users_position.longitude},{latitude:container.markers[i].position.lat(),longitude:container.markers[i].position.lng()})).toFixed(2)+")";
						content += "</p>";
					}
				}
				
				return content;
			};
			
			container.users_position.marker = container.add_marker(marker_settings);
		}
		else{		
			container.users_position.marker.setPosition(google_position_obj);
		}
		
		return container.users_position.marker;
	};
	
	container.show_info_window = function(marker){
		
		if(!marker){console.warn("No marker specified..."); return null;}
		
		var content = (typeof(marker.content) == 'function') ? marker.content(marker) : marker.content;
		
		this.info_windows[0].setContent(content || "Nothing to show...");
		
		this.info_windows[0].open(marker.map,marker);
		
	};
	
	container.add_marker = function(marker_settings){
		
		marker_settings 			= (typeof marker_settings == "object") ? marker_settings : new Object();
		
		if(marker_settings.latitude && marker_settings.longitude){
			marker_settings.position = new google.maps.LatLng(parseFloat(marker_settings.latitude), parseFloat(marker_settings.longitude));
		}
		
		if(!marker_settings.position){return null;}
		
		marker_settings.map			= container.map;
		marker_settings.title		= marker_settings.title || "No title...";
		marker_settings.content  	= marker_settings.content || marker_settings.title;
		marker_settings.animation	= marker_settings.animation || google.maps.Animation.DROP;
		marker_settings.destination = marker_settings.destination || false;
		marker_settings.pan_to	 	= marker_settings.pan_to || true;
		container.map.bounds.extend(marker_settings.position);
		
		var marker = new google.maps.Marker(marker_settings);
		container.markers.push(marker);
		container.map.fitBounds(container.map.bounds);
		
		google.maps.event.addListener(marker,'click', function(){
			container.show_info_window(marker);
		});
		
		if(marker_settings.pan_to == true){container.map.panTo(marker.getPosition());}
		
		return marker;
	};
	
	container.track = function(){
		var some_val = navigator.geolocation.watchPosition(function(position){
			container.set_users_position(position);
			container.monitor_
		},null,null);
		console.debug(some_val);
	};
	
	container.remove_all_markers = function(){
		for(var i=0; i<container.markers.length; i++){
			container.remove_marker(container.markers[i]);
		}
	};
	
	container.remove_marker = function(marker){
		for(var i=0; i<container.markers.length; i++){
			if(container.markers[i] == marker){
				container.markers[i].setMap(null);
				container.markers.splice(i,1);
				break;
			}
		}
	};
	
	container.initialize();	
	return container;
}

google.maps.event.addDomListener(window, 'load', Nexus.google.maps.recruit);


console.debug("make default center is users location");
console.debug("remove all consoles");
