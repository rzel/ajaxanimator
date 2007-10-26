var onreadyfunct = new Array();
// reference local blank image
Ext.BLANK_IMAGE_URL = '../resources/images/default/s.gif';
// create namespace
Ext.namespace('ajaxanimator');
// create application

var themeURL = "../resources";
var imgURL = "../images";
var alternateHost = "http://ajaxanimator.googlecode.com/svn/trunk/Animator/"
var alternateStaticHost = false;
if(window.location.href.indexOf("110mb.com")!=-1){ 
if(window.location.href.indexOf("nohotlink")==-1){
alternateStaticHost = true;
themeURL = alternateHost+"resources";
imgURL = alternateHost+"images";
cssURL = themeURL+"/css/ext-all.css"; 
}
}

	
Ext.onReady(function(){
if(!document.createElementNS){
Element.prototype.getAttributeNS = function(f,a){return this.getAttribute(a)}
Element.prototype.setAttributeNS = function(f,a,b){return this.setAttribute(a,b)}
document.createElementNS = function(f,a){return document.createElement(a)}
}
})


ajaxanimator.app = function() {
    return {
        init: function() {
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
			setTimeout("interLoad()",0);
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
setTimeout("ajaxanimator.doReady()",10);//take a breath
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

