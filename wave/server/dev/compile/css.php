<?php
function css_include_parse($css_includes){

$xml_inc = '<?xml version="1.0"?><xmlroot>'.$css_includes."</xmlroot>";

if (! ($xmlparser = xml_parser_create())){ 
   die ("Cannot create XML parser");
}

xml_set_element_handler($xmlparser, "css_start_tag", "css_end_tag");

xml_parse($xmlparser,$xml_inc, true);

xml_parser_free($xmlparser);

global $styles;

return $styles;
}

//Using Tutorial from http://www.devpapers.com/article/61/5

function css_start_tag($parser, $name, $attribs) {
   if (is_array($attribs)) {
   if (isset($attribs["HREF"])){
   global $styles;
    //  echo $attribs["SRC"]."<br>";
    array_push($styles, $attribs["HREF"]);
    }
    }
}

function css_end_tag(){}



function concatenate_css($array,$dir){
$merged_css = "";
foreach($array as $file){


$merged_css .= "\n  /* CSS File: $file */  \n ".file_get_contents("$dir/$file");
}
return $merged_css;
}

function css_compile($file){
$filedata = file_get_contents($file); //load file
$css_includes = get_string_between($filedata,"<!--CSS Compile Start-->","<!--CSS Compile Stop-->");

$styles_array = css_include_parse($css_includes);
return concatenate_css($styles_array,dirname($file));

}
?>