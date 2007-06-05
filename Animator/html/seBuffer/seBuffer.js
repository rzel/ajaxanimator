/***************************************************************************
* Document Buffer
* Copyright 2002 by David Schontzler | www.stilleye.com
* Free to use under GNU General Public License as long as this message
*  remains intact.
* Description:  Emplys the use of IFRAMEs to buffer pages for dynamic loading
* URI: http://www.stilleye.com/projects/dhtml/seBuffer
***************************************************************************
* Version: 1.0
***************************************************************************/
function setBuffer(lyr,url)
{
	document.getElementById(lyr).innerHTML = 'loading...'
	parent.frames['seBufferBox'].location = url
	return false
}

function initBuffer(lyr)
{
	parent.document.getElementById(lyr).innerHTML = document.documentElement.innerHTML
}

function init()
{
	if(this.location!=top.location) initBuffer('loadTo')
}
