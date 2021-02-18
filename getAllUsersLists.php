<?php
require_once 'Lists.php';

$currentuser = $_GET['action'];

$allList = getAllListsByUserId($currentuser);
?>

<ul>
    <?php foreach ($allList as $List){
        if($List['type'] == "1"){
            ?>
             <li>
             <a href="#">
                <?= $List['name']?>
            </a>
        </li>
        <?php } else if($List['type'] == "2") {
            $name = explode("-", $List['name']);
            ?>
            <li>
            <a href="<?=$name[0]?>" target="_blank"><?= strtolower(end($name))?></a>
        </li>
        <?php } ?>
    <?php } ?>
</ul>