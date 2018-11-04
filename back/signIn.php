<?php
require "db.php";
db::connect();
$response=array('success'=>false, 'message'=>"Server internal error. Please, try again");
if (!db::is_error()) {
    $result=db::check_user(array('email' => $_POST['email'], 'password'=>$_POST['password']));
    if ($result[status]==PERMISSION_SUCCESS){
        $response['success']=true;
        $response['message']=$result['message'];
    } else if ($result[status]==PERMISSION_DENIED) {
         $response['message']="There is no such combination of email and password. Please, try again";
    }
}
echo json_encode($response,JSON_FORCE_OBJECT);