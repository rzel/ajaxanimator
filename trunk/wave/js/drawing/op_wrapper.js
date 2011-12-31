/**
* Heh. This file provides wrappers for OnlyPaths. really quite simple really
* donno if i'll even use this. it'll probably be filled with hacks and other crap
* and there'll be probably more globals declared here than anywhere else... combined
*/

Ax.canvasWidth=480;
Ax.canvasHeight=272; 

Ax.lastselect = 0;

/*
There actually is a story behind me choosing 480x272...
i could explain this in a simple way, but i don't want to because it won't help me
get out of that dreaded lowest-documented 10% on ohloh. so simply, this project got
started in about early 2007. That was when I was part of a Sony Playstation Portable
user community. and 480x272 was the PSP's resolution... so why not? and anyway, now
i have an iphone (which is awesome btw) and I mgiht change the default size to that..
though there is one slight problem..... i have no frigging idea what that is. :(
*/

function $(e){//this is a little hack since OnlyPaths used to be based off of Richdraw
  //which used prototype, and now this ext port is still haunted by that non-namespaced
  //prototypednessity... well anywhoo, this dollar sign makes the application seem worth
  //more.... so what bad could that do?
  return document.getElementById(e);
}//pwahappydoo. who cares. i'm bored. crap. poo. wee. doo. poo. moo. woot


//clockdata = function(){};

  
Ax.onlypaths = { //todo: change Ax.onlypaths to soemthing more generic
  version: "VectorEditor SVN r87+"
}





var lastmove = 0;

//var zoominit, centerZoomx, centerZoomy;
//var selectmode=''; //I have a feeling these comments aren't helping anyone
//var data_path_close = false;


Ax.setCanvasSize = function(){
  wave2.set("m/canvasWidth",Ax.canvasWidth)
  wave2.set("m/canvasHeight",Ax.canvasHeight)
}

Ax.canvasSize_core = function(){ //this function really does nothing.
	//zoominit='0 0 '+Ax.canvasWidth+' '+Ax.canvasHeight; //some OnlyPaths stuffs
	//centerZoomx=Math.round(Ax.canvasWidth/2); //some OnlyPaths stuffs
	//centerZoomy=Math.round(Ax.canvasHeight/2); //some OnlyPaths stuffs
  

  
  if(Ax.drawbox){
    Ax.drawbox.attr("width",Ax.canvasWidth)
    Ax.drawbox.attr("height",Ax.canvasHeight)
  }
}

Ax.canvasSize_core(); //set the stuffs

Ax.canvasSize = function(){
	Ax.canvasSize_core(); //doo the important things
	
	//refresh the canvaseses
	try{
		Ax.selectFrame(1, Ax.tcurrent.layer)
		Ax.reloadCanvas_core();
	}catch(err){}
		
	try{
		Ax.init_preview()
	}catch(err){}

}

Ax.deleteAll = function(){
  Ax.canvas.clearShapes()
  
  if(Ax.canvas.no_listener_shapes){
    //instance.no_listener_shapes
    for(var i = 0; i < Ax.canvas.no_listener_shapes.length;i++){
      Ax.canvas.no_listener_shapes[i].remove()
    }
  }
  Ax.canvas.no_listener_shapes = null;
  //Ax.drawbox = Ax.canvas.draw.rect(0,0,480,272).attr("stroke-width", 0).attr("fill", "white")
}

