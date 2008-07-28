Ax.LayoutSouthPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
	collapsedTitle: "Properties",
    region:"south",
    id: "properties",
	iconCls: "app_settings",
    title:"Properties",
    split:true,
    collapsible:true,
    titleCollapse:true,
    height:50,
	items: [{
	xtype: "form",
	labelWidth: 50,
	border: false,
	items: [{
	layout: "column",
	defaults: {
	 width: 120
	 },
	border: false,
	items: [{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "Width",
		name: "Width",
		width: 60
	}]
	},{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "Height",
		name: "Width",
		width: 60
	}]
	}]
	}]
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