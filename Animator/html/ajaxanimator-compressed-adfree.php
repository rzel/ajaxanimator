<?php ob_start ("ob_gzhandler");header("Content-type: text/html; charset: UTF-8"); ?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>Ajax Animator</title>
	<link rel="stylesheet" type="text/css" href="../resources/css/ext-all.css">
	
	<link rel="stylesheet" type="text/css" href="../ajaxanimator/ajaxanimator-all.css.php">
	
	</head>
	<body style="overflow: hidden">
	
	<div id="loading"><div class="loading-indicator"><table border="0px"><tr><td>
	<img src="../images/loading-large.gif" alt="" class="loadingIcon">
	</td><td>&nbsp;</td><td><span style="text-align:center">Ajax Animator</span><br>
	<span id="loading-msg">Loading JS/CSS...</span></td></tr></table>
	<div id="loadProgressBorder"><div id="loadProgressBar" style="width: 5px">
	</div></div></div></div><div id="loading-mask" class="loadingMask">&#160;</div>

	<!-- GoogAd1-->
	<iframe id="saveIframe" style="display: none"></iframe>
	
	<div id="color-dialog">
	<div class="x-dlg-hd">Color</div>
	<div class="x-dlg-bd">
	<div id="colorPicker" class="x-layout-inactive-content">
	</div>
	<div id="colorPalette" class="x-layout-inactive-content">
	</div>
	</div>
	</div>
	<div id="register-dialog">
	<div class="x-dlg-hd">Register</div>
	<div class="x-dlg-bd">
	<div id="registerDialog">
	</div>
	</div>
	</div>
	
	<div id="uab-dialog">
	<div class="x-dlg-hd">Browse Animations</div>
	<div class="x-dlg-bd">
	<div id="animationBrowser">
	<div id="browserDisplay"></div>
	</div>
	<div id="animationViewer">
	<div id="AXMLPlayer" class="svgDisplay"></div>
	</div>
	</div>
	</div>
	
	
	
	<div id="fs-dialog">
	<div class="x-dlg-hd">Save/Open</div>
	<div class="x-dlg-bd">
	<div id="saveTab">
	<center>
	<input type="button" onclick="saveAnimation()" value="Save To Computer">
	<input type="button" onclick="savetoserver()" value="Save To Webserver">
	</center>
	</div>

	<div id="openTab">
	<center>
	<form enctype="multipart/form-data" target="uploadFrame" action="../php/upload.php" method="post">
    Open: <input name="uploaded" type="file"> <input type="submit" onclick="setTimeout('openAnimation()',1000);" value="Upload">
    </form><iframe name="uploadFrame" id="uploadFrame" style="display:none;visibility: hidden; height: 1px; width: 1px"></iframe>
	</center>
	</div>
	</div>
	</div>
	
	
	<div id="north-div">
	<div id="north-tb"></div>
	<div id="frameContainer" style="overflow: auto"></div>
	</div>
	
	<div id="scriptEval-div">
	<div id="eval-tb"></div>
	<textarea id="evalScript" cols="20" rows="10" style="width: 100%;height: 99%"></textarea>
	</div>
	
	<div id="properties-div">
	<div id="prop-tb"></div>
	<table><tr><td>
	<div id="ResizeObjOpt" style="display: none">
	Height:<input type="text" style="width: 50px" id="sHeight" onchange="setSP()" onblur="setSP()" value=""> 
	Width:<input type="text" style="width: 50px" id="sWidth" onchange="setSP()" onblur="setSP()" value="">
	</div>
	<div id="noSelectRem">No Object Currently Selected</div>  
	</td><td>
	<!-- GoogAd2-->
	</td></tr></table>
	</div>
	
	
	<div id="history-div">
	<div id="history-tb"></div>
	<div id="HistoryLayout">
	<div id="HistoryContainer" style="width: 100%">
	</div>
	</div>
	</div>
	
	
	<div id="user-div">
	<div id="user-tb"></div>
	
	
    <div id="userLogin"></div>
	<div id="userProfile"style="display:none">My Animations:</div>
<div id="userFiles" style="display:none">
<div id="userFileList"></div>
</div>

	</div>
	
	
	
	<div id="toolbar-div">
	<div id="tbIcon"></div>
	<div id="fillcolor" class="drawColor" style="background-image:url('../images/bucket.png');background-color: #ff0000;" onclick="FillColorChange()">FF0000</div>
	<div id="linecolor" class="drawColor" style="background-image:url('../images/pencil.png');background-color: #000000;" onclick="LineColorChange()">000000</div>
	<input type="text" id="linewidth" size="1">
	</div>
	<div id="canvas-div">
	<div id="center-tb"></div>
	<table style="margin-left: auto; margin-right: auto;" >
	<tr>
	<td>
	<!-- GoogAd3-->
	<table style="margin-left: auto; margin-right: auto;">
	<tr>
	<!-- GoogAd4-->
	<td>
	<div id="CanvasContainer"  style="margin-left: auto; margin-right: auto;width: 480px; height: 272px;overflow:auto"></div>
		<center>
		<img alt="&lt;--" src="../images/player_rew.png" onclick="preFrame();">
		<img alt="play" src="../images/player_play.png" onclick="playAnimation();">
		<img alt="stop" src="../images/player_stop.png" onclick="stopAnimation();">
		<img alt="--&gt;" src="../images/player_fwd.png" onclick="nextFrame();">
		

	<br>
	<div style="font-size:x-small" id="status"></div>
</center>
	</td>
	<!-- GoogAd5-->
	</tr>
	</table>
	</td>
	</tr>
	</table>
	</div>
	<div id="preview-div">
	<div id="preview-tb"></div>
    <div id="FlashPreview">
    <center>
    <div style="border: 1px black solid;" id="zFlashPreviewDiv"></div><br>
    <div id="previewStatus" style="font-size:x-small">Mode: Preview</div>
    <div id="RevisionBrowserDiv"></div>
    </center>
    </div>
	</div>
	
	<script type="text/javascript" src="../ajaxanimator/full.js.php"></script>
	
</body>
</html>
<?php ob_end_flush(); ?>