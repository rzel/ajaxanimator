 
  
 /***********************************************
* Basic Ajax Routine- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/


//Basic Ajax Routine- Author: Dynamic Drive (http://www.dynamicdrive.com)
//Last updated: Jan 15th, 06'

function createAjaxObj(){
var httprequest=false
if (window.XMLHttpRequest){ // if Mozilla, Safari etc
httprequest=new XMLHttpRequest()
if (httprequest.overrideMimeType)
httprequest.overrideMimeType('text/xml')
}
else if (window.ActiveXObject){ // if IE
try {
httprequest=new ActiveXObject("Msxml2.XMLHTTP");
} 
catch (e){
try{
httprequest=new ActiveXObject("Microsoft.XMLHTTP");
}
catch (e){}
}
}
return httprequest
}

var ajaxpack=new Object()
ajaxpack.basedomain="http://"+window.location.hostname
ajaxpack.ajaxobj=createAjaxObj()
ajaxpack.filetype="txt"
ajaxpack.addrandomnumber=0 //Set to 1 or 0. See documentation.

ajaxpack.getAjaxRequest=function(url, parameters, callbackfunc, filetype){
ajaxpack.ajaxobj=createAjaxObj() //recreate ajax object to defeat cache problem in IE
if (ajaxpack.addrandomnumber==1) //Further defeat caching problem in IE?
var parameters=parameters+"&ajaxcachebust="+new Date().getTime()
if (this.ajaxobj){
this.filetype=filetype
this.ajaxobj.onreadystatechange=callbackfunc
this.ajaxobj.open('GET', url+"?"+parameters, true)
this.ajaxobj.send(null)
}
}

ajaxpack.postAjaxRequest=function(url, parameters, callbackfunc, filetype){
ajaxpack.ajaxobj=createAjaxObj() //recreate ajax object to defeat cache problem in IE
if (this.ajaxobj){
this.filetype=filetype
this.ajaxobj.onreadystatechange = callbackfunc;
this.ajaxobj.open('POST', url, true);
this.ajaxobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
this.ajaxobj.setRequestHeader("Content-length", parameters.length);
this.ajaxobj.setRequestHeader("Connection", "close");
this.ajaxobj.send(parameters);
}
}

//ACCESSIBLE VARIABLES (for use within your callback functions):
//1) ajaxpack.ajaxobj //points to the current ajax object
//2) ajaxpack.filetype //The expected file type of the external file ("txt" or "xml")
//3) ajaxpack.basedomain //The root domain executing this ajax script, taking into account the possible "www" prefix.
//4) ajaxpack.addrandomnumber //Set to 0 or 1. When set to 1, a random number will be added to the end of the query string of GET requests to bust file caching of the external file in IE. See docs for more info.

//ACCESSIBLE FUNCTIONS:
//1) ajaxpack.getAjaxRequest(url, parameters, callbackfunc, filetype)
//2) ajaxpack.postAjaxRequest(url, parameters, callbackfunc, filetype)

///////////END OF ROUTINE HERE////////////////////////


//////EXAMPLE USAGE ////////////////////////////////////////////
/* Comment begins here

//Define call back function to process returned data
function processGetPost(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ if request was successful or running script locally
if (myfiletype=="txt")
alert(myajax.responseText)
else
alert(myajax.responseXML)
}
}
}

/////1) GET Example- alert contents of any file (regular text or xml file):

ajaxpack.getAjaxRequest("example.php", "", processGetPost, "txt")
ajaxpack.getAjaxRequest("example.php", "name=George&age=27", processGetPost, "txt")
ajaxpack.getAjaxRequest("examplexml.php", "name=George&age=27", processGetPost, "xml")
ajaxpack.getAjaxRequest(ajaxpack.basedomain+"/mydir/mylist.txt", "", processGetPost, "txt")

/////2) Post Example- Post some data to a PHP script for processing, then alert posted data:

//Define function to construct the desired parameters and their values to post via Ajax
function getPostParameters(){
var namevalue=document.getElementById("namediv").innerHTML //get name value from a DIV
var agevalue=document.getElementById("myform").agefield.value //get age value from a form field
var poststr = "name=" + encodeURI(namevalue) + "&age=" + encodeURI(agevalue)
return poststr
}

var poststr=getPostParameters()

ajaxpack.postAjaxRequest("example.php", poststr, processGetPost, "txt")
ajaxpack.postAjaxRequest("examplexml.php", poststr, processGetPost, "xml")

Comment Ends here */ 
 /*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
 
 /*  Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/


//Notice: This is a highly compressed version of prototype, to support the richdraw editor: part of the ajax animator source

function $A (iterable) {
	var nArray = [];
	for (var i = 0; i < iterable.length; i++) nArray.push(iterable[i]);
	return nArray;
};

function $() {
	if (arguments.length == 1) return get$(arguments[0]);
	var elements = [];
	$c(arguments).each(function(el){
		elements.push(get$(el));
	});
	return elements;

	function get$(el){
		if (typeof el == 'string') el = document.getElementById(el);
		return el;
	}
};

Object.e = function(destination, source) {
	for (var property in source) destination[property] = source[property];
	return destination;
};


if (!window.Event) {
  var Event = new Object();
}

Object.e(Event, {

  element: function(event) {
    return $(event.target || event.srcElement);
  },

  pointerX: function(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  },

  pointerY: function(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  },
  observers: false,
  
  _observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) this.observers = [];
    if (element.addEventListener) {
      this.observers.push([element, name, observer, useCapture]);
      element.addEventListener(name, observer, useCapture);
    } else if (element.attachEvent) {
      this.observers.push([element, name, observer, useCapture]);
      element.attachEvent('on' + name, observer);
    }
  },


  observe: function(element, name, observer, useCapture) {
    element = $(element);
    if (name == 'keypress' &&
      (Prototype.Browser.WebKit || element.attachEvent))
      name = 'keydown';

    Event._observeAndCache(element, name, observer, false);
  },

  stopObserving: function(element, name, observer, useCapture) {
    element = $(element);
    if (name == 'keypress' &&
        (Prototype.Browser.WebKit || element.attachEvent))
      name = 'keydown';

    if (element.removeEventListener) {
      element.removeEventListener(name, observer, false);
    } else if (element.detachEvent) {
      try {
        element.detachEvent('on' + name, observer);
      } catch (e) {}
    }
  }
});

Function.prototype.bindAsEventListener = function(object) {
  var __method = this, args = $A(arguments), object = args.shift();
  return function(event) {
    return __method.apply(object, [event || window.event].concat(args));
  }
}

var Position = {

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  }
}

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (navigator.userAgent.indexOf('AppleWebKit/') > -1) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return [valueL, valueT];
  }
} 
 if(typeof YAHOO=="undefined"){var YAHOO={}}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]]}}return E};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C)}else{return false}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]}}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B)}if(E){E.VERSION=H;E.BUILD=G}else{YAHOO.log("mainClass is undefined for module "+A,"warn")}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1])}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1])}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1])}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1])}}}}}return C}();(function(){YAHOO.namespace("util","widget","example");if(typeof YAHOO_config!="undefined"){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break}}if(D){A.push(B)}}}})();YAHOO.lang={isArray:function(B){if(B){var A=YAHOO.lang;return A.isNumber(B.length)&&A.isFunction(B.splice)&&!A.hasOwnProperty(B.length)}return false},isBoolean:function(A){return typeof A==="boolean"},isFunction:function(A){return typeof A==="function"},isNull:function(A){return A===null},isNumber:function(A){return typeof A==="number"&&isFinite(A)},isObject:function(A){return(A&&(typeof A==="object"||YAHOO.lang.isFunction(A)))||false},isString:function(A){return typeof A==="string"},isUndefined:function(A){return typeof A==="undefined"},hasOwnProperty:function(A,B){if(Object.prototype.hasOwnProperty){return A.hasOwnProperty(B)}return !YAHOO.lang.isUndefined(A[B])&&A.constructor.prototype[B]!==A[B]},_IEEnumFix:function(B,A){if(YAHOO.env.ua.ie){var D=["toString","valueOf"];for(i=0;i<D.length;i=i+1){var E=D[i],C=A[E];if(YAHOO.lang.isFunction(C)&&C!=Object.prototype[E]){B[E]=C}}}},extend:function(D,E,C){if(!E||!D){throw new Error("YAHOO.lang.extend failed, please check that "+"all dependencies are included.")}var B=function(){};B.prototype=E.prototype;D.prototype=new B();D.prototype.constructor=D;D.superclass=E.prototype;if(E.prototype.constructor==Object.prototype.constructor){E.prototype.constructor=E}if(C){for(var A in C){D.prototype[A]=C[A]}YAHOO.lang._IEEnumFix(D.prototype,C)}},augmentObject:function(E,D){if(!D||!E){throw new Error("Absorb failed, verify dependencies.")}var A=arguments,C,F,B=A[2];if(B&&B!==true){for(C=2;C<A.length;C=C+1){E[A[C]]=D[A[C]]}}else{for(F in D){if(B||!E[F]){E[F]=D[F]}}YAHOO.lang._IEEnumFix(E,D)}},augmentProto:function(D,C){if(!C||!D){throw new Error("Augment failed, verify dependencies.")}var A=[D.prototype,C.prototype];for(var B=2;B<arguments.length;B=B+1){A.push(arguments[B])}YAHOO.lang.augmentObject.apply(this,A)},dump:function(A,G){var C=YAHOO.lang,D,F,I=[],J="{...}",B="f(){...}",H=", ",E=" => ";if(!C.isObject(A)||A instanceof Date||("nodeType" in A&&"tagName" in A)){return A}else{if(C.isFunction(A)){return B}}G=(C.isNumber(G))?G:3;if(C.isArray(A)){I.push("[");for(D=0,F=A.length;D<F;D=D+1){if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J)}else{I.push(A[D])}I.push(H)}if(I.length>1){I.pop()}I.push("]")}else{I.push("{");for(D in A){if(C.hasOwnProperty(A,D)){I.push(D+E);if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J)}else{I.push(A[D])}I.push(H)}}if(I.length>1){I.pop()}I.push("}")}return I.join("")},substitute:function(Q,B,J){var G,F,E,M,N,P,D=YAHOO.lang,L=[],C,H="dump",K=" ",A="{",O="}";for(;;){G=Q.lastIndexOf(A);if(G<0){break}F=Q.indexOf(O,G);if(G+1>=F){break}C=Q.substring(G+1,F);M=C;P=null;E=M.indexOf(K);if(E>-1){P=M.substring(E+1);M=M.substring(0,E)}N=B[M];if(J){N=J(M,N,P)}if(D.isObject(N)){if(D.isArray(N)){N=D.dump(N,parseInt(P,10))}else{P=P||"";var I=P.indexOf(H);if(I>-1){P=P.substring(4)}if(N.toString===Object.prototype.toString||I>-1){N=D.dump(N,parseInt(P,10))}else{N=N.toString()}}}else{if(!D.isString(N)&&!D.isNumber(N)){N="~-"+L.length+"-~";L[L.length]=C}}Q=Q.substring(0,G)+N+Q.substring(F+1)}for(G=L.length-1;G>=0;G=G-1){Q=Q.replace(new RegExp("~-"+G+"-~"),"{"+L[G]+"}","g")}return Q},trim:function(A){try{return A.replace(/^\s+|\s+$/g,"")}catch(B){return A}},merge:function(){var C={},A=arguments,B;for(B=0;B<A.length;B=B+1){YAHOO.lang.augmentObject(C,A[B],true)}return C},isValue:function(B){var A=YAHOO.lang;return(A.isObject(B)||A.isString(B)||A.isNumber(B)||A.isBoolean(B))}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.0",build:"442"});(function(){var B=YAHOO.util,K,I,H=0,J={},F={};var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var M=function(O){if(!E.HYPHEN.test(O)){return O}if(J[O]){return J[O]}var P=O;while(E.HYPHEN.exec(P)){P=P.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase())}J[O]=P;return P};var N=function(P){var O=F[P];if(!O){O=new RegExp("(?:^|\\s+)"+P+"(?:\\s+|$)");F[P]=O}return O};if(document.defaultView&&document.defaultView.getComputedStyle){K=function(O,R){var Q=null;if(R=="float"){R="cssFloat"}var P=document.defaultView.getComputedStyle(O,"");if(P){Q=P[M(R)]}return O.style[R]||Q}}else{if(document.documentElement.currentStyle&&G){K=function(O,Q){switch(M(Q)){case"opacity":var S=100;try{S=O.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(R){try{S=O.filters("alpha").opacity}catch(R){}}return S/100;case"float":Q="styleFloat";default:var P=O.currentStyle?O.currentStyle[Q]:null;return(O.style[Q]||P)}}}else{K=function(O,P){return O.style[P]}}}if(G){I=function(O,P,Q){switch(P){case"opacity":if(YAHOO.lang.isString(O.style.filter)){O.style.filter="alpha(opacity="+Q*100+")";if(!O.currentStyle||!O.currentStyle.hasLayout){O.style.zoom=1}}break;case"float":P="styleFloat";default:O.style[P]=Q}}}else{I=function(O,P,Q){if(P=="float"){P="cssFloat"}O.style[P]=Q}}var D=function(O,P){return O&&O.nodeType==1&&(!P||P(O))};YAHOO.util.Dom={get:function(Q){if(!Q||Q.tagName||Q.item){return Q}if(YAHOO.lang.isString(Q)){return document.getElementById(Q)}if(Q.splice){var R=[];for(var P=0,O=Q.length;P<O;++P){R[R.length]=B.Dom.get(Q[P])}return R}return Q},getStyle:function(O,Q){Q=M(Q);var P=function(R){return K(R,Q)};return B.Dom.batch(O,P,B.Dom,true)},setStyle:function(O,Q,R){Q=M(Q);var P=function(S){I(S,Q,R)};B.Dom.batch(O,P,B.Dom,true)},getXY:function(O){var P=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=document.body){return false}var Q=null;var V=[];var S;var T=R.ownerDocument;if(R.getBoundingClientRect){S=R.getBoundingClientRect();return[S.left+B.Dom.getDocumentScrollLeft(R.ownerDocument),S.top+B.Dom.getDocumentScrollTop(R.ownerDocument)]}else{V=[R.offsetLeft,R.offsetTop];Q=R.offsetParent;var U=this.getStyle(R,"position")=="absolute";if(Q!=R){while(Q){V[0]+=Q.offsetLeft;V[1]+=Q.offsetTop;if(L&&!U&&this.getStyle(Q,"position")=="absolute"){U=true}Q=Q.offsetParent}}if(L&&U){V[0]-=R.ownerDocument.body.offsetLeft;V[1]-=R.ownerDocument.body.offsetTop}}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(B.Dom.getStyle(Q,"display").search(/^inline|table-row.*$/i)){V[0]-=Q.scrollLeft;V[1]-=Q.scrollTop}Q=Q.parentNode}return V};return B.Dom.batch(O,P,B.Dom,true)},getX:function(O){var P=function(Q){return B.Dom.getXY(Q)[0]};return B.Dom.batch(O,P,B.Dom,true)},getY:function(O){var P=function(Q){return B.Dom.getXY(Q)[1]};return B.Dom.batch(O,P,B.Dom,true)},setXY:function(O,R,Q){var P=function(U){var T=this.getStyle(U,"position");if(T=="static"){this.setStyle(U,"position","relative");T="relative"}var W=this.getXY(U);if(W===false){return false}var V=[parseInt(this.getStyle(U,"left"),10),parseInt(this.getStyle(U,"top"),10)];if(isNaN(V[0])){V[0]=(T=="relative")?0:U.offsetLeft}if(isNaN(V[1])){V[1]=(T=="relative")?0:U.offsetTop}if(R[0]!==null){U.style.left=R[0]-W[0]+V[0]+"px"}if(R[1]!==null){U.style.top=R[1]-W[1]+V[1]+"px"}if(!Q){var S=this.getXY(U);if((R[0]!==null&&S[0]!=R[0])||(R[1]!==null&&S[1]!=R[1])){this.setXY(U,R,true)}}};B.Dom.batch(O,P,B.Dom,true)},setX:function(P,O){B.Dom.setXY(P,[O,null])},setY:function(O,P){B.Dom.setXY(O,[null,P])},getRegion:function(O){var P=function(Q){if((Q.parentNode===null||Q.offsetParent===null||this.getStyle(Q,"display")=="none")&&Q!=document.body){return false}var R=B.Region.getRegion(Q);return R};return B.Dom.batch(O,P,B.Dom,true)},getClientWidth:function(){return B.Dom.getViewportWidth()},getClientHeight:function(){return B.Dom.getViewportHeight()},getElementsByClassName:function(S,W,T,U){W=W||"*";T=(T)?B.Dom.get(T):null||document;if(!T){return[]}var P=[],O=T.getElementsByTagName(W),V=N(S);for(var Q=0,R=O.length;Q<R;++Q){if(V.test(O[Q].className)){P[P.length]=O[Q];if(U){U.call(O[Q],O[Q])}}}return P},hasClass:function(Q,P){var O=N(P);var R=function(S){return O.test(S.className)};return B.Dom.batch(Q,R,B.Dom,true)},addClass:function(P,O){var Q=function(R){if(this.hasClass(R,O)){return false}R.className=YAHOO.lang.trim([R.className,O].join(" "));return true};return B.Dom.batch(P,Q,B.Dom,true)},removeClass:function(Q,P){var O=N(P);var R=function(S){if(!this.hasClass(S,P)){return false}var T=S.className;S.className=T.replace(O," ");if(this.hasClass(S,P)){this.removeClass(S,P)}S.className=YAHOO.lang.trim(S.className);return true};return B.Dom.batch(Q,R,B.Dom,true)},replaceClass:function(R,P,O){if(!O||P===O){return false}var Q=N(P);var S=function(T){if(!this.hasClass(T,P)){this.addClass(T,O);return true}T.className=T.className.replace(Q," "+O+" ");if(this.hasClass(T,P)){this.replaceClass(T,P,O)}T.className=YAHOO.lang.trim(T.className);return true};return B.Dom.batch(R,S,B.Dom,true)},generateId:function(O,Q){Q=Q||"yui-gen";var P=function(R){if(R&&R.id){return R.id}var S=Q+H++;if(R){R.id=S}return S};return B.Dom.batch(O,P,B.Dom,true)||P.apply(B.Dom,arguments)},isAncestor:function(P,Q){P=B.Dom.get(P);if(!P||!Q){return false}var O=function(R){if(P.contains&&R.nodeType&&!L){return P.contains(R)}else{if(P.compareDocumentPosition&&R.nodeType){return !!(P.compareDocumentPosition(R)&16)}else{if(R.nodeType){return !!this.getAncestorBy(R,function(S){return S==P})}}}return false};return B.Dom.batch(Q,O,B.Dom,true)},inDocument:function(O){var P=function(Q){if(L){while(Q=Q.parentNode){if(Q==document.documentElement){return true}}return false}return this.isAncestor(document.documentElement,Q)};return B.Dom.batch(O,P,B.Dom,true)},getElementsBy:function(V,P,Q,S){P=P||"*";Q=(Q)?B.Dom.get(Q):null||document;if(!Q){return[]}var R=[],U=Q.getElementsByTagName(P);for(var T=0,O=U.length;T<O;++T){if(V(U[T])){R[R.length]=U[T];if(S){S(U[T])}}}return R},batch:function(S,V,U,Q){S=(S&&S.tagName)?S:B.Dom.get(S);if(!S||!V){return false}var R=(Q)?U:window;if(S.tagName||(!S.item&&!S.slice)){return V.call(R,S,U)}var T=[];for(var P=0,O=S.length;P<O;++P){T[T.length]=V.call(R,S[P],U)}return T},getDocumentHeight:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollHeight:document.documentElement.scrollHeight;var O=Math.max(P,B.Dom.getViewportHeight());return O},getDocumentWidth:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollWidth:document.documentElement.scrollWidth;var O=Math.max(P,B.Dom.getViewportWidth());return O},getViewportHeight:function(){var O=self.innerHeight;var P=document.compatMode;if((P||G)&&!C){O=(P=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight}return O},getViewportWidth:function(){var O=self.innerWidth;var P=document.compatMode;if(P||G){O=(P=="CSS1Compat")?document.documentElement.clientWidth:document.body.clientWidth}return O},getAncestorBy:function(O,P){while(O=O.parentNode){if(D(O,P)){return O}}return null},getAncestorByClassName:function(P,O){P=B.Dom.get(P);if(!P){return null}var Q=function(R){return B.Dom.hasClass(R,O)};return B.Dom.getAncestorBy(P,Q)},getAncestorByTagName:function(P,O){P=B.Dom.get(P);if(!P){return null}var Q=function(R){return R.tagName&&R.tagName.toUpperCase()==O.toUpperCase()};return B.Dom.getAncestorBy(P,Q)},getPreviousSiblingBy:function(O,P){while(O){O=O.previousSibling;if(D(O,P)){return O}}return null},getPreviousSibling:function(O){O=B.Dom.get(O);if(!O){return null}return B.Dom.getPreviousSiblingBy(O)},getNextSiblingBy:function(O,P){while(O){O=O.nextSibling;if(D(O,P)){return O}}return null},getNextSibling:function(O){O=B.Dom.get(O);if(!O){return null}return B.Dom.getNextSiblingBy(O)},getFirstChildBy:function(O,Q){var P=(D(O.firstChild,Q))?O.firstChild:null;return P||B.Dom.getNextSiblingBy(O.firstChild,Q)},getFirstChild:function(O,P){O=B.Dom.get(O);if(!O){return null}return B.Dom.getFirstChildBy(O)},getLastChildBy:function(O,Q){if(!O){return null}var P=(D(O.lastChild,Q))?O.lastChild:null;return P||B.Dom.getPreviousSiblingBy(O.lastChild,Q)},getLastChild:function(O){O=B.Dom.get(O);return B.Dom.getLastChildBy(O)},getChildrenBy:function(P,R){var Q=B.Dom.getFirstChildBy(P,R);var O=Q?[Q]:[];B.Dom.getNextSiblingBy(Q,function(S){if(!R||R(S)){O[O.length]=S}return false});return O},getChildren:function(O){O=B.Dom.get(O);if(!O){}return B.Dom.getChildrenBy(O)},getDocumentScrollLeft:function(O){O=O||document;return Math.max(O.documentElement.scrollLeft,O.body.scrollLeft)},getDocumentScrollTop:function(O){O=O||document;return Math.max(O.documentElement.scrollTop,O.body.scrollTop)},insertBefore:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null}return O.parentNode.insertBefore(P,O)},insertAfter:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null}if(O.nextSibling){return O.parentNode.insertBefore(P,O.nextSibling)}else{return O.parentNode.appendChild(P)}}}})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom)};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left))};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B)}else{return null}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B)};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}")};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B)};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0]}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.0",build:"442"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true)}};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'")}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A)}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A))},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll()}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true}}return E},fire:function(){var E=this.subscribers.length;if(!E&&this.silent){return true}var G=[],F=true,D,H=false;for(D=0;D<arguments.length;++D){G.push(arguments[D])}var A=G.length;if(!this.silent){}for(D=0;D<E;++D){var K=this.subscribers[D];if(!K){H=true}else{if(!this.silent){}var J=K.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(G.length>0){B=G[0]}F=K.fn.call(J,B,K.obj)}else{F=K.fn.call(J,this.type,G,K.obj)}if(false===F){if(!this.silent){}return false}}}if(H){var I=[],C=this.subscribers;for(D=0,E=C.length;D<E;++D){K=C[D];I.push(C[D])}this.subscribers=I}return true},unsubscribeAll:function(){for(var B=0,A=this.subscribers.length;B<A;++B){this._delete(A-1-B)}this.subscribers=[];return B},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj}this.subscribers[A]=null},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj}else{return this.override}}return A};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B)}else{return(this.fn==A)}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }"};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var J=false;var I=[];var K=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,OBJ:3,ADJ_SCOPE:4,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var L=this;var M=function(){L._tryPreloadAttach()};this._interval=setInterval(M,this.POLL_INTERVAL)}},onAvailable:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:false});C=this.POLL_RETRYS;this.startInterval()},onDOMReady:function(L,N,M){if(J){setTimeout(function(){var O=window;if(M){if(M===true){O=N}else{O=M}}L.call(O,"DOMReady",[],N)},0)}else{this.DOMReadyEvent.subscribe(L,N,M)}},onContentReady:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:true});C=this.POLL_RETRYS;this.startInterval()},addListener:function(N,L,W,R,M){if(!W||!W.call){return false}if(this._isValidCollection(N)){var X=true;for(var S=0,U=N.length;S<U;++S){X=this.on(N[S],L,W,R,M)&&X}return X}else{if(YAHOO.lang.isString(N)){var Q=this.getEl(N);if(Q){N=Q}else{this.onAvailable(N,function(){YAHOO.util.Event.on(N,L,W,R,M)});return true}}}if(!N){return false}if("unload"==L&&R!==this){K[K.length]=[N,L,W,R,M];return true}var Z=N;if(M){if(M===true){Z=R}else{Z=M}}var O=function(a){return W.call(Z,YAHOO.util.Event.getEvent(a),R)};var Y=[N,L,W,O,Z];var T=I.length;I[T]=Y;if(this.useLegacyEvent(N,L)){var P=this.getLegacyIndex(N,L);if(P==-1||N!=G[P][0]){P=G.length;B[N.id+L]=P;G[P]=[N,L,N["on"+L]];E[P]=[];N["on"+L]=function(a){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(a),P)}}E[P].push(Y)}else{try{this._simpleAdd(N,L,O,false)}catch(V){this.lastError=V;this.removeListener(N,L,W);return false}}return true},fireLegacyEvent:function(P,N){var R=true,L,T,S,U,Q;T=E[N];for(var M=0,O=T.length;M<O;++M){S=T[M];if(S&&S[this.WFN]){U=S[this.ADJ_SCOPE];Q=S[this.WFN].call(U,P);R=(R&&Q)}}L=G[N];if(L&&L[2]){L[2](P)}return R},getLegacyIndex:function(M,N){var L=this.generateId(M)+N;if(typeof B[L]=="undefined"){return -1}else{return B[L]}},useLegacyEvent:function(M,N){if(this.webkit&&("click"==N||"dblclick"==N)){var L=parseInt(this.webkit,10);if(!isNaN(L)&&L<418){return true}}return false},removeListener:function(M,L,U){var P,S;if(typeof M=="string"){M=this.getEl(M)}else{if(this._isValidCollection(M)){var V=true;for(P=0,S=M.length;P<S;++P){V=(this.removeListener(M[P],L,U)&&V)}return V}}if(!U||!U.call){return this.purgeElement(M,false,L)}if("unload"==L){for(P=0,S=K.length;P<S;P++){var W=K[P];if(W&&W[0]==M&&W[1]==L&&W[2]==U){K[P]=null;return true}}return false}var Q=null;var R=arguments[3];if("undefined"==typeof R){R=this._getCacheIndex(M,L,U)}if(R>=0){Q=I[R]}if(!M||!Q){return false}if(this.useLegacyEvent(M,L)){var O=this.getLegacyIndex(M,L);var N=E[O];if(N){for(P=0,S=N.length;P<S;++P){W=N[P];if(W&&W[this.EL]==M&&W[this.TYPE]==L&&W[this.FN]==U){N[P]=null;break}}}}else{try{this._simpleRemove(M,L,Q[this.WFN],false)}catch(T){this.lastError=T;return false}}delete I[R][this.WFN];delete I[R][this.FN];I[R]=null;return true},getTarget:function(N,M){var L=N.target||N.srcElement;return this.resolveTextNode(L)},resolveTextNode:function(L){if(L&&3==L.nodeType){return L.parentNode}else{return L}},getPageX:function(M){var L=M.pageX;if(!L&&0!==L){L=M.clientX||0;if(this.isIE){L+=this._getScrollLeft()}}return L},getPageY:function(L){var M=L.pageY;if(!M&&0!==M){M=L.clientY||0;if(this.isIE){M+=this._getScrollTop()}}return M},getXY:function(L){return[this.getPageX(L),this.getPageY(L)]},getRelatedTarget:function(M){var L=M.relatedTarget;if(!L){if(M.type=="mouseout"){L=M.toElement}else{if(M.type=="mouseover"){L=M.fromElement}}}return this.resolveTextNode(L)},getTime:function(N){if(!N.time){var M=new Date().getTime();try{N.time=M}catch(L){this.lastError=L;return M}}return N.time},stopEvent:function(L){this.stopPropagation(L);this.preventDefault(L)},stopPropagation:function(L){if(L.stopPropagation){L.stopPropagation()}else{L.cancelBubble=true}},preventDefault:function(L){if(L.preventDefault){L.preventDefault()}else{L.returnValue=false}},getEvent:function(M){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break}N=N.caller}}return L},getCharCode:function(M){var L=M.keyCode||M.charCode||0;if(YAHOO.env.ua.webkit&&(L in D)){L=D[L]}return L},_getCacheIndex:function(P,Q,O){for(var N=0,M=I.length;N<M;++N){var L=I[N];if(L&&L[this.FN]==O&&L[this.EL]==P&&L[this.TYPE]==Q){return N}}return -1},generateId:function(L){var M=L.id;if(!M){M="yuievtautoid-"+A;++A;L.id=M}return M},_isValidCollection:function(M){try{return(M&&M.length&&typeof M!="string"&&!M.tagName&&!M.alert&&typeof M[0]!="undefined")}catch(L){return false}},elCache:{},getEl:function(L){return document.getElementById(L)},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(M){if(!H){H=true;var L=YAHOO.util.Event;L._ready();L._tryPreloadAttach()}},_ready:function(M){if(!J){J=true;var L=YAHOO.util.Event;L.DOMReadyEvent.fire();L._simpleRemove(document,"DOMContentLoaded",L._ready)}},_tryPreloadAttach:function(){if(this.locked){return false}if(this.isIE){if(!J){this.startInterval();return false}}this.locked=true;var Q=!H;if(!Q){Q=(C>0)}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj}else{S=U.override}}U.fn.call(S,U.obj)};var M,L,O,N;for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&!O.checkReady){N=this.getEl(O.id);if(N){R(N,O);F[M]=null}else{P.push(O)}}}for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&O.checkReady){N=this.getEl(O.id);if(N){if(H||N.nextSibling){R(N,O);F[M]=null}}else{P.push(O)}}}C=(P.length===0)?0:C-1;if(Q){this.startInterval()}else{clearInterval(this._interval);this._interval=null}this.locked=false;return true},purgeElement:function(O,P,R){var Q=this.getListeners(O,R);if(Q){for(var N=0,L=Q.length;N<L;++N){var M=Q[N];this.removeListener(O,M.type,M.fn,M.index)}}if(P&&O&&O.childNodes){for(N=0,L=O.childNodes.length;N<L;++N){this.purgeElement(O.childNodes[N],P,R)}}},getListeners:function(N,L){var Q=[],M;if(!L){M=[I,K]}else{if(L=="unload"){M=[K]}else{M=[I]}}for(var P=0;P<M.length;++P){var T=M[P];if(T&&T.length>0){for(var R=0,S=T.length;R<S;++R){var O=T[R];if(O&&O[this.EL]===N&&(!L||L===O[this.TYPE])){Q.push({type:O[this.TYPE],fn:O[this.FN],obj:O[this.OBJ],adjust:O[this.ADJ_SCOPE],index:R})}}}}return(Q.length)?Q:null},_unload:function(S){var R=YAHOO.util.Event,P,O,M,L,N;for(P=0,L=K.length;P<L;++P){M=K[P];if(M){var Q=window;if(M[R.ADJ_SCOPE]){if(M[R.ADJ_SCOPE]===true){Q=M[R.OBJ]}else{Q=M[R.ADJ_SCOPE]}}M[R.FN].call(Q,R.getEvent(S),M[R.OBJ]);K[P]=null;M=null;Q=null}}K=null;if(I&&I.length>0){O=I.length;while(O){N=O-1;M=I[N];if(M){R.removeListener(M[R.EL],M[R.TYPE],M[R.FN],N)}O=O-1}M=null;R.clearCache()}for(P=0,L=G.length;P<L;++P){G[P][0]=null;G[P]=null}G=null;R._simpleRemove(window,"unload",R._unload)},_getScrollLeft:function(){return this._getScroll()[1]},_getScrollTop:function(){return this._getScroll()[0]},_getScroll:function(){var L=document.documentElement,M=document.body;if(L&&(L.scrollTop||L.scrollLeft)){return[L.scrollTop,L.scrollLeft]}else{if(M){return[M.scrollTop,M.scrollLeft]}else{return[0,0]}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(N,O,M,L){N.addEventListener(O,M,(L))}}else{if(window.attachEvent){return function(N,O,M,L){N.attachEvent("on"+O,M)}}else{return function(){}}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(N,O,M,L){N.removeEventListener(O,M,(L))}}else{if(window.detachEvent){return function(M,N,L){M.detachEvent("on"+N,L)}}else{return function(){}}}}()}}();(function(){var D=YAHOO.util.Event;D.on=D.addListener;if(D.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var B,E=document,A=E.body;if(("undefined"!==typeof YAHOO_config)&&YAHOO_config.injecting){B=document.createElement("script");var C=E.getElementsByTagName("head")[0]||A;C.insertBefore(B,C.firstChild)}else{E.write("<scr"+"ipt id=\"_yui_eu_dr\" defer=\"true\" src=\"//:\"><"+"/script>");B=document.getElementById("_yui_eu_dr")}if(B){B.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready()}}}else{}B=null}else{if(D.webkit){D._drwatch=setInterval(function(){var F=document.readyState;if("loaded"==F||"complete"==F){clearInterval(D._drwatch);D._drwatch=null;D._ready()}},D.POLL_INTERVAL)}else{D._simpleAdd(document,"DOMContentLoaded",D._ready)}}D._simpleAdd(window,"load",D._load);D._simpleAdd(window,"unload",D._unload);D._tryPreloadAttach()})()}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E)}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[]}B[A].push({fn:C,obj:F,override:E})}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G)}}else{for(var D in A){var B=true;if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G)}}return B}return false},unsubscribeAll:function(A){return this.unsubscribe(A)},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback)}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override)}}}return I[G]},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F])}return G.fire.apply(G,B)},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true}}return false}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A)}if(typeof B=="function"){D.subscribe(B)}else{D.subscribe(B.fn,B.scope,B.correctScope)}function E(K,J){if(!F.shift){F.shift=false}if(!F.alt){F.alt=false}if(!F.ctrl){F.ctrl=false}if(K.shiftKey==F.shift&&K.altKey==F.alt&&K.ctrlKey==F.ctrl){var H;var G;if(F.keys instanceof Array){for(var I=0;I<F.keys.length;I++){H=F.keys[I];if(H==K.charCode){D.fire(K.charCode,K);break}else{if(H==K.keyCode){D.fire(K.keyCode,K);break}}}}else{H=F.keys;if(H==K.charCode){D.fire(K.charCode,K)}else{if(H==K.keyCode){D.fire(K.keyCode,K)}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F)}this.enabled=true};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F)}this.enabled=false};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"")}};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.3.0",build:"442"});YAHOO.util.Connect={_msxml_progid:["MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function(){if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,"click",function(B){var A=YAHOO.util.Event.getTarget(B);if(A.type=="submit"){YAHOO.util.Connect._submitElementValue=encodeURIComponent(A.name)+"="+encodeURIComponent(A.value)}});return true}return false})(),startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),uploadEvent:new YAHOO.util.CustomEvent("upload"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(A){this._msxml_progid.unshift(A)},setDefaultPostHeader:function(A){this._use_default_post_header=A},setDefaultXhrHeader:function(A){this._use_default_xhr_header=A},setPollingInterval:function(A){if(typeof A=="number"&&isFinite(A)){this._polling_interval=A}},createXhrObject:function(E){var D,A;try{A=new XMLHttpRequest();D={conn:A,tId:E}}catch(C){for(var B=0;B<this._msxml_progid.length;++B){try{A=new ActiveXObject(this._msxml_progid[B]);D={conn:A,tId:E};break}catch(C){}}}finally{return D}},getConnectionObject:function(A){var C;var D=this._transaction_id;try{if(!A){C=this.createXhrObject(D)}else{C={};C.tId=D;C.isUpload=true}if(C){this._transaction_id++}}catch(B){}finally{return C}},asyncRequest:function(E,B,D,A){var C=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();if(!C){return null}else{if(D&&D.customevents){this.initCustomEvents(C,D)}if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(C,D,B,A);return C}if(E.toUpperCase()=="GET"){if(this._sFormData.length!==0){B+=((B.indexOf("?")==-1)?"?":"&")+this._sFormData}else{B+="?"+this._sFormData}}else{if(E.toUpperCase()=="POST"){A=A?this._sFormData+"&"+A:this._sFormData}}}C.conn.open(E,B,true);if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true)}}if(this._isFormSubmit||(A&&this._use_default_post_header)){this.initHeader("Content-Type",this._default_post_header);if(this._isFormSubmit){this.resetFormState()}}if(this._has_default_headers||this._has_http_headers){this.setHeader(C)}this.handleReadyState(C,D);C.conn.send(A||null);this.startEvent.fire(C);if(C.startEvent){C.startEvent.fire(C)}return C}},initCustomEvents:function(A,C){for(var B in C.customevents){if(this._customEvents[B][0]){A[this._customEvents[B][0]]=new YAHOO.util.CustomEvent(this._customEvents[B][1],(C.scope)?C.scope:null);A[this._customEvents[B][0]].subscribe(C.customevents[B])}}},handleReadyState:function(B,C){var A=this;if(C&&C.timeout){this._timeOut[B.tId]=window.setTimeout(function(){A.abort(B,C,true)},C.timeout)}this._poll[B.tId]=window.setInterval(function(){if(B.conn&&B.conn.readyState===4){window.clearInterval(A._poll[B.tId]);delete A._poll[B.tId];if(C&&C.timeout){window.clearTimeout(A._timeOut[B.tId]);delete A._timeOut[B.tId]}A.completeEvent.fire(B);if(B.completeEvent){B.completeEvent.fire(B)}A.handleTransactionResponse(B,C)}},this._polling_interval)},handleTransactionResponse:function(E,F,A){if(!F){this.releaseObject(E);return }var C,B;try{if(E.conn.status!==undefined&&E.conn.status!==0){C=E.conn.status}else{C=13030}}catch(D){C=13030}if(C>=200&&C<300||C===1223){B=this.createResponseObject(E,F.argument);if(F.success){if(!F.scope){F.success(B)}else{F.success.apply(F.scope,[B])}}this.successEvent.fire(B);if(E.successEvent){E.successEvent.fire(B)}}else{switch(C){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:B=this.createExceptionObject(E.tId,F.argument,(A?A:false));if(F.failure){if(!F.scope){F.failure(B)}else{F.failure.apply(F.scope,[B])}}break;default:B=this.createResponseObject(E,F.argument);if(F.failure){if(!F.scope){F.failure(B)}else{F.failure.apply(F.scope,[B])}}}this.failureEvent.fire(B);if(E.failureEvent){E.failureEvent.fire(B)}}this.releaseObject(E);B=null},createResponseObject:function(A,G){var D={};var I={};try{var C=A.conn.getAllResponseHeaders();var F=C.split("\n");for(var E=0;E<F.length;E++){var B=F[E].indexOf(":");if(B!=-1){I[F[E].substring(0,B)]=F[E].substring(B+2)}}}catch(H){}D.tId=A.tId;D.status=(A.conn.status==1223)?204:A.conn.status;D.statusText=(A.conn.status==1223)?"No Content":A.conn.statusText;D.getResponseHeader=I;D.getAllResponseHeaders=C;D.responseText=A.conn.responseText;D.responseXML=A.conn.responseXML;if(typeof G!==undefined){D.argument=G}return D},createExceptionObject:function(H,D,A){var F=0;var G="communication failure";var C=-1;var B="transaction aborted";var E={};E.tId=H;if(A){E.status=C;E.statusText=B}else{E.status=F;E.statusText=G}if(D){E.argument=D}return E},initHeader:function(A,D,C){var B=(C)?this._default_headers:this._http_headers;if(B[A]===undefined){B[A]=D}else{B[A]=D+","+B[A]}if(C){this._has_default_headers=true}else{this._has_http_headers=true}},setHeader:function(A){if(this._has_default_headers){for(var B in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,B)){A.conn.setRequestHeader(B,this._default_headers[B])}}}if(this._has_http_headers){for(var B in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,B)){A.conn.setRequestHeader(B,this._http_headers[B])}}delete this._http_headers;this._http_headers={};this._has_http_headers=false}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false},setForm:function(K,E,B){this.resetFormState();var J;if(typeof K=="string"){J=(document.getElementById(K)||document.forms[K])}else{if(typeof K=="object"){J=K}else{return }}if(E){var F=this.createFrame(B?B:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=J;return }var A,I,G,L;var H=false;for(var D=0;D<J.elements.length;D++){A=J.elements[D];L=J.elements[D].disabled;I=J.elements[D].name;G=J.elements[D].value;if(!L&&I){switch(A.type){case"select-one":case"select-multiple":for(var C=0;C<A.options.length;C++){if(A.options[C].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(A.options[C].attributes["value"].specified?A.options[C].value:A.options[C].text)+"&"}else{this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(A.options[C].hasAttribute("value")?A.options[C].value:A.options[C].text)+"&"}}}break;case"radio":case"checkbox":if(A.checked){this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&"}break;case"file":case undefined:case"reset":case"button":break;case"submit":if(H===false){if(this._hasSubmitListener&&this._submitElementValue){this._sFormData+=this._submitElementValue+"&"}else{this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&"}H=true}break;default:this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&"}}}this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);return this._sFormData},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData=""},createFrame:function(A){var B="yuiIO"+this._transaction_id;var C;if(window.ActiveXObject){C=document.createElement("<iframe id=\""+B+"\" name=\""+B+"\" />");if(typeof A=="boolean"){C.src="javascript:false"}else{if(typeof secureURI=="string"){C.src=A}}}else{C=document.createElement("iframe");C.id=B;C.name=B}C.style.position="absolute";C.style.top="-1000px";C.style.left="-1000px";document.body.appendChild(C)},appendPostData:function(A){var D=[];var B=A.split("&");for(var C=0;C<B.length;C++){var E=B[C].indexOf("=");if(E!=-1){D[C]=document.createElement("input");D[C].type="hidden";D[C].name=B[C].substring(0,E);D[C].value=B[C].substring(E+1);this._formNode.appendChild(D[C])}}return D},uploadFile:function(D,L,E,C){var H="yuiIO"+D.tId;var I="multipart/form-data";var J=document.getElementById(H);var M=this;var B={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",E);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",H);if(this._formNode.encoding){this._formNode.setAttribute("encoding",I)}else{this._formNode.setAttribute("enctype",I)}if(C){var K=this.appendPostData(C)}this._formNode.submit();this.startEvent.fire(D);if(D.startEvent){D.startEvent.fire(D)}if(L&&L.timeout){this._timeOut[D.tId]=window.setTimeout(function(){M.abort(D,L,true)},L.timeout)}if(K&&K.length>0){for(var G=0;G<K.length;G++){this._formNode.removeChild(K[G])}}for(var A in B){if(YAHOO.lang.hasOwnProperty(B,A)){if(B[A]){this._formNode.setAttribute(A,B[A])}else{this._formNode.removeAttribute(A)}}}this.resetFormState();var F=function(){if(L&&L.timeout){window.clearTimeout(M._timeOut[D.tId]);delete M._timeOut[D.tId]}M.completeEvent.fire(D);if(D.completeEvent){D.completeEvent.fire(D)}var O={};O.tId=D.tId;O.argument=L.argument;try{O.responseText=J.contentWindow.document.body?J.contentWindow.document.body.innerHTML:J.contentWindow.document.documentElement.textContent;O.responseXML=J.contentWindow.document.XMLDocument?J.contentWindow.document.XMLDocument:J.contentWindow.document}catch(N){}if(L&&L.upload){if(!L.scope){L.upload(O)}else{L.upload.apply(L.scope,[O])}}M.uploadEvent.fire(O);if(D.uploadEvent){D.uploadEvent.fire(O)}if(YAHOO.util.Event){YAHOO.util.Event.removeListener(J,"load",F)}else{if(window.detachEvent){J.detachEvent("onload",F)}else{J.removeEventListener("load",F,false)}}setTimeout(function(){document.body.removeChild(J);M.releaseObject(D)},100)};if(YAHOO.util.Event){YAHOO.util.Event.addListener(J,"load",F)}else{if(window.attachEvent){J.attachEvent("onload",F)}else{J.addEventListener("load",F,false)}}},abort:function(D,F,A){var C;if(D.conn){if(this.isCallInProgress(D)){D.conn.abort();window.clearInterval(this._poll[D.tId]);delete this._poll[D.tId];if(A){window.clearTimeout(this._timeOut[D.tId]);delete this._timeOut[D.tId]}C=true}}else{if(D.isUpload===true){var B="yuiIO"+D.tId;var E=document.getElementById(B);if(E){document.body.removeChild(E);if(A){window.clearTimeout(this._timeOut[D.tId]);delete this._timeOut[D.tId]}C=true}}else{C=false}}if(C===true){this.abortEvent.fire(D);if(D.abortEvent){D.abortEvent.fire(D)}this.handleTransactionResponse(D,F,true)}else{}return C},isCallInProgress:function(B){if(B&&B.conn){return B.conn.readyState!==4&&B.conn.readyState!==0}else{if(B&&B.isUpload===true){var A="yuiIO"+B.tId;return document.getElementById(A)?true:false}else{return false}}},releaseObject:function(A){if(A.conn){A.conn=null}A=null}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.3.0",build:"442"});YAHOO.util.Anim=function(B,A,C,D){if(!B){}this.init(B,A,C,D)};YAHOO.util.Anim.prototype={toString:function(){var A=this.getEl();var B=A.id||A.tagName||A;return("Anim "+B)},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(A,C,B){return this.method(this.currentFrame,C,B-C,this.totalFrames)},setAttribute:function(A,C,B){if(this.patterns.noNegatives.test(A)){C=(C>0)?C:0}YAHOO.util.Dom.setStyle(this.getEl(),A,C+B)},getAttribute:function(A){var C=this.getEl();var E=YAHOO.util.Dom.getStyle(C,A);if(E!=="auto"&&!this.patterns.offsetUnit.test(E)){return parseFloat(E)}var B=this.patterns.offsetAttribute.exec(A)||[];var F=!!(B[3]);var D=!!(B[2]);if(D||(YAHOO.util.Dom.getStyle(C,"position")=="absolute"&&F)){E=C["offset"+B[0].charAt(0).toUpperCase()+B[0].substr(1)]}else{E=0}return E},getDefaultUnit:function(A){if(this.patterns.defaultUnit.test(A)){return"px"}return""},setRuntimeAttribute:function(B){var G;var C;var D=this.attributes;this.runtimeAttributes[B]={};var F=function(H){return(typeof H!=="undefined")};if(!F(D[B]["to"])&&!F(D[B]["by"])){return false}G=(F(D[B]["from"]))?D[B]["from"]:this.getAttribute(B);if(F(D[B]["to"])){C=D[B]["to"]}else{if(F(D[B]["by"])){if(G.constructor==Array){C=[];for(var E=0,A=G.length;E<A;++E){C[E]=G[E]+D[B]["by"][E]*1}}else{C=G+D[B]["by"]*1}}}this.runtimeAttributes[B].start=G;this.runtimeAttributes[B].end=C;this.runtimeAttributes[B].unit=(F(D[B].unit))?D[B]["unit"]:this.getDefaultUnit(B);return true},init:function(C,H,G,A){var B=false;var D=null;var F=0;C=YAHOO.util.Dom.get(C);this.attributes=H||{};this.duration=!YAHOO.lang.isUndefined(G)?G:1;this.method=A||YAHOO.util.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=YAHOO.util.AnimMgr.fps;this.setEl=function(K){C=YAHOO.util.Dom.get(K)};this.getEl=function(){return C};this.isAnimated=function(){return B};this.getStartTime=function(){return D};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(YAHOO.util.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1}YAHOO.util.AnimMgr.registerElement(this);return true};this.stop=function(K){if(K){this.currentFrame=this.totalFrames;this._onTween.fire()}YAHOO.util.AnimMgr.stop(this)};var J=function(){this.onStart.fire();this.runtimeAttributes={};for(var K in this.attributes){this.setRuntimeAttribute(K)}B=true;F=0;D=new Date()};var I=function(){var M={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};M.toString=function(){return("duration: "+M.duration+", currentFrame: "+M.currentFrame)};this.onTween.fire(M);var L=this.runtimeAttributes;for(var K in L){this.setAttribute(K,this.doMethod(K,L[K].start,L[K].end),L[K].unit)}F+=1};var E=function(){var K=(new Date()-D)/1000;var L={duration:K,frames:F,fps:F/K};L.toString=function(){return("duration: "+L.duration+", frames: "+L.frames+", fps: "+L.fps)};B=false;F=0;this.onComplete.fire(L)};this._onStart=new YAHOO.util.CustomEvent("_start",this,true);this.onStart=new YAHOO.util.CustomEvent("start",this);this.onTween=new YAHOO.util.CustomEvent("tween",this);this._onTween=new YAHOO.util.CustomEvent("_tween",this,true);this.onComplete=new YAHOO.util.CustomEvent("complete",this);this._onComplete=new YAHOO.util.CustomEvent("_complete",this,true);this._onStart.subscribe(J);this._onTween.subscribe(I);this._onComplete.subscribe(E)}};YAHOO.util.AnimMgr=new function(){var C=null;var B=[];var A=0;this.fps=1000;this.delay=1;this.registerElement=function(F){B[B.length]=F;A+=1;F._onStart.fire();this.start()};this.unRegister=function(G,F){G._onComplete.fire();F=F||E(G);if(F==-1){return false}B.splice(F,1);A-=1;if(A<=0){this.stop()}return true};this.start=function(){if(C===null){C=setInterval(this.run,this.delay)}};this.stop=function(H){if(!H){clearInterval(C);for(var G=0,F=B.length;G<F;++G){if(B[0].isAnimated()){this.unRegister(B[0],0)}}B=[];C=null;A=0}else{this.unRegister(H)}};this.run=function(){for(var H=0,F=B.length;H<F;++H){var G=B[H];if(!G||!G.isAnimated()){continue}if(G.currentFrame<G.totalFrames||G.totalFrames===null){G.currentFrame+=1;if(G.useSeconds){D(G)}G._onTween.fire()}else{YAHOO.util.AnimMgr.stop(G,H)}}};var E=function(H){for(var G=0,F=B.length;G<F;++G){if(B[G]==H){return G}}return -1};var D=function(G){var J=G.totalFrames;var I=G.currentFrame;var H=(G.currentFrame*G.duration*1000/G.totalFrames);var F=(new Date()-G.getStartTime());var K=0;if(F<G.duration*1000){K=Math.round((F/H-1)*G.currentFrame)}else{K=J-(I+1)}if(K>0&&isFinite(K)){if(G.currentFrame+K>=J){K=J-(I+1)}G.currentFrame+=K}}};YAHOO.util.Bezier=new function(){this.getPosition=function(E,D){var F=E.length;var C=[];for(var B=0;B<F;++B){C[B]=[E[B][0],E[B][1]]}for(var A=1;A<F;++A){for(B=0;B<F-A;++B){C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1]}}return[C[0][0],C[0][1]]}};(function(){YAHOO.util.ColorAnim=function(E,D,F,G){YAHOO.util.ColorAnim.superclass.constructor.call(this,E,D,F,G)};YAHOO.extend(YAHOO.util.ColorAnim,YAHOO.util.Anim);var B=YAHOO.util;var C=B.ColorAnim.superclass;var A=B.ColorAnim.prototype;A.toString=function(){var D=this.getEl();var E=D.id||D.tagName;return("ColorAnim "+E)};A.patterns.color=/color$/i;A.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;A.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;A.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;A.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;A.parseColor=function(D){if(D.length==3){return D}var E=this.patterns.hex.exec(D);if(E&&E.length==4){return[parseInt(E[1],16),parseInt(E[2],16),parseInt(E[3],16)]}E=this.patterns.rgb.exec(D);if(E&&E.length==4){return[parseInt(E[1],10),parseInt(E[2],10),parseInt(E[3],10)]}E=this.patterns.hex3.exec(D);if(E&&E.length==4){return[parseInt(E[1]+E[1],16),parseInt(E[2]+E[2],16),parseInt(E[3]+E[3],16)]}return null};A.getAttribute=function(D){var F=this.getEl();if(this.patterns.color.test(D)){var G=YAHOO.util.Dom.getStyle(F,D);if(this.patterns.transparent.test(G)){var E=F.parentNode;G=B.Dom.getStyle(E,D);while(E&&this.patterns.transparent.test(G)){E=E.parentNode;G=B.Dom.getStyle(E,D);if(E.tagName.toUpperCase()=="HTML"){G="#fff"}}}}else{G=C.getAttribute.call(this,D)}return G};A.doMethod=function(E,I,F){var H;if(this.patterns.color.test(E)){H=[];for(var G=0,D=I.length;G<D;++G){H[G]=C.doMethod.call(this,E,I[G],F[G])}H="rgb("+Math.floor(H[0])+","+Math.floor(H[1])+","+Math.floor(H[2])+")"}else{H=C.doMethod.call(this,E,I,F)}return H};A.setRuntimeAttribute=function(E){C.setRuntimeAttribute.call(this,E);if(this.patterns.color.test(E)){var G=this.attributes;var I=this.parseColor(this.runtimeAttributes[E].start);var F=this.parseColor(this.runtimeAttributes[E].end);if(typeof G[E]["to"]==="undefined"&&typeof G[E]["by"]!=="undefined"){F=this.parseColor(G[E].by);for(var H=0,D=I.length;H<D;++H){F[H]=I[H]+F[H]}}this.runtimeAttributes[E].start=I;this.runtimeAttributes[E].end=F}}})();YAHOO.util.Easing={easeNone:function(B,A,D,C){return D*B/C+A},easeIn:function(B,A,D,C){return D*(B/=C)*B+A},easeOut:function(B,A,D,C){return -D*(B/=C)*(B-2)+A},easeBoth:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A}return -D/2*((--B)*(B-2)-1)+A},easeInStrong:function(B,A,D,C){return D*(B/=C)*B*B*B+A},easeOutStrong:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A},easeBothStrong:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A}return -D/2*((B-=2)*B*B*B-2)+A},elasticIn:function(C,A,G,F,B,E){if(C==0){return A}if((C/=F)==1){return A+G}if(!E){E=F*0.3}if(!B||B<Math.abs(G)){B=G;var D=E/4}else{var D=E/(2*Math.PI)*Math.asin(G/B)}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A},elasticOut:function(C,A,G,F,B,E){if(C==0){return A}if((C/=F)==1){return A+G}if(!E){E=F*0.3}if(!B||B<Math.abs(G)){B=G;var D=E/4}else{var D=E/(2*Math.PI)*Math.asin(G/B)}return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A},elasticBoth:function(C,A,G,F,B,E){if(C==0){return A}if((C/=F/2)==2){return A+G}if(!E){E=F*(0.3*1.5)}if(!B||B<Math.abs(G)){B=G;var D=E/4}else{var D=E/(2*Math.PI)*Math.asin(G/B)}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A},backIn:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158}return E*(B/=D)*B*((C+1)*B-C)+A},backOut:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A},backBoth:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A},bounceIn:function(B,A,D,C){return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A},bounceOut:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A}}}return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A},bounceBoth:function(B,A,D,C){if(B<C/2){return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A}return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A}};(function(){YAHOO.util.Motion=function(G,F,H,I){if(G){YAHOO.util.Motion.superclass.constructor.call(this,G,F,H,I)}};YAHOO.extend(YAHOO.util.Motion,YAHOO.util.ColorAnim);var D=YAHOO.util;var E=D.Motion.superclass;var B=D.Motion.prototype;B.toString=function(){var F=this.getEl();var G=F.id||F.tagName;return("Motion "+G)};B.patterns.points=/^points$/i;B.setAttribute=function(F,H,G){if(this.patterns.points.test(F)){G=G||"px";E.setAttribute.call(this,"left",H[0],G);E.setAttribute.call(this,"top",H[1],G)}else{E.setAttribute.call(this,F,H,G)}};B.getAttribute=function(F){if(this.patterns.points.test(F)){var G=[E.getAttribute.call(this,"left"),E.getAttribute.call(this,"top")]}else{G=E.getAttribute.call(this,F)}return G};B.doMethod=function(F,J,G){var I=null;if(this.patterns.points.test(F)){var H=this.method(this.currentFrame,0,100,this.totalFrames)/100;I=D.Bezier.getPosition(this.runtimeAttributes[F],H)}else{I=E.doMethod.call(this,F,J,G)}return I};B.setRuntimeAttribute=function(O){if(this.patterns.points.test(O)){var G=this.getEl();var I=this.attributes;var F;var K=I["points"]["control"]||[];var H;var L,N;if(K.length>0&&!(K[0] instanceof Array)){K=[K]}else{var J=[];for(L=0,N=K.length;L<N;++L){J[L]=K[L]}K=J}if(D.Dom.getStyle(G,"position")=="static"){D.Dom.setStyle(G,"position","relative")}if(C(I["points"]["from"])){D.Dom.setXY(G,I["points"]["from"])}else{D.Dom.setXY(G,D.Dom.getXY(G))}F=this.getAttribute("points");if(C(I["points"]["to"])){H=A.call(this,I["points"]["to"],F);var M=D.Dom.getXY(this.getEl());for(L=0,N=K.length;L<N;++L){K[L]=A.call(this,K[L],F)}}else{if(C(I["points"]["by"])){H=[F[0]+I["points"]["by"][0],F[1]+I["points"]["by"][1]];for(L=0,N=K.length;L<N;++L){K[L]=[F[0]+K[L][0],F[1]+K[L][1]]}}}this.runtimeAttributes[O]=[F];if(K.length>0){this.runtimeAttributes[O]=this.runtimeAttributes[O].concat(K)}this.runtimeAttributes[O][this.runtimeAttributes[O].length]=H}else{E.setRuntimeAttribute.call(this,O)}};var A=function(F,H){var G=D.Dom.getXY(this.getEl());F=[F[0]-G[0]+H[0],F[1]-G[1]+H[1]];return F};var C=function(F){return(typeof F!=="undefined")}})();(function(){YAHOO.util.Scroll=function(E,D,F,G){if(E){YAHOO.util.Scroll.superclass.constructor.call(this,E,D,F,G)}};YAHOO.extend(YAHOO.util.Scroll,YAHOO.util.ColorAnim);var B=YAHOO.util;var C=B.Scroll.superclass;var A=B.Scroll.prototype;A.toString=function(){var D=this.getEl();var E=D.id||D.tagName;return("Scroll "+E)};A.doMethod=function(D,G,E){var F=null;if(D=="scroll"){F=[this.method(this.currentFrame,G[0],E[0]-G[0],this.totalFrames),this.method(this.currentFrame,G[1],E[1]-G[1],this.totalFrames)]}else{F=C.doMethod.call(this,D,G,E)}return F};A.getAttribute=function(D){var F=null;var E=this.getEl();if(D=="scroll"){F=[E.scrollLeft,E.scrollTop]}else{F=C.getAttribute.call(this,D)}return F};A.setAttribute=function(D,G,F){var E=this.getEl();if(D=="scroll"){E.scrollLeft=G[0];E.scrollTop=G[1]}else{C.setAttribute.call(this,D,G,F)}}})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.3.0",build:"442"});if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(D,C){for(var E in this.ids){for(var B in this.ids[E]){var F=this.ids[E][B];if(!this.isTypeOfDD(F)){continue}F[D].apply(F,C)}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true)},_onResize:function(B){this._execOnAll("resetConstraints",[])},lock:function(){this.locked=true},unlock:function(){this.locked=false},isLocked:function(){return this.locked},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(C,B){if(!this.initialized){this.init()}if(!this.ids[B]){this.ids[B]={}}this.ids[B][C.id]=C},removeDDFromGroup:function(D,B){if(!this.ids[B]){this.ids[B]={}}var C=this.ids[B];if(C&&C[D.id]){delete C[D.id]}},_remove:function(C){for(var B in C.groups){if(B&&this.ids[B][C.id]){delete this.ids[B][C.id]}}delete this.handleIds[C.id]},regHandle:function(C,B){if(!this.handleIds[C]){this.handleIds[C]={}}this.handleIds[C][B]=B},isDragDrop:function(B){return(this.getDDById(B))?true:false},getRelated:function(F,C){var E=[];for(var D in F.groups){for(j in this.ids[D]){var B=this.ids[D][j];if(!this.isTypeOfDD(B)){continue}if(!C||B.isTarget){E[E.length]=B}}}return E},isLegalTarget:function(F,E){var C=this.getRelated(F,true);for(var D=0,B=C.length;D<B;++D){if(C[D].id==E.id){return true}}return false},isTypeOfDD:function(B){return(B&&B.__ygDragDrop)},isHandle:function(C,B){return(this.handleIds[C]&&this.handleIds[C][B])},getDDById:function(C){for(var B in this.ids){if(this.ids[B][C]){return this.ids[B][C]}}return null},handleMouseDown:function(D,C){this.currentTarget=YAHOO.util.Event.getTarget(D);this.dragCurrent=C;var B=C.getEl();this.startX=YAHOO.util.Event.getPageX(D);this.startY=YAHOO.util.Event.getPageY(D);this.deltaX=this.startX-B.offsetLeft;this.deltaY=this.startY-B.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var E=YAHOO.util.DDM;E.startDrag(E.startX,E.startY)},this.clickTimeThresh)},startDrag:function(B,D){clearTimeout(this.clickTimeout);var C=this.dragCurrent;if(C){C.b4StartDrag(B,D)}if(C){C.startDrag(B,D)}this.dragThreshMet=true},handleMouseUp:function(B){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(B,true)}else{}this.stopDrag(B);this.stopEvent(B)}},stopEvent:function(B){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(B)}if(this.preventDefault){YAHOO.util.Event.preventDefault(B)}},stopDrag:function(C,B){if(this.dragCurrent&&!B){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(C);this.dragCurrent.endDrag(C)}this.dragCurrent.onMouseUp(C)}this.dragCurrent=null;this.dragOvers={}},handleMouseMove:function(E){var B=this.dragCurrent;if(B){if(YAHOO.util.Event.isIE&&!E.button){this.stopEvent(E);return this.handleMouseUp(E)}if(!this.dragThreshMet){var D=Math.abs(this.startX-YAHOO.util.Event.getPageX(E));var C=Math.abs(this.startY-YAHOO.util.Event.getPageY(E));if(D>this.clickPixelThresh||C>this.clickPixelThresh){this.startDrag(this.startX,this.startY)}}if(this.dragThreshMet){B.b4Drag(E);if(B){B.onDrag(E)}if(B){this.fireEvents(E,false)}}this.stopEvent(E)}},fireEvents:function(P,H){var R=this.dragCurrent;if(!R||R.isLocked()){return }var J=YAHOO.util.Event.getPageX(P);var I=YAHOO.util.Event.getPageY(P);var K=new YAHOO.util.Point(J,I);var F=R.getTargetCoord(K.x,K.y);var C=R.getDragEl();curRegion=new YAHOO.util.Region(F.y,F.x+C.offsetWidth,F.y+C.offsetHeight,F.x);var E=[];var G=[];var B=[];var Q=[];var O=[];for(var M in this.dragOvers){var S=this.dragOvers[M];if(!this.isTypeOfDD(S)){continue}if(!this.isOverTarget(K,S,this.mode,curRegion)){G.push(S)}E[M]=true;delete this.dragOvers[M]}for(var L in R.groups){if("string"!=typeof L){continue}for(M in this.ids[L]){var D=this.ids[L][M];if(!this.isTypeOfDD(D)){continue}if(D.isTarget&&!D.isLocked()&&D!=R){if(this.isOverTarget(K,D,this.mode,curRegion)){if(H){Q.push(D)}else{if(!E[D.id]){O.push(D)}else{B.push(D)}this.dragOvers[D.id]=D}}}}}this.interactionInfo={out:G,enter:O,over:B,drop:Q,point:K,draggedRegion:curRegion,sourceRegion:this.locationCache[R.id],validDrop:H};if(H&&!Q.length){this.interactionInfo.validDrop=false;R.onInvalidDrop(P)}if(this.mode){if(G.length){R.b4DragOut(P,G);if(R){R.onDragOut(P,G)}}if(O.length){if(R){R.onDragEnter(P,O)}}if(B.length){if(R){R.b4DragOver(P,B)}if(R){R.onDragOver(P,B)}}if(Q.length){if(R){R.b4DragDrop(P,Q)}if(R){R.onDragDrop(P,Q)}}}else{var N=0;for(M=0,N=G.length;M<N;++M){if(R){R.b4DragOut(P,G[M].id)}if(R){R.onDragOut(P,G[M].id)}}for(M=0,N=O.length;M<N;++M){if(R){R.onDragEnter(P,O[M].id)}}for(M=0,N=B.length;M<N;++M){if(R){R.b4DragOver(P,B[M].id)}if(R){R.onDragOver(P,B[M].id)}}for(M=0,N=Q.length;M<N;++M){if(R){R.b4DragDrop(P,Q[M].id)}if(R){R.onDragDrop(P,Q[M].id)}}}},getBestMatch:function(D){var F=null;var C=D.length;if(C==1){F=D[0]}else{for(var E=0;E<C;++E){var B=D[E];if(this.mode==this.INTERSECT&&B.cursorIsOver){F=B;break}else{if(!F||!F.overlap||(B.overlap&&F.overlap.getArea()<B.overlap.getArea())){F=B}}}}return F},refreshCache:function(C){var E=C||this.ids;for(var B in E){if("string"!=typeof B){continue}for(var D in this.ids[B]){var F=this.ids[B][D];if(this.isTypeOfDD(F)){var G=this.getLocation(F);if(G){this.locationCache[F.id]=G}else{delete this.locationCache[F.id]}}}}},verifyEl:function(C){try{if(C){var B=C.offsetParent;if(B){return true}}}catch(D){}return false},getLocation:function(G){if(!this.isTypeOfDD(G)){return null}var E=G.getEl(),J,D,C,L,K,M,B,I,F;try{J=YAHOO.util.Dom.getXY(E)}catch(H){}if(!J){return null}D=J[0];C=D+E.offsetWidth;L=J[1];K=L+E.offsetHeight;M=L-G.padding[0];B=C+G.padding[1];I=K+G.padding[2];F=D-G.padding[3];return new YAHOO.util.Region(M,B,I,F)},isOverTarget:function(J,B,D,E){var F=this.locationCache[B.id];if(!F||!this.useCache){F=this.getLocation(B);this.locationCache[B.id]=F}if(!F){return false}B.cursorIsOver=F.contains(J);var I=this.dragCurrent;if(!I||(!D&&!I.constrainX&&!I.constrainY)){return B.cursorIsOver}B.overlap=null;if(!E){var G=I.getTargetCoord(J.x,J.y);var C=I.getDragEl();E=new YAHOO.util.Region(G.y,G.x+C.offsetWidth,G.y+C.offsetHeight,G.x)}var H=E.intersect(F);if(H){B.overlap=H;return(D)?true:B.cursorIsOver}else{return false}},_onUnload:function(C,B){this.unregAll()},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null}this._execOnAll("unreg",[]);for(i in this.elementCache){delete this.elementCache[i]}this.elementCache={};this.ids={}},elementCache:{},getElWrapper:function(C){var B=this.elementCache[C];if(!B||!B.el){B=this.elementCache[C]=new this.ElementWrapper(YAHOO.util.Dom.get(C))}return B},getElement:function(B){return YAHOO.util.Dom.get(B)},getCss:function(C){var B=YAHOO.util.Dom.get(C);return(B)?B.style:null},ElementWrapper:function(B){this.el=B||null;this.id=this.el&&B.id;this.css=this.el&&B.style},getPosX:function(B){return YAHOO.util.Dom.getX(B)},getPosY:function(B){return YAHOO.util.Dom.getY(B)},swapNode:function(D,B){if(D.swapNode){D.swapNode(B)}else{var E=B.parentNode;var C=B.nextSibling;if(C==D){E.insertBefore(D,B)}else{if(B==D.nextSibling){E.insertBefore(B,D)}else{D.parentNode.replaceChild(B,D);E.insertBefore(D,C)}}}},getScroll:function(){var D,B,E=document.documentElement,C=document.body;if(E&&(E.scrollTop||E.scrollLeft)){D=E.scrollTop;B=E.scrollLeft}else{if(C){D=C.scrollTop;B=C.scrollLeft}else{}}return{top:D,left:B}},getStyle:function(C,B){return YAHOO.util.Dom.getStyle(C,B)},getScrollTop:function(){return this.getScroll().top},getScrollLeft:function(){return this.getScroll().left},moveToEl:function(B,D){var C=YAHOO.util.Dom.getXY(D);YAHOO.util.Dom.setXY(B,C)},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight()},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth()},numericSort:function(C,B){return(C-B)},_timeoutCount:0,_addListeners:function(){var B=YAHOO.util.DDM;if(YAHOO.util.Event&&document){B._onLoad()}else{if(B._timeoutCount>2000){}else{setTimeout(B._addListeners,10);if(document&&document.body){B._timeoutCount+=1}}}},handleWasClicked:function(B,D){if(this.isHandle(D,B.id)){return true}else{var C=B.parentNode;while(C){if(this.isHandle(D,C.id)){return true}else{C=C.parentNode}}}return false}}}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners()}(function(){var A=YAHOO.util.Event;var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D)}};YAHOO.util.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true},unlock:function(){this.locked=false},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id)}return this._domRef},getDragEl:function(){return B.get(this.dragElId)},init:function(E,C,D){this.initTarget(E,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true)},initTarget:function(E,C,D){this.config=D||{};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof E!=="string"){this._domRef=E;E=B.generateId(E)}this.id=E;this.addToGroup((C)?C:"default");this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);this.setDragElId(E);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig()},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false)},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable()},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E]}else{if(!F&&0!==F){this.padding=[E,C,E,C]}else{this.padding=[E,C,F,D]}}},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){return }var D=F||0;var C=E||0;var H=B.getXY(G);this.initPageX=H[0]-D;this.initPageY=H[1]-C;this.lastPageX=H[0];this.lastPageY=H[1];this.setStartPosition(H)},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=C[0];this.startPageY=C[1]},addToGroup:function(C){this.groups[C]=true;this.DDM.regDragDrop(this,C)},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C]}this.DDM.removeDDFromGroup(this,C)},setDragElId:function(C){this.dragElId=C},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C)}this.handleElId=C;this.DDM.regHandle(this.id,C)},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C)}A.on(C,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(C);this.hasOuterHandles=true},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this)},isLocked:function(){return(this.DDM.isLocked()||this.locked)},handleMouseDown:function(F,E){var C=F.which||F.button;if(this.primaryButtonOnly&&C>1){return }if(this.isLocked()){return }this.b4MouseDown(F);this.onMouseDown(F);this.DDM.refreshCache(this.groups);var D=new YAHOO.util.Point(A.getPageX(F),A.getPageY(F));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(D,this)){}else{if(this.clickValidator(F)){this.setStartPosition();this.DDM.handleMouseDown(F,this);this.DDM.stopEvent(F)}else{}}},clickValidator:function(D){var C=A.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)))},getTargetCoord:function(E,D){var C=E-this.deltaX;var F=D-this.deltaY;if(this.constrainX){if(C<this.minX){C=this.minX}if(C>this.maxX){C=this.maxX}}if(this.constrainY){if(F<this.minY){F=this.minY}if(F>this.maxY){F=this.maxY}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F}},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C)}this.invalidHandleIds[C]=C},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C)},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D]},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C)}delete this.invalidHandleIds[C]},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E]}}},isValidHandleChild:function(F){var E=true;var H;try{H=F.nodeName.toUpperCase()}catch(G){H=F.nodeName}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D])}return E},setXTicks:function(F,C){this.xTicks=[];this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true}}this.xTicks.sort(this.DDM.numericSort)},setYTicks:function(F,C){this.yTicks=[];this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true}}this.yTicks.sort(this.DDM.numericSort)},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);this.rightConstraint=parseInt(D,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(C){this.setXTicks(this.initPageX,C)}this.constrainX=true},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks()},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);this.bottomConstraint=parseInt(E,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(D){this.setYTicks(this.initPageY,D)}this.constrainY=true},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C)}else{this.setInitPosition()}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize)}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize)}},getTick:function(I,F){if(!F){return I}else{if(F[0]>=I){return F[0]}else{for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D];var G=F[E]-I;return(G>H)?F[D]:F[E]}}return F[F.length-1]}}},toString:function(){return("DragDrop "+this.id)}}})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B)}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;var D=B-this.startPageY;this.setDelta(A,D)},setDelta:function(B,A){this.deltaX=B;this.deltaY=A},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B)},alignElWithMouse:function(B,F,E){var D=this.getTargetCoord(F,E);if(!this.deltaSetXY){var G=[D.x,D.y];YAHOO.util.Dom.setXY(B,G);var C=parseInt(YAHOO.util.Dom.getStyle(B,"left"),10);var A=parseInt(YAHOO.util.Dom.getStyle(B,"top"),10);this.deltaSetXY=[C-D.x,A-D.y]}else{YAHOO.util.Dom.setStyle(B,"left",(D.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(B,"top",(D.y+this.deltaSetXY[1])+"px")}this.cachePosition(D.x,D.y);this.autoScroll(D.x,D.y,B.offsetHeight,B.offsetWidth)},cachePosition:function(B,A){if(B){this.lastPageX=B;this.lastPageY=A}else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0];this.lastPageY=C[1]}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();var B=this.DDM.getClientWidth();var N=this.DDM.getScrollTop();var D=this.DDM.getScrollLeft();var H=E+I;var M=K+J;var G=(L+N-I-this.deltaY);var F=(B+D-J-this.deltaX);var C=40;var A=(document.all)?80:30;if(H>L&&G<C){window.scrollTo(D,N+A)}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A)}if(M>B&&F<C){window.scrollTo(D+A,N)}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N)}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false)},b4MouseDown:function(A){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A))},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A))},toString:function(){return("DD "+this.id)}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);this.initFrame()}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame()},50);return }var F=this.getDragEl(),E=YAHOO.util.Dom;if(!F){F=document.createElement("div");F.id=this.dragElId;var D=F.style;D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");F.appendChild(C);A.insertBefore(F,A.firstChild)}},initFrame:function(){this.createFrame()},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId)},showFrame:function(E,D){var C=this.getEl();var A=this.getDragEl();var B=A.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2))}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible")},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;var B=this.getEl();var C=this.getDragEl();var G=parseInt(H.getStyle(C,"borderTopWidth"),10);var I=parseInt(H.getStyle(C,"borderRightWidth"),10);var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);if(isNaN(G)){G=0}if(isNaN(I)){I=0}if(isNaN(F)){F=0}if(isNaN(D)){D=0}var E=Math.max(0,B.offsetWidth-I-D);var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px")}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C)},b4StartDrag:function(A,B){this.showFrame(A,B)},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden")},endDrag:function(D){var C=YAHOO.util.Dom;var B=this.getEl();var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","")},toString:function(){return("DDProxy "+this.id)}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B)}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id)}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.3.0",build:"442"});YAHOO.util.Attribute=function(B,A){if(A){this.owner=A;this.configure(B,true)}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,validator:null,getValue:function(){return this.value},setValue:function(F,B){var E;var A=this.owner;var C=this.name;var D={type:C,prevValue:this.getValue(),newValue:F};if(this.readOnly||(this.writeOnce&&this._written)){return false}if(this.validator&&!this.validator.call(A,F)){return false}if(!B){E=A.fireBeforeChangeEvent(D);if(E===false){return false}}if(this.method){this.method.call(A,F)}this.value=F;this._written=true;D.type=C;if(!B){this.owner.fireChangeEvent(D)}return true},configure:function(B,C){B=B||{};this._written=false;this._initialConfig=this._initialConfig||{};for(var A in B){if(A&&YAHOO.lang.hasOwnProperty(B,A)){this[A]=B[A];if(C){this._initialConfig[A]=B[A]}}}},resetValue:function(){return this.setValue(this._initialConfig.value)},resetConfig:function(){this.configure(this._initialConfig)},refresh:function(A){this.setValue(this.value,A)}};(function(){var A=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(C){var D=this._configs||{};var B=D[C];if(!B){return undefined}return B.value},set:function(D,E,B){var F=this._configs||{};var C=F[D];if(!C){return false}return C.setValue(E,B)},getAttributeKeys:function(){var E=this._configs;var D=[];var B;for(var C in E){B=E[C];if(A.hasOwnProperty(E,C)&&!A.isUndefined(B)){D[D.length]=C}}return D},setAttributes:function(D,B){for(var C in D){if(A.hasOwnProperty(D,C)){this.set(C,D[C],B)}}},resetValue:function(C,B){var D=this._configs||{};if(D[C]){this.set(C,D[C]._initialConfig.value,B);return true}return false},refresh:function(E,C){var F=this._configs;E=((A.isString(E))?[E]:E)||this.getAttributeKeys();for(var D=0,B=E.length;D<B;++D){if(F[E[D]]&&!A.isUndefined(F[E[D]].value)&&!A.isNull(F[E[D]].value)){F[E[D]].refresh(C)}}},register:function(B,C){this.setAttributeConfig(B,C)},getAttributeConfig:function(C){var E=this._configs||{};var B=E[C]||{};var D={};for(C in B){if(A.hasOwnProperty(B,C)){D[C]=B[C]}}return D},setAttributeConfig:function(B,D,E){var C=this._configs||{};D=D||{};if(!C[B]){D.name=B;C[B]=new YAHOO.util.Attribute(D,this)}else{C[B].configure(D,E)}},configureAttribute:function(B,C,D){this.setAttributeConfig(B,C,D)},resetAttributeConfig:function(B){var C=this._configs||{};C[B].resetConfig()},fireBeforeChangeEvent:function(C){var B="before";B+=C.type.charAt(0).toUpperCase()+C.type.substr(1)+"Change";C.type=B;return this.fireEvent(C.type,C)},fireChangeEvent:function(B){B.type+="Change";return this.fireEvent(B.type,B)}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider)})();(function(){var D=YAHOO.util.Dom,F=YAHOO.util.AttributeProvider;YAHOO.util.Element=function(G,H){if(arguments.length){this.init(G,H)}};YAHOO.util.Element.prototype={DOM_EVENTS:null,appendChild:function(G){G=G.get?G.get("element"):G;this.get("element").appendChild(G)},getElementsByTagName:function(G){return this.get("element").getElementsByTagName(G)},hasChildNodes:function(){return this.get("element").hasChildNodes()},insertBefore:function(G,H){G=G.get?G.get("element"):G;H=(H&&H.get)?H.get("element"):H;this.get("element").insertBefore(G,H)},removeChild:function(G){G=G.get?G.get("element"):G;this.get("element").removeChild(G);return true},replaceChild:function(G,H){G=G.get?G.get("element"):G;H=H.get?H.get("element"):H;return this.get("element").replaceChild(G,H)},initAttributes:function(G){},addListener:function(K,J,L,I){var H=this.get("element");I=I||this;H=this.get("id")||H;var G=this;if(!this._events[K]){if(this.DOM_EVENTS[K]){YAHOO.util.Event.addListener(H,K,function(M){if(M.srcElement&&!M.target){M.target=M.srcElement}G.fireEvent(K,M)},L,I)}this.createEvent(K,this)}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments)},on:function(){this.addListener.apply(this,arguments)},subscribe:function(){this.addListener.apply(this,arguments)},removeListener:function(H,G){this.unsubscribe.apply(this,arguments)},addClass:function(G){D.addClass(this.get("element"),G)},getElementsByClassName:function(H,G){return D.getElementsByClassName(H,G,this.get("element"))},hasClass:function(G){return D.hasClass(this.get("element"),G)},removeClass:function(G){return D.removeClass(this.get("element"),G)},replaceClass:function(H,G){return D.replaceClass(this.get("element"),H,G)},setStyle:function(I,H){var G=this.get("element");if(!G){return this._queue[this._queue.length]=["setStyle",arguments]}return D.setStyle(G,I,H)},getStyle:function(G){return D.getStyle(this.get("element"),G)},fireQueue:function(){var H=this._queue;for(var I=0,G=H.length;I<G;++I){this[H[I][0]].apply(this,H[I][1])}},appendTo:function(H,I){H=(H.get)?H.get("element"):D.get(H);this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:H});I=(I&&I.get)?I.get("element"):D.get(I);var G=this.get("element");if(!G){return false}if(!H){return false}if(G.parent!=H){if(I){H.insertBefore(G,I)}else{H.appendChild(G)}}this.fireEvent("appendTo",{type:"appendTo",target:H})},get:function(G){var I=this._configs||{};var H=I.element;if(H&&!I[G]&&!YAHOO.lang.isUndefined(H.value[G])){return H.value[G]}return F.prototype.get.call(this,G)},setAttributes:function(L,H){var K=this.get("element");for(var J in L){if(!this._configs[J]&&!YAHOO.lang.isUndefined(K[J])){this.setAttributeConfig(J)}}for(var I=0,G=this._configOrder.length;I<G;++I){if(L[this._configOrder[I]]){this.set(this._configOrder[I],L[this._configOrder[I]],H)}}},set:function(H,J,G){var I=this.get("element");if(!I){this._queue[this._queue.length]=["set",arguments];if(this._configs[H]){this._configs[H].value=J}return }if(!this._configs[H]&&!YAHOO.lang.isUndefined(I[H])){C.call(this,H)}return F.prototype.set.apply(this,arguments)},setAttributeConfig:function(G,I,J){var H=this.get("element");if(H&&!this._configs[G]&&!YAHOO.lang.isUndefined(H[G])){C.call(this,G,I)}else{F.prototype.setAttributeConfig.apply(this,arguments)}this._configOrder.push(G)},getAttributeKeys:function(){var H=this.get("element");var I=F.prototype.getAttributeKeys.call(this);for(var G in H){if(!this._configs[G]){I[G]=I[G]||H[G]}}return I},createEvent:function(H,G){this._events[H]=true;F.prototype.createEvent.apply(this,arguments)},init:function(H,G){A.apply(this,arguments)}};var A=function(H,G){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];G=G||{};G.element=G.element||H||null;this.DOM_EVENTS={"click":true,"dblclick":true,"keydown":true,"keypress":true,"keyup":true,"mousedown":true,"mousemove":true,"mouseout":true,"mouseover":true,"mouseup":true,"focus":true,"blur":true,"submit":true};var I=false;if(YAHOO.lang.isString(H)){C.call(this,"id",{value:G.element})}if(D.get(H)){I=true;E.call(this,G);B.call(this,G)}YAHOO.util.Event.onAvailable(G.element,function(){if(!I){E.call(this,G)}this.fireEvent("available",{type:"available",target:G.element})},this,true);YAHOO.util.Event.onContentReady(G.element,function(){if(!I){B.call(this,G)}this.fireEvent("contentReady",{type:"contentReady",target:G.element})},this,true)};var E=function(G){this.setAttributeConfig("element",{value:D.get(G.element),readOnly:true})};var B=function(G){this.initAttributes(G);this.setAttributes(G,true);this.fireQueue()};var C=function(G,I){var H=this.get("element");I=I||{};I.name=G;I.method=I.method||function(J){H[G]=J};I.value=I.value||H[G];this._configs[G]=new YAHOO.util.Attribute(I,this)};YAHOO.augment(YAHOO.util.Element,F)})();YAHOO.register("element",YAHOO.util.Element,{version:"2.3.0",build:"442"});YAHOO.register("utilities",YAHOO,{version:"2.3.0",build:"442"}) 
 /*
 * Ext JS Library 1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */


Ext={};window["undefined"]=window["undefined"];Ext.apply=function(o,c,_3){if(_3){Ext.apply(o,_3);}if(o&&c&&typeof c=="object"){for(var p in c){o[p]=c[p];}}return o;};(function(){var _5=0;var ua=navigator.userAgent.toLowerCase();var _7=document.compatMode=="CSS1Compat",_8=ua.indexOf("opera")>-1,_9=(/webkit|khtml/).test(ua),_a=ua.indexOf("msie")>-1,_b=ua.indexOf("msie 7")>-1,_c=!_9&&ua.indexOf("gecko")>-1,_d=_a&&!_7,_e=(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1),_f=(ua.indexOf("macintosh")!=-1||ua.indexOf("mac os x")!=-1),_10=(ua.indexOf("linux")!=-1),_11=window.location.href.toLowerCase().indexOf("https")===0;if(_a&&!_b){try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}}Ext.apply(Ext,{isStrict:_7,isSecure:_11,isReady:false,enableGarbageCollector:true,enableListenerCollection:false,SSL_SECURE_URL:"javascript:false",BLANK_IMAGE_URL:"http:/"+"/extjs.com/s.gif",emptyFn:function(){},applyIf:function(o,c){if(o&&c){for(var p in c){if(typeof o[p]=="undefined"){o[p]=c[p];}}}return o;},addBehaviors:function(o){if(!Ext.isReady){Ext.onReady(function(){Ext.addBehaviors(o);});return;}var _16={};for(var b in o){var _18=b.split("@");if(_18[1]){var s=_18[0];if(!_16[s]){_16[s]=Ext.select(s);}_16[s].on(_18[1],o[b]);}}_16=null;},id:function(el,_1b){_1b=_1b||"ext-gen";el=Ext.getDom(el);var id=_1b+(++_5);return el?(el.id?el.id:(el.id=id)):id;},extend:function(){var io=function(o){for(var m in o){this[m]=o[m];}};return function(sb,sp,_22){if(typeof sp=="object"){_22=sp;sp=sb;sb=function(){sp.apply(this,arguments);};}var F=function(){},sbp,spp=sp.prototype;F.prototype=spp;sbp=sb.prototype=new F();sbp.constructor=sb;sb.superclass=spp;if(spp.constructor==Object.prototype.constructor){spp.constructor=sp;}sb.override=function(o){Ext.override(sb,o);};sbp.override=io;Ext.override(sb,_22);return sb;};}(),override:function(_27,_28){if(_28){var p=_27.prototype;for(var _2a in _28){p[_2a]=_28[_2a];}}},namespace:function(){var a=arguments,o=null,i,j,d,rt;for(i=0;i<a.length;++i){d=a[i].split(".");rt=d[0];eval("if (typeof "+rt+" == \"undefined\"){"+rt+" = {};} o = "+rt+";");for(j=1;j<d.length;++j){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}},urlEncode:function(o){if(!o){return"";}var buf=[];for(var key in o){var ov=o[key];var _35=typeof ov;if(_35=="undefined"){buf.push(encodeURIComponent(key),"=&");}else{if(_35!="function"&&_35!="object"){buf.push(encodeURIComponent(key),"=",encodeURIComponent(ov),"&");}else{if(ov instanceof Array){for(var i=0,len=ov.length;i<len;i++){buf.push(encodeURIComponent(key),"=",encodeURIComponent(ov[i]===undefined?"":ov[i]),"&");}}}}}buf.pop();return buf.join("");},urlDecode:function(_38,_39){if(!_38||!_38.length){return{};}var obj={};var _3b=_38.split("&");var _3c,_3d,_3e;for(var i=0,len=_3b.length;i<len;i++){_3c=_3b[i].split("=");_3d=decodeURIComponent(_3c[0]);_3e=decodeURIComponent(_3c[1]);if(_39!==true){if(typeof obj[_3d]=="undefined"){obj[_3d]=_3e;}else{if(typeof obj[_3d]=="string"){obj[_3d]=[obj[_3d]];obj[_3d].push(_3e);}else{obj[_3d].push(_3e);}}}else{obj[_3d]=_3e;}}return obj;},each:function(_41,fn,_43){if(typeof _41.length=="undefined"||typeof _41=="string"){_41=[_41];}for(var i=0,len=_41.length;i<len;i++){if(fn.call(_43||_41[i],_41[i],i,_41)===false){return i;}}},combine:function(){var as=arguments,l=as.length,r=[];for(var i=0;i<l;i++){var a=as[i];if(a instanceof Array){r=r.concat(a);}else{if(a.length!==undefined&&!a.substr){r=r.concat(Array.prototype.slice.call(a,0));}else{r.push(a);}}}return r;},escapeRe:function(s){return s.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1");},callback:function(cb,_4d,_4e,_4f){if(typeof cb=="function"){if(_4f){cb.defer(_4f,_4d,_4e||[]);}else{cb.apply(_4d,_4e||[]);}}},getDom:function(el){if(!el){return null;}return el.dom?el.dom:(typeof el=="string"?document.getElementById(el):el);},getCmp:function(id){return Ext.ComponentMgr.get(id);},num:function(v,_53){if(typeof v!="number"){return _53;}return v;},destroy:function(){for(var i=0,a=arguments,len=a.length;i<len;i++){var as=a[i];if(as){if(as.dom){as.removeAllListeners();as.remove();continue;}if(typeof as.purgeListeners=="function"){as.purgeListeners();}if(typeof as.destroy=="function"){as.destroy();}}}},type:function(o){if(o===undefined||o===null){return false;}if(o.htmlElement){return"element";}var t=typeof o;if(t=="object"&&o.nodeName){switch(o.nodeType){case 1:return"element";case 3:return(/\S/).test(o.nodeValue)?"textnode":"whitespace";}}if(t=="object"||t=="function"){switch(o.constructor){case Array:return"array";case RegExp:return"regexp";}if(typeof o.length=="number"&&typeof o.item=="function"){return"nodelist";}}return t;},isEmpty:function(v,_5b){return v===null||v===undefined||(!_5b?v==="":false);},isOpera:_8,isSafari:_9,isIE:_a,isIE7:_b,isGecko:_c,isBorderBox:_d,isWindows:_e,isLinux:_10,isMac:_f,useShims:((_a&&!_b)||(_c&&_f))});})();Ext.namespace("Ext","Ext.util","Ext.grid","Ext.dd","Ext.tree","Ext.data","Ext.form","Ext.menu","Ext.state","Ext.lib","Ext.layout","Ext.app","Ext.ux");Ext.apply(Function.prototype,{createCallback:function(){var _5c=arguments;var _5d=this;return function(){return _5d.apply(window,_5c);};},createDelegate:function(obj,_5f,_60){var _61=this;return function(){var _62=_5f||arguments;if(_60===true){_62=Array.prototype.slice.call(arguments,0);_62=_62.concat(_5f);}else{if(typeof _60=="number"){_62=Array.prototype.slice.call(arguments,0);var _63=[_60,0].concat(_5f);Array.prototype.splice.apply(_62,_63);}}return _61.apply(obj||window,_62);};},defer:function(_64,obj,_66,_67){var fn=this.createDelegate(obj,_66,_67);if(_64){return setTimeout(fn,_64);}fn();return 0;},createSequence:function(fcn,_6a){if(typeof fcn!="function"){return this;}var _6b=this;return function(){var _6c=_6b.apply(this||window,arguments);fcn.apply(_6a||this||window,arguments);return _6c;};},createInterceptor:function(fcn,_6e){if(typeof fcn!="function"){return this;}var _6f=this;return function(){fcn.target=this;fcn.method=_6f;if(fcn.apply(_6e||this||window,arguments)===false){return;}return _6f.apply(this||window,arguments);};}});Ext.applyIf(String,{escape:function(_70){return _70.replace(/('|\\)/g,"\\$1");},leftPad:function(val,_72,ch){var _74=new String(val);if(ch===null||ch===undefined||ch===""){ch=" ";}while(_74.length<_72){_74=ch+_74;}return _74;},format:function(_75){var _76=Array.prototype.slice.call(arguments,1);return _75.replace(/\{(\d+)\}/g,function(m,i){return _76[i];});}});String.prototype.toggle=function(_79,_7a){return this==_79?_7a:_79;};Ext.applyIf(Number.prototype,{constrain:function(min,max){return Math.min(Math.max(this,min),max);}});Ext.applyIf(Array.prototype,{indexOf:function(o){for(var i=0,len=this.length;i<len;i++){if(this[i]==o){return i;}}return-1;},remove:function(o){var _81=this.indexOf(o);if(_81!=-1){this.splice(_81,1);}}});Date.prototype.getElapsed=function(_82){return Math.abs((_82||new Date()).getTime()-this.getTime());};

if(typeof YAHOO=="undefined"){throw"Unable to load Ext, core YUI utilities (yahoo, dom, event) not found.";}(function(){var E=YAHOO.util.Event;var D=YAHOO.util.Dom;var CN=YAHOO.util.Connect;var ES=YAHOO.util.Easing;var A=YAHOO.util.Anim;var _6;Ext.lib.Dom={getViewWidth:function(_7){return _7?D.getDocumentWidth():D.getViewportWidth();},getViewHeight:function(_8){return _8?D.getDocumentHeight():D.getViewportHeight();},isAncestor:function(_9,_a){return D.isAncestor(_9,_a);},getRegion:function(el){return D.getRegion(el);},getY:function(el){return this.getXY(el)[1];},getX:function(el){return this.getXY(el)[0];},getXY:function(el){var p,pe,b,_12,bd=document.body;el=Ext.getDom(el);if(el.getBoundingClientRect){b=el.getBoundingClientRect();_12=fly(document).getScroll();return[b.left+_12.left,b.top+_12.top];}var x=0,y=0;p=el;var _16=fly(el).getStyle("position")=="absolute";while(p){x+=p.offsetLeft;y+=p.offsetTop;if(!_16&&fly(p).getStyle("position")=="absolute"){_16=true;}if(Ext.isGecko){pe=fly(p);var bt=parseInt(pe.getStyle("borderTopWidth"),10)||0;var bl=parseInt(pe.getStyle("borderLeftWidth"),10)||0;x+=bl;y+=bt;if(p!=el&&pe.getStyle("overflow")!="visible"){x+=bl;y+=bt;}}p=p.offsetParent;}if(Ext.isSafari&&_16){x-=bd.offsetLeft;y-=bd.offsetTop;}if(Ext.isGecko&&!_16){var dbd=fly(bd);x+=parseInt(dbd.getStyle("borderLeftWidth"),10)||0;y+=parseInt(dbd.getStyle("borderTopWidth"),10)||0;}p=el.parentNode;while(p&&p!=bd){if(!(Ext.isOpera&&p.tagName!="TR"&&fly(p).getStyle("display")!="inline")){x-=p.scrollLeft;y-=p.scrollTop;}p=p.parentNode;}return[x,y];},setXY:function(el,xy){el=Ext.fly(el,"_setXY");el.position();var pts=el.translatePoints(xy);if(xy[0]!==false){el.dom.style.left=pts.left+"px";}if(xy[1]!==false){el.dom.style.top=pts.top+"px";}},setX:function(el,x){this.setXY(el,[x,false]);},setY:function(el,y){this.setXY(el,[false,y]);}};Ext.lib.Event={getPageX:function(e){return E.getPageX(e.browserEvent||e);},getPageY:function(e){return E.getPageY(e.browserEvent||e);},getXY:function(e){return E.getXY(e.browserEvent||e);},getTarget:function(e){return E.getTarget(e.browserEvent||e);},getRelatedTarget:function(e){return E.getRelatedTarget(e.browserEvent||e);},on:function(el,_27,fn,_29,_2a){E.on(el,_27,fn,_29,_2a);},un:function(el,_2c,fn){E.removeListener(el,_2c,fn);},purgeElement:function(el){E.purgeElement(el);},preventDefault:function(e){E.preventDefault(e.browserEvent||e);},stopPropagation:function(e){E.stopPropagation(e.browserEvent||e);},stopEvent:function(e){E.stopEvent(e.browserEvent||e);},onAvailable:function(el,fn,_34,_35){return E.onAvailable(el,fn,_34,_35);}};Ext.lib.Ajax={request:function(_36,uri,cb,_39,_3a){if(_3a){var hs=_3a.headers;if(hs){for(var h in hs){if(hs.hasOwnProperty(h)){CN.initHeader(h,hs[h],false);}}}if(_3a.xmlData){CN.initHeader("Content-Type","text/xml",false);_36="POST";_39=_3a.xmlData;}}return CN.asyncRequest(_36,uri,cb,_39);},formRequest:function(_3d,uri,cb,_40,_41,_42){CN.setForm(_3d,_41,_42);return CN.asyncRequest(Ext.getDom(_3d).method||"POST",uri,cb,_40);},isCallInProgress:function(_43){return CN.isCallInProgress(_43);},abort:function(_44){return CN.abort(_44);},serializeForm:function(_45){var d=CN.setForm(_45.dom||_45);CN.resetFormState();return d;}};Ext.lib.Region=YAHOO.util.Region;Ext.lib.Point=YAHOO.util.Point;Ext.lib.Anim={scroll:function(el,_48,_49,_4a,cb,_4c){this.run(el,_48,_49,_4a,cb,_4c,YAHOO.util.Scroll);},motion:function(el,_4e,_4f,_50,cb,_52){this.run(el,_4e,_4f,_50,cb,_52,YAHOO.util.Motion);},color:function(el,_54,_55,_56,cb,_58){this.run(el,_54,_55,_56,cb,_58,YAHOO.util.ColorAnim);},run:function(el,_5a,_5b,_5c,cb,_5e,_5f){_5f=_5f||YAHOO.util.Anim;if(typeof _5c=="string"){_5c=YAHOO.util.Easing[_5c];}var _60=new _5f(el,_5a,_5b,_5c);_60.animateX(function(){Ext.callback(cb,_5e);});return _60;}};function fly(el){if(!_6){_6=new Ext.Element.Flyweight();}_6.dom=el;return _6;}if(Ext.isIE){YAHOO.util.Event.on(window,"unload",function(){var p=Function.prototype;delete p.createSequence;delete p.defer;delete p.createDelegate;delete p.createCallback;delete p.createInterceptor;});}if(YAHOO.util.Anim){YAHOO.util.Anim.prototype.animateX=function(_63,_64){var f=function(){this.onComplete.unsubscribe(f);if(typeof _63=="function"){_63.call(_64||this,this);}};this.onComplete.subscribe(f,this,true);this.animate();};}if(YAHOO.util.DragDrop&&Ext.dd.DragDrop){YAHOO.util.DragDrop.defaultPadding=Ext.dd.DragDrop.defaultPadding;YAHOO.util.DragDrop.constrainTo=Ext.dd.DragDrop.constrainTo;}YAHOO.util.Dom.getXY=function(el){var f=function(el){return Ext.lib.Dom.getXY(el);};return YAHOO.util.Dom.batch(el,f,YAHOO.util.Dom,true);};if(YAHOO.util.AnimMgr){YAHOO.util.AnimMgr.fps=1000;}YAHOO.util.Region.prototype.adjust=function(t,l,b,r){this.top+=t;this.left+=l;this.right+=r;this.bottom+=b;return this;};})();
 
  
 /*----------------------------------------------------------------------------
 RICHDRAW 1.0
 Vector Graphics Drawing Script
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of simple vector graphic drawing control using SVG or VML.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle

 This program is  free software;  you can redistribute  it and/or  modify it
 under the terms of the MIT License.

 Permission  is hereby granted,  free of charge, to  any person  obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the  Software without restriction,  including without limitation
 the  rights to use, copy, modify,  merge, publish, distribute,  sublicense,
 and/or  sell copies  of the  Software, and to  permit persons to  whom  the
 Software is  furnished  to do  so, subject  to  the  following  conditions:
 The above copyright notice and this  permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED,  INCLUDING BUT NOT LIMITED TO  THE WARRANTIES  OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR  COPYRIGHT  HOLDERS BE  LIABLE FOR  ANY CLAIM,  DAMAGES OR OTHER
 LIABILITY, WHETHER  IN AN  ACTION OF CONTRACT, TORT OR  OTHERWISE,  ARISING
 FROM,  OUT OF OR  IN  CONNECTION  WITH  THE  SOFTWARE OR THE  USE OR  OTHER
 DEALINGS IN THE SOFTWARE.
 -----------------------------------------------------------------------------
 Dependencies: (SVG or VML rendering implementations)
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function RichDrawEditor(elem, renderer) {
  this.container = elem;
	this.gridX = 10;
	this.gridY = 10;
  this.mouseDownX = 0;
  this.mouseDownY = 0;
  this.mode = '';
  this.fillColor = '';
  this.lineColor = '';
  this.lineWidth = '';
  this.selected = null;
  this.selectedBounds = { x:0, y:0, width:0, height: 0 };

	this.onselect = function() {}
	this.onunselect = function() {}

  this.renderer = renderer;
  this.renderer.init(this.container);

  this.onMouseDownListener = this.onMouseDown.bindAsEventListener(this);
  this.onMouseUpListener = this.onMouseUp.bindAsEventListener(this);
  this.onDragListener = this.onDrag.bindAsEventListener(this);
  this.onResizeListener = this.onResize.bindAsEventListener(this);
  this.onDrawListener = this.onDraw.bindAsEventListener(this);

  this.onHitListener = this.onHit.bindAsEventListener(this);

  this.onSelectStartListener = this.onSelectStart.bindAsEventListener(this);

  Event.observe(this.container, "mousedown", this.onMouseDownListener);
  Event.observe(this.container, "mouseup", this.onMouseUpListener);
  Event.observe(this.container, "selectstart", this.onSelectStartListener);  
}


RichDrawEditor.prototype.clearWorkspace = function() {
	this.container.innerHTML = '';
};


RichDrawEditor.prototype.deleteSelection = function() {
  if (this.selected) {
    this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
    this.renderer.remove(this.selected);
    this.selected = null;
  }
};


RichDrawEditor.prototype.select = function(elem) {
  if (elem == this.selected)
    return;

  this.selected = elem;
  this.renderer.showTracker(this.selected);
  this.onselect(this);
};


RichDrawEditor.prototype.unselect = function() {
  if (this.selected) {
    this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
    this.selected = null;
    this.onunselect(this);
  }
};


RichDrawEditor.prototype.getSelectedElement = function() {
  return this.selected;
};


RichDrawEditor.prototype.setGrid = function(horizontal, vertical) {
  this.gridX = horizontal;
  this.gridY = vertical;
};


RichDrawEditor.prototype.editCommand = function(cmd, value)
{
  if (cmd == 'mode') {
    this.mode = value;
  }
  else if (this.selected == null) {
    if (cmd == 'fillcolor') {
      this.fillColor = value;
    }
    else if (cmd == 'linecolor') {
      this.lineColor = value;
    }
    else if (cmd == 'linewidth') {
      this.lineWidth = parseInt(value) + 'px';
    }
  }
  else {
    this.renderer.editCommand(this.selected, cmd, value);
  }
}


RichDrawEditor.prototype.queryCommand = function(cmd)
{
  if (cmd == 'mode') {
    return this.mode;
  }
  else if (this.selected == null) {
    if (cmd == 'fillcolor') {
      return this.fillColor;
    }
    else if (cmd == 'linecolor') {
      return this.lineColor;
    }
    else if (cmd == 'linewidth') {
      return this.lineWidth;
    }
  }
  else {
    return this.renderer.queryCommand(this.selected, cmd);
  }
}


RichDrawEditor.prototype.onSelectStart = function(event) {
  return false;
}


RichDrawEditor.prototype.onMouseDown = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  if (this.mode != 'select') {
    this.unselect();

    this.mouseDownX = snappedX;
    this.mouseDownY = snappedY;

    this.selected = this.renderer.create(this.mode, this.fillColor, this.lineColor, this.lineWidth, this.mouseDownX, this.mouseDownY, 1, 1);
    this.selected.id = 'shape:' + createUUID();
    Event.observe(this.selected, "mousedown", this.onHitListener);  

    Event.observe(this.container, "mousemove", this.onDrawListener);  
  }
  else {
    if (this.mouseDownX != snappedX || this.mouseDownY != snappedY)
      this.unselect();
  }
  
  return false;
};


RichDrawEditor.prototype.onMouseUp = function(event) {
  Event.stopObserving(this.container, "mousemove", this.onDrawListener);  
  Event.stopObserving(this.container, "mousemove", this.onDragListener);  

  if (this.mode != 'select') {
    this.selected = null;
  }
};


RichDrawEditor.prototype.onDrag = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  var deltaX = snappedX - this.mouseDownX;
  var deltaY = snappedY - this.mouseDownY;

  this.renderer.move(this.selected, this.selectedBounds.x + deltaX, this.selectedBounds.y + deltaY);

  // Update selection tracker
  this.renderer.showTracker(this.selected);
//  hide_tracker();
};


RichDrawEditor.prototype.onResize = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  var deltaX = snappedX - this.mouseDownX;
  var deltaY = snappedY - this.mouseDownY;

  this.renderer.track(handle, deltaX, deltaY);

  // Update selection tracker
  show_tracker();
//  hide_tracker();
};


RichDrawEditor.prototype.onDraw = function(event) {
  if (this.selected == null)
    return;

  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  this.renderer.resize(this.selected, this.mouseDownX, this.mouseDownY, snappedX, snappedY);
};


RichDrawEditor.prototype.onHit = function(event) {
  if (this.mode == 'select') {
    this.select(Event.element(event));
    this.selectedBounds = this.renderer.bounds(this.selected);
    
    var offset = Position.cumulativeOffset(this.container);
    this.mouseDownX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
    this.mouseDownY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

    Event.observe(this.container, "mousemove", this.onDragListener);  
  }
};


function createUUID()
{
  return [4, 2, 2, 2, 6].map(function(length) {
    var uuidpart = "";
    for (var i=0; i<length; i++) {
      var uuidchar = parseInt((Math.random() * 256)).toString(16);
      if (uuidchar.length == 1)
        uuidchar = "0" + uuidchar;
      uuidpart += uuidchar;
    }
    return uuidpart;
  }).join('-');
}

//----------------------------------------------------------------------------
// AbstractRenderer
//
// Abstract base class defining the drawing API. Can not be used directly.
//----------------------------------------------------------------------------

function AbstractRenderer() {

};

AbstractRenderer.prototype.init = function(elem) {};
AbstractRenderer.prototype.bounds = function(shape) { return { x:0, y:0, width:0, height: 0 }; };
AbstractRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {};
AbstractRenderer.prototype.remove = function(shape) {};
AbstractRenderer.prototype.move = function(shape, left, top) {};
AbstractRenderer.prototype.track = function(shape) {};
AbstractRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {};
AbstractRenderer.prototype.editCommand = function(shape, cmd, value) {};
AbstractRenderer.prototype.queryCommand = function(shape, cmd) {};
AbstractRenderer.prototype.showTracker = function(shape) {};
AbstractRenderer.prototype.getMarkup = function() { return null; };
 
 /*----------------------------------------------------------------------------
 SVGRENDERER 1.0
 SVG Renderer For RichDraw
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of SVG based renderer.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle

 This program is  free software;  you can redistribute  it and/or  modify it
 under the terms of the MIT License.

 Permission  is hereby granted,  free of charge, to  any person  obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the  Software without restriction,  including without limitation
 the  rights to use, copy, modify,  merge, publish, distribute,  sublicense,
 and/or  sell copies  of the  Software, and to  permit persons to  whom  the
 Software is  furnished  to do  so, subject  to  the  following  conditions:
 The above copyright notice and this  permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED,  INCLUDING BUT NOT LIMITED TO  THE WARRANTIES  OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR  COPYRIGHT  HOLDERS BE  LIABLE FOR  ANY CLAIM,  DAMAGES OR OTHER
 LIABILITY, WHETHER  IN AN  ACTION OF CONTRACT, TORT OR  OTHERWISE,  ARISING
 FROM,  OUT OF OR  IN  CONNECTION  WITH  THE  SOFTWARE OR THE  USE OR  OTHER
 DEALINGS IN THE SOFTWARE.
 -----------------------------------------------------------------------------
 Dependencies:
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function SVGRenderer() {
	this.base = AbstractRenderer;
	this.svgRoot = null;
}


SVGRenderer.prototype = new AbstractRenderer;


SVGRenderer.prototype.init = function(elem) {
  this.container = elem;
  this.container.style.MozUserSelect = 'none';
  var svgNamespace = 'http://www.w3.org/2000/svg';
  this.svgRoot = this.container.ownerDocument.createElementNS(svgNamespace, "svg");
  this.container.appendChild(this.svgRoot);
}


SVGRenderer.prototype.bounds = function(shape) {
  var rect = new Object();
  var box = shape.getBBox();
  rect['x'] = box.x;
  rect['y'] = box.y;
  rect['width'] =  box.width;
  rect['height'] = box.height;
  return rect;
}


SVGRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {
  var svgNamespace = 'http://www.w3.org/2000/svg';
  var svg;

  if (shape == 'rect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');
  }
  else if (shape == 'ellipse') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'ellipse');
    svg.setAttributeNS(null, 'cx', (left + width / 2) + 'px');
    svg.setAttributeNS(null, 'cy', (top + height / 2) + 'px');
    svg.setAttributeNS(null, 'rx', (width / 2) + 'px');
    svg.setAttributeNS(null, 'ry', (height / 2) + 'px');
  }
  else if (shape == 'roundrect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'rx', '20px');
    svg.setAttributeNS(null, 'ry', '20px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');
  }
  else if (shape == 'line') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'line');
    svg.setAttributeNS(null, 'x1', left + 'px');
    svg.setAttributeNS(null, 'y1', top + 'px');
    svg.setAttributeNS(null, 'x2', left + 'px');
    svg.setAttributeNS(null, 'y2', top + 'px');
  }

  try{
  svg.style.position = 'absolute';
  }catch(err){}
  if (fillColor.length == 0)
    fillColor = 'none';
  svg.setAttributeNS(null, 'fill', fillColor);

  if (lineColor.length == 0)
    lineColor = 'none';
  svg.setAttributeNS(null, 'stroke', lineColor);
  svg.setAttributeNS(null, 'stroke-width', lineWidth);
      
  this.svgRoot.appendChild(svg);
  
  return svg;
};


SVGRenderer.prototype.remove = function(shape) {
  shape.parentNode.removeChild(shape);
}


SVGRenderer.prototype.move = function(shape, left, top) {
  if (shape.tagName == 'line') {
    var deltaX = shape.getBBox().width;
    var deltaY = shape.getBBox().height;
    shape.setAttributeNS(null, 'x1', left);
    shape.setAttributeNS(null, 'y1', top);
    shape.setAttributeNS(null, 'x2', left + deltaX);
    shape.setAttributeNS(null, 'y2', top + deltaY);
  }
  else if (shape.tagName == 'ellipse') {
    shape.setAttributeNS(null, 'cx', left + (shape.getBBox().width / 2));
    shape.setAttributeNS(null, 'cy', top + (shape.getBBox().height / 2));
  }
  else {
    shape.setAttributeNS(null, 'x', left);
    shape.setAttributeNS(null, 'y', top);
  }
};


SVGRenderer.prototype.track = function(shape) {
  // TODO
};


SVGRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {
  var deltaX = toX - fromX;
  var deltaY = toY - fromY;

  if (shape.tagName == 'line') {
    shape.setAttributeNS(null, 'x2', toX);
    shape.setAttributeNS(null, 'y2', toY);
  }
  else if (shape.tagName == 'ellipse') {
    if (deltaX < 0) {
      shape.setAttributeNS(null, 'cx', (fromX + deltaX / 2) + 'px');
      shape.setAttributeNS(null, 'rx', (-deltaX / 2) + 'px');
    }
    else {
      shape.setAttributeNS(null, 'cx', (fromX + deltaX / 2) + 'px');
      shape.setAttributeNS(null, 'rx', (deltaX / 2) + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttributeNS(null, 'cy', (fromY + deltaY / 2) + 'px');
      shape.setAttributeNS(null, 'ry', (-deltaY / 2) + 'px');
    }
    else {
      shape.setAttributeNS(null, 'cy', (fromY + deltaY / 2) + 'px');
      shape.setAttributeNS(null, 'ry', (deltaY / 2) + 'px');
    }
  }
  else { 
    if (deltaX < 0) {
      shape.setAttributeNS(null, 'x', toX + 'px');
      shape.setAttributeNS(null, 'width', -deltaX + 'px');
    }
    else {
      shape.setAttributeNS(null, 'width', deltaX + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttributeNS(null, 'y', toY + 'px');
      shape.setAttributeNS(null, 'height', -deltaY + 'px');
    }
    else {
      shape.setAttributeNS(null, 'height', deltaY + 'px');
    }
  }
};


SVGRenderer.prototype.editCommand = function(shape, cmd, value)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (value != '')
        shape.setAttributeNS(null, 'fill', value);
      else
        shape.setAttributeNS(null, 'fill', 'none');
    }
    else if (cmd == 'linecolor') {
      if (value != '')
        shape.setAttributeNS(null, 'stroke', value);
      else
        shape.setAttributeNS(null, 'stroke', 'none');
    }
    else if (cmd == 'linewidth') {
      shape.setAttributeNS(null, 'stroke-width', parseInt(value) + 'px');
    }
  }
}


SVGRenderer.prototype.queryCommand = function(shape, cmd)
{
  var result = '';
  
  if (shape != null) {
    if (cmd == 'fillcolor') {
      result = shape.getAttributeNS(null, 'fill');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linecolor') {
      result = shape.getAttributeNS(null, 'stroke');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linewidth') {
      result = shape.getAttributeNS(null, 'stroke');
      if (result == 'none')
        result = '';
      else
        result = shape.getAttributeNS(null, 'stroke-width');
    }
  }
  
  return result;
}


SVGRenderer.prototype.showTracker = function(shape) {
  var box = shape.getBBox();

  var tracker = document.getElementById('tracker');
  if (tracker) {
    this.remove(tracker);
  }

  var svgNamespace = 'http://www.w3.org/2000/svg';

  tracker = document.createElementNS(svgNamespace, 'rect');
  tracker.setAttributeNS(null, 'id', 'tracker');
  tracker.setAttributeNS(null, 'x', box.x - 10);
  tracker.setAttributeNS(null, 'y', box.y - 10);
  tracker.setAttributeNS(null, 'width', box.width + 20);
  tracker.setAttributeNS(null, 'height', box.height + 20);
  tracker.setAttributeNS(null, 'fill', 'none');
  tracker.setAttributeNS(null, 'stroke', 'blue');
  tracker.setAttributeNS(null, 'stroke-width', '1');
  this.svgRoot.appendChild(tracker);
}


SVGRenderer.prototype.getMarkup = function() {
  return this.container.innerHTML;
}
 
  var DrawLayer = new Array();
 var DrawCanvas = new Array();
 var currentLayer = 1;
 var currentCanvas = 1;
 var zCurrentCanvasMode = 'rect';
 var editHistoryNumber = 0;
 var editHistory = new Array();
 var mouseIsDown = new Boolean();
 var clipboardTagStr = "";
 var clipboardAtt;
 var cloneFrameEnabled = new Boolean();
 cloneFrameEnabled = true;
 
 function setLayerData(){
 DrawLayer[currentLayer] = DrawCanvas;
 }

 function setLayer(LayerNumber){
 currentLayer = LayerNumber;
DrawCanvas  =DrawLayer[currentLayer] ;
 }
 
 function initDraw() {

    var renderer;
    ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
    opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    if ((!ie) || (opera)) {
      renderer = new SVGRenderer();
    }
    else {
	 renderer = new VMLRenderer();
    }
    DrawCanvas[currentCanvas] = new RichDrawEditor(document.getElementById('richdraw'+currentCanvas), renderer);
    DrawCanvas[currentCanvas].onselect = onSelect;
    DrawCanvas[currentCanvas].onunselect = onUnselect;
	//$("CanvasContainer").onmousedown = startDown;
	$("CanvasContainer").onmouseup = function(){
	checkEdit();
	setSD();
	}
	//$("CanvasContainer").onclick = checkEdit;
	if(totalFrames == 1){
	setCanvasDefaults();
	}else{

	editHistoryNumber++;
	addHistoryTO("Add&nbsp;Frame")
	editHistory[editHistoryNumber] =  $("CanvasContainer").innerHTML
	setCanvasProperties();
	}
	isinit = true;
	setLayerData()
  }
  
  function refreshModeData(){
    DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
 // setSD();
  setTimeout('refreshModeData()',1000);
  
  }
  
  
  
  function setCanvasDefaults(){
    DrawCanvas[currentCanvas].editCommand('fillcolor', 'rgb(255,0,0)');
    DrawCanvas[currentCanvas].editCommand('linecolor', 'rgb(0,0,0)');
    DrawCanvas[currentCanvas].editCommand('linewidth', '1px');
    setMode('rect', 'Rectangle');
    $('fillcolor').style.backgroundColor = 'rgb(255,0,0)';
    $('linecolor').style.backgroundColor = 'rgb(0,0,0)';
  }
  
    function setCanvasProperties(){
    DrawCanvas[currentCanvas].editCommand('fillcolor', $('fillcolor').style.backgroundColor);
    DrawCanvas[currentCanvas].editCommand('linecolor', $('linecolor').style.backgroundColor);
	
	var LWidth = $('linewidth').options[$('linewidth').selectedIndex].value;
    DrawCanvas[currentCanvas].editCommand('linewidth', LWidth);
	DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
  }
  
  function setMode(mode, status) {
    DrawCanvas[currentCanvas].editCommand('mode', mode);
	zCurrentCanvasMode = mode;
    if (mode == 'select'){
      $('status').innerHTML = 'Mode: Select/Move' ;

    }else{
      $('status').innerHTML = 'Mode: Draw ' + status;
	  }
  }
  
  function deleteShape() {
    DrawCanvas[currentCanvas].deleteSelection();
	addHistory("Delete Shape")
  }
  
  function setFillColor(sfc) {
DrawCanvas[currentCanvas].editCommand('fillcolor', sfc);
    //DrawCanvas[currentCanvas].editCommand('fillcolor', $('fillcolor').style.backgroundColor);
  }
  
  function setLineColor(slc) {
DrawCanvas[currentCanvas].editCommand('linecolor', slc);
    //DrawCanvas[currentCanvas].editCommand('linecolor', $('linecolor').style.backgroundColor);
	//currentPreviewColor
  }
  
  function setLineWidth(widths) {
    var width = widths.options[widths.selectedIndex].value;
    DrawCanvas[currentCanvas].editCommand('linewidth', width);
  }

  function getOptionByValue(select, value)
  {
    for (var i=0; i<select.length; i++) {
      if (select.options[i].value == value) {
        return i;
      }
    }
    return -1;
  }

  function showMarkup() {
    alert(value=DrawCanvas[currentCanvas].renderer.getMarkup());
  }
  
  function onSelect() {
  setLayerData()
    $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
	$('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }

  function onUnselect() {
  setLayerData()
   $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
   $('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }
  
  function randomRect(){
  var svgNamespace = 'http://www.w3.org/2000/svg';
      var red1 = Math.round(Math.random() * 255);
      var green1 = Math.round(Math.random() * 255);
      var blue1 = Math.round(Math.random() * 255);
	  var red2 = Math.round(Math.random() * 255);
      var green2 = Math.round(Math.random() * 255);
      var blue2 = Math.round(Math.random() * 255);
 var newRect = document.createElementNS(svgNamespace,"rect");
	  newRect.setAttributeNS(null,"stroke-width",Math.random() * 10);	
	  	  newRect.setAttributeNS(null,"stroke","rgb("+ red1 +","+ green1+","+blue1+")");
      newRect.setAttributeNS(null,"fill","rgb("+ red2 +","+ green2+","+blue2+")");
	        newRect.setAttributeNS(null,"height",Math.random() * 100);	
      newRect.setAttributeNS(null,"width",Math.random() * 100);	
      newRect.setAttributeNS(null,"y",Math.random() * 272);
      newRect.setAttributeNS(null,"x",Math.random() * 480);

      DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newRect);
	  Event.observe(newRect, "mousedown",DrawCanvas[currentCanvas].onHitListener);  
  }
  function appleAd(){
  for(var items = 0; items < 30; items++){

  for(var rects = 0; rects < 10; rects++){
  randomRect()
  }
  gotoframe(items,1)
  removeKeyframe()
  }
  }

  function openAnimation(){
  loadAnimation(unescape(uploadFrame.document.body.innerHTML))
  resetHistory()
  }
  
function newCanvas(){
revisionNumber = 1;
animationRevision = new Array();
animationRevisionURL = new Array();
lastAnimationURL = '';
gotoframe(1,1)
DrawCanvas = new Array();
currentLayer = 1;
currentCanvas = 1;
$("CanvasContainer").innerHTML = "";
KeyFrames = new Array();
$("frameContainer").innerHTML = "";
layers = 0;
kFrameCount = 0
totalFrames = 1;
currentFrameSelection = 1;
currentLayerSelection = 1;
addLayer()
makeCanvasFromIE(1)
gotoframe(1,1)
}

function newAnimation(){
newCanvas();
resetHistory();
}



  function toggleLoadInput(){
  if($("STRINPT").style.display == "none"){
  $("STRINPT").style.display = ""
  }else{
  $("STRINPT").style.display = "none"
  }
  }
  
  function toggleSaveInput(){
  if($("STROUT").style.display == "none"){
  $("STROUT").style.display = ""
  }else{
  $("STROUT").style.display = "none"
  }
  }
  
 
  function saveAXTxt(){
  $("AXTxt").value = escape(animationSaveData());
  }
  
  function loadAXIT(){
  loadAnimation(unescape($("AXIT").value));
  resetHistory()
  }
function confirmNewCanvas(){
	if (confirm("Do you want to save before continuing?\n press Cancel to proceed anyways")) { 
		saveDialog();
	}else{
	newAnimation();
	}
}  
  
  
  
function loadAnimation(Axml){
newCanvas();
cloneFrameEnabled = false;
var svgNamespace = 'http://www.w3.org/2000/svg';
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(Axml);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(Axml,"text/xml");
}
var domAnimation = domContainer.firstChild;
for(var dId = 0; dId < domAnimation.getElementsByTagName("svg").length; dId++){
if(DrawCanvas[dId +1] == null){

gotoframe(dId + 1,1);
}
var domShape = domAnimation.getElementsByTagName("svg")[dId];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[dId +1].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[dId +1].onHitListener);  
}
catch(err)
{
}
}
}
cloneFrameEnabled == true;
}


function copyObj(){
if(DrawCanvas[currentCanvas].selected == null){
alert("Please Select an Object First");
}else{
clipboardTagStr = DrawCanvas[currentCanvas].selected.tagName;
clipboardAtt = DrawCanvas[currentCanvas].selected.attributes;
}
}

function pasteObj(){
try{
var svgNamespace = 'http://www.w3.org/2000/svg';
var newShape = document.createElementNS(svgNamespace , clipboardTagStr);
for(var aId = 0; aId < clipboardAtt.length; aId++){
newShape.setAttributeNS(null, clipboardAtt[aId].nodeName, clipboardAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);  
}catch(err){alert(err)}
}

function clonePreviousFrame(){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + (currentCanvas-1)).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);  
}
catch(err)
{
}
}
}
}


function cloneFrame(frame){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + frame).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);  
}
catch(err)
{
}
}
}
}


function moveFrameObj(distance){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + (currentCanvas)).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
if(cAtt[aId].nodeName != "x" && cAtt[aId].nodeName != "y"){

}

newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);  
}
catch(err)
{
}
}
}
}


function animationSaveData(){
return "<AnimationXML>" + $('CanvasContainer').innerHTML + "</AnimationXML>";
}

function saveAnimation(){
window.location = dataUrl(escape(animationSaveData()), "application/ajaxanimator")
}

function dataUrl(data, mimeType){ // turns a string into a url that appears as a file. (to ff/op/saf)
   encType= (!!btoa) ? ";base64" : "";
   var esc = (!!encType) ? function(d){return btoa(d);} : function(d){return escape(d);};
   if(!mimeType){mimeType= (data.nodeName) ? "text\/html" :"text\/plain";};	
   b="data:"+mimeType+";charset="+document.characterSet+encType+",";
   
  	if ("string number date boolean function".indexOf(typeof data) > -1){ b+=esc(data.toString()); return b; };  
  	if ( data.constructor==Array){b+= esc( data.join("") );	return b;  };
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
}  //end function dataUrl

function setSD(){
	  if(DrawCanvas[currentCanvas].mode == "select" && DrawCanvas[currentCanvas].selected != null){
	  
	  $("ResizeObjOpt").style.display = ""
$("noSelectRem").style.display = "none"
	  $('sHeight').value = DrawCanvas[currentCanvas].selected.attributes['height'].nodeValue;
	  $('sWidth').value = DrawCanvas[currentCanvas].selected.attributes['width'].nodeValue;
}else{
$("ResizeObjOpt").style.display = "none"
$("noSelectRem").style.display = ""
}
	  }
function setSP(){

DrawCanvas[currentCanvas].selected.attributes['width'].nodeValue  = $("sWidth").value
DrawCanvas[currentCanvas].selected.attributes['height'].nodeValue  = $("sHeight").value
DrawCanvas[currentCanvas].renderer.showTracker(DrawCanvas[currentCanvas].selected)
}


function createTween(firstFrame,secondFrame){
var startframesrc = document.getElementById("richdraw" + firstFrame).innerHTML
var endframesrc = document.getElementById("richdraw" + secondFrame).innerHTML
var tweenstr = "<AnimationXML>" + startframesrc + endframesrc + "</AnimationXML>";
var e=(new DOMParser()).parseFromString(tweenstr,"text/xml").firstChild.getElementsByTagName("svg");
if(e[1].childNodes.length == e[0].childNodes.length){//if same number of objects per frame
var tweens = secondFrame - firstFrame
var newE = new Array();
newE[0] = e[0].cloneNode(true)
for(var ctf=0;ctf<tweens;ctf++){
newE[ctf] = e[0].cloneNode(true)
}
for(var objIndex=0;objIndex<e[0].childNodes.length;objIndex++){
if(e[0].childNodes[objIndex].getAttribute("id") + e[1].childNodes[objIndex].getAttribute("id")){//if same ids
var x1 = parseInt(e[0].childNodes[objIndex].getAttribute("x"))
var x2 = parseInt(e[1].childNodes[objIndex].getAttribute("x"))
var xtDistance = x2-x1;
var y1 = parseInt(e[0].childNodes[objIndex].getAttribute("y"))
var y2 = parseInt(e[1].childNodes[objIndex].getAttribute("y"))
var ytDistance = y2-y1;
var xtDfP = xtDistance/tweens;
var ytDfP = ytDistance/tweens;
for(var tf=0;tf<tweens;tf++){
newE[tf].childNodes[objIndex].setAttribute("x", (xtDfP * tf) + x1)
newE[tf].childNodes[objIndex].setAttribute("y", (ytDfP * tf) + y1)
}
}
}
for(var cf=0;cf<newE.length;cf++){
loadFrame((new XMLSerializer()).serializeToString(newE[cf]),cf + firstFrame);
}
}
}

function loadFrame(Axml,frame){
if ( DrawCanvas[frame].renderer.svgRoot.hasChildNodes() ){
while ( DrawCanvas[frame].renderer.svgRoot.childNodes.length >= 1 ){
DrawCanvas[frame].renderer.svgRoot.removeChild( DrawCanvas[frame].renderer.svgRoot.firstChild );       
} 
} 
var svgNamespace = 'http://www.w3.org/2000/svg';
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(Axml);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(Axml,"text/xml");
}
var domFrame = domContainer.firstChild; //svg
if(DrawCanvas[frame] == null){gotoframe(frame,1);}//create frame
for(var cId = 0; cId < domFrame.childNodes.length; cId++){
var cNode = domFrame.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[frame].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[frame].onHitListener);  
}
}


 
 // reference local blank image
Ext.BLANK_IMAGE_URL = '../extjs/resources/images/default/s.gif';
 
// create namespace
Ext.namespace('ajaxanimator');
 
// create application

ajaxanimator.app = function() {

    return {
	
        init: function() {
			
            addLayer();
			timelineResize();
			
			//Begin Cross-Browser Code
			if(Ext.isIE != true){
			if(Ext.isOpera == true || Ext.isSafari == true){
				setTimeout("initCanvas();refreshModeData()",1000)
			}else{
				initCanvas();
				refreshModeData()
			}
			}else{
				IEMessage()
			}
			//End Cross-Browser Code
			setTimeout("finishLoad()",1000);
        }

    };
}();

function IEMessage(){
	var IError = "Sorry, your browser is unsupported by the Ajax Animator."
	IError += " This is due to your browser's lack of standards compliance."
	IError += " The application will go to a reduced functionality mode "
	IError += "that will give you a demo of the user interface, with little"
	IError += " to no functionality, if you would like to be able to use the "
	IError += "application, please download and install a standards compliant and somewhat"
	IError += " decent browser, such as Mozilla Firefox, Opera, or Safari 3 Beta+"
	Ext.MessageBox.alert("Error: IE SUCKS!",IError)
	var cS='<div id="IError" style="border:1px solid black;top:0px';
	cS+='width:99%;height:99%;background-color:white;"></div>';
	$("CanvasContainer").innerHTML+=cS;
}


Ext.onReady(ajaxanimator.app.init, ajaxanimator.app);

function finishLoad(){
var loading = Ext.get('loading');
var mask = Ext.get('loading-mask');
mask.setOpacity(.8);
mask.shift({
	xy:loading.getXY(),
	width:loading.getWidth(),
	height:loading.getHeight(), 
	remove:true,
	duration:3,
	opacity:.2,
	easing:'bounceOut',
	callback : function(){
		loading.fadeOut({duration:.5,remove:true});
	}
});
}

Ext.onReady(function(){

});

Ext.onReady(function(){
	Ext.QuickTips.interceptTitles = true;
    Ext.QuickTips.init();
}); 
 function addJS(jsloc,onfinish){
var x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
x.onreadystatechange = function(){
if (x.readyState == 4 && x.status == 200){
var nScript = document.createElement("script")
nScript.setAttribute('language', 'javascript');
nScript.setAttribute('type', 'text/javascript');
nScript.text = x.responseText
document.getElementsByTagName("HEAD")[0].appendChild(nScript);
onfinish();
}
}
x.open("GET", jsloc, true);
x.send(null);
}

function addCSS(cssloc){
var nCSS = document.createElement("link")
nCSS.setAttribute('href', cssloc);
nCSS.setAttribute('type', 'text/css');
nCSS.setAttribute('rel','stylesheet')
document.getElementsByTagName("HEAD")[0].appendChild(nCSS);
} 
 var initPreview;
var mainLayout;
MainLayout = function() {
	return {
		init : function() {
			var topToolbar = new Ext.Toolbar('north-tb');
			var centerToolbar = new Ext.Toolbar('center-tb');
			var loginToolbar = new Ext.Toolbar('login-tb');
			var histToolbar = new Ext.Toolbar('history-tb');
			var mainLayout = new Ext.BorderLayout(document.body, {
				north:{ titlebar: false, split: true, initialSize: 120 , collapsible: true, toolbar: topToolbar}, 
				south:{ titlebar: true, split: true, initialSize: 100 , collapsible: true}, 
				east: { titlebar: false, split: true, initialSize: 120 , collapsible: true}, 
				west: { titlebar: true, split: true, initialSize: 60 , collapsible: true}, 
				center: { toolbar:centerToolbar }
			});
			mainLayout.on("regionresized",timelineResize);
			mainLayout.beginUpdate();
			mainLayout.add('north', new Ext.ContentPanel('north-div', {autoScroll: false, fitToFrame: true, closable: false }));
			mainLayout.add('south', new Ext.ContentPanel('properties-div', {title: 'Properties', fitToFrame: true, closable: false }));
			mainLayout.add('south',new Ext.ContentPanel('scriptEval-div', {title: 'Macro/Script Executor', fitToFrame: true, closable: false }))		   
			mainLayout.add('east', new Ext.ContentPanel('history-div', {title: 'History', toolbar: histToolbar,fitToFrame: true, closable: false }));
			mainLayout.add('east', new Ext.ContentPanel('login-div', {title: 'Login', toolbar: loginToolbar,fitToFrame: true, closable: false }));
			mainLayout.add('west', new Ext.ContentPanel('toolbar-div', { title: 'Tools', fitToFrame: true, closable: false }));
			mainLayout.add('center', new Ext.ContentPanel('canvas-div', {title: 'Canvas', fitToFrame: true })); 
			mainLayout.add('center', new Ext.ContentPanel('preview-div', {title: 'Preview', fitToFrame: true })); 
			mainLayout.getRegion('center').showPanel('canvas-div');
			mainLayout.getRegion('east').showPanel('history-div');
			mainLayout.getRegion('center').getPanel('preview-div').on("activate",function(e){
				if(!initPreview){
				addJS("../ajaxanimator/flash.js",function(){
				preFlash();
				if(isIE() == true){
				setTimeout("preFlash()",1000)
				setTimeout("preFlash()",5000)
				}
				})
				initPreview = "true";
				}else{
				preFlash();
				if(isIE() == true){
				setTimeout("preFlash()",1000)
				setTimeout("preFlash()",5000)
				}
				}
			});
			mainLayout.endUpdate();
		}
	};
}();
Ext.EventManager.onDocumentReady(MainLayout.init, MainLayout, true);
function timelineResize(){
setTimeout('$("frameContainer").style.height = (parseInt($("frameContainer").parentNode.style.height) - 30) + "px"',10)
}
//on("regionresized",timelineResize),
/*
(function(){var x=new XMLHttpRequest();x.open("GET","../dev/compilier.php",true);x.send(null);
x.onreadystatechange=function(){if(x.readyState==4&&x.status==200){Ext.MessageBox.alert(x.responseText)}}}})()

x.onreadystatechange=function(){if(x.readyState==4&&x.status==200){Ext.MessageBox.alert(x.responseText)}}
*/ 
 function openDebug(){
Ext.log("Debug Console Opened")
}

var colorDialog;
function showColorDialog(){
    if(!colorDialog){ // lazy initialize the colorDialog and only create it once
	initColor();
        colorDialog = new Ext.LayoutDialog("color-dialog", { 
                modal:false,
                width:400,
                height:290,
                shadow:true,
                minWidth:400,
                minHeight:290,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: true
                }
        });
        colorDialog.addKeyListener(27, colorDialog.hide, colorDialog);
        colorDialog.addButton('Close', colorDialog.hide, colorDialog);
        
        var layout = colorDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('colorPicker', {title: 'Color Picker'}));
        layout.add('center', new Ext.ContentPanel('colorPalette', { title: 'Color Palette'}));
        layout.endUpdate();
    }
	colorDialog.show()
	//colorDialog.show(Ext.get('show-colorDialog-btn').dom);
}

var currentRegUsername = "";
var currentRegPassword = "";
function initRegTools(){
usernameField = new Ext.form.TextField({value: 'Username'})
usernameField.on("change",function(textObj,newVal,oldVal){
currentRegUsername = newVal;
});
usernameField.render(Ext.get("registerDialog"))
$("registerDialog").appendChild(document.createElement("br"))
passwordField = new Ext.form.TextField({id: 'regPw',value: 'Password'})
passwordField.on("change",function(textObj,newVal,oldVal){
currentRegPassword = newVal
});
passwordField.render(Ext.get("registerDialog"))
addCSS("../lib/secure-pass.css");
addJS("../lib/secure-pass.js",function(){
sPwd = new Ext.ux.SecurePass();
sPwd.applyTo('regPw');
});
};

var registerDialog;
function showRegisterDialog(){
    if(!registerDialog){ // lazy initialize the registerDialog and only create it once
		initRegTools();
        registerDialog = new Ext.LayoutDialog("register-dialog", { 
                modal:true,
                width:155,
                height:150,
                shadow:true,
                minWidth:150,
                minHeight:150,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        registerDialog.addKeyListener(27, registerDialog.hide, registerDialog);
        registerDialog.addButton('Finish Registration', function(){
		registerDialog.hide;
		registerUserCred(currentRegUsername,currentRegPassword)
		}, registerDialog);
        var layout = registerDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('registerDialog', {}));
        layout.endUpdate();
    }
	//registerDialog.show()
	registerDialog.show(Ext.get('registerButton').dom);
}

var filesystemDialog;
function showFileSystemDialog(){
    if(!filesystemDialog){ // lazy initialize the filesystemDialog and only create it once
        filesystemDialog = new Ext.LayoutDialog("fs-dialog", { 
                modal:false,
                width:400,
                height:300,
                shadow:true,
                minWidth:300,
                minHeight:300,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        filesystemDialog.addKeyListener(27, filesystemDialog.hide, filesystemDialog);
        filesystemDialog.addButton('Close', filesystemDialog.hide, filesystemDialog);
        var layout = filesystemDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('saveTab', {title: 'Save'}));
		layout.add('center', new Ext.ContentPanel('openTab', {title: 'Open'}));
        layout.endUpdate();
    }
	//filesystemDialog.show()
	filesystemDialog.show();
}


var userAnimationBrowserDialog;
var uablayout;
function showUADialog(){
    if(!userAnimationBrowserDialog){ // lazy initialize the filesystemDialog and only create it once
        userAnimationBrowserDialog = new Ext.LayoutDialog("uab-dialog", { 
                modal:false,
                width:600,
                height:400,
                shadow:true,
                minWidth:600,
                minHeight:400,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        userAnimationBrowserDialog.addKeyListener(27, userAnimationBrowserDialog.hide, userAnimationBrowserDialog);
        userAnimationBrowserDialog.addButton('Close', userAnimationBrowserDialog.hide, userAnimationBrowserDialog);
        uablayout = userAnimationBrowserDialog.getLayout();
        uablayout.beginUpdate();
        uablayout.add('center', new Ext.ContentPanel('animationBrowser', {title: 'Browse'}));
		uablayout.add('center', new Ext.ContentPanel('animationViewer', {title: 'Player'}));
        uablayout.endUpdate();
		
		uablayout.getRegion('center').getPanel('animationViewer').on("activate",function(e){
		if(_rq != "f"){_rq = "f";if(_QzX != ""){
		setTimeout("_pA('"+_QzX+"')",83)
		}}});
		uablayout.getRegion('center').getPanel('animationBrowser').on("activate",function(e){
		_rq = "t";
		});

		browseOtherAnimations()
    }
	userAnimationBrowserDialog.show();
}


 
 var Colorobj;
var picker;

Ext.onReady(function(){
Colorobj = document.getElementById('linecolor');	
});

function LineColorChange(){
showColorDialog()
Colorobj = document.getElementById('linecolor');	
}

function FillColorChange(){
showColorDialog()
Colorobj = document.getElementById('fillcolor');	
}


function initColor(){
addCSS("../ajaxanimator/colorpicker.css");
addJS("../lib/slider-min.js",function(){
addJS("../lib/colorpicker-beta-min.js",function(){
displayColor();
})
})
}

function displayColor(){
    var Event = YAHOO.util.Event

    Event.onDOMReady(function() {
            picker = new YAHOO.widget.ColorPicker("colorPicker", {
                    showhsvcontrols: true,
                    showhexcontrols: true,
					images: {
						PICKER_THUMB: "../images/picker_thumb.png",
						HUE_THUMB: "../images/hue_thumb.png"
    				}
                });
			
			//a listener for logging RGB color changes;
			//this will only be visible if logger is enabled:
			var onRgbChange = function(o) {
				/*o is an object
					{ newValue: (array of R, G, B values),
					  prevValue: (array of R, G, B values),
					  type: "rgbChange"
					 }
				*/
				var onv = o.newValue
					Colorobj.style.backgroundColor = "rgb("+onv[0]+","+onv[1]+","+onv[2]+")";

				Colorobj.innerHTML = YAHOO.util.Color.rgb2hex(onv[0],onv[1],onv[2]);
				
				if(Colorobj.id == "fillcolor"){
				setFillColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
				}else{
				setLineColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
				}
				//YAHOO.log("The new color value is " + o.newValue, "info", "example");
			}
			
			//subscribe to the rgbChange event;
			picker.on("rgbChange", onRgbChange);

			//use setValue to reset the value to white:
			//Event.on("reset", "click", function(e) {
			//	picker.setValue([255, 255, 255], false); //false here means that rgbChange
													     //will fire; true would silence it
			//});
			
			//use the "get" method to get the current value
			//of one of the Color Picker's properties; in 
			//this case, we'll get the hex value and write it
			//to the log:
			//Event.on("gethex", "click", function(e) {
			//	YAHOO.log("Current hex value: " + picker.get("hex"), "info", "example"); 
			//});

        });

Ext.onReady(function(){
var cp = new Ext.ColorPalette({value:'FFFFFF'});  // initial selected color
cp.render('colorPalette');

cp.on('select', function(palette, selColor){
    // do something with selColor
	picker.setValue(YAHOO.util.Color.hex2rgb(selColor), false);
});

});

}; 
 var canvasHeightField;
var canvasWidthField;
var framerateField;
var regbutton;
var logoutbutton;

Ext.onReady(function(){
	var topToolbar = new Ext.Toolbar('north-tb');

	//////////////////////SubMenu Items///////////////////////////
    var fileMenu = new Ext.menu.Menu({
		
        id: 'fileMenu',
        items: [
			{text: 'New', icon: '../images/new.png', handler: confirmNewCanvas},
			{text: 'Open', icon: '../images/open.gif', handler: showFileSystemDialog},
			{text: 'Save', icon: '../images/disk.gif',handler: showFileSystemDialog},
			{text: 'Save As', icon: '../images/disk.gif',handler: showFileSystemDialog},
			'-',
			{text: 'Publish', icon: '../images/page_white_flash.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div')}}
        ]
    });
	var editMenu = new Ext.menu.Menu({
        id: 'editMenu',
        items: [
			{text: 'Undo', icon: '../images/arrow_undo.png',handler: undo},
			{text: 'Copy', icon: '../images/page_copy.png',handler: copyObj},
			{text: 'Paste', icon: '../images/page_paste.png',handler: pasteObj}
        ]
    });
	var viewMenu = new Ext.menu.Menu({
        id: 'viewMenu',
        items: [
			{text: 'Animation', icon: '../images/page_white_flash.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div')}}
        ]
    });
	var toolsMenu = new Ext.menu.Menu({
        id: 'toolsMenu',
        items: [
			{text: 'Clear Timeline', icon: '../images/cancel.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div');}},
			{text: 'Color Picker', icon: '../images/color_wheel.png',handler: showColorDialog},
			{text: 'Script/Macro Executor', icon: '../images/application_xp_terminal.png',handler: function(){mainLayout.getRegion('south').showPanel('scriptExec-div');}},
			{text: 'Debug Window',icon: '../images/brick_go.png',handler: openDebug}
        ]
    });
	var timelineMenu = new Ext.menu.Menu({
        id: 'timelineMenu',
        items: [
			{text: 'To Keyframe',icon: '../images/add.png',handler: toKeyframe},
			{text: 'Clear Frame',icon: '../images/delete.png',handler: removeKeyframe},
			{text: 'Refresh Data',icon: '../images/action_refresh.gif',handler: fullgotoframe},
			{text: 'New Layer',icon: '../images/add.png',handler: addLayer}
        ]
    });
	
	var animationMenu = new Ext.menu.Menu({
        id: 'animationMenu',
        items: [
			{text: 'Play',icon: '../images/control_play_blue.png',handler: playAnimation},
			{text: 'Stop',icon: '../images/control_stop_blue.png',handler: stopAnimation},
			{text: 'Next Frame',icon: '../images/control_fastforward_blue.png',handler: nextFrame},
			{text: 'Previous Frame',icon: '../images/control_rewind_blue.png',handler: preFrame},
			{text: 'Last Frame',icon: '../images/control_end_blue.png',handler: lastFrame},
			{text: 'First Frame',icon: '../images/control_start_blue.png',handler: firstFrame},
			{text: 'Set Last Frame',icon: '../images/control_end_blue.png',handler: setLastFrame}
        ]
    });
	var userMenu = new Ext.menu.Menu({
        id: 'userMenu',
        items: [
			{text: 'Logout',icon: '../images/logout.png',handler: logout},
			{text: 'Refresh Animation List',icon: '../images/action_refresh.gif',handler: animationList},
			{text: 'Browse Animations',icon: '../images/user_go.png',handler: showUADialog}
        ]
    });
	var helpMenu = new Ext.menu.Menu({
        id: 'helpMenu',
        items: [
			{text: 'About',icon: '../images/help.png',handler: poop},
			{text: 'Manual',icon: '../images/help.png',handler: poop},
			{text: 'FAQ',icon: '../images/help.png',handler: poop},
			{text: 'Seizure',icon: '../images/help.png',handler: poop},
			{text: 'Support',icon: '../images/money.png',handler: poop}
        ]
    });

	
	//////////////////////Menu Items///////////////////////////

	topToolbar.addButton({
    text: 'File',
	menu: fileMenu
    });
	topToolbar.addButton({
    text: 'Edit',
	menu: editMenu
    });
	topToolbar.addButton({
    text: 'View',
	menu: viewMenu
    });
	topToolbar.addButton({
    text: 'Tools',
	menu: toolsMenu
    });
	topToolbar.addButton({
    text: 'Timeline',
	menu: timelineMenu
    });
	topToolbar.addButton({
    text: 'Animation',
	menu: animationMenu
    });
	topToolbar.addButton({
    text: 'User',
	menu: userMenu
    });
	topToolbar.addButton({
    text: 'Help',
	menu: helpMenu
    });

var loginToolbar = new Ext.Toolbar('login-tb');
loginToolbar.addText("Login")
loginToolbar.addSeparator() 
regbutton = loginToolbar.addButton({id: 'registerButton',text: 'Register', handler: showRegisterDialog})
logoutbutton = loginToolbar.addButton({id: 'logoutButton',text: 'Logout', handler: logout})
logoutbutton.setVisible(false)

var histToolbar = new Ext.Toolbar('history-tb');
histToolbar.addText("History")
histToolbar.addSeparator() 
histToolbar.addButton({text: 'Clear'})

var centerToolbar = new Ext.Toolbar('center-tb');
//centerToolbar.addElement($('status'))

canvasWidthField = new Ext.form.TextField({value: '480',width: '50px'})
canvasHeightField = new Ext.form.TextField({value: '272',width: '50px'})
framerateField = new Ext.form.TextField({value: '12',width: '50px'})
canvasWidthField.on("change",function(textObj,newVal,oldVal){
canvasWidth = parseInt(newVal)
setCP()
});
canvasHeightField.on("change",function(textObj,newVal,oldVal){
canvasHeight = parseInt(newVal)
setCP()
});
framerateField.on("change",function(textObj,newVal,oldVal){
AnimationFramerate = parseInt(newVal)
});
centerToolbar.addText("Width:")
centerToolbar.addField(canvasWidthField)
centerToolbar.addText("Height:")
centerToolbar.addField(canvasHeightField)
centerToolbar.addText("Framerate:")
centerToolbar.addField(framerateField)
});

function poop(){
Ext.MessageBox.alert("Error!","Either this version you are using is incomplete, or this feature has not yet been implemented, and/or transferred from dhtmlgoodies to Ext")
}



////////////////////////////Begin Context Menus///////////////////////////////


Ext.onReady(function(){
var timelineContextMenu = new Ext.menu.Menu({
    id: 'timelineContextMenu',
    items: [
		{text: 'To Keyframe',icon: '../images/add.png',handler: toKeyframe},
		{text: 'Add Layer',icon: '../images/add.png',handler: addLayer},
		{text: 'Clear Frame',icon: '../images/cancel.png',handler: removeKeyframe}
    ]
});
Ext.get("frameContainer").on("contextmenu",function(e){
	timelineContextMenu.showAt(e.getXY());
	e.stopEvent();
	e.stopPropagation()
	e.preventDefault
});

var drawToolSubmenu = new Ext.menu.Menu({
    id: 'drawToolSubmenu',
    items: [
		{text: 'Select',icon: '../images/select.gif',handler: toKeyframe},
		{text: 'Rectangle',icon: '../images/rectangle.gif',handler: addLayer},
		{text: 'Round Rectangle',icon: '../images/roundrect.gif',handler: removeKeyframe},
		{text: 'Ellipse/Circle',icon: '../images/circle.gif',handler: removeKeyframe},
		{text: 'Line',icon: '../images/line.gif',handler: removeKeyframe}
    ]
});

var canvasContextMenu = new Ext.menu.Menu({
    id: 'canvasContextMenu',
    items: [
		{text: 'Next Frame',icon: '../images/control_fastforward_blue.png',handler: poop},
		{text: 'Previous Frame',icon: '../images/control_rewind_blue.png',handler: poop},
		{text: 'Play',icon: '../images/control_play_blue.png',handler: poop},
		{text: 'Delete Shape',icon: '../images/delete.png',handler: poop},
		{text: 'Clear Frame',icon: '../images/cancel.png',handler: poop},
		{text: 'Undo',icon: '../images/arrow_undo.png',handler: poop},
	    {text: 'Drawing Tool',icon: '../images/paintbrush.png', menu: drawToolSubmenu}
	]
});

Ext.get("canvas-div").on("contextmenu",function(e){
	canvasContextMenu.showAt(e.getXY());
	e.stopEvent();
	e.stopPropagation()
	e.preventDefault
});
});
 
 //Global Variables
var layers = 0;
var kFrameCount = 0;
var currentFrameSelection = 1;
var currentLayerSelection = 1;
var KeyFrames = new Array()
var TweenFrames = new Array()
var tFrameCount = 0;
var zDataText = 0;
var totalFramesPerLayer = 500;
var nextFA = "";
//End Global Variables


//Color Variables

var finishedTweenColor = "#80FF8E"
var KeyframeColor = "#0099CC";
var frameTextColor = "#000000";
var selectKeyframeColor = "";
var selectTextColor = "";
var FrameColor = "#ebf2f8";
var selectFrameColor = "";
var LayerBGColor = "#BED6E0";
//End Color Variables



function setOpacity(obj, value) { //this function is never actually called... but it would make a good effect
	getElementById(obj).style.opacity = value/10;
	getElementById(obj).style.filter = 'alpha(opacity=' + value*10 + ')';
}


function toKeyframe() //Function to convert normal frames to keyframes
{
	var zframe;
	zframe = document.getElementById("frame" + currentFrameSelection + "layer" + currentLayerSelection);
	zframe.style.color = frameTextColor;
	zframe.style.backgroundColor=KeyframeColor;
	KeyFrames[kFrameCount] = currentFrameSelection + "," + currentLayerSelection
	kFrameCount = kFrameCount + 1
	currentFrameSelection = currentFrameSelection;
	currentLayerSelection = currentLayerSelection;
	gotoframe(currentFrameSelection,currentLayerSelection);
}

function makeKeyframe(framenumber, layer){
var ikf = new Boolean(false);
for(var m = 0; m <= kFrameCount; m++){
if(KeyFrames[m] == framenumber + "," + layer){
ikf = true
}
}
if(ikf == false){ //irishguy sucks
	var zframe;
	zframe = document.getElementById("frame" + framenumber + "layer" + layer);
	zframe.style.color = frameTextColor;
	zframe.style.backgroundColor=KeyframeColor;
	KeyFrames[kFrameCount] = framenumber + "," + layer
	kFrameCount = kFrameCount + 1
	gotoframeInterface(framenumber,layer);
}
}




function fullgotoframe() //Function to refresh all data in the timeline
{
	if (confirm("Warning: This might take a very long time")) { 
	alert('you will be alerted when it is done');
	for(var iz = 1; iz <= layers; iz++)
	{
	for(var i = 1; i <= totalFramesPerLayer; i++)
	{
	gotoframeInterface(i,iz);
	}
	}
	}
	alert('done');
}

//33B843

//80FF8E -light

function tFrame(framenumber,layer){
var frame = document.getElementById("frame" + framenumber + "layer" + layer);
frame.style.color = "#000000";
frame.style.backgroundColor=finishedTweenColor;
}

function tFrameSel(framenumber,layer){
var frame = document.getElementById("frame" + framenumber + "layer" + layer);
frame.style.color = "#000000";
frame.style.backgroundColor="#33B843";
}

function timelineInterfaceTween(nFA){
var kFrameC = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
if(kFrameC != nextFA){
nFn = kFrameC
}else{
nFn = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
}

for(var fNum = (nFn + 1); fNum < (nFA); fNum++){
TweenFrames[tFrameCount] = fNum
tFrameCount++
tFrame(fNum,layer)
}
}

function gotoframeInterface(framenumber,layer){

if(nextFA != 0 && kFrameCount > 1){
var nFn;
var kFrameC = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
if(kFrameC != nextFA){
nFn = kFrameC
}else{
nFn = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
}

createTween(nFn,nextFA)
var nFA = nextFA

var isTweened = "true";
for(var fNum = (nFn + 1); fNum < (nFA); fNum++){
TweenFrames[tFrameCount] = fNum
tFrameCount++
tFrame(fNum,layer)
}
nextFA = 0
}
//start keyframe detection code
	var wasKeyFrame = new Boolean(false); //variable to store wether the selection is a keyframe
	
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	wasKeyFrame = true
	}
	}
	//end keyframe detection code
	
	var aframe;
	aframe = document.getElementById("frame" + currentFrameSelection + "layer" + currentLayerSelection);
	if(wasKeyFrame == false){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	aframe.style.color = "black";
	aframe.style.backgroundColor=FrameColor;
	}else{
	tFrame(currentFrameSelection,layer)
	}
	}
	if(wasKeyFrame == true){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	aframe.style.color = frameTextColor;
	aframe.style.backgroundColor=KeyframeColor;
	}else{
	var kfc1 = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
	var kfc2 = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
	var cfs = currentFrameSelection
	if(cfs != 0 && cfs != 1&& cfs != kfc1){
	tFrame(currentFrameSelection,layer)
	}
	}
	}
	currentFrameSelection = framenumber
	currentLayerSelection = layer
	var frame;
	frame = document.getElementById("frame" + framenumber + "layer" + layer);
	var isKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == framenumber + "," + layer){
	isKeyFrame = true
	}
	}

	if(isKeyFrame == false){
	frame.style.color = "#F2F2F2";
	frame.style.backgroundColor="#00BFFF";
	}
	if(isKeyFrame == true){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	frame.style.color = "#F2F2F2";
	frame.style.backgroundColor="#3579DC";
	}else{
	var kfc1 = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
	var kfc2 = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
	if(framenumber != 0 && framenumber != 1 && framenumber != kfc1){
	tFrameSel(framenumber,layer)
	}
	}
	}

	
}

