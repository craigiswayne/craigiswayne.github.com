<?php
	require_once("nexus.php");
	require_once("nexus_db.php");
	
	require_once("nexus_directory/nexus_directory_entries.php");
	
	require_once("nexus_directory/nexus_directory_labels.php");
	require_once("nexus_directory/nexus_directory_labels_categories.php");
	
	require_once("nexus_directory/nexus_directory_linked_contacts.php");
	
	require_once("nexus_directory/nexus_directory_linked_addresses/nexus_directory_linked_addresses.php");
	require_once("nexus_directory/nexus_directory_linked_addresses/nexus_directory_address_types.php");
	
	
	/*function __autoload($className) { 
	  if (file_exists($className . '.php')) { 
		  require_once $className . '.php'; 
	  } 
	  return false; 
	}*/
	
	/*
	foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator(dirname(__FILE__))) as $file){
		$filename  = pathinfo($file, PATHINFO_FILENAME);
		$extension = pathinfo($file, PATHINFO_EXTENSION);
		if($extension == 'php' && strpos($file,'nexus')>0 && $filename != 'nexus'){
			
			//print $file.'<br/>';
			
			//include($file);
			
			//print 'required '.$filename.'.'.$extension.'<br/>';
			
			//define($filename,new $filename());
			
			//print 'defined '.$filename.'.'.$extension.'<br/><br/>';
			
		}
	}
	
	function exceptions_error_handler($severity, $message, $filename, $lineno){
	
	  if (error_reporting() == 0) {
		return;
	  }
	  
	  if (error_reporting() & $severity) {
	  	
		//catch all the file get contents errors
		if(strpos('file_get_contents',$message) == 0){	  		
			$tmp_params = [
				'filename'	=>dirname(__FILE__).'/../templates/broken_link.html',
				'data'		=>[
					'filename' => $message
				]
			];
			$nexus = new nexus;
			print($nexus->get_template($tmp_params));
		}
		else{
			throw new ErrorException($message, 0, $severity, $filename, $lineno);
		}
	  }
	}*/	
	
	//something wrong with the file_get_contents catch
	//set_error_handler('exceptions_error_handler');
	/*function __autoload($className) { 
		  if (file_exists($className . '.php')) { 
			  require_once $className . '.php'; 
		  } 
		  return false; 
	}*/
	
	//function __construct($param=[]){
		//print("loaded");
	//}
	
	///function run(){
		//print(get_class());
	//}
	//run();
	
	/*print_r(__LINE__);
	print("<br/>");
	print_r(__FILE__);
	print("<br/>");
	print_r(__FUNCTION__);
	print("<br/>");
	print_r(__CLASS__);
	print("<br/>");
	print_r(__METHOD__);
	print("<br/>");
	print_r(__DIR__);
	print("<br/>");
	print_r(__NAMESPACE__);
	*/
	
	/*function run_method(){
		
		$filename = pathinfo($_SERVER['SCRIPT_FILENAME'],PATHINFO_FILENAME);
		$basename = pathinfo($_SERVER['SCRIPT_FILENAME'],PATHINFO_BASENAME);
	
		$filename = 'nexus_directory_linked_addresses';
		
		if(class_exists($filename)){
			print('exists');
		}
		else{
			print('does not exist');
			
			$c = new nexus_directory_linked_addresses();
			print_r($c->columns);

			
			//require_once("nexus_directory/nexus_directory_linked_addresses/nexus_directory_linked_addresses.php");
			//$c = new $filename();
			//print_r(get_declared_classes());
			//$c = new nexus_directory_linked_addresses();
			//print_r(self);
		}
		
		//$class_obj = new ReflectionClass($basename);
		//print($filename);
		//$filename = str_replace(dirname($_SERVER['SCRIPT_FILENAME']).'/','',$_SERVER['SCRIPT_FILENAME']);
		//print($filename);
		
		//print_r(pathinfo($_SERVER['SCRIPT_FILENAME']));
		
		//$script_filename = 
		//$current_class = 
		//print_r(explode('/',$_SERVER['SCRIPT_FILENAME']));	
	}
	
	//if(array_key_exists('method',$_GET)){
		//unset($_GET['method']);
		run_method();	
	//}*/
	
?>
