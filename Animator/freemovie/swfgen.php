<?php
//Settings//
$enable_logging = false; //enable logging to swfexport.txt
//Settings//
require_once("decompressXML.php");
$xmlstr = decompressXML(stripslashes($_REQUEST['svg']));

$zhash = md5($xmlstr);

if (file_exists("files/file-$zhash.swf")) { 
exit("files/file-$zhash.swf");
}
$xml = new SimpleXMLElement($xmlstr);
//Flash:
require_once("freemoviecompilertoolbox.php");

header("Content-Type: text/plain");
$height = $_REQUEST['height'];

$width = $_REQUEST['width'];
$framerate = $_REQUEST['framerate'];

$swf = new FreeMovieCompilerToolbox;
$swf->SetSWFVersion(5);
$swf->SetFrameSize($width*20, $height*20);
$swf->SetFrameRate($framerate);
$swf->SetBackgroundColor(255, 255, 255);
$swf->BeginMovie();



function rgbConvert($rgb_str){
$rgb = $rgb_str;
$rgb = str_replace("rgb(","",$rgb);
$rgb = str_replace(")","",$rgb);
$rgbArray = explode(",", $rgb);
return $rgbArray;
}


$totalSWFObjects = 0;

foreach ($xml->svg as $svg) {

if($svg['t'] != 'f'){
if($charid != null||$chardepth != null){
for ($p = 0; $p <= $totalSWFObjects - 1; $p++) {
$swf->RemoveObjectFromLayer($charid[$p], $chardepth[$p]);
}
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

$CharacterInfo = $swf->DefineRectangleSolid($rect['x']*20, $height*20 - $rect['y']*20, $rect['x']*20 + $rect['width']*20, $height*20 -($rect['y']*20 + $rect['height']*20), $rect['stroke-width']*2,false,true, $rectlineColor[0], $rectlineColor[1], $rectlineColor[2],255,true,$rectfillColor[0], $rectfillColor[1], $rectfillColor[2],255);

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
         exit;
    }
    if (fwrite($handle, $somecontent) === FALSE) {
        echo "Cannot write to file ($filename)";
        exit;
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

exit;

?>
