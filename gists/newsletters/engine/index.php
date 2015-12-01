<?php ob_start(); ?>
<?php require_once("_newsletter_options.php"); ?>
<?php echo(file_get_contents("doctype.php")); ?>

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<?php require_once("meta_tags.php") ?>
    <title><?php echo $title; ?></title>
		<style type="text/css"><?php echo(file_get_contents("stylesheets/screen_beta.min.css"));?></style>
    <style type="text/css" ><?php echo(file_get_contents("stylesheets/styles.min.css"));?></style>
  </head>
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
    	<center>
        	<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0;mso-table-rspace: 0;border-collapse: collapse !important;background-color: #f5f5f5;height: 100% !important;margin: 0;padding: 0;width: 100% !important;color: #333;font-family: Helvetica, Tahoma, Arial">
            	<tr>
                	<td align="center" valign="top" id="bodyCell" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0;mso-table-rspace: 0;height: 100% !important;margin: 0;padding: 20px;width: 100% !important;color: #333;font-family: Helvetica, Tahoma, Arial;border-top: 4px solid #BBB">
                    	<table border="0" cellpadding="0" cellspacing="0" id="templateContainer" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0;mso-table-rspace: 0;border-collapse: collapse !important;background-color: #FFF;width: <?= $full_newsletter_width ?>;border-top:1px solid <?= $color_border ?>;border-right:1px solid <?= $color_border ?>;border-bottom:1px solid <?= $color_border ?>;border-left:1px solid <?= $color_border ?>; ">
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
													<tr>
                          	<td align="center" valign="top" style="padding-top:<?= $gap_small ?>;padding-right:<?= $gap_small ?>;padding-bottom:<?= $gap_small ?>;padding-left:<?= $gap_small ?>;">
                            	<?php require_once("top_story.php"); ?>
                            </td>
                          </tr>
													<tr>
														<td align="center" valign="top" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0;mso-table-rspace: 0">
															<?php require_once("columns.php"); ?>
														</td>
													</tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
    </body>
</html>

<?php
	$output = ob_get_contents();
	file_put_contents("output/index-".date('YmdHis').".html", $output);
?>
