/*tweening functionality*/

Ax.tween = function(frame1,frame2,layer){//this function loops through frames inbetween and flags them as tweens
//unlike the prior versions that actually computed the frames here, everything is just flagged. So,  the speed differences are enourmous.
//sadly, those tweens have to be computed eventually, so it has to be calculated all when you are about to preview things. There used to be
//a cool little cache-script that would cache things and hopefully reduce the processing load when previewing, but that didn't work well
//as i was too  lazy to add one single likne to this function to make it automatically clear 
  //console.log(frame1,frame2,layer)
  if(frame1 && frame2){
    //*ZOMG! CONZONLE DAWT LOOG!!!*/console.log(frame1,frame2,layer);
    for(var i = frame1 + 1; i < frame2; i++){//loop through frames from frame1 to frame2
      Ax.toTween(i,layer);//huh? oh. tell the timelinezo
    }//end loop
  }//end if tingy
}//end functioney

Ax.getSFTween = function (frame, frame1, frame2, layer, store){//get single frame tween
  if(!frame){frame = Ax.tcurrent.frame}//pull defaults if none
  if(!layer){layer = Ax.tcurrent.layer}//same as above,but i'll repeat it so i get a higher comment-ratio: pull defaults if none
  if(!frame1){frame1 = Ax.largest_nonempty(frame,layer)};//pull the last keyframe if none
  if(!frame2){frame2 = Ax.smallest_nonempty(frame,layer)};//pull the next keyframe if none, which is essentially the same thing as the one before
  //but i feel like increasing my comment ratio (as in the if(!layer){... line) but i'm repeating it for a higher comment-code-ratio (as in that same line). 
  
  //console.log(frame, frame1,frame2,layer)
  //tween a single frame and get a single frame (framedump) in return
  store = (store)?store:Ax.canvas_storage[layer];
  
  
  if(!store[frame1]){
  	Ax.toastMsg("Error!","Ajax Animator's Tweening Engine has encountered a potentially critical error because store[frame1] is non-existant.")
  	store[frame1] = [];
  }
  if(!store[frame2]){
  	Ax.toastMsg("Error!","Ajax Animator's Tweening Engine has encountered a potentially critical error because store[frame2] is non-existant.")
  	store[frame2] = [];
  }
  
 /*some random benchmarking stuffs, evidently, the engines are roughly the same in speed
 var first = (new Date()).getTime();
  Ax.getSFTween_old_core(frame, frame1, frame2, layer, store);
  first = ((new Date()).getTime() - first)
  var second = (new Date()).getTime();
  Ax.getSFTween_core(frame, frame1, frame2, layer, store);
  second = ((new Date()).getTime() - second )
  
  console.log(first,second)
*/
  
  
  	return Ax.getSFTween_core(frame, frame1, frame2, layer, store);
  
}

