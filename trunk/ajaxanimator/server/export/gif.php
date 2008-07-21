<?php
header("Content-type: text/html");

$framerate = 2;

include ("../lib/GIFEncoder.class.php");
include ("test.php");
$animation_array = json_decode(stripslashes($_REQUEST["animation"]),true);
$gif_array = array();
$framerate_array = array();

foreach($animation_array as $frame_contents){
	$im = imagecreatetruecolor(480,272);
	$background = imagecolorallocate($im, 250, 250, 250);
	imagefill($im, 0, 0, $background);

	foreach($frame_contents as $shape){
		imagesetthickness($im, 1);
		switch($shape["type"]){
			case "rect":
				$x1 = $shape["left"];
				$y1 = $shape["top"];
				$x2 = $shape["left"]+$shape["width"];
				$y2 = $shape["top"]+$shape["height"];
				
				$fillArray = sscanf($shape['fillColor'], '#%2x%2x%2x');
				$fill = imagecolorallocate($im, $fillArray[0], $fillArray[1], $fillArray[2]);
				imagefilledrectangle($im, $x1, $y1, $x2, $y2, $fill);
				
				imagesetthickness($im, $shape["lineWidth"]);
				
				$strokeArray = sscanf($shape['lineColor'], '#%2x%2x%2x');
				$stroke = imagecolorallocate($im, $strokeArray[0], $strokeArray[1], $strokeArray[2]);
				imagerectangle($im, $x1, $y1, $x2, $y2, $stroke);
			break;
			case "ellipse":
				$cx = $shape["left"]+$shape["width"]/2;
				$cy = $shape["top"]+$shape["height"]/2;
				$width = $shape["width"];
				$height = $shape["height"];
				
				$fillArray = sscanf($shape['fillColor'], '#%2x%2x%2x');
				$fill = imagecolorallocate($im, $fillArray[0], $fillArray[1], $fillArray[2]);
				imagefilledellipse($im, $cx, $cy, $width, $height, $fill);
				
				imagesetthickness($im, $shape["lineWidth"]);
				
				$strokeArray = sscanf($shape['lineColor'], '#%2x%2x%2x');
				$stroke = imagecolorallocate($im, $strokeArray[0], $strokeArray[1], $strokeArray[2]);
				imageellipse($im, $cx, $cy, $width, $height, $stroke);
			break;
			case "line":
				$x1 = $shape["left"];
				$y1 = $shape["top"];
				$x2 = $shape["left"]+$shape["width"];
				$y2 = $shape["top"]+$shape["height"];

				imagesetthickness($im, $shape["lineWidth"]);
				
				$strokeArray = sscanf($shape['lineColor'], '#%2x%2x%2x');
				$stroke = imagecolorallocate($im, $strokeArray[0], $strokeArray[1], $strokeArray[2]);
				imageline($im, $x1, $y1, $x2, $y2, $stroke);
			break;
				case "text":
				$x = $shape["left"];
				$y = $shape["top"];
				$text = $shape["text"];
				$size = $shape["textSize"];
				
				
				$fillArray = sscanf($shape['fillColor'], '#%2x%2x%2x');
				$fill = imagecolorallocate($im, $fillArray[0], $fillArray[1], $fillArray[2]);
				imagettftext($im, $size/1.3, 0, $x, $y, $fill, "FONT/times.ttf", $text);
			break;	
		}

	}
	ob_start();
	imagegif($im);
	imagedestroy($im);
	$data = ob_get_contents(); 
	ob_end_clean();
	array_push($gif_array, $data);
	array_push($framerate_array, 100/$framerate);
	//echo "<img src='data:image/gif;base64,".base64_encode($data)."'><br><br>";
}

$gif = new GIFEncoder($gif_array, $framerate_array, 0, 2, 0, 0, 0, "bin");

echo "<img src='data:image/gif;base64,".base64_encode($gif->GetAnimation())."'>";	

?>