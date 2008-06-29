/*The magickal ALEON (Animation Lightweight Ecmascript Object Notation Format)*/
//you can call it Awesome Lightweight Extreme Online New-animation-format if you like
//or other countless bacronyms
//sorry for the ridiculous name

/*
ALEON/Axff/Xff


{
  frames: 0, //frame count (required)
  tcframe: 1, //current frame
  tclayer: "Layer 1", //current layer
  generator: { //Ax.v dump
    app: "Ajax Animator",
    release: 0.2,
    build: 232
  },
  creation: 1214687653614, //unix epoch of creation
  modified: 1214687673324, //last modified date
  contrib: [ //array of contributors
    "k7d13x32fc" //10 digit auto-generated id for session, or username
  ],
    
  layers: { //where all the data is stored
    "Layer 1": {
      keyframes: [1,5,10,15,20],
      //tweens: [2,3,4,6,7,8,9,11,12,13,14,16,17,18,19], //this one is optional and not included by default
      src: [ //standard OPF data
        {type: "rect", id: "somelongidstring", x: 31, y: 32, ...}
      ]
    }
  }
}
*/

Ax.export_animation_core = function(input,format){
  var layers = {};
  for(var layer in Ax.layers){
    layers[layer] = {
      keyframes: Ax.layers[layer].keyframes,
      //tweens: Ax.layers[layer].tweens, //this is not necessary
      src: Ax.canvas_storage[layer]
    }
  }
  return layers;
}

Ax.export_animation = function(input, format){

  if(!input.generator){
    input.generator = Ax.v;
  }
  if(!input.creation){
    input.creation = (new Date()).getTime()
  }
  input.meta.modified = (new Date()).getTime();
  if(typeof input.contrib != typeof ['antimatter15','is','awesome']){
    input.contrib = []; //an array
  }
  if(input.contrib.indexOf(Ax.userid) == -1){
    input.contrib.push(Ax.userid); //add user to list of contributors if not there already
  }
  
  input.tcframe = Ax.tcurrent.frame;
  input.tclayer = Ax.tcurrent.layer;
  
  input.layers = Ax.export_animation_core(); //the most important part: the data
  
  
  if(format == "json"){
    return Ext.util.JSON.encode(input);
  }else{
    return input;
  }
}

Ax.import_animation = function(markup){
  if(typeof markup == typeof "tehkooliest"){
    markup = Ext.util.JSON.decode(markup)
  }
  Ax.import_animation_core(markup.layers);
  Ax.selectFrame((markup.tcframe)?markup.tcframe:1,(markup.tclayer)?markup.tclayer:"Layer 1");
}

Ax.import_animation_core = function(layers){
  Ax.viewport.findById("layers").getStore().removeAll(); //remove all entries from layers panel
  Ax.initTimeline(); //reset timeline
  Ax.canvas_storage = {}; //empty canvas storage
  Ax.canvas.renderer.removeAll(); //clear canvas
  
  for(var layer in layers){ //loop through layers
    Ax.addLayer(layer); //add layer
    Ax.layers[layer].keyframes = layers[layer].keyframes; //set keyframes
    Ax.canvas_storage[layer] = layers[layer].src; //load canvas src
    for(var i = 1; i < layers[layer].keyframes.sort(function(a,b){return b-a})[0] + 1; i++){
      Ax.selectFrame(i,layer); //render frame to timeline, (renderFrame may be better)
    }
  }

}
