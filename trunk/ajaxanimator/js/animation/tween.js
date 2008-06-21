/*tweening functionality*/

Ax.tween = function(frame1,frame2,layer){
  if(frame1 && frame2){
    console.log(frame1,frame2,layer);
    for(var i = frame1 + 1; i < frame2; i++){
      Ax.toTween(i,layer);
    }
  }
}

