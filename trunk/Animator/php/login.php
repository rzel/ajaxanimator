<?php
$cookie_name = "RemAnimatorUser";
setcookie($cookie_name, $user, time+36000000000000000000000000000000);

$user = $_REQUEST['user'];
$pass = $_REQUEST['pass'];
$rem = $_REQUEST['rem'];
$valid = $_REQUEST['valid'];
if($valid == "true"){
if(file_exists('../users/'.$user.'/pass.php')){
$encrypted_pass = md5($pass);
include '../users/'.$user.'/pass.php';
if($encrypted_pass == $X_pass || $pass == $X_pass){

echo "S2: Cookie Added + Login Sucessful";

}else{
echo "E1: Wrong Password";
}
}else{
echo "E2: Username Does Not Exist";
}
}else{
echo "E3: Invalid Login";
}
?>