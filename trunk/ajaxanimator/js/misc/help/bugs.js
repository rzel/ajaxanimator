Ax.BugReport = function(){
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


