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

//from http://us.php.net/manual/en/function.file-put-contents.php
   if ( !function_exists('file_put_contents') && !defined('FILE_APPEND') ) {
   define('FILE_APPEND', 1);
   function file_put_contents($n, $d, $flag = false) {
       $mode = ($flag == FILE_APPEND || strtoupper($flag) == 'FILE_APPEND') ? 'a' : 'w';
       $f = @fopen($n, $mode);
       if ($f === false) {
           return 0;
       } else {
           if (is_array($d)) $d = implode($d);
           $bytes_written = fwrite($f, $d);
           fclose($f);
           return $bytes_written;
       }
}
   }





?>