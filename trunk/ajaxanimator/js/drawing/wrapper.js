/**
* Heh. This file provides wrappers for OnlyPaths. really quite simple really
* donno if i'll even use this. it'll probably be filled with hacks and other crap
* and there'll be probably more globals declared here than anywhere else... combined
*/

Ax.canvasWidth=480;
Ax.canvasHeight=272; 

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
}

clockdata = function(){};

  
Ax.onlypaths = {
  version: "Symply Web 0.1.03 Modified"
}

var zoominit='0 0 '+Ax.canvasWidth+' '+Ax.canvasHeight; //some OnlyPaths stuffs
var centerZoomx=Math.round(Ax.canvasWidth/2); //some OnlyPaths stuffs
var centerZoomy=Math.round(Ax.canvasHeight/2); //some OnlyPaths stuffs
var selectmode=''; //I have a feeling these comments aren't helping anyone
var data_path_close = false;
  


Ax.drawinit_core = function(){
  var renderer = null;
  if(Ext.isIE == true){
    renderer = new VMLRenderer();
  }else{
    renderer = new SVGRenderer();
  }
  Ax.canvas = new RichDrawEditor($("drawcanvas"), renderer);
  Ax.canvas.onInputXY = Ax.setDrawXY;
  Ax.canvas.actualStyle = function(){}; //this is a hack so it doesn't replace some stuff that i'm about to set now
  
  
  Ax.canvas.textMessaje = "Ajax Animator+OnlyPaths"
  Ax.canvas.textSize = 19;
  Ax.canvas.fontFamily = "Arial";
  Ax.canvas.imageHref = "http://tavmjong.free.fr/INKSCAPE/MANUAL/images/QUICKSTART/SOUPCAN/SoupCan_SoupedUp.png"
  
  
  
  Ax.canvas.onselect  = Ax.loadcolors;
  Ext.get(Ax.canvas.container.parentNode).on("mouseup",function(){
    setTimeout(function(){Ax.autodiff();return true},10);
  })
  Ax.Color.update = Ax.updatecolors;
  Ax.updatecolors();
}

Ax.drawinit = function(){
  $("drawcanvas").innerHTML = "";
  $("drawcanvas").style.height = Ax.canvasHeight+"px";
  $("drawcanvas").style.width = Ax.canvasWidth+"px"

  if(Ext.isIE==true){ //yes. i know. browser sniffing is bad
    $("drawcanvas").style.position = "absolute";
    $("drawcanvas").style.left = "5%";
  }

  //Ax.msg("W00t!","you enabled the drawing component: OnlyPaths!!!! NOw you can start drawing and doing stuff that actually matters");

  Ax.drawinit_core()

  Ax.setTool('rect');
}

Ax.loadcolors = function(){
  Ax.setColors({
    lw: Ax.canvas.queryCommand('linewidth'),
    lc: Ax.canvas.queryCommand('linecolor').replace("#",""),
    fc: Ax.canvas.queryCommand('fillcolor').replace("#","")
  })
}

Ax.updatecolors = function(){
  Ax.canvas.editCommand('fillcolor', '#'+Ax.Color.fill);
  Ax.canvas.editCommand('linecolor', '#'+Ax.Color.line);
  Ax.canvas.editCommand('linewidth', Ax.Color.width.toString()+'px');   
  Ax.canvas.setGrid(Ax.Color.grid, Ax.Color.grid);
}



