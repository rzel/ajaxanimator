

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

/*----------------------------------------------------------------------------
 IESVGRenderer 1.0
 SVG Renderer For RichDraw
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of SVG based renderer.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle

 This program is  free software;  you can redistribute  it and/or  modify it
 under the terms of the MIT License.

 Permission  is hereby granted,  free of charge, to  any person  obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the  Software without restriction,  including without limitation
 the  rights to use, copy, modify,  merge, publish, distribute,  sublicense,
 and/or  sell copies  of the  Software, and to  permit persons to  whom  the
 Software is  furnished  to do  so, subject  to  the  following  conditions:
 The above copyright notice and this  permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED,  INCLUDING BUT NOT LIMITED TO  THE WARRANTIES  OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR  COPYRIGHT  HOLDERS BE  LIABLE FOR  ANY CLAIM,  DAMAGES OR OTHER
 LIABILITY, WHETHER  IN AN  ACTION OF CONTRACT, TORT OR  OTHERWISE,  ARISING
 FROM,  OUT OF OR  IN  CONNECTION  WITH  THE  SOFTWARE OR THE  USE OR  OTHER
 DEALINGS IN THE SOFTWARE.
 -----------------------------------------------------------------------------
 Dependencies:
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function IESVGRenderer() {
	this.base = AbstractRenderer;
	this.svgRoot = null;
}


IESVGRenderer.prototype = new AbstractRenderer;


IESVGRenderer.prototype.init = function(elem) {
  this.container = elem;
  this.container.style.MozUserSelect = 'none';
  var svgNamespace = 'http://www.w3.org/2000/svg';
  this.svgRoot = this.container.ownerDocument.createElement("svg");
  this.container.appendChild(this.svgRoot);
}


IESVGRenderer.prototype.bounds = function(shape) {
  var rect = new Object();
  var box = shape.getBBox();
  rect['x'] = box.x;
  rect['y'] = box.y;
  rect['width'] =  box.width;
  rect['height'] = box.height;
  return rect;
}


IESVGRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {
  var svgNamespace = 'http://www.w3.org/2000/svg';
  var svg;

  if (shape == 'rect') {
    svg = this.container.ownerDocument.createElement('rect');
    svg.setAttribute('x', left + 'px');
    svg.setAttribute('y', top + 'px');
    svg.setAttribute('width', width + 'px');
    svg.setAttribute('height', height + 'px');
  }
  else if (shape == 'ellipse') {
    svg = this.container.ownerDocument.createElement('ellipse');
    svg.setAttribute('cx', (left + width / 2) + 'px');
    svg.setAttribute('cy', (top + height / 2) + 'px');
    svg.setAttribute('rx', (width / 2) + 'px');
    svg.setAttribute('ry', (height / 2) + 'px');
  }
  else if (shape == 'roundrect') {
    svg = this.container.ownerDocument.createElement('rect');
    svg.setAttribute('x', left + 'px');
    svg.setAttribute('y', top + 'px');
    svg.setAttribute('rx', '20px');
    svg.setAttribute('ry', '20px');
    svg.setAttribute('width', width + 'px');
    svg.setAttribute('height', height + 'px');
  }
  else if (shape == 'line') {
    svg = this.container.ownerDocument.createElement('line');
    svg.setAttribute('x1', left + 'px');
    svg.setAttribute('y1', top + 'px');
    svg.setAttribute('x2', left + 'px');
    svg.setAttribute('y2', top + 'px');
  }

  try{
  svg.style.position = 'absolute';
  }catch(err){}
  if (fillColor.length == 0)
    fillColor = 'none';
  svg.setAttribute('fill', fillColor);

  if (lineColor.length == 0)
    lineColor = 'none';
  svg.setAttribute('stroke', lineColor);
  svg.setAttribute('stroke-width', lineWidth);
      
  this.svgRoot.appendChild(svg);
  
  return svg;
};


IESVGRenderer.prototype.remove = function(shape) {
  shape.parentNode.removeChild(shape);
}


IESVGRenderer.prototype.move = function(shape, left, top) {
  if (shape.tagName == 'line') {
    var deltaX = shape.getBBox().width;
    var deltaY = shape.getBBox().height;
    shape.setAttribute('x1', left);
    shape.setAttribute('y1', top);
    shape.setAttribute('x2', left + deltaX);
    shape.setAttribute('y2', top + deltaY);
  }
  else if (shape.tagName == 'ellipse') {
    shape.setAttribute('cx', left + (shape.getBBox().width / 2));
    shape.setAttribute('cy', top + (shape.getBBox().height / 2));
  }
  else {
    shape.setAttribute('x', left);
    shape.setAttribute('y', top);
  }
};


IESVGRenderer.prototype.track = function(shape) {
  // TODO
};


IESVGRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {

renderXML(this.container.childNodes[1]);

  var deltaX = toX - fromX;
  var deltaY = toY - fromY;

  if (shape.tagName == 'line') {
    shape.setAttribute('x2', toX);
    shape.setAttribute('y2', toY);
  }
  else if (shape.tagName == 'ellipse') {
    if (deltaX < 0) {
      shape.setAttribute('cx', (fromX + deltaX / 2) + 'px');
      shape.setAttribute('rx', (-deltaX / 2) + 'px');
    }
    else {
      shape.setAttribute('cx', (fromX + deltaX / 2) + 'px');
      shape.setAttribute('rx', (deltaX / 2) + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttribute('cy', (fromY + deltaY / 2) + 'px');
      shape.setAttribute('ry', (-deltaY / 2) + 'px');
    }
    else {
      shape.setAttribute('cy', (fromY + deltaY / 2) + 'px');
      shape.setAttribute('ry', (deltaY / 2) + 'px');
    }
  }
  else { 
    if (deltaX < 0) {
      shape.setAttribute('x', toX + 'px');
      shape.setAttribute('width', -deltaX + 'px');
    }
    else {
      shape.setAttribute('width', deltaX + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttribute('y', toY + 'px');
      shape.setAttribute('height', -deltaY + 'px');
    }
    else {
      shape.setAttribute('height', deltaY + 'px');
    }
  }
};


IESVGRenderer.prototype.editCommand = function(shape, cmd, value)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (value != '')
        shape.setAttribute('fill', value);
      else
        shape.setAttribute('fill', 'none');
    }
    else if (cmd == 'linecolor') {
      if (value != '')
        shape.setAttribute('stroke', value);
      else
        shape.setAttribute('stroke', 'none');
    }
    else if (cmd == 'linewidth') {
      shape.setAttribute('stroke-width', parseInt(value) + 'px');
    }
  }
}


IESVGRenderer.prototype.queryCommand = function(shape, cmd)
{
  var result = '';
  
  if (shape != null) {
    if (cmd == 'fillcolor') {
      result = shape.getAttribute('fill');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linecolor') {
      result = shape.getAttribute('stroke');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linewidth') {
      result = shape.getAttribute('stroke');
      if (result == 'none')
        result = '';
      else
        result = shape.getAttribute('stroke-width');
    }
  }
  
  return result;
}


IESVGRenderer.prototype.showTracker = function(shape) {
  var box = shape.getBBox();

  var tracker = document.getElementById('tracker');
  if (tracker) {
    this.remove(tracker);
  }

  var svgNamespace = 'http://www.w3.org/2000/svg';

  tracker = document.createElement('rect');
  tracker.setAttribute('id', 'tracker');
  tracker.setAttribute('x', box.x - 10);
  tracker.setAttribute('y', box.y - 10);
  tracker.setAttribute('width', box.width + 20);
  tracker.setAttribute('height', box.height + 20);
  tracker.setAttribute('fill', 'none');
  tracker.setAttribute('stroke', 'blue');
  tracker.setAttribute('stroke-width', '1');
  this.svgRoot.appendChild(tracker);
}


IESVGRenderer.prototype.getMarkup = function() {
  return this.container.innerHTML;
}
