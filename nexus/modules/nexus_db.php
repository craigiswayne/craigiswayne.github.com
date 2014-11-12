<?php
	
	require_once("nexus.php");
	
	class nexus_db extends nexus{
		
		
		//http://stackoverflow.com/questions/635937/how-do-i-specify-unique-constraint-for-multiple-columns-in-mysql
		//multiple unique columns
		
		var $host 		= "192.168.0.10";
		var $username 	= "root";
		var $password 	= "P7683286r!?";
		var $schema		= "nexus";
		var $connection	= null;
		
		var $setup_complete = false;
		
		function connect_to_db(){
		
			$this->connection = mysqli_connect($this->host, $this->username, $this->password, $this->schema);
			if ($this->connection->connect_error) {
				die("Connection failed: " . $this->connection->connect_error);
			}
		}
			
		function sql_query($param=array()){
			
			$param 			= is_array($param) ? $param : (func_num_args()==1 ? ['sql'=>$param] : []);
			$param['sql'] 	= array_key_exists('sql',$param) ? $param['sql'] : null;
			
			$results = array();
				
			if(!$this->connection){$this->connect_to_db();}
			
			if($param['sql']){
				$query = mysqli_query($this->connection ,$param['sql']);
				if($query && is_object($query)){
					while($row = mysqli_fetch_assoc($query)){
						$results[]=$row;
					}
					$query->close();
				}
				
			}
			
			return $results;			
		}
		
		function viewlist(){
		}
		
		function view(){
		}
		
		function add_form(){
			print('nothing set for this add form');
		}
			
		function setup(){			
			
			if(!$this->setup_complete){
				
				$sql = "CREATE DATABASE ".$this->schema;
				$this->sql_query(["sql"=>$sql]);
				
				$sql = "USE DATABASE ".$this->schema;
				$this->sql_query(["sql"=>$sql]);
				
				
				$declared_classes = get_declared_classes();
				$nexus_classes = $this->get_modules();
				
				print("<pre>");
					print_r($nexus_classes);
				print("</pre>");
				
				unset($nexus_classes['nexus']);
				unset($nexus_classes['nexus_db']);
				
				foreach($nexus_classes as $key=>$value){
					require_once('"'.$nexus_classes[$key].'.php"');                                  
				}
				
				
				return null;
				
				foreach($declared_classes as $key=>$value){
					
					$class = new ReflectionClass($declared_classes[$key]);
					if($class->isSubclassOf("nexus_db")){
						
						$tmp_sql = '
							CREATE TABLE IF NOT EXISTS `'.$this->schema.'`.`'.$declared_classes[$key].'`(
								`_id` INT NOT NULL AUTO_INCREMENT,
								`_deleted` TINYINT(1) NOT NULL DEFAULT 0,
								PRIMARY KEY(`_id`),
								UNIQUE INDEX `_id_UNIQUE` (`_id` ASC)
							)
							ENGINE = InnoDB
							DEFAULT CHARACTER SET = utf8
							COLLATE = utf8_bin
						';
						
						$this->sql_query(["sql"=>$tmp_sql]);
					}
				}
				
				$this->setup_complete = true;
				return $this->setup_complete;
				
			}
		}
		
		function get_list(){
			return $this->sql_query('SELECT * FROM `'.get_class($this).'` WHERE _deleted!=1');
		}
	}
	
	

?>
