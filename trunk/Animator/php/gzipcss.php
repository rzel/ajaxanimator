<?php 
ob_start ("ob_gzhandler");
header("Content-type: text/css; charset: UTF-8");
header('Content-Length: ' . filesize($_REQUEST['url']));
header('Content-Disposition: attachment; filename="'.$_REQUEST['fn'].'"');
echo file_get_contents($_REQUEST['url']);
ob_end_flush();
?>

