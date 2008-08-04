/*----------------------------------------------------------------------------
 SVGRENDERER 1.0
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


function SVGRenderer() {
	this.base = AbstractRenderer;
	this.svgRoot = null;
}


SVGRenderer.prototype = new AbstractRenderer;


SVGRenderer.prototype.init = function(elem) {
  this.container = elem;

  this.container.style.MozUserSelect = 'none';
    
  var svgNamespace = 'http://www.w3.org/2000/svg'; 
  
  this.svgRoot = this.container.ownerDocument.createElementNS(svgNamespace, "svg");
  this.svgRoot.setAttributeNS(null,'viewBox', zoominit);
  this.svgRoot.setAttributeNS(null,'preserveAspectRatio','none');
  this.container.appendChild(this.svgRoot);
}


SVGRenderer.prototype.bounds = function(shape) {
  var rect = new Object();
  var box = shape.getBBox();
  rect['x'] = box.x;
  rect['y'] = box.y;
  rect['width'] =  box.width-18;
  rect['height'] = box.height-18;
  return rect;
}
SVGRenderer.prototype.create = function(shape, fillColor, lineColor, fillOpac, lineOpac, lineWidth, left, top, width, height, textMessaje, textSize, textFamily, imageHref, points, transform, parent) {
  var svgNamespace = 'http://www.w3.org/2000/svg'; 
  var xlinkNS="http://www.w3.org/1999/xlink"; 
 
  var svg;  
  
  if (shape == 'rect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');  
    //svg.setAttributeNS(null,'transform', "translate(0,0)");
    //svg.setAttributeNS(null,'transform', "translate('+left+','+top+')");   
    svg.style.position = 'absolute';
  }
  else if (shape == 'ellipse' || shape == 'circle') {
    
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'ellipse');
    svg.setAttributeNS(null, 'cx', (left + width / 2) + 'px');
    svg.setAttributeNS(null, 'cy', (top + height / 2) + 'px');
    if(shape == 'circle'){
     svg.setAttributeNS(null, 'rx', (width / 2) + 'px');
     svg.setAttributeNS(null, 'ry', (width / 2) + 'px');   
    }else{
     svg.setAttributeNS(null, 'rx', (width / 2) + 'px');
     svg.setAttributeNS(null, 'ry', (height / 2) + 'px');   
    
    }
   //svg.setAttributeNS(null,'transform', "translate('+left+','+top+')");  
    svg.style.position = 'absolute';
  }
  else if (shape == 'roundrect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'rx', '20px');
    svg.setAttributeNS(null, 'ry', '20px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');   
   //svg.setAttributeNS(null,'transform', "translate('+left+','+top+')");  
    svg.style.position = 'absolute';
  }
  else if (shape == 'line') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'line');
    svg.setAttributeNS(null, 'x1', left + 'px');
    svg.setAttributeNS(null, 'y1', top + 'px');
    svg.setAttributeNS(null, 'x2', left + width + 'px');
    svg.setAttributeNS(null, 'y2', top + height + 'px');  
    //svg.setAttributeNS(null,'transform', "translate('+left+','+top+')");  
    svg.style.position = 'absolute';
  } 
  else if (shape == 'polyline') {
    var xcenterpoly=xpArray;
    var ycenterpoly=ypArray;
    var thispath=''+xpArray[1]+','+ypArray[1];
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'polyline');  
    svg.setAttributeNS(null, 'points', points);
    svg.style.position = 'absolute';
  }
  else if (shape == 'path')
    {
    var k = (Math.sqrt(2)-1)*4/3;
    var circle="M 0,1 L 0.552,1 1,0.552  1,0  1,-0.552  0.552,-1 0,-1 -0.552,-1 -1,-0.552 -1,0  -1,0.552  -0.552,1  0,1z"  // 4th
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'path');   
    //svg.setAttributeNS(null, 'd', 'M '+thispath+' C'+thispath);
    svg.setAttributeNS(null, 'd', points);  	
    //svg.setAttributeNS(null,'transform', "translate(-80,-80)"); 
    svg.style.position = 'absolute';  
    } 
     else if (shape == 'controlpath')
    {
    var point='M '+left+','+top+' L '+(left+1)+','+(top+1)+'z'  // 4th
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'path');   
    //svg.setAttributeNS(null, 'd', 'M '+thispath+' C'+thispath);
    svg.setAttributeNS(null, 'd', point);  	
    svg.setAttributeNS(null,'transform', "translate(0,0)"); 
    svg.style.position = 'absolute';  
    } 
 else if (shape == 'text') {
    var data = this.container.ownerDocument.createTextNode(textMessaje);
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'text');
    svg.setAttributeNS(null, 'x', parseFloat(left) + 'px');
    svg.setAttributeNS(null, 'y', parseFloat(top) + 'px');
    svg.setAttributeNS(null, 'font-family', textFamily );
    svg.setAttributeNS(null, 'font-size', parseFloat(textSize)); 
    svg.style.position = 'absolute';  
    svg.appendChild(data);   
 } 
  else if (shape == 'clipPath') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'clipPath');
     

 }  
 else if (shape == 'linearGradient') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'linearGradient');
    svg.setAttributeNS(null, 'x1', parseFloat(left));
    svg.setAttributeNS(null, 'y1', parseFloat(top ));
    svg.setAttributeNS(null, 'x2', parseFloat(width));
    svg.setAttributeNS(null, 'y2', parseFloat(height));  

 }  
 else if (shape == 'stop') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'stop');
    svg.setAttributeNS(null, 'stop-color', fillColor);
    svg.setAttributeNS(null, 'stop-opacity', parseFloat(fillOpac));
    svg.setAttributeNS(null, 'offset', parseFloat(lineOpac));  

 } 
  else if (shape == 'group') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'g');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');  
    svg.setAttributeNS(null, 'fill-opacity', parseFloat(fillOpac));  
    svg.setAttributeNS(null, 'fill', fillColor);
 //} 

  //else if (shape == 'linearGradient') {
    //return false
 } 
 else if (shape == 'image') { 
   /* svg = this.container.ownerDocument.createElementNS(svgNamespace, 'g');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');  
    */
    var svg = this.container.ownerDocument.createElementNS(svgNamespace, 'image');
    svg.setAttributeNS(xlinkNS,'href', imageHref);
    svg.setAttributeNS(null, 'x', left  + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');  
    svg.setAttributeNS(null, 'opacity', parseFloat(fillOpac));
    svg.setAttributeNS(null, 'preserveAspectRatio','none');//xMinYMin slice  
    //svg.setAttributeNS(null, 'viewbox', left+' '+top+' '+width+' '+height); 
    //Ext.get(this.container).removeAllListeners(isvg)   
    //svg.appendChild(isvg);
    /* 
    var rsvg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    rsvg.setAttributeNS(null, 'x', left + 'px');
    rsvg.setAttributeNS(null, 'y', top + 'px');
    rsvg.setAttributeNS(null, 'width', width + 'px');
    rsvg.setAttributeNS(null, 'height', height + 'px');  
    rsvg.style.fill = fillColor;  
    rsvg.style.stroke = lineColor;  
    rsvg.style.strokeWidth = lineWidth; 
    rsvg.setAttributeNS(null, 'opacity', '0.1');
    rsvg.style.strokOpacity = lineOpac;
    // Ext.get(this.container).removeAllListeners(rsvg)
     svg.appendChild(rsvg);   

     */
    //svg.setAttributeNS(null, 'color-rendering', fillColor);   
    //svg.setAttributeNS(null, 'display', 'inherit'); 
    
      //alert(fillOpac+'lkjlkj'); 
    //svg.setAttributeNS(null, 'fill-opacity', parseFloat(fillOpac));

    /* if (fillColor.length == 0){fillColor = 'none';}
    if (lineColor.length == 0){lineColor = 'none';}
    svg.style.fill = fillColor;  
    svg.style.stroke = lineColor;  
    svg.style.strokeWidth = lineWidth; 
    svg.style.fillOpacity = fillOpac;
    svg.style.strokOpacity = lineOpac;
     svg.style.setAttributeNS(null, 'fill', fillColor);
          svg.style.setAttributeNS(null, 'stroke', lineColor);
          svg.style.setAttributeNS(null, 'stroke-width', lineWidth);
          svg.style.setAttributeNS(null, 'fill-opacity', fillOpac);  
          svg.style.setAttributeNS(null, 'stroke-opacity',lineOpac);
    
   */
 } 
 
 if(shape == 'zoom') 
  {
        
  }else
  {                                          
       if(transform!='')
        {
         svg.setAttributeNS(null, 'transform', transform);      
        }
        /*
             var render=true;
        if(shape.indexOf('image')>=0){render=false;}
        if(shape.indexOf('group')>=0){render=false;}
        if(shape.indexOf('linearGradient')>=0){render=false;}
        if(shape.indexOf('stop')<=0){render=false;}
        if(render==true) 
        */
       if(shape != 'image' || shape != 'group' || shape != 'stop' )

        { 
                                                               
           //var set = this.container.ownerDocument.createElementNS(svgNamespace, "style");
            
           if (lineColor.length == 0){lineColor = 'none';} 
           if (fillColor.length == 0){fillColor = 'none';} 
          // set.setAttributeNS(null, 'stroke', lineColor);
          //set.setAttributeNS(null, 'stroke-width', lineWidth);
          //set.setAttributeNS(null, 'fill-opacity', fillOpac);  
          //set.setAttributeNS(null, 'stroke-opacity',lineOpac);
            //svg.appendChild(set);
           //svg.setAttributeNS(null, "style","fill:"+ fillColor+";stroke:"+lineColor+";strokeWidth:"+lineWidth+";fill-opacity:"+fillOpac+";stroke-opacity:"+lineOpac);  
           // 
          svg.setAttributeNS(null, 'fill', fillColor);
          svg.setAttributeNS(null, 'stroke', lineColor);
          svg.setAttributeNS(null, 'stroke-width', parseFloat(lineWidth));
          svg.setAttributeNS(null, 'fill-opacity', parseFloat(fillOpac));  
          svg.setAttributeNS(null, 'stroke-opacity',parseFloat(lineOpac));
          svg.setAttributeNS(null, 'stroke-linejoin','round')         
      
          /*     
          <a xlink:href="http://www.w3.org">
                <ellipse cx="2.5" cy="1.5" rx="2" ry="1"  fill="red" />
          </a>
          svg.style.stroke = lineColor;  
           svg.style.strokeWidth = lineWidth; 
           svg.style.fillOpacity = fillOpac;
           svg.style.strokOpacity = lineOpac;   
          if (fillColor.length == 0){fillColor = 'none';}
          
          if (lineColor.length == 0){lineColor = 'none';}
          */
         }   
         
         
     if(parent==''){
       this.svgRoot.appendChild(svg);
     }else{  
       if(document.getElementById(parent)){   
         var parentShape = document.getElementById(parent);
         parentShape.appendChild(svg);
        } 
     }   

          return svg;   
             
   }        
  
};   

SVGRenderer.prototype.create01 = function(shape, fillColor, lineColor, fillOpac, lineOpac, lineWidth, left, top, width, height, textMessaje, textSize, textFamily, imageHref, transform) {
  var svgNamespace = 'http://www.w3.org/2000/svg'; 
  var xlinkNS="http://www.w3.org/1999/xlink"; 
  
  var svg;  
  if (shape == 'rect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');  
    //svg.setAttributeNS(null,'transform', "translate(0,0)");
    //svg.setAttributeNS(null,'transform', "translate('+left+','+top+')");   
    svg.style.position = 'absolute';
  }
  else if (shape == 'ellipse') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'ellipse');
    svg.setAttributeNS(null, 'cx', (left + width / 2) + 'px');
    svg.setAttributeNS(null, 'cy', (top + height / 2) + 'px');
    svg.setAttributeNS(null, 'rx', (width / 2) + 'px');
    svg.setAttributeNS(null, 'ry', (height / 2) + 'px');   
   //svg.setAttributeNS(null,'transform', "translate('+left+','+top+')");  
    svg.style.position = 'absolute';
  }
  else if (shape == 'roundrect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'rx', '20px');
    svg.setAttributeNS(null, 'ry', '20px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');   
   //svg.setAttributeNS(null,'transform', "translate('+left+','+top+')");  
    svg.style.position = 'absolute';
  }
  else if (shape == 'line') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'line');
    svg.setAttributeNS(null, 'x1', left + 'px');
    svg.setAttributeNS(null, 'y1', top + 'px');
    svg.setAttributeNS(null, 'x2', left + width + 'px');
    svg.setAttributeNS(null, 'y2', top + height + 'px');  
    //svg.setAttributeNS(null,'transform', "translate('+left+','+top+')");  
    svg.style.position = 'absolute';
  } 
  else if (shape == 'polyline') {
    var xcenterpoly=xpArray;
    var ycenterpoly=ypArray;
    var thispath=''+xpArray[1]+','+ypArray[1];
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'polyline');  
    svg.setAttributeNS(null, 'points', thispath);
    svg.style.position = 'absolute';
  }
  else if (shape == 'path')
    {
    var k = (Math.sqrt(2)-1)*4/3;
    var circle="M 0,1 L 0.552,1 1,0.552  1,0  1,-0.552  0.552,-1 0,-1 -0.552,-1 -1,-0.552 -1,0  -1,0.552  -0.552,1  0,1z"  // 4th
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'path');   
    //svg.setAttributeNS(null, 'd', 'M '+thispath+' C'+thispath);
    svg.setAttributeNS(null, 'd', circle);  	
    svg.setAttributeNS(null,'transform', "translate(0,0)"); 
    svg.style.position = 'absolute';  
    } 
     else if (shape == 'controlpath')
    {
    var point='M '+left+','+top+' L '+(left+1)+','+(top+1)+'z'  // 4th
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'path');   
    //svg.setAttributeNS(null, 'd', 'M '+thispath+' C'+thispath);
    svg.setAttributeNS(null, 'd', point);  	
    svg.setAttributeNS(null,'transform', "translate(0,0)"); 
    svg.style.position = 'absolute';  
    } 
 else if (shape == 'text') {
    var data = this.container.ownerDocument.createTextNode(textMessaje);
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'text');
    svg.setAttributeNS(null, 'x', parseFloat(left) + 'px');
    svg.setAttributeNS(null, 'y', parseFloat(top) + 'px');
    svg.setAttributeNS(null, 'font-family', textFamily );
    svg.setAttributeNS(null, 'font-size', parseFloat(textSize)); 
    svg.style.position = 'absolute';  
    svg.appendChild(data);   
 } 
  else if (shape == 'clipPath') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'clipPath');
     

 }  

  else if (shape == 'group') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'g');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');  

 //} 

  //else if (shape == 'linearGradient') {
    //return false
 } 
 else if (shape == 'image') { 
   /* svg = this.container.ownerDocument.createElementNS(svgNamespace, 'g');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');  
    */
    var svg = this.container.ownerDocument.createElementNS(svgNamespace, 'image');
    svg.setAttributeNS(xlinkNS,'href', imageHref);
    svg.setAttributeNS(null, 'x', left  + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');  
    svg.setAttributeNS(null, 'opacity', parseFloat(fillOpac));
    svg.setAttributeNS(null, 'preserveAspectRatio','none');//xMinYMin slice  
    //svg.setAttributeNS(null, 'viewbox', left+' '+top+' '+width+' '+height); 
    //Ext.get(this.container).removeAllListeners(isvg)   
    //svg.appendChild(isvg);
    /* 
    var rsvg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    rsvg.setAttributeNS(null, 'x', left + 'px');
    rsvg.setAttributeNS(null, 'y', top + 'px');
    rsvg.setAttributeNS(null, 'width', width + 'px');
    rsvg.setAttributeNS(null, 'height', height + 'px');  
    rsvg.style.fill = fillColor;  
    rsvg.style.stroke = lineColor;  
    rsvg.style.strokeWidth = lineWidth; 
    rsvg.setAttributeNS(null, 'opacity', '0.1');
    rsvg.style.strokOpacity = lineOpac;
    // Ext.get(this.container).removeAllListeners(rsvg)
     svg.appendChild(rsvg);   

     */
    //svg.setAttributeNS(null, 'color-rendering', fillColor);   
    //svg.setAttributeNS(null, 'display', 'inherit'); 
    
      //alert(fillOpac+'lkjlkj'); 
    //svg.setAttributeNS(null, 'fill-opacity', parseFloat(fillOpac));

    /* if (fillColor.length == 0){fillColor = 'none';}
    if (lineColor.length == 0){lineColor = 'none';}
    svg.style.fill = fillColor;  
    svg.style.stroke = lineColor;  
    svg.style.strokeWidth = lineWidth; 
    svg.style.fillOpacity = fillOpac;
    svg.style.strokOpacity = lineOpac;
     svg.style.setAttributeNS(null, 'fill', fillColor);
          svg.style.setAttributeNS(null, 'stroke', lineColor);
          svg.style.setAttributeNS(null, 'stroke-width', lineWidth);
          svg.style.setAttributeNS(null, 'fill-opacity', fillOpac);  
          svg.style.setAttributeNS(null, 'stroke-opacity',lineOpac);
    
   */
 } 
 
 if(shape == 'zoom') 
  {
        
  }else
  {                                          
       if(transform!='')
        {
         svg.setAttributeNS(null, 'transform', transform);      
        }
  
        if(shape != 'image')
         { 
                                                               
           //var set = this.container.ownerDocument.createElementNS(svgNamespace, "style");
            
           if (lineColor.length == 0){lineColor = 'none';} 
           if (fillColor.length == 0){fillColor = 'none';} 
          // set.setAttributeNS(null, 'stroke', lineColor);
          //set.setAttributeNS(null, 'stroke-width', lineWidth);
          //set.setAttributeNS(null, 'fill-opacity', fillOpac);  
          //set.setAttributeNS(null, 'stroke-opacity',lineOpac);
            //svg.appendChild(set);
           //svg.setAttributeNS(null, "style","fill:"+ fillColor+";stroke:"+lineColor+";strokeWidth:"+lineWidth+";fill-opacity:"+fillOpac+";stroke-opacity:"+lineOpac);  
           // 
          svg.setAttributeNS(null, 'fill', fillColor);
          svg.setAttributeNS(null, 'stroke', lineColor);
          svg.setAttributeNS(null, 'stroke-width', parseFloat(lineWidth));
          svg.setAttributeNS(null, 'fill-opacity', parseFloat(fillOpac));  
          svg.setAttributeNS(null, 'stroke-opacity',parseFloat(lineOpac));
          svg.setAttributeNS(null, 'stroke-linejoin','round')         
      
          /*     
          <a xlink:href="http://www.w3.org">
                <ellipse cx="2.5" cy="1.5" rx="2" ry="1"  fill="red" />
          </a>
          svg.style.stroke = lineColor;  
           svg.style.strokeWidth = lineWidth; 
           svg.style.fillOpacity = fillOpac;
           svg.style.strokOpacity = lineOpac;   
          if (fillColor.length == 0){fillColor = 'none';}
          
          if (lineColor.length == 0){lineColor = 'none';}
          */
         }
          this.svgRoot.appendChild(svg);
     
          return svg;        
   }        
  
};  

