/*The magickal ALEON (Animation Lightweight Ecmascript Object Notation Format)*/
//sorry for the ridiculous name

Ax.export_animation = function(){
  var layers = {};
  for(var layer in Ax.layers){
    layers[layer] = {
      keyframes: Ax.layers[layer].keyframes,
      src: Ax.canvas_storage[layer]
    }
  }
  return {
    layers: layers
  }
}