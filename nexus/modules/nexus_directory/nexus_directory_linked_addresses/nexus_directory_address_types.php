<?php

	class nexus_directory_address_types extends nexus_db{
		
		var $columns = ['name'];
		
		var $default_data = [
			['name'=>'Residential Body Corporate'],
			['name'=>'Free Standing House'],
			['name'=>'Open Space']
		];
	
	}

?>
