/**
 * @author antimatter15
 */

Ax.use_compat = true;

Ax.noloadids = [];

Ax.backcompat = {
    'fill': 'fillColor',
    'stroke': 'lineColor',
    //fill opac and line opac aren't actually supported in the old one so i'll save the tweening of it
    'stroke-width': 'lineWidth',
    'x': 'left',
    'y': 'top'
  }

Ax.loadShapes = function(shapes, noattachlistener, instance){ //instance; probably need a better name for this. but its the richdraw/onlypaths/viewer/etc reference. 
  
  if (typeof shapes == "string") { //try un-scrabling this!
        shapes = Ext.util.JSON.decode(shapes);
  }else if(!shapes){
		return;
	}
	for (var i = 0; i < shapes.length; i++) {
		Ax.loadShape(shapes[i], noattachlistener, instance);
	}
}

Ax.loadShape = function(shape, noattachlistener, instance){
    instance = instance?instance:Ax.canvas
    
    if(Ax.noloadids.length > 0 && shape.id){
      if(Ax.noloadids.indexOf(shape.id) != -1){
        return;
      }
    }
    
    //backwards compatability
    for(var now in Ax.backcompat){ //loop compat list
      //info[backcompat[now]] = info[now];
      if(!shape[now] && shape[Ax.backcompat[now]]){ //if new one no existy, but old one existy
        shape[now] = shape[Ax.backcompat[now]]; //schwappy!
      }
    }
    
	  var newshape = null, draw = instance.draw;
	  if(shape.type == "rect"){
	    newshape = draw.rect(0, 0,0, 0)
	  }else if(shape.type == "path"){
	    newshape = draw.path("")
      
	  }else if(shape.type == "image"){
      newshape = draw.image(shape.src, 0, 0, 0, 0)
    }else if(shape.type == "ellipse"){
      newshape = draw.ellipse(0, 0, 0, 0)
    }else if(shape.type == "text"){
      if(Ax.textfix){
        shape.text = Ax.textfix(shape.text)
      }
      newshape = draw.text(0, 0, (shape.text))
      newshape.text = shape.text;
    }
    

    
    //oopsy! rotations not supported!

	  if(newshape){
	    newshape.attr(shape)
	    newshape.id = shape.id
	    newshape.subtype = shape.subtype
	    
      if (!noattachlistener) {
        instance.addShape(newshape,true,true)
      }else{
        if(!instance.no_listener_shapes){
          instance.no_listener_shapes = []
        }
        instance.no_listener_shapes.push(newshape)
      }
	  }
	  return newshape
}

Ax.dumpshape = function(shape){
    var info = {
      type: shape.type,
      id: shape.id,
      subtype: shape.subtype
    }
    var attr = "cx,cy,fill,fill-opacity,font-size,font-weight,gradient,height,opacity,path,r,rx,ry,src,stroke,stroke-dasharray,stroke-opacity,stroke-width,width,x,y,rotation".split(",")
    for(var i = 0; i < attr.length; i++){
      var tmp = shape.attr(attr[i]);
      if(tmp !== null && tmp !== false && tmp !== undefined){
        if(attr[i] == "path"){
          info[attr[i]] = Ax.parsePath(tmp)
        }else{
          info[attr[i]] = tmp
        }
      }
    }
    

    //forwards compatability (or is it backwards?)
    
    /* SORRY! Google doesn't want me to waste ANY bytes
     
    if(Ax.use_compat == true){
      for(var now in Ax.backcompat){
        
        info[Ax.backcompat[now]] = info[now];
      }
    }
    
    */
    
    if(shape.text){
      info.text = shape.text; //hAAK
      
    }
    //HACKITY HACK HACK!!!!
    //if(shape && shape._ && shape._.rt && shape._.rt.deg){
    //  info['rotation'] = shape._.rt.deg;
    //}else{
    //  info.rotation = 0;
    //}
    
    return info
}

Ax.dumpshapes_core = function(){
    var rawshapes = Ax.canvas.shapes;
    var newshapes = [];
    for (var i = 0; i < rawshapes.length; i++) {
      newshapes.push(Ax.dumpshape(rawshapes[i]));
    }
	return newshapes
}

Ax.dumpshapes = function(format){
    if (format == "json") {
        return Ext.util.JSON.encode(Ax.dumpshapes_core())
    }
    else {
        return Ax.dumpshapes_core();
    }
}
