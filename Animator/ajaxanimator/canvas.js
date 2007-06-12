var canvasNumber = 1;
var previousCanvas = 0;
var canvasDisplayStyle = "";
var canvasIssueResolved = new Boolean();
var AnimationPlay = new Boolean();
var AnimationFramerate = 12; 
var totalFrames = 1;
var canvasHeight = 272;
var canvasWidth = 480;
var revisionNumber = 1;
var animationRevision = new Array();
var animationRevisionURL = new Array();
var lastAnimationURL = '';
var replaceEngine = 'regexp'; //either regexp or string, it is the engine that changes stuff
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

function gencleanxml(){
$('jsQuery').value = decompressxml(compressxml(generateAnimationXML()));
}

function gencxml(){
var zxvlue;
zxvlue = compressxml(generateAnimationXML());
$('jsQuery').value = zxvlue;
}

function decompressxml(pxml){
var zxvlue;
zxvlue = pxml;

zxvlue = replaceDecompressXML(zxvlue);




return zxvlue;
}
function compressxml(pxml){
var zxvlue;
zxvlue = pxml;
zxvlue = replaceCompressXML(zxvlue);
return zxvlue;
}

function generateAnimationXML(){
var zAnimationXML = "<AnimationXML>";
for(var pzxy = 1; pzxy <= totalFrames;pzxy++){
if(DrawCanvas[pzxy] != null){
var zCurrentAnimationXMLFrame;
//zCurrentAnimationXMLFrame = DrawCanvas[pzxy].renderer.getMarkup() this fails in IE so do it the hard way...
zCurrentAnimationXMLFrame = $('richdraw' + pzxy).innerHTML;
if(document.all){
zCurrentAnimationXMLFrame = zCurrentAnimationXMLFrame.replace('<?xml:namespace prefix = v ns = "urn:schemas-microsoft-com:vml" />',"<svg>");
}
zAnimationXML += zCurrentAnimationXMLFrame;
if(document.all){
zAnimationXML += "</svg>"
}
}else{
zAnimationXML += "<svg></svg>"
}
}
zAnimationXML += "</AnimationXML>";
//the above code is to make the vml less crappy
return removeUnusedAttributes(zAnimationXML);
}

/*
<AnimationXML>

<?xml:namespace prefix = v ns = "urn:schemas-microsoft-com:vml" />

<v:rect id=shape:5145ebd5-2c43-a41f-58ab-b4718c2fa542 style="LEFT: 10px; WIDTH: 460px; POSITION: absolute; TOP: 10px; HEIGHT: 250px" coordsize = "21600,21600" filled = "t" fillcolor = "red" stroked = "t" strokecolor = "black" strokeweight = ".75pt"></v:rect></AnimationXML>
*/
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

function replaceCompressXML(xmlData){
var b = xmlData;
b = replaceAll(" ","",b,b);//remove spaces
b = replaceAll("<svg>","_f",b);
b = replaceAll("</svg>",",f",b);
b = replaceAll("<rect","_r",b);
b = replaceAll("</rect>",",r",b);
b = replaceAll("<line","_l",b);
b = replaceAll("</line>",",l",b);
b = replaceAll("stroke-width",".i",b);
b = replaceAll("stroke",".o",b);
b = replaceAll("fill",".f",b);
b = replaceAll("height",".h",b);
b = replaceAll("width",".w",b);
b = replaceAll("rgb","-y",b);
b = replaceAll("0,0,0","g",b);
b = replaceAll("255,0,0","*",b);
b = replaceAll("<AnimationXML>","_A",b);
b = replaceAll("</AnimationXML>",",A",b);
b = replaceAll('="',"~",b);
b = replaceAll('px"',"#",b);
return b;
}
function revReplace(stringa,stringb,astring){
return replaceAll(stringb,stringa,astring);
}
function replaceDecompressXML(xmlData){
var b = xmlData;
b = revReplace("0,0,0","g",b);
b = revReplace("255,0,0","*",b);
b = revReplace("<AnimationXML>","_A",b);
b = revReplace("</AnimationXML>",",A",b);
b = revReplace("<svg>","_f",b);
b = revReplace("</svg>",",f",b);
b = revReplace("<rect","_r",b);
b = revReplace("</rect>",",r",b);
b = revReplace("<line ","_l",b);
b = revReplace("</line> ",",l",b);
b = revReplace(" stroke-width",".i",b);
b = revReplace(" stroke",".o",b);
b = revReplace(" fill",".f",b);
b = revReplace(" height",".h",b);
b = revReplace(" width",".w",b);
b = revReplace(" rgb","-y",b);

zxvlue = revReplace('="',"~",zxvlue);
zxvlue = revReplace('px"',"#",zxvlue);
b = replaceAll('"x=','" x=',zxvlue);
b = replaceAll('"y=','" y=',zxvlue);
b = replaceAll('stroke=" ','stroke="',zxvlue);
b = replaceAll('fill=" ','fill="',zxvlue);
return b;
}

