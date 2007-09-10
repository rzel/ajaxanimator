//Global Variables
var layers = 0;
var kFrameCount = 0;
var currentFrameSelection = 1;
var currentLayerSelection = 1;
var KeyFrames = new Array()
var TweenFrames = new Array()
var tFrameCount = 0;
var zDataText = 0;
var totalFramesPerLayer = 500;
var nextFA = "";
//End Global Variables


//Color Variables

var finishedTweenColor = "#80FF8E"
var KeyframeColor = "#0099CC";
var frameTextColor = "#000000";
var selectKeyframeColor = "";
var selectTextColor = "";
var FrameColor = "#ebf2f8";
var selectFrameColor = "";
var LayerBGColor = "#BED6E0";
//End Color Variables



function setOpacity(obj, value) { //this function is never actually called... but it would make a good effect
	getElementById(obj).style.opacity = value/10;
	getElementById(obj).style.filter = 'alpha(opacity=' + value*10 + ')';
}


function toKeyframe() //Function to convert normal frames to keyframes
{
	var zframe;
	zframe = document.getElementById("frame" + currentFrameSelection + "layer" + currentLayerSelection);
	zframe.style.color = frameTextColor;
	zframe.style.backgroundColor=KeyframeColor;
	KeyFrames[kFrameCount] = currentFrameSelection + "," + currentLayerSelection
	kFrameCount = kFrameCount + 1
	currentFrameSelection = currentFrameSelection;
	currentLayerSelection = currentLayerSelection;
	gotoframe(currentFrameSelection,currentLayerSelection);
}

function makeKeyframe(framenumber, layer){
var ikf = new Boolean(false);
for(var m = 0; m <= kFrameCount; m++){
if(KeyFrames[m] == framenumber + "," + layer){
ikf = true
}
}
if(ikf == false){ //irishguy sucks
	var zframe;
	zframe = document.getElementById("frame" + framenumber + "layer" + layer);
	zframe.style.color = frameTextColor;
	zframe.style.backgroundColor=KeyframeColor;
	KeyFrames[kFrameCount] = framenumber + "," + layer
	kFrameCount = kFrameCount + 1
	gotoframeInterface(framenumber,layer);
}
}




function fullgotoframe() //Function to refresh all data in the timeline
{
	if (confirm("Warning: This might take a very long time")) { 
	alert('you will be alerted when it is done');
	for(var iz = 1; iz <= layers; iz++)
	{
	for(var i = 1; i <= totalFramesPerLayer; i++)
	{
	gotoframeInterface(i,iz);
	}
	}
	}
	alert('done');
}

//33B843

//80FF8E -light

function tFrame(framenumber,layer){
var frame = document.getElementById("frame" + framenumber + "layer" + layer);
frame.style.color = "#000000";
frame.style.backgroundColor=finishedTweenColor;
}

function tFrameSel(framenumber,layer){
var frame = document.getElementById("frame" + framenumber + "layer" + layer);
frame.style.color = "#000000";
frame.style.backgroundColor="#33B843";
}

function timelineInterfaceTween(nFA){
var kFrameC = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
if(kFrameC != nextFA){
nFn = kFrameC
}else{
nFn = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
}

for(var fNum = (nFn + 1); fNum < (nFA); fNum++){
TweenFrames[tFrameCount] = fNum
tFrameCount++
tFrame(fNum,layer)
}
}

