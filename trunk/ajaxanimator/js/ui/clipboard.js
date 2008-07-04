/*
Grid for Clipboard panel
*/
Ax.clipboard_store = [];

Ax.clipboard_add = function(){
  if(!Ax.canvas.selected){return Ax.msg("Error","Nothing's selected...")}
  Ax.clipboard_store.push(Ax.canvas.renderer.copy(Ax.canvas.selected));
  Ax.viewport.findById("clipboard").getStore().add(new Ext.data.Record({
  id: Ax.clipboard_store.length - 1,
  type: Ax.clipboard_store[Ax.clipboard_store.length-1].nodeName
  }))
}

Ax.clipboard_load = function(index, x, y){
  Ax.canvas.renderer.paste(Ax.clipboard_store[index], x, y)
}

 Ax.Clipboard = Ext.extend(Ext.grid.GridPanel, {
 initComponent:function() {
 Ext.apply(this, {
 id: "clipboard",
 store: new Ext.data.SimpleStore({
 fields:[
 {name: 'id', type: 'float'},
 {name: 'type'}
 ],
 data:[[0,"Nothing"]]
 }),
 columns:[
 {id:'id',header: "#", width: 20, sortable: true, dataIndex: 'id'},
 {header: "Type", sortable: true, dataIndex: 'type'}
 ],
 viewConfig:{forceFit:true,autoFill: true},
  border: false
 }); // eo apply
  
 // call parent
 Ax.Clipboard.superclass.initComponent.apply(this, arguments);
 } // eo function initComponent
  
 });
 
 Ext.reg('clipboard', Ax.Clipboard);
