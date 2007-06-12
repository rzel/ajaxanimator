<?php
function decompressXML($XMLData){
$decompressedXML = $XMLData;
$decompressedXML = str_replace("g","0,0,0",$decompressedXML);
$decompressedXML = str_replace("*","255,0,0",$decompressedXML);
$decompressedXML = str_replace("_A","<AnimationXML>",$decompressedXML);
$decompressedXML = str_replace(",A","</AnimationXML>",$decompressedXML);
$decompressedXML = str_replace("_f","<svg>",$decompressedXML);
$decompressedXML = str_replace(",f","</svg>",$decompressedXML);
$decompressedXML = str_replace("_r","<rect",$decompressedXML);
$decompressedXML = str_replace(",r","</rect>",$decompressedXML);
$decompressedXML = str_replace("_l","<line ",$decompressedXML);
$decompressedXML = str_replace(",l","</line> ",$decompressedXML);
$decompressedXML = str_replace(".i" ," stroke-width",$decompressedXML);
$decompressedXML = str_replace(".o"," stroke",$decompressedXML);
$decompressedXML = str_replace(".f"," fill",$decompressedXML);
$decompressedXML = str_replace(".h"," height",$decompressedXML);
$decompressedXML = str_replace(".w"," width",$decompressedXML);
$decompressedXML = str_replace("-y"," rgb",$decompressedXML);
$decompressedXML = str_replace("~",'="',$decompressedXML);     
$decompressedXML = str_replace("~",'="',$decompressedXML);   
$decompressedXML = str_replace("#",'px"',$decompressedXML);   
$decompressedXML = str_replace('"x=','" x=',$decompressedXML);
$decompressedXML = str_replace('"y=','" y=',$decompressedXML);
$decompressedXML = str_replace('stroke=" ','stroke="',$decompressedXML);
$decompressedXML = str_replace('fill=" ','fill="',$decompressedXML);
return $decompressedXML;
}
?>