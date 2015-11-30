<?php require_once("_newsletter_options.php"); ?>
<?php echo(file_get_contents("doctype.php")); ?>

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<?php require_once("meta_tags.php") ?>
    <title><?php echo $title; ?></title>
    <style type="text/css" ><?php echo(file_get_contents("stylesheets/styles.min.css"));?></style>
  </head>
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
    	<center>
        	<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            	<tr>
                	<td align="center" valign="top" id="bodyCell">
                    	<table border="0" cellpadding="0" cellspacing="0" id="templateContainer" style="border-top: 1px solid <?= $color_border ?>;border-right: 1px solid <?= $color_border ?>;border-bottom: 1px solid <?= $color_border ?>;border-left: 1px solid <?= $color_border ?>;">
                        	<tr>
                            	<td align="center" valign="top">
                                	<?php require_once("preheader.php"); ?>
                                </td>
                            </tr>
                        	<tr>
<<<<<<< HEAD
<<<<<<< HEAD
                          	<td align="center" valign="top">
                            	<?php require_once("header.php"); ?>
                            </td>
                          </tr>
													<tr>
														<td id="focus_block_container">
															
														</td>
													</tr>
=======
=======
>>>>>>> parent of 3db776d... Newsletter | Preheader & Header
                            	<td align="center" valign="top">
                                	<?php require_once("header.php"); ?>
                                </td>
                            </tr>
<<<<<<< HEAD
>>>>>>> parent of 3db776d... Newsletter | Preheader & Header
=======
>>>>>>> parent of 3db776d... Newsletter | Preheader & Header
                        </table>

                    </td>
                </tr>
            </table>
        </center>
    </body>
</html>
