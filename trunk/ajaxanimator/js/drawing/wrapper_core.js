/**
 * @author antimatter15
 */

Ax.loadShapes = function(shapes, noattachlistener, instance){ //instance; probably need a better name for this. but its the richdraw/onlypaths/viewer/etc reference. 
    if (typeof shapes == typeof "aimis5wnaatte1tromese") { //try un-scrabling this!
        shapes = Ext.util.JSON.decode(shapes);
    }
    for (var i = 0; i < shapes.length; i++) {
        Ax.loadShape(shapes[i], noattachlistener, instance);
    }
}

Ax.loadShape = function(shape, noattachlistener, instance){
	  var newshape  = ((instance)?instance:Ax.canvas).renderer.create(shape.type, //Shape
	  (shape.fillColor)?shape.fillColor:("#"+Ax.Color.fill), 
	  (shape.lineColor)?shape.lineColor:("#"+Ax.Color.line), 
	  (shape.fillOpac)?shape.fillOpac:1,
	  (shape.lineOpac)?shape.lineOpac:1, 
	  (shape.lineWidth)?shape.lineWidth:Ax.Color.width, 
	  (shape.left)?shape.left:100,
	  (shape.top)?shape.top:100, 
	  (shape.width)?shape.width:100,
	  (shape.height)?shape.height:100,
	  (shape.text)?shape.text:'',
	  (shape.textSize)?shape.textSize:19,
	  (shape.textFamily)?shape.textFamily:'Arial',
	  (shape.href)?shape.href:'', 
	  (shape.points)?shape.points:'', 
	  (shape.transform)?shape.transform:'',
	  (shape.parent)?shape.parent:''); 
 
    newshape.id = (shape.id) ? shape.id : createUUID()
    
    if (!noattachlistener) {
        Ext.get(newshape).on("mousedown", Ax.canvas.onHit, Ax.canvas);
    }
}

Ax.dumpshape = function(shape){
    if (!shape.getAttribute("transform")) {
		try {
        	var box = shape.getBBox()
        	shape.setAttributeNS(null, 'transform', 'rotate(0, ' + (box.x + (box.width / 2)) + ', ' + (box.y + (box.height / 2)) + ')');
    	}catch(err){
			//ZOMG! WTF? LOL!
		}
	}
    return Ax.canvas.info(shape)
}

Ax.dumpshapes_core = function(){
    var rawshapes = Ax.canvas.getshapes()
    var newshapes = [];
    for (var i = 0; i < rawshapes.length; i++) {
        if (rawshapes[i].id != "tracker") {
            newshapes.push(Ax.dumpshape(rawshapes[i]));
        }
    }
	return newshapes
}

Ax.dumpshapes = function(format){
    if (format == "json") {
        return Ext.util.JSON.encode(Ax.dumpshapes_core())
    }
    else {
        return Ax.dumpshapes_core();
    }
}
