/**
 * @author antimatter15
 * This is sorta critical part of the other formats.
 * It makes making other formats easier
 * Especially those incapable of porting the tweening engine to
 */
Ax.ex.array = function(format){ //returns an array of every single frame (single layered) tweened when necessary
    Ax.autodiff(); //read the comment in player.js
    var output = [], frame = 1, total_frames = Ax.count_frames(Ax.layers);
    
    
    
    for(;frame < total_frames;frame++){
      for(var layer in Ax.layers){
        var shapes = Ax.getshapes(frame, layer);
        output.push(shapes)
        //Ax.loadShapes(shapes, true, Ax.preview);
      }
    }
    //is it possible that an infinite loop finishes?

    if (format == "json") {
        return Ext.util.JSON.encode(output);
    }
    return output;
}

Ax.ex.array.save = function(){
    Ax.msg("Notes on exporting to OnlyPaths JSON Frame List", "Export to OnlyPaths JSON Frame List does not contain layer or tween data.")
    Ax.save.computer(Ext.util.JSON.encode(Ax.ex.array()), Ax.animation.name + ".opf");
}
