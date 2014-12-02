<?php

	class nexus_claims extends nexus_db{
		
		var $columns = [
			
			'job_number',
			
			'captured' =>[
				'datatype'	=> 'DATETIME',
				'default'	=> 'NOW()',
				'hidden_in_add_form' => true
			],
			
			'date_of_loss'=>[
				'datatype'	=> 'DATE',
				'default'	=> 'DATE(NOW())'
			],
			
			'nature_of_claim_reported'=>[
				'label'	=> 'Nature of Claim'
			],
			
			'policy_holder' =>[
				'foreign_key' 	=> TRUE,
				'foreign_table'	=> 'nexus_directory',
				
			],
			
			'consultant' =>[
				'foreign_key'	=> TRUE,
				'foreign_table' => 'nexus_directory'
			],
			
			'internal_negotiator' =>[
				'foreign_key'	=> TRUE,
				'foreign_table'	=> 'nexus_directory'
			]
			
		];
		
		var $add_form_settings = [
			'title' => 'Capture a New Claim'
		];
	}

?>
