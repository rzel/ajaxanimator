/**
 * @author antimatter15
 * This is sorta critical part of the other formats.
 * It makes making other formats easier
 * Especially those incapable of porting the tweening engine to
 */
Ax.ex.array = function(format){ //returns an array of every single frame (single layered) tweened when necessary
    Ax.autodiff(); //read the comment in player.js
    var layers = Ax.export_animation_core(), output = [], frame = 1, total_frames = Ax.count_frames(layers);
    for (;; frame++) {
        output.push([]);
        for (var layer in layers) {
            if (layers[layer].keyframes.indexOf(frame) != -1) {
                output[frame - 1] = output[frame - 1].concat(layers[layer].src[frame])
            }
            else 
                if (Ax.largest_nonempty(frame, layer, layers) && Ax.smallest_nonempty(frame, layer, layers)) {
                    output[frame - 1] = output[frame - 1].concat(Ax.getSFTween(frame, Ax.largest_nonempty(frame, layer, layers), Ax.smallest_nonempty(frame, layer, layers), layer, layers[layer].src))
                }
                else 
                    if (Ax.largest_nonempty(frame, layer, layers)) {
						output[frame - 1] = output[frame - 1].concat(layers[layer].src[Ax.largest_nonempty(frame, layer, layers)])
                    }
                    else {
                    //console.log("blank frame")
                    }
            
            if (frame >= total_frames) {
                if (format == "json") {
                    return Ext.util.JSON.encode(output);
                }
                else {
                    return output;
                }
            }
        }
    }
    //is it possible that an infinite loop finishes?
}

Ax.ex.array.save = function(){
    Ax.msg("Notes on exporting to OnlyPaths JSON Frame List", "Export to OnlyPaths JSON Frame List does not contain layer or tween data.")
    Ax.save.computer(Ext.util.JSON.encode(Ax.ex.array()), Ax.animation.name + ".opf");
}
