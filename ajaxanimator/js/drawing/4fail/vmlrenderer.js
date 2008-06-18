/*----------------------------------------------------------------------------
 ONLYPATHS 0.1 
 from
 RICHDRAW 1.0
 Vector Graphics Drawing Script
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of VML based renderer.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle  
               2008 Antimatter15  
               2008 Josep_ssv

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
 Dependencies: AbstractRenderer (from onlypaths.js)
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function VMLRenderer() {
	this.base = AbstractRenderer;
}


VMLRenderer.prototype = new AbstractRenderer;


VMLRenderer.prototype.init = function(elem) 
 {
  this.container = elem;
  // this.container.style.overflow = 'hidden';
  this.container.unselectable = "on";
  // Add VML includes and namespace
  elem.ownerDocument.namespaces.add("v", "urn:schemas-microsoft-com:vml");
  var style = elem.ownerDocument.createStyleSheet();
  style.addRule('v\\:*', "behavior: url(#default#VML);");
 }


VMLRenderer.prototype.bounds = function(shape) {
  var rect = new Object();
  rect['x'] = shape.offsetLeft;
  rect['y'] = shape.offsetTop;
  rect['width'] =  shape.offsetWidth;
  rect['height'] = shape.offsetHeight;
  return rect;
}


VMLRenderer.prototype.create = function(shape, fillColor, lineColor, fillOpac, lineOpac, lineWidth, left, top, width, height) {
  var vml;
    var shap=1;
     if (shape == 'rect') {
    vml = this.container.ownerDocument.createElement('v:rect');  
    vml.style.position = 'absolute';
    vml.style.left = left; 
    
    vml.style.top = top;
    vml.style.width = width;
    vml.style.height = height;
    if (fillColor != '') {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor); 
      
    }
    else {
      vml.setAttribute('filled', 'false');
    }
  }
  else if (shape == 'roundrect') {
            vml = this.container.ownerDocument.createElement('v:roundrect'); 
            vml.style.position = 'absolute';
            vml.style.left = left;
            vml.style.top = top;
            vml.style.width = width;    
            vml.style.height = height;
            vml.setAttribute('arcsize', '20%');
            if(fillColor != '') {
              vml.setAttribute('filled', 'true');
              vml.setAttribute('fillcolor', fillColor);
            }
            else {
              vml.setAttribute('filled', 'false');
            }
  }
  else if (shape == 'ellipse') {
    vml = this.container.ownerDocument.createElement('v:oval');  
    vml.style.left = left;
    vml.style.top = top;
    vml.style.width = width; 
    vml.style.height = height;
    vml.style.position = 'absolute';
              if (fillColor != '') {
              vml.setAttribute('filled', 'true');
              vml.setAttribute('fillcolor', fillColor);
            }
            else {
              vml.setAttribute('filled', 'false');
            }
  }
  else if (shape == 'line') {
    vml = this.container.ownerDocument.createElement('v:line'); 
    vml.style.position = 'absolute';
    vml.setAttribute('from', left + 'px,' + top + 'px');
    vml.setAttribute('to', (left+width) + 'px,' + (top+height) + 'px');

  }   
  else if (shape == 'polyline') {
    vml = this.container.ownerDocument.createElement('v:polyline');
    //vml = this.container.ownerDocument.createElement('v:path');    
    //var   thispath=''+this.editor.xpArray[0]+','+this.editor.ypArray[0];      
    var thispath='M '+this.editor.xpArray[1]+', '+this.editor.ypArray[1]+' l'; 
    var maxcont=this.editor.xpArray.length;
    for(var conta=2;conta< maxcont;conta++)
     {        
         thispath+=' '+this.editor.xpArray[conta]+', '+this.editor.ypArray[conta];
     } 
    //vml.setAttribute("coordsize","800,600");
    vml.setAttribute("points", thispath); 
    //vml.setAttribute("coordorigin","0 0");   
    //vml.setAttribute("coordsize","200 200");
    //vml.setAttribute("path", "m 8,65 l 72,65, 92,11, 112,65, 174,65, 122,100, 142,155, 92,121, 42,155, 60,100 x e;
    //vml.setAttribute("path", "M320 32 c"+ thispath+" z ");     
    //vml.setAttribute("v", "m 10,70 l 85,10,160,70,160,160,10,160 x e");
    if (fillColor != '') {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor);
    }
    else {
      vml.setAttribute('filled', 'false');
    }
    
  }    
  else if (shape == 'path') 
   {
    vml = this.container.ownerDocument.createElement('v:shape');  
    //vml.setAttribute("top", "300");  
    //vml.setAttribute("left", "200");    
    var thispath2=' ';
    //var   thispath=''+this.editor.xpArray[0]+','+this.editor.ypArray[0];      
    var thispath=' '+this.editor.xpArray[1]+','+this.editor.ypArray[1]+' l'; 
    var maxcont=this.editor.xpArray.length;
    for(var conta=2;conta< maxcont;conta++)
     {        
         thispath2+=' '+this.editor.xpArray[conta]+','+this.editor.ypArray[conta];
     } 
    //vml.setAttribute("coordsize","800,600");
    //vml.setAttribute("path", thispath); 
    //vml.v.Value ="M320 32 C"+ thispath+"  ";
    //vml.setAttribute("coordorigin","0 0");   
    //vml.setAttribute("coordsize","200 200");
    //vml.setAttribute("path", "m 8,65 l 72,65, 92,11, 112,65, 174,65, 122,100, 142,155, 92,121, 42,155, 60,100 x e;
    var path01 = this.container.ownerDocument.createElement('v:path');  
    path01.setAttribute("v", "m "+thispath+" c"+ thispath2+" e ");  
    vml.style.position="absolute";  
    vml.style.width= 700+"px";
    vml.style.height=500+"px";
    vml.style.left="0px";  
    vml.style.top="0px";    
    vml.setAttribute('coordsize', '700,500'); 
    //vml.setAttribute('margin-left', '300px');  
    //vml.setAttribute('margin-top', '200px');
    //vml.setAttribute("WIDTH", "700px");  
    //vml.setAttribute("HEIGHT", "500px");  
    //vml.setAttribute("coordorigin", "300 -200");   
    //vml.setAttribute("o:bullet","True");
    //vml.setAttribute("path", "M10,70 C 85,10 160,70 160,160 x e"); 
    //var resolution = this.getResolution();    
    // var resolution=33;
    //var size = 800/resolution + " " + (-600/resolution);
    //vml.setAttribute("coordsize", size);
    //vml.setAttribute("textpathok", "true");
    //vml.appendChild('');
    if (fillColor != '') {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor);
    }
    else {
      vml.setAttribute('filled', 'false');
    }
    
    vml.appendChild(path01)
    
   }
   
   else if (shape == 'controlpath')
   {
    
    vml = this.container.ownerDocument.createElement('v:shape');  
      vml.style.position="absolute";  
    vml.style.width= 700+"px";
    vml.style.height=500+"px";
    vml.style.left=left+"px";  
    vml.style.top=top+"px";  
    vml.setAttribute('coordsize', '700,500');   
     
    var path01 = this.container.ownerDocument.createElement('v:path');  
    path01.setAttribute('v', 'm '+left+','+top+' c'+(left+1)+','+(top+1)+' e ');  

     if (fillColor != '') {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor);
     }
      else 
     {
      vml.setAttribute('filled', 'false');
     }
    
    vml.appendChild(path01)
    } 


    else if (shape == 'image') {   
  
    vml = this.container.ownerDocument.createElement('v:image'); 
    vml.setAttribute('src',this.editor.image_href);
    vml.style.position="absolute";  
    vml.style.width=100+"px";
    vml.style.height=100+"px";
    vml.style.left=left+"px";  
    vml.style.top=top+"px";  
    vml.style.margin=0+"px";  
    vml.style.padding=0+"px";  
    if (fillColor != '') {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor);
    }
    else {
      vml.setAttribute('filled', 'false');
    }
    vml.setAttribute('strokeweight', parseFloat(lineWidth)+'px');
   vml.setAttribute('stroked', 'true');  
   vml.setAttribute('strokecolor',lineColor);
   
   
    }
    
    else if (shape == 'text') {   
   
    var data = this.editor.text_message;
    vml = this.container.ownerDocument.createElement('v:shape');
    vml.style.position="absolute";  
    vml.style.width=100+"px";
    vml.style.height=100+"px";
    vml.style.left=left+"px";  
    vml.style.top=top+"px";  
    vml.style.margin=0+"px";  
    vml.style.padding=0+"px";  
    if (fillColor != '') {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor);
    }
    else {
      vml.setAttribute('filled', 'false');
    }
    vml.setAttribute('strokeweight', parseFloat(lineWidth)+'px');//document.forms[0].linewidth.options[document.forms[0].linewidth.selectedIndex].value+'px');
   vml.setAttribute('stroked', 'true');  
   vml.setAttribute('strokecolor',lineColor);//document.forms[0].linecolor.options[document.forms[0].linecolor.selectedIndex].value);
    //vml.setAttribute('fillcolor', fillColor);  
    vml.setAttribute('path','m 100 100 l 600 100 e'); 
        var textPathObj = this.container.ownerDocument.createElement("v:textpath");
        //textPathObj.setAttribute('style','font:'+document.forms[0].option_text_family.options[document.forms[0].option_text_family.selectedIndex].value+' normal normal '+parseFloat(document.forms[0].option_text_size.value)+'px ');
        textPathObj.setAttribute('string', data);  
        textPathObj.setAttribute('trim', 'false'); 
        textPathObj.setAttribute('fitpath', 'false');
        textPathObj.setAttribute('on','true');  
        
        textPathObj.style.fontFamily=this.editor.font_family;  
        textPathObj.style.fontSize=this.editor.font_size+'px'; 
         textPathObj.style.vTextKern='true';  
      var pathObj = this.container.ownerDocument.createElement("v:path");
      pathObj.setAttribute('textpathok', 'true');  
        //textPathObj.setAttribute('style','font-family:"Arial Black";font-size:40pt;v-text-kern:t');

 
  /* //vml.setAttribute('coordsize', '700,500'); 
    vml.setAttribute('inset', '0px, 0px, 0px, 0px');
    if (fillColor != '') 
     {
      vml.setAttribute('stroked', 'true');
      vml.setAttribute('fillcolor', fillColor);
     } 
      else 
     {
      vml.setAttribute('stroked', 'false');
     }    
   
    
    var fontObj =this.container.ownerDocument.createElement("font");  
      fontObj.face = document.forms[0].option_text_family.value;
      fontObj.size = parseFloat(document.forms[0].option_text_size.value);   
       fontObj.color = fillColor;  
       fontObj.innerHTML = data;
         
      
 
        
 
     var fillObj = this.container.ownerDocument.createElement("v:fill");
          fillObj.setAttribute('color', fillColor);
          fillObj.setAttribute('on', 'true');
      var lineObj = this.container.ownerDocument.createElement('v:line'); 
    lineObj.style.position = 'absolute';
    lineObj.setAttribute('from', left + 'px,' + top + 'px');
    lineObj.setAttribute('to', (left+100) + 'px,' + (top+0) + 'px');
       */ 
        //textPathObj.style.
       //textPathObj.appendChild(fontObj); 
       
       //fontObj.stroked='true'; 
       
       //strokeObj.strokeweight='7px';
       // strokeObj.color = fillColor;   
       //strokeObj.on='true';
     
       
      //textBoxObj.appendChild(strokeObj);
 
    //vml.appendChild(lineObj); 
    
    vml.appendChild(textPathObj);  
    vml.appendChild(pathObj);  
    
    
  }    
 
  
  if (lineColor != '') {
    vml.setAttribute('stroked', 'true');
    vml.setAttribute('strokecolor', lineColor);
    vml.setAttribute('strokeweight', lineWidth);
    var fill = this.container.ownerDocument.createElement('v:fill'); 
      fill.setAttribute("opacity", parseFloat(fillOpac));
                 vml.appendChild(fill);
    
  }
  else {
    vml.setAttribute('stroked', 'false');  
    var stroke = this.container.ownerDocument.createElement('v:stroke'); 
      stroke.setAttribute("opacity", parseFloat(lineOpac));
                 vml.appendChild(stroke);
  }
  
  
  this.container.appendChild(vml);
  
  return vml;
};  

