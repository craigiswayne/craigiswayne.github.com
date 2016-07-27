<?php
if (version_compare(phpversion(), '5.3.0', '<')===true) {
    echo  '<div style="font:12px/1.35em arial, helvetica, sans-serif;">
<div style="margin:0 0 25px 0; border-bottom:1px solid #ccc;">
<h3 style="margin:0; font-size:1.7em; font-weight:normal; text-transform:none; text-align:left; color:#2f2f2f;">
Whoops, it looks like you have an invalid PHP version.</h3></div><p>Magento supports PHP 5.3.0 or newer.
<a href="http://www.magentocommerce.com/install" target="">Find out</a> how to install</a>
 Magento using PHP-CGI as a work-around.</p></div>';
    exit;
}

define('MAGENTO_ROOT', getcwd());

$compilerConfig = MAGENTO_ROOT . '/includes/config.php';
if (file_exists($compilerConfig)) {
    include $compilerConfig;
}

$mageFilename = MAGENTO_ROOT . '/app/Mage.php';
$maintenanceFile = 'maintenance.flag';

if (!file_exists($mageFilename)) {
    if (is_dir('downloader')) {
        header("Location: downloader");
    } else {
        echo $mageFilename." was not found";
    }
    exit;
}

if (file_exists($maintenanceFile)) {
    include_once dirname(__FILE__) . '/errors/503.php';
    exit;
}

require MAGENTO_ROOT . '/app/bootstrap.php';
require_once $mageFilename;

#Varien_Profiler::enable();

if(isset($_COOKIE["XDEBUG_SESSION"])){
    set_time_limit("0");
}

$force_clear = false;
if (isset($_SERVER['MAGE_IS_DEVELOPER_MODE'])) {
    Mage::setIsDeveloperMode(true);
    parse_str($_SERVER['QUERY_STRING'], $_SERVER['MAGE_IS_DEVELOPER_MODE']);
    $_SERVER['MAGE_IS_DEVELOPER_MODE']['cache'] = isset($_SERVER['MAGE_IS_DEVELOPER_MODE']['cache']) ? $_SERVER['MAGE_IS_DEVELOPER_MODE']['cache'] : 'true';
    if ($_SERVER['MAGE_IS_DEVELOPER_MODE']['cache'] == 'false' || $force_clear) {
        $cache_types = Mage::app()->getCacheInstance()->getTypes();
        foreach ($cache_types as $key => $val) {
            Mage::app()->getCacheInstance()->cleanType($key);
        }
        Enterprise_PageCache_Model_Cache::getCacheInstance()->cleanType('full_page');

        $directories_to_empty = [
            Mage::getBaseDir("cache"),
            dirname(Mage::getBaseDir("cache")).DS."full_page_cache"
        ];

        foreach($directories_to_empty as $dir){
            #FIXME if directory doesn't exist then move on
            $di = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
            $ri = new RecursiveIteratorIterator($di, RecursiveIteratorIterator::CHILD_FIRST);
            foreach ( $ri as $file ) {
                $file->isDir() ?  rmdir($file) : unlink($file);
            }
            rmdir($dir);
        }
    }
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

umask(0);

/* Store or website code */
$mageRunCode = isset($_SERVER['MAGE_RUN_CODE']) ? $_SERVER['MAGE_RUN_CODE'] : '';

/* Run store or run website */
$mageRunType = isset($_SERVER['MAGE_RUN_TYPE']) ? $_SERVER['MAGE_RUN_TYPE'] : 'store';

Mage::run($mageRunCode, $mageRunType);
