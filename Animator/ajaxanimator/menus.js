var canvasHeightField;
var canvasWidthField;
var framerateField;
var regbutton;
var logoutbutton;

Ext.onReady(function(){
	var topToolbar = new Ext.Toolbar('north-tb');

	//////////////////////SubMenu Items///////////////////////////
    var fileMenu = new Ext.menu.Menu({
		
        id: 'fileMenu',
        items: [
			{text: 'New', icon: '../images/new.png', handler: function(){confirmNewCanvas()}},
			{text: 'Open', icon: '../images/open.gif', handler: function(){showFileSystemDialog()}},
			{text: 'Save', icon: '../images/disk.gif',handler: function(){showFileSystemDialog()}},
			{text: 'Save As', icon: '../images/disk.gif',handler: function(){showFileSystemDialog()}},
			'-',
			{text: 'Publish', icon: '../images/page_white_flash.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div')}}
        ]
    });
	var editMenu = new Ext.menu.Menu({
        id: 'editMenu',
        items: [
			{text: 'Undo', icon: '../images/arrow_undo.png',handler: function(){try{undo()}catch(err){}}},
			{text: 'Copy', icon: '../images/page_copy.png',handler:  function(){copyObj()}},
			{text: 'Paste', icon: '../images/page_paste.png',handler: function(){ pasteObj()}}
        ]
    });
	var viewMenu = new Ext.menu.Menu({
        id: 'viewMenu',
        items: [
			{text: 'Animation', icon: '../images/page_white_flash.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div')}}
        ]
    });
	var toolsMenu = new Ext.menu.Menu({
        id: 'toolsMenu',
        items: [
			{text: 'Clear Timeline', icon: '../images/cancel.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div');}},
			{text: 'Color Picker', icon: '../images/color_wheel.png',handler:  function(){showColorDialog()}},
			{text: 'Script/Macro Executor', icon: '../images/application_xp_terminal.png',handler: function(){mainLayout.getRegion('south').showPanel('scriptExec-div');}},
			{text: 'Debug Window',icon: '../images/brick_go.png',handler:  function(){ openDebug()}}
        ]
    });
	var timelineMenu = new Ext.menu.Menu({
        id: 'timelineMenu',
        items: [
			{text: 'To Keyframe',icon: '../images/add.png',handler:  function(){toKeyframe()}},
			{text: 'Clear Frame',icon: '../images/delete.png',handler:  function(){removeKeyframe()}},
			{text: 'Refresh Data',icon: '../images/action_refresh.gif',handler:  function(){fullgotoframe()}},
			{text: 'New Layer',icon: '../images/add.png',handler:  function(){addLayer()}}
        ]
    });
	
	var animationMenu = new Ext.menu.Menu({
        id: 'animationMenu',
        items: [
			{text: 'Play',icon: '../images/control_play_blue.png',handler: function(){playAnimation()}},
			{text: 'Stop',icon: '../images/control_stop_blue.png',handler: function(){stopAnimation()}},
			{text: 'Next Frame',icon: '../images/control_fastforward_blue.png',handler: function(){nextFrame()}},
			{text: 'Previous Frame',icon: '../images/control_rewind_blue.png',handler: function(){preFrame()}},
			{text: 'Last Frame',icon: '../images/control_end_blue.png',handler: function(){lastFrame()}},
			{text: 'First Frame',icon: '../images/control_start_blue.png',handler: function(){firstFrame()}},
			{text: 'Set Last Frame',icon: '../images/control_end_blue.png',handler: function(){setLastFrame()}}
        ]
    });
	var userMenu = new Ext.menu.Menu({
        id: 'userMenu',
        items: [
			{text: 'Logout',icon: '../images/logout.png',handler: function(){logout()}},
			{text: 'Refresh Animation List',icon: '../images/action_refresh.gif',handler: function(){animationList()}},
			{text: 'Browse Animations',icon: '../images/user_go.png',handler: function(){showUADialog()}}
        ]
    });
	var helpMenu = new Ext.menu.Menu({
        id: 'helpMenu',
        items: [
			{text: 'About',icon: '../images/help.png',handler: function(){Ext.MessageBox.alert("This was developed entirely by Antimatter15, the special thanks to section isnt here yet because of ajax issues...")}},
			{text: 'Key Shortcuts', icon: '../images/help.png',handler: function(){showKeyGuide()}},
			{text: 'Manual',icon: '../images/help.png',handler: function(){Ext.MessageBox.alert("LA LA LA","Okay, so um.... play around until it breaks?")}},
			{text: 'FAQ',icon: '../images/help.png',handler: poop},
			{text: 'Seizure',icon: '../images/help.png',handler: function(){Ext.MessageBox.alert("Yo!","Hey, this is a Flash ANIMATOR application, ISN'T it? Make one yourself")}},
			{text: 'Support',icon: '../images/money.png',handler: function(){showTehAdz();}}
        ]
    });

	
	//////////////////////Menu Items///////////////////////////

	topToolbar.addButton({
    text: 'File',
	menu: fileMenu
    });
	topToolbar.addButton({
    text: 'Edit',
	menu: editMenu
    });
	topToolbar.addButton({
    text: 'View',
	menu: viewMenu
    });
	topToolbar.addButton({
    text: 'Tools',
	menu: toolsMenu
    });
	topToolbar.addButton({
    text: 'Timeline',
	menu: timelineMenu
    });
	topToolbar.addButton({
    text: 'Animation',
	menu: animationMenu
    });
	topToolbar.addButton({
    text: 'User',
	menu: userMenu
    });
	topToolbar.addButton({
    text: 'Help',
	menu: helpMenu
    });

