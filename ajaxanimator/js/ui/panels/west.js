Ax.LayoutWestPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"west",
    title:"Tools",
    split:true,
    collapsible:true,
    titleCollapse:true,
    hideCollapseTool: true,
    //html: "<img src='../img/mockup/tools.png'>",
    width:50,
    border:true,
    items: [{xtype:"toolbox", id: "toolboxpanel"},{xtype: "drawpanel"}]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutWestPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutwest",Ax.LayoutWestPanel)

  
  