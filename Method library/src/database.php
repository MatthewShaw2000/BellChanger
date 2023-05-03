<?php

/**
 * Database
 * 
 * Connect and interact with SQLite database
 * 
 * @author Matthew Shaw
 */
class Database
{
    private $dbConn;

    /**
     * __construct
     * 
     * Calls the a function within the class to establish a
     * connection to the database.
     * 
     * @author Matthew Shaw
     * @param string $dbName Contains the file location for the database
     */
    public function __construct($dbName)
    {
        $this->setDbConnection($dbName);
    }

    /**
     * setDbConnection
     * 
     * Creates database connection.
     * 
     * @param string $dbName Contains the file location for the database
     * @return void
     */
    private function setDbConnection($dbName)
    {
        $this->dbConn = new PDO('sqlite:'.$dbName);
        $this->dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /**
     * executeSQL
     * 
     * Executes the query using PDO and returns an associative array 
     * containing the results.
     * 
     * @param string $sql SQL statement to be executed
     * @param array $params An associative array of parameters
     * @return array An associative array of results retrieved from query
     */
    public function executeSQL($sql, $params = []) 
    { 
        $stmt = $this->dbConn->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}