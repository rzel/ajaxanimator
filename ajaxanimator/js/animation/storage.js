Ax.canvas_storage = {}; //Initial data.

Ax.getshapes = function(frame,layer){
	//a very high-level function ish
	if(!frame){frame = Ax.tcurrent.frame}
	if(!layer){layer = Ax.tcurrent.layer}
	
	if(!Ax.canvas_storage[layer]){
		console.log("Error: NO LAYER OBJECT", Ax.canvas_storage[layer], Ax.canvas_storage, layer)
		return [];
	}
	
	if(Ax.canvas_storage[layer][frame]){
		console.log("OUT: KEYFRAME")
		return (Ax.canvas_storage[layer][frame]);
	}else if(Ax.smallest_nonempty(frame, layer) && Ax.largest_nonempty(frame, layer)){
		console.log("OUT: TWEEN")
		return Ax.getSFTween(frame, Ax.largest_nonempty(frame, layer), Ax.smallest_nonempty(frame, layer), layer)
	}
	
	console.log("Error: BLANK FRMAE")
	return [];	
}
