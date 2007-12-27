
var iconId;
var lineWidth;



 function setLayerData(){
 DrawLayer[currentLayer] = DrawCanvas;
 }


 function setLayer(LayerNumber){
 currentLayer = LayerNumber;
DrawCanvas  =DrawLayer[currentLayer] ;
 }
 
 function initDraw(sFc) {
    var canvasFrame = sFc?sFc:currentCanvas
   // var renderer;
    //ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
    //opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    //if ((!ie) || (opera)) {
     var renderer = new SVGRenderer();
    //}
    //else {
	//return;
	//renderer = new IESVGRenderer();
    //}
    DrawCanvas[canvasFrame] = new RichDrawEditor(document.getElementById('richdraw'+canvasFrame), renderer);
    DrawCanvas[canvasFrame].onselect = onSelect;
    DrawCanvas[canvasFrame].onunselect = onUnselect;

/*

$("CanvasContainer").style.width = canvasWidth*(currentZoom/100)+"px"
$("CanvasContainer").style.height = canvasHeight*(currentZoom/100)+"px"


*/
	$("CanvasContainer").onmouseup = function(){

	checkEdit();
	setSD();
	
	}
	if(totalFrames == 1){
	setCanvasDefaults();
	}else{

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
  

  



