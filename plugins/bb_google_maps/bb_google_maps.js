/* TODO
if the marker is enabled shift the map down slightly, take into account the zoom
if no map latitude and longitude are set, use the users current position
store map settings in the map_options object and not separate variables
loading icon when getting directions
fix the refresh icon
*/


document.addEventListener("DOMContentLoaded", function(){initialize_google_maps();},false);

	function initialize_google_maps(map_container){
		
		//setup before any maps can get created start
			//add link to the nexus_google_maps.css if it doesnt exist
			/*
			<link rel=stylesheet href=bb_google_maps.css>
			<link rel="stylesheet" href="../chosen/chosen.css">
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js" type="text/javascript"></script>
			<script src="../chosen/chosen.jquery.js" type="text/javascript"></script>
			*/
			var default_stylesheet_linked = false;
			var chosen_stylesheet_linked	= false;
			var chosen_script_linked		= false;
			var chosen_jquery_linked		= false;
			var google_maps_script_linked	= false;
			var google_jquery_linked		= false;
			
			var link_tags = document.querySelectorAll("link[rel=stylesheet]");
			for(var i=0; i<link_tags.length; i++){
				
				if(link_tags[i].href.indexOf("bb_google_maps.css") > -1){default_stylesheet_linked = true;}
				if(link_tags[i].href.indexOf("chosen.css") > -1 || link_tags[i].href.indexOf("chosen.min.css") > -1){chosen_stylesheet_linked  = true;}
				if(default_stylesheet_linked && chosen_stylesheet_linked){break;}
			}
			
			var script_tags = document.querySelectorAll("script[src]");
			for(var i=0; i<script_tags.length; i++){
				if(script_tags[i].src.indexOf("chosen.jquery.js") > -1 || script_tags[i].src.indexOf("chosen.jquery.min.js")>-1){chosen_jquery_linked = true;}
				if(script_tags[i].src.indexOf("https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js") > -1 || script_tags[i].src.indexOf("https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js")>-1){google_jquery_linked = true;}
				if(chosen_jquery_linked && google_maps_script_linked && google_jquery_linked){break;}
			}
			
			if(!default_stylesheet_linked){
				var default_stylesheet = document.createElement("link");
				default_stylesheet.rel = "stylesheet";
				default_stylesheet.href = "bb_google_maps.css";
				document.head.insertBefore(default_stylesheet,document.head.childNodes[0]);
			}
			
			if(!chosen_stylesheet_linked){
				var default_stylesheet = document.createElement("link");
				default_stylesheet.rel = "stylesheet";
				default_stylesheet.href = "http://harvesthq.github.io/chosen/chosen.min.css";
				document.head.insertBefore(default_stylesheet,document.head.childNodes[0]);
			}
			
			if(!google_jquery_linked){
				var google_jquery = document.createElement("script");
				google_jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js";
				google_jquery.type = "text/javascript";
				document.head.insertBefore(google_jquery,document.head.childNodes[0]);
			}
			
			if(!chosen_jquery_linked){
				var chosen_jquery = document.createElement("script");
				chosen_jquery.src = "http://harvesthq.github.io/chosen/chosen.jquery.min.js";
				chosen_jquery.type = "text/javascript";
				document.head.insertBefore(chosen_jquery,document.head.childNodes[0]);
			}
		//setup before any maps can get created end
		
		var default_zoom = 3;
		
		var map_containers;
		if(map_container){
			map_containers = (map_container.className == 'google-map') ? new Array(map_container): map_container.getElementsByClassName('google-map');	
		}
		else{
			map_containers = document.getElementsByClassName('google-map');
		}
		for(var i=0; i<map_containers.length; i++){
			
			var map 				= new google.maps.Map(map_containers[i]);
			var map_lat 		= map_containers[i].dataset.latitude ? parseFloat(map_containers[i].dataset.latitude) : null;
			var map_long 		= map_containers[i].dataset.longitude ? parseFloat(map_containers[i].dataset.longitude) : null;
			map.info_window 	= new google.maps.InfoWindow();
			
			navigator.geolocation.getCurrentPosition(function(position){
				console.log(position);
				map.user_position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				if(!map_lat && !map_long){
					
					map.panTo(map.user_position);
					var image = {
						url: "http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png",
						size: null,
						origin: null,
						anchor: null,
						scaledSize: new google.maps.Size(50, 50)
					};
					map.user_position_marker = new google.maps.Marker({
						icon:image,
						map: map,
						position: map.user_position,
						content:"Location Data",
						title: "Your Location"
					});
					
					google.maps.event.addListener(map.user_position_marker, 'click', function() {
						map.info_window.setContent(map.user_position_marker.content);
						map.info_window.open(map,map.user_position_marker);
						map.info_window.last_marker = map.user_position_marker;
					});
					console.log(map.user_position);
				}
			});
			
			var map_zoom = map_containers[i].dataset.zoom ? parseInt(map_containers[i].dataset.zoom) : default_zoom;
			var map_showmarkers = map_containers[i].dataset.showmarkers === 'false' ? false : true;
			
			var lat_long = new google.maps.LatLng(map_lat, map_long);
			var map_options ={
				zoom: map_zoom,
				center: lat_long,
				show_markers: map_containers[i].dataset.showmarkers
			};
			
			var map_bounds = new google.maps.LatLngBounds();
			map.setOptions(map_options);
			map_containers[i].id = map_containers[i].id || "google-map-"+Math.random();
			map.id = map_containers[i].id;

			map.directions_display = new google.maps.DirectionsRenderer();
			map.directions_service = new google.maps.DirectionsService();
			
			geocoder = new google.maps.Geocoder();
			if(window[map_containers[i].dataset.markers] instanceof Array){
				
				
				var marker_filter_panel_aligner = map_containers[i].appendChild(document.createElement("div"));
				marker_filter_panel_aligner.className = "google-map-marker-filter-panel-aligner";
				marker_filter_panel = marker_filter_panel_aligner.appendChild(document.createElement("div"));
				marker_filter_panel.className = "google-map-marker-filter-panel";
				marker_filter = marker_filter_panel.appendChild(document.createElement("select"));
				marker_filter.dataset.placeholder = "Choose a Marker...";
				marker_filter.dataset.mapId = map.id;
				marker_filter.style.width = "200px";
				marker_filter.className = "chosen-select";
				marker_filter.appendChild(document.createElement("option"));
				
				for(var j=0; j<window[map_containers[i].dataset.markers].length; j++)
				{
					var marker_filter_option = marker_filter.appendChild(document.createElement("option"));
					marker_filter_option.value = j;
					marker_filter_option.innerText = window[map_containers[i].dataset.markers][j].name || window[map_containers[i].dataset.markers][j].title;
					
					(function(marker_data){
						var directions_toolbar = '<label class=directions-toolbar data-icon=navigator>get directions<input type=button style=display:none;></label>';
						var divvedContent = '<div class="google-maps-infowindow"><div class=google-maps-infowindow-content>' + (marker_data.content || "") + "</div>" + directions_toolbar +'</div>';
						if (marker_data.icon) {
							var image = {
								url: marker_data.icon,
								size: null,
								origin: null,
								anchor: null,
								scaledSize: new google.maps.Size(50, 50)
							};
						}
						
						//use the latitude and longitude values by default
						if(marker_data.latitude && marker_data.longitude){
							var latitude = marker_data.latitude;
							var longitude = marker_data.longitude;
							var latLong = new google.maps.LatLng(latitude, longitude);
							map_bounds.extend(latLong);
							map.fitBounds(map_bounds);
							
							
							var marker = new google.maps.Marker({
									map: map,
									position: latLong,
									title: marker_data.title || marker_data.title,
									content: divvedContent,
									icon: image || null,
									visible: map_showmarkers
									
							});
							marker_data.marker = marker;
		
							google.maps.event.addListener(marker, 'click', function() {
								map.info_window.setContent(marker.content);
								map.info_window.open(map,marker);
								map.info_window.last_marker = marker;
							});
							
							
						}
						//if no latitude and longitude stated, use the address field
						else{
							geocoder.geocode({'address':marker_data.address}, function(results){
								map_bounds.extend(results[0].geometry.location);
								map.fitBounds(map_bounds);
								var marker = new google.maps.Marker({
										map: map,
										position: results[0].geometry.location,
										title: marker_data.name || marker_data.title,
										content: divvedContent,
										icon: image || null,
										visible: map_showmarkers
								});
								marker_data.marker = marker;
		
								google.maps.event.addListener(marker, 'click', function() {
									map.info_window.setContent(marker.content);//set the content
									map.info_window.open(map,marker);
									map.info_window.last_marker = marker;
								});
							});				
						}
					})(window[map_containers[i].dataset.markers][j]);
				}
			}
			
			var directions_gui = map_containers[i].appendChild(document.createElement("div"));
			directions_gui.className = "google-map-directions-gui";
			directions_gui.innerHTML = "<div class=google-map-directions-gui-aligner><span>From:</span><input type=text><span>To:</span><input type=text disabled><input type=button value='Get Directions'></div>";
			
			var directions_steps_panel = map_containers[i].appendChild(document.createElement("div"));
			directions_steps_panel.className = "google-map-directions-panel";
			var directions_steps_panel_close = directions_steps_panel.appendChild(document.createElement("span"));
			directions_steps_panel_close.dataset.icon = "close";
			directions_steps_panel_close.addEventListener("click",function(){clear_google_map_directions(map);},false);			
			
			//ref: http://stackoverflow.com/questions/6378007/adding-event-to-element-inside-google-maps-api-infowindow
			google.maps.event.addListener(map.info_window,'domready',function(){
				document.querySelector(".google-maps-infowindow .directions-toolbar input[type=button]").addEventListener("click",function(){
					get_google_map_directions(map.info_window.anchor.getPosition(), null, map.info_window.getMap());
				},false);
			});
			
			var config = {'.google-map .chosen-select': {"allow_single_deselect":true, "width":"100%"},}
			for (var selector in config){
				$(selector).chosen(config[selector]);
				$(selector).chosen().change(function(e){
					
					var markers = window[document.getElementById(e.target.dataset.mapId).dataset.markers];
					if(e.target.selectedIndex != 0){
						for(var i in markers){
						
							if(i != (e.target.selectedIndex-1)){
								markers[i].marker ? markers[i].marker.setVisible(false) : null;
							}
							else{
								markers[i].marker ? markers[i].marker.setVisible(true) : null;
							}
						}
					}
					else{
						for(var i in markers){
								markers[i].marker ? markers[i].marker.setVisible(true) : null;
						}
					}
					
				});
			}
		}			
	}
	
	function clear_google_map_directions(map){
		document.getElementById(map.id).getElementsByClassName("google-map-directions-panel")[0].dataset.show=false;
		map.info_window.open(map, map.info_window.last_marker);
		map.directions_display.setMap(null);
	}
	
	function get_google_map_directions(end,start,map){
		document.getElementById(map.id).getElementsByClassName("google-map-directions-panel")[0].dataset.show=true;
		map.info_window.close();
		
		var origin = start || map.user_position || map.getCenter();
		
		var request = {
			origin:origin,
			destination:end,
			travelMode: google.maps.TravelMode.DRIVING
		};

		
		map.directions_service.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK){
					map.directions_display.setMap(map);
					map.directions_display.setPanel(document.getElementById(map.id).getElementsByClassName("google-map-directions-panel")[0]);
					map.directions_display.setDirections(response);
				}
				else{
					console.log(status);
				}
		});
	} 
