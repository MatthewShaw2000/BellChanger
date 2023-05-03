<?php

/**
 * Exception handler
 * 
 * The exception handler is called when an excpetion occurs
 * 
 * @author Matthew Shaw
 * @param mixed $e - This parameter contains all the details of the exception
 * @return never
 */
function exceptionHandler($e)
{
    http_response_code(500);
    $output['message'] = $e->getMessage();
    $output['location']['file'] = $e->getFile();
    $output['location']['line'] = $e->getLine();
    
    echo json_encode($output);
    die();
}