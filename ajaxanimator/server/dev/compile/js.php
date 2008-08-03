<?php


function js_include_parse($js_includes){

$xml_inc = '<?xml version="1.0"?><xmlroot>'.$js_includes."</xmlroot>";

if (! ($xmlparser = xml_parser_create())){ 
   die ("Cannot create XML parser");
}

xml_set_element_handler($xmlparser, "js_start_tag", "js_end_tag");

xml_parse($xmlparser,$xml_inc, true);

xml_parser_free($xmlparser);

global $scripts;

return $scripts;
}

//Using Tutorial from http://www.devpapers.com/article/61/5

function js_start_tag($parser, $name, $attribs) {
   if (is_array($attribs)) {
   if (isset($attribs["SRC"])){
   global $scripts;
    //  echo $attribs["SRC"]."<br>";
    array_push($scripts, $attribs["SRC"]);
    }
    }
}

function js_end_tag(){}



function concatenate_js($array,$dir, $js_replace){
$merged_js = "";

foreach($array as $file){
if($js_replace[$file]){
	$file = $js_replace[$file];
}

$merged_js .= "\n //JS File: $file \n ".file_get_contents("$dir/$file");
}
return $merged_js;
}

function js_compile($file, $js_replace){
$filedata = file_get_contents($file); //load file
$js_includes = get_string_between($filedata,"<!--JS Compile Start-->","<!--JS Compile Stop-->");

$script_array = js_include_parse($js_includes);
return concatenate_js($script_array,dirname($file), $js_replace);

}
?>