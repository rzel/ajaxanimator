Ax.LayoutCenterPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{

    region:"center",
    //title:"Canvas",
    layout:"fit",
	//tbar: Ax.MainToolbar,
    border:false,
    items:[{
        xtype:"tabpanel",
		id: "maintabpanel",
        tabPosition:"bottom",
        border:false,
        activeTab:0,
        items:[{
            xtype:"panel",
			id: "canvas_tab",
            title:"Canvas",
			iconCls: "canvas_icon",
            layout:"fit",
			tabTip: "Draw and create your animations",
             border:false,
			listeners: {
				'activate' : function(){
					if(Ax.viewport && Ax.viewport.findById("toolbar")){
					Ax.viewport.findById("toolbar").getTopToolbar().items.item(5).menu.items.item(0).setText("Canvas Mode")
					}
					//Ax.gs(9)
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
     " Name: ",{xtype: "textfield",
       value: Ax.animation.name,
       listeners: {
        "change": function(field){Ax.setAnimationName(field.getValue())}
        }, width: 200}   ,{xtype: "tbfill"},{text:"Zoom"},
      {xtype: "slider", width: 120, maxValue: 300, value: 100, increment: 5,plugins: new Ext.ux.SliderTip({
      getText: function(slider){return String.format('Canvas Zoom: {0}%', slider.getValue())}
        })}],

			 html:"<div class=\"x-border-layout-ct canvas_container\">"+
       "<div id=\"drawcanvas\" class=\"canvas\">Loading...</div>"+
       "</div>",
			 border: true
			}]
          },{
            xtype:"panel",
            title:"Preview",
			id: "preview_tab",
			iconCls: "preview_icon",
			tabTip: "Preview and Export your animations",
			items: [{
			id: "preview",
            xtype:"panel",
            title:"Preview",
			tbar: [" Name: ",{xtype: "textfield",
       value: Ax.animation.name,
       listeners: {
        "change": function(field){Ax.setAnimationName(field.getValue())}
        }, width: 200},{xtype: "tbfill"},{text:"Zoom"},
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
      'render' : function(){
        setTimeout(function(){
              Ax.setAnimationName(Ax.animation.name);
        },100);
        
      },
				'activate' : function(){
					//Ax.gs(7);
					Ax.viewport.findById("toolbar").getTopToolbar().items.item(5).menu.items.item(0).setText("Preview Mode")
					Ax.init_preview();
          clearTimeout(Ax.preview_timeout);
					Ax.preview_increment();
				},
				'deactivate' : function(){
					Ax.controls.pause()
				}
			},
            layout:"fit",
			border: true
          },{
		  iconCls: "animations_icon",
		  xtype: "animationbrowser", 
		  tabTip: "Share and View other user's animations",
		  listeners: {
				'activate' : function(){

					//Ax.gs(8)
				},
				'deactivate' : function(){
					Ax.player_pause()
				}
			}
		  }]
      }]
  })
   Ax.LayoutCenterPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutcenter",Ax.LayoutCenterPanel)
  
  
  Ax.setAnimationName = function(name){
    if(!name || name.replace(/ /g,"") == ""){
      name = "Untitled Production"
    }
    Ax.animation.name = name;
    
    if(Ax.viewport.findById("canvas").getTopToolbar().items){
        Ax.viewport.findById("canvas" ).getTopToolbar().items.item(1).getEl().value = name}
    if(Ax.viewport.findById("preview").getTopToolbar().items){
        Ax.viewport.findById("preview").getTopToolbar().items.item(1).getEl().value = name}
  }