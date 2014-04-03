jQuery(document).ready(function($j) {
	$j('.seliconset div').click(function() {
	chck = $j(this).hasClass("active");
	if(!chck){
	$j("#iconswpbyjboncc_results").show();
	$j("#iconswpbyjboncc_settings").hide(); 
	$j("#iconswpbyjboncc_results_shortcode").html("");
	$j(this).addClass("active");
	$j(this).siblings().removeClass("active");
	$j(this).siblings().find('#iconswpbyjboncc_loading').hide();
	id = $j(this).attr("id");
	$j(this).find('#iconswpbyjboncc_loading').show();
	//	$j('#iconswpbyjboncc_submit').attr('disabled', true);
	//	v = $j("#seliconset").val();	
	v = id;
	data = {
		selicon: v,
		action: 'iconswpbyjboncc_get_results',
      	iconswpbyjboncc_nonce: iconswpbyjboncc_vars.iconswpbyjboncc_nonce
      };

     	$j.post(ajaxurl, data, function (response,v) {
//		alert(id);
			$j('#iconswpbyjboncc_results').html(response);
//			$j('#iconswpbyjboncc_loading').hide();
			$j(".seliconset .active .waiting").hide();
			$j(".iconswpbyjboncc_shortcodebutton").removeClass("iconswpbyjboncc_hidethis");
//			$j('#iconswpbyjboncc_submit').attr('disabled', false);
		});	
	}	
		return false;
	});

});


$j(document).on('click', " #iconswpbyjboncc_applydefault", function () {
		$j('#iconswpbyjboncc_applydefault_loading').show();
		$j('#iconswpbyjboncc_results_applydefault').html("");
		updatestrdef = iconswpbyjboncc_applydefault();
    data = {
		updatestr: updatestrdef,
		action: 'iconswpbyjboncc_get_results_applydefault',
      	iconswpbyjboncc_nonce: iconswpbyjboncc_vars.iconswpbyjboncc_nonce
      };
		$j.post(ajaxurl, data, function (response) {
		$j('#iconswpbyjboncc_results_applydefault').html(response);
		$j('#iconswpbyjboncc_applydefault_loading').hide();
		});	
	return false;
});
	


	
$j(document).on('click', "#iconswpbyjboncc_shortcode", function () {
code = ""; inc = 0;
$j(".vi_active").each(function(){ 
inc++;
code += $j(this).attr('alt') + " | ";
});
if(inc == 0){ alert("Please select some icons first from above!");} else {
		$j('#iconswpbyjboncc_loading_shortcode').show();
		$j('#iconswpbyjboncc_shortcode').attr('disabled', true);

  //alert(code);
    data = {
		selcode: code,
		action: 'iconswpbyjboncc_get_results_shortcode',
      	iconswpbyjboncc_nonce: iconswpbyjboncc_vars.iconswpbyjboncc_nonce
      };

		$j.post(ajaxurl, data, function (response) {
			$j('#iconswpbyjboncc_results_shortcode').html(response);
			iconswpbyjboncc_loadsettings();		
			$j('#iconswpbyjboncc_loading_shortcode').hide();
			$j('#iconswpbyjboncc_settings').show();
			$j('#iconswpbyjboncc_shortcode').attr('disabled', false);
		});	
	}	
		return false;

});
/*	
$j(document).on('change', " #iconswpbyjboncc_size, #iconswpbyjboncc_hoversize, #iconswpbyjboncc_padding, #iconswpbyjboncc_hoverpadding, #iconswpbyjboncc_color, #iconswpbyjboncc_hovercolor, #iconswpbyjboncc_bgcolor1, #iconswpbyjboncc_hoverbgcolor1, #iconswpbyjboncc_bgcolor2, #iconswpbyjboncc_hoverbgcolor2, #iconswpbyjboncc_borderwidth, #iconswpbyjboncc_borderradius, #iconswpbyjboncc_bordercolor , #iconswpbyjboncc_borderstyle , #iconswpbyjboncc_hasbg , #iconswpbyjboncc_onhover ", function () {
iconswpbyjboncc_loadsettings();
return false;
});
	
$j(document).on('keyup', " #iconswpbyjboncc_size, #iconswpbyjboncc_hoversize, #iconswpbyjboncc_padding, #iconswpbyjboncc_hoverpadding, #iconswpbyjboncc_color, #iconswpbyjboncc_hovercolor, #iconswpbyjboncc_bgcolor1, #iconswpbyjboncc_hoverbgcolor1, #iconswpbyjboncc_bgcolor2, #iconswpbyjboncc_hoverbgcolor2, #iconswpbyjboncc_borderwidth, #iconswpbyjboncc_borderradius, #iconswpbyjboncc_bordercolor , #iconswpbyjboncc_borderstyle , #iconswpbyjboncc_hasbg , #iconswpbyjboncc_onhover ", function () {
iconswpbyjboncc_loadsettings();
return false;
});
*/

