
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

addCSS("../ext/color-picker.ux.css");


}

function displayColor(){




};
Ext.onReady(function(){
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
		 
			picker.on('pickcolor',function(t,o){
			var onv=picker.hexToRgb(o)
			//var onv = new Array();
			Colorobj.style.backgroundColor = "rgb("+onv[0]+","+onv[1]+","+onv[2]+")";
			Colorobj.innerHTML = o;
			if(Colorobj.id == "fillcolor"){
			setFillColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
			}else{
			setLineColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
			}
			});
			
			picker.huePointer.dom.style.left="-2px"
			var cp = new Ext.ColorPalette({value:'FFFFFF'});  // initial selected color
			cp.render('colorPalette');

	cp.on('select', function(palette, selColor){
	picker.setColor(selColor);
	});

});