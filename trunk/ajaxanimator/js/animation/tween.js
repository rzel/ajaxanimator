/*tweening functionality*/

Ax.tween = function(frame1,frame2,layer){
  if(frame1 && frame2){
    /*ZOMG! CONZONLE DAWT LOOG!!!*/console.log(frame1,frame2,layer);
    for(var i = frame1 + 1; i < frame2; i++){
      Ax.toTween(i,layer);
    }
  }
}

Ax.getSFTween = function (frame1,frame2,layer){
  //tween a single frame and get a single frame (framedump) in return
}