<?php
$user = $_REQUEST["user"];
$dir_handle = @opendir('../users/' . $user . '/animations/' ) or die("Unable to open directory");
while ($file = readdir($dir_handle))
{
$file = rawurlencode($file);
$url = str_replace('+' , '%20' , $file);
if($url != ".." && $url != "." && $url != ".svn"){
echo "$url,";
}
}
closedir($dir_handle);
?>