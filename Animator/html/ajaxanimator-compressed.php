<?php ob_start ("ob_gzhandler");header("Content-type: text/html; charset: UTF-8"); ?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>Ajax Animator</title>

	<link rel="stylesheet" type="text/css" href="http://ajaxanimator.googlecode.com/svn/trunk/Animator/ajaxanimator/ajaxanimator-all.css">
	
	<style type="text/css">#loading-mask{width:100%;height:100%;background:#c3daf9;position:absolute;
	z-index:20000;left:0;top:0;}#loadingIcon{width:32px;height:32px;margin-right:8px;float:left;
	vertical-align:top;}#loadProgressBar{height:3px;margin:1px;padding:0;background:#3974AF;}#loading{
	position:absolute;left:45%;top:40%;z-index:20001;border:1px solid #ccc;width:150px;background:white;
    color:#444;font:bold 13px tahoma,arial,helvetica;padding:10px;margin:0;height:auto;}
	#loadProgressBorder{height:5px;background:#fff;border:1px solid silver;margin:0;padding:0;}#loading-msg{
    font:normal 10px arial,tahoma,sans-serif;margin-bottom:8px;margin-top:3px;display:block;}</style>
	
	</head>
	<body style="overflow: hidden">

	<div id="loading"><table border="0px"><tr><td>
	<img src="http://ajaxanimator.googlecode.com/svn/trunk/Animator/images/loading-large.gif" alt="" class="loadingIcon">
	</td><td>&nbsp;</td><td><span style="text-align:center">Ajax Animator</span><br>
	<span id="loading-msg">Loading JS/CSS...</span></td></tr></table>
	<div id="loadProgressBorder"><div id="loadProgressBar" style="width: 5px">
	</div></div></div><div id="loading-mask">&#160;</div>

	<div id="GoogAd">
<div class="x-dlg-hd">Google Ads</div>
<div class="x-dlg-bd">
<div id="GoogAdBody">
<script type="text/javascript"><!--
google_ad_client = "pub-9279109908159341";
google_ad_width = 336;
google_ad_height = 280;
google_ad_format = "336x280_as";
google_ad_type = "text";
google_ad_channel = "";
google_color_border = "FFFFFF";
google_color_bg = "FFFFFF";
google_color_link = "000000";
google_color_text = "000000";
google_color_url = "008000";
//-->
</script>
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
</div>
</div>
</div>
</div>
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
	

	<map name="ControlMap" id="ControlMap">
	<area shape="poly" id="TpreFrame" coords="31,28,31,2,19,9,19,4,1,15,19,27,19,20" alt="&lt;--">
	<area shape="poly" id="TplayAnim" coords="36,31,36,0,65,16" alt="Play">
	<area shape="rect" id="TstopAnim" coords="67,2,95,30" alt="Stop">
	<area shape="poly" id="TnxtFrame" coords="96,3,96,27,107,21,107,27,127,15,107,2,107,8" alt="--&gt">
	</map>

	
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
	Height:<input type="text" style="width: 50px" id="sHeight" onchange="setSP();" onblur="setSP();" value=""> 
	Width:<input type="text" style="width: 50px" id="sWidth" onchange="setSP();" onblur="setSP();" value="">
	</div>
	<div id="noSelectRem">No Object Currently Selected</div>  
	</td><td>
	<script type="text/javascript"><!--
google_ad_client = "pub-9279109908159341";
google_ad_width = 728;
google_ad_height = 15;
google_ad_format = "728x15_0ads_al_s";
google_ad_channel = "";
google_color_border = "FFFFFF";
google_color_bg = "FFFFFF";
google_color_link = "000000";
google_color_text = "000000";
google_color_url = "008000";
//-->
</script>
<script type="text/javascript"
  src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
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
	<div id="fillcolor" class="drawColor" onclick="FillColorChange()">FF0000</div>
	<div id="linecolor" class="drawColor" onclick="LineColorChange()">000000</div>
	<input type="text" id="linewidth" size="1">
	</div>
	<div id="canvas-div">
	<div id="center-tb"></div>
	<table style="margin-left: auto; margin-right: auto;" >
	<tr>
	<td>
	<script type="text/javascript"><!--
google_ad_client = "pub-9279109908159341";
google_ad_output = "textlink";
google_ad_format = "ref_text";
google_cpa_choice = "CAEQl7Tx0AMaCNT2bmbIBlOyKI_BwdQBMAA";
//-->
</script>
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></td><td>
<script type="text/javascript"><!--
google_ad_client = "pub-9279109908159341";
google_ad_output = "textlink";
google_ad_format = "ref_text";
google_cpa_choice = "CAEQmIjZ8QIaCG6cjN7vo3RdKMSTwIABMAA";
//-->
</script>
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></td><td>
<script type="text/javascript"><!--
google_ad_client = "pub-9279109908159341";
google_ad_output = "textlink";
google_ad_format = "ref_text";
google_cpa_choice = "CAEQ0finkwMaCCKU43xV5rPfKIWB2bsBMAA";
//-->
</script>
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></td><td>
<script type="text/javascript"><!--
google_ad_client = "pub-9279109908159341";
google_ad_output = "textlink";
google_ad_format = "ref_text";
google_cpa_choice = "CAAQzcLH7QEaCBVcCwmT2PieKLGsuIEBMAA";
//-->
</script>
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></td></tr></table>
	<table style="margin-left: auto; margin-right: auto;">
	<tr>
	<td>
<script type="text/javascript"><!--
google_ad_client = "pub-9279109908159341";
google_ad_width = 120;
google_ad_height = 240;
google_ad_format = "120x240_as";
google_ad_type = "text";
google_ad_channel = "";
//-->
</script>
<script type="text/javascript"
  src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></td>
	<td>
	<div id="CanvasContainer"  style="margin-left: auto; margin-right: auto;width: 480px; height: 272px;overflow:auto"></div>
	<center>
	<div id="canvasControlBar"></div>
	<br>
	<div style="font-size:x-small" id="status"></div>
	</center>
	</td>
	<td>
<script type="text/javascript"><!--
google_ad_client = "pub-9279109908159341";
google_ad_width = 120;
google_ad_height = 240;
google_ad_format = "120x240_as";
google_ad_type = "text";
google_ad_channel = "";
//-->
</script>
<script type="text/javascript"
  src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</td>
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
    <div style="border: 1px black solid;" id="zFlashPreviewDiv"></div>
	<div id="previewControlBar"></div>
	<br>
    <div id="previewStatus" style="font-size:x-small"></div>
    </center>
    </div>
	</div>
	
	<script type='text/javascript'>var alternateStaticHost = true;</script><script type='text/javascript' src='http://ajaxanimator.googlecode.com/svn/trunk/Animator/ajaxanimator/full.js'></script>
	
</body>
</html>
<?php ob_end_flush(); ?>