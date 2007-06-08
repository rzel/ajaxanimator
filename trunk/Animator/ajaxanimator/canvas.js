var canvasNumber = 1;
var previousCanvas = 0;
var canvasDisplayStyle = "";
var canvasIssueResolved = new Boolean();
var AnimationPlay = new Boolean();
var AnimationFramerate = 12; 
var totalFrames = 1;
var canvasHeight = 272;
var canvasWidth = 480;
AnimationPlay = true;
canvasIssueResolved = false;

function makeCanvas(){
var canvasString;
canvasString='<div id="richdraw'+canvasNumber+'" style="';
canvasString+='border:1px solid black;position:relative;top:0px'
canvasString+='width:99%;height:99%;background-color:white;'
canvasString+='-moz-user-select:none;display:'+canvasDisplayStyle+'"></div>';
document.getElementById("CanvasContainer").innerHTML+=canvasString;
canvasNumber++;
canvasDisplayStyle = "none";
initDraw();
currentCanvas++;
}



function makeCanvasFromIE(CanvasId){
var canvasString;
canvasString='<div id="richdraw'+CanvasId+'" style="';
canvasString+='border:1px solid black;position:relative;top:0px'
canvasString+='width:99%;height:99%;background-color:white;'
canvasString+='-moz-user-select:none;display:'+canvasDisplayStyle+'"></div>';
document.getElementById("CanvasContainer").innerHTML+=canvasString;
canvasDisplayStyle = "none";
initDraw();
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
canvasHeight = $('cHeight').value;
canvasWidth = $('cWidth').value;

document.getElementById('CanvasContainer').style.height = '' + canvasHeight + 'px';
document.getElementById('CanvasContainer').style.width = '' + canvasWidth + 'px';

$('zFlashPreviewDiv').style.height = canvasHeight + 'px';
$('zFlashPreviewDiv').style.width = canvasWidth + 'px';
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


function initCanvas(){
	//for(var zxCanvas = 0; zxCanvas > 10; zxCanvas++){
	makeCanvas();
	//}
	gotoframe(1,1);
}

function playAnimation(){
AnimationPlay = true;
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


function genFlash(){
flashVerification()
$('swfGenBtn').disabled = true;
$('swfGenBtn').value = 'generating...';
$('export').innerHTML = '';
var swfgen = generateAnimationXML();
if(generateAnimationXML().replace("<svg></svg>","") != '<AnimationXML></AnimationXML>'){
ajaxpack.postAjaxRequest("../freemovie/swfgen.php", "height="+canvasHeight+"&width="+canvasWidth+"&framerate="+AnimationFramerate+"&svg=" + swfgen , genFlashEvent, "txt")
}

}

function flashVerification(){
if(generateAnimationXML() != '<AnimationXML><svg></svg></AnimationXML>'){

}
}

function preFlash(){
flashVerification()
$('zFlashPreviewDiv').style.height = canvasHeight + 'px';
$('zFlashPreviewDiv').style.width = canvasWidth + 'px';
$('zFlashPreviewDiv').innerHTML = "";
$('swfPreBtn').disabled = true;
$('swfPreBtn').value = 'generating...';
var swfgen = generateAnimationXML();
if(generateAnimationXML().replace("<svg></svg>","") != '<AnimationXML></AnimationXML>'){
ajaxpack.postAjaxRequest("../freemovie/swfgen.php", "height="+canvasHeight+"&width="+canvasWidth+"&framerate="+AnimationFramerate+"&svg=" + swfgen , preFlashEvent, "txt")
}else{$('zFlashPreviewDiv').innerHTML = "Sorry No Preview Availiable:<br> Empty Animation";}
}

function generateSWFResponse(responsedata){
$('export').innerHTML = '<a href="' + responsedata.replace('files','../freemovie/files') + '>Download</a>';
$('swfGenBtn').disabled = false;
$('swfGenBtn').value = 'Generate SWF';
}


function preFlashEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
//$('previewIframe').src = myajax.responseText.replace('files','freemovie/files')

var flashHTML = "";
var FLASHfilename=myajax.responseText.replace('files','../freemovie/files');
flashHTML+='<object width="480" height="272"><param name="movie" value="'+FLASHfilename+'">'
flashHTML+='<embed src="'+FLASHfilename+'" width="480" height="272"></embed></object>'
document.getElementById("zFlashPreviewDiv").innerHTML = flashHTML;
$('swfPreBtn').disabled = false;
$('swfPreBtn').value = 'Preview';
}
}
}

function genFlashEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
setTimeout('generateSWFResponse("'+myajax.responseText+'")',500)
}
}
}
