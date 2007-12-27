//Window Management Code//
var disablePopupAds = false;

function openDebug(){
startCheckDebugger()
}

function startCheckDebugger(status){
if(Ext.log){
Ext.log("Debug Console Opened")
return
}
if(!status || status == 1){
var sc1 = document.createElement("script")
sc1.type="text/javascript"
sc1.src="../ext/debug-min.js"
}else if(status==2){
var sc1 = document.createElement("script")
sc1.type="text/javascript"
sc1.src=alternateHost+"/ext/debug-min.js"
}else if(status==3){
Ext.MessageBox.alert("Error","Failed to open debug console")
}
checkDebug()
}

function checkDebug(tries){
if(Ext.log){
//Go L2 Load Debugger
Ext.log("Debug Console Opened")
}else{
//Try Again
if(trues > 5){
startCheckDebugger(2)
return
}
setTimeout("checkDebug("+(tries+1)+")",100)
}
}

var colorDialog;
var GoogAd;


function showColorDialog(){

    if(!colorDialog){ // lazy initialize the colorDialog and only create it once

	initColor();
	
        colorDialog = new Ext.LayoutDialog("color-dialog", { 
                modal:false,
                width:285,
                height:285,
                shadow:true,
                minWidth:010,
                minHeight:010,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: true
                }
        });
        colorDialog.addKeyListener(27, colorDialog.hide, colorDialog);
//        colorDialog.addButton('Close', colorDialog.hide, colorDialog);
        
        var layout = colorDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('colorPicker', {title: 'Color Picker'}));
        layout.add('center', new Ext.ContentPanel('colorPalette', { title: 'Color Palette'}));
        layout.endUpdate();
    }else{
	picker.huePointer.dom.style.left="-2px";
	}
	colorDialog.show()
	//colorDialog.show(Ext.get('show-colorDialog-btn').dom);
}




function showTehAdz(){
if(disablePopupAds){return}
if($("GoogAd")){
if($("GoogAdBody").innerHTML.replace(/\s+/g,"").length > 15){
if(!GoogAd){
GoogAd = new Ext.BasicDialog("GoogAd",{
        modal:false,
        width:360,
        height:330,
        shadow:true,
        minWidth:360,
        minHeight:330
});
}
GoogAd.show()
setTimeout("showTehAdz()",30000);
}
}

}
