function hex2rgb(h){
var mh=h.toLowerCase().match(RegExp('^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$'));
return Array(parseInt(mh[1],16),parseInt(mh[2],16),parseInt(mh[3],16));}

ajaxanimator.onReady(function(){
Ext.QuickTips.register({target: "fillcolor",text: "Click To Change Fill Color"})
Ext.QuickTips.register({target: "linecolor",text: "Click To Change Line Color"})
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
displayColor();
}

function colorChangeHandler(t,o){
	var onv=hex2rgb(o)
	Colorobj.style.backgroundColor = "rgb("+onv[0]+","+onv[1]+","+onv[2]+")";
	Colorobj.innerHTML = o;
	if(Colorobj.id == "fillcolor"){
	setFillColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
	}else{
	setLineColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
	}
}

function displayColor(){
	if(!picker){
	picker = new Ext.ux.ColorPicker( 'colorPicker', {
				hidePanel: false,
				captions: {
					red: 'red',
					green: 'grn',
					blue: 'blue',
					hue: 'hue',
					saturation: 'sat',
					brightness: 'val',
					hexa: 'col.',
					colorHotPoint: { x:3, y:3 }
				},
				animate: true
			});
		 
			picker.on('pickcolor',colorChangeHandler);
			picker.huePointer.dom.style.left="-2px";//a little hack...
			var cp = new Ext.ColorPalette({value:'000000'});  // initial selected color
			cp.render('colorPalette');

	cp.on('select', function(palette, selColor){
	picker.setColor(selColor);
	});
	}
};
