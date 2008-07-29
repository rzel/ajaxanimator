/**
 * I sorta wish I knew scriptdoc...
 * but anywho, this (for now) checks wheter the server works
 * @author Kevin
 */

Ax.serverinfo = function(){
    if (!Ax.server_working) {
        Ext.Ajax.request({
            url: Ax.files.test,
            params: {
                "message": "working"
            },
            success: function(e){
                if (e.responseText.indexOf("working") != -1) {
                    Ax.server_working = true;
                }
                else {
                    Ax.server_working = false;
                }
            },
            failure: function(){
                Ax.server_working = false;
            }
        })
    }
    return Ax.server_working;
}