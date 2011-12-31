
Ax.dumpframe = function(frame,layer){
  //console.info(layer)
  if(!frame){frame = Ax.tcurrent.frame}
  if(!layer){layer = Ax.tcurrent.layer}
  
  //console.log(layer)
  //console.log(frame,layer)
  //dumps current frame onto the frame_storage
  //oops. scratch that, it's now the *canvas*_storage (without asterekasdwz)
  
  //if(!Ax.canvas_storage[layer]){
  //  Ax.canvas_storage[layer] = {};
    //console.log("CLOGBLANK")
  //}
  
  //Ax.canvas.unselect();
  var shapedump =  Ax.dumpshapes();
  //console.log(shapedump)
  if(!Ax.isTween(frame,layer)){
    //Ax.canvas_storage[layer][frame] = shapedump;
    Ax.setcanvas(frame, layer, shapedump)
  }
  return shapedump;

}


Ax.dumpframe2 = function(frame, layer){
  if(!frame)frame=Ax.tcurrent.frame;
  if(!layer)layer=Ax.tcurrent.layer;
  
  if(frame == Ax.tcurrent.frame && layer == Ax.tcurrent.layer){
    var shapedump = Ax.dumpshapes()
    Ax.setcanvas(frame, layer, shapedump)
  
  }else{
  //  var shapedump = Ax.getshapes(frame, layer);
  }
  //Ax.setcanvas(frame, layer, shapedump)
  
}

Ax.loadframe = function(frame, layer){
  if(!frame)frame=Ax.tcurrent.frame;
  if(!layer)layer=Ax.tcurrent.layer;
  
  //Ax.toastMsg('load',frame+layer)
  var tolisten = []
  
  Ax.deleteAll();
  Ax.loadonion(frame, layer);
  
  for(var i in Ax.layers){
    var needlisten = [];
    if(i == layer){
      needlisten = Ax.loadframe_core(frame, i)
      if(Ax.layers[i].visible != true){
        Ax.msg("Layer Visibility","Please note that the current layer will always show regardless of visibility settings.")
      }
    }else if(Ax.layers[i].visible == true){
      needlisten = Ax.loadframe_core(frame, i, true)
    }
    for(var c = 0; c < needlisten.length; c++){
      tolisten.push(["c",i,needlisten[c]])
    }
  }
  
  Ax.autodiff();
  Ax.relisten(tolisten)
}

Ax.onion_skinning = 0.2;

Ax.loadonion = function(frame, layer){
  if(frame > 1 && Ax.onion_skinning){
    var shapes = Ax.getcanvas(Ax.largest_nonempty(frame,layer),layer);
	  for (var i = 0; i < shapes.length; i++) {
		  Ax.loadShape(shapes[i], true).attr("opacity",parseFloat(Ax.onion_skinning));
	  }
	  
	}
}

Ax.loadframe_core = function(frame,layer, noattachlistener){
  //console.log(Ax.canvas_storage[layer][frame])
  
  if(Ax.isKeyframe(frame, layer)){
    
  //Ax.msg("LOAD","KF")
    Ax.canvas.unselect();
    //Ax.canvas.renderer.removeAll();
    //console.log("Load KF")
    Ax.loadShapes(Ax.getcanvas(frame, layer), noattachlistener)
    //Ax.autodiff();
    return [frame];
  }else if(Ax.isTween(frame,layer)){
    
  //Ax.msg("LOAD","TN")
    Ax.canvas.unselect();//unselect
    //console.log("Load TN")
    //Ax.canvas.renderer.removeAll();//remove all objects
    Ax.loadShapes(Ax.getSFTween(frame,Ax.largest_nonempty(frame,layer),Ax.smallest_nonempty(frame,layer),layer), noattachlistener);//load tween
    return [Ax.largest_nonempty(frame,layer),Ax.smallest_nonempty(frame,layer)];//finish
  }
  //Ax.canvas.renderer.removeAll();//remove all objects
  //console.log("Load LF")
  
  //Ax.msg("LOAD","LF")
  
  Ax.loadShapes(Ax.getcanvas(Ax.largest_nonempty(frame,layer),layer), noattachlistener);//load last keyframe
  //note to self: rename function to make more sense.....
  Ax.canvas.unselect();
  //Ax.canvas.renderer.removeAll();
  return [Ax.largest_nonempty(frame,layer)];
}

