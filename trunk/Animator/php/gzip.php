<?php 
ob_start ("ob_gzhandler");
//include "jsmin.php";
header("Content-type: text/javascript; charset: UTF-8");
$fh = fopen($_REQUEST['url'], 'r');
//echo JSMin::minify(fread($fh, filesize($_REQUEST['url'])));
echo fread($fh, filesize($_REQUEST['url']));
ob_end_flush();
?>

