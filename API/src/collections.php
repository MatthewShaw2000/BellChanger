<?php
namespace methodEndpoints;

/**
 * Collections
 * 
 * Generates sql to retrieve Full collection data from the database.
 * 
 * @author Matthew Shaw
 */
class Collections extends Endpoints
{
    /**
     * initialiseSql
     * 
     * Generates the sql to query the database to retrieve the
     * appropriate records. The generated sql and sql parameters 
     * are then sent to the parent class through a parent class function.
     * 
     * @author Matthew Shaw
     * @return void
     */
    protected function initialiseSql()
    {
        $sql = "SELECT collections.collection_id, collections.name
                FROM collections";

        $params = array();

        if(filter_has_var(INPUT_GET, 'collection_id') && filter_var($_GET['collection_id'], FILTER_VALIDATE_INT))
        {
            $sql .= " WHERE collection_id = :collection_id";
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