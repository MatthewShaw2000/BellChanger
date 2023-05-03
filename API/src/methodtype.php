<?php
namespace methodEndpoints;

/**
 * MethodType
 * 
 * Generates the sql query to retrive method_type records from the database
 * and then sends the sql and any sql parameters to the parent class
 * through the setSql and setSqlParams functions.
 * 
 * @author Matthew Shaw
 */
class MethodType extends Endpoints
{
    /**
     * initialiseSql
     * 
     * The initial sql generated will retrive all records from the
     * method_type table.
     * 
     * If a type_id is passed to the endpoint a WHERE clause is then added to the sql
     * to only retrive one specific method_type record from the database.
     * 
     * If a type_name is passed to the endpoint a WHERE clause is then added to the sql
     * to only retrive the specific method_type record that contains the inputted
     * name from the database.
     * 
     * The generated sql and sql parameters are then sent to the parent class through a
     * parent class function.
     * 
     * @author Matthew Shaw
     * @return void
     */
    protected function initialiseSql()
    {
        $sql = "SELECT method_type.type_id, method_type.name
                FROM method_type";

        $params = array();

        if(filter_has_var(INPUT_GET, 'type_id') && filter_var($_GET['type_id'], FILTER_VALIDATE_INT))
        {
            $sql .= " WHERE method_type.type_id = :type_id";
            $params[':type_id'] = $_GET['type_id'];
        }

        if(filter_has_var(INPUT_GET, 'type_name') && trim(filter_var($_GET['type_name'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES)))
        {
            $sql .= " WHERE method_type.name = :type_name";
            $params[':type_name'] = $_GET['type_name'];
        }


        parent::setSql($sql);
        parent::setSqlParams($params);
    } 
}