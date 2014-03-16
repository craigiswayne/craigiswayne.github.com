var workspace, code_areas;
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

},false);

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
	var preview_frame = document.getElementById("preview-frame");
	workspace.dataset.loading = true;
	var html = "<style>\n"+document.getElementById("css-area").getElementsByTagName("textarea")[0].value+"\n</style>\n\n";
	html += "<script>\n" + document.getElementById("js-area").getElementsByTagName("textarea")[0].value+"\n<\/script>\n\n";
	html += "<body>\n"+document.getElementById("markup-area").getElementsByTagName("textarea")[0].value+"\n</body>\n\n";

	preview_frame.removeAttribute("src");
	preview_doc = preview_frame.contentDocument || preview_frame.contentWindow.document;
	//preview_doc.open();
	//preview_doc.write(html);
	//preview_doc.close();
	preview_frame.srcdoc = html; //in beta atm
	workspace.dataset.loading = false;
} 
