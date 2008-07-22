/**
 * @author antimatter15
 * I'm only making this because this is a cool language
 * I wouldn't even know about Processing if not for John Resig's Processing.JS
 * so yeah, this is sorta intended to be played on processing.js
 */

Ax.ex.processing = function(){
    var data = Ax.ex.array(), //the magic behind it all;
 setup = ["//The compilier for this was quickly hacked together", //my little header
 "int frame = 0;\nint frame_total = "+data.length+";", //some variable declarations
 "void setup(){", //the function start
 "size(480, 272);", //set the size of the canvas
 "frameRate(12);", //set the framerate (fps)
 "smooth();",
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
            content.push(Ax.ex.processing.stroke(data[i][s]))
            content.push(Ax.ex.processing.strokewidth(data[i][s]))
            content.push(Ax.ex.processing.fill(data[i][s]))
            
            switch (data[i][s].type) {
                case "line":
                    content.push(Ax.ex.processing.line(data[i][s]))
                    break;
                case "rect":
                    content.push(Ax.ex.processing.rect(data[i][s]))
                    break;
				case "ellipse":
					content.push(Ax.ex.processing.ellipse(data[i][s]))
					break;
				case "text":
					content.push(Ax.ex.processing.text(data[i][s]));
					break;
            }
        }
		draw += "case "+(i+1)+":\n"+content.join("\n")+"\nbreak;\n";
    }
    return setup + draw+"}\n}";
}
Ax.ex.processing.stroke = function(shape){
    return "stroke(" + shape.lineColor + ");";
}

Ax.ex.processing.strokewidth = function(shape){
    return "strokeWeight(" + shape.lineWidth + ");";
}

Ax.ex.processing.fill = function(shape){
    return "fill(" + shape.fillColor + ");";
}

Ax.ex.processing.line = function(shape){
    return "line(" +[shape.left,shape.top,shape.left+shape.width,shape.top+shape.height].join(", ") + ");";
}
Ax.ex.processing.text = function(shape){
    return "text(" +['"'+shape.text+'"',shape.left,shape.top].join(", ") + ");";
}

Ax.ex.processing.rect = function(shape){
    return "rect(" +[shape.left,shape.top,shape.width,shape.height] .join(", ") + ");";
}

Ax.ex.processing.ellipse = function(shape){
    return "ellipse(" +[shape.left,shape.top,shape.width,shape.height] .join(", ") + ");";
}
Ax.ex.processing.save = function(){
	Ax.msg("Notes on exporting to Processing","Export to processing is not complete, data such as images, paths, polygons, and rotation will not be exported.");
	Ax.save.computer(Ax.ex.processing(),Ax.animation.name+".pde")
}
