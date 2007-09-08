<?php
require_once("decompressXML.php");
echo decompressXML(stripslashes($_REQUEST['svg']));
echo "<hr>"
echo decompressXML($_REQUEST['svg']);
exit;
?>
