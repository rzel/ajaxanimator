<?php
include 'checkCred.php';
if($trueAccount == true){
$name = $_REQUEST['name'];

$fw = fopen('../users/'.$user.'/animations/'.$name.'.xml', 'w');
$stringData = stripslashes($_REQUEST['data']);
fwrite($fw, $stringData);
fclose($fw);
chmod('../users/'.$user.'/animations/'.$name.'.xml', 0777);
echo "S1;account verified";
}else{
echo "E1;acount not valid";
}
?>