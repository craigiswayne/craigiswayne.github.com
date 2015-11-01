<?php
global $iconswpbyjboncc_db_version;
$iconswpbyjboncc_db_version = "1.0";

function iconswpbyjboncc_admin_create(){
   global $wpdb;
   global $iconswpbyjboncc_db_version;

   $table_name1 = $wpdb->prefix . "iconswpbyjboncc_vectoricons";
      
  $sql1 = "CREATE TABLE $table_name1 (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fontid` varchar(10) NOT NULL,
  `path` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `bookmarks` text NOT NULL,
  `no_of_icons` int(11) NOT NULL,
  `default_size` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
    );";



	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
   dbDelta( $sql1 );

$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '1', 'fontid' => 'v1', 'path' => 'v185098', 'name' => 'Web icons Set 1', 'description' => 'Batch BY: Adam Whitcroft: http://adamwhitcroft.com/batch/ ]', 'bookmarks' => '', 'no_of_icons' => '343', 'default_size' => '24', 'category' => '0', 'order' => '1' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '11', 'fontid' => 'v110', 'path' => 'v11077440', 'name' => 'SEO & Web icons set ', 'description' => 'SEO by http://simpleicon.com/set/60-seo-services-icons/', 'bookmarks' => '', 'no_of_icons' => '60', 'default_size' => '24', 'category' => '0', 'order' => '20' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '12', 'fontid' => 'v111', 'path' => 'v11126518', 'name' => 'Social web icons set (open & enclosed)', 'description' => 'Social Media Icons Pack - http://fontfabric.com/category/free/', 'bookmarks' => '', 'no_of_icons' => '74', 'default_size' => '24', 'category' => '0', 'order' => '30' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '13', 'fontid' => 'v14', 'path' => 'v1486342', 'name' => 'Web icons set (fontello - typicons)', 'description' => 'fontello - typicons - http://www.fontello.com', 'bookmarks' => '', 'no_of_icons' => '308', 'default_size' => '24', 'category' => '0', 'order' => '40' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '14', 'fontid' => 'v16', 'path' => 'v1675517', 'name' => 'Web icon set (fontello - modern pictograms)', 'description' => 'fontello - modern pictograms - http://www.fontello.com', 'bookmarks' => '', 'no_of_icons' => '91', 'default_size' => '24', 'category' => '0', 'order' => '50' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '15', 'fontid' => 'v17', 'path' => 'v1778413', 'name' => 'Weather icons (fontello - metecons)', 'description' => 'fontello - metecons - http://www.fontello.com', 'bookmarks' => '', 'no_of_icons' => '47', 'default_size' => '24', 'category' => '0', 'order' => '60' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '21', 'fontid' => 'v32', 'path' => 'v3221844', 'name' => 'Web icons (iconmoon - icon minia)', 'description' => 'iconmoon - icon minia - http://www.icomoon.io', 'bookmarks' => '', 'no_of_icons' => '139', 'default_size' => '24', 'category' => '0', 'order' => '70' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '17', 'fontid' => 'v18', 'path' => 'v1884751', 'name' => 'Web & Social icons (fontello - mfg)', 'description' => 'fontello - MFG - http://www.fontello.com', 'bookmarks' => '', 'no_of_icons' => '153', 'default_size' => '24', 'category' => '0', 'order' => '80' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '20', 'fontid' => 'v20', 'path' => 'v2091489', 'name' => 'Social web icons (fontello - zocial)', 'description' => 'fontello - zocial - http://www.fontello.com', 'bookmarks' => '', 'no_of_icons' => '103', 'default_size' => '24', 'category' => '0', 'order' => '85' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '22', 'fontid' => 'v34', 'path' => 'v3455303', 'name' => 'Web icons (iconmoon - ECO ICO)', 'description' => 'iconmoon - ECO ICO - http://www.icomoon.io', 'bookmarks' => '', 'no_of_icons' => '40', 'default_size' => '24', 'category' => '0', 'order' => '90' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '23', 'fontid' => 'v35', 'path' => 'v3580712', 'name' => 'Web icons (iconmoon - brankic1979)', 'description' => 'iconmoon - brankic1979 - http://www.icomoon.io', 'bookmarks' => '', 'no_of_icons' => '350', 'default_size' => '24', 'category' => '0', 'order' => '100' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '24', 'fontid' => 'v37', 'path' => 'v3724201', 'name' => 'Web icons (icomoon - cuticons)', 'description' => 'icomoon - cuticons - http://www.icomoon.io', 'bookmarks' => '', 'no_of_icons' => '70', 'default_size' => '24', 'category' => '0', 'order' => '110' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '25', 'fontid' => 'v38', 'path' => 'v3818158', 'name' => 'Web icons(icomoon - web hosting glyphs) Set 1', 'description' => 'icomoon - web hosting glyphs - http://www.icomoon.io', 'bookmarks' => '', 'no_of_icons' => '400', 'default_size' => '24', 'category' => '0', 'order' => '120' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '26', 'fontid' => 'v39', 'path' => 'v3989965', 'name' => 'Web icons(icomoon - web hosting glyphs) Set 2', 'description' => 'icomoon - web hosting glyphs - http://www.icomoon.io', 'bookmarks' => '', 'no_of_icons' => '300', 'default_size' => '24', 'category' => '0', 'order' => '130' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '27', 'fontid' => 'v42', 'path' => 'v4285342', 'name' => 'Web icons (icomoon - 105 loop icons)', 'description' => 'icomoon - 105 loop icons - http://www.icomoon.io', 'bookmarks' => '', 'no_of_icons' => '105', 'default_size' => '24', 'category' => '0', 'order' => '140' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '28', 'fontid' => 'v49', 'path' => 'v4936256', 'name' => 'Social media icons (foundation - social)', 'description' => 'foundation - social icons - http://foundation.zurb.com/social-icons.php', 'bookmarks' => '', 'no_of_icons' => '30', 'default_size' => '24', 'category' => '0', 'order' => '150' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '29', 'fontid' => 'v52', 'path' => 'v5288434', 'name' => 'Web & Social media icons (metrize)', 'description' => 'Metrize - http://www.alessioatzeni.com/metrize-icons/', 'bookmarks' => '', 'no_of_icons' => '300', 'default_size' => '24', 'category' => '0', 'order' => '160' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '30', 'fontid' => 'v57', 'path' => 'v5769561', 'name' => 'Web & Social media icons (web symbols liga)', 'description' => 'web symbols liga - http://www.justbenicestudio.com/studio/websymbolsliga/', 'bookmarks' => '', 'no_of_icons' => '165', 'default_size' => '24', 'category' => '0', 'order' => '170' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '37', 'fontid' => 'v6', 'path' => 'v654784', 'name' => 'Web + Social media icons set', 'description' => 'http://metroui.org.ua/icons.php', 'bookmarks' => '', 'no_of_icons' => '362', 'default_size' => '24', 'category' => '0', 'order' => '180' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '40', 'fontid' => 'v7', 'path' => 'v731585', 'name' => 'Web & Social icons Set (Sosa)', 'description' => 'Sosa fonts - http://tenbytwenty.com/?xxxx_posts=sosa', 'bookmarks' => '', 'no_of_icons' => '162', 'default_size' => '24', 'category' => '0', 'order' => '200' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '42', 'fontid' => 'v89', 'path' => 'v8918475', 'name' => 'Web & Social icons (Hand drawn)', 'description' => 'Sketch Icons by Peax Webdesign - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '99', 'default_size' => '32', 'category' => '0', 'order' => '210' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '31', 'fontid' => 'v59', 'path' => 'v5936161', 'name' => 'Misc. Face icons set', 'description' => 'Font Heads BY http://fonthead.1001fonts.com/new-and-fresh-fonts.html?page=2&items=10', 'bookmarks' => '', 'no_of_icons' => '62', 'default_size' => '32', 'category' => '0', 'order' => '211' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '43', 'fontid' => 'v92', 'path' => 'v9222837', 'name' => 'Social icon set (Brianqc)', 'description' => 'Social Icon by BRIANQC - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '26', 'default_size' => '24', 'category' => '0', 'order' => '220' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '19', 'fontid' => 'v19', 'path' => 'v1989490', 'name' => 'Misc. web icons (fontello - maki)', 'description' => 'fontello - maki - http://www.fontello.com', 'bookmarks' => '', 'no_of_icons' => '63', 'default_size' => '24', 'category' => '0', 'order' => '250' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '9', 'fontid' => 'v107', 'path' => 'v10763983', 'name' => 'Emoticons Set 1', 'description' => 'DIST Yolks Emoticons by TypeLand - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '40', 'default_size' => '24', 'category' => '0', 'order' => '300' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '41', 'fontid' => 'v86', 'path' => 'v8664437', 'name' => 'Web design + Misc. icon set (hand drawn)', 'description' => 'Peax Webdesign Free Icons by Peax Webdesign - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '98', 'default_size' => '32', 'category' => '0', 'order' => '300' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '10', 'fontid' => 'v109', 'path' => 'v10911791', 'name' => 'General symbol signs', 'description' => 'SYMBOL SIGNS by Sander Baumann - http://www.fontsquirrel.com', 'bookmarks' => '', 'no_of_icons' => '36', 'default_size' => '24', 'category' => '0', 'order' => '310' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '34', 'fontid' => 'v61', 'path' => 'v6194402', 'name' => 'More misc. set of icons (Bots & smileys)', 'description' => 'Tombats series by http://tom7.1001fonts.com/', 'bookmarks' => '', 'no_of_icons' => '314', 'default_size' => '24', 'category' => '0', 'order' => '320' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '36', 'fontid' => 'v62', 'path' => 'v6271101', 'name' => 'Emoticons set (dark rounded)', 'description' => 'Aaronfaces - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '52', 'default_size' => '24', 'category' => '0', 'order' => '330' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '33', 'fontid' => 'v60', 'path' => 'v6048754', 'name' => 'Misc. Fire icons', 'description' => 'PYROBATS - http://johnbloor.1001fonts.com/', 'bookmarks' => '', 'no_of_icons' => '33', 'default_size' => '24', 'category' => '0', 'order' => '500' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '7', 'fontid' => 'v104_1', 'path' => 'v104_164079', 'name' => 'Misc. Musical set 1', 'description' => 'WC Musica Bta by WC Fonts - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '140', 'default_size' => '24', 'category' => '0', 'order' => '900' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '8', 'fontid' => 'v104_2', 'path' => 'v104_269866', 'name' => 'Misc. Musical set 2', 'description' => 'WC Musica Bta by WC Fonts - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '140', 'default_size' => '24', 'category' => '0', 'order' => '900' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '38', 'fontid' => 'v66', 'path' => 'v6657111', 'name' => 'Misc. Circle styles and shapes Set 1', 'description' => 'Circle Things by Fonts & Things - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '52', 'default_size' => '24', 'category' => '0', 'order' => '910' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '6', 'fontid' => 'v102', 'path' => 'v10217646', 'name' => 'Misc. shapes set', 'description' => 'Symmetric Things 2 by Fonts & Things - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '62', 'default_size' => '24', 'category' => '0', 'order' => '1000' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '39', 'fontid' => 'v67', 'path' => 'v6790402', 'name' => 'Misc. Cicle styles and shapes Set 2', 'description' => 'Circle Things 2 by Fonts & Things - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '62', 'default_size' => '24', 'category' => '0', 'order' => '1000' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '44', 'fontid' => 'v95', 'path' => 'v9556219', 'name' => 'Misc. Star shapes Set 1', 'description' => 'Star Things by Fonts & Things - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '62', 'default_size' => '24', 'category' => '0', 'order' => '1000' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '45', 'fontid' => 'v96', 'path' => 'v9630272', 'name' => 'Misc. Star shapes Set 2', 'description' => 'Star Things by Fonts & Things - http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '62', 'default_size' => '24', 'category' => '0', 'order' => '1000' ) );
$rows_affected = $wpdb->insert( $table_name1, array( 'id' => '46', 'fontid' => 'v112', 'path' => 'v11245511', 'name' => 'Numeric Fonts (new)', 'description' => 'Boingo by Bright Ideas,Remi by Kayleigh Hanckmann,Little Lord Fontleroy by Nicks Fonts,Antique Book Cover by Adazing Design,Blazed by Bright Ideas,Honey Script by Dieter Steffmann ,Journal by Fontourist ,SquareFont by Bou Fonts,Clubland by Joseph Gibson,Major Snafu by Vic Fieger from http://www.dafont.com', 'bookmarks' => '', 'no_of_icons' => '100', 'default_size' => '24', 'category' => '0', 'order' => '300' ) );

 add_option( "iconswpbyjboncc_db_version", $iconswpbyjboncc_db_version );
}

function iconswpbyjboncc_admin_delete() {
   global $wpdb;

   $table_name1 = $wpdb->prefix . "iconswpbyjboncc_vectoricons";

 global $wpdb;
	delete_option("iconswpbyjboncc_db_version");

	$wpdb->query(" DROP TABLE IF EXISTS $table_name1 ");
   
}


?>