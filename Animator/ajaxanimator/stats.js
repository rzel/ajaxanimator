/*
..okay, so the site trackers are really slowing my app down... alot... so i'm gonna try making my own
*/
//var visitId = ((Math.random()+"").substr(2)+(Math.random()+"").substr(2)).substr(0,30);//identify visitors
var statArray = new Object();
statArray["referrer"] = document.referrer;
statArray["title"] = document.title;
statArray["location2"] = document.location;
statArray["location1"] = window.location;
statArray["date"] = (new Date()).toString();
statArray["useragent"] = window.userAgent;
statArray["appversion"] = navigator.appVersion;
statArray["useragent"] = navigator.userAgent;
statArray["vendor"] = navigator.vendor;
statArray["platform"] = navigator.platform;
statArray["screenwidth"] = screen.width;
statArray["screenheight"] = screen.height;
statArray["historylength"] = history.length;
statArray["plugins"] = navigator.plugins.length;
statArray["cookielength"] = document.cookie.length;
//now convert the data into a POST request Parameter string
var paramString = "";
for(x in statArray){
paramString += "&" + x + "=" + escape(statArray[x]) 
}
paramString = paramString.substring(1)
//okay, so now let's ajax it

function sendStats(){
var ajaxstat=(window.ActiveXObject)?new ActiveXObject('Microsoft.XMLHTTP'):new XMLHttpRequest();
ajaxstat.open("POST","../stats/load.php",true)
ajaxstat.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ajaxstat.send(paramString)
}
setTimeout("sendStats()",1000)
//Measure Visit Length// Featuring Ajax!!!
var startime=(new Date()).getTime();
window.onunload=function(){
var x=(window.ActiveXObject)?new ActiveXObject('Microsoft.XMLHTTP'):new XMLHttpRequest();
x.open("GET","../stats/count.php?t="+(((new Date()).getTime()-startime)/1000),true);
x.send(null)
}