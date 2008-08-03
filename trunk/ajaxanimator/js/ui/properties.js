//Various forms defining properties
Ax.PropertiesPanel = Ext.extend(Ext.Panel, {
    initComponent: function(){
        Ext.apply(this, {
            border: false,
            id: "properties_form",
            layout: "card",
            activeItem: 0,
            items: [{////////////////////////////////////Animation//////////////////////////////////////
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
									field.setValue(Ax.canvasWidth);
									value = field.getValue();
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
									field.setValue(Ax.canvasHeight);
									value = field.getValue();
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
									field.setValue(Ax.framerate);
									value = field.getValue();
								}
								Ax.framerate = value;
							
							}
						},
                    }]
                }]
            }, { ////////////////////////////////////////Textystuff////////////////////////////////////////////
                layout: "column",
                defaults: {
                    width: 120
                },
                border: false,
                items: [{
                    layout: "form",
                    border: false,
					width: 300,
                    items: [{
                        xtype: "textfield",
                        fieldLabel: "Text",
                        name: "text",
						value: "Ajax Animator",
                        width: 240,
						listeners: {
							"change":function(field, value){
								if(value.length == 0){
									field.setValue("Arr! You found an easter egg! (Tada!)")
									value = field.getValue();
								}
								Ax.canvas.textMessaje = value;
							}
						},
                    }]
                }, {
                    layout: "form",
                    border: false,
                    items: [{
                        xtype: "numberfield",
                        fieldLabel: "Font Size",
                        name: "fontsize",
						value: 19,
                        width: 60,
						listeners: {
							"change":function(field, value){
								if(value.length == 0){
									field.setValue(19);
									value = field.getValue();
								}
								Ax.canvas.fontSize = value;
							
							}
						},
                    }]
                }]
            },{ ////////////////////////////////////////Imagoo////////////////////////////////////////////
                layout: "column",
                defaults: {
                    width: 120
                },
                border: false,
                items: [{
                    layout: "form",
                    border: false,
					width: 400,
                    items: [{
                        xtype: "textfield",
                        fieldLabel: "URL",
                        name: "url",
						value: "http://osflash.org/_media/ajaxanimator.png?w=&h=&cache=cache",
                        width: 340,
						listeners: {
							"change":function(field, value){
								if(value.length == 0){
									field.setValue(Ax.canvas.imageHref)
								}
								Ax.canvas.imageHref = value;
							}
						},
                    }]
                }]
            }]
        
        })
        Ax.PropertiesPanel.superclass.initComponent.apply(this, arguments);
    }
})

Ext.reg("properties", Ax.PropertiesPanel);

Ax.setPropertiesMode = function(mode,number){
    Ax.viewport.findById("properties").setTitle(Ax.viewport.findById("properties").title.split("-")[0] + "- " + mode);
	Ax.viewport.findById("properties_form").layout.setActiveItem(number)
}
