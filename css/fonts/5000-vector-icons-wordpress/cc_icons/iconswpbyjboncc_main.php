<?php 
		/*
		Plugin Name: 5,000+ Vector Icons - WordPress
		Plugin URI: http://www.jaybabani.in/5000icons-wp/
		Description: Plugin to implement retina ready and high resolution vector icons on your wordpress site, ready to implement with one click. 5,000+ vector icons.
		Author: Jay Babani
		Version: 1.0
		Author URI: http://jaybabani.in
		*/

/*Unique name: iconswpbyjboncc*/

//function iconswpbyjboncc_module() {
function iconswpbyjboncc_admin_actions() {
function iconswpbyjboncc_scripts()
//wp_register_script('jqueryrotate', plugins_url( '/_js/iconswpbyjboncc_jQueryRotate.js', __FILE__ ), array( 'jquery'));
//wp_register_script('jqueryeasing', plugins_url( '/_js/iconswpbyjboncc_jquery.easing.1.3.js', __FILE__ ), array( 'jquery'));
wp_register_style('iconswpbyjboncc_admincss', plugins_url( '/_css/iconswpbyjboncc_admincss.css', __FILE__ ));
add_action('admin_menu', 'iconswpbyjboncc_admin_actions');
register_activation_hook( __FILE__, 'iconswpbyjboncc_admin_create' );
register_deactivation_hook( __FILE__, 'iconswpbyjboncc_admin_delete' );
add_action('init', 'iconswpbyjboncc_myStartSession', 1);