//Wave2: A higher level abstraction of the Google Wave Gadget State API
//Features:
//  * With Hierarchy
//  * Shorter functions
//  * Event Listening

RegExp.escape = function(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}


var wave2 = {
  _evt: {},
  _bck: {},
  //_fastmask: {},
  _jcache: {}, //JSON CASH!
  _tcache: {},
  _state: {}, //for emulator
  fire_evt: true,
  mode: "wave" //wave or fake
}

wave2.index = function(v,a){
  for(var i=a.length;i--&&a[i]!=v;);
  return i
}

wave2.pseudowave = {
      subdelta: {},
      waiting: false,
      
      toString: function(){return Ext.util.JSON.encode(wave2._state)},

      clone: function(){
        //copy data fromr eal wave
        if(!wave2.fake()){
          //if real wave
          wave2.loop(function(key){
            var delta = {};
            delta[key] = wave2.get(key);
            wave2.pseudowave.submitDelta(delta)
          })(wave2.keys())
        }
      },
      
      submitDelta: function(d){
        for(var i in d){
          wave2.pseudowave.subdelta[i] = d[i];
        }
        wave2.pseudowave._coreDelta();
        //console.log("new delta",d)
        
      }, 
      _coreDelta: function(){
        if(!wave2.pseudowave.waiting){
          setTimeout(function(){
            for(var i in wave2.pseudowave.subdelta){
              if(wave2.pseudowave.subdelta[i] === null){
                delete wave2._state[i];
                //console.log("deleted",i,d[i],d)
              }else{
                //console.log("stored",i,d[i],d)
                wave2._state[i] = wave2.pseudowave.subdelta[i]
              }
            }
            wave2.pseudowave.subdelta = {};
            wave2.statechange()
            wave2.pseudowave.waiting = false;
          },200);
          wave2.pseudowave.waiting = true;
        }
      }, 
      
      get: function(name){
          return wave2._state[name]+''
          //console.log("get",name)
      }, getKeys: function(){
        var s = []
        for(var i in wave2._state){
          s.push(i)
        }
        return s;
      }}

wave2.nowave = function(){
/*
if (!window.developer) {
      if((wave2.lastalert-0) - (new Date).getTime() > 5000){
        wave2.lastalert = (new Date).getTime()
        Ax.toastMsg("Not In Google Wave","The application is not inside a Wave container, collaborative functions will not function.")
      }
    }
    */
}

wave2.fake = function(){
  if(wave2.mode == "wave"){
    if(window.wave && wave.getState()){
      return false
    }
    //wave2.nowave()
    return true
  }else{
    return true //fake!
  }
}

wave2.state = function(){
  if(wave2.fake()){
    wave2.nowave()
    return wave2.pseudowave
  }
  return wave.getState();
}

wave2.listen = function(event, callback, noupdate){
  if(event.pop){
    event = event.join("/")
  }
  if(!wave2._evt[event]){
    wave2._evt[event] = []
    if(!noupdate)wave2._update(event);
  }else if(wave2.index(callback,wave2._evt[event]) != -1){
    return false; 
  }
  
  wave2._evt[event].push(callback)
}

wave2.ignore = function(event, callback){
  if(event.pop){
    event = event.join("/")
  }
  if(!wave2._evt[event])return;
  var index = 0;
  while((index=wave2.index(callback, wave2._evt[event])) != -1){
    wave2._evt[event].splice(index, 1);
  }
  if(wave2._evt[event].length == 0){
    //do a bit of garbage collection
    var keys = wave2.subkeys(event, wave2._bck)
    for(var i = 0; i < keys.length; i++){
      delete wave2._bck[event+keys[i]]
    }
  }
}

wave2._keys = function(list){
  if(list === true){
    return wave2.keys(true); //you can probably tell now that this library is getting complicated and crappy
  }
  var s = []
  for(var i in list){
    s.push(i)
  }
  return s;
}

