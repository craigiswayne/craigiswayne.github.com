<?php

//the clean array function is NOT recursive
//array filter, verify that it is the same as the clean function
//also the array_filter method should be used in the add method

	class nexus{

		public $name;
		var $settings = [
			'templates_path'=>'templates/'
		];

		function get_name(){
			$name = get_class($this);
			$name = str_replace('nexus_','',$name);
			$name = str_replace('_',' ',$name);
			$name = ucwords($name);
			return $name;
		}

		function get_template($param=[]){

			if(file_exists($param['filename'])){
				$param['filename'] = $param['filename'];
			}
			else if(file_exists($this->get_module_path(['relative'=>false]).'/'.$param['filename'])){
				$param['filename'] = $this->get_module_path(['relative'=>false]).'/'.$param['filename'];
			}
			else if(file_exists('templates/'.$param['filename'])){
				$param['filename'] = 'templates/'.$param['filename'];
			}
			else{
				$parent = get_parent_class($this);
				$parent = new $parent();
				if(file_exists($parent->get_module_path().'/'.$param['filename'])){

					$param['filename'] = $parent->get_module_path().'/'.$param['filename'];
				}
				else if(file_exists($parent->get_module_path(['relative'=>false]).'/'.$param['filename'])){
					$param['filename'] = $parent->get_module_path(['relative'=>false]).'/'.$param['filename'];
				}
			}

			if(!file_exists($param['filename'])){$this->error('Could not find file '.$param['filename']); return null;}

			$template = file_get_contents($param['filename']);

			$param['data'] 				= array_key_exists('data',$param) ? $param['data'] : [];
			$param['data']['method'] 	= array_key_exists('method',$param['data']) ? $param['data']['method'] : (debug_backtrace()[1]['function'] ?: null);
			$param['data']['class_name'] = $param['data']['class_name'] ?: get_class($this);

			return $this->parse_template($template,$param['data']);
		}

		function parse_template($template,$data){

			//these are gonna be the global variables
			//these values must get fetched from the setup file\module

			$data['year']																= getdate()['year'];
			$data['month']															= intval(getdate()['mon']) < 10 ? ('0'.getdate()['mon']) : getdate()['mon'];
			$data['day']																= getdate()['mday'];
			$data['weekday']														= getdate()['weekday'];
			$data['today']															= $data['year'].'-'.$data['month'].'-'.$data['day'];

			$data['class']															= get_class($this);
			$data['organisation_letterhead_landscape']	= '<img class="letterhead landscape" src="images/organisation_letterhead_landscape.png">';
			$data['organisation_letterhead_portrait']		= '<h1>not yet set</h1';
			$data['organisation_letterhead']						= $data['company_letterhead_portrait'];

			while(preg_match("/\(#(.*?)#\)/", $template)){
				if (preg_match_all("/\(#(.*?)#\)/", $template, $variables)){

					foreach ($variables[1] as $i => $variable_name){

						$match		= array_key_exists($variable_name,$data) ? $data[$variable_name] : '';
						$match		= is_array($match) ? json_encode($match) : $match;
						$template	= str_replace($variables[0][$i],$match, $template);
					}
				}
			}

			return $template;
		}

		function log_off(){
			$this->connection->close();
		}

		function __construct($param=array()){

			$this->name = $this->get_name();

			$param = is_array($param) ? $param : [];
			$param = array_merge($param,$_GET);

			$param['method'] = array_key_exists('method',$param) ? $param['method'] : null;

			if($param['method']){
				if(method_exists($this,$param['method'])){
					$_GET['method'] = null;
					$this->$param['method']();
				}
				else{
					$this->error('Method: '.$param['method'].' does not exist in '.get_class($this).'.php');
				}
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

				//$this->debug($extension);
				//$this->debug(strpos($filename,'nexus'));
				//$this->debug($filename);

				//print($filename.'<br/>');
				//print($extension.'<br/>');

				//exclude the prepended file and the appended file
				/*if($extension != 'php' || strpos($filename,'nexus') == false || $filename == 'nexus.php'){
					print($filename.' didnt make it through <br/>');
					print('extension: `'. $extension.'`<br/>');
					print('filename: `'. $filename.'`<br/>');
					print('path: '. $filename.'<br/>');
					print('pos: `'.strpos($filename,'nexus').'`');
					print('<hr>');
					continue;
				}*/

				if($extension!='php' || strpos($filename,'nexus_')===false){
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

			print '<link rel=stylesheet href="css/nexus.css">';
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
