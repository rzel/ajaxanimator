//Various forms defining properties
Ax.PropertiesPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
border: false,
id: "properties_form",
layout: "card",
activeItem: 0,
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
		name: "width",
		width: 60
	}]},{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "Height",
		name: "height",
		width: 60
	}]
	},{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "Framerate",
		name: "framerate",
		width: 60
	}]
	}]
	},{
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
	}]},{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "Height",
		name: "Width",
		width: 60
	}]
	},{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "X (Left)",
		name: "X",
		width: 60
	}]
	},{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "Y (Top)",
		name: "Y",
		width: 60
	}]
	}]
	}]
	
	  })
   Ax.PropertiesPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("properties",Ax.PropertiesPanel);
  
  Ax.setPropertiesMode = function(mode){
  Ax.viewport.findById("properties").setTitle(Ax.viewport.findById("properties").title.split("-")[0]+"- "+mode);
  }
  