Ax.reloadCanvas = function(){//now a very very robust function, should be able to recover from most errors, even most really random ones
  var init = (new Date()).getTime(),
  log = [],
  backup = [],
  mode = "select";
  try{
    mode = Ax.canvas.queryCommand("mode")
  }catch(err){log.push("FO1: "+err)}
  try{
  backup = Ax.dumpshapes()
  }catch(err){log.push("FO2: "+err);
  Ax.msg("Sorry","OnlyPaths has encountered a critical error. The canvas data may be unrecoverable.")}
  try{
  Ax.canvas.renderer.removeAll()
  }catch(err){log.push("FO3: "+err)}
  try{
  Ax.canvas.container.innerHTML = null
  }catch(err){log.push("FO4: "+err)}
  try{
  Ax.canvas = null
  }catch(err){log.push("FO5: "+err)}
  try{
  Ax.drawinit_core();
  }catch(err){log.push("FO6: "+err)}
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


Ax.setTool = function(tool){
 
  
for(var tool_id in Ax.toolConfig){
Ax.viewport.findById("tool_"+tool_id).unselect()
}

//report usage statistics
//* take out that first "/" to disable
Ax.gs(({select:10,rect:11,roundrect:12,
ellipse:13,line:14,path:15,
controlpath:16,text:17,image:18,
shape:19,reset:20,"delete":21})[tool])
/**///*//for my text editor (notepad2, though i normally use notepad++ which doesn't face this issue)

if(tool == "controlpath"){
selectmode = "controlpath"
}
if(tool == "path"){
selectmode = "path"
}
  switch(tool){
  case "delete":
    Ax.canvas.deleteSelection();
    (function(){
    Ax.viewport.findById("tool_"+tool).unselect();
    Ax.setTool("select")
    }).defer(200);
    break;
  case "reset":
   Ax.canvas.renderer.removeAll();
    
    (function(){
    Ax.viewport.findById("tool_"+tool).unselect();
    Ax.setTool("select")
    }).defer(200);
    break;
  default:
  
    Ax.canvas.unselect();
    Ax.viewport.findById("tool_"+tool).select(true);
    Ax.canvas.editCommand('mode', tool);
    break;
  }
  
  
  setTimeout(function(){Ax.autodiff();return true},10); //do some magickal saving.
}

Ax.loadShapes = function(shapes,noattachlistener, instance){ //instance; probably need a better name for this. but its the richdraw/onlypaths/viewer/etc reference. 
  if(typeof shapes == typeof "antimatter15isawesome"){
      shapes = Ext.util.JSON.decode(shapes);
  }
  for(var i = 0; i < shapes.length; i++){
    Ax.loadShape(shapes[i],noattachlistener, instance);
  }
}

Ax.loadShape = function(shape,noattachlistener,instance){


  var newshape  = ((instance)?instance:Ax.canvas).renderer.create(shape.type, //Shape
  (shape.fillColor)?shape.fillColor:("#"+Ax.Color.fill), 
  (shape.lineColor)?shape.lineColor:("#"+Ax.Color.line), 
  (shape.fillOpac)?shape.fillOpac:1,
  (shape.lineOpac)?shape.lineOpac:1, 
  (shape.lineWidth)?shape.lineWidth:Ax.Color.width, 
  (shape.left)?shape.left:100,
  (shape.top)?shape.top:100, 
  (shape.width)?shape.width:100,
  (shape.height)?shape.height:100,
  (shape.text)?shape.text:'',
  (shape.textSize)?shape.textSize:19,
  (shape.textFamily)?shape.textFamily:'Arial',
  (shape.href)?shape.href:'', 
  (shape.points)?shape.points:'', 
  (shape.transform)?shape.transform:'',
  (shape.parent)?shape.parent:''); 
 
  newshape.id = (shape.id)?shape.id:createUUID()

  if(!noattachlistener){
  Ext.get(newshape).on("mousedown", Ax.canvas.onHit, Ax.canvas);
  }
}

Ax.dumpshape = function(shape){
    if(!shape.getAttribute("transform")){
    var box = shape.getBBox()
      shape.setAttributeNS(null,'transform', 'rotate(0, '+(box.x+(box.width/2))+', '+(box.y+(box.height/2))+')'); 
    }
  return Ax.canvas.info(shape)
}

Ax.dumpshapes = function(format){
  var rawshapes = Ax.canvas.getshapes()
  var newshapes = [];
  for(var i = 0; i < rawshapes.length; i++){
    if(rawshapes[i].id!="tracker"){
      newshapes.push(Ax.dumpshape(rawshapes[i]));
    }
  }
  if(format=="json"){
    return Ext.util.JSON.encode(newshapes)
  }else{
    return newshapes;
  }
  
}

