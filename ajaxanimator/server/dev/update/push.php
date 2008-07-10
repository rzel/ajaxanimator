<?php
/*
Pushes new updated to servers
*/

include "../../../../axconfig.php";

/*format for axconfig.php:
  $servers = array(
    "SERVER_URL PASSWORD"
  );
 */

 function send($file,$type,$ssi_fo){
 $server = $ssi_fo[0];
$key = $ssi_fo[1];
 echo "Loaded Update Data... ";
 $update = gzdeflate(file_get_contents($file));
 echo "cLength: ".strlen($update)."<br>";
 echo "Creating Hash... ";
 $hash = sha1($update);
 echo $hash."<br>";
 echo "Sending Data; Response: <br>";
 $ch = curl_init("http://$server/server/update/update.php?key=$key&hash=$hash&type=$type");
 curl_setopt ($ch, CURLOPT_POST, 1);
 curl_setopt ($ch, CURLOPT_POSTFIELDS, http_build_query(array("update"=>$update)));
 curl_exec ($ch);
 curl_close ($ch);
 echo "<br>Done.<br>";
}

foreach($servers as $serv_info){

//$serv_info = "antimatter15.110mb.com/animator/Animator2 default";
$ssi_fo = explode(" ",$serv_info);


switch($_REQUEST["action"]){
case "j":
echo "<b>Updating Javascript</b><br>";
send("../../../build/ajaxanimator-all.js","j",$ssi_fo);
break;
case "c":
echo "<b>Updating CSS</b><br>";
send("../../../build/ajaxanimator-all.css","c",$ssi_fo);
break;
case "h":
echo "<b>Updating HTML</b><br>";
send("../../../build/index.htm","h",$ssi_fo);
break;
case "b":
echo "<b>Loading Update Mask</b><br>";
send(null,"b",$ssi_fo);
}
}



?>