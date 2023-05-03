<?php

// Headers added here.
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
{
    exit(0);
}

//Configuire autoloader, exception handler and error handler
include './config.php';



/*
    If a request method that is not specified below is used
    a client error is thrown.
    Else check which endpoint is called.
*/
if (!in_array($_SERVER['REQUEST_METHOD'], array("GET", "POST")))
{
    $response = new ClientError("Invalid method: ".$_SERVER['REQUEST_METHOD'], 405);
} 
else 
{
    $url = $_SERVER['REQUEST_URI'];
    $url = parse_url($url);
    $path = $url['path'];


    try
    {
        switch($path)
        {
            case '/Year3/KV6003/Convert/xmlToSql':
            case '/Year3/KV6003/Convert/XmlToSql':
            case '/Year3/KV6003/Convert/xmlToSql/':
            case '/Year3/KV6003/Convert/XmlToSql/':
                $response = new XmlToSql('Plain');
                break;

            default:
                $response = new ClientError("Path not found: " . $path, 404);
        }
    }
    catch(ClientErrorException $e)
    {
        $response = new ClientError($e->getMessage(), $e->getCode());
    }

    $response = $response->getData();

}
echo $response;