function gotoframeInterface(framenumber,layer){

if(nextFA != 0 && kFrameCount > 1){
var nFn;
var kFrameC = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
if(kFrameC != nextFA){
nFn = kFrameC
}else{
nFn = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
}

createTween(nFn,nextFA)
var nFA = nextFA

var isTweened = "true";
for(var fNum = (nFn + 1); fNum < (nFA); fNum++){
TweenFrames[tFrameCount] = fNum
tFrameCount++
tFrame(fNum,layer)
}
nextFA = 0
}
//start keyframe detection code
	var wasKeyFrame = new Boolean(false); //variable to store wether the selection is a keyframe
	
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	wasKeyFrame = true
	}
	}
	//end keyframe detection code
	
	var aframe;
	aframe = document.getElementById("frame" + currentFrameSelection + "layer" + currentLayerSelection);
	if(wasKeyFrame == false){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	aframe.style.color = "black";
	aframe.style.backgroundColor=FrameColor;
	}else{
	tFrame(currentFrameSelection,layer)
	}
	}
	if(wasKeyFrame == true){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	aframe.style.color = frameTextColor;
	aframe.style.backgroundColor=KeyframeColor;
	}else{
	var kfc1 = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
	var kfc2 = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
	var cfs = currentFrameSelection
	if(cfs != 0 && cfs != 1&& cfs != kfc1){
	tFrame(currentFrameSelection,layer)
	}
	}
	}
	currentFrameSelection = framenumber
	currentLayerSelection = layer
	var frame;
	frame = document.getElementById("frame" + framenumber + "layer" + layer);
	var isKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == framenumber + "," + layer){
	isKeyFrame = true
	}
	}

	if(isKeyFrame == false){
	frame.style.color = "#F2F2F2";
	frame.style.backgroundColor="#00BFFF";
	}
	if(isKeyFrame == true){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	frame.style.color = "#F2F2F2";
	frame.style.backgroundColor="#3579DC";
	}else{
	var kfc1 = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
	var kfc2 = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
	if(framenumber != 0 && framenumber != 1 && framenumber != kfc1){
	tFrameSel(framenumber,layer)
	}
	}
	}

	
}

function repeatChecks(){
checkFrame(currentFrameSelection,currentLayerSelection);

setTimeout("repeatChecks()",500);
}

repeatChecks()


function checkRepeat(oFrame){
var tot = 0
var mt = 0
var c1a = document.getElementById("richdraw"+oFrame).innerHTML

var c2a = document.getElementById("richdraw"+(oFrame-1)).innerHTML


var c1 = (new DOMParser()).parseFromString(c1a, "text/xml").firstChild.cloneNode(true)
var c2 = (new DOMParser()).parseFromString(c2a, "text/xml").firstChild.cloneNode(true)

if(c1.childNodes.length == c2.childNodes.length){
for(var q1=0;q1 < c1.childNodes.length;q1++){
if(c1.childNodes[q1].getAttribute("x")== c2.childNodes[q1].getAttribute("x")){
if(c1.childNodes[q1].getAttribute("y")== c2.childNodes[q1].getAttribute("y")){
mt++
}
}
tot++
/* 
for(var q2=0;q2 < c1.childNodes[q1].attributes.length;q2++){
if(c2.childNodes[q1].getAttribute(c1.childNodes[q1].attributes.nodeName)==c1.childNodes[q1].attributes.nodeValue
){
mt++
}
tot++
}
*/
}
}
var gp = "1"
if(mt == tot){
//got past level 1
if(mt != 0){
//got past level 2
if(tot != 0){
gp = "0"

}
}
}
if(gp != "0"){
return "diff" 
}else{
return "same"
}
}

function ikf(frame,layer){
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == frame + "," + layer){
	wasKeyFrame = true
	}
	}
	return wasKeyFrame;
	}

	function itf(frame){
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= tFrameCount; m++)
	{
	if(TweenFrames[m] == frame ){
	wasKeyFrame = true
	}
	}
	return wasKeyFrame;
	}
	
	
function checkFrame(oFrame, oLayer){
try{
var zisempty = false;
if(DrawCanvas[oFrame] == null){
zisempty = true;
}else{
if(DrawCanvas[oFrame].renderer.getMarkup().replace(" ","") == "<svg></svg>"){
zisempty = true;
}
if(oFrame != 1 && oFrame != 0){
if(checkRepeat(oFrame) == "diff"){
if(itf(oFrame,oLayer) == false || ikf(oFrame,oLayer) == false){
nextFA = oFrame;
//timelineInterfaceTween(oFrame)
}

zisempty = false;
//finishedTween(oFrame,oLayer);
//tFrame(oFrame,oLayer)

}else{

zisempty = true
}
}
}
if(zisempty == false && itf(oFrame,oLayer) == false ){

makeKeyframe(oFrame,oLayer);
}
}catch(err){}
}

