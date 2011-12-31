Ax.LayoutSouthPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"south",
    id: "properties",
	iconCls: "app_settings",
    title:"Properties - Animation",
    split:true,
    collapsible:true,
    titleCollapse:true,
    height:50,
	items: [{
	xtype: "form",
	labelWidth: 50,
	border: false,
	items: {xtype: "properties"}
	}]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutSouthPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutsouth",Ax.LayoutSouthPanel)
  
  Ax.properties_setcollapse = function(item){
if(Ax.viewport.findById("properties").collapsed != item.checked){
Ax.viewport.findById("properties").toggleCollapse();
}
}