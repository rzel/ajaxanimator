ajaxanimator.onReady(function(){

$("fillcolor").style.backgroundImage = "url('"+imgURL+"/bucket.png')"
$("linecolor").style.backgroundImage = "url('"+imgURL+"/pencil.png')"

$("fillcolor").style.backgroundColor = "#ff0000"
$("linecolor").style.backgroundColor = "#000000"

var genDB = new Array(
	"select|select.gif",
	"rect|rectangle.gif",
	"roundrect|roundrect.gif",
	"ellipse|circle.gif",
	"line|line.gif",
	"delete|delete.gif"
	)
	var tbdiv = document.getElementById("tbIcon")
	var toolTable = document.createElement("table")
	var toolTBody = document.createElement("tbody")
	var tObjCnt = 0;
	for(var tRowN = 0; tRowN < 3; tRowN++){
	var tRow = document.createElement("tr")
	for(var tColN = 0; tColN < 2; tColN++){
	var tCol = document.createElement("td")
	var tsAD = genDB[tObjCnt].split("|")
	tObjCnt++;
	var tCDiv = document.createElement("div")
	tCDiv.id = tsAD[0]
	tCDiv.className = "toolbarItem"
	var tcvDiv = document.createElement("div")
	tcvDiv.className = "centerVertical"
	var tvImg = document.createElement("img")
	tvImg.src = imgURL+"/"+tsAD[1]
	tvImg.className = "toolbarItem";
	tcvDiv.appendChild(tvImg)
	tCDiv.appendChild(tcvDiv)
	tCol.appendChild(tCDiv)
	tRow.appendChild(tCol)
	}
	toolTBody.appendChild(tRow)
	}
	toolTable.appendChild(toolTBody)
	tbdiv.appendChild(toolTable)
})


var drawTools = new Object();
drawTools.select = function(){setMode('select', 'Selection');}
drawTools.rect = function(){setMode('rect', 'Rectangle');}
drawTools.roundrect = function(){setMode('roundrect', 'Rounded Rectangle');}
drawTools.ellipse = function(){setMode('ellipse', 'Ellipse / Circle');}
drawTools.line = function(){setMode('line', 'Line');}


ajaxanimator.onReady(function(){
iconId = new Array("select","rect","roundrect","ellipse","line","delete") 
for(var iid = 0; iid < iconId.length; iid++){
(function(id){
Ext.get(id).on("mouseover",function(){
if($(id).style.backgroundImage.indexOf("selectedMask") == -1){
$(id).style.backgroundImage = "url("+imgURL+"/buttonMask.png)"
}
})
Ext.get(id).on("mouseout",function(){
if($(id).style.backgroundImage.indexOf("buttonMask") != -1){
$(id).style.backgroundImage = ""
}
})
Ext.get(id).on("click",function(){
if(id == "delete"){
changeSelectedUI("delete")
deleteShape()
setTimeout("drawTools.select();",100);//some eyecandy
}else{
drawTools[id]()
}
})
})(iconId[iid])
}

////Register random crap tooltips
Ext.QuickTips.register({target: "select",text: "Select Tool",trackMouse:true})
Ext.QuickTips.register({target: "rect",text: "Rectangle Draw Tool",trackMouse:true})
Ext.QuickTips.register({target: "roundrect",text: "Rounded Rectangle Draw Tool",trackMouse:true})
Ext.QuickTips.register({target: "ellipse",text: "Ellipse/Circle Draw Tool",trackMouse:true})
Ext.QuickTips.register({target: "line",text: "Line Draw Tool",trackMouse:true})
Ext.QuickTips.register({target: "delete",text: "Delete Selected Object",trackMouse:true})




/////////////LINE WIDTH/////////////////////////


    var lineWidthStore = new Ext.data.SimpleStore({
        fields: ['size'],
        data : [["1px"],["2px"],["3px"],["4px"],["5px"],["6px"],["7px"],["8px"],["9px"],["10px"],
		["11px"],["12px"],["13px"],["14px"]]
    });
    lineWidth = new Ext.form.ComboBox({
        store: lineWidthStore,
        displayField:'size',
        typeAhead: true,
   	grow: true,
	mode: 'local',
	value: "1px",
        triggerAction: 'all',
	minLength: 1,
        selectOnFocus:true,
        resizable:true
    });
	lineWidth.on("select",function(c){
	setLineWidth()
	})
    lineWidth.applyTo('linewidth');

lineWidth.setSize(lineWidth.container.getWidth())

 }) //end ajaxanimator.onready




//This is the Little Pause/Play Stuff that goes under the canvas/preview

ajaxanimator.onReady(function(){
editControlToolbar("canvasControlBar",1)
})

function editControlToolbar(con,map){
if($(con)){
if(!$(con).firstChild){

Ext.get("TpreFrame").on("click",function(e){
if(mainLayout.getRegion('center').activePanel.getId()=="canvas-div"){
preFrame()
}else{
fPre()
}
})
Ext.get("TnxtFrame").on("click",function(e){
if(mainLayout.getRegion('center').activePanel.getId()=="canvas-div"){
nextFrame()
}else{
fNext()
}
})
Ext.get("TplayAnim").on("click",function(e){
if(mainLayout.getRegion('center').activePanel.getId()=="canvas-div"){
playAnimation()
}else{
fPlay()
}})
Ext.get("TstopAnim").on("click",function(e){
if(mainLayout.getRegion('center').activePanel.getId()=="canvas-div"){
stopAnimation()
}else{
fStop()
}})

var nImg = document.createElement("img")
nImg.usemap = "#ControlMap"
nImg.setAttribute("usemap","#ControlMap")
nImg.src = imgURL+"/controlToolbar.png"
$(con).appendChild(nImg)
}
}
}


