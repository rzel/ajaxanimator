/////////////////NEW TWEENING ENGINE/////////////////////

/////////////////Updating again..... V 3.0 !!! 
///... just kidding, it's just version 2.42 (because i like 42 and it's the meaning of life)

function parseDiff(faXd,saXd){ //Yay 3.0!
	function gtn(el){return el.tagName.toString().toLowerCase()}
	var sXd = saXd.cloneNode(true)
	var fXd = faXd.cloneNode(true)
	if(fXd.childNodes.length==sXd.childNodes.length){
		var lng = fXd.childNodes.length
		var plng = 0;
		for(var i = 0; i < fXd.childNodes.length; i++){
			var fcn = fXd.childNodes[i]
			var scn = sXd.childNodes[i]

			if(gtn(fcn)==gtn(scn)){	
				if(gtn(fcn)=="rect"){
				if(fcn.getAttribute("x")==scn.getAttribute("x")){
					if(fcn.getAttribute("y")==scn.getAttribute("y")){
						plng++
					}
				}
				}
				
				if(gtn(fcn)=="line"){
				if(fcn.getAttribute("x1")==scn.getAttribute("x1")){
					if(fcn.getAttribute("y1")==scn.getAttribute("y1")){
						if(fcn.getAttribute("x2")==scn.getAttribute("x2")){
							if(fcn.getAttribute("y2")==scn.getAttribute("y2")){
								plng++
							}
						}	
					}
				}
				}
				
				if(gtn(fcn)=="ellipse"){
				if(fcn.getAttribute("cx")==scn.getAttribute("cx")){
					if(fcn.getAttribute("cy")==scn.getAttribute("cy")){
						if(fcn.getAttribute("rx")==scn.getAttribute("rx")){
							if(fcn.getAttribute("ry")==scn.getAttribute("ry")){
								plng++
							}
						}	
					}
				}
				}
			}	
			
		}
		if(lng==plng){
			return "S1"
		}else{
			return "D2"
		}
	}else{
		return "D1"
	}
}



var autotween = true; //so 1337 users can optimize speed by knowing when to enable tweening (a major slowing factor)
//Okay, so now it's easy to use...

function createTween(startFrame,endFrame){
if(!autotween){return}
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

if(sf.childNodes[i].tagName.toString().toLowerCase() == "ellipse"){ //W00T! New Ellipse support, now it supports EVERYTHING

var xRectDist = getDist(nsf,ef.childNodes[i],"cx")/tf
var yRectDist = getDist(nsf,ef.childNodes[i],"cy")/tf
nsf.setAttribute("cx", parseInt(nsf.getAttribute("cx"))+(xRectDist*td))
nsf.setAttribute("cy", parseInt(nsf.getAttribute("cy"))+(yRectDist*td))
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
if(Axml.indexOf("Error")>0){
Ext.log(Axml)
}
var svgNamespace = 'http://www.w3.org/2000/svg';
if(DrawCanvas[frame] == null){gotoframeMinimal(frame,1);}//create frame

if ( DrawCanvas[frame].renderer.svgRoot.hasChildNodes() ){
while ( DrawCanvas[frame].renderer.svgRoot.childNodes.length >= 1 ){
DrawCanvas[frame].renderer.svgRoot.removeChild( DrawCanvas[frame].renderer.svgRoot.firstChild );			 
} 
}
var domFrame = parseSVG(Axml).firstChild; //svg

for(var cId = 0; cId < domFrame.childNodes.length; cId++){
var cNode = domFrame.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttribute( cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[frame].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[frame].onHitListener);	
}
}


//timPreDiv

function parseSVG(Axml){
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
return domContainer
}