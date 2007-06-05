/***************************************************************************
* Image Preloader
* Copyright 2002 by David Schontzler | www.stilleye.com
* Free to use under GNU General Public License as long as this message
*  remains intact.
* Description:  Preload images with a nice loading bar.
* URI: http://www.stilleye.com/projects/dhtml/seLoader
***************************************************************************
* Version: 1.0
***************************************************************************/
function seLoader(imgRoot)
{
	this.root = imgRoot||''
	this.runAt = 0
	this.preImg = new Array()
	this.done = 0
	this.f = 0
	this.to = 0
	eval(this.obj + '=this')
}
seLoader.prototype.runAtEnd = function(fct)
{
	this.runAt = fct
}
seLoader.prototype.setImgs = function()
{
	this.imgs = arguments
}
seLoader.prototype.load = function()
{
	this.loadTxt = document.getElementById('seLoadTxt')
	this.bar = document.getElementById('seLoadBar').style
	for(i=0;(this.imgs[i]);i++)
	{
		this.preImg[i] = new Image()
		this.preImg[i].src = this.imgs[i].indexOf('http')==-1 ? this.root + this.imgs[i] : this.imgs[i]
	}
	this.checkLoad()
}
seLoader.prototype.drawLoader = function(preTxt)
{
	this.startTxt = preTxt ? preTxt : ''
	document.writeln('<div id="seLoader"><div id="seLoadBox"><div id="seLoadBar"></div></div><div id="seLoadTxt">' + (this.startTxt!=''?this.startTxt:'0%') + '</div></div>')
}
seLoader.prototype.checkLoad = function()
{
	for(i in this.preImg)
	{
		if(this.preImg[i].complete)
		{
			this.f = new Number(i)
			this.f++
			this.bar.width = Math.round(this.f/this.preImg.length*100) + '%'
			this.loadTxt.innerHTML = new String(this.startTxt+this.bar.width)
			status = this.preImg[i].src + ' loaded'
		}
	}
	if(this.f!=this.preImg.length)
	{
		clearTimeout(this.to)
		this.to = setTimeout(this.obj+'.checkLoad()',25)
	}
	else
	{
		status = this.imgs.length + ' images loaded.'
		if(this.runAt) eval(this.runAt)
	}
}
