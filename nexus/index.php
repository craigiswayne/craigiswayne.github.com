<?php

	if(!$_GET['ajax']){
		print('<head>');
			print('<title>Nexus | Domestic</title>');
			print('<link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">');

			print('<script src="js/nexus.js"></script>');
			print('<script src="js/jQuery/jquery-1.11.0.js"></script>');

			print('<link rel=stylesheet href="css/nexus.css">');
			print('<link rel=stylesheet href="modules/nexus_directory/nexus_directory.css">');
			print('<link rel=stylesheet href="css/font-awesome-4.2.0/css/font-awesome.css">');
		print('</head>');
		print('<body>');

		//try auto generate this
		$backend_header = '
			<header id="backend_main_header">

				<nav class=menu style="display:none">

					<a href="?" class="fa fa-home menu_item"></a>

					<a href="?class=nexus_directory&method=viewlist">Directory</a>

					<div class="fa fa-gavel menu_item">
						<a href="?class=nexus_claims&method=viewlist">claims</a>
						<ul class="menu">
							<li><a href="?class=nexus_claims&method=viewlist">Viewlist</a></li>
							<li>View</li>
							<li>New</li>
						</ul>
					</div>

					<div>
						Timesheets
						<ul>
							<li>Create</li>
						</ul>
					</div>

					<div>
						Forms
						<ul>
						<li><a href="?class=nexus_trip_sheets&method=add_form">Trip Sheet</a></li>
						</ul>
					</div>

				</nav>

			</header>
		';

		print($backend_header);
	}

	if(!$_GET){
		//what to show as the defaul screen
		//this should be a default dashboard
		//allow users to customize their dashboards
		$nc = new nexus_claims();
		$nc->add_form();
	}
	else if($_GET['method'] && $_GET['class']){
		new $_GET['class'](['method'=>$_GET['method']]);
	}
	else if($_GET['class']){
		$m = new $_GET['class']();
		$m->viewlist();
	}

	if(!$_GET['ajax']){
		print('</body>');
	}
?>
