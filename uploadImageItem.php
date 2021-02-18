<?php
require_once 'ListItem.php';

$filename = $_FILES['myfile']['name'];
$fileTmpName = $_FILES['myfile']['tmp_name'];
$fileSize = $_FILES['myfile']['size'];
$fileError = $_FILES['myfile']['error'];
$fileType = $_FILES['myfile']['type'];

$filetxt = explode(".", $filename);
$fileActualExt = strtolower(end($filetxt));

$allowed = array('jpg', 'jpeg', 'png', 'txt');
if(in_array($fileActualExt, $allowed)){
    if($fileError === 0){
        if($fileSize < 1000000){
            $fileNewName = uniqid('', true).".".$fileActualExt;
            $fileDestination = 'uploads\\Items\\'.$fileNewName;
            move_uploaded_file($fileTmpName, $fileDestination);
            if($fileActualExt === 'txt'){
                $file = new ListItem($_POST['listId'], $fileDestination."/".$filename);
                $file->addListItem(3);
            }else{
                $file = new ListItem($_POST['listId'], $fileDestination);
                $file->addListItem(2);
            }
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