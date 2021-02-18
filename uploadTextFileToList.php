<?php

$filename = $_FILES['textfile']['name'];
$fileTmpName = $_FILES['textfile']['tmp_name'];
$fileSize = $_FILES['textfile']['size'];
$fileError = $_FILES['textfile']['error'];
$fileType = $_FILES['textfile']['type'];

$filetxt = explode(".", $filename);
$fileActualExt = strtolower(end($filetxt));
if($fileActualExt === "txt"){
    if($fileError === 0){
        if($fileSize < 1000000){
            $lines = file($fileTmpName);
            $linesarr = [];
            foreach ($lines as $line_num => $line) {
                $line = trim(preg_replace('/\s\s+/', ' ', $line));
                array_push($linesarr, $line);
            } 
            $linesarr = array_filter(array_map('trim', $linesarr));
            echo json_encode($linesarr);
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