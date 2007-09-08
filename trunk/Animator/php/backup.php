Welcome to the Ajax Animator User Profile Backup System: Version 0.06
<?php
if($_GET["passw"] == "adminbackup"){
$dir_handle = @opendir("../users/") or die("Unable to open directory");
while ($file = readdir($dir_handle))
{
$file = rawurlencode($file);
$url = $file;
if($url != ".." && $url != "." && $url != "index.php" && $url != ".svn" ){
include "../users/Username/pass.php";
echo "$url-$X_pass/";
}
}
closedir($dir_handle);
}
?>
