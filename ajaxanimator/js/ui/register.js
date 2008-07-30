Ax.RegistrationForm = Ext.extend(Ext.form.FormPanel, {
    initComponent: function(){
        Ext.apply(this, {
            xtype: "form",
            title: "Registration Form",
            border: false,
            items: [{
                xtype: "textfield",
                fieldLabel: "Username",
                name: "textvalue"
            }, {
                xtype: "textfield",
                fieldLabel: "Password",
                name: "textvalue",
                inputType: "password"
            }, {
                xtype: "textfield",
                fieldLabel: "Password",
                name: "textvalue",
                inputType: "password"
            }, {
                xtype: "button",
                text: "Register Account"
            }]
        })
        
        Ax.RegistrationForm.superclass.initComponent.apply(this, arguments);
    }
})
Ext.reg("registrationform", Ax.RegistrationForm)