function setTotalFrameValue(){
	var qframe;
	qframe = document.getElementById("frame" + totalFrames + "layer" + 1);
	qframe.style.color = "#ffffff";
	qframe.style.backgroundColor="#FF9900";
}

function changeTotalFrameValue(tfValue){
totalFrames = tfValue;
setTotalFrameValue();
gotoframe(currentFrameSelection,currentLayerSelection);
}

function gotoframe(framenumber, layer){

	if(KeyFrames.join(",").indexOf(framenumber+","+layer) == -1){
	}

	var preCnvs = currentCanvas;
	DrawCanvas[currentCanvas].unselect();
	if(framenumber > 0 && framenumber < totalFramesPerLayer){
	checkFrame(currentFrameSelection, layer);
	previousCanvas = currentCanvas;
	if(framenumber > totalFrames){
	gotoframeInterface(totalFrames, layer);
	totalFrames = framenumber;
	}
	gotoframeInterface(framenumber,layer);
	if(framenumber < totalFrames){
	setTotalFrameValue()
	}
	hideCurrentCanvas();
	currentCanvas = framenumber;
	if(DrawCanvas[currentCanvas]==null){
	if(Ext.isIe == true){
	makeCanvasFromIE(framenumber);
	}else{
	makeCanvasFromId(framenumber);
	if($("richdraw"+preCnvs).firstChild.childNodes.length > 0){
		cloneFrame(preCnvs)
	}
	}
	}
	showCurrentCanvas();
	checkFrame(framenumber, layer);
	}
}



function removeFrame(frameId,layer){
var qzmy = currentCanvas;
DrawCanvas[frameId] = null;
$("richdraw" + frameId).innerHTML = "";
currentCanvas = frameId;
initDraw()
currentCanvas = qzmy
addHist("Remove Frame")
}


function removeKeyframe(){ //Function to delete selected keyframe
/*
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	wasKeyFrame = true
	}
	}
	if(wasKeyFrame == false){
	alert("Error: This isn't a Key Frame!")
	}
	if(wasKeyFrame == true){
	if (confirm("Are You Sure you want to delete this frame?")) { 
	*/
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	KeyFrames[m] = "0,0";
	}
	}
	removeFrame(currentFrameSelection , currentLayerSelection)
	
	gotoframe(currentFrameSelection,currentLayerSelection);
	
	//}
	//}
}

function isKeyframe(frame, layer){
	var pKeyFrame = new Boolean();
	pKeyFrame = false
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == frame + "," + layer){
	pKeyFrame = true
	}
	}
	return pKeyFrame;
}

function ClearAllKeyframes(){ //Empties timeline

	if (confirm("Are you sure you want to delete ALL the keyframes?")) { 
	for(var m = 0; m <= kFrameCount; m++)
	{
	KeyFrames[m] = "0,0";
	gotoframe(currentFrameSelection,currentLayerSelection);
	}
	alert("Done.");
	}
}

var TDCount = 0;


function addLayer(){

var asdf; //create the string that stores the layer data

layers = layers + 1;

asdf =  "<div id='framesDiv'><table width='100%' cellspacing='0px' id='framesTable" + layers + "'"; //Create the Layer

asdf = asdf + (" cellspacing='0' border='1' onmouseover=\"document.body.style.cursor='default';\"> ");

asdf = asdf + ("<tr>")

asdf = asdf + ("<td onmouseover=\"try{document.body.style.cursor='default';Tip('Layer "+layers+"');}catch(err){}\" height='5' bgcolor='"+LayerBGColor+"'");


asdf = asdf + (">Layer" + layers + "</td>")
for (var x = 1; x <= totalFramesPerLayer; x++) //Start adding frames
{

asdf = asdf + ("<td id='frame" + x + "layer" + layers + "'height='5' cellpadding='0px' cellspacing='0px'");//Main attributes/'Frame' declaration

asdf = asdf + ("style='-moz-user-select: none; background-color:"+FrameColor+";' ");//css styling

asdf = asdf + ("onmousedown='gotoframe(" + x +", " + layers +");'"); //Start Javascript event handling

asdf = asdf + ("onmouseover=\"try{Tip(setTooltipData('"+x+"','"+layers+"'),TITLE, 'Frame "+x+"');}catch(err){}\" "); 


asdf = asdf + (">" + x);//Text in each frame

asdf = asdf + ("</td>")//End Frame

}
//End adding layer
asdf = asdf + ("</tr></table></div>")//Create end tags for layer

changeInnerHTML("frameContainer",asdf)//Add the layer to the actual page


}


