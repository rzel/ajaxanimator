(function(){

var xy = new Ext.Toolbar.TextItem('0, 0');

Ax.setDrawXY = function(x,y){
    //a little easter egg, sorta like that SMF one....
    //.... just.... this'll probably kill performance....
    //hmm... i wonder if x.toString()+y.toString() is faster than [x,y].join("")
    //lemme see......
    //if([x,y].join("") == "1337"){
    if(x.toString()+y.toString() == "1337"){
    //too bad you'll never be able to know if it's [1,337],[13,37], or [133,7]
    //ooh.... x.toString()+y.toString() is 3x faster taking roughly 3 seconds
    //to hapen one million times, versus [x,y].join("") taking 9 seconds
        Ext.fly(xy.getEl()).update("leet");
    }else{
        Ext.fly(xy.getEl()).update(x.toString()+", "+y.toString());
    }
}

var previewstatus = new Ext.Toolbar.TextItem('No Information');
Ax.setPreviewStatus = function(text){
	Ext.fly(previewstatus.getEl()).update(text);
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
    items: [previewstatus,{
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

