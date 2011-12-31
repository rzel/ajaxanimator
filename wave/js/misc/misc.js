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
    buttons: [{text: "Execute" , iconCls: "execute",handler: function(){
      try{
        
        output = Ext.util.JSON.encode(eval(this.ownerCt.findById("loadtext").getValue()));
      if(output.length > 140){ //tweet rule is good rule of thumb
      Ext.MessageBox.alert("Script Execution Output",
        output
      )
    }else{
      Ax.toastMsg("Script Execution Output", output, "information")
    }
      
    }catch(err){
      Ax.toastMsg("Script Execution Error", err.message)
    }
      
      }},
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

Ax.offline = function(){
	Ext.MessageBox.alert("Offline Functionality Not Availiable","Offline is not availiable but most of the application should operate fine while using your browser's offline feature (if available) if icons, CSS, and scripts are properly cached. While offline, some functionality that require a server will not work such as anything User/Login, browsing user animations, and publishing to Flash/GIF.")
}
