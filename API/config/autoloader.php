<?php

/**
 * Autoloader
 * 
 * Autoloader automatically finds classes and their files.
 * 
 * @author Matthew Shaw
 * @param mixed $className - Name of the class
 * @return void
 */
function autoloader($className)
{
    $filename = null;


    if(substr($className, 0, 15) == 'methodEndpoints')
    {
        $filename = "src\\" . substr(strtolower($className), 16) . ".php";
    }
    else
    {
        $filename = "src\\" . strtolower($className) . ".php";
    }
    
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);

    if(is_readable($filename))
    {
        include_once $filename;
    }
    else
    {
        exit("File not found: " . $className . " (" . $filename . ")");
    }
}