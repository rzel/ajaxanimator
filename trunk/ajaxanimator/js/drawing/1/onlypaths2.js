/*----------------------------------------------------------------------------
 RICHDRAW 1.0
 Vector Graphics Drawing Script
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of simple vector graphic drawing control using SVG or VML.
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
 Dependencies: (SVG or VML rendering implementations)
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/
var xpArray=new Array();
var ypArray=new Array(); 
var setPoints=new Array(); 

var inout='';//true;
var typeTransform='';

var contmove=0;  
var zoomx=0;
var zoomy=0;
var zoomscale=1;
var zoommode='frame'; //more minus frame



//////////////

 //++
 var data_path_close=true;
 var data_text_family='';
 var data_text_size=19
 var data_text_messaje='';
 var data_image_href='';   
 
 var numClics=0;  

////////////

function RichDrawEditor(elem, renderer) {
  this.container = elem;
	this.gridX = 10;
	this.gridY = 10;
  this.mouseDownX = 0;  
  this.mouseDownY = 0;    
  this.clicX = 0;  
  this.clicY = 0;
  
  this.inputxy = [];
  
  this.nowDraw=false;
  this.onInputXY = function(){};
  this.gridWidth = 20;
  
  
  this.mode = '';

  this.fillColor = '';  
 
  this.lineColor = '';
  this.lineWidth = '';
  this.selected = null;   
  this.focusin = null;  
  this.lineOpac = 1;
  this.fillOpac = 1;
  this.opac = 1;
  
  this.pathsEdit = false;
  
  this.previusBox=null; 
  this.initialPath='';
  this.clipboard=null;
  this.selectedBounds = { x:0, y:0, width:0, height: 0 };

	this.onselect = function() {}
	this.onunselect = function() {}

  this.renderer = renderer;
  
  this.renderer.init(this.container);
  
  this.renderer.editor = this;
  
  /*
  this.onMouseDownListener = this.onMouseDown.bindAsEventListener(this);
  this.onMouseUpListener = this.onMouseUp.bindAsEventListener(this);
  this.onDragListener = this.onDrag.bindAsEventListener(this);
  this.onResizeListener = this.onResize.bindAsEventListener(this);
  this.onDrawListener = this.onDraw.bindAsEventListener(this);
  this.onRotateListener = this.onRotate.bindAsEventListener(this);
  this.onScaleListener = this.onScale.bindAsEventListener(this);
  this.onTransformListener = this.onTransform.bindAsEventListener(this);
  this.onTranslateListener = this.onTranslate.bindAsEventListener(this);
  this.onKeyPressListener=this.onKeyPress.bindAsEventListener(this);
  this.onHitListener = this.onHit.bindAsEventListener(this); 
  //++
  this.onClicListener = this.onClic.bindAsEventListener(this); 
  //++
  this.onEndLineListener = this.onEndLine.bindAsEventListener(this);
  
  this.onSelectStartListener = this.onSelectStart.bindAsEventListener(this);
  */
  //Ext.get(this.container).on( "mouseout", this.onRotate,this); 
  //Ext.get(this.container).on( "mouseout", this.onTransform,this);                                                         
  //Ext.get(this.container).on( "mouseover", this.onTranslate,this);
  Ext.get(this.container).on( "mousedown", this.onMouseDown,this);
  Ext.get(this.container).on( "mouseup", this.onMouseUp,this);   
  
  Ext.get(this.container).on( "mousemove", this.onTranslate,this); 
  //++
  //++
  Ext.get(this.container).on( "dblclick", this.onEndLine, this);
  
  Ext.get(this.container).on( "selectstart", this.onSelectStart,this)
  ;  
  //Event.observe(document, "keypress", this.onKeyPress,this);  
  
}


RichDrawEditor.prototype.getshapes = function(){
  return this.renderer.getshapes();
}

RichDrawEditor.prototype.info = function(shape){
  return this.renderer.info(shape)
}

RichDrawEditor.prototype.clearWorkspace = function() {
	this.container.innerHTML = '';
};



RichDrawEditor.prototype.deleteSelection = function() {
  if (this.selected) {
    this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
    this.renderer.remove(this.selected);
    this.selected = null;
  }
};
RichDrawEditor.prototype.toFront = function(order) {
  if (this.selected) { 
     //var copy= this.selected;
     //this.onunselect(this);
      //this.selected =
      this.renderer.index(this.selected, order);
      //this.selected =this.renderer.index(this.selected);   
      //this.selected.id = 'shape:' + createUUID();
      //Ext.get(this.selected).on( "mousedown", this.onHit,this);   
      //this.unselect();
     
  }
};
RichDrawEditor.prototype.deleteAll = function() {   
  if (this.selected) {  
    // this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
  
  this.renderer.removeAll();
  }
};

