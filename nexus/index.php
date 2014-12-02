<?php
	
	if(!$_GET){
		//$nd = new nexus_directory();
		//$nd->viewlist();
		
		$nc = new nexus_claims();
		$nc->add_form();
	}
	else if($_GET['method'] && $_GET['class']){
		$c = new $_GET['class'](['method'=>$_GET['method']]);
	}
?>
