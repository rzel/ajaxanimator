
 //JS File: ../js/ext/ux/Ext.ux.Crypto.SHA1.js 
 Ext.namespace('Ext.ux', 'Ext.ux.Crypto');

Ext.ux.Crypto.SHA1 = function() {
  // function 'f' [§4.1.1]
  var f = function(s, x, y, z) {
      switch (s) {
          case 0: return (x & y) ^ (~x & z);           // Ch()
          case 1: return x ^ y ^ z;                    // Parity()
          case 2: return (x & y) ^ (x & z) ^ (y & z);  // Maj()
          case 3: return x ^ y ^ z;                    // Parity()
      }
  };
  // rotate left (circular left shift) value x by n positions [§3.2.5]
  var ROTL = function(x, n) {
      return (x<<n) | (x>>>(32-n));
  };
  return {
    hash : function(msg) {
      // constants [§4.2.1]
      var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  
  
      // PREPROCESSING 
   
      msg += String.fromCharCode(0x80); // add trailing '1' bit to string [§5.1.1]
  
      // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
      var l = Math.ceil(msg.length/4) + 2;  // long enough to contain msg plus 2-word length
      var N = Math.ceil(l/16);              // in N 16-int blocks
      var M = new Array(N);
      for (var i=0; i<N; i++) {
          M[i] = new Array(16);
          for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
              M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | 
                        (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
          }
      }
      // add length (in bits) into final pair of 32-bit integers (big-endian) [5.1.1]
      // note: most significant word would be ((len-1)*8 >>> 32, but since JS converts
      // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
      M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
      M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;
  
      // set initial hash value [§5.3.1]
      var H0 = 0x67452301;
      var H1 = 0xefcdab89;
      var H2 = 0x98badcfe;
      var H3 = 0x10325476;
      var H4 = 0xc3d2e1f0;
  
      // HASH COMPUTATION [§6.1.2]
  
      var W = new Array(80); var a, b, c, d, e;
      for (var i=0; i<N; i++) {
  
          // 1 - prepare message schedule 'W'
          for (var t=0;  t<16; t++) W[t] = M[i][t];
          for (var t=16; t<80; t++) W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
  
          // 2 - initialise five working variables a, b, c, d, e with previous hash value
          a = H0; b = H1; c = H2; d = H3; e = H4;
  
          // 3 - main loop
          for (var t=0; t<80; t++) {
              var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
              var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
              e = d;
              d = c;
              c = ROTL(b, 30);
              b = a;
              a = T;
          }
  
          // 4 - compute the new intermediate hash value
          H0 = (H0+a) & 0xffffffff;  // note 'addition modulo 2^32'
          H1 = (H1+b) & 0xffffffff; 
          H2 = (H2+c) & 0xffffffff; 
          H3 = (H3+d) & 0xffffffff; 
          H4 = (H4+e) & 0xffffffff;
      }
  
      return H0.toHexStr() + H1.toHexStr() + H2.toHexStr() + H3.toHexStr() + H4.toHexStr();
    }
  }
  
}();

/**
 * @class Number
 */
Ext.applyIf(Number.prototype, {
    /**
     * extend Number class with a tailored hex-string method (note toString(16) is implementation-dependant, and in IE returns signed numbers when used on full words)
     * @return {String} The number in Hexidecimal format.
     */
    toHexStr : function(){
        var s = '', v;
        for(var i = 7; i >= 0; i--) {
            v = (this >>> (i * 4)) & 0xf;
            s += v.toString(16);
        }
        return s;
    }
});

 //JS File: ../js/ext/ux/Ext.ux.ThemeMenu.js 
 /*
* Theme Selection Menu
*
* By Antimatter15 2008
* i donno. gpl v3 maybe.
*/

Ext.ux.ThemeMenu = function(config){
    Ext.ux.ThemeMenu.superclass.constructor.call(this, config);

    //this.plain = true;
	for(var theme = 0; theme < this.themeconfig.length; theme++){
	this.add(new Ext.menu.CheckItem({
    text: this.themeconfig[theme][1], //text title
	theme: theme,
	checked: (this.themeconfig[theme][2]==true),
    group: 'thememenu',
    checkHandler: function(item, checked) {
        if (checked){
		item.parentMenu.setTheme(item.theme)
		};
    }
}))
}

};

