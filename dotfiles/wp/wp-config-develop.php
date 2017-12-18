<?php
$debug_configs = [
	'WP_DEBUG',
	'IMPORT_DEBUG',
	'WP_DEBUG_LOG',
	'WP_DEBUG_DISPLAY',
	'WP_AUTO_UPDATE_CORE',
	'AUTOMATIC_UPDATER_DISABLED' => false,
	'SAVEQUERIES',
	'CONCATENATE_SCRIPTS',
	'COMPRESS_SCRIPTS',
	'COMPRESS_CSS',
	'WP_MEMORY_LIMIT'     => '128MB',
	'max_execution_time'  => '180',
	'memory_limit'        => '128M',
	'post_max_size'       => '32M',
	'upload_max_filesize' => '32M',
	'DISALLOW_FILE_MODS'  => false,
	'DISALLOW_FILE_EDIT'	=> true
	// 'DB_HOST'							=> 'localhost',
	// 'DB_USER'							=> 'wordpress',
	// 'DB_PASSWORD'					=> 'wordpress'
];

// $debug_configs = [];

foreach ( $debug_configs as $index => $value ) {
	$constant       = is_int( $index ) ? $value : $index;
	$constant_value = is_int( $index ) ? true : $value;
	if ( defined( $constant ) ) {
		continue;
	}
	define( $constant, $constant_value );
}

if ( PHP_SAPI !== 'cli' && isset( $_SERVER[ 'HTTP_HOST' ] ) && isset( $_SERVER[ 'REQUEST_SCHEME' ] ) ) {
	define( 'WP_SITEURL', $_SERVER[ 'REQUEST_SCHEME' ] . '://' . $_SERVER[ 'HTTP_HOST' ] );
	define( 'WP_HOME', $_SERVER[ 'REQUEST_SCHEME' ] . '://' . $_SERVER[ 'HTTP_HOST' ] );
}

ini_set( "html_errors", 1 );
