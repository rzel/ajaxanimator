var isInitRD;
var includedJS = new Array();


function addJS(jsloc,onfinish){
for(var i = 0; i < includedJS.length; i++){
if(includedJS[i] == jsloc){
return
}
}

var x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
x.onreadystatechange = function(){
if (x.readyState == 4 && x.status == 200){
var nScript = document.createElement("script")
nScript.setAttribute('language', 'javascript');
nScript.setAttribute('type', 'text/javascript');
nScript.text = x.responseText
document.getElementsByTagName("HEAD")[0].appendChild(nScript);
includedJS[includedJS.length + 1] = jsloc
if(onfinish){
onfinish();
}
}
}
x.open("GET", jsloc, true);
x.send(null);

}

function clearPreviews(){
var x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
x.onreadystatechange = function(){
if (x.readyState == 4 && x.status == 200){
Ext.MessageBox.alert("Emptying Previews",x.responseText);
}
}
x.open("GET","../freemovie/clearPreviews.php",true)
x.send(null)
}
function addCSS(cssloc){
var nCSS = document.createElement("link")
nCSS.setAttribute('href', cssloc);
nCSS.setAttribute('type', 'text/css');
nCSS.setAttribute('rel','stylesheet')
document.getElementsByTagName("HEAD")[0].appendChild(nCSS);
}

