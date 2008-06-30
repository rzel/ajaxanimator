/*
A whole lot of random scripts
*/




Ax.macroExec = function(){
  (new Ext.Window({
    title: "Execute Macros/Scripts",
    width: 300,
    height: 300,
    buttons: [{text: "Execute" ,handler: function(){eval(this.ownerCt.findById("loadtext").getValue())}},
              {text: "Close", handler: function(){this.ownerCt.close()}}],
    layout: "border",
    items: [{
      region: "north",
      border: false,
      html: "Here, you can run scripts, hacks or any javascript code."
      },{
        region: "center",
        layout: "fit",
        border: false,
        items: {
          id: "loadtext",
          xtype: "textarea",
          style: "font-size: 9px"
        }
        }]
    })).show(document.body)
}