function repeatChecks(){
checkFrame(currentFrameSelection,currentLayerSelection);

setTimeout("repeatChecks()",500);
}

repeatChecks()


function checkRepeat(oFrame){
var tot = 0
var mt = 0
var c1a = document.getElementById("richdraw"+oFrame).innerHTML

var c2a = document.getElementById("richdraw"+(oFrame-1)).innerHTML


var c1 = (new DOMParser()).parseFromString(c1a, "text/xml").firstChild.cloneNode(true)
var c2 = (new DOMParser()).parseFromString(c2a, "text/xml").firstChild.cloneNode(true)

if(c1.childNodes.length == c2.childNodes.length){
for(var q1=0;q1 < c1.childNodes.length;q1++){
if(c1.childNodes[q1].getAttribute("x")== c2.childNodes[q1].getAttribute("x")){
if(c1.childNodes[q1].getAttribute("y")== c2.childNodes[q1].getAttribute("y")){
mt++
}
}
tot++
/* 
for(var q2=0;q2 < c1.childNodes[q1].attributes.length;q2++){
if(c2.childNodes[q1].getAttribute(c1.childNodes[q1].attributes.nodeName)==c1.childNodes[q1].attributes.nodeValue
){
mt++
}
tot++
}
*/
}
}
var gp = "1"
if(mt == tot){
//got past level 1
if(mt != 0){
//got past level 2
if(tot != 0){
gp = "0"

}
}
}
if(gp != "0"){
return "diff" 
}else{
return "same"
}
}

