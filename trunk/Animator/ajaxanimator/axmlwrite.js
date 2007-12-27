
function axml2(compression){ 
return repCompress(axmljsongen(compression)+";;"+generateAXML2(compression)) //json+svg=axml2 ...so elegant :)
}


function axmljsongen(nocompression){
var jsonSection = {
//height: canvasHeight, //depricated for res
//width: canvasWidth, //depricated for res
res: canvasWidth.toString()+"x"+canvasHeight.toString(),
fr: AnimationFramerate, //framerate
twn: tweenRecalc.unique().join(":"), //tweens
kf: keyframeArray.unique().join(":"), //key frames
tf: totalFrames, //total frames
vis: (currentFrame+","+currentLayer), //visible frame/layer
v: axmlversion
}

var jsonStr = Ext.util.JSON.encode(jsonSection)
if(!nocompression){
return axmJSONCompress(jsonSection,jsonStr)
}else{
return jsonStr
}
}


function axmJSONCompress(jsonObj,jsonStr){
for(x in jsonObj){
jsonStr=jsonStr.replace('"'+x.toString()+'"',x.toString())
}
return jsonStr
}






function generateAXML2(nocompression){
DrawCanvas[currentCanvas].unselect();
var axmlsrc = "<Ax>"
var tweenBuffer = 0;
for(var pzxy = 1; pzxy <= totalFrames;pzxy++){
if(!frameIsEmpty(pzxy,1) && !isTween(pzxy,1)){
if(tweenBuffer>0){
var tba = tweenBuffer.toString();
while(tba.length < 4){tba="0"+tba}
if(tba>0){
axmlsrc+="-esg"+tba;
}
tweenBuffer=0;
}
axmlsrc+=DrawCanvas[pzxy].renderer.getMarkup()
}else{
if(!nocompression){
tweenBuffer++
}else{
axmlsrc+="<svg></svg>"
}
}
}
axmlsrc+="</Ax>"

if(!nocompression){axmlsrc=AXMLCompress(axmlsrc)}

return escapeAXML(axmlsrc);

}

function escapeAXML(axml){
var enc = axml
enc=escape(enc)
enc=enc.replace(/%3E/g,escape("%3E")) //>
enc=enc.replace(/%3C/g,escape("%3C")) //<
return unescape(enc)
}


function AXMLCompress(axmlsrc){ //it should be transparentAXML2Compression or subtleAXML2Compression but that's too long
var encAXML = escape(axmlsrc) //Escape text so it doesnt screw with regexs

function recRep(origStr,newStr){
if(!newStr){newStr=""}
encAXML = encAXML.replace(new RegExp(escape(origStr),"g"),escape(newStr))
}
function rr(os){recRep('></'+os+'>'," />")}

recRep('style="position: absolute;"') //replace all style attributes
rr("line");rr("rect");rr("ellipse") //replace stuff like <rect></rect> with stuff like <rect />
axmlsrc = unescape(encAXML) //un-de-crapify it

//Take out spaces in rgb(0,0,0)
var cac = axmlsrc
for(var fz=0;fz<axmlsrc.split("rgb(").length;fz++){
cac = cac.substr(cac.indexOf("rgb(",fz))
var fd=cac.substr(0,cac.indexOf(")")+1)
axmlsrc=axmlsrc.replace(fd,fd.replace(/ /g,""))}
//Take out doublespaces
axmlsrc=axmlsrc.replace(/  /g," ") //one little space killed my script; it's fixed now
axmlsrc=axmlsrc.replace(/  /g," ") //re-remove double spacelets
axmlsrc=axmlsrc.replace(/  /g," ") //yay removeypoo
//Remove px from attributes since it's the only refrenced unit anyways
axmlsrc=axmlsrc.replace(/px/g,"")
//Return with the compressed stuff
return axmlsrc


}

function repCompress(axmlsrc){
axmlsrc=escape(axmlsrc)
function r(x,y){axmlsrc=axmlsrc.replace((new RegExp(escape(x),"g")),y)} //Encode
r("stroke=","se=")
r("fill=","fl=")
r("height=","hg=")
r("stroke-width=","sw=")
return unescape(axmlsrc)
}