RichDrawEditor.prototype.select = function(elem) {
  if (elem == this.selected)
    return;

  this.selected = elem;
  this.renderer.showTracker(this.selected,this.pathsEdit);
  this.onselect(this);
  
};


RichDrawEditor.prototype.unselect = function() {
  if (this.selected) {
    this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
    this.selected = null;
    this.onunselect(this);
  }
};


RichDrawEditor.prototype.getSelectedElement = function() {
  return this.selected;
};

RichDrawEditor.prototype.toCurve = function() {  
   this.renderer.tocurve();
}
RichDrawEditor.prototype.submitShape = function(data) {  
      
    if (this.mode != 'select') {   
        //setMode('path', 'Path');  
        //this.unselect();  
                /*
                this.lineColor = frames['mondrianstyle'].strokehex;
                this.fillColor = frames['mondrianstyle'].fillhex;
                this.lineWidth = frames['mondrianstyle'].fillWidth; 
                this.lineOpac = frames['mondrianstyle'].strokeOpac;
                this.fillOpac = frames['mondrianstyle'].fillOpac;
                this.opac = frames['mondrianstyle'].fillOpac;  
                */  
         this.selected = this.renderer.datacreate(this.fillColor, this.lineColor, this.fillOpac, this.lineOpac, this.lineWidth, this.mouseDownX, this.mouseDownY, 1, 1,data);
         //if(!this.selected.id)
          //{
                 this.selected.id = 'shape:' + createUUID();
                 Ext.get(this.selected).on("mousedown", this.onHit,this);   
                 
                  //setMode('select', 'Select'); 
                 // this.unselect();
                  //this.mode = 'select';
                  //this.selected= '';    
          //}
        
        //Ext.get(this.container).on( "mousemove", this.onDraw,this); 
         //setMode('path', 'Path');  

   }else{
                 
                 this.renderer.transformShape(this.selected,data,null); 
                this.renderer.remove(this.container.ownerDocument.getElementById('tracker')); 
                 this.renderer.showTracker(this.selected,this.pathsEdit);
                 
   }
 
};

RichDrawEditor.prototype.setGrid = function(horizontal, vertical) {
  this.gridX = horizontal;
  this.gridY = vertical;
  this.gridWidth = (vertical+horizontal)/2; //average. ideally, it should be the same
};


RichDrawEditor.prototype.editCommand = function(cmd, value)
{
  if (cmd == 'mode') {
    this.mode = value;
  }
  else if (this.selected == null) {  
        
    if (cmd == 'fillcolor') {
      this.fillColor = value;
    }
    else if (cmd == 'linecolor') {
      this.lineColor = value;
    }
    else if (cmd == 'linewidth') {
      this.lineWidth = parseInt(value) + 'px';
    } 
    else if (cmd == 'fillopacity') {
       
      this.fillOpac = parseInt(value);
    } 
    else if (cmd == 'lineopacity') {
      this.lineOpac = parseInt(value);
    }
  }
  else {
    this.renderer.editCommand(this.selected, cmd, value);
  }
}


RichDrawEditor.prototype.queryCommand = function(cmd)
{
  if (cmd == 'mode') {
    return this.mode;
  }
  else if (this.selected == null) {
    if (cmd == 'fillcolor') {
      return this.fillColor;
    }
    else if (cmd == 'linecolor') {
      return this.lineColor;
    }
    else if (cmd == 'linewidth') {
      return this.lineWidth;
    }
    else if (cmd == 'fillopacity') {
     return  this.fillOpac;
    }
    else if (cmd == 'lineopacity') {
     return  this.fillOpac;
    }

  }
  else {
    return this.renderer.queryCommand(this.selected, cmd);
  }
}


RichDrawEditor.prototype.onSelectStart = function(event) {
  return false
}