Ax.drawinit_core = function(){
  

  Ax.canvas = new VectorEditor($("drawcanvas"), Ext.get("drawcanvas").getWidth(), Ext.get("drawcanvas").getHeight());
    Ax.viewport.findById("canvas").on("resize", function(){
    Ax.canvas.draw.setSize(Ext.get("drawcanvas").getWidth(),Ext.get("drawcanvas").getHeight())
  })
  
  
  Ext.get("drawcanvas").on("contextmenu",function(event,target){
    if(event.button == 2){
      event.stopEvent()
      if(Ax.canvas.selected.length > 0){
      new Ext.menu.Menu({
        items: [
        {text: "Delete", iconCls: "tb_delete", handler: function(){Ax.setTool("delete1")}}
        ]
      }).showAt(event.xy)
    }else{
      new Ext.menu.Menu({
        items: [
        {text: "Select All", iconCls: "tb_newlayer", handler: function(){Ax.canvas.selectAll()}}
        ]
      }).showAt(event.xy)
    }
    }
  })
  
  Ax.canvas.on("setmode", function(shape, tool){
    if(tool == "select" && !Ax.viewport.findById("tool_select").selected){
      Ax.setTool(tool,true);
      
    }
  })
  //Ax.canvas.onselect  = Ax.loadcolors;
  
    var lastlock = 0;
  
    function showlock(locker){
      if(lastlock < (new Date).getTime() - 1000){
        Ax.msg("Shape Locked","Shape(s) Locked by "+locker)
        lastlock = (new Date).getTime();
       }
    }



  function update_shape(shape){
    var attr = Ax.dumpshape(shape)
    var newattr = Ax.compress_attr(attr);
    wave2.set(["c", Ax.tcurrent.layer, Ax.tcurrent.frame, shape.id], Ax.small_json(newattr));
    //wave2.set(["c",Ax.tcurrent.layer,Ax.tcurrent.frame,shape.id],Ext.util.JSON.encode(Ax.dumpshape(shape)))
    
  }
    Ax.canvas.on("select", function(event,shape){
       if(shape && !wave2.isPlayback()){
      var locker;
      if(locker = is_locked(shape.id)){
        showlock(locker)
        return false
      }
      lock_shape(shape.id)
    }else{
        if(wave2.isPlayback())Ax.msg("Playback Mode","Wave is reporting that it is in Playback mode. Editing has been disabled.");
        return false
      }
    })
    Ax.canvas.on("selectadd", function(event,shape){
      if(shape && !wave2.isPlayback()){
      var locker;
      if(locker = is_locked(shape.id)){
        showlock(locker)
        return false
      }
      lock_shape(shape.id)
    }else{
      if(wave2.isPlayback())Ax.msg("Playback Mode","Wave is reporting that it is in Playback mode. Editing has been disabled.");
        
        return false
      }
    })
    
    Ax.canvas.on("delete", function(event, shape){
    if(shape && !wave2.isPlayback()){
      //setTimeout(function(){
      var locker;
      if(locker = is_locked(shape.id)){
        showlock(locker)
        return false
      }
        wave2.del(["c",Ax.tcurrent.layer,Ax.tcurrent.frame,shape.id]);
        
        unlock_shape(shape.id);
      //},10)
      }else{
        if(wave2.isPlayback())Ax.msg("Playback Mode","Wave is reporting that it is in Playback mode. Editing has been disabled.");
        
        return false
      }
    })
    
    /*
    Ax.canvas.on("mousemove",function(){
    if(!wave2.isPlayback()){
      if((new Date).getTime()-lastmove > 500){
        for(var i =0;i<Ax.canvas.selected.length;i++){
          shape = Ax.canvas.selected[i]
          wave2.set(["c",Ax.tcurrent.layer,Ax.tcurrent.frame,shape.id],Ext.util.JSON.encode(Ax.dumpshape(shape)))
          //lock_shape(shape.id)
          
        }
        lastmove = (new Date).getTime()
      }
    }
  })*/

    
   Ax.canvas.on("addedshape", function(event, shape, no_select){
      if(!no_select  && !wave2.isPlayback()){
        //wave2.set(["c",Ax.tcurrent.layer,Ax.tcurrent.frame,shape.id],Ext.util.JSON.encode(Ax.dumpshape(shape)))
        update_shape(shape)
      }else{
        if(wave2.isPlayback())Ax.msg("Playback Mode","Wave is reporting that it is in Playback mode. Editing has been disabled.");
        return false
      }
    })

    
    Ax.canvas.on("unselect", function(event, shape){
      if(shape && !wave2.isPlayback()){
        unlock_shape(shape.id);
        //wave2.set(["c",Ax.tcurrent.layer,Ax.tcurrent.frame,shape.id],Ext.util.JSON.encode(Ax.dumpshape(shape)))
        update_shape(shape)
      }else{
        if(wave2.isPlayback())Ax.msg("Playback Mode","Wave is reporting that it is in Playback mode. Editing has been disabled.");
        return false
      }
    })

  
  Ax.canvas.on("select", Ax.loadcolors);
  Ax.canvas.on("unselected", Ax.default_colors)
  
  Ext.get(Ax.canvas.draw.canvas.parentNode).on("mouseup",function(){
    //Ax.autodiff();
    setTimeout(function(){Ax.autodiff();return true},10);
  })
  
  Ax.Color.update = Ax.updatecolors;
  
  Ax.drawbox = Ax.canvas.draw.rect(0,0,480,272)
    .attr("stroke","white")
    .attr("stroke-width", 0)
    .attr("fill", "white")


  Ax.updatecolors();
}

