Ext.onReady(function(){
  Ax.keymap = new Ext.KeyMap(document, [
    {
      key: 117, //F6
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.toKeyframe()}
    },
    {
      key: 116, //Shift+F5
      shift: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.deleteFrame()}
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
      key: 46, //Delete
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("delete1")}
    },
    {
      key: "s", //S
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("select")}
    },
    {
      key: "p", //P
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("path")}
    },/*
    {
      key: "t", //T
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("text")}
    },*/
    {
      key: "l", //L
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("line")}
    },
    {
      key: "g", //G
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("polygon")}
    },
    {
      key: "r", //R
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("rect")}
    },
    {
      key: "e", //E
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("ellipse")}
    },/*
    {
      key: "i", //I
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.setTool("image")}
    },*/
    {
      key: 34, //Page Down
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.controls.next()}
    },
    {
      key: "c", //Ctrl+C
      ctrl: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.clipboard_copy()}
    },
    {
      key: "x", //Ctrl+X
      ctrl: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.clipboard_cut()}
    },
    {
      key: "v", //Ctrl+V
      ctrl: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.clipboard_paste()}
    }/*,
    {
      key: "z", //Ctrl+Z
      ctrl: true,
      shift: false,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};if(event.shiftKey==false){Ax.history_undo()}}
    },
    {
      key: "z", //Ctrl+Shift+Z 
      ctrl: true,
      shift: true,
      fn: function(code, event){if(!Ax.verify_keydown(code, event)){return};Ax.history_redo()}
    }*/
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
    selectedText = document.selection.createRange();
  }
  if(selectedText.length > 1){return} //don't continue if there's anything in the selection
  
  if(['input','textarea'].indexOf(event.getTarget().tagName.toLowerCase()) == -1){ //ignore everything if it's a text element
      event.stopEvent();//yep..
      return true; //oooo
  }
  return;
  //console.log(event);
}
