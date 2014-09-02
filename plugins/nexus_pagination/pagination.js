HTMLDivElement.prototype.paginate = function(){

	this.update_meta_data	= function(param){
		
		param = (typeof param != "object") ? {} : param;
		
		this.results_per_page 	= parseInt(param["results_per_page"]) || this.results_per_page || parseInt(this.dataset.results_per_page) || this.results.length || 10;
		this.total_results		= parseInt(param["total_results"]) || parseInt(this.dataset.total_results);
		this.total_pages	  	= Math.ceil(this.total_results/this.results_per_page);
		this.page				= parseInt(this.page) || 1;
		
		this.create_footer();
		if(this.header){this.go_to_page(1);}
	};
	
	this.update_scope = function(param){
		this.scope_start	= ((parseInt(this.page)-1)*this.results_per_page)+1;
		this.scope_end 		= this.scope_start+this.results_per_page-1;
		this.scope_end		= (this.scope_end > this.total_results) ? this.total_results : this.scope_end;
	};
	
	this.go_to_page		= function(page_number){
		
		page_number = (page_number > this.total_pages) ? this.total_pages : page_number;
		page_number = (page_number < 1) ? 1 : page_number;

		this.page = parseInt(page_number) || 1;
		
		this.footer.querySelector("input[type=radio]:nth-of-type("+this.page+")").checked = "checked";
		
		this.update_scope();
		this.querySelector("header>span.scope").innerHTML = this.scope_start + "-" + this.scope_end;

		var missing_results = new Array();
		for(var i=this.scope_start; i<this.scope_end+1; i++){
			missing_results.push(i);
		}
		
		for(var i=0; i<this.results.length; i++){
			
			var index = missing_results.indexOf(this.results[i].result_num);
			
			if(index != -1){
				missing_results.splice(index,1);
				this.results[i].element.dataset.showing = "true";
			}
			else{
				this.results[i].element.dataset.showing = "false";
			}
			
		}
		this.fetch_missing_results(missing_results)
	};
	
	this.fetch_missing_results = function(missing_results){
		
		var paginating_area = this;
		
		if(missing_results.length > 0){
			
			var url = "/?class=bb_one_pagination&method=get_results&global[fields][missing_results]="+missing_results.join();
			console.debug(url);
			
			ajaxDiv(paginating_area.results_area, url, "100px", true, function(){paginating_area.dataset.working="false";});
			this.dataset.working = "true";
			var ajax_preloader = this.results_area.appendChild(document.createElement("div"));
			ajax_preloader.className = "ajax_preloader";
		}
		
	};
	
	this.create_header 	= function(){
		
		var paginating_area = this;
		
		this.header = this.header || this.querySelector("header") || this.insertBefore(document.createElement("header"),this.results_area);
		
		var interact_section = this.header.appendChild(document.createElement("section"));
		
		this.scope_title = this.header.appendChild(document.createElement("span"));
		this.scope_title.className 						= "scope";
		this.scope_title.innerText						= "1-"+this.results_per_page;
		
		this.results_per_page_dropdown_title 			= interact_section.appendChild(document.createElement("button"));
		this.results_per_page_dropdown_title.innerText 	= this.results_per_page + " Per Page";
		this.results_per_page_dropdown_title.className  = "interact dropdown fa fa-sort";
		var dropdown = this.results_per_page_dropdown_title.appendChild(document.createElement("ul"));
		for(var i=0; i<Math.floor(this.total_results/this.results_per_page); i++){
			var radio_option 	= dropdown.appendChild(document.createElement("input"));
			radio_option.type	= "radio";
			radio_option.name	= this.id+"_results_per_page_option";
			radio_option.id		= radio_option.name+"_"+i;
			radio_option.value	= (i+1)*this.results_per_page;
			radio_option.checked = (radio_option.value==paginating_area.results_per_page) ? "checked" : "";
			radio_option.addEventListener("change",function(){
				paginating_area.results_per_page_dropdown_title.firstChild.nodeValue = this.value + " Per Page";
				paginating_area.update_meta_data({"results_per_page":this.value});
			},false);
			
			var option = dropdown.appendChild(document.createElement("label"));
			option.innerHTML = radio_option.value+" Per Page";
			option.setAttribute("for", radio_option.id);
		}
		var option = dropdown.appendChild(document.createElement("label"));
		option.innerHTML = "Show All";
		
		
		this.sort_results_dropdown_title 			= interact_section.appendChild(document.createElement("button"));
		this.sort_results_dropdown_title.innerText 	= "Sort By";
		this.sort_results_dropdown_title.className  = "interact dropdown fa fa-sort";
		var dropdown = this.sort_results_dropdown_title.appendChild(document.createElement("ul"));
		var sort_options = [
			{
				title:	"Name (A-Z)",
				category:	"name",
				direction:	"asc"
			},
			{
				title:	"Name (Z-A)",
				category:	"name",
				direction: 	"desc"
			},
			{
				title:	"Price (Low-High)",
				category:	"price",
				direction: 	"asc"
			},
			{
				title:	"Price (High-Low)",
				category:	"price",
				direction: 	"desc"
			},
			{
				title:	"Rating Highest",
				category:	"rating",
				direction: 	"desc"
			},
			{
				title:	"Rating Lowest",
				category:	"rating",
				direction: 	"asc"
			},
			{
				title:	"Recent",
				category:	"date",
				direction: 	"desc"
			}
		];
		for(var i=0; i<sort_options.length; i++){
			var radio_option 	= dropdown.appendChild(document.createElement("input"));
			radio_option.type 	= "radio";
			radio_option.name 	= this.id+"_sort_option";
			radio_option.id		= radio_option.name+"_"+i;
			radio_option.direction	= sort_options[i].direction;
			radio_option.category	= sort_options[i].category;
			radio_option.value		= sort_options[i].title;
			
			radio_option.addEventListener("change",function(){
				paginating_area.order({"direction":this.direction,"category":this.category});
				paginating_area.sort_results_dropdown_title.firstChild.nodeValue = this.value;
			},false);
			
			var option = dropdown.appendChild(document.createElement("label"));
			option.setAttribute("for",radio_option.id);
			option.innerText = sort_options[i].title;
		}
		
		var radio_view_name							= this.id + "_view";
		var list_view_radio							= interact_section.appendChild(document.createElement("input"));
		list_view_radio.type 						= "radio";
		list_view_radio.name						= radio_view_name;
		list_view_radio.id							= list_view_radio.name+"_list";
		list_view_radio.checked						= "checked";
		var list_view_label							= interact_section.appendChild(document.createElement("label"));
		list_view_label.className					= "interact fa fa-list-ul";
		list_view_label.setAttribute("for",list_view_radio.id);
		
		var grid_view_radio							= interact_section.appendChild(document.createElement("input"));
		grid_view_radio.type 						= "radio";
		grid_view_radio.name						= radio_view_name;
		grid_view_radio.id							= grid_view_radio+"_list";
		var grid_view_label							= interact_section.appendChild(document.createElement("label"));
		grid_view_label.className					= "interact fa fa-th-large";
		grid_view_label.setAttribute("for",grid_view_radio.id);

	}
	
	this.create_footer	= function(){
	
		var paginating_area = this;
		
		this.footer = this.querySelector("footer") || this.appendChild(document.createElement("footer"));
		this.footer.innerHTML = "";
		
		var pager_class = "interact";
		
		if(this.total_pages > 2){
			var go_to_first_page = this.footer.appendChild(document.createElement("button"));
			go_to_first_page.className = pager_class+" fa fa-angle-double-left";
			go_to_first_page.addEventListener("click",function(){paginating_area.go_to_page(1);},false);
		}
		
		if(this.total_pages > 1){
			var previous_page = this.footer.appendChild(document.createElement("button"));
			previous_page.className = pager_class+" fa fa-angle-left";
			previous_page.addEventListener("click",function(){var previous_page = parseInt(paginating_area.page)-1; paginating_area.go_to_page(previous_page);},false);
			previous_page.addEventListener("mousedown",	function(){this.focussing = setInterval(function(){var previous_page=parseInt(paginating_area.page)-1; paginating_area.go_to_page(previous_page);},300);},false);
			previous_page.addEventListener("mouseup",	function(){clearInterval(this.focussing);},false);
			previous_page.addEventListener("mouseout",	function(){clearInterval(this.focussing);},false);
		}
		
		for(var i=0; i<this.total_pages; i++){
			
			var pager_radio		= this.footer.appendChild(document.createElement("input"));
			pager_radio.type    = "radio";
			pager_radio.name 	= this.id + "_pager";
			pager_radio.value	= (i+1);
			pager_radio.id		= pager_radio.name+"_"+pager_radio.value;
			pager_radio.addEventListener("change",function(){paginating_area.go_to_page(this.value);},false);
			
			var pager       = this.footer.appendChild(document.createElement("label"));
			pager.className = pager_class;
			pager.setAttribute("for",pager_radio.id);
		}
		
		
		if(this.total_pages > 1){
			var next_page = this.footer.appendChild(document.createElement("button"));
			next_page.className = pager_class+" fa fa-angle-right";
			next_page.addEventListener("click",function(){var next_page = parseInt(paginating_area.page)+1; paginating_area.go_to_page(next_page);},false);
			next_page.addEventListener("mousedown",	function(){this.focussing = setInterval(function(){var page=parseInt(paginating_area.page); paginating_area.go_to_page(page+1);},300);},false);
			next_page.addEventListener("mouseup",	function(){clearInterval(this.focussing);},false);
			next_page.addEventListener("mouseout",	function(){clearInterval(this.focussing);},false);
		}
		
		if(this.total_pages > 2){
			var go_to_last_page = this.footer.appendChild(document.createElement("button"));
			go_to_last_page.className = pager_class+" fa fa-angle-double-right";
			go_to_last_page.addEventListener("click",function(){paginating_area.go_to_page(paginating_area.total_pages);},false);	
		}
	};
	
	this.capture_results = function(){
		
		this.results = new Array();
		
		var valid_results = this.results_area.querySelectorAll("[data-result_num]");
		
		for(var i=0; i<valid_results.length; i++){
			
			var result = new Object();
			
			result.element 	= valid_results[i];
			
			result.name		= valid_results[i].dataset.name;
			
			result.price	= isNaN(parseFloat(valid_results[i].dataset.price)) ? 0 : parseFloat(valid_results[i].dataset.price);
			
			result.date		= isNaN(Date.parse(valid_results[i].dataset.date)) ? 0 : Date.parse(valid_results[i].dataset.date);
			
			result.rating	= isNaN(parseFloat(valid_results[i].dataset.rating)) ? 0 : parseFloat(valid_results[i].dataset.rating);
			
			result.result_num = parseInt(valid_results[i].dataset.result_num);
			this.results.push(result);
		}
		
	};
	
	this.order			= function(param){
		
		param = (typeof param !== "object") ? {} : param;

		var order = param["category"]+"-"+param["direction"];
		
		switch(order){
			case "name-asc":					
			this.results.sort(function(a,b){
				var name_a = a.name.toLowerCase(); name_b = b.name.toLowerCase();
										
				if(name_a < name_b)
					return -1;
				else
					return 1;
					
				return 0;
			});
			break;
			
			case "name-desc":
			this.results.sort(function(a,b){
				var name_a = a.name.toLowerCase(); name_b = b.name.toLowerCase();
										
				if(name_b < name_a)
					return -1;
				else
					return 1;
					
				return 0;
			});
			break;
			
			case "price-asc":
			this.results.sort(function(a,b){
				return a.price - b.price;
			});
			break;
			
			case "price-desc":
			this.results.sort(function(a,b){
				return b.price - a.price;
			});
			break;
			
			case "rating-asc":
			this.results.sort(function(a,b){
				return a.rating - b.rating;
			});
			break;
			
			case "rating-desc":
			this.results.sort(function(a,b){
				return b.rating - a.rating;
			});
			break;
			
			
			case "date-asc":
			this.results.sort(function(a,b){
				return a.date - b.date;
			});
			break;
			
			case "date-desc":
			this.results.sort(function(a,b){
				return b.date - a.date;
			});
			break;
			
			default:
			this.results.sort(function(a,b){
				return a.result_num - b.result_num;
			});
		}
					
		for(var i=0; i<this.results.length; i++){
			this.results_area.removeChild(this.results[i].element);
		}
					
		for(var i=0; i<this.results.length; i++){
			this.results_area.appendChild(this.results[i].element);
		}
	};
	
	this.initialize 	= function(){
		
		this.id						= this.id || "pagination_"+Math.ceil((Math.random()*100));
		this.className 		   	   += (this.className.indexOf("pagination") == -1) ? " pagination" : "";
		this.sql_id					= this.dataset.sql_id;
		
		var initial_results			= this.innerHTML;
		this.innerHTML = "";
		
		var working_mask			= this.appendChild(document.createElement("div"));
		working_mask.className		= "working_mask";
		
		this.results_area 			= this.appendChild(document.createElement("div"));
		this.results_area.className	= "results_area";
		this.results_area.innerHTML = initial_results;
		
		this.capture_results();
		this.order();
		
		this.update_meta_data(); //implies this.create_footer();
		
		this.create_header();
		this.go_to_page(1);
	}
	
	this.initialize();
};

