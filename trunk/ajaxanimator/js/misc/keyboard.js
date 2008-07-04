Ext.onReady(function(){
  Ax.keymap = new Ext.KeyMap(document, [
    {
      key: 117, //F6
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.toKeyframe()}
    },
    {
      key: 116, //F5
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.insertFrame()}
    },
    {
      key: 118, //F7
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.toBlank()}
    },
    {
      key: 13, //Enter
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.controls.play()}
    },
    {
      key: 33, //Page Up
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.controls.previous()}
    },
    {
      key: 34, //Page Down
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.controls.next()}
    },
    {
      key: "c", //Ctrl+C
      ctrl: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.clipboard_add()}
    },
    {
      key: "x", //Ctrl+X
      ctrl: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.toastMsg("keyboard","I jacked ur ride")}
    },
    {
      key: "v", //Ctrl+V
      ctrl: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.toastMsg("keyboard","Paste")}
    },
    {
      key: "z", //Ctrl+Z
      ctrl: true,
      shift: false,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};if(event.shiftKey==false){Ax.toastMsg("keyboard","you wish you could undo this")}}
    },
    {
      key: "z", //Ctrl+Shift+Z 
      ctrl: true,
      shift: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.toastMsg("keyboard","redo")}
    }
  ])
  })


Ax.verify_keydown = function(code, event){ //koolio! this is sssooooooo much better than that old one! actually, come to think of it.. now it's sorta complex...

  if([116, 117, 118].indexOf(code) != -1){//if its one of the "banned" keycodes, such as F5 (reloads page), ALWAYS stop it's default behavior
    event.stopEvent();//stop default behavior
  }
  
  var selectedText;  //stolen and modified from quirksmode
  if (window.getSelection) {
    selectedText = window.getSelection().toString();
  }else if (document.selection) { //I3 suxx0rz
    selectedText = document.selection.createRange().toString();
  }
  if(selectedText.length > 1){return} //don't continue if there's anything in the selection
  
  if(['input','textarea'].indexOf(event.getTarget().tagName.toLowerCase()) == -1){ //ignore everything if it's a text element
      event.stopEvent();//yep..
      return true; //oooo
  }
  return;
  //console.log(event);
}