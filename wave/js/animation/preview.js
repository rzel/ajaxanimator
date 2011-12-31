Ax.performance = 0;

Ax.preview_increment = function(noplay){
  var start = (new Date()).getTime();
  /*
  Ax.preview_frame = Ax.viewer_load_frame( //load the next frame
  ((Ax.preview_frame)?Ax.preview_frame:Ax.tcurrent.frame), //if no current frame, load from the current editor frame
  Ax.preview_markup, //the la magickal poop!
  Ax.preview //the canvas
  ) + (noplay?0:1);
  */
  
  
  Ax.preview_frame = (Ax.preview_frame?Ax.preview_frame:Ax.tcurrent.frame)

  
  if(!Ax.preview){
    Ax.init_preview();
  }
  
  Ax.preview.deleteAll();
  
  for(var layer in Ax.layers){
    var shapes = Ax.getshapes(Ax.preview_frame, layer);
    Ax.loadShapes(shapes, true, Ax.preview);
  }
  if(!Ax.preview_frame){
    Ax.preview_frame = 1;
  }
  //console.log(Ax.preview_frame)
  Ax.selectFrame_core(Ax.preview_frame,Ax.tcurrent.layer)
  Ax.preview_frame++;
  
  if(Ax.preview_frame > Ax.count_frames(Ax.layers)){
    Ax.preview_frame = 1;
  }
  
  var end = (new Date()).getTime()
  
  Ax.performance = end-start;
  
  if(!noplay) Ax.preview_timeout = setTimeout(function(){Ax.preview_increment()}, Math.max(0,(1000/Ax.framerate)-Ax.performance));
}

Ax.preview_msg = function(){
    Ax.msg("Preview","Preview is for viewing! Head over to the Canvas tab to edit.")
  }


Ax.init_preview = function(){
  
  if(Ax.canvas){
    Ax.autodiff(); //insures its the current data.
  }
  $("previewcanvas").innerHTML = "";
  
  Ext.get("previewcanvas").un("mousedown",Ax.preview_msg);//bai bai lyst3n3rz
  
  Ax.preview = Ax.init_view($("previewcanvas"), Ax.canvasWidth, Ax.canvasHeight);
  
  Ext.get("previewcanvas").on("mousedown",Ax.preview_msg);
  
  Ax.preview_markup = Ax.export_animation_core();
  Ax.preview_frame = null;
}


