	function openAnimation(){
	loadAnimation(unescape(uploadFrame.document.body.innerHTML))
	resetHistory()
	}
	
	function newCanvas(){
	revisionNumber = 1;
	animationRevision = new Array();
	animationRevisionURL = new Array();
	lastAnimationURL = '';
	gotoframe(1,1)
	DrawCanvas = new Array();
	currentLayer = 1;
	currentCanvas = 1;
	$("CanvasContainer").innerHTML = "";
	KeyFrames = new Array();
	$("frameContainer").innerHTML = "";
	layers = 0;
	kFrameCount = 0
	TweenFrames = new Array()
	tFrameCount = 0;
	totalFrames = 1;
	currentFrameSelection = 1;
	currentLayerSelection = 1;
	addLayer()
	makeCanvasFromIE(1)
	gotoframe(1,1)
	}

	function newAnimation(){
	newCanvas();
	resetHistory();
	}



	function toggleLoadInput(){
	if($("STRINPT").style.display == "none"){
	$("STRINPT").style.display = ""
	}else{
	$("STRINPT").style.display = "none"
	}
	}
	
	function toggleSaveInput(){
	if($("STROUT").style.display == "none"){
	$("STROUT").style.display = ""
	}else{
	$("STROUT").style.display = "none"
	}
	}
	
 
	function saveAXTxt(){
	$("AXTxt").value = escape(animationSaveData());
	}
	
	function loadAXIT(){
	loadAnimation(unescape($("AXIT").value));
	resetHistory()
	}
function confirmNewCanvas(){
	if (confirm("Do you want to save before continuing?\n press Cancel to proceed anyways")) { 
		saveDialog();
	}else{
	newAnimation();
	}
}	
	
	
	
function loadAnimation(Axml){
newCanvas();
cloneFrameEnabled = false;
var svgNamespace = 'http://www.w3.org/2000/svg';
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(Axml);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(Axml,"text/xml");
}
var domAnimation = domContainer.firstChild;
for(var dId = 0; dId < domAnimation.getElementsByTagName("svg").length; dId++){
if(DrawCanvas[dId +1] == null){

gotoframe(dId + 1,1);
}
var domShape = domAnimation.getElementsByTagName("svg")[dId];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[dId +1].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[dId +1].onHitListener);	
}
catch(err)
{
}
}
}
cloneFrameEnabled == true;
}


function copyObj(){
if(DrawCanvas[currentCanvas].selected == null){
alert("Please Select an Object First");
}else{
clipboardTagStr = DrawCanvas[currentCanvas].selected.tagName;
clipboardAtt = DrawCanvas[currentCanvas].selected.attributes;
}
}

function pasteObj(){
try{
var svgNamespace = 'http://www.w3.org/2000/svg';
var newShape = document.createElementNS(svgNamespace , clipboardTagStr);
for(var aId = 0; aId < clipboardAtt.length; aId++){
newShape.setAttributeNS(null, clipboardAtt[aId].nodeName, clipboardAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);	
}catch(err){alert(err)}
}

function clonePreviousFrame(){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + (currentCanvas-1)).innerHTML
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
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);	
}
catch(err)
{
}
}
}
}


function cloneFrame(frame){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + frame).innerHTML
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
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);	
}
catch(err)
{
}
}
}
}


function moveFrameObj(distance){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + (currentCanvas)).innerHTML
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
if(cAtt[aId].nodeName != "x" && cAtt[aId].nodeName != "y"){

}

newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);	
}
catch(err)
{
}
}
}
}


function animationSaveData(){
return "<AnimationXML>" + $('CanvasContainer').innerHTML + "</AnimationXML>";
}

function saveAnimation(){
window.location = dataUrl(escape(animationSaveData()), "application/ajaxanimator")
}

