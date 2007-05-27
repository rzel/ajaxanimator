    var menuModel = new DHTMLSuite.menuModel();
    menuModel.addItem(1 , 'File' ,'images/disk.gif' ,'',0,'',''  ,'',100);
    menuModel.addItem(2 , 'Edit' ,'' ,'',0,'',''  ,'',150);
    menuModel.addItem(3 , 'View' ,'' ,'',0,'',''  ,'',150);
    menuModel.addItem(4 , 'Tools','' ,'',0,'',''  ,'',150);
    menuModel.addItem(5 , 'Timeline' ,'' ,'',0,'',''  ,'',160);
	menuModel.addItem(40, 'Animation' ,'' ,'',0,'',''  ,'',160);
    menuModel.addItem(6 , 'Help' ,'' ,'',0,'',''  ,'',100);

    menuModel.addItem(7 , 'Save' ,'images/disk.gif' ,'',1,'','progress()');
    menuModel.addItem(8 , 'Save as','images/disk.gif' ,'',1,'','progress()');
    menuModel.addItem(9 , 'Open' ,'images/open.gif' ,'',1,'','progress()');
    menuModel.addItem(10, 'Export' ,'images/flash.gif' ,'',1,'','genFlash()');

    menuModel.addItem(24, 'Undo' ,'images/arrow_undo.png' ,'',2,'','progress()');

    menuModel.addItem(12 , 'Animation' ,'images/flash.gif' ,'',3,'','playAnimation()');

    menuModel.addItem(13 , 'Clear Timeline' ,'images/cancel.png' ,'',4,'','ClearAllKeyframes()');
	menuModel.addItem(53 , 'Color Picker' ,'images/color_wheel.png' ,'',4,'','FillColorChange()');
    menuModel.addItem(14 , 'Terminal Interface','images/application_xp_terminal.png' ,'' ,4,'','paneSplitter.showContent("southAdvanced")');

    menuModel.addItem(15 , 'To Keyframe','images/add.png' ,'',5,'','toKeyframe()');
    menuModel.addItem(16 , 'Delete Keyframe','images/cancel.png' ,'',5,'','removeKeyframe()');
    menuModel.addItem(17 , 'Refresh Data' ,'images/action_refresh.gif' ,'',5,'','fullgotoframe()');
    menuModel.addItem(18, 'New Layer','images/add.png' ,'',5,'','addLayer()');
	
    menuModel.addItem(19 , 'Play','images/control_play_blue.png' ,'',40,'','playAnimation()');
    menuModel.addItem(20 , 'Stop' ,'images/control_stop_blue.png' ,'',40,'','stopAnimation()');
    menuModel.addItem(21, 'Next Frame','images/control_fastforward_blue.png' ,'',40,'','gotoframe(currentFrameSelection+1,1)');
    menuModel.addItem(22, 'Previous Frame','images/control_rewind_blue.png' ,'',40,'','gotoframe(currentFrameSelection-1,1)');
	
    menuModel.addItem(30 , 'About','' ,'',6,'','showWin("AboutMain")');
    menuModel.addItem(31 , 'Manual' ,'images/help.png' ,'',6,'','showWin("ManualMain")');
    menuModel.addItem(32 , 'FAQ','images/help.png' ,'',6,'','showWin("FAQMain")');
    menuModel.addItem(33, 'Seizure','' ,'',6,'','showWin("SeizureMain")');
    menuModel.addItem(34 , 'Support','images/money.png','',6,'','showWin("SupportMain")');
    menuModel.init();

    var menuBar = new DHTMLSuite.menuBar();
    menuBar.addMenuItems(menuModel);
    menuBar.setTarget('menuDiv');
    menuBar.init();
    
    // Context Menu Configuration 
    
        var timelineContextMenuModel = new DHTMLSuite.menuModel();
    timelineContextMenuModel.addItem(1,'To Keyframe','','','',false,'toKeyframe()');
    timelineContextMenuModel.addItem(2,'Add Layer','','','',false,'addLayer()');
    timelineContextMenuModel.addItem(3,'Remove Keyframe','','','',false,'removeKeyframe()');

    timelineContextMenuModel.init();

    /* Only one contextMenu object per page */
    var contextMenu = new DHTMLSuite.contextMenu();
    DHTMLSuite.commonObj.setCssCacheStatus(false);
    contextMenu.setWidth(160);
    contextMenu.attachTo('northContent',timelineContextMenuModel);
    contextMenu.attachTo('frameContainer',timelineContextMenuModel);
    contextMenu.attachTo('DHTMLSuite_paneContentnorth',timelineContextMenuModel);

