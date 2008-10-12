<?php

if($_REQUEST["action"] == "test"){
	die("working"); //hmm... I don't want to die working... Especially for this project....
}

//header("Content-Type: application/x-shockwave-flash");
include "../lib/jsoncheck.php";

include "../lib/freemoviecompilertoolbox.php";
//include "test.php";

$swf = new FreeMovieCompilerToolbox;

$cwidth = 480;
$cheight = 272;

$swf->SetSWFVersion(5);
$swf->SetFrameSize($cwidth*20, $cheight*20); // = 800 x 20, 600 x 20
$swf->SetFrameRate(12.0); 
$swf->SetBackgroundColor(255, 255, 255);


$animation_array = json_decode(stripslashes($_REQUEST["animation"]),true);
$previous_id_array = array();
$previous_depth_array = array();

foreach($animation_array as $frame_contents){
	
	for($p = 0; $p < count($previous_depth_array); $p++){
		$swf->RemoveObjectFromLayer($previous_id_array[$p], $previous_depth_array[$p]);
	}	
	
	$previous_id_array = array();
	$previous_depth_array = array();

	foreach($frame_contents as $shape){
			switch($shape["type"]){
			case "rect":
      case "roundrect":
				$x1 = $shape["left"];
				$y1 = $cheight-$shape["top"];
				$x2 = $shape["left"]+$shape["width"];
				$y2 = $cheight-($shape["top"]+$shape["height"]);
				$lw = $shape["lineWidth"];
				
				$fillArray = sscanf($shape['fillColor'], '#%2x%2x%2x');

				$strokeArray = sscanf($shape['lineColor'], '#%2x%2x%2x');
				
				$CharacterInfo = $swf->DefineRectangleSolid($x1*20, $y1*20, $x2*20, $y2*20, $lw*20, false, true, $strokeArray[0], $strokeArray[1], $strokeArray[2], 255, true, $fillArray[0], $fillArray[1], $fillArray[2], $fillArray[3]);
				//$CharacterInfo = $swf->DefineRectangle($x1*20, $y1*20, $x2*20, $y2*20, $lw*20, false, $strokeArray[0], $strokeArray[1], $strokeArray[2], 255);
				$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
				array_push($previous_id_array, $CharacterInfo["CharacterID"]);
				array_push($previous_depth_array, $CharacterDepth);

			break;
			case "line":
				$x1 = $shape["left"];
				$y1 = $cheight-$shape["top"];
				$x2 = $shape["left"]+$shape["width"];
				$y2 = $cheight-($shape["top"]+$shape["height"]);

				$strokeArray = sscanf($shape['lineColor'], '#%2x%2x%2x');

				$CharacterInfo = $swf->DefineStraightLine($x1*20, $y1*20, $x2*20, $y2*20, $shape["lineWidth"]*20, false, $strokeArray[0], $strokeArray[1], $strokeArray[2], 0);
				$CharacterDepth = $swf->EasyPlaceObject($CharacterInfo["CharacterID"]);
				array_push($previous_id_array, $CharacterInfo["CharacterID"]);
				array_push($previous_depth_array, $CharacterDepth);
			break;
		}
	}

	$swf->EndFrame();
}

$swf->EndMovie();

$animation = $swf->GetMovie();

echo base64_encode($animation);
?>