function dataUrl(data, mimeType){ // turns a string into a url that appears as a file. (to ff/op/saf)
	 encType= (!!btoa) ? ";base64" : "";
	 var esc = (!!encType) ? function(d){return btoa(d);} : function(d){return escape(d);};
	 if(!mimeType){mimeType= (data.nodeName) ? "text\/html" :"text\/plain";};	
	 b="data:"+mimeType+";charset="+document.characterSet+encType+",";
	 
		if ("string number date boolean function".indexOf(typeof data) > -1){ b+=esc(data.toString()); return b; };	
		if ( data.constructor==Array){b+= esc( data.join("") );	return b;	};
	if(typeof data=="xml"){b+=esc(data.toSource()); return b;} //FF2 xml frag/doc
		//for more complicated data, attempt to determine the format.
	if(typeof data=="object"){ 
			if(!!data.value && !!data.value.length){b+=esc(data.value); return b;}; //input tags w/content
			if(!!data.innerHTML){b+=esc(data.innerHTML); return b;} //HTML tag
			if(!!data.length){ 		//weird stuff like nodelists
			var G=function(ob){r=[]; i=0; 
				for(i;i<ob.length;i++){
				if(dataUrl(ob[i])) r[i]=dataUrl(ob[i]);} return r.join("\n");};//end g
				return	(b+G(data));}//end if object w/length	
			if(!! eval(data.toSource()) ){b+=esc(data.toSource()); return b;}; //JSON
		}//end if object 
 return;
}	//end function dataUrl

function setSD(){
		if(DrawCanvas[currentCanvas].mode == "select" && DrawCanvas[currentCanvas].selected != null){
		
		$("ResizeObjOpt").style.display = ""
$("noSelectRem").style.display = "none"
		$('sHeight').value = DrawCanvas[currentCanvas].selected.attributes['height'].nodeValue;
		$('sWidth').value = DrawCanvas[currentCanvas].selected.attributes['width'].nodeValue;
}else{
$("ResizeObjOpt").style.display = "none"
$("noSelectRem").style.display = ""
}
		}
function setSP(){

DrawCanvas[currentCanvas].selected.attributes['width'].nodeValue	= $("sWidth").value
DrawCanvas[currentCanvas].selected.attributes['height'].nodeValue	= $("sHeight").value
DrawCanvas[currentCanvas].renderer.showTracker(DrawCanvas[currentCanvas].selected)
}


function createTween(firstFrame,secondFrame){
var startframesrc = document.getElementById("richdraw" + firstFrame).innerHTML
var endframesrc = document.getElementById("richdraw" + secondFrame).innerHTML
var tweenstr = "<AnimationXML>" + startframesrc + endframesrc + "</AnimationXML>";
var e=(new DOMParser()).parseFromString(tweenstr,"text/xml").firstChild.getElementsByTagName("svg");
if(e[1].childNodes.length == e[0].childNodes.length){//if same number of objects per frame
var tweens = secondFrame - firstFrame
var newE = new Array();
newE[0] = e[0].cloneNode(true)
for(var ctf=0;ctf<tweens;ctf++){
newE[ctf] = e[0].cloneNode(true)
}
for(var objIndex=0;objIndex<e[0].childNodes.length;objIndex++){
if(e[0].childNodes[objIndex].getAttribute("id") + e[1].childNodes[objIndex].getAttribute("id")){//if same ids
var x1 = parseInt(e[0].childNodes[objIndex].getAttribute("x"))
var x2 = parseInt(e[1].childNodes[objIndex].getAttribute("x"))
var xtDistance = x2-x1;
var y1 = parseInt(e[0].childNodes[objIndex].getAttribute("y"))
var y2 = parseInt(e[1].childNodes[objIndex].getAttribute("y"))
var ytDistance = y2-y1;
var xtDfP = xtDistance/tweens;
var ytDfP = ytDistance/tweens;
for(var tf=0;tf<tweens;tf++){
newE[tf].childNodes[objIndex].setAttribute("x", (xtDfP * tf) + x1)
newE[tf].childNodes[objIndex].setAttribute("y", (ytDfP * tf) + y1)
}
}
}
for(var cf=0;cf<newE.length;cf++){
loadFrame((new XMLSerializer()).serializeToString(newE[cf]),cf + firstFrame);
}
}
}

function loadFrame(Axml,frame){
if ( DrawCanvas[frame].renderer.svgRoot.hasChildNodes() ){
while ( DrawCanvas[frame].renderer.svgRoot.childNodes.length >= 1 ){
DrawCanvas[frame].renderer.svgRoot.removeChild( DrawCanvas[frame].renderer.svgRoot.firstChild );			 
} 
} 
var svgNamespace = 'http://www.w3.org/2000/svg';
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(Axml);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(Axml,"text/xml");
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
