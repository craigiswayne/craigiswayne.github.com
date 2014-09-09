var widget_data = new Object();

document.addEventListener("DOMContentLoaded",initialize_nexus_galleries,false);
var widget_media;

function initialize_nexus_galleries()
{
	var media_widgets =  document.getElementsByClassName("nexus_gallery"); //change this to .nexus.gallery
	
	for(var i=0; i<media_widgets.length; i++)
	{
		widget_data[i] = new Object();
		widget_data[i].theme = media_widgets[i].dataset.theme;
		widget_data[i].widget = media_widgets[i];

		//widget media
		widget_data[i].media = new Object();
		widget_data[i].hasYouTube = false;
		widget_media = media_widgets[i].childNodes;
		for(var j=0; j<widget_media.length; j++){
			var m_length = Object.keys(widget_data[i].media).length;
			switch(widget_media[j].tagName)
			{
				case "IMG":
				widget_data[i].media[m_length] 				= new Object();
				widget_data[i].media[m_length].type			= "image";
				widget_data[i].media[m_length].name			= widget_media[j].title || widget_media[j].alt || widget_media[j].src;
				widget_data[i].media[m_length].url			= widget_media[j].src;
				widget_data[i].media[m_length].thumb_url 	= widget_media[j].dataset.thumb_url || widget_media[j].src;
				break;

				case "IFRAME":
				widget_data[i].hasYouTube = true;
				widget_data[i].media[m_length] 					= new Object();
				widget_data[i].media[m_length].type			= "youtube";
				widget_data[i].media[m_length].name			= widget_media[j].title || widget_media[j].src || "unable to fetch youtube video";
				widget_data[i].media[m_length].url  		= widget_media[j].src;
				var video_id														= widget_media[j].src;
				video_id = video_id.replace("http://www.youtube.com/embed/","");
				video_id = video_id.replace("https://www.youtube.com/watch?v=","");
				video_id = video_id.replace("http://youtu.be/","");
				widget_data[i].media[m_length].video_id	= video_id;
				widget_data[i].media[m_length].thumb_url = "http://img.youtube.com/vi/"+video_id+"/0.jpg";
				break;

				default:
				//console.log("no match, tag name: " + widget_media[j].tagName);
			}
		}
		
		//add the youtube api script IF there are any youtube videos in the widget
		if(Object.keys(widget_data[i].media).length>0){
			if(widget_data[i].hasYouTube){
				var yt_api_script = document.createElement("script");
				yt_api_script.src = "https://www.youtube.com/iframe_api";
				var first_head = document.getElementsByTagName("head")[0];
				first_head.parentNode.insertBefore(yt_api_script,first_head);
			}
			media_widgets[i].innerHTML = "";
			modify_widget(i);
			media_widgets[i].setAttribute("ready",true);
		}
	}
}

