/*
 Grid for Clipboard panel
 */
Ax.clipboard_store = [[]];

Ax.clipboard_copy = function(){
    if (!Ax.canvas.selected) {
        return Ax.msg("Error", "Nothing's selected...")
    }
    Ax.clipboard_store.push(Ax.canvas.renderer.copy(Ax.canvas.selected));
    Ax.viewport.findById("clipboard").getStore().add(new Ext.data.Record({
        id: Ax.clipboard_store.length - 1,
        type: Ax.toolConfig[Ax.clipboard_store[Ax.clipboard_store.length - 1].nodeName][2] //I fear this is not cross-platform
    }))
    return Ax.clipboard_store.length - 1
}

Ax.clipboard_cut = function(){
    Ax.clipboard_copy();
    Ax.setTool("delete")
}

Ax.clipboard_clear = function(){
    Ax.clipboard_store = [[]];//blah!
    var clipboard_items = Ax.viewport.findById("clipboard").getStore().getRange(1);
    for (var i = 0; i < clipboard_items.length; i++) {
        Ax.viewport.findById("clipboard").getStore().remove(clipboard_items[i])
    }
}

Ax.clipboard_paste = function(index){
    if (!index) {
        index = Ax.clipboard_store.length - 1
    }
    Ext.get(Ax.canvas.renderer.paste(Ax.clipboard_store[index].cloneNode(true))).on("mousedown", Ax.canvas.onHit, Ax.canvas);
    Ax.autodiff();
}

Ax.Clipboard = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function(){
        Ext.apply(this, {
            id: "clipboard",
            store: new Ext.data.SimpleStore({
                fields: [{
                    name: 'id',
                    type: 'float'
                }, {
                    name: 'type'
                }],
                data: [[0, "Nothing"]]
            }),
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            }),
            
            columns: [{
                id: 'id',
                header: "#",
                width: 20,
                sortable: true,
                dataIndex: 'id'
            }, {
                header: "Type",
                sortable: true,
                dataIndex: 'type'
            }],
            viewConfig: {
                forceFit: true,
                autoFill: true
            },
            border: false
        }); // eo apply
        this.on("rowclick", function(grid, rowindex, event){
			grid.getSelectionModel().clearSelections()
            if (rowindex == 0) {
                return Ax.msg("Meh.", "What? You expect something to happen?")
            }
            Ax.clipboard_paste(rowindex);
            
        })
        
        // call parent
        Ax.Clipboard.superclass.initComponent.apply(this, arguments);
    } // eo function initComponent
});

Ext.reg('clipboard', Ax.Clipboard);
