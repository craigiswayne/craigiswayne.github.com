<?php

	require_once("nexus_db.php");
	require_once("nexus_directory_categories.php");
	
	class nexus_directory extends nexus_db{		
		
		var $columns = [
			'nexus_categories_id',
			'label',
			'value'
		];
		
		var $unique_index	= ['_id','nexus_categories_id','label','value'];
		
		function viewlist(){
			
			//get all the categories
			//get all the entries for each category
			
			$insurance_companies_sql = '
				SELECT * 
				
				FROM nexus_directory directory
				
				LEFT OUTER JOIN nexus_directory_entries entries ON entries.nexus_directory_id = directory._id
				
				WHERE nexus_directory_id IN (
					
					SELECT DISTINCT(nexus_directory_id)
					
					FROM nexus_directory_entries
					WHERE _deleted!=1
						AND label = "relationship"
						AND value = "Insurance Company"
				)
			';
			
			$insurance_companies = $this->sql_query($insurance_companies_sql);
			$this->debug($insurance_companies);
			
			$template_data = [
				'filename'=>dirname(__FILE__).'/viewlist.html',				
				'data'=>[
					'brokers'=>$this->sql_query(array('sql'=>'SELECT bro_name as name FROM brokers ORDER BY name asc')),
					'insurance_companies'=>$this->sql_query(array('sql'=>'SELECT ic_name as name FROM insurance_companies ORDER BY name asc')),
					'managing_agents'=>$this->sql_query(array('sql'=>'SELECT ma_name as name FROM managing_agents ORDER BY name asc')),
					'consultants'=>$this->sql_query(array('sql'=>'SELECT cons_name as name FROM consultants ORDER BY name asc')),
					'policy_holders'=>$this->sql_query(array('sql'=>'SELECT ph_name as name FROM policy_holders ORDER BY name asc'))
				]
			];

			
			print($this->get_template($template_data));
			
		}
		
		function view(){
			$template_data = [
				'filename'=> dirname(__FILE__).'/policy_holder.html',
				'data'	  => []
			];
			print $this->get_template($template_data);
		}
		
		function add_form($param=[]){
			
			$param = is_array($param) ? $param : [];
			$param = array_merge($param,$_GET);
			
			$param['template'] = array_key_exists('template',$param) ? $param['template'] : 'policy_holder';
			
			$template_data = [
				'filename'=> dirname(__FILE__).'/'.$param['template'].'.html',
				'data'	  => []
			];
			print $this->get_template($template_data);
		}
		
		function add($param=[]){
			
			//there must be a pre_add validation
			//use the directory entries to do the add for the entries
			
			$sql = 'INSERT INTO `nexus_directory`(_deleted) VALUES(0)';
			$this->sql_query(['sql'=>$sql]);
			$generated_id = mysqli_insert_id($this->connection);
			
			$nexus_directory_categories = new nexus_directory_categories;
			$categories = $nexus_directory_categories->get_list();
			
			foreach($categories as $key=>$value){
				$categories[$key]['name'] = strtolower($categories[$key]['name']);
			}
			
			foreach($_POST['fields'] as $category=>$values){
				
				$category_id = null;
				
				foreach($values as $label=>$value){
					
					foreach($categories as $key=>$val){
						if($category == $categories[$key]['name']){
							$category_id = $categories[$key]['_id'];
							break;
						}
					}
					
					if($category_id){
						$sql = '
							INSERT INTO nexus_directory_entries(nexus_directory_id, nexus_directory_categories_id, label, value)
							VALUES('.$generated_id.','.$category_id.',"'.$label.'","'.$value.'")
						';
						$this->sql_query($sql);
					}
				}
			}
			
			print 'completed<br/><br/>';
			
		}
	}

?>
