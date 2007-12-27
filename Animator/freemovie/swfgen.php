<?php

header("Access-Control: allow <*>"); //Support Cross Domain
header("Content-Type: text/plain");

$xmlstr = stripslashes($_REQUEST['svg']);
$zhash = md5($xmlstr);

if (file_exists("preview/file-$zhash.swf")) { //Never do something that has been done before
if ($_REQUEST['type'] != "export"){
echo "preview/file-$zhash.swf";
}
}

//Settings//
$enable_logging = false; //enable logging to swfexport.txt
//Settings//


$xml = new SimpleXMLElement($xmlstr);
//Flash:
require_once("freemoviecompilertoolbox.php");


$height = $_REQUEST['height'];

$width = $_REQUEST['width'];
$framerate = $_REQUEST['framerate'];

$swf = new FreeMovieCompilerToolbox;
$swf->SetSWFVersion(5);
$swf->SetFrameSize($width*20, $height*20);
$swf->SetFrameRate($framerate);
$swf->SetBackgroundColor(255, 255, 255);
$swf->BeginMovie();



function rgbConvert($str){
//echo($str.strpos($str,","));
if(strpos($str,",")){
//echo "rgb2array";
return rgb2array($str);
}else{
//echo "hex2rgb";
return hex2rgb($str);
}
}

function rgb2array($rgb_str){
$rgb = $rgb_str;
$rgb = str_replace("rgb(","",$rgb);
$rgb = str_replace(")","",$rgb);
$rgbArray = explode(",", $rgb);
return $rgbArray;
}

function hex2rgb($hex){ //Made By Liveswifer Benjamin Jones, hacked/improved by antimatter15
   //$hex = strtoupper($str_enc_hex);
   //echo $hex;
   $hex = str_replace('#', '', $hex);
   $red=-1;
   $green=-1;
   $blue=-1;
   if(strlen($hex)==3){
      $red=hexdec($hex[0].$hex[0]);
      $green=hexdec($hex[1].$hex[1]);
      $blue=hexdec($hex[2].$hex[2]);
   } else if(strlen($hex)==6){
      $red=hexdec($hex[0].$hex[1]);
      $green=hexdec($hex[2].$hex[3]);
      $blue=hexdec($hex[4].$hex[5]);
   }
   //print_r(array($red, $green, $blue));
   return array($red, $green, $blue);
}

$totalSWFObjects = 0;

foreach ($xml->svg as $svg) {



if($charid != null||$chardepth != null){
for ($p = 0; $p <= $totalSWFObjects - 1; $p++) {
$swf->RemoveObjectFromLayer($charid[$p], $chardepth[$p]);
}
}


foreach ($svg->line as $line) {

$linefillColor = rgbConvert($line['stroke']);
$CharacterInfo = $swf->DefineStraightLine($line['x1']*20, $height*20 - $line['y1']*20, $line['x2']*20, $height*20 - $line['y2']*20, $line['stroke-width']*20, false, $linefillColor[0], $linefillColor[1], $linefillColor[2], 0);
$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid[$totalSWFObjects] = $CharacterInfo["CharacterID"];
$chardepth[$totalSWFObjects] = $CharacterDepth;
$totalSWFObjects++;

}

foreach ($svg->rect as $rect) {

$rectfillColor = rgbConvert($rect['fill']);
$rectlineColor = rgbConvert($rect['stroke']);

$CharacterInfo = $swf->DefineRectangleSolid($rect['x']*20, $height*20 - $rect['y']*20, $rect['x']*20 + $rect['width']*20, $height*20 -($rect['y']*20 + $rect['height']*20), $rect['stroke-width']*20,false,true, $rectlineColor[0], $rectlineColor[1], $rectlineColor[2],255,true,$rectfillColor[0], $rectfillColor[1], $rectfillColor[2],255);

$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid[$totalSWFObjects] = $CharacterInfo["CharacterID"];
$chardepth[$totalSWFObjects] = $CharacterDepth;
$totalSWFObjects++;
}

foreach ($svg->ellipse as $ellipse) {

$ellipsefillColor = rgbConvert($rect['fill']);
$ellipselineColor = rgbConvert($rect['stroke']);
//Problem: Freemovie supports CIRCLES, I use ellipses, so i'll try simply using the y radius
$CharacterInfo = $swf->DefineCircleSolid(17,$ellipse['cx']*20,$height*20 - $ellipse['cy']*20,$ellipse['ry']*20, $ellipse['stroke-width']*20,false,true, $rectlineColor[0], $ellipselineColor[1], $ellipselineColor[2],255,true,$ellipsefillColor[0], $ellipsefillColor[1], $ellipsefillColor[2],255);

$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid[$totalSWFObjects] = $CharacterInfo["CharacterID"];
$chardepth[$totalSWFObjects] = $CharacterDepth;
$totalSWFObjects++;
}

$swf->EndFrame();
}
$swf->EndMovie();


$type = $_REQUEST['type'];

if($type == "export"){
$fileDir = "files";

if($_REQUEST['filename'] != null){
$SWFFileName = $_REQUEST['filename'];
}else{
$SWFFileName = "file-$zhash";
}

}else{
$fileDir = "preview";
$SWFFileName = "file-$zhash";
}
$ourFileName = "$fileDir/$SWFFileName.swf";
$filename = "$fileDir/$SWFFileName.swf";


$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
fclose($ourFileHandle);

$somecontent = $swf->GetMovie();
if (is_writable($filename)) {

    if (!$handle = fopen($filename, 'a')) {
         echo "Cannot open file ($filename)";
         //exit;
    }
    if (fwrite($handle, $somecontent) === FALSE) {
        echo "Cannot write to file ($filename)";
        //exit;
    }
    echo "$filename";
    fclose($handle);
	
} else {
    echo "The file $filename is not writable";
}

if($enable_logging == true){
$myFile = "swfexport.txt";
$fh = fopen($myFile, 'a') or die("can't open file");
$stringData = "\n $xmlstr";
fwrite($fh, $stringData);
fclose($fh);
}
//temp
//$poopy = $charid[3];
//echo "\n $totalSWFObjects \n $poopy";


?>
