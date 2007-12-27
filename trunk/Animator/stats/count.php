<?php
require_once("statsettings.php");
echo "starting.";
if($doStats==true){
$f=fopen("visitLength.txt", 'a');
fwrite($f, $_REQUEST["t"].";");
fclose($f);
echo "done.";
}else{
echo "admin abort.";
}
echo "finished exec.";
?>
