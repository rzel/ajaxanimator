<?php
/*
Misc Functions that are used by the JS compilier
*/

include("js.php");
include("css.php");
include("html.php");
include("versions.php");


$scripts = array();
$styles = array();

//from http://www.justin-cook.com/wp/2006/03/31/php-parse-a-string-between-two-strings/
function get_string_between($string, $start, $end){
        $string = " ".$string;
        $ini = strpos($string,$start);
        if ($ini == 0) return "";
        $ini += strlen($start);   
        $len = strpos($string,$end,$ini) - $ini;
        return substr($string,$ini,$len);
}





?>