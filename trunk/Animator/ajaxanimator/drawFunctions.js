var drawTools = new Object();
drawTools.select = function(){setMode('select', 'Selection');}
drawTools.rect = function(){setMode('rect', 'Rectangle');}
drawTools.roundrect = function(){setMode('roundrect', 'Rounded Rectangle');}
drawTools.ellipse = function(){setMode('ellipse', 'Ellipse / Circle');}
drawTools.line = function(){setMode('line', 'Line');}

var iconId = new Array("select","rect","roundrect","ellipse","line","delete") 
 
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
	if(!initHistory){
	addJS("../ajaxanimator/historyManagement.js",function(){
	checkEdit();
	setSD();
	initHistory = "true";
	})
	}else{
	checkEdit();
	setSD();
	}
	}
	if(totalFrames == 1){
	setCanvasDefaults();
	}else{
	if(!initHistory){
	addJS("../ajaxanimator/historyManagement.js",function(){
	editHistoryNumber++;
	addHistoryTO("Add&nbsp;Frame")
	initHistory = "true";
	})
	}else{
	editHistoryNumber++;
	addHistoryTO("Add&nbsp;Frame")
	initHistory = "true";	
	}

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
	
	var LWidth = $('linewidth').options[$('linewidth').selectedIndex].value;
    DrawCanvas[currentCanvas].editCommand('linewidth', LWidth);
	DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
  }
  function changeSelectedUI(id) {
    for(var iid = 0; iid < iconId.length; iid++){
	$(iconId[iid]).style.backgroundImage = "";
	}
	$(id).style.backgroundImage = "url(../images/selectedMask.png)"
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
  
  function setLineWidth(widths) {
    var width = widths.options[widths.selectedIndex].value;
    DrawCanvas[currentCanvas].editCommand('linewidth', width);
  }

  function showMarkup() {
    alert(value=DrawCanvas[currentCanvas].renderer.getMarkup());
  }
  
  function onSelect() {
  setLayerData()
    $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
	//$('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }

  function onUnselect() {
  setLayerData()
   $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
   $('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }
  

  



