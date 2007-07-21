<?php
$trueAccount = false;
$pass = $_REQUEST['pass'];
if(file_exists('../users/'.$_COOKIE['RemAnimatorUser'].'/pass.php')){
$encrypted_pass = md5($pass);
include '../users/'.$_COOKIE['RemAnimatorUser'].'/pass.php';
if($encrypted_pass == $X_pass || $pass == $X_pass){
$trueAccount = true;
}

?>