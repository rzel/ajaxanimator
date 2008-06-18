Ax.ToolsPanel = Ext.extend(Ext.Panel,{
toolConfig: {
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
},
changeTool: function(tool){

Ax.setTool(tool.tool);

//report usage statistics
//* take out that first "/" to disable
Ax.gs(({select:10,rect:11,roundrect:12,
ellipse:13,line:14,path:15,
controlpath:16,text:17,image:18,
shape:19,reset:20,"delete":21})[tool.tool])
/**///*//for my text editor (notepad2, though i normally use notepad++ which doesn't face this issue)


for(var tool_id in this.toolConfig){
Ax.viewport.findById("tool_"+tool_id).unselect()
}
//this.toolConfig[this.tool][2]()


},

initComponent: function(){
var ia = []
for(var tool in this.toolConfig){


ia.push(new Ax.ToolItem({
tool:tool,
id: "tool_"+ tool,
toolConfig: this.toolConfig,
qtip: this.toolConfig[tool][1],
imgclass:this.toolConfig[tool][0], //ooh! gets the toolbox icons dir, and adds it to the stuff
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
  
  
  
  

  
  
