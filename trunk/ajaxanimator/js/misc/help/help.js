Ax.keys = { //An object with the key arrays that will be generated and converted into something user-readable

  "F5": "Insert Frame",
  "F6": "To Keyframe",
  "F7": "Empty Frame",
  "Enter": "Preview/Play",
  "Page Up": "Go to Previous Frame",
  "Page Down": "Go to Next frame",
  "Delete":"Delete Selection",
  "Ctrl+C": "Copy",
  "Ctrl+X": "Cut",
  "Ctrl+V": "Paste",
  "Ctrl+Z": "Undo",
  "Ctrl+Shift+Z": "Redo"
}
//..... hey.... wait.... what? I can read this.... Does this mean I'm not human?

Ax.keyGuide = function(){ //magickallyawesome function
//Ax.gs(5); //report user statistics
var generatedguide = "";
for(var x in Ax.keys){ //generate the magical human-readable stuff
  generatedguide += "<b>"+x+"</b> "+Ax.keys[x]+"<br>";
}
//oh wait... is it not human readable already? am i not human?
Ext.MessageBox.alert("Keyboard Shortcuts",generatedguide)
}


