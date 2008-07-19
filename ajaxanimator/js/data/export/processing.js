/**
 * @author antimatter15
 */

Ax.formats.processing = function(){
    var data = Ax.formats.array(), //the magic behind it all;
 setup = ["//The compilier for this was quickly hacked together", //my little header
 "int frame = 0;\nint frame_total = "+data.length+";", //some variable declarations
 "void setup(){", //the function start
 "size(480, 272);", //set the size of the canvas
 "frameRate(12);", //set the framerate (fps)
 "}\n"].join("\n"), //end the function
    content = [], //the magical content
    draw = ["void draw(){", //declare function
	"if(frame != frame_total){", //if its not the last frmae
	"frame += 1;", //increment it
	"}else{", //but itf it is the last frame
	"frame = 1;", //reset
	"}", //end if
	 "background(#FFFFFF);", //reset the canvas
	 "switch(frame){\n"
	 ].join("\n")
	
    for (var i = 0; i < data.length; i++) {
		content = [];
        for (var s = 0; s < data[i].length; s++) {
            content.push(Ax.formats.processing.stroke(data[i][s]))
            content.push(Ax.formats.processing.strokewidth(data[i][s]))
            content.push(Ax.formats.processing.fill(data[i][s]))
            
            switch (data[i][s].type) {
                case "line":
                    content.push(Ax.formats.processing.line(data[i][s]))
                    break;
                case "rect":
                    content.push(Ax.formats.processing.rect(data[i][s]))
                    break;
				case "ellipse":
					content.push(Ax.formats.processing.ellipse(data[i][s]))
					break;
            }
        }
		draw += "case "+(i+1)+":\n"+content.join("\n")+"\nbreak;\n";
    }
    return setup + draw+"}\n}";
}
Ax.formats.processing.stroke = function(shape){
    return "stroke(" + shape.lineColor + ");";
}

Ax.formats.processing.strokewidth = function(shape){
    return "strokeWeight(" + shape.lineWidth + ");";
}

Ax.formats.processing.fill = function(shape){
    return "fill(" + shape.fillColor + ");";
}

Ax.formats.processing.line = function(shape){
    return "line(" +[shape.left,shape.top,shape.left+shape.width,shape.top+shape.height].join(", ") + ");";
}

Ax.formats.processing.rect = function(shape){
    return "rect(" +[shape.left,shape.top,shape.width,shape.height] .join(", ") + ");";
}

Ax.formats.processing.ellipse = function(shape){
    return "ellipse(" +[shape.left,shape.top,shape.width,shape.height] .join(", ") + ");";
}