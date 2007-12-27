ajaxanimator.onReady(function(){
historyDS = new Ext.data.SimpleStore({
fields: ['number','action'],
data : [["0","New Animation"]]
});
var historyCM = new Ext.grid.ColumnModel([
	{header: "#", sortable: true,  dataIndex: 'number'},
	{header: "Action", sortable: true,  dataIndex: 'action'}
]);
historyGrid = new Ext.grid.Grid("HistoryContainer", {
ds: historyDS,
cm: historyCM,
autoSizeColumns: true,
monitorWindowResize: true,
trackMouseOver: true
});
historyGrid.render();
historyGrid.on("cellclick",function(e,w){
revertRevision(w)
})
historyLayout = Ext.BorderLayout.create({
 	monitorWindowResize: true,
center: {
margins:{left:.1,top:.1,right:.1,bottom:.1},
panels: [new Ext.GridPanel(historyGrid)]
}
}, 'HistoryLayout');
mainLayout.getRegion('east').getPanel('history-div').on("resize",function(){
historyLayout.layout()
})
});

function resetHistory(){
editHistory = new Array();
editHistoryNumber = 0;
historyDS.removeAll()
}


function revertRevision(numId){
if(typeof(editHistory[numId])=="object"){
resetDefaults({nohistory:true,norevision:true,noclipboard:true})
//Reset application without changing history,revision preview, or clipboard
axml2read(editHistory[numId].axmrec)
updateHist()
addHistory("Revert to " + numId)
}else{
msg("Error!","You have selected an un-revertable edit!")
}
}

function addHistory(data){
var nData = {
action: data,
number: editHistoryNumber
}
historyDS.add(new historyGrid.dataSource.reader.recordType(nData))
}


function undo(){
revertRevision(editHistoryNumber -1);
}

function checkEdit(event){
if (histCheck()){
updateHist()
if(DrawCanvas[currentCanvas].mode != "select"){
var curM = DrawCanvas[currentCanvas].mode;
var result = "";
switch (curM) {
case 'rect': result = 'Rectangle'; break;
case 'roundrect': result = 'Rectangle'; break;
case 'ellipse': result = 'Ellipse'; break;
case 'line': result = 'Line'; break;
}
addHistory("Add&nbsp;" + result)
}else{
addHistory("Select/Move")
}
}
frameCheckEdit()
}

function addHist(text){
if (histCheck()){
updateHist()
addHistory(text)
}
}

function updateHist(){
editHistoryNumber++;
editHistory[editHistoryNumber] = {
cFrame: currentCanvas,
fCount: DrawCanvas[currentCanvas].renderer.svgRoot.childNodes.length,
mkup: DrawCanvas[currentCanvas].renderer.getMarkup(),
axmrec: axml2()
}
}

function histCheck(){
if(!editHistory[editHistoryNumber]){
return true
}
if(currentCanvas != editHistory[editHistoryNumber].cFrame){
return true
}
if(DrawCanvas[currentCanvas].renderer.svgRoot.childNodes.length!=editHistory[editHistoryNumber].fCount){
return true
}
if(DrawCanvas[currentCanvas].renderer.getMarkup() != editHistory[editHistoryNumber].mkup){
return true
}
return false
}
