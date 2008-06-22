/*tweening functionality*/

Ax.tween = function(frame1,frame2,layer){
  if(frame1 && frame2){
    //*ZOMG! CONZONLE DAWT LOOG!!!*/console.log(frame1,frame2,layer);
    var frame1_dump = Ax.canvas_storage[layer][frame1];//load dumps
    var frame2_dump = Ax.canvas_storage[layer][frame2];//load dumps
    
    for(var i = frame1 + 1; i < frame2; i++){//loop through frames from frame1 to frame2
      Ax.toTween(i,layer);//huh? oh. tell the timelinezo
      for(var o = 0; o < frame1_dump.length; o++){//loop through shapes
        if(frame2_dump[o]){ //continue only if the second frame has it too
          for(var a in frame1_dump[o]){
            if(typeof frame1_dump[o][a] == typeof frame2_dump[o][a] && frame1_dump &&
               typeof frame1_dump[o][a] == "number"){ //currently only numbers are tweenable
               
            }
          }
        }
      }
    }
  }
}

Ax.getSFTween = function (frame, frame1, frame2,layer){
  //tween a single frame and get a single frame (framedump) in return
  
}

Ax.tweenNumber = function(frame1, frame2, value1, value2, index){//frame1, frame2, first number, second number, index (from first)
  //no type checking yet, cause i dont feel like it
  return value1+(index/(frame2-frame1))*(value2-value1); //just hope this works!
}