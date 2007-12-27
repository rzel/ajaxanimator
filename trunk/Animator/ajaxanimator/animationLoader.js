function confirmNewCanvas(){
Ext.Msg.confirm("Warning","Creating a new animation will erase everything on the canvas. Continue?",
function(e){if(e=="yes"){resetDefaults()}})
}


function resetDefaults(config){
var isConfig = false;
if(typeof(config)=="object"){isConfig=true}
function no(str){
if(isConfig){
if(typeof(config["no"+str])=="boolean"){
if(config["no"+str]==true){
return false
}else{
return true
}
}
}
return true
}
//Reset HTML Values
$("CanvasContainer").innerHTML = "";
$("frameContainer").innerHTML = "";
//Reset Timeline Values
keyframeArray = new Array();
tweenArray = new Array(); 
tweenRecalc = new Array();
currentFrame = 1;
currentLayer = 1;

totalFrames = 1;
layerMaxFrames = 300;
layerCount = 0;
frameTable = null;
//Clear Edit History
if(no('history')){
resetHistory()
}
if(no('revision')){
//Clear Revision History
revisionNumber = 1;
animationRevision = new Array();
animationRevisionURL = new Array();
lastAnimationURL = '';
}
//Clear Drawing Arrays
DrawLayer = new Array();
DrawCanvas = new Array();
zCurrentCanvasMode = 'rect';
if(no('history')){
editHistoryNumber = 0;
editHistory = new Array();
}
if(no('clipboard')){
clipboardTagStr = "";
clipboardAtt = null;
}
currentCanvas = 1;
AnimationPlay = false;
//Simulate Init
addLayer();
initCanvas();
}


function setSD(){
if(DrawCanvas[currentCanvas].mode == "select" && DrawCanvas[currentCanvas].selected != null){
$("ResizeObjOpt").style.display = ""
$("noSelectRem").style.display = "none"
$('sHeight').value = DrawCanvas[currentCanvas].selected.attributes['height'].nodeValue;
$('sWidth').value = DrawCanvas[currentCanvas].selected.attributes['width'].nodeValue;
}else{
$("ResizeObjOpt").style.display = "none"
$("noSelectRem").style.display = ""
}
}

function setSP(){
DrawCanvas[currentCanvas].selected.attributes['width'].nodeValue	= $("sWidth").value
DrawCanvas[currentCanvas].selected.attributes['height'].nodeValue	= $("sHeight").value
DrawCanvas[currentCanvas].renderer.showTracker(DrawCanvas[currentCanvas].selected)
}


function openfromcomputer(){
Ext.MessageBox.show({
title: "Open Project File",
msg: '<form enctype="multipart/form-data" id="uploadForm" target="uploadIframe" action="../php/upload.php" method="post"><input name="uploaded" type="file"></form>',
buttons: Ext.MessageBox.OKCANCEL,
width: 250,
//modal: false,
fn: function(e){
if(e=="ok"){
Ext.get("uploadForm").dom.submit();
Ext.MessageBox.progress("Loading Animation From Computer","Initializing...")
Ext.MessageBox.updateProgress(.4,"Uploading...")
}else{
msg("Cancelled","Upload Cancelled!")
}
//document.getElementsByName("uploaded")
}
})
}

function finishUpload(){
Ext.MessageBox.updateProgress(.8,"Downloading...")
var reply = uploadIframe.document.body.innerHTML
//You only want the data
var axml = reply.substr(0,reply.indexOf("UPLOADDATAEND"))
Ext.MessageBox.hide()
loadAXML(axml)
}

function savetotext(){
Ext.Msg.alert("Save Animation As Text","<textarea style='width:100%;height:250px'>"+axml2()+"</textarea>")
}

function openfromtext(){
Ext.MessageBox.prompt("Load Animation From Text","",function(f,r){
if(f=="ok"){
loadAXML(r)
}else{
msg("Cancelled","Animation Loading Cancelled")
}
},null,250)
}

function saveAnimation(){

Ext.MessageBox.prompt("Filename","please enter a file name for the animation",function(s,k){
if(s=="ok"){
if(k.length > 2){ //If Empty thne
var x = document.createElement("form")
x.action = "../php/virtualSave.php"
x.method = "POST"
x.target = "saveIframe"
var f = document.createElement("textarea")
f.name = "content"
f.value = axml2()
var z = document.createElement("input")
z.type="text"
z.name="fn"
z.value=k
x.appendChild(f)
x.appendChild(z)
$("miscDiv").appendChild(x)
x.submit()
$("miscDiv").removeChild(x);
}else{
window.location= dataUrl(axml2(), "application/ajaxanimator") //Backup System
}
}
})
}