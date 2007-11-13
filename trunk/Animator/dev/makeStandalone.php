
<?php 

echo "
Welcome To The Ajax Animator Stage 2 Compilier, coincidentially Version 2
<br>
The application simply gets the compiled stuff, and changes all the dependencties to google code's uber fast svn, something i call exploiting google
<br>
";

function writeF2($fileName2,$strayData){
$flah = fopen($fileName2, 'w') or die("can't open file");
fwrite($flah, $strayData);
fclose($flah);
}

//$scC = file_get_contents("tmp/jsOut.js-min.js");
$axH2L = file_get_contents("../html/ajaxanimator-compiled.htm");
$axH2L = str_replace('<script type="text/javascript" src="../ajaxanimator/full.js"></script>',"<script type='text/javascript'>var alternateStaticHost = true;</script><script type='text/javascript' src='http://ajaxanimator.googlecode.com/svn/trunk/Animator/ajaxanimator/full.js'></script>",$axH2L);
$axH2L = str_replace('../ajaxanimator/ajaxanimator-all.css',"http://ajaxanimator.googlecode.com/svn/trunk/Animator/ajaxanimator/ajaxanimator-all.css",$axH2L);
$axH2L = str_replace('../images/loading-large.gif',"http://ajaxanimator.googlecode.com/svn/trunk/Animator/images/loading-large.gif",$axH2L);
echo strlen($axH2L);
echo "<br>DoneA<br>";
writeF2("../html/ajaxanimator-compressed.htm",$axH2L);

$axH2L = file_get_contents("../html/ajaxanimator-compiled.php");
$axH2L = str_replace('<script type="text/javascript" src="../ajaxanimator/full.js.php"></script>',"<script type='text/javascript'>var alternateStaticHost = true;</script><script type='text/javascript' src='http://ajaxanimator.googlecode.com/svn/trunk/Animator/ajaxanimator/full.js'></script>",$axH2L);
$axH2L = str_replace('../ajaxanimator/ajaxanimator-all.css.php',"http://ajaxanimator.googlecode.com/svn/trunk/Animator/ajaxanimator/ajaxanimator-all.css",$axH2L);
$axH2L = str_replace('../images/loading-large.gif',"http://ajaxanimator.googlecode.com/svn/trunk/Animator/images/loading-large.gif",$axH2L);
echo strlen($axH2L);
echo "<br>DoneB";
writeF2("../html/ajaxanimator-compressed.php",$axH2L);
?>