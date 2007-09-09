<?php
header('Content-type: application/octetstream');
header('Content-Length: ' . filesize($_REQUEST['url']));
header('Content-Disposition: attachment; filename="'.$_REQUEST['fn'].'"');
echo file_get_contents($_REQUEST['url'])
?>