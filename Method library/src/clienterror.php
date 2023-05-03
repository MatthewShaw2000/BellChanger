<?php

/**
 * ClientError
 * 
 * Is called when an client error occurs, such as wrong url endpoint
 * inputted.
 * 
 * @author Matthew Shaw
 */
class ClientError extends XmlToSql
{
    /**
     * __construct
     * 
     * Overrides the constructor of the parent class.
     * Sets the the response code and calls the setData function
     * in the parent class and sends a message as a parameter.
     * 
     * @author Matthew Shaw
     * @param string $message Message to be sent to sent to parent class and stored
     * @param mixed $code Response code (error 404 for example)
     */
    public function __construct($message, $code)
    {
        http_response_code($code);
        parent::setData(null, $message);
    }
}