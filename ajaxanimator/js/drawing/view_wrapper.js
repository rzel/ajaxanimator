
/*
 /   wrapper : onlypaths :: view_wrapper : op_view
 */
//so basically this is a set of wrapper stuff for op_view, or RichDrawViewer. Its a simplified version of onlypaths that has no dependencies
//for sole drawing of crap

//the indentation here is screwed cause im using a diffrent ide to make this.

/*
 okay, this file has prettymuch been diversified from a simple preview.js stuff
 to a flexible implementation that probably should work standalone.
 */
//a little hack to get IE to work
/*
 Meh. This one is from Mozilla, but its too big so i'm gonna steal from elsewhere
 if (!Array.prototype.indexOf){
 Array.prototype.indexOf = function(elt , from){
 var len = this.length;
 var from = Number(arguments[1]) || 0;
 from = (from < 0)
 ? Math.ceil(from)
 : Math.floor(from);
 if (from < 0) from += len;
 for (; from < len; from++) {
 if (from in this && this[from] === elt) return from;
 }
 return -1;
 };
 }
 */
//from http://snippets.dzone.com/posts/show/2437
//modified to work with my compilier
//*
if (![].indexOf) {
    Array.prototype.indexOf = function(v){
        for (var i = this.length; i-- && this[i] != v;) {
        }
        return i;
    }
}
//*/

Ax.framerate = 12;
//*


Ax.init_view = function(element){
    element.innerHTML = "";
    element.style.height = Ax.canvasHeight + "px";
    element.style.width = Ax.canvasWidth + "px"
    return Ax.init_view_core(element)
}

Ax.init_view_core = function(element){
    if (Ext.isIE == true) {
        var renderer = new VMLRenderer();
    }
    else {
        var renderer = new SVGRenderer();
    }
    return new RichDrawViewer(element, renderer);
}


Ax.viewer_load_frame = function(frame, layers, canvas, tweenfunc){
    //note: this function is not multi-layer friendly yet.
    //un-note: this function should be multi-layer friendly, but layers aren't even really supported so i donno
    canvas.renderer.removeAll();
    var total_frames = 0; //starting point
    for (var layer in layers) {
        //alert([1, 2, 3, 4, 5].indexOf(2))
        if (layers[layer].keyframes.indexOf(frame) != -1) {
            Ax.loadShapes(layers[layer].src[frame], true, canvas);
        }
        else 
            if (Ax.largest_nonempty(frame, layer, layers) && Ax.smallest_nonempty(frame, layer, layers)) {
                Ax.loadShapes(((tweenfunc) ? tweenfunc : Ax.getSFTween)(frame, Ax.largest_nonempty(frame, layer, layers), Ax.smallest_nonempty(frame, layer, layers), layer, layers[layer].src), true, canvas);
            }
            else 
                if (Ax.largest_nonempty(frame, layer, layers)) {
                    //console.log("Blank Frame")
                    Ax.loadShapes(layers[layer].src[Ax.largest_nonempty(frame, layer, layers)], true, canvas);
                }
                else {
                //console.log("blank frame")
                }
        
        //calculate the biggest frame	
        if (layers[layer].keyframes.sort(function(a, b){
            return b - a; //sort the keyframe from largest to smallest and pull out the biggest number
        })[0] >
        total_frames) {
            total_frames = layers[layer].keyframes.sort(function(a, b){
                return b - a; //sort the keyframe from largest to smallest and pull out the biggest number
            })[0];
        }
    }
    
    if (frame >= total_frames) {
        console.log(total_frames);
        return 0;
    }
    return frame
}



//*/
