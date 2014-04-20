//highlighting of columns

document.addEventListener("DOMContentLoaded",function(){

var tables = document.getElementsByTagName("table");
for(var i=0; i<tables.length; i++)
{
	var columns = [];
	
	if(window[tables[i].dataset.source] instanceof Array)
	{
		for(var j=0; j<window[tables[i].dataset.source].length; j++)
		{
			for(column in window[tables[i].dataset.source][j])
			{columns.indexOf(column)== -1 ? columns.push(column) : null;}
		}
		
			
		var head = tables[i].appendChild(tables[i].createTHead());
		var head_row = head.insertRow(-1);
		for(var j=0; j<columns.length; j++)
		{
			var cell = head_row.appendChild(document.createElement("th"));
			cell.innerHTML = columns[j];
			cell.dataset.column = columns[j];
		}
		
		var table_body = tables[i].appendChild(document.createElement("tbody"));
		
		for(var j=0; j<window[tables[i].dataset.source].length; j++)
		{
			var row = tables[i].tBodies[0].insertRow(-1);
			for(var k=0; k<columns.length; k++)
			{
				var cell = row.insertCell(-1);
				cell.dataset.column = columns[k];
				
				if(window[tables[i].dataset.source][j][columns[k]] == undefined)
				{
					
				}
				else if(window[tables[i].dataset.source][j][columns[k]].toString().indexOf("http://") == 0 || window[tables[i].dataset.source][j][columns[k]].toString().indexOf("http://") == 0)
				{
					cell.innerHTML = "<a href="+window[tables[i].dataset.source][j][columns[k]]+">website</a>";
				}
				else if(window[tables[i].dataset.source][j][columns[k]] == true || window[tables[i].dataset.source][j][columns[k]] == false)
				{
					cell.innerHTML = "<input type=checkbox "+(window[tables[i].dataset.source][j][columns[k]] ? "checked" : null)+" disabled>";
				}
				else
				{
					cell.innerHTML = window[tables[i].dataset.source][j][columns[k]];
				}
			}
		}	
	}
	else if(window[tables[i].dataset.source] instanceof Object)
	{
		columns.push("");
		for(row in window[tables[i].dataset.source])
		{
			for(column in window[tables[i].dataset.source][row])
			{columns.indexOf(column)==-1 ? columns.push(column): null;}
		}
		
			
		var head = tables[i].appendChild(tables[i].createTHead());
		var head_row = head.insertRow(-1);
		for(var j=0; j<columns.length; j++)
		{
			var cell = head_row.appendChild(document.createElement("th"));
			cell.innerHTML = columns[j];
		}
		
		var table_body = tables[i].createTBody();
		
		for(key in window[tables[i].dataset.source])
		{
			var row = tables[i].tBodies[0].insertRow(-1);
			row.dataset.row = key;
			var head_cell = row.insertCell(-1);
			head_cell.dataset.column = 'key';
			head_cell.innerHTML = key;
			
			for(var j=1; j<columns.length; j++)
			{
				var cell = row.insertCell(-1);
				cell.dataset.column = columns[j];
				
				if(window[tables[i].dataset.source][key][columns[j]] == undefined)
				{
						
				}
				else if(window[tables[i].dataset.source][key][columns[j]] .toString().indexOf("http://") == 0 || window[tables[i].dataset.source][key][columns[j]] .toString().indexOf("http://") == 0)
				{
					cell.innerHTML = "<a target=_blank href="+window[tables[i].dataset.source][key][columns[j]] +">website</a>";
				}
				else if(window[tables[i].dataset.source][key][columns[j]] == true || window[tables[i].dataset.source][key][columns[j]] == false)
				{
					cell.innerHTML = "<input type=checkbox "+(window[tables[i].dataset.source][key][columns[j]] ? "checked" : null)+" disabled>";
				}
				else
				{
					cell.innerHTML = window[tables[i].dataset.source][key][columns[j]];
				}
			}
		}	
	}
}

},false);
