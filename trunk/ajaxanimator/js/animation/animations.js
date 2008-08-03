//this file is soooooo fubared
//omg.....

Ax.AnimationBrowser = Ext.extend(Ext.Panel, {
    initComponent: function(){
        Ext.apply(this, {
            id: "Animations",
            xtype: "panel",
            title: "Animations",
            border: false,
            layout: "fit",
            items: {
                layout: "border",
                border: false,
                items: [{
                
                    //border: false,
                    region: "center",
                    
                    title: "Player",
                    id: "Player",
                    layout: "border",
                    items: [{
                        region: "north",
                        border: false,
                        tbar: [{
                            text: "By:&nbsp;Unavailable"
                        }, {
                            xtype: "tbfill"
                        }, "Unavailable"],
                        height: 27
                    }, {
                        region: "south",
                        border: false,
                        bbar: [{
                            text: "Play",
                            iconCls: "play_icon",
                            handler: function(){
                                Ax.player_play()
                            }
                        }, {
                            text: "Pause",
                            iconCls: "stop_icon",
                            handler: function(){
                                Ax.player_pause()
                            }
                        }, {
                            text: "Import to Editor",
                            iconCls: "import_icon",
                            handler: function(){
                                Ax.player_import()
                            }
                        }, {
                            xtype: "tbfill"
                        }, "?/? ?FPS"],
                        height: 27
                    }, {
                        region: "center",
                        border: false,
                        html: "<div class=\"x-border-layout-ct canvas_container\"><div id=\"playercanvas\" class=\"canvas\"></div></div>"
                    }],
                    autoScroll: true,
                    tools: [{
                        id: "gear"
                    }, {
                        id: "help",
                        qtip: "View and share animations with other users. Use the left panel to browse for animations," +
                        " and click them to view them. Feel free to press the \"import\" button and make improvements."
                    }],
                    iconCls: "player_icon"
                }, {
                    //border: false,
                    region: "west",
                    id: "treebrowse",
                    title: "Browse",
                    collapseFirst: false,
                    tools: [{
                        id: "plus",
                        qtip: "Expand All",
                        handler: function(){
                            Ax.viewport.findById("treebrowse").expandAll()
                        }
                    }, {
                        id: "minus",
                        qtip: "Collapse All",
                        handler: function(){
                            Ax.viewport.findById("treebrowse").collapseAll()
                        }
                    }],
                    iconCls: "browse_icon",
                    width: 200,
                    split: true,
                    collapsible: true,
                    layout: "fit",
                    titleCollapse: true,
                    
                    //items: [{
                    //border: false,
                    xtype: "treepanel",
                    useArrows: true,
                    autoScroll: true,
                    animate: true,
                    enableDD: false,
                    containerScroll: true,
                    bbar: [{
                        text: "Reload",
                        qtip: "Reload Tree Data",
                        iconCls: "reload_icon",
                        handler: function(){
                            Ax.viewport.findById("treebrowse").getLoader().load(Ax.viewport.findById("treebrowse").getRootNode())
                        }
                    }],
                    root: new Ext.tree.AsyncTreeNode({
                        text: 'Animations',
                        expanded: true,
                        draggable: false,
                        id: '.'
                    }),
                    loader: new Ext.tree.TreeLoader({
                        dataUrl: Ax.files.userlist
                    }),
                    listeners: {
                        "click": function(node){
                            if (node.childrenRendered == false) {
                                Ext.Ajax.request({
                                    url: Ax.files.animations + node.id,
                                    success: function(e){
                                        Ax.player_pause()
                                        Ax.init_player(e.responseText);
                                        Ax.player_play()
                                    }
                                })
                            }
                        }
                    }
                
                
                
                    //}]
                
                }]
            }
        })//end ext.apply
        Ax.AnimationBrowser.superclass.initComponent.apply(this, arguments);
    }
    
})

Ext.reg("animationbrowser", Ax.AnimationBrowser)

Ax.showanimationbrowser = function(){
    Ax.viewport.findById("maintabpanel").activate(2)
}
