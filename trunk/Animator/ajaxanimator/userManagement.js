var userMode = "login";
var encPW = "";
var userName = "";
var cPrEiD = "";
var cPrEuN = "";
var passField;
var userField;
var fileDS;
var pass2Field;
var fileLayout;
var submitRegister;
var submitLogin;

if(urlParams['autologin']=="true"){ // url parameter to automatically login user
ajaxanimator.onReady(function(){
setTimeout("autoLogin()",1000)
})
}

if(urlParams['autologin']=="demo" || urlParams['autologin']=="default"){ // url parameter to automatically login default user
ajaxanimator.onReady(function(){
setTimeout("autoLogin(1)",1000)
})
}

function smartLogin(){
if(!urlParams['autologin']){
if(readCookie("RemAnimatorUser")&&readCookie("RemAnimatorPass")){
loginUser(readCookie("RemAnimatorUser"),readCookie("RemAnimatorPass"))
}
}
}



function autoLogin(x){
if(x==1){
mainLayout.getRegion('east').showPanel('user-div');
loginUser("Username","Password")
}else{
mainLayout.getRegion('east').showPanel('user-div');
if(readCookie("RemAnimatorUser")&&readCookie("RemAnimatorPass")){
loginUser(readCookie("RemAnimatorUser"),readCookie("RemAnimatorPass"))
}else{
loginUser(userField.getValue(),passField.getValue())
}
}
}

if(urlParams['autoload']){ // url parameter to automatically load animation
ajaxanimator.onReady(function(){
setTimeout('loadAnimationFromURL(urlParams["autoload"].split(",")[1],urlParams["autoload"].split(",")[0])',1000)
//autoload=Username,car-crash.xml
})
}




//ajaxanimator.onReady(drawLogin)

function drawFileList(){
fileDS = new Ext.data.SimpleStore({
fields: ['filename'],
data : null
});
var fileCM = new Ext.grid.ColumnModel([
	{header: "File Name", sortable: true,  dataIndex: 'filename'}
]);
fileGrid = new Ext.grid.Grid("userFileList", {
ds: fileDS,
cm: fileCM,
autoSizeColumns: true,
monitorWindowResize: true,
trackMouseOver: true
});
fileGrid.render();
fileGrid.on("cellclick",function(e,w){
loadAnimationFromURL(fileDS.getAt(w)['data']['filename']+".xml")
})
fileLayout = Ext.BorderLayout.create({
 	monitorWindowResize: true,
center: {
margins:{left:.1,top:.1,right:.1,bottom:.1},
panels: [new Ext.GridPanel(fileGrid)]
}
}, 'userFiles');

mainLayout.getRegion('east').getPanel('user-div').on("resize",function(){
try{
fileLayout.layout()
}catch(err){}
})
}

function drawLogin(){
userField = new Ext.form.TextField({
    name: 'loginUsername',
    id: 'loginUsername',
    allowBlank: false,

	value:"Username"
    })
	
passField = new Ext.form.TextField({
    name: 'loginPassword',
	inputType: 'password',
    allowBlank: false,

	value: "Password"
})
pass2Field = new Ext.form.TextField({
    name: 'registerPassword',
	inputType: 'password',

    allowBlank: false,
	value: "Password"
})
userField.render("userLogin")
passField.render("userLogin")
pass2Field.render("userLogin")
pass2Field.setVisible(false)
submitLogin = new Ext.Button("userLogin",{
	text: 'Login',
	handler: function(){
		loginUser(userField.getValue(),passField.getValue())
	}
})
submitRegister = new Ext.Button("userLogin",{
	text: 'Register',
	handler: function(){
if(passField.getValue()==pass2Field.getValue()){
registerUserCred(userField.getValue(),passField.getValue())
}else{
Ext.MessageBox.alert("Error","Password fields don't match!")
}
}
})
submitRegister.setVisible(false)
}


function renderRegister(){

Ext.get("userLogin").slideOut("t",{callback: function(){
submitLogin.setVisible(false)
submitRegister.setVisible(true)
pass2Field.setVisible(true)
regbutton.setVisible(false)
loginbutton.setVisible(true)
Ext.get("userLogin").slideIn()
}})
}

