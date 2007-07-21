var userMode = "login";
var encPW = "";
var userName = "";

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
}

function loginUserEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
if(myajax.responseText.substr(1,2).indexOf("S") != -1){
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