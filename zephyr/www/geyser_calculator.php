<?php
require_once("defaults/defaults.php");

?>

<html>
	<head>
		<title>Geyser Calculator</title>
		<style>
			
		</style>
		<script>
var manufacturers = new Array();
var manufacturer = new Object();
manufacturer.name = "Agrinet";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Allied";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Ariston";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Barlow";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Butterworth";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "C.I. Fuchs";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Castle";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "City Hot";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "City Heat";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Cobra";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Combination";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Copperline";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Direct Solar";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Dolphin";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Domestic";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Dominox";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Duratherm";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Econo Flo Dual Mark II";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Econo Flo Dual 1000";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "EE Geyser";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Eezy Heat";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "ElektraSol";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Elgin Ball Valve";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Everlast";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Empco";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Fanleer";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Fibalogic";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Fragram";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Frank-G";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Franke geysers";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Franke Slimline";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Franke Standard";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Frumex Gravity";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Fucho";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "G-Tech";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Gap";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Gaswic";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "GAT";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Genalex";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Heat Tech";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Hot O Geyser";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "HydroFlo";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Inderect Solar";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Junker Gas Geyser";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "K.I.C.";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Kinheat";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "KwikHeat";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Kwikot";
manufacturer.models = new Array();
manufacturers.push(manufacturer);


var manufacturer = new Object();
manufacturer.name = "Kwikot Mega";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Kwikot Prisma";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Kwikot Solar";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "KwikSol";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "LongLife";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Mach II";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Mark I";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Mega-Hot";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "MegaFlo";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "MegaFlo Dual Mark II";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "MegaFlo i Dual";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Old Kwikot Geyser";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Primeg";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Rapidot";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Roz-Heat";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Ryalco";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "S.A.G.";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Sadia";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "SemiPressure";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Slimline";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Solar";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Solar Beam";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Staffor";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Steelbrite";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Sunnex";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "SupaFlo";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "SupaHot";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Techron";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Trence Geyser";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Tricon";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Tru-Heat";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Van Leer";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "W.A.K.";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Wayn Hot";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "We Geyser";
manufacturer.models = new Array();
manufacturers.push(manufacturer);

var manufacturer = new Object();
manufacturer.name = "Westvaal";
manufacturer.models = new Array();
manufacturers.push(manufacturer);


var manufacturers_dropdown;
document.addEventListener("DOMContentLoaded",function(){

manufacturers_dropdown = document.querySelector("select[name=manufacturers]");
for(var i=0; i<manufacturers.length; i++){
var group = document.createElement("optgroup");
group.label = manufacturers[i].name;
manufacturers_dropdown.appendChild(group);
}
		
},false);
		</script>
	</head>
	<body>
		<div class="geyser_calculator">
<div class="lcd"></div>
<select name="manufacturers"></select>
</div>
	</body>
</html>