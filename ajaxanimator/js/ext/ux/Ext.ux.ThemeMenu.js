/*
* Theme Selection Menu
*
* By Antimatter15 2008
* i donno. gpl v3 maybe.
*/

Ext.ux.ThemeMenu = function(config){
    Ext.ux.ThemeMenu.superclass.constructor.call(this, config);

    //this.plain = true;
	for(var theme = 0; theme < this.themeconfig.length; theme++){
	this.add(new Ext.menu.CheckItem({
    text: this.themeconfig[theme][1], //text title
	theme: theme,
	checked: (this.themeconfig[theme][2]==true),
    group: 'thememenu',
    checkHandler: function(item, checked) {
        if (checked){
		item.parentMenu.setTheme(item.theme)
		};
    }
}))
}

};

Ext.extend(Ext.ux.ThemeMenu, Ext.menu.Menu, {

cssPath: "../theme/css/", //mind the trailing slash
themeconfig:[ //array of stuff
 ['xtheme-default.css','Ext Blue Theme',true] //t3h default
,['xtheme-gray.css', 'Gray Theme']
,['xtheme-gray.css,xtheme-gray-extend.css', 'Extended Gray Theme'] //this is an "extend" theme, it is applied over another theme
,['xtheme-darkgray.css', 'Dark Gray Theme']
,['xtheme-black.css',  'Black Theme']
,['xtheme-olive.css', 'Olive Theme']
,['xtheme-purple.css', 'Purple Theme']
,['xtheme-slate.css', 'Slate Theme']
,['xtheme-peppermint.css',  'Peppermint Theme']
,['xtheme-chocolate.css', 'Chocolate Theme']
,['xtheme-slickness.css', 'SlicknesS Theme']
,['xtheme-pink.css', 'Pink Theme']
,['xtheme-midnight.css', "Midnight Theme"]
,['xtheme-green.css', "Green Theme"]
,['xtheme-indigo.css', "Indigo Theme"]
,['xtheme-silverCherry.css',"Silver Cherry Theme"]
,['xtheme-orange.css',"Orange Theme"]
],
setTheme: function(id){
//console.log(this)
var theme = this.themeconfig[id][0];
var themes = theme.split(",")
for(var i = 0; i < 4; i++){ //up to 4 themes on top of each other
if(themes[i]){
Ext.util.CSS.swapStyleSheet('csstheme'+i, this.cssPath + themes[i]);
}else{
Ext.util.CSS.removeStyleSheet('csstheme'+i);
}
}

}//end setTheme
});






