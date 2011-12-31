//"parseInt("elitist".split("").map(function(t){return Math.log(t.charCodeAt(0))-3.14159265358979}).join("").split(/\.|4|2/).map(function(e){return Math.round(Math.sqrt(parseInt(e))/Math.log(2))}).join("").substr(19)).toString(36)
//gkudrg6vh8s8l4cccx6fdna1u041wqo



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
    
        //tabPosition:"bottom",
        border:false,
        activeTab: +Ax.preview_mode, //neat little hack, false = 0, true = 1, canvas = 0, preview = 1
        items:[{
            xtype:"panel",
			id: "canvas_tab",
            title:"Draw",
			iconCls: "canvas_icon",
            layout:"fit",
			//tabTip: "Draw and create your animations",
             border:false,
			listeners: {
				'activate' : function(){
          if(!Ax.timeline.el){
            (function(){ //shit so much polling. event based would be better
            if(Ax.viewport){
            try {
                  Ax.initTimeline()
                  Ax.addLayer()
                  Ax.addFrames(99)
                  //Ax.toKeyframe(1, "Layer 1")
                  }catch(err){
                      Ext.MessageBox.alert("Timeline Initialization FAILED.",err.message)
                  }
            }else{
              setTimeout(arguments.callee, 100);
            }
          })()
          }
                  
          if(!Ax.canvas){
          
          (function(){ //shit so much polling. event based would be better
            if(Ax.viewport && document.getElementById("drawcanvas") && Ax.layers[Ax.tcurrent.layer]){ //disgusting hack 
              
        
              if (Ax.urlprefs.draw != "false") {
                  //Ax.preinit();
                  try {
                  Ax.drawinit();
                }catch(err){
                  Ext.MessageBox.alert("Canvas Initialization FAILED.",err.message)
                }
              }
              
            }else{
              setTimeout(arguments.callee, 100);
            }
            
          })()
          
          }
          
          
          if(Ax.preview_mode == true){
            //cuz the first activation is before timeline is intitialized
            Ax.preview_mode = false;
          
            Ax.selectFrame_core(Ax.tcurrent.frame, Ax.tcurrent.layer)
            Ax.viewport.findById("tools").expand()
            setTimeout(function(){
              Ax.loadframe();
            },100)
          }
          //Ax.gs(9)
				},
          'deactivate': function(){
            Ax.viewport.findById("tools").collapse()
          }
			},
			items: [{
			//region: "center",
			id: "canvas",
            xtype:"panel",
      //      title:"Canvas",
			//bbar: new Ext.StatusBar(Ax.CanvasStatusbar),
			//tools: [{id: "gear"},{id: "help", 
			//qtip: "Select tools from the west panel and draw on the canvas with them."}],
      
			iconCls: "canvas_icon",			
            layout:"fit",
            
			tbar: [
      
      {text: "Add Layer", xtype: "splitbutton", iconCls: "tb_newlayer", handler: function(){Ax.addLayer()}, menu: new Ext.menu.Menu({
        items: [
          {text: "Add Layer", iconCls: "tb_newlayer", handler: function(){Ax.addLayer()}},
          {text: "To Keyframe", iconCls: "tb_addkeyframe", handler: function(){Ax.toKeyframe()}},
          {text: "Insert Frame", iconCls: "tb_insertframe", handler: function(){Ax.insertFrame()}},
          {text: "Delete Frame", iconCls: "tb_delframe", handler: function(){Ax.deleteFrame()}}
        ]})
      },
      //{text: "New", iconCls: "tb_new", handler: function(){Ax.new_animation()}},
      {text: "Open", iconCls: "tb_open", handler: function(){Ax.open.text()}},

        {text: "Canvas Size", iconCls: "tb_size", handler: function(){
          Ext.MessageBox.prompt("Set Canvas Size","New Canvas Width in Pixels.",function(btn,w){
              if(btn == 'ok'){
                  if(parseInt(w) < 100000 && parseInt(w) > 1){
                    //Ax.framerate = parseFloat(text);
                    //Ax.msg("Sucessfully set Animation speed", "The animation is now "+text+"fps")
                    Ext.MessageBox.prompt("Set Canvas Size","New Canvas Height in Pixels.",function(btn,h){
                        if(btn == 'ok'){
                            if(parseInt(h) < 100000 && parseInt(h) > 1){
                              Ax.msg("Resized Canvas","The canvas has been resized to "+w+"x"+h+" pixels.")
                              Ax.canvasHeight = parseInt(h)
                              Ax.canvasWidth = parseInt(w)
                              //Ax.canvasSize();
                              Ax.setCanvasSize();
                              
                              //do resizing
                              
                            }else{
                              Ax.msg("Canvas Height not in range","The canvas height must be larger than 1 and below 100,000")
                            }
                        }
                    },null,null,Ax.canvasHeight)
                  }else{
                    Ax.msg("Canvas Width not in range","The canvas width must be larger than 1 and below 100,000")
                  }
                }
            },null,null,Ax.canvasWidth)
        }},
        
        {text: "Theme", iconCls: "tb_theme", menu: new Ext.ux.ThemeMenu()},
      {text:"Help", iconCls: "tb_about", menu: [
  {text: "About", iconCls: "tb_about", handler: function(){Ax.About()}},
  {text: "Key Shortcuts", iconCls: "tb_keyboard", handler: function(){Ax.keyGuide()}},
  //{text: "Tip of the Day", iconCls: "tb_tip", handler: function(){Ax.showTips()}},
  {text: "Manual", iconCls: "tb_docs", handler: function(){Ax.loadManual()}},
  {text: "FAQ", iconCls: "tb_docs", handler: function(){Ax.loadFAQ()}},
  {text: "Bug Reports", iconCls: "tb_bug", handler: function(){Ax.BugReport()}},
  {text: "Contribute", iconCls: "tb_donate", handler: function(){Ax.donate()}}
  //{text: "Interactive Tutorials", iconCls: "tb_tutorial", menu: [
  //  {text: "Beginner's Tutorial", iconCls: "tb_info", handler: function(){Ax.tutorials_unavailable()}}
  //]}
  ]},
        /*
        {xtype: "tbfill"},{text:"Zoom"},
      {xtype: "slider", width: 120, maxValue: 300, value: 100, increment: 5,plugins: new Ext.ux.SliderTip({
      getText: function(slider){return String.format('Canvas Zoom: {0}%', slider.getValue())}
        })}
        */
        
                {xtype: "tbfill"},
        {iconCls: "tb_plugin_conf", menu: [
        

  {text: "Recovery", iconCls: "tb_shield", menu: [
                            {text: "Reload Canvas", iconCls: "tb_recover_canvas", handler: function(){Ax.reloadCanvas()}},
                            {text: "Reload Animation", iconCls: "tb_recover_animation", handler: function(){Ax.reload_animation()}},
                            
  //{text: "Purge Empty", iconCls: "tb_purge_empty", handler: function(){Ax.timelineCleanup()}},
    {text: "Reset Data", iconCls: "tb_new", handler: function(){Ax.new_animation()}},
    {text: "Reload Timeline", iconCls: "tb_reload", handler: function(){Ax.reloadTimeline()}},
                            {text: "Reload Application", iconCls: "tb_recover_application", handler: function(){window.location.reload(true)}}
  ]},
            {text: "Script Executor", iconCls: "tb_script", handler: function(){Ax.macroExec()}},
          
    {
      text: "Scripting Docs",
      iconCls: "tb_docs",
      handler: function(){
        Ax.loadAdvanced();
      }
    },
  {text: "Onion Skinning", iconCls: "tb_copy", handler: function(){
    
    Ext.MessageBox.prompt("Onion Skinning","Enter value for onion skinning opacity or 0 to disable.",function(btn,text){
      if(btn == "ok"){
        Ax.onion_skinning = text
      }
    },null,null,Ax.onion_skinning)
  }},
  
  {text: "Editor", iconCls: "app_settings", menu: [
  
  {text: "Dump Shapes", iconCls: "tb_info", handler: function(){Ext.MessageBox.alert("Editor Frame JSON",Ax.dumpshapes("json"))}},
  {text: "Select All", iconCls: "tb_cursor", handler: function(){Ax.canvas.selectAll()}},
  '-',
      {text: "Cut", iconCls: "tb_cut", handler: function(){Ax.clipboard_cut()}}, //woah! look! the whole thing is progressively 2 characters more!
  {text: "Copy", iconCls: "tb_copy", handler: function(){Ax.clipboard_copy()}}, //that's freaking cool!
  {text: "Paste", iconCls: "tb_paste", handler: function(){Ax.clipboard_paste()}}, //awesomeness
  {text: "Delete", iconCls: "tb_delete", handler: function(){Ax.setTool("delete")}}, //wootyness
  '-',
  {text: "To Front", disabled: true, iconCls: "tb_up", handler: function(){
      for(var i = 0; i < Ax.canvas.selected.length; i++){
          Ax.canvas.selected[i].toFront();
        }
    }},
  {text: "To Back", disabled: true, iconCls: "tb_down", handler: function(){
      for(var i = 0; i < Ax.canvas.selected.length; i++){
          Ax.canvas.selected[i].toBack();
        }
    }}
  ]},
  
  {text: "Copy Frame", iconCls: "tb_open", handler: function(){
          Ext.MessageBox.prompt("Copy Frame Data","Replace canvas with contents from another frame.",function(btn,text){
              if(btn == 'ok'){
                  if(parseInt(text) > 0){
                    Ax.loadframe(parseInt(text), Ax.tcurrent.layer)
                  }else{
                    Ax.msg("Frame Number not in range","The frame must be larger than zero")
                  }
                }
            },null,null,Ax.tcurrent.frame)
          }},
          
  {text: "Import Shapes", iconCls: "tb_open", handler: function(){
    Ext.MessageBox.prompt("Import Shape form JSON","Write your shape JSON dump below (Must be correct version).",function(btn,text){
      if(btn == "ok"){
        try{
          var json = Ext.util.JSON.decode(text);
          Ax.loadShapes(json)
        }catch(err){
            Ax.toastMsg("Error importing shapes!", err)
          }
      }
    },null,true)
    }},
    {text: "Wave", iconCls: "tb_wave", menu: [
    {text: "Set Gadget Height", handler: function(){
      if(window.gadgets && gadgets.window && gadgets.window.adjustHeight){
        gadgets.window.adjustHeight(prompt("enter new height in pixels",window.innerHeight));
        
      }else{
        Ax.msg("Height not Adjustable","The required APIs are not present.")
      }
    }},
  {text: "Clear Locks", handler: function(){
      wave2.del_subkeys("l/");
      Ax.msg("Locks removed","All shape locks cleared.")
    }},
    {text: "Show Locks", handler: function(){
      //wave2.del_subkeys("l/");
      //Ax.msg("Locks removed","All shape locks cleared.")
       var locks = "<table>"
       wave2.loop(function(key){
        locks += "<tr><td>"+key+"</td><td>"+wave2.get("l/"+key)+"</td></tr>";
       })(wave2.subkeys("l/"))
      Ext.MessageBox.alert("Shape Locks", locks+"</table>");
    }},
    {text: "Reset State", handler: function(){
        wave2.reset_gadget();
        Ax.msg("Reset Wave State","Wave State is now empty.")
      }},
    {text: "Show Dump", handler: function(){
        Ext.MessageBox.alert("Wave Status Dump",wave2.dump())
      }},
      {text: "Dump Length", handler: function(){
        Ext.MessageBox.alert("Wave Status Dump","The Wave State Dump is "+wave2.dump().length+" bytes in length.")
      }},
      {text: "Emulation", menu: [
      {text: "Emulate Wave", handler: function(){
          wave2.mode = "fake";
          Ax.msg("Switched to emulator","Wave API is now using emulated version")
        }},{text: "Real API (If applicable)", handler: function(){
          wave2.mode = "wave";
          Ax.msg("Switched to real API","The wave emulator has been disabled but will still be used if the wave API is not available.")
        }},{text: "Clone Emulator", handler: function(){
          wave2.pseudowave.clone();
          Ax.msg("Emulator State Cloned","The current wave state has been cloned to the emulator. It is safe to switch to emulator.")
        }}
      ]},
      
        {text: "Collect Garbage", handler: function(){
          wave2.garbagecollect();
          Ax.msg("Garbage Collection Complete","Deleted things marked for deletion but within safe deletion threshold.")
        }}
        ,{text: "Force GC", handler: function(){
          //wave2.mode = "fake";
          wave2.garbagecollect(true);
          Ax.msg("Garbage Collection Complete","Deleted EVERYTHING marked for deletion.")
        
          
        }}
    ]}
        
        ]}
        ],

			 html:"<div class=\"x-border-layout-ct canvas_container\">"+
       "<div id=\"drawcanvas\" class=\"canvas_edit\">Loading...</div>"+
       "</div>",
        

			 border: true
			}]
          },{
            xtype:"panel",
            title:"Watch",
			id: "preview_tab",
			iconCls: "preview_icon",
			//tabTip: "Preview and Export your animations",
			items: [{
			id: "preview",
            xtype:"panel",
            //title:"Preview",
			tbar: [
      /*" Name: ",{xtype: "textfield",
       value: Ax.animation.name,
       border: false,
       listeners: {
        "change": function(field){Ax.setAnimationName(field.getValue())}
        }, width: 200},{xtype: "tbfill"},{text:"Zoom"},
      {xtype: "slider", width: 120, maxValue: 300, value: 100, increment: 5,plugins: new Ext.ux.SliderTip({
      getText: function(slider){return String.format('Canvas Zoom: {0}%', slider.getValue())}
        })}
        */
        {text: "Save", iconCls: "tb_save", handler: function(){Ax.save.text()}},
        {text: "Publish", iconCls: "tb_publish", menu: [
        
        {text: "Upload+Share", iconCls: "tb_server", 
        handler: function(){
          //Ext.MessageBox.confirm("Open new window","To publish your animation as Flash, GIF or SMIL or to share with others, the application must launch a new window.",
          //function(btn){
            //if(btn == "yes"){
              var src= Ax.export_animation(Ax.animation.markup, "json")
              var id = Ext.ux.Crypto.SHA1.hash(src).substr(0, 14);
              
              Ax.msg("Uploading animation","The animation is being uploaded to the server with ID "+id+".")
              autopost(Ax.files.xssds, {
                group: "ajaxanimator",
                type: id, //hasheyftw
                data: src,
                act: "write"
              }, function(){
                
                //Ax.msg("Opening new window","A new window is being attempted to be opened with the new animation. You may copy and share the URL with people.");
                
                var share = Ax.files.player +id;
                
                Ext.MessageBox.alert("Share URL", "The animation has been sucessfully uploaded and a window has been launched. You may share the following URL:<br><a href='"+share+"'>"+share+"</a>")
                
                window.open(share) //stupid pop up blockers!
              })

              //Ax.msg("Not Implemented","Feature not implemented. As a workaround, you can copy the data from the Save button and open the normal OnlyPaths Ajax Animator, open from text and export from the File menu.")
            //}
          //})
          }
        },
        
  {text: "Flash", iconCls: "tb_flash", handler: function(){Ax.ex.swf.save()}},
	{text: "Animated GIF", iconCls: "tb_image", handler: function(){Ax.ex.gif.save()}},
	{text: "SMIL", iconCls: "tb_smil", handler: function(){Ax.ex.smil.save()}}//,

          ]
          
          },
        {text: "Info", iconCls: "tb_about", handler: function(){Ax.animationinfo()}},
        
        
        {text: "Set Speed", iconCls: "tb_fast", handler: function(){
          Ext.MessageBox.prompt("Set Animation Speed","New speed in frames per second.",function(btn,text){
              if(btn == 'ok'){
                  if(parseFloat(text) < 1000 && parseFloat(text) > 0){
                    Ax.framerate = parseFloat(text);
                    wave2.set("m/framerate",Ax.framerate)
                    Ax.msg("Sucessfully set Animation speed", "The animation is now "+text+"fps")
                  }else{
                    Ax.msg("Animation Speed not in Range","The speed of the animation must be larger than zero and below 1000")
                  }
                }
            },null,null,Ax.framerate)
          }},{text: "Play", xtype: "cycle" , showText: true,
        items: [{iconCls: "tb_play",text: "Play"},{iconCls: "tb_pause",text: "Pause",checked:true}],
        changeHandler: function(){Ax.controls.toggle()}},
        {xtype: "tbfill"},
        {iconCls: "tb_plugin_conf", menu: [
  {text: "Script Executor", iconCls: "tb_script", handler: function(){Ax.macroExec()}},
  {text: "Publish (More)", iconCls: "tb_publish", menu: [
  {text: "OPF Array", iconCls: "tb_silverlight", handler: function(){Ax.ex.array.save()}},
  {text: "Processing", iconCls: "tb_processing", handler: function(){Ax.ex.processing.save()}},
	{text: "Silverlight", iconCls: "tb_silverlight", handler: function(){Ax.ex.silverlight.save()}},
	{text: "JavaFX", iconCls: "tb_javafx", handler: function(){Ax.ex.javafx.save()}}
  
        ]},
        {text: "Set Name", iconCls: "tb_info",handler: function(){
        Ax.setAnimationName(prompt("Enter New Animation Name (Not Synced and not used)",Ax.animation.name))
        }},
        {
      text: "Scripting Docs",
      iconCls: "tb_docs",
      handler: function(){
        Ax.loadAdvanced();
      }
    }
        ]}
        ],
        
			//bbar: new Ext.StatusBar(Ax.PreviewStatusbar),
			border: false,
			/*
      tools: [{id: "gear"},{id: "help",
			qtip: "Preview and Export your animations to Flash&reg; ... Hopefully"}],
      */
			iconCls: "preview_icon",			
            layout:"fit",
						 html:"<div class=\"x-border-layout-ct canvas_container\">"+
       "<div class=\"canvas\" id=\"previewcanvas\">Loading...</div>"+
       "</div>"
			
			}],
			listeners: {
      'render' : function(){
        setTimeout(function(){
              //Ax.setAnimationName(Ax.animation.name);
        },100);
        
      },
				'activate' : function(){
          
          if(!Ax.timeline.el){
            (function(){ //shit so much polling. event based would be better
            if(Ax.viewport){
            try {
                  Ax.initTimeline()
                  Ax.addLayer()
                  Ax.addFrames(99)
                  //Ax.toKeyframe(1, "Layer 1")
                  }catch(err){
                      Ext.MessageBox.alert("Timeline Initialization FAILED.",err.message)
                  }
            }else{
              setTimeout(arguments.callee, 100);
            }
          })()
          }
          
          (function(){
            if(Ax.viewport && Ax.layers['~1']){
              
              //Ax.gs(7);
              Ax.viewport.findById("tools").collapse()
              //Ax.viewport.findById("toolbar").getTopToolbar().items.item(5).menu.items.item(0).setText("Preview Mode")
              //Ax.init_preview();
              clearTimeout(Ax.preview_timeout);
              
              Ax.preview_mode = true;
              Ax.preview_increment();
            }else{
              setTimeout(arguments.callee, 100);
            }
            
          })()
          
          

        
				},
				'deactivate' : function(){
					Ax.controls.pause()
				}
			},
            layout:"fit",
			border: true
          }/*,{
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
		  }*/]
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
    
    //if(Ax.viewport.findById("canvas").getTopToolbar().items){
    //    Ax.viewport.findById("canvas" ).getTopToolbar().items.item(1).getEl().value = name}
    //if(Ax.viewport.findById("preview").getTopToolbar().items){
    //    Ax.viewport.findById("preview").getTopToolbar().items.item(1).getEl().value = name}
  }