SVGRenderer.prototype.zoom = function(clicx,clicy){ 
/* 
function(direction, amount) { 
var viewBox = this.rootNode.getAttribute('viewBox');
    var viewVals = viewBox.split(' ');
    if (amount == null) {
        amount = SVGElement.panFactor;
    }
    switch (direction) {
        case 'left':
            amount = 0 - amount;
            // intentionally fall through
        case 'right':
            var currentPosition = parseFloat(viewVals[0]);
            currentPosition += amount;
            viewVals[0] = currentPosition;
            break;
        case 'up':
            amount = 0 - amount;
            // intentionally fall through
        case 'down':
            var currentPosition = parseFloat(viewVals[1]);
            currentPosition += amount;
            viewVals[1] = currentPosition;
            break;
        case 'origin':
            // reset everything to initial values
            viewVals[0] = 0;
            viewVals[1] = 0;
            this.rootNode.currentScale = 1;
            this.rootNode.currentTranslate.x = 0;
            this.rootNode.currentTranslate.y = 0;
            break;
    }
    this.rootNode.setAttribute('viewBox', viewVals.join(' '));        
 */
 
      
      
      //canvasWidth
      //canvasheight
   if(zoommode=='frame')
    {   
       var viewBox = this.svgRoot.getAttributeNS(null,'viewBox'); 
     
       //alert(viewBox);
      
       var viewBox = zoominit;  
       var viewVals = viewBox.split(' ');
       
       var corner1x = parseFloat(viewVals[0]); 
       var corner1y = parseFloat(viewVals[1]);  
       var corner2x = parseFloat(viewVals[2]); 
       var corner2y = parseFloat(viewVals[3]);  
    }
     else
    {   
       
       var viewBox = this.svgRoot.getAttributeNS(null,'viewBox'); 
      
       var viewVals = viewBox.split(' ');
       var prevCorner1x = parseFloat(viewVals[0]); 
       var prevCorner1y = parseFloat(viewVals[1]);  
       var prevCorner2x = parseFloat(viewVals[2]); 
       var prevCorner2y = parseFloat(viewVals[3]); 
       var prevWidth=prevCorner2x-prevCorner1x;  
       var prevHeight=prevCorner2y-prevCorner1y;   
        
    }
   
      if(zoommode=='more')
       {  
        var corner1x = prevCorner1x; 
        var corner1y = prevCorner1y;  
        var corner2x = prevCorner2x*0.95; 
        var corner2y = prevCorner2y*0.95;  
       }
      if(zoommode=='minus') 
       {
        var corner1x = prevCorner1x; 
        var corner1y = prevCorner1y;  
        var corner2x = prevCorner2x*1.05; 
        var corner2y = prevCorner2y*1.05;  
       }       
       var direction=0;
      if(zoommode=='hand') 
       {        
        var viewBox = zoominit;  
       var viewVals = viewBox.split(' ');
       
       
       var width = parseFloat(viewVals[2]); 
       var height = parseFloat(viewVals[3]); 
       
       var prevZoomCenterx=centerZoomx 
       var prevZoomCentery=centerZoomy 
       centerZoomx=clicx;
       centerZoomy=clicy; 
        direction=ang2v(prevZoomCenterx,prevZoomCentery,centerZoomx,centerZoomy);
       var distance=dist2p(prevZoomCenterx,prevZoomCentery,centerZoomx,centerZoomy);
       //alert(direction);  
       
       var corner1x = prevCorner1x+distance*Math.cos(direction+Math.PI); 
       var corner1y = prevCorner1y+distance*Math.sin(direction+Math.PI); 
       var corner2x = prevCorner2x+distance*Math.cos(direction+Math.PI); 
       var corner2y = prevCorner2y+distance*Math.sin(direction+Math.PI);   
       
       }
       direction=direction*180/Math.PI;
        //this.svgRoot.currentScale = zoomscale+0.1;
        //this.svgRoot.currentTranslate.x = 0;
        //this.svgRoot.currentTranslate.y = 0; 
        //var resultPosx=clicx-((prevscalex-posx)/2);//-Math.abs(posx+clicx)
        //var resultPosy=clicy-((prevscalex-posy)/2);//-Math.abs(posy+clicy)
        //var resultPosx=-Math.abs(posx+clicx);
        //var resultPosy=-Math.abs(posy+clicy);        

  this.svgRoot.setAttributeNS(null,'viewBox', (corner1x)+' '+(corner1y)+' '+corner2x+' '+corner2y+'');
  var viewBox = this.svgRoot.getAttributeNS(null,'viewBox'); 
  //$('status').innerHTML=' '+viewBox; 
  //alert(direction+'__'+prevZoomCenterx+' '+prevZoomCentery+' '+centerZoomx+' '+centerZoomy);
}  

//this.mode, this.fillColor, this.lineColor, this.fillOpac, this.lineOpac, this.lineWidth, this.mouseDownX, this.mouseDownY, 1, 1,'',''
SVGRenderer.prototype.datacreate = function(fillColor, lineColor, fillOpac, lineOpac, lineWidth, left, top, width, height, textMessaje, textSize, textFamily, imageHref, transform) {
  var svgNamespace = 'http://www.w3.org/2000/svg';
  var svg;
  svg = this.container.ownerDocument.createElementNS(svgNamespace, 'path');   
  svg.setAttributeNS(null, 'd', data);  	
  svg.setAttributeNS(null,'transform', "translate(0,0)"); 
  svg.style.position = 'absolute';  
  if (fillColor.length == 0){fillColor = 'none';}
  svg.setAttributeNS(null, 'fill', fillColor);
  if (lineColor.length == 0){lineColor = 'none';}
  svg.setAttributeNS(null, 'stroke', lineColor);
  svg.setAttributeNS(null, 'stroke-width', lineWidth); 
  this.svgRoot.appendChild(svg);
  return svg;
};

SVGRenderer.prototype.index = function(shape,order) {  
 
     if(order==-1)
      {
        this.svgRoot.appendChild( shape );
      }
      if(order==0){
     
         this.svgRoot.insertBefore( shape, shape.parentNode.firstChild );
      } 
 
   if(order==1 || order==2)
    {
         var id=shape.getAttributeNS(null, 'id');
        //alert(id);
        
        
        var numNodes=this.svgRoot.childNodes.length;
        //alert(numNodes);
          
        var num=0;
        for(var i = 1; i < numNodes; i++)
         {                                                   
           
           var etiq=this.svgRoot.childNodes[i].getAttributeNS(null, 'id');
           if (etiq==id)
            { 
                num=i; 
               
            }                                                    
          } 
          //alert(num);    
          if(order==1) 
           {   
              if((num-1)>=-1)
               {  
                this.svgRoot.insertBefore( shape, this.svgRoot.childNodes[num-1]);
               } 
           }
          if(order==2){ 
               if((num+1)<numNodes)
               {
                  this.svgRoot.insertBefore( shape, this.svgRoot.childNodes[num+2]);
               }
          } 
          
    } 
    
    
   /*var contshapes =  shape.parentNode.childNodes.length;       
   var elem1 = shape;//this.svgRoot.childNodes[1]; 
   var elem2 = shape.parentNode.childNodes[parseInt(contshapes-9)];
    var tmp = elem1.cloneNode( true );
    shape.parentNode.replaceChild( tmp, elem2 );
    shape.parentNode.replaceChild( elem2, elem1 ); 
    */
    //alert(elem2+' '+ elem1 ) 
    //return  elem2;
    
}
SVGRenderer.prototype.remove = function(shape) {
  //shape.parentNode.removeChild(shape);
  try{
  this.svgRoot.removeChild(shape);
  }catch(err){
  	//OMG!
  }
}

SVGRenderer.prototype.removeAll = function() {  
 while( this.svgRoot.hasChildNodes () ){
   this.svgRoot.removeChild( this.svgRoot.firstChild );
 }
   /*var contshapes =  this.svgRoot.childNodes.length;       
    
                          
    var cad=contshapes+'   ';
    for(var i = 0; i < contshapes; i++)
    {                                  
        //alert(i); 
        //cad+=i+'_'+this.svgRoot.childNodes[i].tagName+' ';
        if(this.svgRoot.childNodes[i].id) {
             this.svgRoot.removeChild(this.svgRoot.childNodes[i]);
         }else{
            //cad+=i+'_'+this.svgRoot.childNodes[i].id+' ';
         }
    } 
    //alert(cad);  
*/ 
}

SVGRenderer.prototype.copy = function(shape) 
 {
   var svg;
   svg =shape.cloneNode(false); 
    
    //svg.setAttributeNS(null, 'fill', "#aa00aa");
   return svg;
 };


SVGRenderer.prototype.paste = function(clipboard,left,top) 
 {
   //var svg;
   //svg =shape;
   //clipboard.setAttributeNS(null, 'fill', "#0000aa");
   //clipboard.setAttributeNS(null,'transform', "translate("+left+","+top+")"); 
   this.svgRoot.appendChild(clipboard);
  return clipboard;
 };


SVGRenderer.prototype.duplicate = function(shape) 
 {
   var svg;
   svg =shape.cloneNode(false);
   svg.setAttributeNS(null, 'fill', "#aa00aa");
   this.svgRoot.appendChild(svg);
  return svg;
 };

