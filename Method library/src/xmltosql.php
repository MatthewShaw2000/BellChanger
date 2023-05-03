<?php



class XmlToSql
{
    private $db;
    private $xml;
    private $xmlData;
    private $sql;
    private $sqlParams;
    private $data;



    /**
     * __construct
     * 
     * Constructor for the class, connects to the database, openxml, readxml,
     * store xml data in the data variable, and insert xml data into database. 
     */
    public function __construct($methodType)
    {
        //$this->connectDatabase();

        $this->openXmlFile($methodType);

        $this->readXml($methodType);

        /*foreach($this->xmlData as $method)
        {
            $this->initialiseSql($method);
            $retrievedData = $this->db->executeSQL($this->sql, $this->sqlParams);
        }*/
        $this->setData($this->xmlData);

    }



    //Functions
    /**
     * openXmlFile
     * 
     * Opens the passed in xml file
     * 
     * @author Matthew Shaw
     * @param mixed $methodType Sytring containing the method type
     * @return void
     */
    private function openXmlFile($methodType)
    {
        $methodType = str_replace(' ', '', $methodType);
        $this->xml = simplexml_load_file('methods/CCCBR_' . $methodType . '.xml') or new Exception;
    }



    /**
     * readXml
     * 
     * Reads the the xml file
     * 
     * @author Matthew Shaw
     * @param mixed $methodType Sytring containing the method type
     * @return void
     */
    private function readXml($methodType)
    {
        $output = array();
        $index = 0;

        $sets = $this->xml->methodSet;
        foreach($sets as $set)
        {
            $methods = $set->method;
            foreach($methods as $method)
            {
                $output[$index]['method_id'] = subStr($method['id'], 1);
                $output[$index]['title'] = trim($method->title);
                $output[$index]['name'] = trim($method->name);
                //$output[$index]['stage'] = $this->stageID(trim($set->properties->stage));
                //$output[$index]['type'] = $this->typeID($methodType);
                $output[$index]['stage'] = trim($set->properties->stage);
                $output[$index]['type'] = $methodType;
                $output[$index]['notation'] = trim($method->notation);

                $output[$index]['symmetry'] = null;
                $output[$index]['leadHeadCode'] = null;
                $output[$index]['leadHead'] = null;
                $output[$index]['extensionConstruction'] = null;
                $output[$index]['fchGroups'] = null;

                $performance = $method->performances;
                $output[$index]['firstDateTower'] = null;
                $output[$index]['buildingTower'] = null;
                $output[$index]['townTower'] = null;
                $output[$index]['countyTower'] = null;
                $output[$index]['societyTower'] = null;

                $output[$index]['firstDateHand'] = null;
                $output[$index]['buildingHand'] = null;
                $output[$index]['townHand'] = null;
                $output[$index]['countyHand'] = null;
                $output[$index]['societyHand'] = null;

                $output[$index]['bnRef'] = null;
                $output[$index]['rwRef'] = null;
                $output[$index]['tdmmRef'] = null;

                $output[$index]['notes'] = null;
                $output[$index]['lengthOflead'] = null;
                $output[$index]['numberOfHunts'] = null;
                $output[$index]['huntbellPath'] = null;



                if($method->symmetry)
                    $output[$index]['symmetry'] = trim($method->symmetry);

                if($method->leadHeadCode)
                    $output[$index]['leadHeadCode'] = trim($method->leadHeadCode);

                if($method->leadHeadCode)
                    $output[$index]['leadHead'] = trim($method->leadHead);

                if($method->extensionConstruction)
                    $output[$index]['extensionConstruction'] = trim($method->extensionConstruction);

                if($method->falseness->fchGroups)
                    $output[$index]['fchGroups'] = trim($method->falseness->fchGroups);



                if($performance->firstTowerbellPeal->date)
                    $output[$index]['firstDateTower'] = trim($performance->firstTowerbellPeal->date);

                if($performance->firstTowerbellPeal->location->building)
                    $output[$index]['buildingTower'] = trim($performance->firstTowerbellPeal->location->building);

                if($performance->firstTowerbellPeal->location->town)
                    $output[$index]['townTower'] = trim($performance->firstTowerbellPeal->location->town);

                if($performance->firstTowerbellPeal->location->county)
                    $output[$index]['countyTower'] = trim($performance->firstTowerbellPeal->location->county);

                if($performance->firstTowerbellPeal->society)
                    $output[$index]['societyTower'] = trim($performance->firstTowerbellPeal->society);



                if($performance->firstHandbellPeal->date)
                    $output[$index]['firstDateHand'] = trim($performance->firstHandbellPeal->date);

                if($performance->firstHandbellPeal->location->building)
                    $output[$index]['buildingHand'] = trim($performance->firstHandbellPeal->location->building);

                if($performance->firstHandbellPeal->location->town)
                    $output[$index]['townHand'] = trim($performance->firstHandbellPeal->location->town);

                if($performance->firstHandbellPeal->location->county)
                    $output[$index]['countyHand'] = trim($performance->firstHandbellPeal->location->county);

                if($performance->firstHandbellPeal->society)
                    $output[$index]['societyHand'] = trim($performance->firstHandbellPeal->society);



                if($method->references->bnRef)
                    $output[$index]['bnRef'] = trim($method->references->bnRef);

                if($method->references->rwRef)
                    $output[$index]['rwRef'] = trim($method->references->rwRef);

                if($method->references->tdmmRef)
                    $output[$index]['tdmmRef'] = trim($method->references->tdmmRef);



                if($set->notes)
                    $output[$index]['notes'] = trim($set->notes);

                if($set->properties->lengthOfLead)
                    $output[$index]['lengthOflead'] = trim($set->properties->lengthOfLead);

                if($set->properties->numberOfHunts)
                    $output[$index]['numberOfHunts'] = trim($set->properties->numberOfHunts);

                if($set->properties->huntbellPath)
                    $output[$index]['huntbellPath'] = trim($set->properties->huntbellPath);



                $index++;
            }
        }
        $this->setXmlData($output);
    }



