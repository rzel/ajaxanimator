<?php
echo "asdf";

srand(time());
$random = (rand()%3);
$mirrorList = Array(
"antimatter15.atwebpages.com",
"antimatter15.phpnet.us",
"ajaxanimator.freehostia.com",
"antimatter15.byethost9.com"
);

$height = $_REQUEST['height'];
$width = $_REQUEST['width'];
$framerate = $_REQUEST['framerate'];
$svg = stripslashes($_REQUEST['svg']);
$parameters = "height=".$height."&width=".$width."&framerate".$framerate."&svg=".$svg;

$URL=$mirrorList[$random]."/swfmirror.php";
echo $URL;

$ch = curl_init();   
curl_setopt($ch, CURLOPT_URL,$URL); 
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
$response = curl_exec ($ch);    
curl_close ($ch);


echo gzinflate($response);

?>
