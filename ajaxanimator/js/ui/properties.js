//Various forms defining properties
Ax.PropertiesPanel = Ext.extend(Ext.Panel, {
    initComponent: function(){
        Ext.apply(this, {
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
						value: Ax.canvasWidth,
						listeners: {
							"change":function(field, value){
								if(value.length == 0){
									field.setValue(Ax.canvasWidth)
								}
								Ax.canvasWidth = value;
								Ax.canvasSize();
							}
						},
                        width: 60
                    }]
                }, {
                    layout: "form",
                    border: false,
                    items: [{
                        xtype: "numberfield",
                        fieldLabel: "Height",
                        name: "height",
						value: Ax.canvasHeight,
                        width: 60,
						listeners: {
							"change":function(field, value){
								if(value.length == 0){
									field.setValue(Ax.canvasHeight)
								}
								Ax.canvasHeight = value;
								Ax.canvasSize();
							}
						},
                    }]
                }, {
                    layout: "form",
                    border: false,
                    items: [{
                        xtype: "numberfield",
                        fieldLabel: "Framerate",
                        name: "framerate",
						value: Ax.framerate,
                        width: 60,
						listeners: {
							"change":function(field, value){
								if(value.length == 0){
									field.setValue(Ax.framerate)
								}
								Ax.framerate = value;
							
							}
						},
                    }]
                }]
            }, {
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
                }, {
                    layout: "form",
                    border: false,
                    items: [{
                        xtype: "numberfield",
                        fieldLabel: "Height",
                        name: "Width",
                        width: 60
                    }]
                }, {
                    layout: "form",
                    border: false,
                    items: [{
                        xtype: "numberfield",
                        fieldLabel: "X (Left)",
                        name: "X",
                        width: 60
                    }]
                }, {
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

Ext.reg("properties", Ax.PropertiesPanel);

Ax.setPropertiesMode = function(mode){
    Ax.viewport.findById("properties").setTitle(Ax.viewport.findById("properties").title.split("-")[0] + "- " + mode);
}
