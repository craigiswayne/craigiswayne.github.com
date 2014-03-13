var editor;
var resizer;
var resizer_width = null;
var editor_width = null;
var nexus_prototype;
var nexus_prototype_width;
var js_area;
var resize_helper, meta, preview;
var meta;
var preview_doc;
document.addEventListener("DOMContentLoaded",function()
{
	//window.onbeforeunload = function(){return "All your work will be erased!";}
	
	nexus_prototype = document.createElement("div");
	nexus_prototype.className = "nexus-prototype";
	
	editor = document.createElement("div");
	editor.className = "editor";
		var css_area = document.createElement("form");
		css_area.dataset.showing = true;
		css_area.className = "code-area";
		css_area.id = "css-area";
			var code_label = document.createElement("label");
			code_label.dataset.language="CSS";
			
				var code_toggle = document.createElement("input");
				code_toggle.className = "toggle";
				code_toggle.addEventListener("change",resize_code_areas);
				code_toggle.type = "checkbox";
				code_toggle.checked = true;
			
			var code_editor = document.createElement("textarea");
			code_editor.id = "css-textarea";
			code_editor.spellcheck = false;
			code_editor.addEventListener("keyup",show_preview);
				
		code_label.appendChild(code_toggle);
		css_area.appendChild(code_label);
		css_area.appendChild(code_editor);
	
	editor.appendChild(css_area);
	
	js_area = css_area.cloneNode(true);
	js_area.id = "js-area";
	js_area.getElementsByTagName("label")[0].dataset.language = "JavaScript";
	js_area.getElementsByTagName("input")[0].addEventListener("change",resize_code_areas);
	js_area.getElementsByTagName("textarea")[0].addEventListener("keyup",show_preview);
	js_area.getElementsByTagName("textarea")[0].id = "js-textarea";
	js_area.getElementsByTagName("textarea")[0].name = "js-textarea";
	editor.appendChild(js_area);
	
	var markup_area = css_area.cloneNode(true);
	markup_area.id = "markup-area";
	markup_area.getElementsByTagName("label")[0].dataset.language = "Markup";
	markup_area.getElementsByTagName("input")[0].addEventListener("change",resize_code_areas);
	markup_area.getElementsByTagName("textarea")[0].addEventListener("keyup",show_preview);
	markup_area.getElementsByTagName("textarea")[0].id = "markup-textarea";
	markup_area.getElementsByTagName("textarea")[0].name = "markup-textarea";
	editor.appendChild(markup_area);
	
	resizer = document.createElement("div");
	
		var settings_icon = document.createElement("a");
		settings_icon.dataset.icon = "\uF013";
		settings_icon.dataset.icon = "\uF0c9";
		settings_icon.dataset.icon = "\uE60d";
		resizer.appendChild(settings_icon);
		
		var toggle_design = document.createElement("nav");
		toggle_design.addEventListener("click",function()
		{
			nexus_prototype.dataset.animate = true;
			editor.style.width = window.getComputedStyle(editor).maxWidth;
			meta.style.width = window.getComputedStyle(meta).minWidth;
		},false);
		toggle_design.className = "toggle-design";
		toggle_design.dataset.icon = "\uE601";
		resizer.appendChild(toggle_design);
		
		var resizer_icon = document.createElement("div");
		resizer_icon.dataset.icon = "\u22EE";
		resizer_icon.dataset.icon = "\uE607";
		resizer_icon.dataset.icon = "\uE60b";
		resizer_icon.dataset.icon = "\uF142";
		resizer_icon.className = "icon";
		resizer.appendChild(resizer_icon);
		
		var toggle_preview = document.createElement("nav");
		toggle_preview.addEventListener("click",function()
		{
			nexus_prototype.dataset.animate = true;
			editor.style.width = window.getComputedStyle(editor).minWidth;
			meta.style.width = window.getComputedStyle(meta).maxWidth;
		},false);
		toggle_preview.className = "toggle-preview";
		toggle_preview.dataset.icon = "\uE602";
		resizer.appendChild(toggle_preview);
		
	resizer.className = "resizer";
	editor.appendChild(resizer);
	
	nexus_prototype.appendChild(editor);
	
	meta = document.createElement("div");
	meta.className = "meta";
	nexus_prototype.dataset.loading = false;
	preview = document.createElement("iframe");
	preview.src = "sandbox.html";
	preview.sandbox = "allow-same-origin allow-top-navigation allow-forms allow-scripts";
	preview.className = "preview";
	preview.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
	var new_doc = preview.contentDocument || preview.contentWindow;
	resize_helper = document.createElement("div");
	var loading_status = document.createElement("div");
	loading_status.className = "loading-status";
	loading_status.dataset.icon = "\uE605";
	//loading_status.dataset.icon = "\uE608";
	//loading_status.dataset.icon = "\uE609";
	//loading_status.dataset.icon = "\uE60a";
	resize_helper.appendChild(loading_status);
	resize_helper.className = "resize-helper";
	meta.appendChild(preview);
	meta.appendChild(resize_helper);
	nexus_prototype.appendChild(meta);
	
	
	//set event listeners before adding to the document
	resizer.addEventListener("mousedown",function()
	{
		nexus_prototype.dataset.resizing = true;
		resize_start = event.x;
		editor_width = window.getComputedStyle(editor).width;
		console.log(event);
	},false);
	
	resizer.addEventListener("contextmenu",function(){nexus_prototype.dataset.resizing=false;},false);
	
	//dont need this, just check if the src element is the resizer
	document.addEventListener("mouseup",function(){nexus_prototype.dataset.resizing = false;},false);
	
	document.addEventListener("mousemove",function()
	{
		//NOTE: the new_width is a percentage of the container not in pixels (px)
		if(nexus_prototype.dataset.resizing=="true")
		{	
			nexus_prototype_width = parseInt(window.getComputedStyle(nexus_prototype).width);
			var resizer_width = parseInt(window.getComputedStyle(resizer).width);
			
			var difference = event.x-resize_start;
			var new_width = ((parseInt(editor_width)+difference)/nexus_prototype_width)*100;
			
			editor.style.width	= new_width + "%";
			meta.style.width	= "calc(100% - "+editor.style.width+")";
		}
	},false);
	
	document.body.appendChild(nexus_prototype);

},false);

