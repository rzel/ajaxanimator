<?php 
function writeF($fileName,$strData){
$fha = fopen($fileName, 'w') or die("can't open file");
fwrite($fha, $strData);
fclose($fha);
}
$scC = file_get_contents("tmp/jsOut.js-min.js");
$axH = file_get_contents("../html/ajaxanimator-compressed.htm");
$axC = file_get_contents("tmp/cssOut.css-min.css");
$axH = str_replace('<script type="text/javascript" src="../ajaxanimator/full.js"></script>',"<script type='text/javascript'>\nvar alternateStaticHost = true;\n".$scC."</script>",$axH);
$axH = str_replace('<link rel="stylesheet" type="text/css" href="../ajaxanimator/ajaxanimator-all.css">',"<style type='text/css'>".$axC."</style>",$axH);
$axH = str_replace('../images/loading-large.gif',"http://ajaxanimator.googlecode.com/svn/trunk/Animator/images/loading-large.gif",$axH);
echo strlen($axH);
echo "<br>Done";
writeF("../ajaxanimator-standalone.htm",$axH);
?>