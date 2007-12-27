<?php
echo "Clear Stat Logs:<hr>";
function clearLog($file){
$fh = fopen($file, 'w') or die("can't open file");
fwrite($fh, "");
fclose($fh);
}
clearLog("location.txt");
clearLog("browsers.txt");
clearLog("platform.txt");
clearLog("screen.txt");
clearLog("date.txt");
clearLog("ipAddress.txt");
clearLog("visitLength.txt");

$fhe = fopen("visitCount.txt", 'w') or die("can't open file");
fwrite($fhe, "1");
fclose($fhe);
?>