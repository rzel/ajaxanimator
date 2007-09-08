<?php
$dir_handle = @opendir(dirname($_SERVER['SCRIPT_FILENAME'])) or die("Unable to open directory");
echo "Directory Listing<br/>";
while ($file = readdir($dir_handle))
{
$file = rawurlencode($file);
$url = str_replace('+' , '%20' , $file);
if($url != ".." && $url != "." && $url != "index.php"){
echo "<a href='".$url."'>".$url."</a><br/>";
}
}
closedir($dir_handle);
?>