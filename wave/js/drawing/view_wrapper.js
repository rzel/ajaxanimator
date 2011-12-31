
/* some analogies for engresh!
 * 
 */
 //  wrapper : onlypaths :: view_wrapper : op_view

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

Ax.framerate = 15
//*

function VectorViewer(element, height, width){
  this.draw = new Raphael(element, height, width)
  this.deleteAll = function(){this.draw.clear()}
}


Ax.init_view = function(element, width, height){
    element.innerHTML = ""; //I wish I could make a witty comment here. Something like those guys at SMF
	//http://www.simplemachines.org/community/index.php?topic=243341.0
    element.style.overflow = "hidden";
    
	element.style.height = (height?height:272) + "px";
  element.style.width = (width?width:480) + "px";
	
	Ax.canvasSize_core();

  var output =  Ax.init_view_core(element); //stupid onlypaths hacks!
	return output;
}

Ax.init_view_core = function(element){
    return new VectorViewer(element, parseInt(element.style.width), parseInt(element.style.height));
}


Ax.viewer_load_frame = function(frame, layers, canvas, tweenfunc, framecount){
    canvas.deleteAll(); //clear viewerstuff
    for (var layer in layers) {
        //alert([1, 2, 3, 4, 5].indexOf(2))
        if (layers[layer].keyframes.indexOf(frame) != -1 && layers[layer].visible) {
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
    }
    
    if(!framecount){
      framecount = Ax.count_frames(layers)
    }
    
    if (frame >= framecount) {
        return 0;
    }
    
    return frame
}



//*/