var w_nav_width = 20;
function modify_widget(w_index){
		var w_nav_left = document.createElement("div");
		w_nav_left.className = "nav";
		w_nav_left.dataset.direction = "left";
		w_nav_left.style.width = w_nav_width + "px";
		w_nav_left.addEventListener("mousedown",function(){move_widget_slider(w_index,-10);},false);
		w_nav_left.addEventListener("mouseout",function(){stop_widget_slider(w_index);},false);
		w_nav_left.addEventListener("mouseup",function(){stop_widget_slider(w_index);},false);
		w_nav_left.innerHTML = "&lt;";
		widget_data[w_index].widget.appendChild(w_nav_left);
		
		var w_nav_right = document.createElement("div");
		w_nav_right.className = "nav";
		w_nav_right.dataset.direction ="right"
		w_nav_right.style.width = w_nav_width + "px";
		w_nav_right.addEventListener("mousedown",function(){move_widget_slider(w_index,10);},false);
		w_nav_right.addEventListener("mouseover",function(){stop_widget_slider(w_index);},false);
		w_nav_right.addEventListener("mouseup",function(){stop_widget_slider(w_index);},false);
		w_nav_right.innerHTML = "&gt;";
		widget_data[w_index].widget.appendChild(w_nav_right);
		
		var w_slider = document.createElement("div");
		w_slider.className = "slider";
		widget_data[w_index].widget.slider = w_slider;
		widget_data[w_index].widget.appendChild(w_slider);

		var gallery = document.createElement("div");
		gallery.dataset.theme = widget_data[w_index].theme;
		gallery.className = "gallery";
		gallery.id = "gallery"+w_index;
		gallery.dataset.playing = false;
		
		var g_aligner = document.createElement("div");
		g_aligner.className = "g_aligner";
	
		var g_image_name = document.createElement("div");
		g_image_name.className = "label g_image_name";
		g_image_name.innerHTML = "no image selected";
		g_aligner.appendChild(g_image_name);
	
		var g_close = document.createElement("a");
		g_close.className = "label close";
		g_close.href = "javascript:void(0)";
		g_close.addEventListener("click",function(){gallery.dataset.active="false";},false);
		g_close.addEventListener("click",function(){close_gallery(w_index);},false);
		g_aligner.appendChild(g_close);
	
		var g_nav_left = document.createElement("div");
		g_nav_left.className = "nav";
		g_nav_left.dataset.direction = "left";
		g_nav_left.innerHTML = "&lt;";
		g_nav_left.addEventListener("click",function(){show_gallery_slide(w_index,widget_data[w_index].gallery.current_index-1);},false);
		g_aligner.appendChild(g_nav_left);

		var g_nav_right = document.createElement("div");
		g_nav_right.className = "nav";
		g_nav_right.innerHTML = "&gt;";
		g_nav_right.addEventListener("click",function(){show_gallery_slide(w_index,widget_data[w_index].gallery.current_index+1);},false);
		g_nav_right.dataset.direction = "right";
		g_aligner.appendChild(g_nav_right);

		var g_thumb_nav = document.createElement("div");
		g_thumb_nav.className = "g_thumb_nav";
		g_thumb_nav.setAttribute("show",true);
		g_aligner.appendChild(g_thumb_nav);

		var g_progress = document.createElement("div");
		g_progress.className ="progress";
		g_aligner.appendChild(g_progress);

		var g_controls = document.createElement("div");
		g_controls.className = "controls";
		
			g_toggle_show = document.createElement("div");
			g_toggle_show.className = "g_toggle_show";
			g_toggle_show.dataset.type = "control";
			g_toggle_show.addEventListener("click",function(){toggle_gallery_show(w_index);},false);
			g_controls.appendChild(g_toggle_show);	

			g_counter = document.createElement("div");
			g_counter.className = "g_counter";
			g_counter.innerHTML = "0/"+Object.keys(widget_data[w_index].media).length;
			g_controls.appendChild(g_counter);
	
			g_radio_nav = document.createElement("div");
			g_radio_nav.className = "g_radio_nav";
			g_controls.appendChild(g_radio_nav);
	
			g_toggle_thumb_nav = document.createElement("div");
			g_toggle_thumb_nav.addEventListener("click",function(){toggle_thumb_nav(w_index);},false);
			g_toggle_thumb_nav.setAttribute("show",true);
			g_toggle_thumb_nav.dataset.type = "control";
			g_toggle_thumb_nav.className = "g_toggle_thumb_nav";
			//better way to do this
			var temp = document.createElement("div");
			temp.innerHTML = "&#94;";
			g_toggle_thumb_nav.appendChild(temp);
			g_controls.appendChild(g_toggle_thumb_nav);
		g_aligner.appendChild(g_controls);

		for(var j=0; j<Object.keys(widget_data[w_index].media).length; j++)
		{
			//add thumbnails to slider	& thumb navigator
			var thumb = document.createElement("img");
			thumb.className = "thumb";
			thumb.title = widget_data[w_index].media[j].name;
			thumb.src = widget_data[w_index].media[j].thumb_url;
			thumb.setAttribute("onclick","show_gallery_slide("+w_index+","+j+");");

			var slider_thumb = thumb.cloneNode(false);
			w_slider.appendChild(slider_thumb);

			var thumb_nav_thumb = thumb.cloneNode(false);
			g_thumb_nav.appendChild(thumb_nav_thumb);

			var full_view = document.createElement("div");
			if(widget_data[w_index].media[j].type == "image")
			{
				full_view.style.backgroundImage = "url("+widget_data[w_index].media[j].url+")";
			}
			else if(widget_data[w_index].media[j].type == "youtube")
			{
				widget_data[w_index].media[j].container_id 	= "yt_player_"+j;	
				full_view.id = widget_data[w_index].media[j].container_id;			
			}
			else
			{full_view = document.createElement("unknown");}

			full_view.className ="full_view";
			g_aligner.appendChild(full_view);

			var radio = document.createElement("input");
			radio.type = "radio";
			radio.setAttribute("name","image_selector");
			radio.setAttribute("onchange","show_gallery_slide("+w_index+","+j+")");
			g_radio_nav.appendChild(radio);
		}

		gallery.appendChild(g_aligner);	
		document.body.appendChild(gallery);
		widget_data[w_index].gallery = gallery;
		widget_data[w_index].gallery.current_index = 0;
		widget_data[w_index].gallery.previous_index = 0;
}


