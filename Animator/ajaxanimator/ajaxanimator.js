var onreadyfunct = new Array();
// reference local blank image
// create namespace
Ext.namespace('ajaxanimator');
// create application

var themeURL = "../resources";
var cssLoaded = false;
var imgURL = "../images";
var alternateHost = "http://ajaxanimator.googlecode.com/svn/trunk/Animator/"
var alternateStaticHost = false;
if(window.location.href.indexOf("110mb.com")!=-1){ 
if(window.location.search.indexOf("nohotlink")==-1){
alternateStaticHost = true;
themeURL = alternateHost+"resources";
imgURL = alternateHost+"images";
cssURL = themeURL+"/css/ext-all.css"; 
}
}

Ext.BLANK_IMAGE_URL = themeURL+'/images/default/s.gif';

if(window.location.search.indexOf("useslow")==true){
themeURL = "http://antimatter15.110mb.com/Animator/resources"
}

Ext.onReady(function(){
if(!document.createElementNS){
//Element.prototype.getAttributeNS = function(f,a){return this.getAttribute(a)}
//Element.prototype.setAttributeNS = function(f,a,b){return this.setAttribute(a,b)}
//document.createElementNS = function(ns,f,a){return document.createElement(a)}
}
})

function loadCSS(cssUri,opt){
if(!cssUri){
cssUri=themeURL+"/css/ext-all.css"
}

if(cssLoaded){return}

if(opt==2)return

if(opt==2){if(Ext.isIE==true){return}}

if(opt){if(window.location.search.indexOf("nocss")!=-1){return 1}}



var nCSS = document.createElement("link")
nCSS.setAttribute('href', cssUri);
nCSS.setAttribute('type', 'text/css');
nCSS.setAttribute('rel','stylesheet')
document.getElementsByTagName("HEAD")[0].appendChild(nCSS);
cssLoaded = true;

if(opt==1){

return 2000}

while(document.styleSheets[5].cssRules.length < 100){

}

}
//<link rel="stylesheet" type="text/css" href="../resources/css/ext-all.css">
ajaxanimator.app = function() {
    return {
        init: function() {
		loadCSS(themeURL+"/css/ext-all.css",2)
		stopPseudo = true;
			Ext.QuickTips.interceptTitles = true;
			Ext.QuickTips.init();
        }

    };
}();

function setLoad(status,percent){

document.getElementById("loading-msg").innerHTML = status
var pdT = ((percent/100)*(Ext.get("loadProgressBorder").getWidth()))-3
Ext.get("loadProgressBar").shift({width: pdT})

}


function setTheme(thId){ //change themes
var sThC = function(t){
if(!document.getElementById("theme")){
var nCSS = document.createElement("link")
nCSS.setAttribute('href', t);
nCSS.setAttribute('type', 'text/css');
nCSS.setAttribute('id','theme')
nCSS.setAttribute('rel','stylesheet')
document.getElementsByTagName("HEAD")[0].appendChild(nCSS);
}


Ext.get("theme").dom.href = t
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



ajaxanimator.onReady = function(f){
onreadyfunct.push(f)
}

ajaxanimator.doReady = function(){
//for(var orf = onreadyfunct.length; orf > 0; orf--){
for(var orf = 0; orf < onreadyfunct.length; orf++){
if(onreadyfunct[orf]){
onreadyfunct[orf]()
}
}
}

Ext.onReady(ajaxanimator.app.init, ajaxanimator.app);

	function IEMessage(){
	var IError = "Sorry, your browser is unsupported by the Ajax Animator."
	IError += " This is due to your browser's lack of standards compliance."
	IError += " The application will go to a reduced functionality mode "
	IError += "that will give you a demo of the user interface, with little"
	IError += " to no functionality, if you would like to be able to use the "
	IError += "application, please download and install a standards compliant and somewhat"
	IError += " decent browser, such as Mozilla Firefox, Opera, or Safari 3 Beta+"
	Ext.MessageBox.alert("Error: IE SUCKS!",IError)
	var cS='<div id="IError" style="border:1px solid black;top:0px';
	cS+='width:99%;height:99%;background-color:white;"><center>Sorry! Interent Explorer Is Not Supported!</center></div>';
	$("CanvasContainer").innerHTML+=cS;
	}



window.onload=function(){
var delay = loadCSS(themeURL+"/css/ext-all.css",1)
setTimeout("interLoad()",delay);
setTimeout("showTehAdz()", 10000);
}

function finalizeInit(){
setLoad("Finalizing Load...",99)
setTimeout("hideLoadingMask();sendStats();",200)
}

function hideLoadingMask(){

var loading = Ext.get('loading');
var mask = Ext.get('loading-mask');
mask.setOpacity(.8);
mask.shift({
	remove:true,
	duration:.5,
	opacity:.2,
	callback : function(){
		loading.fadeOut({duration:1,remove:true});
	}
});

}

ajaxanimator.onReady(function(){
addLayer();
if(Ext.isIE != true){
setTimeout("initCanvas();",0)
}else{
IEMessage();
}
})


function interLoad(){
setLoad("Building UI...",65)
if(window.location.search.indexOf("noload")==-1){
setTimeout("ajaxanimator.doReady()",10);//take a breath
}
loadCSS(themeURL+"/css/ext-all.css",3)
setTimeout("finalizeInit()",300)
}

 var msgCt;
 function msg(title, data){
    if(!msgCt){
        msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
    }
    msgCt.alignTo(document, 't-t');
    Ext.DomHelper.append(msgCt, {html:
	(['<div class="msg">',
    '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
    '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', title, '</h3>', data, '</div></div></div>',
    '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
    '</div>'].join(''))
	}, true).slideIn('t').pause(1).ghost("t", {remove:true});
}

ajaxanimator.onReady(function(){
editControlToolbar("canvasControlBar",1)
})

function editControlToolbar(con,map){
if($(con)){
if(!$(con).firstChild){

Ext.get("TpreFrame").on("click",function(e){
if(mainLayout.getRegion('center').activePanel.getId()=="canvas-div"){
preFrame()
}else{
fPre()
}
})
Ext.get("TnxtFrame").on("click",function(e){
if(mainLayout.getRegion('center').activePanel.getId()=="canvas-div"){
nextFrame()
}else{
fNext()
}
})
Ext.get("TplayAnim").on("click",function(e){
if(mainLayout.getRegion('center').activePanel.getId()=="canvas-div"){
playAnimation()
}else{
fPlay()
}})
Ext.get("TstopAnim").on("click",function(e){
if(mainLayout.getRegion('center').activePanel.getId()=="canvas-div"){
stopAnimation()
}else{
fStop()
}})

var nImg = document.createElement("img")
nImg.usemap = "#ControlMap"
nImg.setAttribute("usemap","#ControlMap")
nImg.src = imgURL+"/controlToolbar.png"
$(con).appendChild(nImg)
}
}
}
