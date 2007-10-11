/////////////////NEW TWEENING ENGINE/////////////////////




function createTween(startFrame,endFrame){

if(!DrawCanvas[startFrame] || !DrawCanvas[endFrame]){return;}
var sf=(new DOMParser()).parseFromString(DrawCanvas[startFrame].renderer.getMarkup(),"text/xml").firstChild;
var ef=(new DOMParser()).parseFromString(DrawCanvas[endFrame].renderer.getMarkup(),"text/xml").firstChild;
var tf = endFrame - startFrame
if(sf.length != ef.length){return;}

var nf = new Array();
for(var gf = 0; gf < tf; gf++){
nf[gf]=sf.cloneNode(true)
}


for(var i = 0; i < sf.childNodes.length; i++){
for(var td=0;td<tf;td++){
var nsf = nf[td].childNodes[i]

if(sf.childNodes[i].tagName.toString().toLowerCase() == "rect"){

var xRectDist = getDist(nsf,ef.childNodes[i],"x")/tf
var yRectDist = getDist(nsf,ef.childNodes[i],"y")/tf
nsf.setAttribute("x", parseInt(nsf.getAttribute("x"))+(xRectDist*td))
nsf.setAttribute("y", parseInt(nsf.getAttribute("y"))+(yRectDist*td))
}

if(sf.childNodes[i].tagName.toString().toLowerCase() == "line"){

var xLineDist = getDist(nsf,ef.childNodes[i],"x1")/tf
var yLineDist = getDist(nsf,ef.childNodes[i],"y1")/tf

nsf.setAttribute("x1", parseInt(nsf.getAttribute("x1"))+(xLineDist*td))
nsf.setAttribute("y1", parseInt(nsf.getAttribute("y1"))+(yLineDist*td))
nsf.setAttribute("x2", parseInt(nsf.getAttribute("x2"))+(xLineDist*td))
nsf.setAttribute("y2", parseInt(nsf.getAttribute("y2"))+(yLineDist*td))

}
}
}

renderTween(nf,startFrame)
}



function getDist(sf,ef,attr){
var x1 = parseInt(sf.getAttribute(attr))
var x2 = parseInt(ef.getAttribute(attr))
return x2-x1;
}




function renderTween(tweenNode,sf){
for(var cf=0;cf<tweenNode.length;cf++){

loadFrame((new XMLSerializer()).serializeToString(tweenNode[cf]),cf + sf);
}
}

function loadFrame(Axml,frame){
if ( DrawCanvas[frame].renderer.svgRoot.hasChildNodes() ){
while ( DrawCanvas[frame].renderer.svgRoot.childNodes.length >= 1 ){
DrawCanvas[frame].renderer.svgRoot.removeChild( DrawCanvas[frame].renderer.svgRoot.firstChild );			 
} 
}
var svgNamespace = 'http://www.w3.org/2000/svg';
var domContainer;
if (window.ActiveXObject){
domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(Axml);
}else{
var parser=new DOMParser();
domContainer=parser.parseFromString(Axml,"text/xml");
}
var domFrame = domContainer.firstChild; //svg
if(DrawCanvas[frame] == null){gotoframe(frame,1);}//create frame
for(var cId = 0; cId < domFrame.childNodes.length; cId++){
var cNode = domFrame.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[frame].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[frame].onHitListener);	
}
}