var shifter,magic_number = 19;
function move_widget_slider(w_index, shift){
	var slider_width = parseInt(window.getComputedStyle(widget_data[w_index].widget.slider).width);
	var w_width = parseInt(window.getComputedStyle(widget_data[w_index].widget).width);

	var visible_area = (parseInt(window.getComputedStyle(widget_data[w_index].widget).width) -  (w_nav_width*2));
	var widget_min_left = visible_area-slider_width + magic_number;
	var widget_max_left = w_nav_width;
	shift = parseInt(shift);
	shifter = setInterval(function()
	{
		var current_position = parseInt(window.getComputedStyle(widget_data[w_index].widget.slider).left);
		var new_position = current_position+shift;
		if(new_position<widget_max_left && new_position>widget_min_left)
		{widget_data[w_index].widget.slider.style.left = new_position+"px";}
	},0);
}


function stop_widget_slider(w_index)
{clearInterval(shifter);}

function show_gallery_slide(w_index,m_index){
		//document.location.hash = "gallery"+w_index;
		document.querySelector("#gallery"+w_index).dataset.active="true";
		m_index = isNaN(m_index) ? widget_data[w_index].gallery.current_index : m_index;
		m_index = (m_index<0) ? (Object.keys(widget_data[w_index].media).length)-1 : m_index;
		m_index = (m_index>(Object.keys(widget_data[w_index].media).length-1)) ? 0 : m_index;
		widget_data[w_index].gallery.previous_index = widget_data[w_index].gallery.current_index;

		if(widget_data[w_index].media[widget_data[w_index].gallery.previous_index].yt_player && widget_data[w_index].media[widget_data[w_index].gallery.previous_index].yt_player.getPlayerState() == 1)
		{widget_data[w_index].media[widget_data[w_index].gallery.previous_index].yt_player.pauseVideo();}
 
		widget_data[w_index].gallery.current_index = m_index;
		
		widget_data[w_index].gallery.getElementsByClassName("g_thumb_nav")[0].getElementsByClassName("thumb")[widget_data[w_index].gallery.previous_index].dataset.current = false;
		widget_data[w_index].gallery.getElementsByClassName("full_view")[widget_data[w_index].gallery.previous_index].dataset.current = false;	

		widget_data[w_index].gallery.getElementsByClassName("g_thumb_nav")[0].getElementsByClassName("thumb")[widget_data[w_index].gallery.current_index].dataset.current = true;
		widget_data[w_index].gallery.getElementsByClassName("full_view")[widget_data[w_index].gallery.current_index].dataset.current = true;
		
		widget_data[w_index].gallery.getElementsByClassName("g_radio_nav")[0].getElementsByTagName("input")[widget_data[w_index].gallery.current_index].checked = true;
		widget_data[w_index].gallery.getElementsByClassName("g_counter")[0].innerHTML = (widget_data[w_index].gallery.current_index+1)+"/"+Object.keys(widget_data[w_index].media).length;
		widget_data[w_index].gallery.getElementsByClassName("g_image_name")[0].innerHTML = widget_data[w_index].media[widget_data[w_index].gallery.current_index].name;

		widget_data[w_index].gallery.dataset.current_media = widget_data[w_index].media[m_index].type;
}


