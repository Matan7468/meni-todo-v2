<?php

$servername = "sql112.epizy.com";
$userName = "epiz_27957177";
$password = "ZgpOCfDy2aw";
$dbName = "epiz_27957177_main_db";

$conn = mysqli_connect($servername, $userName, $password, $dbName) or die("cant connect");

function updateUserNamesQuery($q, $fname,  $lname, $email){
  global $conn;
  $result = $conn->prepare($q);
  $result->bind_param("sss", $fname,  $lname, $email);
  $result->execute();
}

function updateUserPasswordQuery($q, $password){
  global $conn;
  $result = $conn->prepare($q);
  $result->bind_param("s", $password);
  $result->execute();
}

function updateDoneQuery($q, $content){
  global $conn;
  $result = $conn->prepare($q);
  $result->bind_param("s", $content);
  $result->execute();
}

function updateUserImageQuery($q, $image){
  global $conn;
  $result = $conn->prepare($q);
  $result->bind_param("s", $image);
  $result->execute();
}

function deleteQuery($q){
  global $conn;
  if ($conn->query($q) === TRUE) {
    echo "deleted successfully";
  } else {
    echo "Error getting: " . $conn->error;
  }
}

function selectQuery($q){
  global $conn;
  $mylist = [];
  if($result = $conn->query($q)){
    while($row = $result->fetch_assoc()) {
      array_push($mylist,$row);
    }
  }
  return $mylist;
}

function selectListByIdQuery($q, $name){
  global $conn;
  $result = $conn->prepare($q);
  $result->bind_param("s", $name);
  $result->execute();
  $mylist = [];
  array_push($mylist,($result->get_result())->fetch_assoc());
  return $mylist;
}

function insertItemQuery($q, $content, $ListId, $Done, $type){
  global $conn;
  $result = $conn->prepare($q);
  $result->bind_param("siii", $content, $ListId, $Done, $type);
  $result->execute();
}

function insertUserQuery($q, $fname, $lname, $email, $password, $image){
  global $conn;
  $result = $conn->prepare($q);
  $result->bind_param("sssss", $fname, $lname, $email, $password, $image);
  $result->execute();
}

function insertListQuery($q, $name, $userid, $type){
  global $conn;
  $result = $conn->prepare($q);
  $result->bind_param("sss", $name, $userid, $type);
  $result->execute();
}

?>