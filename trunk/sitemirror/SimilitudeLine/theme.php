<?php
if (!defined("IN_FUSION")) { header("Location: ../../index.php"); exit; }
require_once INCLUDES."theme_functions_include.php";

// theme settings
$body_text = "#555555";
$body_bg = "#2e2e2e";
$theme_width = "100%";
$theme_width_l = "175";
$theme_width_r = "175";

function render_header($header_content) {

global $theme_width;

echo "<table align='center' cellspacing='0' cellpadding='0' width='$theme_width' class='outer-border'>
<tr>
<td>
<table cellpadding='0' cellspacing='0' width='100%'>
<tr>
<td class='full-header'>
<table cellpadding='0' cellspacing='0' width='100%'>
<tr>
<td background='".THEME."images/hbc.jpg' height='80'>&nbsp;&nbsp;&nbsp;&nbsp;$header_content</td>
</tr>
</table>
</td>
</tr>
</table>\n";

echo "<table cellpadding='0' cellspacing='0' width='100%'>\n<tr>
<td class='sub-header'>".showsublinks("&middot;","white")."</td>
<td align='right' class='sub-header'>".showsubdate()."</td>
</tr>
</table>\n";

echo "<table cellpadding='0' cellspacing='0' width='100%'>\n<tr>\n";

}

function render_footer($license=false) {

global $theme_width,$settings;

echo "</tr>\n</table>\n";
echo "<table cellpadding='0' cellspacing='0' width='100%'>
<tr>
<td height='50' background='".THEME."images/fbc.jpg' align='center' class='footer'>".stripslashes($settings['footer'])."
<a href='http://www.php-fusion.co.uk' target='_blank'>Engine</a> | <a href='http://www.mrkiller.avita.lt' target='_blank'>Theme</a><br>
</td>
</tr>
</table>
</td>
</tr>
</table>\n";

}

function render_news($subject, $news, $info) {

echo "<table cellpadding='0' cellspacing='0' width='100%'>
<tr>
<td class='capmain'>$subject</td>
</tr>
<tr>
<td class='main-body'>$news</td>
</tr>
<tr>
<td align='center' class='news-footer'>\n";
echo openform("N",$info['news_id']).newsposter($info," &middot;").newsopts($info,"&middot;").closeform("N",$info['news_id']);
echo "</td>
</tr>
</table>\n";

}

function render_article($subject, $article, $info) {
	
echo "<table width='100%' cellpadding='0' cellspacing='0'>
<tr>
<td class='capmain'>$subject</td>
</tr>
<tr>
<td class='main-body'>
".($info['article_breaks'] == "y" ? nl2br($article) : $article)."
</td>
</tr>
<tr>
<td align='center' class='news-footer'>\n";
echo openform("A",$info['article_id']).articleposter($info," &middot;").articleopts($info,"&middot;").closeform("A",$info['article_id']);
echo "</td>
</tr>
</table>\n";

}

function opentable($title) {

echo "<table cellpadding='0' cellspacing='0' width='100%'>
<tr>
<td class='capmain'>$title</td>
</tr>
<tr>
<td class='main-body'>\n";

}

function closetable() {

echo "</td>
</tr>
</table>\n";

}

function openside($title) {
	
echo "<table cellpadding='0' cellspacing='0' width='100%' class='border'>
<tr>
<td background='".THEME."images/sbc.jpg' height='25' class='scapmain'>$title</td>
</tr>
<tr>
<td class='side-body'>\n";

}

function closeside() {

echo "</td>
</tr>
</table>\n";
tablebreak();

}

function opensidex($title,$state="on") {

$boxname = str_replace(" ", "", $title);
echo "<table cellpadding='0' cellspacing='0' width='100%' class='border'>
<tr>
<td class='scapmain'>$title</td>
<td class='scapmain' align='right'>".panelbutton($state,$boxname)."</td>
</tr>
<tr>
<td colspan='2' class='side-body'>
<div id='box_$boxname'".($state=="off"?" style='display:none'":"").">\n";

}

function closesidex() {

echo "</div>
</td>
</tr>
</table>\n";
tablebreak();

}

function tablebreak() {

echo "<table cellpadding='0' cellspacing='0' width='100%'>\n<tr>\n<td height='5'></td>\n</tr>\n</table>\n";

}
?>