VMLRenderer.prototype.datacreate = function(fillColor, lineColor, lineWidth, left, top, width, height,data) {
  var vml; 
  var re_split = /[ ,]/;
  vml = this.container.ownerDocument.createElement('v:shape'); 
  var path01 = this.container.ownerDocument.createElement('v:path');  
  // adjust some SVG path commands to VML commands
  var path = data
  path = path.replace(/c/g,'v');
  path = path.replace(/z/g,'x'); //or e?
  // round all decimal points to integers
  // VML does not appear to parse them correctly
  if (path.search(/\./) > -1) 
   {
     pathitems = path.split(re_split);
     for (var i=0; i<pathitems.length; i++) 
      {
         if (isNaN(parseFloat(pathitems[i])) == false)
          {
              pathitems[i] = Math.round(pathitems[i]);
          }
      }
      path = pathitems.join(" ");
   }
  path01.setAttribute("v", path);  
  vml.style.position="absolute";  
  vml.style.width= '21600';//700+"px";
  vml.style.height='21600';//500+"px";
  vml.style.left="0px";  
  vml.style.top="0px";    
  //vml.setAttribute('coordsize',datasplit[0]+','+datasplit[1]);//700,500 
  vml.setAttribute('coordsize', '21600,21600');//('coordsize','700,500');//700,500 
  if (fillColor != '') 
   {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor);
   }else {
      vml.setAttribute('filled', 'false');
   }    
  vml.appendChild(path01)
  this.container.appendChild(vml);
  return vml;

};   

