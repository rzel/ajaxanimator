Ax.toolConfig={
	"select":      ["tx_select","Select Shapes"],
	"rect":        ["tx_rectangle","Draw Rectangle"],
	"roundrect":   ["tx_roundrect","Draw Rounded Rectangle"],
	"ellipse":     ["tx_circle","Draw Ellipse/Circle"],
	"line":        ["tx_line","Draw Line"],
	"path":        ["tx_path","Draw freeform path"],
	"controlpath": ["tx_polygon","Draw Polygon"],
	"text":        ["tx_text","Draw text"],
	"image":       ["tx_image", "Draw Image/Picture"],

	"shape":       ["tx_shape","Draw Shape from library"],
	"reset":       ["tx_reset","Reset/Clear/Empty Frame"],
	"delete":      ["tx_delete","Delete selected shape"]
}

Ax.ToolsPanel = Ext.extend(Ext.Panel,{

changeTool: function(tool){
Ax.setTool(tool.tool);
},

initComponent: function(){
var ia = []
for(var tool in Ax.toolConfig){


ia.push(new Ax.ToolItem({
tool:tool,
id: "tool_"+ tool,
toolConfig: Ax.toolConfig,
qtip: Ax.toolConfig[tool][1],
imgclass:Ax.toolConfig[tool][0], //ooh! gets the toolbox icons dir, and adds it to the stuff
onSelect: this.changeTool
}))
	
}
  
  
Ext.apply(this,{
layout: "table",
border: false,
layoutConfig: {
        // The total column count must be specified here
        columns: 2
    },
	items: ia
  })

   Ax.ToolsPanel.superclass.initComponent.apply(this, arguments);//i dont really know what that does
  }
  })
  
  Ext.reg("toolbox",Ax.ToolsPanel)
  
  
  
  

  
  
