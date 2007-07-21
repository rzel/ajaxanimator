<?php
$user = $_REQUEST['user'];
$pass = $_REQUEST['pass'];
$valid = $_REQUEST['valid'];
if($valid == "true"){
$pass2 = md5($pass);
mkdir('../users/'.$user);
mkdir('../users/'.$user.'/animations');
$fw = fopen('../users/'.$user.'/pass.php', 'w');
$stringData = '<?php
$X_pass = "'.$pass2.'"
?>';
fwrite($fw, $stringData);
fclose($fw);
chmod('users/'.$user.'/pass.php', 0000);
echo "S1: Registration Complete";
}else{
echo "E1: Registration Not Valid";
}
?>