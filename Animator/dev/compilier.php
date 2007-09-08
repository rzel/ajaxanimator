<?php ob_start ("ob_gzhandler"); ?>
Ajax Animator Compilier<br>
Version 0.63 Alpha<br>
<hr>
<?php 
$stimer = explode( ' ', microtime() );
$stimer = $stimer[1] + $stimer[0];

echo "Reading ajaxanimator.htm<br>";
$myFile = "../html/ajaxanimator.htm";
$fh = fopen($myFile, 'r');
$theData = fread($fh, filesize($myFile));
fclose($fh);


$theData =  preg_replace('/\s+/', ' ', $theData );

echo "Finish Reading ajaxanimator.htm<br>";
echo "Parsing ajaxanimator.htm source<br>";
ereg("<!--BeginJS.*EndJS-->",$theData,$regs);
$s = $regs[0];
$s = str_replace("../ext/ext-all-debug.js","../ext/ext-all.js",$s);
$s = str_replace("<!--BeginJS-->", "", $s);
$s = str_replace("<!--EndJS-->", "", $s);
$s = str_replace('<script type="text/javascript" src="', "", $s);
$s = str_replace('"></script>', "", $s);
$s = preg_replace('/\s+/', ',', $s);
$sc = explode(",",$s);
$fns = "";
echo "Finish Parsing ajaxanimator.htm source<br>";
echo "Starting Load File foreach loop<br>";
foreach($sc as $fn){
echo "Loading $fn<br>";
$fhz = fopen($fn, 'r');
$jsf = fread($fhz, filesize($fn));
fclose($fhz);
$fns = "$fns \n $jsf" ;
echo "Finish Loading $fn <br>";
}
echo "Finish Loading Files<br>";
echo "Writing To jsOut.js (uncompressed merged source)<br>";
$saveJS = "tmp/jsOut.js";
$fha = fopen($saveJS, 'w') or die("can't open file");
fwrite($fha, $fns);
fclose($fha);
echo "Finish Writing to jsOut.js<br>";
echo "Calling YUI Compressor<br>";
$output = "$saveJS-min.js";
$cmd = "java -jar yuicompressor-2.0/build/yuicompressor-2.0.jar --charset UTF-8 -o " . $output . " " . $saveJS . " 2>&1";
exec($cmd, $out, $err);
echo "<hr>YUI Compressor Output<hr>$err : ";
foreach($out as $outln){
echo "$outln<br>";
}
echo "<hr>";
echo "Reading Output of YUI Compressor<br>";
$fh = fopen($output, 'r');
$jssrc = fread($fh, filesize($output));
//echo fread($fh, filesize($output));
fclose($fh);
echo "Finish Reading YUI Compressor Output<br>";
echo "Creating a GZIP compressed Javascript file (for on-the-fly php compression)<br>";
$gzsrc = "$output-gzip.php";
$fhazy = fopen($gzsrc, 'w') or die("can't open file");
fwrite($fhazy,'<?php ob_start ("ob_gzhandler"); ?>' . $jssrc . '<?php ob_end_flush(); ?>');
fclose($fhazy);
echo "Finish GZIP compressed Javascript file (for on-the-fly php compression)<br>";
echo "Gzipping file (to check filesize)<br>";
$srcName = "$output";
$dstName = "$output.gz";
$fp = fopen($srcName, "r");
$data = fread ($fp, filesize($srcName));
fclose($fp);

$zp = gzopen($dstName, "w9");
gzwrite($zp, $data);
gzclose($zp);
echo "Finish Gzipping file (to check filesize) $srcName <br>";
echo "Gzipped Filesize Est: ".filesize($dstName)."B, versus originally,".filesize($srcName)."B <br>";
$newzfile = $theData;
$newfile = $theData;
$newfile = str_replace($regs[0],'<script type="text/javascript" src="'.$gzsrc.'"></script>',$newfile);
echo "Writing ajaxanimator-compressed.htm<br>";
$fhaz = fopen("ajaxanimator-compressed.htm", 'w') or die("can't open file");
fwrite($fhaz, $newfile);
fclose($fhaz);
echo "Finish Compiliation<br><hr>";
echo "<a href='ajaxanimator-compressed.htm'>Compiled Output</a>";
echo "<hr>Publishing To HTML folder and ajaxanimator folder";



$newzfile = str_replace($regs[0],'<script type="text/javascript" src="../ajaxanimator/full.js.php"></script>',$newzfile);
echo "Writing ajaxanimator-compressed-adfree.php (html folder)<br>";
$fhaz = fopen("../html/ajaxanimator-compressed.php", 'w') or die("can't open file");
fwrite($fhaz, '<?php ob_start ("ob_gzhandler"); ?>'.$newzfile. '<?php ob_end_flush(); ?>');
fclose($fhaz);
echo "Copying $gzsrc to full.js (in html folder)<br>";
copy($gzsrc,"../ajaxanimator/full.js.php");
echo "Finish copying $gzsrc to full.js.php (in html folder)<br>";
$newzfile2 = $newzfile;
$newzfile2 = str_replace("<!-- GoogAd1-->", file_get_contents("GoogAd1.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd2-->", file_get_contents("GoogAd2.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd3-->", file_get_contents("GoogAd3.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd4-->", file_get_contents("GoogAd4.txt"),$newzfile2);
$newzfile2 = str_replace("<!-- GoogAd5-->", file_get_contents("GoogAd5.txt"),$newzfile2);

echo "Writing ajaxanimator-compressed.php (html folder)<br>";
$fhaz = fopen("../html/ajaxanimator-compressed.php", 'w') or die("can't open file");
fwrite($fhaz, '<?php ob_start ("ob_gzhandler"); ?>'.$newzfile2. '<?php ob_end_flush(); ?>');
fclose($fhaz);
$etimer = explode( ' ', microtime() );
$etimer = $etimer[1] + $etimer[0];
echo '<hr><p style="margin:auto; text-align:center">';
printf( "Script timer: <b>%f</b> seconds.", ($etimer-$stimer) );
echo '</p>';
?>
<?php ob_end_flush(); ?>
