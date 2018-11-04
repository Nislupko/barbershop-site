<?php
require "db.php";
db::connect();
//$arr=['user'=>1,'visitTime'=>'22:00:00','visitDate'=>'2018-11-11','service'=>'cutting'];
$result = db::add_visit($_POST);
echo json_encode($result);
