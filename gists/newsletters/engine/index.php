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
                    	<table border="0" cellpadding="0" cellspacing="0" id="templateContainer">
                        	<tr>
                            	<td align="center" valign="top">
                                	<?php require_once("preheader.php"); ?>
                                </td>
                            </tr>
                        	<tr>
                            	<td align="center" valign="top">
                                	<?php require_once("header.php"); ?>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>
        </center>
    </body>
</html>