RichDrawEditor.prototype.onKeyPress =  function(event){
 //alert('Character was ')
 //Ext.get(this.container).on( "keypress", function(event){
	var code;

	if (!event){ var event = window.event;}
	if (event.keyCode){ code = event.keyCode;}
	else if (event.which){ code = event.which;} 
	
	var pressedKey = String.fromCharCode(code);//.toLowerCase();
            //UNDO
	   if(event.ctrlKey && pressedKey == "z" || event.ctrlKey && pressedKey == "Z" )
            {
		this.clipboard=this.renderer.undo();
	     	//this.deleteSelection();
	    }

	if (this.mode == 'select') 
         {
	   //DELETE
	   if(code==46)
            {
	     	this.deleteSelection();
		
            }   
	   //CUT
	   if(event.ctrlKey && pressedKey == "x" || event.ctrlKey && pressedKey == "X" )
            {
		this.clipboard=this.renderer.copy(this.selected);
	     	this.deleteSelection();
	    }
	   //COPY
	   if (event.ctrlKey && pressedKey == "c" || event.ctrlKey && pressedKey == "C")
	    { 
			 this.clipboard=this.renderer.copy(this.selected);
	    }
	   //PASTE
       	   if (event.ctrlKey && pressedKey == "v" || event.ctrlKey && pressedKey == "V")
	    { 
			 //this.unselect();
			 this.selected=this.renderer.paste(this.clipboard,this.mouseDownX,this.mouseDownY);
			 this.selected.id = 'shape:' + createUUID();
 			Ext.get(this.selected).on( "mousedown", this.onHit,this);  
	    }
	    //DUPLICATE
       	   if (event.ctrlKey && pressedKey == "d" || event.ctrlKey && pressedKey == "D" )
	    { 
			 this.selected=this.renderer.duplicate(this.selected);
			 this.selected.id = 'shape:' + createUUID();
    			Ext.get(this.selected).on( "mousedown", this.onHit,this);  
	    }   
	    //LEFT
           if (event.ctrlKey && code==37)
            {
                //alert('left');  
               if(this.pathsEdit==true)
                {
                  var newx=parseFloat($('option_path_x').value)-1;    
                  var newy=parseFloat($('option_path_y').value); 
                  this.renderer.nodeMove(newx,newy);
                }
            }
            //UP
           if (code==38)
            {
                //alert('up');
               if(this.pathsEdit==true)
                {
                  var newx=parseFloat($('option_path_x').value);    
                  var newy=parseFloat($('option_path_y').value)-1; 
                  this.renderer.nodeMove(newx,newy);
                
                }
            }
            //RIGHT
            if (code==39)
             {
                //alert('right');
               if(this.pathsEdit==true) 
                {
                  var newx=parseFloat($('option_path_x').value)+1;    
                  var newy=parseFloat($('option_path_y').value); 
                  this.renderer.nodeMove(newx,newy);
                }
             }
            //DOWN
           if (code==40)
            {
                //alert('down')
               if(this.pathsEdit==true)
                {
                  var newx=parseFloat($('option_path_x').value);    
                  var newy=parseFloat($('option_path_y').value)+1; 
                  this.renderer.nodeMove(newx,newy);
                
                }
            }


	 }else{
			//alert('Character was ' +event.ctrlKey+' '+ code);
		if (event.ctrlKey && pressedKey == "x" ) 
		 {

			var cad;
		//for (i=0; i<this.length; i++){
			//cad+=this.renderer.child(i)+' ';//item
			//cad+=this.svgRoot.childNodes.length;
	 	//}
		    //this.deleteSelection();
			//alert(cad+'');
			//alert('Character was ' +event.ctrlKey+' '+ code);
		 }
  	 }
	//var character = String.fromCharCode(code);
	//alert('Character was ' + character);
  //});
 
  return false;
};

 /*

Event.observe(window, 'load', function() {
Event.observe(document, 'keypress', function(e){
var code;
if (!e) var e = window.event;
if (e.keyCode) code = e.keyCode;
else if (e.which) code = e.which;
var character = String.fromCharCode(code);
alert('Character was ' + character);
});
});
*/