SVGRenderer.prototype.undo = function() 
 {
  this.svgRoot.removeChild( this.svgRoot.lastChild );
 };
 
 /* 
 function zSwap(parent, elem1, elem2)
{
   var tmp = elem1.cloneNode( true );
   parent.replaceChild( tmp, elem2 );
   parent.replaceChild( elem2, elem1 );
}

SVGRenderer.prototype.moveToTop( svgNode )
{
   this.svgRoot.appendChild( svgNode );
}


SVGRenderer.prototype.moveToBottom( svgNode )
{
   this.svgRoot.insertBefore( svgNode, svgNode.parentNode.firstChild );
}

*/




     
var xshe=0; //bad
var yshe=0;  
var isArc=false;
var contArc=0;
SVGRenderer.prototype.move = function(shape, left, top,fromX,fromY) {  
 //typeTransform='Translate';   
 
 var box = shape.getBBox(); 
 var angle=0;
 var dist=0;  
 var rotated=false;

  if (shape.hasAttributeNS(null,'transform')) { 
    var tran=shape.getAttributeNS(null, 'transform'); 
    //var h=shape.getAttributeNS(null, SVG_TRANSFORM_ROTATE ); 
    var rot= GetString(tran, 'rotate(', ',');
   
   var xy= GetString(tran, ',', ')');
     xy +=')';
   var x= GetString(xy, ' ', ', '); 
   var y= GetString(xy, x+', ', ')');      
   x= parseFloat(x); 
    y= parseFloat(y);  
    angle=parseFloat(rot);
    var centerx=box.x+(box.width/2);
    var centery=box.y+(box.height/2);  
    shape.setAttributeNS(null,'transform', 'rotate('+(angle)+', '+centerx+', '+centery+')'); 
   
    var angleRad=angle*Math.PI/180; 
   
   
      
   //dist=dist2p(x,y,left, top) ;
   dist=dist2p(x,y,left, top) ;
   rotated=true;
   
 }
 
    contmove++;

  if (shape.tagName == 'rect'){ 
  /* var dudy= shape.parentNode;  
   if(dudy.tagName=='g'){
      document.forms[0].code.value= 'this g ============ '; 
           shape.setAttributeNS(null, 'x', left);
           shape.setAttributeNS(null, 'y', top); 
 
           dudy.setAttributeNS(null, 'x', left);
           dudy.setAttributeNS(null, 'y', top); 
           dudy.childNodes[0].setAttributeNS(null, 'x', left);
           dudy.childNodes[0].setAttributeNS(null, 'y', top);
           
    }else{
     //document.forms[0].code.value= box.x+' '+box.y+' formX  Y'+ fromX+'_'+fromY+'  left '+left+'_'+top+'==============';     
     //document.forms[0].code.value+= tran+' rot '+ angle+'_'+x+'_'+y+' dist '+dist;   
     if(rotated){
          //shape.setAttributeNS(null, 'x', box.x*Math.cos(angleRad)) ;
         //shape.setAttributeNS(null, 'y', box.y*Math.sin(angleRad)) ;  
           shape.setAttributeNS(null, 'x', left);
           shape.setAttributeNS(null, 'y', top); 
  

     }else{ 
     */
      shape.setAttributeNS(null, 'x', left);
      shape.setAttributeNS(null, 'y', top); 
     //}
    //$('option_rect_trx').value= left;  
    //$('option_rect_try').value= top;    
       // var h=shape.getAttributeNS(null, 'height');   
       //var w=shape.getAttributeNS(null, 'width'); 
       //document.forms[0].code.value= h+' '+w;
   //}    
  } 
  if (shape.tagName == 'g')
   { 
   this.editor.log(shape.tagName+' ==============');  
   
    shape.setAttributeNS(null, 'x', left);
    shape.setAttributeNS(null, 'y', top);
    shape.childNodes[0].setAttributeNS(null, 'x', left + 'px');
    shape.childNodes[0].setAttributeNS(null, 'y', top + 'px');
    shape.childNodes[1].setAttributeNS(null, 'x', left + 'px');
    shape.childNodes[1].setAttributeNS(null, 'y', top + 'px');
    
   }
  if (shape.tagName == 'image'){
    shape.setAttributeNS(null, 'x', left + 'px');
    shape.setAttributeNS(null, 'y', top + 'px');
    //$('option_img_trx').value= left;  
    //$('option_img_try').value= top;
     var h=shape.getAttributeNS(null, 'height');   
     var w=shape.getAttributeNS(null, 'width'); 
     this.editor.log( h+' '+w);
  }
  if (shape.tagName == 'text'){  
   var size=parseFloat(shape.getAttributeNS(null, 'font-size')); 
   //$('code').value=size;
    shape.setAttributeNS(null, 'x', left + 'px');
    shape.setAttributeNS(null, 'y', parseFloat(top+size) + 'px');
    //$('option_text_trx').value= left;  
    //$('option_text_try').value= top;

  }
  if (shape.tagName == 'line'){ 
    var deltaX = shape.getBBox().width;
    var deltaY = shape.getBBox().height;
    shape.setAttributeNS(null, 'x1', left + 'px');
    shape.setAttributeNS(null, 'y1', top + 'px');

    shape.setAttributeNS(null, 'x2', left + deltaX + 'px');
    shape.setAttributeNS(null, 'y2', top + deltaY + 'px');   
    //$('option_line_trx').value= left;  
    //$('option_line_try').value= top;

  }   
  if (shape.tagName == 'ellipse'){  
    var putx=left + (shape.getBBox().width / 2)    
    var puty= top + (shape.getBBox().height / 2)
    shape.setAttributeNS(null, 'cx', putx + 'px');
    shape.setAttributeNS(null, 'cy', puty + 'px');
    //$('option_ellipse_trx').value= putx;  
    //$('option_ellipse_try').value= puty;

  }
  if (shape.tagName == 'path' || shape.tagName == 'polyline' ) {

   if(contmove==1){ 
      xshe=left;
      yshe=top; 
   }    
 var path=shape.getAttributeNS(null, 'd');
 path=path.replace(/, /g, ','); 
 path=path.replace(/ ,/g, ',');
 var ps =path.split(" ")
 var pcc = "";
 var point =ps[0].split(","); 


 var num0= parseFloat(point[0].substring(1));
 var num1= parseFloat(point[1]); 
 
 var ang= ang2v(box.x,box.y,left,top) ;
 var angle = Math.round((ang/Math.PI* 2)* 360);
 var angx = Math.cos(ang); 
 var angy = Math.sin(ang);          
 var dist= dist2p(left,top,box.x,box.y);
 var xinc=dist*angx;
 var yinc=dist*angy;   
    var re = /^[-]?\d*\.?\d*$/;
 for(var i = 0; i < ps.length; i++)
  { 
   if(ps[i].indexOf(',')>0){  
     
      var point =ps[i].split(","); 
       var char1=point[0].substring(0,1); 
       if(char1=='A' || char1=='a'){isArc=true; contArc=0;}
       if(isArc==true){contArc++}
       if(contArc==4){contArc=0; isArc=false}
       
       //if (isNaN(valnum)) 
      if (!char1.match(re))        
       { 
           var num0= parseFloat(point[0].substring(1));
           var text=char1;
       }else{ 
         if(isArc==true && contArc==2  )
          {
            var num0= point[0];
          }else{  
            var num0= parseFloat(point[0]);
          }  
         var text='';

       }
 
       
       if(isArc==true && contArc==2)
        {   
           point[1]= point[1].toString() ;
        }
        else
        {    
         
          num0+=xinc;    
          point[1]= parseFloat(point[1]);
          point[1]+=yinc;

        }  
        var cx=num0; 
         
        var cy=point[1]; 
        pcc+=text+cx+','+cy+' ';
   }else{
      pcc+=ps[i]+' ';
   }
  }
  
  shape.setAttributeNS(null,'d', pcc);

 }                                                                                                                            
                                                                                                                           
  
//$('status').innerHTML=typeTransform+': '+left+' '+top;
//$('option_select_trx').value= left;  
//$('option_select_try').value= top;  



};



SVGRenderer.prototype.track = function(shape) {
  // TODO
};


SVGRenderer.prototype.clic = function(shape) {
         var end='';
	if(data_path_close==true){end='z';}
        var maxcont=setPoints.length;
        var thispath='M'+setPoints[0]+' ';  
        //$('someinfo').value=maxcont;
      
        for(var conta=1;conta< maxcont;conta++){        
          thispath+='L'+setPoints[conta]+' ';
        }
              //var pointshape=shape.getAttributeNS(null,"d");
         	//shape.setAttributeNS(null,'d',thispath+end);
         	var path=thispath+end;
       
         	shape.setAttributeNS(null,'d',path);
          //      $('control_codebase').value=path;
 
}


SVGRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {

   var deltaX = toX - fromX;
  var deltaY = toY - fromY;  
  
     /*      if (lineColor.length == 0){lineColor = 'none';} 
           if (fillColor.length == 0){fillColor = 'none';}
           shape.style.fill = fillColor;  
           shape.style.stroke = lineColor;  
           shape.style.strokeWidth = lineWidth; 
           shape.style.fillOpacity = fillOpac;
           shape.style.strokOpacity = lineOpac;        
      */     
  if (shape.tagName == 'rect' ) 
   { 
    
 
      if (deltaX < 0) {
         shape.setAttributeNS(null, 'x', toX + 'px');
         shape.setAttributeNS(null, 'width', -deltaX + 'px');
       }
        else
       {
         shape.setAttributeNS(null, 'width', deltaX + 'px');
       }
  
      if (deltaY < 0) 
       {
        shape.setAttributeNS(null, 'y', toY + 'px');
        shape.setAttributeNS(null, 'height', -deltaY + 'px');
       }
        else 
       {
        shape.setAttributeNS(null, 'height', deltaY + 'px');
       }
      /*shape.style.fill = fillColor;  
      shape.style.stroke = lineColor;  
      shape.style.strokeWidth = lineWidth; 
      shape.style.fillOpacity = fillOpac;
      shape.style.strokOpacity = lineOpac;         
      */
      
    }
    
  /*  if ( shape.tagName == 'simage' ) 
    {   
        var img=shape.firstChild;//nodeName;//nodparseFloatue;//nodes.item(0);
        //alert(img);
      if (deltaX < 0) {
         shape.setAttributeNS(null, 'x', parseFloat(toX) + 'px');
         shape.setAttributeNS(null, 'width', parseFloat(-deltaX) + 'px');
         
       }
        else
       {
         shape.setAttributeNS(null, 'width', parseFloat(deltaX) + 'px');
       }
  
      if (deltaY < 0) 
       {
        shape.setAttributeNS(null, 'y', parseFloat(toY) + 'px');
        shape.setAttributeNS(null, 'height', parseFloat(-deltaY) + 'px');
       }
        else 
       {
        shape.setAttributeNS(null, 'height', parseFloat(deltaY) + 'px');
       }  
       var h=shape.getAttributeNS(null, 'height');   
       var w=shape.getAttributeNS(null, 'width'); 
       document.forms[0].code.value= h+' '+w;    
       
       
       
    }*/ 
   if (shape.tagName == 'g' || shape.tagName == 'image') 
    {
          

       if (deltaX < 0) 
        {  
          shape.setAttributeNS(null, 'x', parseFloat(toX) + 'px' );
          shape.setAttributeNS(null, 'width', parseFloat(-deltaX)  + 'px');


        }
         else
        {
          shape.setAttributeNS(null, 'width', parseFloat(deltaX)  + 'px');
         }
  
       if (deltaY < 0) 
        {
         shape.setAttributeNS(null, 'y', parseFloat(toY)  + 'px');
         shape.setAttributeNS(null, 'height', parseFloat(-deltaY) + 'px' );
        }
         else 
        {
         shape.setAttributeNS(null, 'height', parseFloat(deltaY) + 'px');
 
        }
     
   } 
  if (shape.tagName == 'ellipse') {
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
  if (shape.tagName == 'line') {
          shape.setAttributeNS(null, 'x2', toX);
          shape.setAttributeNS(null, 'y2', toY);
  } 
  if (shape.tagName == 'polyline') {    
        
       xpArray.push(toX);
          ypArray.push(toY);  
                   var thispath=''+xpArray[1]+','+ypArray[1];  
 		    var thispath1=''; 
		    var thispath2='';
                  var maxcont=xpArray.length;
      
        for(var conta=2;conta< maxcont;conta++){        
          thispath1+=' '+xpArray[conta]+' '+ypArray[conta];
          thispath2+=' '+xpArray[conta]+', '+ypArray[conta];  
	
        }

       
		shape.setAttributeNS(null,'points',thispath+thispath1);
	
	
    }    
    
  if (shape.tagName == 'path') {
        
    if (selectmode == 'controlpath')
     {   
                var end='';
	if(data_path_close==true){end='z';}

        var thispath='M'+setPoints[0]+' ';  
        var maxcont=setPoints.length;
      
        for(var conta=1;conta< maxcont;conta++){        
          thispath+='L'+setPoints[conta]+' ';
          
	
        }                               
        var path=thispath+'L'+toX+','+toY+end;
          //var pointshape=shape.getAttributeNS(null,"d");
         	shape.setAttributeNS(null,'d',path);
               //document.forms[0].control_codebase.value=path;
     }
      else
     { 
  
	  xpArray.push(toX);
          ypArray.push(toY);  
  
                    var thispath=''+xpArray[1]+','+ypArray[1];  
 		    var thispath1=''; 
		    var thispath2='';
                  var maxcont=xpArray.length;
      
        for(var conta=2;conta< maxcont;conta++){        
          //thispath1+=' '+xpArray[conta]+' '+ypArray[conta];
          thispath2+=' '+xpArray[conta]+','+ypArray[conta];  
	  //if((conta+2)%3==0){thispath2+=' C';}
        }
        var end='';
	if(data_path_close==true){end='z';}
		shape.setAttributeNS(null,'d','M '+thispath+ ' L'+thispath2+end);
       
       
          
      /*      
  
           var pointshape=shape.getAttributeNS(null,"points");
          var thispoint=' '+toX+' '+toY;  
             $('status').innerHTML =pointshape; 
        shape.setAttributeNS(null,'points',pointshape+thispoint)
        shape.setAttributeNS(null, 'stroke-width', "25");  
        shape.setAttributeNS(null, 'fill', "#FFFF00");
    
    //shape.points.push(toX);
    //shape.points.push(toY);
    //shape.setAttribute("points",pointshape+);      
         // var maxcont=xpArray.length-1;
          var thispath=''+xpArray[1]+','+ypArray[1];  
       var maxcont=xpArray.length;
       //alert(maxcont);
        for(var conta=2;conta< maxcont;conta++){        
          thispath+=','+xpArray[conta]+','+ypArray[conta]; 
        }
        //alert(shape.points[1]);
    //shape.setAttribute("points",thispath);       
    //points.Value = thispath;       
      var thispath=''+xpArray[1]+','+ypArray[1];  
       var maxcont=xpArray.length;
       //alert(maxcont);
        for(var conta=1;conta< maxcont;conta++){        
          thispath+=','+xpArray[conta]+','+ypArray[conta];
        }
        
        shape.points.Value = thispath;
        */  
          
          
     
  
        /*
 
          
       //this.renderer.move(this.selected, this.selectedBounds.x + deltaX, this.selectedBounds.y + deltaY); 
       // shape.setAttributeNS(null,'transform', "translate("+(toX)+","+(toy)+")");

        
       
         var thispath=''+xpArray[0]+','+ypArray[0]; 
       var maxcont=xpArray.length;
        //shape.setAttributeNS(null,'transform', "translate("+toX+","+toY+")");
        for(var conta=1;conta< maxcont;conta++){        
          thispath+=','+xpArray[conta]+','+ypArray[conta];
        }
           
        shape.setAttributeNS(null, 'x', toX);
        shape.setAttributeNS(null, 'y', toY);
     shape.setAttributeNS(null, 'points', thispath);
      */
    }  
  } 
  if (shape == 'text') {}  
    
}; 
SVGRenderer.prototype.tocurve = function()  
{
  var points=$('control_codebase').value.split('L');
     var chain='';
     chain+=points[0]+'C';
     var numpoints=points.length-1;
     for(var a=1;a<numpoints;a++)
      {
       if(a%3==0)
        { 
         chain+=points[a]+'C';
        }
         else
        {
         chain+=points[a];       
        } 
      } 
      if(numpoints%3==0){
        chain+=points[numpoints]+'';
      } 
      if(numpoints%3==2){
        chain+=points[numpoints-1]+'';
        chain+=points[numpoints]+'';
      } 
      if(numpoints%3==1){ 
        chain+=points[numpoints-1]+'';
        chain+=points[numpoints-1]+'';
        chain+=points[numpoints]+'';
      } 
      if(numpoints%3==3){ 
        chain+=points[numpoints-1]+'';
        chain+=points[numpoints-1]+'';
        chain+=points[numpoints-1]+'';
        chain+=points[numpoints]+'';
      } 

//       $('someinfo').value=numpoints+ ' '+ numpoints%3;
//       $('control_codebase').value=chain; 
      setShape(); 
 }; 
SVGRenderer.prototype.info = function(shape)
{   
 var shInfo = {};
if(shape.id != "tracker"){
 //shInfo.id = shape.id.substr(6); 
 shInfo.id =shape.getAttribute('id');
 shInfo.type = shape.tagName;
 if (shape.hasAttributeNS(null,'transform')) { 
     shInfo.transform = shape.getAttribute('transform');
  }else{
     shInfo.transform ='';
  }   
 
  if(shape.tagName == "text"){   
 
   shInfo.textFamily = shape.getAttribute('font-family')
   shInfo.textSize = parseInt(shape.getAttribute('font-size'))
   shInfo.top = parseFloat(shape.getAttribute('y'))
   shInfo.left = parseFloat(shape.getAttribute('x'))
   shInfo.text = shape.textContent 
   shInfo.lineWidth = parseFloat(shape.getAttribute('stroke-width'))

   //shInfo.text = shape.nodparseFloatue;
   }
      
 
 if(shape.tagName !='image' || shape.tagName !='g' || shape.tagName !='stop')
  {
    shInfo.fillColor = shape.getAttribute('fill')
    shInfo.lineColor = shape.getAttribute('stroke')  
    shInfo.fillOpac = parseFloat(shape.getAttribute('fill-opacity'))
    shInfo.lineOpac = parseFloat(shape.getAttribute('stroke-opacity'))
    shInfo.lineWidth = parseFloat(shape.getAttribute('stroke-width'))
    
    var mystyle= shape.getAttribute('style'); 
    
    if(mystyle!= null && mystyle.indexOf('<![CDATA[')>=0)
     {
      
     }
      else
     {
      // shInfo.style=shape.getAttribute('style');
     
    if(mystyle!= null){
      //var estilo=shape.getAttribute('style');
      var data;  
   
      var estilo=generateJSON(mystyle);
      eval("data="+estilo);
      //var data=eval('"'+estilo+'"'); 
      //var data=estilo.evalJSON(); 
    
      (data["font-size"])?shInfo.textSize=data["font-size"]:shInfo.textSize; 
      (data["font-family"])?shInfo.textFamily=data["font-family"]:shInfo.textFamily; 
      
      (data.fill)?shInfo.fillColor=data.fill:shInfo.fillColor; 
      (data.stroke)?shInfo.lineColor=data.stroke:shInfo.lineColor;
      (data.transform)?shInfo.transform=data.transform:shInfo.transform;
      (data["fill-opacity"])?shInfo.fillOpac=data["fill-opacity"]:shInfo.fillOpac; 
       //shInfo.fillColor=data.fill;
      //document.getElementById("someinfo").value +=data.fill+' ';//estilo ;//data['fill']+' ';//
    }
   }
  }  
 
 
 if (shape.tagName == 'rect') 
   {
   if(shape.getAttribute('rx') || shape.getAttribute('ry')){
   shInfo.type = "roundrect";
   shInfo.rx = parseFloat(shape.getAttribute('rx'))
   shInfo.ry = parseFloat(shape.getAttribute('rx'))
   }
    shInfo.left = parseFloat(shape.getAttribute( 'x'));
    shInfo.top = parseFloat(shape.getAttribute( 'y'));
    shInfo.width = parseFloat(shape.getAttribute('width'));
    shInfo.height = parseFloat(shape.getAttribute('height'));  
   }
  else if (shape.tagName == 'ellipse' || shape.tagName == 'circle') 
   {     
    if(shape.tagName == 'circle'){
      shInfo.width = parseFloat(shape.getAttribute('r'))*2; 
      shInfo.height = parseFloat(shape.getAttribute('r'))*2; 
     }else{
      shInfo.width = parseFloat(shape.getAttribute('rx'))*2;
      shInfo.height = parseFloat(shape.getAttribute('ry'))*2;   
     }
    
    shInfo.left =    parseFloat(shape.getAttribute('cx')) - (shInfo.width/2);
    shInfo.top =  parseFloat(shape.getAttribute('cy')) - (shInfo.height/2)  ;
   }
   else if(shape.tagName == 'linearGradient') {   
    shInfo.left = (shape.getAttribute( 'x1'));
    shInfo.top = parseFloat(shape.getAttribute( 'y1'));
    shInfo.width = parseFloat(shape.getAttribute('x2'));
    shInfo.height = parseFloat(shape.getAttribute('y2'));  

   }
   else if(shape.tagName == 'stop') {
    shInfo.fillColor = shape.getAttribute('stop-color');
    shInfo.fillOpac = shape.getAttribute('stop-opacity');
    shInfo.lineOpac = shape.getAttribute('offset');
    var mystyle= shape.getAttribute('style');
    if(mystyle!= null && mystyle.indexOf('<![CDATA[')>=0)
     {
      
     }
      else
     {
    if(mystyle!= null){
      var data;  
      var estilo=generateJSON(mystyle);
      eval("data="+estilo);
      (data["stop-color"])?shInfo.fillColor=data["stop-color"]:shInfo.fillColor;
      (data["stop-opacity"])?shInfo.fillOpac=data["stop-opacity"]:shInfo.fillOpac;
      document.getElementById("someinfo").value +=data["stop-color"]+' '; 
     } 
     
    }
   }
  else if (shape.tagName == 'line') 
   {
    shInfo.left = parseFloat(shape.getAttribute('x1'));
    shInfo.top = parseFloat(shape.getAttribute('y1'));
    shInfo.width = parseFloat(shape.getAttribute('x2')) -shInfo.left;
    shInfo.height = parseFloat(shape.getAttribute('y2')) -shInfo.top;
   } 
  else if (shape.tagName == 'polyline') 
   {
    shInfo.points = shape.getAttribute('points');
   } 
  else if (shape.tagName == 'g') 
   { 
    shInfo.type = "group";
    shInfo.left = parseFloat(shape.getAttribute( 'x'));
    shInfo.top = parseFloat(shape.getAttribute( 'y'));
    shInfo.width = parseFloat(shape.getAttribute('width'));
    shInfo.height = parseFloat(shape.getAttribute('height'));  
    shInfo.fillColor = shape.getAttribute('fill')

   }   
  else if (shape.tagName == 'path')
   {
    shInfo.points = shape.getAttribute('d');     
    //shInfo.transform = shape.getAttribute('transform'); 
 
    //alert(shInfo.transform);
    //document.forms[0].codebase.value=shape.getAttribute('d'); 
   
   }
  else 
  
 
  if (shape.tagName == 'image')
   {                                     
    
    shInfo.left = parseFloat(shape.getAttribute( 'x'));
    shInfo.top = parseFloat(shape.getAttribute( 'y'));
    shInfo.width = parseFloat(shape.getAttribute('width'));
    shInfo.height = parseFloat(shape.getAttribute('height'));   
    shInfo.fillOpac = parseFloat(shape.getAttribute('opacity'));   
    shInfo.href = shape.getAttribute('href');  
     
  } 
  if(shape.parentNode.tagName != 'svg'){
    //shInfo.width = parseFloat(shape.getAttribute('width'));
    //shInfo.height = parseFloat(shape.getAttribute('height'));   
    //shInfo.viewBox = parseFloat(shape.getAttribute('viewBox'));   
    shInfo.parent=shape.parentNode.getAttribute('id');

  }
    return shInfo;  
  }else{
   //do nothing if its the tracker
   }
  
   	
   	
};     
SVGRenderer.prototype.info01 = function(shape)
{   

var shInfo = {};
if(shape.id != "tracker"){
shInfo.id = shape.id.substr(6);
 shInfo.type = shape.tagName;
 if (shape.hasAttributeNS(null,'transform')) { 
     shInfo.transform = shape.getAttribute('transform');
  }else{
     shInfo.transform ='';
  }   
     
 
 if(shape.tagName !='image')
  {
    shInfo.fillColor = shape.getAttribute('fill')
    shInfo.lineColor = shape.getAttribute('stroke')  
    shInfo.fillOpac = parseFloat(shape.getAttribute('fill-opacity'))
    shInfo.lineOpac = parseFloat(shape.getAttribute('stroke-opacity'))
    shInfo.lineWidth = parseFloat(shape.getAttribute('stroke-width'))
  }  
 
 
 if (shape.tagName == 'rect') 
   {
   if(shape.getAttribute('rx') || shape.getAttribute('ry')){
   shInfo.type = "roundrect";
   shInfo.rx = parseFloat(shape.getAttribute('rx'))
   shInfo.ry = parseFloat(shape.getAttribute('rx'))
   }
    shInfo.left = parseFloat(shape.getAttribute( 'x'));
    shInfo.top = parseFloat(shape.getAttribute( 'y'));
    shInfo.width = parseFloat(shape.getAttribute('width'));
    shInfo.height = parseFloat(shape.getAttribute('height'));  
   }
  else if (shape.tagName == 'ellipse') 
   {
    shInfo.width = parseFloat(shape.getAttribute('rx'))*2;
    shInfo.height = parseFloat(shape.getAttribute('ry'))*2;   
    shInfo.left =    parseFloat(shape.getAttribute('cx')) - (shInfo.width/2);
    shInfo.top =  parseFloat(shape.getAttribute('cy')) - (shInfo.height/2)  ;
 
   }
  else if (shape.tagName == 'line') 
   {
    shInfo.left = parseFloat(shape.getAttribute('x1'));
    shInfo.top = parseFloat(shape.getAttribute('y1'));
    shInfo.width = parseFloat(shape.getAttribute('x2')) -shInfo.left;
    shInfo.height = parseFloat(shape.getAttribute('y2')) -shInfo.top;
   } 
  else if (shape.tagName == 'polyline') 
   {
    shInfo.points = shape.getAttribute('points');
   }
  else 
  
  if (shape.tagName == 'path')
   {
    shInfo.d = shape.getAttribute('d');     
    //shInfo.transform = shape.getAttribute('transform'); 
 
    //alert(shInfo.transform);
    //document.forms[0].codebase.value=shape.getAttribute('d'); 
   
   }
  else 
  
  if(shape.tagName == "text"){   
 
   shInfo.textFamily = shape.getAttribute('font-family')
   shInfo.textSize = parseInt(shape.getAttribute('font-size'))
   shInfo.top = parseFloat(shape.getAttribute('y'))
   shInfo.left = parseFloat(shape.getAttribute('x'))
   shInfo.text = shape.textContent 
   shInfo.lineWidth = parseFloat(shape.getAttribute('stroke-width'))

   //shInfo.text = shape.nodparseFloatue;
   }
  else
 
  if (shape.tagName == 'image')
   {                                     
    
    shInfo.left = parseFloat(shape.getAttribute( 'x'));
    shInfo.top = parseFloat(shape.getAttribute( 'y'));
    shInfo.width = parseFloat(shape.getAttribute('width'));
    shInfo.height = parseFloat(shape.getAttribute('height'));   
    shInfo.fillOpac = parseFloat(shape.getAttribute('opacity'));   
    shInfo.href = shape.getAttribute('href');  
     
  }
  
    return shInfo;  
  }else{
   //do nothing if its the tracker
   }

   	
}





SVGRenderer.prototype.transformShape = function(shape,data,transform)
{      
  var svgNamespace = 'http://www.w3.org/2000/svg'; 
  var xlinkNS="http://www.w3.org/1999/xlink"; 
   //
 
 if(shape.tagName == 'rect')
  { 
    var box = shape.getBBox();
    var sdata=data.split(';'); 
    
    //alert(data[0]);     
    shape.setAttributeNS(null,'x',parseFloat(sdata[0]));
    shape.setAttributeNS(null,'y',parseFloat(sdata[1]));   
    shape.setAttributeNS(null, 'width', parseFloat(sdata[2]));     
    shape.setAttributeNS(null, 'height', parseFloat(sdata[3])); 
    var centerx=parseFloat(sdata[0])+parseFloat(box.width/2);
    var centery=parseFloat(sdata[1])+parseFloat(box.height/2);    
    shape.setAttributeNS(null, 'transform','rotate('+parseFloat(sdata[4])+','+centerx+','+centery+')');
    
   //shape.nodparseFloatue=data;
  }
   else 
 if(shape.tagName == 'text')
  {    
    if(data.indexOf('<;>',0)==-1 )
     {  
      shape.textContent = data;  
     }
      else
     {  
       var sdata=data.split('<;>'); //?????????
       shape.textContent = sdata[0]; 
       shape.setAttributeNS(null,'font-size',parseFloat(sdata[1])); 
        shape.setAttributeNS(null,'font-family',sdata[2]);
     }
   //shape.nodparseFloatue=data;
  }
   else
 if (shape.tagName == 'polyline') 
  {
    shape.setAttributeNS(null,'points',data);
  }
   else 
 if (shape.tagName == 'image') 
  {   
    //alert(data);  
    if(data.indexOf(';',0)==-1 )
     {  
      shape.setAttributeNS(xlinkNS,'href',data);
     }
      else
     {  
        var box = shape.getBBox();
        var sdata=data.split(';');
        shape.setAttributeNS(null,'x',parseFloat(sdata[0]));
        shape.setAttributeNS(null,'y',parseFloat(sdata[1]));   
        shape.setAttributeNS(null, 'width', parseFloat(sdata[2])); 
        shape.setAttributeNS(null, 'height',parseFloat(sdata[3]));  
        var centerx=parseFloat(sdata[0])+parseFloat(box.width/2);
        var centery=parseFloat(sdata[1])+parseFloat(box.height/2);    
        shape.setAttributeNS(null, 'transform',' rotate('+parseFloat(sdata[4])+','+centerx+','+centery+')');


     } 
      
  }
   else 
 if (shape.tagName == 'path')
  {     
    if(data.indexOf(';',0)==-1 )
     {  
    	shape.setAttributeNS(null, 'd', data);  
    	shape.setAttributeNS(null, 'transform', transform);  
     }
      else
     {  
        var box = shape.getBBox();
        var sdata=data.split(';');
        var centerx=parseFloat(sdata[0])+parseFloat(box.width/2);
        var centery=parseFloat(sdata[1])+parseFloat(box.height/2);    
        shape.setAttributeNS(null, 'transform','scale('+parseFloat(sdata[2])+','+parseFloat(sdata[3])+')'+' rotate('+parseFloat(sdata[4])+','+centerx+','+centery+')'+' translate('+parseFloat(sdata[0])+','+parseFloat(sdata[1])+')');


     } 
  }  
   	                             
	                             
}
SVGRenderer.prototype.editShape = function(shape,data)
{   
 if(shape.tagName == 'text'){
   shape.textContent = data
 }else
   if (shape.tagName == 'polyline') 
   {
    shape.setAttributeNS(null,'points',data);
   }
  else 
  
  if (shape.tagName == 'path')
   {
    	shape.setAttributeNS(null, 'd', data);  
    	
   }  
	
}
SVGRenderer.prototype.editCommand = function(shape, cmd, value)
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
    else if (cmd == 'fillopacity') {
           if(shape.tagName=='image')
            {
             shape.setAttributeNS(null, 'opacity', parseFloat(value));
            }
             else
            {
                shape.setAttributeNS(null, 'fill-opacity', parseFloat(value));
            }    
      
    }
    else if (cmd == 'lineopacity') {         
      
      shape.setAttributeNS(null, 'stroke-opacity', parseFloat(value));
      
    }

  }
}


SVGRenderer.prototype.queryCommand = function(shape, cmd)
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
    else if (cmd == 'fillopacity') {
           if(shape.tagName=='image')
            {
             shape.setAttributeNS(null, 'opacity', parseFloat(value));
            }
             else
            {
                shape.setAttributeNS(null, 'fill-opacity', parseFloat(value));
            }    
      
    }
    else if (cmd == 'lineopacity') {         
      
      shape.setAttributeNS(null, 'stroke-opacity', parseFloat(value));
      
    }

  }
  
  return result;
}

SVGRenderer.prototype.getProperties = function(shape){}


SVGRenderer.prototype.showMultiSelect = function(iniX,iniY) { 
  var tracker = document.getElementById('trackerMultiSelect');
  if (tracker) {
    this.remove(tracker);
  }
  
  var coord=this.editor.inputxy;
	toX=parseFloat(coord[0]);
	toY=parseFloat(coord[1]); 
	
    tracker = document.createElementNS(svgNamespace, 'rect'); 
      
    tracker.setAttributeNS(null, 'x', iniX);
    tracker.setAttributeNS(null, 'y', iniY);    
  tracker.setAttributeNS(null, 'width', toX);
  tracker.setAttributeNS(null, 'height', toY);
  tracker.setAttributeNS(null, 'fill', '#ffffff');
  tracker.setAttributeNS(null, 'stroke', 'green');
  tracker.setAttributeNS(null, 'stroke-width', '1');  
  
   this.svgRoot.appendChild(tracker);     
}


