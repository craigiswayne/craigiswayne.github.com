<?php
	
	//TODO ADD -> DONE
	//TODO VIEW
	//TODO EDIT
	//TODO DELETE
	
	class nexus_directory extends nexus_db{
		
		var $columns = [
			'type' => [
				'default'=>'Business'
			]
		];
		
		var $views = [
			'
				CREATE OR REPLACE VIEW `insurance_companies` AS
				
				SELECT directory._id, entries.value as name, directory._deleted
				
				FROM nexus_directory_entries entries
				LEFT OUTER JOIN nexus_directory directory ON entries.nexus_directory_id = directory._id
				
				WHERE 
				
				entries._deleted!=1
				AND directory._deleted!=1
				
				AND nexus_directory_id IN(
					SELECT
					nexus_directory_id
					FROM nexus_directory_entries entries
					WHERE
					_deleted!=1
					AND entries.nexus_directory_labels_id IN (SELECT _id FROM nexus_directory_labels WHERE name = "Relationship")
					AND entries.value = "Insurance Company"
				)
				
				AND nexus_directory_labels_id IN(
					SELECT _id
					FROM nexus_directory_labels 
					WHERE
					_deleted!=1
					AND name = "Name"
				)
			',
			'
				CREATE OR REPLACE VIEW `managing_agents` AS
				
				SELECT directory._id, entries.value as name, directory._deleted
				
				FROM nexus_directory_entries entries
				LEFT OUTER JOIN nexus_directory directory ON entries.nexus_directory_id = directory._id
				
				WHERE 
				
				entries._deleted!=1
				AND directory._deleted!=1
				
				AND nexus_directory_id IN(
					SELECT
					nexus_directory_id
					FROM nexus_directory_entries entries
					WHERE
					_deleted!=1
					AND entries.nexus_directory_labels_id IN (SELECT _id FROM nexus_directory_labels WHERE name = "Relationship")
					AND entries.value = "Managing Agent"
				)
				
				AND nexus_directory_labels_id IN(
					SELECT _id
					FROM nexus_directory_labels 
					WHERE
					_deleted!=1
					AND name = "Name"
				)
			',
			'
				CREATE OR REPLACE VIEW `brokers` AS
				
				SELECT directory._id, entries.value as name, directory._deleted
				
				FROM nexus_directory_entries entries
				LEFT OUTER JOIN nexus_directory directory ON entries.nexus_directory_id = directory._id
				
				WHERE 
				
				entries._deleted!=1
				AND directory._deleted!=1
				
				AND nexus_directory_id IN(
					SELECT
					nexus_directory_id
					FROM nexus_directory_entries entries
					WHERE
					_deleted!=1
					AND entries.nexus_directory_labels_id IN (SELECT _id FROM nexus_directory_labels WHERE name = "Relationship")
					AND entries.value = "Broker"
				)
				
				AND nexus_directory_labels_id IN(
					SELECT _id
					FROM nexus_directory_labels 
					WHERE
					_deleted!=1
					AND name = "Name"
				)
			',
			'
				CREATE OR REPLACE VIEW `suppliers` AS
				
				SELECT directory._id, entries.value as name, directory._deleted
				
				FROM nexus_directory_entries entries
				LEFT OUTER JOIN nexus_directory directory ON entries.nexus_directory_id = directory._id
				
				WHERE 
				
				entries._deleted!=1
				AND directory._deleted!=1
				
				AND nexus_directory_id IN(
					SELECT
					nexus_directory_id
					FROM nexus_directory_entries entries
					WHERE
					_deleted!=1
					AND entries.nexus_directory_labels_id IN (SELECT _id FROM nexus_directory_labels WHERE name = "Relationship")
					AND entries.value = "Supplier"
				)
				
				AND nexus_directory_labels_id IN(
					SELECT _id
					FROM nexus_directory_labels 
					WHERE
					_deleted!=1
					AND name = "Name"
				)
			',
			'
				CREATE OR REPLACE VIEW `consultants` AS
				
				SELECT directory._id, GROUP_CONCAT(entries.value SEPARATOR " ") as name, directory._deleted
				
				FROM nexus_directory_entries entries
				LEFT OUTER JOIN nexus_directory directory ON entries.nexus_directory_id = directory._id
				
				WHERE 
				
				entries._deleted!=1
				AND directory._deleted!=1
				
				AND nexus_directory_id IN(
					SELECT
					nexus_directory_id
					FROM nexus_directory_entries entries
					WHERE
					_deleted!=1
					AND entries.nexus_directory_labels_id IN (SELECT _id FROM nexus_directory_labels WHERE name = "Relationship")
					AND entries.value = "Consultant"
				)
				
				AND nexus_directory_labels_id IN(
					SELECT _id
					FROM nexus_directory_labels 
					WHERE
					_deleted!=1
					AND (name = "First Name" OR name = "Last Name")
				)
                GROUP BY nexus_directory_id
			',
			'
				CREATE OR REPLACE VIEW `businesses` AS
				SELECT 
					directory._id,
					entries.value as name,
					directory._deleted 
					
				FROM nexus_directory directory
					
				LEFT OUTER JOIN nexus_directory_entries entries ON entries.nexus_directory_id = directory._id
					
				WHERE 
					directory._deleted!=1 
					AND entries._deleted!=1
					AND type = "Business"
					AND entries.nexus_directory_labels_id IN (
						SELECT _id FROM nexus_directory_labels WHERE _deleted!=1 AND name = "Name"
					)
			',
			'
				CREATE OR REPLACE VIEW `policy_holders` AS
				SELECT 
					directory._id,
					entries.value as name,
					directory._deleted 
					
				FROM nexus_directory directory
					
				LEFT OUTER JOIN nexus_directory_entries entries ON entries.nexus_directory_id = directory._id
					
				WHERE 
					directory._deleted!=1 
					AND entries._deleted!=1
					AND type = "Policy Holder"
					AND entries.nexus_directory_labels_id IN (
						SELECT _id FROM nexus_directory_labels WHERE _deleted!=1 AND name = "Name"
					)
			'
		];
		
		function viewlist($param=[]){
			
			$directory_groups			= $this->get_groups(); 

			$nexus_directory_labels 	= new nexus_directory_labels();
			
			$module_js_data = [
				'directory_groups'		=> $directory_groups,
				'directory_labels'		=> $nexus_directory_labels->get_list()
			];
			
			$module_js = '<script>'.$this->get_template(['filename'=>'nexus_directory.js','data'=>$module_js_data]).'</script>';
			
			$param['data'] = [
				'module_js'				=> $module_js
			];
			parent::viewlist($param);
		}
		
		function view($param=[]){
			
			$nexus_directory_labels_categories	= new nexus_directory_labels_categories();
			$nexus_directory_labels				= new nexus_directory_labels();
			
			$categories = $nexus_directory_labels_categories->get_list(['order'=>'`order` ASC']);
			$labels		= $nexus_directory_labels->get_list();
			
			$nexus_directory_entries = new nexus_directory_entries();
			
			$sql = '
				SELECT labels.name as label, entries.value, categories.name as category
	
				FROM nexus_directory_entries entries
				
				LEFT OUTER JOIN nexus_directory_labels labels ON entries.nexus_directory_labels_id = labels._id
				
				LEFT OUTER JOIN nexus_directory_labels_categories categories ON labels.nexus_directory_labels_categories_id = 
				categories._id
				
				WHERE nexus_directory_id = "'.$_GET['fields']['_id'].'"
				ORDER BY categories.`order` ASC
			';
			
			$contact_entries = $this->sql_query($sql);
			
			$html = '<form class="nexus directory view">';
			$html .= '
				<img class="profile">
				<input type=text placeholder="Name" disabled>
			';
			
			foreach($categories as $key=>$value){
				$html .= '
					<details open>
						<summary>'.$value['name'].'</summary>
				';
				
				foreach($contact_entries as $k=>$entry){
					if($entry['category'] == $value['name']){
						$html .= '
							<div class=field>
								<label>'.$entry['label'].'</label><input name="fields['.$entry['label'].']" value="'.$entry['value'].'" disabled>
							</div>
						'; 
					}
				}
				
				$html .= '
					</details>
				';
			}
			
			//add address details
			$nexus_directory_addresses = new nexus_directory_addresses();
			$linked_addresses = $nexus_directory_addresses->get_list(['where'=>'`nexus_directory_id`='.$_GET['fields']['_id']]);
			//$this->debug($_GET['fields']['_id']);
			//$this->debug($linked_addresses);
			
			foreach($linked_addresses as $key=>$data){
				
				$html .= '
					<details open>
						<summary>'.$data['name'].'</summary>
				';
			
				foreach($data as $label => $value){
					if($value && (strpos($label,'_id') != (strlen($label)-3)) ){
						$html .= '<div class=field>';
						$html .= 	'<label>'.str_replace('_',' ',$label).'</label><input type=text value="'.$value.'" disabled>';
						$html .= '</div>';
					}	
				}
				
				$html .= '</details>';
			}
			
			
			$html .= '
				<script>
					document.querySelector("input[placeholder=Name]").value = document.querySelector("input[name*=\'Name\']").value;
				</script>
			';
			
			$html .= '</form>';
			print($html);			
		}
		
		function add_form($param=[]){
			
			$param = is_array($param) ? $param : [];
			$param = array_merge($param,$_GET);
			
			$param['relationship'] = array_key_exists('relationship',$param) ? $param['relationship'] : null;
			
			$param['template'] = dirname(__FILE__).'/';
			
			$param['relationship'] = str_replace(' ','_',$param['relationship']);
			
			$template_data = [
				'data'	  => [
					'address_section'	=>$this->get_template(['filename'=>'address_details_template.html']),
					'contact_section'	=>$this->get_template(['filename'=>'contact_details_template.html'])
				]
			];
			
			switch($param['relationship']){
				
				case 'consultants':
					$template_data['filename'] 				    = $param['template'].'consultants_new.html';
				break;
				
				case 'managing_agents':
					$template_data['data']['name placeholder']	= 'Managing Agent\'s Name';
					$template_data['data']['business type']	= 'Managing Agent';
					$template_data['filename'] 				    = $param['template'].'business_new.html';
				break;
				
				case 'insurance_companies':
					$template_data['data']['name placeholder']	= 'Insurance Company Name';
					$template_data['data']['business type']		= 'Insurance Company';
					$template_data['filename'] 				    = $param['template'].'business_new.html';
				break;
					
				case 'brokers':
					$template_data['data']['name placeholder']	= 'Broker\'s Name';
					$template_data['data']['business type']		= 'Broker';
					$template_data['filename'] 				    = $param['template'].'business_new.html';
				break;
				
				case 'suppliers':
					$template_data['data']['name placeholder']	= 'Supplier\'s Name';
					$template_data['data']['business type']		= 'Supplier';
					$template_data['filename'] 				    = $param['template'].'business_new.html';
				break;
				
				case 'policy_holders':
					$template_data['filename'] 				    = $param['template'].'policy_holders_new.html';
				break;
			}
			
			print $this->get_template($template_data);
		}
		
		function add_contact($param=[]){
			
			//add into nexus_directory to get the _id
			$generated_id = $this->add()['_id'];
			if(array_key_exists('type',$_POST['fields'])){
				unset($_POST['fields']['type']);
			}
			$_POST['fields'] = $this->clean_array($_POST['fields']);
			
			if(array_key_exists('nexus_directory_addresses',$_POST['fields'])){
				
				$nexus_directory_addresses = new nexus_directory_addresses();
				
				foreach($_POST['fields']['nexus_directory_addresses'] as $group=>$fields){
					$fields['nexus_directory_id'] = $generated_id;
					//$this->debug($fields);
					$nexus_directory_addresses->add(['fields'=>$fields]);
				}
				unset($_POST['fields']['nexus_directory_addresses']);
			}
			
			//add any linked contacts
			if(array_key_exists('linked contacts',$_POST['fields'])){
				
				$nexus_directory_linked_contacts = new nexus_directory_linked_contacts();
				$linked_contacts = $_POST['fields']['linked contacts'];
				
				foreach($linked_contacts as $key=>$value){
					
					if($linked_contacts[$key]['relationship'] && $linked_contacts[$key]['child']){
						
						$tmp_add_data = $linked_contacts[$key];
						$tmp_add_data['parent'] = $generated_id;
						$nexus_directory_linked_contacts->add(['fields'=>$tmp_add_data]);
					}
				}
				unset($_POST['fields']['linked contacts']);
			}
			
			//add any addresses
			$nexus_directory_labels = new nexus_directory_labels();
			$labels_list = $nexus_directory_labels->get_list();
			$labels_used = [];
			foreach($labels_list as $key=>$value){
				$labels_used[strtolower($value['name'])] = $value;
			}
			
			$nexus_directory_entries = new nexus_directory_entries();
			
			$add_data = [];
			
			foreach($_POST['fields'] as $label=>$value){
				
				if(!array_key_exists($label,$labels_used)){
					$this->error('Label "'.$label.'" does not exist on the system yet ('.__LINE__.')');
					$add_data = [];
					break;
				}
				
				$add_data[] = [
					'nexus_directory_id'		=> $generated_id,
					'nexus_directory_labels_id' => $labels_used[$label]['_id'],
					'value'						=> $value
				];
			}
			
			foreach($add_data as $key=>$value){
				$this->debug($add_data[$key]);
				$nexus_directory_entries->add(['fields'=>$add_data[$key]]);
			}
			
			//return the added data and the resulting info
			print("added successfully");
			return true;
		}

		function get_groups(){
					
			$groups = [
				'brokers'				=> $this->sql_query('SELECT * FROM brokers'),
				'insurance_companies'	=> $this->sql_query('SELECT * FROM insurance_companies'),
				'managing_agents'		=> $this->sql_query('SELECT * FROM managing_agents'),	
				'consultants'			=> $this->sql_query('SELECT * FROM consultants'), 		//these are people that work for a managing agent, broker, insurance company
				'policy_holders'		=> $this->sql_query('SELECT * FROM policy_holders'),
				'suppliers'				=> $this->sql_query('SELECT * FROM suppliers'),
				'businesses'			=> $this->sql_query('SELECT * FROM businesses')
			];
			
			$_GET['ajax'] = array_key_exists('ajax',$_GET) ? $_GET['ajax'] : false;
			
			if($_GET['ajax']==true){
				print(json_encode($groups));
			}
			
			return $groups; 
		}
					
	}	
	
	

?>
