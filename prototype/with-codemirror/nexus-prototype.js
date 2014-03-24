var workspace, code_boxes, preview_doc;
var css_editor,markup_editor,javascript_editor;
document.addEventListener("DOMContentLoaded",function()
{
	window.onbeforeunload = function(){return "All your work will be erased!";}
	
	code_boxes = document.getElementsByClassName("code-box");
	
	for(var i=0; i<code_boxes.length; i++)
	{
		if(code_boxes[i].getElementsByClassName("code-area")[0].getElementsByTagName("li")[0])
		{
			console.log("found in:" +  code_boxes[i].getElementsByClassName("code-area")[0].parentNode.id);
			code_boxes[i].getElementsByClassName("code-area")[0].getElementsByTagName("li")[0].addEventListener("keydown",retain_first_line,false);
		}
	
		code_boxes[i].getElementsByClassName("code-area")[0].addEventListener("keyup",show_preview,false);
		code_boxes[i].getElementsByClassName("code-area")[0].addEventListener("scroll",function(){this.style.backgroundPositionY = 0-this.scrollTop;},false);		
		code_boxes[i].getElementsByClassName("toggle")[0].addEventListener("change",resize_code_boxes);
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
	
	javascript_editor = CodeMirror(document.getElementById("js-area"), {
	 mode:  "javascript",
	 lineNumbers:true,
	 lineWrapping:true,
	 change:"console.log('hello');"
	});
	CodeMirror.signal(javascript_editor, "change");
   javascript_editor.on('change', show_preview);
   
   css_editor = CodeMirror(document.getElementById("css-area"), {
	 mode:  "javascript",
	 lineNumbers:true,
	 lineWrapping:true,
	 change:"console.log('hello');"
	});
	CodeMirror.signal(css_editor, "change");
   css_editor.on('change', show_preview);
   
   markup_editor = CodeMirror(document.getElementById("markup-area"), {
	 mode:  "javascript",
	 lineNumbers:true,
	 lineWrapping:true,
	 change:"console.log('hello');"
	});
	CodeMirror.signal(markup_editor, "change");
   markup_editor.on('change', show_preview);

},false);

function save_code_as()
{
	var data = 'data:application/xml;charset=utf-8,' + encodeURIComponent(get_preview_code());
	document.getElementById("save-code-link").href = data;
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
	
	workspace.dataset.loading = true;
	
	//console.log("Step 1: Get the updated tag:");
	//var updated_tag = event.srcElement.parentNode.dataset.tag;
	//console.log(updated_tag);
	
	//console.log("\nStep 2: Get access to the iframe's document:");
	preview_doc.open();
	//console.log(preview_doc);
	
	//console.log("\nStep 3: Check if the updated tag exists in the preview frame's document:");
	//var target_tag = preview_doc.getElementsByTagName(updated_tag);
	
	preview_doc.write(get_preview_code());
	preview_doc.close();
	workspace.dataset.loading = false;
}

function get_preview_code()
{
	var html = "";
	//html += "<style>\n"+document.getElementById("css-area").getElementsByClassName("code-area")[0].innerText+"\n</style>\n\n";
	html += "<style>\n"+css_editor.getValue()+"\n</style>\n\n";
	//html += "<script>\n" + document.getElementById("js-area").getElementsByClassName("code-area")[0].innerText+"\n<\/script>\n\n";
	html += "<script>\n" + javascript_editor.getValue()+"\n<\/script>\n\n";
	//html += "<body>\n"+document.getElementById("markup-area").getElementsByClassName("code-area")[0].innerText+"\n</body>\n\n";
	html += "<body>\n"+markup_editor.getValue()+"\n</body>\n\n";
	return html;
}

function retain_first_line()
{
	console.log(event);
	console.log(event.srcElement);
}
