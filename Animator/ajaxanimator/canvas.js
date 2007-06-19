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
var replaceEngine = 'string'; //either regexp or string, it is the engine that changes stuff
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

function convertVML(s){

parseFloat(s.split(',')[0])//x
parseFloat(s.split(',')[1])//y


/*
<AnimationXML><svg><v:rect style="LEFT: 70px; WIDTH: 160px; POSITION: absolute; TOP: 30px; HEIGHT: 160px" coordsize = "21600,21600" filled = "t" fillcolor = "red" stroked = "t" strokecolor = "black" strokeweight = ".75pt">
</v:rect><v:line style="POSITION: absolute" from = "30pt,45pt" to = "75pt,157.5pt" stroked = "t" strokecolor = "black" strokeweight = ".75pt"></v:line></svg></AnimationXML>
*/

if (window.ActiveXObject){
var objDom=new ActiveXObject("Microsoft.XMLDOM");
objDom.async="false";
var zVML;

objDom.loadXML(zVML);

}else{
var parser=new DOMParser();

var objDom=parser.parseFromString(zVML,"text/xml");
}
var domTree = objDom.getElementsByTagName('AnimationXML')[0];
objDom.getElementsByTagName('AnimationXML')[0];
for(var zFrames = 0; zFrames < objDom.getElementsByTagName('svg').length; zFrames++){
var frameNode = objDom.getElementsByTagName('svg')[zFrames];

for(var zLines = 0; zLines < frameNode.getElementsByTagName('line').length; zLines++){
var lineNodes = frameNode.getElementsByTagName('line')[zLines];
var zSVGLine = "<line ";
zSVGLine += 'x1="' + parseFloat(frameNode.getAttribute("from").split(',')[0]) + '" ';
zSVGLine += 'y1="' + parseFloat(frameNode.getAttribute("from").split(',')[1]) + '" ';
zSVGLine += 'x2="' + parseFloat(frameNode.getAttribute("to").split(',')[0]) + '" ';
zSVGLine += 'y2="' + parseFloat(frameNode.getAttribute("to").split(',')[1]) + '" ';
}

for(var zRect = 0; zRect < frameNode.getElementsByTagName('rect').length; zRect++){
var rectNodes = frameNode.getElementsByTagName('rect')[z];
frameNode.getAttribute("to")
}

}


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

document.getElementById('CanvasContainer').style.height =   $('cHeight').value + 'px';
document.getElementById('CanvasContainer').style.width =  $('cHeight').value + 'px';

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
if(DrawCanvas[pzxy] != null && DrawCanvas[pzxy].renderer.getMarkup() != "<svg></svg>"){
var zCurrentAnimationXMLFrame;
//zCurrentAnimationXMLFrame = DrawCanvas[pzxy].renderer.getMarkup() this fails in IE so do it the hard way...
zCurrentAnimationXMLFrame = $('richdraw' + pzxy).innerHTML;
if(isIE() == true){
zCurrentAnimationXMLFrame = zCurrentAnimationXMLFrame.replace('<?xml:namespace prefix = v ns = "urn:schemas-microsoft-com:vml" />',"<svg>");
}
zAnimationXML += zCurrentAnimationXMLFrame;
if(isIE() == true){
zAnimationXML += "</svg>"
}
}else{
if(isKeyframe(pzxy,1) != false){
zAnimationXML += "<svg></svg>"
}else{
zAnimationXML += '<svg t="f"></svg>'
}

}
}
zAnimationXML += "</AnimationXML>";
//the above code is to make the vml less crappy
return removeUnusedAttributes(zAnimationXML);
}

function isIE(){
    ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
    opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    if ((!ie) || (opera)) {
	
	}else{
	return true
	}
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
if(totalFrames == 1){
AnimationPlay = false;
}
if(currentCanvas + 1> totalFrames){
gotoframe(1,1);
setTimeout('doAnimation()',1000/AnimationFramerate);
}else{
if(AnimationPlay == true){
gotoframe(currentFrameSelection+1,1);
setTimeout('doAnimation()',1000/AnimationFramerate);
}
}
}

