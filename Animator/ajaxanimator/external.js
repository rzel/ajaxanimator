//This file is where all the external URLs are located


/*
URL Config Options:
string hotlink - use external server, can be either "false", "_local", "_google", or "_110mb"

*/

var urlParams = Ext.urlDecode(window.location.search.substr(1))
var staticServerList = { 
_local: "../", 
_google: "http://ajaxanimator.googlecode.com/svn/trunk/Animator/stable",
_110mb: "http://antimatter15.110mb.com/Animator/" 
}


var currentServer;

function setServer(servid){
if(typeof(servid)==typeof(undefined)){
currentServer = staticServerList["_local"]
}
if(typeof(servid)==typeof("string")){
if(servid.length<1){
currentServer = staticServerList["_local"]
return
}
currentServer = staticServerList["_"+servid.replace(/_/,"")]; //remove "_" if it's already there and add it again
}else if(typeof(servid)==typeof(42)){ //if it's a number, turn it into a normal array and return from index
var f0=[];
for(x in staticServerList){
f0.push(staticServerList[x])
}
currentServer = f0[servid]
}

}



setServer(urlParams['hotlink'])

if(typeof(altStatic)!=typeof(undefined)){
setServer("_google")
}


if(urlParams['hotlink']=="false"){
setServer("_local")
}

var themeURL, imgURL;


function resetThemeImgURL(){
themeURL = currentServer+"resources";
imgURL   = currentServer+"images";
}

resetThemeImgURL()


Ext.BLANK_IMAGE_URL = themeURL+'/images/default/s.gif';

