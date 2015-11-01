<?php
function iconswpbyjboncc_display_module_form(){
$ret = "";
   global $wpdb;
   $pluginurl = plugins_url( '/', __FILE__ );
   $table_name1 = $wpdb->prefix . "iconswpbyjboncc_vectoricons";
	$waitingimg = admin_url('/images/wpspin_light.gif');
   $i = 0;
$querystr = " SELECT * FROM ".$table_name1." ORDER BY `order` ASC ";
$obj_icons = $wpdb->get_results($querystr);
$select = "";
//$select = "<select name='seliconset' id='seliconset'><option value='0'>Select</option>";
if(sizeof($obj_icons) > 0){ 
foreach ($obj_icons as $icon){
$i++;
	$id = $icon->id;
	$fontid = $icon->fontid;
	$path = $icon->path;
	$name = $icon->name;
	$description = $icon->description;
	$no = $icon->no_of_icons;
	$default_size = $icon->default_size;
	$category = $icon->category;
	$order = $icon->order;
if($i == 1){$loaddefault = "".$id.":".$fontid.":".$path.":".$default_size."";}
//$select .= "<option value='".$id.":".$fontid.":".$path.":".$default_size."'>".$name."</option>";	
$select .= "<div id='".$id.":".$fontid.":".$path.":".$default_size."'>".$name."<br>(".$no." icons)
<img src='".$waitingimg."' class='waiting' id='iconswpbyjboncc_loading'/>
</div>";
$aaaa[$fontid] = $default_size;
/*
echo "@@rows_affected = @@wpdb->insert( @@table_name1, array( 
'id' => '".$id."', 
'fontid' => '".$fontid."', 
'path' => '".$path."',
'name' => '".$name."', 
'description' => '".$description."', 
'bookmarks' => '', 
'no_of_icons' => '".$no."', 
'default_size' => '".$default_size."', 
'category' => '".$category."', 
'order' => '".$order."'
 ) );<br>";
*/


}}   
//$select .= "</select>";   


foreach ($aaaa as $a=>$b){
//echo "@@fontsize[&quot;".$a."&quot;] = &quot;".$b."&quot;;<br>";
/*echo '&lt;div class="3u">
&lt;article class="box box-style2">
&lt;a href="fonts.php?id='.$a.'" class="image image-full">&lt;img src="images/'.$a.'.jpg" alt="" />&lt;/a>
&lt;h3>&lt;a href="fonts.php?id='.$a.'">'.$b.'&lt;/a>&lt;/h3>
&lt;/article>
&lt;/div><br>';
*/
}

$ret .= "<table border=0 cellspacing=0 cellpadding=0 class='selicontable'>
<tr>
<td class='selhead'>Click and load a Icon set below: 
<a href='http://codecanyon.net/item/5000-vector-icons-set-2-wordpress/5447746' target='_blank' class='iconswpbyjboncc_knowmore'><strong>SET II icons</strong></a>
<a href='".esc_url(add_query_arg(array('pagetype' => 'iconinfo')))."' class='iconswpbyjboncc_knowmore'>Click to know about authors / sources of icon sets</a>
</td></tr>
<tr><td class='seliconset'><span>".$select."</span></td></tr>";
$ret .= "</table>

<div id='loadicon'></div>";
return $ret;
}


function iconswpbyjboncc_display_iconinfo()
{
$selectthis = "";
$ret = "";
$ret .= "<table border=0 cellspacing=1 cellpadding=0 class='iconswpbyjboncc_info'>";
$ret .= "<tr><td class='selhead' colspan='3'>Authors / Sources of 5,000+ Vector Icons - WordPress 
<a href='".esc_url(add_query_arg(array('pagetype' => 'iconset')))."' class='iconswpbyjboncc_knowmore'>&laquo; Back to panel</a></td></tr>
<tr class='selhead2'><td>Icon Set</td><td>Info</td><td>Total icons</td></tr>";
   global $wpdb;
   $pluginurl = plugins_url( '/', __FILE__ );
   $table_name1 = $wpdb->prefix . "iconswpbyjboncc_vectoricons";
	$querystr = " SELECT * FROM ".$table_name1." ORDER BY `order` ASC ";
	$obj_icons = $wpdb->get_results($querystr);
if(sizeof($obj_icons) > 0){ 
foreach ($obj_icons as $icon){
$i++;
	$id = $icon->id;
	$fontid = $icon->fontid;
	$name = $icon->name;
	$description = $icon->description;
$description = ereg_replace("[[:alpha:]]+://[^<>[:space:]]+[[:alnum:]/]","<a href=\"\\0\">\\0</a>", $description);

	$no = $icon->no_of_icons;
$ret .= "<tr id='".$fontid."'><td>".$name."</td><td>".$description."</td><td>".$no."</td></tr>";
}}
//$selectthis = "<tr><td>hi</td></tr>";
$ret .= "</table>";
return $ret;
}


?>