function ikf(frame,layer){
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == frame + "," + layer){
	wasKeyFrame = true
	}
	}
	return wasKeyFrame;
	}

	function itf(frame){
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= tFrameCount; m++)
	{
	if(TweenFrames[m] == frame ){
	wasKeyFrame = true
	}
	}
	return wasKeyFrame;
	}
	
	
function checkFrame(oFrame, oLayer){
try{
var zisempty = false;
if(DrawCanvas[oFrame] == null){
zisempty = true;
}else{
if(DrawCanvas[oFrame].renderer.getMarkup().replace(" ","") == "<svg></svg>"){
zisempty = true;
}
if(oFrame != 1 && oFrame != 0){
if(checkRepeat(oFrame) == "diff"){
if(itf(oFrame,oLayer) == false || ikf(oFrame,oLayer) == false){
nextFA = oFrame;
//timelineInterfaceTween(oFrame)
}

zisempty = false;
//finishedTween(oFrame,oLayer);
//tFrame(oFrame,oLayer)

}else{

zisempty = true
}
}
}
if(zisempty == false && itf(oFrame,oLayer) == false ){

makeKeyframe(oFrame,oLayer);
}
}catch(err){}
}

function setTotalFrameValue(){
	var qframe;
	qframe = document.getElementById("frame" + totalFrames + "layer" + 1);
	qframe.style.color = "#ffffff";
	qframe.style.backgroundColor="#FF9900";
}

