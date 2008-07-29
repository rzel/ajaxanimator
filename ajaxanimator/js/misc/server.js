/**
 * I sorta wish I knew scriptdoc...
 * but anywho, this (for now) checks wheter the server works
 * @author Kevin
 */

Ax.testserver = function(reset){
	if(reset){
		Ax.server_working = null;
	}
    if (!Ax.server_working) {
        Ext.Ajax.request({
            url: Ax.files.test+"?m=working",
			method: "get",
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