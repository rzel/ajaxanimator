/**
 * @author antimatter15
 * 
 * This is pretty cool rite?
 */
 
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
    computer: function(data, name, base64){
        Ext.Ajax.request({
            url: Ax.files.save_proxy,
            params: {
                action: "test"
            },
            success: function(e){
                //console.log(e)
                if (e.responseText = "working") {
                    Ax.save.comp_iframe(data, name, base64); //server connection works, try the iframe awesomeness
                }
                else {
                    Ax.save.comp_datauri(data); //apparently the server doesn't work
                }
            },
            failure: function(){
                Ax.save.comp_datauri(data); //the connection failed, so try the datauri method
            }
        })
        
    },
    comp_datauri: function(data, base64){
        window.location = "data:application/octetstream;base64," + base64?data:(Ext.ux.base64.encode((data)?data:Ax.export_animation(Ax.animation.markup, "json")));
    },
    comp_iframe: function(data, name, base64){
        Ax.msg("Saving...", "The request is being processed by the server and may take a long time depending on the size of the animation." +
        "<form id=\"save_form\" method=\"POST\" action=\"" +
        Ax.files.save_proxy +
        "\"><input type=\"hidden\" name=\"encoding\" value=\"" +
		((base64)?"base64":"raw")+
		"\"><input type=\"hidden\" name=\"name\" value=\"" +
        ((name)?name:Ax.animation.name) +
        "\" /><input type=\"hidden\" name=\"action\" value=\"work\" /></form>");
        var new_input = document.createElement("input")
        new_input.type = "hidden";
        new_input.name = "data";
        new_input.value = (data)?data:Ax.export_animation(Ax.animation.markup, "json");
        Ext.get("save_form").dom.appendChild(new_input); //waste of Ext, I know
        Ext.get("save_form").dom.submit();
    }
}