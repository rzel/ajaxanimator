var userMode = "login";
var encPW = "";
var userName = "";
var cPrEiD = "";
var cPrEuN = "";

function submitUser(){
if(userMode == "login"){
loginUser()
}else{
registerUser();
}
}

function loginUser(){
var cUsername = $("usrId").value;
var cPassword = hex_md5($("pwId").value);
ajaxpack.postAjaxRequest("../php/login.php", "user="+cUsername+"&pass="+cPassword+"&valid=true&rem=true", loginUserEvent, "txt")
}

function logout(){
$("userQuery").style.display = ""
$("userProfile").style.display = "none";
encPW = "";
userName = "";
}


function loginSucessful(){
$("userQuery").style.display = "none"
$("usrNme").innerHTML = "Welcome&nbsp;" + userName;
$("userProfile").style.display = "";
animationList()
}

function loginUserEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
if(myajax.responseText.substr(1,3).indexOf("S") != -1){
alert("Login Sucessful")
encPW = hex_md5($("pwId").value);
userName = $("usrId").value
loginSucessful()
}else{
alert(myajax.responseText.substr(4).replace(":",""))
}
}
}
}

function registerUser(){
if($("pwId").value = $("pwId2").value){
var cUsername = $("usrId").value;
var cPassword = $("pwId").value;
ajaxpack.postAjaxRequest("../php/register.php", "user="+cUsername+"&pass="+cPassword+"&valid=true", registerUserEvent, "txt")
}
}

function registerUserEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
if(myajax.responseText.substr(1,2).indexOf("S") != -1){
alert("Registration Sucessful")
}else{
alert(myajax.responseText.substr(4).replace(":",""))
}
}
}
}

function changeUserMode(){
if(userMode == "register"){
$("pwId2").style.display = "none"
userMode = "login";
$("userManMode").innerHTML = "Login"
$("changeModeLink").innerHTML = "Register"
}else{
$("pwId2").style.display = ""
userMode = "register";
$("userManMode").innerHTML = "Register"
$("changeModeLink").innerHTML = "Login"
}

}




function savetoserver(){
if($("userProfile").style.display == ""){
var savedata = escape(escape(animationSaveData()));
var nameRequest = prompt('Set a Name For Animation', 'animation' + Math.floor(Math.random()*999));
ajaxpack.postAjaxRequest("../php/savetoserver.php", "user="+userName+"&pass="+encPW+"&data="+savedata+"&name="+nameRequest, savetoserverEvent, "txt")

}else{
alert("Please Login or Register First")
}
}

function savetoserverEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
alert("Save Sucessful");
animationList()
}
}
}


function animationList(){
if(userName != ""){
ajaxpack.postAjaxRequest("../php/listAnimations.php", "user=" + userName, listAnimationEvent, "txt")
}else{
alert("Please Login Before Using This Feature")
}
}

function listAnimationEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
var animationList = myajax.responseText.split(",");
var animations = "";
var qt = '"';
for(var q = 0; q < animationList.length; q++){
var au = animationList[q].replace(".xml","")
animations += "<a href="+qt+"javascript:loadAnimationFromURL('"+animationList[q]+"')"+qt+">"+au+"</a><br>";
}
$("userFiles").innerHTML = animations;
}
}
}


function loadAnimationFromURL(url){
ajaxpack.postAjaxRequest("../users/" + userName + "/animations/" + url, "", loadAnimationEvent, "txt")
}

function loadAnimationEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
loadAnimation(unescape(myajax.responseText))

}
}
}

function refreshOtherAnimations(){
if($("UAB").innerHTML.indexOf("javascript:previewAnimationFromURL") == -1){
browseOtherAnimations()
}else{
var urnQ = $("UAB").innerHTML.split("javascript:previewAnimationFromURL")[1].split(",")[1].split(")")[0].replace("'","").replace("'","")
animationList2(urnQ);
}
}

function browseOtherAnimations(){
ajaxpack.getAjaxRequest("../php/usersList.php", "", otherAnimationsEvent, "txt")
}

function otherAnimationsEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
$("UAB").innerHTML = myajax.responseText
}
}
}

function animationList2(unA){
uAn = unA;
ajaxpack.postAjaxRequest("../php/listAnimations.php", "user=" + unA, listAnimationEvent2, "txt")
}

function LAFC(){
ajaxpack.postAjaxRequest("../users/" + cPrEuN + "/animations/" + cPrEiD, "", loadAnimationEvent, "txt")
}

function listAnimationEvent2(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
var animationList = myajax.responseText.split(",");
var animations = "";
var qt = '"';
for(var q = 0; q < animationList.length; q++){
var au = animationList[q].replace(".xml","")
animations += "<a href="+qt+"javascript:previewAnimationFromURL('"+animationList[q]+"','"+uAn+"')"+qt+">"+au+"</a><br>";
}
$("UAB").innerHTML = animations;
}
}
}

function previewAnimationFromURL(fLn,uAn){
cPrEiD = fLn
cPrEuN = uAn
ajaxpack.postAjaxRequest("../users/" + uAn + "/animations/" + fLn, "", loadAnimationEvent2, "txt")
}

function loadAnimationEvent2(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally

UserWin.activateTab("PreviewAXML");

_lA(unescape(myajax.responseText),"AXMLPlayer");

}
}
}
var _QzX = "";
var _y=1;
var _rq = "f";
function _lA(a,z){
_rq = "t"
document.getElementById(z).innerHTML = "";
var b="http://www.w3.org/2000/svg";var c=document.createElement("div");
c.setAttribute("style","width:480;height:272;overflow:hidden");
var d=new DOMParser();var e=d.parseFromString(a,"text/xml").firstChild.getElementsByTagName("svg");
for(var f=0;f<e.length;f++){var g=document.createElement("div");g.style.display="none";
g.appendChild(document.createElementNS(b,"svg"));var h=e[f].childNodes;for(var i=0;i<h.length;i++){
var j=h[i];var k=j.attributes;var l=document.createElementNS(b,j.tagName);for(var m=0;m<k.length;m++){
l.setAttributeNS(null,k[m].nodeName,k[m].value)}g.firstChild.appendChild(l)}c.appendChild(g)}
document.getElementById(z).appendChild(c);
_rq = "f"
_QzX = z
_pA(z)}
/*old version
function _pA(z){
if(_rq == "f"){
var a=document.getElementById(z).firstChild.childNodes;
a[_y-1].style.display="none";a[_y].style.display="";_y++;
if(_y==a.length){a[_y-1].style.display="none";_y=1;}setTimeout("_pA('"+z+"')",83)
}}
*/
function _pA(z){
if(_rq == "f"){
var a=document.getElementById(z).firstChild.childNodes;
_y++;if(_y==a.length ){_y=0;}
if(_y != 0){a[_y - 1].style.display="none";}
a[_y].style.display="";
setTimeout("_pA('"+z+"')",83)}}


function checkWindows(){
if($("UserAnimations").style.display == "none"){
if(_rq != "f"){
_rq = "f";
if(_QzX != ""){
setTimeout("_pA('"+_QzX+"')",83)
}
}
}else{
_rq = "t";

}
setTimeout("checkWindows()",1000)
}
setTimeout("checkWindows()",5000)