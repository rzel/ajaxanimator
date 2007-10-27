/*Variables*/
var keyframeArray = new Array();
var tweenArray = new Array();
var currentFrame = 1;
var currentLayer = 1;
var totalFrames = 1;
var layerCount = 0;
var frameTable;
/* Helper Functions */
function getObjects(frame){

return DrawCanvas[frame].renderer.svgRoot.childNodes.length

}
function setFrameClass(classID,obj){
if(!obj){
obj = getFrameObj()
}
if(typeof(obj)!="string"){
obj.className = classID;
}else{
setFrameClass(classID,$(obj))
}
}

function getFrameObj(frame,layer){
if(frame&&layer){
return $("frame"+frame+"layer"+layer);
}else{
return getFrameObj(currentFrame,currentLayer);
}
}


function isKeyframe(frame,layer){
if(frame&&layer){
if(keyframeArray.join(";").indexOf(frame+","+layer) != -1){
return true;
}else{
return false;
}
}else{
return isKeyframe(currentFrame,currentLayer);
}
}
/*Main Functions*/

function nextFrame(){
gotoframe(parseInt(currentFrame)+1,1)
}
function preFrame(){
gotoframe(parseInt(currentFrame)-1,1)
}
function firstFrame(){
gotoframe(1,1)
}
function lastFrame(){
gotoframe(parseInt(totalFrames),1)
}
function setLastFrame(frame){
if(!frame){
totalFrames = currentFrame
gotoframe(currentFrame,currentLayer)
}else{
totalFrames = frame
reRender("td[class=lastFrame]")
setFrameClass("lastFrame",getFrameObj(totalFrames,currentLayer)) 
renderFrame(frame,currentLayer)
}
}
function toKeyframe(frame,layer){
frame = (frame)?frame:currentFrame
layer = (layer)?layer:currentLayer
keyframeArray.push(frame+","+layer)
gotoframe(frame,layer)
}

function removeKeyframe(frame,layer){
frame = (frame)?frame:currentFrame
layer = (layer)?layer:currentLayer
keyframeArray = keyframeArray.join(";").split(frame+","+layer+";").join("").split(";")
gotoframe(frame,layer)
}

function basicGotoframeUI(frame,layer){
frame=(frame)?frame:currentFrame
layer=(layer)?layer:currentLayer
renderFrame(currentFrame,currentLayer,true)
renderFrame(frame,layer)
}

function renderFrame(frame,layer,deselect){
frame = (frame)?frame:currentFrame
layer = (layer)?layer:currentLayer
var ud = (deselect)?"un":"";
if(isKeyframe(frame,layer)){ 
setFrameClass(ud+"selKeyframe",getFrameObj(frame,layer)) 
}else{
setFrameClass(ud+"selFrame",getFrameObj(frame,layer)) 
}
}

function reRender(key){
var  ojr=Ext.select(key)['elements']
for(var alf = 0; alf < ojr.length; alf++){
var lfc = ojr[alf].id.replace("frame","").split("layer");
renderFrame(lfc[0],lfc[1],true)
}
}


function gotoframeUI(frame,layer){
frame=(frame)?frame:currentFrame
layer=(layer)?layer:currentLayer
basicGotoframeUI(frame,layer)
reRender("td[class=lastFrame]")
setFrameClass("lastFrame",getFrameObj(totalFrames,currentLayer)) 
renderFrame(frame,layer)
currentFrame = frame
currentLayer = layer
}

function gotoframe(frame,layer){
if(typeof(frame)!=typeof(42)){frame=parseInt(frame)}
if(typeof(layer)!=typeof(42)){layer=parseInt(layer)}
if(frame<1){return}
var cL=frameTable.firstChild.childNodes[currentLayer-1].childNodes.length-1
if(frame>cL){for(var p=1;p<frame-cL;p++){addFrame();}
$("frameContainer").scrollLeft=$("frameContainer").scrollWidth}
if(frame>totalFrames){totalFrames=frame}

gotoframeCanvas(frame,layer)
gotoframeUI(frame,layer);
}

function gotoframeCanvas(frame,layer){
DrawCanvas[currentCanvas].unselect();
previousCanvas = currentCanvas;
hideCurrentCanvas();
currentCanvas = frame;
if(DrawCanvas[currentCanvas]==null){
makeCanvasFromId(frame);
if(getObjects(previousCanvas) > 0){
cloneFrame(previousCanvas)
}
}
showCurrentCanvas();
setCanvasProperties();
}
function initTimelineTable(frameContainer){
frameTable = document.createElement("table");
frameTable.className = "timeline";
frameTable.setAttribute("cellspacing","0px")
frameTable.setAttribute("border","1px")
frameTable.setAttribute("width","100%")
frameTable.appendChild(document.createElement("tbody"))
frameContainer.appendChild(frameTable)
}

function addFrame(frameNumber){
if(!frameNumber){
var timeLayer = frameTable.firstChild.childNodes[currentLayer-1]
i = timeLayer.childNodes.length;
}else{
i=frameNumber
}
var nFrame = document.createElement("td");
setFrameClass("unselFrame",nFrame)
nFrame.id = "frame"+i.toString()+"layer"+layerCount.toString()
nFrame.innerHTML = i.toString();
nFrame.onmousedown = function(e){
try{
var eventObj = (!e)?window.event.srcElement:e.target
var evArray = eventObj.id.replace("frame","").split("layer")
gotoframe(evArray[0],evArray[1])
}catch(err){}
}
nFrame.onmouseover = function(e){
try{
var eventObj = (!e)?window.event.srcElement:e.target
var evArray = eventObj.id.replace("frame","").split("layer")
Tip(tooltipData(evArray[0],evArray[1]),TITLE, 'Frame&nbsp;'+evArray[0]);
}catch(err){}
}
if(frameNumber){
return nFrame;
}else{
timeLayer.appendChild(nFrame)
}
}

function addLayer(){
layerCount++; //register new layer
if(!frameTable){
initTimelineTable($("frameContainer"))
}
var fBody = frameTable.firstChild
var nLayer = document.createElement("tr")
nLayer.className=""
var layerTitle = document.createElement("td")
layerTitle.innerHTML = "Layer&nbsp;"+layerCount.toString();
layerTitle.className = "layerTitle"
nLayer.appendChild(layerTitle)
for(var i = 1; i < 300; i++){
nLayer.appendChild(addFrame(i))
}
fBody.appendChild(nLayer)
}


function tooltipData(frame,layer){
var tData = "";
bold = function(str){return "<b>"+str+"</b>"}
format = function(title,info){
tData+="<table cellspacing='0px' border='0px' width='100%'><tr><td>"+bold(title+":")+"</td><td align='right'>"+info+"</td></tr></table>"}
format("frame",frame)
format("layer",layer)
format("selected",((currentFrame==frame)?"true":"false"))
if(typeof(DrawCanvas)!=typeof(undefined)&&(DrawCanvas[frame])?((DrawCanvas[frame].renderer.getMarkup().length>15)?"false":"true"):"true" == false){
format("empty","false")
format("total objects",DrawCanvas[frame].renderer.svgRoot.childNodes.length)
}else{
format("empty","true")
}
tData+="<div id='timPreDiv' class='previewTooltip'><center>No Preview Availiable</center></div>"
return tData;
}