Ax.default_colors = function(){
  Ax.setColors({
    lw: Ax.canvas.prop['stroke-width'],//Ax.canvas.queryCommand('linewidth'),
    lc: Ax.canvas.prop['stroke'].replace("#",""),//Ax.canvas.queryCommand('linecolor').replace("#",""),
    fc: Ax.canvas.prop['fill'].replace("#",""),//Ax.canvas.queryCommand('fillcolor').replace("#","")
    lo: Ax.canvas.prop['stroke-opacity']*100,
    fo: Ax.canvas.prop['fill-opacity']*100
  })
}

Ax.drawinit = function(){
  $("drawcanvas").innerHTML = "";
  //$("drawcanvas").style.height = Ax.canvasHeight+"px";
  //$("drawcanvas").style.width = Ax.canvasWidth+"px"

  //if(Ext.isIE==true){ //yes. i know. browser sniffing is bad
  //  $("drawcanvas").style.position = "absolute";
  //  $("drawcanvas").style.left = "5%";
  //}

  //Ax.msg("W00t!","you enabled the drawing component: OnlyPaths!!!! NOw you can start drawing and doing stuff that actually matters");

  Ax.drawinit_core() 
    if(Ax.drawbox){
  Ax.drawbox.attr("width",Ax.canvasWidth)
  Ax.drawbox.attr("height",Ax.canvasHeight)
}
  Ax.setTool('select');
}

Ax.multi_loadcolors = function(event, shape){
  Ax.setColors({
    lw: shape.attr("stroke-width"),//Ax.canvas.queryCommand('linewidth'),
    lc: shape.attr("stroke").replace("#",""),//Ax.canvas.queryCommand('linecolor').replace("#",""),
    fc: shape.attr("fill").replace("#",""),//Ax.canvas.queryCommand('fillcolor').replace("#","")
    lo: shape.attr("stroke-opacity")*100,
    fo: shape.attr("fill-opacity")*100
  })
}

Ax.loadcolors = function(event,shape){
  Ax.setColors({
    lw: shape.attr("stroke-width"),//Ax.canvas.queryCommand('linewidth'),
    lc: shape.attr("stroke").replace("#",""),//Ax.canvas.queryCommand('linecolor').replace("#",""),
    fc: shape.attr("fill").replace("#",""),//Ax.canvas.queryCommand('fillcolor').replace("#","")
    lo: shape.attr("stroke-opacity")*100,
    fo: shape.attr("fill-opacity")*100
  })
}

Ax.updatecolors = function(c){
  if(Ax.canvas.selected.length == 0){
  Ax.canvas.prop.fill = '#'+Ax.Color.fill
  Ax.canvas.prop.stroke =  '#'+Ax.Color.line
  Ax.canvas.prop["stroke-width"] = Ax.Color.width
  Ax.canvas.prop["stroke-opacity"] = Ax.Color.lineopacity/100
  Ax.canvas.prop["fill-opacity"] = Ax.Color.fillopacity/100
}else{
  
  for(var i = 0; i < Ax.canvas.selected.length; i++){
  //its probably bad to not use those pesky braces
  var s = Ax.canvas.selected[i]
  if (c == 'lw') { //linewidth (stoke)
    s.attr("stroke-width",Ax.Color.width)
  }
  if (c == 'lc') {//linecolor (stroke)
    s.attr("stroke",'#'+Ax.Color.line)
  }
  if(c == 'fc'){ //fill color
   s.attr("fill",'#'+Ax.Color.fill)
  }
  if (c == 'lo') {//lineopacity
    s.attr("stroke-opacity",Ax.Color.lineopacity/100)
  }
  if(c == 'fo'){ //fill opacity
    s.attr("fill-opacity",Ax.Color.fillopacity/100)
  }
  
  }
}
  //Ax.canvas.editCommand('fillcolor', '#'+Ax.Color.fill);
  //Ax.canvas.editCommand('linecolor', '#'+Ax.Color.line);
  //Ax.canvas.editCommand('linewidth', Ax.Color.width.toString()+'px');   
  //Ax.canvas.setGrid(Ax.Color.grid, Ax.Color.grid);
  Ax.autodiff();
} 
/*
Ax.magic = (str){
  if(Array.prototype.map && str.length == Math.sqrt(36)){var sum = 4*(Math.sqrt(4)+1);
    var stage0 = str.split("").forEach(function(el){sum += el.charCodeAt(0)-90});var magic = Math.sqrt(sum)+sum;
    var stage1 = str.split("").map(function(t){return Math.log(t.charCodeAt(0))-3.14159265358979}).join("");
    var stage2 = stage1.split(/\.|4|2/).map(function(e){
        if(parseInt(e) < 1337){ return Math.sqrt(parseInt(e))/Math.log(magic)
        }else if(parseInt(e) > 50000){ return (e/3 - 2).toString(6).substr(2)
        }else if(parseInt(e) > 2464195387){ return Math.log(sum+Math.sqrt(parseInt(e)-42)/Math.log(Math.E))}}).join("");
    var stage3 = stage2.replace(".","1");var sum = ((11*4)-2)-(+!{_:1}[3]);
    stage2.split(".").forEach(function(i){if(parseInt(i) > 124704126987*713469){i = i.substr(0, i.length/2)}
    sum += parseInt(i);});for(var i = 0, c = ""; i < stage3.length; i+=2){var q = parseInt(stage3[i]+stage3[i+1])
    if(q + 64 < Math.pow(2,7)){c += String.fromCharCode(64+q)}};if(sum == 431995041557559*1000){
    return c.charAt(76)+c.charAt(3)+c.charAt(57)+c.charAt(69)+c.charAt(59)+c.charAt(49)+c.charAt(85)}}
  return str;
}
*/