Ext.extend(Ext.ux.ThemeMenu, Ext.menu.Menu, {

cssPath: "../theme/css/", //mind the trailing slash
themeconfig:[ //array of stuff
 ['xtheme-default.css','Ext Blue Theme',true] //t3h default
,['xtheme-gray.css', 'Gray Theme']
,['xtheme-gray.css,xtheme-gray-extend.css', 'Extended Gray Theme'] //this is an "extend" theme, it is applied over another theme
,['xtheme-darkgray.css', 'Dark Gray Theme']
,['xtheme-black.css',  'Black Theme']
,['xtheme-olive.css', 'Olive Theme']
,['xtheme-purple.css', 'Purple Theme']
,['xtheme-slate.css', 'Slate Theme']
,['xtheme-peppermint.css',  'Peppermint Theme']
,['xtheme-chocolate.css', 'Chocolate Theme']
,['xtheme-slickness.css', 'SlicknesS Theme']
,['xtheme-pink.css', 'Pink Theme']
,['xtheme-midnight.css', "Midnight Theme"]
,['xtheme-green.css', "Green Theme"]
,['xtheme-indigo.css', "Indigo Theme"]
,['xtheme-silverCherry.css',"Silver Cherry Theme"]
],
setTheme: function(id){
//console.log(this)
var theme = this.themeconfig[id][0];
var themes = theme.split(",")
for(var i = 0; i < 4; i++){ //up to 4 themes on top of each other
if(themes[i]){
Ext.util.CSS.swapStyleSheet('csstheme'+i, this.cssPath + themes[i]);
}else{
Ext.util.CSS.removeStyleSheet('csstheme'+i);
}
}

}//end setTheme
});







 //JS File: ../js/ext/ux/Ext.ux.ToastWindow.js 
 Ext.ux.ToastWindowMgr = {
    positions: [] 
};

Ext.ux.ToastWindow = Ext.extend(Ext.Window, {
    initComponent: function(){
          Ext.apply(this, {
              iconCls: this.iconCls || 'information',
            width: 200,
            height: 100,
            autoScroll: true,
            autoDestroy: true,
            plain: false
          });
        this.task = new Ext.util.DelayedTask(this.hide, this);
        Ext.ux.ToastWindow.superclass.initComponent.call(this);
    },
    setMessage: function(msg){
        this.body.update(msg);
    },
    setTitle: function(title, iconCls){
        Ext.ux.ToastWindow.superclass.setTitle.call(this, title, iconCls||this.iconCls);
    },
    onRender:function(ct, position) {
        Ext.ux.ToastWindow.superclass.onRender.call(this, ct, position);
    },
    onDestroy: function(){
        Ext.ux.ToastWindowMgr.positions.remove(this.pos);
        Ext.ux.ToastWindow.superclass.onDestroy.call(this);
    },
    afterShow: function(){
        Ext.ux.ToastWindow.superclass.afterShow.call(this);
        this.on('move', function(){
               Ext.ux.ToastWindowMgr.positions.remove(this.pos);
            this.task.cancel();}
        , this);
        this.task.delay(4000);
    },
    animShow: function(){
        this.pos = 0;
        while(Ext.ux.ToastWindowMgr.positions.indexOf(this.pos)>-1)
            this.pos++;
        Ext.ux.ToastWindowMgr.positions.push(this.pos);
        this.setSize(200,100);
        this.el.alignTo(document, "br-br", [ -20, -20-((this.getSize().height+10)*this.pos) ]);
        this.el.slideIn('b', {
            duration: 1,
            callback: this.afterShow,
            scope: this
        });    
    },
    animHide: function(){
           Ext.ux.ToastWindowMgr.positions.remove(this.pos);
        this.el.ghost("b", {
            duration: 1,
            remove: true,
        scope: this,
        callback: this.destroy
        });    
    }
});  
 //JS File: ../js/ajaxanimator.js 
 /**
 * Ajax Animator
 *
 * @author    Antimatter15
 * @copyright (c) 2007-2008, by Antimatter15
 * @date      14. April 2008
 * @version   0.20+
 *
 * @license application.js is licensed under the terms of the Open Source GPL 2.0 license. 
 * 
 * License details: http://www.gnu.org/licenses/gpl.html
 */
 
