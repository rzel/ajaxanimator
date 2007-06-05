  //Includes
    DHTML_SUITE_THEME='light-cyan';
    DHTML_SUITE_THEME_FOLDER='themes/';
    DHTML_SUITE_JS_FOLDER='dhtmlsuite/';

	//source: http://javascript.about.com/library/blqs1.htm
	var qsParm = new Array();
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
	var pos = parms[i].indexOf('=');
	if (pos > 0) {
	var key = parms[i].substring(0,pos);
	var val = parms[i].substring(pos+1);
	qsParm[key] = val;
	}
	}
	if(qsParm['theme'] != null){
	DHTML_SUITE_THEME=qsParm['theme'];
	}
	
    DHTMLSuite.include("contextMenu");
    DHTMLSuite.include("paneSplitter");
    DHTMLSuite.include("menuBar");
    DHTMLSuite.include("windowWidget");
    DHTMLSuite.include("infoPanel");
    DHTMLSuite.include("modalMessage");
    DHTMLSuite.include("colorWidget");
    DHTMLSuite.include("colorSlider");
    DHTMLSuite.include("slider");
    DHTMLSuite.include("colorPalette");
    DHTMLSuite.include("resize");
    DHTMLSuite.include("dragDropSimple");
    DHTMLSuite.include("dynamicContent");
    //End Includes