HTMLTableElement.prototype.paginate = function(){
	
	this.update_scope 	= function(param){
		
		if(this.parentNode){
			this.parentNode.dataset.working = "true";
		}
		else{
			this.dataset.working = "true";
		}
		this.capture_results();
		
		param 			= (typeof param !== "object") ? {} : param;
		
		this.page		= param.page || this.page || 1;
		this.page 		= this.page > this.total_pages ? this.total_pages : this.page;
		
		this.scope_start	= ((this.page-1)*this.results_per_page)+1;
		this.scope_end 		= param.scope_end || (this.page*this.results_per_page);
		this.scope_end 		= (this.scope_end > this.total_results) ? this.total_results : this.scope_end;
		
		this.parentNode.parentNode.querySelector("div.widget-title>h4>span.scope").innerHTML = this.scope_end > 0 ? (this.scope_start + "-" + this.scope_end + "/"+this.total_results) : '';
		
		var missing_results = new Array();
		for(var j=this.scope_start-1; j<this.scope_end; j++){
			missing_results.push(j+1);
		}
		
		for(var j=0; j<this.results.length; j++){
			var index = missing_results.indexOf(this.results[j].result_num);
			
			if(index != -1){
				missing_results.splice(index,1);
				this.results[j].element.dataset.showing="true";
			}
			else{
				this.results[j].element.dataset.showing="false";
			}
		}
		
		if(missing_results.length > 0){
			var ajax_url = "";
			for(var j=0; j<missing_results.length; j++){
				ajax_url += "&global[fields][result_numbers][]="+missing_results[j];
			}
			
			var apr = this.tBodies[0].insertRow();
			var aprc = apr.insertCell();
			aprc.style.textAlign = "center";
			aprc.setAttribute("colspan",table.querySelectorAll("thead>tr>th").length);
			
			aprc.innerHTML = '<div style="width:100%; height:100%;background-repeat:no-repeat; background-position:center; background-size:50px; min-width:50px; min-height:50px; display:block; background-image:url(data:image/svg+xml;base64,PHN2ZyBpZD0ibG9hZGluZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwYWZmMCI+CiAgPHBhdGggb3BhY2l0eT0iLjEiIGQ9Ik0xNCAwIEgxOCBWOCBIMTQgeiIgdHJhbnNmb3JtPSJyb3RhdGUoMCAxNiAxNikiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89Ii4xIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAiLz4KICA8L3BhdGg+CiAgPHBhdGggb3BhY2l0eT0iLjEiIGQ9Ik0xNCAwIEgxOCBWOCBIMTQgeiIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMTYgMTYpIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIuMSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjEyNXMiLz4KICA8L3BhdGg+CiAgPHBhdGggb3BhY2l0eT0iLjEiIGQ9Ik0xNCAwIEgxOCBWOCBIMTQgeiIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgMTYgMTYpIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIuMSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjI1cyIvPgogIDwvcGF0aD4KICA8cGF0aCBvcGFjaXR5PSIuMSIgZD0iTTE0IDAgSDE4IFY4IEgxNCB6IiB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIuMSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjM3NXMiLz4KICA8L3BhdGg+CiAgPHBhdGggb3BhY2l0eT0iLjEiIGQ9Ik0xNCAwIEgxOCBWOCBIMTQgeiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iLjEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC41cyIvPgogIDwvcGF0aD4KICA8cGF0aCBvcGFjaXR5PSIuMSIgZD0iTTE0IDAgSDE4IFY4IEgxNCB6IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgMTYgMTYpIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIuMSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjY3NXMiLz4KICA8L3BhdGg+CiAgPHBhdGggb3BhY2l0eT0iLjEiIGQ9Ik0xNCAwIEgxOCBWOCBIMTQgeiIgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iLjEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC43NXMiLz4KICA8L3BhdGg+CiAgPHBhdGggb3BhY2l0eT0iLjEiIGQ9Ik0xNCAwIEgxOCBWOCBIMTQgeiIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDE2IDE2KSI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iLjEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC44NzVzIi8+CiAgPC9wYXRoPgo8L3N2Zz4K);"></div>';
			
			var table = this;
			
			$.ajax({
				url: "/?class=bb_one_pagination&method=get_table_results&global[ajax]=true&global[fields][sqlISbb_one_paginationID]="+this.sql_id+ajax_url,
				type: "POST",
				processData: false,
				contentType: false,
				success: function(data){
					
					table.tBodies[0].removeChild(apr);
					var temp = document.createElement("table");
					temp.innerHTML = data;
					var rows = temp.querySelectorAll("tr");
					
					for(var i=0; i<rows.length; i++){
						table.tBodies[0].appendChild(rows[i]);
					}
					
					table.capture_results();
					table.order();
					table.parentNode.dataset.working = "false";
					
				}
			});
		}
		else{
			table.parentNode.dataset.working = "false";
		}
		
		this.update_footer();
	};
	
	this.delete_row = function(button){
						
		this.parentNode.dataset.working = "true";
			
		var row = button.parentNode.parentNode;
		row.style.height = window.getComputedStyle(row).height;
		button.className 		+= " ajax_preloader";
		button.dataset.type 	= "circular";
		var url = button.dataset.url + "&global[ajax]=true&global[noincludes]=true&global[redirect]=https%3A%2F%2Fwww.one.om%2F%3Fclass%3Dbb_one_templates%26method%3Dviewlist%26global%5Bnoincludes%5D%3Drawtext";
		
		var table = this;
		$.ajax({
			url: url,
			type: 'POST',
			processData: false,
			contentType: false,
			success: function(data){
				
				for(var j=0; j<row.cells.length; j++){
					row.cells[j].style.opacity = 0;
					row.cells[j].style.display = "none";
				}
				
				row.style.height = "0px";
				
				setTimeout(function(){
					var next_row_sibling = row.nextElementSibling;
					while(next_row_sibling){
						next_row_sibling.dataset.result_num = parseInt(next_row_sibling.dataset.result_num) - 1;
						next_row_sibling.cells[0].innerHTML = parseInt(next_row_sibling.cells[0].innerHTML) - 1;
						next_row_sibling = next_row_sibling.nextElementSibling;
					}
					
					table.tBodies[0].removeChild(row);
					
					table.total_results = table.total_results - 1;
					table.update_scope();
				},100);
				
			}
		});
	};
	
	this.update_footer = function(){
		
		var table = this;
		
		if(this.total_results == 0){
			this.removeChild(this.tHead);
			this.tBodies[0].insertRow();
			this.tBodies[0].rows[0].insertCell();
			this.tBodies[0].rows[0].cells[0].innerHTML = "No " + this.results_category;
			this.parentNode.parentNode.querySelector("div.widget-title>h4>span.scope").innerHTML ="";
			this.deleteTFoot();
			return;
		}
		
		if(this.total_pages < 2){return;}
  
		this.tfoot 					= this.tfoot || this.appendChild(document.createElement("tfoot"));
		this.tfoot.rows[0]			= this.tfoot.rows[0] || this.tfoot.insertRow();
		this.tfoot.rows[0].cells[0]	= this.tfoot.rows[0].cells[0] || this.tfoot.rows[0].insertCell();
		this.tfoot.rows[0].cells[0].innerHTML = "";
		this.tfoot.rows[0].cells[0].setAttribute("colspan",this.tHead.rows[0].cells.length);				
		
		var scope_info = this.tfoot.rows[0].cells[0].appendChild(document.createElement("span"));
		scope_info.className = "scope full";					
		
		this.querySelector("tfoot>tr>td>span.scope.full").innerHTML = (this.scope_start==1 && this.scope_end==this.total_results) ? "All" : this.scope_start + "-" +this.scope_end+ " of " + this.total_results + " " + this.results_category;
		
		
		if(this.total_pages > 2){
			var button 			= this.tfoot.rows[0].cells[0].appendChild(document.createElement("button"));
			button.innerText	= "<<";
			button.className  = "pager";
			button.addEventListener("click",function(){table.update_scope({page:1});},false);
		}
		
		var button 			= this.tfoot.rows[0].cells[0].appendChild(document.createElement("button"));
		button.innerText 	= "<";
		button.className  = "pager";
		button.addEventListener("click",function(){table.update_scope({page:table.page-1});},false);

		var selected_pager;
		for(var j=0; j<this.total_pages; j++){
			var pager		= this.tfoot.rows[0].cells[0].appendChild(document.createElement("label"));
			pager.className  = "pager";
			
			var toggler 	= pager.appendChild(document.createElement("input"));
			toggler.type 	= "radio";
			toggler.name 	= "(#table_id#)_pagination";
			toggler.value	= j+1;
			
			toggler.checker = (this.page == toggler.value) ? true : null
			if(this.page == toggler.value){
			   toggler.checked = true;
			   selected_pager = pager;
			}
			
			
			toggler.addEventListener("change",function(){table.update_scope({page:this.value});},false);
			
			var pager_text = pager.appendChild(document.createElement("span"));
			pager_text.innerHTML = j+1;
			
		}
	
		var previous_sib = selected_pager.previousElementSibling;
		if(previous_sib && previous_sib.tagName == "LABEL"){
		 
			if(parseInt(previous_sib.innerText)>4 && parseInt(previous_sib.innerText)<=(this.total_pages-2)){
				previous_sib.className += " overflow_pages previous";
			}
		 
		}
  
		var next_sib = selected_pager.nextElementSibling;
		if(next_sib && next_sib.tagName == "LABEL"){
		 
			if(parseInt(next_sib.innerText)<(this.total_pages-3) && parseInt(next_sib.innerText)>=3){
				next_sib.className += " overflow_pages next";
			}
			
		}
		
		var button 			= this.tfoot.rows[0].cells[0].appendChild(document.createElement("button"));
		button.innerText 	= ">";
		button.className  = "pager";
		button.addEventListener("click",function(){table.update_scope({page:table.page+1});},false);
		
		if(this.total_pages > 2){
			var button 			= this.tfoot.rows[0].cells[0].appendChild(document.createElement("button"));
			button.innerText 	= ">>";
			button.className  = "pager";
			button.addEventListener("click",function(){table.update_scope({page:table.total_pages});},false);
		}
	};
	
	this.capture_results = function(){
		this.results = new Array();
		
		var results = this.querySelectorAll("tbody>tr[data-result_num]");
		for(var j=0; j<results.length; j++){
			var result = new Object();
			result.element = results[j];
			result.result_num = parseInt(results[j].dataset.result_num);
			this.results.push(result);
			
			var delete_row_button = result.element.querySelector("button.icon-trash:not([data-delete_set=true])");
			if(delete_row_button){
				delete_row_button.addEventListener("click",function(){
					table.delete_row(this);
				},false);
				delete_row_button.dataset.delete_set = "true";
			}
		}
	};
	
	this.order	= function(param){
						
		this.results.sort(function(a,b){
			return a.result_num - b.result_num;
		});
		
		for(var j=0; j<this.tBodies[0].rows.length; j++){
			this.tBodies[0].removeChild(this.tBodies[0].rows[j]);
		}
		
		for(var j=0; j<this.results.length; j++){
			this.tBodies[0].appendChild(this.results[j].element);
		}
	};
	
	this.show_all = function(){
		
		for(var j=1; j<this.total_pages+1; j++){
			//pending todo
		}
		
	};
	
	this.sql_id 			= this.dataset.sql_id;
	this.total_results 		= parseInt(this.dataset.total_results) || 0;
	
	if(!this.tHead){
		this.appendChild(document.createElement("thead"));
	}
	if(this.tBodies.length < 1){
		this.appendChild(document.createElement("tbody"));
	}
	this.results_per_page 	= this.tBodies[0].querySelectorAll("tr").length;
	this.total_pages 		= Math.ceil(this.total_results / this.results_per_page) || 0;
	this.results_category	= this.dataset.results_category || "Items";
	this.update_scope();
	
};

document.addEventListener("DOMContentLoaded",function(){
	for(var pagination_areas = document.querySelectorAll("div.pagination:not([data-total_results='']):not([data_sql_id=''])"), i=0; i<pagination_areas.length; i++){pagination_areas[i].paginate();}
},false);
