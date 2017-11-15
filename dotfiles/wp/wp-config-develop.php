<?php
$debug_configs = [
  'WP_DEBUG',
  'WP_DEBUG_LOG',
  'WP_DEBUG_DISPLAY',
  'WP_AUTO_UPDATE_CORE',
  'SAVEQUERIES',
  'CONCATENATE_SCRIPTS',
  'COMPRESS_SCRIPTS',
  'COMPRESS_CSS',
  'WP_MEMORY_LIMIT' => '128MB',
  'max_execution_time' => '180',
  'memory_limit' => '128M',
  'post_max_size' => '32M',
  'upload_max_filesize' => '32M'
];
foreach( $debug_configs as $index => $value ){
  $constant = is_int( $index ) ? $value : $index;
  $constant_value = is_int( $index ) ? true : $value;
  if( defined( $constant ) ){
    continue;
  }
  define( $constant, $constant_value);
}

if( PHP_SAPI !== 'cli' ){
  define( 'WP_SITEURL', 'http://' . $_SERVER[ 'HTTP_HOST' ] );
  define('WP_HOME', 'http://' . $_SERVER[ 'HTTP_HOST' ] );
}

ini_set("html_errors", 1);
