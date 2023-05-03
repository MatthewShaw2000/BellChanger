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

    $filename = "src\\" . strtolower($className) . ".php";
    
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