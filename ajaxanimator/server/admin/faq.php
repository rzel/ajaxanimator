<?php
/*This was ripped from the old never-finished semi-properietary ajax aniamtor site*/

function checkAdmin(){
return true;
}

function refreshCache(){
$qarr = explode("|;|",file_get_contents("../doc/faqindex.txt"));
//$hdr = "<ul>\n";
$content = "";
foreach($qarr as $q){
$qz = explode("|,|",$q);
if(strlen($q)>2){
//$hdr .=  "<li><a href='#QID".(intval($qz[0])+1)."'>".$qz[1]."</a></li>\n";
$content.='<br><a name="QID'.$qz[0].'"></a>'."\n"; //create anchor
$content.='<b>Q: '.$qz[1].'</b><br>'."\n"; //create title
$content.='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A: '.$qz[2]."<br>\n"; //crate/format content
}
}
//$hdr .= "</ul>\n";
$apsc = $hdr.$content;
writeF("../doc/faq.htm",$apsc);
}




function rewriteIDs(){
$x = 1;
$newgf = array();
$grandfaq = explode("|;|",file_get_contents("../doc/faqindex.txt"));
foreach($grandfaq as $gf){
$gt = explode("|,|",$gf);
$gt[0] = $x;
$x++;
array_push($newgf,implode("|,|",$gt));
}
$newDB = implode("|;|",$newgf);

writeF("../doc/faqindex.txt",$newDB);
}


function writeF($fileName,$strData){ //write functions
$fha = fopen($fileName, 'w') or die("can't open file");
fwrite($fha, $strData);
fclose($fha);
}

if($_REQUEST["mde"]=="rsm"){ //if the mode is to reset
if(checkAdmin()==true){
writeF("../doc/faqindex.txt","");
}
}

if(isset($_REQUEST["QSub"])==true&&isset($_REQUEST["ASub"])==true){ //contribute
//faqindex 0.2 archetecture: FAQ Index, Title, Contents

$grandfaq = explode("|;|",file_get_contents("../doc/faqindex.txt"));

$articlecount = count($grandfaq);
//echo "ARTICLE COUNT: $articlecount <br>";
$articletitle = stripslashes($_REQUEST["QSub"]);
//echo "ARTICLE Title: $articletitle <br>";
$articlecontent = stripslashes($_REQUEST["ASub"]);
//echo "ARTICLE Contnet: $articlecontent <br>";
$faqentry = array( $articlecount, $articletitle, $articlecontent);

array_push($grandfaq,implode("|,|",$faqentry));


writeF("../doc/faqindex.txt",implode("|;|",$grandfaq));

//writeA("../doc/faqcount.txt","I");
//writeA("../doc/faqindex.txt",$fqc.",".stripslashes($_REQUEST["QSub"]).";");


echo "Added To Database<br>";

//writeA("../doc/faq.txt","<br><div id='QID".($fqc+1)."' name='QID".($fqc+1)."'><b>Q: ".stripslashes($_REQUEST["QSub"])."</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A: ".stripslashes($_REQUEST["ASub"])."</div>");

refreshCache();

echo "Reloading FAQ Cache<br>";
}
?>



<?php
//Generates Administration User Interface

function AdminUI(){


if(checkAdmin()==true){
?>
<b>FAQ Admin</b>
<br>
<form method="post" action="?faqadmin=true">
Q:<input type="text" name="QSub" style="width: 500px"><br>
A:<textarea name="ASub" style="width: 500px; height: 150px"></textarea><br>
<input type="submit" value="Add">
</form>
</div>
<?php
}else{
echo "You are not authorized";
}

}

AdminUI();
?>