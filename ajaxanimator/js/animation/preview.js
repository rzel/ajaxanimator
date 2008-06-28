
Ax.preview_increment = function(){
  var start = (new Date()).getTime();
  Ax.preview_frame = Ax.viewer_load_frame( //load the next frame
  ((Ax.preview_frame)?Ax.preview_frame:Ax.tcurrent.frame), //if no current frame, load from the current editor frame
  Ax.preview_markup, //the la magickal poop!
  Ax.preview //the canvas
  ) + 1;

  if(Ax.preview_frame % 4 == 0){
        Ext.get("pbframe").dom.value = Ax.preview_frame
    Ax.setPreviewStatus(Math.round((new Date()).getTime() - start))
  }

  Ax.preview_timeout = setTimeout(function(){Ax.preview_increment()}, 1000/Ax.framerate);
}


Ax.init_preview = function(){
  $("previewcanvas").innerHTML = "";
  Ax.preview = Ax.init_view_core($("previewcanvas"));
  Ext.get("previewcanvas").on("mousedown",function(){
    Ax.msg("Preview","Preview is for viewing! Head over to the Canvas tab to edit.")
  })
  Ax.preview_markup = Ax.export_animation_core();
  Ax.preview_frame = null;
}