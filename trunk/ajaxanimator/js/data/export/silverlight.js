/**
 * @author antimatter15
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
            }
        }
		draw += content.join("\n")+"\n";
    }
    return setup + draw + "</Canvas>";
}

Ax.ex.silverlight.line = function(shape){
	return new Ext.XTemplate('<Line X1="{left}" Y1="{top}" X2="{[left+width]}" Y2="{[top+height]}" />').apply(shape)
}

Ax.ex.silverlight.rect = function(shape){
	return new Ext.XTemplate('<Rectangle Canvas.Left="{left}" Canvas.Top="{top}" Width="{width}" Height="{height}" />').apply(shape)

}

Ax.ex.silverlight.ellipse = function(shape){
	return new Ext.XTemplate('<Ellipse Canvas.Left="{left}" Canvas.Top="{top}" Width="{width}" Height="{height}" />').apply(shape)

}
Ax.ex.silverlight.save = function(){
	return Ax.save.computer(Ax.ex.silverlight(),Ax.animation.name+".xaml")
}
