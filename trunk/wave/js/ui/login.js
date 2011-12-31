Ax.LoginForm = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
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
border: false,
items:[{
    title:"Login",
    layout: "fit",
    iconCls: "tb_login",
    //autoHeight:true,
    border: false,
    items:[{
        xtype:"form",
        labelWidth:30,
        border:false,
        items:[{
            xtype:"textfield",
            fieldLabel:"User",
            name:"textvalue",
            width:90
          },{
            xtype:"textfield",
            fieldLabel:"Pass",
            name:"textvalue",
            width:90
          },{
            xtype:"button",
            text:"Login"
          }]
      }]
  },{
    title:"Register",
    //autoHeight:true,
    layout: "fit",
    iconCls: "tb_register",
    border: false,
    items:[{
        xtype:"form",
        labelWidth:30,
        border:false,
        items:[{
            xtype:"textfield",
            fieldLabel:"User",
            name:"textvalue",
            width:90
          },{
            xtype:"textfield",
            fieldLabel:"Pass",
            name:"textvalue",
            width:90
          },{
            xtype:"textfield",
            fieldLabel:"Pass",
            name:"textvalue",
            width:90
          },{
            xtype:"button",
            text:"Create Account"
          }]
      }]
  }]
})

Ax.LoginForm.superclass.initComponent.apply(this, arguments);
}
})
Ext.reg("loginform",Ax.LoginForm)