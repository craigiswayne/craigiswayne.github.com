var workspace, code_boxes, preview_doc;
document.addEventListener("DOMContentLoaded",function()
{
	window.onbeforeunload = function(){return "All your work will be erased!";}
	
	code_boxes = document.getElementsByClassName("code-box");
	
	for(var i=0; i<code_boxes.length; i++)
	{
		if(code_boxes[i].getElementsByClassName("codearea")[0].getElementsByTagName("li")[0])
		{
			code_boxes[i].getElementsByClassName("codearea")[0].getElementsByTagName("li")[0].addEventListener("keydown",retain_first_line,false);
		}
	
		code_boxes[i].getElementsByClassName("codearea")[0].addEventListener("keyup",show_preview,false);
		code_boxes[i].getElementsByClassName("codearea")[0].addEventListener("scroll",function(){this.style.backgroundPositionY = 0-this.scrollTop;},false);		
		code_boxes[i].getElementsByClassName("toggle")[0].addEventListener("change",resize_code_boxes);
	}
	
	var editor 	= document.querySelector("#workspace>form");
	var preview = document.getElementById("preview");
	
	
	document.querySelector("#resizer>[data-icon_name=forward]").addEventListener("click",function()
	{
		editor.style.width = window.getComputedStyle(editor).maxWidth;
		preview.style.width = window.getComputedStyle(preview).minWidth;
	},false);
	
	document.querySelector("#resizer>[data-icon_name=backward]").addEventListener("click",function()
	{
		editor.style.width = window.getComputedStyle(editor).minWidth;
		preview.style.width = window.getComputedStyle(preview).maxWidth;
	},false);

	
	//resize events
	workspace = document.getElementById("workspace");
	var resizer = document.getElementById("resizer");
	resizer.addEventListener("mousedown",function()
	{
		workspace.dataset.resizing = true;
		resize_start = event.x;
		editor_width = window.getComputedStyle(editor).width;
	},false);
	
	resizer.addEventListener("contextmenu",function(){workspace.dataset.resizing=false;},false);
	
	//dont need this, just check if the src element is the resizer
	document.addEventListener("mouseup",function(){workspace.dataset.resizing = false;},false);
	
	document.addEventListener("mousemove",function()
	{
		//NOTE: the new_width is a percentage of the container not in pixels (px)
		if(workspace.dataset.resizing=="true")
		{	
			var workspace_width = parseInt(window.getComputedStyle(workspace).width);
			var resizer_width = parseInt(window.getComputedStyle(resizer).width);
			
			var difference = event.x-resize_start;
			var new_width = ((parseInt(editor_width)+difference)/workspace_width)*100;
			
			editor.style.width	= new_width + "%";
			preview.style.width	= "calc(100% - "+editor.style.width+")";
		}
	},false);
	
	
	
	var preview_frame = document.querySelector("#preview>iframe");
	preview_doc = preview_frame.contentDocument || preview_frame.contentWindow.document;
	
	document.querySelector("body>nav>a.action[download]").addEventListener("click",function(){save_code_as();},false);
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;	
	document.querySelector("body>nav>label.action>input[type=file]").onchange = upload_files;
	document.querySelector("body>nav>[data-icon_name=eraser]>input[type=button]").onclick = reset_codeareas;
	get_functionality();
	resize_code_boxes();
	show_preview();
},false);

function reset_codeareas(){
	for(var i=0; i<document.querySelectorAll(".codearea").length; i++){
		document.querySelectorAll(".codearea")[i].value = '';
	}
	show_preview();
}

function upload_files(){
	var files = this.files;
	window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
		for (var i = 0, file; file = files[i]; ++i) {
			document.querySelector("body>nav>a.action[download]").download = file.name;
			(function(f){
				//var current_date = new Date();
				fs.root.getFile("uploaded.html", {create: true, exclusive: false}, function(fileEntry){
					fileEntry.createWriter(function(fileWriter){
						fileWriter.write(f);
						fs.root.getFile("uploaded.html", {}, function(fileEntry) {
							fileEntry.file(function(file){
								var reader = new FileReader();
								this.result = "";
								reader.onloadend = function(e){
									reset_codeareas();
									document.querySelector(".code-box[data-tag=body] textarea").value = this.result;
									document.querySelector("nav>label.action>input[type=file]").value = null;
									show_preview();
									console.log(this);
								};
						
								reader.readAsText(file);
							}, errorHandler);
						}, errorHandler);
					}, errorHandler);
				}, errorHandler);
			})(file);
		}
	}, errorHandler);
}


function errorHandler(e){
	console.log(e);
}

function save_code_as()
{
	var data = 'data:application/xml;charset=utf-8,' + encodeURIComponent(get_preview_code());
	document.querySelector("nav>a[download]").href = data;
}

function resize_code_boxes()
{
	var showing_code_boxes = new Array();
	for(var i=0; i<code_boxes.length; i++)
	{
		if(!code_boxes[i].getElementsByClassName("toggle")[0].checked)
		{
			code_boxes[i].dataset.showing = false;
			code_boxes[i].style.height = "";
		}
		else
		{
			code_boxes[i].dataset.showing = true;
			showing_code_boxes.push(code_boxes[i]);
		}		
	}
	var not_showing = code_boxes.length - showing_code_boxes.length;
	for(var i=0; i<showing_code_boxes.length; i++)
	{
		showing_code_boxes[i].style.height = "calc((100% - 22px*"+not_showing+")/"+showing_code_boxes.length+")";
	}
}

function show_preview()
{
	console.clear();
	
	document.querySelector("#workspace").dataset.loading = true;
	preview_doc.open();
	preview_doc.write(get_preview_code());
	preview_doc.close();
	workspace.dataset.loading = false;
}

function get_preview_code()
{
	var html = "<html><head>";
	html += document.getElementById("css-area").getElementsByClassName("codearea")[0].value ? ("<style>"+document.getElementById("css-area").getElementsByClassName("codearea")[0].value+"</style>") : "";
	html += document.getElementById("js-area").getElementsByClassName("codearea")[0].value ? ("<script>"+document.getElementById("js-area").getElementsByClassName("codearea")[0].value+"</script>") : "";
	html += "</head><body>";
	html += document.getElementById("markup-area").getElementsByClassName("codearea")[0].value;
	html += "</body></html>";
	
	return html;
}

function get_functionality(){
	
	var upload_button = document.querySelector("nav>.action>input[type=file]");
	if(!document.domain){
		upload_button.type = "button";
		upload_button.addEventListener("click",function(){alert("Not available as a local file","test");},false);
	}
	
}
