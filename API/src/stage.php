<?php
namespace methodEndpoints;

/**
 * Stage
 * 
 * Generates the sql query to retrive paper records from the database
 * and then sends the sql and any sql parameters to the parent class
 * through the setSql and setSqlParams functions.
 * 
 * @author Matthew Shaw
 */
class Stage extends Endpoints
{
    /**
     * initialiseSql
     * 
     * The initial sql generated will retrive all records from the
     * Stage table.
     * 
     * If a stage_id is passed to the endpoint a WHERE clause is then added to the sql
     * to only retrive one specific stage record from the database.
     * 
     * If a stage_name is passed to the endpoint a WHERE clause is then added to the sql
     * to only retrive one specific stage record from the database.
     * 
     * If a stageNum is passed to the endpoint a WHERE clause is then added to the sql
     * to only retrive one specific stage record from the database.
     * 
     * The generated sql and sql parameters are then sent to the parent class through a
     * parent class function (setSql() and setSqlParams()).
     * 
     * @author Matthew Shaw
     * @return void
     */
    protected function initialiseSql()
    {
        $sql = "SELECT stage.stage_id, stage.name, stage.stageNum
                FROM stage";

        $params = array();

        if(filter_has_var(INPUT_GET, 'stage_id') && filter_var($_GET['stage_id'], FILTER_VALIDATE_INT))
        {
            $sql .= " WHERE stage.stage_id = :stage_id";
            $params[':stage_id'] = $_GET['stage_id'];
        }

        if(filter_has_var(INPUT_GET, 'stage_name') && trim(filter_var($_GET['stage_name'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES)))
        {
            $sql .= " WHERE stage.name = :stage_name";
            $params[':stage_name'] = $_GET['stage_name'];
        }

        if(filter_has_var(INPUT_GET, 'stageNum') && filter_var($_GET['stageNum'], FILTER_VALIDATE_INT))
        {
            $sql .= " WHERE stageNum = :stageNum";
            $params[':stageNum'] = $_GET['stageNum'];
        }

        parent::setSql($sql);
        parent::setSqlParams($params);
    } 
}