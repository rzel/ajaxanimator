<!--This is garrentued 100% w3c UNVALID!!! mauh ha ha ha-->
<?php
///////I hope nobody reads the comments//////
if($_REQUEST["RUNBAT"]!="atrue"){
?> <!--HTML COMMETNS!-->
<form>
<!--Ext is nice-->
Red&nbsp;Multiplier<input type="text" style="width: 40px" name="r" value="<?php echo $_REQUEST["r"];?>">
<!--SUPER HTML COMMETNS!-->
Green&nbsp;Multiplier<input type="text"style="width: 40px"  name="g" value="<?php echo $_REQUEST["g"];?>">
Blue&nbsp;Multiplier<input type="text"style="width: 40px"  name="b" value="<?php echo $_REQUEST["b"];?>">
<!--BLWUE IS MHYE FWAVOWRIATE CWOLOR-->
Theme&nbsp;Name:<input type="text" style="width: 100px"  name="tname" value="new"><br>
<input type="submit" value="GeNeRaTe tHeMe">
<!--Themes are awesome-->
</form>
<!--
01001101010100110110010000111000010011000011001101110111011001110110011001000110
00111001001110000110011001001000011110000110001001001011010101000100111000111000
0100110101101001010000010111100001001101011101110011110100111101
-->
<hr>
<?php
if(isset($_REQUEST["r"])){
$genC = "";
//////////////////////////////////////WEEEE////////////////////////////////
$thName = $_REQUEST["tname"];
$origTh = "default";
//AERO DOESNT WORK WELL!!!
echo "<b>Generating $thName theme</b><hr>Parsing Existing Theme<br>";

//////////////////////////////////stuff////////////////
function st(){
return "convert ";
}///////////////C0/\/ \/ E R T ImageMagik
function ch($id,$amt){
return "-channel $id -evaluate multiply $amt ";
}
function fn(){ /////////////////Finalize output; the commented out one doesnt work well
//return " +channel -separate -compose add -flatten ";
return " ";
//////////a blank space works suprisingly better/////////
}
function fmcmd($r,$g,$b,$imgin,$imgout){
return st().$imgin." ".ch("R",$r).ch("G",$g).ch("B",$b).fn().$imgout;
}///////////////The cryptic  imagemagick command theme generator code
function alt($o,$ot){
$cmd = fmcmd($_REQUEST["r"],$_REQUEST["g"],$_REQUEST["b"],$ot."/$o",$_REQUEST["tname"]."/$o");
//////////yes i suck at coding//////////////
return $cmd."\n";
}/////////stuff//////////////////
$genC.='mkdir "'.$thName.'"'."\n";
$dir_handle = @opendir("$origTh");
while ($file = readdir($dir_handle)){
if(is_dir("$origTh/$file") && strlen(strstr($file,"."))==0){
//$genC.="mkdir '$thName/$file'\n";
$genC.='mkdir "'.$thName.'/'.$file.'"'."\n";
echo("<b>$origTh/$file</b><br>");
////////////LA LA LA LA //////////////////
$dir_handle2 = @opendir("$origTh/$file");
while ($imgf = readdir($dir_handle2)){
if(is_dir("$origTh/$imgf")==false && strlen(strstr($imgf,"."))!=0){
if(strlen(strstr($imgf,".gif"))!=0||strlen(strstr($imgf,".png"))!=0){
echo("&nbsp;&nbsp;&nbsp;&nbsp;$origTh/$file/$imgf<br>");
////////////WEEE WHITESPACE/////////////////
$genC.=alt("$file/$imgf",$origTh);
} //////1 closed parenthesis
}  //////2closed parenthesis
}//////3closed parenthesis
}//////4closed parenthesis
}//////5 closed parenthesis!!!!!!!!!!!!!!!!!!!!!!!
closedir($dir_handle); ////OH NOO; bye bye dir_handle
//////MWORE WHYTESPCE
if(strlen(file_get_contents("xtheme-$thName.css")) < 100){
copy("../css/xtheme-$thName.css","xtheme-$thName.css");
}
$fh = fopen("xtheme-$thName.css", 'w') or die("can't open file");
fwrite($fh, str_replace("$origTh","$thName",file_get_contents("xtheme-$origTh.css")));
fclose($fh);
//////DO SOME STUFF
$fh = fopen("generate.bat", 'w') or die("can't open file");
fwrite($fh, $genC);
fclose($fh);

copy("xtheme-$thName.css","../css/xtheme-$thName.css");
unlink("xtheme-$thName.css");
echo "<iframe src='?RUNBAT=atrue'></iframe>";
}////HI IFRAME ^ how are you?
}else{
exec("generate.bat");
echo "DONE";
//////YUY DWONE!
}///i'm not bad at english; just childish; actually; i'm a child.
?>
<hr>
Hi! this was created by antimatter15. go to my site at http://antimatter15.110mb.com<br>
