<?php
require_once 'dao.php';
class ListItem{
    public $ListId;
    private $id;
    public $content;
    public $done;
    public $type;

    function __construct($ListId, $content){
        $this->ListId = $ListId;
        $this->content = $content;
        $this->done = 0;
    }

    function addListItem($type){
        $sql = "INSERT INTO ListItem (content, ListId, done, type)
        VALUES (?, ?, ?, ?)";
        insertItemQuery($sql,$this->content, $this->ListId, $this->done, $type);
    }
}

function getallItemsByListId($listId){
    $sql = "SELECT * FROM ListItem WHERE ListId = '$listId'";
    $result = selectQuery($sql);
    return $result;
}

function changeDoneById($done, $ListId, $content){
    $sql = "UPDATE ListItem SET done='$done' WHERE ListId='$ListId' AND content=? And type='1'";
    updateDoneQuery($sql, $content);
}


?>