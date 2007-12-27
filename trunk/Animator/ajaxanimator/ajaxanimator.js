var onreadyfunct = new Array();
// reference local blank image
// create namespace
Ext.namespace('ajaxanimator');
// create application
//var fastmode = false;  // Enables fast-mode, just a test
var cssLoaded = false;

if(!document.createElementNS){ //Makes IE suck less
document.createElementNS = function(ns,tn){ //ignore namespace, forward to normal createElement
return document.createElement(tn)
}
}


ajaxanimator.app = function() {
    return {
        init: function() {
		interLoad()
		Ext.QuickTips.interceptTitles = true;
		Ext.QuickTips.showDelay=10;
		Ext.QuickTips.init();
        }

    };
}();


function setLoad(status,percent){
document.getElementById("loading-msg").innerHTML = status
var pdT = ((percent/100)*(Ext.get("loadProgressBorder").getWidth()))-3
//Ext.get("loadProgressBar").shift({width: pdT}) // animation
$("loadProgressBar").style.width = pdT+"px" // no animation
}


ajaxanimator.onReady = function(f){onreadyfunct.push(f)}


ajaxanimator.doReady = function(){
for(var orf = 0; orf < onreadyfunct.length; orf++){
if(onreadyfunct[orf]){
onreadyfunct[orf]()
}
}
finalizeInit()
}

Ext.onReady(ajaxanimator.app.init, ajaxanimator.app);




function hideLoadingMask(){
var loading = Ext.get('loading');
var mask = Ext.get('loading-mask');
mask.shift({
remove:true,
duration:.2,
opacity:0,
callback : function(){
loading.fadeOut({duration:.5,remove:true});
}
})
}


window.onload=function(){
setTimeout("showTehAdz()", 10000);
}




function interLoad(){
setLoad("Building Interface...",65)
if(urlParams['hidesplash']!="false"){ //This is for debugging purposes and those who love the splash screen so much...
setTimeout("ajaxanimator.doReady();",10);//take a breath
}
}

function finalizeInit(){
setLoad("Finalizing Load...",99)
hideLoadingMask();
sendStats();
}


ajaxanimator.onReady(function(){
addLayer();

if(Ext.isIE != true || urlParams['ignoreIE']=="ignore"){
setTimeout("initCanvas();",0)
}else{
IEMessage();
}
})

