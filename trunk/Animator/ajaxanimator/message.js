  //Generate Error Handler
	
	var handleErrors = new Boolean();
	
	handleErrors = false; //true to handle errors, and false to ignore them
  
    if(handleErrors==true){
    onerror=handleErr
	}
	
    
    var ztxt=""
    
    function progress(){ //function to show that the thing is in PRE ALPHA!
    displayMessage("The functionality you were attempting to access is not yet implemented<br> into the application, but is planned for future development.");
    }
    
    function showAbout(){ //function to show about message
    var zAboutText;
    zAboutText = "<img src='images/logo.png' alt=''><\/img><br \/>This application is made mainly by Antimatter15<br /"+"> Manual, FAQ, and some feature suggestions belong to Brwainer";
    displayMessage(zAboutText);
    }

    function dMsgObj(){
    //Declare Message object
    messageObj = new DHTMLSuite.modalMessage(); // We only create one object of this class
    messageObj.setWaitMessage('Loading message - please wait....');
    }
    
    //Error Handler Function
    function handleErr(msg,url,l)
    {
    ztxt="There was an error on this page.<br /><br />"
    ztxt+="<b"+">URL:</" + "b> " + url + "<br />"
    ztxt+="<b"+">Error:</" + "b> " + msg + "<br />"
    ztxt+="<b"+">Line: </" + "b>" + l + "<br /><br />"
    displayMessage(ztxt)
    return true
    }
    //End Error handling
    
    //Starting message functions
    
    function closeMessage()
    {
    messageObj.close();
    }

    function displayMessage(text)
    {
    var zxText = text + "<center><br /><a href=\'#\' onclick=\'closeMessage();return false\'>Close</"+"a><"+"/center>";
    try{
    messageObj.width = '300px'
    messageObj.setHtmlContent(zxText);
    messageObj.display();
    }catch(err){
    dMsgObj();
    }
    }
