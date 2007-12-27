<?php
//This file recieves content Via a POST http request and makes the client download it, as a file
header('Content-type: application/octetstream');
header('Content-Length: ' . strlen($_REQUEST['content']));
header('Content-Disposition: attachment; filename="'.$_REQUEST['fn'].'"');
echo stripslashes($_REQUEST['content']);
?>