<?php 


function makeStandalone($a,$b){
$axH = file_get_contents($a);
//$axH =str_replace('.php','',$axH);
$axH = str_replace('<script type="text/javascript" src="../ajaxanimator/full.js"></script>',"<script type='text/javascript'>var altStatic = true;</script>
<script type='text/javascript' src='http://ajaxanimator.googlecode.com/svn/trunk/Animator/stable/ajaxanimator/full.js'></script>",$axH);


$axH =str_replace('../','http://ajaxanimator.googlecode.com/svn/trunk/Animator/stable/',$axH);


echo strlen($axH);
echo "<br>DoneA";
writeF($b,$axH);
}

?>