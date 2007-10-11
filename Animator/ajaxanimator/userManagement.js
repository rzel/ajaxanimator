var userMode = "login";
var encPW = "";
var userName = "";
var cPrEiD = "";
var cPrEuN = "";


function failCon(){
Ext.MessageBox.alert("Error:","Connection to server failed. Try Again Later. This might because of server misconfiguration, faulty connection, browser misconfiguration, or server traffic")
}

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
Ext.Ajax.request({
url: "../php/login.php",
params: "user="+cUsername+"&pass="+cPassword+"&valid=true&rem=true",
success: function(e){
if(e.responseText.substr(1,3).indexOf("S") != -1){
Ext.MessageBox.alert("Login Status: Successful","Login Successful")
encPW = hex_md5($("pwId").value);
userName = $("usrId").value
loginSucessful()
}else{
Ext.MessageBox.alert("Login Status: Error",e.responseText.substr(4).replace(":",""))
}
},
failure: failCon
})
}

function logout(){
$("userQuery").style.display = ""
$("userProfile").style.display = "none";
encPW = "";
userName = "";
regbutton.setVisible(true)
logoutbutton.setVisible(false)
}


function loginSucessful(){
$("userQuery").style.display = "none"
$("usrNme").innerHTML = "Welcome&nbsp;" + userName;
$("userProfile").style.display = "";
animationList()
regbutton.setVisible(false)
logoutbutton.setVisible(true)
}




function registerUserCred(user,pass){
Ext.Ajax.request({
url: "../php/register.php",
params:  "user="+user+"&pass="+pass+"&valid=true", 
failure: failCon,
success: function(e){
if(e.responseText.substr(1,2).indexOf("S") != -1){
Ext.MessageBox.alert("Registration Status","Registration Sucessful")
}else{
Ext.MessageBox.alert("Registration Status",e.responseText.substr(4).replace(":",""))
}
}
})
}


function savetoserver(){
if($("userProfile").style.display == ""){
var savedata = escape(escape(animationSaveData()));
Ext.MessageBox.prompt('Animation Name','Set a Name For Animation', function(a,nameRequest){
Ext.Ajax.request({
url: "../php/savetoserver.php",
params:  "user="+userName+"&pass="+encPW+"&data="+savedata+"&name="+nameRequest,
failure: failCon,
success: function(){
Ext.MessageBox.alert("Save Status","Save Sucessful");
animationList()
}
})
});
}else{
Ext.MessageBox.alert("Error:","Please Login or Register First")
}


}



function animationList(){
if(userName != ""){
Ext.Ajax.request({
url: "../php/listAnimations.php",
params: "user=" + userName,
success: function(e){
var animationList = e.responseText.split(",");
var animations = "";
var qt = '"';
for(var q = 0; q < animationList.length; q++){
var au = animationList[q].replace(".xml","")
animations += "<a href="+qt+"javascript:loadAnimationFromURL('"+animationList[q]+"')"+qt+">"+au+"</a><br>";
}
$("userFiles").innerHTML = animations;
},
failure: failCon
})
}else{
Ext.MessageBox.alert("Error:","Please Login First")
}
}


function loadAnimationFromURL(url){
Ext.Ajax.request({
url: "../users/" + userName + "/animations/" + url,
success: function(e){
loadAnimation(unescape(e.responseText))
}
})
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
Ext.Ajax.request({
url: "../php/usersList.php",
failure: failCon,
success: function(e){
$("UAB").innerHTML = e.responseText
}
})
}


function animationList2(unA){
uAn = unA;
ajaxpack.postAjaxRequest( listAnimationEvent2, "txt")
Ext.Ajax.request({
url: "../php/listAnimations.php", 
params: "user=" + unA,
success: function(e){
var animationList = e.responseText.split(",");
var animations = "";
var qt = '"';
for(var q = 0; q < animationList.length; q++){
var au = animationList[q].replace(".xml","")
animations += "<a href="+qt+"javascript:previewAnimationFromURL('"+animationList[q]+"','"+uAn+"')"+qt+">"+au+"</a><br>";
}
$("UAB").innerHTML = animations;
},
failure: failCon
})
}

function LAFC(){
Ext.Ajax.request({
url: "../users/" + cPrEuN + "/animations/" + cPrEiD,
success: function(e){
loadAnimation(unescape(e.responseText));
},
failure: failCon

})
}



function previewAnimationFromURL(fLn,uAn){
cPrEiD = fLn
cPrEuN = uAn
ajaxpack.postAjaxRequest("../users/" + uAn + "/animations/" + fLn, "", loadAnimationEvent2, "txt")
}




var _QzX = "";var _y=1;var _rq = "f";
function _lA(a,z){_rq = "t";_QzX = "";_y=1;
document.getElementById(z).innerHTML = "";
var b="http://www.w3.org/2000/svg";var c=document.createElement("div");
c.setAttribute("style","width:480;height:272;overflow:hidden");
var d=new DOMParser();var e=d.parseFromString(a,"text/xml").firstChild.getElementsByTagName("svg");
for(var f=0;f<e.length;f++){var g=document.createElement("div");g.style.display="none";
g.appendChild(document.createElementNS(b,"svg"));var h=e[f].childNodes;for(var i=0;i<h.length;i++){
var j=h[i];var k=j.attributes;var l=document.createElementNS(b,j.tagName);for(var m=0;m<k.length;m++){
l.setAttributeNS(null,k[m].nodeName,k[m].value)}g.firstChild.appendChild(l)}c.appendChild(g)}
document.getElementById(z).appendChild(c);_rq = "f";_QzX = z;_pA(z)}
function _pA(z){if(_rq == "f"){var a=document.getElementById(z).firstChild.childNodes;
_y++;if(_y==a.length){_y=0}else{a[_y-1].style.display="none"}a[_y].style.display="";setTimeout("_pA('"+z+"')",83)}}

