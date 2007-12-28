<?php 
function writeF($fileName,$strData){
$fha = fopen($fileName, 'w') or die("can't open file");
fwrite($fha, $strData);
fclose($fha);
}
function cLink($cssURL){
return '<link rel="stylesheet" type="text/css" href="'.$cssURL.'">';
}
function jsInc($jsURL){
return '<script type="text/javascript" src="'.$jsURL.'"></script>';
}
function gzJSStr($ungzipStr){
return '<?php ob_start ("ob_gzhandler");header("Content-type: text/javascript; charset: UTF-8"); ?>' . $ungzipStr . '<?php ob_end_flush(); ?>';
}
function gzHTMLStr($ungzipStr){
return '<?php ob_start ("ob_gzhandler");header("Content-type: text/html; charset: UTF-8"); ?>' . $ungzipStr . '<?php ob_end_flush(); ?>';
}
function gzCSSStr($ungzipStr){
return '<?php ob_start ("ob_gzhandler");header("Content-type: text/css; charset: UTF-8"); ?>' . $ungzipStr . '<?php ob_end_flush(); ?>';
}
function inlJS($injs){ //insert inline javascript
return '<script type="text/javascript">'.$injs.'</script>';
}
function makeStandalone($a,$b){
$axH = file_get_contents($a);
$axH = str_replace("<!--CompilierConfig-->",inlJS("var altStatic = true;"),$axH);
$axH = str_replace('../','http://ajaxanimator.googlecode.com/svn/trunk/Animator/stable/',$axH);
echo strlen($axH);
echo "<br>DoneA";
writeF($b,$axH);
}


$fh = fopen("../html/ajaxanimator.htm", 'r');
$mainHTML = fread($fh, filesize("../html/ajaxanimator.htm"));
fclose($fh);

echo strlen($mainHTML)."<br>";


ereg("<!--BeginCSS.*EndCSS-->",$mainHTML,$cssCode);
$c = $cssCode[0];
$c = str_replace("<!--BeginCSS-->", "", $c);
$c = str_replace("<!--EndCSS-->", "", $c);
$c = str_replace('<link rel="stylesheet" type="text/css" href="', "", $c);
$c = str_replace('">', "", $c);
$c = preg_replace('/\s+/', ',', $c);
$cssFiles = array_unique(explode(",",$c));

foreach($cssFiles as $fc){
$mergeCSS.="\n".file_get_contents($fc);
}
ereg("<!--BeginJS.*EndJS-->",$mainHTML,$regs);
$s = $regs[0];
$s = str_replace("ext-all-debug.js","ext-all.js",$s);
$s = str_replace("ext-base.js","ext-base.js",$s);
$s = str_replace("<!--BeginJS-->", "", $s);
$s = str_replace("<!--EndJS-->", "", $s);
$s = str_replace('<script type="text/javascript" src="', "", $s);
$s = str_replace('"></script>', "", $s);
$s = preg_replace('/\s+/', ',', $s);
$jsFiles = explode(",",$s);
foreach($jsFiles as $fn){
$compiledJS.="\n".file_get_contents($fn);
}

echo strlen($compiledJS)."<br>";

$cssIn = "tmp/cssOut.css";
writeF($cssIn,$mergeCSS);
$cssOut = "$cssIn-min.css";
$cssCmd = "java -jar yuicompressor-2.2.5.jar -o $cssOut $cssIn";
exec($cssCmd,$cssO,$cssE);
//$cssgzsrc = "$cssOut-gzip.php";
//writeF("$cssOut-gzip.php", gzCSSStr(file_get_contents($cssOut)));
//copy($cssgzsrc,"../ajaxanimator/ajaxanimator-all.css.php");
copy($cssOut,"../ajaxanimator/ajaxanimator-all.css");

$saveJS="tmp/jsOut.js";
writeF($saveJS,$compiledJS);
$output = "$saveJS-min.js";
$cmd = "java -jar yuicompressor-2.2.5.jar --warn --charset UTF-8 -o " . $output . " " . $saveJS . " 2>&1";
exec($cmd, $out, $err);
echo "$err : ";

foreach($out as $outln){
echo "$outln<br>";
}


$jssrc = file_get_contents($output);


//$gzsrc = "$output-gzip.php";
//writeF($gzsrc, gzJSStr($jssrc));

//copy($gzsrc,"../ajaxanimator/full.js.php");

copy($output,"../ajaxanimator/full.js");


$newzfile = $mainHTML;
//$newfile = $mainHTML;
//echo $compiledCSS;

//$newfile = str_replace($cssCode[0],cLink("../ajaxanimator/ajaxanimator-all.css"),$newfile);

//$newfile = str_replace($regs[0],jsInc($gzsrc),$newfile);


//writeF("ajaxanimator-compressed.htm",$newfile);


$newzfile = str_replace($cssCode[0],cLink("../ajaxanimator/ajaxanimator-all.css"),$newzfile);
$newzfile = str_replace($regs[0],jsInc("../ajaxanimator/full.js"),$newzfile);

writeF("../html/ajaxanimator-compiled-adfree.htm",$newzfile);

//writeF("../html/ajaxanimator-compressed-adfree.php",gzHTMLStr($newzfile));



$newzfile2 = $newzfile;

$newzfile2 = str_replace("<!-- GoogAd1-->", file_get_contents("GoogAd1.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd2-->", file_get_contents("GoogAd2.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd3-->", file_get_contents("GoogAd3.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd4-->", file_get_contents("GoogAd4.txt"),$newzfile2);
//$newzfile2 = str_replace("<!-- GoogAd5-->", file_get_contents("GoogAd5.txt"),$newzfile2);



writeF("../html/ajaxanimator-compiled.htm", $newzfile2);


//require_once("makeStandalone.php");

//makeStandalone("../html/ajaxanimator-compressed.htm","../html/ajaxanimator-standalone.htm");
//makeStandalone("../html/ajaxanimator-compressed.php","../html/ajaxanimator-standalone.php");


makeStandalone("../html/ajaxanimator-compiled.htm","../html/ajaxanimator-compressed.htm");

makeStandalone("../html/ajaxanimator-compiled-adfree.htm","../html/ajaxanimator-compressed-adfree.htm");
?>
