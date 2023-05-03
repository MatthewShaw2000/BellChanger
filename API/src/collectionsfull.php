<?php
namespace methodEndpoints;

/**
 * Collections
 * 
 * Generates sql to retrieve Collections data from the database.
 * 
 * @author Matthew Shaw
 */
class CollectionsFull extends Endpoints
{
    public function __construct()
    {
        parent::connectDatabase();

        $this->initialiseSql();
        $queryResult = parent::getDb()->executeSQL(parent::getSQL(), parent::getSqlParams());

        $data = array();

        foreach($queryResult AS $collectionKey => $collection)
        {
            $this->initialiseMethodSQL($collection['collection_id']);
            $data[$collectionKey]['collection_id'] = $collection['collection_id'];
            $data[$collectionKey]['name'] = $collection['name'];
            $data[$collectionKey]['methods'] = parent::getDb()->executeSQL(parent::getSQL(), parent::getSqlParams());
        }

        parent::setData($data);
    }



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



    /**
     * initialiseMethodSQL
     * 
     * Generates the sql to query the database to retrieve all the methods
     * that are linked to the passed in collection_id.
     * 
     * @author Matthew Shaw
     * @param mixed $collection_id - the passed in ID
     * @return void
     */
    private function initialiseMethodSQL($collection_id)
    {
        $sql = "SELECT methods.method_id, methods.title, methods.name, stage.name AS stage, stage.stageNum, method_type.name AS type, notation, symmetry, leadHeadCode, leadHead, extensionConstruction, fchGroups, firstDateTower, buildingTower, townTower, countyTower, societyTower, firstDateHand, buildingHand, townHand, countyHand, societyHand, bnRef, rwRef, tdmmRef, methods.notes, lengthOfLead, numberOfHunts, huntbellPath
                FROM methods
                JOIN stage ON stage.stage_id = methods.stage_id
                JOIN method_type ON method_type.type_id = methods.type_id
                JOIN collection_methods ON collection_methods.method_id = methods.method_id
                WHERE collection_methods.collection_id = :collection_id";
        
        $params[':collection_id'] = $collection_id;

        parent::setSql($sql);
        parent::setSqlParams($params);
    }
}