function hideRegister(autologin){
Ext.get("userLogin").slideOut("t",{callback: function(){
submitLogin.setVisible(true)
submitRegister.setVisible(false)
pass2Field.setVisible(false)
regbutton.setVisible(true)
loginbutton.setVisible(false)
Ext.get("userLogin").slideIn()
if(autologin){
loginUser(userField.getValue(),passField.getValue())
}
}})
}


function loginUser(cUsername,PW,defaultonly){
if(PW.length == 32){
var cPassword = PW
}else{
var cPassword = hex_md5(PW);
}
Ext.Ajax.request({
url: "../php/login.php",
params: "user="+cUsername+"&pass="+cPassword+"&valid=true&rem=true",
success: function(e){
if(e.responseText.substr(0,4).indexOf("S") != -1){
msg("Login Status: Successful","Login Successful")
encPW = cPassword;
userName = cUsername

if(cUsername != "Username"){
createCookie("RemAnimatorUser",cUsername);
createCookie("RemAnimatorPass",cPassword);
}

loginSucessful()
}else{
Ext.MessageBox.alert("Login Status: Error",e.responseText)
}
},
failure: failCon
})
}

function logout(){
Ext.get("userLogin").slideIn()

Ext.get("userProfile").fadeOut()
Ext.get("userFiles").fadeOut()
Ext.get("userFileList").fadeOut()

Ext.get("userFileList").dom.innerHTML = ""

encPW = "";
userName = "";
regbutton.setVisible(true)
logoutbutton.setVisible(false)
fileDS=null;
fileLayout=null;

eraseCookie("RemAnimatorUser");
eraseCookie("RemAnimatorPass");
}


function loginSucessful(){
Ext.get("userLogin").slideOut("t",{duration: 1,callback: function(){
$("userLogin").style.display="none"
}})

Ext.get("userProfile").fadeIn()
Ext.get("userFiles").fadeIn()
Ext.get("userFileList").fadeIn()
animationList()
regbutton.setVisible(false)
logoutbutton.setVisible(true)
if(userName == "Username"){
userMessage.setText("Welcome&nbsp;" + userName +"(demo)")
}else{
userMessage.setText("Welcome&nbsp;" + userName )
}
userMessage.enable()
}




function registerUserCred(user,pass){
Ext.Ajax.request({
url: "../php/register.php",
params:  "user="+user+"&pass="+pass+"&valid=true", 
failure: failCon,
success: function(e){
if(e.responseText.substr(0,3).indexOf("S") != -1){
Ext.MessageBox.alert("Registration Status","Registration Sucessful",function(){
hideRegister(true)
})

}else{
Ext.MessageBox.alert("Registration Status",e.responseText.substr(4).replace(":",""))
}
}
})
}


function savetoserver(){
if($("userProfile").style.display == ""){
var savedata = axml2();//elegant new format!
Ext.MessageBox.prompt('Animation Name','Set a Name For Animation', function(a,nameRequest){
Ext.Ajax.request({
url: "../php/savetoserver.php",
params:  "user="+userName+"&pass="+encPW+"&data="+savedata+"&name="+nameRequest,
failure: failCon,
success: function(e){
if(e.responseText.substr(0,3).indexOf("E") !=-1){
msg("Save Status", "Error! Account Not Valid")
}else{
msg("Save Status","Save Sucessful");
}
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
if(!fileDS){
drawFileList()
}
fileDS.removeAll()
var animationList = e.responseText.split(",");
var animations = "";

for(var q = 0; q < animationList.length - 1; q++){
var au = animationList[q].replace(".xml","")

fileDS.add(new historyGrid.dataSource.reader.recordType({filename:au}))
}
},
failure: failCon
})
}else{
Ext.MessageBox.alert("Error:","Please Login First")
}
}


function loadAnimationFromURL(url,aun){
Ext.Ajax.request({
url: "../users/" + ((aun)?aun:userName) + "/animations/" + url,
success: function(e){
loadAXML(e.responseText)
}
})
}
