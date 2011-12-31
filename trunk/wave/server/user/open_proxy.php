<?php
  header("Content-type: text/html");
  	if($_REQUEST["action"] == "test"){
		die("working"); //hmm... I don't want to die working... Especially for this project....
	}elseif($_REQUEST["action"] == "work"){
  if ($_FILES["file"]["error"] > 0){
  	echo "{\"error\": " . $_FILES["file"]["error"] . "}";
  }else{
  	echo "{\"success\": true, \"data\": ".file_get_contents($_FILES["file"]["tmp_name"])."}";
  }
  }
?>