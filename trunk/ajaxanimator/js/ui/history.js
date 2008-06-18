/*
Grid for History panel
*/

 Ax.History = Ext.extend(Ext.grid.GridPanel, {
 initComponent:function() {
 Ext.apply(this, {
 store: new Ext.data.SimpleStore({
 id:0,
 fields:[
 {name: 'id', type: 'float'},
 {name: 'action'}
 ],
 data:[
[0,"rectangle"],
[1,"rectangle1"],
[2,"rectangle2"],
[3,"rectangle3"],
[4,"rectangle4"],
[5,"rectangle5"],
[6,"rectangle6"]
 ]
 }),
 columns:[
  {id:'id',header: "#",  width: 20, sortable: true, dataIndex: 'id'},
 {header: "Action", sortable: true, dataIndex: 'action'}
 ],

 viewConfig:{forceFit:true,autoFill:true},
 border: false
 }); // eo apply
  
 // call parent
 Ax.History.superclass.initComponent.apply(this, arguments);
 } // eo function initComponent
  
 });
 
 Ext.reg('history', Ax.History);