wave2._update = function(prefix){
  //console.log("update",prefix)
  var keys = wave2.subkeys(prefix)
  
  for(var i = 0; i < keys.length; i++){
    wave2._bck[prefix+keys[i]] = wave2.get(prefix+keys[i])
  }
}

wave2.keys = function(all){
  var keys = wave2.state().getKeys();
  if(!all){
    //filter through them
    for(var i = keys.length; i--;){
      if(wave2.get(keys[i]) === null){
        keys.splice(i,1)
      }
    }
  }
  
  return keys;
}

wave2.dump = function(){
  return wave2.state().toString()
}

wave2.subkeys = function(prefix, list){
  //var haslist = !!list;
  list=list?wave2._keys(list):wave2.keys();
  var subkeys = [];
  for(var i = 0, l = list.length; i < l; i++){
    if(list[i].indexOf(prefix) == 0){
      
      //if(haslist || wave2.get(prefix+list[i])){
        subkeys.push(list[i].substr(prefix.length))
      //}
    }
  }
  return subkeys;
}

wave2.expkeys = function(regex, list){
  list=list?list:wave2.keys();
  var subkeys = [];
  for(var i = 0, l = list.length; i < l; i++){
    if(list[i].match(regex)){
      subkeys.push(list[i])
    }
  }
  return subkeys;
}

wave2.set = function(name, value){
  if(name.pop){
    name = name.join("/")
  }
  var delta = {}
  delta[name] = value;
  var state = wave2.get(name), curstate = null;
  if(state === null){
    var curstate = wave2._get(name)
    if(typeof curstate == "string" && curstate.indexOf('DEL/') == 0){
    //oh noes i dont knows whats to dooz naw!
    if(parseInt(curstate.split('/')[1]) > (new Date).getTime() - (1337)){
      //OH NOES ITS NUUW!!
      //Ax.toastMsg("killed","DIE")
      return false; //DONT DO ANYTHIGN! STOPS IN URS TRAX!
    }
    }
  }
  if(state !== value){
    //console.log(name, value)
    wave2.state().submitDelta(delta)
  }
}

wave2._get = function(name){
  if(name.pop){
    name = name.join("/")
  }
  
  return /*wave2._fastmask[name]?wave2._fastmask[name]:*/wave2.state().get(name)
}

wave2.get = function(name){

  var state = wave2._get(name)
  
  if(!state){
      return null;
  }
  if(state.indexOf('DEL/') == 0){
    //oh noes it gots deletesed
    return null;
  }
  return state;
}

wave2.getJ = function(name){
  if(!wave2._jcache[name] || wave2.get(name) != wave2._tcache[name]){
    wave2._tcache[name] = wave2.get(name);
    wave2._jcache[name] = eval('('+wave2._tcache[name]+')');
  }
  return wave2._jcache[name]
}

wave2.me = function(){
  if(!wave2.fake()){
    return wave.getViewer().getId()
  }else{
    return "me@localhost.local"
  }
}

wave2.delta = function(delta){
  //for(var i in delta){
    //wave2._fastmask[i] = delta[i]
  //}
  return wave2.state().submitDelta(delta);
}

wave2.reset_gadget = function(){
  var state = {}, keys = wave2.keys()
  for(var i = 0; i < keys.length; i++){
    state[keys[i]] = wave2._delid();
  }
  wave2.delta(state)
}

wave2.del_subkeys = function(prefix){
  var keys = wave2.subkeys(prefix)
  var delta = {}
  for(var i = 0; i < keys.length; i++){
    delta[prefix+keys[i]] = wave2._delid();
  }
  wave2.delta(delta);
}

wave2.del_expkeys = function(regex){
  var keys = wave2.expkeys(regex)
  var delta = {}
  for(var i = 0; i < keys.length; i++){
    delta[keys[i]] =  wave2._delid();
  }
  wave2.delta(delta);
}

