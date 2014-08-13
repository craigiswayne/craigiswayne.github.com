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
			
			//ajaxDiv(paginating_area.results_area, url, "100px", true, function(){paginating_area.dataset.working="false";});
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

document.addEventListener("DOMContentLoaded",function(){
	for(var pagination_areas = document.querySelectorAll("div.pagination:not([data-total_results='']):not([data_sql_id=''])"), i=0; i<pagination_areas.length; i++){pagination_areas[i].paginate();}
},false);