function changeTotalFrameValue(tfValue){
totalFrames = tfValue;
setTotalFrameValue();
gotoframe(currentFrameSelection,currentLayerSelection);
}

function gotoframe(framenumber, layer) //Function to change the current selected frame
{
if(KeyFrames.join(",").indexOf(framenumber+","+layer) == -1){
}

var preCnvs = currentCanvas;
DrawCanvas[currentCanvas].unselect();
	if(framenumber > 0 && framenumber < totalFramesPerLayer){
	checkFrame(currentFrameSelection, layer);
	previousCanvas = currentCanvas;
	if(framenumber > totalFrames){
	gotoframeInterface(totalFrames, layer);
	totalFrames = framenumber;
	}
	gotoframeInterface(framenumber,layer);
	if(framenumber < totalFrames){
	setTotalFrameValue()
	}
	hideCurrentCanvas();
	currentCanvas = framenumber;
	if(DrawCanvas[currentCanvas]==null){
	if(isIE() == true){
	makeCanvasFromIE(framenumber);
	}else{
	makeCanvasFromId(framenumber);
	if($("richdraw"+preCnvs).firstChild.childNodes.length > 0){
		cloneFrame(preCnvs)
	}
	}
	}
	showCurrentCanvas();
 checkFrame(framenumber, layer);

}
}