wave2.statechange = function(){
  //wave2._fastmask = {}; //reset fastmask
  var changed = false;
  var bckeys = [];
  var subkeys = [];
  for(var event in wave2._evt){
    subkeys = wave2.subkeys(event,true)
    bckeys = wave2.subkeys(event, wave2._bck)
    
    changed = false;
    for(var i = 0, k = subkeys.length; i < k;i++){
      var skey = event + subkeys[i]
      var val = wave2.get(skey);
      if(wave2._bck[skey]){
        if(wave2._bck[skey] !== val){
          if(wave2._get(skey).indexOf("DEL/") != 0){
            //modification
            changed = true
            wave2._bck[skey] = val;
            //console.log("change",skey)
          }else{
            //console.log("OHNOESDEL",skey,wave2._get(skey),wave2._bck[skey])
          }
        }
      }else{ //addition
        changed = true
        wave2._bck[skey] = val;
        //console.log("add",skey)
      }
    }
    for(var i = 0, k = bckeys.length; i < k;i++){
      var skey = event + bckeys[i]
      if(!wave2.get(skey)){ //deletion
        if(typeof wave2._get(skey) == "string" && wave2._get(skey).indexOf("DEL/") == 0){
          changed = true
          delete wave2._bck[skey];
        
          //schedule automatic garbage collection deletion
          
          
          //Ax.toastMsg("asdf",skey)
          //console.log('d',skey,wave2._get(skey))
        }
          //Ax.toastMsg("WTF","WTF",wave2._get(skey))
        //console.log("kill",skey)
      }
    }
    
    /*
    if(changed == false && subkeys.length != bckeys.length){
      Ax.toastMsg("Potential Sync Error","The wave synchronization encountered something strange. This should be ignorable.")
      //changed = true; //fallback
      wave2._update(event)
      //console.log("fallback",subkeys.length,bckeys.length,subkeys,bckeys, wave2.subkeys(event, wave2._bck))
    }*/
    //*/
    if(changed == true && wave2.fire_evt){
      for(var i = 0, s = wave2._evt[event].length; i < s;i++){
        //console.log(event, i, wave2._evt[event], subkeys)
        wave2._evt[event][i](wave2.subkeys(event))//(subkeys) //sorry, gots to do it again more restrictedly
        
      }
    }
  }
}

wave2.garbagecollect = function(force){
  var list = wave2.keys(true/*ALL YOUR O ARE BELONG TO US*/);
  var state = {}
  for(var i = 0, l = list.length; i < l; i++){
    if(wave2._get(list[i]).indexOf("DEL/") == 0){
      if(parseInt(wave2._get(list[i]).split("/")[1]) < (new Date).getTime() - (1337*10) || force){
        state[list[i]] = null; //for real delete
        //console.log("blah")
      }
    }
  }
  wave2.delta(state);
}

wave2.del = function(name, no_mark){
  wave2.set(name, no_mark?null:wave2._delid())
}

wave2._delid = function(){
  return 'DEL/'+(new Date).getTime()
}

wave2.isPlayback = function(){
  //hack for the time being
  //return false;

  if(wave2.get("FORCE_OVERRIDE_PLAYBACK") == "TRUE"){
    return true;
  }
  if(!wave2.fake()){
    if((new Date).getTime()/1000 < 1254471241 + 592653){ //10 / 2 / 2009 @ 3:14 
      //wave is broken: this is a hack
      return wave.getState().get("${playback}");
    }
    
    return wave.isPlayback()
  }
  return false;
}

wave2.getParticipants = function(){
  if(!wave2.fake()){
    return wave.getParticipants()
  }
  return [];
}

wave2.loop = function(func){
  return function(subkeys){
    for(var i = 0; i < subkeys.length; i++){
      func(subkeys[i]);
    }
  }
}

function is_locked(name){
  //return index_of(name,get_subkeys("locked:")) != -1;
  //return wave2.me();
  
  var state = wave2.get(["l",Ax.tcurrent.frame,Ax.tcurrent.layer,name]);
  if(state == null){
    return false;
  }
  //never lock what is mine
  if(state.split("!t")[0] == wave2.me()){
    return false
  }
  //unlock if owner is dead.
  var people = wave2.getParticipants()
  for(var i = 0; i < people.length; i++){
    if(people[i].getId() == state.split("!t")[0]){
        if(parseInt(state.split("!t")[1]) > (new Date).getTime() - (1000*60)){
          return state.split("!t")[0]
        }else{
          return false;
        }
    }
  }
  return false
}



