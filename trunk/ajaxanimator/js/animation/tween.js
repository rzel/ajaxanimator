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

Ax.getSFTween = function (frame, frame1, frame2, layer){//get single frame tween
  if(!frame){frame = Ax.tcurrent.frame}//pull defaults if none
  if(!layer){layer = Ax.tcurrent.layer}//same as above,but i'll repeat it so i get a higher comment-ratio: pull defaults if none
  if(!frame1){frame1 = Ax.largest_nonempty(frame,layer)};//pull the last keyframe if none
  if(!frame2){frame2 = Ax.smallest_nonempty(frame,layer)};//pull the next keyframe if none, which is essentially the same thing as the one before
  //but i feel like increasing my comment ratio (as in the if(!layer){... line) but i'm repeating it for a higher comment-code-ratio (as in that same line). 
  
  //console.log(frame, frame1,frame2,layer)
  //tween a single frame and get a single frame (framedump) in return
  var frame1_dump = Ax.canvas_storage[layer][frame1], //load dumps
      frame2_dump = Ax.canvas_storage[layer][frame2], //load dumps
      tween_frame = Ext.ux.clone(frame2_dump); //clone frame2
        
  for(var o = 0; o < frame1_dump.length; o++){//loop through shapes
    if(frame2_dump[o]){ //continue only if the second frame has it too
      for(var a in frame1_dump[o]){//loop attributes
        tween_frame[o][a] = Ax.tweenAttribute(a,frame1,frame2,frame1_dump[o][a],frame2_dump[o][a], frame)
		//set attribute to be whatever pooped up by the Ax.tweenAttribute function which takes some special argumetnts that i dont feel like documenting
		//as hopefully the function argument names are detailed enough, even though i would probably spend less time typing up a clear and simple
		//idiotproof documentation of the function than write this pointless super long comment but idk.
      }
    }
  }

  return tween_frame;
}

Ax.tweenAttribute = function(name, frame1, frame2, value1, value2, index){
  if(typeof value2 == "number"){ //currently only numbers are tweenable
    return Math.round(Ax.tweenNumber(frame1,frame2,value1,value2, index)*1000)/1000; //round to 3 decimal places
  }
  if(name == "transform"){
    return Ax.tweenTransform(frame1,frame2,value1,value2, index); //round to 3 decimal places
  }
/*
Now:
Width,Height, Line Width, x, y

Future: 
rotation transform, find out the rotation value, run them through the magickal Ax.tweenNumber function
color tween: split hex string into 3 segments, turn that into a number, run it throught he magical function and re-hexify

Stuff that isn't possible through the current toolset, but should work automagically:
opacity tweening (i think they're stored in numbers) 

Fun:
I donno, maybe some text tweening (i dont have any idea how that'd work. maybe changing a character every frame or something.
*/
  
  return value2; //return the second if no tweening possible.
}


/*
Woot!!!!!! I FIXED THE ALGORITHIM!!!!!! TWICE!!!!!

changelog:

frs0t ps0t:
  return (index/(frame2-frame1))*(value2-value1); //just hope this works!
second edit:
  return value1+(index/(frame2-frame1))*(value2-value1); //just hope this works!
third magical edit:
  return value1+((index-frame1)/(frame2-frame1))*(value2-value1); //just hope this works!
  
*/

Ax.tweenTransform = function(frame1, frame2, value1, value2, index){//same as tweenNumber
  value1 = Ax.parseTransform(value1); //parse stuff
  value2 = Ax.parseTransform(value2);
  return "rotate("+[Ax.tweenNumber(frame1,frame2,value1[0],value2[0],index),
                    Ax.tweenNumber(frame1,frame2,value1[1],value2[1],index),
                    Ax.tweenNumber(frame1,frame2,value1[2],value2[1],index)].join(", ")+")"
}

Ax.parseTransform = function(transform){
  if(!transform){
    return [0, 0, 0];
  }
  transform = transform.replace(")","").replace("rotate(","").split(",");
  return [Math.round(parseFloat(transform[0])*1000)/1000,
          Math.round(parseFloat(transform[1])*1000)/1000,
          Math.round(parseFloat(transform[2])*1000)/1000]
}

Ax.tweenNumber = function(frame1, frame2, value1, value2, index){//frame1, frame2, first number, second number, index (from first)
  //no type checking yet, cause i dont feel like it
  return value1+((index-frame1)/(frame2-frame1))*(value2-value1); //just hope this works!
  
  //blah!
}//he he!!!!!!!!!!!!!!!!!!!!!! mua ha ah ha ha