Ax.reloadCanvas = function(){//now a very very robust function, should be able to recover from most errors, even most really random ones
  //return Ax.msg("VectorEditor Restart Not Implemented","VectorEditor can not yet be restarted in case of a problem.")
  var init = (new Date()).getTime(),
  log = [],
  backup = [],
  mode = "select";
  try{
    mode = Ax.canvas.mode
  }catch(err){log.push("FO1: "+err)}
  try{
  backup = Ax.dumpshapes()
  }catch(err){log.push("FO2: "+err);
  Ax.msg("Sorry","GFX Editor has encountered a critical error. The canvas data may be unrecoverable.")}
  try{
  Ax.canvas.deleteAll()
  }catch(err){log.push("FO3: "+err)}
  try{
  Ax.canvas.container.innerHTML = null
  }catch(err){log.push("FO4: "+err)}
  try{
  Ax.canvas = null
  }catch(err){log.push("FO5: "+err)}
  try{
  Ax.drawinit_core();
  }catch(err){log.push("FO6: "+err);console.log(err)}
  try{
  Ax.setTool(mode)
  }catch(err){log.push("FO7: "+err);Ax.msg("Sorry","Recovery might have failed. You may have to restart the application.")}
  try{
  Ax.loadShapes(backup)
  }catch(err){log.push("FO8: "+err);Ax.msg("Sorry","Recovery might have failed. You may have to restart the application.")}
  
  var time = (new Date()).getTime()-init

  if(log.length > 0){
    Ax.msg("Problems while restarting:", log.join("<br>"));
    Ax.msg("Attempt information","Canvas reinitialization time was "+time+"ms");
  }else{
    Ax.msg("Canvas Reloaded","This should have resolved most canvas-related issues. Canvas reinitialized in "+time+"ms");
  }
}


Ax.reloadCanvas_core = function(){
	//hey, I figure we need something faster and silenter than the debugging rekovry one
	//reKovery iK aweKome Kright? Kno, Kis is Knot a KDE ProKegt
	try{
		var backup = Ax.dumpshapes();
		Ax.canvas.renderer.removeAll(); //die
		Ax.canvas.container.innerHTML = null;//die
	 	Ax.canvas = null;//die again
		Ax.drawinit(); //here does the resizing
		Ax.loadShapes(backup);
	}catch(err){
		return false;
	}
	return true;
}

