<?php
	
	class nexus_directory_labels_categories extends nexus_db{
		
		var $columns 		= [
			'name',
			'order'=>[
				'datatype'=>'INT'
			]
		];
		var $default_data	= [
			['name'=>'Name',	'order'=>1],
			['name'=>'Misc',	'order'=>5],
			['name'=>'Phone',	'order'=>2],
			['name'=>'Email',	'order'=>3],
			['name'=>'Policy',	'order'=>4]
		];
	}
	
?>
