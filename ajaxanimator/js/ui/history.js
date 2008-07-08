/*
 Grid for History panel
 */
Ax.history_store = [{}];

Ax.history_add = function(summary){
    Ax.history_store.push(Ax.export_animation());
    Ax.viewport.findById("history").getStore().add(new Ext.data.Record({
        id: Ax.clipboard_store.length - 1,
        type: (summary) ? summary : "Edit" //I fear this is not cross-platform
    }))
    return Ax.history_store.length - 1
}

Ax.history_clear = function(){
    Ax.history_store = [{}];//blah!
    var history_items = Ax.viewport.findById("history").getStore().getRange(1);
    for (var i = 0; i < history_items.length; i++) {
        Ax.viewport.findById("history").getStore().remove(history_items[i])
    }
}

Ax.history_revert = function(){
	//poop
}

Ax.History = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function(){
        Ext.apply(this, {
            store: new Ext.data.SimpleStore({
                id: 0,
                fields: [{
                    name: 'id',
                    type: 'float'
                }, {
                    name: 'action'
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
                header: "Action",
                sortable: true,
                dataIndex: 'action'
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
                return Ax.msg("Are You Sure?","If you really want to, the <b>File->New</b> button is there for you.")
            }
            Ax.history_revert(rowindex);
        })
        // call parent
        Ax.History.superclass.initComponent.apply(this, arguments);
    } // eo function initComponent
});

Ext.reg('history', Ax.History);
