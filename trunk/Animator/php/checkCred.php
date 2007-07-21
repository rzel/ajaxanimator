<?php
$trueAccount = false;
$pass = $_REQUEST['pass'];
$user = $_COOKIE['RemAnimatorUser'];


if(file_exists('../users/' . $user . '/pass.php')){

$encrypted_pass = md5($pass);

include '../users/'.$user.'/pass.php';

if($encrypted_pass == $X_pass || $pass == $X_pass){
$trueAccount = true;
}
}

?>