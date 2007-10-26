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
	layerCount = 0;
	keyframeArray = new Array();
	tweenArray = new Array();
	currentFrame = 1;
	currentLayer = 1;
	totalFrames = 1;
	layerCount = 0;
	frameTable = null;
	addLayer()
	makeCanvasFromIE(1)
	gotoframe(1,1)
	}

	function newAnimation(){
	newCanvas();
	resetHistory();
	}



function confirmNewCanvas(){

 Ext.MessageBox.show({
           title:'Save Changes?',
           msg: 'Save Changes?',
           buttons: Ext.MessageBox.YESNOCANCEL,
           icon: Ext.MessageBox.QUESTION,
		   fn: function(a){
		   if(a == "no"){
		   newAnimation();
		   return
		   }
		   if(a == "yes"){
		   showFileSystemDialog()
		   return
		   }
		   if(a == "cancel"){
		   return
		   }
		   }
})
}	
	
	
	
function loadAnimation(Axml){
newCanvas();
cloneFrameEnabled = false;
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
setCanvasProperties()
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
var domContainer;
if (window.ActiveXObject){
domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
domContainer=parser.parseFromString(rdX,"text/xml");
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
var domContainer;
if (window.ActiveXObject){
domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
domContainer=parser.parseFromString(rdX,"text/xml");
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
var domContainer;
if (window.ActiveXObject){
domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
domContainer=parser.parseFromString(rdX,"text/xml");
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
saveIframe.src = dataUrl(escape(animationSaveData()), "application/ajaxanimator")
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