function mouseCoord()
{                                           
   var coord=this.editor.inputxy;
   coord[0]=parseFloat(coord[0]);
   coord[1]=parseFloat(coord[1]); 
   return coord
} 
/*
function nodeHit(node)
{                                           
   node.addEventListener("mousemove", function(event) {nodeMove(node)}, false);            
  
}

function nodeUp(node)
{                                           
   //node.stopObserving("mousemove");
}                                                                             

function nodeMove(node)
{                                           
   var mypath=$('control_codebase').value; 
   var  x= $('option_path_x').value;
   var y= $('option_path_y').value; 
   var precoord=x+','+y; 
    var coord=mouseCoord(); 
   node.setAttributeNS(null, 'x', coord[0]-2); 
   node.setAttributeNS(null, 'y', coord[1]-2); 

   $('option_path_x').value=parseFloat(node.getAttributeNS(null,'x'))+2; 
   $('option_path_y').value=parseFloat(node.getAttributeNS(null,'y'))+2; 
   
    var  cadx= $('option_path_x').value;
    var cady= $('option_path_y').value; 
    var coord=cadx+','+cady;
          var cad1=new RegExp(precoord,"g");
      
      
      var result=mypath.replace(cad1, coord);
      
     
      $('control_codebase').value=result; 
      
      $('someinfo').value=precoord;
      setShape();

    
    
} 
*/                                                                              
var memoNode=null; 
var memoPrevControl=new Array();
var memoNextControl=new Array();
SVGRenderer.prototype.nodeMove = function(newx,newy) { 
    var mypath=$('control_codebase').value; 
   var  x= $('option_path_x').value;
   var y= $('option_path_y').value; 
   var precoord=x+','+y; 
   
   $('option_path_x').value=newx; 
   $('option_path_y').value=newy; 
    
      var  cadx= newx;
      var cady= newy; 
  
      var coord=cadx+','+cady;
          var cad1=new RegExp(precoord,"g");
      
      
      var result=mypath.replace(cad1, coord);
      
     
      //$('control_codebase').value=result; 
      
      //$('someinfo').value=precoord;
      setShape();

}

function drawNodeControl(svg,numId){

      var svgNamespace = 'http://www.w3.org/2000/svg';
      var color1='#0066ff';          
           // if(parseInt(memoNode.id)==a){   
                   
                   var pointprev=memoPrevControl[numId].split(',');
            
                  var controlNode1 = document.createElementNS(svgNamespace, 'rect'); 
                  controlNode1.setAttributeNS(null, 'x', pointprev[0]-2);
                  controlNode1.setAttributeNS(null, 'y', pointprev[1]-2);
          
                  controlNode1.setAttributeNS(null, 'width', 4);
                  controlNode1.setAttributeNS(null, 'height', 4);
                  controlNode1.setAttributeNS(null, 'fill', color1);
                  controlNode1.setAttributeNS(null, 'stroke', '#000000');
                  controlNode1.setAttributeNS(null, 'stroke-width', '0'); 
                  controlNode1.setAttributeNS(null, 'id', 'controlNode1'); 
                  controlNode1.addEventListener("mousedown", function(event) {if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} memoNode=this; this.setAttributeNS(null, 'fill-color', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2;  }, false);
                  svg.appendChild(controlNode1);  
                  
                   var pointnext=memoNextControl[numId].split(',');
                  
               
                  var controlNode2 = document.createElementNS(svgNamespace, 'rect'); 
                  controlNode2.setAttributeNS(null, 'x', pointnext[0]-2);
                  controlNode2.setAttributeNS(null, 'y', pointnext[1]-2);
          
                  controlNode2.setAttributeNS(null, 'width', 4);
                  controlNode2.setAttributeNS(null, 'height', 4);
                  controlNode2.setAttributeNS(null, 'fill', color1);
                  controlNode2.setAttributeNS(null, 'stroke', '#000000');
                  controlNode2.setAttributeNS(null, 'stroke-width', '0'); 
                  controlNode2.setAttributeNS(null, 'id', 'controlNode1'); 
                  controlNode2.addEventListener("mousedown", function(event) {if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} memoNode=this; this.setAttributeNS(null, 'fill-color', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2;  }, false);
                  svg.appendChild(controlNode2);  

            //}


}  
                                                                   
SVGRenderer.prototype.showNodesCurve = function(path,controlNodeNum){ 
     memoNextControl=new Array();
     memoPrevControl=new Array();
     var svgNamespace = 'http://www.w3.org/2000/svg';
    // tracker = document.createElementNS(svgNamespace, 'g');   
     var svg = this.container.ownerDocument.createElementNS(svgNamespace, 'g'); 
      svg.setAttributeNS(null, 'id', 'editNodesPath'); 

     /* var group = document.getElementById('editNodesPath');
      if (group) 
       {
           this.remove(group);
       }
       */

  var points=path.split(' ');
     var chain='';
     var segment=' ';  
     prevControl=' ';
     nextControl=' ';
     nodePoint=' ';
      var init=points[0].split('M'); 
      var allcoords=init[1].split(' ');
      var point=allcoords[0].split(',');
          var rect1 = document.createElementNS(svgNamespace, 'rect');  
        rect1.setAttributeNS(null, 'x', point[0]-2);
        rect1.setAttributeNS(null, 'y', point[1]-2);
          
        rect1.setAttributeNS(null, 'width', 4);
        rect1.setAttributeNS(null, 'height', 4);
        rect1.setAttributeNS(null, 'fill', '#ff7700');
        rect1.setAttributeNS(null, 'stroke', '#000000');
        rect1.setAttributeNS(null, 'stroke-width', '0');  
        rect1.setAttributeNS(null, 'id', '0'); 
        //rect1.addEventListener("mouseover", function(event) {this.setAttributeNS(null, 'stroke-width', 1 ); }, false);
      rect1.addEventListener("mousedown", function(event) {if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} memoNode=this; this.setAttributeNS(null, 'fill-color', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2;  }, false);

        //rect1.addEventListener("mouseout", function(event) {this.setAttributeNS(null, 'stroke-width', 0 );}, false);

        svg.appendChild(rect1);                                    
      
          if(controlNodeNum==0){ var color='#ffff00';}  
         if(controlNodeNum==1){var color='#00ffff';}  
         if(controlNodeNum==2){var color='#00cc00';}  
         var color1='#ffff00';
      
     var numpoints=points.length-1;  
     var recalls='';
     var re = /^[-]?\d*\.?\d*$/;
     for(var a=1;a<=numpoints;a++)
      { 
        
        var ini=points[a].substring(0,1);
        if (!ini.match(re))        
        {                          
          var end=points[a].substring(1); 
          color='#0000ff';
          if(ini=='L' || ini=='M')
           {
             color='#ffff00';
           }
          
          if(ini=='C')
          { 
             recall=a+2;
             //color='#ffff00';
          }

        }else
        { 
          var end=points[a];
          var ini='';  
          color='#ff00ff'; 
          if(a==recalls)
          { 
             color='#ffff00';
          }
        } 
        
            
        //segment=points[a].split(',');
         /*prevControl=segment[0]+' '; 
         nextControl=segment[1]+' '; 
         nodePoint=segment[2]+' ';     
         memoPrevControl[a]=prevControl;
         memoNextControl[a]=nextControl;
         if(controlNodeNum==0){chain+=prevControl; var point=prevControl.split(',');}  
         if(controlNodeNum==1){chain+=nextControl; var point=nextControl.split(',');}  
         if(controlNodeNum==2){chain+=nodePoint; var point=nodePoint.split(',');}  
         if(controlNodeNum==3){chain+=nodePoint; var point=nodePoint.split(',');}
           
         */    
               //if (isNaN(valnum))         

         //if(ini=='C'){color='#ff00ff';}
         
         var point=end.split(',');
         if(memoNode!=null){
         }
          var rect1 = document.createElementNS(svgNamespace, 'rect');  
        rect1.setAttributeNS(null, 'x', point[0]-2);
        rect1.setAttributeNS(null, 'y', point[1]-2);
          
        rect1.setAttributeNS(null, 'width', 4);
        rect1.setAttributeNS(null, 'height', 4);
        rect1.setAttributeNS(null, 'fill', color);
        rect1.setAttributeNS(null, 'stroke', '#000000');
        rect1.setAttributeNS(null, 'stroke-width', '0'); 
        rect1.setAttributeNS(null, 'id', ''+a); 
        rect1.addEventListener("mousedown", function(event) {if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );}drawNodeControl(svg,this.getAttributeNS(null,'id')); memoNode=this; this.setAttributeNS(null, 'fill-color', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2;  }, false);

        //rect1.addEventListener("mouseover", function(event) {this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2; }, false);
        // rect1.addEventListener("mousedown", function(event) {nodeHit(this);if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} memoNode=this; this.setAttributeNS(null, 'fill-color', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2; document.forms[0].option_path_x.focus(); }, false);
         //rect1.addEventListener("mousedown", function(event) { if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} nodeHit(this); memoNode=this;this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2; }, false);
         //rect1.addEventListener("mousedown", function(event) {if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} addControlPoints(segment[0],segment[1],svg); memoNode=this; this.setAttributeNS(null, 'fillColor', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2; }, false);
         //rect1.addEventListener("mouseup", function(event) {nodeUp(this); }, false);
         //rect1.addEventListener("mouseover", function(event) {this.setAttributeNS(null, 'fillColor', '#ffcc00' ); }, false);
         //rect1.addEventListener("mouseout", function(event) {this.setAttributeNS(null, 'fillColor', '#00cc00' ); }, false);
         

         //rect1.addEventListener("mouseout", function(event) {this.setAttributeNS(null, 'stroke-width', 0 ); }, false);

        svg.appendChild(rect1);                                    
         
      }                     
      var info='';
       
         if(controlNodeNum==0){info='prev Control'}  
         if(controlNodeNum==1){info='next Control'}  
         if(controlNodeNum==2){info='points node'}   
        // $('someinfo').value=numpoints+ ' '+info+':'+ chain;
//         $('someinfo').value='Crtl+Arrow to move';
    //return chain;                                          
    

      //this.svgRoot.appendChild(svg);   
    
    return svg;  
        
};

