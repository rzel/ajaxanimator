<?php
/*
Copyright Antimatter15 2008

Checks whether the server has json_encode, and if not, includes
 the Pear JSON package, and creates a json_encode function. 
*/


if(!function_exists("json_encode")){
include "JSON.php"; //use requre_once if needed, but include is faster

function json_encode($data){
	$value = new Services_JSON();
	return $value->encode($data); 
}
function json_decode($data,$assoc){
	if($assoc == true){
	$value = new Services_JSON(SERVICES_JSON_LOOSE_TYPE);
	}else{
	$value = new Services_JSON();
	}
	return $value->decode($data); 
}
}



?>