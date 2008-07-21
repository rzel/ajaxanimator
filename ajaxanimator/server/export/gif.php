<?php
//include "../lib/jsoncheck.php";
include "../lib/GIFEncoder.class.php";

$animation_array = json_decode(stripslashes($_REQUEST["animation"]),true);
$gif_array = array();

foreach($animation_array as $frame){
	echo "Frame<br>";
	foreach($frame as $shape){
		$im = imagecreatetruecolor(480,272);
		echo $shape["type"]."<br>";
		
		switch($shape["type"]){
			case "rect":
				$fillArray = sscanf($shape['fillColor'], '#%2x%2x%2x');
				$fill = imagecolorallocate($im, $fillArray[0], $fillArray[1], $fillArray[2]);
				imagefilledrectangle($im, $shape["left"], $shape['top'], $shape['left']+$shape['width'], $shape['top']+$shape['height'],$fill);
				
			break;
		}

	
		}
				array_push($gif_array, imagegif($im));
}
$gif = new GIFEncoder($gif_array, 5, 0, 2, 0, 0, 0, "bin");
		
?>
<br>
<form method="post">
	<textarea name="animation"></textarea>
	<input type="submit">
</form>