<?php

$xmlstr = $_REQUEST['svg'];
$xml = new SimpleXMLElement(stripslashes($xmlstr)); 
//Flash:
require_once("freemoviecompilertoolbox.php");
require_once("hex2rgb.php");
header("Content-Type: application/x-shockwave-flash"); 
$height = 272;
$width = 480;

$swf = new FreeMovieCompilerToolbox;
$swf->SetSWFVersion(5);
$swf->SetFrameSize($width*20, $height*20);
$swf->SetFrameRate(12); 
$swf->SetBackgroundColor(255, 255, 255);
$swf->BeginMovie();

foreach ($xml->line as $line) {
$CharacterInfo = $swf->DefineStraightLine($line['x1']*20, $height*20 - $line['y1']*20, $line['x2']*20, $height*20 - $line['y2']*20, $line['stroke-width']*20, false, 0, 0, 0, 0);
$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid = $CharacterInfo["CharacterID"];
$chardepth = $CharacterDepth;	
}

foreach ($xml->rect as $rect) {
$CharacterInfo = $swf->DefineRectangle($rect['x']*20, $height*20 - $rect['y']*20, $rect['x']*20 + $rect['width']*20, $height*20 -($rect['y']*20 + $rect['height']*20), $rect['stroke-width']*20, false, 0, 0, 0, 0);
$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid = $CharacterInfo["CharacterID"];
$chardepth = $CharacterDepth;	
}

$swf->EndFrame();

$swf->EndMovie();
print $swf->GetMovie();
exit;
?>
