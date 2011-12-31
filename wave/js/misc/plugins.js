/*
* sample macros
* using the macro api
*/

Ax.plugins = {}

Ax.plugins["center"] = function(){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.absolute(shape,shape.left,Ax.canvasHeight/2)
  })
}


Ax.plugins["centerX"] = function(){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.absolute(shape,Ax.canvasWidth/2,shape.top)
  })
}

Ax.plugins["flip"] = function(){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.absolute(shape,shape.left,Ax.canvasHeight-shape.top)
  })
}

Ax.plugins["flipY"] = function(){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.absolute(Ax.canvasWidth-shape,shape.left,shape.top)
  })
}

Ax.plugins["Wave"] = Ax.plugins["Sine"] = function(mx,my){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.translate(shape,0,mx*Math.sin(shape.left*my))
  })
}

Ax.plugins["sinc wave"] = function(mx,my){
  Ax.api.loop.frame(function(shape){
    var val = shape.left/shape.width*my;
    return Ax.api.transform.translate(shape,0,mx*Math.sin(val)/val)
  })
}


Ax.plugins["Cosine"] = function(mx,my){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.translate(shape,0,mx*Math.cos(shape.left/shape.width*my))
  })
}

Ax.plugins["Brick Wall"] = function(sx, sy, height, width, brickheight, brickwidth){
  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){
      Ax.api.create.shape({
        type: "rect",
        top: sy+(y*brickheight),
        left: sx+(x*brickwidth),
        width: brickwidth,
        height: brickheight
        });
    }
  }
}




Ax.plugins["Explode"] = function(){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.absolute(shape, Math.round(Math.random()*(Ax.canvasHeight-shape.height)), Math.round(Math.random()*(Ax.canvasWidth-shape.width)));  
  })
}

Ax.plugins["Random Shape"] = function(){
  Ax.api.create.shape({
    type: "rect",
    top: Math.random()*Ax.canvasHeight,
    left: Math.random()*Ax.canvasWidth,
    width: Math.random()*Ax.canvasHeight,
    height: Math.random()*Ax.canvasHeight,
	fillColor: "#"+Ax.toHex(Math.random()*255)+Ax.toHex(Math.random()*255)+Ax.toHex(Math.random()*255),
	lineColor: "#"+Ax.toHex(Math.random()*255)+Ax.toHex(Math.random()*255)+Ax.toHex(Math.random()*255),
	lineWidth: Math.random() * 20
  });
}

Ax.plugins_unavailable = function(){
	Ax.msg("Not Available","This feature is not available.")
}

