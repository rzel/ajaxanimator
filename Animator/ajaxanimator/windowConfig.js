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
	