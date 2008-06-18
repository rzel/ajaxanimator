<?php
/*
Javascript Compilier
*/

echo "Including Libraries...";

include("lib.php");
include("../../lib/jsoncheck.php");

echo "Updating Version File...";
$v = update_versions();

echo "Generating HTML...";

$html = gen_html(file_get_contents("../../../html/ajaxanimator.htm"));
file_put_contents("../../../build/index.htm",$html);

echo "Generating NoHotlink HTML..."; //crap! another typo
file_put_contents("../../../build/nohotlink.htm",nohotlink($html));

echo "Compressing Javascript...";

$js = js_compile("../../../html/ajaxanimator.htm");
file_put_contents("../../../build/ajaxanimator-all.js",$js);

echo "Compressing CSS...";

$css = css_compile("../../../html/ajaxanimator.htm");
file_put_contents("../../../build/ajaxanimator-all.css",$css);


echo "Archiving Release...";

file_put_contents("../../../build/archive/ajaxanimator-all-$v.js",$js);
file_put_contents("../../../build/archive/ajaxanimator-all-$v.css",$css);

file_put_contents("../../../build/archive/ajaxanimator-$v.htm", //crap! i had a typo here!!!
str_replace("ajaxanimator-all.css","ajaxanimator-all-$v.css",
str_replace("ajaxanimator-all.js","ajaxanimator-all-$v.js",$html)));


echo "DONE";
?>