function removeFrame(frameId,layer){
var qzmy = currentCanvas;
DrawCanvas[frameId] = null;
$("richdraw" + frameId).innerHTML = "";
currentCanvas = frameId;
initDraw()
currentCanvas = qzmy
addHist("Remove Frame")
}


function removeKeyframe(){ //Function to delete selected keyframe
/*
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	wasKeyFrame = true
	}
	}
	if(wasKeyFrame == false){
	alert("Error: This isn't a Key Frame!")
	}
	if(wasKeyFrame == true){
	if (confirm("Are You Sure you want to delete this frame?")) { 
	*/
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	KeyFrames[m] = "0,0";
	}
	}
	removeFrame(currentFrameSelection , currentLayerSelection)
	
	gotoframe(currentFrameSelection,currentLayerSelection);
	
	//}
	//}
}

function isKeyframe(frame, layer){
	var pKeyFrame = new Boolean();
	pKeyFrame = false
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == frame + "," + layer){
	pKeyFrame = true
	}
	}
	return pKeyFrame;
}

function ClearAllKeyframes(){ //Empties timeline

	if (confirm("Are you sure you want to delete ALL the keyframes?")) { 
	for(var m = 0; m <= kFrameCount; m++)
	{
	KeyFrames[m] = "0,0";
	gotoframe(currentFrameSelection,currentLayerSelection);
	}
	alert("Done.");
	}
}

