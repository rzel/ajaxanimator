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
			if(Ext.isIe != true){
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
	cS+='width:99%;height:99%;background-color:white;"></div>';
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

}