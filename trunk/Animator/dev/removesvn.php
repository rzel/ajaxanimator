<?php

function crawl($dir){
$dir_handle = @opendir($dir) or die("Unable to open directory");
echo "Directory Listing: $dir<br/>";
while ($file = readdir($dir_handle)){
//$file = rawurlencode($file);
//$url = str_replace('+' , '%20' , $file);
if($file != ".." && $file != "."){
echo "$file<br>";



if(strpos($dir,".svn")!=false){
recursive_remove_directory($dir);
}

if(strpos($file,".svn")!=false){
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

<?php

// ------------ lixlpixel recursive PHP functions -------------
// recursive_remove_directory( directory to delete, empty )
// expects path to directory and optional TRUE / FALSE to empty
// ------------------------------------------------------------
function recursive_remove_directory($directory, $empty=FALSE)
{
	if(substr($directory,-1) == '/')
	{
		$directory = substr($directory,0,-1);
	}
	if(!file_exists($directory) || !is_dir($directory))
	{
		return FALSE;
	}elseif(is_readable($directory))
	{
		$handle = opendir($directory);
		while (FALSE !== ($item = readdir($handle)))
		{
			if($item != '.' && $item != '..')
			{
				$path = $directory.'/'.$item;
				if(is_dir($path)) 
				{
					recursive_remove_directory($path);
				}else{
					unlink($path);
				}
			}
		}
		closedir($handle);
		if($empty == FALSE)
		{
			if(!rmdir($directory))
			{
				return FALSE;
			}
		}
	}
	return TRUE;
}
// ------------------------------------------------------------

?>