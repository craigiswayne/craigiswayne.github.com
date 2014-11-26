<?php

	class nexus_directory_labels extends nexus_db{
	
		var $columns = [
			'nexus_directory_labels_categories_id'=>[
				'datatype'=>'INT'
			],
			'name'
		];
		
		var $default_data = [
			['nexus_directory_labels_categories_id'=>1,'name'=>'Name'],
			['nexus_directory_labels_categories_id'=>1,'name'=>'First Name'],
			['nexus_directory_labels_categories_id'=>1,'name'=>'Last Name'],
			['nexus_directory_labels_categories_id'=>1,'name'=>'Abbreviation'],
			['nexus_directory_labels_categories_id'=>2,'name'=>'Relationship'],
			['nexus_directory_labels_categories_id'=>3,'name'=>'Cell'],
			['nexus_directory_labels_categories_id'=>4,'name'=>'Email'],
			['nexus_directory_labels_categories_id'=>4,'name'=>'Work Email'],
			['nexus_directory_labels_categories_id'=>5,'name'=>'Policy Number']
		];
	}

?>
