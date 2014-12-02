<?php
	require_once("nexus.php");
	require_once("nexus_db.php");
	
	require_once("nexus_claims/nexus_claims.php");
	
	require_once("nexus_directory/nexus_directory.php");
	require_once("nexus_directory/nexus_directory_entries.php");
	
	require_once("nexus_directory/nexus_directory_labels.php");
	require_once("nexus_directory/nexus_directory_labels_categories.php");
	
	require_once("nexus_directory/nexus_directory_linked_contacts.php");
	
	require_once("nexus_directory/nexus_directory_addresses/nexus_directory_addresses.php");
	require_once("nexus_directory/nexus_directory_addresses/nexus_directory_address_types.php");
	
	//hides errors like undefined index
	error_reporting(E_ALL & ~E_NOTICE);
	
	print('<link rel=stylesheet href="css/nexus.css">');
	print('<link rel=stylesheet href="css/nexus_animation.css">');
	
?>
