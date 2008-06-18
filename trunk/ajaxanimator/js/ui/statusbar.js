(function(){

var xy = new Ext.Toolbar.TextItem('0, 0');

Ax.setDrawXY = function(x,y){
Ext.fly(xy.getEl()).update([x,y].join(", "));
}

Ax.CanvasStatusbar = ({
    defaultText: 'Ready',
    defaultIconCls: '',
    items: [
     xy,"-",
	{
		iconCls: "x-tbar-page-first",
		tooltip: "Go to first frame",
    handler: function(){Ax.controls.first()}
	},{
        iconCls: "x-tbar-page-prev",
		tooltip: "Go to previous frame",
    handler: function(){Ax.controls.previous()}
    },
	"-",
	"Frame <input type=\"text\" style=\"width: 30px\" value=\"0\"> of 1",
	"-",
	{
		iconCls: "x-tbar-page-next",
		tooltip: "Go to next frame",
    handler: function(){Ax.controls.next()}
	},{
		iconCls: "x-tbar-page-last",
		tooltip: "Go to last frame",
    handler: function(){Ax.controls.last()}
	},'-',{
	text: "More",
	menu: [{text : "sum stuff"}]
	}, " "]
})


Ax.PreviewStatusbar = ({
    defaultText: 'Uh... Something',
    defaultIconCls: '',
    items: [{
        text: 'A&nbsp;Buttozn'
    }, '-', 'Revisions'," "]
})

})()

//Simple Status Function

Ax.setStatus = function(status){
//if(!status.anim){status.anim=false}; //a little hack to stop those this.statusEl is undefined errors
//oh. crap. that doesn't work :(

Ax.viewport.findById("canvas").getBottomToolbar().setStatus(status)
Ax.viewport.findById("preview").getBottomToolbar().setStatus(status)
}
Ax.showBusy = function(){
Ax.viewport.findById("canvas").getBottomToolbar().showBusy()
Ax.viewport.findById("preview").getBottomToolbar().showBusy()
}

