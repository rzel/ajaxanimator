Ext.onReady(function(){
var x = document.getElementsByTagName("textarea")

for (var i = 0;i<x.length;i++){
var y = x[i]
y.hasFocus=false;
y.onfocus=function(){keyShortcuts.disable();};
y.onblur=function(){keyShortcuts.enable();};
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




Ext.onReady(function(){
var keyShortcuts = new Ext.KeyMap(document, [
    {
        key: [10,13],
        fn: function(){ alert("Return was pressed"); }
	}, {
	
	
        key: "c",ctrl:true,
        fn: function(){ copyObj(); }
	}, {
        key: "p",ctrl:true,
        fn: function(){ pasteObj(); }
    }, {
        key: "z",ctrl:true,
        fn: function(){undo();}
    }, {
        key: [39,33],
        fn: function(){ nextFrame(); }
    }, {
        key: [37,34],
        fn: function(){ preFrame(); }
    }, {
        key: 117,
        fn: function(){ toKeyframe(); }
	}, {
	
        key: "p",
        fn: function(){ playAnimation() }
	}, {
	
        key: "s",
        fn: function(){ stopAnimation(); }
	}, {
	
        key: 46,
        fn: function(){if(DrawCanvas[currentCanvas].selected!=null){deleteShape();}else{removeKeyframe();}}
	}, {
	
        key: 82,
        fn: function(){ removeKeyframe(); }
	}
	
/*
        key: "\t",
        ctrl:true,
        shift:true,
        fn: function(){ alert('Control + shift + tab was pressed.'); }
 */   
	
]);

})



