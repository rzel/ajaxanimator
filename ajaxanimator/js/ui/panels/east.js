Ax.LayoutEastPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"east",
    title:"Misc",
    id: "misc",
	iconCls: "misc_panel_icon",
    split:true,
    collapsible:true,
    titleCollapse:true,
    width:130,
    layout:"fit",
    border:true,
    items:[{
        xtype:"tabpanel",
        activeTab:0,
        border:false,
        items:[{
            xtype:"panel",
            title:"Misc",
			iconCls: "misc_icon",
            layout:"fit",
            items:[{
                layout:"accordion",
                autoScroll: true,
                layoutConfig:{
                  activeOnTop:false,
                  animate:true,
                  autoWidth:true,
                  collapseFirst:false,
                  fill:true,
                  hideCollapseTool:false,
                  titleCollapse:true
                },
                border:false,
                items:[{
                    title:"History",
                    autoHeight:true,
					xtype: "history",
					iconCls: "history_icon",
                    border:false,
					tools: [{id: "close", qtip: "Clear History", handler: function(){Ax.history_clear()}}]
                  },{
                    title:"Clipboard",
                    autoHeight:true,
					xtype: "clipboard",
					layout: "fit",
					iconCls: "clipboard_icon",
					tools: [{id: "close", qtip: "Clear Clipboard", handler: function(){Ax.clipboard_clear()}}],
                    border:false
                  },{
                    title:"Library",
                    autoHeight:true,
					iconCls: "library_icon",
                    border:false,
                    items:[{xtype:"library"}]
                  },{
                    title:"Misc",
                    autoHeight:true,
					iconCls: "misc_icon",
                    html:"None Yet :P",
                    border:false
                  }]
              }]
          },{
		  	disabled: true,
            xtype:"panel",
            title:"User",
			iconCls: "user_icon",
      layout: "fit",
            border:false,
            //html: "hi",
			items:[{xtype: "loginform"}]
			//items: {html:"Yo wazzup dawg"}
          
		  }]
      }]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutEastPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layouteast",Ax.LayoutEastPanel)
  
  Ax.misc_setcollapse = function(item){
if(Ax.viewport.findById("misc").collapsed != item.checked){
Ax.viewport.findById("misc").toggleCollapse();
}
}