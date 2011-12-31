
wave2.statechange = function(){
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
          }else{
            //deletion
          }
        }
      }else{ //addition
        changed = true
        wave2._bck[skey] = val;
      }
    }
    for(var i = 0, k = bckeys.length; i < k;i++){
      var skey = event + bckeys[i]
      if(!wave2.get(skey)){ //deletion
        if(typeof wave2._get(skey) == "string" && wave2._get(skey).indexOf("DEL/") == 0){
          changed = true
          delete wave2._bck[skey];
        }
      }
    }
    if(changed == true && wave2.fire_evt){
      for(var i = 0, s = wave2._evt[event].length; i < s;i++){
        wave2._evt[event][i](wave2.subkeys(event))
      }
    }
  }
}

