var igt;
var iga;
var tutorial;
var cftid;
var cHelpFunc;


function calcHelpAction(startNewTutorial){
canceltutorial.setVisible(true)
if(startNewTutorial){
if(!igt||!iga){
iga = document.createElement("img")
iga.src = "../images/arrow2.png"
iga.style.zIndex = "99999"
iga.style.position = "absolute"
iga.style.display = "none"
document.body.appendChild(iga)
igt = document.createElement("div")
igt.style.zIndex = "99999"
igt.style.position = "absolute"
igt.style.display = "none"
document.body.appendChild(igt)
}
cftid = 0
if(typeof(startNewTutorial)==typeof("String")){
tutorial = Ext.util.json.decode(startNewTutorial)
}else{
tutorial = startNewTutorial
}
Ext.MessageBox.alert(tutorial.title,tutorial.msg,function(e){
if(e == "ok"){
calcHelpAction()
}else{
msg("Interactive Tutorial","Cancelled")
}
})
return
}

if(typeof(tutorial)=="object"){

if(!tutorial.content[cftid]){
canceltutorial.setVisible(false)
Ext.MessageBox.alert(tutorial.finishTitle,tutorial.finishMsg);
return
}

var cEl;
if(typeof(tutorial.content[cftid].el) == typeof("string")){
cEl = tutorial.content[cftid].el
}else{
cEl = tutorial.content[cftid].el()
}

if(!Ext.get(cEl)){setTimeout("calcHelpAction()",1000);return}

Ext.get(iga).fadeIn() //show image
igt.innerHTML = makeBox("tutorial",tutorial.content[cftid].msg) //set content
Ext.get(igt).fadeIn() //show text
Ext.get(iga).moveTo(Ext.get(cEl).getX()+10,Ext.get(cEl).getY()+10,true);
Ext.get(igt).moveTo(Ext.get(cEl).getX()+110,Ext.get(cEl).getY()+10,true);
for(var i = 0 ; i < 5; i++){
if(tutorial.content[cftid].anim == "fade"){
Ext.get(cEl).fadeOut()
Ext.get(cEl).fadeIn()
}else{
Ext.get(cEl).highlight(tutorial.content[cftid].color)
}
}
var ubuntu = function(){
Ext.get(document.body).un("mouseup",ubuntu);
Ext.get(iga).fadeOut();Ext.get(igt).fadeOut()
cftid++
setTimeout("calcHelpAction()",2000)
}
Ext.get(document.body).on("mouseup",ubuntu)
}else{
if(tutorial=="cancel"){
canceltutorial.setVisible(false)
msg("Interactive Tutorial","Cancelled")
}
}
}



function basictutorial2(){
var markup = {
title: "Interactive Tutorial",
msg: "Welcome To the Ajax Animator Basic Tutorial V0.3 Alpha<br>Press 'Ok' to continue",

finishTitle: "Finished Tutorial",
finishMsg: "Congratulations, You have sucessfully completed the ajax animator beginner interactive tutorial version 0.3 Alpha",

content: [
{el: "fillcolor",
msg: "Press The Fill Color Icon to select object background color"
},
{
el: function(){return Ext.select(".color-99CCFF").elements[0]},
msg: "Select Color",
anim: "fade"
},
{
el: function(){return Ext.select(".x-dlg-close").elements[0]},
msg: "Close Dialog",
anim: "fade"
},
{
el: "CanvasContainer",
msg: "Draw Object"
},
{
el: "frame30layer1",
msg: "Go To Frame 30"
},
{
el: "select",
msg: "Use 'select' tool"
},
{
el: "CanvasContainer",
msg: "Move Object"
},
{
el: function(){return mainLayout.getRegion('center').tabs.items[1].textEl.id},
msg: "Preview Animation",
anim: "fade"
}
]
}

if(generateAXML2(true).length > 50){
Ext.Msg.confirm("Warning","Starting the tutorial will erase everything on the canvas. Continue?",
function(e){if(e=="yes"){calcHelpAction(markup)}else{
msg("Cancelled","Tutorial Cancelled")}})}else{calcHelpAction(markup)}

}