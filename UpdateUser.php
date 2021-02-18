<?php
require_once 'Users.php';

$id = $_POST["Id"];
$fname = $_POST["Fname"];
$lname = $_POST["Lname"];
$email = $_POST["Email"];
$password = $_POST["Password"];

updateUserQuery($fname, $lname, $email, $id);
if($password !== ""){
    updateUserPQuery(hash('sha512',$password), $id);
}

?>