<?php
require_once 'ListItem.php';

$currentList = $_GET['listId'];

$allItems = getallItemsByListId($currentList);
?>
<ul>
    <?php foreach (array_reverse($allItems) as $Item){
        if($Item['type'] == "1"){
        $classDone = $Item['done'] == "1" ? 'class="done" ' : '';
            ?>
             <li <?=$classDone?>>
            <?= $Item['content']?>
        </li>
        <?php } else if($Item['type'] == "2") {
            ?>
            <li>
            <img src="<?= $Item['content'] ?>" height="150dp" width="150dp" ></img>
        </li>
        <?php } else if($Item['type'] == "3") {
            $name = explode("/", $Item['content']);
            ?>
            <li>
            <a href="<?=$name[0]?>" target="_blank"><?= strtolower(end($name))?></a>
        </li>
        <?php } ?>
    <?php } ?>
</ul>