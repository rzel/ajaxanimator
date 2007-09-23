var igt;
function doDemo(id,text){
if(!igt){
var iga = document.createElement("img")
iga.src = "../images/arrow.png"
iga.id = "arrow";
var igt = document.createElement("table")
igt.appendChild(document.createElement("tr"))
igt.firstChild.appendChild(document.createElement("td"))
igt.firstChild.firstChild.appendChild(iga)
var tdt = document.createElement("td")
tdt.innerHTML = "<div id='demoText'></div>"
igt.firstChild.appendChild(tdt)
igt.style.zIndex = "99999"
igt.onmouseover = function(){
//igt.style.display = "none";
Ext.get(igt).fadeOut(1)
}
document.body.appendChild(igt)
}
Ext.get(igt).dom.style.display = "";
Ext.get(igt).fadeOut(.1)
var oi = id;
Ext.get(igt).setY(Ext.get(oi).getY());
Ext.get(igt).setX(Ext.get(oi).getX());
Ext.get("demoText").dom.innerHTML = text;
}