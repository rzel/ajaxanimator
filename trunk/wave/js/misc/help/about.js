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
    "Graphic Editor: "+Ax.onlypaths.version+"<br />"+
		"Testing: "+Ax.v.dev+"<br />"+
		"Release Date: "+Date.parseDate(Math.round(Ax.v.date),"U")+" ("+Ax.v.date+")<br />"+
		""
    },{
        title: 'Credits',
        html: '<b>Developers</b><br />'+
		'Antimatter15<br />'+
		"<b>Documentation</b><br />"+
		"Antimatter15<br />"+
		"Bruce Wainer (Brwainer) - Manual<br />"+
		"RandomProductions - FAQ<br />"+		
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
    '<b>VectorEditor</b><br />'+
    'Raphael by Dmitry Baranovskiy<br />'+
    'Editor by Antimatter15<br />'+
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
	},{
    title: "Other",
    html: "Code: <a href='http://code.google.com/p/ajaxanimator'>http://code.google.com/p/ajaxanimator</a> "+
    "(It may be quite dated, this version that you are using right now at the time of writing has not yet been published"+
    " but the modifications to the overall codebase are relatively minor).<br /><br />I really feel old writing this right now"+
    " I probably don't need to write this, but I feel like putting some words on top of the first time I've updated this project "+
    "which is really quite magical in my mind, being older than any other project of mine. I started thinking of doing this"+
    " project back in late 2006, while I only wrote code starting at about March of 2007. I was 12 at the time. Until mid-2008, "+
    " a lot had changed. It switched from being a raw idea to a UI sketch to a bunch of lossely coupled components, basic animation,"+
    " 2 rewrites and a new core graphics editor. For almost a year, the project lay abandoned, and I had no urge to update it after "+
    " it's relative complexity and several OS switches and rejection. Finally, I updated it, which brings it up to where it is today. "+
    "While it is still lacking many features I and many users would like, I can't really do it all. I can't draw, and I can't really "+
    "make sense with making a project which I can't personally benefit any more from. I started in 2006 when my Flash MX trial ran out "+
    "and piracy felt wrong. I wanted a simple tool which could tween and draw stick figures, and it brought me along this 3 year journey."+
    "<hr> I felt pretty old writing that two years ago. Right now, it's the new years eve - the beginning of 2012. This has always been "+
    "the one project which I would use to prove that I had done something with my life. It's one of the first things I've ever done, and "+
    "remains the one that I'm probably most proud of. Most importantly of all, this is a story of visions and of ideas. What would I have "+
    "thought those five years ago, looking at something marginally refined over the eternity which would have since passed? What would "+
    "I have envisioned for a solitary musing into the development of creative software - not for professionals, mind you, but for the "+
    "limitless naivete of students. But to a sixth grader, none of that made any difference. Professional and amateur was united in a "+
    "singular appreciation for the craft and it was a vision which equalized everything. This project shifted from a means to an end, "+
    "the cleansing of a guilty conscience of software piracy and the ulterior need to pursue an artistic desire into an end in itself."+
    " It became a duty, just like that of expressing notions of society from that fifth grade perspective to create software so that "+
    "posterity may succeed in what I couldn't. But education is all about digging yourself into a hole, losing sight of the grandeur "+
    "which was a flat landscape stretching into the distance filled with magnificent and seemingly bottomless trenches and tunnels. "+
    "You can pick a nice region and start digging. You can make it your home, something warm with a barrier against the cold weather "+
    "of idiocy. In this sense, I tried to be an artist but after shoveling knee-deep into the soft soil next to a tree with sticks and"+
    " spoons, I had this marvel taken away by a higher power-- Adobe, or in real life, the administration of my Elementary school which "+
    "deemed such a giant hole as a security and safety risk near the playground (actual story turned metaphor for another actual story, "+
    "pretty cool right?). I went elsewhere to find another way to that end, but got lost in the process. Now I'm further away from the "+
    "original goal than ever and I have no regrets. Sometimes I wonder what it would be like if things turned out differently, especially "+
    "at these nostalgic times of the year.<br><br>It's been two years since the last release. A lot has changed since then and a lot hasn't. "+
    "The most relevant is probably the death of Google Wave, which is scheduled for tomorrow. Google Wave, which in a few years won't be "+
    "even part of a vague memory of humankind, was an amazing idea for the future. It, to those who allegedly grasped its sublimity was "+
    "a definite harbinger for the world to come. A sort of retro-futuristic utopia of synergy and buzzwords galore filled with ideas of"+
    " an age rendered impractical by the society and technology of its time. It was slow, clunky and didn't scale well. It promised "+
    "everything and gave us nothing but cynicism for bold notions. Regardless, I was one of the naive few who saw through the noise and "+
    "took a risk, reviving the already rotting carcass of this project under a new light. I saw no challenge as unsurmountable, and wrote "+
    " a new graphics editor: jsvectoreditor, based off a new abstraction library called Raphael. I saw Internet Explorer as a roadblock "+
    "which could be conquered, and felt that if Wave invested the effort and managed to get IE to work, so should mine. I developed a new "+
    "data persistence layer so that sketches could be collaborated on in real time. The first sign that my vision was crumbling came with "+
    "the announcement that Google Wave would no longer support IE. The wave client was sluggish and couldn't cope with the large "+
    "amounts of data which this extension generated (On a tangent, I made a wave extension called Tsunami which caused waves to crash"+
    " based on this principle and managed to pique the interest of the one and only xkcd). The vision came crashing down a bit over "+
    "a year ago when the Wave project was cancelled wholesale. The rest of the world had abandoned Wave by then, but I was one of the"+
    " reluctant few to cling on until the last dying gasp. This project stands now as a mere shell of what it was and could be. It "+
    "should be clear to all by now that I'm not the right person to maintain this. But nonetheless, even though this project is now"+
    " essentially a zombie devoid of meaning, I shall continue to exploit these naive and long gone ideals for personal benefit by "+
    "pushing the occasional update to mock its demise. I'll pretend that the ideas are still alive and well and hopefully, maybe one"+
    " day, I'll be able to convince myself that they are." 
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

