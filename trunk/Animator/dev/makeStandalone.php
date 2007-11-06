<?php 
function writeF($fileName,$strData){
$fha = fopen($fileName, 'w') or die("can't open file");
fwrite($fha, $strData);
fclose($fha);
}
//$scC = file_get_contents("tmp/jsOut.js-min.js");
$axH = file_get_contents("../html/ajaxanimator-compressed.htm");
$axH = str_replace('<script type="text/javascript" src="../ajaxanimator/full.js"></script>',"<script type='text/javascript'>var alternateStaticHost = true;</script>
<script type='text/javascript' src='http://ajaxanimator.googlecode.com/svn/trunk/Animator/ajaxanimator/full.js'></script>",$axH);
$axH = str_replace('../ajaxanimator/ajaxanimator-all.css',"http://ajaxanimator.googlecode.com/svn/trunk/Animator/ajaxanimator/ajaxanimator-all.css",$axH);
$axH = str_replace('../images/loading-large.gif',"http://ajaxanimator.googlecode.com/svn/trunk/Animator/images/loading-large.gif",$axH);
echo strlen($axH);
echo "<br>Done";
writeF("../html/ajaxanimator-standalone.htm",$axH);
?>