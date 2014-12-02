<?php

	class nexus_directory_addresses extends nexus_db{
	
		var $columns = [
			'nexus_directory_id',
			'name'=>[
				'default'=>'Physical Address'
			],
			'unit_number',
			'street_number',
			'street_name',
			'p.o. box',
			'suburb',
			'city',
			'province',
			'postal code',
			'country',
			'longitude',
			'latitude',
			'nexus_directory_address_types_id'
		];
		
		
		function add_form(){
		}
	}
?>
