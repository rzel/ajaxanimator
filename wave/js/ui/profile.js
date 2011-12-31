{
  xtype:"panel",
  title:"Profile",
  border:false,
  hidden:false,
  items:[{
      layout:"accordion",
      layoutConfig:{
        activeOnTop:false,
        animate:true,
        autoWidth:true,
        collapseFirst:false,
        fill:true,
        hideCollapseTool:false,
        titleCollapse:true
      },
      border:false,
      items:[{
          title:"My Animations",
          autoHeight:true,
          border:false,
          items:[{
              xtype:"grid",
              border:false,
              viewConfig:{
                forceFit:true
              },
              ds:/*BEGIN*/new Ext.data.Store({reader: new Ext.data.ArrayReader({}, [{name: 'comment'}]),data: [['Please set CM and DS properties']]})/*END*/,
              cm:/*BEGIN*/new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{header: 'Comment', width: 120, sortable: true, dataIndex: 'comment'}])/*END*/
            }]
        },{
          title:"Profile",
          autoHeight:true,
          html:"Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
          border:false
        }]
    }]
}