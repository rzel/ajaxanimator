<?php

$xmlstr = stripslashes($_REQUEST['svg']);
$xml = new SimpleXMLElement(stripslashes($xmlstr));
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

foreach ($xml->svg as $svg) {
if($charid != null||$chardepth != null){
$swf->RemoveObjectFromLayer($charid, $chardepth);
}
foreach ($svg->line as $line) {
$linefillColor = rgbConvert($line['stroke']);
$CharacterInfo = $swf->DefineStraightLine($line['x1']*20, $height*20 - $line['y1']*20, $line['x2']*20, $height*20 - $line['y2']*20, $line['stroke-width']*20, false, $linefillColor[0], $linefillColor[1], $linefillColor[2], 0);
$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid = $CharacterInfo["CharacterID"];
$chardepth = $CharacterDepth;
}
foreach ($svg->rect as $rect) {
$rectfillColor = rgbConvert($rect['fill']);
$CharacterInfo = $swf->DefineRectangle($rect['x']*20, $height*20 - $rect['y']*20, $rect['x']*20 + $rect['width']*20, $height*20 -($rect['y']*20 + $rect['height']*20), $rect['stroke-width']*20, false, $rectfillColor[0], $rectfillColor[1], $rectfillColor[2], 0);
$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid = $CharacterInfo["CharacterID"];
$chardepth = $CharacterDepth;
}
$swf->EndFrame();

}
$swf->EndMovie();

srand((double)microtime()*10000000);
$zrandom = strval(rand(0,1000000));
$ourFileName = "files/file-$zrandom.swf";
$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
fclose($ourFileHandle);
$filename = "files/file-$zrandom.swf";
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

$myFile = "log.txt";
$fh = fopen($myFile, 'a') or die("can't open file");
$stringData = "\n $xmlstr";
fwrite($fh, $stringData);
fclose($fh);

exit;

?>
