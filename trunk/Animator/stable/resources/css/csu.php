<?php
if(isset($_REQUEST["csu"])){
echo "File: ". $_REQUEST["csu"]."<hr>";
$cssTxt = file_get_contents($_REQUEST["csu"]);
preg_match_all("/url[(](.+?)[)]/i", $cssTxt, $matches);
foreach($matches[1] as $man){
$ma = str_replace('"',"",str_replace("'","",$man));
$gM = getimagesize(trim($ma));
echo "Replacing: ". $ma . "-". filesize(trim($ma)) . "<br>";
$cssTxt = str_replace($man, "'".'data:'.$gM['mime'].';base64,'.base64_encode(file_get_contents(trim($ma)))."'", $cssTxt);
}
echo "<hr>Saving To".$_REQUEST["csu"].".DataURI.css<br>";
$fh = fopen($_REQUEST["csu"].".DataURI.css", 'w') or die("can't open file");
fwrite($fh, $cssTxt);
fclose($fh);
echo "done.";
}else{
?>
<form method="POST">
<input name="csu" type="text" value="CSS Filename...">
<input type="submit" value="Go">
</form>
<?php
}
?>