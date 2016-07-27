<?php
$folders = array('app/code/local/', 'app/code/community/');//folders to parse
$configFiles = array();
foreach ($folders as $folder){
    $files = glob($folder.'*/*/etc/config.xml');//get all config.xml files in the specified folder
    $configFiles = array_merge($configFiles, $files);//merge with the rest of the config files
}
$rewrites = array();//list of all rewrites

foreach ($configFiles as $file){
    $dom = new DOMDocument;
    $dom->loadXML(file_get_contents($file));
    $xpath = new DOMXPath($dom);
    $path = '//rewrite/*';//search for tags named 'rewrite'
    $text = $xpath->query($path);
    foreach ($text as $rewriteElement){
        $type = $rewriteElement->parentNode->parentNode->parentNode->tagName;//what is overwritten (model, block, helper)
        $parent = $rewriteElement->parentNode->parentNode->tagName;//module identifier that is being rewritten (core, catalog, sales, ...)
        $name = $rewriteElement->tagName;//element that is rewritten (layout, product, category, order)
        foreach ($rewriteElement->childNodes as $element){
            $rewrites[$type][$parent.'/'.$name][] = $element->textContent;//class that rewrites it
        }
    }
}
echo "<pre>";print_r($rewrites);
