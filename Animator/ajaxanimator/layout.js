var mainLayout;
var pButton = new Ext.Toolbar.Button({text: 'Reload Preview', handler: function(){preFlash}})
var eButton = new Ext.Toolbar.Button({text: 'Export Animation', handler: function(){genFlash()}})
MainLayout = function() {
	return {
		init : function() {
			var topToolbar = new Ext.Toolbar('north-tb');
			var centerToolbar = new Ext.Toolbar('center-tb');
			var loginToolbar = new Ext.Toolbar('login-tb');
			var evalToolbar = new Ext.Toolbar('eval-tb');
			evalToolbar.addText("Script/Macro Executor")
			evalToolbar.add("-")
			evalToolbar.addButton({text: 'Execute', handler: function(){eval($('evalScript').value)}})
			var propToolbar = new Ext.Toolbar('prop-tb');
			propToolbar.addText("Properties")
			var histToolbar = new Ext.Toolbar('history-tb');
			var previewToolbar = new Ext.Toolbar('preview-tb');
			previewToolbar.addText("Preview");
			previewToolbar.add("-")
			
			previewToolbar.addButton(pButton);
			previewToolbar.addButton(eButton);
			previewToolbar.addText('<div id="export"></div>');
			//previewToolbar.add("<div id=''")
			mainLayout = new Ext.BorderLayout(document.body, {
				north:{ titlebar: false, split: true, initialSize: 120 , collapsible: true, toolbar: topToolbar}, 
				south:{ tilebar: false, split: true, initialSize: 100 , collapsible: true}, 
				east: { titlebar: false, split: true, initialSize: 130 , collapsible: true}, 
				west: { titlebar: true, split: true, initialSize: 55 , collapsible: true}, 
				center: { }
			});
			mainLayout.on("regionresized",timelineResize);
			mainLayout.beginUpdate();
			mainLayout.add('north', new Ext.ContentPanel('north-div', {autoScroll: false, fitToFrame: true, closable: false }));
			mainLayout.add('south', new Ext.ContentPanel('properties-div', {title: 'Properties', fitToFrame: true, closable: false }));
			mainLayout.add('south',new Ext.ContentPanel('scriptEval-div', {toolbar: evalToolbar,autoScroll: false,title: 'Macro/Script Executor', fitToFrame: true, closable: false }))		   
			mainLayout.add('east', new Ext.ContentPanel('history-div', {title: 'History', toolbar: histToolbar,fitToFrame: true, closable: false }));
			mainLayout.add('east', new Ext.ContentPanel('login-div', {title: 'Login', toolbar: loginToolbar,fitToFrame: true, closable: false }));
			mainLayout.add('west', new Ext.ContentPanel('toolbar-div', { title: 'Tools', fitToFrame: true, closable: false }));
			mainLayout.add('center', new Ext.ContentPanel('canvas-div', {toolbar:centerToolbar,title: 'Canvas', fitToFrame: true })); 
			mainLayout.add('center', new Ext.ContentPanel('preview-div', {toolbar: previewToolbar,title: 'Preview', fitToFrame: true })); 
			mainLayout.getRegion('center').showPanel('canvas-div');
			mainLayout.getRegion('east').showPanel('history-div');
			mainLayout.getRegion('south').showPanel('properties-div');
			mainLayout.getRegion('center').getPanel('preview-div').on("activate",function(e){
				if(Ext.isIE != true){
				preFlash();
				}else{
				
				}

			});
			mainLayout.endUpdate();
		}
	};
}();
Ext.EventManager.onDocumentReady(MainLayout.init, MainLayout, true);
function timelineResize(){
setTimeout('Ext.get("frameContainer").setHeight(parseInt(Ext.get("frameContainer").dom.parentNode.style.height)-30)',0)
}
