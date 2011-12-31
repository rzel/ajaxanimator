<?php

function parse_path($d){
$points = array();
$argc = array("L"=>2,"M"=>2,"Z"=>0);
$commands = "m,M,l,L,z,Z";
$d = str_replace(","," ",$d);
$d = str_replace("  "," ", $d);
$d = str_replace("  "," ", $d);
$d.="_";
foreach(explode(",",$commands) as $l){
$d = str_replace($l," _".$l,$d);
}

preg_match_all('/['.str_replace(",","",$commands).'].*?_/', $d, $cmdarr);

foreach($cmdarr[0] as $action){
$action = substr($action,0,-1);
//echo $action."<br>";

$command = substr($action,0,1);
$args = str_replace("  "," ",trim(substr($action,1)));
$argsets = array();
$pt = 0;
foreach(explode(" ",$args) as $arg){
if(!is_array($argsets[$pt])){
$argsets[$pt] = array();
}
if(count($argsets[$pt]) >= $argc[$command]){
$pt++;
$argsets[$pt] = array();
}

array_push($argsets[$pt],$arg);
}

foreach ($argsets as $arglist){
switch($command){
case "L":
array_push($points, round($arglist[0]));
array_push($points, round($arglist[1]));

break;
case "M":
array_push($points, round($arglist[0]));
array_push($points, round($arglist[1]));

break;
case "Z":
return $points;
break;
}
}
}
return $points;
}
?>