<?php

	class nexus_directory_linked_contacts extends nexus_db{
		
		var $columns =[
			'parent'=>[
				'foreign_key'
			],
			'relationship'=>[
			],
			'child'=>[
				'foreign_key'
			]
		];
		
	}

?>
