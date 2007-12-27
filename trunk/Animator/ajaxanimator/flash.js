var fGenDir = "../freemovie/"


function preFlash(){
updateRevisionList()
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
if(animationRevision[revisionNumber -1 ] == generateAnimationXML()){
setTimeout("embedAnimationPreview()",100); //hack to make it work right...
}else{
$('zFlashPreviewDiv').style.height = canvasHeight + 'px';
$('zFlashPreviewDiv').style.width = canvasWidth + 'px';
$('zFlashPreviewDiv').innerHTML = "";
pButton.disable()
pButton.setText( 'generating...')
var swfgen = generateAnimationXML();
if(swfgen.length > 50){
Ext.Ajax.request({
url: fGenDir+"swfgen.php",
params: {
type: "preview",
height: canvasHeight,
width: canvasWidth,
framerate: AnimationFramerate,
svg: swfgen
},
success: function(e){

animationRevision[revisionNumber] = generateAnimationXML();

var FLASHfilename=fGenDir+e.responseText
lastAnimationURL = FLASHfilename;
animationRevisionURL[revisionNumber] = FLASHfilename;
revisionNumber++;

$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
var flashHTML = genFlashHTML(FLASHfilename)

document.getElementById("zFlashPreviewDiv").innerHTML = flashHTML;

pButton.enable()
pButton.setText('Preview')

updateRevisionList()

}
})
}else{$('zFlashPreviewDiv').innerHTML = "Empty Animation";}
}
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
}




function genFlash(){
Ext.MessageBox.prompt("Filename","please enter a file name for the animation",function(btn,zSWFFilename){
if(btn != "cancel"){

zSWFFilename = zSWFFilename.replace(".swf","");
zSWFFilename = escape(zSWFFilename)
eButton.disable()
eButton.setText('generating...');
exportText.getEl().dom.innerHTML = ""
var swfgen = generateAnimationXML();
if(swfgen.length > 50){


Ext.Ajax.request({
url: fGenDir+"swfgen.php",
params: {
filename: zSWFFilename,
type: "export",
height: canvasHeight,
width: canvasWidth,
framerate: AnimationFramerate,
svg: swfgen
},
success: function(e){
generateSWFResponse(e.responseText)
}

})

}
}else{
msg("Export Flash","Canceled")
}
});


}


function generateSWFResponse(responsedata){
var responseurl =fGenDir+responsedata
exportText.getEl().dom.innerHTML = '<a id="zExportURL" href="' + responseurl + '>' + responseurl + '</a>';
eButton.enable()
eButton.setText( 'Export&nbsp;Animation');
exportText.getEl().dom.innerHTML = '<a id="zExportURL" href="' + $('zExportURL').href + '>' + $('zExportURL').href + '</a>';
$('saveIframe').src = "../php/saveRedirect.php?url="+responseurl+"&fn="+responseurl.substring(responseurl.lastIndexOf("/")+1)
}



function genFlashHTML(aAnimationURL){
//alert(aAnimationURL)
var zflashHTML = "";
zflashHTML='<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase= '
zflashHTML+='"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"'
zflashHTML+='WIDTH="'+canvasWidth+'" HEIGHT="'+canvasHeight+'" id="fpre">'
zflashHTML+='<param name="swLiveConnect" value="true" /><param name="allowScriptAccess" value="always" />'
zflashHTML+='<param name="wmode" value="transparent" /><param name="bgcolor" value="#000000" /><PARAM NAME=movie VALUE="'+ aAnimationURL+'">'
zflashHTML+='<PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#FFFFFF><EMBED src="' + aAnimationURL+'" '
zflashHTML+=' quality=high bgcolor=#FFFFFF WIDTH="'+canvasWidth+'" HEIGHT="'+canvasHeight+'"'
zflashHTML+=' wmode="transparent" id="fpre" swliveconnect="true" allowscriptaccess="always"'
zflashHTML+='NAME="" ALIGN="" TYPE="application/x-shockwave-flash"';
zflashHTML+='PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>'
return zflashHTML;
}

function embedAnimationPreview(){
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"

document.getElementById("zFlashPreviewDiv").innerHTML = genFlashHTML(lastAnimationURL);
}

function updateRevisionList(){
previewRevisionStore.removeAll()
var v;
for(var zRevisionOption = 0; zRevisionOption < animationRevision.length; zRevisionOption++){
v = 'Revision: '+zRevisionOption
if(zRevisionOption == animationRevision.length -1){v+=" (HEAD)"}
if(zRevisionOption==0){v+=" (Empty)"}
previewRevisionStore.add(new historyGrid.dataSource.reader.recordType({revision:v}))
}
previewRevision.setValue(v)
}

function getFlashObject(movieName){

if(navigator.appName.indexOf("Microsoft Internet")==-1){
if(document.embeds && document.embeds[movieName]){
return document.embeds[movieName]; 
}
if (window.document[movieName]) {
return window.document[movieName];
}
}else{
return document.getElementById(movieName);
}

}

function fNext(){

 getFlashObject("fpre").GotoFrame(parseInt(getFlashObject("fpre").TGetProperty("/", 4)));
}
function fPre(){
 getFlashObject("fpre").GotoFrame(parseInt(getFlashObject("fpre").TGetProperty("/", 4))-2);
}
function fPlay(){
getFlashObject("fpre").Play()
}
function fStop(){
getFlashObject("fpre").StopPlay()
}