function resize_code_areas()
{
	var code_areas = document.getElementsByClassName("code-area");
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


function update_css()
{
	nexus_prototype.dataset.loading = true;

	(preview.getAttribute("src")) ? preview.removeAttribute("src") : null;
	preview_doc = preview.contentDocument || preview.contentWindow.document;
	var new_style = (preview_doc.head.getElementsByTagName("style")[0]) ? (preview_doc.head.getElementsByTagName("style")[0]) : preview_doc.head.appendChild(document.createElement("style"));
	new_style.innerHTML = "\n"+document.getElementById("css-textarea").value+"\n";
	nexus_prototype.dataset.loading = false;
}

//use interval here
//generic function (which tag to change, style, script, body)
//possible create js prototype of code area and link to tag and THEN! function is based on this attribute
function update_js()
{
	nexus_prototype.dataset.loading = true;

	(preview.getAttribute("src")) ? preview.removeAttribute("src") : null;
	preview_doc = preview.contentDocument || preview.contentWindow.document;
	var new_script = (preview_doc.head.getElementsByTagName("script")[0]) ? (preview_doc.head.getElementsByTagName("script")[0]) : preview_doc.head.appendChild(document.createElement("script"));
	new_script.innerHTML = "\n"+document.getElementById("js-textarea").value+"\n";
	nexus_prototype.dataset.loading = false;
}

function update_body()
{
	nexus_prototype.dataset.loading = true;

	(preview.getAttribute("src")) ? preview.removeAttribute("src") : null;
	while(!preview.contentDocument || !preview.contentWindow.document)
	{}//wait for the iframe to become accessible
	
	preview_doc = (preview_doc) ? preview_doc : (preview.contentDocument || preview.contentWindow.document);
	var new_body = (preview_doc.getElementsByTagName("body")[0]) ? (preview_doc.getElementsByTagName("body")[0]) : preview_doc.appendChild(document.createElement("body"));
	new_body.innerHTML = "\n"+document.getElementById("markup-textarea").value+"\n";
	nexus_prototype.dataset.loading = false;
}

function show_preview()
{
	nexus_prototype.dataset.loading = true;
	var html = "<style>\n"+document.getElementById("css-area").getElementsByTagName("textarea")[0].value+"\n</style>\n\n";
	html += "<script>\n" + document.getElementById("js-area").getElementsByTagName("textarea")[0].value+"\n<\/script>\n\n";
	html += "<body>\n"+document.getElementById("markup-area").getElementsByTagName("textarea")[0].value+"\n</body>\n\n";
	//console.log(html);
	preview.removeAttribute("src");
	preview_doc = preview.contentDocument || preview.contentWindow.document;
	preview_doc.open();
	preview_doc.write(html);
	preview_doc.close();
	//preview.srcdoc = html; in beta atm
	nexus_prototype.dataset.loading = false;
} 
