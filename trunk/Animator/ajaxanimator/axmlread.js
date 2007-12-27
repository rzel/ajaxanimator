function loadAXML(axml,nogui){
//Loads AXML, and still checks stuff
function readAXMLsrc(){
if(checkAXMLVersion(axml)!="unknown"){
resetDefaults()
if(checkAXMLVersion(axml)<2){
msg("Warning!","Attempting Backwards Compatability Mode")
axml1read(axml)
}else{
axml2read(axml)
}
}else{
msg("Error","Unknown/Invalid Project File")
}
}

if(checkAXMLVersion(axml) > axmlversion){
Ext.MessageBox.alert("Error!","You are trying to open a file created by a newer version of this application!")
return
}
if(generateAXML2(true).length > 50 && !nogui){
Ext.Msg.confirm("Warning","Opening an animation will erase everything on the canvas. Continue?",
function(e){if(e=="yes"){readAXMLsrc()}})}else{readAXMLsrc()}

}


function axmJSONDecL1(jsn){
var decjsn = Ext.util.JSON.decode(jsn)
tweenArray = generateTweenArray(decjsn.twn)
keyframeArray = decjsn.kf.split(":")
canvasHeight = decjsn.res.split("x")[1]
canvasWidth = decjsn.res.split("x")[0]
totalFrames = decjsn.tf
setCP()
AnimationFramerate = decjsn.fr
tweenRecalc = decjsn.twn.split(":")
}

function axmJSONDecL2(jsn){
var decjsn = Ext.util.JSON.decode(jsn)
gotoframe(decjsn.vis.split(",")[0],decjsn.vis.split(",")[1])
}



function axml2read(axml){
axml=repDeflate(unescape(axml))
var jsondata = axml.split(";;")[0]
var xmldata = decompressAXML2(axml.split(";;")[1])
var anim = parseSVG(xmldata)
for(var t = 0; t < anim.firstChild.childNodes.length; t++){
if(!DrawCanvas[t+1]){
makeCanvasFromId(t+1);
}
loadFrame((new XMLSerializer()).serializeToString(anim.firstChild.childNodes[t]),t+1)
}
axmJSONDecL1(jsondata)
for(var r = 0; r < anim.firstChild.childNodes.length; r++){
gotoframeUI(r+1,1)
}
recalculateTweens()
axmJSONDecL2(jsondata)
}

function generateTweenArray(gents){ //It' part of read even if it says generate in it's name
var ta = new Array()
for(var m = 0; m < gents.split(":").length; m++){
var twf1 = gents.split(":")[m].split(",")[0]
var twf2 = gents.split(":")[m].split(",")[1]
for(var i = 1; i < (twf2-twf1); i++){
ta.push((parseInt(i)+parseInt(twf1))+",1")
}
}
return ta.unique()
}



function decompressTweens(x){
while(x.indexOf("-esg")!=-1){
var num = x.match(new RegExp("-esg....","g"))[0].substr(4)
while(num.substr(0,1) == "0"){num = num.substr(1)}
var snum = parseInt(num)
var ac = ""
while(snum>0){ac+="<svg></svg>";snum--}
x=x.replace(new RegExp(x.match(new RegExp("-esg....","g"))[0],"g"),ac)
}
return x
}

function decompressAXML2(x){
return decompressTweens(x)
}



function repDeflate(axmlsrc){
//NOTE TO SELF
//when doing this compression, NEVER, Ever have the abbreation equivalent to the last two letters of the original
//Eg. height, should never be abbreated as ht, maybe hg, he, hi, hh, but NEVER ht
//////////////
axmlsrc=escape(axmlsrc)
function r(x,y){axmlsrc=axmlsrc.replace((new RegExp(escape(y),"g"))," "+x)} //Decode
r("stroke=","se=")
r("fill=","fl=")
r("height=","hg=");//used to be ht=, but that caused many, many problems, but this might break some (though none that i didnt make)
r("stroke-width=","sw=")

return unescape(axmlsrc)
}