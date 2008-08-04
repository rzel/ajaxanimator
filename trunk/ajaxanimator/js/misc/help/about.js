Ax.About = function(){
//Ax.gs(6);

var aboutWindow = new Ext.Window({
    closable: true,
	iconCls: "tb_about",
    width: 410,
    height: 300,
    minimizable: true,
	title: "About Ajax Animator",
    border: false,
    plain: true,
    layout: 'border',
    buttons: [{
        text: 'Close',
        iconCls: "close",
        handler: function(){
            aboutWindow.close();
        }
    }],
    items: [{
	region: "north",
	baseCls: "ajaxanimator_logo",
	height: 70
	},{
	xtype: "tabpanel",
    region: 'center',
    margins: '3 3 3 0', 
    activeTab: 0,
    defaults: {autoScroll:true},
 
    items:[{
        title: 'Version',
		html: "<b>Ajax Animator "+Ax.v.release+"</b>"+"<br />"+
    "App Name: "+Ax.v.app+"<br />"+
		"Release: "+Ax.v.release+"<br />"+
    "Stability: "+Ax.v.stability+"<br />"+
		"Build: "+Ax.v.build+"<br />"+
    "Format revision: "+Ax.format.revision+"<br />"+
    "Format Revision Support: "+Ax.format.support.min + " - "+Ax.format.support.max+"<br />"+
    "OnlyPaths Version: "+Ax.onlypaths.version+"<br />"+
		"Testing: "+Ax.v.dev+"<br />"+
		"Release Date: "+Date.parseDate(Math.round(Ax.v.date),"U")+" ("+Ax.v.date+")<br />"+
		""
    },{
        title: 'Credits',
        html: '<b>Developers</b><br />'+
		'Antimatter15<br />'+
		"<b>Documentation</b><br />"+
		"Antimatter15<br />"+
		//'<b>Richdraw/OnlyPaths</b>'+ //not used yet
		"<b>Libraries/Extensions</b><br />"+
		'<i>Note: This is not a fully comprehensive list of everything used</i><br />'+
		'Ext v2.1 (http://extjs.com)<br />'+
		'Ext 2.x themes by Galdaka, J.C., madrabaz, and elyxr<br />'+
		'Ext.ux.ToastWindow by efattal<br />'+
		'Ext.ux.Crypto by vtswingkid<br />'+
		'<b>Patches/Bugfixes</b><br />'+
		'http://extjs.com/forum/showthread.php?p=146135<br />'+
		'http://outroot.com/extjs/bug1/<br />'+ 
		'<b>Images/Icons</b><br />'+
		'Logo by Antimatter15<br />'+
		'Icons from silk by famfamfam<br />'+
		'Icons from richdraw by Mark Finkle<br />'+
		'Loading icon from ajaxload.info<br />'+
    '<b>OnlyPaths</b><br />'+
    'Icons from OnlyPaths by josep_ssv<br />'+
    'OnlyPaths by josep_ssv<br />'+
    'RichDraw by Mark Finkle<br />'+
    'Sylvester by James Coglan<br />'
    },{
	title: "Special Thanks",
	html: "<b>Organizations</b><br />"+
	"liveswifers.org for their supportive community, and helping this project get started<br />"+
	"110mb.com hosting, for their reliability, cost (none), and helpful community<br />"+
	"Google Code for svn and project hosting - and just being awesome<br />"+
	"Extjs.com forums for excellent support<br />"+
	"<b>People</b><br />"+
	"inportb from 110mb forums for commentary<br />"+
	"brwainer from liveswifers.org for initial documentation, ideas, and suggestions<br />"+
	"BenjaminJ from liveswifers.org for support and ideas<br />"+
	"Brent Clancy (brclancy111/liveswif-050) for base login system<br />"+
	"RandomProductions for suggestions, fonts, and ideas<br />"+
	"OutOfLine for nice comments and motivation<br />"+
	"shanep for creating a forum for the project on liveswifers forums<br />"+
	""
	},{
		title: 'License',
		//autoLoad: "gpl-3.0-standalone.html"
		html: "GPL v3 (http://www.gnu.org/licenses/gpl-3.0.txt) <br /><br />"+Ax.gpl+" <br /><br /><i>Please don't sue me</i>"
	}]
}]
});
 
aboutWindow.on('minimize', function(){
    aboutWindow.toggleCollapse();
});

aboutWindow.show();
}

Ax.gpl = 
"This program is free software: you can redistribute it and/or modify"+"<br />"+
"it under the terms of the GNU General Public License as published by"+"<br />"+
"the Free Software Foundation, either version 3 of the License, or"+"<br />"+
"(at your option) any later version."+"<br />"+
"<br /><br />"+
"This program is distributed in the hope that it will be useful,"+"<br />"+
"but WITHOUT ANY WARRANTY; without even the implied warranty of"+"<br />"+
"MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the"+"<br />"+
"GNU General Public License for more details."+"<br />"+
"<br /><br />"+
"You should have received a copy of the GNU General Public License"+"<br />"+
"along with this program.  If not, see http://www.gnu.org/licenses/.";

