Ax.LayoutWestPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"west",
    //title:"Tools",
    id: "tools",
    split:true,
    collapsible:true,
    titleCollapse:true,
    hideCollapseTool: true,
    //html: "<img src='../img/mockup/tools.png'>",
    width:50,
    border:true,
    items: [{xtype:"toolbox"},{xtype: "drawpanel"}]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutWestPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutwest",Ax.LayoutWestPanel)

  
  Ax.tools_setcollapse = function(item){
if(Ax.viewport.findById("tools").collapsed != item.checked){
Ax.viewport.findById("tools").toggleCollapse();
}
}
