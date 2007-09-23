<?php
$f=fopen("visitLength.txt", 'a');
fwrite($f, $_REQUEST["t"].";");
fclose($f);
?>