VMLRenderer.prototype.index = function(shape,order) {  
 
     if(order==-1)
      {
        this.container.appendChild( shape );
      }
      if(order==0){
     
         this.container.insertBefore( shape, shape.parentNode.firstChild );
      } 
 
   if(order==1 || order==2)
    {
         var id=shape.getAttribute('id');
        //alert(id);
        
        
        var numNodes=this.container.childNodes.length;
        //alert(numNodes);
          
        var num=0;
        for(var i = 1; i < numNodes; i++)
         {                                                   
           
           var etiq=this.container.childNodes[i].getAttribute('id');
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
                this.container.insertBefore( shape, this.container.childNodes[num-1]);
               } 
           }
          if(order==2){ 
               if((num+1)<numNodes)
               {
                  this.container.insertBefore( shape, this.container.childNodes[num+2]);
               }
          } 
          
    } 
    
    
    
}
VMLRenderer.prototype.remove = function(shape) {
  if(shape!=null){ shape.removeNode(true); }
}

VMLRenderer.prototype.removeAll = function() {  
 while( this.container.hasChildNodes () ){
   this.container.removeChild( this.container.firstChild );
   //this.container.removeNode( this.container.firstChild );
 }
   /*var contshapes =  this.container.childNodes.length;       
    
                          
    var cad=contshapes+'   ';
    for(var i = 0; i < contshapes; i++)
    {                                  
        //alert(i); 
        
        if(this.container.childNodes[i].id) {
             this.container.removeChild(this.container.childNodes[i]);
         }else{
            //cad+=i+'_'+this.svgRoot.childNodes[i].id+' ';
         }
    } 
    //alert(cad);  
*/ 
} 
VMLRenderer.prototype.copy = function(shape) 
 {
   var vml;
   vml =shape.cloneNode(false);
   //vml.setAttribute('fillcolor', "#aa00aa");
   return vml;
 };


VMLRenderer.prototype.paste = function(clipboard,left,top) 
 {
   //var svg;
   //svg =shape;
   
   //clipboard.setAttribute('fillcolor', "#0000aa");
   //clipboard.setAttribute('transform', "translate("+left+","+top+")"); 
   this.container.appendChild(clipboard);
  return clipboard;
 };


VMLRenderer.prototype.duplicate = function(shape) 
 {
   var vml;
   vml =shape.cloneNode(false);
   vml.setAttribute('fillcolor', "#aa00aa");
   this.container.appendChild(vml);
  return vml;
 };

VMLRenderer.prototype.undo = function() 
 {
   this.container.removeChild( this.container.lastChild );
 };
 

var left1=0;;
    var top1=0;   
var pati; 
var pathid, pathini;  
     
VMLRenderer.prototype.move = function(shape, left, top,fromX,FromY) {    
   this.editor.typeTransform='Translate'; 
         //this.editor.contmove++;
  if (shape.tagName == 'line') {
    shape.style.marginLeft = left;
    shape.style.marginTop = top;
  } 
   if (shape.tagName == 'polyline') {
    shape.style.marginLeft = left;
    shape.style.marginTop = top;

   }   
   if (shape.tagName == 'oval') {
    shape.style.left = left;
    shape.style.top = top;
  }      
  if (shape.tagName == 'rect') {
    shape.style.left = left;
    shape.style.top = top;
  } 
  
    if (shape.tagName == 'image') {
    shape.style.left = left;
    shape.style.top = top;
  }      
   if (shape.tagName == 'shape') { 
        
       shape.style.left=left+"px";  
        shape.style.top=top+"px";  
    
   }   
      

};


VMLRenderer.prototype.track = function(shape) {
  // TODO
};

VMLRenderer.prototype.clic = function(shape) {
         var end='';
	if(this.editor.path_close==true){end=' ';}

        var thispath='m '+this.editor.setPoints[0]+' l';  
        var maxcont=this.editor.setPoints.length;
      
        for(var conta=1;conta< maxcont;conta++){        
          thispath+=this.editor.setPoints[conta]+' ';
          
	
        }
       	var path=thispath+end+' e';
        shape.style.position="absolute";  
        shape.style.width= 700+"px";
	shape.style.height=500+"px";
        shape.style.left="0px";  
        shape.style.top="0px";    

       
         	shape.children[0].setAttribute("v",path);
               document.forms[0].control_codebase.value=path;
 
}


VMLRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {     
 //var vml;
  var deltaX = toX - fromX;
  var deltaY = toY - fromY; 
    var shap=1;
    if (shape.tagName == 'line') { shap=0; }   
   if (shape.tagName == 'polyline') { shap=2; } 
    
  if (shape.tagName == 'line') {
    shape.setAttribute('to', toX + 'px,' + toY + 'px');
  }
  if (shap == 1) {
    if (deltaX < 0) {
      shape.style.left = toX + 'px';
      shape.style.width = -deltaX + 'px';
    }
    else {
      shape.style.width = deltaX + 'px';
    }
  
    if (deltaY < 0) {
      shape.style.top = toY + 'px';
      shape.style.height = -deltaY + 'px';
    }
    else {
      shape.style.height = deltaY + 'px';
    }
  }
   if (shap == 2) {   
        this.editor.xpArray.push(toX);
        this.editor.ypArray.push(toY);
	
        //this.editor.xpArray.push(finetoX);
        //this.editor.ypArray.push(finetoY);    
    
       var thispath=' '+this.editor.xpArray[1]+','+this.editor.ypArray[1];  
       var maxcont=this.editor.xpArray.length;
       //alert(maxcont);
        for(var conta=2;conta< maxcont;conta++){        
          thispath+=' '+this.editor.xpArray[conta]+','+this.editor.ypArray[conta]; 
        }
        //alert(shape.points[1]);
    //shape.setAttribute("points",thispath);       
    shape.points.Value = thispath;
      
        /*
        var thispath=''+this.editor.xpArray[0]+','+this.editor.ypArray[0]; 
        var thispatho=new Array();   
        thispatho.push(toX); 
          thispatho.push(toY);
       var maxcont=this.editor.xpArray.length;
       //alert(maxcont);
        for(var conta=2;conta< maxcont;conta++){        
          thispath+=','+this.editor.xpArray[conta]+','+this.editor.ypArray[conta]; 
        }
        //alert(shape.points[1]);
    shape.setAttribute("points",thispath);   
          */
   }
  if(shape.tagName == 'shape')
   {    
          
      if (this.editor.selectmode == 'controlpath')
     {    
        
                 var end='';
	if(this.editor.path_close==true){end=' ';}

        var thispath='m '+this.editor.setPoints[0]+' l';  
        var maxcont=this.editor.setPoints.length;
      
        for(var conta=1;conta< maxcont;conta++){        
          thispath+=this.editor.setPoints[conta]+' ';
          
	
        }
        var path=thispath+toX+','+toY+end+' e';
 
        shape.style.position="absolute";  
        shape.style.width= 700+"px";
	shape.style.height=500+"px";
        shape.style.left="0px";  
        shape.style.top="0px";    

         	shape.children[0].setAttribute("v",path);
               document.forms[0].control_codebase.value=path;

          
     }
      else
     {  
      
      this.editor.xpArray.push(toX);
      this.editor.ypArray.push(toY);
	
        //this.editor.xpArray.push(finetoX);
        //this.editor.ypArray.push(finetoY);    
        var thispath2='';
       var thispath1=' '+this.editor.xpArray[1]+','+this.editor.ypArray[1];  
       var maxcont=this.editor.xpArray.length;
       //alert(maxcont);
        for(var conta=2;conta< maxcont ;conta++){        
          thispath2+=''+this.editor.xpArray[conta]+','+this.editor.ypArray[conta]+',';
          if((conta+2)%3==0){thispath2+='';} 
        } 
        thispath2+=''+this.editor.xpArray[maxcont]+','+this.editor.ypArray[maxcont]+'';   
        
        //alert(shape.points[1]);   
        //appendChild(path01)
       //var path01=shape.getFirstChild();  
       var path01 = this.container.ownerDocument.createElement('v:path');  
       path01.setAttribute("v", "m"+thispath1+" l"+ thispath2+" e"); 
        //shape.margin-left="300px";  
        //shape.margin-top="200px";    
  
      //shape.setAttribute('path','m '+thispath1+ ' c'+thispath2+'  e'); 
       if(shape.children[0].tagName=='textpath')
        {      
                var path01 = this.container.ownerDocument.createElement('v:path');  
                path01.setAttribute("v", 'm 100 100 l 600 100 e'); 

            //if(this.editor.xpArray.length>1)
             //{       shap.style.position="absolute";  
                    shape.style.width=100+"px";
                    shape.style.height=100+"px";
                    shape.style.left=toX+"px";  
                    shape.style.top=toY+"px";  
                    shape.style.margin=0+"px";  
                    shape.style.padding=0+"px";  
                    shape.appendChild(path01); 
             //}    
        }
         else
        {  
              shape.style.position="absolute";  
          shape.style.width= 700+"px";
	  shape.style.height=500+"px";
          shape.style.left="0px";  
          shape.style.top="0px";    
          //shape.setAttribute('coordsize', '700,500');  
          shape.appendChild(path01);  
          }
        
       //shape.setAttribute('position', 'absolute'); 
       //shape.translate(this.editor.xpArray[conta+1]+','+this.editor.ypArray[conta+1]); 
      //shape.setAttribute('coordsize', '700,500');
       // shape.v.Value ='M '+thispath1+ ' C'+thispath2+' x e';      
      //shape.v.Value = 'M '+thispath+ ' c '+thispath2;
      //shape.setAttribute("v", 'M '+thispath+ ' C '+thispath2);  
		//shape.setAttribute('path','M '+thispath+ ' C '+thispath2);
   } 	
  } 
  
};  


