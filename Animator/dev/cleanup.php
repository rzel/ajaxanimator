<?php

function crawl($dir){
$dir_handle = @opendir($dir) or die("Unable to open directory");
echo "Directory Listing: $dir<br/>";
while ($file = readdir($dir_handle)){
//$file = rawurlencode($file);
//$url = str_replace('+' , '%20' , $file);
if($file != ".." && $file != "."){
echo "$file<br>";
if(strpos($file,"~")==strlen($file)-1){
echo "<b>$file</b><br>";
unlink($dir."/".$file);
}
if(is_dir($dir."/".$file)){
crawl($dir."/".$file);
}
}
}
closedir($dir_handle);
}

crawl("../");

?>