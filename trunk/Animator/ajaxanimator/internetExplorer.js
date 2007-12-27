function IEMessage(){ //IE Error Message... 2.1 !!! YAY!!!

//I just want to say that everyone who uses internet explorer sucks

var IError = "Sorry, your browser is unsupported by the Ajax Animator."
+" This is due to your browser's complete lack of standards compliance."
+" More Technically speaking, your browser is incapable of several"
+" DOM Function such as createElementNS and has total lack of support for the SVG format"
+", the vector graphics display for all the editing/playback in this application."
+" The application will go to a reduced functionality mode "
+"that will give you a partial demonstration of the user interface organization, with little"
+" to no productive functionality, if you would like to be able to use the "
+"application, please download and install a standards compliant and somewhat"
+" decent browser, such as Mozilla Firefox, Safari 3 Beta+, or Opera."

Ext.MessageBox.alert("Sorry, Your Browser Is Not Supported",IError)
var cS='<center>Sorry! Interent Explorer Is Not Supported! Your browser does not support SVG Graphics</center>';
$("CanvasContainer").innerHTML+=cS;
}