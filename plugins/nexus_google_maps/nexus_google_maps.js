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
		
		container.map				= new google.maps.Map(container,container.options);
		container.map.get_container = function(){return container;};
		
		container.map.setCenter(container.options["center"]);
		
		container.map.bounds 		= new google.maps.LatLngBounds();
		
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
		
		container.options["tracking_completed"]	= (window[container.options["tracking_completed"]] instanceof Function) ? window[container.options["tracking_completed"]] : container.options["tracking_completed"];
		container.options["tracking_completed"]	= (container.options["tracking_completed"] instanceof Function) ? container.options["tracking_completed"] : container.options["tracking_completed"];
		container.options["tracking_completed"]	= container.options["tracking_completed"] || function(){};
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
	};t
	
	container.add_users_position_marker = function(google_position_obj){
		
		google_position_obj = google_position_obj || container.users_position.google_obj;
		
		if(!container.users_position.marker){
			var marker_settings = new Object();
			marker_settings.position = google_position_obj;
			marker_settings.title 	 = "You are here";
			marker_settings.icon 	 = {
				url:"data:image/png;base64,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"
			};
			marker_settings.zIndex	= 100;
			
			marker_settings.content = function(){
				
				var content = "<div class=title>"+this.title+"</div>";
				var destination_data = new Array();
				
				for(var i=0; i<container.markers.length; i++){
					if(container.markers[i].destination == true){
						destination 			= new Object();
						destination.title 		= container.markers[i].title;
						destination.distance	= Nexus.coord_diff({latitude:container.users_position.latitude,longitude:container.users_position.longitude},{latitude:container.markers[i].position.lat(),longitude:container.markers[i].position.lng()});
						if(destination.distance < 1){
							destination.distance = (destination.distance * 1000).toFixed(2) + "m";	
						}
						else{
							destination.distance = destination.distance.toFixed(2) + "km";
						}
						
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
								content += destination_data[i].distance;
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
		container.info_windows[0].setContent(content || "Nothing to show...");
		
		container.info_windows[0].open(marker.map,marker);
		
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
			
			container.options["tracking_completed"](container);
			
			container.options["tracking_completed"] = function(){}; //disables tracking_completed function from running over and over
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


console.info("FEATURE: make default center is users location");
console.info("ISSUE: remove all consoles");
console.info("FEATURE: allow for onclick functions on the google marker map");
console.info("ISSUE: rename marker_settings to marker_options");
console.info("DISCUSSION: watch position must be bound to the window and not elements");
console.info("ISSUE: should i bind the functions to the container or the map?");
console.info("ISSUE: when tracking the markers, if km is <1 show in meters");
console.info("FEAUTURE: support for both imperial and metric units");
console.info("ISSUE: if the user does not want to be tracked, then what?");
console.info("FEATURE: allow the user to specify what to track");
console.info("ISSUE: promises, implement to allow the user to specify functions to run once another is finished");
console.info("ISSUE: in tracking, when the position is not fetched, what to do?");
console.info("ISSUE: rename settings to options everywhere");
console.info("FEATURE: when the user approaches the marker(s), fit the bounds of the map again");
console.info("FEATURE: dotted line(s) to the destinations on the user");

/*
extract from one.om: fix for the watch position
window.geolocation = window.geolocation || new Object();

if(!window.geolocation.position){
	console.debug("no position");
	window.geolocation.watch_id = navigator.geolocation.watchPosition(function(position){
		window.geolocation.position = position;
		GoogleMap.set_users_position(container,window.geolocation.position);
	});
}else{
	console.debug("position already being watched");
	GoogleMap.set_users_position(container,window.geolocation.position);	
}
*/

//references

//api documentatipn
//https://developers.google.com/maps/documentation/javascript/reference",

//dynamically adjusting the map when a new marker is added
//http://salman-w.blogspot.com/2011/03/zoom-to-fit-all-markers-on-google-map.html",

//used in the callback
//http://stackoverflow.com/a/7262773/1654250"

//open up chromes locations settings per site:
//chrome://settings/contentExceptions#location

