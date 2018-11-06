<?php
require "db.php";
db::connect();
$result = db::show_visits($_GET);
echo json_encode($result);
