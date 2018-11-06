<?php
require "db.php";

db::connect();
$response=array('success'=>false, 'message'=>"Server internal error. Please, try again");
if (!db::is_error()) {
    $result=db::add_user(array('email' => $_POST['email'], 'password'=>$_POST['password'], 'name'=>$_POST['name']));
    if ($result['status']===PERMISSION_SUCCESS){
        $response['success']=true;
        $response['message']=['name'=>$_POST['name'],'id'=>$result['message']];
    } else if ($result['status']===NEW_DATA_ALREADY_EXIST_ERROR) {
        $response['message']="This email is already registered. Try another email or sign in";
    }
}

echo json_encode($response,JSON_FORCE_OBJECT);
