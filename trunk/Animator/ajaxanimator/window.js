function openDebug(){
if(Ext.log){
Ext.log("Debug Console Opened")
}else{
addJS("../ext/debug-min.js",function(){
Ext.log("Debug Console Opened")
})
}
}

var colorDialog;
var GoogAd;


function showColorDialog(){
    if(!colorDialog){ // lazy initialize the colorDialog and only create it once

	initColor();
	
        colorDialog = new Ext.LayoutDialog("color-dialog", { 
                modal:false,
                width:400,
                height:290,
                shadow:true,
                minWidth:400,
                minHeight:290,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: true
                }
        });
        colorDialog.addKeyListener(27, colorDialog.hide, colorDialog);
        colorDialog.addButton('Close', colorDialog.hide, colorDialog);
        
        var layout = colorDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('colorPicker', {title: 'Color Picker'}));
        layout.add('center', new Ext.ContentPanel('colorPalette', { title: 'Color Palette'}));
        layout.endUpdate();
    }
	colorDialog.show()
	//colorDialog.show(Ext.get('show-colorDialog-btn').dom);
}

var currentRegUsername = "";
var currentRegPassword = "";
function initRegTools(){
usernameField = new Ext.form.TextField({value: 'Username'})
usernameField.on("change",function(textObj,newVal,oldVal){
currentRegUsername = newVal;
});
usernameField.render(Ext.get("registerDialog"))
$("registerDialog").appendChild(document.createElement("br"))
passwordField = new Ext.form.TextField({id: 'regPw',value: 'Password'})
passwordField.on("change",function(textObj,newVal,oldVal){
currentRegPassword = newVal
});
passwordField.render(Ext.get("registerDialog"))
addCSS("../lib/secure-pass.css");
addJS("../lib/secure-pass.js",function(){
sPwd = new Ext.ux.SecurePass();
sPwd.applyTo('regPw');
});
};

var registerDialog;
function showRegisterDialog(){
    if(!registerDialog){ // lazy initialize the registerDialog and only create it once
		initRegTools();
        registerDialog = new Ext.LayoutDialog("register-dialog", { 
                modal:true,
                width:155,
                height:150,
                shadow:true,
                minWidth:150,
                minHeight:150,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        registerDialog.addKeyListener(27, registerDialog.hide, registerDialog);
        registerDialog.addButton('Finish Registration', function(){
		registerDialog.hide;
		registerUserCred(currentRegUsername,currentRegPassword)
		}, registerDialog);
        var layout = registerDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('registerDialog', {}));
        layout.endUpdate();
    }
	//registerDialog.show()
	registerDialog.show(Ext.get('registerButton').dom);
}

var filesystemDialog;
function showFileSystemDialog(){
	if(!initHistory){
	addJS("../ajaxanimator/historyManagement.js",function(){
	})
	}
    if(!filesystemDialog){ // lazy initialize the filesystemDialog and only create it once
        filesystemDialog = new Ext.LayoutDialog("fs-dialog", { 
                modal:false,
                width:400,
                height:300,
                shadow:true,
                minWidth:300,
                minHeight:300,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        filesystemDialog.addKeyListener(27, filesystemDialog.hide, filesystemDialog);
        filesystemDialog.addButton('Close', filesystemDialog.hide, filesystemDialog);
        var layout = filesystemDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('saveTab', {title: 'Save'}));
		layout.add('center', new Ext.ContentPanel('openTab', {title: 'Open'}));
        layout.endUpdate();
    }
	//filesystemDialog.show()
	filesystemDialog.show();
}


var userAnimationBrowserDialog;
var uablayout;
function showUADialog(){
    if(!userAnimationBrowserDialog){ // lazy initialize the filesystemDialog and only create it once
        userAnimationBrowserDialog = new Ext.LayoutDialog("uab-dialog", { 
                modal:false,
                width:600,
                height:400,
                shadow:true,
                minWidth:600,
                minHeight:400,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        userAnimationBrowserDialog.addKeyListener(27, userAnimationBrowserDialog.hide, userAnimationBrowserDialog);
        userAnimationBrowserDialog.addButton('Close', userAnimationBrowserDialog.hide, userAnimationBrowserDialog);
        uablayout = userAnimationBrowserDialog.getLayout();
        uablayout.beginUpdate();
        uablayout.add('center', new Ext.ContentPanel('animationBrowser', {title: 'Browse'}));
		uablayout.add('center', new Ext.ContentPanel('animationViewer', {title: 'Player'}));
        uablayout.endUpdate();
		
		uablayout.getRegion('center').getPanel('animationViewer').on("activate",function(e){
		if(_rq != "f"){_rq = "f";if(_QzX != ""){
		setTimeout("_pA('"+_QzX+"')",83)
		}}});
		uablayout.getRegion('center').getPanel('animationBrowser').on("activate",function(e){
		_rq = "t";
		});

		browseOtherAnimations()
    }
	userAnimationBrowserDialog.show();
}



function showTehAdz(){
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
setTimeout("showTehAdz()",15000);
}
}
