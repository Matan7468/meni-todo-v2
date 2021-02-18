<?php
require_once 'Lists.php';

$name = $_GET["Name"];
$userid = $_GET["userId"];
$type = $_GET["type"];
$newList = new UserList($name, $userid, $type);

$newList->addList();

echo json_encode(getListIdByName($name)[0]['ListId']);



?>