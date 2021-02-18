<?php
require_once 'Lists.php';

$name = $_GET['action'];
$id = getListIdByName($name);
echo json_encode($id);
?>