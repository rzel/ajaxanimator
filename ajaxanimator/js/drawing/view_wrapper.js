/*
/   wrapper : onlypaths :: view_wrapper : op_view
*/

//so basically this is a set of wrapper stuff for op_view, or RichDrawViewer. Its a simplified version of onlypaths that has no dependencies
//for sole drawing of crap

//the indentation here is screwed cause im using a diffrent ide to make this.


Ax.framerate = 12;
//*

Ax.init_view_core = function(element){
  element.innerHTML = "";
  element.style.height = Ax.canvasHeight+"px";
  element.style.width = Ax.canvasWidth+"px"
  
  if(Ext.isIE == true){
    var renderer = new VMLRenderer();
  }else{
    var renderer = new SVGRenderer();
  }
  return new RichDrawViewer(element, renderer);
}

Ax.viewer_load_frame = function(frame, markup, canvas){
  //note: this function is not multi-layer friendly yet.
  //un-note: this function should be multi-layer friendly, but layers aren't even really supported so i donno
  canvas.renderer.removeAll();
  var layers = markup.layers
  for(var layer in layers){
    if(layers[layer].keyframes.sort(function(a,b){return b - a})[0] == frame){
		return 0;
	}

		if(layers[layer].keyframes.indexOf(frame) != -1){
			Ax.loadShapes(layers[layer].src[frame],  true, canvas);
		}else{
		  Ax.loadShapes(Ax.getSFTween(frame, 
											Ax.largest_nonempty(frame,layer,layers), 
											Ax.smallest_nonempty(frame,layer,layers),
											layer,layers[layer].src),  true, canvas);
		}
    
  }
  return frame
}



//*/