//This is a file that is virtually the core of the tweening engine
//not really. it just detects what frames are keyframes. automatically.

Ax.diff_exclude = ["id","transform"]

Ax.autodiff = function(){
  //save canvas state
  if(Ax.tcurrent.layer && Ax.tcurrent.frame){ //..only if the current frame *exists*
    Ax.dumpframe(); //dump current canvas to current layer
    //check for diff
    if(Ax.isTween() == true && Ax.diff_core(Ax.dumpshapes(),Ax.getSFTween()) != true){
      //Ax.msg("Sorry!","For some reason, this feature isn't working at all. So, no editing tweens yet. Pity.")
      //console.log("specialtotweenness")
      Ax.toKeyframe(Ax.tcurrent.frame,Ax.tcurrent.layer)
    }else if(Ax.diff(Ax.largest_nonempty(Ax.tcurrent.frame,Ax.tcurrent.layer),Ax.tcurrent.frame,Ax.tcurrent.layer) != true &&
      Ax.layers[Ax.tcurrent.layer].tweens.indexOf(Ax.tcurrent.frame) == -1){
      Ax.toKeyframe(Ax.tcurrent.frame,Ax.tcurrent.layer)
    }else if(Ax.isKeyframe() == false){
      //Ax.toBlank_core(Ax.tcurrent.frame,Ax.tcurrent.layer)
      delete Ax.canvas_storage[Ax.tcurrent.layer][Ax.tcurrent.frame];
    }
  }
}

Ax.diff = function(frame1,frame2,layer){
  //takes two frame identifier numbers and a layer as arguments
  //returns true or false, true being identical, false being different
  return Ax.diff_core(Ax.canvas_storage[layer][frame1],Ax.canvas_storage[layer][frame2])
}

Ax.largest_nonempty = function(frame,layer,object){
  //searches for largest non-empty frame that is less than the frame
  var nonempty = [];
  object = (object)?object:Ax.layers;

  for(var i = 0; i < object[layer].keyframes.length; i++){
    if(parseInt(object[layer].keyframes[i]) < frame){
        nonempty.push(parseInt(object[layer].keyframes[i]))
    }
  }
  return nonempty.sort(function(a,b){return b - a})[0];//sort descending and pull the first result (largest)
}

Ax.smallest_nonempty = function(frame,layer,object){
  //i'm just gonna copy from largest_nonempty and be too lazy to change the comments
  //so... yeah.... crappy documentation...
    //searches for largest non-empty frame that is less than the frame
  var nonempty = [];
  object = (object)?object:Ax.layers;

  for(var i = 0; i < object[layer].keyframes.length; i++){
    if(parseInt(object[layer].keyframes[i]) > frame){
        nonempty.push(parseInt(object[layer].keyframes[i]))
    }
  }
  return nonempty.sort(function(a,b){return a - b})[0];//sort descending and pull the first result (largest)
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
        if(Ax.diff_exclude.indexOf(x) == -1){
          if(typeof shapedump2[i][x] == "number"){
		  shapedump2[i][x] = Math.round(shapedump2[i][x]*100)/100
		  shapedump1[i][x] = Math.round(shapedump1[i][x]*100)/100
		  }
		  if(shapedump2[i][x] != shapedump1[i][x]){//for everything else, there's mastercrap
		    return false;//not same
		  }
		  
        }
      }
    }
  }
  return true;
}


