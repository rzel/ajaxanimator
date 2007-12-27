function renderXML(node){
	for(var i=0;i<node.childNodes.length;i++)
	{
		render(node.childNodes[i]);	
	}
}

function render(tag)
{


	switch(tag.tagName.toLowerCase())
	{
		case "line":
			var x1 = tag.getAttribute("x1");
			var x2 = tag.getAttribute("x2");
			var y1 = tag.getAttribute("y1");
			var y2 = tag.getAttribute("y2");
			var color = tag.getAttribute("fill");
			var stroke = tag.getAttribute("stroke");

			aflax.getRoot().lineStyle(stroke, color, 100);
			aflax.getRoot().moveTo(x1, y1);
			aflax.getRoot().lineTo(x2, y2);
			break;

		case "rect":
			var x1 = parseInt(tag.getAttribute("x"));
			var y1 = parseInt(tag.getAttribute("y"));
			var w = parseInt(tag.getAttribute("width"));
			var h = parseInt(tag.getAttribute("height"));
			var color = tag.getAttribute("fill");
			var stroke = tag.getAttribute("stroke");

			aflax.getRoot().lineStyle(stroke, color, 100);
			aflax.getRoot().moveTo(x1, y1);
			aflax.getRoot().lineTo(x1+w, y1);
			aflax.getRoot().lineTo(x1+w, y1+h);
			aflax.getRoot().lineTo(x1, y1+h);
			aflax.getRoot().lineTo(x1, y1);
			break;
			
			
	}

}