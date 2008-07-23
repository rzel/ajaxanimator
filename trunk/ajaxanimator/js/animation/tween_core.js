/**
 * @author antimatter15
 */

Ax.largest_nonempty = function(frame,layer,object){
  //searches for largest non-empty frame that is less than the frame
  var nonempty = [];
  object = (object)?object:Ax.layers;

  for(var i = 0; i < object[layer].keyframes.length; i++){
    if(parseInt(object[layer].keyframes[i]) < frame){
        nonempty.push(parseInt(object[layer].keyframes[i]))
    }
  }
  return nonempty.sort(function(a,b){return b - a})[0];//sort descending and pull the first result (largest)
}

Ax.smallest_nonempty = function(frame,layer,object){
  //i'm just gonna copy from largest_nonempty and be too lazy to change the comments
  //so... yeah.... crappy documentation...
    //searches for largest non-empty frame that is less than the frame
  var nonempty = [];
  object = (object)?object:Ax.layers;

  for(var i = 0; i < object[layer].keyframes.length; i++){
    if(parseInt(object[layer].keyframes[i]) > frame){
        nonempty.push(parseInt(object[layer].keyframes[i]))
    }
  }
  return nonempty.sort(function(a,b){return a - b})[0];//sort descending and pull the first result (largest)
}

Ax.count_frames = function(layers, startAt){
	startAt = (startAt)?startAt:0; //set starting point
	layers = (layers)?layers:Ax.layers; //set layers object
	
	for (var layer in layers) { //loop through layers
	    //calculate the biggest frame
		var layer_frames = layers[layer].keyframes.sort(function(a, b){
            return b - a; //sort the keyframe from largest to smallest and pull out the biggest number
        })[0]; //the largest
		
        if (layer_frames > startAt) { //if this is bigger than current value
            startAt = layer_frames; //set current value
        }//end if
	}//end loop
	return startAt; //return last known frame
}

/*Alternate Tweening Engine. Theoretically Vastly Superior*/
Ax.getSFTween_core = function(frame, frame1, frame2, layer, store, clonefunc){//get single frame tween
    var frame1_data = {}, //where all the organized data goes
 		frame2_data = {}, //read above
 		frames_comp = {}, //an array of stuffs 
 		tween_frame = {}, //the tweens stuffs
		tween_axout = [] //xkcd reference (woah, its lining up!)

	
	for(var i = 0; i < store[frame1].length; i++){ //loopy
		frame1_data[store[frame1][i].id] = store[frame1][i];
		frames_comp[store[frame1][i].id] = null
	}
	for(var i = 0; i < store[frame2].length; i++){
		frame2_data[store[frame2][i].id] = store[frame2][i];
		frames_comp[store[frame2][i].id] = null
	}
	
	tween_frame = Ext.ux.clone(frame2_data)
	
	for(var i in frames_comp){
		if (frame2_data[i] && frame1_data[i]) {
			for (var a in frame2_data[i]) {
				tween_frame[i][a] = Ax.tweenAttribute(a, frame1, frame2, frame1_data[i][a], frame2_data[i][a], frame)
			}
		}
		
	}
	
	for(var i in tween_frame){
		tween_axout.push(tween_frame[i])
	}

    
    return tween_axout;
}


Ax.tweenAttribute = function(name, frame1, frame2, value1, value2, index){
	if (value1 == value2){//if they are the same, why bother?
		return value1;
	}
    if (typeof value2 == "number") { //currently only numbers are tweenable
        return Math.round(Ax.tweenNumber(frame1, frame2, value1, value2, index) * 1000) / 1000; //round to 3 decimal places
    }
    if (name == "transform") {
        return Ax.tweenTransform(frame1, frame2, value1, value2, index); //round to 3 decimal places
    }
    if (name == "points") {
        return Ax.tweenPath(frame1, frame2, value1, value2, index);
    }
	if (value1.substr(0,1) == "#" && value2.substr(0,1) == "#"){ //color tweening
		return Ax.tweenHex(frame1, frame2, value1, value2, index);
	}
    /*
     Now:
     Width,Height, Line Width, x, y
     Future:
     DONE - rotation transform, find out the rotation value, run them through the magickal Ax.tweenNumber function
     DONE - color tween: split hex string into 3 segments, turn that into a number, run it throught he magical function and re-hexify
     
     DONE - Stuff that isn't possible through the current toolset, but should work automagically:
     DONE - opacity tweening (i think they're stored in numbers)
     Fun:
     I donno, maybe some text tweening (i dont have any idea how that'd work. maybe changing a character every frame or something.
     */
    return value2; //return the second if no tweening possible.
}


