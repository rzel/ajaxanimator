Ax.AnimationBrowser = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,

{
id: "Animations",
xtype:"panel",
title:"Animations",
border: false,
layout:"fit",
//html:"<img src='../img/mockup/animationbrowser.png' style='width: 500px; height: 400px'>"
items: {
layout:"border",
border: false,
items:[{
    
//border: false,
region:"center",

title:"Player",
id: "Player",
layout: "border",
items: [
       {region: "north",border: false, tbar: [{text: "By:&nbsp;Hardcoded&nbsp;Name"},{xtype: "tbfill"},"Rating&nbsp;System"], height: 27},
       {region: "south",border: false, bbar: [{text: "Play",handler: function(){
this.setText((this.getText()=="Play")?"Pause":"Play")} //just a really really condensed script :P
},
{text: "Forward"},
{text: "Rewind"},
{xtype: "tbfill"},
"0/1337 0FPS"
], height: 27},
  {region: "center",	border: false,		 html:"<div class=\"x-border-layout-ct canvas_container\">"+
       "<div id=\"drawcanvas\" class=\"canvas\"></div>"}      
        ],
autoScroll: true,
tools: [{id: "gear"},{id: "help",
qtip: "View and share animations with other users. Use the left panel to browse for animations,"+
" and click them to view them. Feel free to press the \"import\" button and make improvements."}],
iconCls: "player_icon"
}
,{
//border: false,
region:"west",
id: "treebrowse",
title:"Browse",
collapseFirst: false,
tools: [
{id: "plus",qtip: "Expand All", handler: function(){
Ax.viewport.findById("treebrowse").expandAll()}}, //crap! i'm sure this is crappy coding style
{id: "minus", qtip: "Collapse All", handler: function(){
Ax.viewport.findById("treebrowse").collapseAll()}}], //crap! i'm sure this is crappy coding style.
iconCls: "browse_icon",
width:200,
split:true,
collapsible:true,
layout: "fit",
titleCollapse:true,

//items: [{
		//border: false,
        xtype:"treepanel",
        useArrows:true,
        autoScroll:true,
        animate:true,
        enableDD:false,
        containerScroll: true, 
		bbar: [{text: "Reload", qtip: "Reload Thingy"},
{text: "Expand", qtip: "Expand All Nodes", handler: function(){
Ax.viewport.findById("treebrowse").expandAll()}},
{text: "Collapse",qtip: "Collapse All Nodes", handler: function(){
Ax.viewport.findById("treebrowse").collapseAll()
}}],
		root: new Ext.tree.AsyncTreeNode({
        text: 'Users',
		expanded: true,
        draggable:false,
        id:'.'
		}),
        loader: new Ext.tree.TreeLoader({
            dataUrl:Ax.files.userlist
        }),
		listeners: {
		"click":function(node){
		if(node.childrenRendered==false){
		Ext.Ajax.request({
		url: "../"+node.id,
		success: function(e){
		Ax.viewport.findById("Player").body.dom.innerHTML = Ax.util.htmlentities(e.responseText); //bad code!!!!!

		}
		})
		}
		}
		}


          
//}]

}
]
}
}

)//end ext.apply




 Ax.AnimationBrowser.superclass.initComponent.apply(this, arguments);
}

})

Ext.reg("animationbrowser",Ax.AnimationBrowser)

Ax.showanimationbrowser = function(){
       Ax.viewport.findById("maintabpanel").activate(2)
}