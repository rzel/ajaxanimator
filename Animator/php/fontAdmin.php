<?php

function writeA($fileName,$strData){
$fha = fopen($fileName, 'a') or die("can't open file");
fwrite($fha, $strData);
fclose($fha);
}

if(strlen($_REQUEST["fcs"]) > 42){
$fontn = stripslashes($_REQUEST["fn"]);
$encf = base64_encode(stripslashes($_REQUEST["fcs"]));
$font = $fontn.":".$encf;

echo strlen($font)."|".strlen($encf)."|".strlen($_REQUEST["fcs"]);

echo "<br>Successfully added font $fontn to database<br>";

writeA("fdb.txt",$font."!");

}
//Fontswif, Original, DOTS, lwrc


//Encoding: GZIP->BASE64

//Font DB Format:

// Name: Description : Encoded Font Data


?>


<script>

if(!this.JSON){JSON=function(){function f(n){return n<10?"0"+n:n}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case"string":return r.test(value)?"\""+value.replace(r,function(a){var c=m[a];if(c){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+"\"":"\""+value+"\"";case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}if(typeof value.toJSON==="function"){return stringify(value.toJSON())}a=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||"null")}return"["+a.join(",")+"]"}if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==="string"){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+":"+v)}}}}else{for(k in value){if(typeof k==="string"){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+":"+v)}}}}return"{"+a.join(",")+"}"}}return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==="object"){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n}}}}return filter(k,v)}if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(:?[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof filter==="function"?walk("",j):j}throw new SyntaxError("parseJSON")}}}()}


function RGBtoHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(N) {
 if (N==null) return "00";
 N=parseInt(N); if (N==0 || isNaN(N)) return "00";
 N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
 return "0123456789ABCDEF".charAt((N-N%16)/16)
      + "0123456789ABCDEF".charAt(N%16);
}

function parseRGB(str){
str=str.replace(/rgb/g,"")
str=escape(str)
str=str.replace(new RegExp(escape("("),"g"),"")
str=str.replace(new RegExp(escape(")"),"g"),"")
str=unescape(str)
return "#"+RGBtoHex(str.split(",")[0],str.split(",")[1],str.split(",")[2])
}

function parseColor(str){
if(str.indexOf("#")==0){
return str
//RGBtoHex(hex2rgb(str)[0],hex2rgb(str)[1],hex2rgb(str)[2])
}else{
return parseRGB(str)
}
}

function hex2rgb(hex){
var h = hex.split("")
return [parseInt(h[0]+h[1],16),
parseInt(h[2]+h[3],16),
parseInt(h[4]+h[5],16)
]
}

Array.prototype.unique = function( b ) {
var a = [], i, l = this.length;
for( i=0; i<l; i++ ) {
if( a.indexOf( this[i], 0, b ) < 0 ) { a.push( this[i] ); }
}
return a;
};

var sc = []
var tot = {}
var ltr = [];
var indx = 0;

function makeGrid(){
var dw = ""
dw+=("<table cellspacing=1 cellpadding=1>")
for(var i = 0; i < 7; i++){
dw+=("<tr>")
for(var m = 0; m < 5; m++){
dw+=("<td id='_"+i+","+m+"' onclick='mkhg("+i+","+m+")' "

+" style='width: 20px; height: 20px; background-color: #B2FCFF'></td>")

}
dw+=("</tr>")
}
dw+=("</table>")
return dw
}



//#39EDF5

function mkhg(y,x){
//sc.push("["+x+","+y+"]")gfs()
//console.log([x,y])
if(parseColor($("_"+y+","+x).style.backgroundColor) != "#008287"){
$("_"+y+","+x).style.backgroundColor = "#008287"

sc.push([x,y])
}else{
for(var i = 0; i < sc.length; i++){
if(JSON.stringify(sc[i])==JSON.stringify([x,y])){
sc.splice(i,1)
}
}
$("_"+y+","+x).style.backgroundColor = "#B2FCFF"
}

$("lettersource").value = JSON.stringify(sc.unique())
gfs()
//sc=sc.unique()
}

function $(e){return document.getElementById(e)}

function mkg(){
$("gd").innerHTML=makeGrid()

}

function sfdb(){
ltr = $("fdb").value.split("")
indx=0;
$("fi").innerHTML = "Font Index: "+indx+"; Current Letter: "+ltr[indx]
$("CLTR").innerHTML =ltr[indx]

mkg()
}

function save(){
tot[ltr[indx]]=sc.unique()
sc = []
indx++;
mkg()

$("fi").innerHTML = "Font Index: "+indx+"; Current Letter: "+ltr[indx]
$("CLTR").innerHTML = ltr[indx]

gfs()
}

window.onload = function(){
mkg()
sfdb()

$("lettersource").value = "["+sc.unique().join(",")+"]"

$("fontsource").value = JSON.stringify(tot)
}

function rsl(){
sc = []
mkg()
}

function gfs(){
tot[ltr[indx]]=sc.unique()
$("fontsource").value = JSON.stringify(tot)
}
</script>
<table>
<tr>
<td>
<div id="gd"></div>
</td>
<td>
<input type="button" onclick="sfdb()" value="Set Font DB">
<input type="button" onclick="save()" value="Next Letter">
<input type="button" onclick="rsl()" value="Reset Letter">
<input type="button" onclick="gfs()" value="Generate Font JSON Source">
</td>
</tr>
<tr>
<td>
<div id="fi" style="font-size: x-small">Font Index: NaN; Current Letter: NaN</div>
</td>
<td>
<input type="text" id="lettersource" style="width: 100%">
</td>
</tr>
<tr>
<td>
Current Letter:
<div id="CLTR" style="font-size: xx-large"></div>
</td>
</tr>
</table>
<br>
<input type="text" id="fdb" style="width: 100%; " value="abcdefghijklmnopqrstuvwxyz?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ">
<br>


<form method="post">
<label for="fn">Font Name</label>
<input type="text" name="fn"><br>
<label for="fcs">Font Data</label>
<textarea id="fontsource" name="fcs" style="width: 100%">
</textarea>
<br>
<input type="submit" value="Submit Font">
</form>
<br>
<b>FAQ</b><br><br>
<b>What Is It?</b><br>
This is a font making tool for the ajax animator<br>
<b>How Do I use It?</b><br>
Select specific squares by clicking on them. Make the canvas resemble the letter shown under "Current Letter". and use the controls to go to the next letter.<br>
<b>How Do I Export It?</b><br>
Press "Generate Font JSON Source" button, give it a name and then press "submit font" to have it installed on to the current server<br>
<b>How Do I Reset?</b><br>
Just Refresh the page




