/*
Main User Interface

'Glues' all components together
*/



Ext.onReady(function(){

Ax.viewport = new Ext.Viewport(
{
layout:"border",
border:false,
window:{
  layout:"fit"//,
  //tbar: {xtype: "maintoolbar"}
},


items: [
{
region: "north",
id: "north",
border: false,
tbar: Ax.MainToolbar,
height: 27
},
{
region: "center",
layout: "border",
border: false,
items: [
{xtype: "layoutcenter"},
{xtype: "layoutnorth"},
{xtype: "layoutsouth"},
{xtype: "layoutwest"},
{xtype: "layouteast"}
]  //end main app border layout items
}
]

  //}]  //end main toolbar border layout items
} //end border layout

); //End Viewport



}); //End Ext.onReady