RichDrawEditor.prototype.onMouseDown = function(event) {  
 
  //++ ???
  clockdata();
  
  ////////////
      
  
 if (this.mode != 'select') 
  {      
            
      var modeUsed=0;     
   if(this.mode == 'zoom') 
     {     
         var offset = Ext.get(this.container).getXY();
          var snappedX = Math.round((event.getXY()[0] - offset[0]) / this.gridX) * this.gridX;
          var snappedY = Math.round((event.getXY()[1] - offset[1]) / this.gridY) * this.gridY;
          var width =this.gridWidth;
          contmove=0;
          this.setGrid(width, width);  
 
           this.unselect(); 
            xpArray=new Array();
            ypArray=new Array();
        
            this.mouseDownX = snappedX;
            this.mouseDownY = snappedY;   
            
             xpArray.push(this.mouseDownX);
             ypArray.push(this.mouseDownY);
         
        this.renderer.zoom(this.mouseDownX, this.mouseDownY);  
         modeUsed=1; 
     } //end zoom     


   if(this.mode == 'controlpath') 
     {            
     /*
                this.lineColor = frames['mondrianstyle'].strokehex;
                this.fillColor = frames['mondrianstyle'].fillhex;
                this.lineWidth = frames['mondrianstyle'].fillWidth; 
                this.lineOpac = frames['mondrianstyle'].strokeOpac;
                this.fillOpac = frames['mondrianstyle'].fillOpac;
       */   
          if(numClics<=0){     
                
              //if(this.nowDraw==true){ alert('Double click, please');this.onEndLineListener(event);  return true;}     
                  this.nowDraw=true;
                   setPoints=new Array();    
                   var offset = Ext.get(this.container).getXY();
                  var snappedX = Math.round((event.getXY()[0] - offset[0]) / this.gridX) * this.gridX;
                  var snappedY = Math.round((event.getXY()[1] - offset[1]) / this.gridY) * this.gridY;
                  var width = this.gridWidth; 
                  contmove=0;
                  this.setGrid(width, width);  
                 
                   this.unselect(); 
                    xpArray=new Array();
                    ypArray=new Array();
                
                    this.mouseDownX = snappedX;
                    this.mouseDownY = snappedY;   
                    
                     xpArray.push(this.mouseDownX);
                     ypArray.push(this.mouseDownY);
                      setPoints.push(this.mouseDownX+','+this.mouseDownY); 
                     
                    this.selected = this.renderer.create(this.mode, this.fillColor, this.lineColor, this.fillOpac, this.lineOpac, this.lineWidth, this.mouseDownX, this.mouseDownY, 1, 1);
                     //document.forms[0].code.value=numClics;    
                     this.selected.id = 'shape:' + createUUID(); 
                     Ext.get(this.selected).on( "mousedown", this.onHit,this);  
                     
                    //document.forms[0].code.value=this.selected.id+' ';   
                    //-- this.selected.id = this.mode+':' + createUUID();
                    
                   Ext.get(this.selected).on( "dblclick", this.onEndLine,this);  
                   // Ext.get(this.container).on( "mouseout", this.onMouseUp,this);  
                     Ext.get(this.container).on( "mousemove", this.onDraw,this); 
                     numClics++;
           }else{  
                var coord=this.inputxy;
	        var X=parseFloat(coord[0]);
	        var Y=parseFloat(coord[1]); 
               // document.forms[0].code.value=''+X+','+Y;  
                setPoints.push(X+','+Y);
              //document.forms[0].code.value=numClics;   
             this.renderer.clic(this.selected);
              numClics++;
             }
         
        modeUsed=1; 
     } //end  
     
    if(modeUsed == 0) 
     {   
           
         var offset = Ext.get(this.container).getXY();
          var snappedX = Math.round((event.getXY()[0] - offset[0]) / this.gridX) * this.gridX;
          var snappedY = Math.round((event.getXY()[1] - offset[1]) / this.gridY) * this.gridY;
          var width = this.gridWidth;
          contmove=0;
          this.setGrid(width, width);  
 
           this.unselect(); 
            xpArray=new Array();
            ypArray=new Array();
        
            this.mouseDownX = snappedX;
            this.mouseDownY = snappedY;   
            
             xpArray.push(this.mouseDownX);
             ypArray.push(this.mouseDownY);
 
        
          this.unselect();   
          /*
                this.lineColor = frames['mondrianstyle'].strokehex;
                this.fillColor = frames['mondrianstyle'].fillhex;
                this.lineWidth = frames['mondrianstyle'].fillWidth; 
                this.lineOpac = frames['mondrianstyle'].strokeOpac;
                this.fillOpac = frames['mondrianstyle'].fillOpac;
*/
            this.selected = this.renderer.create(this.mode, this.fillColor, this.lineColor, this.fillOpac, this.lineOpac, this.lineWidth, this.mouseDownX, this.mouseDownY, 1, 1);
            
             this.selected.id = 'shape:' + createUUID();   
            
            //-- this.selected.id = this.mode+':' + createUUID();
           Ext.get(this.selected).on( "mousedown", this.onHit,this);  
            Ext.get(this.container).on( "mousemove", this.onDraw,this);  
            //Ext.get(this.container).on( "mouseover", this.onTranslate,this);  
            //Ext.get(this.container).on( "mouseout", this.onRotate,this); 
           
     }     
           
  }
    else   // Mode is select
  {  
        
           
        // if(this.nowDraw==true){ alert('Double click, please'); this.onEndLineListener(event); return true;}
       //Ext.get(this.container).on( "mouseout", this.onRotate,this);  
             this.previusBox=this.selected;  
            
       
	
        
       if (this.mouseDownX != snappedX || this.mouseDownY != snappedY)
       {  
          if(typeTransform=='Translate')
           {  
             
	     inout='move';//true;   
	     //Event.observe(this.selected, "mousedown", this.onHit,this);  
             //Ext.get(this.container).on( "mousemove", this.onDrag,this);  

           }
          if(typeTransform=='Scale'  || typeTransform=='Rotate') {
              
             inout='rotate_escale';//false          
            Ext.get(this.selected).on( "mousedown", this.onHit,this);  
             Ext.get(this.container).on( "mousemove", this.onDrag,this);  
             //Ext.get(this.container).on( "mouseover", this.onTranslate,this);  
             //Ext.get(this.container).on( "mouseout", this.onRotate,this); 
              //this.unselect();   
           }  
         
         if(typeTransform==''){
             this.unselect();        
         }  
       } 
        else
       { 
           //alert(',,');
           this.renderer.info(this.selected);  
          
                 
           
       } // end mousedown    
       
   } //end mode select
                  
  return false;
};