VMLRenderer.prototype.tocurve = function() {


};


VMLRenderer.prototype.info = function(shape)
{   
var shInfo = {};
shInfo.id = shape.id;
 shInfo.type = shape.tagName;
 if (shape.tagName == 'rect') 
   {
    shInfo.left = parseFloat(shape.getAttribute( 'x'));
    shInfo.top = parseFloat(shape.getAttribute( 'y'));
    shInfo.width = parseFloat(shape.getAttribute('width'));
    shInfo.height = parseFloat(shape.getAttribute('height'));   
    //++
    //shInfo.rotate = parseFloat(shape.getAttribute('rotation'));  
   }
  else if (shape.tagName == 'oval') 
   {
    shInfo.width = parseFloat(shape.getAttribute('rx'))*2;
    shInfo.height = parseFloat(shape.getAttribute('ry'))*2;   
    shInfo.left = (shInfo.width * 2)  - parseFloat(shape.getAttribute('rx'));
    shInfo.top = (shInfo.height * 2)  - parseFloat(shape.getAttribute('ry'));
 
   }
  else if (shape.tagName == 'roundrect') 
   {
    shInfo.left = parseFloat(shape.getAttribute('x'));
    shInfo.top = parseFloat(shape.getAttribute('y'));
    shInfo.width = parseFloat(shape.getAttribute('width'));
    shInfo.height = parseFloat(shape.getAttribute('height'));   
   
   }
  else if (shape.tagName == 'line') 
   {
    shInfo.left = parseFloat(shape.getAttribute('x1'));
    shInfo.top = parseFloat(shape.getAttribute('y1'));

   } 
  else if (shape.tagName == 'polyline') 
   {
    shInfo.points = shape.getAttribute('points');
   }
   else if (shape.tagName == 'image') 
   {
    shInfo.left = parseFloat(shape.getAttribute('x'));
    shInfo.top = parseFloat(shape.getAttribute('y'));
    shInfo.width = parseFloat(shape.getAttribute('width'));
    shInfo.height = parseFloat(shape.getAttribute('height'));   
    shInfo.src = shape.getAttribute('src');  
   } 
  else 
  
   if (shape.tagName == 'shape')
   {  
       if(shape.children[0].tagName=='path') {
              shInfo.d = shape.getAttribute('v'); 
             document.forms[0].codebase.value=shape.getAttribute('v'); 
             
       }
       if(shape.children[0].tagName=='textpath') {
             shInfo['font-family'] = shape.children[0].getAttribute('font-family')
           shInfo['font-size'] = parseInt(shape.children[0].getAttribute('font-size'))
        shInfo.top = parseFloat(shape.children[0].getAttribute('y'))
        shInfo.left = parseFloat(shape.children[0].getAttribute('x'))
        shInfo.text = shape.textContent

       }
   }
   return shInfo;  
   	
   	
}
VMLRenderer.prototype.transformShape = function(shape,data,transform)
{   
 
 if(shape.tagName == 'rect')
  { 
    
    var box = this.bounds(shape);
    var sdata=data.split(';'); 
    
    //alert(data[0]); 
      shape.style.top = parseFloat(sdata[0]) + 'px';  
      shape.style.left = parseFloat(sdata[1]) + 'px';
      shape.style.width = parseFloat(sdata[2]) + 'px';    
      shape.style.height = parseFloat(sdata[3]) + 'px';
     
      
   
   // var centerx=parseFloat(sdata[0])+parseFloat(box.width/2);
   // var centery=parseFloat(sdata[1])+parseFloat(box.height/2);    
    shape.style.rotation=parseFloat(sdata[4]);
    
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
       shape.setAttribute('font-size',parseFloat(sdata[1])); 
        shape.setAttribute('font-family',sdata[2]);
     }
   //shape.nodparseFloatue=data;
  }
   else
 if (shape.tagName == 'polyline') 
  {
    shape.setAttribute('points',data);
  }
   else 
 if (shape.tagName == 'image') 
  {   
    //alert(data);  
    if(data.indexOf(';',0)==-1 )
     {  
      shape.setAttribute('src',data);
     }
      else
     {  
        var box = this.bounds(shape);
        var sdata=data.split(';');
        shape.style.top = parseFloat(sdata[0]) + 'px';  
        shape.style.left = parseFloat(sdata[1]) + 'px';
        shape.style.width = parseFloat(sdata[2]) + 'px';    
        shape.style.height = parseFloat(sdata[3]) + 'px';
        var centerx=parseFloat(sdata[0])+parseFloat(box.width/2);
        var centery=parseFloat(sdata[1])+parseFloat(box.height/2);    
        shape.style.rotation=parseFloat(sdata[4]);


     } 
      
  }
   else 
 if (shape.tagName == 'path')
  {     
    if(data.indexOf(';',0)==-1 )
     {  
    	//shape.setAttribute( 'd', data);  //????????
    	//shape.setAttribute( 'transform', transform);  
     }
      else
     {  
        var box = this.bounds(shape);
        var sdata=data.split(';');
        var centerx=parseFloat(sdata[0])+parseFloat(box.width/2);
        var centery=parseFloat(sdata[1])+parseFloat(box.height/2);    
        //++shape.setAttribute( 'transform','scale('+parseFloat(sdata[2])+','+parseFloat(sdata[3])+')'+' rotate('+parseFloat(sdata[4])+','+centerx+','+centery+')'+' translate('+parseFloat(sdata[0])+','+parseFloat(sdata[1])+')');


     } 
  }  
   	                   
   	
}
VMLRenderer.prototype.editShape = function(shape,data)
{   
if(shape.tagName == 'text'){
shape.textContent = data
}else
   if (shape.tagName == 'polyline') 
   {
    shape.setAttribute('points',data);
   }
  else 
  
  if (shape.tagName == 'path')
   {
    	shape.setAttribute('v', data);  
    	
   }  
   	 
   	
}
VMLRenderer.prototype.editCommand = function(shape, cmd, value)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (value != '') {
        shape.filled = 'true';
        shape.fillcolor = value;
      }
      else {
        shape.filled = 'false';
        shape.fillcolor = '';
      }
    }
    else if (cmd == 'linecolor') {
      if (value != '') {
        shape.stroked = 'true';
        shape.strokecolor = value;
      }
      else {
        shape.stroked = 'false';
        shape.strokecolor = '';
      }
    }
    else if (cmd == 'linewidth') {
      shape.strokeweight = parseInt(value) + 'px';
    } 
     else if (cmd == 'fillopacity') {
           
             shape.fill.opacity= parseFloat(value);
            //shape.style.fill.setAttribute("opacity", parseFloat(value)); 
      
    }
  }
}


