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
  {text: "Publish", iconCls: "tb_publish"},
  {text: "Offline", iconCls: "tb_offline"}
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
  //{text: "Color Picker", iconCls: "tb_color"},
  {text: "Reload Canvas", iconCls: "tb_reload", handler: function(){Ax.reloadCanvas()}},
  {text: "Drawing", iconCls: "tb_tools", menu: [{text: "Select", iconCls: "tx_select"},
                                                {text: "Rectangle", iconCls: "tx_rectangle"},
                                                {text: "Rounded Rectangle", iconCls: "tx_roundrect"},
                                                {text: "Ellipse/Circle", iconCls: "tx_circle"},
                                                {text: "Line", iconCls: "tx_line"},
                                                {text: "Freeform Path", iconCls: "tx_path"},
                                                {text: "Polygon", iconCls: "tx_polygon"},
                                                {text: "Text", iconCls: "tx_text"},
                                                {text: "Image", iconCls: "tx_image"}]},
  {text: "Debug Console", iconCls: "tb_debug", handler: function(){Ext.log("Opening Console")}},
  {text: "Macro Executor", iconCls: "tb_script"},
  {text: "Plugin Settings", iconCls: "tb_plugin_conf"},
  {text: "Reload Application", iconCls: "tb_reload", handler: function(){window.location.reload(true)}},
  {text: "Benchmark", iconCls: "tb_benchmark"}
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
  {text: "Draw Mode", disabled: true, id: "animcontroltype"},
  {text: "Play", iconCls: "tb_play", handler: function(){Ax.controls.play()}},
  {text: "Pause", iconCls: "tb_pause", handler: function(){Ax.controls.pause()}},
  {text: "Next Frame", iconCls: "tb_nf", handler: function(){Ax.controls.next()}},
  {text: "Previous Frame", iconCls: "tb_pf", handler: function(){Ax.controls.previous()}},
  {text: "Last Frame", iconCls: "tb_last", handler: function(){Ax.controls.last()}},
  {text: "First Frame", iconCls: "tb_first", handler: function(){Ax.controls.first()}},
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
  {text: "About", iconCls: "tb_about", handler: function(){Ax.About()}},
  {text: "Key Shortcuts", iconCls: "tb_keyboard", handler: function(){Ax.keyGuide()}},
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