<?php
require_once 'Users.php';


$email = $_GET['email'];
$password = $_GET['password'];
$userdata = checkIfUserExists($email, hash('sha512', $password));
if(count($userdata) > 0){
    if($userdata[0]["Id"] != 0){
        echo json_encode($userdata[0]);
    }
    else{
        echo json_encode(["error" => "didnt find match"]);
    }
}
else{
    echo "didnt find match";
}



?>