    /**
     * connectDatabase
     * 
     * Creates an instance of the Database class
     * and stores it in the db (database) variable.
     * 
     * @author Matthew Shaw
     * @return void
     */
    /*protected function connectDatabase()
    {
        $this->db = new Database("database/methodLibrary.sqlite");
    }*/



    /**
     * initialiseSql
     * 
     * Initialises the sql to insert data into the database
     * by the child classes. 
     * 
     * @author Matthew Shaw
     * @return void
     */
    /*protected function initialiseSql($method)
    {
        $sql = "INSERT INTO methods (method_id, title, stage_id, type_id, name, notation, 
                                     symmetry, leadHeadCode, leadHead, extensionConstruction, fchGroups, 
                                     firstDateTower, buildingTower, townTower, countyTower, societyTower, 
                                     firstDateHand, buildingHand, townHand, countyHand, societyHand, 
                                     bnRef, rwRef, tdmmRef, 
                                     notes, lengthOfLead, numberOfHunts, huntbellPath)
                VALUES (:method_id, :title, :stage_id, :type_id, :name, :notation, 
                        :symmetry, :leadHeadCode, :leadHead, :extensionConstruction, :fchGroups, 
                        :firstDateTower, :buildingTower, :townTower, :countyTower, :societyTower, 
                        :firstDateHand, :buildingHand, :townHand, :countyHand, :societyHand, 
                        :bnRef, :rwRef, :tdmmRef, 
                        :notes, :lengthOfLead, :numberOfHunts, :huntbellPath)";

        $this->setSQL($sql);
        $this->setSQLParams(
            ['method_id'=> $method['method_id'], 'title'=>$method['title'], 'stage_id'=> $method['stage'], 'type_id'=>$method['type'], 'name'=> $method['name'], 'notation'=>$method['notation'],
            'symmetry'=> $method['symmetry'], 'leadHeadCode'=>$method['leadHeadCode'], 'leadHead'=> $method['leadHead'], 'extensionConstruction'=>$method['extensionConstruction'], 'fchGroups'=> $method['fchGroups'],
            'firstDateTower'=>$method['firstDateTower'], 'buildingTower'=>$method['buildingTower'], 'townTower'=>$method['townTower'], 'countyTower'=>$method['countyTower'], 'societyTower'=>$method['societyTower'],
            'firstDateHand'=>$method['firstDateHand'], 'buildingHand'=>$method['buildingHand'], 'townHand'=>$method['townHand'], 'countyHand'=>$method['countyHand'], 'societyHand'=>$method['societyHand'],
            'bnRef'=>$method['bnRef'], 'rwRef'=>$method['rwRef'], 'tdmmRef'=>$method['tdmmRef'],
            ':notes'=>$method['notes'], 'lengthOfLead'=>$method['lengthOflead'], 'numberOfHunts'=>$method['numberOfHunts'], 'huntbellPath'=>$method['huntbellPath']]
        );
    }*/



    /**
     * stageID
     * 
     * Retrieves the stage_id of the passed in parameter
     * 
     * @author Matthew Shaw
     * @param mixed $stage Contains number of bells
     * @return int The returned stage_id
     */
    /*private function stageID($stage)
    {
        $stageId = null;

        switch($stage)
        {
            case 2:
                $stageId = 1;
                break;

            case 3:
                $stageId = 2;
                break;

            case 4:
                $stageId = 3;
                break;

            case 5:
                $stageId = 4;
                break;

            case 6:
                $stageId = 5;
                break;

            case 7:
                $stageId = 6;
                break;

            case 8:
                $stageId = 7;
                break;

            case 9:
                $stageId = 8;
                break;

            case 10:
                $stageId = 9;
                break;

            case 11:
                $stageId = 10;
                break;

            case 12:
                $stageId = 11;
                break;

            case 13:
                $stageId = 12;
                break;

            case 14:
                $stageId = 13;
                break;

            case 15:
                $stageId = 14;
                break;

            case 16:
                $stageId = 15;
                break;

            case 18:
                $stageId = 16;
                break;

            case 20:
                $stageId = 17;
                break;

            case 22:
                $stageId = 18;
                break;

            default:
                $stageId = 0;
        }

        return $stageId;
    }*/



    /**
     * typeID
     * 
     * Retrieves the typeID of the passed in parameter
     * 
     * @author Matthew Shaw
     * @param mixed $type Contains the method type
     * @return int The returned typeID
     */
    /*private function typeID($type)
    {
        $typeId = null;

        switch($type)
        {
            case 'Alliance':
                $typeId = 1;
                break;

            case 'Delight':
                $typeId = 2;
                break;

            case 'Hybrid':
                $typeId = 3;
                break;

            case 'Plain':
                $typeId = 4;
                break;

            case 'Principle':
                $typeId = 5;
                break;

            case 'Surprise':
                $typeId = 6;
                break;

            case 'Treble Bob':
                $typeId = 7;
                break;

            case 'Treble Place':
                $typeId = 8;
                break;

            default:
                $typeId = 0;
        }

        return $typeId;
    }*/



    //Getters and Setters
    /**
     * setXmlData
     * 
     * Setter for the xmlData variable.
     * Sets the value to be stored in the sqlParams variable.
     * 
     * @author Matthew Shaw
     * @param array $params An array of parameters to be binded to sql string
     * @return void
     */
    protected function setXmlData($data)
    {
        $this->xmlData = $data;
    }



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
}