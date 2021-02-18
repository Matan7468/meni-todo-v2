<?php
require_once 'ListItem.php';

$done = $_GET["Done"];
$Listid = $_GET["ListId"];
$content = $_GET["Content"];
echo $Listid.", ".$content.", ".$done;


changeDoneById($done, $Listid, $content)
?>