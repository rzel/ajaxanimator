/**
 * @author antimatter15
 * 
 * I really don't care about silverlight, but its a nifty feature to brag about
 */




Ax.ex.silverlight = function(){
    var data = Ax.ex.array(), //the magic behind it all;
 setup = '<Canvas xmlns="http://schemas.microsoft.com/client/2007" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">\n', //my little header
	draw = ""
    for (var i = 0; i < data.length; i++) {
		content = [];
        for (var s = 0; s < data[i].length; s++) {            
            switch (data[i][s].type) {
                case "line":
                    content.push(Ax.ex.silverlight.line(data[i][s]))
                    break;
                case "rect":
                    content.push(Ax.ex.silverlight.rect(data[i][s]))
                    break;
				case "ellipse":
					content.push(Ax.ex.silverlight.ellipse(data[i][s]))
					break;
				case "path":
					content.push(Ax.ex.silverlight.path(data[i][s]))
					break;
				case "text":
					content.push(Ax.ex.silverlight.text(data[i][s]))
					break;
				case "image":
					content.push(Ax.ex.silverlight.image(data[i][s]))
					break;
            }
        }
		draw += content.join("\n")+"\n";
    }
    return setup + draw + "</Canvas>";
}

    
Ax.ex.silverlight.line = function(shape){
	return new Ext.XTemplate('<Line X1="{left}" Y1="{top}" Fill="{fillColor}" Stroke="{lineColor}" X2="{[values.left+values.width]}" Y2="{[values.top+values.height]}"  StrokeThickness="{lineWidth}" />').apply(shape)
}

Ax.ex.silverlight.rect = function(shape){
	return new Ext.XTemplate('<Rectangle Canvas.Left="{left}" Canvas.Top="{top}" Fill="{fillColor}" Stroke="{lineColor}" Width="{width}" Height="{height}" StrokeThickness="{lineWidth}"><Rectangle.RenderTransform><RotateTransform Angle="{[Ax.parseTransform(values.transform)[0]]}"/></Rectangle.RenderTransform></Rectangle>').apply(shape)
}

Ax.ex.silverlight.path = function(shape){
	return new Ext.XTemplate('<Path Data="{points}"  Fill="{fillColor}" Stroke="{lineColor}" StrokeThickness="{lineWidth}" />').apply(shape)
}

Ax.ex.silverlight.text = function(shape){
	return new Ext.XTemplate('<TextBlock FontSize="{textSize}" Fill="{fillColor}" Stroke="{lineColor}"  FontFamily="{textFamily}" Canvas.Left="{left}" Canvas.Top="{top}">{text}</TextBlock>').apply(shape)
}

Ax.ex.silverlight.image = function(shape){
	return new Ext.XTemplate('<Rectangle Canvas.Left="{left}" Canvas.Top="{top}" Width="{width}" Height="{height}"><Rectangle.Fill><ImageBrush ImageSource="{href}" /></Rectangle.Fill></Rectangle>').apply(shape)
}

Ax.ex.silverlight.ellipse = function(shape){
	return new Ext.XTemplate('<Ellipse Canvas.Left="{left}" Fill="{fillColor}" Stroke="{lineColor}" StrokeThickness="{lineWidth}" Canvas.Top="{top}" Width="{width}" Height="{height}" />').apply(shape)

}
Ax.ex.silverlight.save = function(){
	//return Ax.save.computer(Ax.ex.silverlight(),Ax.animation.name+".xaml")
	Ax.msg("Notes on exporting to Silverlight (XAML)","Export to Silverlight is not complete, animations will be condensed to a single canvas of overlapping shapes and some shape data may not be exported.");
	Ax.save.computer(Ax.ex.processing(),Ax.animation.name+".pde")
}