/*global Ext, Application */
 
Ext.BLANK_IMAGE_URL = '../theme/images/default/s.gif';
Ext.ns('Ax'); //i got tired of typing ajaxanimator.xxx so i shortened it
 
// application main entry point
Ext.onReady(function() {
 
    Ext.QuickTips.init();
	
	if(Ax.v.dev){
	new Ext.ux.ToastWindow({
    title: 'Testing Release',
    html: 'You are running an unstable testing release. '+
	'It is not intended for normal use. Please report bugs and post '+
	'comments about this release (build '+Ax.v.build+') frequently. Happy Testing!',
    iconCls: 'error'
	}).show(document);  
	}
 
    // code here
 
}); // eo function onReady
 
// eof
 //JS File: ../js/misc/version.js 
 /*Sample Ajax Animator Version config*/
Ax.v = /*START*/
{"build":25,"release":"0.2","dev":true,"date":1209342437.5}
/*STOP*/
 //JS File: ../js/misc/files.js 
 /*
files and direcories used via ajax

*/

Ax.files = {
userlist: "../server/user/userlist.php",
toolboxicons: "../img/icon/"
}
 //JS File: ../js/misc/message.js 
 
 //JS File: ../js/misc/about.js 
 Ax.About = function(){
if(!Ax.aboutWindow){
Ax.aboutWindow = new Ext.Window({
    closable: true,
    width: 410,
    height: 300,
    minimizable: true,
	title: "About Ajax Animator",
    border: false,
    plain: true,
    layout: 'border',
    buttons: [{
        text: 'Close',
        handler: function(){
            Ax.aboutWindow.hide();
        }
    }],
    items: [{
	region: "north",
	html: "<img src='../img/logo/logo4.png'>",
	height: 70
	},{
	xtype: "tabpanel",
    region: 'center',
    margins: '3 3 3 0', 
    activeTab: 0,
    defaults: {autoScroll:true},
 
    items:[{
        title: 'Version',
		html: "<b>Ajax Animator</b>"+"<br>"+
		"Release: "+Ax.v.release+"<br>"+
		"Build: "+Ax.v.build+"<br>"+
		"Testing: "+Ax.v.dev+"<br>"+
		"Release Date: "+new Date(Ax.v.date)+" ("+Ax.v.date+")<br>"+
		""
    },{
        title: 'Credits',
        html: 'Some other content'
    },{
		title: 'License',
		html: "GPL v3"
	}]
}]
});
 
Ax.aboutWindow.on('minimize', function(){
    Ax.aboutWindow.toggleCollapse();
});
}
Ax.aboutWindow.show();
}
 //JS File: ../js/misc/misc.js 
 /*
A whole lot of random scripts
*/


Ax.util = {
htmlentities : function(s){
//Slightly compressed version of the htmlentities function combined with nl2br
//  original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net) from php.js

var div = document.createElement('div'), text = document.createTextNode(s);
div.appendChild(text);
return div.innerHTML.replace(/([^>])\n/g, '$1<br />\n')
}

}



