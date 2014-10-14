Nexus.google = Nexus.google || new Object();

Nexus.google.map = function(container){
	
	container.reference = "https://developers.google.com/maps/documentation/javascript/reference";
	container.defaults  = new Object();
	container.defaults.center = new google.maps.LatLng(-33.924868,18.424055); //cape town
	
	container.map 	  			= null;
	container.markers 			= new Array();
	container.info_windows		= new Array();
	container.users_position	= new Object();
	
	container.initialize = function(){
		var mapOptions = {
			zoom: 8,
			center: this.users_position.google_obj || this.defaults.center
		};
		this.map = new google.maps.Map(this, mapOptions);
		this.info_windows.push(new google.maps.InfoWindow());
		if(this.dataset.track == "true")this.track();
	};
	
	container.get_users_location = function(callback){
		
		navigator.geolocation.getCurrentPosition(function(position){
			container.users_position			= container.users_position || new Object();
			container.users_position.latitude	= position.coords.latitude;
			container.users_position.longitude	= position.coords.longitude;
			container.users_position.google_obj = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			if(callback)callback();
		});
	};
	
	container.add_users_location_marker = function(){
		console.debug
		this.get_users_location(function(){
			var marker_settings = new Object();
			marker_settings.position = container.users_position.google_obj;
			marker_settings.title 	 = "You are here"; 
			marker_settings.pan_to	 = true;
			marker_settings.icon 	= {
				url:"http://blog.timesunion.com/hottopics/files/2011/11/pegman-front-big.png",
				scaledSize: new google.maps.Size(35,70)
			};
			marker_settings.show_info = true;
			
			var marker = container.add_marker(marker_settings);
			container.map.panTo(marker.getPosition());
		});
	};
	
	container.show_info_window = function(param){
		param = (typeof param == "object") ? param : new Object();
		
		if(!param.marker){console.warn("No marker specified..."); return null;}
		
		this.info_windows[0].setContent(param.marker.title || "Nothing to show...");
		this.info_windows[0].open(param.marker.map,param.marker);
		
	};
	
	container.add_marker = function(marker_settings){
		
		marker_settings 			= (typeof marker_settings == "object") ? marker_settings : new Object();
		marker_settings.map			= this.map;
		marker_settings.title		= marker_settings.title || "No title...";
		marker_settings.animation	= marker_settings.animation || google.maps.Animation.DROP;
		
		if(!marker_settings.position){
			console.warn("No position found...");
			return null;
		}
		
		var marker = new google.maps.Marker(marker_settings);
		this.markers.push(marker);
		
		google.maps.event.addListener(marker,'click', function(){
			container.show_info_window({marker:marker});
		});
		
		if(marker_settings.pan_to == true){this.map.panTo(marker.getPosition());}
		return marker;
	};
	
	container.track = function(){
		container.track_interval = setInterval(function(){
			container.add_users_location_marker();
		},1000);
	};
	
	container.remove_all_markers = function(){
		console.debug(container);
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
}

var candidates = document.querySelectorAll(".nexus.google_maps");
for(var i=0; i<candidates.length; i++){
	var candidate = document.querySelectorAll(".nexus.google_maps")[i];
	new Nexus.google.map(candidate);
}

