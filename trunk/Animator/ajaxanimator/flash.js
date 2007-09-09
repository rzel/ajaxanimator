
function preFlash(){
initRevisionBrowser()
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"

if(animationRevision[revisionNumber -1 ] == generateAnimationXML()){
setTimeout("embedAnimationPreview()",100);//hack to make it work right...
}else{
flashVerification()
$('zFlashPreviewDiv').style.height = canvasHeight + 'px';
$('zFlashPreviewDiv').style.width = canvasWidth + 'px';
$('zFlashPreviewDiv').innerHTML = "";
pButton.disable()
pButton.setText( 'generating...')
var swfgen = generateAnimationXML();
if(generateAnimationXML().replace("<svg></svg>","") != '<AnimationXML></AnimationXML>'){
ajaxpack.postAjaxRequest("../freemovie/swfgen.php", "type=preview&height="+canvasHeight+"&width="+canvasWidth+"&framerate="+AnimationFramerate+"&svg=" + swfgen , preFlashEvent, "txt")
}else{$('zFlashPreviewDiv').innerHTML = "Sorry No Preview Availiable:<br> Empty Animation";}
}
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
}


function preFlashEvent(){
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
animationRevision[revisionNumber] = generateAnimationXML();
//$('previewIframe').src = myajax.responseText.replace('files','freemovie/files')
var flashHTML = "";
var FLASHfilename=myajax.responseText.replace('preview','../freemovie/preview');
lastAnimationURL = FLASHfilename;
animationRevisionURL[revisionNumber] = FLASHfilename;
revisionNumber++;
$('previewStatus').innerHTML = "Mode: Preview (Revision " + (revisionNumber - 1) + ")"
flashHTML=genFlashHTML(FLASHfilename)
document.getElementById("zFlashPreviewDiv").innerHTML = flashHTML;
pButton.enable()
pButton.setText( 'Preview')
if(myajax.responseText.indexOf('Warning') != -1 || myajax.responseText.indexOf('Error') != -1 ){
if(myajax.responseText.indexOf('<br>') != -1 || myajax.responseText.indexOf('<b>') != -1 ){
document.getElementById("zFlashPreviewDiv").innerHTML = myajax.responseText ;
}
}
}
}
initRevisionBrowser()
}

function genFlash(){
var zSWFFilename=Ext.MessageBox.prompt("Filename","please enter a file name for the animation",function(btn,zSWFFilename){
if(btn != "cancel"){
zSWFFilename = zSWFFilename.replace(".swf","");
zSWFFilename = zSWFFilename.replace("/","");
zSWFFilename = zSWFFilename.replace(" ","_");
zSWFFilename = zSWFFilename.replace(unescape("%5C"),"");
zSWFFilename = zSWFFilename.replace(":","");
zSWFFilename = zSWFFilename.replace("+","");
zSWFFilename = zSWFFilename.replace("&","");
zSWFFilename = zSWFFilename.replace("?","");
zSWFFilename = zSWFFilename.replace("..","");
eButton.disable()
eButton.setText('generating...');
$('export').innerHTML = '';
var swfgen = generateAnimationXML();
if(generateAnimationXML().replace("<svg></svg>","") != '<AnimationXML></AnimationXML>'){
ajaxpack.postAjaxRequest("../freemovie/swfgen.php", "filename="+zSWFFilename+"&type=export&height="+canvasHeight+"&width="+canvasWidth+"&framerate="+AnimationFramerate+"&svg=" + swfgen , genFlashEvent, "txt")
}
}else{
Ext.MessageBox.alert("Export Flash","Canceled")
}
});


}


function clearPreviews(){
ajaxpack.postAjaxRequest("../freemovie/clearPreviews.php","", clearPreviewEvent, "txt")
}


function clearPreviewEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
alert(myajax.responseText)
}
}
}

function generateSWFResponse(responsedata){
var responseurl = responsedata.replace('files','../freemovie/files');
var absoluteResponseURL = responsedata.replace('files','../freemovie/files');
$('export').innerHTML = '<a id="zExportURL" href="' + responseurl + '>' + responseurl + '</a>';
eButton.enable()
eButton.setText( 'Export Animation');
$('export').innerHTML = '<a id="zExportURL" href="' + $('zExportURL').href + '>' + $('zExportURL').href + '</a>';
}

function genFlashEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
setTimeout('generateSWFResponse("'+myajax.responseText+'")',500)
}
}
}

function flashVerification(){
if(generateAnimationXML().replace("<svg></svg>","") != '<AnimationXML></AnimationXML>'){

}
}

function genFlashHTML(aAnimationURL){
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

function PreviewRevision(revision){
AnimationPlay == true

$("zFlashPreviewDiv").innerHTML = genFlashHTML(animationRevisionURL[revision]);
}

function setRevisionFromBrowser(){
var RevisionBox = $('RevisionBrowser'); 
PreviewRevision(parseInt(RevisionBox.options[RevisionBox.selectedIndex].value));
}

function initRevisionBrowser(){

var zRevisionBrowserHTML = "";
zRevisionBrowserHTML += '<select id="RevisionBrowser" onchange="setRevisionFromBrowser();">'
for(var zRevisionOption = 0; zRevisionOption < animationRevision.length; zRevisionOption++){
var otherOptions = "";
if(zRevisionOption == animationRevision.length -1){
otherOptions = " (HEAD)"
}
if(zRevisionOption == 0){
otherOptions = " (Empty)"
}
zRevisionBrowserHTML += '<option value="'+zRevisionOption+'">Revision: '+zRevisionOption+'' + otherOptions+'</option>'
}
zRevisionBrowserHTML += '</select>'
$('RevisionBrowserDiv').innerHTML = zRevisionBrowserHTML;
try{
$('RevisionBrowser').options[animationRevision.length -1].selected = 'selected';
}catch(err){}
	  
}

