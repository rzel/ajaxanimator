<?php 

$fh = fopen("../html/ajaxanimator.htm", 'r');
$theData = fread($fh, filesize("../html/ajaxanimator.htm"));
fclose($fh);


$theData =  preg_replace('/\s+/', ' ', $theData );

ereg("<!--BeginBodyJS.*EndBodyJS-->",$theData,$wzreg);
$theData = str_replace($wzreg[0],'<script type="text/javascript">'.file_get_contents("../lib/wz_tooltip-packer.js")."</script>",$theData);
ereg("<!--BeginJS.*EndJS-->",$theData,$regs);
ereg("<!--BeginCSS.*EndCSS-->",$theData,$cssCode);
$c = $cssCode[0];
$c = str_replace("<!--BeginCSS-->", "", $c);
$c = str_replace("<!--EndCSS-->", "", $c);
$c = str_replace('<link rel="stylesheet" type="text/css" href="', "", $c);
$c = str_replace('">', "", $c);
$c = preg_replace('/\s+/', ',', $c);
$cssCodeu = explode(",",$c);
$s = $regs[0];
$s = str_replace("ext-all-debug.js","ext-all.js",$s);
$s = str_replace("ext-base.js","ext-base.js",$s);
$s = str_replace("<!--BeginJS-->", "", $s);
$s = str_replace("<!--EndJS-->", "", $s);
$s = str_replace('<script type="text/javascript" src="', "", $s);
$s = str_replace('"></script>', "", $s);
$s = preg_replace('/\s+/', ',', $s);
$sc = explode(",",$s);
$fns = "";
//echo "Finish Parsing ajaxanimator.htm source<br>";
//echo "Starting Load File foreach loop<br>";
foreach($sc as $fn){
//echo "Loading $fn<br>";
$fhz = fopen($fn, 'r');
$jsf = fread($fhz, filesize($fn));
fclose($fhz);
$fns = "$fns \n $jsf" ;
//echo "Finish Loading $fn <br>";
}
//echo "Finish Loading Files<br>";
//echo "Writing To jsOut.js (uncompressed merged source)<br>";
$saveJS = "tmp/jsOut.js";
$fha = fopen($saveJS, 'w') or die("can't open file");
fwrite($fha, $fns);
fclose($fha);
//echo "Finish Writing to jsOut.js<br>";
//echo "Calling YUI Compressor<br>";
$output = "$saveJS-min.js";
$cmd = "java -jar yuicompressor-2.2.5.jar --warn --charset UTF-8 -o " . $output . " " . $saveJS . " 2>&1";
exec($cmd, $out, $err);
echo "$err : ";

foreach($out as $outln){
echo "$outln<br>";
}

//echo "Reading Output of YUI Compressor<br>";
$fh = fopen($output, 'r');
$jssrc = fread($fh, filesize($output));
fclose($fh);

//echo "Finish Reading YUI Compressor Output<br>";
//echo "Creating a GZIP compressed Javascript file (for on-the-fly php compression)<br>";
$gzsrc = "$output-gzip.php";
$fhazy = fopen($gzsrc, 'w') or die("can't open file");
fwrite($fhazy,'<?php ob_start ("ob_gzhandler"); ?>' . $jssrc . '<?php ob_end_flush(); ?>');
fclose($fhazy);
//echo "Finish GZIP compressed Javascript file (for on-the-fly php compression)<br>";

$theData = str_replace($regs[0],'',$theData);

$newzfile = $theData;
$newfile = $theData;
$cssCoded = "";
foreach($cssCodeu as $cssCodem){
$sText = file_get_contents($cssCodem);
$sText = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $sText);
$buffer = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '   ', '    ', '     '), '', $sText);
$cssCoded.=$buffer."\n";
}
echo $cssCode[0];
$newfile = str_replace($cssCode[0],'<style type="text/css">'.$cssCoded."</style>",$newfile);
$newfile = str_replace("<!--JS Page Bottom-->",'<script type="text/javascript" src="'.$gzsrc.'"></script>',$newfile);
echo "Writing ajaxanimator-compressed.htm<br>";
$fhaz = fopen("ajaxanimator-compressed.htm", 'w') or die("can't open file");
fwrite($fhaz, $newfile);
fclose($fhaz);
//"Finish Compiliation<br><hr>";
//"<a href='ajaxanimator-compressed.htm'>Compiled Output</a>";
//"<hr>Publishing To HTML folder and ajaxanimator folder";
//copy("ajaxanimator-compressed.htm","../html/ajaxanimator-compressed.htm");

$edtd =  str_replace($gzsrc,"../ajaxanimator/full.js",$newfile);;
$fhazyw = fopen("../html/ajaxanimator-compressed.htm", 'w') or die("can't open file");
fwrite($fhazyw,$edtd);
fclose($fhazyw);

$newzfile = str_replace($cssCode[0],'<style type="text/css">'.$cssCoded."</style>",$newzfile);
$newzfile = str_replace("<!--JS Page Bottom-->",'<script type="text/javascript" src="../ajaxanimator/full.js.php"></script>',$newzfile);

//"Writing ajaxanimator-compressed-adfree.php (html folder)<br>";
$fhaz = fopen("../html/ajaxanimator-compressed-adfree.php", 'w') or die("can't open file");
fwrite($fhaz, '<?php ob_start ("ob_gzhandler"); ?>'.$newzfile. '<?php ob_end_flush(); ?>');
fclose($fhaz);
//"Copying $gzsrc to full.js (in html folder)<br>";
copy($gzsrc,"../ajaxanimator/full.js.php");
//"Finish copying $gzsrc to full.js.php (in html folder)<br>";
$newzfile2 = $newzfile;
$newzfile2 = str_replace("<!-- GoogAd1-->", file_get_contents("GoogAd1.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd2-->", file_get_contents("GoogAd2.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd3-->", file_get_contents("GoogAd3.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd4-->", file_get_contents("GoogAd4.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd5-->", file_get_contents("GoogAd5.txt"),$newzfile2);

//"Writing ajaxanimator-compressed.php (html folder)<br>";
$fhaz = fopen("../html/ajaxanimator-compressed.php", 'w') or die("can't open file");
fwrite($fhaz, '<?php ob_start ("ob_gzhandler"); ?>'.$newzfile2. '<?php ob_end_flush(); ?>');
fclose($fhaz);

copy($output,"../ajaxanimator/full.js");

?>
