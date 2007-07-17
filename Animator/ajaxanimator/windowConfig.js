    function showWin(Winid){ //function called to open and configure windows
	try{
    HelpWin.show();
    }catch(err){}	
	try{
	HelpWin.activateTab(Winid);
	    }catch(err){}	
		try{
    HelpWin.minimizeWindow();
	    }catch(err){}	
		try{
    HelpWin.slideWindowToXAndY(1,1) 
	    }catch(err){}	
		try{
    HelpWin.close();
	    }catch(err){}
    setTimeout("zSW()",1000)
    }
    
    function zSW(){
		try{
    HelpWin.show();
		    }catch(err){}	
		try{
    HelpWin.maximizeWindow();
		    }catch(err){}	
		try{
    HelpWin.slideWindowToXAndY(100,100) 
		    }catch(err){}	
    }
    
	function showSeizure(){
	if (confirm("Warning: This might cause injury \n I, am not responsible for any damage caused/used by the application")) { 
	showWin('SeizureMain');
	}
	}
	
	function saveDialog(){
	SaveOpenWin.show();
		SaveOpenWin.activateTab("Save");
		    SaveOpenWin.minimizeWindow();
		   		   setTimeout("SaveOpenWin.maximizeWindow();",10)
	}
	function openDialog(){
	SaveOpenWin.show();
		SaveOpenWin.activateTab("Open");
		   SaveOpenWin.minimizeWindow();
		   		   setTimeout("SaveOpenWin.maximizeWindow();",10)
	}

    var HelpModel = new DHTMLSuite.windowModel();
    HelpModel.createWindowModelFromMarkUp('HELP');
    var HelpWin = new DHTMLSuite.windowWidget();
    HelpWin.addWindowModel(HelpModel);
    HelpWin.init();
    HelpWin.setStatusBarText('Help');
    HelpWin.close();

    var ColorModel = new DHTMLSuite.windowModel();
    ColorModel.createWindowModelFromMarkUp('ColorWindow');
    var ColorWin = new DHTMLSuite.windowWidget();
    ColorWin.addWindowModel(ColorModel);
    ColorWin.init();
    ColorWin.setStatusBarText('Color');
    ColorWin.close();
	
	var SaveOpenModel = new DHTMLSuite.windowModel();
    SaveOpenModel.createWindowModelFromMarkUp('SaveOpen');
    var SaveOpenWin = new DHTMLSuite.windowWidget();
    SaveOpenWin.addWindowModel(SaveOpenModel);
    SaveOpenWin.init();
    SaveOpenWin.setStatusBarText('Save/Open');
    SaveOpenWin.close();