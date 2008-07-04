Ax.defaultcolor = {
  line: "000000",
  fill:"FF0000",
  width: 1, //okay, so width isn't really a color..
  grid: 1 //this isn't really a color either
}

Ax.Color = {
  update: function(){},
  line: Ax.defaultcolor.line,
  fill: Ax.defaultcolor.fill,
  width: Ax.defaultcolor.width,//okay, so width isn't really a color
  grid: Ax.defaultcolor.grid   //this is *my* _fav_ color.
}                           

Ax.setColors = function(c){
  //its probably bad to not use those pesky braces
  if(c.gd)
    Ax.viewport.findById("fgd").setValue(c.gd)
  if(c.lw) 
    Ax.viewport.findById("flw").setValue(c.lw)
  if(c.lc) 
    Ax.viewport.findById("flc").setColor(c.lc)
  if(c.fc) 
   Ax.viewport.findById("ffc").setColor(c.fc)
}

Ax.ColorPanel = Ext.extend(Ext.Panel,{
  initComponent: function(){
    this.LWTip = new Ext.ux.SliderTip({
      getText: function(slider){
        return String.format('Line Width: {0}px', slider.getValue());
      }
    })
    this.GDTip = new Ext.ux.SliderTip({
      getText: function(slider){
        
        return String.format('Snapping Grid Size: {0}px', slider.getValue()+1);
      }
    })
    Ext.apply(this,{
    border: false,
    items: [
      {xtype: "label",style: "font-size: xx-small; margin-left: 3px", text: "Line"},
      {xtype: "slider", id: "flw",maxValue: 20,plugins: this.LWTip, value: Ax.Color.width, listeners: {
        "drag":function(slider,event){
          Ax.Color.width = slider.getValue(); //huh? width isn't a color? you're crazy
          Ax.Color.update("lw");
        }
      }},
      {xtype: "colorfield", id: "flc", width: 48, defaultColor:Ax.Color.line, listeners: {
        "select":function(palette,hex){
        Ax.Color.line = hex;
        Ax.Color.update("lc");
        }
      }},
      {xtype: "label",style: "font-size: xx-small; margin-left: 3px", text: "Fill"},
      {xtype: "colorfield", id: "ffc",width: 48, defaultColor:Ax.Color.fill, listeners: {
        "select":function(palette,hex){
        Ax.Color.fill = hex;
        Ax.Color.update("fc");
        }
      }},
      {xtype: "label",style: "font-size: xx-small; margin-left: 3px", text: "Grid"},
      {xtype: "slider", maxValue: 30, id: "fgd", plugins: this.GDTip, value: Ax.Color.grid, listeners: {
        "drag":function(slider,event){
          Ax.Color.grid = slider.getValue()+1; //huh? width isn't a color? you're crazy
          //trick it into having 1px being the minimum
          Ax.Color.update("gd");
        }
      }}
    ]
    })
    Ax.ColorPanel.superclass.initComponent.apply(this, arguments);
  }
})
Ext.reg("drawpanel",Ax.ColorPanel)

