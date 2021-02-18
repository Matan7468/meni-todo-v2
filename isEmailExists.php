<?php
require_once 'Users.php';


$email = $_GET['Email'];
echo json_encode(isEmailExists($email));
?>