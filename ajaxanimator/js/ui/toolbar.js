Ax.MainToolbar = [
  {text:"File", menu: [
  {text: "New", iconCls: "tb_new", handler: function(){Ax.new_animation()}},
  {text: "Open", iconCls: "tb_open", menu: [
	{text: "From Computer", iconCls: "tb_comp", handler: function(){Ax.open.file()}},
    {text: "From Webserver", iconCls: "tb_server"},
    {text: "From Text", iconCls: "tb_text", handler: function(){Ax.open.text()}},
	{text: "From URL", iconCls: "tb_url", handler: function(){Ax.open.url()}}
	]},
	
  {text: "Save", iconCls: "tb_save",menu: [
    {text: "To Computer", iconCls: "tb_comp", handler: function(){Ax.save.computer()}},
    {text: "To Webserver", iconCls: "tb_server"},
    {text: "To Text", iconCls: "tb_text", handler: function(){Ax.save.text()}}
  ]},
  "-",
  {text: "Publish", iconCls: "tb_publish"},
  {text: "Offline", iconCls: "tb_offline"}
]},
{text:"Edit", menu: [
  {text: "Undo", iconCls: "tb_undo", handler: function(){Ax.history_undo()}},
  {text: "Redo", iconCls: "tb_redo", handler: function(){Ax.history_redo()}},
  "-", //seperator, i hope when i run this through a formatter the comments arent stripped.
  {text: "Cut", iconCls: "tb_cut", handler: function(){Ax.clipboard_cut()}}, //woah! look! the whole thing is progressively 2 characters more!
  {text: "Copy", iconCls: "tb_copy", handler: function(){Ax.clipboard_copy()}}, //that's freaking cool!
  {text: "Paste", iconCls: "tb_paste", handler: function(){Ax.clipboard_paste()}}, //awesomeness
  {text: "Delete", iconCls: "tb_delete", handler: function(){Ax.setTool("delete")}} //wootyness
  //i wonder what woudl be here? "explode"?
]},
{text:"View", menu: [
  //Add some check item stuff for visible panels

  {text: "Animation", iconCls: "tb_animation", handler: function(){Ax.controls.play()}},
  {text: "Information", iconCls: "tb_about", handler: function(){Ax.animationinfo()}},
  {text: "Theme", iconCls: "tb_theme", menu: new Ext.ux.ThemeMenu},
  "-",
  {text: "Timeline", xtype: "checkitem", checked: true},
  {text: "Tools", xtype: "checkitem", checked: true},
  {text: "Misc", xtype: "checkitem", checked: true},
  {text: "Properties", xtype: "checkitem", checked: true}
]},
{text:"Tools", menu: [
  //{text: "Color Picker", iconCls: "tb_color"},
  {text: "Drawing", iconCls: "tb_tools", menu: [{text: "Select", iconCls: "tx_select", handler: function(){Ax.setTool("select")}},
                                                {text: "Rectangle", iconCls: "tx_rectangle", handler: function(){Ax.setTool("rect")}},
                                                {text: "Rounded Rectangle", iconCls: "tx_roundrect", handler: function(){Ax.setTool("roundrect")}},
                                                {text: "Ellipse/Circle", iconCls: "tx_circle", handler: function(){Ax.setTool("ellipse")}},
                                                {text: "Line", iconCls: "tx_line", handler: function(){Ax.setTool("line")}},
                                                {text: "Freeform Path", iconCls: "tx_path", handler: function(){Ax.setTool("path")}},
                                                {text: "Polygon", iconCls: "tx_polygon", handler: function(){Ax.setTool("polygon")}},
                                                {text: "Text", iconCls: "tx_text", handler: function(){Ax.setTool("text")}},
                                                {text: "Image", iconCls: "tx_image", handler: function(){Ax.setTool("image")}}]},
  {text: "Recovery", iconCls: "tb_shield", menu: [
                            {text: "Reload Canvas", iconCls: "tb_recover_canvas", handler: function(){Ax.reloadCanvas()}},
                            {text: "Reload Animation", iconCls: "tb_recover_animation", handler: function(){Ax.reload_animation()}},
                            {text: "Reload Application", iconCls: "tb_recover_application", handler: function(){window.location.reload(true)}}
  ]},
  {text: "Script Executor", iconCls: "tb_script", handler: function(){Ax.macroExec()}},
  {text: "Plugin Settings", iconCls: "tb_plugin_conf"}
]},
{text:"Timeline", menu: [
  {text: "New Layer",iconCls: "tb_newlayer", handler: function(){Ax.addLayer()}},
  {text: "Insert Frame", iconCls: "tb_insertframe", handler: function(){Ax.insertFrame()}},
  {text: "To Keyframe",iconCls: "tb_addkeyframe", handler: function(){Ax.toKeyframe()}},
  {text: "Clear Frame",iconCls: "tb_clearframe"},
  "-", //organized from stuff you might actually use, compared to stuff you have a slight change if any of using
  {text: "Reload Data", iconCls: "tb_reload"},
  {text: "Set Last Frame", iconCls: "tb_setlast"},
  {text: "Purge Empty", iconCls: "tb_purge_empty"}
]},
{text:"Animation", menu: [
  {text: "Canvas Mode", disabled: true}, //this needs serious work.
  {text: "Play", iconCls: "tb_play", handler: function(){Ax.controls.play()}},
  {text: "Pause", iconCls: "tb_pause", handler: function(){Ax.controls.pause()}},
  {text: "Next Frame", iconCls: "tb_nf", handler: function(){Ax.controls.next()}},
  {text: "Previous Frame", iconCls: "tb_pf", handler: function(){Ax.controls.previous()}},
  {text: "Last Frame", iconCls: "tb_last", handler: function(){Ax.controls.last()}},
  {text: "First Frame", iconCls: "tb_first", handler: function(){Ax.controls.first()}},
  "-", //not really related...
  {text: "Recalculate Tweens", iconCls: "tb_recalculate", handler: function(){}}
]},
{text:"Plugins", menu: [
  {text: "Add Plugins", iconCls: "tb_plugin_add"},
  "-", //split
  {text: "Explode",iconCls: "tb_plugin", handler: function(el){Ax.exec(el.initialConfig.text)}},
  {text: "Random Shape",iconCls: "tb_plugin", handler: function(el){Ax.exec(el.initialConfig.text)}}
]},
{text:"User", menu: [
  {text: "Login", iconCls: "tb_login"},
  {text: "Logout", iconCls: "tb_logout"},
  {text: "Browse Animations", iconCls: "tb_browse", handler: function(){Ax.showanimationbrowser()}},
  {text: "Profile", iconCls: "tb_profile"}
]},
{text:"Help", menu: [
  {text: "About", iconCls: "tb_about", handler: function(){Ax.About()}},
  {text: "Key Shortcuts", iconCls: "tb_keyboard", handler: function(){Ax.keyGuide()}},
  {text: "Tip of the Day", iconCls: "tb_tip", handler: function(){Ax.showTips()}},
  {text: "Manual", iconCls: "tb_docs", handler: function(){Ax.loadManual()}},
  {text: "FAQ", iconCls: "tb_docs", handler: function(){Ax.loadFAQ()}},
  {text: "Bug Reports", iconCls: "tb_bug", handler: function(){Ax.BugReport()}},
  {text: "Comments", iconCls: "tb_comment"},
  {text: "Donate", iconCls: "tb_donate"},
  {text: "Interactive Tutorials", iconCls: "tb_tutorial", menu: [
    {text: "Beginner's Tutorial", iconCls: "tb_info"}
  ]}
  ]}
]