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
  function randRectArr(){
  for(var items = 0; items < 30; items++){

  for(var rects = 0; rects < 10; rects++){
  randomRect()
  }
  gotoframe(items,1)
  removeKeyframe()
  }
  }