<?php
	
	class nexus_db extends nexus{
		
		
		//http://stackoverflow.com/questions/635937/how-do-i-specify-unique-constraint-for-multiple-columns-in-mysql
		//multiple unique columns
		//http://www.w3schools.com/sql/sql_unique.asp
		//unique constraint
		
		var $host 		= 'localhost';
		var $username 	= 'root';
		var $password 	= 'root';
		var $schema		= 'nexus';
		var $connection	= null;
		
		private function connect_to_db(){
			
			$this->connection = mysqli_connect($this->host, $this->username, $this->password, $this->schema);
			if ($this->connection->connect_error) {
				die("Connection failed: " . $this->connection->connect_error);
			}
			return true;
		}
		
		private function create_tables(){
			$nexus_classes = $this->get_modules(["extends"=>"nexus_db"]);
			
			foreach($nexus_classes as $class_name=>$class_object){
				
				$sql = '
					CREATE TABLE IF NOT EXISTS `'.$this->schema.'`.`'.$class_name.'`(
					
						`_id` INT NOT NULL AUTO_INCREMENT,
				';
				
				$class_vars = get_class_vars($class_name);
				$columns	= array_key_exists('columns',$class_vars) ? $class_vars['columns'] : [];
				if($columns){
					
					foreach($columns as $name=>$settings){
						
						$column_name; $column_settings;
						
						switch(is_array($columns[$name])){
							
							case true:
								$column_name 		= $name;
								$column_settings 	= $settings;
							break;
							
							default:
								$column_name		= $settings;
								$column_settings	= [];
							break;
							
						}
						
						$column_settings['datatype'] = array_key_exists('datatype',$column_settings) ? $column_settings['datatype'] : 'VARCHAR(50)';
						
						$sql .= '
							`'.$column_name.'` '.$column_settings['datatype'].',
						';
					}
				}
						
				$sql.='	`_deleted` TINYINT(1) NOT NULL DEFAULT 0,
						
						PRIMARY KEY(`_id`),
						UNIQUE INDEX `_id_UNIQUE` (`_id` ASC)
					)
					ENGINE 					= InnoDB
					DEFAULT CHARACTER SET	= utf8
					COLLATE					= utf8_bin
				';
				
				$this->sql_query($sql);
				
				
			}
			
			$this->set_foreign_keys();
		}
		
		private function set_foreign_keys(){
		}
		
		private function create_class_views(){
			
			$nexus_classes = $this->get_modules(['extends'=>'nexus_db']);
			
			foreach($nexus_classes as $class_name=>$class_object){
				$class_vars = get_class_vars($class_name);
				if(array_key_exists('views',$class_vars)){
					foreach($class_vars['views'] as $key=>$value){
						$this->sql_query($value);
					}
				}
			}
		}
		
		private function insert_default_data(){
			
			$nexus_classes = $this->get_modules(["extends"=>"nexus_db"]);
			
			//only insert default data if there is NOTHING in the table
			
			foreach($nexus_classes as $class_name=>$class_object){
				$class_vars = get_class_vars($class_name);
				//try break this and catch it
				if(array_key_exists('default_data',$class_vars)){
					if(is_array($class_vars['default_data'])){
						
						foreach($class_vars['default_data'] as $k=>$data){
							
							$sql = 'INSERT INTO `'.$this->schema.'`.`'.$class_name.'`
									(`'.implode(array_keys($data),'`,`').'`)
							';
							
							$sql.= '
								VALUES("'.implode(array_values($data),'","').'")
							';
							
							//rather use the add method for this, and the add method must return the generated data, like PK and the other data that was auto filled in by db
							$this->debug($sql);
							$this->sql_query($sql);
						}
						
						
					}
				}
			}
		}
		
		//gonna have to make this private and some security as well
		function setup(){
			
			//create only if it doesnt exist
			$this->sql_query("CREATE DATABASE `".$this->schema."`");

			$this->sql_query("USE `".$this->schema."`");
			
			$this->create_tables();
			
			$this->create_class_views();
			
			$this->insert_default_data();
			
			print "<h3>Setup Complete</h3>";
			
		}
		
		private function issues(){
			//all entries in the nexus directory must only have 1 entry for a name, or first name or last name
			//no consultant can have more than 1 company
			//get a list of all entries that have duplicate labels per contact
			//you need to ensure that unqiue indexes are created
			//are private functions inherited?
		}
		
		private function genesis(){
			
			$this->sql_query('USE `information_schema`');
			$this->sql_query('DROP SCHEMA IF EXISTS `'.$this->schema.'`');
			$this->setup();
			
		}
		
		function sql_query($param=['']){
			
			//$this->debug($param);
			
			if(func_num_args()==1 && is_string($param)){
				$tmp_sql = $param;
				$param = [];
				$param['sql'] = $tmp_sql;
			}
			
			$param 			= is_array($param) ? $param : (func_num_args()==1 ? ['sql'=>$param] : []);
			$param['sql'] 	= array_key_exists('sql',$param) ? $param['sql'] : null;	
			
			//$this->debug($param['sql']);
			
			$results = [];
			
			$this->connect_to_db();
			
			if($param['sql']){
				
				$query = mysqli_query($this->connection ,$param['sql']);
				
				$last_insert_id = mysqli_insert_id($this->connection);
				if($last_insert_id > 0){
					$results['_id'] = $last_insert_id;
				}
				
				if($query && is_object($query)){
					while($row = mysqli_fetch_assoc($query)){
						$results[]=$row;
					}                       
					$query->close();
				}
				
			}
			
			return $results;			
		}
		
		function get_db_columns(){
			
			//$class_vars = get_class_vars(get_class($this));
			
			$columns = array_key_exists('columns',get_class_vars(get_class($this))) ? $this->columns : [];
			foreach($columns as $column_name=>$value){
				
				if(!is_array($value)){
					$name = $value;
					unset($columns[$column_name]);
					$column_name = $name;
				}
				
				//what if a foreign key has already been set....
				
				if((strlen($column_name) - strpos($column_name,'_id')) == 3){
					$columns[$column_name]['datatype'] 		= 'TINYINT(1)';
					$columns[$column_name]['foreign_key'] 	= 'true';
					$columns[$column_name]['not_null']		= 'true';
				}
				
				$columns[$column_name]['datatype'] 				= $columns[$column_name]['datatype'] 			?: 'VARCHAR(50)';
				$columns[$column_name]['not_null']				= $columns[$column_name]['not_null'] 			?: false;
				$columns[$column_name]['label'] 				= $columns[$column_name]['label'] 				?: str_replace('_',' ',$column_name);
				$columns[$column_name]['hidden_in_add_forms'] 	= $columns[$column_name]['hidden_in_add_forms'] ?: false;
				
				
				$columns[$column_name]['foreign_key'] 			= $columns[$column_name]['foreign_key'] 		?: false;
				
				if($columns[$column_name]['foreign_key']==true){
					$columns[$column_name]['foreigh_table']		= $columns[$column_name]['foreigh_table'] 		?: null;
				}
				
				$columns[$column_name]['source_table']			= $columns[$column_name]['source_table'] 		?: null;
			}
			return $columns;
		}
		
		function get_db_column_names(){
			
			return array_keys($this->get_db_columns());
		}
		
		function viewlist($param=[]){
			
			$param['data'] = array_key_exists('data',$param) ? $param['data'] : [];
			
			$viewlist_data = [
				'filename'	=>$this->get_module_path(['relative'=>false]).'/viewlist.html',				
				'data'		=>[
					'module_css'			=> '<link rel=stylesheet href="'.$this->get_module_path().'/'.get_class($this).'.css">',
					'module_js'				=> '<script src="'.$this->get_module_path().'/'.get_class($this).'.js"></script>'
				]
			];
			
			$viewlist_data['data'] = array_merge($viewlist_data['data'],$param['data']);
			
			print($this->get_template($viewlist_data));
		}
		
		function view($param=[]){
			$param['fields'] = array_key_exists('fields',$param) ? $param['fields'] : (array_key_exists('fields',$_GET) ? $_GET['fields'] : []);
			$this->debug($param['fields']);
			$this->debug($this->get($param['fields']),get_class($this).' Table Data');
			
			//then i must fetch any data that is linked to this table
			//http://stackoverflow.com/questions/806989/mysql-how-to-i-find-all-tables-that-have-foreign-keys-that-reference-particular
			
			/*
				SELECT 
					* 
				FROM
				information_schema.KEY_COLUMN_USAGE
			*/
			
			//so basically i need to dynamically create foreign key constraints in the setup function based on the naming convention
		}
		
		function add($param=[]){
			
			$param['fields'] = array_key_exists('fields',$param) ? $param['fields'] : (array_key_exists('fields',$_POST) ? $_POST['fields'] : []);
			$param['fields']	= $this->clean_array($param['fields']);
			
			
			//remove fields that are not in this table column data
			foreach($param['fields'] as $column=>$value){
				if(!in_array($column,$this->get_db_column_names())){
						unset($param['fields'][$column]);
				}
			}
			
			if(sizeof($param['fields'])==0){
				$this->error('Empty Field Data');
				return null;
			}
			
			$sql  = '
				INSERT INTO `'.get_class($this).'`
				(`'.implode(array_keys($param['fields']),'`,`').'`)
				VALUES
				("'.implode($param['fields'],'","').'")'
			;

			$added_result = $this->sql_query($sql);
			
			return $added_result;
		}
		
		function add_form(){
			
			//hide the primary key
			//set the required attribute for not null columns
			//disable the fields that are disabled in the settings for the add form
			//labels for the columns should be the label value or the replacement of the underscores in the name
			
			$add_form .= '<form class="add page nexus animation popup" method="?class='.get_class($this).'&method=add">';
			$add_form .= '<header>'.(get_class_vars(get_class($this))['add_form_settings']['title'] ?: (get_class_vars(get_class($this))['name'].' Add Form')).'</header>';
			
			$columns = $this->get_db_columns();
			
			foreach($columns as $column_name=>$column_data){
				
				if($column_data['hidden_in_add_form'] == true) continue;
				
				$add_form .= '<div class=field>';
				
				$add_form .= '<label>'.$column_data['label'].'</label>';
				
				if($column_data['foreign_key'] === true){
					$add_form .= '<select name="fields['.$column_name.']" required><option>Select an Option...</option></select>';
				}
				else if($column_data['datatype'] == 'DATE'){
					$add_form .= '<input type=date name="fields['.$column_name.']" required>';
				}
				else if($column_data['datatype'] == 'DATETIME'){
					$add_form .= '<input type=datetime-local name="fields['.$column_name.']" required>';
				}
				else{
					$add_form .= '<input name="fields['.$column_name.']" type="text" placeholder="Enter a Value..." required>';
				}
				
				$add_form .= '</div>';
				
			}
			
			$add_form .= '</form>';
			
			print($add_form);
				
			//$this->debug($columns);
			
			//$tmp = [
				//'filename'=>'add_form.html'
			//];
			
			//print($this->get_template($tmp));
		}
		
		function get($param=[]){
			$param['limit'] = 1;
			$param['_id']	= array_key_exists('_id',$param) ? $param['_id'] : null;
			return $this->get_list($param)[0];
		}
		
		function get_list($param=[]){
			
			$param['_id'] 	= array_key_exists('_id',$param)   ? intval($param['_id']) 	: null;
			$param['limit'] = array_key_exists('limit',$param) ? intval($param['limit']): null;
			$param['where'] = array_key_exists('where',$param) ? $param['where'] 		: null;
			$param['order'] = array_key_exists('order',$param) ? $param['order']		: null;
			
			$param['sql'] 	= 'SELECT * FROM `'.get_class($this).'` WHERE _deleted!=1 ';
			$param['sql']  .= ($param['where'] ? 'AND ('.$param['where'].')' : null).' '.($param['_id'] ? 'AND _id='.$param['_id'] : null).' ';
			$param['sql']  .= ($param['order'] ? 'ORDER BY '.$param['order'] : null);
			$param['sql']  .= ($param['limit'] ? 'LIMIT '.$param['limit'] : null);
			
			//$this->debug($param['sql']);
			
			$result 		= $this->sql_query($param);			
			return $result;
		}
	}	

?>
