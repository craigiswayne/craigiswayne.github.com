<?php
    require_once("modules/nexus_db.php");
	class nexus_claims extends nexus_db{

		var $columns = [

			'job_number' =>[
				'field_placeholder'=> 'Order Book #'
			],

			'claim_number'=>[
				'not_null' => false
			],

			'date_of_loss'=>[
				'datatype'	=> 'DATE',
				'default'		=> 'DATE(NOW())',
				'max'				=> 'today'
			],

			'nature_of_claim_reported'=>[
				'label'			=> 'Reported Nature of Claim',
				'datasource'=> 'nexus_claims_causes'
			],

			'policy_holder' =>[
				'foreign_key' 	=> TRUE,
				'foreign_table'	=> 'nexus_directory',
				'datasource'		=> 'policy_holders'

			],

			'internal_negotiator' =>[
				'foreign_key'	=> TRUE,
				'foreign_table'	=> 'nexus_directory',
				'datasource'	=> 'claims_negotiators'
			]

		];

		var $settings = [
			'add_form' =>[
				'title' 					=> 'Capture a New Claim',
				'hidden_fields'		=> ['captured'],
				'disabled_fields' => ['consultant'],
				'js'							=> '
					var policy_holder_field = document.querySelector("#field_policy_holder.field");

					var verify_info_button	= policy_holder_field.appendChild(document.createElement("span"));
					verify_info_button.className = "fa fa-info-circle";
					verify_info_button.style.visibility = "hidden";


					var dd_policy_holder 	= policy_holder_field.querySelector("select[name*=policy_holder]");

					verify_info_button.addEventListener("click",function(){
						Nexus.show_in_popup("?class=nexus_directory&method=view&fields[_id]="+dd_policy_holder.options[dd_policy_holder.selectedIndex].value);
					},false);

					dd_policy_holder.addEventListener("change",function(){

						if(this.selectedIndex > 0){
							//only enable the consultants linked to this policy holder
							verify_info_button.style.visibility = "visible";
						}
						else{
							verify_info_button.style.visibility = "hidden";
						}

					},false);
				'
			],

			'view'		 => [
					'title'					=> 'Claim #(#_id#) Summary',
					'menu_options'	=> [
						'<a class=button href="?class=nexus_claims&method=claim_file&_id=(#_id#)">View Claim File</a>'
					]
			]
		];


	}

?>
