//creates an api for macros
/*
* concept:
* dumps all shapes on the current canvas
* loops through all shapes
* feeds into a certain function, returns processed data
*/



Ax.api = {
  loop: {
    "frame": function(macrofunc){
      var dump = Ax.dumpshapes();
      for(var i = 0; i < dump.length; i++){
        dump[i] = macrofunc(dump[i]);
      }
      Ax.deleteAll()
      //Ax.canvas.renderer.removeAll();
      Ax.loadShapes(dump);
    },
    "number": function(number,macrofunc){
      for(var i = 0; i < number; i++){
        macrofunc(i)
      }
    }
  },
  transform: {
    "translate": function(shape, x, y){
      shape.y += y;
      shape.x += x;
      return shape;
    },
    "absolute": function(shape, x, y){
      shape.y = y;
      shape.x = x;
      return shape;
    }
  },
  create: {
    shape: function(src){
      Ax.loadShape(src);
    },
    rect: function(x, y, width, height){
      Ax.loadShape({
          fill: Ax.Color.fill,
          stroke: Ax.Color.line,
          "stroke-width": Ax.Color.lineWidth,
          x: x,
          y: y,
          width: width,
          height: height
        })
      //Ax.canvas.renderer.create("rect", Ax.Color.fill, Ax.Color.line, Ax.Color.lineWidth, x, y, width, height)
    }
  }
}

Ax.exec = function(name){
  if(typeof Ax.plugins[name] == "function"){
    Ax.plugins[name]();
    Ax.autodiff();
  }else{
    Ax.toastMsg("Error!","Plugin Not Found!")
  }
}
