/*
* sample macros
* using the macro api
*/

Ax.plugins = {}

Ax.plugins["wave"] = function(mx,my){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.translate(shape,0,mx*Math.sin(shape.left/shape.width*my))
  })
}

Ax.plugins["brick"] = function(height, width){
  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){
      Ax.api.create.shape({
        type: "rect",
        top: 120+(y*10),
        left: 50+(x*10),
        width: 10,
        height: 10
        });
    }
  }
}

