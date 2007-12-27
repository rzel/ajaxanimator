<div>
<?php
$dir_handle = @opendir("../users/") or die("Unable to open directory");
while ($file = readdir($dir_handle))
{
$file = rawurlencode($file);
$url = str_replace('+' , '%20' , $file);
if($url != ".." && $url != "." && $url != "index.php" && $url != ".svn" ){
$urI = '"' . $url . '"';
echo "<a href='javascript:animationList2($urI)'>$url</a><br />";
}
}
closedir($dir_handle);
?>
</div>