function lock_shape(name){
  //console.log("Locking:",name)
  wave2.set(["l",Ax.tcurrent.frame,Ax.tcurrent.layer,name], wave2.me()+"!t"+(new Date).getTime());
  Ax.lastselect = (new Date).getTime();
}

function unlock_shape(name){  
  //console.log("Unlocking:",name)
  wave2.del(["l",Ax.tcurrent.frame,Ax.tcurrent.layer,name]); //delete
  Ax.lastselect = (new Date).getTime();
}

Ax.wavesetup = (function(){
  var loop = wave2.loop;
  
  wave2.listen("m/", function(keys){
    //console.log(keys)
    var csizechanged = false;
    loop(function(key){
    
    var value = wave2.get("m/"+key)
    if(key == "canvasWidth"){
      Ax.canvasWidth = value;
      csizechanged = true;
    }else if(key == "canvasHeight"){
      Ax.canvasHeight = value;
      csizechanged = true;
    }else if(key == "framerate"){
      Ax.framerate = value;
    }
  })(keys)
  
  if(csizechanged == true){
    Ax.canvasSize();
  }
  
  },true)
  
  wave2.listen("k/", function(keys){
  //console.log(keys)
  //console.log("KF",keys)
  loop(function(key){
    key = key.split("/")
    frame = parseInt(key[0])
    layer = key[1]
    
    if(!Ax.layers[layer]){
      Ax.addLayer(layer);
    }
    
    if(!Ax.isKeyframe(frame, layer)){
      //Ax.msg("keyframe no reason","woot"+frame)
      Ax.toKeyframe(frame, layer,true)
    }
  })(keys)
  
  setTimeout(function(){
  for(var layer in Ax.layers){
    var keyframes = Ax.layers[layer].keyframes
    for(var i = 0; i < keyframes.length; i++){
      
      if(keyframes[i] == 1) continue; //frame 1 is something that i screwed up EERLY awn.
      //if(layer == Ax.tcurrent.layer && frame == Ax.tcurrent.frame) continue;
        
        //hak attak!
        //if(wave2.index(keyframes[i]+"/"+layer, keys) == -1){
        if(!wave2.get('k/'  +keyframes[i]+"/"+layer)){
          //Ax.msg("Deleting",keyframes[i]+"/"+layer)
          //console.log(keys,keyframes[i]+"/"+layer)
          Ax.deleteKeyframe(keyframes[i],layer,true)
        }
    }
  }
  },1337)
  
  },true)
  
  if (window.wave) {
    if(wave.isInWaveContainer()){
      wave.setStateCallback(wave2.statechange);
      wave.setModeCallback(Ax.wavemode);
    }else{
      wave2.nowave();
      Ext.MessageBox.alert("Wave Synchronization API Failed to Load",
      "The Wave Gadget API exists but can not connect to the Wave state server. "+
      "Reloading the wave may fix the issue, but until then the application will "+
      "likely be unusable. As far as I know, it's not my fault, but sorry anyway.")
    }
  }else{
    //wave2._state = {"c/~1/1/fie2":"{t:\"r\",id:\"fie2\",f:\"#FF0000\",fo:1,h:91,r:0,rx:0,ry:0,s:\"#000000\",so:1,sw:1,w:74,x:44,y:35.5,rt:0}","l/1/~1/fie2":"DEL/1254352459573","l/27/~1/fie2":"DEL/1254352463002","c/~1/27/fie2":"{t:\"r\",id:\"fie2\",f:\"#FF0000\",fo:1,h:91,r:0,rx:0,ry:0,s:\"#000000\",so:1,sw:1,w:74,x:426,y:130.5,rt:0}","k/27/~1":1}
    
    //wave2.statechange()
    
    wave2.nowave(); //nowave!
    wave2.mode = "fake"
  }
})

