<?php
/*
Generates HTML
*/

//stolen from http://php.net/manual/en/function.ob-start.php#71953
function sanitize_output($buffer)
{
    $search = array(
        '/\>[^\S ]+/s', //strip whitespaces after tags, except space
        '/[^\S ]+\</s', //strip whitespaces before tags, except space
        '/(\s)+/s' // shorten multiple whitespace sequences
        );
    $replace = array(
        '>',
        '<',
        '\\1'
        );
  $buffer = preg_replace($search, $replace, $buffer);
  
    return str_replace("> <","><",$buffer);
}

function gen_html($input){

while (strpos($input,"<!--Remove Start-->") !== false) {
$input = str_replace("<!--Remove Start-->".get_string_between($input,
"<!--Remove Start-->","<!--Remove Stop-->")."<!--Remove Stop-->","",$input);
}

$input = str_replace("<!--Start Compile Include>","",$input);
$input = str_replace("<End Compile Include-->","",$input);

$input = str_replace("<!--COMPILIER INFO-->","<!--".file_get_contents("compilierinfo.txt")."-->",$input);

$input =  sanitize_output($input);

return $input;
}

function nohotlink($input){
$input = str_replace("http://www.cachefile.net/scripts/ext/2.1/resources/","../theme/",$input);
$input = str_replace("http://www.cachefile.net/scripts/ext/2.1/adapter/ext/","../js/ext/",$input);
$input = str_replace("http://www.cachefile.net/scripts/ext/2.1/","../js/ext/",$input);
return $input;
}
?>