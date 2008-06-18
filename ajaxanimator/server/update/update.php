<?php
/*
Applies New Update
*/

include("key.php");



if($_REQUEST['key'] == $updatekey){ //basic authentification system

switch($_REQUEST['type']){
case "h":
file_put_contents("../../build/index.htm",genMask(4,"Updating HTML (Ideally, you should never see this message.)"));
$file = "../../build/index.htm";
break;
case "j":
file_put_contents("../../build/index.htm",genMask(2,"Updating Javascript (The stuff that makes the app work)"));
$file = "../../build/ajaxanimator-all.js";
break;
case "b":
file_put_contents("../../build/index.htm",genMask(1,"Initializing Updater (Basically, showing this funny cat)"));
die("Update message loaded");
break;
case "c":
file_put_contents("../../build/index.htm",genMask(3,"Updating CSS (The stuff that makes the app look unlike this page)"));
$file = "../../build/ajaxanimator-all.css";
break;
default: 
die("No File Specified");
}


if(sha1(stripslashes($_POST['update'])) == $_REQUEST["hash"]){
file_put_contents($file,gzinflate(stripslashes($_POST['update'])));
echo "File Updated";
}else{
echo "Hash Check Failed";
}

}else{
echo "Invalid Key";
}

function genMask($us,$component){
return "<title>Updating Application</title><center>
<h1>Please Wait...</h1>
Oops! you caught us in the middle of a routine update.
Please wait a minute or so the update to complete.
<br><br><i>Meanwhile....</i><br>".'<a href="http://icanhascheezburger.com/2007/12/06/wait-wait-ok-iz-stuk/">
<img src="http://icanhascheezburger.wordpress.com/files/2007/12/funny-pictures-stuck-cat.jpg"
 alt="funny pictures" /></a><br />see more 
<a href="http://icanhascheezburger.com">crazy cat pics</a>'."</center><br><br><br>Update Status Code: $us/4; <br>
Processing Component: $component<br>Ajax Animator Auto-Updater Version 0.89. BTW. the time this page was put up was
".microtime(true)." (unix timestamp) so if you're in year 2057 and it still doesn't work (okay, 2057 seconds....)
then i definately did something *really* stupid. So if you're geeky enough to actually get what that meant....";
}


?>