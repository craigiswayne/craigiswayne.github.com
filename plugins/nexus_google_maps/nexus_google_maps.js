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
	
	container.options 	= new Object();
	container.defaults  = new Object();
	
	container.map 	  			= null;
	container.markers 			= new Array();
	container.info_windows		= new Array();
	container.users_position	= new Object();
	
	container.initialize = function(){
		
		container.get_options();
		
		container.map = new google.maps.Map(container,container.options);
		
		container.map.setCenter(container.options["center"]);
		
		container.map.bounds = new google.maps.LatLngBounds();
		
		container.info_windows.push(new google.maps.InfoWindow());
		
		for(var i=0; i<container.options["markers"].length; i++){
				container.add_marker(container.options["markers"][i]);
		}
		
		if(container.options["track"] == true){
			container.track();
		}
		
		google.maps.event.addListenerOnce(container.map, 'idle', function(){
			container.options["callback"](container);
		});
	};
	
	container.get_options = function(){
		
		if(container.dataset["options"] && (window[container.dataset["options"]] instanceof Object)){
			for(var key in window[container.dataset["options"]]){
				container.options[key] = window[container.dataset["options"]][key];
			}
		}
		
		//dataset options override the options object specified
		for(var key in container.dataset){
			container.options[key] = container.dataset[key];
		}
		
		container.options["zoom"]		= parseInt(container.options["zoom"])		|| 12;
		container.options["minZoom"] 	= parseInt(container.options["minzoom"])	|| 2;
		container.options["maxZoom"]	= parseInt(container.options["maxzoom"])	|| null;
		
		if(container.options["center"]){
			var center = container.options["center"].split(",");
			if(center[0] && center[1]){
				center[0] = parseFloat(center[0]);
				center[1] = parseFloat(center[1]);
				container.options["center"]		= new google.maps.LatLng(center[0],center[1]);
			}
		}
		
		container.options["markers"]	= window[container.options["markers"]] instanceof Array ? window[container.options["markers"]] : container.options["markers"];
		container.options["markers"]	= container.options["markers"] instanceof Array ? container.options["markers"] : container.options["markers"];
		container.options["markers"] 	= container.options["markers"] || new Array();
		
		container.options["center"]		= container.options["center"]				|| new google.maps.LatLng(-33.924868,18.424055); //cape town
		container.options["track"]		= Boolean(container.options["track"]);
		
		container.options["callback"]	= (window[container.options["callback"]] instanceof Function) ? window[container.options["callback"]] : container.options["callback"];
		container.options["callback"]	= (container.options["callback"] instanceof Function) ? container.options["callback"] : container.options["callback"];
		container.options["callback"]	= container.options["callback"] || function(){};
	};
	
	container.get_users_position = function(){
		navigator.geolocation.getCurrentPosition(function(position){container.set_users_position(position)});
	};
	
	container.set_users_position = function(position){
		container.users_position.latitude	= position.coords.latitude;
		container.users_position.longitude	= position.coords.longitude;
		container.users_position.google_obj = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		if(container.options["track"] == true){
			container.add_users_position_marker(container.users_position.google_obj);
			if(container.info_windows[0].getMap()){
				container.show_info_window(container.users_position.marker);
			}
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
				var destination_data = new Array();
				
				for(var i=0; i<container.markers.length; i++){
					if(container.markers[i].destination == true){
						destination 			= new Object();
						destination.title 		= container.markers[i].title;
						destination.distance	= (Nexus.coord_diff({latitude:container.users_position.latitude,longitude:container.users_position.longitude},{latitude:container.markers[i].position.lat(),longitude:container.markers[i].position.lng()})).toFixed(2);
						destination_data.push(destination);
					}
				}
				
				//sort the destinations here
				destination_data.sort(function(a,b){
					return a.distance - b.distance;
				});
				
				if(destination_data.length > 0){
					content += "<table class=destinations>";
					for(var i=0; i<destination_data.length; i++){
						content += "<tr>";
							content += "<td>";
								content += destination_data[i].title;
							content += "</td>";
							content += "<td>";
								content += destination_data[i].distance + "km";
							content += "</td>";
						content += "</tr>";
					}
					content += "</table>";
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
		
		if(!marker){console.error("No marker specified..."); return null;}
		
		var content = (typeof(marker.content) == 'function') ? marker.content(marker) : marker.content;
		content = "<div class=info_window>" + content + "</div>";
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
		
		if(marker_settings.pan_to == true){container.map.panTo(marker.getPosition());}
		
		container.map.fitBounds(container.map.bounds);
		
		google.maps.event.addListener(marker,'click', function(){
			container.show_info_window(marker);
		});
		
		container.markers.push(marker);
			
		return marker;
	};
	
	container.track = function(){
		
		navigator.geolocation.watchPosition(function(position){
			container.set_users_position(position);
		},null,null);
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


console.info("make default center is users location");
console.info("remove all consoles");

//references

//api documentatipn
//https://developers.google.com/maps/documentation/javascript/reference",

//dynamically adjusting the map when a new marker is added
//http://salman-w.blogspot.com/2011/03/zoom-to-fit-all-markers-on-google-map.html",

//used in the callback
//http://stackoverflow.com/a/7262773/1654250"
