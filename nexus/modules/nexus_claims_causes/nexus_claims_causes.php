<?php

	class nexus_claims_causes extends nexus_db{
		var $columns = [
			'name',
			'resultant_damages'=>[
				'datatype'	=> 'TINYINT',
				'default'	=> 0
			]
		];
	}

?>
