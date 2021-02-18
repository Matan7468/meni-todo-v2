<?php
require_once 'dao.php';

function checkIfUserExists($email, $password){
    $sql = "SELECT * FROM Users WHERE email = '$email' AND password ='$password'";
    $result = selectQuery($sql);
    return $result;
}

function getUserById($id){
    $sql = "SELECT firstname, lastname, email, password, ProfileImage FROM Users WHERE id='$id'";
    $result = selectQuery($sql);
    return json_encode($result);
    
}

function getIdByEmailPassword($email, $password){
    $sql = "SELECT Id FROM Users WHERE email = '$email' AND password ='$password'";
    $result = selectQuery($sql);
    return $result;
}

function updateImage($id, $image){
    $sql = "UPDATE Users SET ProfileImage=? WHERE Id='$id'";
    updateUserImageQuery($sql, $image);
}

function isEmailExists($email){
    $sql = "SELECT email FROM Users WHERE email = '$email'";
    $result = selectQuery($sql);
    return count($result) === 0;
}

function updateUserQuery($fname,  $lname, $email, $id){
    $sql = "UPDATE Users SET firstname=?, lastname=?, email=? WHERE Id='$id'";
    updateUserNamesQuery($sql, $fname,  $lname, $email);
    
}

function updateUserPQuery($password, $id){
    $sql = "UPDATE Users SET password=? WHERE Id='$id'";
    updateUserPasswordQuery($sql, $password);
    
}

function upadteUserPassword($password, $id){
    $sql = "UPDATE Users SET password=? WHERE Id='$id'";
    updateQuery($sql);
}

class User{
    private $fname;
    private $lname;
    private $email;
    private $password;
    private $ProfileImage;
    public $id;

    function __construct($fname, $lname, $email, $password){
        $this->fname = $fname;
        $this->lname = $lname;
        $this->email = $email;
        $this->ProfileImage = "uploads\UserProfiles\defaultProfile.png";
        $this->password = $password;
    }
    
    function addUser(){
        $sql = "INSERT INTO Users (firstname, lastname, email, password, ProfileImage)
        VALUES (?, ?, ?, ?, ?)";
        insertUserQuery($sql, $this->fname, $this->lname, $this->email, $this->password, $this->ProfileImage);
    }

    
}

?>