//the below code is not work of antimatter15
//it is a slightly modified and compacted version of Philip Tan Boon Yew's work
//http://home.pacific.net.sg/~firehzrd/jsarc/unWebify.html
// I chose it because it's better/faster than the algorithim I made
//and... just a reminder: google is your friend
// it also has regexp f
function replaceAll(findStr,repStr,oldStr) {
var newStr = ""; 
if(replaceEngine == 'string'){
var srchNdx = 0;
while (oldStr.indexOf(findStr,srchNdx) != -1)  {
newStr += oldStr.substring(srchNdx,oldStr.indexOf(findStr,srchNdx));
newStr += repStr;
srchNdx = (oldStr.indexOf(findStr,srchNdx) + findStr.length);
}
newStr += oldStr.substring(srchNdx,oldStr.length);   
}else{
var re = new RegExp(findStr, "g"); // pre replace using regexp
newStr = oldStr.replace(re, repStr);
}
return newStr;
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

function genFlashHTML(aAnimationURL){
var zflashHTML = "";
zflashHTML='<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase= '
zflashHTML+='"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"'
zflashHTML+='WIDTH="'+CanvasWidth+'" HEIGHT="'+CanvasHeight+'" id="">'
zflashHTML+='<PARAM NAME=movie VALUE="'+lastAnimationURL+'">'
zflashHTML+='<PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#FFFFFF><EMBED src=' + aAnimationURL
zflashHTML+='quality=high bgcolor=#FFFFFF WIDTH="'+CanvasWidth+'" HEIGHT="'+CanvasHeight+'"'
zflashHTML+='NAME="" ALIGN="" TYPE="application/x-shockwave-flash"';
zflashHTML+='PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>'
}

function embedAnimationPreview(){
$('previewStatus').innerHTML = "Mode: Preview (Revision " + revisionNumber + ")"

document.getElementById("zFlashPreviewDiv").innerHTML = genFlashHTML(lastAnimationURL);
}

function PreviewRevision(revision){
$('previewStatus').innerHTML = "Mode: Preview (Revision " + revisionNumber + ")"

document.getElementById("zFlashPreviewDiv").innerHTML = genFlashHTML(animationRevisionURL[revision]);
}
function xmlError(e) {alert(e);}

function removeUnusedAttributes(zxml){
//var zxml = "" + generateAnimationXML();
var newXml = zxml;
var wobjDom = new XMLDoc(zxml, xmlError);
var wdomTree = wobjDom.docNode;
for(var wzFrames = 0; wzFrames < wdomTree.getElements("svg").length; wzFrames++){
var wframeNode = wdomTree.getElements("svg")[wzFrames];
for(var wzFrameObj = 0; wzFrameObj < wframeNode.getElements().length; wzFrameObj++){
var wframeNodeObj = wframeNode.getElements()[wzFrameObj];
var wframeObjId = wframeNodeObj.getAttribute("id");
newXml = newXml.replace(wframeObjId,"")
var wframeObjStyle = wframeNodeObj.getAttribute("style");
newXml = newXml.replace(wframeObjStyle,"")
newXml = newXml.replace(' id=""',"")
newXml = newXml.replace(' style=""',"")
}
}
return newXml
}

function preFlash(){
$('previewStatus').innerHTML = "Mode: Preview (Revision " + revisionNumber + ")"

if(animationRevision[revisionNumber -1] == generateAnimationXML()){

setTimeout("embedAnimationPreview()",100);//hack to make it work right...

}else{
flashVerification()
$('zFlashPreviewDiv').style.height = canvasHeight + 'px';
$('zFlashPreviewDiv').style.width = canvasWidth + 'px';
$('zFlashPreviewDiv').innerHTML = "";
$('swfPreBtn').disabled = true;
$('swfPreBtn').value = 'generating...';
var swfgen = compressxml(generateAnimationXML());
if(generateAnimationXML().replace("<svg></svg>","") != '<AnimationXML></AnimationXML>'){
ajaxpack.postAjaxRequest("../freemovie/swfgen.php", "height="+canvasHeight+"&width="+canvasWidth+"&framerate="+AnimationFramerate+"&svg=" + swfgen , preFlashEvent, "txt")
}else{$('zFlashPreviewDiv').innerHTML = "Sorry No Preview Availiable:<br> Empty Animation";}
}
$('previewStatus').innerHTML = "Mode: Preview (Revision " + revisionNumber + ")"
}

function generateSWFResponse(responsedata){
$('export').innerHTML = '<a href="' + responsedata.replace('files','../freemovie/files') + '>Download</a>';
$('swfGenBtn').disabled = false;
$('swfGenBtn').value = 'Generate SWF';
}


function preFlashEvent(){
$('previewStatus').innerHTML = "Mode: Preview (Revision " + revisionNumber + ")"
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
animationRevision[revisionNumber] = generateAnimationXML();
//$('previewIframe').src = myajax.responseText.replace('files','freemovie/files')
var flashHTML = "";
var FLASHfilename=myajax.responseText.replace('files','../freemovie/files');
lastAnimationURL = FLASHfilename;
animationRevisionURL[revisionNumber] = FLASHfilename;
revisionNumber++;
$('previewStatus').innerHTML = "Mode: Preview (Revision " + revisionNumber + ")"
flashHTML='<object width="480" height="272"><embed src="'+FLASHfilename+'" width="480" height="272"></embed></object>'
document.getElementById("zFlashPreviewDiv").innerHTML = flashHTML;
$('swfPreBtn').disabled = false;
$('swfPreBtn').value = 'Preview';
if(myajax.responseText.indexOf('Warning') != -1 || myajax.responseText.indexOf('Error') != -1 ){
if(myajax.responseText.indexOf('<br>') != -1 || myajax.responseText.indexOf('<b>') != -1 ){
document.getElementById("zFlashPreviewDiv").innerHTML = myajax.responseText ;
}
}
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
