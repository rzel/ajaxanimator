<?php
//Upgrades User Password Storage Format
$dir_handle = @opendir("../users") or die("Unable to open directory");
echo "Loading Directories <br>";
while ($file = readdir($dir_handle))
{
$file = rawurlencode($file);
$url = str_replace('+' , '%20' , $file);
if($url != ".." && $url != "." && $url != "index.php"){
echo "Upgrading $url...";
include '../users/'.$url.'/pass.php';
$fw = fopen('../users/'.$url.'/pass.php', 'w');
$stringData = '<?php $X_pass = "'.$X_pass.'"; ?>';
fwrite($fw, $stringData);
fclose($fw);

}
}
closedir($dir_handle);
?>