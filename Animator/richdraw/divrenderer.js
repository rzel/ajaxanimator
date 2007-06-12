/*----------------------------------------------------------------------------
 DIVRenderer 1.0
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


function DIVRenderer() {
	this.base = AbstractRenderer;
	this.svgRoot = null;
}


DIVRenderer.prototype = new AbstractRenderer;


DIVRenderer.prototype.init = function(elem) {
  this.container = elem;
  this.container.style.MozUserSelect = 'none';
  this.Canvas = new jsGraphics(this.container.id);
}


DIVRenderer.prototype.bounds = function(shape) {
  var rect = new Object();
  var box = shape.getBBox();
  rect['x'] = box.x;
  rect['y'] = box.y;
  rect['width'] =  box.width;
  rect['height'] = box.height;
  return rect;
}


DIVRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {
  var svgNamespace = 'http://www.w3.org/2000/svg';
  var svg;

  if (shape == 'rect') {
  this.Canvas.drawRect(x, y, width, height);
  this.Canvas.paint();
  }
  else if (shape == 'ellipse') {
	this.Canvas.drawEllipse((left + width / 2), (top + height / 2), width, height);
  this.Canvas.paint();
  }
  else if (shape == 'roundrect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
  this.Canvas.drawRect(x, y, width, height);
  this.Canvas.paint();
  }
  else if (shape == 'line') {
	this.Canvas.drawLine(left, top, left, top);
  this.Canvas.paint();
  }

  try{
  svg.style.position = 'absolute';
  }catch(err){}
  if (fillColor.length == 0)
    fillColor = 'none';
  svg.setAttributeNS(null, 'fill', fillColor);

  if (lineColor.length == 0)
    lineColor = 'none';
  svg.setAttributeNS(null, 'stroke', lineColor);
  svg.setAttributeNS(null, 'stroke-width', lineWidth);
      
  this.svgRoot.appendChild(svg);
  
  return svg;
};


DIVRenderer.prototype.remove = function(shape) {
  shape.parentNode.removeChild(shape);
}


DIVRenderer.prototype.move = function(shape, left, top) {
  if (shape.tagName == 'line') {
    var deltaX = shape.getBBox().width;
    var deltaY = shape.getBBox().height;
    shape.setAttributeNS(null, 'x1', left);
    shape.setAttributeNS(null, 'y1', top);
    shape.setAttributeNS(null, 'x2', left + deltaX);
    shape.setAttributeNS(null, 'y2', top + deltaY);
  }
  else if (shape.tagName == 'ellipse') {
    shape.setAttributeNS(null, 'cx', left + (shape.getBBox().width / 2));
    shape.setAttributeNS(null, 'cy', top + (shape.getBBox().height / 2));
  }
  else {
    shape.setAttributeNS(null, 'x', left);
    shape.setAttributeNS(null, 'y', top);
  }
};


DIVRenderer.prototype.track = function(shape) {
  // TODO
};


DIVRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {
  var deltaX = toX - fromX;
  var deltaY = toY - fromY;

  if (shape.tagName == 'line') {
    shape.setAttributeNS(null, 'x2', toX);
    shape.setAttributeNS(null, 'y2', toY);
  }
  else if (shape.tagName == 'ellipse') {
    if (deltaX < 0) {
      shape.setAttributeNS(null, 'cx', (fromX + deltaX / 2) + 'px');
      shape.setAttributeNS(null, 'rx', (-deltaX / 2) + 'px');
    }
    else {
      shape.setAttributeNS(null, 'cx', (fromX + deltaX / 2) + 'px');
      shape.setAttributeNS(null, 'rx', (deltaX / 2) + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttributeNS(null, 'cy', (fromY + deltaY / 2) + 'px');
      shape.setAttributeNS(null, 'ry', (-deltaY / 2) + 'px');
    }
    else {
      shape.setAttributeNS(null, 'cy', (fromY + deltaY / 2) + 'px');
      shape.setAttributeNS(null, 'ry', (deltaY / 2) + 'px');
    }
  }
  else { 
    if (deltaX < 0) {
      shape.setAttributeNS(null, 'x', toX + 'px');
      shape.setAttributeNS(null, 'width', -deltaX + 'px');
    }
    else {
      shape.setAttributeNS(null, 'width', deltaX + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttributeNS(null, 'y', toY + 'px');
      shape.setAttributeNS(null, 'height', -deltaY + 'px');
    }
    else {
      shape.setAttributeNS(null, 'height', deltaY + 'px');
    }
  }
};


DIVRenderer.prototype.editCommand = function(shape, cmd, value)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (value != '')
        shape.setAttributeNS(null, 'fill', value);
      else
        shape.setAttributeNS(null, 'fill', 'none');
    }
    else if (cmd == 'linecolor') {
      if (value != '')
        shape.setAttributeNS(null, 'stroke', value);
      else
        shape.setAttributeNS(null, 'stroke', 'none');
    }
    else if (cmd == 'linewidth') {
      shape.setAttributeNS(null, 'stroke-width', parseInt(value) + 'px');
    }
  }
}


DIVRenderer.prototype.queryCommand = function(shape, cmd)
{
  var result = '';
  
  if (shape != null) {
    if (cmd == 'fillcolor') {
      result = shape.getAttributeNS(null, 'fill');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linecolor') {
      result = shape.getAttributeNS(null, 'stroke');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linewidth') {
      result = shape.getAttributeNS(null, 'stroke');
      if (result == 'none')
        result = '';
      else
        result = shape.getAttributeNS(null, 'stroke-width');
    }
  }
  
  return result;
}


DIVRenderer.prototype.showTracker = function(shape) {
  var box = shape.getBBox();

  var tracker = document.getElementById('tracker');
  if (tracker) {
    this.remove(tracker);
  }

  var svgNamespace = 'http://www.w3.org/2000/svg';

  tracker = document.createElementNS(svgNamespace, 'rect');
  tracker.setAttributeNS(null, 'id', 'tracker');
  tracker.setAttributeNS(null, 'x', box.x - 10);
  tracker.setAttributeNS(null, 'y', box.y - 10);
  tracker.setAttributeNS(null, 'width', box.width + 20);
  tracker.setAttributeNS(null, 'height', box.height + 20);
  tracker.setAttributeNS(null, 'fill', 'none');
  tracker.setAttributeNS(null, 'stroke', 'blue');
  tracker.setAttributeNS(null, 'stroke-width', '1');
  this.svgRoot.appendChild(tracker);
}


DIVRenderer.prototype.getMarkup = function() {
  return this.container.innerHTML;
}
