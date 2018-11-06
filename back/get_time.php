<?php
require "db.php";
db::connect();
//$arr=['user'=>1,'visitTime'=>'22:00:00','visitDate'=>'2018-11-11','service'=>'cutting'];
$result = db::get_time();
$arr=[];
if ($result['status']>0){
    foreach ($result['message'] as $value) {
        $arr[$value[1]][]=$value[0];
    }
}
echo json_encode($arr);