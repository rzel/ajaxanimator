/**
 * @author antimatter15
 * This is sorta critical part of the other formats.
 * It makes making other formats easier
 * Especially those incapable of porting the tweening engine to
 */

Ax.formats.array = function(){ //returns an array of every single frame (single layered) tweened when necessary
    var layers = Ax.export_animation_core(), output = [], frame = 1
    for (;; frame++) {
        output.push([]);
        for (var layer in layers) {
            if (layers[layer].keyframes.indexOf(frame) != -1) {
                output[frame - 1] = output[frame - 1].concat(layers[layer].src[frame])
            }
            else {
                output[frame - 1] = output[frame - 1].concat(Ax.getSFTween(frame, Ax.largest_nonempty(frame, layer, layers), Ax.smallest_nonempty(frame, layer, layers), layer, layers[layer].src))
            }
            if (layers[layer].keyframes.sort(function(a, b){
                return b - a
            })[0] ==
            frame) {
                return output;
            }
        }
    }
    //is it possible that an infinite loop finishes?
}
