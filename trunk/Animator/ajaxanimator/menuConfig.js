    var menuModel = new DHTMLSuite.menuModel();
    menuModel.addItem(1 , 'File' ,'../images/disk.gif' ,'',0,'',''  ,'',100);
    menuModel.addItem(2 , 'Edit' ,'' ,'',0,'',''  ,'',150);
    menuModel.addItem(3 , 'View' ,'' ,'',0,'',''  ,'',150);
    menuModel.addItem(4 , 'Tools','' ,'',0,'',''  ,'',150);
    menuModel.addItem(5 , 'Timeline' ,'' ,'',0,'',''  ,'',160);
	menuModel.addItem(6, 'Animation' ,'' ,'',0,'',''  ,'',160);
    menuModel.addItem(7, 'User' ,'' ,'',0,'',''  ,'',200);
	menuModel.addItem(8 , 'Help' ,'' ,'',0,'',''  ,'',100);

    menuModel.addItem(10 , 'New' ,'../images/new.png' ,'',1,'','confirmNewCanvas()');
    menuModel.addItem(11 , 'Save' ,'../images/disk.gif' ,'',1,'','saveDialog()');
    menuModel.addItem(12 , 'Open' ,'../images/open.gif' ,'',1,'','openDialog()');
    menuModel.addItem(13, 'Export' ,'../images/flash.gif' ,'',1,'','genFlash()');

    menuModel.addItem(20, 'Undo' ,'../images/arrow_undo.png' ,'',2,'','undo()');
    menuModel.addItem(21, 'Copy' ,'../images/page_copy.png' ,'',2,'','copyObj()');
	menuModel.addItem(22, 'Paste' ,'../images/page_paste.png' ,'',2,'','pasteObj()');
		
    menuModel.addItem(30 , 'Animation' ,'../images/flash.gif' ,'',3,'','playAnimation()');

    menuModel.addItem(40 , 'Clear Timeline' ,'../images/cancel.png' ,'',4,'','ClearAllKeyframes()');
	menuModel.addItem(41 , 'Color Picker' ,'../images/color_wheel.png' ,'',4,'','FillColorChange()');
    menuModel.addItem(42 , 'Shell Interface','../images/application_xp_terminal.png' ,'' ,4,'','paneSplitter.showContent("advancedContent")');

    menuModel.addItem(50 , 'To Keyframe','../images/add.png' ,'',5,'','toKeyframe()');
    menuModel.addItem(51 , 'Clear Frame','../images/delete.png' ,'',5,'','removeKeyframe()');
    menuModel.addItem(52 , 'Refresh Data' ,'../images/action_refresh.gif' ,'',5,'','fullgotoframe()');
    menuModel.addItem(53,  'New Layer','../images/add.png' ,'',5,'','addLayer()');
	
    menuModel.addItem(60, 'Play','../images/control_play_blue.png' ,'',6,'','playAnimation()');
    menuModel.addItem(61, 'Stop' ,'../images/control_stop_blue.png' ,'',6,'','stopAnimation()');
    menuModel.addItem(62, 'Next Frame','../images/control_fastforward_blue.png' ,'',6,'','gotoframe(currentFrameSelection+1,1)');
    menuModel.addItem(63, 'Previous Frame','../images/control_rewind_blue.png' ,'',6,'','gotoframe(currentFrameSelection-1,1)');
    menuModel.addItem(64, 'Last Frame','../images/control_end_blue.png' ,'',6,'','gotoframe(totalFrames,1)');
    menuModel.addItem(65, 'First Frame','../images/control_start_blue.png' ,'',6,'','gotoframe(1,1)');
    menuModel.addItem(66, 'Set Last Frame','' ,'',6,'','changeTotalFrameValue(currentFrameSelection)');
	
	menuModel.addItem(70, 'Logout','../images/logout.png' ,'',7,'','logout()');
	menuModel.addItem(71, 'Refresh Animation List','../images/action_refresh.gif' ,'',7,'','animationList()');
	menuModel.addItem(72, 'Browse Animations','../images/user_go.png' ,'',7,'','UserWin.show();UserWin.maximizeWindow();');
	
    menuModel.addItem(80 , 'About','' ,'',8,'','showWin("AboutMain")');
    menuModel.addItem(81 , 'Manual' ,'../images/help.png' ,'',8,'','showWin("ManualMain")');
    menuModel.addItem(82 , 'FAQ','../images/help.png' ,'',8,'','showWin("FAQMain")');
    menuModel.addItem(83, 'Seizure','' ,'',8,'','showSeizure()');
    menuModel.addItem(84 , 'Support','../images/money.png','',8,'','showWin("SupportMain")');
    menuModel.init();

    var menuBar = new DHTMLSuite.menuBar();
    menuBar.addMenuItems(menuModel);
    menuBar.setTarget('menuDiv');
    menuBar.init();
    
    // Context Menu Configuration 
    
    var timelineContextMenuModel = new DHTMLSuite.menuModel();
    timelineContextMenuModel.addItem(1,'To Keyframe','../images/add.png','','',false,'toKeyframe()');
    timelineContextMenuModel.addItem(2,'Add Layer','../images/add.png','','',false,'addLayer()');
    timelineContextMenuModel.addItem(3,'Clear Frame','../images/cancel.png','','',false,'removeKeyframe()');

    timelineContextMenuModel.init();

	var canvasContextMenuModel = new DHTMLSuite.menuModel();
    canvasContextMenuModel.addItem(1,'Next Frame','../images/control_fastforward_blue.png','','',false,'gotoframe(currentFrameSelection+1,1)');
    canvasContextMenuModel.addItem(2,'Previous Frame','../images/control_rewind_blue.png','','',false,'gotoframe(currentFrameSelection-1,1)');
    canvasContextMenuModel.addItem(3,'Play','../images/control_play_blue.png','','',false,'playAnimation()');
	canvasContextMenuModel.addItem(4,'Delete Shape','../images/delete.png','','',false,'deleteShape()');
	canvasContextMenuModel.addItem(5,'Clear Frame','../images/cancel.png','','',false,'removeKeyframe()');
	canvasContextMenuModel.addItem(6,'Undo','../images/arrow_undo.png','','',false,'undo()');
	canvasContextMenuModel.addItem(7,'Drawing Tool','../images/paintbrush.png','','',false,'');
	
	canvasContextMenuModel.addItem(50,'Select','../images/select.gif','',7,false,'setMode("select", "Selection")');
	canvasContextMenuModel.addItem(51,'Rectangle','../images/rectangle.gif','',7,false,'setMode("rect", "Rectangle")');
	canvasContextMenuModel.addItem(52,'Round Rectangle','../images/roundrect.gif','',7,false,'setMode("roundrect", "Rounded Rectangle")');
	canvasContextMenuModel.addItem(53,'Ellipse/Circle','../images/circle.gif','',7,false,'setMode("ellipse", "Ellipse/Circle")');
	canvasContextMenuModel.addItem(54,'Line','../images/line.gif','',7,false,'setMode("line", "Line")');


    canvasContextMenuModel.init();
	
    /* Only one contextMenu object per page */
    var contextMenu = new DHTMLSuite.contextMenu();
    DHTMLSuite.commonObj.setCssCacheStatus(false);
    contextMenu.setWidth(160);
	contextMenu.attachTo('centerContent',canvasContextMenuModel);
    contextMenu.attachTo('northContent',timelineContextMenuModel);
    contextMenu.attachTo('frameContainer',timelineContextMenuModel);
    contextMenu.attachTo('DHTMLSuite_paneContentnorth',timelineContextMenuModel);

