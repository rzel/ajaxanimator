/*The magickal ALEON (Animation Lightweight Ecmascript Object Notation Format)*/
//you can call it Awesome Lightweight Extreme Online New-animation-format if you like
//or other countless bacronyms
//sorry for the ridiculous name

/*
ALEON/Axff/Xff

{
  frames: 0, //frame count (required)
  meta: {//metadata, optional
    generator: { //Ax.v dump
      app: "Ajax Animator",
      release: 0.2,
      build: 232
    },
    creation: 1214687653614, //unix epoch of creation
    modified: 1214687673324, //last modified date
    contrib: [ //array of contributors
      "k7d13x32fc" //10 digit auto-generated id for session, or username
    ]
  },
  layers: { //where all the data is stored
    "Layer 1": {
      keyframes: [1,5,10,15,20],
      tweens: [2,3,4,6,7,8,9,11,12,13,14,16,17,18,19], //this one is optional and not included by default
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

  if(!input){
    input = {};
  }
  
  if(!input.meta){
    input.meta = {
      generator: Ax.v, //all version info
      creation: (new Date()).getTime()
    }
  }
  input.meta.modified = (new Date()).getTime();
  if(typeof input.meta.contrib != typeof ['antimatter15','is','awesome']){
    input.meta.contrib = []; //an array
  }
  if(input.meta.contrib.indexOf(Ax.userid) == -1){
    input.meta.contrib.push(Ax.userid); //add user to list of contributors if not there already
  }
  
  
  input.layers = Ax.export_animation_core(); //the most important part: the data
  
  if(format == "json"){
    return Ext.util.JSON.encode(input);
  }else{
    return input;
  }
}

