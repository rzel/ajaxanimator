 var DrawLayer = new Array();
 var DrawCanvas = new Array();
 var currentLayer = 1;
 var currentCanvas = 1;
 var zCurrentCanvasMode = 'rect';
 var editHistoryNumber = 0;
 var editHistory = new Array();
 var mouseIsDown = new Boolean();
 

 function setLayerData(){
 DrawLayer[currentLayer] = DrawCanvas;
 }

 function setLayer(LayerNumber){
 currentLayer = LayerNumber;
DrawCanvas  =DrawLayer[currentLayer] ;
 }
 
 function initDraw() {

    var renderer;
    ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
    opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    if ((!ie) || (opera)) {
      renderer = new SVGRenderer();
    }
    else {
      renderer = new VMLRenderer();
    }
    DrawCanvas[currentCanvas] = new RichDrawEditor(document.getElementById('richdraw'+currentCanvas), renderer);
    DrawCanvas[currentCanvas].onselect = onSelect;
    DrawCanvas[currentCanvas].onunselect = onUnselect;
	//$("CanvasContainer").onmousedown = startDown;
	$("CanvasContainer").onmouseup = checkEdit;
	//$("CanvasContainer").onclick = checkEdit;
	if(totalFrames == 1){
	setCanvasDefaults();
	}else{
	 addHistory("Add&nbsp;Frame")
		setCanvasProperties();
	}
	isinit = true;
	setLayerData()
  }
  
  function refreshModeData(){
    DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
  setTimeout('refreshModeData()',1000);
  }
  
  
  
  function setCanvasDefaults(){
    DrawCanvas[currentCanvas].editCommand('fillcolor', 'rgb(255,0,0)');
    DrawCanvas[currentCanvas].editCommand('linecolor', 'rgb(0,0,0)');
    DrawCanvas[currentCanvas].editCommand('linewidth', '1px');
    setMode('rect', 'Rectangle');
    $('fillcolor').style.backgroundColor = 'rgb(255,0,0)';
    $('linecolor').style.backgroundColor = 'rgb(0,0,0)';
  }
  
    function setCanvasProperties(){
    DrawCanvas[currentCanvas].editCommand('fillcolor', $('fillcolor').style.backgroundColor);
    DrawCanvas[currentCanvas].editCommand('linecolor', $('linecolor').style.backgroundColor);
	
	var LWidth = $('linewidth').options[$('linewidth').selectedIndex].value;
    DrawCanvas[currentCanvas].editCommand('linewidth', LWidth);
	DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
  }
  
  function setMode(mode, status) {
    DrawCanvas[currentCanvas].editCommand('mode', mode);
	zCurrentCanvasMode = mode;
    if (mode == 'select')
      $('status').innerHTML = 'Mode: Select/Move' ;
    else
      $('status').innerHTML = 'Mode: Draw ' + status;
  }
  
  function deleteShape() {
    DrawCanvas[currentCanvas].deleteSelection();
	addHistory("Delete Shape")
  }
  
  function setFillColor() {

    DrawCanvas[currentCanvas].editCommand('fillcolor', $('fillcolor').style.backgroundColor);
  }
  
  function setLineColor() {

    DrawCanvas[currentCanvas].editCommand('linecolor', $('linecolor').style.backgroundColor);
  }
  
  function setLineWidth(widths) {
    var width = widths.options[widths.selectedIndex].value;
    DrawCanvas[currentCanvas].editCommand('linewidth', width);
  }

  function getOptionByValue(select, value)
  {
    for (var i=0; i<select.length; i++) {
      if (select.options[i].value == value) {
        return i;
      }
    }
    return -1;
  }

  function showMarkup() {
    alert(value=DrawCanvas[currentCanvas].renderer.getMarkup());
  }
  
  function onSelect() {
  setLayerData()
    $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
	$('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }

  function onUnselect() {
  setLayerData()
   $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
   $('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }
  
  function randomRect(){
  var svgNamespace = 'http://www.w3.org/2000/svg';
 var newRect = document.createElementNS(svgNamespace,"rect");
      newRect.setAttributeNS(null,"width",Math.random() * 100);	
      newRect.setAttributeNS(null,"height",Math.random() * 100);		
      newRect.setAttributeNS(null,"x",Math.random() * 250);		
      newRect.setAttributeNS(null,"y",Math.random() * 180 + 60);	
      newRect.setAttributeNS(null,"fill-opacity",Math.random());		
      var red = Math.round(Math.random() * 255);
      var green = Math.round(Math.random() * 255);
      var blue = Math.round(Math.random() * 255);
      newRect.setAttributeNS(null,"fill","rgb("+ red +","+ green+","+blue+")");
      document.getElementById("richdraw1").firstChild.appendChild(newRect);
	  Event.observe(newRect, "mousedown", DrawCanvas[1].onHitListener);  
  }

  function openAnimation(){
  loadAnimation(unescape(uploadFrame.document.body.innerHTML))
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
totalFrames = 1;
currentFrameSelection = 1;
currentLayerSelection = 1;
addLayer()
makeCanvasFromIE(1)
gotoframe(1,1)
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
  }
function confirmNewCanvas(){
	if (confirm("Do you want to save before continuing?\n press Cancel to proceed anyways")) { 
		saveDialog();
	}else{
	newCanvas();
	}
}  
  
  
  
function loadAnimation(Axml){
newCanvas();
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
  	if ( data.constructor==Array){b+= esc( data.join("") );	return b;  };
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
}  //end function dataUrl
function revertRevision(numId){
//alert(editHistory[numId -1].id)
//alert(numId)
//$("TCContainer") = editHistory[numId -1]

loadAnimation( editHistory[numId])
editHistoryNumber++;
editHistory[editHistoryNumber] = $("CanvasContainer").innerHTML
addHistory("Revert to " + numId)

}

function addHistory(data){

 var tbl = document.getElementById('HistoryContainer');
  var lastRow = tbl.rows.length;
  //var row = tbl.insertRow(0);
  var row = tbl.insertRow(lastRow);
  var zxdy = editHistoryNumber;
  row.onmousedown = function(){
  revertRevision(zxdy)
  }
  var cellLeft = row.insertCell(0);

  var textNode = document.createTextNode(editHistoryNumber);
  cellLeft.appendChild(textNode);
  var cellRight = row.insertCell(1);
  var el = document.createElement('span');
  el.innerHTML = data
  cellRight.appendChild(el);

  
}
function undo(){
revertRevision(editHistoryNumber -1);
}

function checkEdit(event){
if (editHistory[editHistoryNumber] != $("CanvasContainer").innerHTML){
editHistoryNumber++;
editHistory[editHistoryNumber] = $("CanvasContainer").innerHTML

if(DrawCanvas[currentCanvas].mode != "select"){
var curM = DrawCanvas[currentCanvas].mode;
var result = "";
switch (curM) {
case 'rect': result = 'Rectangle'; break;
case 'roundrect': result = 'Rectangle'; break;
case 'ellipse': result = 'Ellipse'; break;
case 'line': result = 'Line'; break;
}

addHistory("Add&nbsp;" + result)

}else{
addHistory("Select/Move&nbsp;Object")
}


}
}