function toggle_thumb_nav(w_index)
{
	if(widget_data[w_index].gallery.getElementsByClassName("g_thumb_nav")[0].getAttribute("show")=="true")
	{
		widget_data[w_index].gallery.getElementsByClassName("g_thumb_nav")[0].setAttribute("show",false);
		widget_data[w_index].gallery.getElementsByClassName("g_toggle_thumb_nav")[0].setAttribute("show",false);
	}
	else
	{
		widget_data[w_index].gallery.getElementsByClassName("g_thumb_nav")[0].setAttribute("show",true);
		widget_data[w_index].gallery.getElementsByClassName("g_toggle_thumb_nav")[0].setAttribute("show",true);
	}
}


var g_player;

function toggle_gallery_show(w_index)
{
	stop_slideshow();

	var playing = widget_data[w_index].gallery.dataset.playing;

	if(playing == "true")
	{widget_data[w_index].gallery.dataset.playing = false;}
	else
	{widget_data[w_index].gallery.dataset.playing = true;}

	if(widget_data[w_index].gallery.dataset.current_media == "youtube" && playing == "false")
	{
		widget_data[w_index].gallery.dataset.show = "youtube";
		widget_data[w_index].media[widget_data[w_index].gallery.current_index].yt_player.playVideo();
	}
	else if(widget_data[w_index].gallery.dataset.current_media == "youtube" && playing == "true")
	{
		widget_data[w_index].gallery.dataset.show = null;
		widget_data[w_index].media[widget_data[w_index].gallery.current_index].yt_player.pauseVideo();
	}


	if(widget_data[w_index].gallery.dataset.current_media != "youtube" && playing == "false")
	{
		g_player = setInterval(function()
		{show_gallery_slide(w_index,widget_data[w_index].gallery.current_index+1);},4000);
	}
	else if(widget_data[w_index].gallery.dataset.current_media != "youtube" && play_state == "true")
	{}
}

function close_gallery(w_index){	
	stop_slideshow();
	
	if(widget_data[w_index].media[widget_data[w_index].gallery.current_index].type == "youtube" && widget_data[w_index].media[widget_data[w_index].gallery.current_index].yt_player.getPlayerState() == 1)
	{widget_data[w_index].media[widget_data[w_index].gallery.current_index].yt_player.pauseVideo();}
	
	widget_data[w_index].gallery.dataset.play_state = false; 
	widget_data[w_index].gallery.dataset.active = false;
}


function onYouTubeIframeAPIReady(){
	for(var i=0; i<Object.keys(widget_data).length; i++)
	{
		for(var j=0; j<Object.keys(widget_data[i].media).length; j++)
		{
			if(widget_data[i].media[j].type == "youtube")
			{
				var player = new YT.Player(widget_data[i].media[j].container_id,
				{
					videoId: widget_data[i].media[j].video_id,
					playerVars:
					{
						"showinfo":1,
						"autohide":0,
						"iv_load_policy":3,
						"rel":0,
						"modestbranding":1
					}
				});
				widget_data[i].media[j].yt_player = player;

				widget_data[i].media[j].yt_player.w_index = i;
				widget_data[i].media[j].yt_player.addEventListener("onStateChange","yt_state_changed");
			}
		}
	}
}

function stop_slideshow()
{window.clearInterval(g_player);}

function yt_state_changed(event)
{
	if(event.data == YT.PlayerState.PLAYING)
	{
		stop_slideshow();
		widget_data[event.target.w_index].gallery.dataset.playing = true;
		widget_data[event.target.w_index].gallery.dataset.show = "youtube";
	}
	else
	{
		widget_data[event.target.w_index].gallery.dataset.playing = false;
		widget_data[event.target.w_index].gallery.dataset.show = null;
	}
}
