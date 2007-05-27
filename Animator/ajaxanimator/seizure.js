var qa=new Array();var i=1;
qa[1]='red';qa[2]='blue';qa[3]='green';
function qc(){
document.getElementById("seizurediv").style.backgroundColor=qa[i];
i++;if(i>3){i=1}setTimeout('qc()',10)}qc();
