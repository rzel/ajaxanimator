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


//format information
Ax.format = {
  support: {//format support. minimum version, maximum version
    min: 1,
    max: 10
  },
  revision: 10 //the version the app exports
}


Ax.emptyAnimation = {
  layers: {
    "Layer 1": {
      keyframes: [1],
      src: {
        "1":[]
      }
    }
  }
}

Ax.new_animation = function(){
  Ax.import_animation(Ext.ux.clone(Ax.emptyAnimation))
}

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
  
  input.name = Ax.animation.name; //quite important to have this up here so you can easily identify the animation from a quick glance
	
  if(!input.creation){
    input.creation = (new Date()).getTime()
  }
  
  if(typeof input.contrib != typeof ['antimatter15','is','awesome']){
    input.contrib = []; //an array
  }
  if(input.contrib.indexOf((Ax.userid)?Ax.userid:"anonymous") == -1){
    input.contrib.push((Ax.userid)?Ax.userid:"anonymous"); //add user to list of contributors if not there already
  }
  
  input.modified = (new Date()).getTime();
  input.generator = Ax.v;
    
  input.revision = Ax.format.revision;
  
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
  if(typeof markup == typeof "tehkooliest"){ //if its in json, then decode it first
    markup = Ext.util.JSON.decode(markup)
  }
  Ax.setAnimationName(markup.name)
  //set the name for the animation in that little box in the toolbar. overly hackish, I know. Seriously, acessing dom?
  Ax.animation.markup = markup;
  
  Ax.import_animation_core(markup.layers);
  Ax.selectFrame((markup.tcframe)?markup.tcframe:1,(markup.tclayer)?markup.tclayer:"Layer 1");
  
}

Ax.test_animation_markup = function(markup){
  if(typeof markup != typeof "actionwoot"){
    return false; //its not valid, only takes json formatted string
  }
  try{
    markup = Ext.util.JSON.decode(markup); //attempt to decode
  }catch(err){
    return false;
  }
  if(!markup){
    return false; //its not valid, it didn't get through
  }
  if(typeof markup != typeof ({woot: "ness"})){
    return false; //its not the right type
  }
  if(typeof markup.layers != typeof ({ello: "world"})){
    return false;
  }
  
  return markup;
}

Ax.import_animation_core = function(layers){
  Ax.viewport.findById("layers").getStore().removeAll(); //remove all entries from layers panel
  Ax.initTimeline(); //reset timeline
  Ax.canvas_storage = {}; //empty canvas storage
  Ax.canvas.unselect();//unselect the canvas, saves a nasty bug
  Ax.canvas.renderer.removeAll(); //clear canvas
  
  
  Ax.layers = {};//reset layers object
  //Ax.tstat = {layers: 0, frames: 0}
  Ax.tstat.layers = 0;

for(var firstlayer in layers){
  Ax.tcurrent.layer = firstlayer;
  Ax.tcurrent.frame = 1;
  Ax.loadShapes(layers[firstlayer].src[1]);
  break;
}  

for(var layer in layers){ //loop through layers
    Ax.addLayer(layer); //add layer
    Ax.layers[layer].keyframes = layers[layer].keyframes; //set keyframes
    Ax.canvas_storage[layer] = layers[layer].src; //load canvas src
    //Ax.loadframe(1, layer); //note: this is a hack!
    //console.log(layers[layer].src);
    for(var i = 0; i < layers[layer].keyframes.sort(function(a,b){return b-a})[0] + 1; i++){
      Ax.selectFrame(i + 1,layer); //render frame to timeline, (renderFrame may be better)
    }
  }

}

Ax.reload_animation = function(){
  try{
    Ax.import_animation(Ax.export_animation(Ax.animation.markup))
  }catch(err){
    return Ax.msg("Animation Recovery","Animation recovery has failed due to error: "+err)
  }
  Ax.msg("Animation Reloaded","The current animation was reloaded. This hopefully has resolved most issues related to the timeline and other components.")
}

