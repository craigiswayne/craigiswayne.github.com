<?php

	require_once("../../nexus/modules/nexus_directory/nexus_directory.php");
	
	$_GET['method'] = array_key_exists('method',$_GET) ? $_GET['method'] : 'viewlist';
	$directory = new nexus_directory(['method'=>$_GET['method']]);
	
?>
