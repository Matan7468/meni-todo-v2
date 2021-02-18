<?php
require_once 'ListItem.php';
require_once 'Lists.php';

$currentListId = $_POST['ListId'];
$currentListName = $_POST['ListName'];
$userid = $_POST["UserId"];
$allItems = getallItemsByListId($currentListId);

$fileNewName = uniqid('', true).".txt";
$myfile = fopen(__DIR__ ."uploads\\ListTextFiles\\".$fileNewName, "w");
foreach($allItems as $Item){
    if($Item['type'] == "1"){
        fwrite($myfile, $Item['content']."\n");
    }
}
fclose($myfile);
print(__DIR__ ."uploads\\ListTextFiles\\");
$newList = new UserList(__DIR__ ."uploads\\ListTextFiles\\".$fileNewName."/".$currentListName.".txt", $userid, 2);

$newList->addList();
?>

