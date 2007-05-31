<?php
function rgbConvert($rgb_str){
$rgb = $rgb_str;
$rgb = str_replace("rgb(","",$rgb);
$rgb = str_replace(")","",$rgb);
$rgbArray = explode(",", $rgb);
return $rgbArray;
}
$asdf = rgbConvert("rgb(255,0,0)");
echo $asdf[0];
?>