Ax.wavemode = function(mode_code){
  var mode = "UNKNOWN";
  switch (mode_code) {
    case wave.Mode.PLAYBACK: mode = "PLAYBACK"; break;
    case wave.Mode.EDIT: mode = "EDIT"; break;
    case wave.Mode.VIEW: mode = "VIEW"; break;
  }
  //Ax.msg("mode",mode)
  Ax.viewport.findById("maintabpanel").items.get(0).enable()
  if(mode == "EDIT"){
    Ax.viewport.findById("maintabpanel").activate(0)
  }
  if(mode == "VIEW" || mode == "PLAYBACK"){
    if(mode == "PLAYBACK"){
      Ax.viewport.findById("maintabpanel").items.get(0).disable()
    }
    Ax.viewport.findById("maintabpanel").activate(1)
  }
}

Ax.locklistener = null;
Ax.canvaslisteners = []
Ax.relisten = function(listen){
  
  if(Ax.locklistener){
    wave2.ignore(Ax.locklistener, Ax.lockchange);
  }
  Ax.locklistener = "l/"+Ax.tcurrent.frame+"/"+Ax.tcurrent.layer+'/';
  wave2.listen(Ax.locklistener, Ax.lockchange);
  
  for(var i = 0; i < Ax.canvaslisteners.length; i++){
    wave2.ignore(Ax.canvaslisteners[i], Ax.canvasrender);
    //wave2.listen("l/"+Ax.canvaslisteners[i].slice(1).reverse().join("/"), Ax.lockchange);
  }
  for(var i = 0; i < listen.length; i++){
    wave2.listen(listen[i], Ax.canvasrender);
    //wave2.listen("l/"+listen[i].slice(1).reverse().join("/"), Ax.lockchange);
  }
  Ax.canvaslisteners = listen;
}
Ax.canvasrender_queued = false;

Ax.lockui = [];

Ax.lockchange = function(change){
  //var keyimg = "http://ajaxanimator.googlecode.com/svn-history/r168/trunk/ajaxanimator/img/silk/key.png";
  //haack! move to Ax.files later?
  
  //Ax.msg("Changed Locks","Locks Changed")
  
  for(var i = 0; i < Ax.lockui.length; i++){
    Ax.lockui[i].remove()
  }
  Ax.lockui = [];
  
  wave2.loop(function(shape){
    //Ax.locklistener+shape
    var lock = is_locked(shape)
    if(Ax.canvas.getShapeById(shape) && lock){
      var bbox = Ax.canvas.getShapeById(shape).getBBox();
      //Ax.lockui.push(Ax.canvas.draw.image(keyimg,bbox.x+2,bbox.y+2,16,16))
      var text = Ax.canvas.draw.text(bbox.x,bbox.y+10,lock);
      var set = Ax.canvas.draw.set();
      var txb = text.getBBox() //i wish i knew a better way to align it like that
      text.attr("x", bbox.x + txb.width/2 + 8)
      txb = text.getBBox()
      set.push(Ax.canvas.draw.rect(txb.x-5, txb.y, txb.width+10, txb.height, 3)
        .attr("fill","#"+Ext.ux.Crypto.SHA1.hash(lock).substr(0,6)));
      text.toFront();
      set.push(text)
      set.toFront()
      Ax.lockui.push(set);
    }
  })(change)
  
  setTimeout(function(){
    for(var i = 0; i < Ax.lockui.length; i++){
      Ax.lockui[i].toFront();
    }
  },100)
}

Ax.canvasrender = function(){
  //alert("rerender!")
  //instead of complex diffing and other awesome stuff, just use the normal loadframe method
  //however you need to check to make sure that it's in an interruptable mode
  //hence this setTimeout
  if(!Ax.canvasrender_queued){
    
    //console.log(Ax.getcanvas(Ax.tcurrent.frame, Ax.tcurrent.layer));
        
    (function(){
      if(Ax.canvas.selected.length == 0 && (new Date).getTime() - Ax.lastselect > 1337){
        //TIME TO RELOAD DATS!
        //console.log("RELOADED")
        Ax.loadframe(Ax.tcurrent.frame, Ax.tcurrent.layer);
        Ax.canvasrender_queued = false;
      }else{
        //console.log("Quod Erat Demonstradum")
        Ax.canvasrender_queued = true;
        //stuff is selected! oh noes!
        setTimeout(arguments.callee, 100);  //is that a good rate?
      }
    })()
  }
}


