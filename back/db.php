<?php
require 'config.php';

CONST DATABASE_CONNECTION_ERROR=-1;
CONST DATA_NOT_FOUND_ERROR=-2;
CONST NEW_DATA_ALREADY_EXIST_ERROR=-4;
CONST PERMISSION_DENIED = 0;
CONST PERMISSION_SUCCESS = 1;

/**
 * Позволяет выполнять запросы к базе дынных
 * Статический класс
 */

class db {
    private static $instance;
    private static $mysqli;
    private static $error;

    /**
     * Приватный интерфейс
     */
    private function __construct($db_host, $db_user, $db_password, $db_name = null) {
        self::$mysqli = new mysqli($db_host, $db_user, $db_password);
        if (self::$mysqli->connect_errno) {
            return $this->new_error("Connection to the database failed.");
        }
        else if ($db_name && !self::$mysqli->query("use ".$db_name)) {
            return $this->new_error(self::$mysqli->error);
        }
        self::$mysqli->query("SET NAMES utf-8");
        self::$mysqli->query("SET CHARACTER SET utf8");

        return true;
    }
    function __destruct() {
        if (!self::$mysqli->connect_errno) {
            self::$mysqli->close();
        }
    }
    private function new_error($error_msg) {
        self::$error = $error_msg;
        return false;
    }

    /**
     * Публичный интерфейс
     */

    // Инициализация подключения к бд
    public static function connect($db_name = DB_NAME) {
        if (is_null(self::$instance)){
            self::$instance = new self(DB_HOST, DB_USER, DB_PASSWORD, $db_name);
        }
    }
    // Внесение информации о новом пользователе в бд
    public static function add_user($arr)
    {
        if (self::is_error()) {
            return ['status'=>DATABASE_CONNECTION_ERROR];
        } else {
            $result = self::$mysqli->query("SELECT password FROM user WHERE email = '".$arr['email']."'")->fetch_row()[0];
            if ($result=='') {
                self::$mysqli->query("INSERT INTO user(name, email, password) VALUES ('"
                    .$arr['name']."','"
                    .$arr['email']."','"
                    .hash('md5',$arr['password'])."')");
                return ['status'=>PERMISSION_SUCCESS,'message'=>'Response: '.$result."!!!"];
            } else{
                return ['status'=>NEW_DATA_ALREADY_EXIST_ERROR, 'message'=>'Error'];
            }
        }
    }

    public static function check_user($arr)
    {
        if (self::is_error()){
            return ['status'=>DATABASE_CONNECTION_ERROR];
        } else {
           $result = self::$mysqli->query("SELECT password FROM user WHERE email = '".$arr['email']."'")->fetch_row()[0];
           if (hash('md5',$arr['password'])==$result) {
                return ['status'=>PERMISSION_SUCCESS, 'message'=>self::$mysqli->query("SELECT name FROM user WHERE email = '".$arr['email']."'")->fetch_row()[0]];
            } else {
                return ['status'=>PERMISSION_DENIED];
            }
        }
    }


    public static function is_error() {
        if (!isset(self::$instance) || !is_null(self::$error)) return true;
        else return false;
    }
    public static function error_msg() {
        if (self::is_error()) return self::$error;
        else if (is_null(self::$instance)) return "Need connection to the database.";
        else return "No errors.";
    }
}