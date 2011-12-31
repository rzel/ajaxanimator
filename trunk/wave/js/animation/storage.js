Ax.canvas_storage = {}; //Initial data.

Ax.iscanvas = function(frame, layer){
  //getcanvas but without actually givint results, just boolean
  if(!frame)frame=Ax.tcurrent.frame;
  if(!layer)layer=Ax.tcurrent.layer;
  
  return !!wave2.subkeys("c/"+layer+"/"+frame+"/").length;
}

Ax.getcanvas = function(frame, layer){
  if(!frame)frame=Ax.tcurrent.frame;
  if(!layer)layer=Ax.tcurrent.layer;
  
  var prefix = "c/"+layer+"/"+frame+"/";
  var keys = wave2.subkeys(prefix)
  var shapes = []
  for(var i = 0; i < keys.length; i++){
    shapes.push(Ax.decompress_attr(wave2.getJ(prefix+keys[i])))
  }
  //if(shapes.length > 0){
    return shapes
  //}
  //return [];
}

Ax.setcanvas = function(frame, layer, shapes){
  for(var i = 0; i < shapes.length; i++){
    var compressed = Ax.compress_attr(shapes[i]);
    wave2.set(["c", layer, frame, compressed.id], Ax.small_json(compressed))
    
  }
}

Ax.deletecanvas = function(frame, layer){
  //do nothing
  if(Ax.iscanvas(frame, layer)) wave2.del_subkeys("c/"+layer+"/"+frame+"/");
}


Ax.getlayercanvas = function(layer){
  if(!layer)layer=Ax.tcurrent.layer;
  
  var prefix = "c/"+layer+"/";
  var keys = wave2.subkeys(prefix)
  var layer = {}
  for(var i = 0; i < keys.length; i++){
    var key = keys[i].split("/");
    if(!layer[key[0]]){
      layer[key[0]] = [] //t3h framename
    }
    
    layer[key[0]].push(wave2.getJ(prefix+keys[i]))
  }
  return layer;
}

Ax.removeallcanvas = function(){
   wave2.del_subkeys("c/")
}

Ax.setlayercanvas = function(layer, data){
  for(var frame in data){
    Ax.setcanvas(frame, layer, data[frame]);
  }
}
Ax.getshapes = function(frame,layer){
  //alert("alerts are good; look at storage.js")
	//a very high-level function ish
	if(!frame){frame = Ax.tcurrent.frame;}
	if(!layer){layer = Ax.tcurrent.layer}
	
	//if(!Ax.getcanv){
		//conzoledawtloog("Error: NO LAYER OBJECT", Ax.canvas_storage[layer], Ax.canvas_storage, layer)
	//	return [];
	//}
	if(Ax.isKeyframe(frame, layer)){
		//console.log("OUT: KEYFRAME")
		return Ax.getcanvas(frame,layer);
	}else if(Ax.smallest_nonempty(frame, layer) && Ax.largest_nonempty(frame, layer)){
		//console.log("OUT: TWEEN")
		return Ax.getSFTween(frame, Ax.largest_nonempty(frame, layer), Ax.smallest_nonempty(frame, layer), layer)
	}
	
	//conzoledawtloog("Error: BLANK FRMAE")
	//return [];
  return Ax.getcanvas(Ax.largest_nonempty(frame,layer),layer)
    
}