var loginToolbar = new Ext.Toolbar('login-tb');
loginToolbar.addText("Login")
loginToolbar.addSeparator() 
regbutton = loginToolbar.addButton({id: 'registerButton',text: 'Register', handler: function(){showRegisterDialog()}})
logoutbutton = loginToolbar.addButton({id: 'logoutButton',text: 'Logout', handler: function(){logout()}})
logoutbutton.setVisible(false)

var histToolbar = new Ext.Toolbar('history-tb');
histToolbar.addText("History")
histToolbar.addSeparator() 
histToolbar.addButton({text: 'Clear', handler: function(){clearHist()}})

var centerToolbar = new Ext.Toolbar('center-tb');
//centerToolbar.addElement($('status'))

canvasWidthField = new Ext.form.TextField({value: '480',width: '50px'})
canvasHeightField = new Ext.form.TextField({value: '272',width: '50px'})
framerateField = new Ext.form.TextField({value: '12',width: '50px'})
canvasWidthField.on("change",function(textObj,newVal,oldVal){
canvasWidth = parseInt(newVal)
setCP()
});
canvasHeightField.on("change",function(textObj,newVal,oldVal){
canvasHeight = parseInt(newVal)
setCP()
});
framerateField.on("change",function(textObj,newVal,oldVal){
AnimationFramerate = parseInt(newVal)
});
centerToolbar.addText("Width:")
centerToolbar.addField(canvasWidthField)
centerToolbar.addText("Height:")
centerToolbar.addField(canvasHeightField)
centerToolbar.addText("Framerate:")
centerToolbar.addField(framerateField)
});

function poop(){
Ext.MessageBox.alert("Error!","This version you are using is incomplete, or this feature has not yet been implemented, and/or transferred from dhtmlgoodies to Ext, or being rewritten")
}



////////////////////////////Begin Context Menus///////////////////////////////


Ext.onReady(function(){
var timelineContextMenu = new Ext.menu.Menu({
    id: 'timelineContextMenu',
    items: [
		{text: 'To Keyframe',icon: '../images/add.png',handler: function(){toKeyframe()}},
		{text: 'Add Layer',icon: '../images/add.png',handler: function(){addLayer()}},
		{text: 'Clear Frame',icon: '../images/cancel.png',handler: function(){removeKeyframe()}}
    ]
});
Ext.get("frameContainer").on("contextmenu",function(e){
	timelineContextMenu.showAt(e.getXY());
	e.stopEvent();
	e.stopPropagation()
	e.preventDefault
});

var drawToolSubmenu = new Ext.menu.Menu({
    id: 'drawToolSubmenu',
    items: [
		{text: 'Select',icon: '../images/select.gif',handler: function(){poop()}},
		{text: 'Rectangle',icon: '../images/rectangle.gif',handler: function(){poop()} },
		{text: 'Round Rectangle',icon: '../images/roundrect.gif',handler:function(){poop()} },
		{text: 'Ellipse/Circle',icon: '../images/circle.gif',handler:function(){ removeKeyframe()}},
		{text: 'Line',icon: '../images/line.gif',handler: function(){ removeKeyframe()}}
    ]
});

var canvasContextMenu = new Ext.menu.Menu({
    id: 'canvasContextMenu',
    items: [
		{text: 'Next Frame',icon: '../images/control_fastforward_blue.png',handler: poop},
		{text: 'Previous Frame',icon: '../images/control_rewind_blue.png',handler: poop},
		{text: 'Play',icon: '../images/control_play_blue.png',handler: poop},
		{text: 'Delete Shape',icon: '../images/delete.png',handler: poop},
		{text: 'Clear Frame',icon: '../images/cancel.png',handler: poop},
		{text: 'Undo',icon: '../images/arrow_undo.png',handler: poop},
	    {text: 'Drawing Tool',icon: '../images/paintbrush.png', menu: drawToolSubmenu}
	]
});

Ext.get("canvas-div").on("contextmenu",function(e){
	canvasContextMenu.showAt(e.getXY());
	e.stopEvent();
	e.stopPropagation()
	e.preventDefault
});
});
