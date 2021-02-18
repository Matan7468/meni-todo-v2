<?php
require_once 'Users.php';

$filename = $_FILES['file']['name'];
$fileTmpName = $_FILES['file']['tmp_name'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];
$fileType = $_FILES['file']['type'];

$filetxt = explode(".", $filename);
$fileActualExt = strtolower(end($filetxt));

$allowed = array('jpg', 'jpeg', 'png');

if(in_array($fileActualExt, $allowed)){
    if($fileError === 0){
        if($fileSize < 1000000){
            $fileNewName = uniqid('', true).".".$fileActualExt;
            $fileDestination = '/home/vol14_5/epizy.com/epiz_27957177/htdocs/uploads\\UserProfiles\\'.$fileNewName;
            move_uploaded_file($fileTmpName, $fileDestination);
            updateImage($_POST['id'], $fileDestination);
            echo $fileDestination;
        }else{
            echo "your file is too big";
        }
    }else{
        echo "there was an error uploading your file";
    }
}else{
    echo "you cannot upload files of this type";
}


?>