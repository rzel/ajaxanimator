//This is a file that is virtually the core of the tweening engine
//not really. it just detects what frames are keyframes. automatically.

Ax.diff_exclude = ["id"]

Ax.autodiff = function(){
    //save canvas state
    if (Ax.tcurrent.layer && Ax.tcurrent.frame) { //..only if the current frame *exists*
        //here is the magical code that does the history revision saving stuffs
        var createdump = false;
        if (Ax.canvas_storage[Ax.tcurrent.layer] &&
        Ax.canvas_storage[Ax.tcurrent.layer][Ax.tcurrent.frame] &&
        Ax.diff_core(Ax.dumpshapes(), Ax.canvas_storage[Ax.tcurrent.layer][Ax.tcurrent.frame]) != true) {
            createdump = true;
        }
        
        Ax.dumpframe(); //dump current canvas to current layer
        //check for diff
        
        if (Ax.isTween() == true && Ax.diff_core(Ax.dumpshapes(), Ax.getSFTween()) != true) {
            //Ax.msg("Sorry!","For some reason, this feature isn't working at all. So, no editing tweens yet. Pity.")
            //console.log("specialtotweenness")
            Ax.toKeyframe(Ax.tcurrent.frame, Ax.tcurrent.layer)
        }
        else 
            if (Ax.diff(Ax.largest_nonempty(Ax.tcurrent.frame, Ax.tcurrent.layer), Ax.tcurrent.frame, Ax.tcurrent.layer) != true &&
            Ax.layers[Ax.tcurrent.layer].tweens.indexOf(Ax.tcurrent.frame) == -1) {
                Ax.toKeyframe(Ax.tcurrent.frame, Ax.tcurrent.layer);
            }
            else 
                if (Ax.isKeyframe() == false) {
                    //Ax.toBlank_core(Ax.tcurrent.frame,Ax.tcurrent.layer)
                    delete Ax.canvas_storage[Ax.tcurrent.layer][Ax.tcurrent.frame];
                }
        
        //here actually stores the revisions stuffs
        if (createdump == true) {
            if (Ax.canvas && Ax.canvas.queryCommand("mode")) {
                Ax.history_add(Ax.toolConfig[Ax.canvas.queryCommand("mode")][2]);//needs work
            }
        }
    }
}

Ax.diff = function(frame1, frame2, layer){
    //takes two frame identifier numbers and a layer as arguments
    //returns true or false, true being identical, false being different
    return Ax.diff_core(Ax.canvas_storage[layer][frame1], Ax.canvas_storage[layer][frame2])
}



Ax.diff_core = function(shapedump1, shapedump2){
    //It takes two arguments, one with the shape dump of the first frame
    // ( you can find it in the canvas_storage object, or dump it fresh)
    //with the dumpshapes() function. The ShapeDump takes the from of a
    //array with json shape dumps inside.
    if ((!shapedump1 || !shapedump2) || (shapedump1.length != shapedump2.length)) {
        return false;
    }
    else {
        for (var i = 0; i < shapedump1.length; i++) {
            for (var x in shapedump2[i]) {
                //console.log(i,shapedump1[i].type,x,shapedump2[i][x],shapedump1[i][x])
                if (Ax.diff_attr(shapedump1[i][x], shapedump2[i][x], x) == false) {
                    return false;
                }
            }
        }
    }
    return true;
}

Ax.diff_list = function(shapedump1, shapedump2){
	var difflist = [];
    if ((!shapedump1 || !shapedump2) || (shapedump1.length != shapedump2.length)) {
        return false;
    }
    else {
        for (var i = 0; i < shapedump1.length; i++) {
            for (var x in shapedump2[i]) {
                if (Ax.diff_attr(shapedump1[i][x], shapedump2[i][x], x) == false) {
                    difflist.push([shapedump1[i], x])
                }
            }
        }
    }
    return difflist;
}


Ax.diff_attr = function(value1, value2, attrid){
    if (Ax.diff_exclude.indexOf(attrid) == -1) {
        if (typeof value2 == "number") {
            value2 = Math.round(value2 * 100) / 100
            value1 = Math.round(value1 * 100) / 100
        }
        if (attrid == "transform") {
            if (Math.round(Ax.parseTransform(value2)[0]) != Math.round(Ax.parseTransform(value1)[0])) {
                return false
            }
        }
        else {
            if (value2 != value1) {
                return false;//not same
            }
        }
    }
    return true;
}


