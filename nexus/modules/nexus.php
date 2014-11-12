<?php

	class nexus{
		
		
		function get_template($param=array()){
			
			$template = file_get_contents($param['filename']);
			
			if (preg_match_all("/\(#(.*?)#\)/", $template, $variables)){
				
			  foreach ($variables[1] as $i => $variable_name){
			  	
			  	$match		= array_key_exists($variable_name,$param['data']) ? $param['data'][$variable_name] : 'undefined';
			  	$match		= is_array($match) ? json_encode($match) : $match;
				$template	= str_replace($variables[0][$i],$match, $template);
			  }
			}
			
			return $template; 
		}
		
		function log_off(){
			$this->connection->close();
		}
		
		function __construct($param=array()){
			
			$param = is_array($param) ? $param : array();
			$param = array_merge($param,$_GET);
			
			$param['method'] = array_key_exists('method',$param) ? $param['method'] : null;
			
			if(method_exists($this,$param['method'])){$this->$param['method']();}
			
		}
		
		function get_modules(){
			$nexus_modules = [];
			
			foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator(dirname(__FILE__))) as $file){
				$filename  = pathinfo($file, PATHINFO_FILENAME);
				$extension = pathinfo($file, PATHINFO_EXTENSION);
				if($extension == 'php' && strpos($file,'nexus')>0 && $filename != 'nexus'){
					array_push($nexus_modules,$filename);
				}
			}
			return $nexus_modules;
		}
		
		function debug($object){
			print '<details class=debug open>';
			print '<summary>Debug</summary>';
			print'<pre>';
				print_r($object);
			print'</pre>';
			print '</details>';
		}
		
	}
	
	
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
	}
	
	//something wrong with the file_get_contents catch
	//set_error_handler('exceptions_error_handler');

?>
