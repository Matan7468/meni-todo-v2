<?php
require_once 'dao.php';

function connectTables(){
    $sql = "FROM Lists INNER JOIN ListItem";
    updateQuery($sql);
}

function getAllListsByUserId($userid){
    $sql = "SELECT ListId,name,type FROM Lists WHERE userid = '$userid'";
    $result = selectQuery($sql);
    return $result;
}

function getListIdByName($name){
    $sql = "SELECT ListId FROM Lists WHERE name = ?";
    $result = selectListByIdQuery($sql, $name);
    return $result;   
}

class UserList{
    public $name;
    public $id;
    private $userid;
    public $type;

    function __construct($name, $userid, $type){
        $this->name = $name;
        $this->userid = $userid;
        $this->type = $type;
    }

    function addList(){
        $sql = "INSERT INTO Lists (name, userid, type)
        VALUES (?, ?, ?)";
        insertListQuery($sql, $this->name, $this->userid, $this->type);
    }
}


?>