VMLRenderer.prototype.queryCommand = function(shape, cmd)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (shape.filled == 'false')
        return '';
      else
        return shape.fillcolor;
    }
    else if (cmd == 'linecolor') {
      if (shape.stroked == 'false')
        return '';
      else
        return shape.strokecolor;
    }
    else if (cmd == 'linewidth') {
      if (shape.stroked == 'false') {
        return '';
      }
      else {
        // VML always transforms the pixels to points, so we have to convert them back
        return (parseFloat(shape.strokeweight) * (screen.logicalXDPI / 72)) + 'px';
      }
    }
  }
}

VMLRenderer.prototype.getProperties = function(shape)
{
  var result = '';
  
  if (shape != null) 
   {
      result = shape.fillcolor;
      if (shape.filled=='false')
       {
         mefillColor.visible = 'hidden';
         mefillColor.hex = '#000000'; 
         filldraw=true;
         setbe(1,'img_okfill');
       }
        else
       {   
         //alert(mefillColor.hex+' '+result);
         mefillColor.visible = 'visible';
         mefillColor.hex = result; 
         var rgb=hex2rgb(result)
         mefillColor.r=rgb[0];
         mefillColor.g=rgb[1];
         mefillColor.b=rgb[2];
         filldraw=false;
         setbe(1,'img_okfill');

       }

      result = shape.strokecolor;
      if (shape.stroked=='false')
       {    
         mestrokeColor.visible = 'hidden'; 
         mestrokeColor.hex = '#000000';
         mestrokeColor.width = 0;
         strokedraw=true;
         setbe(2,'img_okstroke');

       }
        else
       { 
         mestrokeColor.visible = 'visible'; 
         mestrokeColor.hex = result; 
         var rgb=hex2rgb(result)
         mestrokeColor.r=rgb[0];
         mestrokeColor.g=rgb[1];
         mestrokeColor.b=rgb[2];
         strokedraw=false;
         setbe(2,'img_okstroke');

       }

      result = shape.strokeweight;
      mestrokeColor.width = result;
 
      result = shape.fillopacity; 
      mefillColor.opacity = result;

      result = shape.strokeopacity;
      mestrokeColor.opacity = result;
      
      setProperties();
   }
}

VMLRenderer.prototype.showMultiSelect = function(iniX,iniY) { 
  var tracker = document.getElementById('trackerMultiSelect');
  if (tracker) {
    this.remove(tracker);
  } 
  var coord=this.editor.inputxy;
	toX=parseFloat(coord[0]);
	toY=parseFloat(coord[1]); 
	
   tracker = this.container.ownerDocument.createElement('v:rect');
  
  tracker.style.position = 'relative';
  tracker.style.left = iniX;
  tracker.style.top = iniY;
  tracker.style.width = toX ;
  tracker.style.height = toY;
  tracker.setAttribute('filled', 'false');
  tracker.setAttribute('stroked', 'true');
  tracker.setAttribute('strokecolor', 'blue');
  tracker.setAttribute('strokeweight', '1px');    
  
  this.container.appendChild(tracker);    
}

VMLRenderer.prototype.showNodesCurve = function(path){
  var points=path.split('c');
     var chain='';
     var segment=' ';
     var numpoints=points.length-1;
     for(var a=1;a<numpoints;a++)
      {   
        segment=points[a].split(' ');
         chain+=segment[0]+' ';       
      } 
      
         $('someinfo').value=numpoints+ ' nodes ';
    return chain;    
        
};



