var paneModel = new DHTMLSuite.paneSplitterModel();
    // Creating west pane
    var paneWest = new DHTMLSuite.paneSplitterPaneModel( { position : "west", id:"westPane",size:80,minSize:10,maxSize:300,scrollbars:false ,scrollbars:false} );
    paneWest.addContent( new DHTMLSuite.paneSplitterContentModel( { closable: false, id:"westContent",htmlElementId:'westContent',title:'Tools',tabTitle:'Tools' } ) );
    paneModel.addPane(paneWest);

    // Creating east pane
    var paneEast = new DHTMLSuite.paneSplitterPaneModel( { position : "east", id:"eastPane",size:160,minSize:10,maxSize:500 ,closable: false,scrollbars:false} );
    paneEast.addContent( new DHTMLSuite.paneSplitterContentModel( { closable: false, id:"eastContent",htmlElementId:'eastContent',title:'Ads', tabTitle: 'Ads'} ) );
      paneModel.addPane(paneEast);

    // Creating south pane
    var paneSouth = new DHTMLSuite.paneSplitterPaneModel( { position : "south", id:"southPane",size:160,minSize:10,maxSize:500,resizable:true,scrollbars:false} );
    paneSouth.addContent( new DHTMLSuite.paneSplitterContentModel( {closable: false, id:"southContent",htmlElementId:'southContent',title:'Properties' ,tabTitle: 'Properties' } ) );
    paneSouth.addContent( new DHTMLSuite.paneSplitterContentModel( {closable: false, id:"advancedContent",htmlElementId:'advancedContent',title:'Advanced',tabTitle: 'Advanced'  } ) );
    paneModel.addPane(paneSouth);


    // Creating north pane
    var paneNorth = new DHTMLSuite.paneSplitterPaneModel( { position : "north", id:"northPane",size:150,scrollbars:true,resizable:true } );
    paneNorth.addContent( new DHTMLSuite.paneSplitterContentModel( {closable: false, id:"northContent",htmlElementId:'northContent',title:' ', collapseable: false } ) );
    paneModel.addPane(paneNorth);

    // Creating center pane
    var paneCenter = new DHTMLSuite.paneSplitterPaneModel( { position : "center", id:"centerPane",callbackOnTabSwitch:'CenterCallback' } );
    paneCenter.addContent( new DHTMLSuite.paneSplitterContentModel( {closable: false, id: 'center',htmlElementId:'centerContent',title:'',tabTitle: 'Canvas' } ) );
    paneCenter.addContent( new DHTMLSuite.paneSplitterContentModel( {closable: false, id: 'swfpreview',htmlElementId:'FlashPreview',title:'',tabTitle: 'Preview/Export'} ) );
     
    paneModel.addPane(paneCenter);

    var paneSplitter = new DHTMLSuite.paneSplitter();
    paneSplitter.addModel(paneModel); // Add the data model to the pane splitter
    paneSplitter.init(); // Add the data model to the pane splitter
	
	function CenterCallback(modelObj,action,contentObj)
	{
	if(contentObj.id == 'swfpreview'){
	preFlash();
	}
	}