function replaceCompressXML(xmlData){
var b = xmlData;
b = replaceAll('<svg t="f">',"_e",b);
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
b = revReplace('<svg t="f">',"_e",b);
b = revReplace("255,0,0","*",b);
b = revReplace("<svg>","_f",b);
b = revReplace("</svg>",",f",b);
b = revReplace(" stroke-width",".i",b);
b = revReplace(" stroke",".o",b);
b = revReplace(" fill",".f",b);
b = revReplace(" height",".h",b);
b = revReplace(" width",".w",b);
b = revReplace(" rgb","-y",b);
b = revReplace("<line ","_l",b);
b = revReplace("</line> ",",l",b);

b = revReplace("<rect","_r",b);
b = revReplace("</rect>",",r",b);
b = revReplace("<AnimationXML>","_A",b);
b = revReplace("</AnimationXML>",",A",b);
b = revReplace('="',"~",b);
b = revReplace('px"',"#",b);
b = replaceAll('"x=','" x=',b);
b = replaceAll('"y=','" y=',b);

b = replaceAll('"x2=','" x2=',b);
b = replaceAll('"y2=','" y2=',b);
b = replaceAll('"x1=','" x1=',b);
b = replaceAll('"y1=','" y1=',b);

b = replaceAll('stroke=" ','stroke="',b);
b = replaceAll('fill=" ','fill="',b);
return b;
}

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
try{
if(findStr.indexOf("*") == -1){
var re = new RegExp(findStr, "g"); // pre replace using regexp
newStr = oldStr.replace(re, repStr);
}else{
var srchNdx = 0;
while (oldStr.indexOf(findStr,srchNdx) != -1)  {
newStr += oldStr.substring(srchNdx,oldStr.indexOf(findStr,srchNdx));
newStr += repStr;
srchNdx = (oldStr.indexOf(findStr,srchNdx) + findStr.length);
}
newStr += oldStr.substring(srchNdx,oldStr.length);   
}
}catch(err){
var srchNdx = 0;
while (oldStr.indexOf(findStr,srchNdx) != -1)  {
newStr += oldStr.substring(srchNdx,oldStr.indexOf(findStr,srchNdx));
newStr += repStr;
srchNdx = (oldStr.indexOf(findStr,srchNdx) + findStr.length);
}
newStr += oldStr.substring(srchNdx,oldStr.length);   
}
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




function flashVerification(){
if(generateAnimationXML().replace("<svg></svg>","") != '<AnimationXML></AnimationXML>'){

}
}

function genFlashHTML(aAnimationURL){
var zflashHTML = "";
zflashHTML='<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase= '
zflashHTML+='"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"'
zflashHTML+='WIDTH="'+canvasWidth+'" HEIGHT="'+canvasHeight+'" id="">'
zflashHTML+='<PARAM NAME=movie VALUE="'+ aAnimationURL+'">'
zflashHTML+='<PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#FFFFFF><EMBED src="' + aAnimationURL+'" '
zflashHTML+=' quality=high bgcolor=#FFFFFF WIDTH="'+canvasWidth+'" HEIGHT="'+canvasHeight+'"'
zflashHTML+='NAME="" ALIGN="" TYPE="application/x-shockwave-flash"';
zflashHTML+='PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>'
return zflashHTML;
}

function embedAnimationPreview(){
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"

document.getElementById("zFlashPreviewDiv").innerHTML = genFlashHTML(lastAnimationURL);
}

function PreviewRevision(revision){
AnimationPlay == true

$("zFlashPreviewDiv").innerHTML = genFlashHTML(animationRevisionURL[revision]);
}

function setRevisionFromBrowser(){
var RevisionBox = $('RevisionBrowser'); 
PreviewRevision(parseInt(RevisionBox.options[RevisionBox.selectedIndex].value));
}

function initRevisionBrowser(){

var zRevisionBrowserHTML = "";
zRevisionBrowserHTML += '<select id="RevisionBrowser" onchange="setRevisionFromBrowser();">'
for(var zRevisionOption = 0; zRevisionOption < animationRevision.length; zRevisionOption++){
var otherOptions = "";
if(zRevisionOption == animationRevision.length -1){
otherOptions = " (HEAD)"
}
if(zRevisionOption == 0){
otherOptions = " (Empty)"
}
zRevisionBrowserHTML += '<option value="'+zRevisionOption+'">Revision: '+zRevisionOption+'' + otherOptions+'</option>'
}
zRevisionBrowserHTML += '</select>'
$('RevisionBrowserDiv').innerHTML = zRevisionBrowserHTML;
try{
$('RevisionBrowser').options[animationRevision.length -1].selected = 'selected';
}catch(err){}
	  
}

