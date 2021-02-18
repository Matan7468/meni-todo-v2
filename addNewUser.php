<?php
require_once 'Users.php';

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$password = $_POST['password'];

$newuser = new User($fname, $lname, $email, hash('sha512', $password), "uploads\UserProfiles\defaultProfile.png");
$newuser->addUser();

//Test

//HELLO



$id = getIdByEmailPassword($email, hash('sha512', $password));

//Hey

echo json_encode(array("id" =>$id[0],"fname" =>$fname, "lname" =>$lname, "email" =>$email, "ProfileImage" =>"uploads\UserProfiles\defaultProfile.png"));

?>