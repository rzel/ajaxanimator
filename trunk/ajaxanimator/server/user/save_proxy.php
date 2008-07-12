<?php
	/**
	 * @author antimatter15
	 * this is a file thingy. it basically pulls data, and spits it out again with new headers
	 */
	if($_REQUEST["action"] == "test"){
		die("working"); //hmm... I don't want to die working... Especially for this project....
	}elseif($_REQUEST["action"] == "save"){
		//you know how I said I wouldn't reuse code from the old one? well this is sorta an exception.
		header('Content-type: application/octetstream');
		header('Content-Length: ' . strlen($_REQUEST['data']));
		header('Content-Disposition: attachment; filename="'.$_REQUEST['name'].'"');
		echo stripslashes($_REQUEST['data']);
	}
?>
