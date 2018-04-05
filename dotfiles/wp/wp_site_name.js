'use strict';

/**
 * Used for colors
 */
require( 'manakin' ).global;

/**
 * Used for shell execution in node
 */
const sh = require( 'shelljs' );
const default_wp_params = '--skip-packages --skip-plugins --skip-themes --allow-root';

var wp_is_installed = sh.exec( 'wp core is-installed ' + default_wp_params, {
  silent: true
} );

if( 0 !== wp_is_installed.code ){
  console.error( 'You can only run this within a WordPress installation.' );
  sh.exit( wp_is_installed.code );
}


var site_url = sh.exec( 'wp option get siteurl --skip-packages ' + default_wp_params );