SVGRenderer.prototype.showNodesCurve1 = function(path,controlNodeNum){ 
     memoNextControl=new Array();
     memoPrevControl=new Array();
     var svgNamespace = 'http://www.w3.org/2000/svg';
    // tracker = document.createElementNS(svgNamespace, 'g');   
     var svg = this.container.ownerDocument.createElementNS(svgNamespace, 'g'); 
      svg.setAttributeNS(null, 'id', 'editNodesPath'); 

     /* var group = document.getElementById('editNodesPath');
      if (group) 
       {
           this.remove(group);
       }
       */

  var points=path.split('C');
     var chain='';
     var segment=' ';  
     prevControl=' ';
     nextControl=' ';
     nodePoint=' ';
      var init=points[0].split('M'); 
      var allcoords=init[1].split(' ');
      var point=allcoords[0].split(',');
          var rect1 = document.createElementNS(svgNamespace, 'rect');  
        rect1.setAttributeNS(null, 'x', point[0]-2);
        rect1.setAttributeNS(null, 'y', point[1]-2);
          
        rect1.setAttributeNS(null, 'width', 4);
        rect1.setAttributeNS(null, 'height', 4);
        rect1.setAttributeNS(null, 'fill', '#ff7700');
        rect1.setAttributeNS(null, 'stroke', '#000000');
        rect1.setAttributeNS(null, 'stroke-width', '0');  
        rect1.setAttributeNS(null, 'id', '0'); 
        //rect1.addEventListener("mouseover", function(event) {this.setAttributeNS(null, 'stroke-width', 1 ); }, false);
        rect1.addEventListener("mousedown", function(event) {if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} memoNode=this; this.setAttributeNS(null, 'fill-color', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2;  }, false);

        //rect1.addEventListener("mouseout", function(event) {this.setAttributeNS(null, 'stroke-width', 0 );}, false);

        svg.appendChild(rect1);                                    
      
          if(controlNodeNum==0){ var color='#ffff00';}  
         if(controlNodeNum==1){var color='#00ffff';}  
         if(controlNodeNum==2){var color='#00cc00';}  
         var color1='#ffff00';
      
     var numpoints=points.length-1;
     for(var a=1;a<=numpoints;a++)
      { 
        
        
            
        segment=points[a].split(' ');
         prevControl=segment[0]+' '; 
         nextControl=segment[1]+' '; 
         nodePoint=segment[2]+' ';     
         memoPrevControl[a]=prevControl;
         memoNextControl[a]=nextControl;
         if(controlNodeNum==0){chain+=prevControl; var point=prevControl.split(',');}  
         if(controlNodeNum==1){chain+=nextControl; var point=nextControl.split(',');}  
         if(controlNodeNum==2){chain+=nodePoint; var point=nodePoint.split(',');}  
         if(controlNodeNum==3){chain+=nodePoint; var point=nodePoint.split(',');}  
      
         if(memoNode!=null){
         }
          var rect1 = document.createElementNS(svgNamespace, 'rect');  
        rect1.setAttributeNS(null, 'x', point[0]-2);
        rect1.setAttributeNS(null, 'y', point[1]-2);
          
        rect1.setAttributeNS(null, 'width', 4);
        rect1.setAttributeNS(null, 'height', 4);
        rect1.setAttributeNS(null, 'fill', color);
        rect1.setAttributeNS(null, 'stroke', '#000000');
        rect1.setAttributeNS(null, 'stroke-width', '0'); 
        rect1.setAttributeNS(null, 'id', ''+a); 
        rect1.addEventListener("mousedown", function(event) {if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );}drawNodeControl(svg,this.getAttributeNS(null,'id')); memoNode=this; this.setAttributeNS(null, 'fill-color', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2;  }, false);

        //rect1.addEventListener("mouseover", function(event) {this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2; }, false);
        // rect1.addEventListener("mousedown", function(event) {nodeHit(this);if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} memoNode=this; this.setAttributeNS(null, 'fill-color', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2; document.forms[0].option_path_x.focus(); }, false);
         //rect1.addEventListener("mousedown", function(event) { if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} nodeHit(this); memoNode=this;this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2; }, false);
         //rect1.addEventListener("mousedown", function(event) {if(memoNode != null){memoNode.setAttributeNS(null, 'stroke-width', 0 );} addControlPoints(segment[0],segment[1],svg); memoNode=this; this.setAttributeNS(null, 'fillColor', '#ffff00' );this.setAttributeNS(null, 'stroke-width', 1 );$('option_path_num').value=this.getAttributeNS(null,'id'); $('option_path_x').value=parseFloat(this.getAttributeNS(null,'x'))+2; $('option_path_y').value=parseFloat(this.getAttributeNS(null,'y'))+2; }, false);
         //rect1.addEventListener("mouseup", function(event) {nodeUp(this); }, false);
         //rect1.addEventListener("mouseover", function(event) {this.setAttributeNS(null, 'fillColor', '#ffcc00' ); }, false);
         //rect1.addEventListener("mouseout", function(event) {this.setAttributeNS(null, 'fillColor', '#00cc00' ); }, false);
         

         //rect1.addEventListener("mouseout", function(event) {this.setAttributeNS(null, 'stroke-width', 0 ); }, false);

        svg.appendChild(rect1);                                    
         
      }                     
      var info='';
       
         if(controlNodeNum==0){info='prev Control'}  
         if(controlNodeNum==1){info='next Control'}  
         if(controlNodeNum==2){info='points node'}   
        // $('someinfo').value=numpoints+ ' '+info+':'+ chain;
       // $('someinfo').value='Crtl+Arrow to move';
    //return chain;                                          
    

      //this.svgRoot.appendChild(svg);   
    
    return svg;  
        
};
SVGRenderer.prototype.showTracker = function(shape,pathsEdit) {  

  var box = shape.getBBox();
 var matrix = shape.getScreenCTM();
  var trshape= shape.getAttributeNS(null, 'transform');  
  var shap=1; 
  var T = shape.getCTM();
  //a,b,c,d,e,f

    
 
 
    //var thisTransform = {  sx: s[0], r: shape.vRotate, t: shape.vTranslate };
    //if (currentTransform != null) alert(currentTransform.t);
 
  if (shape.tagName == 'rect') { 
     
//      $('option_rect_rot').value= T.b* (Math.PI * 2 / 360); 
//      $('option_rect_trx').value= box.x;  
//      $('option_rect_try').value= box.y;
//      $('option_rect_sclx').value= box.width;  
//      $('option_rect_scly').value= box.height;

  }  

  if (shape.tagName == 'image'){
//     $('option_img_trx').value= box.x; 
//     $('option_img_try').value= box.y;
//     $('option_img_sclx').value= box.width;  
//     $('option_img_scly').value= box.height;
//     $('option_img_rot').value= T.b* (Math.PI * 2 / 360);
  }
  if (shape.tagName == 'text'){
   /* f$('option_text_trx').value= box.x; 
    $('option_text_try').value= box.y;
    $('option_text_sclx').value= box.width;  
    $('option_text_scly').value= box.height;
    $('option_text_rot').value= T.b* (Math.PI * 2 / 360);
   */
  }
  if (shape.tagName == 'line'){ 
    /*
    $('option_line_trx').value= box.x;  
    $('option_line_try').value= box.y;
    */
  }   
  if (shape.tagName == 'ellipse'){  
    /*$('option_ellipse_trx').value= putx;  
    $('option_ellipse_try').value= puty;
    $('option_ellipse_sclx').value= box.width;  
    $('option_ellipse_scly').value= box.height;
    $('option_ellipse_rot').value= T.b* (Math.PI * 2 / 360);
    */
  }
  
  
  
 /* if (shape.getAttributeNS(null, 'transform') ) { 
        
        
        shap=2; }else{
  }*/ 
  var tracker = document.getElementById('tracker');
  if (tracker) {
    this.remove(tracker);
  }

  var svgNamespace = 'http://www.w3.org/2000/svg';
  
     tracker = document.createElementNS(svgNamespace, 'g');    
      tracker.setAttributeNS(null, 'id', 'tracker'); 
      
    var controlPoints=null;
    if (shape.tagName == 'path') { shap=2; 
    
    /* $('option_path_trx').value= box.x;  
     $('option_path_try').value= box.y;
     $('option_path_sclx').value= T.a;   
     $('option_path_scly').value= T.d; 
     $('option_path_rot').value= T.b* (Math.PI * 2 / 360);
     */                                        
     var path=shape.getAttributeNS(null, 'd');
//       $('control_codebase').value=path;  
       
       //controlPoints=this.showNodesCurve(path,0);
       //controlPoints=this.showNodesCurve(path,1); 
       controlPoints=this.showNodesCurve(path,2);
       
           
        /*   controlPoints=this.showNodesCurve(path,1); 
   
           tracker.appendChild(controlPoints);     
           
           controlPoints=this.showNodesCurve(path,0); 
   
           tracker.appendChild(controlPoints); 
        */   
   }        
      
     var svg = this.container.ownerDocument.createElementNS(svgNamespace, 'g'); 
      svg.setAttributeNS(null, 'id', 'transformSquares'); 
   
          
       //var rect = document.createElementNS(svgNamespace, 'rect');   
       var border = document.createElementNS(svgNamespace, 'path');  
       
       var trshape='translate (0,0) rotate(0) translate(0,0) '; 
       var trshape_split=trshape.split(') ');    
       
      // get_between (trshape, s1, s2) ;
     if(shape.getAttributeNS(null, 'transform')){ 
         var trshape=shape.getAttributeNS(null, 'transform') ;   
         //var spl=trshape.replace(', ',' ');  
         //var spl1=spl.replace(')',' ');    
         var trshape_split=trshape.split(') '); 
         

    }
                                         
  var corners = [];
  var point = createPoint(box.x, box.y, box.width, box.height);
 //point = {x:box.x, y:box.y, width: box.width, height:box.height};
//point = createPoint(box.x, box.y, box.width, box.height);    
  //1
  corners.push( createPoint(box.x + box.width, box.y, box.width, box.height) );
  point.x = box.x + box.width;
  point.y = box.y;
  //2
  corners.push( createPoint(box.x + box.width, box.y + box.height, box.width, box.height) );
  point.x = box.x + box.width;
  point.y = box.y + box.height;
  //3
  //corners.push( point.matrixTransform(matrix) );
  corners.push( createPoint(box.x , box.y + box.height, box.width, box.height) );
  point.x = box.x;
  point.y = box.y + box.height;
  //4
  corners.push( createPoint(box.x + box.width, box.y, box.width, box.height) );   
  
  var max = createPoint(corners[0].x, corners[0].y);
  var min = createPoint(corners[0].x, corners[0].y);

  // identify the new corner coordinates of the
  // fully transformed bounding box
  for (var i = 1; i < corners.length; i++) {
    var x = corners[i].x;
    var y = corners[i].y;
    if (x < min.x) {
      min.x = x;
    }
    else if (x > max.x) {
      max.x = x;
    }
    if (y < min.y) {
      min.y = y;
    }
    else if (y > max.y) {
      max.y = y;
    }
  }
  
  // return the bounding box as an SVGRect object
  //rect = document.createElementNS(svgNamespace, 'rect');
   //rect.setAttributeNS(null, 'x', min.x-10);
    //rect.setAttributeNS(null, 'y', min.y-10);   
    
    //rect.setAttributeNS(null, 'width', max.x - min.x+20);
    //rect.setAttributeNS(null, 'height', max.y - min.y+20);   
     
     border.setAttributeNS(null, 'd', "M"+(min.x-10)+","+ (min.y-10)+' h'+(box.width+20)+','+(0)+' v'+(0)+','+(box.height+20)+' h'+(-box.width-20)+','+(0)+' z M'+(box.x+box.width+10)+","+ (box.y+(box.height/2)+' h'+(25)+',0 '));   
     
     
     border.setAttributeNS(null, 'fill', 'none');
     border.setAttributeNS(null, 'stroke', '#cccccc');
     border.setAttributeNS(null, 'stroke-width', '1'); 
       
// createRect(min.x, min.y, max.x - min.x, max.y - min.y);

      var circle1 = document.createElementNS(svgNamespace, 'ellipse');  
      circle1.setAttributeNS(null, 'cx', (box.x + box.width+40) + 'px');
    circle1.setAttributeNS(null, 'cy', (box.y + box.height / 2) + 'px');
    circle1.setAttributeNS(null, 'rx', (5) + 'px');
    circle1.setAttributeNS(null, 'ry', (5) + 'px');   
   circle1.setAttributeNS(null, 'fill', '#ffffff');
  circle1.setAttributeNS(null, 'stroke', 'green');
  circle1.setAttributeNS(null, 'stroke-width', '1');   

      var circleCenter = document.createElementNS(svgNamespace, 'ellipse');  
      circleCenter.setAttributeNS(null, 'cx', (box.x + (box.width/2)) + 'px');
    circleCenter.setAttributeNS(null, 'cy', (box.y + (box.height /2)) + 'px');
    circleCenter.setAttributeNS(null, 'rx', (10) + 'px');
    circleCenter.setAttributeNS(null, 'ry', (10) + 'px');   
   circleCenter.setAttributeNS(null, 'fill', '#ffffff');
  circleCenter.setAttributeNS(null, 'stroke', 'green');
  circleCenter.setAttributeNS(null, 'stroke-width', '1');   

     var rect1 = document.createElementNS(svgNamespace, 'rect');  
  rect1.setAttributeNS(null, 'width', 10);
  rect1.setAttributeNS(null, 'height', 10);
  rect1.setAttributeNS(null, 'fill', '#ffffff');
  rect1.setAttributeNS(null, 'stroke', 'green');
  rect1.setAttributeNS(null, 'stroke-width', '1');  

  var rect2 = document.createElementNS(svgNamespace, 'rect');  
  rect2.setAttributeNS(null, 'width', 10);
  rect2.setAttributeNS(null, 'height', 10);
  rect2.setAttributeNS(null, 'fill', '#ffffff');
  rect2.setAttributeNS(null, 'stroke', 'green');
  rect2.setAttributeNS(null, 'stroke-width', '1');  

  var rect3 = document.createElementNS(svgNamespace, 'rect');  
  rect3.setAttributeNS(null, 'width', 10);
  rect3.setAttributeNS(null, 'height', 10);
  rect3.setAttributeNS(null, 'fill', '#ffffff');
  rect3.setAttributeNS(null, 'stroke', 'green');
  rect3.setAttributeNS(null, 'stroke-width', '1'); 
  
  var rect4 = document.createElementNS(svgNamespace, 'rect');  
  rect4.setAttributeNS(null, 'width', 10);
  rect4.setAttributeNS(null, 'height', 10);
  rect4.setAttributeNS(null, 'fill', '#ffffff');
  rect4.setAttributeNS(null, 'stroke', 'green');
  rect4.setAttributeNS(null, 'stroke-width', '1');  
 
  var rectmid12 = document.createElementNS(svgNamespace, 'rect');  
  rectmid12.setAttributeNS(null, 'width', 10);
  rectmid12.setAttributeNS(null, 'height', 10);
  rectmid12.setAttributeNS(null, 'fill', '#ffffff');
  rectmid12.setAttributeNS(null, 'stroke', 'green');
  rectmid12.setAttributeNS(null, 'stroke-width', '1');  

  var rectmid23 = document.createElementNS(svgNamespace, 'rect');  
  rectmid23.setAttributeNS(null, 'width', 10);
  rectmid23.setAttributeNS(null, 'height', 10);
  rectmid23.setAttributeNS(null, 'fill', '#ffffff');
  rectmid23.setAttributeNS(null, 'stroke', 'green');
  rectmid23.setAttributeNS(null, 'stroke-width', '1');  

  var rectmid34 = document.createElementNS(svgNamespace, 'rect');  
  rectmid34.setAttributeNS(null, 'width', 10);
  rectmid34.setAttributeNS(null, 'height', 10);
  rectmid34.setAttributeNS(null, 'fill', '#ffffff');
  rectmid34.setAttributeNS(null, 'stroke', 'green');
  rectmid34.setAttributeNS(null, 'stroke-width', '1'); 
  
  var rectmid41 = document.createElementNS(svgNamespace, 'rect');  
  rectmid41.setAttributeNS(null, 'width', 10);
  rectmid41.setAttributeNS(null, 'height', 10);
  rectmid41.setAttributeNS(null, 'fill', '#ffffff');
  rectmid41.setAttributeNS(null, 'stroke', 'green');
  rectmid41.setAttributeNS(null, 'stroke-width', '1');   
   // rect.setAttributeNS(null, 'x', box.x - 10);
   // rect.setAttributeNS(null, 'y', box.y - 10);    
    
    rect1.setAttributeNS(null, 'x', box.x - 10-5);
    rect1.setAttributeNS(null, 'y', box.y - 10-5);  
   
    
    rect2.setAttributeNS(null, 'x', box.x + box.width +5 );
    rect2.setAttributeNS(null, 'y', box.y -10 -5);   

    rect3.setAttributeNS(null, 'x', box.x + box.width+5 );
    rect3.setAttributeNS(null, 'y', box.y + box.height+5);
                                                       
    rect4.setAttributeNS(null, 'x', box.x -10-5 );
    rect4.setAttributeNS(null, 'y', box.y + box.height+5);    

    

    rectmid12.setAttributeNS(null, 'x', box.x + (box.width/2) -5);
    rectmid12.setAttributeNS(null, 'y', box.y - 10-5);  

    rectmid23.setAttributeNS(null, 'x', box.x + box.width +5 );
    rectmid23.setAttributeNS(null, 'y', box.y + (box.height/2)-5);   
    
    rectmid34.setAttributeNS(null, 'x', box.x + (box.width/2)-5 );
    rectmid34.setAttributeNS(null, 'y', box.y + box.height+5);
                                                           
    rectmid41.setAttributeNS(null, 'x', box.x -10-5 );
    rectmid41.setAttributeNS(null, 'y', box.y + (box.height/2)-5);
     
    svg.appendChild(border); 
    //tracker.appendChild(getScreenBBox (shape));
    //currentTranslate
    //currentScale
   // shape.setAttributeNS(null,'transform', "translate("+(box.x+(box.width/2))+","+(box.y+(box.height/2))+") rotate("+rotatexxx+") translate("+(-box.x-(box.width/2))+","+(-box.y-(box.height/2))+") ");

   //var trshape=shape.getAttributeNS(null, 'transform') ; 
  //----tracker.setAttributeNS(null,'transform', "translate("+(box.x+(box.width/2))+","+(box.y+(box.height/2))+") "+trshape_split[1]+") translate("+(-box.x-(box.width/2))+","+(-box.y-(box.height/2))+") ");

    
    
  //}  
   // tracker.appendChild(getScreenBBox (shape));
     var colorin="#ff0000";
      var colorout="#ffffff" 
      
        circle1.addEventListener("mouseover", function(event) {circle1.setAttributeNS(null, 'cursor', 's-resize');  circle1.setAttributeNS(null, 'fill', colorin ); typeTransform='Rotate'; scaleType='nw'; }, false);
     circle1.addEventListener("mouseout", function(event) {circle1.setAttributeNS(null, 'cursor', 'default');  circle1.setAttributeNS(null, 'fill', colorout ); typeTransform='Rotate'; }, false); //typeTransform='rotate'
     circleCenter.addEventListener("mouseover", function(event) {circleCenter.setAttributeNS(null, 'cursor', 'move');  circleCenter.setAttributeNS(null, 'fill', colorin ); typeTransform='sp�nCenter'; scaleType='nw'; }, false);
     circleCenter.addEventListener("mouseout", function(event) {circleCenter.setAttributeNS(null, 'cursor', 'default');  circleCenter.setAttributeNS(null, 'fill', colorout ); typeTransform=''; }, false); //typeTransform='rotate'
 
      
     //rect1.addEventListener("mouseover", cursore1in, false);    
     rect1.addEventListener("mouseover", function(event) {rect1.setAttributeNS(null, 'cursor', 'nw-resize');  rect1.setAttributeNS(null, 'fill', colorin ); typeTransform='Scale'; scaleType='nw';}, false);
     rect1.addEventListener("mouseout", function(event) {rect1.setAttributeNS(null, 'cursor', 'default');  rect1.setAttributeNS(null, 'fill', colorout ); typeTransform='Scale'; }, false); //typeTransform='rotate'
     //rect1.addEventListener("click", function(event) { rect1.setAttributeNS(null, 'fill', '#00ff00' ); typeTransform='Scale'; }, false);
    
     rect2.addEventListener("mouseover", function(event) {rect2.setAttributeNS(null, 'cursor', 'ne-resize');  rect2.setAttributeNS(null, 'fill', colorin ); typeTransform='Scale'; scaleType='ne';}, false);  
     rect2.addEventListener("mouseout", function(event) {rect2.setAttributeNS(null, 'cursor', 'default');  rect2.setAttributeNS(null, 'fill', colorout ); typeTransform='Scale'; }, false);
      
     rect3.addEventListener("mouseover", function(event) {rect3.setAttributeNS(null, 'cursor', 'se-resize');  rect3.setAttributeNS(null, 'fill', colorin ); typeTransform='Scale'; scaleType='se';}, false);  
     rect3.addEventListener("mouseout", function(event) {rect3.setAttributeNS(null, 'cursor', 'default');  rect3.setAttributeNS(null, 'fill', colorout ); typeTransform='Scale'; }, false);
     
     rect4.addEventListener("mouseover", function(event) {rect4.setAttributeNS(null, 'cursor', 'sw-resize');  rect4.setAttributeNS(null, 'fill', colorin ); typeTransform='Scale'; scaleType='sw';}, false);  
     rect4.addEventListener("mouseout", function(event) {rect4.setAttributeNS(null, 'cursor', 'default');  rect4.setAttributeNS(null, 'fill', colorout ); typeTransform='Scale'; }, false);
                                                    
     rectmid12.addEventListener("mouseover", function(event) {rectmid12.setAttributeNS(null, 'cursor', 'n-resize');  rectmid12.setAttributeNS(null, 'fill', colorin ); typeTransform='Scale'; scaleType='n';}, false);  
     rectmid12.addEventListener("mouseout", function(event) {rectmid12.setAttributeNS(null, 'cursor', 'default');  rectmid12.setAttributeNS(null, 'fill', colorout ); typeTransform='Scale'; }, false); 

     rectmid23.addEventListener("mouseover", function(event) {rectmid23.setAttributeNS(null, 'cursor', 'e-resize');  rectmid23.setAttributeNS(null, 'fill', colorin ); typeTransform='Scale'; scaleType='e';}, false);  
     rectmid23.addEventListener("mouseout", function(event) {rectmid23.setAttributeNS(null, 'cursor', 'default');  rectmid23.setAttributeNS(null, 'fill', colorout ); typeTransform='Scale'; }, false); 
     
     rectmid34.addEventListener("mouseover", function(event) {rectmid34.setAttributeNS(null, 'cursor', 's-resize');  rectmid34.setAttributeNS(null, 'fill', colorin ); typeTransform='Scale'; scaleType='s';}, false);  
     rectmid34.addEventListener("mouseout", function(event) {rectmid34.setAttributeNS(null, 'cursor', 'default');  rectmid34.setAttributeNS(null, 'fill', colorout ); typeTransform='Scale'; }, false); 

     rectmid41.addEventListener("mouseover", function(event) {rectmid41.setAttributeNS(null, 'cursor', 'w-resize');  rectmid41.setAttributeNS(null, 'fill', colorin ); typeTransform='Scale'; scaleType='w'; }, false);  
     rectmid41.addEventListener("mouseout", function(event) {rectmid41.setAttributeNS(null, 'cursor', 'default');  rectmid41.setAttributeNS(null, 'fill', colorout ); typeTransform='Scale'; }, false); 
     
     //////////
     svg.setAttributeNS(null, 'transform',trshape); 
  
    svg.appendChild(circle1);    
    //tracker.appendChild(circleCenter);  
   if (shape.tagName == 'text'){   
    svg.appendChild(rect1); 
    svg.appendChild(rect2);   
    svg.appendChild(rect3); 
    svg.appendChild(rect4);  
  }else{
    svg.appendChild(rect1); 
    svg.appendChild(rect2);   
    svg.appendChild(rect3); 
    svg.appendChild(rect4);  
    svg.appendChild(rectmid12);  
    svg.appendChild(rectmid23);
    svg.appendChild(rectmid34);
    svg.appendChild(rectmid41);                                    

  }  
    if(pathsEdit)
     {    
        controlPoints.setAttributeNS(null, 'transform',trshape); 
        tracker.appendChild(controlPoints);      
     }else{   
        tracker.appendChild(svg); 
     }   
  this.svgRoot.appendChild(tracker);  
      
}


