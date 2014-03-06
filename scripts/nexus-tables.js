document.addEventListener("DOMContentLoaded",function(){

var tables = document.getElementsByTagName("table");

for(var i=0; i<tables.length; i++)
{
	var columns = [];
	for(var j=0; j<bluetooth_mice.length; j++)
	{
		for(column in bluetooth_mice[j])
		{columns.indexOf(column)== -1 ? columns.push(column) : null;}
	}
	
	var head = tables[i].appendChild(tables[i].createTHead());
	var head_row = head.insertRow(-1);
	for(var j=0; j<columns.length; j++)
	{
		var cell = head_row.insertCell(-1);
		cell.innerHTML = columns[j];
	}
	
	var table_body = tables[i].createTBody();
	for(var j=0; j<bluetooth_mice.length; j++)
	{
		var row = tables[i].tBodies[0].insertRow(-1);
		for(var k=0; k<columns.length; k++)
		{
			var cell = row.insertCell(-1);
			switch(bluetooth_mice[j][columns[k]])
			{
				case undefined:
				{
					break;
				}
				case true:
				{
					cell.innerHTML = "<input type=checkbox checked=true disabled>";
					break;
				}
				case false:
				{
					cell.innerHTML = "<input type=checkbox checked=false disabled>";
					break;
				}
				default:
				{
					cell.innerHTML = bluetooth_mice[j][columns[k]]=bluetooth_mice[j][columns[k]];
				}
			}
		}
	}
}

},false);
