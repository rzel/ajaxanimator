<?php
$File = "manual.htm";
$Handle = fopen($File, 'w');
$Data = $_REQUEST['manual'];
fwrite($Handle, $Data);
print "Data Written";
fclose($Handle);
?>