SVGRenderer.prototype.getMarkup = function() { 
       
  return this.container.innerHTML;
}   


/////////////////////////////////
var rotatexxx=0; 
 
var scaleType=''; 
var xrot=0;
var yrot=0;  

var point = {x:0, y:0, width: 0, height:0};

function createPoint (x, y, width, height) {
    //var point = {x:34, y:22, width: 22, height:23};
    //point.x = x;
    //point.y = y;   
    point = {x:x, y:y, width: width, height:height};
    return point;
  }

///////////////////////////////

SVGRenderer.prototype.restruct= function(shape)
{
 //alert('end');       
 //forceRedraw(); 
//clearWorkspace();  
//document.getElementById('richdraw').style.cursor='default';    
};        



SVGRenderer.prototype.transform = function() {
    //document.forms[0].code.value='Im tranforming';
};

SVGRenderer.prototype.scaleShape = function(shape,previus, toX, toY) {

	 var box = shape.getBBox();  
	 var prevbox=previus.getBBox();
	var centerx= box.x+(box.width/2);
	var centery= box.y+(box.height/2); 
	var coord=this.editor.inputxy;
	toX=parseFloat(coord[0]);
	toY=parseFloat(coord[1]); 
	var d2p_center=dist2p(centerx,centery,toX,toY);       

	var d2p=dist2p(box.x,box.y,toX,toY);

	var shareScale=box.width/d2p;

	var trans_ShareScale='';
	var tx, ty, tw, yh;
	
	

	if(scaleType.length==1){
		if(scaleType== 'w')
		 {
			trans_ShareScale=shareScale+",1";  
			tx=toX; 
			ty=prevbox.y; 
			var dist=prevbox.x-toX;
			var w=dist+prevbox.width;
			if(w<1){w=1;}
			tw=w;
			th=prevbox.height;
			//document.forms[0].code.value=box.x+' '+toX+' '+dist+''; 
		 }        
		if(scaleType== 'e')
		 {
		        trans_ShareScale=shareScale+",1"; 
			tx=prevbox.x; 
			ty=prevbox.y; 
			var dist=toX-(prevbox.x+prevbox.width); //dist2p(toX,b,c,d);
			var w=dist+prevbox.width;
			if(w<1){w=1;}
			tw=w;
			th=prevbox.height;
 
		 }        
		if(scaleType== 'n')
		 {
			trans_ShareScale="1,"+shareScale; 
			
			tx=prevbox.x; 
			ty=toY; 
			var dist=prevbox.y-toY;
			var h=dist+prevbox.height;
			if(h<1){h=1;}
			tw=prevbox.width;
			th=h;

		 }
                if( scaleType== 's')
                 {
                        trans_ShareScale="1,"+shareScale;  

			tx=prevbox.x; 
			ty=prevbox.y; 
			var dist=toY-(prevbox.y+prevbox.height); //dist2p(toX,b,c,d);
			var h=dist+prevbox.height;
			if(h<1){h=1;}
			tw=prevbox.width;
			th=h;

	         }
        }
	if(scaleType.length==2){
		if(scaleType== 'nw'){
			trans_ShareScale=shareScale+","+shareScale; 
          
      			//var angle_diagonal=getAngle(prevbox.width,prevbox.height);
      			  var angle_diagonal=ang2v(prevbox.x,prevbox.y,prevbox.x+prevbox.width,prevbox.y+prevbox.height)
            
                        var ax= prevbox.x;
                        var ay= prevbox.y;
                        var bx= prevbox.x+prevbox.width; 
                        var by= prevbox.y+prevbox.height; 
                        
                        var cx= toX;
                        var cy= toY;
                        var dx= toX+10*Math.cos(angle_diagonal+(Math.PI/2)); 
                        var dy= toY+10*Math.sin(angle_diagonal+(Math.PI/2));  
                        
                        var section_a=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);   
                 this.editor.log(angle_diagonal* 180 / Math.PI);       
                    
                var tx= section_a[1];
                var ty= section_a[2];
                
                        var ax= section_a[1];
                        var ay= section_a[2];
                        var bx= 0;
                        var by= section_a[2] ; 
                        
                        var cx=prevbox.x+prevbox.width; 
                        var cy= prevbox.y;

                        var dx= prevbox.x+prevbox.width;  
                        var dy= 0;
                        
                      
                var section_b=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);

                var distx=dist2p(section_a[1],section_a[2],section_b[1],section_b[2]);         

              
                
                        var ax= section_a[1];
                        var ay= section_a[2];
                        var bx= section_a[1] 
                        var by= 0; 
                        
                        var cx= prevbox.x; 
                        var cy= prevbox.y+prevbox.height; 

                        var dx= 0; 
                        var dy= prevbox.y+prevbox.height;
                        
                      
                var section_c=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);
                var disty=dist2p(section_a[1],section_a[2],section_c[1],section_c[2]);         
                
                

                    
                        if(distx<1){distx=1;}    
			
         		
			if(disty<1){disty=1;}
                        //document.forms[0].code.value=distx+' '+disty;
			tw=distx;
			th=disty;

			
		}                  
		
	//////////////////// SE
		
           if( scaleType== 'se'){
			trans_ShareScale=shareScale+","+shareScale;   
			
	          
      			//var angle_diagonal=getAngle(prevbox.width,prevbox.height);
       			var angle_diagonal=ang2v(prevbox.x,prevbox.y,prevbox.x+prevbox.width,prevbox.y+prevbox.height)
		
			
			
                        var ax= prevbox.x;
                        var ay= prevbox.y;
                        var bx= prevbox.x+prevbox.width; 
                        var by= prevbox.y+prevbox.height; 
                        
                        var cx= toX;
                        var cy= toY;   
                        var dx= toX+10*Math.cos(angle_diagonal+(Math.PI/2)); 
                        var dy= toY+10*Math.sin(angle_diagonal+(Math.PI/2)); 
      
                var section_a=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);   
                
                                         
                 var svgNamespace = 'http://www.w3.org/2000/svg';  
                 var tracker = document.getElementById('tracker');

                //////////
                var tx= prevbox.x;
                var ty= prevbox.y;
                
                        var ax= section_a[1];
                        var ay= section_a[2];
                        var bx= 0;
                        var by= section_a[2] ; 
                        
                        var cx=prevbox.x; 
                        var cy= prevbox.y;

                        var dx= prevbox.x;  
                        var dy= 0;
                        
                      
                var section_b=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);
               
               /////////////////
               
               
                var distx=dist2p(section_a[1],section_a[2],section_b[1],section_b[2]);         

             
                        var ax= section_a[1];
                        var ay= section_a[2];
                        var bx= section_a[1] 
                        var by= 0; 
                        
                        var cx= prevbox.x; 
                        var cy= prevbox.y; 

                        var dx=0;
                        var dy= prevbox.y;
                        
                      
                var section_c=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);
               
               ///////////////
               
                var disty=dist2p(section_a[1],section_a[2],section_c[1],section_c[2]);         
                
   
                    
                        if(distx<1){distx=1;}    
			
         		
			if(disty<1){disty=1;}
                        
			tw=distx;
			th=disty;

			
		}

		if(scaleType== 'ne'){  
		        
			trans_ShareScale=shareScale+","+shareScale;   
			
	                var angle_diagonal=ang2v(prevbox.x,prevbox.y+prevbox.height,prevbox.x+prevbox.width,prevbox.y)
      			//var angle_diagonal=getAngle(prevbox.width,prevbox.height);
 		
			
				
			
                        var ax= prevbox.x;
                        var ay= prevbox.y+prevbox.height;
                        var bx= prevbox.x+prevbox.width; 
                        var by= prevbox.y;
                       
                        var cx= toX;
                        var cy= toY;   
                        var dx= toX+10*Math.cos(angle_diagonal+(Math.PI/2)); 
                        var dy= toY+10*Math.sin(angle_diagonal+(Math.PI/2)); 


                      this.editor.log(angle_diagonal);

      
                var section_a=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);   
                
                                         
                 var svgNamespace = 'http://www.w3.org/2000/svg';  
                 var tracker = document.getElementById('tracker');

                //////////
                var tx= prevbox.x;
                var ty= section_a[2];
                
                        var ax= section_a[1];
                        var ay= section_a[2];
                        var bx= 0;
                        var by= section_a[2] ; 
                        
                        var cx=prevbox.x; 
                        var cy= prevbox.y;

                        var dx= prevbox.x;  
                        var dy= 0;
                        
                      
                var section_b=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);
               
               /////////////////
               
               
                var distx=dist2p(section_a[1],section_a[2],section_b[1],section_b[2]);         

             
                        var ax= section_a[1];
                        var ay= section_a[2];
                        var bx= section_a[1]; 
                        var by= 0; 
                        
                        var cx= prevbox.x; 
                        var cy= prevbox.y+prevbox.height; 

                        var dx=0;
                        var dy= prevbox.y+prevbox.height;
                        
                      
                var section_c=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);
               
               ///////////////
               
                var disty=dist2p(section_a[1],section_a[2],section_c[1],section_c[2]);         
                

                    
                        if(distx<1){distx=1;}    
			
         		
			if(disty<1){disty=1;}
                        //document.forms[0].code.value=distx+' '+disty;
			tw=distx;
			th=disty;
			
			
			
			
			
		}
		if(scaleType== 'sw'){
			trans_ShareScale=shareScale+","+shareScale;  
			
			
				
			
	                var angle_diagonal=ang2v(prevbox.x,prevbox.y+prevbox.height,prevbox.x+prevbox.width,prevbox.y)
      			//var angle_diagonal=getAngle(prevbox.width,prevbox.height);
 		
			
				
			
                        var ax= prevbox.x;
                        var ay= prevbox.y+prevbox.height;
                        var bx= prevbox.x+prevbox.width; 
                        var by= prevbox.y;
                       
                        var cx= toX;
                        var cy= toY;   
                        var dx= toX+10*Math.cos(angle_diagonal+(Math.PI/2)); 
                        var dy= toY+10*Math.sin(angle_diagonal+(Math.PI/2)); 


                      this.editor.log(angle_diagonal);

      
                var section_a=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);   
                
                                         
                 var svgNamespace = 'http://www.w3.org/2000/svg';  
                 var tracker = document.getElementById('tracker');

                //////////
                var tx= section_a[1];
                var ty= prevbox.y;
                
                        var ax= section_a[1];
                        var ay= section_a[2];
                        var bx= 0;
                        var by= section_a[2] ; 
                        
                        var cx=prevbox.x+prevbox.width; 
                        var cy= prevbox.y+prevbox.height;

                        var dx= prevbox.x+prevbox.width;  
                        var dy= 0;
                        
                      
                var section_b=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);
                var distx=dist2p(section_a[1],section_a[2],section_b[1],section_b[2]);         

               /////////////////             
                        var ax= section_a[1];
                        var ay= section_a[2];
                        var bx= section_a[1];
                        var by= 0; 
                          
                        var cx= prevbox.x; 
                        var cy= prevbox.y; 

                        var dx=0;
                        var dy= prevbox.y;
                        
                      
                var section_c=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);
                  var disty=dist2p(section_a[1],section_a[2],section_c[1],section_c[2]);         
              ///////////////
                
   
                    
                        if(distx<1){distx=1;}    
			
         		
			if(disty<1){disty=1;}
                        //document.forms[0].code.value=distx+' '+disty;
			tw=distx;
			th=disty;
			
		}

	}  



 if(shape.tagName == 'rect')
  { 
    //alert(data[0]);     
   shape.setAttributeNS(null,'x',tx);
    shape.setAttributeNS(null,'y',ty);   
    shape.setAttributeNS(null, 'width', tw);     
    shape.setAttributeNS(null, 'height', th); 
    
   //shape.nodparseFloatue=data;
  }
   else 
 if(shape.tagName == 'text')
  { 
    
    var tsize=shape.getAttributeNS(null, 'font-size') ;
    tsize=eval(tsize);
    //shape.setAttributeNS(null, 'x', tx + 'px');
    //shape.setAttributeNS(null, 'y', ty + 'px'); 
    //var mysize=box.height+1 ;
    var mysize=parseInt(Math.round(th));
    
    if(scaleType== 'ne'){ shape.setAttributeNS(null, 'font-size',tsize+1);}  
      //shape.setAttributeNS(null, 'font-size', mysize);  
      
   
   /*
    shape.setAttributeNS(null,'x',tx);
    shape.setAttributeNS(null,'y',ty);   
    shape.setAttributeNS(null, 'width', tw);     
    shape.setAttributeNS(null, 'height', th); 
    
    //previus.setAttributeNS(null,'transform', "scale("+trans_ShareScale+")");
    shape.setAttributeNS(null, 'x', tx + 'px');
    shape.setAttributeNS(null, 'y', ty + 'px');

    shape.setAttributeNS(null, 'textLength', parseInt(Math.round(tw)));    
    
     */
  } 
   else 
 if(shape.tagName == 'ellipse')
  {
    //shape.getAttributeNS(null, 'transform)
    shape.setAttributeNS(null, 'cx', (tx + (box.width / 2)) + 'px');
    shape.setAttributeNS(null, 'cy', (ty + (box.height / 2)) + 'px');
    shape.setAttributeNS(null, 'rx', (tw / 2) + 'px');
    shape.setAttributeNS(null, 'ry', (th / 2) + 'px');   
 
        
  }
   else 
 if(shape.tagName == 'line')
  { 
    shape.setAttributeNS(null, 'x1', tx + 'px');
    shape.setAttributeNS(null, 'y1', ty + 'px');
    shape.setAttributeNS(null, 'x2', tx + tw + 'px');
    shape.setAttributeNS(null, 'y2', ty + th + 'px');  
         
  }
   else
 if (shape.tagName == 'polyline') 
  {
   
  }
   else 
 if (shape.tagName == 'image') 
  {   
    shape.setAttributeNS(null,'x',tx);
    shape.setAttributeNS(null,'y',ty);   
    shape.setAttributeNS(null, 'width', tw);     
    shape.setAttributeNS(null, 'height', th); 
      
  }
   else 
 if (shape.tagName == 'path')
  {     
     // var xscale=  box.width/tw;
     // var yscale=  box.height/th;  
      var xscale=  tw/box.width;
      var yscale=  th/box.height;  
      var xinc=xscale;//dist*angx;
      var yinc=yscale/ty;//dist*angy;   

   if(scaleType== 'n')
    {
       tx=box.x+(box.width/2);
       ty=box.y+box.height; 
       var xinc=1;
       var yinc=box.y/toY;//dist*angy;   

    } 
   if(scaleType== 's')
    {
       tx=box.x+(box.width/2);
       ty=box.y; 
       var xinc=1;
       var yinc=toY/(box.y+box.height);//dist*angy;   
    }    
   if(scaleType== 'e')
    {
       tx=box.x;
       ty=box.y+(box.height/2);  
       var xinc=toX/(box.x+box.width);
       var yinc=1;   

    }         
   if(scaleType== 'w')
    {
       tx=box.x+box.width;
       ty=box.y+(box.height/2); 
       var xinc=box.x/toX;
       var yinc=1;   

    }
   if(scaleType== 'ne')
    {
       tx=box.x;
       ty=box.y+box.height; 
       var xinc=toX/(box.x+box.width);
       var yinc=xinc;   
    }  
  if(scaleType== 'nw')
    {
       tx=box.x+box.width;
       ty=box.y+box.height; 
       var xinc=box.x/toX;
       var yinc=xinc;   
    } 
   if(scaleType== 'se')
    {
       tx=box.x;
       ty=box.y; 
       var xinc=toX/(box.x+box.width);
       var yinc=xinc;   
    }    
   if(scaleType== 'sw')
    {
       tx=(box.x+box.width);
       ty=box.y; 
       var xinc=box.x/toX;
       var yinc=xinc;   
    }        
      if(xinc==0){ xinc= 0.0000001;}
      if(yinc==0){ yinc= 0.0000001; }
      var prevpath=previus.getAttributeNS(null, 'd');
     var path=shape.getAttributeNS(null, 'd');
////////////


      //xshe=left;
      //yshe=top;
       
 path=path.replace(/, /g, ','); 
 path=path.replace(/ ,/g, ',');
 var ps =path.split(" ")
 var pcc = "";
 var point =ps[0].split(","); 


 var num0= parseFloat(point[0].substring(1));
 var num1= parseFloat(point[1]);     
 

 var ang= ang2v(box.x,box.y,tx,ty) ;
 var angle = Math.round((ang/Math.PI* 2)* 360);
 var angx = Math.cos(ang); 
 var angy = Math.sin(ang);          
 var dist= dist2p(tx,ty,box.x,box.y);
 //var xinc=xscale;//dist*angx;
 //var yinc=yscale;//dist*angy;   
    var re = /^[-]?\d*\.?\d*$/; 
    var axis = $V([tx,ty]);
 for(var i = 0; i < ps.length; i++)
  { 
   if(ps[i].indexOf(',')>0){  
     
      var point =ps[i].split(","); 
       var char1=point[0].substring(0,1); 
       if(char1=='A' || char1=='a'){isArc=true; contArc=0;}
       if(isArc==true){contArc++}
       if(contArc==4){contArc=0; isArc=false}
       
       //if (isNaN(valnum)) 
      if (!char1.match(re))        
       { 
           var num0= parseFloat(point[0].substring(1));
           var text=char1;
       }else{ 
         if(isArc==true && contArc==2  )
          {
            var num0= point[0];
          }else{  
            var num0= parseFloat(point[0]);
          }  
         var text='';

       }
 
       
       if(isArc==true && contArc==2)
        {   
           point[1]= point[1].toString() ;
        }
        else
        {    
         
          //num0*=xinc;    
          point[1]= parseFloat(point[1]);
          //point[1]*=yinc;
          var pointIni=$V([num0,point[1],1]);
          var matrT = $M([[1,0,-tx],[0,1,-ty],[0,0,1]]);
          var matrS = $M([[xinc,0,0],[0,yinc,0],[0,0,1]]); 
          var matrR = $M([[1,0,tx],[0,1,ty],[0,0,1]]);
          var matr1= matrT.x(pointIni);  
          var matr2= matrS.x(matr1);
          //var pointR=pointIni.Random(1) 
          //var pointR=pointIni.rotate(Math.PI/180,axis);
          //var pointRc=pointIni.cross(axis); 
          //var pointR=matr2;
          var pointR=matrR.x(matr2);  
          num0=pointR.elements[0];
           point[1]=pointR.elements[1];
//           $('code').value=pointIni.elements[0]+','+pointR.elements[1]+' ';
        }  
       var cx=num0; 
        var cy=point[1];   
        pcc+=text+cx+','+cy+' ';
        //pcc+=text+cx+','+cy+' '; 
       
   }else{
      pcc+=ps[i]+' ';
   }
  }
  
  shape.setAttributeNS(null,'d', pcc);



//////////////
/*
 path=path.replace(/, /g, ','); 
 path=path.replace(/ ,/g, ',');
 var ps =path.split(" ")
 var pcc = "";

 var xinc=tx-prevbox.x;
 var yinc=ty-prevbox.y;
  
    var re = /^[-]?\d*\.?\d*$/;
 for(var i = 0; i < ps.length; i++)
  { 
   if(ps[i].indexOf(',')>0){  
     
      var point =ps[i].split(","); 
       var char1=point[0].substring(0,1);
       point[1]= parseFloat(point[1]); 
       
       // var valnum =char1.charAt(0); 
       //if (isNaN(valnum))
       if (!char1.match(re)) 
        
       {
         var num0= parseFloat(point[0].substring(1));
         var text=char1;
       }else{
         var num0= parseFloat(point[0]);
         var text='';

       }
       //num0+=dist*angx;
       //point[1]+=dist*angy;
         num0*=xscale;
        point[1]*=yscale;   
        
      // num0+=xinc;
      // point[1]+=yinc;
       
      
        
        var cx=num0;
        var cy=point[1]; 
        pcc+=text+cx+','+cy+' ';
   }else{
      pcc+=ps[i]+' ';
   }
  }


   
    
  
   // $('code').value=dist+' '+ ang+' '+'__'+x+'= '+left+'/ '+y+'= ' +top+'';
    
       //shape.setAttributeNS(null,'transform', "rotate("+left+")");
       
       // shape.setAttributeNS(null,'transform', "translate("+trax+","+tray+") rotate("+0+") scale(1,1)");
         shape.setAttributeNS(null,'d', pcc);

    
    
    
    
    
    
       //document.forms[0].code.value='';
       //shape.setAttributeNS(null,'transform', "scale("+trans_ShareScale+")"); 
 */      

  }  
   	                             







	
	
	
	
	
