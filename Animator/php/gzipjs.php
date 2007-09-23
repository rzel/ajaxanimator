<?php 
ob_start ("ob_gzhandler");
header("Content-type: text/javascript; charset: UTF-8");
$fh = fopen($_REQUEST['url'], 'r');
echo fread($fh, filesize($_REQUEST['url']));
ob_end_flush();
?>

