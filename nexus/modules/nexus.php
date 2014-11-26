<?php

//the clean array function is NOT recursive
//array filter, verify that it is the same as the clean function
//also the array_filter method should be used in the add method

	class nexus{
		
		
		function get_template($param=array()){
			
			$template = file_get_contents($param['filename']);
			
			$param['data'] 				= array_key_exists('data',$param) ? $param['data'] : [];
			$param['data']['method'] 	= array_key_exists('method',$param['data']) ? $param['data']['method'] : (debug_backtrace()[1]['function'] ?: null);
			
			if (preg_match_all("/\(#(.*?)#\)/", $template, $variables)){
				
			  foreach ($variables[1] as $i => $variable_name){
			  	
			  	$match		= array_key_exists($variable_name,$param['data']) ? $param['data'][$variable_name] : '';
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
			
			if(method_exists($this,$param['method'])){
				$_GET['method'] = null;
				$this->$param['method']();
			}
		}
		
		function get_modules($param=[]){
			$nexus_modules = [];
			
			$param['extends'] = array_key_exists('extends',$param) ? $param['extends'] : 'nexus';
			
			foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator(dirname(__FILE__))) as $file){
				//http://php.net/manual/en/class.splfileinfo.php
				$filename	= $file->getFilename();
				$path		= $file->getPath();
				$extension	= $file->getExtension();
				$basename	= $file->getBasename('.php');
				
				//exclude the prepended file and the appended file
				
				if($extension != 'php' || strpos($file,'nexus')<1 || $filename == 'nexus' || $filename == 'header.php'){
					continue;
				}
				
				require_once($path.'/'.$filename);

				$class = new $basename;
				$rf_class = new ReflectionClass($class);
				if($rf_class->isSubclassOf($param['extends'])){
					$nexus_modules[$basename] = $class;
				}
			}
			return $nexus_modules;
		}
		
		function debug($object){
			
			$title = (func_num_args() == 2) ? func_get_arg(1) : 'Debug';
			
			if(is_array($object) && func_num_args() == 1){
				$title = 'Debugging Array('.sizeof($object).')';
			}
			
			print '<link rel=stylesheet href="../../nexus/css/nexus.css">';
			print '<details class=debug open>';
			print '<summary>'.$title.'</summary>';
			print'<pre>';
				print_r($object);
			print'</pre>';
			print '</details>';
		}
		
		function error($param=[]){
			
			print '<link rel=stylesheet href="../../nexus/css/nexus.css">';
			print '<details class=debug open>';
			print '<summary>Error ('.get_class($this).')</summary>';
			print'<pre>';
				print_r($param);
			print'</pre>';
			print '</details>';
		}
		
		function get_module_path($param=[]){
			
			$param['relative'] = array_key_exists('relative',$param) ? $param['relative'] : true;
			
			$reflector = new ReflectionClass(get_class($this));
			$fn = $reflector->getFileName();
			$path = dirname($fn);
			
			$path = ($param['relative'] === true) ? str_replace($_SERVER['DOCUMENT_ROOT'],'',$path) : $path;
			
			return $path;
		}
		
		function clean_array($array=[]){
			
			$array = array_filter($array);
			
			foreach($array as $key=>$value){
				if(is_array($value)){
					$array[$key] = array_filter($array[$key]);
				}
			}
			$array = array_filter($array);
			return $array;
		}
	}

?>
