var workspace, code_areas, preview_doc;
document.addEventListener("DOMContentLoaded",function()
{
	window.onbeforeunload = function(){return "All your work will be erased!";}
	
	code_areas = document.getElementsByClassName("code-area");
	
	for(var i=0; i<code_areas.length; i++)
	{
		code_areas[i].getElementsByTagName("textarea")[0].addEventListener("keyup",show_preview,false);
		var toggle = code_areas[i].getElementsByClassName("toggle")[0];
		toggle.addEventListener("change",resize_code_areas);
	}
	
	var editor 	= document.getElementById("editor");
	var preview = document.getElementById("preview");
	
	document.getElementById("toggle-design").addEventListener("click",function()
	{
		editor.style.width = window.getComputedStyle(editor).maxWidth;
		preview.style.width = window.getComputedStyle(preview).minWidth;
	},false);
	
	document.getElementById("toggle-preview").addEventListener("click",function()
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
	
	var preview_frame = document.getElementById("preview-frame");
	preview_doc = preview_frame.contentDocument || preview_frame.contentWindow.document;
	
	
	document.getElementById("save-code-link").addEventListener("click",function(){save_code_as();},false);
	

},false);

function save_code_as()
{
	var html = "<style>\n"+document.getElementById("css-area").getElementsByTagName("textarea")[0].value+"\n</style>\n\n";
	html += "<script>\n" + document.getElementById("js-area").getElementsByTagName("textarea")[0].value+"\n<\/script>\n\n";
	html += "<body>\n"+document.getElementById("markup-area").getElementsByTagName("textarea")[0].value+"\n</body>\n\n";
	
	var data = 'data:application/xml;charset=utf-8,' + encodeURIComponent(html);
	document.getElementById("save-code-link").href = data;
}

function resize_code_areas()
{
	var showing_code_areas = new Array();
	for(var i=0; i<code_areas.length; i++)
	{
		if(!code_areas[i].getElementsByClassName("toggle")[0].checked)
		{
			code_areas[i].dataset.showing = false;
			code_areas[i].style.height = "";
		}
		else
		{
			code_areas[i].dataset.showing = true;
			showing_code_areas.push(code_areas[i]);
		}		
	}
	var not_showing = code_areas.length - showing_code_areas.length;
	for(var i=0; i<showing_code_areas.length; i++)
	{
		showing_code_areas[i].style.height = "calc((100% - 22px*"+not_showing+")/"+showing_code_areas.length+")";
	}
}

function show_preview()
{
	console.clear();
	
	workspace.dataset.loading = true;
	
	//console.log("Step 1: Get the updated tag:");
	var updated_tag = event.srcElement.parentNode.dataset.tag;
	console.log(updated_tag);
	
	//console.log("\nStep 2: Get access to the iframe's document:");
	preview_doc.open();
	console.log(preview_doc);
	
	//console.log("\nStep 3: Check if the updated tag exists in the preview frame's document:");
	var target_tag = preview_doc.getElementsByTagName(updated_tag);
	/*setTimeout(function(value)
	{
		console.log(target_tag[0]);
		console.log("\nStep 4: If it exists in the preview frame, update the tag, else, create a new one and set it's innerHTML to that:");
		if(target_tag[0])
		{
			console.log("exists! and value to be used is:");
			console.log(value);
			target_tag[0].innerHTML = value;
		}
		else
		{
			console.log("no target tag found, creating a new one with the value:");
			console.log(value);
			target_tag = preview_doc.body.appendChild(document.createElement(updated_tag));
			target_tag.innerHTML = value;
		}
		
		console.log(preview_doc);
	}.bind(this,event.srcElement.value),0);*/
	
	var html = "<style>\n"+document.getElementById("css-area").getElementsByTagName("textarea")[0].value+"\n</style>\n\n";
	html += "<script>\n" + document.getElementById("js-area").getElementsByTagName("textarea")[0].value+"\n<\/script>\n\n";
	html += "<body>\n"+document.getElementById("markup-area").getElementsByTagName("textarea")[0].value+"\n</body>\n\n";

	//preview_frame.removeAttribute("src");
	preview_doc.write(html);
	preview_doc.close();
	//preview_frame.srcdoc = html; //in beta atm
	workspace.dataset.loading = false;
}
