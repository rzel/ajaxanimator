developer = true; //YOU ARE A DEVELOPER!!!!!!!!
//*
Ext.onReady(function(){//ext is awesome
Ax.viewport.findById("canvas").getTopToolbar().addButton({
text: "<span class='dev_toolbar'>Dev<span>",
menu: {items:[
{text: "Compile", iconCls: "dev_compile", handler: function(){
Ext.Ajax.request({
url: "../server/dev/compile/compile.php",
failure: dev_fail,
success: function(e){
Ax.toastMsg('Compilier Status',e.responseText);
}
})
}},
{text: "Auto Deploy", iconCls: "dev_deploy",handler: autoDeploy},
"-",
{text: "Push Updates", iconCls: "dev_push", menu: [
{text: "1. Show Update Mask", iconCls: "dev_step", handler: function(){sendUpdate("b")}},
{text: "2. Update Javascript", iconCls: "dev_step",  handler: function(){sendUpdate("j")}},
{text: "3. Update HTML", iconCls: "dev_step", handler: function(){sendUpdate("h")}}
]}
]}
})
})

function dev_fail(){
Ext.Msg.show({
   title:'Developer Action Status',
   msg: 'Connection to server script failed. Function may be disabled',
   buttons: Ext.Msg.OK,
   icon: Ext.MessageBox.ERROR
});
}

function sendUpdate(mode,success){
Ext.Ajax.request({
url: "../server/dev/update/push.php?action="+mode,
failure: dev_fail,
success: (success)?success:updateMsg
})
}

function updateMsg(e){
Ext.Msg.show({
   title:'Update Push Status',
   msg: 'Application has been pushed sucessfully.<br /><br /><br />'+e.responseText,
   buttons: Ext.Msg.OK,
   icon: Ext.MessageBox.INFO
});
}

function autoDeployPartial(mode){
var step = ({b: 1, j: 2, c: 3, h: 4})[mode];
var NeXTSTEP = [0,"b","j","c","h",0][step+1]; //never had one of them, but they they were made by steve jobs so they can't be bad.
Ax.showBusy();
Ax.setStatus({text:"Sending Update "+step+" (mode: "+mode+")"});
sendUpdate(mode,function(e){
		setTimeout(function(){
		if(NeXTSTEP != 0){
	autoDeployPartial(NeXTSTEP)
	}else{
	Ax.setStatus({text:"Application Sucessfully Deployed", clear: true});
	
	new Ext.ux.ToastWindow({
    title: 'Auto Deploy',
    html: 'Auto Deploy Completed Sucessfully'
	}).show(document);
	

	}
	},500);
})
	
}

function autoDeploy(){
autoDeployPartial("b");
}
//* */
