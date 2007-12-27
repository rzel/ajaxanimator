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
AnimationPlay = true;
canvasIssueResolved = false;



function makeCanvasFromIE(CanvasId){
var canvasString;
//canvasString='<div id="richdraw'+CanvasId+'" class="animationDisplay" style="';
canvasString='<div id="richdraw'+CanvasId+'" style="';
canvasString+='display:'+canvasDisplayStyle+';height: 100%; width: 100%"></div>';
document.getElementById("CanvasContainer").innerHTML+=canvasString;
canvasDisplayStyle = "none";
initDraw(CanvasId);
}


function makeCanvasFromId(CanvasId){
var richdrawCanvas = document.createElement('div');
//richdrawCanvas.setAttribute("class","animationDisplay")
richdrawCanvas.setAttribute('id','richdraw'+CanvasId);
richdrawCanvas.setAttribute('style',"display:"+canvasDisplayStyle+";height: 100%; width: 100%");
document.getElementById('CanvasContainer').appendChild(richdrawCanvas);
canvasDisplayStyle = 'none'
initDraw(CanvasId);
}

function setCP(){

$('CanvasContainer').style.height = canvasHeight+ 'px';
$('CanvasContainer').style.width =  canvasWidth + 'px';

$('zFlashPreviewDiv').style.height = canvasHeight + 'px';
$('zFlashPreviewDiv').style.width = canvasWidth + 'px';
}



function generateAnimationXML(){
DrawCanvas[currentCanvas].unselect();
var zAnimationXML = "<AnimationXML>";
for(var pzxy = 1; pzxy <= totalFrames;pzxy++){
if(DrawCanvas[pzxy] != null && DrawCanvas[pzxy].renderer.getMarkup() != "<svg></svg>"){
var zCurrentAnimationXMLFrame;
zCurrentAnimationXMLFrame =  DrawCanvas[pzxy].renderer.getMarkup();
zAnimationXML += zCurrentAnimationXMLFrame;
}else{
if(isKeyframe(pzxy,1) != false){
zAnimationXML += "<svg></svg>"
}else{
zAnimationXML += '<svg t="f"></svg>'
}
}
}
zAnimationXML += "</AnimationXML>";
return zAnimationXML;
}




function initCanvas(){
makeCanvasFromIE(1);
gotoframe(1,1);
}