//$('status').innerHTML=typeTransform+': '+shareScale;  
       
  
};


SVGRenderer.prototype.rotateShape = function(shape, previus, toX, toY) {
 
    //document.getElementById('richdraw').style.cursor='e-resize';
     	 var box = shape.getBBox();  
	 var prevbox=previus.getBBox();
	var centerx= box.x+(box.width/2);
	var centery= box.y+(box.height/2); 
	var coord=this.editor.inputxy;

       var actual_angle=ang2v(centerx,centery,coord[0], coord[1]);
       
       if(xrot<toX) { rotatexxx+=1;}else{rotatexxx-=1;}
       xrot=toX;
       yrot=toY;  
       
	var xtr=0;
        var ytr=0;
                
        var box= shape.getBBox();  
        var tr1x=  box.x;  
         var tr1y=  box.y;

 
 
    toX+=xtr;
        toY+=xtr;

      //var trax=parseFloat(toX-box.x);   var tray= parseFloat(toY-box.y);      
      var trax=parseFloat(box.x/2);   var tray= parseFloat(box.y/2); 
       var angler=Math.atan2(toX,toY);
         var angle=angler*180/Math.PI;  
          var T = shape.getCTM(); 
          var rotini=T.a*(180 / Math.PI);
                   var angle=rotini*180/Math.PI;
          var rot_angle=actual_angle*180/Math.PI;  
          this.editor.log(centerx+' '+centery+' '+coord[0]+' '+coord[1]+'____ '+rot_angle+' '+actual_angle*180/Math.PI);
          
          
         // matrix( a, b, c, d, e, f )
         // a c e
         // b d f
         // 0 0 1
         //a scale factor of 2, a rotation of 30 deg and a translation of (500,50)
         //T     1.732   -1   500     1   1.732   50     0   0   1
         //T      1  ad-bc      d  -c -de+cf   -b  a  be-df    0   0   1
         
         //shape.setAttributeNS(null,'transform', "translate("+(-xshe)+","+(-yshe)+")");
 
         // shape.setAttributeNS(null,"transform", "  matrix( a, b, c, d, e, f )");
          // shape.setAttributeNS(null,'transform', "translate("+(box.x+(box.width/2))+","+(box.y+(box.height/2))+")  rotate("+rotatexxx+") ");
           //shape.setAttributeNS(null,'transform', "translate("+(box.x+(box.width/2))+","+(box.y+(box.height/2))+") rotate("+rotatexxx+") translate("+(-box.x-(box.width/2))+","+(-box.y-(box.height/2))+") ");
         //shape.setAttributeNS(null,'transform', "rotate("+rotatexxx+","+(box.x+(box.width/2))+","+(box.y+(box.height/2))+")");
         //shape.setAttributeNS(null,'transform', "rotate("+rotatexxx+","+(prevbox.x+(prevbox.width/2))+","+(prevbox.y+(prevbox.height/2))+")");
         shape.setAttributeNS(null,'transform', "rotate("+rot_angle+","+(prevbox.x+(prevbox.width/2))+","+(prevbox.y+(prevbox.height/2))+")");
                          
         
         //alert('[  ['+T.a+'  '+T.c+'  '+T.e+']  ['+T.b+'  '+T.d+'  '+T.f+']  [0  0  1]  ]');
        //a,b,c,d,e,f  
           
          // shape.setAttributeNS(null,'transform', 'matrix('+T.a+', '+T.b+', '+ T.c+', '+ T.d+', '+ T.e+', '+ T.f+')' );
          
          var x1=T.e;
          var y1=T.f;
          var sp = Math.sin(rotatexxx*(Math.PI / 180));
          var cp = Math.cos(rotatexxx*(Math.PI / 180));
          var x2 = 0 + r*rotatexxx*(Math.PI / 180);
          var y2 = 0;
          var r=0; 
           
          var a=cp;
          var c=sp;
          var e=T.e;
          var b=T.b;
          var d=(-x1*cp+y1*sp+x2); 
          var f=(-x1*sp-y1*cp+y2);
      
      var inv=T.inverse;  
      var inv_mat=T.multiply(inv); 
       //var matrix = "matrix(" + cp +"," + sp + "," + (-sp) + "," + cp + ","+ (-x1*cp+y1*sp+x2) + ","+ (-x1*sp-y1*cp+y2) + ")";
       //var matrix = "matrix(" + a +"," + c + "," + e + "," + b + ","+ d + ","+ f + ")";
      var matrix='matrix('+inv_mat.a+' '+inv_mat.b+' '+inv_mat.c+' '+inv_mat.d+' '+inv_mat.e+' '+inv_mat.f+')'
      
       //++ shape.setAttributeNS(null,'transform',matrix); 
        
        //shape.setAttributeNS(null,'transform', "rotate("+rotatexxx+")"); 
        // shape.setAttributeNS(null,'transform', "translate("+(box.x)+","+(box.y)+")");
        
         //shape.setAttributeNS(null,'transform', "rotate("+rotatexxx+")");
               //shape.setAttributeNS(null, 'x', -box.width/2 + 'px');
               //shape.setAttributeNS(null, 'y', -box.height/2 + 'px');
         //shape.setAttributeNS(null,"transform", "matrix("+Math.cos(angle)+", "+Math.sin(angle)+", "+Math.sin(-angle)+", "+Math.cos(angle)+", 0, 0 )");
           //shape.setAttributeNS(null,'transform', "rotate("+10+")"); 
   
               //shape.setAttributeNS(null, 'x', box.width/2 + 'px');
               //shape.setAttributeNS(null, 'y', box.height/2 + 'px');
      
                
  
          //$('status').innerHTML = 'Mode: Draw '+pointshape +'_'+xsh +' '+ ysh+' '+trshape;
          
  //$('status').innerHTML=typeTransform+': '+rotatexxx;  
    
};



// x(u) = x0*(1-u) + x1*u = x0 + (x1-x0)*u
// y(u) = y0*(1-u) + y1*u = y0 + (y1-y0)*u
      


SVGRenderer.prototype.getshapes = function(){
return this.svgRoot.childNodes;
} 


function generateJSON(cssEnv){
 var css = cssEnv.trim().split(";"), styleArray = [], currentStyle = "";
 for(var i = 0; i < css.length; i++){
 	currentStyle = css[i].trim().split(":");
	if (currentStyle[0] && currentStyle[1] && currentStyle[0].length > 1 && currentStyle[1].length > 1) {
		styleArray.push(['"', currentStyle[0].toString().trim(), '": "', currentStyle[1].toString().trim(), '"'].join(""))
	}
 }
 return "{"+styleArray.join(",")+"}";
}

//http://xml-utils.com/conferencia-svg.html#d0e527
//http://www.xml.com/lpt/a/1321
//http://phrogz.net/objjob/object.asp?id=101
//http://admisource.gouv.fr/plugins/scmcvs/cvsweb.php/Cassini-ihm/js-yosemite/mapApp.js?rev=1.1;cvsroot=cassini
//http://groups.google.com/group/prototype-graphic/msg/0547c0caea8869c6 
//http://sylvester.jcoglan.com/ 