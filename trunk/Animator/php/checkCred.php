<?php
$trueAccount = false;

if(isset($_REQUEST['user'])){
$user = $_REQUEST['user'];
}else{
$user = $_COOKIE['RemAnimatorUser'];
}

if(isset($_REQUEST['pass'])){
$pass = $_REQUEST['pass'];
}else{
$pass = $_COOKIE['RemAnimatorPass'];
}
$validUsername = false;

if(file_exists('../users/' . $user . '/pass.php')){
$validUsername = true;
$encrypted_pass = md5($pass);

include '../users/'.$user.'/pass.php';

if($encrypted_pass == $X_pass || $pass == $X_pass){
$trueAccount = true;
}
}

?>