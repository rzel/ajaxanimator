<?php
include 'checkCred.php';
if($trueAccount == true){
$name = $_REQUEST['name'];
$fw = fopen('../users/'.$user.'/animations/'.$name.'.xml', 'w');
$stringData = $_REQUEST['data'];
fwrite($fw, $stringData);
fclose($fw);
echo "account verified";
}else{
echo "acount not valid";
}
?>