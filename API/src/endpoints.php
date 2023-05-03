<?php
namespace methodEndpoints;

use Database;
use methodEndpoints\ClientErrorException;
use Exception;

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/**
 * Endpoints
 * 
 * The abstract parent class the handles the endpoints,
 * the child classed extend this class, so each different
 * endpoint has its own sql query, etc.
 * 
 * @author Matthew Shaw
 */
abstract class Endpoints
{
    private $db;
    private $sql;
    private $sqlParams;
    private $data;

    /**
     * __construct
     * 
     * The constructor that half of the child classes
     * use, the other half override the constructor.
     * The constructor calls the database class, initialises
     * the sql, retrieves the data from database, sets the data
     * in the data variable (calls relevant functios to do this).
     * 
     * @author Matthew Shaw
     */
    public function __construct()
    {
        $this->connectDatabase();

        $this->initialiseSql();

        $retrievedData = $this->db->executeSQL($this->sql, $this->sqlParams);

        $this->setData($retrievedData);
    }



    //Getters and Setters
    /**
     * setSql
     * 
     * Is a setter for the sql variable.
     * Sets the value to be stored in the sql variable.
     * 
     * @author Matthew Shaw
     * @param string $sql String containing the sql query
     * @return void
     */
    protected function setSql($sql)
    {
        $this->sql = $sql;
    }
    /**
     * getSql
     * 
     * Getter for the sql variable.
     * Gets the value stored in the sql variable.
     * 
     * @author Matthew Shaw
     * @return string
     */
    protected function getSql()
    {
        return $this->sql;
    }



    /**
     * setSqlParams
     * 
     * Setter for the sqlParams variable.
     * Sets the value to be stored in the sqlParams variable.
     * 
     * @author Matthew Shaw
     * @param array $params An array of parameters to be binded to sql string
     * @return void
     */
    protected function setSqlParams($params)
    {
        $this->sqlParams = $params;
    }
    /**
     * getSqlParams
     * 
     * Getter for the sqlParams variable.
     * Gets the value stored in the sqlParams variable.
     * 
     * @author Matthew Shaw
     * @return array
     */
    protected function getSqlParams()
    {
        return $this->sqlParams;
    }



    /**
     * setData
     * 
     * Setter for the data variable.
     * Sets the value that is stored in the data variable.
     * If the array of data is less than 0 the message passed in
     * to the function is stored in the data variable, else the
     * message is set to "Success".
     * 
     * @author Matthew Shaw
     * @param mixed $data Data to be stored in the data variable
     * @param string $message Message (success message, error message, etc.) to be stored in the data variable
     * @return void
     */
    protected function setData($data, $message = "No data retrieved")
    {
        $this->data['length'] = count($data);

        if($this->data['length'] == 0)
        {
            $this->data['message'] = $message;
        }
        else
        {
            $this->data['message'] = "Success";
        }

        $this->data['data'] = $data;
    }
    /**
     * getData
     * 
     * Getter for the data variable
     * Gets the data stored in the data value and turns it into a
     * string of JSON.
     * 
     * @author Matthew Shaw
     * @return bool|string
     */
    public function getData()
    {
        return json_encode($this->data);
    }



    /**
     * getDb
     * 
     * Getter for the db (database) variable.
     * Gets the database instance (Database class instance).
     * 
     * @author Matthew Shaw
     * @return Database
     */
    protected function getDb()
    {
        return $this->db;
    }



    //Functions
    /**
     * connectDatabase
     * 
     * Creates an instance of the Database class
     * and stores it in the db (database) variable.
     * 
     * @author Matthew Shaw
     * @return void
     */
    protected function connectDatabase()
    {
        $this->db = new Database("database/methodLibrary.sqlite");
    }


    /**
     * initialiseSql
     * 
     * Initialises the sql, this function is meant to be overridden
     * by the child classes. 
     * 
     * @author Matthew Shaw
     * @return void
     */
    protected function initialiseSql()
    {
        $this->setSql("");
        $this->setSqlParams([]);
    }


    /**
     * validateRequestMethod
     * 
     * Validates the request method to check if the POST
     * request method is used
     * 
     * @author Matthew Shaw
     * @param string $method Request method used in API endpoints
     * @throws ClientErrorException
     * @return void
     */
    protected function validateRequestMethod($method)
    {
        if($_SERVER['REQUEST_METHOD'] != $method)
        {
            throw new ClientErrorException("Invalid request method", 405);
        }
    }


    /**
     * validateToken
     * 
     * The secret key is retrieved, and the token is retrieved
     * from the header. The token is then decoded by third party (firebase)
     * to and then checked to validate the issuer of the token, and that it
     * is not passed expiry. If problems occur an exception is thrown.
     * 
     * @author Matthew Shaw
     * @throws ClientErrorException
     * @return void
     */
    protected function validateToken()
    {
        $key = SECRET;

        //get all headers
        $allHeaders = getallheaders();
        $authorizationHeader = "";

        //check for authorization header
        if(array_key_exists('Authorization', $allHeaders))
        {
            $authorizationHeader = $allHeaders['Authorization'];
        }
        elseif(array_key_exists('authorization', $allHeaders))
        {
            $authorizationHeader = $allHeaders['authorization'];
        }

        //check for bearer token in header
        if(substr($authorizationHeader, 0, 6) != 'Bearer')
        {
            throw new ClientErrorException("Bearer token required", 401);
        }

        //extract JWT from header
        $jwt = trim(substr($authorizationHeader, 7));

        try
        {
            //using JWT class to decode token
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        }
        catch(Exception $e)
        {
            throw new ClientErrorException($e->getMessage(), 401);
        }

        if($decoded->iss != $_SERVER['HTTP_HOST'])
        {
            throw new ClientErrorException("invalid token issuer", 401);
        }
    }
}