function setTooltipData(uFrame,uLayer){
var wasKeyFrame = new Boolean(false);
for(var m = 0; m <= kFrameCount; m++)
{
if(KeyFrames[m] == uFrame + "," + uLayer){
wasKeyFrame = true
}
}
var ziskeyframe = 'false';
ziskeyframe = 'false';
if(wasKeyFrame == true){
ziskeyframe = 'true';
}
var zisselected = 'false';
if (currentFrameSelection == uFrame){
if (currentLayerSelection == uLayer){
zisselected = 'true';
}
}
var zisempty = false;
if(DrawCanvas[uFrame] == null){
zisempty = true;
}else{
if(DrawCanvas[uFrame].renderer.getMarkup().replace(" ","") == "<svg></svg>"){
zisempty = true;
}
}
var canvasframepreview = "empty";
if(DrawCanvas[uFrame] != null){
canvasframepreview = DrawCanvas[uFrame].renderer.getMarkup()
}

if(zisempty == false){
var pstr = DrawCanvas[uFrame].renderer.getMarkup();
count = 0; 
var key = "rect";
pos = pstr.indexOf(key);
while ( pos != -1 ) {
count++;
pos = pstr.indexOf(key,pos+1);
}
key = "line";
pos = pstr.indexOf(key);
while ( pos != -1 ) {
count++;
pos = pstr.indexOf(key,pos+1);
}
}

//zDataText = '<b>frame:</b> '+uFrame+'<br><b>layer:</b> '+uLayer
zDataText = '<b>layer:</b> '+uLayer
zDataText+='<br><b>keyframe:</b>'+ziskeyframe+'<br><b>selected:</b> '+zisselected;
zDataText+='<br><b>empty:</b>' + zisempty;
if(zisempty == false){
zDataText+='<br><b>Total Objects:</b> ' + count/2;
}
if(uFrame == totalFrames){
zDataText+='<br><b>Last Frame</b>';
}
//zDataText+='<br><b>Preview:</b><br>' +  canvasframepreview.replace('_moz-userdefined=""','');
//document.getElementById("ToolTipData").innerHTML=zDataText
if(zisempty == false){
zDataText += "<div id='timPreDiv' style='width: 120px; height: 68px;border: 1px black solid;z-index: 100000'></div>";
setTimeout("generateFramePreview("+uFrame+")",500);
}else{
zDataText += "<div id='timPreDiv' style='width: 120px; height: 68px;border: 1px black solid;z-index: 100000'><center>No Preview Availiable</center></div>";
}
return zDataText;



}

function generateFramePreview(frameNumber){
if(document.getElementById("timPreDiv")){
document.getElementById("timPreDiv").innerHTML = "";
var svgNamespace = 'http://www.w3.org/2000/svg';
var newSVGE = document.createElementNS(svgNamespace,"svg")
newSVGE.setAttributeNS(null, "viewBox", "0 0 480 272");
document.getElementById("timPreDiv").appendChild(newSVGE);
var rdX = $("richdraw" + frameNumber).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
document.getElementById("timPreDiv").firstChild.appendChild(newShape);
}catch(err){}
}
}
}


function changeInnerHTML (elm, txt) {
	if(document.getElementById) {
	var el = document.getElementById(elm);
	el.innerHTML = el.innerHTML + txt;
	return true;
	}
	return false;
}


function overwriteInnerHTML (elm, txt) {
	if(document.getElementById) {
	var el = document.getElementById(elm);
	el.innerHTML =  txt;
	return true;
	}
	return false;
}


//<div id="frameContainer" onmouseover="document.body.style.cursor='default';" style="width:100%;overflow:scroll"></div>