/*
 Woot!!!!!! I FIXED THE ALGORITHIM!!!!!! TWICE!!!!!
 changelog:
 frs0t ps0t:
 return (index/(frame2-frame1))*(value2-value1); //just hope this works!
 second edit:
 return value1+(index/(frame2-frame1))*(value2-value1); //just hope this works!
 third magical edit:
 return value1+((index-frame1)/(frame2-frame1))*(value2-value1); //just hope this works!
 
 */
Ax.tweenTransform = function(frame1, frame2, value1, value2, index){//same as tweenNumber
	value1 = Ax.parseTransform(value1); //parse stuff
    value2 = Ax.parseTransform(value2);
	
	var degree = Ax.tweenNumber(frame1,frame2, value1[0], value2[0],index),
		xcoord = Ax.tweenNumber(frame1,frame2, value1[1], value2[1],index),
		ycoord = Ax.tweenNumber(frame1,frame2, value1[2], value2[2],index)
    
	if(isNaN(degree) == true){
		degree = 0;
	}
	if(isNaN(xcoord) == true){
		xcoord = 0;
	}
	if(isNaN(ycoord) == true){
		ycoord = 0;
	}
	
	
	//console.log(value1,value2);
	
    return "rotate(" +[degree,xcoord,ycoord].join(", ") +")";
    //     return "rotate("+[Ax.tweenNumber(frame1,frame2,value1[0],value2[0],index),
    //                     value2[1],
    //                     value2[2]].join(", ")+")"
}

Ax.parseTransform = function(transform){
    if (!transform || typeof transform != "string") {
        //Ax.msg("Error","Something Strange Happened")
        return [0, 0, 0];
    }
    transform = transform.replace(")", "").replace("rotate(", "").split(",");
    return [Math.round(parseFloat(transform[0]) * 1000) / 1000, Math.round(parseFloat(transform[1]) * 1000) / 1000, Math.round(parseFloat(transform[2]) * 1000) / 1000]
}

Ax.tweenPath = function(frame1, frame2, value1, value2, index){
    value1 = Ax.parsePath(value1);
    value2 = Ax.parsePath(value2);
    for (var i = 0; i < value2.length; i++) {
        if (parseFloat(value2[i]).toString() == value2[i]) {
            value2[i] = Ax.tweenNumber(frame1, frame2, parseFloat(value1[i]), parseFloat(value2[i]), index);
        }
    }
    
    return value2.join(" ")
}

Ax.parsePath = function(points){
    points = points.replace(/,/g, " , "); //replace commas with space+comma+space
    points = points.replace(/L/g, " L "); //replace commas with space+comma+space
    points = points.replace(/M/g, " M "); //replace commas with space+comma+space
    points = points.replace(/  /g, " "); //replace double-spaces
    points = points.replace(/  /g, " "); //replace double-spaces
    return points.split(" ")
}

Ax.tweenHex = function(frame1, frame2, value1, value2, index){
	value1=Ax.hex2rgb(value1);
	value2=Ax.hex2rgb(value2);

	return "#"+[Ax.toHex(Ax.tweenNumber(frame1, frame2, parseInt(value1.R), parseInt(value2.R), index)),
		Ax.toHex(Ax.tweenNumber(frame1, frame2, parseInt(value1.G), parseInt(value2.G), index)),
		Ax.toHex(Ax.tweenNumber(frame1, frame2, parseInt(value1.B), parseInt(value2.B), index))].join("");
}

Ax.hex2rgb = function(hex){
	var match = hex.toLowerCase().match(/^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/);
	if (match){
		return {R:parseInt(match[1], 16), G:parseInt(match[2], 16), B:parseInt(match[3], 16)};
	}else{
		return {R: 0, G: 0, B: 0};
	}
}

Ax.toHex = function(color){
	color=parseInt(color).toString(16);
	return (color.length<2)?"0"+color:color;
}

Ax.tweenNumber = function(frame1, frame2, value1, value2, index){//frame1, frame2, first number, second number, index (from first)
    //no type checking yet, cause i dont feel like it
    return value1 + ((index - frame1) / (frame2 - frame1)) * (value2 - value1); //just hope this works!
    //blah!
}//he he!!!!!!!!!!!!!!!!!!!!!! mua ha ah ha ha
