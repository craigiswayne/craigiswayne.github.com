<?php

	require_once("nexus_db.php");
	
	class nexus_directory_entries extends nexus_db{
		
		
		var $columns = [
			'nexus_directory_id' 			=> [],
			'nexus_directory_categories_id' => [],
			'name'							=> [],
			'value'							=> []
		];
		
	}
	
?>