VMLRenderer.prototype.showTracker = function(shape) {
  var box = this.bounds(shape);
  var trshape = parseFloat(shape.getAttribute('rotation'));  
  var tracker = document.getElementById('tracker');
  if (tracker) {
    this.remove(tracker);
  }
  
  if (shape.tagName == 'shape') 
   { 
      shap=2; 
      if(shape.children[0].tagName == 'path') 
       {
      
            /* $('option_path_trx').value= box.x;  
             $('option_path_try').value= box.y;
             $('option_path_sclx').value= box.width;   
             $('option_path_scly').value= box.height; 
             $('option_path_rot').value= shape.style.rotation;
             */  
             var path=shape.children[0].getAttribute('v');
              $('control_codebase').value=path;
       }        
   }     
  if (shape.tagName == 'rect') { 
     
     $('option_rect_rot').value= shape.getAttribute('rotation');
     $('option_rect_trx').value= box.x;  
     $('option_rect_try').value= box.y;
     $('option_rect_sclx').value= box.width;  
     $('option_rect_scly').value= box.height;

  }  

  if (shape.tagName == 'image'){
  /*  $('option_img_trx').value= box.x; 
    $('option_img_try').value= box.y;
    $('option_img_sclx').value= box.width;  
    $('option_img_scly').value= box.height;
    $('option_img_rot').value= T.b* (Math.PI * 2 / 360);   
      */
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
  if (shape.tagName == 'oval'){  
    /*$('option_ellipse_trx').value= putx;  
    $('option_ellipse_try').value= puty;
    $('option_ellipse_sclx').value= box.width;  
    $('option_ellipse_scly').value= box.height;
    $('option_ellipse_rot').value= T.b* (Math.PI * 2 / 360);
    */
  }
  
  
  
 /*var matrix = shape.getScreenCTM();
  var trshape= shape.getAttribute('transform');  
  var shap=1;
  if (shape.tagName == 'path') { shap=2; 
        
        
        
  }
  */  
  //if (shape.getAttribute('transform') ) { shap=2; } 
  //var svgNamespace = 'http://www.w3.org/2000/svg';
  
   tracker = this.container.ownerDocument.createElement('v:group');
   tracker.id = 'tracker'; 
  //tracker.setAttribute('rotation',trshape);
  tracker.setAttribute('coordorigin','0, 0');
  //tracker.setAttribute('wrapcoords',true);
 
   
  tracker.setAttribute('coordsize',box.width+','+ box.height);
  tracker.style.position = 'absolute';   
  tracker.style.left = box.x ;
  tracker.style.top = box.y;
  tracker.style.width = box.width ;
  tracker.style.height = box.height ;
       
        
        
        
        
   
    
    
    
    ////////////////

 /*
       
       var trshape='translate (0,0) rotate(0) translate(0,0) '; 
       var trshape_split=trshape.split(') ');    
       
      // get_between (trshape, s1, s2) ;
     if(shape.getAttribute('transform')){ 
         var trshape=shape.getAttribute('transform') ;   
         //var spl=trshape.replace(', ',' ');  
         //var spl1=spl.replace(')',' ');    
         var trshape_split=trshape.split(') '); 
         

    }
  */
                                         
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
      
      
 var border_square = this.container.ownerDocument.createElement('v:rect');
  
  border_square.style.position = 'relative';
  border_square.style.left = 0 - 10;
  border_square.style.top = 0 - 10;
  border_square.style.width = box.width + 20;
  border_square.style.height = box.height + 20;
  border_square.setAttribute('filled', 'false');
  border_square.setAttribute('stroked', 'true');
  border_square.setAttribute('strokecolor', 'blue');
  border_square.setAttribute('strokeweight', '1px');  
  
  
  var border_angle = this.container.ownerDocument.createElement('v:polyline');  
  border_angle.style.position = 'relative';
 
    //border_angle.setAttribute('from',(box.width+10) + 'px,' + (box.height/2) + 'px');
   //border_angle.setAttribute('to', (box.width+10+25) + 'px,' + (box.width+10) + 'px');
  border_angle.setAttribute('filled', 'false');
  border_angle.setAttribute('stroked', 'true');
  border_angle.setAttribute('strokecolor', 'blue');
  border_angle.setAttribute('strokeweight', '1px'); 
  border_angle.setAttribute("points", (box.width+10)+","+((box.height/2))+", "
                                      +(box.width+10+25)+","+((box.height/2)) );
                  
      
    /* var path01 = this.container.ownerDocument.createElement('v:path');  
     //path01.setAttribute("v", "m "+thispath+" c"+ thispath2+" e ");  
     path01.setAttribute("v", "m"+(min.x-10)+","+ (min.y-10)+" r"+(box.width+20)+","+(0)+" r"+(0)+","+(box.height+20)+" r"+(-box.width-20)+','+(0)+"x e m"+(box.x+box.width+10)+","+ (box.y+(box.height/2))+" r"+(25)+",0  e ");
     border.appendChild(path01)
    */ 
     //border.setAttribute('stroke-width', '1'); 
       
// createRect(min.x, min.y, max.x - min.x, max.y - min.y);
  
  
 /* tracker = this.container.ownerDocument.createElement('v:rect');
  tracker.id = 'tracker';
  tracker.style.position = 'absolute';
  tracker.style.left = box.x - 10;
  tracker.style.top = box.y - 10;
  tracker.style.width = box.width + 20;
  tracker.style.height = box.height + 20;
  tracker.setAttribute('filled', 'false');
  tracker.setAttribute('stroked', 'true');
  tracker.setAttribute('strokecolor', 'blue');
  tracker.setAttribute('strokeweight', '1px');
  this.container.appendChild(tracker);
 */
     var circle1 = this.container.ownerDocument.createElement('v:oval'); 
      circle1.style.position = 'relative'; 
        circle1.style.left = ( (box.width+40)-5);
    circle1.style.top = ( (box.height / 2) -5);
    circle1.style.width = (10);
    circle1.style.height = (10);
    circle1.setAttribute('filled', 'true');
   circle1.setAttribute('stroked', 'true'); 
   circle1.setAttribute('fillcolor', '#ffffff');
   circle1.setAttribute('strokecolor', 'green');
   circle1.setAttribute('strokeweight', '1px');

   
  var rect1 = this.container.ownerDocument.createElement('v:rect');
  rect1.style.position = 'relative';
  rect1.style.left =  - 10-5;
  rect1.style.top =  - 10-5;
  rect1.style.width = 10;
  rect1.style.height = 10;
  rect1.setAttribute('filled', 'true');
  rect1.setAttribute('stroked', 'true'); 
  rect1.setAttribute('fillcolor', '#ffffff');
  rect1.setAttribute('strokecolor', 'green');
  rect1.setAttribute('strokeweight', '1px');

    
  var rect2 = this.container.ownerDocument.createElement('v:rect');
  rect2.style.position = 'relative';
  rect2.style.left =   box.width +5;
  rect2.style.top = -10 -5;
  rect2.style.width = 10;
  rect2.style.height = 10;
  rect2.setAttribute('filled', 'true');
  rect2.setAttribute('stroked', 'true'); 
  rect2.setAttribute('fillcolor', '#ffffff');
  rect2.setAttribute('strokecolor', 'green');
  rect2.setAttribute('strokeweight', '1px');

                                                        
  var rect3 = this.container.ownerDocument.createElement('v:rect');
  rect3.style.position = 'relative';
  rect3.style.left =   box.width+5;
  rect3.style.top =  box.height+5;
  rect3.style.width = 10;
  rect3.style.height = 10;
  rect3.setAttribute('filled', 'true');
  rect3.setAttribute('stroked', 'true'); 
  rect3.setAttribute('fillcolor', '#ffffff');
  rect3.setAttribute('strokecolor', 'green');
  rect3.setAttribute('strokeweight', '1px');
   
  var rect4 = this.container.ownerDocument.createElement('v:rect');
  rect4.style.position = 'relative';
  rect4.style.left =  -10-5;
  rect4.style.top = box.height+5;
  rect4.style.width = 10;
  rect4.style.height = 10;
  rect4.setAttribute('filled', 'true');
  rect4.setAttribute('stroked', 'true'); 
  rect4.setAttribute('fillcolor', '#ffffff');
  rect4.setAttribute('strokecolor', 'green');
  rect4.setAttribute('strokeweight', '1px');
 
 
 
  var rectmid12 = this.container.ownerDocument.createElement('v:rect');
  rectmid12.style.position = 'relative';
  rectmid12.style.left = (box.width/2) -5;
  rectmid12.style.top =- 10-5;
  rectmid12.style.width = 10;
  rectmid12.style.height = 10;
  rectmid12.setAttribute('filled', 'true');
  rectmid12.setAttribute('stroked', 'true'); 
  rectmid12.setAttribute('fillcolor', '#ffffff');
  rectmid12.setAttribute('strokecolor', 'green');
  rectmid12.setAttribute('strokeweight', '1px');

 var rectmid23 = this.container.ownerDocument.createElement('v:rect');
  rectmid23.style.position = 'relative';
  rectmid23.style.left = box.width +5;
  rectmid23.style.top = (box.height/2)-5;
  rectmid23.style.width = 10;
  rectmid23.style.height = 10;
  rectmid23.setAttribute('filled', 'true');
  rectmid23.setAttribute('stroked', 'true'); 
  rectmid23.setAttribute('fillcolor', '#ffffff');
  rectmid23.setAttribute('strokecolor', 'green');
  rectmid23.setAttribute('strokeweight', '1px');

 var rectmid34 = this.container.ownerDocument.createElement('v:rect');
  rectmid34.style.position = 'relative';
  rectmid34.style.left = (box.width/2)-5;
  rectmid34.style.top = box.height+5;
  rectmid34.style.width = 10;
  rectmid34.style.height = 10;
  rectmid34.setAttribute('filled', 'true');
  rectmid34.setAttribute('stroked', 'true'); 
  rectmid34.setAttribute('fillcolor', '#ffffff');
  rectmid34.setAttribute('strokecolor', 'green');
  rectmid34.setAttribute('strokeweight', '1px');

 
 var rectmid41 = this.container.ownerDocument.createElement('v:rect');
  rectmid41.style.position = 'relative';
  rectmid41.style.left =  -10-5 ;
  rectmid41.style.top =(box.height/2)-5;
  rectmid41.style.width = 10;
  rectmid41.style.height = 10;
  rectmid41.setAttribute('filled', 'true');
  rectmid41.setAttribute('stroked', 'true'); 
  rectmid41.setAttribute('fillcolor', '#ffffff');
  rectmid41.setAttribute('strokecolor', 'green');
  rectmid41.setAttribute('strokeweight', '1px');
 
       
  

     var colorin="#ff0000";
      var colorout="#ffffff" 
      
        circle1.attachEvent("onmouseover", function(event) {circle1.style.cursor= 's-resize';  circle1.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Rotate'; scaleType='nw'; }, false);
     circle1.attachEvent("onmouseout", function(event) {circle1.style.cursor= 'default';  circle1.setAttribute('fillcolor', colorout ); this.editor.typeTransform='Rotate'; }, false); //this.editor.typeTransform='rotate'
 
      
     rect1.attachEvent("onmouseover", function(event) {rect1.style.cursor= 'nw-resize';  rect1.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Scale'; scaleType='nw';  }, false);
     rect1.attachEvent("onmouseout", function(event) {rect1.style.cursor= 'default';  rect1.setAttribute('fillcolor', colorout ); this.editor.typeTransform='Scale';  }, false); //this.editor.typeTransform='rotate'
    
     rect2.attachEvent("onmouseover", function(event) {rect2.style.cursor= 'ne-resize';  rect2.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Scale'; scaleType='ne';}, false);  
     rect2.attachEvent("onmouseout", function(event) {rect2.style.cursor= 'default';  rect2.setAttribute('fillcolor', colorout ); this.editor.typeTransform='Scale'; }, false);
      
     rect3.attachEvent("onmouseover", function(event) {rect3.style.cursor= 'se-resize';  rect3.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Scale'; scaleType='se';}, false);  
     rect3.attachEvent("onmouseout", function(event) {rect3.style.cursor= 'default';  rect3.setAttribute('fillcolor', colorout ); this.editor.typeTransform='Scale'; }, false);
     
     rect4.attachEvent("onmouseover", function(event) {rect4.style.cursor= 'sw-resize';  rect4.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Scale'; scaleType='sw';}, false);  
     rect4.attachEvent("onmouseout", function(event) {rect4.style.cursor= 'default';  rect4.setAttribute('fillcolor', colorout ); this.editor.typeTransform='Scale'; }, false);
                                                    
     rectmid12.attachEvent("onmouseover", function(event) {rectmid12.style.cursor= 'n-resize';  rectmid12.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Scale'; scaleType='n';}, false);  
     rectmid12.attachEvent("onmouseout", function(event) {rectmid12.style.cursor= 'default';  rectmid12.setAttribute('fillcolor', colorout ); this.editor.typeTransform=''; }, false); 

     rectmid23.attachEvent("onmouseover", function(event) {rectmid23.style.cursor= 'e-resize';  rectmid23.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Scale'; scaleType='e';}, false);  
     rectmid23.attachEvent("onmouseout", function(event) {rectmid23.style.cursor= 'default';  rectmid23.setAttribute('fillcolor', colorout ); this.editor.typeTransform=''; }, false); 
     
     rectmid34.attachEvent("onmouseover", function(event) {rectmid34.style.cursor= 's-resize';  rectmid34.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Scale'; scaleType='s';}, false);  
     rectmid34.attachEvent("onmouseout", function(event) {rectmid34.style.cursor= 'default';  rectmid34.setAttribute('fillcolor', colorout ); this.editor.typeTransform=''; }, false); 

     rectmid41.attachEvent("onmouseover", function(event) {rectmid41.style.cursor= 'w-resize';  rectmid41.setAttribute('fillcolor', colorin ); this.editor.typeTransform='Scale'; scaleType='w'; }, false);  
     rectmid41.attachEvent("onmouseout", function(event) {rectmid41.style.cursor= 'default';  rectmid41.setAttribute('fillcolor', colorout ); this.editor.typeTransform=''; }, false); 
   //tracker.setAttribute('transform',trshape); 

 
 
  tracker.appendChild(border_square); 
  tracker.appendChild(border_angle);  
   
  tracker.appendChild(circle1);  
  
  tracker.appendChild(rect1);    
  tracker.appendChild(rect2);   
  tracker.appendChild(rect3); 
  tracker.appendChild(rect4);    
  tracker.appendChild(rectmid12);  
  tracker.appendChild(rectmid23);
  tracker.appendChild(rectmid34);
  tracker.appendChild(rectmid41);  
  
  /*
   
  
 
  */


   this.container.appendChild(tracker);



}                                      










VMLRenderer.prototype.getMarkup = function() { 
       
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


/////////////////////////////////

VMLRenderer.prototype.restruct= function(shape)
{
};        



VMLRenderer.prototype.transform = function() {

};

VMLRenderer.prototype.scaleShape = function(shape, previus,toX, toY) {
// document.forms[0].code.value="escala";      

         //document.forms[0].code.value="escala"; 
          var box = this.bounds(shape);
	 var prevbox=this.bounds(previus);
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
                 document.forms[0].code.value=angle_diagonal* 180 / Math.PI;       

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


                      document.forms[0].code.value=angle_diagonal;

      
                var section_a=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);   
                
                                         

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


                      document.forms[0].code.value=angle_diagonal;

      
                var section_a=ntrsccn2rb(ax,ay,bx,by,cx,cy,dx,dy);   
                

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
    
    
      shape.style.left = tx + 'px';
      shape.style.top = ty + 'px'; 
      shape.style.height = th + 'px';
      shape.style.width = tw + 'px';
    
  }
   else 
 if(shape.tagName == 'text')
  {
    /*
    shape.setAttribute('x',tx);
    shape.setAttribute('y',ty);   
    shape.setAttribute('width', tw);     
    shape.setAttribute('height', th); 
    
    //previus.setAttribute('transform', "scale("+trans_ShareScale+")");
     shape.setAttribute('x', tx + 'px');
    shape.setAttribute('y', ty + 'px');

    shape.setAttribute('textLength', parseInt(Math.round(tw)));    
    
     */
  } 
   else 
 if(shape.tagName == 'oval')
  {
    //shape.getAttribute('transform)
   
      shape.style.left = tx + 'px';
      shape.style.top = ty + 'px'; 
      shape.style.height = th + 'px';
      shape.style.width = tw + 'px';
 
        
  }
   else 
 if(shape.tagName == 'line')
  { 
       shape.setAttribute('to',tx + 'px,' + ty + 'px'); 
           shape.setAttribute('from', tw + 'px,' + th + 'px');
   
         
  }
   else
 if (shape.tagName == 'polyline') 
  {
   
  }
   else 
 if (shape.tagName == 'image') 
  {   
     
      shape.style.left = tx + 'px';
      shape.style.top = ty + 'px'; 
      shape.style.height = th + 'px';
      shape.style.width = tw + 'px';
      
  }
   else 
 if (shape.tagName == 'shape')
  {     

      shape.style.left = tx + 'px';
      shape.style.top = ty + 'px'; 
      shape.style.height = th + 'px';
      shape.style.width = tw + 'px';

       //document.forms[0].code.value='';
       //shape.setAttribute('transform', "scale("+trans_ShareScale+")");

  }  
   	                             

 
         
         
};  



VMLRenderer.prototype.rotateShape = function(shape, previus,toX, toY) {
 
 
 
         //document.forms[0].code.value=$('xyinput').innerHTML;  
    //document.getElementById('richdraw').style.cursor='e-resize';
         var box = this.bounds(shape);
	 var prevbox=this.bounds(previus);
	var centerx= box.x+(box.width/2);
	var centery= box.y+(box.height/2); 
	var coord=this.editor.inputxy;

       var actual_angle=ang2v(centerx,centery,coord[0], coord[1]);
       
       if(xrot<toX) { rotatexxx+=1;}else{rotatexxx-=1;}
       xrot=toX;
       yrot=toY;  
       
	var xtr=0;
        var ytr=0;
                
        //var box= shape.getBBox();  
        var tr1x=  box.x;  
         var tr1y=  box.y;

 
 
    toX+=xtr;
        toY+=xtr;

      //var trax=parseFloat(toX-box.x);   var tray= parseFloat(toY-box.y);      
      var trax=parseFloat(box.x/2);   var tray= parseFloat(box.y/2); 
       var angler=Math.atan2(toX,toY);
         var angle=angler*180/Math.PI;  
         // var T = shape.getCTM(); 
          //var rotini=T.a*(180 / Math.PI);
           //var angle=rotini*180/Math.PI;
          //var rot_angle=actual_angle*180/Math.PI;  
          //document.forms[0].code.value=centerx+' '+centery+' '+coord[0]+' '+coord[1]+'____ '+rot_angle+' '+actual_angle*180/Math.PI;
          
          
         // matrix( a, b, c, d, e, f )
         // a c e
         // b d f
         // 0 0 1
         //a scale factor of 2, a rotation of 30 deg and a translation of (500,50)
         //T     1.732   -1   500     1   1.732   50     0   0   1
         //T      1  ad-bc      d  -c -de+cf   -b  a  be-df    0   0   1
         
         //shape.setAttribute('transform', "translate("+(-xshe)+","+(-yshe)+")");
 
         // shape.setAttribute("transform", "  matrix( a, b, c, d, e, f )");
          // shape.setAttribute('transform', "translate("+(box.x+(box.width/2))+","+(box.y+(box.height/2))+")  rotate("+rotatexxx+") ");
           //shape.setAttribute('transform', "translate("+(box.x+(box.width/2))+","+(box.y+(box.height/2))+") rotate("+rotatexxx+") translate("+(-box.x-(box.width/2))+","+(-box.y-(box.height/2))+") ");
         //shape.setAttribute('transform', "rotate("+rotatexxx+","+(box.x+(box.width/2))+","+(box.y+(box.height/2))+")");
         //shape.setAttribute('transform', "rotate("+rotatexxx+","+(prevbox.x+(prevbox.width/2))+","+(prevbox.y+(prevbox.height/2))+")");
         //shape.setAttribute('rotation', rot_angle);
         shape.setAttribute('rotation', angle);
         //(prevbox.x+(prevbox.width/2))+","+(prevbox.y+(prevbox.height/2))+")");
                          
 
 
    }

//////////////////////////////
/*H  = 0;
W  = 0;
LX = new Array();
S  = new Array();
i  = 0;
b  = true;

function SVG2VML(i){
	l = L[i];
	if(l.indexOf(" d=")>0){
		p = l.indexOf("fill:")+6;
		C = l.substring(p,p+7);
		p = l.indexOf(" d=")+4;
		q = l.lastIndexOf("z")-1;
		l = l.substring(p,q);
		l = l.replace(/M/g,"m");
		l = l.replace(/c/g,"v");
		l = l.replace(/l/g,"r");
		S = l.split(" ");
		l="";
		for(var j in S){
			c = S[j];
			p = c.substring(0,1);
			d = p>"9"?p:"";
			n = Math.round(c.substring(d!="") * 100);
			l+= (d+n+" ");
		}
		LX[i] = l;
		code = '<v:shape coordsize="'+(W*100)+','+(H*100)+'" class=vml strokeweight="2" strokecolor="'+C+'" filled="false" fillcolor = "'+C+'"/>';
		VML.insertAdjacentHTML("beforeEnd",code);
	} else {
		L[i] = LX[i] = ""
		VML.insertAdjacentHTML("beforeEnd","<span></span>");
	}
}
*/
//http://msdn2.microsoft.com/en-us/library/bb263897(VS.85).aspx
//http://www.w3.org/TR/NOTE-VML
//http://trac.openlayers.org/changeset/5285
//http://vectorconverter.sourceforge.net/index.html
//http://www.dhteumeuleu.com/colorsyntax/viewJS.php?src=svg2vml1.html


VMLRenderer.prototype.getshapes = function(){
return this.container.childNodes;
}