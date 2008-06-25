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

  
var zoominit='0 0 '+Ax.canvasWidth+' '+Ax.canvasHeight; //some OnlyPaths stuffs
var centerZoomx=Math.round(Ax.canvasWidth/2); //some OnlyPaths stuffs
var centerZoomy=Math.round(Ax.canvasHeight/2); //some OnlyPaths stuffs
var selectmode=''; //I have a feeling these comments aren't helping anyone

  
Ax.preinit = function(){
  var fx = (new Ext.Window({title: "hacks to get onlypaths happy", html: "Please wait, i'll disappear soon!<br />"+Ax.hackcode}))
  fx.show(document.body)
  fx.hide()
}

Ax.drawinit_core = function(){
  Ax.renderer = null;
  if(Ext.isIE == true){
    Ax.renderer = new VMLRenderer();
  }else{
    Ax.renderer = new SVGRenderer();
  }
  Ax.canvas = new RichDrawEditor($("drawcanvas"), Ax.renderer);
  Ax.canvas.onInputXY = Ax.setDrawXY;
  Ax.canvas.actualStyle = function(){}; //this is a hack so it doesn't replace some stuff that i'm about to set now
  Ax.canvas.textMessaje = "Ajax Animator+OnlyPaths"
  Ax.canvas.imageHref = "http://antimatter15.110mb.com/phpfusion/images/logo4.png"
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

Ax.reloadCanvas = function(){
  var init = (new Date()).getTime()
  var backup = Ax.dumpshapes()
  Ax.canvas.renderer.removeAll()
  Ax.canvas.container.innerHTML = null
  Ax.canvas = null
  Ax.drawinit_core();
  Ax.loadShapes(backup)
  var time = (new Date()).getTime()-init
  Ax.msg("Canvas Reloaded","This should have resolved most canvas-related issues. Canvas reinitialized in "+time+"ms");
}



Ax.setTool = function(tool){
  
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
  
}

Ax.loadShapes = function(shapes,noattachlistener){
  if(typeof shapes == typeof "antimatter15isawesome"){
      shapes = Ext.util.JSON.decode(shapes);
  }
  for(var i = 0; i < shapes.length; i++){
    Ax.loadShape(shapes[i],noattachlistener);
  }
}

Ax.loadShape = function(shape,noattachlistener){


    var newshape  = Ax.canvas.renderer.create(shape.type, //Shape
  (shape.fillColor)?shape.fillColor:"red", //fillColor
  (shape.lineColor)?shape.lineColor:"black", //lineColor
  (shape.fillOpac)?shape.fillOpac:1, //changed  
  (shape.lineOpac)?shape.lineOpac:1, //lineColor
  (shape.lineWidth)?shape.lineWidth:1, //lineWidth
  (shape.left)?shape.left:100, //left
  (shape.top)?shape.top:100, //top
  (shape.width)?shape.width:100, //width
  (shape.height)?shape.height:100, //height  
  (shape.text)?shape.text:'', //height
  (shape.textSize)?shape.textSize:19, //height      
  (shape.textFamily)?shape.textFamily:'Arial', //height
  (shape.href)?shape.href:'', //image href
  (shape.transform)?shape.transform:"") //shape manipulations

  
  newshape.id = shape.id;


  if(!noattachlistener){
  Ext.get(newshape).on("mousedown", Ax.canvas.onHit, Ax.canvas);
  }
}

Ax.dumpshape = function(shape){
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


Ax.hackcode = "<div id=\"datadiv\" style=\"font-size:10px;position:absolute;top:18px;left:0px;height:14px;width:700px; padding:1px; margin-top:1px; background-color:none;\"> <span id=\"status\" style=\"position:absolute;top:0px;left:5px;width:2px;\"> </span> <!-- --> <div id=\"options_text\" style=\"font-size:9px;visibility:hidden;position:absolute;top:0px;left:90px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> <input name=\"option_text_message\" type=\"text\" size=\"22\" id=\"option_text_message\" value=\"My Iz Here text\" onmouseover=\"this.focus()\" onKeyPress=\"return edit(this,event)\"> Size:<input type=\"text\" size=\"3\" id=\"option_text_size\" name=\"option_text_size\" value=\"30\" onKeyPress=\"return edit(this,event)\"> Family:<select id=\"select_option_text_family\" name=\"select_option_text_family\" onchange=\"setTextFamily(this);\" > <option style=\"font-family:Arial;\" value=\"Arial\">Arial</option> <option style=\"font-family:Verdana;\" value=\"Verdana\">Verdana</option> <option style=\"font-family:Times;\" value=\"Times\">Times</option> <option style=\"font-family:Times;\" value=\"Tahoma\">Tahoma</option> <option style=\"font-family:Times;\" value=\"Impact\">Impact</option> </select> <input type=\"hidden\" name=\"option_text_family\" id=\"option_text_family\" value=\"Arial\" > </div> <!--/ OPTIONS_TEXT --> <!-- OPTIONS_SELECT_PATH --> <div id=\"options_select_path\" style=\"font-size:9px;visibility:hidden;position:absolute;top:0px;left:5px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> <input type=\"text\" name=\"codebase\" id=\"codebase\" style=\"height:15px;width:600px; padding:1px 1px 1px 4px; margin:0px; background-color:#ffffff;\" value=\"\"><img id=\"envshape\" style=\"background-color:orange;\" title=\"Submit Shape\" onclick=\"setShape();\" border=\"0px\" src=\"setpath1.gif\"> </div> <!--/ OPTIONS_SELECT_PATH --> <!-- OPTIONS_RECT --> <div id=\"options_rect\" style=\"font-size:9px;visibility:hidden;position:absolute;top:0px;left:5px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> trX<input id=\"option_rect_trx\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> trY<input id=\"option_rect_try\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\"onKeyPress=\"return edit(this,event)\"> wx<input id=\"option_rect_sclx\" type=\"text\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> wy<input id=\"option_rect_scly\" type=\"text\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> rot<input id=\"option_rect_rot\" type=\"text\" size=\"1\" style=\"background-color:#ffdddd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> </div> <!--/ OPTIONS_RECT --> <!-- OPTIONS_IMAGE --> <div id=\"options_image\" style=\"font-size:9px;visibility:hidden;position:absolute;top:0px;left:5px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> trX<input id=\"option_img_trx\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> trY<input id=\"option_img_try\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\"onKeyPress=\"return edit(this,event)\"> wx<input id=\"option_img_sclx\" type=\"text\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> wy<input id=\"option_img_scly\" type=\"text\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> rot<input id=\"option_img_rot\" type=\"text\" size=\"1\" style=\"background-color:#ffdddd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> Source: <input name=\"option_image_href\" type=\"text\" size=\"62\" id=\"option_image_href\" value=\"http://www.johnwaynebirthplace.org/centennial/images/brian_bausch1.jpg\" onmouseover=\"this.focus()\" onKeyPress=\"return edit(this,event)\"> </div> <!-- http://swiki.agro.uba.ar/small_land/uploads/205/smalllandmouse_transparent.gif --> <!--/ OPTIONS_IMAGE --> <!-- OPTIONS_PATH --> <div id=\"options_path\" style=\"font-size:9px;visibility:hidden;position:absolute;top:0px;left:5px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> trX<input id=\"option_path_trx\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> trY<input id=\"option_path_try\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\"onKeyPress=\"return edit(this,event)\"> <input id=\"option_path_sclx\" type=\"hidden\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> <input id=\"option_path_scly\" type=\"hidden\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> rot<input id=\"option_path_rot\" type=\"text\" size=\"1\" style=\"background-color:#ffdddd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> Open/Close: <input CHECKED name=\"option_path_close\" id=\"option_path_close\" type=\"checkbox\"> <input type=\"text\" name=\"control_codebase\" id=\"control_codebase\" style=\"height:15px;width:300px; padding:1px 1px 1px 4px; margin:0px; background-color:#ffffff;\" onmouseover=\"this.focus()\" value=\"\" onKeyPress=\"return edit(this,event)\"> <img style=\"cursor:pointer\" align=\"top\" title=\"to curve\" onclick=\"c.renderer.tocurve();\" src=\"tocurve.gif\"> <input id=\"option_path_num\" type=\"hidden\" size=\"1\" style=\"background-color:#ffdddd\" value=\"0\"> Px<input id=\"option_path_x\" type=\"text\" size=\"1\" style=\"background-color:#ffdddd\" value=\"0\" onKeyPress=\"return editPath(this,event)\"> Py<input id=\"option_path_y\" type=\"text\" size=\"1\" style=\"background-color:#ffdddd\" value=\"0\" onKeyPress=\"return editPath(this,event)\"> </div> <!--/ OPTIONS_PATH --> <!-- <div id=\"options_controlpath\" style=\"font-size:9px;visibility:hidden;position:absolute;top:0px;left:5px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> trX<input id=\"option_controlpath_trx\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> trY<input id=\"option_controlpath_try\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\"onKeyPress=\"return edit(this,event)\"> <input id=\"option_controlpath_sclx\" type=\"hidden\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> <input id=\"option_controlpath_scly\" type=\"hidden\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> rot<input id=\"option_controlpath_rot\" type=\"text\" size=\"1\" style=\"background-color:#ffdddd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> Open/Close: <input CHECKED name=\"option_controlpath_close\" id=\"option_controlpath_close\" type=\"checkbox\"> <input type=\"text\" name=\"control_codebase\" id=\"control_codebase\" style=\"height:15px;width:300px; padding:1px 1px 1px 4px; margin:0px; background-color:#ffffff;\" value=\"\"> </div> --> <div id=\"options_ellipse\" style=\"font-size:9px;visibility:hidden;position:absolute;top:0px;left:5px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> trX<input id=\"option_ellipse_trx\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> trY<input id=\"option_ellipse_try\" type=\"text\" size=\"1\" style=\"background-color:#ffffdd\" value=\"0\"onKeyPress=\"return edit(this,event)\"> wx<input id=\"option_ellipse_sclx\" type=\"text\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> wy<input id=\"option_ellipse_scly\" type=\"text\" size=\"1\" style=\"background-color:#ddffdd\" value=\"1\" onKeyPress=\"return edit(this,event)\"> rot<input id=\"option_ellipse_rot\" type=\"text\" size=\"1\" style=\"background-color:#ffdddd\" value=\"0\" onKeyPress=\"return edit(this,event)\"> </div> <!--/ OPTIONS_ELLIPSE --> <div id=\"options_zoom\" style=\"font-size:9px;visibility:hidden;position:absolute;top:0px;left:5px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> <img id=\"zoom_more\" title=\"More zoom\" onclick=\"zoommode='more';info_zoom()\" src=\"zoom_more.gif\" > <img id=\"zoom_minus\" title=\"Minus zoom\" onclick=\"zoommode='minus';info_zoom()\" src=\"zoom_minus.gif\" > <img id=\"zoom_frame\" title=\"Frame zoom\" onclick=\"zoommode='frame';info_zoom()\" src=\"zoom_frame.gif\" > <img id=\"zoom_hand\" title=\"Hand zoom\" onclick=\"zoommode='hand';info_zoom()\" src=\"zoom_hand.gif\" > </div> <!--/ OPTIONS_ZOOM --> <div id=\"options_select\" style=\"font-size:9px;visibility:visible;position:absolute;top:0px;left:740px;height:14px;width:100%; padding:1px; margin-top:1px; background-color:none;\"> <img id=\"select_deleteone\" title=\"Delete one\" onclick=\"selectedit='deleteone';info_select()\" src=\"delete.gif\" > <img id=\"select_deleteall\" title=\"Delete all\" onclick=\"selectedit='deleteall';info_select()\" src=\"reset.gif\" > <img id=\"select_tothetop\" title=\"To the top\" onclick=\"selectedit='tothetop';info_select()\" src=\"tothetop.gif\" > <img id=\"select_totheback\" title=\"To the back\" onclick=\"selectedit='totheback';info_select()\" src=\"totheback.gif\" > <img id=\"select_onetop\" title=\"One top\" onclick=\"selectedit='onetop';info_select()\" src=\"onetop.gif\" > <img id=\"select_oneback\" title=\"One back\" onclick=\"selectedit='oneback';info_select()\" src=\"oneback.gif\" > </div> <!--/ OPTIONS_SELECT --> </div> <!--/ DATADIV --><div id='someinfo'></div>";