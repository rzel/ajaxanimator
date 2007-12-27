//This file is for CSS actions such as the dynamic CSS loader, theming, etc

function loadCSS(cssUri){
var nCSS = makeCSSEl({href: cssUri})
document.getElementsByTagName("HEAD")[0].appendChild(nCSS);
}

function makeCSSEl(config){
var nCSS = document.createElement("link")
nCSS.setAttribute('type', 'text/css');
nCSS.setAttribute('rel','stylesheet')
for(x in config){
nCSS.setAttribute(x,config[x])
}
return nCSS
}

function setTheme(thId){ //change themes
var sThC = function(t){
if(!document.getElementById("theme")){ //if theme tag isn't created yet, then make one
document.getElementsByTagName("head")[0].appendChild(makeCSSEl({id: "theme"}))
}
Ext.get("theme").dom.href = t //set css href
}
var themeArray = ["default","gray","vista","aero","galdaka"]
var theme = "default";
if(typeof(thId) == typeof(4)){
theme = themeArray[thId];
}else{
if(typeof(thId) == typeof("ajaxanimator")){
theme = thId;
}
}
if(theme == "default"){
Ext.get("theme").remove()
}else{
sThC(themeURL+"/css/xtheme-"+theme+".css")
}
}
