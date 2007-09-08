
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
addCSS("../ajaxanimator/colorpicker.css");
addJS("../lib/element-beta-min.js",function(){
addJS("../lib/dragdrop-min.js",function(){
addJS("../lib/slider-min.js",function(){
addJS("../lib/colorpicker-beta-min.js",function(){
displayColor();
})
})
})
})
}

function displayColor(){

            picker = new YAHOO.widget.ColorPicker("colorPicker", {
                    showhsvcontrols: true,
                    showhexcontrols: true,
					images: {
						PICKER_THUMB: "../images/picker_thumb.png",
						HUE_THUMB: "../images/hue_thumb.png"
    				}
                });
			
			//a listener for logging RGB color changes;
			//this will only be visible if logger is enabled:
			var onRgbChange = function(o) {
				/*o is an object
					{ newValue: (array of R, G, B values),
					  prevValue: (array of R, G, B values),
					  type: "rgbChange"
					 }
				*/
				var onv = o.newValue
					Colorobj.style.backgroundColor = "rgb("+onv[0]+","+onv[1]+","+onv[2]+")";

				Colorobj.innerHTML = YAHOO.util.Color.rgb2hex(onv[0],onv[1],onv[2]);
				
				if(Colorobj.id == "fillcolor"){
				setFillColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
				}else{
				setLineColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
				}
				//YAHOO.log("The new color value is " + o.newValue, "info", "example");
			}
			
			//subscribe to the rgbChange event;
			picker.on("rgbChange", onRgbChange);

Ext.onReady(function(){
var cp = new Ext.ColorPalette({value:'FFFFFF'});  // initial selected color
cp.render('colorPalette');

cp.on('select', function(palette, selColor){
    // do something with selColor
	picker.setValue(YAHOO.util.Color.hex2rgb(selColor), false);
});

});

};