/**
 * @author antimatter15
 */

 
 Ax.open = {
    text: function(){
        (new Ext.Window({
            title: "Open Animation From Text",
            iconCls: "tb_open",
            width: 300,
            height: 300,
            buttons: [{
                text: "Load",
                iconCls: "load",
                handler: function(){
                    Ax.autoimport(this.ownerCt.findById("loadtext").getValue())
                }
            }, {
                text: "Close",
                iconCls: "close",
                handler: function(){
                    this.ownerCt.close()
                }
            }],
            layout: "border",
            items: [{
                region: "north",
                border: false,
                html: "Paste some data acquired from the save to text button here."
            }, {
                region: "center",
                layout: "fit",
                border: false,
                items: {
                    id: "loadtext",
                    xtype: "textarea",
                    style: "font-size: 9px"
                }
            }]
        })).show(document.body)
    },
    file: function(){
        (new Ext.Window({
            title: "Open Animation From Computer",
            iconCls: "tb_open",
            width: 400,
            height: 105,
            buttons: [{
                text: "Load",
                iconCls: "load",
                handler: function(){
                    //console.log(this.ownerCt.findById("loadform"))
                    this.ownerCt.findById("loadform").form.submit({
                        url: Ax.files.open_proxy,
                        success: function(form, action){
                            Ax.autoimport(Ext.util.JSON.encode(action.result.data))
                        },
                        failure: function(form, action){
                            Ax.toastMsg("Upload Failed", action.failureType + action.result.error +
                            " Animation could not be loaded. If trying again fails, try pasting the file's contents into the Open from Text dialog.")
                        }
                    })
                    Ext.Ajax.request({
                        url: Ax.files.open_proxy,
                        params: {
                            action: "test"
                        },
                        success: function(e){
                     
                            if (e.responseText != "working") {                   
                                Ax.toastMsg("Probable Failure", "Upload handling server appears not to be working")
                            }
                        },
                        failure: function(){
                            Ax.toastMsg("Probable Failure", "Upload handling server appears not to be working")
                        }
                    })
                                       
                }
            }, {
                text: "Close",
                iconCls: "close",
                handler: function(){
                    this.ownerCt.close()
                }
            }],
            border: false,
            items: [{
                layout: "fit",
                html: "Please locate the saved animation from your computer.",
                border: false
            }, {
                border: false,
                id: "loadform",
                xtype: "form",
                fileUpload: true,
                listeners: {
                    beforeaction: function(){
                        Ax.msg("Uploading Data", "The animation file is being uploaded to the server.")
                    }
                },
                items: [{
                    name: "file",
                    xtype: "field",
                    fieldLabel: "Animation File",
                    inputType: "file"
                },{
					name: "action",
					xtype: "hidden",
					value: "work"
				}]
            }]
        })).show(document.body)
    },
    url: function(){
        (new Ext.Window({
            title: "Open Animation From URL",
            iconCls: "tb_open",
            width: 350,
            height: 100,
            buttons: [{
                text: "Load",
                iconCls: "load",
                handler: function(){
					Ext.MessageBox.alert("Functionality Disabled","Loading an animation from an external server has been disabled for (pseudo) security purposes.")
                    //Ax.autoimport(this.ownerCt.findById("loadtext").getValue())
                }
            }, {
                text: "Close",
                iconCls: "close",
                handler: function(){
                    this.ownerCt.close()
                }
            }],
            //layout: "border",
            border: false,
            items: [{
                layout: "fit",
                html: "Place the location of the online resource to load from.",
                border: false
            }, {
                label: "URL",
                id: "loadurl",
                style: "width: 100%",
                xtype: "textfield"
            }]
        })).show(document.body)
    }
}
