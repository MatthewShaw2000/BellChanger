<?php
namespace methodEndpoints;

/**
 * MethodList 
 * 
 * Generates the sql query to retrive method records from the database
 * and then sends the sql and any sql parameters to the parent class
 * through the setSql and setSqlParams functions.
 * 
 * @author Matthew Shaw
 */
class MethodList extends Endpoints
{
    /**
     * initialiseSql
     * 
     * The initial sql generated will retrive all records from the
     * tracks table.
     * 
     * If a method_id is passed to the endpoint a WHERE clause is then added to the sql
     * to only retrive one specific method record from the database.
     * 
     * If a method_name is passed to the endpoint a WHERE clause is then added to the sql
     * to retrive the methods that have the passed in name from the database.
     * 
     * If a stageNum is passed to the endpoint a WHERE clause is then added to the sql
     * to retrive the methods that have the passed in number as a stage from the database.
     * 
     * If a type_name is passed to the endpoint a WHERE clause is then added to the sql
     * to retrive the methods that have the passed in type from the database.
     * 
     * The generated sql and sql parameters are then sent to the parent class through a
     * parent class function (setSql() and setSqlParams()).
     * 
     * @author Matthew Shaw
     * @return void
     */
    protected function initialiseSql()
    {
        $sql = "SELECT methods.method_id, methods.title, methods.name, stage.stageNum, method_type.name AS type
                FROM methods
                JOIN stage ON stage.stage_id = methods.stage_id
                JOIN method_type ON method_type.type_id = methods.type_id";

        $params = array();

        if(filter_has_var(INPUT_GET, 'method_id') && filter_var($_GET['method_id'], FILTER_VALIDATE_INT))
        {
            $sql .= " WHERE method_id = :method_id";
            $params[':method_id'] = $_GET['method_id'];
        }

        if(filter_has_var(INPUT_GET, 'method_name') && trim(filter_var($_GET['method_name'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES)))
        {
            $sql .= " WHERE methods.name = :method_name";
            $params[':method_name'] = $_GET['method_name'];
        }

        if(filter_has_var(INPUT_GET, 'stageNum') && filter_var($_GET['stageNum'], FILTER_VALIDATE_INT))
        {
            $sql .= " WHERE stageNum = :stageNum";
            $params[':stageNum'] = $_GET['stageNum'];
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