Ax.Timeline = Ext.extend(Ext.Panel, {
    initComponent: function(){
        Ext.apply(this, {
            layout: "border",
            items: [{
                region: "center",
                autoScroll: true,
                border: false,
                html: "<div id='timeline_core' class='x-unselectable' style='height: 100%; width: 100%'>Loading Frames...</div>"
            }, {
                region: "west",
                width: 100,
                border: false,
                split: true,
                
                collapsible: true,
                collapseMode: "mini",
                autoScroll: true,
                layout: "fit",
                //html: "Layers"
                items: {
                    id: "layers",
                    xtype: "editorgrid",
                    border: false,
                    hideHeaders: true,
                    plugins: [new Ext.ux.grid.CellActions({
                        callbacks: {
                            "tb_delete": function(grid, record, action, value){
                                Ext.MessageBox.confirm("Delete " + value + "?", "Are you sure you want to delete " + value + "?", function(result){
                                    if (result == "yes") {
                                        Ax.deleteLayer(value)
                                    }
                                })
                            }
                        }
                    })],
                    viewConfig: {
                        autoFill: true,
                        forceFit: true
                    },
                    listeners: {
                        "afteredit": function(object){
                            //console.log(object.originalValue,object.value)
                            Ax.renameLayer(object.originalValue, object.value)
                        }
                    },
                    sm: new Ext.grid.RowSelectionModel({
                        singleSelect: true
                    }),
                    
                    //clicksToEdit:1,
                    ds:/*BEGIN*/ new Ext.data.Store()/*END*/,
                    columns: [{
                        header: "Comment",
                        dataIndex: "comment",
                        editor: new Ext.form.TextField(),
                        cellActions: [{
                            iconCls: "tb_delete",
                            qtip: "Delete this layer."
                        }]
                    }]
                }
            }]
        })
        Ax.Timeline.superclass.initComponent.apply(this, arguments);
    }
})

Ext.reg("timeline", Ax.Timeline)

