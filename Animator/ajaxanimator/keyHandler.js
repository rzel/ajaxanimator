Ext.onReady(function(){
var x = document.getElementsByTagName("textarea")
for (var i = 0;i<x.length;i++){
var y = x[i]
y.hasFocus=false;
y.onfocus=function(){disableKeys()};
y.onblur=function(){enableKeys()};
}
})


function showKeyGuide(){
var txt = "";

txt+="Ctrl+C : Copy Selected Object"
txt+="\n<br>"
txt+="Ctrl+V : Paste Object"
txt+="\n<br>"
txt+="Ctrl+Z : Undo Action"
txt+="\n<br>"
txt+="-> (right arrow key) : Next Frame"
txt+="\n<br>"
txt+="Page Down : Next Frame"
txt+="\n<br>"
txt+="<- (left arrow key) : Previous Frame"
txt+="\n<br>"
txt+="Page Up : Previous Frame"
txt+="\n<br>"
txt+="P : Play Animation (within canvas)"
txt+="\n<br>"
txt+="S : Stop Animation Playback (within canvas)"
txt+="\n<br>"
txt+="Delete : Delete Selected Object (or delete frame if nothing is selected)"
txt+="\n<br>"
txt+="R : Clear Current Frame"
txt+="\n<br>"
txt+="F6: To Keyframe"

Ext.MessageBox.alert("Keyboard Shortcuts:",txt)
}

function enableKeys(){
kcopy.enable()
kpaste.enable()
kundo.enable()
knextframe.enable()
kpreframe.enable()
ktokeyframe.enable()
kplayanim.enable()
kstopanim.enable()
kdelete.enable()
kfdelete.enable()
}
function disableKeys(){
kcopy.disable()
kpaste.disable()
kundo.disable()
knextframe.disable()
kpreframe.disable()
ktokeyframe.disable()
kplayanim.disable()
kstopanim.disable()
kdelete.disable()
kfdelete.disable()
}


var kcopy = new YAHOO.util.KeyListener(document, { keys:67,  ctrl:true}, { fn:function(){
copyObj();
}, correctScope:true } );
kcopy.enable();

var kpaste = new YAHOO.util.KeyListener(document, { keys:86,  ctrl:true}, { fn:function(){
pasteObj();
}, correctScope:true } );
kpaste.enable();

var kundo = new YAHOO.util.KeyListener(document, { keys:86,  ctrl:true}, { fn:function(){
undo();
}, correctScope:true } );
kundo.enable();

var knextframe = new YAHOO.util.KeyListener(document, { keys:[39,33] }, { fn:function(){
gotoframe(currentFrameSelection+1,1)
}, correctScope:true } );
knextframe.enable();

var kpreframe = new YAHOO.util.KeyListener(document, { keys:[37,34] }, { fn:function(){
gotoframe(currentFrameSelection-1,1)
}, correctScope:true } );
kpreframe.enable();

var ktokeyframe = new YAHOO.util.KeyListener(document, { keys:117 }, { fn:function(){
toKeyframe();
}, correctScope:true } );
ktokeyframe.enable();

var kplayanim = new YAHOO.util.KeyListener(document, { keys:[80,13] }, { fn:function(){
playAnimation()
}, correctScope:true } );
ktokeyframe.enable();

var kstopanim = new YAHOO.util.KeyListener(document, { keys:83 }, { fn:function(){
stopAnimation();
}, correctScope:true } );
kstopanim.enable();

var kdelete = new YAHOO.util.KeyListener(document, { keys:46 }, { fn:function(){
if(DrawCanvas[currentCanvas].selected != null){
deleteShape();
}else{
removeKeyframe();
}
}, correctScope:true } );
kdelete.enable();

var kfdelete = new YAHOO.util.KeyListener(document, { keys:82 }, { fn:function(){
removeKeyframe()
}, correctScope:true } );
kfdelete.enable();

