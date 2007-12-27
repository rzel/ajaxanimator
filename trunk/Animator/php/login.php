<?php


$user = $_REQUEST['user'];
$pass = $_REQUEST['pass'];
//$rem = $_REQUEST['rem'];
$valid = $_REQUEST['valid'];
if($valid == "true"){
if(file_exists('../users/'.$user.'/pass.php')){
$encrypted_pass = md5($pass);
include '../users/'.$user.'/pass.php';
if($encrypted_pass == $X_pass || $pass == $X_pass){
if($X_pass == $pass){//If the data's already encoded
$epw = $pass;
}else{
$epw = $encrypted_pass;
}
//zsetcookie("RemAnimatorUser", $user, time+36000000000000000000000000000000);
//setcookie("RemAnimatorPass", $epw, time+36000000000000000000000000000000);

echo "S2: Login Sucessful; MD5 PW::".$epw; //Return Sucess code; Human readable message; MD5 Encoded Password

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