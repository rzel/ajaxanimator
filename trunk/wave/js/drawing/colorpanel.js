Ax.defaultcolor = {
  line: "000000",
  fill:"FFFFFF",
  fillopacity: 100,
  lineopacity: 100,
  width: 5, //okay, so width isn't really a color..
  grid: 1 //this isn't really a color either
}

Ax.Color = {
  update: function(){},
  line: Ax.defaultcolor.line,
  fill: Ax.defaultcolor.fill,
  fillopacity: Ax.defaultcolor.fillopacity,
  lineopacity: Ax.defaultcolor.lineopacity,
  width: Ax.defaultcolor.width,//okay, so width isn't really a color
  grid: Ax.defaultcolor.grid   //this is *my* _fav_ color.
}                           

Ax.setColors = function(c){
  //its probably bad to not use those pesky braces
  if (c.gd) { //grid
  	Ax.viewport.findById("fgd").setValue(c.gd)
  }
  if (c.lw) { //linewidth (stoke)
  	Ax.viewport.findById("flw").setValue(c.lw)
  }
  if (c.lc) {//linecolor (stroke)
  	Ax.viewport.findById("flc").setColor(c.lc)
  }
  if(c.fc){ //fill color
   Ax.viewport.findById("ffc").setColor(c.fc)
  }
  if (c.lo) {//lineopacity
  	Ax.viewport.findById("flo").setValue(c.lo)
  }
  if(c.fo){ //fill opacity
   Ax.viewport.findById("ffo").setValue(c.fo)
  }
}

Ax.ColorPanel = Ext.extend(Ext.Panel,{
  initComponent: function(){
    this.LWTip = new Ext.ux.SliderTip({
      getText: function(slider){
        return String.format('Line Width: {0}px', slider.getValue());
      }
    })
    this.LOTip = new Ext.ux.SliderTip({
      getText: function(slider){
        return String.format('Line Opacity: {0}%x', slider.getValue());
      }
    })
    this.FOTip = new Ext.ux.SliderTip({
      getText: function(slider){
        return String.format('Fill Opacity: {0}%x', slider.getValue());
      }
    })
    Ext.apply(this,{
    border: false,
    items: [
      {style: "font-size: xx-small; margin-left: 3px", html: "Line",border:false}, //for some reason cant do xtype:"label"
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
      {xtype: "slider", id: "flo",maxValue: 100,plugins: this.LOTip, value: Ax.Color.lineopacity, listeners: {
        "drag":function(slider,event){
          Ax.Color.lineopacity = slider.getValue(); //huh? width isn't a color? you're crazy
          Ax.Color.update("lo");
        }
      }},
      {style: "font-size: xx-small; margin-left: 3px", html: "Fill",border:false},
      {xtype: "colorfield", id: "ffc",width: 48, defaultColor:Ax.Color.fill, listeners: {
        "select":function(palette,hex){
        Ax.Color.fill = hex;
        Ax.Color.update("fc");
        }
      }},
      {xtype: "slider", id: "ffo",maxValue: 100,plugins: this.FOTip, value: Ax.Color.fillopacity, listeners: {
        "drag":function(slider,event){
          Ax.Color.fillopacity = slider.getValue(); //huh? width isn't a color? you're crazy
          Ax.Color.update("fo");
        }
      }}
    ]
    })
    Ax.ColorPanel.superclass.initComponent.apply(this, arguments);
  }
})
Ext.reg("drawpanel",Ax.ColorPanel)

