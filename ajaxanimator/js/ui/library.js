/*
Tree View for Library
*/

Ax.Library = Ext.extend(Ext.tree.TreePanel,{
  initComponent: function(){
  Ext.apply(this,{
    xtype:"treepanel",
    animate:true,
    autoScroll:true,
    containerScroll:true,
    root:new Ext.tree.TreeNode({text:'Tree Root',draggable : false}),
    dropConfig:{
      appendOnly:true
    },
    border:false

  });
    Ax.Library.superclass.initComponent.apply(this, arguments);
  }

});

Ext.reg("library",Ax.Library);


