//Donno how this works, but got it off the intranet
Array.prototype.unique = function( b ) {
var a = [], i, l = this.length;
for( i=0; i<l; i++ ) {
if( a.indexOf( this[i], 0, b ) < 0 ) { a.push( this[i] ); }
}
return a;
};

//Those Awesome Little grey boxes that fall from the sky and with (bad) news and elegantly fly away before your too pissed
//...also used for tutorials
 var msgCt;
 function msg(title, data){
    if(!msgCt){
        msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
    }
    msgCt.alignTo(document, 't-t');
    Ext.DomHelper.append(msgCt, {html:makeBox(title,data)
	}, true).slideIn('t').pause(2).ghost("t", {remove:true});
}

function makeBox(title,data){
	return (['<div class="msg">',
    '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
    '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', title, '</h3>', data, '</div></div></div>',
    '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
    '</div>'].join(''))
}

//fixSpeed() is no longer needed, the stuff has been fixed
function fixSpeed(){
//Some Timeline Speed Fixes
//This is not really needed unless something screws up. It should have code that prevents the need for this
//but before it didn't and this would be a major problem for speed
//an array that should have a length of 40, would expand to 800 in seconds
keyframeArray=keyframeArray.unique();
tweenArray=tweenArray.unique();
}


//This function is just some random code that should never be used
function clearPreviews(){Ext.Ajax.request({url:"../freemovie/clearPreviews.php",
success:function(e){Ext.MessageBox.alert("Emptying Previews",x.responseText)}})}



function failCon(){
Ext.MessageBox.alert("Error:","Connection to server failed. Try Again Later. This might because of server misconfiguration, faulty connection, browser misconfiguration, or server traffic")
}




//MICROSOFT IS EVIL! RlVDSyBZT1UgTUlDUk9TT0ZUIQ==

function dataUrl(data, mimeType){ // turns a string into a url that appears as a file. (to ff/op/saf)
	 encType= (!!btoa) ? ";base64" : "";
	 var esc = (!!encType) ? function(d){return btoa(d);} : function(d){return escape(d);};
	 if(!mimeType){mimeType= (data.nodeName) ? "text\/html" :"text\/plain";};	
	 b="data:"+mimeType+";charset="+document.characterSet+encType+",";
	 
		if ("string number date boolean function".indexOf(typeof data) > -1){
		b+=esc(data.toString()); return b; };	
		if ( data.constructor==Array){b+= esc( data.join("") );	return b;	};
	if(typeof data=="xml"){b+=esc(data.toSource()); return b;} //FF2 xml frag/doc
		//for more complicated data, attempt to determine the format.
	if(typeof data=="object"){ 
			if(!!data.value && !!data.value.length){b+=esc(data.value); return b;}; //input tags w/content
			if(!!data.innerHTML){b+=esc(data.innerHTML); return b;} //HTML tag
			if(!!data.length){ 		//weird stuff like nodelists
			var G=function(ob){r=[]; i=0; 
				for(i;i<ob.length;i++){
				if(dataUrl(ob[i])) r[i]=dataUrl(ob[i]);} return r.join("\n");};//end g
				return	(b+G(data));}//end if object w/length	
			if(!! eval(data.toSource()) ){b+=esc(data.toSource()); return b;}; //JSON
		}//end if object 
 return;
}	//end function dataUrl



///Ccccccccccccccccoooooooookkkkkkkkkkkkkkiiiiiiiiiiiiiiieeeeeeeeeeeeeeee manager

function createCookie(name,value,days) {
if (days) {
var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}
else var expires = "";
document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}

function eraseCookie(name) {
createCookie(name,"",-1);
}


