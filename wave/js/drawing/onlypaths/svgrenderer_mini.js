
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


SVGRenderer.prototype.removeAll = function() {  
 while( this.svgRoot.hasChildNodes () ){
   this.svgRoot.removeChild( this.svgRoot.firstChild );
 }
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