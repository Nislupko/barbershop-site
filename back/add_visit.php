<?php
require "db.php";
db::connect();
$result = db::add_visit($_POST);
echo json_encode($result);