var TDCount = 0;


function addLayer(){

var asdf; //create the string that stores the layer data

layers = layers + 1;

asdf =  "<div id='framesDiv'><table width='100%' cellspacing='0px' id='framesTable" + layers + "'"; //Create the Layer

asdf = asdf + (" cellspacing='0' border='1' onmouseover=\"document.body.style.cursor='default';\"> ");

asdf = asdf + ("<tr>")

asdf = asdf + ("<td onmouseover=\"try{document.body.style.cursor='default';Tip('Layer "+layers+"');}catch(err){}\" height='5' bgcolor='"+LayerBGColor+"'");


asdf = asdf + (">Layer" + layers + "</td>")
for (var x = 1; x <= totalFramesPerLayer; x++) //Start adding frames
{

asdf = asdf + ("<td id='frame" + x + "layer" + layers + "'height='5' cellpadding='0px' cellspacing='0px'");//Main attributes/'Frame' declaration

asdf = asdf + ("style='-moz-user-select: none; background-color:"+FrameColor+";' ");//css styling

asdf = asdf + ("onmousedown='gotoframe(" + x +", " + layers +");'"); //Start Javascript event handling

asdf = asdf + ("onmouseover=\"try{Tip(setTooltipData('"+x+"','"+layers+"'),TITLE, 'Frame "+x+"');}catch(err){}\" "); 


asdf = asdf + (">" + x);//Text in each frame

asdf = asdf + ("</td>")//End Frame

}
//End adding layer
asdf = asdf + ("</tr></table></div>")//Create end tags for layer

changeInnerHTML("frameContainer",asdf)//Add the layer to the actual page


}


