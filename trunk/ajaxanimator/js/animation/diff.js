//This is a file that is virtually the core of the tweening engine
//not really. it just detects what frames are keyframes. automatically.


Ax.autodiff = function(){
  //save canvas state
  if(Ax.tcurrent.layer && Ax.tcurrent.frame){ //..only if the current frame *exists*
    Ax.dumpframe(); //dump current canvas to current layer
    //check for diff
    if(Ax.diff(Ax.tcurrent.frame-1,Ax.tcurrent.frame,Ax.tcurrent.layer) != true){
      Ax.toKeyframe(Ax.tcurrent.frame,Ax.tcurrent.layer)
    }else{
      Ax.toBlank_core(Ax.tcurrent.frame,Ax.tcurrent.layer)
    }
  }
}

Ax.diff = function(frame1,frame2,layer){
  //takes two frame identifier numbers and a layer as arguments
  //returns true or false, true being identical, false being different
  return Ax.diff_core(Ax.canvas_storage[layer][frame1],Ax.canvas_storage[layer][frame2])
}

Ax.diff_core = function(shapedump1,shapedump2){
  //It takes two arguments, one with the shape dump of the first frame
  // ( you can find it in the canvas_storage object, or dump it fresh)
  //with the dumpshapes() function. The ShapeDump takes the from of a
  //array with json shape dumps inside.
  if(!shapedump1 || !shapedump2){
    return false;
  }
  
  //console.log(shapedump1.length, shapedump2.length)
  if(shapedump1.length != shapedump2.length){
    return false
  }else{
    for(var i = 0; i < shapedump1.length; i++){
      for(var x in shapedump2[i]){
        //console.log(i,shapedump1[i].type,x,shapedump2[i][x],shapedump1[i][x])
        if(shapedump2[i][x] != shapedump1[i][x]){
          return false
        }
      }
    }
  }
  return true;
}


