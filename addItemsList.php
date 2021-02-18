<?php
require_once 'ListItem.php';

$ItemsList = $_GET["ItemsList"];
$Listid = $_GET["ListId"];

foreach($ItemsList as $item){
    $newitem = new ListItem($Listid, $item);
    $newitem -> addListItem(1);
}
   
?>