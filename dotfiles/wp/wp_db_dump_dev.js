'use strict';

/**
 * Used for coloured output
 */
require( 'manakin' ).global;

/**
 * Used for shell execution in node
 */
const sh = require( 'shelljs' );

/**
 * This script needs to be run within a valid WordPress installation
 */
const wp_is_installed = sh.exec( 'wp core is-installed' );
if( 0 !== wp_is_installed.code ){
  console.error( 'You can only run this within a WordPress installation.' );
  return;
}
const quiet_mode = -1 === process.argv.indexOf( '-q' ) ? false : true;


console.info( 'Dumping DB From Dev' );



// db_name="$(wp_db_name)";
// echo "DB Name: [$db_name]";
// wp db create;
// if ! $(wp core is-installed); then
//   wp core install
// fi
// db_filename="$db_name".sql;
// mysqldump -u$DEV_MYSQL_USERNAME -p$DEV_MYSQL_PASSWORD -h$DEV_MYSQL_HOST $db_name --verbose > $(wp eval "echo ABSPATH;")$db_filename;
// echo "DB File Saved in root as : $db_filename";
// echo "You can now simply just run $ wp db import";
// echo "################################################";
