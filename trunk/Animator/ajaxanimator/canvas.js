var canvasNumber = 0;
var canvasDisplayStyle = "";
var canvasIssueResolved = new Boolean();
var AnimationPlay = new Boolean();
var AnimationFramerate = 12; 
var totalFrames = 2;
AnimationPlay = true;
canvasIssueResolved = false;
function makeCanvas(){

var richdrawCanvas = document.createElement('div');
var richdrawCanvasStyle = "border:1px solid black;position:relative;"
richdrawCanvasStyle += "top:0px;width:99%;height:99%;background-color:white;"
richdrawCanvasStyle += "-moz-user-select:none;"

richdrawCanvas.setAttribute('id','richdraw'+canvasNumber);
richdrawCanvas.setAttribute('style',richdrawCanvasStyle+"display:"+canvasDisplayStyle);

document.getElementById('CanvasContainer').appendChild(richdrawCanvas);
canvasNumber++;
canvasDisplayStyle = "none";
initDraw();
currentCanvas++;
}


function makeCanvasIE(){
var canvasString;
canvasString='<div id="richdraw'+canvasNumber+'" style="';
canvasString+='border:1px solid black;position:relative;top:0px'
canvasString+='width:99%;height:99%;background-color:white;'
canvasString+='-moz-user-select:none;display:'+canvasDisplayStyle+'"></div>';
document.getElementById("CanvasContainer").innerHTML+=canvasString;
canvasNumber++;
canvasDisplayStyle = 'none'

}

function makeCanvasFromId(CanvasId){
var richdrawCanvas = document.createElement('div');
var richdrawCanvasStyle = "border:1px solid black;position:relative;"
richdrawCanvasStyle += "top:0px;width:99%;height:99%;background-color:white;"
richdrawCanvasStyle += "-moz-user-select:none;"
richdrawCanvas.setAttribute('id','richdraw'+CanvasId);
richdrawCanvas.setAttribute('style',richdrawCanvasStyle+"display:"+canvasDisplayStyle);
document.getElementById('CanvasContainer').appendChild(richdrawCanvas);
canvasDisplayStyle = 'none'
initDraw();
}

function setCanvasProperties(){
document.getElementById('CanvasContainer').style.height = getElementById('cHeight').value + 'px';
document.getElementById('CanvasContainer').style.width = getElementById('cWidth').value + 'px'
}

function setFramerate(){
AnimationFramerate = document.getElementById('cFramerate').value;
}

function genxml(){
$('jsQuery').value = generateAnimationXML();
}



function generateAnimationXML(){
var zAnimationXML = "<AnimationXML>";
for(var pzxy = 1; pzxy <= totalFrames;pzxy++){
if(DrawCanvas[pzxy] != null){
zAnimationXML += DrawCanvas[pzxy].renderer.getMarkup();
}else{
zAnimationXML += "<svg></svg>"
}
}
zAnimationXML += "</AnimationXML>";
return zAnimationXML;
}

function initCanvasIE(){

	for(var xwp = 0; xwp <=  100;xwp++){
	makeCanvasIE();
	}
canvasFix();
}

function canvasFix(){
	gotoframe(2,1)
	setTimeout("gotoframe(1,1)",100);
}

function initCanvas(){
	if(navigator.userAgent.toLowerCase().indexOf("msie")!= -1 || navigator.userAgent.toLowerCase().indexOf("6")!= -1){
	setTimeout("initCanvasIE();",100);
	}else{
	makeCanvas();
	}
	
}

function playAnimation(){
AnimationPlay = true;
gotoframe(1,1);
doAnimation();
}

function doAnimation(){
if(currentCanvas + 1> totalFrames){
gotoframe(1,1);
}

if(AnimationPlay == true){
gotoframe(currentFrameSelection+1,1);
setTimeout('doAnimation()',1000/AnimationFramerate);
}
}

function stopAnimation(){
AnimationPlay = false;
}

function hideCurrentCanvas(){
try{
document.getElementById("richdraw"+currentCanvas).style.display = "none";
}catch(err){}
}

function showCurrentCanvas(){
try{
document.getElementById("richdraw"+currentCanvas).style.display = "";
}catch(err){}
}


function layerForward(){
hideCurrentCanvas();
currentCanvas++;
showCurrentCanvas();
}

function layerBack(){
hideCurrentCanvas();
currentCanvas  = currentCanvas - 1;
showCurrentCanvas();
}

function genFlash(){
var swfgen = generateAnimationXML();
ajaxpack.postAjaxRequest("freemovie/swfgen.php", "svg=" + swfgen , genFlashEvent, "txt")
}


function genFlashEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
$('export').innerHTML = '<a href="' + myajax.responseText.replace('files','freemovie/files') + '>Download</a>';
}
}
}