Ax.small_json = function(obj){
  //simple JSON stringifier which creates small files
  //later if its still needed
  //mostly hackish as of now
  var nobj = {};
  for(var x in obj){
    //do hackishhack if its a legal name
    if(x.indexOf("-") == -1 && x.indexOf("!") == -1 && x.indexOf("/") == -1 && 
    x.indexOf("^") == -1 && x.indexOf("*") == -1 && x.indexOf("\\") == -1 && 
    x.indexOf(":") == -1 && x.indexOf("#") == -1 && x.indexOf("'") == -1 && 
    x.indexOf('"') == -1 && "0123456789".indexOf(x[0]) == -1){
      nobj["___"+x+"___"] = obj[x]
    }
  }
  var out = Ext.util.JSON.encode(nobj);
  out = out.replace(/___"/g, "");
  out = out.replace(/"___/g, "");
  return out;
}


Ax.inverse_map = function(map){
  var nmap = {};
  for(var key in map){
    nmap[map[key]] = key;
  }
  return nmap;
}

Ax.compress_map = {
      "height": "h",
      "width": "w",
      "fill-opacity": "fo",
      "stroke-opacity": "so",
      "fill": "f",
      "stroke": "s",
      "rotation": "rt",
      "type": "t",
      "stroke-width": "sw",
      "subtype": "st",
      "path": "p",
      "font-size": "fs",
      "text": "tx"
    }
    


Ax.type_map = {
  "ellipse": "e",
  "rect": "r",
  "image": "i",
  "text": "t",
  //RECYCLED FOR SUBTYPES TOO. SORTA HACKISH
  "line": "l",
  "path": "p", //brilliant multi-use
  "polygon": "py"
}


Ax.compress_attr = function(attr){
  //shrink the old IDs to soemthign smaller and more manageable
  if(attr.id && attr.id.indexOf("shape:") === 0){
    if("0123456789".indexOf(attr.id[0]) == -1){
      attr.id = attr.id.substr(6, 4);
    }else{
      attr.id = 's'+attr.id.substr(6, 3);
    }
  }
  
  
  var map = Ax.compress_map
  var type_map = Ax.type_map;
  
  var nosend = ["fillColor","lineColor","lineWidth"]
  
  
  //var rmdef = {
  /* //tweening doesn't take into account defaults. damnit.
    "fill-opacity": 1,
    "stroke-opacity": 1,
    "rotation": 0,
    "stroke-width": 1
  */
  //}
  var newattr = {};
  for(var i in attr){
    if(nosend.indexOf(i) == -1){
      if(map[i]){
        //if(rmdef[i] !== attr[i]){
          if((i == "type" || i == "subtype") && type_map[attr[i]]){
            newattr[map[i]] = type_map[attr[i]]
          }else if(i == "path"){
            newattr[map[i]] = attr[i].toString()
          }else{
            newattr[map[i]] = attr[i]
          }
        //}
      }else{
        newattr[i] = attr[i]
      }
    }
  }
  return newattr;
}

Ax.decompress_attr = function(attr){
  var map = Ax.compress_map
  var type_map = Ax.inverse_map(Ax.type_map)
  //var newattr = {};
  for(var i in map){
    if(attr[map[i]] !== null && attr[map[i]] !== undefined ){
      var val = attr[map[i]];
      if(i == "type" || i == "subtype"){
        if(type_map[val]){
          val = type_map[val];
        }
      }
      if(i == "path"){
        if(typeof val == "string"){
          val = Ax.parsePath(val);
        }
      }
      attr[i] = val;
      delete attr[map[i]];
    }
  }
  return attr;
}
