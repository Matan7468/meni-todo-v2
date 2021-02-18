<?php
require_once 'ListItem.php';

$content = $_GET["Content"];
$Listid = $_GET["ListId"];

$newitem = new ListItem($Listid, $content);
$newitem -> addListItem(1);

echo $content;

?>