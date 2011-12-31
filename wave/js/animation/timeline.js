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
                width: 150,
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
                                if (Ax.tcurrent.layer == value) {
                                  return Ax.toastMsg("Error!","You can't delete the current selected layer!")
                                }
                                Ext.MessageBox.confirm("Delete " + value + "?", "Are you sure you want to delete " + value + "?", function(result){
                                    if (result == "yes") {
                                        Ax.deleteLayer(value)
                                    }
                                })
                            },
                            'tb_visible': function(grid, record, action, value){
                              //you might be able to tell that this is a hack
                              var c = 0;
                              for(var i in Ax.layers){
                                if(i == value){
                                  break;
                                }
                                if(Ax.layers[i].visible){
                                  c++; //i dont know c++!
                                }
                              }
                              
                              Ax.layers[value].visible = false
                              if(c >= Ext.query(".tb_visible").length){
                                c = 0
                              }
                                Ext.get(Ext.query(".tb_visible")[c]).addClass("tb_invisible");
                                Ext.get(Ext.query(".tb_visible")[c]).removeClass("tb_visible")
                                Ax.loadframe(Ax.tcurrent.frame,Ax.tcurrent.layer)

                              
                            },
                            'tb_invisible': function(grid, record, action, value){
                              var c = 0;
                              for(var i in Ax.layers){
                                if(i == value){
                                  break;
                                }
                                
                                if(!Ax.layers[i].visible){
                                  c++; //i dont know c++!
                                }
                              }
                              if(c >= Ext.query(".tb_invisible").length){
                                c = 0
                              }
                              Ax.layers[value].visible = true
                              Ext.get(Ext.query(".tb_invisible")[c]).addClass("tb_visible");
                              Ext.get(Ext.query(".tb_invisible")[c]).removeClass("tb_invisible")
                              Ax.loadframe(Ax.tcurrent.frame,Ax.tcurrent.layer)
                            },
                            'tb_up': function(grid, record, action, value){
                                Ax.toastMsg("Error!","Not Implemented")
                            },
                            'tb_down': function(grid, record, action, value){
                              Ax.toastMsg("Error!","Not Implemented")
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
                            Ax.msg("Disabled","Renaming layers has been disabled for sync latency issues.")
                            //if(confirm("This will probably break the animation do to various sync latency issues. Are you sure you want to risk it?")){
                            //  Ax.renameLayer(object.originalValue, object.value)
                            //}
                            
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
                        },{
                            iconCls: "tb_visible",
                            qtip: "Toggle layer visiblity."
                        },{
                          iconCls: "tb_up",
                          qtip: "Shift Layer Up"
                        },{
                          iconCls: "tb_down",
                          qtip: "Shift layer Down"
                        }]
                    }]
                }
            }]
        })
        Ax.Timeline.superclass.initComponent.apply(this, arguments);
    }
})

Ext.reg("timeline", Ax.Timeline)


Ax.timeline_setcollapse = function(item){
if(Ax.viewport.findById("timeline").collapsed != item.checked){
Ax.viewport.findById("timeline").toggleCollapse();
}
}
