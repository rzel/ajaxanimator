
Ax.dumpframe = function(frame,layer){
  if(!frame){frame = Ax.tcurrent.frame}
  if(!layer){layer = Ax.tcurrent.layer}
  //console.log(frame,layer)
  //dumps current frame onto the frame_storage
  //oops. scratch that, it's now the *canvas*_storage (without asterekasdwz)
  if(!Ax.canvas_storage[layer]){
    Ax.canvas_storage[layer] = {};
  }
  //Ax.canvas.unselect();
  var shapedump =  Ax.dumpshapes();
  if(shapedump.length > 0){
    Ax.canvas_storage[layer][frame] = shapedump;
    return Ax.canvas_storage[layer][frame];
  }
  return false;

}

Ax.loadframe = function(frame,layer){
  if(Ax.canvas_storage[layer] && Ax.canvas_storage[layer][frame]){
    Ax.canvas.unselect();
    Ax.canvas.renderer.removeAll();
    Ax.loadShapes(Ax.canvas_storage[layer][frame])
    Ax.autodiff();
  }else{
    //Ax.canvas.renderer.removeAll();
    return false;
  }
}

