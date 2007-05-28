<?php
$File = "faq.htm";
$Handle = fopen($File, 'w');
$Data = stripslashes($_REQUEST['faq']);
fwrite($Handle, $Data);
print "Data Written";
fclose($Handle);
?>