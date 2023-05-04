<?php
namespace methodEndpoints;

/**
 * Methods
 * 
 * Generates the sql query to retrive method records from the database
 * and then sends the sql and any sql parameters to the parent class
 * through the setSql and setSqlParams functions.
 * 
 * @author Matthew Shaw
 */
class Methods extends Endpoints
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
     * If a collection_id is passed to the endpoint a WHERE clause is then added to the sql
     * to only retrive records that are joined to the collections table.
     * 
     * The generated sql and sql parameters are then sent to the parent class through a
     * parent class function (setSql() and setSqlParams()).
     * 
     * @author Matthew Shaw
     * @return void
     */
    protected function initialiseSql()
    {
        $sql = "SELECT methods.method_id, collections.name AS collection, methods.title, methods.name, stage.name AS stage, stage.stageNum, method_type.name AS type, notation, symmetry, leadHeadCode, leadHead, extensionConstruction, fchGroups, firstDateTower, buildingTower, townTower, countyTower, societyTower, firstDateHand, buildingHand, townHand, countyHand, societyHand, bnRef, rwRef, tdmmRef, methods.notes, lengthOfLead, numberOfHunts, huntbellPath
                FROM methods
                JOIN stage ON stage.stage_id = methods.stage_id
                JOIN method_type ON method_type.type_id = methods.type_id
                LEFT JOIN collection_methods ON collection_methods.method_id = methods.method_id
                LEFT JOIN collections ON collections.collection_id = collection_methods.collection_id";

        $params = array();

        if(filter_has_var(INPUT_GET, 'method_id') && filter_var($_GET['method_id'], FILTER_VALIDATE_INT))
        {
            $sql .= " WHERE methods.method_id = :method_id";
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

        if(filter_has_var(INPUT_GET, 'collection_id') && trim(filter_var($_GET['collection_id'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES)))
        {
            $sql .= " WHERE collections.collection_id = :collection_id";
            $params[':collection_id'] = $_GET['collection_id'];
        }

        if(filter_has_var(INPUT_GET, 'collection_name') && trim(filter_var($_GET['collection_name'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES)))
        {
            $sql .= " WHERE collections.name = :collection_name";
            $params[':collection_name'] = $_GET['collection_name'];
        }

        parent::setSql($sql);
        parent::setSqlParams($params);
    } 
}