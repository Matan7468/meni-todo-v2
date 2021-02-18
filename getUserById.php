<?php
require_once 'Users.php';

$id = $_GET["Userid"];

$userdata = getUserById($id);
echo $userdata;
?>