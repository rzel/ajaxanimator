

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