Ax.preload = function(){
Ax.setStatus("Preloading Icons")

var images = ["../img/img/silk/page_add.png","../img/img/silk/folder_go.png","../img/img/silk/disk.png","../img/img/silk/page_white_flash.png","../img/img/silk/computer_go.png","../img/img/silk/drive_web.png","../img/img/silk/world_link.png","../img/img/silk/textfield.png","../img/img/silk/arrow_undo.png","../img/img/silk/arrow_redo.png","../img/img/silk/cut_red.png","../img/img/silk/page_copy.png","../img/img/silk/page_paste.png","../img/img/silk/delete.png","../img/img/silk/page_white_flash.png","../img/img/silk/application_double.png","../img/img/silk/color_wheel.png","../img/img/silk/paintbrush.png","../img/img/silk/bug_go.png","../img/img/silk/script_code_red.png","../img/img/silk/plugin_edit.png","../img/img/silk/report.png","../img/img/silk/arrow_refresh.png","../img/img/silk/page_delete.png","../img/img/silk/add.png","../img/img/silk/key_add.png","../img/img/silk/resultset_last.png","../img/img/silk/bin.png","../img/img/silk/control_play.png","../img/img/silk/control_pause.png","../img/img/silk/control_fastforward.png","../img/img/silk/control_rewind.png","../img/img/silk/control_end.png","../img/img/silk/control_start.png","../img/img/silk/database_refresh.png","../img/img/silk/plugin.png","../img/img/silk/package_add.png","../img/img/silk/key_go.png","../img/img/silk/door_out.png","../img/img/silk/folder_explore.png","../img/img/silk/vcard.png","../img/img/silk/keyboard.png","../img/img/silk/information.png","../img/img/silk/comments.png","../img/img/silk/bug.png","../img/img/silk/book.png","../img/img/silk/bricks.png","../img/img/silk/lightbulb.png","../img/img/silk/money.png"] 
var loader = [];

this.checkload = function(){
var x = 0;
for(var i = 0; i < loader.length; i++){
if(loader[i].complete){
x ++
}
}
Ax.setStatus("Preloaded "+x+" out of "+loader.length)

}

for(var i = 0; i < images.length; i++){
loader[i] = new Image()
loader[i].src = "../css/"+images[i]
}
setInterval(this.checkload,20)
}
 //JS File: ../js/drawing/tools.js 
   Ax.ToolItem = Ext.extend(Ext.Component,{
  tool: "",
  img: "",
  selected: false,
  onSelect: function(){},
  onUnselect: function(){},
  
  unselect: function(){
  this.onUnselect(this);
  this.el.dom.className = "toolboxItem"
  },
  initComponents: function(){
  Ax.ToolItem.superclass.initComponent.apply(this, arguments);
  },
  handleMouseEvents: function(event,del){
  
    //console.log(arguments)
    if(!this.el.hasClass("tbx_sel")){
    //If it is not selected
    this.el.dom.className = "toolboxItem"; //remove all classes except the standard one
    switch(event.type){
    case "mouseover":
    this.el.addClass("tbx_ovr")
    break;
    case "mouseout":
    this.el.addClass("tbx_idl")
    break;
    case "mousedown":
    this.onSelect(this);
    this.el.addClass("tbx_sel");
    this.selected = true
    break;
    }
    }else{
    switch(event.type){
    case "mousedown":
	this.onUnselect(this);
    this.el.dom.className = "toolboxItem";
    this.selected = false;

    }
    //If it is already selected
     }
  },
  onRender: function(ct){
  if(!this.template){
  this.template = new Ext.Template(
  //'<div id="{tool}" class="toolboxItem tbx_idl">',
  '<img src="{img}" alt="{tool}" class="toolboxItem"></div>');
  }
  if(!this.el){
  this.el = ct.createChild()
  }
  
  this.template.append(this.el,{tool: this.tool, img: this.img})
  
  
  this.el.dom.className = "toolboxItem tbx_idl"; //idle/toolbox
  
  
  this.el.on("mousedown",this.handleMouseEvents,this)
  this.el.on("mouseover",this.handleMouseEvents,this)
  this.el.on("mouseout",this.handleMouseEvents,this)
  
  if(this.qtip){
  //console.log(this.qtip)
  Ext.QuickTips.register({
    target: this.el.dom.firstChild,
    title: 'Draw Tools',
    text: this.qtip,
    //dismissDelay: 20
  });
  }

  }
  
  })
  
  Ext.reg("tbxitem",Ax.ToolItem)
 //JS File: ../js/drawing/toolbox.js 
 Ax.ToolsPanel = Ext.extend(Ext.Panel,{
toolConfig: {
	"select": ["select.gif","Select Shapes"],
	"rect": ["rectangle.gif","Draw Rectangle"],
	"roundrect": ["roundrect.gif","Draw Rounded Rectangle"],
	"ellipse": ["circle.gif","Draw Ellipse/Circle"],
	"line": ["line.gif","Draw Line"],
	"delete": ["delete.gif","Delete selected shape"]
},
changeTool: function(){
for(var tool_id in this.toolConfig){
Ax.viewport.findById("tool_"+tool_id).unselect()
}
//this.toolConfig[this.tool][2]()


},

initComponent: function(){
var ia = []
for(var tool in this.toolConfig){


ia.push(new Ax.ToolItem({
tool:tool,
id: "tool_"+ tool,
toolConfig: this.toolConfig,
qtip: this.toolConfig[tool][1],
img:Ax.files.toolboxicons+this.toolConfig[tool][0], //ooh! gets the toolbox icons dir, and adds it to the stuff
onSelect: this.changeTool
}))
	
}
  
  
Ext.apply(this,{
layout: "table",
border: false,
layoutConfig: {
        // The total column count must be specified here
        columns: 2
    },
	items: ia
  })

   Ax.ToolsPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("toolbox",Ax.ToolsPanel)
  
  
  
  
  
  
  
  

 //JS File: ../js/animation/animations.js 
 Ax.AnimationBrowser = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,

{
id: "Animations",
xtype:"panel",
title:"Animations",
layout:"fit",
//html:"<img src='../img/mockup/animationbrowser.png' style='width: 500px; height: 400px'>"
items: {
layout:"border",

items:[{
border: false,
region:"center",
html: "oaki",
title:"Player",
id: "Player",
autoScroll: true,
tools: [{id: "gear"},{id: "help",
qtip: "View and share animations with other users. Use the left panel to browse for animations,"+
" and click them to view them. Feel free to press the \"import\" button and make improvements."}],
iconCls: "player_icon",
tbar: [{text: "By: Hardcoded Name"},{xtype: "tbfill"},
"Rating System"],
bbar: [{text: "Play",handler: function(){
this.setText((this.getText()=="Play")?"Pause":"Play")} //just a really really condensed script :P
},
{text: "Forward"},
{text: "Rewind"},
{xtype: "tbfill"},
"0/1337 0FPS"
]
},{
border: false,
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
width:250,
split:true,
collapsible:true,
layout: "fit",
titleCollapse:true,

//items: [{
		border: false,
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
],


border: false
}
}

)//end ext.apply




 Ax.AnimationBrowser.superclass.initComponent.apply(this, arguments);
}

})

