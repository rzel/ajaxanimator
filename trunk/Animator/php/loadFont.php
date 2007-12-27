<?php
$rawfontdatabase = file_get_contents("fdb.txt"); //get font database file
$fda = explode("!",$rawfontdatabase);//create array from data
if(isset($_REQUEST["fontname"])){
foreach($fda as $fa){ //loop through
$fall = explode(":",$fa); //create array from sub array
$ftit = $fall[0]; //Font Title

if($ftit == stripslashes($_REQUEST["fontname"])){
//$fdes = $fall[1]; //Font Description
$fdat = $fall[1]; //Font Data
//echo "<br>$fdat<br>";
$un64 = base64_decode($fdat);
//echo $un64;
//$ungz = gzinflate($un64);
echo $un64;
break;
}
}
}
if($_REQUEST["opt"]=="list"){
foreach($fda as $fk){
$fu = explode(":",$fk); //create array from sub array
if($fu[0]){
echo "$fu[0], "; //list names
}
}
}
//var strar = "pig latin javascript".split(" "); for(var i = 0; i < strar.length; i++){strar[i]=strar[i].substr(1)+strar[i].substr(0,1)+"ay"}; strar.join(" ")
?>