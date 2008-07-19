/**
 * @author antimatter15
 */


 /*
  
  int frame = 0;
  int frame_total = 0;
  
  void setup()
  {
    size(height, width)
    frameRate(framerate)
  }
  
  void draw(){
    if(frame < frame_total){
      frame++;
    }else{
      frame=1;
    }
    
    switch(frame){
      case 1:
        frame1();
        break;
    }
  }
  
  
  */
 
 Ax.formats.processing = function(){
 	var data = Ax.formats.array(), //the magic behind it all;
				setup = ["void setup(){", //the function start
				"size(480, 272)", //set the size of the canvas
				"frameRate(12)", //set the framerate (fps)
				"background(#FFFFFF)", //set the background color
				"smooth()", //make smooth?
				"}"].join("\n"); //end the function
				content = []; //the magical content
 	for(var i = 0; i < data.length; i++){
		for(var s = 0; s < data[i].length; s++){
			
			content.push(Ax.formats.processing.stroke(data[i][s]))
			content.push(Ax.formats.processing.strokewidth(data[i][s]))
			content.push(Ax.formats.processing.fill(data[i][s]))
			
			switch(data[i][s].type){
				case "line":
				content.push(Ax.formats.processing.line(data[i][s]))
				break;
				case "rect":
				content.push(Ax.formats.processing.rect(data[i][s]))
				break;
			}
		}
	}
	return setup+"\nvoid draw(){\n"+content.join("\n")+"\n}";
 }
  Ax.formats.processing.stroke = function(shape){
  	return "stroke("+shape.lineColor+")";
  }
  
  Ax.formats.processing.strokewidth = function(shape){
  	return "strokeWeight("+shape.lineWidth+")";
  }
  
  Ax.formats.processing.fill = function(shape){
  	return "fill("+shape.fillColor+")";
  }
  
  Ax.formats.processing.line = function(shape){
  	return "line("+[shape.left, shape.top, shape.left+shape.width, shape.top+shape.height].join(", ")+")";
  }
  
    Ax.formats.processing.rect = function(shape){
  	return "rect("+[shape.left, shape.top, shape.width, shape.height].join(", ")+")";
  }