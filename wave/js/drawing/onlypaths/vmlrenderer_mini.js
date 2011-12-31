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
  //style.coordsize=screen.availWidth+","+screen.availHeight;
 }




VMLRenderer.prototype.create = function(shape, fillColor, lineColor, fillOpac, lineOpac, lineWidth, left, top, width, height, textMessaje, textSize, textFamily, imageHref, points, transform, parent) {
  var vml;
    var shap=1;
     if (shape == 'rect') {
    vml = this.container.ownerDocument.createElement('v:rect');  
    vml.style.position = 'absolute';
    vml.style.left = left; 
    
    vml.style.top = top;
    vml.style.width = width;
    vml.style.height = height;
    if (fillColor != ''  || fillColor != 'none') {
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
              vml.setAttribute('filled', 'true'  || fillColor != 'none');
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
              if (fillColor != ''  || fillColor != 'none') {
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
    vml.setAttribute("points", points); 
    //vml.setAttribute("coordorigin","0 0");   
    //vml.setAttribute("coordsize","200 200");
    //vml.setAttribute("path", "m 8,65 l 72,65, 92,11, 112,65, 174,65, 122,100, 142,155, 92,121, 42,155, 60,100 x e;
    //vml.setAttribute("path", "M320 32 c"+ thispath+" z ");     
    //vml.setAttribute("v", "m 10,70 l 85,10,160,70,160,160,10,160 x e");
    if (fillColor != '') {
      vml.setAttribute('filled', 'true'  || fillColor != 'none');
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
    path01.setAttribute("v", points);
    //path01.setAttribute("v", "m "+thispath+" c"+ thispath2+" e ");  
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
    if (fillColor != ''  || fillColor != 'none') {
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

     if (fillColor != ''  || fillColor != 'none') {
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
    var data =imageHref;//document.forms[0].option_text_message.value;
    vml = this.container.ownerDocument.createElement('v:image'); 
    vml.setAttribute('src',imageHref);
    vml.style.position="absolute";  
    vml.style.width=width+"px";
    vml.style.height=height+"px";
    vml.style.left=left+"px";  
    vml.style.top=top+"px";  
    vml.style.margin=0+"px";  
    vml.style.padding=0+"px";  
    if (fillColor != ''  || fillColor != 'none') {
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
    
 else if (shape == 'textpath') 
  {   
   
    var data =textMessaje;
    vml = this.container.ownerDocument.createElement('v:shape');
    vml.style.position="absolute";  
    //vml.setAttribute('coordorigin',left+', '+top);
     //vml.style.coorsize= '';
     coordorigin="0, 0"
    vml.style.width= 100+'px'
    vml.style.height=100+'px'
    vml.style.left=left+"px";  
    vml.style.top=top+"px";  
    vml.style.margin=0+"px"; 
    //vml.style.centerX=left+"px";  
    //vml.setAttribute('center-x',(left+300)+'px');  
    vml.style.padding=0+"px";  
    if (fillColor != ''  || fillColor != 'none') 
     {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor);
     }
      else
     {
      vml.setAttribute('filled', 'false');
     }
    if(lineWidth==0 || lineWidth=='none' || lineColor== 'none' ) 
     {
         vml.setAttribute('stroked', 'false');  
     }
      else
     {   
         vml.setAttribute('stroked', 'true');
         vml.setAttribute('strokeweight', parseFloat(lineWidth)+'px');//document.forms[0].linewidth.options[document.forms[0].linewidth.selectedIndex].value+'px');
         vml.setAttribute('strokecolor',lineColor);//document.forms[0].linecolor.options[document.forms[0].linecolor.selectedIndex].value);
     }   
     vml.setAttribute('path','m '+0+' '+0+' r '+(700)+' '+0+' e'); 
     var textPathObj = this.container.ownerDocument.createElement("v:textpath");
     textPathObj.setAttribute('string', data); 
      textPathObj.setAttribute('fitshape','false'); 
     textPathObj.setAttribute('trim', 'false'); 
     textPathObj.setAttribute('fitpath', 'false');
     textPathObj.setAttribute('on','true');  
     textPathObj.style.fontFamily=textFamily;  
     textPathObj.style.fontSize=parseFloat(textSize)+'px'; 
     textPathObj.setAttribute('vTextKern','true');  
     textPathObj.setAttribute('text-align','right');   
     //? textPathObj.setAttribute('v-rotate-letters','true'); 
     var pathObj = this.container.ownerDocument.createElement("v:path");
     pathObj.setAttribute('textpathok', 'true');  
     
     //var textHandles = this.container.ownerDocument.createElement("v:handles");  
     //textHandles.setAttribute('position')='bottomRight';

     //vml.appendChild(textHandles);  
     vml.appendChild(textPathObj);  
     vml.appendChild(pathObj);  
    
    
  }    


    
 else if (shape == 'text') 
  { 
    //style="position: absolute; width: 500; height: 500; left:300; top:50;"   
    //coordorigin="-30 -30" coordsize="500 500"  
    vml = this.container.ownerDocument.createElement('v:shape');
    vml.style.position="absolute";  
    //vml.setAttribute('coordorigin',0+', '+0);
   
     vml.style.coordsize=1000+', '+1000;
     //vml.style.coorsize= '';
    // coordorigin="0, 0"
    vml.style.width= 1000;
    vml.style.height=1000;
    vml.style.left=left;  
    vml.style.top=top-parseFloat(textSize);  
 
    //vml.style.centerX=left+"px";  
    //vml.setAttribute('center-x',(left+300)+'px');  
    vml.style.padding=0;  
    var textBox = this.container.ownerDocument.createElement("v:textbox");



     /*<v:textbox> <div style="font-family: Verdana;" ><b style="color:purple">C</b>
            <b style="color:rgb(153, 50, 204)">U</b>
            <b style="color:rgb(255, 0, 255)">R</b>
            <b style="color:red; font-size:20;">V</b>
            <b style="color:rgb(255, 192, 203); font-size:20;">E</b>
            </div>
       */     
     //textBox.textContent='<div style="font-family: Verdana;">'+textMessaje+'</div>';
     var divtext = this.container.ownerDocument.createElement("div");  
     divtext.style.coordorigin=0+', '+(0);      
     divtext.style.margin=0;   
     divtext.style.fontFamily=textFamily; 
     divtext.style.margin=0; 
     divtext.style.padding=0;
     
     
     divtext.style.fontSize=parseFloat(textSize); 
     divtext.style.color="#000000";  
     divtext.innerHTML=textMessaje;
     //textBox.textContent='<div style="font-family: Verdana; font-size:40; color:rgb(255, 0, 255)">'+textMessaje+'</div>';              
     textBox.appendChild(divtext);       
    vml.appendChild(textBox);  
    
  }    
    else if (shape == 'group') {   
    vml = this.container.ownerDocument.createElement('v:group'); 
    vml.style.left=left+"px";  
    vml.style.top=top+"px";  
  }
 
  if(shape == 'zoom') 
  {
        
  }else
  {                                          
       if(transform!='')
        {
         //svg.setAttributeNS(null, 'transform', transform);      
        }
  
        if(shape != 'image' )
         {  
                if(lineWidth==0 || lineWidth=='none' || lineColor== 'none' )    
                {
                  vml.setAttribute('stroked', 'false');  
                }
                 else 
                {
                  vml.setAttribute('stroked', 'true');
                  vml.setAttribute('strokecolor', lineColor);
                  vml.setAttribute('strokeweight', lineWidth);
                  var stroke = this.container.ownerDocument.createElement('v:stroke'); 
                  stroke.setAttribute("opacity", parseFloat(lineOpac));
                  vml.appendChild(stroke);
                }

               if (fillColor != ''  || fillColor != 'none') 
                {
                  var fill = this.container.ownerDocument.createElement('v:fill'); 
                  fill.setAttribute("opacity", parseFloat(fillOpac));
                  vml.appendChild(fill);
                }
          }     
  } 
  if(parent==''){
   this.container.appendChild(vml);
  }else{     
   var parentShape = document.getElementById(parent);
   parentShape.appendChild(vml);
  }
  
  return vml;
};  

VMLRenderer.prototype.removeAll = function() {  
 while( this.container.hasChildNodes () ){
   this.container.removeChild( this.container.firstChild );
   //this.container.removeNode( this.container.firstChild );
 }
};
