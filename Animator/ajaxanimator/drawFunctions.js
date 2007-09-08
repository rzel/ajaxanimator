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
	return
	// renderer = new Renderer();
    }
    DrawCanvas[currentCanvas] = new RichDrawEditor(document.getElementById('richdraw'+currentCanvas), renderer);
    DrawCanvas[currentCanvas].onselect = onSelect;
    DrawCanvas[currentCanvas].onunselect = onUnselect;
	//$("CanvasContainer").onmousedown = startDown;
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
	//$("CanvasContainer").onclick = checkEdit;
	if(totalFrames == 1){
	setCanvasDefaults();
	}else{

	editHistoryNumber++;
	if(!initHistory){
	addJS("../ajaxanimator/historyManagement.js",function(){
	addHistoryTO("Add&nbsp;Frame")
	initHistory = "true";
	})
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
 // setSD();
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
    if (mode == 'select'){
      $('status').innerHTML = 'Mode: Select/Move' ;

    }else{
      $('status').innerHTML = 'Mode: Draw ' + status;
	  }
  }
  
  function deleteShape() {
    DrawCanvas[currentCanvas].deleteSelection();
	addHistory("Delete Shape")
  }
  
  function setFillColor(sfc) {
DrawCanvas[currentCanvas].editCommand('fillcolor', sfc);
    //DrawCanvas[currentCanvas].editCommand('fillcolor', $('fillcolor').style.backgroundColor);
  }
  
  function setLineColor(slc) {
DrawCanvas[currentCanvas].editCommand('linecolor', slc);
    //DrawCanvas[currentCanvas].editCommand('linecolor', $('linecolor').style.backgroundColor);
	//currentPreviewColor
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
      var red1 = Math.round(Math.random() * 255);
      var green1 = Math.round(Math.random() * 255);
      var blue1 = Math.round(Math.random() * 255);
	  var red2 = Math.round(Math.random() * 255);
      var green2 = Math.round(Math.random() * 255);
      var blue2 = Math.round(Math.random() * 255);
 var newRect = document.createElementNS(svgNamespace,"rect");
	  newRect.setAttributeNS(null,"stroke-width",Math.random() * 10);	
	  	  newRect.setAttributeNS(null,"stroke","rgb("+ red1 +","+ green1+","+blue1+")");
      newRect.setAttributeNS(null,"fill","rgb("+ red2 +","+ green2+","+blue2+")");
	        newRect.setAttributeNS(null,"height",Math.random() * 100);	
      newRect.setAttributeNS(null,"width",Math.random() * 100);	
      newRect.setAttributeNS(null,"y",Math.random() * 272);
      newRect.setAttributeNS(null,"x",Math.random() * 480);

      DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newRect);
	  Event.observe(newRect, "mousedown",DrawCanvas[currentCanvas].onHitListener);  
  }
  function appleAd(){
  for(var items = 0; items < 30; items++){

  for(var rects = 0; rects < 10; rects++){
  randomRect()
  }
  gotoframe(items,1)
  removeKeyframe()
  }
  }



