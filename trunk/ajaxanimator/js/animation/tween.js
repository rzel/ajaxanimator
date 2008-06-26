/*tweening functionality*/

Ax.tween = function(frame1,frame2,layer){
  //console.log(frame1,frame2,layer)
  if(frame1 && frame2){
    //*ZOMG! CONZONLE DAWT LOOG!!!*/console.log(frame1,frame2,layer);
    for(var i = frame1 + 1; i < frame2; i++){//loop through frames from frame1 to frame2
      Ax.toTween(i,layer);//huh? oh. tell the timelinezo
    }
  }
}

Ax.getSFTween = function (frame, frame1, frame2, layer){
  if(!frame){frame = Ax.tcurrent.frame}
  if(!layer){layer = Ax.tcurrent.layer}
  if(!frame1){frame1 = Ax.largest_nonempty(frame,layer)}
  if(!frame2){frame2 = Ax.smallest_nonempty(frame,layer)}
  
  //console.log(frame, frame1,frame2,layer)
  //tween a single frame and get a single frame (framedump) in return
  var frame1_dump = Ax.canvas_storage[layer][frame1], //load dumps
      frame2_dump = Ax.canvas_storage[layer][frame2], //load dumps
      tween_frame = Ext.ux.clone(frame2_dump); //clone frame2
        
  for(var o = 0; o < frame1_dump.length; o++){//loop through shapes
    if(frame2_dump[o]){ //continue only if the second frame has it too
      for(var a in frame1_dump[o]){
        tween_frame[o][a] = Ax.tweenAttribute(frame1,frame2,frame1_dump[o][a],frame2_dump[o][a], frame)
      }
    }
  }
  return tween_frame;
}

Ax.tweenAttribute = function(frame1, frame2, value1, value2, index){
  if(typeof value1 == "number"){ //currently only numbers are tweenable
    tween_frame[o][a] = Ax.tweenNumber(frame1,frame2,value1,value2, frame)
  }
}

Ax.tweenNumber = function(frame1, frame2, value1, value2, index){//frame1, frame2, first number, second number, index (from first)
  //no type checking yet, cause i dont feel like it
  return value1+(index/(frame2-frame1))*(value2-value1); //just hope this works!
}