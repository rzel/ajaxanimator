<?php
header("Content-Type: application/x-shockwave-flash");

//-----------------------------------------------------//
// the header() function must _always_ be called first //
//-----------------------------------------------------//

//-------------------------------------------------------
// import the FreeMovieCompilerTollbox

require_once("freemoviecompilertoolbox.php");

//-------------------------------------------------------
// initialize new SWF object.

$swf = new FreeMovieCompilerToolbox;

//-------------------------------------------------------
// set the global parameters of your movie
// frame size is in twips (1 twip = 20 pixels)

$swf->SetSWFVersion(5);
$swf->SetFrameSize(16000, 12000); // = 800 x 20, 600 x 20
$swf->SetFrameRate(24.0);
$swf->SetBackgroundColor(255, 255, 255);

//-------------------------------------------------------
// lights! camera! action!

$swf->BeginMovie();

//-------------------------------------------------------
// frame # 00000



$CharacterInfo = $swf->DefineCurvedLine(2000, 2000, 3000, 6000, 4000, 2000, 300, false, 0, 0, 0, 0);
$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);



//-------------------------------------------------------
// end frame # 00000

$swf->EndFrame();

//-------------------------------------------------------
// That's it, Folks!

$swf->EndMovie();

//-------------------------------------------------------
// send movie to the browser

print $swf->GetMovie();

exit;
?>