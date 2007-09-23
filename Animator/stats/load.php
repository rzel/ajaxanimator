<?php

function logData($file,$data){
$f=fopen($file, 'a');
fwrite($f, $data.";");
fclose($f);
}

function logReq($reqid){
logData($reqid.".txt",$_REQUEST[$reqid]);
}

function overwriteText($file,$data){
$fh = fopen($file, 'w') or die("can't open file");
fwrite($fh, $data);
fclose($fh);
}

logData("ipAddress.txt",$REMOTE_ADDR);
logData("screen.txt",$_REQUEST["screenheight"]."x".$_REQUEST["screenwidth"]);
logData("location.txt",$_REQUEST["location1"].",".$_REQUEST["location2"]);
logReq('platform');
logReq('date');
logData("browsers.txt",$_REQUEST["useragent"]);
overwriteText("visitCount.txt",intval(file_get_contents("visitCount.txt"))+1);
echo "Done";
?>