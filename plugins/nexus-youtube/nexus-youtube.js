document.addEventListener("DOMContentLoaded",function(){

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

},false);

function onYouTubeIframeAPIReady() {
	constructYouTubePlayers();
}

function constructYouTubePlayers(){

	var players = document.getElementsByClassName("youtube-player");
	for(var i=0; i<players.length; i++){
		if(players[i].dataset.videoId){

			players[i].id = players[i].id ? players[i].id : "youtube-player-"+players[i].dataset.videoId;

			var player = new YT.Player(players[i].id,{
				videoId:players[i].dataset.videoId,
				playerVars:{
					wmode:"transparent"
				},
				events:{
					"onStateChange": onPlayerStateChange,
					"onReady": onPlayerReady
				}
			});

			if(players[i].getAttribute("onStateChange")){
				player.addEventListener("onStateChange",players[i].getAttribute("onStateChange"));
			}
		}
	}
}

function onPlayerReady(event){
	event.target.getIframe().dataset.state = "ready";
}

function onPlayerStateChange(event){

	switch(event.target.getPlayerState()){
		case -1:
		event.target.getIframe().dataset.state = "unstarted";
		break;

		case 0:
		event.target.getIframe().dataset.state = "ended";

		case 1:
		event.target.getIframe().dataset.state = "playing";
		break;

		case 2:
		event.target.getIframe().dataset.state = "paused";
		break;

		case 3:
		event.target.getIframe().dataset.state = "buffering";
		break;
	
		case 5:
		event.target.getIframe().dataset.state = "cued";
		break;

		default:
		event.target.getIframe().dataset.state = "unknown";
		break;		
	}
}