$j(document).on('click', " #iconswpbyjboncc_addbutton", function () {
$j("#popup_container").show();
$j(".iconswpjboncc_addpagebg").show();
return false;
});

$j(document).on('click', ".iconsbox_close", function () {
$j("#popup_container").hide();
$j(".iconswpjboncc_addpagebg").hide();
return false;
});

$j(document).on('click', ".iconswpjboncc_addpagebg", function () {
$j("#popup_container").hide();
$j(".iconswpjboncc_addpagebg").hide();
return false;
});



$j(document).on('click', " #iconswpbyjboncc_applystyle", function () {
iconswpbyjboncc_loadsettings();
return false;
});

$j(document).on('click', " #iconswpbyjboncc_insert", function () {
getfont = $j(this).attr("alt");
//alert(getfont);
shortcode = $j(".vicode .ins"+getfont+"").html();
//alert(shortcode);
			// inserts the shortcode into the active editor
			tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
			alert("Inserted successfully!");
			return false;
});



function iconswpbyjboncc_applydefault()
{
size = $j('#iconswpbyjboncc_size').val();
padding = $j('#iconswpbyjboncc_padding').val();
hoversize = $j('#iconswpbyjboncc_hoversize').val();
hoverpadding = $j('#iconswpbyjboncc_hoverpadding').val();

color = $j('#iconswpbyjboncc_color').val();
hovercolor = $j('#iconswpbyjboncc_hovercolor').val();
onhover = $j('#iconswpbyjboncc_onhover').val();
bgtype = "";
if($j("#iconswpbyjboncc_hasbgnone").is(':checked')){ bgtype = "none";}
if($j("#iconswpbyjboncc_hasbgcolor").is(':checked')){bgtype = "color";}
if($j("#iconswpbyjboncc_hasbggradient").is(':checked')){ bgtype = "gradient";}

bgcolor1 = $j('#iconswpbyjboncc_bgcolor1').val();
hoverbgcolor1 = $j('#iconswpbyjboncc_hoverbgcolor1').val();
bgcolor2 = $j('#iconswpbyjboncc_bgcolor2').val();
hoverbgcolor2 = $j('#iconswpbyjboncc_hoverbgcolor2').val();

borderwidth = $j('#iconswpbyjboncc_borderwidth').val();
borderradius = $j('#iconswpbyjboncc_borderradius').val();
bordercolor = $j('#iconswpbyjboncc_bordercolor').val();
borderstyle = $j('#iconswpbyjboncc_borderstyle').val();

align = $j('#iconswpbyjboncc_align').val();
margintop = $j('#iconswpbyjboncc_margintop').val(); if(margintop == ""){margintop = "0px";}
marginright = $j('#iconswpbyjboncc_marginright').val(); if(marginright == ""){marginright = "0px";}
marginbottom = $j('#iconswpbyjboncc_marginbottom').val(); if(marginbottom == ""){marginbottom = "0px";}
marginleft = $j('#iconswpbyjboncc_marginleft').val(); if(marginleft == ""){marginleft = "0px";}

updatestr = "iconswpbyjboncc_size="+size+";iconswpbyjboncc_hoversize="+hoversize+";iconswpbyjboncc_padding="+padding+";iconswpbyjboncc_hoverpadding="+hoverpadding+";iconswpbyjboncc_color="+color+";iconswpbyjboncc_hovercolor="+hovercolor+";iconswpbyjboncc_onhoverdef="+onhover+";iconswpbyjboncc_hasbgdef="+bgtype+";iconswpbyjboncc_bgcolor1="+bgcolor1+";iconswpbyjboncc_bgcolor2="+bgcolor2+";iconswpbyjboncc_hoverbgcolor1="+hoverbgcolor1+";iconswpbyjboncc_hoverbgcolor2="+hoverbgcolor2+";iconswpbyjboncc_borderwidth="+borderwidth+";iconswpbyjboncc_bordercolor="+bordercolor+";iconswpbyjboncc_borderstyledef="+borderstyle+";iconswpbyjboncc_borderradius="+borderradius+";iconswpbyjboncc_aligndef="+align+";iconswpbyjboncc_margintop="+margintop+";iconswpbyjboncc_marginright="+marginright+";iconswpbyjboncc_marginleft="+marginleft+";iconswpbyjboncc_marginbottom="+marginbottom+"";

return updatestr;
}


	
function iconswpbyjboncc_loadsettings()
{
$j(".iconsscthis").show();
$j(".iconshtmlthis").hide();

$j(".cciconstoggle").each(function(){
chck = $j(this).hasClass("showhtml");
if(!chck){
$j(this).addClass("showhtml"); 
$j(this).val("HTML code");
}
});

size = $j('#iconswpbyjboncc_size').val();
padding = $j('#iconswpbyjboncc_padding').val();
hoversize = $j('#iconswpbyjboncc_hoversize').val();
hoverpadding = $j('#iconswpbyjboncc_hoverpadding').val();

color = $j('#iconswpbyjboncc_color').val(); if(color == ""){color = "transparent";}
hovercolor = $j('#iconswpbyjboncc_hovercolor').val(); if(hovercolor == ""){hovercolor = "transparent";}

bgcolor1 = $j('#iconswpbyjboncc_bgcolor1').val(); if(bgcolor1 == ""){bgcolor1 = "transparent";}
hoverbgcolor1 = $j('#iconswpbyjboncc_hoverbgcolor1').val(); if(hoverbgcolor1 == ""){hoverbgcolor1 = "transparent";}
bgcolor2 = $j('#iconswpbyjboncc_bgcolor2').val(); if(bgcolor2 == ""){bgcolor2 = "transparent";}
hoverbgcolor2 = $j('#iconswpbyjboncc_hoverbgcolor2').val(); if(hoverbgcolor2 == ""){hoverbgcolor2 = "transparent";}

borderwidth = $j('#iconswpbyjboncc_borderwidth').val();
borderradius = $j('#iconswpbyjboncc_borderradius').val();
bordercolor = $j('#iconswpbyjboncc_bordercolor').val(); if(bordercolor == ""){bordercolor = "transparent";}
borderstyle = $j('#iconswpbyjboncc_borderstyle').val();

hasbg = 0; nobg = 1; bgtype = "";
if($j("#iconswpbyjboncc_hasbgnone").is(':checked')){ bgtype = "none";}
if($j("#iconswpbyjboncc_hasbgcolor").is(':checked')){bgtype = "color";}
if($j("#iconswpbyjboncc_hasbggradient").is(':checked')){ bgtype = "gradient";}
//alert(bgtype);

onhover = $j('#iconswpbyjboncc_onhover').val();

align = $j('#iconswpbyjboncc_align').val();
margintop = $j('#iconswpbyjboncc_margintop').val(); if(margintop == ""){margintop = "0px";}
marginright = $j('#iconswpbyjboncc_marginright').val(); if(marginright == ""){marginright = "0px";}
marginbottom = $j('#iconswpbyjboncc_marginbottom').val(); if(marginbottom == ""){marginbottom = "0px";}
marginleft = $j('#iconswpbyjboncc_marginleft').val(); if(marginleft == ""){marginleft = "0px";}

alignstyle = "";
if(align != "none"){
if(align == "left"){alignstyle = "position:relative;left:0%;";}
if(align == "right"){alignstyle = "position:relative;right:0%;float:right;";}
if(align == "centre"){alignstyle = "position:relative;left:50%;";}
}

marginstyle = " margin:"+margintop+" "+marginright+" "+marginbottom+" "+marginleft+"; ";


/********Manage size , padding and colors**********/
$j(".iconbox2 span.vi").css({"color":color,"font-size":size,"padding":padding});
if(bgtype == "color"){$j(".iconbox2 span.vi").css({"background":bgcolor1});}
else if(bgtype == "gradient"){ 
$j(".iconbox2 span.vi").css('background', '-webkit-gradient(linear,left top,left bottom,from('+bgcolor1+'),to('+bgcolor2+'))'); 
$j(".iconbox2 span.vi").css('background', '-webkit-linear-gradient(top, '+bgcolor1+', '+bgcolor2+')');
$j(".iconbox2 span.vi").css('background', '-moz-linear-gradient(top, '+bgcolor1+', '+bgcolor2+')'); 
$j(".iconbox2 span.vi").css('background', '-ms-linear-gradient(top, '+bgcolor1+', '+bgcolor2+')');
$j(".iconbox2 span.vi").css('background', '-o-linear-gradient(top, '+bgcolor1+', '+bgcolor2+')');
} 
else if(bgtype == "none"){$j(".iconbox2 span.vi").css({"background":"none"});}

$j(".iconbox2 span.vi").hover(function(){
		$j(this).css({"color":hovercolor,"font-size":hoversize,"padding":hoverpadding});
		if(bgtype == "color"){ $j(this).css({"background":hoverbgcolor1}); }
		else if(bgtype == "gradient"){
		$j(this).css('background', '-webkit-gradient(linear,left top,left bottom,from('+hoverbgcolor1+'),to('+hoverbgcolor2+'))'); 
		$j(this).css('background', '-webkit-linear-gradient(top, '+hoverbgcolor1+', '+hoverbgcolor2+')');
		$j(this).css('background', '-moz-linear-gradient(top, '+hoverbgcolor1+', '+hoverbgcolor2+')'); 
		$j(this).css('background', '-ms-linear-gradient(top, '+hoverbgcolor1+', '+hoverbgcolor2+')');
		$j(this).css('background', '-o-linear-gradient(top, '+hoverbgcolor1+', '+hoverbgcolor2+')');
		} 
		else if(bgtype == "none"){ $j(this).css({"background":"none"}); }
	},function(){
		$j(this).css({"color":color,"font-size":size,"padding":padding});
		if(bgtype == "color"){ $j(this).css({"background":bgcolor1}); }
		else if(bgtype == "gradient"){
		$j(this).css('background', '-webkit-gradient(linear,left top,left bottom,from('+bgcolor1+'),to('+bgcolor2+'))'); 
		$j(this).css('background', '-webkit-linear-gradient(top, '+bgcolor1+', '+bgcolor2+')');
		$j(this).css('background', '-moz-linear-gradient(top, '+bgcolor1+', '+bgcolor2+')'); 
		$j(this).css('background', '-ms-linear-gradient(top, '+bgcolor1+', '+bgcolor2+')');
		$j(this).css('background', '-o-linear-gradient(top, '+bgcolor1+', '+bgcolor2+')');
		}
		else if(bgtype == "none"){ $j(this).css({"background":"none"}); }
	});

/********Mange border**********/
$j(".iconbox2 span.vi").css({"border-color":bordercolor,"border-width":borderwidth,"border-style":borderstyle,"border-radius":borderradius,"-webkit-border-radius":borderradius,"-moz-border-radius":borderradius});


//alert(onhover);
if($j(".iconbox2 span.vi").hasClass("fadethis")){$j(".iconbox2 span.vi").removeClass("fadethis")}
if($j(".iconbox2 span.vi").hasClass("spinthis")){$j(".iconbox2 span.vi").removeClass("spinthis")}
if(onhover == "fade"){$j(".iconbox2 span.vi").addClass("fadethis");}
if(onhover == "spin"){$j(".iconbox2 span.vi").addClass("spinthis");}

//alert(size + color);


/************************Shortcode generate*****************************/

// each .vicode .sc 
// get fontid and code from alt
// generate code and insert

/*[i
font="v1" code="v1-untitled-1" 
size="24px" onsize="24px" 
color="#000000" oncolor="#ffffff" 
padding="8px" onpadding="8px" 
bgtype="none" bg1="#cccccc" bg2="#eeeeee" onbg1="#333333" onbg2="#555555" 
borderwidth = "1px" bordercolor = "#ff0000" borderstyle = "solid" borderradius = "10%"
effect = "fade"
]*/
plugins_url = $j('#iconswpbyjboncc_plugin').val();
$j(".vicode .sc").each(function(){
alt = $j(this).attr("alt");
s = alt.split(":");
//alert(s[0]);	
fontid = s[0];
code = s[1];
path = s[2];
geturl = $j("#iconswpbyjboncc_url-"+fontid+"-"+code).val();
gettarget = $j("#iconswpbyjboncc_target-"+fontid+"-"+code).val();

str = "[i font=&quot;"+fontid+"&quot; code=&quot;"+code+"&quot; size=&quot;"+size+"&quot; onsize=&quot;"+hoversize+"&quot;  color=&quot;"+color+"&quot; oncolor=&quot;"+hovercolor+"&quot;  padding=&quot;"+padding+"&quot; onpadding=&quot;"+hoverpadding+"&quot; bgtype=&quot;"+bgtype+"&quot; bg1=&quot;"+bgcolor1+"&quot; bg2=&quot;"+bgcolor2+"&quot; onbg1=&quot;"+hoverbgcolor1+"&quot; onbg2=&quot;"+hoverbgcolor2+"&quot; borderwidth = &quot;"+borderwidth+"&quot; bordercolor = &quot;"+bordercolor+"&quot; borderstyle = &quot;"+borderstyle+"&quot; borderradius = &quot;"+borderradius+"&quot; effect = &quot;"+onhover+"&quot; link = &quot;"+geturl+"&quot; target = &quot;"+gettarget+"&quot; align = &quot;"+align+"&quot; margin = &quot;"+margintop+" "+marginright+" "+marginbottom+" "+marginleft+"&quot;]";

str2 = "";


str2 += "&lt;link rel=\"stylesheet\" type=\"text/css\" href=\""+plugins_url+"\"><br>";
sbg = sonbg = ""; 
rand = Math.floor((Math.random()*10000)+1);
if(bgtype != "none"){

if(bgtype == "color"){sbg += "background:"+bgcolor1+";";}
else if(bgtype == "gradient"){ 
sbg += "background-color:"+bgcolor1+";background-image:-webkit-gradient(linear,left top,left bottom,from("+bgcolor1+"),to("+bgcolor2+"));background-image: -webkit-linear-gradient(top, "+bgcolor1+", "+bgcolor2+"); background-image:    -moz-linear-gradient(top, "+bgcolor1+", "+bgcolor2+");background-image:     -ms-linear-gradient(top, "+bgcolor1+", "+bgcolor2+");background-image:      -o-linear-gradient(top, "+bgcolor1+", "+bgcolor2+");"; 
}

if(bgtype == "color"){sonbg += "background:"+hoverbgcolor1+";";} 
else if(bgtype == "gradient"){ 
sonbg += "background-color:"+hoverbgcolor1+";background-image:-webkit-gradient(linear,left top,left bottom,from("+hoverbgcolor1+"),to("+hoverbgcolor2+"));background-image: -webkit-linear-gradient(top, "+hoverbgcolor1+", "+hoverbgcolor2+"); background-image:    -moz-linear-gradient(top, "+hoverbgcolor1+", "+hoverbgcolor2+");background-image:     -ms-linear-gradient(top, "+hoverbgcolor1+", "+hoverbgcolor2+");background-image:      -o-linear-gradient(top, "+hoverbgcolor1+", "+hoverbgcolor2+");"; 
}

}
addclass = "";
if(onhover == "fade"){ addclass = "fadethis";}
if(onhover == "spin"){ addclass = "spinthis";}
str2 += '&lt;style type="text/css"> .'+fontid+code+'-i-'+rand+'{float:left;line-height:1;font-size:'+size+';color:'+color+';padding:'+padding+';border:'+borderwidth+' '+borderstyle+' '+bordercolor+';';
str2 += 'border-radius:'+borderradius+';-webkit-border-radius:'+borderradius+';-moz-border-radius:'+borderradius+';'+sbg+';'+alignstyle+';'+marginstyle+'}';

str2 += '<br>.'+fontid+code+'-i-'+rand+':hover{font-size:'+hoversize+';color:'+hovercolor+';padding:'+hoverpadding+';'+sonbg+'} &lt;/style><br>'; 
if(gettarget == "self"){gettarget2 = "_self";}
if(gettarget == "new"){gettarget2 = "_blank";}
if(geturl != ""){str2 += '&lt;a href="'+geturl+'" target="'+gettarget2+'">';}
str2 += '&lt;span class=" '+addclass+' '+fontid+code+'-i-'+rand+' = " aria-hidden="true" data-icon-'+fontid+'="&amp;#x'+code+';">&lt;/span>';
if(geturl != ""){ str2 += '&lt;/a>'; }


$j(".vicode ."+fontid+"-"+code+"").html(str);
$j(".vicode ."+fontid+"-html-"+code+"").html(str2);
$j(".vicode ."+fontid+"-html-"+code+"").hide();

  });

// add url to shortcode 
	// manage shortcode fontid and code - for path manage a php array
// manage bookmarks
	// style the app - insert in post
	// color transparent if blank
}