RichDrawEditor.prototype.onMouseUp = function(event) {
 
 //Ext.get(this.selected).un("mousemove",this.onDrag)
 
	
  if (this.mode != 'select') 
   {  
       //this.renderer.restruct(this.selected);
       
    if(this.mode == 'controlpath') 
     {
         //Event.observe(this.selected, "mousemove", this.onClic,this);  
         

         //this.renderer.info(this.selected);
         
         
     }
      else
     {  
          Ext.get(this.container).un("mousemove", this.onDraw);  
 
           this.selected = null;   
     }
        
   } else
   {      
      
Ext.get(this.container).un("mousemove", this.onDraw);  
  
     // if(inout=='move' || inout=='rotate_scale' ){
     if(typeTransform=="Rotate" || typeTransform=="Scale" ) 
      {         
         //inout='move';//true;
         Ext.get(this.container).un("mousemove", this.onDrag);  
        //this.renderer.restruct(this.selected);
        contmove=0; 
      } 
      if(typeTransform=="Translate" ) 
      {  
         Ext.get(this.container).un("mousemove", this.onDrag);  
        //this.renderer.restruct(this.selected);
        contmove=0; 

      }
      if(inout=='multiSelect'){
            //this.unselect(); 
             //inout='move';//true;      
        } 
      typeTransform==''; 
   }  
   
   //Event.stopObserving(this.container, "mousemove", this.onDraw,this);  
};





