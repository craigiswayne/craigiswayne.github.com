<?php
/**
 * Magento Enterprise Edition
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magento Enterprise Edition End User License Agreement
 * that is bundled with this package in the file LICENSE_EE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.magento.com/license/enterprise-edition
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magento.com for more information.
 *
 * @category    Mage
 * @package     Mage
 * @copyright Copyright (c) 2006-2015 X.commerce, Inc. (http://www.magento.com)
 * @license http://www.magento.com/license/enterprise-edition
 */
ini_set('memory_limit', '1G');
// Change current directory to the directory of current script
chdir(dirname(__FILE__));

require 'app/bootstrap.php';
require 'app/Mage.php';

if (!Mage::isInstalled()) {
    echo "Application is not installed yet, please complete install wizard first.";
    exit;
}

// Only for urls
// Don't remove this
$_SERVER['SCRIPT_NAME'] = str_replace(basename(__FILE__), 'index.php', $_SERVER['SCRIPT_NAME']);
$_SERVER['SCRIPT_FILENAME'] = str_replace(basename(__FILE__), 'index.php', $_SERVER['SCRIPT_FILENAME']);

Mage::app('admin')->setUseSessionInUrl(false);

umask(0);

$disabledFuncs = explode(',', ini_get('disable_functions'));
$isShellDisabled = is_array($disabledFuncs) ? in_array('shell_exec', $disabledFuncs) : true;
$isShellDisabled = (stripos(PHP_OS, 'win') === false) ? $isShellDisabled : true;
$time_start = microtime(true);
$process_id = date('Y-m-d-H-i',time()).'-'.rand();
try {
    //TODO check if this file exists
    Mage::log(basename(__FILE__).' started... Process ID: '.$process_id, null, 'cron.log');
    if (stripos(PHP_OS, 'win') === false) {
        $options = getopt('m::');
        if (isset($options['m'])) {
            if ($options['m'] == 'always') {
                $cronMode = 'always';
            } elseif ($options['m'] == 'default') {
                $cronMode = 'default';
            } else {
                Mage::throwException('Unrecognized cron mode was defined');
            }
        } else if (!$isShellDisabled) {
            $fileName = basename(__FILE__);
            $baseDir = dirname(__FILE__);
            shell_exec("/bin/sh $baseDir/cron.sh $fileName -mdefault 1 > /dev/null 2>&1 &");
            shell_exec("/bin/sh $baseDir/cron.sh $fileName -malways 1 > /dev/null 2>&1 &");
            exit;
        }
    }

    Mage::getConfig()->init()->loadEventObservers('crontab');
    Mage::app()->addEventArea('crontab');
    if ($isShellDisabled) {
        Mage::dispatchEvent('always');
        Mage::dispatchEvent('default');
    } else {
        Mage::dispatchEvent($cronMode);
    }

    $time_end = microtime(true);
    $duration = $time_end - $time_start;
    $duration = gmdate("H:i:s", $duration);
    Mage::log(basename(__FILE__).' finished successfully! Process ID: '.$process_id.' (duration: '.$duration.' seconds)', null, 'cron.log');

} catch (Exception $e) {

    $time_end = microtime(true);
    $duration = $time_end - $time_start;
    $duration = gmdate("H:i:s", $duration);
    Mage::log(basename(__FILE__).' FAILED! See the exception log for details. Process ID: '.$process_id.' (duration: '.$duration.')', null, 'cron.log');
    Mage::logException($e->getMessage());
    Mage::printException($e);
    exit(1);
}