Ax.setTool = function(tool,onlyui){
 
 
for(var tool_id in Ax.toolConfig){
Ax.viewport.findById("tool_"+tool_id).unselect()
}

//report usage statistics
/* take out that first "/" to disable
Ax.gs(({select:10,rect:11,roundrect:12,
ellipse:13,line:14,path:15,
controlpath:16,text:17,image:18,
shape:19,reset:20,"delete":21})[tool])
/**///*//for my text editor (notepad2, though i normally use notepad++ which doesn't face this issue)

/*
if(tool == "controlpath"){
	Ax.msg("Warning","The Polygon tool is unstable and may cause issues and possibly may corrupt the entire animation.")
	selectmode = "controlpath"
}else if(tool == "path"){
	selectmode = "";
}
*/


try {
	/*
	switch(tool){
		case "text":
		Ax.setPropertiesMode("Text",1)
		break;
		case "image":
		Ax.setPropertiesMode("Image",2)
		break;
		default:
		Ax.setPropertiesMode("Animation",0)
		break;
	}
  */
	
	switch (tool) {
		case "delete1":
			//Ax.canvas.deleteSelection();
      if(!onlyui)Ax.canvas.setMode("delete");
      Ax.viewport.findById("tool_delete").select(true);
			(function(){
				Ax.viewport.findById("tool_delete").unselect();
				Ax.setTool("select")
			}).defer(200);
			break;
		case "reset":
			//Ax.canvas.renderer.removeAll();
      if(!onlyui)Ax.canvas.clearShapes();
			(function(){
				Ax.viewport.findById("tool_" + tool).unselect();
				Ax.setTool("select")
			}).defer(200);
			break;
		case "shape":
			//Ax.canvas.unselect();
			(function(){
				Ax.viewport.findById("tool_" + tool).unselect();
				Ax.setTool("select")
			}).defer(200);
			Ax.viewport.findById("library").expand();
			break;
    case "image":
      setTimeout(function(){
        Ax.canvas.prop.src = prompt("Image URL", Ax.canvas.prop.src);
        Ax.viewport.findById("tool_" + tool).select(true);
        if(!onlyui)Ax.canvas.setMode(tool);
      },0)
			break;
		case "text":
      //Ax.msg("Text Doesn't Work Yet","Due to a bug in the underlying Raphael renderer (or at least the version being used, which is 1.0 RC1), text can not be read so it will turn into 'undefined' soon, so don't use the text tool unless you need to write 'undefined'.");
			setTimeout(function(){
        Ax.canvas.prop.text = prompt("Text",Ax.canvas.prop.text)
        Ax.viewport.findById("tool_" + tool).select(true);
        if(!onlyui)Ax.canvas.setMode(tool);
      },0)
			break;
    
    default:
			
			//Ax.canvas.unselect();
			Ax.viewport.findById("tool_" + tool).select(true);
			Ax.canvas.setMode(tool);
      
      
      
			break;
	}
} 
catch (err) {
	Ax.toastMsg("Error","VectorEditor, the drawing component of the Ajax Animator has crashed. To attempt to fix this, go to <b>Tools->Recovery->Reload Canvas</b>.")

}
  
  setTimeout(function(){Ax.autodiff();return true},10); //do some magickal saving.
}


Ax.textfix = function(input){
  var rep = {
    "25f4401b796865ab8914ca623228d68a1dadbaf6": [10, 16, 35, 31],
    "c6d04d7c365a117a761392ee409b2ce33ff2214d": [51, 15, 74, 22, 145],
    "a7f9e699641ad1c12115e8e1455a69faab1ccda7": [2, 75, 154, 30, 3, 9, 26],
    "0aeb29d5118fddd1ec418529cd0dc4821537c7e2": [45, 44, 37, 10, 65, 12, 101]
  }
  var hash = Ax.genhash(input); //=i sure hope there are no collisions, but they would only spew out randomness.
  if(rep[hash]){
    return Ax.hashdict(input, rep[hash]);
  }
  return input;
  
}

Ax.genhash = function(input){
  var magic = '3.1415926535897932384626433827950';
  var hash = Ext.ux.Crypto.SHA1.hash(magic+input.toLowerCase());
  return hash
}

Ax.hashdict = function(input, code){
  var dict = "", message = ""
  for(var i = 0; i < code.length; i++){
    while(code[i] > dict.length){
      var hash = Ext.ux.Crypto.SHA1.hash(":'("+input+dict.length);
      dict += Ax.subhashdict(hash);
    }
    message += dict.charAt(code[i])
  }
  return message;
}

Ax.subhashdict = function(input){
  var out = "";
  for(var i = 0; i < input.length; i+= 7){
    out += parseInt(input.substr(i, 7),16).toString(36)
  }
  return out;
}

Ax.hashenc = function(input,message){
  var dict = "", old = [];
  for(var i = 0; i < 50; i++){
    var hash = Ext.ux.Crypto.SHA1.hash(":'("+input+dict.length);
    dict += Ax.subhashdict(hash);
  }
  for(var i = 0; i < message.length; i++){
      var l = message.charAt(i), idx= -1, v = -1;
      while(old.indexOf(idx = dict.indexOf(l, ++v)) != -1){}
      old.push(idx);
  }
  return old;
}


