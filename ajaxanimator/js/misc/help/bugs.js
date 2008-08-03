Ax.BugReport = function(){
	return Ax.msg("Not Available","This feature is not available");
	
//Ax.gs(4);
var ErrorWindow = new Ext.Window({
    closable: true,
    width: 410,
    height: 300,
    minimizable: true,
	  title: "Report Bug",
    border: false,
    plain: true,
    layout: 'border',
    buttons: [
	
	{
        text: 'Cancel',
        handler: function(){
            ErrorWindow.close();
        }
    },{
		text: 'Send (recomended)',
		handler: function(){
			Ax.msg("Sending Bug Report","We are sending your bug report... Or at least we'll make you think we are.");
			ErrorWindow.close();
		}
	}
	
	],
    items: [{
	split: true,
	height: 80,
	region: "north",
	html: "Hai"
	},{
	region: "center",
	html: "scarey"
}]
});
 
ErrorWindow.on('minimize', function(){
    ErrorWindow.toggleCollapse();
});

ErrorWindow.show();
}


//onerror = Ax.Error

Ax.comment = function(){
Ax.msg("Not Available","This feature is not available");
}

Ax.donate = function(){
Ext.MessageBox.alert("Helping the Ajax Animator","If you enjoy using the Ajax Animator and would like to help assist the project, please use the ad-supported version, report bugs, comment on desired features and spread the word.");
}
