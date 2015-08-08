<?php
    require_once("modules/nexus.php");
	class nexus_db extends nexus{


		//http://stackoverflow.com/questions/635937/how-do-i-specify-unique-constraint-for-multiple-columns-in-mysql
		//multiple unique columns
		//http://www.w3schools.com/sql/sql_unique.asp
		//unique constraint

		var $host 			= 'localhost';
		var $username 	= 'root';
		var $password 	= 'root';
		var $schema			= 'nexus';
		var $connection	= null;

		/*var $views		= [
			''
		];*/

		function __construct($param=array()){
			$this->name 													= $this->get_name();
			$this->settings['add_form']['title']	= get_class_vars(get_class($this))['settings']['add_form']['title'] 	?: $this->name.' Add Form';

			$this->settings['add_form']['hidden_fields'] 		= $this->settings['add_form']['hidden_fields'] ?: [];
			$this->settings['add_form']['disabled_fields'] 	= $this->settings['add_form']['disabled_fields'] ?: [];

			$this->settings['view']['title'] 			= get_class_vars(get_class($this))['settings']['view']['title'] 			?: $this->name.' View Form';
			$this->settings['viewlist']['title'] 	= get_class_vars(get_class($this))['settings']['viewlist']['title'] 	?: $this->name.' Viewlist';
			$this->settings['edit_form']['title']	= get_class_vars(get_class($this))['settings']['edit_form']['title'] 	?: 'Editing '. $this->name.' #(#_id#)';
			parent::__construct();
		}

		private function connect_to_db(){

			$this->connection = mysqli_connect($this->host, $this->username, $this->password, $this->schema);
			if ($this->connection->connect_error) {
				die("Connection failed: " . $this->connection->connect_error);
			}
			return true;
		}

		private function create_tables(){

			$nexus_classes = $this->get_modules(["extends"=>"nexus_db"]);

			//$this->debug($nexus_classes);

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


				$sql.='
						`_deleted` TINYINT(1) NOT NULL DEFAULT 0,
						`_added_by` TINYINT(1) NOT NULL DEFAULT 0,
						`_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

						PRIMARY KEY(`_id`),
						UNIQUE INDEX `_id_UNIQUE` (`_id` ASC)
					)
					ENGINE 					= InnoDB
					DEFAULT CHARACTER SET	= utf8
					COLLATE					= utf8_bin
				';

				//$this->debug($sql);
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
							//$this->debug($sql);
							$this->sql_query($sql);
						}


					}
				}
			}
		}

		//gonna have to make this private and some security as well
		//only top-level administrators can run this maybe
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

			$param 					= is_array($param) ? $param : (func_num_args()==1 ? ['sql'=>$param] : []);
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

			//$this->debug($param['sql']);

			return $results;
		}

		function get_db_columns(){

			$columns = array_key_exists('columns',get_class_vars(get_class($this))) ? $this->columns : [];

			/*$columns['_id'] = [
				'label'					=> '_id',
				'datatype'			=> 'INT',
				'foreign_key'		=> false,
			];*/

			foreach($columns as $column_name=>$value){

				if(!is_array($value)){
					$name = $value;
					unset($columns[$column_name]);
					$column_name = $name;
				}

				//what if a foreign key has already been set....
				$columns[$column_name]['label'] 				= $columns[$column_name]['label'] 				?: ucwords(str_replace('_',' ',$column_name));
				$columns[$column_name]['field_placeholder']		= $columns[$column_name]['field_placeholder']?: 'Enter a '.$columns[$column_name]['label'].'...';

				if(((strlen($column_name) - strpos($column_name,'_id')) == 3 && $column_name !=='_id') || $columns[$column_name]['foreign_key']==true){
					$columns[$column_name]['datatype'] 		= 'TINYINT(1)';
					$columns[$column_name]['foreign_key'] 	= true;
					$columns[$column_name]['not_null']		= true;
					$columns[$column_name]['field_placeholder'] = 'Select a '.$columns[$column_name]['label'].'...';
				}

				$columns[$column_name]['datatype'] 				= $columns[$column_name]['datatype'] 			?: 'VARCHAR(50)';
				$columns[$column_name]['not_null']				= !isset($columns[$column_name]['not_null']) ? true : $columns[$column_name]['not_null'];

				$columns[$column_name]['foreign_key'] 			= $columns[$column_name]['foreign_key'] 		?: false;

				if($columns[$column_name]['foreign_key']==true){
					$columns[$column_name]['foreigh_table']		= $columns[$column_name]['foreigh_table'] 		?: null;
				}

				$columns[$column_name]['source_table']			= $columns[$column_name]['source_table'] 		?: null;
			}

			return $columns;
		}

		function get_db_column_names(){

			$columns = ['_id'];
			$columns = array_merge($columns,array_keys($this->get_db_columns()));
			array_push($columns,'_deleted');
			array_push($columns,'_added_by');

			return $columns;
		}

		function viewlist($param=[]){

			$param['data'] = $param['data'] ?: [];

			$viewlist_table = '<table>';

				$viewlist_table .= '<thead>';
					foreach($this->get_db_column_names() as $key=>$name){
						$viewlist_table .= '<th class="'.$name.'">'.ucwords(str_replace('_',' ',$name)).'</th>';
					}

					$viewlist_table .= '<th class=actions>actions</th>';

				$viewlist_table .= '</thead>';

				$viewlist_table .= '<tbody>';

					foreach($this->get_list() as $key=>$row){
						$viewlist_table .= '<tr class="'.($row['_deleted'] == 1 ? ' deleted ' : '').'">';
						foreach($row as $column => $value){

							$column_info = get_class_vars(get_class($this))['columns'][$column];

							if($column_info['foreign_key'] == true && $column_info['datasource']){
								$sql = 'SELECT name FROM '.$column_info['datasource'].' WHERE _id ='.$value;
								$value = $this->sql_query($sql)[0]['name'];
							}

							else{
								$value = $value;
							}

							$viewlist_table .= '<td class="'.$column.'">'.$value.'</td>';
						}

						$viewlist_table .= '
							<td class=actions>
								<button class="delete fa fa-minus-square" title="Delete"></button>
								<a class="button view fa fa-info-circle" title="View" href="?class='.get_class($this).'&method=view&_id='.$row['_id'].'"></a>
								<a class="button edit fa fa-pencil-square" title="Edit" href="?class='.get_class($this).'&method=edit_form&_id='.$row['_id'].'"></a>
							</td>
						';

						$viewlist_table .= '</tr>';
					}

				$viewlist_table .= '</tbody>';

			$viewlist_table .= '</table>';

			$viewlist_data = [
				'filename'	=>'viewlist.html',
				'data'		=>[
					'title'						=>	$this->settings['viewlist']['title'],
					'viewlist_table'	=>  $viewlist_table
					]
				];

			$viewlist_data['data'] = array_merge($viewlist_data['data'],$param['data']);
			print($this->get_template($viewlist_data));
		}

		function view($param=[]){


			$param['_id'] = $param['_id'] ?: $_GET['_id'];

			$param['title']			= $this->settings['view']['title'];
			$param['function']	= __FUNCTION__;
			$param['fields'] 		= $this->get_fields($param);
			$param['js']				= '';
			$param['css']				= '';
			$param['menu_options']	= '';

			foreach($this->settings['view']['menu_options'] as $key=>$value){
					$param['menu_options'] .= '<li class=menu_item>'.$value.'</li>';
			}

			print($this->get_template(['filename'=>'view.html','data'=>$param]));
		}

		function pre_add(){

			return true;
		}

		function add($param=[]){

			if(!$this->pre_add()){return false;}

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
				("'.implode($param['fields'],'","').'")
			';

			$added_result = $this->sql_query($sql);
			$this->view($added_result);

			return $added_result;
		}

		function add_form(){

			$add_form_data = [
				'title'		=> $this->settings['add_form']['title'],
				'fields'	=> $this->get_fields(),
				'js'			=> $this->settings['add_form']['js'],
				'css'			=> $this->settings['add_form']['css']
			];

			print($this->get_template(['filename'=>'add_form.html','data'=>$add_form_data]));

		}

		function get_fields($param=[]){

			$columns = $this->get_db_columns();

			$fields = '';

			$row_data = ($param['_id']) ? $this->get(['_id'=>$param['_id']]) : [];

			if($param['_id'] && $param['function']=='view'){

				foreach($columns as $column_name=>$column_data){

					if($column_data['foreign_key']==true && $column_data['datasource']){
						$sql 		= 'SELECT name FROM `'.$column_data['datasource'].'` WHERE _id='.$row_data[$column_name];
						$value	= $this->sql_query($sql)[0]['name'];
					}
					else{
						$value = $row_data[$column_name];
					}

					$fields .= '
						<div id="field_'.$column_name.'" class="field">
							<label>'.$column_data['label'].'</label>
							<input type=text value="'.$value.'" disabled>
						</div>
					';
				}

			}else{
				foreach($columns as $column_name=>$column_data){

					//dont show hidden fields
					//if(in_array($column_name,get_class_vars(get_class($this))['settings']['add_form']['hidden_fields'])) continue;
					if(in_array($column_name,$this->settings['add_form']['hidden_fields'])) continue;


					//$disabled_flag = null;
					//if(in_array($column_name,get_class_vars(get_class($this))['settings']['add_form']['disabled_fields'])) $disabled_flag='disabled=disabled';
					$disabled_flag = (in_array($column_name,$this->settings['add_form']['disabled_fields'])) ? 'disabled=disabled' : null;

					$required_flag = $column_data['not_null'] === true ? 'required' : null;

					$fields .= '<div id="field_'.$column_name.'" class="field '.$required_flag.'">';

					$fields .= '<label>'.$column_data['label'].'</label>';

					if($column_data['foreign_key'] == true){

						$fields .= '<select name="fields['.$column_name.']" '.$required_flag.' '.$disabled_flag.'><option value="">'.$column_data['field_placeholder'].'</option>';
						$options = $this->sql_query('SELECT * FROM `'.$column_data['datasource'].'` WHERE _deleted!=1');

						foreach($options as $key=>$value){

							$selected_flag = ($param['function'] == 'edit_form' && $value['_id'] == $row_data[$column_name]) ? 'selected' : null;

							$fields .= '<option value="'.$value['_id'].'" '.$selected_flag.'>'.$value['name'].'</options>';
						}
						$fields .='</select>';
					}
					else if($column_data['datatype'] == 'DATE'){

						if($column_data['max']=='today'){

							$column_data['max'] = date('Y-m-d');
							$column_data['value'] = ($param['function'] == 'edit_form') ? $row_data[$column_name] : $column_data['max'];
						}

						$fields .= '<input type=date name="fields['.$column_name.']" max="'.$column_data['max'].'" value="'.$column_data['value'].'" '.$required_flag.' '.$disabled_flag.'>';
					}
					else if($column_data['datatype'] == 'DATETIME'){
						$fields .= '<input type=datetime-local name="fields['.$column_name.']" '.$required_flag.' '.$disabled_flag.'>';
					}
					else{
						$list_name = null;

						if($column_data['datasource']){

							$list_options = $this->sql_query('SELECT * FROM `'.$column_data['datasource'].'` WHERE _deleted!=1');
							$list_name = $column_name.'_list';
							$fields .= '<datalist id="'.$list_name.'">';
							foreach($list_options as $key=>$value){
								$fields .= '<option value="'.$value['name'].'">';
							}
							$fields .= '</datalist>';
						}

						$field_value = ($param['function'] == 'edit_form') ? $row_data[$column_name] : null;

						$fields .= '<input name="fields['.$column_name.']" type="text" placeholder="'.$column_data['field_placeholder'].'" '.$required_flag.' '.$disabled_flag. ' ' .($list_name ? 'list="'.$list_name.'"' : ''). ' value="'.$field_value.'">';

					}

					$fields .= '</div>';

				}
			}

			$fields = '<div class=fields>'.$fields.'</div>';
			return $fields;
		}

		function get($param=[]){
			$param['limit'] = 1;
			$param['_id']		= array_key_exists('_id',$param) ? $param['_id'] : null;
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

			$result = $this->sql_query($param);
			return $result;
		}

		function edit_form($param=[]){

			$param['_id'] = $param['_id'] ?: $_GET['_id'];

			$edit_form_data = $param;

			$edit_form_data['title'] 	= $this->settings['edit_form']['title'];
			$edit_form_data['fields'] = $this->get_fields(['_id'=>$param['_id'],'function'=>__FUNCTION__]);

			print($this->get_template(['filename'=>__FUNCTION__.'.html','data'=>$edit_form_data]));
		}

		function edit($param=[]){

			$data = array_merge($_GET,$_POST);
			//$this->debug($data);

			//run the update here
			//then fetch the new data and show the view form
			$this->view(['_id'=>$data['_id']]);
		}
	}

?>
