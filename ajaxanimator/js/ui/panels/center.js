Ax.LayoutCenterPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{

    region:"center",
    //title:"Canvas",
	
    layout:"fit",
	//tbar: Ax.MainToolbar,
    border:true,
    items:[{
        xtype:"tabpanel",
		id: "maintabpanel",
        tabPosition:"bottom",
        border:false,
        activeTab:0,
        items:[{
            xtype:"panel",
            title:"Canvas",
			iconCls: "canvas_icon",
            layout:"fit",
			tabTip: "Draw and create your animations",
             border:false,
			listeners: {
				'activate' : function(){
					Ax.gs(9)
				}
			},
			items: [{
			//region: "center",
			id: "canvas",
            xtype:"panel",
            title:"Canvas",
			bbar: new Ext.StatusBar(Ax.CanvasStatusbar),
			tools: [{id: "gear"},{id: "help", 
			qtip: "Select tools from the west panel and draw on the canvas with them."}],
			iconCls: "canvas_icon",			
            layout:"fit",
            
			tbar: [
      {cls: "x-btn-text-icon",iconCls: "hide_timeline", iconCls: "hide_timeline", text: "Hide Timeline"}
      ,{xtype: "tbfill"},{text:"Zoom"},
      {xtype: "slider", width: 120, maxValue: 300, value: 100, increment: 5,plugins: new Ext.ux.SliderTip({
      getText: function(slider){return String.format('Canvas Zoom: {0}%', slider.getValue())}
        })}],

			 html:"<div class=\"x-border-layout-ct canvas_container\">"+
       "<div id=\"drawcanvas\" class=\"canvas\">Loading...</div>"+
       "</div>",
			 border: false
			}]
          },{
            xtype:"panel",
            title:"Preview",
			iconCls: "preview_icon",
			tabTip: "Preview and Export your animations",
			items: [{
			id: "preview",
            xtype:"panel",
            title:"Preview",
			tbar: [{text: "stuff"},{xtype: "tbfill"},{text:"Zoom"},
      {xtype: "slider", width: 120, maxValue: 300, value: 100, increment: 5,plugins: new Ext.ux.SliderTip({
      getText: function(slider){return String.format('Canvas Zoom: {0}%', slider.getValue())}
        })}],
			bbar: new Ext.StatusBar(Ax.PreviewStatusbar),
			border: false,
			tools: [{id: "gear"},{id: "help",
			qtip: "Preview and Export your animations to Flash&reg; ... Hopefully"}],
			iconCls: "preview_icon",			
            layout:"fit",
						 html:"<div class=\"x-border-layout-ct canvas_container\">"+
       "<div class=\"canvas\" id=\"previewcanvas\">Loading...</div>"+
       "</div>"
			
			}],
			listeners: {
				'activate' : function(){
					Ax.gs(7);
					Ax.init_preview();
					Ax.controls.play();
				},
				'deactivate' : function(){
					Ax.controls.pause()
				}
			},
            layout:"fit",
			border: false
          },{
		  iconCls: "animations_icon",
		  xtype: "animationbrowser", 
		  tabTip: "Share and View other user's animations",
		  listeners: {
				'activate' : function(){
					Ax.gs(8)
				}
			}
		  }]
      }]
  })
   Ax.LayoutCenterPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutcenter",Ax.LayoutCenterPanel)