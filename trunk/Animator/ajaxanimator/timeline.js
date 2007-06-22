//Global Variables
var layers = 0;
var kFrameCount = 0;
var currentFrameSelection = 1;
var currentLayerSelection = 1;
var KeyFrames = new Array()
var zDataText = "";
var totalFramesPerLayer = 500;
//End Global Variables


//Color Variables
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
	var zframe;
	zframe = document.getElementById("frame" + framenumber + "layer" + layer);
	zframe.style.color = frameTextColor;
	zframe.style.backgroundColor=KeyframeColor;
	KeyFrames[kFrameCount] = framenumber + "," + layer
	kFrameCount = kFrameCount + 1
	gotoframeInterface(framenumber,layer);
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


function gotoframeInterface(framenumber,layer){
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
	aframe.style.color = "black";
	aframe.style.backgroundColor=FrameColor;
	}
	if(wasKeyFrame == true){
	aframe.style.color = frameTextColor;
	aframe.style.backgroundColor=KeyframeColor;
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
	frame.style.color = "#F2F2F2";
	frame.style.backgroundColor="#3579DC";
	}

}

function repeatChecks(){
checkFrame(currentFrameSelection,currentLayerSelection);

setTimeout("repeatChecks()",500);
}

repeatChecks()

function checkFrame(oFrame, oLayer){
try{
var zisempty = false;
if(DrawCanvas[oFrame] == null){
zisempty = true;
}else{
if(DrawCanvas[oFrame].renderer.getMarkup().replace(" ","") == "<svg></svg>"){
zisempty = true;
}
}
if(zisempty == false){
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

function gotoframe(framenumber, layer) //Function to change the current selected frame
{
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
	if(document.all){
	makeCanvasFromIE(framenumber);	
	}else{
	makeCanvasFromId(framenumber);
	}
	}
	showCurrentCanvas();
 checkFrame(framenumber, layer);

}
}



function removeKeyframe(){ //Function to delete selected keyframe
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
	
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	KeyFrames[m] = "0,0";
	}
	}
	
	gotoframe(currentFrameSelection,currentLayerSelection);
	
	}
	}
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
return zDataText;
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
