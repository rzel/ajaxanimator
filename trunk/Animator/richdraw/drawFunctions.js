 var DrawCanvas = new Array();
 var currentCanvas = 1;
 
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
	setCanvasDefaults();
	if(isinit == false){
		setTimeout("canvasFix();",1000);
	}
	isinit = true;
	
	
  }
  
  
  
  function setCanvasDefaults(){
    DrawCanvas[currentCanvas].editCommand('fillcolor', 'red');
    DrawCanvas[currentCanvas].editCommand('linecolor', 'black');
    DrawCanvas[currentCanvas].editCommand('linewidth', '1px');
    setMode('rect', 'Rectangle');
    $('fillcolor').style.backgroundColor = 'red';
    $('linecolor').style.backgroundColor = 'black';
  }
  
  function setMode(mode, status) {
    DrawCanvas[currentCanvas].editCommand('mode', mode);
   

    
    if (mode == 'select')
      $('status').innerHTML = 'Mode: Select/Move' ;
    else
      $('status').innerHTML = 'Mode: Draw ' + status;
  }
  
  function deleteShape() {
    DrawCanvas[currentCanvas].deleteSelection();
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
    $('fillcolor').selectedIndex = getOptionByValue($('fillcolor'), DrawCanvas[currentCanvas].queryCommand('fillcolor'));
    $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').selectedIndex = getOptionByValue($('linecolor'), DrawCanvas[currentCanvas].queryCommand('linecolor'));
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
    $('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }

  function onUnselect() {
    $('fillcolor').selectedIndex = getOptionByValue($('fillcolor'), DrawCanvas[currentCanvas].queryCommand('fillcolor'));
    $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').selectedIndex = getOptionByValue($('linecolor'), DrawCanvas[currentCanvas].queryCommand('linecolor'));
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
    $('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }
