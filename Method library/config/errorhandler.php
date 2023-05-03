<?php

/**
 * General error handler
 * 
 * Throws an exception if the is not a warning (2) or notice (8).
 * Do nothing otherwise 
 * 
 * @author Matthew Shaw
 * @param mixed $errno - Error number
 * @param mixed $errstr - Error String (description)
 * @param mixed $errfile - Error file (file error occurred)
 * @param mixed $errline - Error line (line number)
 * @throws Exception - if not a warning (2) or notice (8)
 * @return void
 */
function errorHandler($errno, $errstr, $errfile, $errline)
{
    if($errno != 2 && $errno != 8)
    {
        throw new Exception("Error Detected: [$errno] $errstr file: $errfile line: $errline", 1);
    }
}