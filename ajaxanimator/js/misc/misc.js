/*
A whole lot of random scripts
*/


Ax.util = {
htmlentities : function(s){
//Slightly compressed version of the htmlentities function combined with nl2br
//  original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net) from php.js

var div = document.createElement('div'), text = document.createTextNode(s);
div.appendChild(text);
return div.innerHTML.replace(/([^>])\n/g, '$1<br />\n')
}

}



Ax.preload = function(){
Ax.showBusy()
Ax.setStatus({text:"Preloading Icons"})

var images = ["../img/img/silk/page_add.png","../img/img/silk/folder_go.png","../img/img/silk/disk.png","../img/img/silk/page_white_flash.png","../img/img/silk/computer_go.png","../img/img/silk/drive_web.png","../img/img/silk/world_link.png","../img/img/silk/textfield.png","../img/img/silk/arrow_undo.png","../img/img/silk/arrow_redo.png","../img/img/silk/cut_red.png","../img/img/silk/page_copy.png","../img/img/silk/page_paste.png","../img/img/silk/delete.png","../img/img/silk/page_white_flash.png","../img/img/silk/application_double.png","../img/img/silk/color_wheel.png","../img/img/silk/paintbrush.png","../img/img/silk/bug_go.png","../img/img/silk/script_code_red.png","../img/img/silk/plugin_edit.png","../img/img/silk/report.png","../img/img/silk/arrow_refresh.png","../img/img/silk/page_delete.png","../img/img/silk/add.png","../img/img/silk/key_add.png","../img/img/silk/resultset_last.png","../img/img/silk/bin.png","../img/img/silk/control_play.png","../img/img/silk/control_pause.png","../img/img/silk/control_fastforward.png","../img/img/silk/control_rewind.png","../img/img/silk/control_end.png","../img/img/silk/control_start.png","../img/img/silk/database_refresh.png","../img/img/silk/plugin.png","../img/img/silk/package_add.png","../img/img/silk/key_go.png","../img/img/silk/door_out.png","../img/img/silk/folder_explore.png","../img/img/silk/vcard.png","../img/img/silk/keyboard.png","../img/img/silk/information.png","../img/img/silk/comments.png","../img/img/silk/bug.png","../img/img/silk/book.png","../img/img/silk/bricks.png","../img/img/silk/lightbulb.png","../img/img/silk/money.png"] 
var loader = [];

this.checkload = function(){
var x = 0;
for(var i = 0; i < loader.length; i++){
if(loader[i].complete){
x ++
}
}
Ax.showBusy()
Ax.setStatus({text:"Preloaded "+x+" out of "+loader.length})

if(x/loader.length != 1){
setTimeout(this,100);
}else{
Ax.setStatus({text: "Finished Preloading",clear: true})
}

}

for(var i = 0; i < images.length; i++){
loader[i] = new Image()
loader[i].src = "../css/"+images[i]
}
this.checkload()
}