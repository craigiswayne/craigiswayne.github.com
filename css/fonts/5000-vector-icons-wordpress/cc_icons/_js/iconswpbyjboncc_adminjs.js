var $j = jQuery.noConflict();
$j(document).ready(function(){$j("#iconswpbyjboncc_hasbggradient").attr('checked', 'checked');	var myOptions = {    // a callback to fire whenever the color changes to a valid color//    change: function(event, ui){ iconswpbyjboncc_loadsettings(); },    // a callback to fire when the input is emptied or an invalid color//    clear: function() {},    // show a group of common colors beneath the square    // or, supply an array of colors to customize further    palettes: true	};	  if( typeof jQuery.wp === 'object' && typeof jQuery.wp.wpColorPicker === 'function' ){		$j('.my-color-field').wpColorPicker(myOptions);	}    return false;	});$j(document).on('click', ".cciconselall", function () {$j(".adminiconstar").parent().addClass("vi_active");    return false;});$j(document).on('click', ".cciconunselall", function () {$j(".vi_active").removeClass("vi_active");    return false;});	$j(document).on('click', ".iconbox", function () {chck = $j(this).hasClass("vi_active");if(chck){ $j(this).removeClass("vi_active"); } else { $j(this).addClass("vi_active"); }     return false;});$j(document).on('click', ".cciconstoggle", function () {getalt = $j(this).attr("alt");//alert(getalt);chck = $j(this).hasClass("showhtml");if(chck){ $j(this).removeClass("showhtml"); $j(".iconshtmlthis"+getalt).show();$j(".iconsscthis"+getalt).hide();$j(this).val("Shortcode");} else { $j(this).addClass("showhtml"); $j(".iconsscthis"+getalt).show();$j(".iconshtmlthis"+getalt).hide();$j(this).val("HTML code");}     return false;});$j(document).on('keyup', ".cciconsinserturl", function () {iconswpbyjboncc_loadsettings();    return false;});$j(document).on('change', ".cciconsinserturl, .cciconsinserttarget", function () {iconswpbyjboncc_loadsettings();    return false;});$j(document).on('click', ".iconbox .star", function () {chck = $j(this).hasClass("adminiconstar");if(chck){ $j(this).removeClass("adminiconstar"); $j(this).addClass("adminiconstar-empty"); ccstar =	$j(this).attr("alt");startype = 'delete';} else { $j(this).addClass("adminiconstar");  $j(this).removeClass("adminiconstar-empty"); ccstar =	$j(this).attr("alt");startype = 'add';} 		data = {		ccstar: ccstar,		star: startype,		action: 'iconswpbyjboncc_get_results2'		};	    $j.post(ajaxurl, data, function (response,v) {			$j('#iconswpbyjboncc_results2').html(response);		});    return false;});