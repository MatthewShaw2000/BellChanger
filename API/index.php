<?php
use methodEndpoints\Base;
use methodEndpoints\ClientError;
use methodEndpoints\ClientErrorException;
use methodEndpoints\Collections;
use methodEndpoints\CollectionsFull;
use methodEndpoints\MethodList; 
use methodEndpoints\Methods;
use methodEndpoints\MethodType;
use methodEndpoints\Stage;


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
    $endpoint = new ClientError("Invalid method: ".$_SERVER['REQUEST_METHOD'], 405);
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
            case '/Year3/KV6003/API/':
            case '/Year3/KV6003/API/index.php':
                $endpoint = new Base();
                break;

            case '/Year3/KV6003/API/collections':
            case '/Year3/KV6003/API/Collections':
            case '/Year3/KV6003/API/collections/':
            case '/Year3/KV6003/API/Collections/':
                $endpoint = new Collections();
                break;

            case '/Year3/KV6003/API/collectionsFull':
            case '/Year3/KV6003/API/CollectionsFull':
            case '/Year3/KV6003/API/collectionsFull/':
            case '/Year3/KV6003/API/CollectionsFull/':
                $endpoint = new CollectionsFull();
                break;

            case '/Year3/KV6003/API/methodType':
            case '/Year3/KV6003/API/MethodType':
            case '/Year3/KV6003/API/methodType/':
            case '/Year3/KV6003/API/MethodType/':
                $endpoint = new MethodType();
                break;

            case '/Year3/KV6003/API/stage':
            case '/Year3/KV6003/API/Stage':
            case '/Year3/KV6003/API/stage/':
            case '/Year3/KV6003/API/Stage/':
                $endpoint = new Stage();
                break;

	    case '/Year3/KV6003/API/methodList':
            case '/Year3/KV6003/API/MethodList':
            case '/Year3/KV6003/API/methodList/':
            case '/Year3/KV6003/API/MethodList/':
                $endpoint = new MethodList();
                break;

            case '/Year3/KV6003/API/methods':
            case '/Year3/KV6003/API/Methods':
            case '/Year3/KV6003/API/methods/':
            case '/Year3/KV6003/API/Methods/':
                $endpoint = new Methods();
                break;

            default:
                $endpoint = new ClientError("Path not found: " . $path, 404);
        }
    }
    catch(ClientErrorException $e)
    {
        $endpoint = new ClientError($e->getMessage(), $e->getCode());
    }

    $output = $endpoint->getData();

}
echo $output;