function removeUnusedAttributes(zxml){


var newXml = zxml;

if (window.ActiveXObject){
var objDom=new ActiveXObject("Microsoft.XMLDOM");
objDom.async="false";
objDom.loadXML(zxml);
}else{
var parser=new DOMParser();
var objDom=parser.parseFromString(zxml,"text/xml");
}
var domTree = objDom.getElementsByTagName('AnimationXML')[0];
objDom.getElementsByTagName('AnimationXML')[0];
for(var zFrames = 0; zFrames < objDom.getElementsByTagName('svg').length; zFrames++){
var frameNode = objDom.getElementsByTagName('svg')[zFrames];
for(var zFrameObj = 0; zFrameObj < frameNode.childNodes.length; zFrameObj++){
newXml = newXml.replace(frameNode.childNodes[zFrameObj].getAttribute("id"),"")
newXml = newXml.replace(frameNode.childNodes[zFrameObj].getAttribute("style"),"")
newXml = newXml.replace(' id=""',"")
newXml = newXml.replace(' style=""',"")
}
}
return newXml;
}

function preFlash(){
initRevisionBrowser()
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"

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
ajaxpack.postAjaxRequest("../freemovie/swfgen.php", "type=preview&height="+canvasHeight+"&width="+canvasWidth+"&framerate="+AnimationFramerate+"&svg=" + swfgen , preFlashEvent, "txt")
}else{$('zFlashPreviewDiv').innerHTML = "Sorry No Preview Availiable:<br> Empty Animation";}
}
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
}



function preFlashEvent(){
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
animationRevision[revisionNumber] = generateAnimationXML();
//$('previewIframe').src = myajax.responseText.replace('files','freemovie/files')
var flashHTML = "";
var FLASHfilename=myajax.responseText.replace('preview','../freemovie/preview');
lastAnimationURL = FLASHfilename;
animationRevisionURL[revisionNumber] = FLASHfilename;
revisionNumber++;
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
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
initRevisionBrowser()
}

function genFlash(){
var zSWFFilename=prompt("please enter a file name for the animation");
zSWFFilename = zSWFFilename.replace(".swf","");
zSWFFilename = zSWFFilename.replace("/","");
//zSWFFilename = zSWFFilename.replace("\","");
zSWFFilename = zSWFFilename.replace(" ","_");
zSWFFilename = zSWFFilename.replace("+","");
zSWFFilename = zSWFFilename.replace("&","");
zSWFFilename = zSWFFilename.replace("?","");

$('swfGenBtn').disabled = true;
$('swfGenBtn').value = 'generating...';
$('export').innerHTML = '';
var swfgen = compressxml(generateAnimationXML());
if(generateAnimationXML().replace("<svg></svg>","") != '<AnimationXML></AnimationXML>'){
ajaxpack.postAjaxRequest("../freemovie/swfgen.php", "filename="+zSWFFilename+"&type=export&height="+canvasHeight+"&width="+canvasWidth+"&framerate="+AnimationFramerate+"&svg=" + swfgen , genFlashEvent, "txt")
}
}


function clearPreviews(){
ajaxpack.postAjaxRequest("../freemovie/clearPreviews.php","", clearPreviewEvent, "txt")
}


function clearPreviewEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
alert(myajax.responseText)
}
}
}

function generateSWFResponse(responsedata){
var responseurl = responsedata.replace('files','../freemovie/files');
var absoluteResponseURL = responsedata.replace('files','../freemovie/files');
$('export').innerHTML = '<a id="zExportURL" href="' + responseurl + '>' + responseurl + '</a>';
$('swfGenBtn').disabled = false;
$('swfGenBtn').value = 'Export Animation';
$('export').innerHTML = '<a id="zExportURL" href="' + $('zExportURL').href + '>' + $('zExportURL').href + '</a>';
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
