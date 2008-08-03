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
	bodyStyle: "overflow: auto; padding-left: 10px",
	autoLoad: {
		url: Ax.files.faq
	}
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
	bodyStyle: "overflow: auto; padding-left: 10px",
	cls: "docs",
	autoLoad: {
		url: Ax.files.manual
	}
	}
	
  })

   Ax.Manual.superclass.initComponent.apply(this, arguments);
  }
  })
  
Ext.reg("manual",Ax.Manual)