Ax.keys = { //An object with the key arrays that will be generated and converted into something user-readable
  "Ctrl+C":"Copy Selected Object",
  "Ctrl+V":"Paste Object",
  "Ctrl+Z":"Undo Action",
  "Ctrl+S":"Open Save/Open window",
  "-> (right arrow key)":"Next Frame",
  "Page Down":"Next Frame",
  "<- (left arrow key)":"Previous Frame",
  "Page Up":"Previous Frame",
  "Delete":"Delete Selected Object (or delete frame if nothing is selected)",
  "F7":"To Blank Keyframe",
  "F6":"To Keyframe"
}


Ax.keyGuide = function(){ //magickallyawesome function
Ax.gs(5); //report user statistics
var generatedguide = "";
for(var x in Ax.keys){ //generate the magical human-readable stuff
  generatedguide += "<b>"+x+"</b> "+Ax.keys[x]+"<br>";
}
//oh wait... is it not human readable already? am i not human?
Ext.MessageBox.alert("Keyboard Shortcuts (non-functional)",generatedguide)
}


