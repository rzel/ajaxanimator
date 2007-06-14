<?php
$fileHash = $_REQUEST['file'];
$fileHash = str_replace("-","", $fileHash);
$fileHash = str_replace(".swf","", $fileHash);
$fileHash = str_replace("files/","", $fileHash);
$fileHash = str_replace("file","", $fileHash);
$SWFFile = "files/file-$fileHash.swf";
unlink($SWFFile);
echo $SWFFile;
?>