/*
A whole lot of random scripts
*/

/*
Ax.len = function(obj){ //really useful...
	var length;
	for(var i in obj){
		length++;
	}
	return length;
}
*/

Ax.macroExec = function(){
  (new Ext.Window({
    title: "Execute Macros/Scripts",
    iconCls: "tb_script",
    width: 300,
    height: 300,
    buttons: [{text: "Execute" , iconCls: "execute",handler: function(){eval(this.ownerCt.findById("loadtext").getValue())}},
              {text: "Close", iconCls: "close", handler: function(){this.ownerCt.close()}}],
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