function setTooltipData(uFrame,uLayer){
var wasKeyFrame = new Boolean(false);
for(var m = 0; m <= kFrameCount; m++)
{
if(KeyFrames[m] == uFrame + "," + uLayer){
wasKeyFrame = true
}
}
var ziskeyframe = 'false';
ziskeyframe = 'false';
if(wasKeyFrame == true){
ziskeyframe = 'true';
}
var zisselected = 'false';
if (currentFrameSelection == uFrame){
if (currentLayerSelection == uLayer){
zisselected = 'true';
}
}
var zisempty = false;
if(DrawCanvas[uFrame] == null){
zisempty = true;
}else{
if(DrawCanvas[uFrame].renderer.getMarkup().replace(" ","") == "<svg></svg>"){
zisempty = true;
}
}
var canvasframepreview = "empty";
if(DrawCanvas[uFrame] != null){
canvasframepreview = DrawCanvas[uFrame].renderer.getMarkup()
}

if(zisempty == false){
var pstr = DrawCanvas[uFrame].renderer.getMarkup();
count = 0; 
var key = "rect";
pos = pstr.indexOf(key);
while ( pos != -1 ) {
count++;
pos = pstr.indexOf(key,pos+1);
}
key = "line";
pos = pstr.indexOf(key);
while ( pos != -1 ) {
count++;
pos = pstr.indexOf(key,pos+1);
}
}

//zDataText = '<b>frame:</b> '+uFrame+'<br><b>layer:</b> '+uLayer
zDataText = '<b>layer:</b> '+uLayer
zDataText+='<br><b>keyframe:</b>'+ziskeyframe+'<br><b>selected:</b> '+zisselected;
zDataText+='<br><b>empty:</b>' + zisempty;
if(zisempty == false){
zDataText+='<br><b>Total Objects:</b> ' + count/2;
}
if(uFrame == totalFrames){
zDataText+='<br><b>Last Frame</b>';
}
//zDataText+='<br><b>Preview:</b><br>' +  canvasframepreview.replace('_moz-userdefined=""','');
//document.getElementById("ToolTipData").innerHTML=zDataText
if(zisempty == false){
zDataText += "<div id='timPreDiv' style='width: 120px; height: 68px;border: 1px black solid;z-index: 100000'></div>";
setTimeout("generateFramePreview("+uFrame+")",500);
}else{
zDataText += "<div id='timPreDiv' style='width: 120px; height: 68px;border: 1px black solid;z-index: 100000'><center>No Preview Availiable</center></div>";
}
return zDataText;



}

function generateFramePreview(frameNumber){
if(document.getElementById("timPreDiv")){
document.getElementById("timPreDiv").innerHTML = "";
var svgNamespace = 'http://www.w3.org/2000/svg';
var newSVGE = document.createElementNS(svgNamespace,"svg")
newSVGE.setAttributeNS(null, "viewBox", "0 0 480 272");
document.getElementById("timPreDiv").appendChild(newSVGE);
var rdX = $("richdraw" + frameNumber).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
document.getElementById("timPreDiv").firstChild.appendChild(newShape);
}catch(err){}
}
}
}


function changeInnerHTML (elm, txt) {
	if(document.getElementById) {
	var el = document.getElementById(elm);
	el.innerHTML = el.innerHTML + txt;
	return true;
	}
	return false;
}


function overwriteInnerHTML (elm, txt) {
	if(document.getElementById) {
	var el = document.getElementById(elm);
	el.innerHTML =  txt;
	return true;
	}
	return false;
}


//<div id="frameContainer" onmouseover="document.body.style.cursor='default';" style="width:100%;overflow:scroll"></div>
 
 var canvasNumber = 1;
var previousCanvas = 0;
var canvasDisplayStyle = "";
var canvasIssueResolved = new Boolean();
var AnimationPlay = new Boolean();
var AnimationFramerate = 12; 
var totalFrames = 1;
var canvasHeight = 272;
var canvasWidth = 480;
var revisionNumber = 1;
var animationRevision = new Array();
var animationRevisionURL = new Array();
var lastAnimationURL = '';
var replaceEngine = 'string'; //either regexp or string, it is the engine that changes stuff
AnimationPlay = true;
canvasIssueResolved = false;



function makeCanvasFromIE(CanvasId){
var canvasString;
canvasString='<div id="richdraw'+CanvasId+'" style="';
canvasString+='border:1px solid black;position:relative;top:0px'
canvasString+='width:99%;height:99%;background-color:white;'
canvasString+='-moz-user-select:none;display:'+canvasDisplayStyle+'"></div>';
document.getElementById("CanvasContainer").innerHTML+=canvasString;
canvasDisplayStyle = "none";
initDraw();
}

function makeCanvasFromId(CanvasId){
var richdrawCanvas = document.createElement('div');
var richdrawCanvasStyle = "border:1px solid black;position:relative;"
richdrawCanvasStyle += "top:0px;width:99%;height:99%;background-color:white;"
richdrawCanvasStyle += "-moz-user-select:none;"
richdrawCanvas.setAttribute('id','richdraw'+CanvasId);
richdrawCanvas.setAttribute('style',richdrawCanvasStyle+"display:"+canvasDisplayStyle);
document.getElementById('CanvasContainer').appendChild(richdrawCanvas);
canvasDisplayStyle = 'none'
initDraw();
}

function setCP(){

$('CanvasContainer').style.height = canvasHeight+ 'px';
$('CanvasContainer').style.width =  canvasWidth + 'px';

$('zFlashPreviewDiv').style.height = canvasHeight + 'px';
$('zFlashPreviewDiv').style.width = canvasWidth + 'px';
}



function generateAnimationXML(){
DrawCanvas[currentCanvas].unselect();
var zAnimationXML = "<AnimationXML>";
for(var pzxy = 1; pzxy <= totalFrames;pzxy++){
if(DrawCanvas[pzxy] != null && DrawCanvas[pzxy].renderer.getMarkup() != "<svg></svg>"){
var zCurrentAnimationXMLFrame;
//zCurrentAnimationXMLFrame = DrawCanvas[pzxy].renderer.getMarkup() this fails in IE so do it the hard way...
zCurrentAnimationXMLFrame = $('richdraw' + pzxy).innerHTML;
zAnimationXML += zCurrentAnimationXMLFrame;
}else{
if(isKeyframe(pzxy,1) != false){
zAnimationXML += "<svg></svg>"
}else{
zAnimationXML += '<svg t="f"></svg>'
}
}
}
zAnimationXML += "</AnimationXML>";
return zAnimationXML;
}

function replaceT(findStr, repStr, origStr){
var re = new RegExp(findStr, "g"); // pre replace using regexp
return origStr.replace(re, repStr);
}


function isIE(){
    ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
    opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    if ((!ie) || (opera)) {
	//return false
	}else{
	return true
	}
}

function initCanvas(){
	//for(var zxCanvas = 0; zxCanvas > 10; zxCanvas++){
	makeCanvasFromIE(1);
	//}
	gotoframe(1,1);
}




 
 function playAnimation(){
AnimationPlay = true;
doAnimation();
}

function doAnimation(){
if(totalFrames == 1){
AnimationPlay = false;
}
if(currentCanvas + 1> totalFrames){
gotoframe(1,1);
setTimeout('doAnimation()',1000/AnimationFramerate);
}else{
if(AnimationPlay == true){
gotoframe(currentFrameSelection+1,1);
setTimeout('doAnimation()',1000/AnimationFramerate);
}
}
}


function replaceAll(findStr,repStr,oldStr) {
var newStr = ""; 
var re = new RegExp(findStr, "g"); 
newStr = oldStr.replace(re, repStr);
return newStr;
}

function stopAnimation(){
AnimationPlay = false;
}

function nextFrame(){
gotoframe(currentFrameSelection+1,1)
}
function preFrame(){
gotoframe(currentFrameSelection-1,1)
}
function firstFrame(){
gotoframe(1,1)
}
function lastFrame(){
gotoframe(totalFrames,1)
}
function setLastFrame(){
changeTotalFrameValue(currentFrameSelection)
}

function hideCurrentCanvas(){
try{
document.getElementById("richdraw"+currentCanvas).style.display = "none";
}catch(err){}
}

function showCurrentCanvas(){
try{
document.getElementById("richdraw"+currentCanvas).style.display = "";
}catch(err){}
}



 
 function resetHistory(){

editHistory = new Array();
editHistoryNumber = 0;
$("HistoryContainer").innerHTML = "<tr><td>0</td><td>New Animation</td></tr>"
}

function revertRevision(numId){
//alert(editHistory[numId -1].id)
//alert(numId)
//$("TCContainer") = editHistory[numId -1]

loadAnimation("<AnimationXML>"  + editHistory[numId] + "</AnimationXML>" )
editHistoryNumber++;
editHistory[editHistoryNumber] =  $("CanvasContainer").innerHTML
addHistory("Revert to " + numId)

}

function addHistory(data){

 var tbl = document.getElementById('HistoryContainer');
  var lastRow = tbl.rows.length;
  //var row = tbl.insertRow(0);
  var row = tbl.insertRow(lastRow);
  var zxdy = editHistoryNumber;
  row.onmousedown = function(){
  revertRevision(zxdy)
  }
  var cellLeft = row.insertCell(0);

  var textNode = document.createTextNode(editHistoryNumber);
  cellLeft.appendChild(textNode);
  var cellRight = row.insertCell(1);
  
  var el = document.createElement('span');
  el.innerHTML = data
  cellRight.appendChild(el);
}


function addHistoryTO(data){

 var tbl = document.getElementById('HistoryContainer');
  var lastRow = tbl.rows.length;
  //var row = tbl.insertRow(0);
  var row = tbl.insertRow(lastRow);
  var zxdy = editHistoryNumber;
  var cellLeft = row.insertCell(0);

  var textNode = document.createTextNode(editHistoryNumber);
  cellLeft.appendChild(textNode);
  var cellRight = row.insertCell(1);
  
  var el = document.createElement('span');
  el.innerHTML = data
  cellRight.appendChild(el);
}



function undo(){
revertRevision(editHistoryNumber -1);
}

function checkEdit(event){
if (editHistory[editHistoryNumber] != $("CanvasContainer").innerHTML){
editHistoryNumber++;
editHistory[editHistoryNumber] = $("CanvasContainer").innerHTML

if(DrawCanvas[currentCanvas].mode != "select"){
var curM = DrawCanvas[currentCanvas].mode;
var result = "";
switch (curM) {
case 'rect': result = 'Rectangle'; break;
case 'roundrect': result = 'Rectangle'; break;
case 'ellipse': result = 'Ellipse'; break;
case 'line': result = 'Line'; break;
}

addHistory("Add&nbsp;" + result)

}else{
addHistory("Select/Move")
}
}
}

function addHist(text){
if (editHistory[editHistoryNumber] != $("CanvasContainer").innerHTML){
editHistoryNumber++;
editHistory[editHistoryNumber] = $("CanvasContainer").innerHTML
addHistory(text)
}
}

 
 var userMode = "login";
var encPW = "";
var userName = "";
var cPrEiD = "";
var cPrEuN = "";

function submitUser(){
if(userMode == "login"){
loginUser()
}else{
registerUser();
}
}

function loginUser(){
var cUsername = $("usrId").value;
var cPassword = hex_md5($("pwId").value);
ajaxpack.postAjaxRequest("../php/login.php", "user="+cUsername+"&pass="+cPassword+"&valid=true&rem=true", loginUserEvent, "txt")
}

function logout(){
$("userQuery").style.display = ""
$("userProfile").style.display = "none";
encPW = "";
userName = "";
regbutton.setVisible(true)
logoutbutton.setVisible(false)
}


function loginSucessful(){
$("userQuery").style.display = "none"
$("usrNme").innerHTML = "Welcome&nbsp;" + userName;
$("userProfile").style.display = "";
animationList()
regbutton.setVisible(false)
logoutbutton.setVisible(true)
}

function loginUserEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
if(myajax.responseText.substr(1,3).indexOf("S") != -1){
Ext.MessageBox.alert("Login Status","Login Sucessful")
encPW = hex_md5($("pwId").value);
userName = $("usrId").value
loginSucessful()
}else{
Ext.MessageBox.alert("Login Status",myajax.responseText.substr(4).replace(":",""))
}
}
}
}



function registerUserCred(user,pass){
ajaxpack.postAjaxRequest("../php/register.php", "user="+user+"&pass="+pass+"&valid=true", registerUserEvent, "txt")
}

function registerUserEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
if(myajax.responseText.substr(1,2).indexOf("S") != -1){
Ext.MessageBox.alert("Registration Status","Registration Sucessful")
}else{
Ext.MessageBox.alert("Registration Status",myajax.responseText.substr(4).replace(":",""))
}
}
}
}

function changeUserMode(){
if(userMode == "register"){
$("pwId2").style.display = "none"
userMode = "login";
$("userManMode").innerHTML = "Login"
$("changeModeLink").innerHTML = "Register"
}else{
$("pwId2").style.display = ""
userMode = "register";
$("userManMode").innerHTML = "Register"
$("changeModeLink").innerHTML = "Login"
}

}




function savetoserver(){
if($("userProfile").style.display == ""){
var savedata = escape(escape(animationSaveData()));
var nameRequest = prompt('Set a Name For Animation', 'animation' + Math.floor(Math.random()*999));
ajaxpack.postAjaxRequest("../php/savetoserver.php", "user="+userName+"&pass="+encPW+"&data="+savedata+"&name="+nameRequest, savetoserverEvent, "txt")

}else{
Ext.MessageBox.alert("Error:","Please Login or Register First")
}
}

function savetoserverEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
Ext.MessageBox.alert("Save Status","Save Sucessful");
animationList()
}
}
}


function animationList(){
if(userName != ""){
ajaxpack.postAjaxRequest("../php/listAnimations.php", "user=" + userName, listAnimationEvent, "txt")
}else{
Ext.MessageBox.alert("Error:","Please Login Before Using This Feature")
}
}

function listAnimationEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
var animationList = myajax.responseText.split(",");
var animations = "";
var qt = '"';
for(var q = 0; q < animationList.length; q++){
var au = animationList[q].replace(".xml","")
animations += "<a href="+qt+"javascript:loadAnimationFromURL('"+animationList[q]+"')"+qt+">"+au+"</a><br>";
}
$("userFiles").innerHTML = animations;
}
}
}


function loadAnimationFromURL(url){
ajaxpack.postAjaxRequest("../users/" + userName + "/animations/" + url, "", loadAnimationEvent, "txt")
}

function loadAnimationEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
loadAnimation(unescape(myajax.responseText))

}
}
}

function refreshOtherAnimations(){
if($("UAB").innerHTML.indexOf("javascript:previewAnimationFromURL") == -1){
browseOtherAnimations()
}else{
var urnQ = $("UAB").innerHTML.split("javascript:previewAnimationFromURL")[1].split(",")[1].split(")")[0].replace("'","").replace("'","")
animationList2(urnQ);
}
}

function browseOtherAnimations(){
ajaxpack.getAjaxRequest("../php/usersList.php", "", otherAnimationsEvent, "txt")
}

function otherAnimationsEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
$("UAB").innerHTML = myajax.responseText
}
}
}

function animationList2(unA){
uAn = unA;
ajaxpack.postAjaxRequest("../php/listAnimations.php", "user=" + unA, listAnimationEvent2, "txt")
}

function LAFC(){
ajaxpack.postAjaxRequest("../users/" + cPrEuN + "/animations/" + cPrEiD, "", loadAnimationEvent, "txt")
}

function listAnimationEvent2(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
var animationList = myajax.responseText.split(",");
var animations = "";
var qt = '"';
for(var q = 0; q < animationList.length; q++){
var au = animationList[q].replace(".xml","")
animations += "<a href="+qt+"javascript:previewAnimationFromURL('"+animationList[q]+"','"+uAn+"')"+qt+">"+au+"</a><br>";
}
$("UAB").innerHTML = animations;
}
}
}

function previewAnimationFromURL(fLn,uAn){
cPrEiD = fLn
cPrEuN = uAn
ajaxpack.postAjaxRequest("../users/" + uAn + "/animations/" + fLn, "", loadAnimationEvent2, "txt")
}

function loadAnimationEvent2(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally

uablayout.getRegion('center').showPanel('animationViewer');

_lA(unescape(myajax.responseText),"AXMLPlayer");

}
}
}
var _QzX = "";
var _y=1;
var _rq = "f";
function _lA(a,z){
_rq = "t"
_QzX = "";
_y=1;
document.getElementById(z).innerHTML = "";
var b="http://www.w3.org/2000/svg";var c=document.createElement("div");
c.setAttribute("style","width:480;height:272;overflow:hidden");
var d=new DOMParser();var e=d.parseFromString(a,"text/xml").firstChild.getElementsByTagName("svg");
for(var f=0;f<e.length;f++){var g=document.createElement("div");g.style.display="none";
g.appendChild(document.createElementNS(b,"svg"));var h=e[f].childNodes;for(var i=0;i<h.length;i++){
var j=h[i];var k=j.attributes;var l=document.createElementNS(b,j.tagName);for(var m=0;m<k.length;m++){
l.setAttributeNS(null,k[m].nodeName,k[m].value)}g.firstChild.appendChild(l)}c.appendChild(g)}
document.getElementById(z).appendChild(c);
_rq = "f"
_QzX = z
_pA(z)}
/*old version
function _pA(z){
if(_rq == "f"){
var a=document.getElementById(z).firstChild.childNodes;
a[_y-1].style.display="none";a[_y].style.display="";_y++;
if(_y==a.length){a[_y-1].style.display="none";_y=1;}setTimeout("_pA('"+z+"')",83)
}}
*/
function _pA(z){
if(_rq == "f"){
var a=document.getElementById(z).firstChild.childNodes;
_y++;if(_y==a.length){_y=0}else{a[_y-1].style.display="none"}
a[_y].style.display="";
setTimeout("_pA('"+z+"')",83)}}



 
 
var knextframe = new YAHOO.util.KeyListener(document, { keys:[39,33] }, { fn:function(){
gotoframe(currentFrameSelection+1,1)
}, correctScope:true } );
knextframe.enable();

var kpreframe = new YAHOO.util.KeyListener(document, { keys:[37,34] }, { fn:function(){
gotoframe(currentFrameSelection-1,1)
}, correctScope:true } );
kpreframe.enable();

var ktokeyframe = new YAHOO.util.KeyListener(document, { keys:117 }, { fn:function(){
toKeyframe();
}, correctScope:true } );
ktokeyframe.enable();

var kplayanim = new YAHOO.util.KeyListener(document, { keys:[80,13] }, { fn:function(){
playAnimation()
}, correctScope:true } );
ktokeyframe.enable();

var kstopanim = new YAHOO.util.KeyListener(document, { keys:83 }, { fn:function(){
stopAnimation();
}, correctScope:true } );
kstopanim.enable();

var kdelete = new YAHOO.util.KeyListener(document, { keys:46 }, { fn:function(){
if(DrawCanvas[currentCanvas].selected != null){
deleteShape();
}else{
removeKeyframe();
}
}, correctScope:true } );
kdelete.enable();

var kfdelete = new YAHOO.util.KeyListener(document, { keys:82 }, { fn:function(){
removeKeyframe()
}, correctScope:true } );
kfdelete.enable();

 
 function checkAnimationXML(axml){ // basic animationxml test
var dA = unescape(axml)
if(dA.indexOf("<") != -1 && dA.indexOf(">") != -1){
if(dA.indexOf("svg") != -1){
return "valid"
}
}
} 
 