//This is a file that is virtually the core of the tweening engine
//not really. it just detects what frames are keyframes. automatically.

Ax.diff_exclude = ["id","translation","subtype"]

Ax.autodiff = function(){
    //save canvas state
    //console.log(Ax.tcurrent)
    if (Ax.tcurrent.layer && Ax.tcurrent.frame) { //..only if the current frame *exists*
        //here is the magical code that does the history revision saving stuffs

        if (Ax.iscanvas() &&
          Ax.diff_core(Ax.dumpshapes(), Ax.getcanvas()) != true) {
            //console.log("iscanvas")
            Ax.dumpframe2(); //dump current canvas to current layer
        }
        
        
        //check for diff
        
        if (Ax.isTween() == true && Ax.diff_core(Ax.dumpshapes(), Ax.getSFTween()) != true) {
            //Ax.msg("Sorry!","For some reason, this feature isn't working at all. So, no editing tweens yet. Pity.")
            //console.log("specialtotweenness")
            Ax.toKeyframe(Ax.tcurrent.frame, Ax.tcurrent.layer)
            Ax.dumpframe2(); //dump current canvas to current layer
        }
        else if (
            Ax.diff_core(Ax.getcanvas(Ax.largest_nonempty(Ax.tcurrent.frame, Ax.tcurrent.layer), Ax.tcurrent.layer), Ax.dumpshapes()) != true &&
            !Ax.isTween()) {
                Ax.toKeyframe(Ax.tcurrent.frame, Ax.tcurrent.layer);
                Ax.dumpframe2(); //dump current canvas to current layer
            }
            else 
                if (Ax.isKeyframe() == false) {
                    //Ax.toBlank_core(Ax.tcurrent.frame,Ax.tcurrent.layer)
                    
                    //delete Ax.canvas_storage[Ax.tcurrent.layer][Ax.tcurrent.frame];
                    //Ax.deletecanvas(Ax.tcurrent.frame,Ax.tcurrent.layer)
                }
    }
}

Ax.diff = function(frame1, frame2, layer){
    //takes two frame identifier numbers and a layer as arguments
    //returns true or false, true being identical, false being different
    return Ax.diff_core(Ax.getcanvas(frame1, layer), Ax.getcanvas(frame2, layer))
}



Ax.diff_core = function(shapedump1, shapedump2){
    //It takes two arguments, one with the shape dump of the first frame
    // ( you can find it in the canvas_storage object, or dump it fresh)
    //with the dumpshapes() function. The ShapeDump takes the from of a
    //array with json shape dumps inside.
    //console.log(shapedump1, shapedump2)
    if ((!shapedump1 || !shapedump2) || (shapedump1.length != shapedump2.length)) {
        //alert(shapedump1.length + ":" + shapedump2.length)
        return false;
    }
    else {
        for (var i = 0; i < shapedump1.length; i++) {
            for (var x in shapedump2[i]) {
                //console.log(i,shapedump1[i].type,x,shapedump2[i][x],shapedump1[i][x])
                if (Ax.diff_attr(shapedump1[i][x], shapedump2[i][x], x) == false) {
                    //console.log(shapedump1[i][x], shapedump2[i][x], x)
                    
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
    if (Ax.diff_exclude.indexOf(attrid) == -1 && value1 !== null && value2 !== null && value1 !== undefined && value2 !== undefined) {
        if (typeof value2 == "number") {
            value2 = Math.round(value2 * 100) / 100
            value1 = Math.round(value1 * 100) / 100
        }
        if (attrid == "transform") {
            if (Math.round(Ax.parseTransform(value2)[0]) != Math.round(Ax.parseTransform(value1)[0])) {
                return false
            }
        }else if(attrid == "path"){
          value1 = Ax.parsePath(value1);
          value2 = Ax.parsePath(value2);
          if(value1.length != value2.length){
            return false
          }
          for(var i = 0; i < value2.length; i++){
            if(value2[i][0] == "M" || value2[i][0] == "L"){
              if(value2[i][1].toFixed(3) != value1[i][1].toFixed(3) || 
                value2[i][2].toFixed(3) != value1[i][2].toFixed(3)){
                return false
              }
            }
          }
          return true
        }
        else {
            if (value2 != value1) {
                //console.log(attrid, value1, value2)
                //Ax.msg(attrid, value1 + ":" + value2)
                return false;//not same
            }
        }
    }else{
      //n/a
    }
    
    return true;
}


