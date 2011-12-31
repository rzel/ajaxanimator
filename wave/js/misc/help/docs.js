/*
Documentation (FAQ, Manual, Etc.)
*/

Ax.loadTab = function(object){
Ax.viewport.findById("maintabpanel").add(object).show()
}

Ax.loadFAQ = function(){
Ax.loadTab({xtype: "faq"})
//Ax.gs(2);
}
Ax.loadManual = function(){
Ax.loadTab({xtype: "manual"})
//Ax.gs(3);
}

Ax.loadAdvanced = function(){
Ax.loadTab({xtype: "advanced"})
//Ax.gs(3);
}


Ax.FAQ = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
	title: "FAQ",

	closable: true,
	iconCls: "tb_docs",
	layout: "fit",
	border: false,
	items: {
	title: "FAQ",
	border: true,
		cls: "docs",
	iconCls: "tb_docs",
	bodyStyle: "overflow: auto;",
	//autoLoad: {
	//	url: Ax.files.faq
	//}
  //html: "FAK"
  html: '<iframe src="http://antimatter15.com/ajaxanimator/server/doc/faq.htm" border="0" style="border:none;top: 0;left:0;width:100%;height:100%;"></iframe>'
	
  
	}
	
  })
   Ax.FAQ.superclass.initComponent.apply(this, arguments);
  }
  })
  
Ext.reg("faq",Ax.FAQ)

Ax.Manual = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
	title: "Manual",
	closable: true,
	iconCls: "tb_docs",
	layout: "fit",
	border: false,
	items: {
	title: "Manual",
	border: true,
	iconCls: "tb_docs",
	cls: "docs",
	//autoLoad: {
	//	url: Ax.files.manual
	//}
  html: '<iframe src="http://brwainer.110mb.com/ajaxanimator/manual/index.php" border="0" style="border:none;top: 0;left:0;width:100%;height:100%;"></iframe>'
	}
	
  })

   Ax.Manual.superclass.initComponent.apply(this, arguments);
  }
  })
  
Ext.reg("manual",Ax.Manual)


Ax.Advanced = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
	title: "Advanced",
	closable: true,
	iconCls: "tb_docs",
	layout: "fit",
	border: false,
	items: {
	title: "Advanced",
	border: true,
	iconCls: "tb_docs",
	cls: "docs",
  html: '<iframe src="http://antimatter15.com/ajaxanimator/advanced.html" border="0" style="border:none;top: 0;left:0;width:100%;height:100%;"></iframe>'
	}
	
  })

   Ax.Advanced.superclass.initComponent.apply(this, arguments);
  }
  })
  
Ext.reg("advanced",Ax.Advanced)
