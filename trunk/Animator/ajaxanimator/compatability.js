function axml1read(axml,noload){ //Backwards Compatibility Layer

var srcxml = unescape(axml)
var srcdom = parseSVG(srcxml)
var axmlarray = new Array()
var kfr = "";
for(var x = 0; x < srcdom.getElementsByTagName("svg").length; x++){
axmlarray.push((new XMLSerializer()).serializeToString(srcdom.getElementsByTagName("svg")[x]))
kfr+=":"+(x+1)+",1"
}

var jsn = {  //Emulate JSON Metadata
res: "480x272",
fr: 12, //framerate
twn: "", //tweens
kf: kfr.substr(1), //key frames
tf: axmlarray.length, //total frames
vis: "1,1", //visible frame/layer
v: 2.04 //version
}

var axml2upgrade = Ext.util.JSON.encode(jsn)+";;<Ax>"+axmlarray.join("")+"</Ax>"
if(!noload){
axml2read(axml2upgrade)
}
return axml2upgrade

}
