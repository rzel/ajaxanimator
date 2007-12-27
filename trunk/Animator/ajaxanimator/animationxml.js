var axmlversion = 2.11


/*
History as of version 2.06

-2.06 Added Compression
-2.07 Improved Compression
-2.07 Optimize Stuff
-2.08 Fix Compression Bugs
-2.10 No New Format Improvement, but stuff like tweening circles/lines wont work in older versions
-2.11 Added New Attribute Compression
*/

//New fuller, better file format for ajax animator

/* My new proprietary format!

The format divides into 2 parts seperated by ";;". the first is json metadata, and then the actual svg sources
the svg sources essentially only contain keyframes, as tweens can be dynamcially generated, guided by metadata


Example of json section
{
"height":272, //Height of canvas
"width":480, //Width of canvas
"framerate":12, //framerate
"tweens":"1,30", //array of tweens, eg. 1,30 would mean frames 2-29 are tweens
"keyframes":"1,1:30,1", //list of keyframes, a flattened version of keyframeArray
"fTotal":30, //total frames in animation
"active":"12,1", //currently selected frame/layer
"version":2.05 //version for backwards compatibility in future versions
}
Example of compressed SVG section:
<AnimationXML>
-esg0000
<svg>
<rect x="180" y="100" width="130px" height="120px" style="position: absolute;" fill="rgb(153,204,255)" stroke="rgb(0, 0, 0)" stroke-width="1px" id="shape:5a722cac-eef0-124c-d36a-804f761e2a12"></rect>
</svg>
-esg0028
<svg>
<rect x="320" y="20" width="130px" height="120px" style="position: absolute;" fill="rgb(153,204,255)" stroke="rgb(0, 0, 0)" stroke-width="1px" id="shape:5a722cac-eef0-124c-d36a-804f761e2a12"></rect>
</svg>
</AnimationXML>

-esg0028 is a shortened way of doing <svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg>

and it stands for EmptySvG

*/

function checkAXMLVersion(axml){ // basic animationxml test
var dA = unescape(axml)
if(dA.replace(/ /g,"").indexOf("<") < 3 && dA.replace(/ /g,"").indexOf("<") > -1){
return 1.0;
}
var decjsn = Ext.util.JSON.decode(dA.split(";;")[0])
if(decjsn){
if(!decjsn.version){
if(!decjsn.v){
return 2.01
}else{
return decjsn.v
}
}else{
return decjsn.version
}
}else{
return "unknown";
}
}










