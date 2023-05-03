<?php
namespace methodEndpoints;

/**
 * Base
 * 
 * The purpose of thsi class is to return the assignment author's details,
 * student id, name, link to the documentation and
 * conference information.
 * 
 * @author Matthew Shaw
 */
class Base extends Endpoints
{
    /**
     * __construct
     * 
     * This constructor overrides the one in the parent class.
     * Authors details are hard coded in, however the conference
     * information is retrieved from the database.
     * 
     * The data retrieved from the database and the hard coded 
     * are then sent to a function in the parent class.
     * 
     * @author Matthew Shaw
     */
    public function __construct()
    {
        $data['student_id'] = 'W20013772';
        $data['name'] = 'Matthew Shaw';

        parent::setData($data);
    }
}