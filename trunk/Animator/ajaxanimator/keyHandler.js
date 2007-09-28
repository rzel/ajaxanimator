var keyShortcuts;
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
var txp=function(t){txt+=t;txt+="\n<br>"}
txp("Ctrl+C : Copy Selected Object")
txp("Ctrl+V : Paste Object")
txp("Ctrl+Z : Undo Action")
txp("Ctrl+S : Open Save/Open window")
txp("-> (right arrow key) : Next Frame")
txp("Page Down : Next Frame")
txp("<- (left arrow key) : Previous Frame")
txp("Page Up : Previous Frame")
txp("P : Play Animation (within canvas)")
txp("S : Stop Animation Playback (within canvas)")
txp("Delete : Delete Selected Object (or delete frame if nothing is selected)")
txp("R : Clear Current Frame")
txp("F6: To Keyframe")

Ext.MessageBox.alert("Keyboard Shortcuts:",txt)
}




Ext.onReady(function(){
keyShortcuts = new Ext.KeyMap(document, [
	{
        key: "c",ctrl:true,
        fn: function(){ copyObj(); }
	}, {
        key: "v",ctrl:true,
        fn: function(){ pasteObj() }
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
	
        key: "s", ctrl:false,
        fn: function(){ stopAnimation(); }
	}, {
	
        key: 46,
        fn: function(){if(DrawCanvas[currentCanvas].selected!=null){deleteShape();}else{removeKeyframe();}}
	}, {
	
        key: 82,
        fn: function(){ removeKeyframe(); }
	}, {
	
        key: "s", ctrl:true,stopEvent: true,
        fn: function(){
		
		showFileSystemDialog()
		}
	}
	
/*
        key: "\t",
        ctrl:true,
        shift:true,
        fn: function(){ alert('Control + shift + tab was pressed.'); }
 */   
	
]);

})



