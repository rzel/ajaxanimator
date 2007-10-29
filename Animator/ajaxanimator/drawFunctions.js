ajaxanimator.onReady(function(){

$("fillcolor").style.backgroundImage = "url('"+imgURL+"/bucket.png')"
$("linecolor").style.backgroundImage = "url('"+imgURL+"/pencil.png')"

$("fillcolor").style.backgroundColor = "#ff0000"
$("linecolor").style.backgroundColor = "#000000"

var genDB = new Array(
	"select|select.gif",
	"rect|rectangle.gif",
	"roundrect|roundrect.gif",
	"ellipse|circle.gif",
	"line|line.gif",
	"delete|delete.gif"
	)
	var tbdiv = document.getElementById("tbIcon")
	var toolTable = document.createElement("table")
	var toolTBody = document.createElement("tbody")
	var tObjCnt = 0;
	for(var tRowN = 0; tRowN < 3; tRowN++){
	var tRow = document.createElement("tr")
	for(var tColN = 0; tColN < 2; tColN++){
	var tCol = document.createElement("td")
	var tsAD = genDB[tObjCnt].split("|")
	tObjCnt++;
	var tCDiv = document.createElement("div")
	tCDiv.id = tsAD[0]
	tCDiv.className = "toolbarItem"
	var tcvDiv = document.createElement("div")
	tcvDiv.className = "centerVertical"
	var tvImg = document.createElement("img")
	tvImg.src = imgURL+"/"+tsAD[1]
	tvImg.className = "toolbarItem";
	tcvDiv.appendChild(tvImg)
	tCDiv.appendChild(tcvDiv)
	tCol.appendChild(tCDiv)
	tRow.appendChild(tCol)
	}
	toolTBody.appendChild(tRow)
	}
	toolTable.appendChild(toolTBody)
	tbdiv.appendChild(toolTable)
})

var drawTools = new Object();
drawTools.select = function(){setMode('select', 'Selection');}
drawTools.rect = function(){setMode('rect', 'Rectangle');}
drawTools.roundrect = function(){setMode('roundrect', 'Rounded Rectangle');}
drawTools.ellipse = function(){setMode('ellipse', 'Ellipse / Circle');}
drawTools.line = function(){setMode('line', 'Line');}

var iconId;
var lineWidth;

ajaxanimator.onReady(function(){
iconId = new Array("select","rect","roundrect","ellipse","line","delete") 
for(var iid = 0; iid < iconId.length; iid++){
(function(id){
Ext.get(id).on("mouseover",function(){
if($(id).style.backgroundImage.indexOf("selectedMask") == -1){
$(id).style.backgroundImage = "url("+imgURL+"/buttonMask.png)"
}
})
Ext.get(id).on("mouseout",function(){
if($(id).style.backgroundImage.indexOf("buttonMask") != -1){
$(id).style.backgroundImage = ""
}
})
Ext.get(id).on("click",function(){
if(id == "delete"){
changeSelectedUI("delete")
deleteShape()
setTimeout("drawTools.select();",100);//some eyecandy
}else{
drawTools[id]()
}
})
})(iconId[iid])
}


    var lineWidthStore = new Ext.data.SimpleStore({
        fields: ['size'],
        data : [["1px"],["2px"],["3px"],["4px"],["5px"],["6px"],["7px"],["8px"],["9px"],["10px"],
		["11px"],["12px"],["13px"],["14px"]]
    });
    lineWidth = new Ext.form.ComboBox({
        store: lineWidthStore,
        displayField:'size',
        typeAhead: true,
        mode: 'local',
		value: "1px",
        triggerAction: 'all',
		minLength: '1px',
        selectOnFocus:true,
        resizable:true
    });
	lineWidth.on("select",function(c){
	setLineWidth()
	})
    lineWidth.applyTo('linewidth');
 })
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
	return;
	//renderer = new IESVGRenderer();
    }
    DrawCanvas[currentCanvas] = new RichDrawEditor(document.getElementById('richdraw'+currentCanvas), renderer);
    DrawCanvas[currentCanvas].onselect = onSelect;
    DrawCanvas[currentCanvas].onunselect = onUnselect;
	$("CanvasContainer").onmouseup = function(){

	checkEdit();
	setSD();
	
	}
	if(totalFrames == 1){
	setCanvasDefaults();
	}else{

	editHistoryNumber++;
	addHistory("Add&nbsp;Frame")

	

	editHistory[editHistoryNumber] =  $("CanvasContainer").innerHTML
	setCanvasProperties();
	}
	isinit = true;
	setLayerData()
  }
  
  function refreshModeData(){

  if(DrawCanvas[currentCanvas]){
    DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
 }
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
	
	var LWidth = lineWidth.value;
    DrawCanvas[currentCanvas].editCommand('linewidth', LWidth);
	DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
  }
  function changeSelectedUI(id) {
  if(iconId){
    for(var iid = 0; iid < iconId.length; iid++){
	$(iconId[iid]).style.backgroundImage = "";
	}
	$(id).style.backgroundImage = "url("+imgURL+"/selectedMask.png)"
	}
  }
  function setMode(mode, status) {
	changeSelectedUI(mode)
	
    DrawCanvas[currentCanvas].editCommand('mode', mode);
	zCurrentCanvasMode = mode;
    if (mode == 'select'){
      $('status').innerHTML = 'Mode: Select/Move' ;

    }else{
      $('status').innerHTML = 'Mode: Draw ' + status;
	  }
  }
  
  function deleteShape() {
	if(DrawCanvas[currentCanvas].selected){
    DrawCanvas[currentCanvas].deleteSelection();
	addHistory("Delete Shape")
	}
  }
  
  function setFillColor(sfc) {
DrawCanvas[currentCanvas].editCommand('fillcolor', sfc);

  }
  
  function setLineColor(slc) {
DrawCanvas[currentCanvas].editCommand('linecolor', slc);
  }
  
  function setLineWidth() {
    var width = lineWidth.value;
    DrawCanvas[currentCanvas].editCommand('linewidth', width);
  }

  function showMarkup() {
    alert(value=DrawCanvas[currentCanvas].renderer.getMarkup());
  }
  
  function onSelect() {
  setLayerData()
    $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
	lineWidth.setValue(DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }

  function onUnselect() {
  setLayerData()
   $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
   lineWidth.setValue( DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }
  

  



