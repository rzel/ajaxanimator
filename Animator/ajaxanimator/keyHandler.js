nn=(document.layers)?true:false;
ie=(document.all)?true:false;
function keyDown(e){ 
var evt=(e)?e:(window.event)?window.event:null;
if(evt){ 
var eventkeyCode=(evt.charCode)?evt.charCode: ((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));

//keypress handling code begins
if (eventkeyCode==39||eventkeyCode == 33){
gotoframe(currentFrameSelection+1,1)
return false
}
if (eventkeyCode==37||eventkeyCode == 34){
gotoframe(currentFrameSelection-1,1)
return false
}
if (eventkeyCode==117){
toKeyframe();
return false
}
if (eventkeyCode==80){
playAnimation()
}
if (eventkeyCode==83){
stopAnimation();
}
if (eventkeyCode==46){
if(DrawCanvas[currentCanvas].selected != null){
deleteShape();
}else{
removeKeyframe();
}
}
if (eventkeyCode==13){
playAnimation()
}
if (eventkeyCode==82){
removeKeyframe()
}

//keypress handling code ends

}
} 
document.onkeydown=keyDown;
if(nn) document.captureEvents(Event.KEYDOWN);