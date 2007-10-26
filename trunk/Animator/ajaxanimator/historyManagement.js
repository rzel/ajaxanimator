ajaxanimator.onReady(function(){
historyDS = new Ext.data.SimpleStore({
fields: ['number','action'],
data : [["0","New Animation"]]
});
var historyCM = new Ext.grid.ColumnModel([
	{header: "#", sortable: true,  dataIndex: 'number'},
	{header: "Action", sortable: true,  dataIndex: 'action'},
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
loadAnimation("<AnimationXML>"  + editHistory[numId] + "</AnimationXML>" )
editHistoryNumber++;
editHistory[editHistoryNumber] =  $("CanvasContainer").innerHTML
addHistory("Revert to " + numId)
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
if (editHistory[editHistoryNumber] != $("CanvasContainer").innerHTML){
editHistoryNumber++;
editHistory[editHistoryNumber] = $("CanvasContainer").innerHTML
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
}

function addHist(text){
if (editHistory[editHistoryNumber] != $("CanvasContainer").innerHTML){
editHistoryNumber++;
editHistory[editHistoryNumber] = $("CanvasContainer").innerHTML
addHistory(text)
}
}

