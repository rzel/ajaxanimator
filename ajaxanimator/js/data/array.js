/**
 * @author antimatter15
 * Somewhat of an API for developing random format supports
 */

Ax.export_array = function(){ //returns an array of every single frame (single layered) tweened when necessary


var layers = Ax.export_animation_core(), output = [];
for(var layer in layers){
	if (layers[layer].keyframes.indexOf(frame) != -1) {
		
	}else{
		
	}
}

  for(var layer in layers){
  //alert([1, 2, 3, 4, 5].indexOf(2))
		if(layers[layer].keyframes.indexOf(frame) != -1){
			Ax.loadShapes(layers[layer].src[frame],  true, canvas);
		}else{
		  Ax.loadShapes(((tweenfunc)?tweenfunc:Ax.getSFTween)(frame, 
											Ax.largest_nonempty(frame,layer,layers), 
											Ax.smallest_nonempty(frame,layer,layers),
											layer,layers[layer].src),  true, canvas);
		}
    if(layers[layer].keyframes.sort(function(a,b){return b - a})[0] == frame){
  		return 0;
		}
  }
  return frame
	
}
 