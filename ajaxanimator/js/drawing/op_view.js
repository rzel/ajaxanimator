function RichDrawViewer(elem, renderer) {
 this.container = elem;
 this.mode = '';
 this.fillColor = '';  
 this.lineColor = '';
 this.lineWidth = '';
 this.selected = null;   
 this.focusin = null;  
 this.lineOpac = 1;
 this.fillOpac = 1;
 this.gridWidth = 1;
 this.opac = 1;
 this.pathsEdit = false;

 this.clipboard=null;
 this.moveNow=true;
 
 this.selectedBounds = { x:0, y:0, width:0, height: 0 };
 this.onselect = function() {}
 this.onunselect = function() {}

 this.renderer = renderer;
 this.renderer.init(this.container);
 this.renderer.editor = this;
 this.inputxy = [];
 this.onInputXY = function(){};
}


RichDrawViewer.prototype.clearWorkspace = function() {
  this.container.innerHTML = '';
};

RichDrawViewer.prototype.deleteSelection = function() {};

RichDrawViewer.prototype.toFront = function(order) {};

RichDrawViewer.prototype.select = function(elem) {};


RichDrawViewer.prototype.unselect = function() {};

RichDrawViewer.prototype.getSelectedElement = function() {};



RichDrawViewer.prototype.editCommand = function(cmd, value){}


RichDrawViewer.prototype.queryCommand = function(cmd){}


RichDrawViewer.prototype.actualStyle = function(){};


RichDrawViewer.prototype.onSelectStart = function(event) {
  return false
}