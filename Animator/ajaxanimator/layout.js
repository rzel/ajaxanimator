var mainLayout;
var exportText;
var pButton = new Ext.Toolbar.Button({text: 'Reload Preview', handler: function(){preFlash}})
var eButton = new Ext.Toolbar.Button({text: 'Export Animation', handler: function(){genFlash()}})
ajaxanimator.onReady(function(){
	var topToolbar = new Ext.Toolbar('north-tb');
	var centerToolbar = new Ext.Toolbar('center-tb');
	var loginToolbar = new Ext.Toolbar('user-tb');
//	var propToolbar = new Ext.Toolbar('prop-tb');
//	propToolbar.addText("Properties")
	var histToolbar = new Ext.Toolbar('history-tb');
	var previewToolbar = new Ext.Toolbar('preview-tb');
	

	mainLayout = new Ext.BorderLayout(document.body, {
		north:{ titlebar: false, split: true, initialSize: 100 , collapsible: true, toolbar: topToolbar}, 
		south:{ titlebar: true, split: true, initialSize: 60 , collapsible: true}, 
		east: { titlebar: false, split: true, initialSize: 130 , collapsible: true}, 
		west: { titlebar: true, split: true, initialSize: 55 , collapsible: true}, 
		center: { }
	});
	
	mainLayout.beginUpdate();
	mainLayout.add('north', new Ext.ContentPanel('north-div', {autoScroll: false, fitToFrame: true, closable: false }));
	mainLayout.add('south', new Ext.ContentPanel('properties-div', {title: 'Properties', fitToFrame: true, closable: false }));
   
	mainLayout.add('east', new Ext.ContentPanel('history-div', {title: 'History', toolbar: histToolbar,fitToFrame: true, closable: false }));
	mainLayout.add('east', new Ext.ContentPanel('user-div', {title: 'User', toolbar: loginToolbar,fitToFrame: true, closable: false }));
	mainLayout.add('west', new Ext.ContentPanel('toolbar-div', { title: 'Tools', fitToFrame: true, closable: false }));
	mainLayout.add('center', new Ext.ContentPanel('canvas-div', {toolbar:centerToolbar,title: 'Canvas', fitToFrame: true })); 
	mainLayout.add('center', new Ext.ContentPanel('preview-div', {toolbar: previewToolbar,title: 'Preview', fitToFrame: true })); 
	mainLayout.getRegion('center').showPanel('canvas-div');
	mainLayout.getRegion('east').showPanel('history-div');
	mainLayout.getRegion('south').showPanel('properties-div');

	mainLayout.getRegion('east').getPanel('user-div').on("activate",function(e){
	if(!userField){
	
	drawLogin()
	smartLogin(); //yay smrt! I'm Sooooo SMRT, YAY! S-U-M-F-A-R-T  -- okay that was pointless
	}
	})
	
	mainLayout.getRegion('north').getPanel('north-div').on("resize",timelineResize)
mainLayout.getRegion('west').getPanel('toolbar-div').on("resize",
function(){if(lineWidth){lineWidth.setSize(lineWidth.container.getWidth())}})
	
	mainLayout.getRegion('center').getPanel('preview-div').on("activate",function(e){
	editControlToolbar("previewControlBar",2)
	preFlash();
	});
	mainLayout.endUpdate();
	timelineResize()
	});


	
	function timelineResize(){
	setTimeout('Ext.get("frameContainer").setHeight(parseInt(Ext.get("frameContainer").dom.parentNode.style.height)-30)',0)
	}
