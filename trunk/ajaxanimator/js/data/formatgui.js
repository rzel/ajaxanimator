/*
 * all the remarkably interesting code that displays that box to show you the markup
 * that magical dialog that asks if it wants to steal all your private files on your drive
 * that cool box requesting to steal items on your clipboard
 * that field that attempts to steal your favorite sites
 * that stuff that goes on that tries to carpetbomb your desktop with random aliens :P
 * yep, all that magic takes place..... here.
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
                    },
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
                    Ax.autoimport(this.ownerCt.findById("loadtext").getValue())
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

Ax.save = {
    text: function(){
        (new Ext.Window({
            title: "Save Animation As Text",
            iconCls: "tb_save",
            width: 300,
            height: 300,
            buttons: [{
                text: "Update",
                iconCls: "reload_icon",
                handler: function(){
                    this.ownerCt.findById("outtext").setValue(Ax.export_animation(Ax.animation.markup, "json"))
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
                html: "You may copy the text below and save it somewhere to open later from the File->Open->From Text menu option."
            }, {
                region: "center",
                layout: "fit",
                border: false,
                items: {
                    id: "outtext",
                    xtype: "textarea",
                    style: "font-size: 9px",
                    value: Ax.export_animation(Ax.animation.markup, "json")
                }
            }]
        })).show(document.body)
    },
    computer: function(){
        Ext.Ajax.request({
            url: Ax.files.save_proxy,
            params: {
                action: "test"
            },
            success: function(e){
                //console.log(e)
                if (e.responseText = "working") {
                    Ax.save.comp_iframe(); //server connection works, try the iframe awesomeness
                }
                else {
                    Ax.save.comp_datauri(); //apparently the server doesn't work
                }
            },
            failure: function(){
                Ax.save.comp_datauri(); //the connection failed, so try the datauri method
            }
        })
        
    },
    comp_datauri: function(){
        window.location = "data:application/octetstream;base64," + Ext.ux.base64.encode(Ax.export_animation(Ax.animation.markup, "json"));
    },
    comp_iframe: function(){
        Ax.msg("Saving...", "The request is being processed by the server and may take a long time depending on the size of the animation." +
        "<form id=\"save_form\" method=\"POST\" action=\"" +
        Ax.files.save_proxy +
        "\"><input type=\"hidden\" name=\"name\" value=\"" +
        Ax.animation.name +
        "\" /><input type=\"hidden\" name=\"action\" value=\"work\" /></form>");
        var new_input = document.createElement("input")
        new_input.type = "hidden";
        new_input.name = "data";
        new_input.value = Ax.export_animation(Ax.animation.markup, "json");
        Ext.get("save_form").dom.appendChild(new_input); //waste of Ext, I know
        Ext.get("save_form").dom.submit();
    }
}


Ax.autoimport = function(markup){
    var jsonmarkup = Ax.test_animation_markup(markup);
    if (jsonmarkup != false) {
        if (jsonmarkup.revision) {
            if (Math.round(jsonmarkup.revision) > Ax.format.support.max) {
                Ax.msg("Warning! Proof of time travel", "It seems that the animation you are attempting to load was created with a future version of the ajax animator. It may contain data that can not be loaded properly in this version, or may load perfectly fine.")
            }
            if (Math.round(jsonmarkup.revision) < Ax.format.support.min) {
                Ax.msg("Warning!", "The animation you are attempting to load seems to be created by an older, unsupported version. It is more than likely some information here will not load properly.")
            }
        }
        Ax.import_animation(markup);
    }
    else {
        if (markup.indexOf(";;") != -1) {
            Ax.msg("Unable to load animation!", "The animation looks like data from the AXML format used by Ajax Animator 0.14.7 and below. It is not supported natively in this release due to the usage of a new format in 0.20+.")
        }
        else {
            Ax.msg("Unable to load animation!", "The animation could not be loaded because it is malformed. Check the data for corruption, or from an unsupported source.")
        }
    }
}


Ax.animationinfo = function(){
    //graphically displays metadata in animation, also some statistics, etc.
    
    
    (new Ext.Window({
        title: "Animation Info - " + Ax.animation.name,
        iconCls: "tb_about",
        width: 300,
        height: 200,
        html: "<b>" + Ax.animation.name + ":</b><br />Generator: " + Ext.util.JSON.encode(Ax.animation.markup.generator) +
        "<br />Creation Date: " +
        ((Ax.animation.markup.creation) ? Ax.animation.markup.creation : "Unknown") +
        "<br />Last Modified Date: " +
        ((Ax.animation.markup.modified) ? Ax.animation.markup.modified : "Unknown") +
        "<br />Contributors: " +
        ((Ax.animation.markup.contrib) ? Ax.animation.markup.contrib : ['Unknown']).join(",") +
        "<br />Size: " +
        Ax.export_animation(Ax.animation.markup, "json").length + 
		"<br />Layers: " + Ax.tstat.layers
    
    })).show(document.body)
}
