/*
 Tree View for Library
 */
Ax.Library = Ext.extend(Ext.tree.TreePanel, {
    initComponent: function(){
        Ext.apply(this, {
            xtype: "treepanel",
            useArrows: true,
            autoScroll: true,
            animate: true,
            enableDD: false,
            containerScroll: true,
            root: new Ext.tree.AsyncTreeNode({
                text: 'Shared',
                expanded: true,
                draggable: false,
                id: '.'
            }),
            loader: new Ext.tree.TreeLoader({
                dataUrl: (window.location.protocol=="file:")?null:Ax.files.library //so you can use it as a file:// in fx3
            }),
            dropConfig: {
                appendOnly: true
            },
            border: false
        
        });
		this.on("click", function(node){
                    if (node.childrenRendered == false) {
                        Ext.Ajax.request({
                            url: Ax.files.libraryitem + node.id,
                            success: function(e){
								Ax.loadShapes(e.responseText)
                            }
                        })
                    }
                })
			
        Ax.Library.superclass.initComponent.apply(this, arguments);

	}
    
});

Ext.reg("library", Ax.Library);

                
                