Ext.reg("animationbrowser",Ax.AnimationBrowser)


 //JS File: ../js/animation/timeline.js 
 Ax.Timeline = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{

layout:"border",
items:[{
    region:"center",
	autoScroll: true,
	border: false,
	html: "<div style='width: 10000px'>Frames</div>"
  },{
    region:"west",
	width: 100,
	border: false,
    split:true,
    collapsible:true,
    collapseMode:"mini",
	autoScroll: true,
	html: "Layers"
  }]
})
   Ax.Timeline.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("timeline",Ax.Timeline)
 //JS File: ../js/ui/statusbar.js 
 
Ax.CanvasStatusbar = ({
    defaultText: 'Ready',
    defaultIconCls: '',
    items: [{
        text: 'Previous Frame'
    },{
	text: "Next Frame"
	},'-',{
	text: "More",
	menu: [{text : "sum stuff"}]
	}, " "]
})


Ax.PreviewStatusbar = ({
    defaultText: 'Uh... Something',
    defaultIconCls: '',
    items: [{
        text: 'A Buttozn'
    }, '-', 'Revisions'," "]
})


//Simple Status Function

Ax.setStatus = function(status){
Ax.viewport.findById("canvas").getBottomToolbar().setText(status)
Ax.viewport.findById("preview").getBottomToolbar().setText(status)
}

 //JS File: ../js/ui/history.js 
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

 //JS File: ../js/ui/clipboard.js 
 /*
Grid for Clipboard panel
*/

 Ax.Clipboard = Ext.extend(Ext.grid.GridPanel, {
 initComponent:function() {
 Ext.apply(this, {
 store: new Ext.data.SimpleStore({
 id:0,
 fields:[
 {name: 'id', type: 'float'},
 {name: 'type'}
 ],
 data:[
[0,"poop"],
[1,"poop1"],
[2,"poop2"],
[3,"poop3"],
[4,"poop4"],
[5,"poop5"],
[6,"poop6"]
 ]
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

 //JS File: ../js/ui/library.js 
 /*
Tree View for Library
*/

Ax.Library = Ext.extend(Ext.tree.TreePanel,{
initComponent: function(){
Ext.apply(this,{
  xtype:"treepanel",
  animate:true,
  autoScroll:true,
  containerScroll:true,
  root:new Ext.tree.TreeNode({text:'Tree Root',draggable : false}),
  dropConfig:{
    appendOnly:true
  },
  border:false

});


 Ax.Library.superclass.initComponent.apply(this, arguments);
}

});

Ext.reg("library",Ax.Library);



 //JS File: ../js/ui/login.js 
 Ax.LoginForm = Ext.extend(Ext.form.FormPanel,{
initComponent: function(){
Ext.apply(this,{
  xtype:"form",
  title:"Login Form",
  border:false,
  items:[{
      xtype:"textfield",
      fieldLabel:"Username",
      name:"textvalue"
    },{
      xtype:"textfield",
      fieldLabel:"Password",
      name:"textvalue",
      inputType:"password"
    },{
      xtype:"button",
      text:"Login"
    }]
})

Ax.LoginForm.superclass.initComponent.apply(this, arguments);
}
})
Ext.reg("loginform",Ax.LoginForm)
 //JS File: ../js/ui/toolbar.js 
 Ax.MainToolbar = [
{text:"File", menu: [
{text: "New", iconCls: "tb_new"},
{text: "Open", iconCls: "tb_open", menu: [
{text: "From Computer", iconCls: "tb_comp"},
{text: "From Webserver", iconCls: "tb_server"},
{text: "From URL", iconCls: "tb_url"},
{text: "From Text", iconCls: "tb_text"}
]},
{text: "Save", iconCls: "tb_save",menu: [
{text: "To Computer", iconCls: "tb_comp"},
{text: "To Webserver", iconCls: "tb_server"},
{text: "To Text", iconCls: "tb_text"}
]},
"-",
{text: "Publish", iconCls: "tb_publish"}
]},
{text:"Edit", menu: [
{text: "Undo", iconCls: "tb_undo"},
{text: "Redo", iconCls: "tb_redo"},
"-", //seperator, i hope when i run this through a formatter the comments arent stripped.
{text: "Cut", iconCls: "tb_cut"},
{text: "Copy", iconCls: "tb_copy"},
{text: "Paste", iconCls: "tb_paste"},
{text: "Delete", iconCls: "tb_delete"}
]},
{text:"View", menu: [
//Add some check item stuff for visible panels
{text: "Animation", iconCls: "tb_animation"},
{text: "Theme", iconCls: "tb_theme", menu: new Ext.ux.ThemeMenu},
"-",
{text: "Timeline", xtype: "checkitem", checked: true},
{text: "Tools", xtype: "checkitem", checked: true},
{text: "Misc", xtype: "checkitem", checked: true},
{text: "Properties", xtype: "checkitem", checked: true},
{text: "Actionscript", xtype: "checkitem", checked: true}

]},
{text:"Tools", menu: [
{text: "Color Picker", iconCls: "tb_color"},
{text: "Drawing", iconCls: "tb_tools", menu: [{text: "Select"}]},
{text: "Debug Console", iconCls: "tb_debug"},
{text: "Macro Executor", iconCls: "tb_script"},
{text: "Plugin Settings", iconCls: "tb_plugin_conf"},
{text: "Reload Application", iconCls: "tb_reload"},
{text: "Preload Icons", iconCls: "tb_preload", handler: Ax.preload},
{text: "Benchmark", iconCls: "tb_benchmark"}
]},
{text:"Timeline", menu: [
{text: "New Layer",iconCls: "tb_newlayer"},
{text: "To Keyframe",iconCls: "tb_addkeyframe"},
{text: "Clear Frame",iconCls: "tb_clearframe"},
"-", //organized from stuff you might actually use, compared to stuff you have a slight change if any of using
{text: "Reload Data", iconCls: "tb_reload"},
{text: "Set Last Frame", iconCls: "tb_setlast"},
{text: "Purge Empty", iconCls: "tb_purge_empty"}
]},
{text:"Animation", menu: [
{text: "Play", iconCls: "tb_play"},
{text: "Pause", iconCls: "tb_pause"},
{text: "Next Frame", iconCls: "tb_nf"},
{text: "Previous Frame", iconCls: "tb_pf"},
{text: "Last Frame", iconCls: "tb_last"},
{text: "First Frame", iconCls: "tb_first"},
"-", //not really related...
{text: "Recalculate Tweens", iconCls: "tb_recalculate"}
]},
{text:"Plugins", menu: [
{text: "Add Plugins", iconCls: "tb_plugin_add"},
"-", //split
{text: "Explode",iconCls: "tb_plugin"},
{text: "Random Shape",iconCls: "tb_plugin"}
]},
{text:"User", menu: [
{text: "Login", iconCls: "tb_login"},
{text: "Logout", iconCls: "tb_logout"},
{text: "Browse Animations", iconCls: "tb_browse"},
{text: "Profile", iconCls: "tb_profile"}
]},
{text:"Help", menu: [
{text: "About", iconCls: "tb_about", handler: Ax.About},
{text: "Key Shortcuts", iconCls: "tb_keyboard"},
{text: "Manual", iconCls: "tb_docs"},
{text: "FAQ", iconCls: "tb_docs"},
{text: "Bug Reports", iconCls: "tb_bug"},
{text: "Comments", iconCls: "tb_comment"},
{text: "Donate", iconCls: "tb_donate"},
{text: "Interactive Tutorials", iconCls: "tb_tutorial", menu: [
{text: "Beginner's Tutorial", iconCls: "tb_info"}
]}
]}
]
 //JS File: ../js/ui/panels/center.js 
 Ax.LayoutCenterPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{

    region:"center",
    //title:"Canvas",
	
    layout:"fit",
	//tbar: Ax.MainToolbar,
    border:true,
    items:[{
        xtype:"tabpanel",
        tabPosition:"bottom",
        border:false,
        activeTab:0,
        items:[{
            xtype:"panel",
            title:"Canvas",
			//iconCls: "canvas_icon",
            layout:"fit",
			tabTip: "Draw and create your animations",
             border:false,
			items: [{
			//region: "center",
			id: "canvas",
            xtype:"panel",
            title:"Canvas",
			bbar: new Ext.StatusBar(Ax.CanvasStatusbar),
			tools: [{id: "gear"},{id: "help", 
			qtip: "Select tools from the west panel and draw on the canvas with them."}],
			iconCls: "canvas_icon",			
            layout:"fit",		
			tbar: [{text: "test"},{xtype: "tbfill"},{text: "Zoom"}],
			 html:"Draw here!\n<br>\n-Replace RichDraw with either OnlyPaths or Prototype Graphic Frameworks editor\n<br>\n[Support IE]\n<br>\nAlso: Opacity\n",
			 border: false
			}]
          },{
            xtype:"panel",
            title:"Preview",
			//iconCls: "preview_icon",
			tabTip: "Preview and Export your animations",
			items: [{
			id: "preview",
            xtype:"panel",
            title:"Preview",
			tbar: [{text: "stuff"},{xtype: "tbfill"},{text: "Zoom"}],
			bbar: new Ext.StatusBar(Ax.PreviewStatusbar),
			border: false,
			tools: [{id: "gear"},{id: "help",
			qtip: "Preview and Export your animations to Flash&reg; ... Hopefully"}],
			iconCls: "preview_icon",			
            layout:"fit",
			html: "t3h standard preview thingy"
			}],
            layout:"fit",
			border: false
          },{
		  //iconCls: "animations_icon",
		  xtype: "animationbrowser", 
		  tabTip: "Share and View other user's animations"
		  }]
      }]
  })
   Ax.LayoutCenterPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutcenter",Ax.LayoutCenterPanel)
 //JS File: ../js/ui/panels/east.js 
 Ax.LayoutEastPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"east",
    title:"Misc",
    split:true,
    collapsible:true,
    titleCollapse:true,
    width:130,
    layout:"fit",
    border:true,
    items:[{
        xtype:"tabpanel",
        activeTab:0,
        border:false,
        items:[{
            xtype:"panel",
            title:"Misc",
            layout:"fit",
            items:[{
                layout:"accordion",
                layoutConfig:{
                  activeOnTop:false,
                  animate:true,
                  autoWidth:true,
                  collapseFirst:false,
                  fill:true,
                  hideCollapseTool:false,
                  titleCollapse:true
                },
                border:false,
                items:[{
                    title:"History",
                    autoHeight:true,
					iconCls: "history_icon",
                    border:false,
					tools: [{id: "close", qtip: "Clear History"}],
                    items:[{xtype: "history"}]
                  },{
                    title:"Clipboard",
                    autoHeight:true,
					iconCls: "clipboard_icon",
					tools: [{id: "close", qtip: "Clear Clipboard"}],
                    border:false,
                    items:[{xtype:"clipboard"}]
                  },{
                    title:"Library",
                    autoHeight:true,
					iconCls: "library_icon",
                    border:false,
                    items:[{xtype:"library"}]
                  },{
                    title:"Misc",
                    autoHeight:true,
					iconCls: "misc_icon",
                    html:"None Yet :P",
                    border:false
                  }]
              }]
          },{
            xtype:"panel",
            title:"User",
            border:false,
            //html: "hi",
			//items:[{xtype: "loginform"}]
			items: [{xtype:"panel", html: "stuff"}]
          
		  }]
      }]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutEastPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layouteast",Ax.LayoutEastPanel)
 //JS File: ../js/ui/panels/west.js 
 Ax.LayoutWestPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"west",
    title:"Tools",
    split:true,
    collapsible:true,
    titleCollapse:true,
	hideCollapseTool: true,
	//html: "<img src='../img/mockup/tools.png'>",
    width:50,
    border:true,
	items: {xtype:"toolbox"}
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutWestPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutwest",Ax.LayoutWestPanel)
 //JS File: ../js/ui/panels/north.js 
 Ax.LayoutNorthPanel = Ext.extend(Ext.Panel,{
initComponent: function(){

Ext.apply(this,{
    region:"north",
	layout: "fit",
    collapsible:true,
    collapseMode: "mini",
    split:true,
	border: false,
    height:70,
//    border:true,
	items: {xtype: "timeline", border: false}
  })
  this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 

   Ax.LayoutNorthPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutnorth",Ax.LayoutNorthPanel)
 //JS File: ../js/ui/panels/south.js 
 Ax.LayoutSouthPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"south",
    title:"Properties",
    split:true,
    collapsible:true,
    titleCollapse:true,
    height:50,
	items: [{
	xtype: "form",
	labelWidth: 50,
	border: false,
	items: [{
	layout: "column",
	border: false,
	items: [{
	layout: "form",
	border: false,
	items: [{
		xtype: "textfield",
		fieldLabel: "Width",
		name: "Width"
	}]
	}]
	}]
	}]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutSouthPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutsouth",Ax.LayoutSouthPanel)
 //JS File: ../js/ui/register.js 
 Ax.RegistrationForm = Ext.extend(Ext.form.FormPanel,{
initComponent: function(){
Ext.apply(this,{
  xtype:"form",
  title:"Registration Form",
  border:false,
  items:[{
      xtype:"textfield",
      fieldLabel:"Username",
      name:"textvalue"
    },{
      xtype:"textfield",
      fieldLabel:"Password",
      name:"textvalue",
      inputType:"password"
    },{
      xtype:"textfield",
      fieldLabel:"Password",
      name:"textvalue",
      inputType:"password"
    },{
      xtype:"button",
      text:"Register Account"
    }]
})

Ax.RegistrationForm.superclass.initComponent.apply(this, arguments);
}
})
Ext.reg("registrationform",Ax.RegistrationForm)
 //JS File: ../js/ui/main.js 
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


setTimeout(function(){
    Ext.get('loading').remove();
    Ext.get('loading-mask').fadeOut({remove:true});
}, 250);


}); //End Ext.onReady
