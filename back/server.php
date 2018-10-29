<?php
require "db.php";
db::connect();
if (!db::is_error()) {
    echo db::add_user(array( // заменить на $_GET['user']
        name => "Andrey",
        email => "mail@gmail.com",
        password => "qwerty123456")
    );
}