RichDrawEditor.prototype.onDrag = function(event) {  

  
  var offset = Ext.get(this.container).getXY();
  var snappedX = Math.round((event.getXY()[0] - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((event.getXY()[1] - offset[1]) / this.gridY) * this.gridY;

  var deltaX = snappedX - this.mouseDownX;
  var deltaY = snappedY - this.mouseDownY; 

  var modeUsed=0;              
  if(this.mode == 'zoom') 
   {  
       //this.renderer.zoom(this.selectedBounds.x + deltaX, this.selectedBounds.y + deltaY); 
      // this.renderer.zoom(this.mouseDownX, this.mouseDownY);  
 
          modeUsed=1; 
   }
  if(this.mode == 'controlpath') 
     {  
      modeUsed=1; 
     }
  if(modeUsed==0)
   {        
           if(inout=='multiSelect'){ 
               this.renderer.showMultiSelect(this.mouseDownX, this.mouseDownY);  
           }
       
       
           if(typeTransform=="Translate")
            {      
                 var coord=this.inputxy;
	   var moveX=parseFloat(coord[0]);
	   var moveY=parseFloat(coord[1]); 
 
               this.renderer.move(this.selected, this.selectedBounds.x + deltaX, this.selectedBounds.y +deltaY,this.clicX,this.clicY);
               //this.renderer.move(this.selected,  this.mouseDownX,  this.mouseDownY,this.clicX,this.clicY);
              //  this.renderer.move(this.selected, moveX, moveY,this.clicX,this.clicY);
               this.renderer.showTracker(this.selected,this.pathsEdit); 
               
            }  
           //if(inout=='rotate_scale'){ 
                      
               if(typeTransform=="Rotate") 
                 { 
                   this.renderer.rotateShape(this.selected, this.previusBox,deltaX, deltaY);
                   this.renderer.showTracker(this.selected,this.pathsEdit);
                 }

              	//if(typeTransform=="Scale") {this.renderer.scale(this.selected, this.previusBox, deltaX, deltaY); }
          	if(typeTransform=="Scale") 
          	 {
          	      this.renderer.scaleShape(this.selected, this.previusBox, this.selectedBounds.x + deltaX, this.selectedBounds.y + deltaY); 
          	      this.renderer.showTracker(this.selected,this.pathsEdit);
          	 }
          	//if(typeTransform=="Scale") {this.renderer.scale(this.selected, this.previusBox, this.selectedBounds.width + deltaX, this.selectedBounds.height + deltaY); }
          	
          	//RichDrawEditor.prototype.onTransform(event);
          	
             
           //} 
        
    }   
 // Update selection tracker
 //this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
  
  //this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));

// hide_tracker();
};


RichDrawEditor.prototype.onResize = function(event) {
  var offset = Ext.get(this.container).getXY();
  var snappedX = Math.round((event.getXY()[0] - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((event.getXY()[1] - offset[1]) / this.gridY) * this.gridY;

  var deltaX = snappedX - this.mouseDownX;
  var deltaY = snappedY - this.mouseDownY;

  this.renderer.track(handle, deltaX, deltaY);

  // Update selection tracker
  show_tracker();
//  hide_tracker();
};


RichDrawEditor.prototype.onDraw = function(event) {
  if (this.selected == null)
   {
       return;
   }else{
        var offset = Ext.get(this.container).getXY()
        var snappedX = Math.round((event.getXY()[0] - offset[0]) / this.gridX) * this.gridX;
        var snappedY = Math.round((event.getXY()[1] - offset[1]) / this.gridY) * this.gridY;
        this.renderer.resize(this.selected, this.mouseDownX, this.mouseDownY, snappedX, snappedY);
  }
};

RichDrawEditor.prototype.onRotate = function(event) {
  if (this.selected == null)
   {
     
   }else{      
         document.getElementById('richdraw').style.cursor='e-resize';
         //alert('chao');
         //inout=false; 
          
        //return;
   }
};

RichDrawEditor.prototype.onScale = function(event) {
  if (this.selected == null)
   {
     
   }else{      
         //document.getElementById('richdraw').style.cursor='e-resize';
         //alert('chao');
         //inout=false; 
          
        //return;
   }
};

RichDrawEditor.prototype.onTransform = function(event) {
  if (this.selected == null)
   {
     
   }else{  
     	//if(typeTransform=="rotate") {this.renderer.rotate(this.selected, this.selectedBounds.x + deltaX, this.selectedBounds.y + deltaY);}
  	//if(typeTransform=="scale") {this.renderer.scale(this.selected, this.selectedBounds.x + deltaX, this.selectedBounds.y + deltaY); }
  
  }
};

RichDrawEditor.prototype.onTranslate = function(event) {
  if (this.selected == null)
   {
    
   }else{  
      // document.getElementById('richdraw').style.cursor='move';
        //alert('hello');
         //inout=true;    
      
        //return;
   } 
   var offset = Ext.get(this.container).getXY()
          // var offset = Ext.get(this.container).getXY();
        var x = Math.round(event.getXY()[0] - offset[0]);
        var y = Math.round(event.getXY()[1] - offset[1]);

   //var x= parseFloat(event.getXY()[0]); 
   //var y= parseFloat(event.getXY()[1]);
   this.inputxy = [x,y]
   this.onInputXY(x,y);
};                                       


RichDrawEditor.prototype.onHit = function(event) {
//console.log("AAH HIT!!!!")
 if(this.mode == 'select') 
  { 
   if(inout=='multiSelect')
    {   
      //Ext.get(this.container).on( "mousemove", this.onDrag,this);   
      //Ext.get(this.container).on( "mouseup", this.onMouseUp,this);   
 
    }
     else
    { 
     typeTransform="Translate"   
    
    /* //this.previusBox=this.selected;      
     this.select(Event.element(event));
     this.selectedBounds = this.renderer.bounds(this.selected);
     //document.forms[0].code.value=shape(c,this.selected);
     var offset = Ext.get(this.container).getXY();
     this.mouseDownX = Math.round((event.getXY()[0] - offset[0]) / this.gridX) * this.gridX;
     this.mouseDownY = Math.round((event.getXY()[1] - offset[1]) / this.gridY) * this.gridY;
     this.renderer.info(this.selected);
     Ext.get(this.container).on( "mousemove", this.onDrag,this);    
     //Ext.get(this.container).on( "mouseover", noselect);  
     Ext.get(this.container).on( "mouseout", this.onMouseUp,this); 
     //Ext.get(this.container).on( "mouseup", this.onMouseUp,this); 
     //typeTransform=="Translate";  
     //if(typeTransform=="Rotate") {this.renderer.rotate(this.selected, this.previusBox,2, 2);}
    */
        //var width = parseFloat(widths.options[widths.selectedIndex].value);   
       
     contmove=0;
     //this.setGrid(this.lineWidth, width);  
    var width = this.gridWidth;
    
    this.setGrid(width, width);  
     
    this.select(event.getTarget());
    this.selectedBounds = this.renderer.bounds(this.selected);
    //document.forms[0].code.value=shape(c,this.selected);
    var offset = Ext.get(this.container).getXY(); 
    
    this.mouseDownX = Math.round((event.getXY()[0] - offset[0]) / this.gridX) * this.gridX;
    this.mouseDownY = Math.round((event.getXY()[1] - offset[1]) / this.gridY) * this.gridY;
    this.renderer.info(this.selected);
    Ext.get(this.container).on( "mousemove", this.onDrag,this);   

     //Ext.get(this.container).on( "mouseout", this.onDrag,this); 
    }
  }
   else
  {
       
  }
};
RichDrawEditor.prototype.onClic = function(event) {
 if(this.mode == 'controlpath') 
  { 
     
    //Ext.get(this.container).on( "mouseout", this.onMouseUp,this);     
  
    //Ext.get(this.container).on( "mousemove", this.onDrag,this);   

     //Ext.get(this.container).on( "mouseout", this.onDrag,this); 
  }
   else
  {
       
  }
};    


RichDrawEditor.prototype.onEndLine = function(event) {   
  
 if(this.mode == 'controlpath') 
  {      // alert('hello');   
        numClics=0;
         //this.selected = null; 

         //Event.stopObserving(this.container, "mousemove", this.onDraw,this); 
            
            

            //Event.observe(this.selected, "mousedown", this.onHit,this);  
            //Ext.get(this.container).on( "mousemove", this.onDraw,this);  
          
            //Event.stopObserving(this.selected, "dblclick", this.onEndLine,this);
            //Event.stopObserving(this.container, "mousemove", this.onDraw,this);  
 
          this.selected = null;   


         //this.unselect(); 
         
  }
   else
  {
  this.nowDraw=false;     
  }
};
function noselect(){
    //typeTransform="";    
}

function createUUID()
{
var uuid = [4, 2, 2, 2, 6];

for(var m = 0; m < uuid.length; m++){

uuid[m]=(function(length) {
    var uuidpart = "";
    for (var i=0; i<length; i++) {
      var uuidchar = parseInt((Math.random() * 256)).toString(16);
      if (uuidchar.length == 1)
        uuidchar = "0" + uuidchar;
      uuidpart += uuidchar;
    }
    return uuidpart;
})(uuid[m])
  
}

return uuid.join("-")

  /*
  return [4, 2, 2, 2, 6].map(function(length) {
    var uuidpart = "";
    for (var i=0; i<length; i++) {
      var uuidchar = parseInt((Math.random() * 256)).toString(16);
      if (uuidchar.length == 1)
        uuidchar = "0" + uuidchar;
      uuidpart += uuidchar;
    }
    return uuidpart;
  }).join('-');
  */
}

//----------------------------------------------------------------------------
// AbstractRenderer
//
// Abstract base class defining the drawing API. Can not be used directly.
//----------------------------------------------------------------------------

function AbstractRenderer() {

};

AbstractRenderer.prototype.init = function(elem) {};
AbstractRenderer.prototype.bounds = function(shape) { return { x:0, y:0, width:0, height: 0 }; };
AbstractRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {};
AbstractRenderer.prototype.datacreate = function(fillColor, lineColor, lineWidth, fillOpac, strokeOpac, left, top, width, height,data) {};
AbstractRenderer.prototype.index = function(shape, order) {};
AbstractRenderer.prototype.remove = function(shape) {}; 
AbstractRenderer.prototype.copy = function(shape) {};
AbstractRenderer.prototype.paste = function(left,top) {};
AbstractRenderer.prototype.duplicate = function(shape) {};
AbstractRenderer.prototype.move = function(shape, left, top) {};  
AbstractRenderer.prototype.endmove = function(shape) {};
AbstractRenderer.prototype.transform= function(shape, left, top) {};
AbstractRenderer.prototype.scale = function(shape, left, top) {};
AbstractRenderer.prototype.rotate = function(shape, left, top) {};
AbstractRenderer.prototype.track = function(shape) {}; 
AbstractRenderer.prototype.restruct = function(shape) {};
AbstractRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {};
AbstractRenderer.prototype.editCommand = function(shape, cmd, value) {};
AbstractRenderer.prototype.queryCommand = function(shape, cmd) {};
AbstractRenderer.prototype.showTracker = function(shape,value) {};
AbstractRenderer.prototype.getMarkup = function() { return null; };
AbstractRenderer.prototype.info = function(shape){}; 
AbstractRenderer.prototype.editShape = function(shape,data){};
AbstractRenderer.prototype.onKeyPress = function(){};

AbstractRenderer.prototype.getshapes = function(){};


//-----------------------------
// Geometry
//-----------------------------   

//two point angle  deg
function ang2v(x1,y1,x2,y2)
{
     /*
      var k=0;

      var sum1=u1+v1; 
      var sum2=u2+v2;    

      var res1=u1-v1;  
      var res2=u2-v2;   

     var ku1=k*u1; 
      var ku2=k*u2;   

       var mu= Math.sqrt(u1*u1+u2*u2); 
       var mv= Math.sqrt(v1*v1+v2*v2);

       var pesc= u1*v1+u2*v2; 
       //var ang=Math.acos(pesc/(mu*mv))*180/Math.PI;
       var ang=Math.acos(pesc/(mu*mv));  
       */ 
        var resx=x2-x1;  
      var resy=y2-y1;   
       var ang=Math.atan2(resy,resx); 
       //alert(ang);
       return ang;
}     

function dist2p(a,b,c,d) 
 {
   with (Math) 
    {
        //var d2p=sqrt(abs(((d-b)*(d-b) )+((c-a)*(c-a))));   //decimas(d2p,3);     return d2p;
          return sqrt(abs((d-b)*(d-b)+ (c-a)*(c-a)));

    }
 }
function pmd2pb(a,b,c,d,q) {
	pmdx= (1-q)*a+c*q;
	pmdy= (1-q)*b+d*q;
//pmdx=decimas(pmdx,3);
//pmdy=decimas(pmdy,3);
var cad=pmdx+','+pmdy;
var sol= new Array();
sol= [cad,pmdx,pmdy];
return sol

} 

function getAngle(dx,dy) {
  var angle = Math.atan2(dy, dx);
  //angle *= 180 / Math.PI;
  return angle;  
  
}

/*

A = y2-y1
B = x1-x2
C = A*x1+B*y1
Regardless of how the lines are specified, you should be able to generate two different points along the line, and then generate A, B and C. Now, lets say that you have lines, given by the equations:
A1x + B1y = C1
A2x + B2y = C2
To find the point at which the two lines intersect, we simply need to solve the two equations for the two unknowns, x and y.

    double det = A1*B2 - A2*B1
    if(det == 0){
        //Lines are parallel
    }else{
        double x = (B2*C1 - B1*C2)/det
        double y = (A1*C2 - A2*C1)/det
    }




*/  
// interseccion 2 rectas
function ntrsccn2rb(a,b,c,d,e,f,g,h){
 var solution= new Array();
 var i2rx=0;var i2ry=0;
 var w= (c-a)*(f-h)-(e-g)*(d-b);
 if(w==0){
  n=1;
  i2rx= (1-n)*a+n*c;
  i2ry= (1-n)*b+n*d;
  solution= ['',i2rx,i2ry];  
  //Lines are parallel
  return solution
  //return (i2rx+' '+i2ry);
 }
 var n = (((e-a)*(f-h))-((e-g)*(f-b)))/w;
 i2rx=(1-n)*a+n*c;
 i2ry=(1-n)*b+n*d;
 //return (i2rx+' '+i2ry);
 solution= ['',i2rx,i2ry];
 return solution

}

//ecuacion implicita de la recta
function ccnmplct(a,b,c,d) { 
  var solution= new Array();
  //a1 a2, b1 b2    vector direccion b1-a1 , b2-a2
  var v1m=c-a;
  var v1n=d-b;
  var c1x= v1m;
  var c1y= v1n;
  // ecuacion continua (x - a) /c -a =  (y - b)/d - b
  //(x - a) * v1n =  (y - b) * v1m 
  //x * v1n - v1n*a = y * v1m - b* v1m
  eia= v1n ;
  eib= - v1m;
  eic=  (b* v1m) - ( v1n*a)
  solution= [eia,eib,eic];
  return solution
}