var canvasHeightField;
var canvasWidthField;
var previewRevisionStore;
var previewRevision;
var framerateField;
var regbutton;
var logoutbutton;
var userMessage;
ajaxanimator.onReady(function(){

	var topToolbar = new Ext.Toolbar('north-tb');
	//////////////////////SubSub Menu Items////////////////////
	var themeMenu = new Ext.menu.Menu({
        id: 'themeMenu',
        items: [

        new Ext.menu.CheckItem({
            id: 'aero',
            text: 'Aero Glass',
            group: 'theme',
            checkHandler: function(item, checked) {
                if (checked){ setTheme(item.id)};
            }
        }),
        new Ext.menu.CheckItem({
            id: 'vista',
            text: 'Vista Black',
            group: 'theme',
            checkHandler: function(item, checked) {
                if (checked){ setTheme(item.id)};
            }
        }),
        new Ext.menu.CheckItem({
            id: 'gray',
            text: 'Gray Theme',
            group: 'theme',
            checkHandler: function(item, checked) {
                if (checked){ setTheme(item.id)};
            }
        }),
        new Ext.menu.CheckItem({
            id: 'default',
            text: 'Ext Default',
            group: 'theme',
            checked: true,
            checkHandler: function(item, checked) {
                if (checked){ setTheme(item.id)};
            }
        }),
        new Ext.menu.CheckItem({
            id: 'galdaka',
            text: 'Galdaka Theme',
            group: 'theme',
            checkHandler: function(item, checked) {
                if (checked){ setTheme(item.id)};
            }
        })
		     ]
    });
	
	

	//////////////////////SubMenu Items///////////////////////////
    var fileMenu = new Ext.menu.Menu({
		
        id: 'fileMenu',
        items: [
			{text: 'New', icon: imgURL+'/new.png', handler: function(){confirmNewCanvas()}},
			{text: 'Open', icon: imgURL+'/open.gif', handler: function(){showFileSystemDialog()}},
			{text: 'Save', icon: imgURL+'/disk.gif',handler: function(){showFileSystemDialog()}},
			{text: 'Save As', icon: imgURL+'/disk.gif',handler: function(){showFileSystemDialog()}},
			'-',
			{text: 'Publish', icon: imgURL+'/page_white_flash.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div')}}
        ]
    });
	var editMenu = new Ext.menu.Menu({
        id: 'editMenu',
        items: [
			{text: 'Undo', icon: imgURL+'/arrow_undo.png',handler: function(){try{undo()}catch(err){}}},
			{text: 'Copy', icon: imgURL+'/page_copy.png',handler:  function(){copyObj()}},
			{text: 'Paste', icon: imgURL+'/page_paste.png',handler: function(){ pasteObj()}}
        ]
    });
	var viewMenu = new Ext.menu.Menu({
        id: 'viewMenu',
        items: [
			{text: 'Animation', icon: imgURL+'/page_white_flash.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div')}},
			{text: 'Theme', icon: imgURL+'/application_double.png',menu: themeMenu}
		]
    });
	var toolsMenu = new Ext.menu.Menu({
        id: 'toolsMenu',
        items: [
			{text: 'Clear Timeline', icon: imgURL+'/cancel.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div');}},
			{text: 'Color Picker', icon: imgURL+'/color_wheel.png',handler:  function(){showColorDialog()}},
			{text: 'Script/Macro Executor', icon: imgURL+'/application_xp_terminal.png',handler: function(){mainLayout.getRegion('south').showPanel('scriptExec-div');}},
			{text: 'Debug Window',icon: imgURL+'/brick_go.png',handler:  function(){ openDebug()}},
			{text: 'Reload Application', icon: imgURL+'/action_refresh.gif',handler: function(){window.location.reload(true)}}
		]
    });
	var timelineMenu = new Ext.menu.Menu({
        id: 'timelineMenu',
        items: [
			{text: 'To Keyframe',icon: imgURL+'/add.png',handler:  function(){toKeyframe()}},
			{text: 'Clear Frame',icon: imgURL+'/delete.png',handler:  function(){removeKeyframe()}},
			{text: 'Refresh Data',icon: imgURL+'/action_refresh.gif',handler:  function(){fullgotoframe()}},
			{text: 'New Layer',icon: imgURL+'/add.png',handler:  function(){addLayer()}}
        ]
    });
	
	var animationMenu = new Ext.menu.Menu({
        id: 'animationMenu',
        items: [
			{text: 'Play',icon: imgURL+'/control_play_blue.png',handler: function(){playAnimation()}},
			{text: 'Stop',icon: imgURL+'/control_stop_blue.png',handler: function(){stopAnimation()}},
			{text: 'Next Frame',icon: imgURL+'/control_fastforward_blue.png',handler: function(){nextFrame()}},
			{text: 'Previous Frame',icon: imgURL+'/control_rewind_blue.png',handler: function(){preFrame()}},
			{text: 'Last Frame',icon: imgURL+'/control_end_blue.png',handler: function(){lastFrame()}},
			{text: 'First Frame',icon: imgURL+'/control_start_blue.png',handler: function(){firstFrame()}},
			{text: 'Set Last Frame',icon: imgURL+'/control_end_blue.png',handler: function(){setLastFrame()}}
        ]
    });
	var userMenu = new Ext.menu.Menu({
        id: 'userMenu',
        items: [
			{text: 'Logout',icon: imgURL+'/logout.png',handler: function(){logout()}},
			{text: 'Refresh Animation List',icon: imgURL+'/action_refresh.gif',handler: function(){animationList()}},
			{text: 'Browse Animations',icon: imgURL+'/user_go.png',handler: function(){showUADialog()}}
        ]
    });
	var helpMenu = new Ext.menu.Menu({
        id: 'helpMenu',
        items: [
			{text: 'About',icon: imgURL+'/help.png',handler: function(){Ext.MessageBox.alert("Don't worry, a real one will be implemented soon.... hopefully...","This was developed entirely by Antimatter15, the special thanks to section isnt here yet because of ajax issues...")}},
			{text: 'Key Shortcuts', icon: imgURL+'/help.png',handler: function(){showKeyGuide()}},
			{text: 'Manual',icon: imgURL+'/help.png',handler: function(){Ext.MessageBox.alert("LA LA LA","Okay, so um.... play around until it breaks?")}},
			{text: 'FAQ',icon: imgURL+'/help.png',handler: poop},
			{text: 'Seizure',icon: imgURL+'/help.png',handler: function(){Ext.MessageBox.alert("Yo!","Hey, this is a Flash ANIMATOR application, ISN'T it? Make one yourself")}},
			{text: 'Support',icon: imgURL+'/money.png',handler: function(){Ext.MessageBox.alert("Blah","Um... Hi")}}
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

	topToolbar.add( new Ext.Toolbar.Fill());
	
	userMessage = topToolbar.addButton({
            text: 'Welcome&nbsp;Guest',
			handler: function(){
			mainLayout.getRegion('east').showPanel('-div');
			}
    })
		

var loginToolbar = new Ext.Toolbar('user-tb');
loginToolbar.addText("User")
loginToolbar.addSeparator() 
regbutton = loginToolbar.addButton({id: 'registerButton',text: 'Register', handler: function(){showRegisterDialog()}})
logoutbutton = loginToolbar.addButton({id: 'logoutButton',text: 'Logout', handler: function(){logout()}})
logoutbutton.setVisible(false)

var histToolbar = new Ext.Toolbar('history-tb');
histToolbar.addText("History")
histToolbar.addSeparator() 
histToolbar.addButton({text: 'Clear', handler: function(){resetHistory()}})

var centerToolbar = new Ext.Toolbar('center-tb');
//centerToolbar.addElement($('status'))

canvasWidthField = new Ext.form.TextField({
value: '480',
width: '50px',
tooltip: "Set the Width of the Canvas"
})

canvasHeightField = new Ext.form.TextField({
value: '272',
width: '50px'
})
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
centerToolbar.add( new Ext.Toolbar.Fill());
centerToolbar.addText("Zoom:")

    var canvasZoomStore = new Ext.data.SimpleStore({
        fields: ['size'],
        data : [["10%"],["50%"],["75%"],["100%"],["150%"],["200%"]]
    });
    var canvasZoom = new Ext.form.ComboBox({
        store: canvasZoomStore,
        displayField:'size',
        typeAhead: true,
        mode: 'local',
		value: "100%",
		width: 100,
        triggerAction: 'all',
        selectOnFocus:true,
        resizable:true
    });
	canvasZoom.on("select",function(c){
	console.log(c.value)
	})

	
centerToolbar.addField(canvasZoom)

var previewToolbar = new Ext.Toolbar("preview-tb")
	previewToolbar.addText("Preview");
	previewToolbar.add("-")
	previewToolbar.addButton(pButton);
	previewToolbar.addButton(eButton);
	exportText = new Ext.menu.TextItem("")
	previewToolbar.add(exportText)
	previewToolbar.add( new Ext.Toolbar.Fill());
	
    previewRevisionStore = new Ext.data.SimpleStore({
        fields: ['revision'],
        data : [["Revision: 0(Empty)"]]
    });
    previewRevision = new Ext.form.ComboBox({
        store: previewRevisionStore,
        displayField:'revision',
        typeAhead: true,
        mode: 'local',
		value: "Revision: 0(Empty)",
        triggerAction: 'all',
        selectOnFocus:true,
        resizable:true
    });
	previewRevision.on("select",function(c){
	$("zFlashPreviewDiv").innerHTML = genFlashHTML(animationRevisionURL[parseInt(c.value.substring(c.value.indexOf(":")+1))])
	})
	previewToolbar.add(previewRevision)

});
//previewRevisionStore.add(new historyGrid.dataSource.reader.recordType({revision: "treestookovertheworld"}))
function poop(){
Ext.MessageBox.alert("Error!","This version you are using is incomplete, or this feature has not yet been implemented, and/or transferred from dhtmlgoodies to Ext, or being rewritten")
}



////////////////////////////Begin Context Menus///////////////////////////////


ajaxanimator.onReady(function(){
var timelineContextMenu = new Ext.menu.Menu({
    id: 'timelineContextMenu',
    items: [
		{text: 'To Keyframe',icon: imgURL+'/add.png',handler: function(){toKeyframe()}},
		{text: 'Add Layer',icon: imgURL+'/add.png',handler: function(){addLayer()}},
		{text: 'Set Last Frame',icon: imgURL+'/control_end_blue.png',handler: function(){setLastFrame()}},
		{text: 'Clear Frame',icon: imgURL+'/cancel.png',handler: function(){removeKeyframe()}}
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
		{text: 'Select',icon: imgURL+'/select.gif',handler: function(){poop()}},
		{text: 'Rectangle',icon: imgURL+'/rectangle.gif',handler: function(){poop()} },
		{text: 'Round Rectangle',icon: imgURL+'/roundrect.gif',handler:function(){poop()} },
		{text: 'Ellipse/Circle',icon: imgURL+'/circle.gif',handler:function(){ removeKeyframe()}},
		{text: 'Line',icon: imgURL+'/line.gif',handler: function(){ removeKeyframe()}}
    ]
});

var lineColorMenu = new Ext.menu.Menu({
    id: 'lineColorMenu', // the menu's id we use later to assign as submenu
    items: [
        new Ext.menu.ColorItem({
            selectHandler: function(zcp, selColor){
			Colorobj=document.getElementById('linecolor')
			if(picker){
            picker.setColor(selColor)
			}else{
			colorChangeHandler(null,selColor)
			}
			}
        })
    ]
});


var fillColorMenu = new Ext.menu.Menu({
    id: 'fillColorMenu', // the menu's id we use later to assign as submenu
    items: [
        new Ext.menu.ColorItem({
            selectHandler: function(zcp, selColor){
			Colorobj=document.getElementById('fillcolor')
            if(picker){
            picker.setColor(selColor)
			}else{
			colorChangeHandler(null,selColor)
			}
            }
        })
    ]
});

var canvasContextMenu = new Ext.menu.Menu({
    id: 'canvasContextMenu',
    items: [
		{text: 'Next Frame',icon: imgURL+'/control_fastforward_blue.png',handler: poop},
		{text: 'Previous Frame',icon: imgURL+'/control_rewind_blue.png',handler: poop},
		{text: 'Play',icon: imgURL+'/control_play_blue.png',handler: poop},
		{text: 'Delete Shape',icon: imgURL+'/delete.png',handler: poop},
		{text: 'Clear Frame',icon: imgURL+'/cancel.png',handler: poop},
		{text: 'Undo',icon: imgURL+'/arrow_undo.png',handler: poop},
	    {text: 'Drawing Tool',icon: imgURL+'/paintbrush.png', menu: drawToolSubmenu},
	    {text: 'Fill Color',icon: imgURL+'/color_wheel.png', menu: fillColorMenu},
		{text: 'Line Color',icon: imgURL+'/color_wheel.png', menu: lineColorMenu}
	]
});

Ext.get("canvas-div").on("contextmenu",function(e){
	canvasContextMenu.showAt(e.getXY());
	e.stopEvent();
	e.stopPropagation()
	e.preventDefault
});
});
