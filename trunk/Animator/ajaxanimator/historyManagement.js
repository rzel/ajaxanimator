initHistory = "true"
function resetHistory(){

editHistory = new Array();
editHistoryNumber = 0;
$("HistoryContainer").innerHTML = "<tr><td>0</td><td>New&nbsp;Animation</td></tr>"
}

function revertRevision(numId){
//alert(editHistory[numId -1].id)
//alert(numId)
//$("TCContainer") = editHistory[numId -1]

loadAnimation("<AnimationXML>"  + editHistory[numId] + "</AnimationXML>" )
editHistoryNumber++;
editHistory[editHistoryNumber] =  $("CanvasContainer").innerHTML
addHistory("Revert to " + numId)

}

function addHistory(data){

 var tbl = document.getElementById('HistoryContainer');
  var lastRow = tbl.rows.length;
  //var row = tbl.insertRow(0);
  var row = tbl.insertRow(lastRow);
  var zxdy = editHistoryNumber;
  row.onmousedown = function(){
  revertRevision(zxdy)
  }
  var cellLeft = row.insertCell(0);

  var textNode = document.createTextNode(editHistoryNumber);
  cellLeft.appendChild(textNode);
  var cellRight = row.insertCell(1);
  
  var el = document.createElement('span');
  el.innerHTML = data
  cellRight.appendChild(el);
}


function addHistoryTO(data){

 var tbl = document.getElementById('HistoryContainer');
  var lastRow = tbl.rows.length;
  //var row = tbl.insertRow(0);
  var row = tbl.insertRow(lastRow);
  var zxdy = editHistoryNumber;
  var cellLeft = row.insertCell(0);

  var textNode = document.createTextNode(editHistoryNumber);
  cellLeft.appendChild(textNode);
  var cellRight = row.insertCell(1);
  
  var el = document.createElement('span');
  el.innerHTML = data
  cellRight.appendChild(el);
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

function clearHist(){
$("HistoryContainer").innerHTML = "";
}