  Ax.ToolItem = Ext.extend(Ext.Component,{
  tool: "",
  imgclass: "",
  selected: false,
  onSelect: function(){},
  onUnselect: function(){},
  
  unselect: function(nofire){
	this.selected = false;
  this.el.dom.className = "toolboxItem"
	if(nofire!=true){
  this.onUnselect(this);
  }
  },
  select: function(nofire){
    this.el.dom.className = "toolboxItem"; //remove all classes except the standard one
    this.el.addClass("tbx_sel");
    this.selected = true
    if(nofire!=true){
			this.onSelect(this);
    }
  },
  initComponents: function(){
  Ax.ToolItem.superclass.initComponent.apply(this, arguments);
  },
  handleMouseEvents: function(event,del){
  
    //console.log(arguments)
    if(!this.el.hasClass("tbx_sel")){
    //If it is not selected
    this.el.dom.className = "toolboxItem"; //remove all classes except the standard one
    switch(event.type){
    case "mouseover":
    this.el.addClass("tbx_ovr")
    break;
    case "mouseout":
    this.el.addClass("tbx_idl")
    break;
    case "mousedown":
		//Ax.gs(9)
    this.onSelect(this);
    this.el.addClass("tbx_sel");
    this.selected = true
    break;
    }
    }else{
	//you shouldn't be able to not select any tool.
	
    //switch(event.type){
    //case "mousedown":
	//this.onUnselect(this);
    //this.el.dom.className = "toolboxItem";
    //this.selected = false;

    //}
    //If it is already selected
     }
  },
  onRender: function(ct){
  if(!this.template){
  this.template = new Ext.Template(
  //'<div id="{tool}" class="toolboxItem tbx_idl">',
  '<div class="toolboxButton {imgclass}"></div>');
  }
  if(!this.el){
  this.el = ct.createChild()
  }
  
  this.template.append(this.el,{tool: this.tool, imgclass: this.imgclass})
  
  
  this.el.dom.className = "toolboxItem tbx_idl"; //idle/toolbox
  
  
  this.el.on("mousedown",this.handleMouseEvents,this)
  this.el.on("mouseover",this.handleMouseEvents,this)
  this.el.on("mouseout",this.handleMouseEvents,this)
  
  if(this.qtip){
  //console.log(this.qtip)
  Ext.QuickTips.register({
    target: this.el.dom.firstChild,
    title: 'Draw Tools',
    text: this.qtip
    //dismissDelay: 20
  });
  }

  }
  
  })
  
  Ext.reg("tbxitem",Ax.ToolItem)