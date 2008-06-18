/**
 * Ajax Animator
 *
 * @author    Antimatter15
 * @copyright (c) 2007-2008, by Antimatter15
 * @date      14. April 2008
 * @version   0.20+ Testing
 *
 * @license application.js is licensed under the terms of the Open Source GPL 2.0 license. 
 * 
 * License details: http://www.gnu.org/licenses/gpl.html
 */
 
/*global Ext, Application */
 
Ext.BLANK_IMAGE_URL = '../theme/images/default/s.gif';
Ext.ns('Ax'); //i got tired of typing ajaxanimator.xxx so i shortened it
 
// application main entry point
Ext.onReady(function() {
  
  Ext.get("loading-msg").update("Initializing...")
   
  Ext.QuickTips.init();

 
    // code here
 
}); // eo function onReady
 
 
Ax.set_version = function(version_object){
  //Sets the current version of the applicaiton and does some operations with it
  
  Ax.v = version_object;
  
  if(window.developer==true){
    Ax.title = [Ax.v.app,Ax.v.release,Ax.v.stability,"Development"].join(" ");
  }else if(Ax.v.dev == true){
    Ax.title = [Ax.v.app,Ax.v.release,Ax.v.stability,"Testing build",Ax.v.build].join(" ");
  }else{
    Ax.title = [Ax.v.app,Ax.v.release].join(" ");
  }
  
  document.title = Ax.title;

} 
 
// eof