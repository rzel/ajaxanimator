 var currentPreviewColor; 
 var isinit = new Boolean();
 isinit = false;
function setColorFromPallette(color)
{
	colorWidget.setRgbColor(color.rgb);
	setColor(color);

}
var Colorobj = document.getElementById('linecolor');	
	
	
function LineColorChange(){
ColorWin.close();
ColorWin.show();
ColorWin.maximizeWindow();
Colorobj = document.getElementById('linecolor');	
}

function FillColorChange(){
ColorWin.close();
ColorWin.show();
ColorWin.maximizeWindow();
Colorobj = document.getElementById('fillcolor');	
}

function hex2rgb(hex){
if(hex.indexOf("rgb") != -1){
var xhex = hex.replace("#","")
var red =(new DHTMLSuite.colorUtil()).getRgbColorsByRgbCode(xhex)["red"]
var blue =(new DHTMLSuite.colorUtil()).getRgbColorsByRgbCode(xhex)["blue"]
var green = (new DHTMLSuite.colorUtil()).getRgbColorsByRgbCode(xhex)["green"]
var rgbout = "rgb(" + red + "," + blue + "," + green + ")";
}else{
var rgbout = hex
}
return  rgbout;
}

function setColor(color)
{

	Colorobj.style.backgroundColor = hex2rgb(color.rgb);
	currentPreviewColor = color.rgb;	
	if(color.name){
	Colorobj.innerHTML = color.name;
	}else{
	Colorobj.innerHTML = color.rgb;
	}

if(Colorobj.id == "fillcolor"){
	setFillColor();
	}else{
	setLineColor();
	}
	}



var colorWidget = new DHTMLSuite.colorWidget({ callbackOnChangeRgb : 'setColor',hueSliderPosition:'vertical' });
colorWidget.init();
colorWidget.setRgbColor('#000000');
Colorobj = document.getElementById('fillcolor');	
colorWidget.setRgbColor('#FF0000');

var grayscalePalette = new DHTMLSuite.colorPalette( { callbackOnColorClick:'setColorFromPallette' } );
grayscalePalette.addGrayScaleColors(32);

var namedColorPalette = new DHTMLSuite.colorPalette( { callbackOnColorClick:'setColorFromPallette' } );
namedColorPalette.addAllNamedColors() 


var webColorPalette = new DHTMLSuite.colorPalette( { callbackOnColorClick:'setColorFromPallette' } );
webColorPalette.addAllWebColors();

webColorPalette.init();
grayscalePalette.init();
namedColorPalette.init();


ColorWin.appendContent('AdvancedColorPicker',colorWidget.getDivElement());
ColorWin.appendContent('ColorPalette',webColorPalette.getDivElement());
ColorWin.appendContent('ColorPalette',grayscalePalette.getDivElement());
ColorWin.appendContent('ColorPalette',namedColorPalette.getDivElement());
