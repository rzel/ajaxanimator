function playAnimation(){
AnimationPlay = true;
doAnimation();
}

function doAnimation(){
if(totalFrames == 1){
AnimationPlay = false;
}
if(currentCanvas + 1 > totalFrames){
gotoframe(1,1);
setTimeout('doAnimation()',1000/AnimationFramerate);
}else{
if(AnimationPlay == true){
nextFrame()
setTimeout('doAnimation()',1000/AnimationFramerate);
}
}
}


function replaceAll(fS,repStr,oldStr) {
var re = new RegExp(fS, "g"); 
return oldStr.replace(re, repStr);
}

function stopAnimation(){
AnimationPlay = false;
}

function hideCurrentCanvas(){
try{
document.getElementById("richdraw"+currentCanvas).style.display = "none";
}catch(err){}
}

function showCurrentCanvas(){
try{
document.getElementById("richdraw"+currentCanvas).style.display = "";
}catch(err){}
}
