  function randomRect(){
  var svgNamespace = 'http://www.w3.org/2000/svg';
      var red1 = Math.round(Math.random() * 255);
      var green1 = Math.round(Math.random() * 255);
      var blue1 = Math.round(Math.random() * 255);
	  var red2 = Math.round(Math.random() * 255);
      var green2 = Math.round(Math.random() * 255);
      var blue2 = Math.round(Math.random() * 255);
 var newRect = document.createElementNS(svgNamespace,"rect");
	  newRect.setAttribute("stroke-width",Math.random() * 10);	
	  	  newRect.setAttribute("stroke","rgb("+ red1 +","+ green1+","+blue1+")");
      newRect.setAttribute("fill","rgb("+ red2 +","+ green2+","+blue2+")");
	        newRect.setAttribute("height",Math.random() * 100);	
      newRect.setAttribute("width",Math.random() * 100);	
      newRect.setAttribute("y",Math.random() * 272);
      newRect.setAttribute("x",Math.random() * 480);

      DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newRect);
	  Event.observe(newRect, "mousedown",DrawCanvas[currentCanvas].onHitListener);  
  }
  function randRectArr(){
  for(var items = 0; items < 30; items++){

  for(var rects = 0; rects < 10; rects++){
  randomRect()
  }
  gotoframe(items,1)
  removeKeyframe()
  }
  }
  
  
  //Macro API V 1
  

  
  
  var macro = {
  addshape: function(config){
  var ns = document.createElementNS('http://www.w3.org/2000/svg',config.shape)
  
  if(config.strokewidth){ns.setAttribute("stroke-width",config.strokewidth)}
  if(config.fill){ns.setAttribute("fill",config.fill)}
  if(config.stroke){ns.setAttribute("stroke",config.stroke)}
  if(config.width){ns.setAttribute("width",config.width)}
  if(config.height){ns.setAttribute("height",config.height)}
  if(config.x){ns.setAttribute("x",config.x)}
  if(config.y){ns.setAttribute("y",config.y)}
  if(config.x1){ns.setAttribute("x1",config.x1)}
  if(config.y1){ns.setAttribute("y1",config.y1)}
  if(config.x2){ns.setAttribute("x2",config.x2)}
  if(config.y2){ns.setAttribute("y2",config.y2)}
  if(config.cx){ns.setAttribute("cx",config.cx)}
  if(config.cy){ns.setAttribute("cy",config.cy)}
  if(config.rx){ns.setAttribute("rx",config.rx)}
  if(config.ry){ns.setAttribute("ry",config.ry)}
  
  DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(ns)
  Event.observe(ns, "mousedown",DrawCanvas[currentCanvas].onHitListener);  
  },
  moveshape : function(config){
  var xdist = config.xdist
  var ydist = config.ydist
  var nsf = config.obj

if(!config.absolute){
if(nsf.tagName.toString().toLowerCase() == "rect"){
nsf.setAttribute("x", parseInt(nsf.getAttribute("x"))+xdist)
nsf.setAttribute("y", parseInt(nsf.getAttribute("y"))+ydist)
}

if(nsf.tagName.toString().toLowerCase() == "ellipse"){ 
nsf.setAttribute("cx", parseInt(nsf.getAttribute("cx"))+xdist)
nsf.setAttribute("cy", parseInt(nsf.getAttribute("cy"))+ydist)
}
if(nsf.tagName.toString().toLowerCase() == "line"){
nsf.setAttribute("x1", parseInt(nsf.getAttribute("x1"))+xdist)
nsf.setAttribute("y1", parseInt(nsf.getAttribute("y1"))+ydist)
nsf.setAttribute("x2", parseInt(nsf.getAttribute("x2"))+xdist)
nsf.setAttribute("y2", parseInt(nsf.getAttribute("y2"))+ydist)
  }
}else{
if(nsf.tagName.toString().toLowerCase() == "rect"){
nsf.setAttribute("x",xdist)
nsf.setAttribute("y", ydist)
}

if(nsf.tagName.toString().toLowerCase() == "ellipse"){ 
nsf.setAttribute("cx",xdist)
nsf.setAttribute("cy", ydist)
}
if(nsf.tagName.toString().toLowerCase() == "line"){
nsf.setAttribute("x1", xdist)
nsf.setAttribute("y1", ydist)
nsf.setAttribute("x2", xdist)
nsf.setAttribute("y2", ydist)
}
  
  }
  }
  }
  
  
  
  /////////////////////////////////////////////////////////////////////
  /*
  Effects
  -Explode - Relocates all shapes to random locations (exploding if it's packed together densely)
  -Translate - Moves all shapes by x,y
  -BrickWall - Creates a densely packed array of red blocks
  -Bak2Start - Reverts last tween
  */
  /////////////////////////////////////////////////////////////////////
  function explode(){///effect that makes animation explode
  Ext.MessageBox.prompt("Explode Effect","Duration",function(a,b){
  if(a=="ok"){

  explosionbackend(b)

  }else{
  msg("Cancelled","Effect Cancelled")
  }
  })
  }
  
  
  function explosionbackend(b){
    gotoframe(currentFrame+parseInt(b),currentLayer)
      for(var i = 0; i < DrawCanvas[currentCanvas].renderer.svgRoot.childNodes.length; i++){

  macro.moveshape({
  obj: DrawCanvas[currentCanvas].renderer.svgRoot.childNodes[i],
  xdist: Math.random()*canvasWidth,
  ydist: Math.random()*canvasHeight,
  absolute: true
  })
  }
    addHistory("Apply Explode")
  frameCheckEdit()
  }
  
  
  
  function translateShapes(){
  //No! Not langauage translation, Graph/Canvas Translation, if you dont know, go back to geometry (which i havent taken yet)
    Ext.MessageBox.prompt("Translate Shapes","X,Y translation coordinates",function(a,b){
  if(a=="ok"){
  Ext.MessageBox.prompt("Translate Shapes","Duration",function(a2,b2){
  if(a2=="ok"){
  

 gotoframe(currentFrame+parseInt(b2),currentLayer)
 
  
  for(var i = 0; i < DrawCanvas[currentCanvas].renderer.svgRoot.childNodes.length; i++){
  macro.moveshape({
  obj: DrawCanvas[currentCanvas].renderer.svgRoot.childNodes[i],
  xdist: parseInt(b.split(",")[0]),
  ydist: parseInt(b.split(",")[1]),
  absolute: false
  })
  }
  addHistory("Translate Shapes")
  frameCheckEdit()
  
  }else{
  msg("Cancelled","Translate Effect Cancelled")
  }
  })
  }else{
  msg("Cancelled","Translate Effect Cancelled")
  }
  })
  
  }
  
 //   addHistory("Apply Explode")
 // frameCheckEdit()
  
  function brickwall(startx,starty,brickheight,brickwidth,wallheight,wallwidth){
  for(var brickxcount = 0; brickxcount < wallwidth; brickxcount++){
  for(var brickycount = 0; brickycount < wallheight; brickycount++){
  macro.addshape({
  shape: "rect",
  fill: "rgb(255,0,0)",
  stroke: "rgb(0,0,0)",
  strokewidth: 1,
  height: brickheight,
  width: brickwidth,
  x: startx+(brickwidth*brickxcount),
  y: starty+(brickheight*brickycount)
  })
  }
  }
  }
  
  function brickwallgui(){
   Ext.MessageBox.prompt("Brick Wall","X,Y starting coordinates",function(a1,b1){
   Ext.MessageBox.prompt("Brick Wall","Brick Width/Height (X,Y format)",function(a2,b2){
   Ext.MessageBox.prompt("Brick Wall","Brick Wall Width/Height (X,Y format)",function(a3,b3){
   brickwall(
   parseInt(b1.split(",")[0]), //startx
   parseInt(b1.split(",")[1]), //starty
   parseInt(b2.split(",")[0]), //brickheight
   parseInt(b2.split(",")[1]), //brickwidth
   parseInt(b3.split(",")[0]), //wallheight
   parseInt(b3.split(",")[1]) //wallwidth
   )
   })
   })
   })
  }
  
  function bak2start(){
  var twr = tweenRecalc.unique()[tweenRecalc.unique().length-1].split(",")
  gotoframe(currentFrame+(twr[1]-twr[0]),currentLayer)
  loadFrame(DrawCanvas[parseInt(twr[0])].renderer.getMarkup(),currentCanvas)
  addHistory("Apply bak2start")
  frameCheckEdit()
  }
  
  