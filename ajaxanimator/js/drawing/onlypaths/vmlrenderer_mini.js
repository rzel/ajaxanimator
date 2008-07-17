
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

VMLRenderer.prototype.removeAll = function(){
	while (this.container.hasChildNodes()) {
		this.container.removeChild(this.container.firstChild);
	}
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
    //var   thispath=''+xpArray[0]+','+ypArray[0];      
    var thispath='M '+xpArray[1]+', '+ypArray[1]+' l'; 
    var maxcont=xpArray.length;
    for(var conta=2;conta< maxcont;conta++)
     {        
         thispath+=' '+xpArray[conta]+', '+ypArray[conta];
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
    //var   thispath=''+xpArray[0]+','+ypArray[0];      
    var thispath=' '+xpArray[1]+','+ypArray[1]+' l'; 
    var maxcont=xpArray.length;
    for(var conta=2;conta< maxcont;conta++)
     {        
         thispath2+=' '+xpArray[conta]+','+ypArray[conta];
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
    var data =document.forms[0].option_text_message.value;
    vml = this.container.ownerDocument.createElement('v:image'); 
    vml.setAttribute('src',data_image_href);
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
   
    var data =document.forms[0].option_text_message.value;
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
        
        textPathObj.style.fontFamily=document.forms[0].option_text_family.value;  
        textPathObj.style.fontSize=parseFloat(document.forms[0].option_text_size.value)+'px'; 
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
