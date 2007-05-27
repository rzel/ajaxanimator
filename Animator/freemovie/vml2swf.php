<?php
$xmlstr = $_REQUEST['svg'];
$xml = new SimpleXMLElement(stripslashes($xmlstr)); 
//Flash:
require_once("freemoviecompilertoolbox.php");
$height = 272;
$width = 480;

$swf = new FreeMovieCompilerToolbox;
$swf->SetSWFVersion(5);
$swf->SetFrameSize($width*20, $height*20);
$swf->SetFrameRate(12); 
$swf->SetBackgroundColor(255, 255, 255);
$swf->BeginMovie();

foreach ($xml->v->line as $line) {
/*
split(",",$line['from'])[0] *20
split(",",$line['from'])[1] *20
split(",",$line['to'])[0] *20
split(",",$line['to'])[1] *20
*/
$x1=split(",",$line['from'])[0];
$y1=split(",",$line['from'])[1];
$x2=split(",",$line['to'])[0];
$y2=split(",",$line['to'])[1];
$CharacterInfo = $swf->DefineStraightLine($x1,$y1 ,$x2 ,$y2 , $line['stroke-width']*20, false, 0, 0, 0, 0);
$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid = $CharacterInfo["CharacterID"];
$chardepth = $CharacterDepth;	
}
/*
split(",",$string)[0]

split(",",$rect['from'])[0] //x1
split(",",$rect['from'])[1] //y1

split(",",$rect['to'])[0] //x2
split(",",$rect['to'])[1] //y2
*/

foreach ($xml->v->rect as $rect) {
$CharacterInfo = $swf->DefineRectangle($rect['x']*20, $height*20 - $rect['y']*20, $rect['x']*20 + $rect['width']*20, $height*20 -($rect['y']*20 + $rect['height']*20), $rect['stroke-width']*20, false, 0, 0, 0, 0);
$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
$charid = $CharacterInfo["CharacterID"];
$chardepth = $CharacterDepth;	
}

//v:line
$swf->EndFrame();

$swf->EndMovie();
?>
