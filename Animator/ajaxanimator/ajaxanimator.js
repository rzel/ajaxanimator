var onreadyfunct = new Array();
// reference local blank image
Ext.BLANK_IMAGE_URL = '../resources/images/default/s.gif';
// create namespace
Ext.namespace('ajaxanimator');
// create application

ajaxanimator.app = function() {
    return {
        init: function() {
			Ext.QuickTips.interceptTitles = true;
			Ext.QuickTips.init();
			addJS("../lib/prototype.lite.js",function(){
			addLayer();
			timelineResize();
			if(Ext.isIE != true){
			setTimeout("initCanvas();",0)
			}else{
			IEMessage();
			}
			setTimeout("interLoad()",250);
			setTimeout("finishLoad()",1500);
			setTimeout("jsTimeout()", 30000);
			setTimeout("showTehAdz()", 10000);
			});
        }

    };
}();

function setTheme(thId){ //change themes
var sThC = function(t){
if(!document.getElementById("theme")){
var nCSS = document.createElement("link")
nCSS.setAttribute('href', t);
nCSS.setAttribute('type', 'text/css');
nCSS.setAttribute('id','theme')
nCSS.setAttribute('rel','stylesheet')
document.getElementsByTagName("HEAD")[0].appendChild(nCSS);
}


Ext.get("theme").dom.href = t
}
var themeArray = ["default","gray","vista","aero","galdaka"]
var theme = "default";
if(typeof(thId) == typeof(4)){
theme = themeArray[thId];
}else{
if(typeof(thId) == typeof("ajaxanimator")){
theme = thId;
}
}
if(theme == "default"){
sThC("../resources/css/ext-all.css")
}else{
sThC("../resources/css/xtheme-"+theme+".css")
}
}

function jsTimeout(){
	if(!initHistory){
	addJS("../ajaxanimator/historyManagement.js",function(){
	})
	}
}

ajaxanimator.onReady = function(f){
onreadyfunct[onreadyfunct.length + 1] = f
}
ajaxanimator.doReady = function(){
for(var orf = 0; orf < onreadyfunct.length; orf++){
if(onreadyfunct[orf]){
onreadyfunct[orf]()
}
}
}

Ext.onReady(ajaxanimator.app.init, ajaxanimator.app);

	function IEMessage(){
	var IError = "Sorry, your browser is unsupported by the Ajax Animator."
	IError += " This is due to your browser's lack of standards compliance."
	IError += " The application will go to a reduced functionality mode "
	IError += "that will give you a demo of the user interface, with little"
	IError += " to no functionality, if you would like to be able to use the "
	IError += "application, please download and install a standards compliant and somewhat"
	IError += " decent browser, such as Mozilla Firefox, Opera, or Safari 3 Beta+"
	Ext.MessageBox.alert("Error: IE SUCKS!",IError)
	var cS='<div id="IError" style="border:1px solid black;top:0px';
	cS+='width:99%;height:99%;background-color:white;"><center>Sorry! Interent Explorer Is Not Supported!</center></div>';
	$("CanvasContainer").innerHTML+=cS;
	}

function finishLoad(){
addJS("../lib/ajaxroutine.js");
hideLoadingMask()
}

function hideLoadingMask(){
var loading = Ext.get('loading');
var mask = Ext.get('loading-mask');
mask.setOpacity(.8);
mask.shift({
	xy:loading.getXY(),
	width:loading.getWidth(),
	height:loading.getHeight(), 
	remove:true,
	duration:3,
	opacity:.2,
	easing:'bounceOut',
	callback : function(){
		loading.fadeOut({duration:.5,remove:true});
	}
});
}


function interLoad(){
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
historyGrid.on("cellclick",function(e,w,s,g){
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
}

