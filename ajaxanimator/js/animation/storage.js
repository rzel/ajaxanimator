Ax.canvas_storage = {}; //Initial data.

Ax.getshapes = function(frame,layer){
	//a very high-level function ish
	if(!frame){frame = Ax.tcurrent.frame}
	if(!layer){layer = Ax.tcurrent.layer}
	
	if(!Ax.canvas_storage[layer]){
		return [];
	}
	
	if(Ax.canvas_storage[layer][frame]){
		return (Ax.canvas_storage[layer][frame]);
	}else if(Ax.smallest_nonempty(frame, layer)){
		return Ax.getSFTween()
	}
	return [];	
}
