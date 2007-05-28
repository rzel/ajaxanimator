<?php
$File = "manual.htm";
$Handle = fopen($File, 'w');
$Data = stripslashes($_REQUEST['manual']);
fwrite($Handle, $Data);
print "Data Written";
fclose($Handle);
?>